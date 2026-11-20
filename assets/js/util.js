/* =====================================================================
 *  공용 유틸리티: 한국어 조사 처리, 템플릿 채우기, HTML 이스케이프,
 *  문장 분리, 핵심어 추출 등
 * ===================================================================== */
(function (global) {
  'use strict';

  /** 마지막 글자 받침 여부 (한글 아니면 숫자/영문 읽기 근사) */
  function hasBatchim(word) {
    const w = String(word || '').replace(/[\s\)\]」』"'’”.,!?]+$/, '');
    if (!w) return false;
    const ch = w[w.length - 1];
    const code = ch.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) return (code - 0xAC00) % 28 !== 0;
    if (/[0-9]/.test(ch)) return '013678'.includes(ch); // 영,일,삼,육,칠,팔
    if (/[a-zA-Z]/.test(ch)) return /[lmnLMN]/.test(ch);
    return false;
  }
  /** 받침 'ㄹ' 여부 (으로/로 처리용) */
  function rieul(word) {
    const w = String(word || '').trim();
    const code = w.charCodeAt(w.length - 1);
    return code >= 0xAC00 && code <= 0xD7A3 && (code - 0xAC00) % 28 === 8;
  }
  const JOSA = {
    '은': ['은', '는'], '는': ['은', '는'], '이': ['이', '가'], '가': ['이', '가'],
    '을': ['을', '를'], '를': ['을', '를'], '과': ['과', '와'], '와': ['과', '와'],
    '이나': ['이나', '나'], '이란': ['이란', '란'], '이라': ['이라', '라'], '아': ['아', '야'],
    '이에요': ['이에요', '예요'], '이고': ['이고', '고'], '이며': ['이며', '며'], '으로': ['으로', '로'], '로': ['으로', '로'],
    '에': ['에', '에'], '의': ['의', '의'], '에서': ['에서', '에서'], '도': ['도', '도'], '만': ['만', '만'],
  };
  function josa(word, j) {
    const pair = JOSA[j];
    if (!pair) return word + j;
    if (j === '으로' || j === '로') return word + (hasBatchim(word) && !rieul(word) ? '으로' : '로');
    return word + (hasBatchim(word) ? pair[0] : pair[1]);
  }

  /** "{topic:을} 탐구" → vars.topic + 조사 */
  function fill(tpl, vars) {
    return String(tpl || '').replace(/\{(\w+)(?::([가-힣]+))?\}/g, (m, k, j) => {
      let v = vars && vars[k] !== undefined && vars[k] !== null && vars[k] !== '' ? String(vars[k]) : '';
      if (!v) v = ({ topic: '오늘의 주제', concept: '핵심 개념', concept2: '관련 개념', question: '탐구 질문', general: '일반화 문장' })[k] || '';
      return j ? josa(v, j) : v;
    });
  }

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /** 문장 분리 */
  function sentences(text) {
    return String(text || '').replace(/\s+/g, ' ')
      .split(/(?<=[.!?。]|[다요죠까][.!?]?)\s+(?=[^\s])/)
      .map(s => s.trim()).filter(s => s.length > 3);
  }

  const JOSA_TAIL = ['으로부터', '에서부터', '이라고', '이라는', '에게서', '까지는', '에서는', '으로는', '이었다', '입니다', '합니다', '했다', '한다', '하는', '하고', '에서', '에게', '으로', '부터', '까지', '처럼', '보다', '이나', '이다', '들은', '들이', '들을', '들의', '은', '는', '이', '가', '을', '를', '에', '의', '와', '과', '로', '도', '만', '나', '들'];
  const STOP = new Set(['그리고', '그러나', '하지만', '그래서', '이것', '저것', '그것', '우리', '여러분', '사람', '때문', '경우', '정도', '여러', '모든', '어떤', '무엇', '이런', '그런', '다른', '하나', '가장', '많은', '있는', '있습니다', '없는', '것은', '것이', '것을', '수', '등', '더', '또', '잘', '왜', '어떻게', '오늘', '이제', '먼저', '다음', '처음', '마지막', '예를', '들어', '이처럼', '이렇게', '그렇다면', '생각', '알아봅시다', '살펴봅시다']);
  function stripJosa(w) {
    for (const t of JOSA_TAIL) { if (w.length > t.length + 1 && w.endsWith(t)) return w.slice(0, -t.length); }
    return w;
  }
  /** 간단한 핵심어 추출: 빈도 × 길이, 우선 후보(priority)는 가중 */
  function keywords(text, max, priority) {
    const counts = {};
    String(text || '').replace(/[^가-힣a-zA-Z0-9\s]/g, ' ').split(/\s+/).forEach(raw => {
      if (!raw) return;
      const w = stripJosa(raw);
      if (w.length < 2 || STOP.has(w) || /^[0-9]+$/.test(w) || /(하다|했다|된다|있다|없다|한다|된|한|하게|하며|하여|해요|어요|아요|니다|습니)$/.test(w)) return;
      counts[w] = (counts[w] || 0) + 1;
    });
    (priority || []).forEach(p => { const k = String(p).split(/[\s,·]/)[0]; if (k && String(text).includes(k)) counts[k] = (counts[k] || 0) + 3; });
    return Object.entries(counts)
      .sort((a, b) => (b[1] * Math.min(b[0].length, 4)) - (a[1] * Math.min(a[0].length, 4)))
      .slice(0, max || 8).map(e => e[0]);
  }

  /** "~하기" → "~할 수 있다" */
  function canDo(skill) {
    const s = String(skill || '').trim();
    if (/하기$/.test(s)) return s.replace(/하기$/, '할 수 있다');
    if (/기$/.test(s)) return s.replace(/기$/, '을 수 있다');
    return s + '을(를) 할 수 있다';
  }

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function uniq(arr) { return [...new Set((arr || []).filter(Boolean))]; }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function today() { const d = new Date(); return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}.`; }

  global.Util = { hasBatchim, josa, fill, esc, sentences, keywords, stripJosa, canDo, uid, uniq, clone, today };
})(window);
