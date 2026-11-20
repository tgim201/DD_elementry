/* =====================================================================
 *  온톨로지 지식 베이스(KB) 구성
 *  TTL 원본 → 교과/도서관/탐구단계/수업전략/독서전략 정규화 객체
 * ===================================================================== */
(function (global) {
  'use strict';
  const { Graph, localName, parse } = global.TTL;

  // 파일명 → 교과 키
  const SUBJECT_FILES = {
    '국어과.ttl': { key: 'korean', name: '국어', dbName: '국어과', icon: '📖', grades: [1, 2, 3, 4, 5, 6] },
    '수학과.ttl': { key: 'math', name: '수학', dbName: '수학과', icon: '➗', grades: [1, 2, 3, 4, 5, 6] },
    '통합교과.ttl': { key: 'integrated', name: '통합교과(바른 생활·슬기로운 생활·즐거운 생활)', short: '통합교과', dbName: '바슬즐(통합)', icon: '🌱', grades: [1, 2] },
    '사회과.ttl': { key: 'social', name: '사회', dbName: '사회과', icon: '🗺️', grades: [3, 4, 5, 6] },
    '과학과.ttl': { key: 'science', name: '과학', dbName: '과학과', icon: '🔬', grades: [3, 4, 5, 6] },
    '도덕과.ttl': { key: 'moral', name: '도덕', dbName: '도덕과', icon: '🤝', grades: [3, 4, 5, 6] },
    '영어과.ttl': { key: 'english', name: '영어', dbName: '영어과', icon: '🔤', grades: [3, 4, 5, 6] },
    '체육과.ttl': { key: 'pe', name: '체육', dbName: '체육과', icon: '⚽', grades: [3, 4, 5, 6] },
    '음악과.ttl': { key: 'music', name: '음악', dbName: '음악과', icon: '🎵', grades: [3, 4, 5, 6] },
    '미술과.ttl': { key: 'art', name: '미술', dbName: '미술과', icon: '🎨', grades: [3, 4, 5, 6] },
    '실과.ttl': { key: 'practical', name: '실과', dbName: '실과/정보과', icon: '🛠️', grades: [5, 6] },
  };
  const LIBRARY_FILE = 'library_information_life_2022.ttl';

  function gradeBandOf(grade) { return grade <= 2 ? '1-2' : grade <= 4 ? '3-4' : '5-6'; }

  function buildSubject(g, file, meta) {
    const subjIri = g.ofType('Subject', file)[0];
    if (!subjIri) return null;
    const areas = g.all(subjIri, 'hasArea').map(o => o.v);
    const competencies = g.all(subjIri, 'developsCompetency').map(o => ({
      name: g.label(o.v), desc: g.text(o.v, 'description'),
    }));
    // developsCompetency 가 개별 문장으로 흩어져 있으므로 역방향도 수집
    if (!competencies.length) {
      g.ofType('Competency', file).forEach(c => competencies.push({ name: g.label(c), desc: g.text(c, 'description') }));
    }
    const areaObjs = areas.map(a => {
      const coreIris = g.all(a, 'hasCoreIdea').map(o => o.v);
      const elemIris = g.all(a, 'hasContentElement').map(o => o.v);
      const coreIdeas = coreIris.map((c, idx) => {
        const m = localName(c).match(/CoreIdea_(\d+)$/);
        return { id: localName(c), no: m ? +m[1] : idx + 1, text: g.text(c, 'description') || g.label(c), knowledge: [] };
      });
      const skills = [], attitudes = [], knowledge = [];
      elemIris.forEach(e => {
        const label = g.label(e);
        const ln = localName(e);
        if (g.isA(e, 'ProcessSkill')) skills.push(label);
        else if (g.isA(e, 'ValueAttitude')) attitudes.push(label);
        else {
          knowledge.push(label);
          const m = ln.match(/Elem_(\d+)_\d+$/);
          const ci = m ? coreIdeas.find(c => c.no === +m[1]) : null;
          (ci || coreIdeas[0] || { knowledge: [] }).knowledge.push(label);
        }
      });
      return { id: localName(a), name: g.label(a), coreIdeas, knowledge, skills, attitudes };
    });
    return {
      key: meta.key, name: meta.name, short: meta.short || meta.name, dbName: meta.dbName, icon: meta.icon,
      grades: meta.grades, file,
      desc: g.text(subjIri, 'description'), competencies, areas: areaObjs,
    };
  }

  function gbLabel(g, iri) {
    const ln = localName(iri);
    const m = ln.match(/(\d)_(\d)$/);
    return m ? `${m[1]}-${m[2]}` : g.label(iri);
  }

  function buildLibrary(g) {
    const file = LIBRARY_FILE;
    const subj = g.ofType('Subject', file)[0];
    const areaIris = subj ? g.all(subj, 'hasArea').map(o => o.v) : g.ofType('Area', file);
    const standards = [];
    const areas = areaIris.map((a, idx) => {
      const stdIris = g.all(a, 'hasAchievementStandard').map(o => o.v);
      const area = {
        id: localName(a), no: idx + 1, name: g.label(a),
        coreIdea: g.all(a, 'hasCoreIdea').map(o => g.label(o.v)).join(' '),
        knowledge: g.all(a, 'hasKnowledgeElement').map(o => ({ text: g.label(o.v), band: gbLabel(g, g.one(o.v, 'targetsGradeBand')) })),
        skills: g.all(a, 'hasSkillElement').map(o => g.label(o.v)),
        attitudes: g.all(a, 'hasAttitudeElement').map(o => g.label(o.v)),
        standards: [],
      };
      stdIris.forEach(s => {
        const std = {
          id: localName(s), code: g.one(s, 'standardCode'), text: g.label(s),
          desc: g.text(s, 'standardDescription'), band: gbLabel(g, g.one(s, 'targetsGradeBand')),
          areaId: area.id, areaName: area.name,
        };
        area.standards.push(std); standards.push(std);
      });
      return area;
    });
    const competencies = subj ? g.all(subj, 'developsCompetency').map(o => g.label(o.v)) : [];
    return { name: '도서관과 정보생활', areas, standards, competencies };
  }

  function buildInquiry(g) {
    const phases = g.ofType('InquiryPhase').map(p => {
      const strat = g.all(p, 'hasStrategy').map(o => ({
        id: localName(o.v), name: g.label(o.v), desc: g.text(o.v, 'comment'),
        routine: g.isA(o.v, 'ThinkingRoutine'),
      }));
      return {
        id: localName(p), seq: +g.one(p, 'sequenceNumber') || 0, name: g.label(p), desc: g.text(p, 'comment'),
        strategies: strat,
        activities: g.all(p, 'hasActivity').map(o => g.label(o.v)),
        resources: g.all(p, 'usesResource').map(o => g.label(o.v)),
        assessments: g.all(p, 'hasAssessment').map(o => g.label(o.v)),
        example: g.text(p, 'elementaryApplicationCase'),
      };
    }).sort((a, b) => a.seq - b.seq);
    return { phases };
  }

  function buildInstructionStrategies(g) {
    return g.ofType('InstructionalStrategy').map(s => ({
      id: localName(s), name: g.label(s), desc: g.text(s, 'strategyDescription'),
      level: g.text(s, 'targetSchoolLevel'), stage: g.text(s, 'infoLiteracyStage'),
      verbs: g.all(s, 'hasSkillVerb').map(o => g.label(o.v)),
      genres: g.all(s, 'hasGenre').map(o => g.label(o.v)),
    }));
  }

  function buildReading(g) {
    return g.ofType('ReadingFunction').map(f => ({
      id: localName(f), name: g.label(f),
      verbs: g.all(f, 'hasVerb').map(o => g.label(o.v)),
      strategies: g.all(f, 'hasStrategy').map(o => g.label(o.v)),
    }));
  }

  /** 전체 KB 생성 */
  function buildKB(sources, inquiryData) {
    const g = new Graph();
    const errors = [];
    Object.keys(sources).forEach(name => {
      try { g.add(parse(sources[name], name).triples, name); }
      catch (e) { errors.push(`${name}: ${e.message}`); }
    });
    const subjects = [];
    Object.keys(SUBJECT_FILES).forEach(f => {
      if (sources[f]) { const s = buildSubject(g, f, SUBJECT_FILES[f]); if (s) subjects.push(s); }
    });
    const kb = {
      graph: g, errors,
      subjects,
      subjectByKey: Object.fromEntries(subjects.map(s => [s.key, s])),
      library: sources[LIBRARY_FILE] ? buildLibrary(g) : { areas: [], standards: [], competencies: [] },
      inquiry: buildInquiry(g),
      instructionStrategies: buildInstructionStrategies(g),
      reading: buildReading(g),
      verbs: inquiryData ? inquiryData.processSkills || {} : {},
      subjectVerbs: inquiryData ? inquiryData.subjectSkills || {} : {},
      verbPhases: inquiryData ? inquiryData.inquiryPhases || {} : {},
      stats: { files: Object.keys(sources).length, triples: 0 },
    };
    let cnt = 0; g.spo.forEach(pm => pm.forEach(v => { cnt += v.length; }));
    kb.stats.triples = cnt;
    return kb;
  }

  global.Ontology = { buildKB, gradeBandOf, SUBJECT_FILES, LIBRARY_FILE };
})(window);
