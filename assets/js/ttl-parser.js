/* =====================================================================
 *  경량 Turtle(TTL) 파서
 *  - @prefix / PREFIX, a, ; , ., 리터럴("..." / """...""" / @lang / ^^type),
 *    숫자, true/false, 빈 노드 [ ... ], 한글 로컬명(예: lil:Std_2도정01_01) 지원
 *  - 결과: { triples:[{s,p,o}], prefixes:{} }  (o = {t:'iri'|'lit'|'bnode', v, lang, dt})
 * ===================================================================== */
(function (global) {
  'use strict';

  const RDF_TYPE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';

  function tokenize(src) {
    const toks = [];
    let i = 0;
    const n = src.length;
    while (i < n) {
      const c = src[i];
      // 공백
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\uFEFF') { i++; continue; }
      // 주석
      if (c === '#') { while (i < n && src[i] !== '\n') i++; continue; }
      // IRI
      if (c === '<') {
        const j = src.indexOf('>', i + 1);
        toks.push({ k: 'iri', v: src.slice(i + 1, j) });
        i = j + 1; continue;
      }
      // 문자열 리터럴
      if (c === '"' || c === "'") {
        const q = c;
        let val = '';
        if (src.substr(i, 3) === q + q + q) {
          const j = src.indexOf(q + q + q, i + 3);
          val = src.slice(i + 3, j);
          i = j + 3;
        } else {
          i++;
          while (i < n && src[i] !== q) {
            if (src[i] === '\\') {
              const e = src[i + 1];
              const map = { n: '\n', t: '\t', r: '\r', '"': '"', "'": "'", '\\': '\\' };
              if (e === 'u') { val += String.fromCharCode(parseInt(src.substr(i + 2, 4), 16)); i += 6; continue; }
              val += (map[e] !== undefined ? map[e] : e); i += 2; continue;
            }
            val += src[i++];
          }
          i++;
        }
        const tok = { k: 'lit', v: val };
        if (src[i] === '@') {
          let j = i + 1;
          while (j < n && /[A-Za-z0-9\-]/.test(src[j])) j++;
          tok.lang = src.slice(i + 1, j); i = j;
        } else if (src.substr(i, 2) === '^^') {
          i += 2;
          if (src[i] === '<') { const j = src.indexOf('>', i); tok.dtIri = src.slice(i + 1, j); i = j + 1; }
          else { let j = i; while (j < n && !/[\s;,\.\)\]]/.test(src[j])) j++; tok.dtP = src.slice(i, j); i = j; }
        }
        toks.push(tok); continue;
      }
      // 구두점
      if (c === ';' || c === ',' || c === '[' || c === ']' || c === '(' || c === ')') { toks.push({ k: c }); i++; continue; }
      if (c === '.') {
        // 숫자 .5 같은 경우는 드묾 → 구두점 처리
        toks.push({ k: '.' }); i++; continue;
      }
      // 일반 단어(접두어명, 숫자, a, @prefix, true/false)
      let j = i;
      while (j < n && !/[\s;,\(\)\[\]"<>]/.test(src[j])) j++;
      let word = src.slice(i, j);
      // 끝의 '.'은 문장 종결자
      let trail = 0;
      while (word.length > 1 && word.endsWith('.') && !/^[0-9]+\.[0-9]*$/.test(word)) { word = word.slice(0, -1); trail++; }
      toks.push({ k: 'word', v: word });
      for (let t = 0; t < trail; t++) toks.push({ k: '.' });
      i = j;
    }
    return toks;
  }

  function parse(src, baseName) {
    const toks = tokenize(src);
    const prefixes = {};
    const triples = [];
    let p = 0;
    let bn = 0;

    function expand(word) {
      if (word === 'a') return RDF_TYPE;
      const k = word.indexOf(':');
      if (k < 0) return word;
      const pre = word.slice(0, k);
      const local = word.slice(k + 1);
      if (prefixes[pre] === undefined) return word; // 정의되지 않은 접두어는 원형 유지
      return prefixes[pre] + local;
    }

    function term(tok) {
      if (!tok) throw new Error('예상치 못한 파일 끝');
      if (tok.k === 'iri') return { t: 'iri', v: tok.v };
      if (tok.k === 'lit') {
        const o = { t: 'lit', v: tok.v };
        if (tok.lang) o.lang = tok.lang;
        if (tok.dtIri) o.dt = tok.dtIri;
        if (tok.dtP) o.dt = expand(tok.dtP);
        return o;
      }
      if (tok.k === 'word') {
        const w = tok.v;
        if (/^[+-]?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$/.test(w)) return { t: 'lit', v: w, num: true };
        if (w === 'true' || w === 'false') return { t: 'lit', v: w };
        if (w.startsWith('_:')) return { t: 'bnode', v: (baseName || '') + w };
        return { t: 'iri', v: expand(w) };
      }
      throw new Error('알 수 없는 토큰: ' + JSON.stringify(tok));
    }

    function readObject() {
      const tok = toks[p];
      if (tok.k === '[') { p++; const id = { t: 'bnode', v: '_:b' + (bn++) }; readPredObjList(id, ']'); p++; return id; }
      if (tok.k === '(') { // 컬렉션은 단순 배열 리터럴로 근사
        p++; const items = [];
        while (toks[p].k !== ')') { items.push(readObject()); }
        p++; return { t: 'list', v: items };
      }
      p++;
      return term(tok);
    }

    function readPredObjList(subj, endKind) {
      while (p < toks.length && toks[p].k !== endKind) {
        if (toks[p].k === ';') { p++; continue; }
        const predTok = toks[p++];
        const pred = term(predTok);
        // 객체 목록
        while (true) {
          const obj = readObject();
          triples.push({ s: subj.v, p: pred.v, o: obj });
          if (toks[p] && toks[p].k === ',') { p++; continue; }
          break;
        }
        if (toks[p] && toks[p].k === ';') { p++; continue; }
        if (toks[p] && toks[p].k === endKind) break;
      }
    }

    while (p < toks.length) {
      const t = toks[p];
      if (t.k === 'word' && (t.v === '@prefix' || t.v.toUpperCase() === 'PREFIX')) {
        const name = toks[p + 1].v.replace(/:$/, '');
        prefixes[name] = toks[p + 2].v;
        p += 3;
        if (toks[p] && toks[p].k === '.') p++;
        continue;
      }
      if (t.k === 'word' && (t.v === '@base' || t.v.toUpperCase() === 'BASE')) { p += 2; if (toks[p] && toks[p].k === '.') p++; continue; }
      if (t.k === '.') { p++; continue; }
      let subj;
      if (t.k === '[') { p++; subj = { t: 'bnode', v: '_:b' + (bn++) }; readPredObjList(subj, ']'); p++; }
      else { p++; subj = term(t); }
      readPredObjList(subj, '.');
      p++; // '.'
    }
    return { triples, prefixes };
  }

  /* ---------------- 간단한 그래프 인덱스 ---------------- */
  function localName(iri) {
    if (!iri) return '';
    const m = String(iri).match(/[#\/]([^#\/]*)$/);
    return m ? m[1] : iri;
  }

  class Graph {
    constructor() { this.spo = new Map(); this.order = []; this.sources = {}; }
    add(triples, sourceName) {
      for (const tr of triples) {
        if (!this.spo.has(tr.s)) { this.spo.set(tr.s, new Map()); this.order.push(tr.s); this.sources[tr.s] = sourceName; }
        const pm = this.spo.get(tr.s);
        const pl = localName(tr.p);
        const key = tr.p === RDF_TYPE ? '@type' : pl;
        if (!pm.has(key)) pm.set(key, []);
        pm.get(key).push(tr.o);
      }
    }
    /** 주어 s의 속성(로컬명) 값 목록 */
    all(s, prop) { const pm = this.spo.get(s); return pm && pm.get(prop) ? pm.get(prop) : []; }
    one(s, prop) { const a = this.all(s, prop); return a.length ? a[0].v : ''; }
    /** 한국어 우선 리터럴 */
    text(s, prop) {
      const a = this.all(s, prop);
      if (!a.length) return '';
      const ko = a.find(o => o.lang === 'ko');
      return (ko || a[0]).v;
    }
    label(s) { return this.text(s, 'label') || localName(s); }
    types(s) { return this.all(s, '@type').map(o => localName(o.v)); }
    isA(s, typeLocal) { return this.types(s).includes(typeLocal); }
    /** 특정 타입의 주어 목록(정의 순서 유지) */
    ofType(typeLocal, sourceName) {
      return this.order.filter(s => this.isA(s, typeLocal) && (!sourceName || this.sources[s] === sourceName));
    }
    /** 역방향: prop 값으로 o를 가진 주어들 */
    subjectsWith(prop, o) {
      const res = [];
      for (const s of this.order) { if (this.all(s, prop).some(x => x.v === o)) res.push(s); }
      return res;
    }
  }

  global.TTL = { parse, tokenize, Graph, localName, RDF_TYPE };
})(window);
