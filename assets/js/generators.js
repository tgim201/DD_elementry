/* =====================================================================
 *  3트랙 지도안 & 수업용 읽기 텍스트 생성 엔진 (generators.js)
 *  1) generateReadingText(kb, state)
 *     - 11개 교과 × 3개 학년군 × 6개 텍스트 장르 맞춤형 읽기 자료 생성
 *     - 핵심 어휘, 사실/의견 문장, 출처(KDC 청구기호), 읽기 질문 자동 포함
 *     - 교사가 직접 입력/수정한 텍스트도 분석하여 동일 구조로 변환
 *  2) generateLessonPlan(kb, state, readingText)
 *     - Track A: 교과교사 × 사서교사 2열(Two-column) 코티칭 40분 지도안
 *     - Track B: 에릭슨 개념기반 탐구 7단계 1열 지도안 (압축형/전체형 지원)
 *     - Track C: 사서교사 Big6 6단계 정보활용 1열 지도안
 * ===================================================================== */
(function (global) {
  'use strict';
  const { josa, fill, canDo, sentences, keywords, uniq, today } = global.Util;
  const { gradeBandOf } = global.Ontology;
  const { recommendKDC, suggestConceptualFrame } = global.Recommender;

  /* ---------------- 텍스트 장르 목록 ---------------- */
  const TEXT_GENRES = [
    { id: 'expository', name: '논픽션 · 설명문', desc: '개념의 뜻과 특징, 구체적인 사례를 알기 쉽게 설명하는 글' },
    { id: 'cause', name: '논픽션 · 원인과 결과', desc: '현상이 일어난 까닭과 그로 인해 나타나는 결과를 분석하는 글' },
    { id: 'compare', name: '논픽션 · 비교와 대조', desc: '두 가지 대상이나 사례의 공통점과 차이점을 견주어 보는 글' },
    { id: 'argument', name: '논픽션 · 주장과 근거', desc: '주제에 대한 글쓴이의 주장과 뒷받침 근거·통계를 담은 설득하는 글' },
    { id: 'fiction', name: '픽션 · 생활 동화/이야기', desc: '교실이나 일상 속 인물이 겪는 사건을 통해 핵심 개념을 깨닫는 이야기' },
    { id: 'news', name: '어린이 신문 기사 · 인터뷰', desc: '생생한 현장 소식과 전문가 인터뷰가 담긴 기사문' },
  ];

  /* ---------------- 핵심 어휘 뜻풀이 자동 사전 + 생성 ---------------- */
  const VOCAB_DICT = {
    '상호작용': '서로 영향을 주고받으며 관계를 맺는 것',
    '시스템': '여러 요소가 서로 연결되어 하나의 목적을 이루는 체계',
    '균형': '어느 한쪽으로 기울지 않고 고르게 유지되는 상태',
    '다양성': '모양이나 생각, 특징이 여러 가지로 다른 성질',
    '지속가능성': '미래 세대도 함께 누릴 수 있도록 환경과 자원을 아끼고 지키는 성질',
    '신뢰성': '정보나 자료가 믿을 만하고 정확한 정도',
    '저작권': '글, 그림, 음악 등을 만든 사람이 자기 작품에 대해 가지는 권리',
    '청구기호': '도서관에서 책이 꽂힌 자리를 알려 주는 숫자·글자 기호',
    '출처': '자료나 정보가 처음 나온 곳(지은이, 책 이름, 출판사 등)',
    '사실': '실제로 있었던 일이나 진짜인지 아닌지 확인할 수 있는 내용',
    '의견': '어떤 일에 대한 개인의 생각, 느낌, 주장',
    '일반화': '여러 사례에서 공통으로 찾아낸 언제나 통하는 원리나 문장',
    '규칙성': '일정한 기준에 따라 되풀이되거나 질서 있게 나타나는 성질',
    '맥락': '어떤 말이나 글이 쓰인 상황, 배경, 앞뒤 관계',
    '공동체': '같은 목적이나 생활 터전을 나누며 함께 살아가는 모임',
    '공감': '다른 사람의 마음이나 생각에 깊이 동감하며 함께 느끼는 것',
    '변화': '시간이 흐르면서 모습이나 상태, 성질이 달라지는 것',
    '책임': '자기가 맡은 일이나 선택의 결과를 끝까지 감당하는 태도',
    '존중': '다른 사람의 인격과 생각을 소중하게 여기는 태도',
    '효율성': '들인 시간과 노력에 비해 좋은 결과를 얻는 정도',
  };

  function buildVocabList(words, topic, concept1, concept2, grade) {
    const cands = uniq([concept1, concept2, ...words]).filter(Boolean).slice(0, 6);
    const out = [];
    const maxVocab = grade <= 2 ? 3 : 4;
    cands.forEach(w => {
      if (out.length >= maxVocab) return;
      const clean = String(w).trim();
      if (!clean) return;
      const def = VOCAB_DICT[clean]
        || (clean === topic ? `오늘 수업에서 중점적으로 탐구하는 중심 주제(${clean})`
          : `'${topic}'을(를) 깊이 이해할 때 꼭 알아야 하는 핵심 개념어`);
      out.push({ word: clean, meaning: def, example: `우리는 오늘 수업에서 ${josa(clean, '을')} 중심으로 새로운 사실을 알아보았다.` });
    });
    return out;
  }

  /* ---------------- 학년별(1~6학년) 적정 읽기 텍스트 분량 및 문장 수준 기준표 ---------------- */
  const GRADE_TEXT_SPECS = {
    1: {
      grade: 1,
      band: '1-2',
      levelTitle: '초등 1학년 (입문기 짧은 단문 중심)',
      targetCharsMin: 180,
      targetCharsMax: 250,
      targetRangeLabel: '공백 포함 약 180~250자 (짧은 2~3단락 · 5~6문장)',
      paragraphCountLabel: '짧은 3단락',
      sentenceStyle: '문장당 20~30자 내외의 짧은 단문과 친숙한 기초 어휘',
      estimatedReadTime: '약 2분 (소리 내어 읽기 적합)',
      aiPromptGuide: '초등 1학년 아이들이 부담 없이 소리 내어 읽을 수 있도록 아주 짧은 3개의 단락(전체 글자 수 공백 포함 180~240자 이내, 각 단락은 2문장씩 짧은 단문)으로 작성하세요.',
    },
    2: {
      grade: 2,
      band: '1-2',
      levelTitle: '초등 2학년 (기초 읽기 짧은 단락)',
      targetCharsMin: 270,
      targetCharsMax: 360,
      targetRangeLabel: '공백 포함 약 270~360자 (짧은 3단락 · 7~8문장)',
      paragraphCountLabel: '짧은 3단락',
      sentenceStyle: '일상 경험과 연결된 친근한 문장 (단락당 2~3문장)',
      estimatedReadTime: '약 2~3분',
      aiPromptGuide: '초등 2학년 눈높이에 맞춰 짧은 3개의 단락(전체 글자 수 공백 포함 270~350자 내외, 각 단락은 2~3문장)으로 쉽고 친근하게 작성하세요.',
    },
    3: {
      grade: 3,
      band: '3-4',
      levelTitle: '초등 3학년 (문단 중심 생각 파악기)',
      targetCharsMin: 460,
      targetCharsMax: 580,
      targetRangeLabel: '공백 포함 약 460~580자 (4단락 · 9~11문장)',
      paragraphCountLabel: '4단락',
      sentenceStyle: '중심 문장과 뒷받침 문장이 뚜렷한 기본 문단 구조',
      estimatedReadTime: '약 3~4분',
      aiPromptGuide: '초등 3학년 수준에 맞춰 중심 문장과 뒷받침 문장이 분명한 4개의 단락(전체 글자 수 공백 포함 460~560자 내외, 단락당 2~3문장)으로 작성하세요.',
    },
    4: {
      grade: 4,
      band: '3-4',
      levelTitle: '초등 4학년 (사실·의견 및 사례 탐구기)',
      targetCharsMin: 620,
      targetCharsMax: 760,
      targetRangeLabel: '공백 포함 약 620~760자 (4단락 · 12~14문장)',
      paragraphCountLabel: '4단락',
      sentenceStyle: '구체적 사례와 사실·의견이 조화된 중학년 표준 설명·논설 구조',
      estimatedReadTime: '약 4~5분',
      aiPromptGuide: '초등 4학년 수준에 맞춰 구체적 사례와 사실·의견이 잘 드러나는 4개의 단락(전체 글자 수 공백 포함 620~750자 내외, 단락당 3~4문장)으로 작성하세요.',
    },
    5: {
      grade: 5,
      band: '5-6',
      levelTitle: '초등 5학년 (개념 분석 및 다각적 읽기)',
      targetCharsMin: 880,
      targetCharsMax: 1050,
      targetRangeLabel: '공백 포함 약 880~1,050자 (5단락 · 15~18문장)',
      paragraphCountLabel: '5단락',
      sentenceStyle: '인과·비교 분석, 객관적 근거 제시, 비판적 질문이 포함된 고학년 심화 글',
      estimatedReadTime: '약 5~6분',
      aiPromptGuide: '초등 5학년 고학년 수준에 맞춰 깊이 있는 탐구가 가능하도록 5개의 단락(전체 글자 수 공백 포함 880~1,020자 내외, 단락당 3~4문장)으로 풍부한 사례와 근거를 담아 작성하세요.',
    },
    6: {
      grade: 6,
      band: '5-6',
      levelTitle: '초등 6학년 (심층 개념·비판적 종합 장문)',
      targetCharsMin: 1080,
      targetCharsMax: 1320,
      targetRangeLabel: '공백 포함 약 1,080~1,320자 (5~6단락 · 18~22문장)',
      paragraphCountLabel: '5~6단락 (장문)',
      sentenceStyle: '복합 개념 연결, 다원적 관점 비교, 정보 신뢰성 검증 및 일반화 원리를 담은 장문 텍스트',
      estimatedReadTime: '약 6~7분',
      aiPromptGuide: '초등 6학년 최고학년 수준에 맞춰 심층적인 독해와 토론이 가능하도록 5~6개의 충실한 단락(전체 글자 수 공백 포함 1,100~1,280자 내외, 단락당 3~4문장)으로 깊이 있는 장문 텍스트를 작성하세요.',
    },
  };

  function computeReadingTextStats(paragraphs, grade) {
    const g = +grade || 4;
    const spec = GRADE_TEXT_SPECS[g] || GRADE_TEXT_SPECS[4];
    const cleanParas = (paragraphs || []).map(p => String(p || '').replace(/^[❶❷❸❹❺❻❼❽❾❿]\s*/, '').trim());
    const joinedWithSpaces = cleanParas.join(' ');
    const joinedNoSpaces = joinedWithSpaces.replace(/\s+/g, '');
    const sentCount = sentences(joinedWithSpaces).length;
    return {
      grade: g,
      charCountWithSpaces: joinedWithSpaces.length,
      charCountNoSpaces: joinedNoSpaces.length,
      paragraphCount: cleanParas.length,
      sentenceCount: sentCount,
      levelTitle: spec.levelTitle,
      targetRangeLabel: spec.targetRangeLabel,
      sentenceStyle: spec.sentenceStyle,
      estimatedReadTime: spec.estimatedReadTime,
      targetCharsMin: spec.targetCharsMin,
      targetCharsMax: spec.targetCharsMax,
    };
  }

  /* ---------------- 학년별(1~6학년)·장르별 맞춤형 수업용 텍스트 생성 ---------------- */
  function generateReadingText(kb, state) {
    const grade = +state.grade || 4;
    const band = gradeBandOf(grade);
    const spec = GRADE_TEXT_SPECS[grade] || GRADE_TEXT_SPECS[4];
    const subj = state.subjectKey ? kb.subjectByKey[state.subjectKey] : null;
    const area = subj && state.areaId ? subj.areas.find(a => a.id === state.areaId) : (subj ? subj.areas[0] : null);
    const libStd = (kb.library.standards || []).find(s => s.code === state.libStdCode) || (kb.library.standards || [])[0];
    const frame = suggestConceptualFrame(kb, state);

    const topic = state.topic || frame.topic;
    const concept1 = state.concept1 || frame.concept1;
    const concept2 = state.concept2 || frame.concept2;
    const genre = state.genre || 'expository';
    const subjName = state.track === 'C' ? '도서관과 정보생활' : (subj ? subj.short : '초등 탐구');
    const areaName = state.track === 'C' ? (libStd ? libStd.areaName : '정보탐색과 도서관') : (area ? area.name : '핵심 탐구');
    const kList = (state.knowledge && state.knowledge.length ? state.knowledge : (area ? area.knowledge : [])).slice(0, 3);
    const k1 = kList[0] || topic;
    const k2 = kList[1] || concept1;
    const k3 = kList[2] || concept2;
    const kdcList = recommendKDC(state.subjectKey || 'korean', areaName, `${topic} ${k1} ${k2}`);
    const mainKdc = kdcList[0] || { code: '000', name: '총류', sub: '' };

    // 교사가 직접 입력한 사용자 지정 본문이 있는 경우: 본문 분석 후 메타데이터 구성
    if (state.customText && state.customText.trim().length > 20) {
      const rawParas = state.customText.trim().split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
      const sents = sentences(state.customText);
      const kw = keywords(state.customText, 6, [topic, concept1, concept2, k1, k2]);
      const facts = sents.filter(s => /(이다|있다|된다|나타난다|이루어진다|포함한다|사용한다|나뉜다|밝혀졌다)/.test(s)).slice(0, 2);
      const opinions = sents.filter(s => /(해야 한다|중요하다|생각한다|바람직하다|필요하다|좋다|아름답다|소중하다)/.test(s)).slice(0, 2);
      const finalParas = rawParas.length ? rawParas : [state.customText.trim()];
      return {
        isCustom: true,
        grade,
        title: state.customTextTitle || `[탐구 읽기 자료] ${topic}`,
        subtitle: `${grade}학년 · ${subjName} (${areaName}) 맞춤 읽기 자료`,
        genre,
        genreName: (TEXT_GENRES.find(g => g.id === genre) || TEXT_GENRES[0]).name,
        gradeBand: band,
        paragraphs: finalParas,
        stats: computeReadingTextStats(finalParas, grade),
        vocab: buildVocabList(kw, topic, concept1, concept2, grade),
        factSentences: facts.length ? facts : [sents[0] || `${josa(topic, '은')} 여러 요소가 연결되어 나타나는 현상이다.`, sents[1] || `${josa(k1, '은')} 구체적인 사례를 통해 관찰할 수 있다.`],
        opinionSentences: opinions.length ? opinions : [`우리는 ${josa(topic, '을')} 더욱 소중하게 여기고 바르게 실천해야 한다.`, `${josa(concept1, '을')} 지키는 일은 우리 모두에게 가장 중요한 과제라고 생각한다.`],
        source: {
          kdcCode: mainKdc.code,
          kdcName: mainKdc.name,
          kdcSub: mainKdc.sub || '',
          searchQuery: topic,
        },
        questions: {
          factual: `글에서 설명하는 '${topic}'의 핵심 특징이나 주요 내용은 무엇인가요?`,
          inferential: `글의 내용을 바탕으로 볼 때, '${concept1}'과(와) '${concept2}'은(는) 어떤 관계가 있나요?`,
          critical: `글쓴이의 생각에 동의하나요? 오늘 읽은 내용을 우리 생활에 어떻게 적용할 수 있을지 써 보세요.`,
        },
        keywords: kw.length ? kw : [topic, concept1, concept2, k1],
      };
    }

    // 자동 생성 모드: 1학년 ~ 6학년 각 학년별 적정 글자 수와 문단 호흡에 맞춘 맞춤형 생성
    let title = '';
    let paragraphs = [];
    let factSentences = [];
    let opinionSentences = [];

    if (grade === 1) {
      // [1학년] 공백 포함 약 190~230자 · 짧은 3단락 (단락당 2문장, 아주 쉽고 짧은 단문)
      if (genre === 'fiction') {
        title = `짝꿍과 함께 찾은 '${topic}'`;
        paragraphs = [
          `❶ 교실에서 민수와 지우가 '${topic}' 그림책을 봅니다. 책 속에는 '${k1}'과(와) '${k2}' 그림이 가득합니다.`,
          `❷ 선생님이 환하게 웃으며 말씀하십니다. "${josa(topic, '은')} 서로 사이좋게 '${concept1}'을(를) 이루는 거란다."`,
          `❸ 우리도 날마다 '${concept2}'을(를) 소중히 지켜야 합니다. 친구와 함께 즐겁게 실천해 봅시다.`,
        ];
      } else {
        title = `우리 주변의 '${topic}' 살펴보기`;
        paragraphs = [
          `❶ 학교와 집에서 '${topic}'을(를) 찾아볼까요? 우리 주변에는 '${k1}'과(와) '${k2}'의 모습이 참 많습니다.`,
          `❷ ${josa(topic, '은')} 서로 도우며 '${concept1}'을(를) 만듭니다. 하나가 바뀌면 다른 것도 함께 달라집니다.`,
          `❸ 덕분에 우리의 '${concept2}'이(가) 더욱 즐겁고 안전해집니다. 우리 모두 '${topic}'을(를) 아끼고 사랑해야 합니다.`,
        ];
      }
      factSentences = [
        `우리 주변에는 '${k1}'과(와) '${k2}'의 모습이 있습니다.`,
        `${josa(topic, '은')} 서로 도우며 '${concept1}'을(를) 만듭니다.`,
      ];
      opinionSentences = [
        `우리도 날마다 '${concept2}'을(를) 소중히 지켜야 합니다.`,
        `우리 모두 '${topic}'을(를) 아끼고 사랑해야 합니다.`,
      ];
    } else if (grade === 2) {
      // [2학년] 공백 포함 약 280~340자 · 짧은 3단락 (단락당 2~3문장, 친근한 어휘)
      if (genre === 'fiction') {
        title = `도란도란 교실에서 찾은 '${topic}' 보물`;
        paragraphs = [
          `❶ 아침 햇살이 비치는 2학년 교실에서 민수와 지우는 '${topic}'에 대해 이야기를 나누었습니다. "선생님, ${josa(topic, '이')} 왜 우리에게 중요해요?" 선생님은 그림책 한 권을 펼쳐 보여 주셨습니다.`,
          `❷ 그림책 속에는 '${k1}'과(와) '${k2}'의 모습이 알기 쉽게 그려져 있었습니다. 작은 부분들이 서로 이어져 '${concept1}'을(를) 이루고 있다는 것도 알게 되었습니다.`,
          `❸ 지우는 손뼉을 치며 말했습니다. "${josa(concept1, '을')} 잘 지키면 우리 모두에게 좋은 '${concept2}'이(가) 생기는군요!" 우리도 오늘부터 생활 속에서 ${josa(topic, '을')} 즐겁게 실천해야 한다고 생각합니다.`,
        ];
      } else {
        title = `궁금해요! 우리 생활 속 '${topic}'`;
        paragraphs = [
          `❶ 여러분은 학교나 마을에서 '${topic}'을(를) 본 적이 있나요? 주변을 자세히 살펴보면 ${josa(k1, '와')} ${josa(k2, '이')} 함께 어우러진 모습을 쉽게 찾을 수 있습니다.`,
          `❷ ${josa(topic, '은')} 여러 가지 모습이 서로 이어져 '${concept1}'을(를) 이루는 특징이 있습니다. 예를 들어 ${josa(k1, '이')} 달라지면 연결된 ${josa(k2, '도')} 따라서 변하게 됩니다.`,
          `❸ 이처럼 ${josa(concept1, '와')} ${josa(concept2, '은')} 우리 생활을 안전하고 행복하게 만들어 줍니다. 그러므로 우리는 날마다 주변의 ${josa(topic, '에')} 관심을 가지고 소중히 여기는 마음을 가져야 합니다.`,
        ];
      }
      factSentences = [
        `${josa(topic, '은')} 여러 가지 모습이 서로 이어져 '${concept1}'을(를) 이루는 특징이 있습니다.`,
        `주변을 살펴보면 ${josa(k1, '와')} ${josa(k2, '이')} 함께 어우러진 모습을 찾을 수 있습니다.`,
      ];
      opinionSentences = [
        `우리는 날마다 주변의 ${josa(topic, '에')} 관심을 가지고 소중히 여기는 마음을 가져야 합니다.`,
        `오늘부터 생활 속에서 ${josa(topic, '을')} 즐겁게 실천해야 한다고 생각합니다.`,
      ];
    } else if (grade === 3) {
      // [3학년] 공백 포함 약 480~560자 · 4단락 (중심 문장과 뒷받침 문장이 명확한 구성)
      if (genre === 'fiction') {
        title = `호기심 탐정단과 '${topic}' 수첩`;
        paragraphs = [
          `❶ 3학년 하윤이는 ${subjName} 시간에 '${topic}'이라는 말을 듣고 궁금증이 생겼습니다. "왜 '${k1}'과(와) '${k2}'이(가) 함께 나오는 걸까?" 하윤이는 짝꿍과 함께 해답을 찾아보기로 했습니다.`,
          `❷ 두 친구는 도서관(KDC ${mainKdc.code} ${mainKdc.name})에서 관련 자료를 찾아 읽었습니다. 책에는 ${josa(k1, '와')} ${josa(k2, '이')} 서로 영향을 주고받으며 '${concept1}'을(를) 이룬다는 사실이 사진과 함께 설명되어 있었습니다.`,
          `❸ 하윤이는 중요한 문장에 밑줄을 그으며 수첩에 정리했습니다. 작은 규칙과 원리가 모여 우리 생활 속의 '${concept2}'을(를) 만든다는 점을 깨닫자 고개가 절로 끄덕여졌습니다.`,
          `❹ 교실로 돌아온 하윤이는 친구들에게 알게 된 점을 발표했습니다. "${josa(topic, '을')} 바르게 알고 지키는 일은 우리 반 모두가 함께 실천해야 할 소중한 약속이라고 생각합니다."`,
        ];
      } else if (genre === 'compare') {
        title = `비교하며 알아보는 '${k1}'과(와) '${k2}'`;
        paragraphs = [
          `❶ ${subjName} '${areaName}' 단원에서 배우는 중심 주제는 '${topic}'입니다. ${josa(topic, '을')} 잘 이해하려면 '${k1}'과(와) '${k2}'의 같은 점과 다른 점을 비교해 보는 것이 좋습니다.`,
          `❷ 먼저 두 가지의 같은 점을 알아봅시다. ${josa(k1, '와')} ${josa(k2, '은')} 모두 우리 생활에서 '${concept1}'이라는 원리로 이어져 있습니다. 또한 주변 상황에 따라 '${concept2}'의 모습이 달라진다는 점도 닮았습니다.`,
          `❸ 반면에 다른 점도 분명합니다. '${k1}'은(는) 기본 개념과 특징을 알아보는 데 중요하고, '${k2}'은(는) 실제 생활 속에서 직접 실천하고 활용하는 데 더 자주 쓰입니다.`,
          `❹ 이처럼 같은 점과 다른 점을 나누어 살펴보면 ${josa(topic, '을')} 훨씬 정확하게 이해할 수 있습니다. 앞으로도 여러 대상을 비교하며 스스로 생각하는 습관을 길러야 합니다.`,
        ];
      } else {
        title = `차근차근 알아보는 '${topic}' 이야기`;
        paragraphs = [
          `❶ 우리 주변에는 서로 보이지 않는 고리로 연결된 것들이 많습니다. ${subjName} '${areaName}' 단원에서 공부하는 '${topic}'도 그중 하나입니다. ${josa(topic, '은')} '${k1}'과(와) '${k2}'이(가) 함께 어우러져 나타나는 중요한 현상입니다.`,
          `❷ ${josa(topic, '의')} 첫 번째 특징은 '${concept1}'입니다. 여러 요소가 따로 떨어진 것처럼 보여도 실제로는 서로 도우며 영향을 주고받습니다. 그래서 ${josa(k1, '이')} 변하면 ${josa(k2, '의')} 모습도 함께 달라집니다.`,
          `❸ 두 번째 특징은 이 과정이 '${concept2}'(으)로 이어진다는 점입니다. 여러 자료를 살펴보면 생활 속 작은 실천들이 모여 긍정적인 '${concept2}'을(를) 만들어 낸 사실을 확인할 수 있습니다.`,
          `❹ 이처럼 ${josa(topic, '의')} 원리를 알면 우리 주변의 모습을 더 깊이 이해할 수 있습니다. 배운 내용을 바탕으로 일상생활에서 '${topic}'을(를) 바르게 실천하는 태도를 가져야 한다고 생각합니다.`,
        ];
      }
      factSentences = [
        `${josa(topic, '은')} '${k1}'과(와) '${k2}'이(가) 서로 영향을 주고받으며 나타나는 현상입니다.`,
        `${josa(k1, '이')} 변하면 그와 연결된 ${josa(k2, '의')} 모습도 함께 달라집니다.`,
      ];
      opinionSentences = [
        `일상생활에서 '${topic}'을(를) 바르게 실천하는 태도를 가져야 한다고 생각합니다.`,
        `${josa(topic, '을')} 바르게 알고 지키는 일은 우리 모두가 함께 실천해야 할 소중한 약속입니다.`,
      ];
    } else if (grade === 4) {
      // [4학년] 공백 포함 약 640~750자 · 4단락 (구체적 사례와 사실·의견 대조)
      if (genre === 'fiction') {
        title = `도서관 탐정단과 '${topic}'의 비밀 노트`;
        paragraphs = [
          `❶ 4학년 하윤이와 도윤이는 ${subjName} 시간에 '${topic}'이라는 주제를 만나고 고개를 갸웃거렸습니다. "평소 자주 듣던 말인데, 왜 '${k1}'과(와) '${k2}'이(가) 서로 연결되는 걸까?" 두 친구는 스스로 답을 찾아보기 위해 쉬는 시간에 학교도서관으로 향했습니다.`,
          `❷ 사서 선생님은 한국십진분류표(KDC) ${mainKdc.code}번대(${mainKdc.name}) 서가를 안내해 주셨습니다. 서가에서 찾은 지식 도서에는 '${topic}'의 다양한 실제 사례가 자세히 적혀 있었습니다. 특히 ${josa(k1, '와')} ${josa(k2, '이')} 서로 긴밀하게 영향을 주고받으며 '${concept1}'을(를) 만들어 낸다는 객관적 사실이 사진과 도표로 분명하게 설명되어 있었습니다.`,
          `❸ 두 친구는 책에서 읽은 내용 가운데 실제로 확인할 수 있는 '사실'과 글쓴이의 생각인 '의견'을 나누어 탐구 노트에 적었습니다. 만약 한쪽의 규칙이나 균형이 무너지면 우리 삶의 '${concept2}'에도 큰 변화가 생긴다는 점을 알게 되자, 평소 무심코 지나쳤던 주변 환경이 새롭게 보이기 시작했습니다.`,
          `❹ 교실로 돌아온 하윤이는 모둠 친구들에게 참고한 자료의 출처를 정확히 밝히며 조사한 내용을 발표했습니다. "${josa(topic, '을')} 바르게 이해하고 지키는 일은 우리 반과 마을 공동체 모두가 가장 먼저 실천해야 할 소중한 약속이라고 생각합니다."`,
        ];
      } else if (genre === 'compare') {
        title = `비교하며 알아보는 '${k1}'과(와) '${k2}' — ${topic}의 두 얼굴`;
        paragraphs = [
          `❶ 우리가 ${subjName}의 '${areaName}' 단원을 공부할 때 꼭 만나게 되는 중심 주제가 바로 '${topic}'입니다. ${josa(topic, '을')} 한쪽으로 치우치지 않고 깊이 이해하려면, 그 안에 담긴 핵심 요소인 '${k1}'과(와) '${k2}'의 공통점과 차이점을 나란히 비교해 보는 과정이 필요합니다.`,
          `❷ 먼저 두 가지의 공통점을 살펴봅시다. ${josa(k1, '와')} ${josa(k2, '은')} 모두 우리 삶 속에서 '${concept1}'이라는 공통된 원리로 작동합니다. 또한 사람들의 선택이나 주변 환경 조건에 따라 '${concept2}'의 모습이 다양하게 달라진다는 점에서도 서로 닮아 있습니다.`,
          `❸ 반면에 뚜렷한 차이점도 존재합니다. '${k1}'은(는) 대상의 기본적인 구조와 작동 원리를 정확히 파악하는 데 초점을 두지만, '${k2}'은(는) 실제 생활 속 문제 상황에 적용하고 해결책을 찾는 과정에서 더 중요하게 다루어집니다. 도서관(KDC ${mainKdc.code} ${mainKdc.name})에서 여러 자료를 찾아 비교해 보면 이러한 차이를 객관적인 사실로 확인할 수 있습니다.`,
          `❹ 이처럼 공통점과 차이점을 함께 분석하면 ${josa(topic, '의')} 전체 구조를 균형 있게 바라볼 수 있습니다. 앞으로 새로운 주제를 만날 때에도 두 대상을 체계적으로 비교하며 스스로 판단하는 탐구 습관을 기르는 것이 바람직합니다.`,
        ];
      } else if (genre === 'cause') {
        title = `왜 그런 일이 일어날까? '${topic}'의 원인과 결과`;
        paragraphs = [
          `❶ 우리 생활 주변에서는 '${topic}'과(와) 관련된 다양한 변화가 끊임없이 일어납니다. 어떤 현상이 일어날 때는 우연히 생기는 법이 없으며, 반드시 그 바탕이 되는 '원인'과 그에 따라 나타나는 '결과'가 사슬처럼 이어져 있습니다.`,
          `❷ 가장 중요한 원인은 '${k1}'의 변화에서 시작됩니다. ${josa(k1, '의')} 조건이 달라지면 그와 연결된 '${k2}'에 직접적인 영향을 미치며, 이는 곧바로 '${concept1}'의 변화로 이어집니다. 실제로 여러 관찰 기록과 조사 자료에서도 이러한 인과관계가 일관되게 확인됩니다.`,
          `❸ 그 결과 우리 주변에는 '${concept2}'이라는 새로운 현상이 나타나게 됩니다. 작은 원인이 처음에는 눈에 잘 띄지 않더라도, 시간이 흐르면서 연결 고리를 따라 우리 생활 전체의 모습을 크게 바꾸어 놓는 것입니다.`,
          `❹ 원인을 정확히 알면 문제의 결과도 슬기롭게 예방하거나 더 나은 방향으로 바꿀 수 있습니다. 따라서 우리는 겉으로 드러난 현상만 보지 말고, '${topic}' 속에 숨어 있는 원인과 결과를 끝까지 탐구하는 태도를 가져야 합니다.`,
        ];
      } else if (genre === 'argument') {
        title = `[주장하는 글] '${topic}'을(를) 바르게 알고 함께 실천합시다`;
        paragraphs = [
          `❶ 오늘날 우리 학교와 지역 사회에서 '${topic}'의 중요성이 날마다 커지고 있습니다. 하지만 아직도 많은 사람들이 그 의미를 정확히 알지 못해 어려움을 겪거나 갈등을 빚기도 합니다. 저는 우리 모두가 '${topic}'의 원리를 바르게 이해하고 생활 속에서 적극적으로 실천해야 한다고 주장합니다.`,
          `❷ 첫째, ${josa(topic, '은')} '${k1}'과(와) '${k2}'을(를) 건강하게 이어 주는 핵심 고리이기 때문입니다. 관련 연구와 도서관 자료(KDC ${mainKdc.code} ${mainKdc.name})에 따르면, 기본 원리인 '${concept1}'이(가) 잘 지켜질 때 문제가 줄어들고 안전하고 조화로운 공동체 환경이 만들어집니다.`,
          `❸ 둘째, 오늘의 작은 실천이 내일의 긍정적인 '${concept2}'을(를) 만들기 때문입니다. 만약 우리가 당장 편하다는 이유로 기본 규칙과 원리를 외면한다면, 결국 그 불편함과 피해는 우리 모두에게 되돌아오게 됩니다.`,
          `❹ 아는 것에서 그치지 않고 행동으로 옮길 때 진짜 배움이 완성됩니다. 사실에 기반한 정확한 근거를 바탕으로 '${topic}'을(를) 바르게 실천하는 성숙한 어린이 시민이 됩시다.`,
        ];
      } else if (genre === 'news') {
        title = `[어린이 탐구 신문] "${topic}, 알고 보면 우리 생활의 핵심 열쇠!"`;
        paragraphs = [
          `❶ 【학교도서관=어린이 기자단】 이번 주 4학년 교실과 학교도서관에서는 '${topic}'을(를) 주제로 한 열띤 탐구 수업이 펼쳐졌다. 학생들은 ${subjName} '${areaName}' 단원과 연계하여 평소 궁금했던 질문을 스스로 만들고 다양한 자료를 통해 해답을 찾아 나섰다.`,
          `❷ 취재 결과, ${josa(topic, '은')} '${k1}' 및 '${k2}'과(와) 밀접하게 연결되어 작동한다는 사실이 확인되었다. 특히 여러 사례를 비교 조사한 학생들은 "겉모습은 서로 달라 보여도 그 안에는 '${concept1}'이라는 공통된 원리가 숨어 있었다"고 입을 모았다.`,
          `❸ 관련 분야 전문가는 인터뷰에서 "${josa(concept1, '이')} 어떻게 작동하는지 이해하면 우리 주변의 '${concept2}' 현상을 스스로 설명하고 문제도 합리적으로 해결할 수 있습니다"라고 강조했다. 또한 자료를 읽을 때는 반드시 사실과 의견을 구분하고 출처를 확인해야 한다고 조언했다.`,
          `❹ 탐구에 참여한 학생들은 앞으로도 다양한 도서와 신뢰할 수 있는 자료를 활용해 '${topic}'을(를) 생활 속에서 꾸준히 실천하겠다는 다짐을 밝혔다. 작은 호기심에서 시작된 교실 속 탐구가 어떤 긍정적인 변화를 만들어 낼지 기대된다.`,
        ];
      } else {
        title = `핵심 개념으로 읽는 '${topic}' 이야기`;
        paragraphs = [
          `❶ 우리가 살아가는 세상에는 서로 보이지 않는 끈으로 연결된 것들이 많습니다. ${subjName} '${areaName}' 단원에서 배우는 '${topic}'도 바로 그러한 예입니다. ${josa(topic, '이란')} '${k1}'과(와) '${k2}' 등 여러 요소가 어우러져 나타나는 중요한 현상이자 원리입니다.`,
          `❷ ${josa(topic, '의')} 첫 번째 특징은 '${concept1}'입니다. 각각의 요소가 따로 떨어져 있는 것처럼 보여도 실제로는 서로 긴밀하게 영향을 주고받습니다. 예를 들어 ${josa(k1, '의')} 조건이 달라지면 그와 연결된 ${josa(k2, '의')} 모습도 함께 달라집니다.`,
          `❸ 두 번째 특징은 이러한 과정이 '${concept2}'(으)로 이어진다는 점입니다. 학교도서관(KDC ${mainKdc.code} ${mainKdc.name})의 지식 도서들을 살펴보면, 다양한 시대와 장소에서 ${josa(concept1, '이')} 어떻게 '${concept2}'을(를) 만들어 냈는지 풍부한 사실 자료로 확인할 수 있습니다.`,
          `❹ 결국 ${josa(topic, '을')} 배운다는 것은 단순한 낱말을 외우는 것이 아니라, 세상을 움직이는 원리를 깨닫는 일입니다. 우리는 정확한 정보를 바탕으로 '${topic}'을(를) 깊이 이해하고 일상생활에서 지혜롭게 활용해야 한다고 생각합니다.`,
        ];
      }
      factSentences = [
        `${josa(topic, '은')} '${k1}'과(와) '${k2}' 등 여러 요소가 서로 영향을 주고받으며 나타나는 현상입니다.`,
        `한국십진분류표(KDC) ${mainKdc.code}번대(${mainKdc.name}) 자료에서 '${topic}'의 실제 사례와 원리를 확인할 수 있습니다.`,
      ];
      opinionSentences = [
        `우리는 정확한 정보를 바탕으로 '${topic}'을(를) 깊이 이해하고 일상생활에서 지혜롭게 활용해야 한다고 생각합니다.`,
        `${josa(topic, '을')} 바르게 실천하는 태도는 우리 공동체 모두에게 가장 중요한 약속입니다.`,
      ];
    } else if (grade === 5) {
      // [5학년] 공백 포함 약 880~1,020자 · 5단락 (도입-구조원리-심층사례-정보비판-일반화결론의 5단 구성)
      title = genre === 'argument'
        ? `[비판적 논설문] 지속가능한 공동체를 위한 '${topic}'의 원리와 실천`
        : genre === 'compare'
          ? `[비교·분석 글] '${k1}'과(와) '${k2}'의 비교를 통해 탐구한 ${topic}`
          : `[5학년 심화 탐구] '${concept1}'과(와) '${concept2}'로 분석하는 ${topic}`;
      paragraphs = [
        `❶ 오늘날 우리가 살아가는 사회와 자연환경은 수많은 요소가 그물처럼 얽혀 빠르게 변화하고 있습니다. ${subjName} '${areaName}' 단원의 핵심 주제인 '${topic}' 또한 단편적인 지식 암기만으로는 그 본질을 온전히 이해하기 어렵습니다. 겉으로 드러난 현상 너머에서 작동하는 '${concept1}'과(와) '${concept2}'이라는 두 가지 핵심 개념의 눈으로 살펴볼 때, 비로소 전체 구조와 흐름이 또렷하게 보이기 시작합니다.`,
        `❷ 먼저 '${topic}'을(를) 이루는 핵심 축인 '${k1}'과(와) '${k2}'의 구조적 관계를 살펴봅시다. 이 두 요소는 각각 독립적으로 존재하는 것처럼 보이지만, 실제로는 한쪽의 변화가 다른 쪽의 성질과 방향을 결정짓는 상호의존적 관계를 맺고 있습니다. 역사적 사례나 과학적 관찰 기록을 분석해 보면, '${k1}'의 조건이 변화할 때마다 '${k2}'의 양상이 연쇄적으로 달라지며 새로운 '${concept1}'의 질서가 형성된다는 사실을 확인할 수 있습니다.`,
        `❸ 더 나아가 이러한 변화는 우리 삶과 공동체의 '${k3}'에도 직접적인 파급 효과를 미칩니다. 예를 들어 기본 원리인 '${concept1}'이(가) 안정적으로 유지될 때는 시스템 전체가 조화로운 '${concept2}'을(를) 이루지만, 반대로 어느 한 요소가 과도하게 치우치거나 단절되면 예상하지 못한 갈등이나 불균형이 발생하게 됩니다. 이는 교실 속 작은 규칙부터 사회와 자연의 거대한 시스템에 이르기까지 공통으로 적용되는 원리입니다.`,
        `❹ 따라서 '${topic}'과(와) 관련된 문제를 합리적으로 탐구하기 위해서는 ${state.track === 'B' ? '교과서와 다양한 통계·사례 자료' : `학교도서관(KDC ${mainKdc.code} ${mainKdc.name})의 전문 도서와 공신력 있는 통계 자료`}를 다각도로 비교·검토해야 합니다. 특히 매체나 글 속에 담긴 객관적 '사실'과 작성자의 주관적 '의견'을 엄격히 구분하고, 해당 정보가 정확한 출처에 근거하고 있는지 비판적으로 따져 보는 태도가 무엇보다 중요합니다.`,
        `❹~❺ 이러한 탐구 과정을 종합하면 "${frame.generalization}"라는 보편적인 원리에 도달하게 됩니다. 아는 것에 머무르지 않고 오늘 발견한 개념적 원리를 우리 학교와 지역의 실제 문제 해결에 주체적으로 적용하고 실천하는 자세가 필요하다고 생각합니다.`,
      ];
      paragraphs[4] = paragraphs[4].replace(/^❹~❺/, '❺');
      factSentences = [
        `'${k1}'과(와) '${k2}'은(는) 한쪽의 변화가 다른 쪽에 연쇄적인 영향을 미치는 상호의존적 관계를 맺고 있습니다.`,
        `다양한 통계와 사례 자료를 교차 검증하면 '${concept1}'에 따라 '${concept2}'의 양상이 달라진다는 사실을 확인할 수 있습니다.`,
      ];
      opinionSentences = [
        `매체나 자료를 읽을 때는 객관적 사실과 주관적 의견을 구분하고 출처의 신뢰성을 비판적으로 검토해야 합니다.`,
        `오늘 발견한 개념적 원리를 우리 학교와 지역의 실제 문제 해결에 주체적으로 적용하고 실천하는 자세가 필요하다고 생각합니다.`,
      ];
    } else {
      // [6학년] 공백 포함 약 1,120~1,280자 · 6단락 장문 (문제제기-개념구조-다중사례비교-반론및신뢰성검증-일반화원리-실천전이)
      title = genre === 'argument'
        ? `[6학년 심층 논설문] 복합 사회에서 '${topic}'을(를) 바라보는 비판적 시각과 책임 있는 대안`
        : genre === 'compare'
          ? `[6학년 심층 비교 지문] '${k1}'·'${k2}'·'${k3}'의 다층적 비교를 통한 ${topic}의 구조 분석`
          : `[6학년 심층 장문 텍스트] '${concept1}'과(와) '${concept2}'의 관점에서 재해석한 ${topic}와 우리의 미래`;
      paragraphs = [
        `❶ 현대 사회가 고도로 다원화되고 변화의 속도가 빨라지면서, 우리가 마주하는 수많은 현상들은 더 이상 한 가지 원인이나 단일한 시선만으로 설명하기 어려워졌습니다. ${subjName} '${areaName}' 단원의 핵심 탐구 주제인 '${topic}' 역시 마찬가지입니다. 표면적으로 드러나는 개별 사건이나 단편적 정보를 나열하는 수준을 넘어, 그 이면을 관통하는 핵심 개념인 '${concept1}'과(와) '${concept2}'의 상관관계를 입체적으로 파악해야만 현상의 본질에 다가갈 수 있습니다.`,
        `❷ 구체적으로 '${topic}'을(를) 구성하는 핵심 요소인 '${k1}'과(와) '${k2}'의 작동 원리를 분석해 봅시다. 두 요소는 단순히 나란히 놓인 개별 개념이 아니라, 끊임없이 에너지를 주고받거나 정보를 순환시키며 전체 체계를 유지하는 유기적 시스템을 이룹니다. 여러 학술 보고서와 실증 데이터를 살펴보면, '${k1}'의 내적 조건이 변화할 때 '${k2}'의 구조적 기능이 함께 재편되면서 거시적인 '${concept1}'의 흐름이 결정된다는 객관적 사실이 일관되게 입증됩니다.`,
        `❸ 또한 이러한 상호작용은 제3의 요소인 '${k3}'과(와) 결합할 때 더욱 복합적인 양상을 띱니다. 서로 다른 시대나 지역의 사례를 비교·대조해 보면, 동일한 '${k1}'의 변화라 할지라도 공동체가 어떤 기준과 가치를 선택하느냐에 따라 긍정적인 '${concept2}'(으)로 발전하기도 하고, 반대로 심각한 불균형과 갈등을 초래하기도 합니다. 즉, 결과를 결정짓는 핵심 변수는 구성 요소 간의 균형 잡힌 관계 설정에 달려 있습니다.`,
        `❹ 한편 '${topic}'을(를) 둘러싼 사회적 논의에서는 서로 다른 이해관계와 관점이 충돌하기도 합니다. 당장의 효율성이나 단기적 성과를 우선시하는 입장에서는 '${concept1}'의 절차를 간소화하자고 주장하기도 하지만, 이는 장기적인 지속가능성을 훼손할 위험이 큽니다. 따라서 우리는 ${state.track === 'B' ? '다양한 탐구 자료와 상반된 관점의 근거들' : `학교도서관(KDC ${mainKdc.code} ${mainKdc.name})의 전문 문헌과 공공 데이터`}를 교차 검증하며, 최신성·관련성·권위·정확성·목적(CRAAP 기준)에 따라 정보의 신뢰도를 엄밀하게 판별해야 합니다.`,
        `❺ 이처럼 다각적인 사실 분석과 비판적 검증을 거치면 "${frame.generalization}"라는 보편적인 일반화(Generalization) 문장을 도출할 수 있습니다. 이는 특정 단원의 한 가지 사례에만 머무는 지식이 아니라, 새로운 문제 상황을 만났을 때도 적용할 수 있는 영속적인 사고의 틀이 되어 줍니다.`,
        `❻ 진정한 배움은 교실 안에서 찾은 원리를 삶의 현장으로 전이(Transfer)할 때 완성됩니다. 우리는 '${topic}'에 담긴 '${concept1}'과(와) '${concept2}'의 가치를 깊이 성찰하고, 일상과 지구촌 공동체의 문제를 해결하는 데 책임감 있게 참여하는 성숙한 민주 시민으로 성장해야 한다고 생각합니다.`,
      ];
      factSentences = [
        `'${k1}'과(와) '${k2}'은(는) 서로 영향을 주고받으며 전체 체계를 유지하는 유기적 시스템을 이루고 있습니다.`,
        `서로 다른 사례와 실증 데이터를 교차 검증하면 구성 요소 간의 관계 설정에 따라 '${concept2}'의 결과가 달라진다는 사실을 확인할 수 있습니다.`,
      ];
      opinionSentences = [
        `정보를 수용할 때는 사실과 해석을 엄밀히 구분하고 신뢰성 평가 기준에 따라 비판적으로 검증해야 합니다.`,
        `우리는 '${topic}'에 담긴 원리를 성찰하고 공동체의 문제를 해결하는 데 책임감 있게 참여하는 시민으로 성장해야 한다고 생각합니다.`,
      ];
    }

    const kw = uniq([topic, concept1, concept2, k1, k2, k3]).filter(Boolean);

    // 실전 도메인 코퍼스 엔진(ReadingCorpus)이 로드된 경우 실제 내용 중심 읽기 지문(행성, 화산, 화석, 생태계, 주장과 근거, 한글, 문학, 미디어·KDC, 우리고장, 민주주의, 경제, 한국사 등)을 우선 적용
    let finalTitle = title;
    let finalParagraphs = paragraphs;
    let finalVocab = buildVocabList(kw, topic, concept1, concept2, grade);
    let finalFacts = factSentences;
    let finalOpinions = opinionSentences;
    let finalQuestions = {
      factual: `[사실 확인] 글에서 설명하는 '${topic}'의 핵심 특징과 '${k1}'·'${k2}'의 사례는 무엇인가요?`,
      inferential: `[개념 추론] 글의 내용을 바탕으로 볼 때, '${concept1}'과(와) '${concept2}'은(는) 서로 어떤 관계를 맺고 있나요?`,
      critical: `[비판·전이] 글쓴이의 생각에 동의하나요? 오늘 읽은 원리를 우리 학교나 마을의 실제 상황에 어떻게 적용할 수 있을지 제안해 보세요.`,
    };

    if (global.ReadingCorpus && typeof global.ReadingCorpus.buildDomainReadingPassage === 'function') {
      const domainPassage = global.ReadingCorpus.buildDomainReadingPassage(kb, state);
      if (domainPassage && Array.isArray(domainPassage.paragraphs) && domainPassage.paragraphs.length) {
        finalTitle = domainPassage.title || finalTitle;
        finalParagraphs = domainPassage.paragraphs;
        if (Array.isArray(domainPassage.vocab) && domainPassage.vocab.length) {
          finalVocab = domainPassage.vocab;
        }
        if (Array.isArray(domainPassage.factSentences) && domainPassage.factSentences.length) {
          finalFacts = domainPassage.factSentences;
        }
        if (Array.isArray(domainPassage.opinionSentences) && domainPassage.opinionSentences.length) {
          finalOpinions = domainPassage.opinionSentences;
        }
        if (domainPassage.questions && domainPassage.questions.factual) {
          finalQuestions = domainPassage.questions;
        }
      }
    }

    const baseText = {
      isCustom: false,
      isAiGenerated: false,
      grade,
      title: finalTitle,
      subtitle: `${grade}학년(${band}학년군) · ${subjName} (${areaName}) · ${(TEXT_GENRES.find(g => g.id === genre) || TEXT_GENRES[0]).name}`,
      genre,
      genreName: (TEXT_GENRES.find(g => g.id === genre) || TEXT_GENRES[0]).name,
      gradeBand: band,
      paragraphs: finalParagraphs,
      stats: computeReadingTextStats(finalParagraphs, grade),
      vocab: finalVocab,
      factSentences: finalFacts,
      opinionSentences: finalOpinions,
      source: {
        kdcCode: mainKdc.code,
        kdcName: mainKdc.name,
        kdcSub: mainKdc.sub || '',
        searchQuery: topic,
      },
      questions: finalQuestions,
      keywords: kw,
    };

    if (state.aiReadingText && Array.isArray(state.aiReadingText.paragraphs) && state.aiReadingText.paragraphs.length) {
      const ai = state.aiReadingText;
      baseText.isAiGenerated = true;
      baseText.title = ai.title || baseText.title;
      baseText.paragraphs = ai.paragraphs;
      baseText.stats = computeReadingTextStats(baseText.paragraphs, grade);
      if (Array.isArray(ai.vocab) && ai.vocab.length) baseText.vocab = ai.vocab;
      if (Array.isArray(ai.factSentences) && ai.factSentences.length) baseText.factSentences = ai.factSentences;
      if (Array.isArray(ai.opinionSentences) && ai.opinionSentences.length) baseText.opinionSentences = ai.opinionSentences;
      if (ai.questions) {
        baseText.questions = {
          factual: ai.questions.factual || baseText.questions.factual,
          inferential: ai.questions.inferential || baseText.questions.inferential,
          critical: ai.questions.critical || baseText.questions.critical,
        };
      }
    }

    return baseText;
  }

  /* ---------------- 전략 객체 조회 + 플레이스홀더 치환 ---------------- */
  function resolveStrategies(state, kb) {
    const rawIds = (state.selectedStrategies && state.selectedStrategies.length)
      ? state.selectedStrategies
      : global.Recommender.recommendStrategySet(kb, state);
    const list = uniq(rawIds).map(id => global.StrategyCatalog.byId[id]).filter(Boolean).slice(0, 3);
    if (!list.length) {
      const fallbackIds = global.Recommender.recommendStrategySet(kb, state);
      fallbackIds.forEach(id => {
        const s = global.StrategyCatalog.byId[id];
        if (s && list.length < 3) list.push(s);
      });
    }
    if (!list.length && global.StrategyCatalog.list[0]) {
      list.push(global.StrategyCatalog.list[0]);
    }
    return list;
  }

  function applyVarsToStrategy(strat, vars) {
    if (!strat) return { name: '', desc: '', prompts: [], act: '', steps: [] };
    return {
      ...strat,
      prompts: (strat.prompts || []).map(p => fill(p, vars)),
      act: fill(strat.act || '', vars),
      steps: (strat.steps || []).map(s => fill(s, vars)),
    };
  }

  /* =====================================================================
   *  지도안 생성 메인 함수 (Track A / Track B / Track C)
   * ===================================================================== */
  function generateLessonPlan(kb, state, readingText) {
    const grade = +state.grade || 4;
    const band = gradeBandOf(grade);
    const track = state.track || 'A';
    const subj = state.subjectKey ? kb.subjectByKey[state.subjectKey] : kb.subjects[0];
    const area = subj && state.areaId ? subj.areas.find(a => a.id === state.areaId) : (subj ? subj.areas[0] : null);

    // 1) 교과 성취기준: 협력수업(A) 및 교과교사 단독수업(B)에서만 제시 (사서교사 단독수업 C는 제외)
    const subjStds = (track === 'A' || track === 'B')
      ? global.Recommender.recommendSubjectStandards(kb, grade, subj, area, state.topic, state.knowledge, state.skills)
      : [];
    const subjStd = (track === 'A' || track === 'B')
      ? (subjStds.find(s => s.code === state.subjStdCode) || subjStds[0] || null)
      : null;

    // 2) 2022 도서관과 정보생활 성취기준: 협력수업(A) 및 사서교사 단독수업(C)에서만 제시 (교과교사 단독수업 B는 제외)
    const libStds = (track === 'A' || track === 'C')
      ? global.Recommender.recommendLibraryStandards(kb, grade, subj, area, state.topic, state.skills)
      : [];
    const libStd = (track === 'A' || track === 'C')
      ? ((kb.library.standards || []).find(s => s.code === state.libStdCode) || libStds[0] || (kb.library.standards || [])[0] || null)
      : null;
    const libArea = libStd
      ? (kb.library.areas.find(a => a.id === libStd.areaId) || kb.library.areas[0])
      : null;

    const frame = suggestConceptualFrame(kb, state);

    const topic = state.topic || frame.topic;
    const concept1 = state.concept1 || frame.concept1;
    const concept2 = state.concept2 || frame.concept2;
    const question = state.conceptualQ || frame.conceptualQ;
    const generalization = state.generalization || frame.generalization;
    const vars = { topic, concept: concept1, concept2, question, general: generalization };

    const kList = track === 'C'
      ? (libArea ? libArea.knowledge.filter(k => k.band === band).map(k => k.text) : [])
      : ((state.knowledge && state.knowledge.length) ? state.knowledge : (area ? area.knowledge.slice(0, 3) : []));
    const sList = track === 'C'
      ? (libArea ? libArea.skills.slice(0, 3) : [])
      : ((state.skills && state.skills.length) ? state.skills : (area ? area.skills.slice(0, 3) : []));
    const aList = (state.attitudes && state.attitudes.length)
      ? state.attitudes
      : (track === 'C'
        ? (libArea ? libArea.attitudes.slice(0, 2) : ['정보를 비판적으로 수용하는 태도', '타인의 저작권을 존중하는 태도'])
        : (track === 'B'
          ? (area && area.attitudes && area.attitudes.length ? area.attitudes : ['호기심을 가지고 주도적으로 탐구하는 태도', '배운 원리를 일상생활에 실천하는 태도'])
          : uniq([...((area && area.attitudes) || []), ...(libArea ? libArea.attitudes.slice(0, 1) : []), '상호 존중하며 협력적으로 소통하는 태도']).slice(0, 2)));

    const kdcList = (track === 'A' || track === 'C')
      ? recommendKDC(state.subjectKey || 'korean', area ? area.name : '', `${topic} ${kList.join(' ')}`)
      : [];
    const strats = resolveStrategies(state, kb).map(s => applyVarsToStrategy(s, vars));
    const stratCount = strats.length; // 1 ~ 3종
    const sIntro = strats[0];
    const sDev1 = strats[0];
    const sDev2 = stratCount >= 2 ? strats[1] : strats[0];
    const sWrap = stratCount >= 3 ? strats[2] : (stratCount === 2 ? strats[1] : strats[0]);

    const wsLabel = strat => {
      const idx = Math.max(0, strats.findIndex(x => x && strat && x.id === strat.id));
      const numCircle = ['①', '②', '③'][idx] || `${idx + 1}`;
      return `활동지 ${numCircle} (${strat.name})`;
    };
    const stratSummaryNames = uniq(strats.map(s => `【${s.name}】`)).join(' · ');
    const rubricStratNames = uniq(strats.map(s => s.name)).join(' · ');

    // 차시 학습목표 구성 (수업 형태별 성취기준 분리 반영)
    const mainSkill = sList[0] || '탐구하기';
    const objectives = [];
    if (track === 'A') {
      objectives.push(`[교과] ${subjStd ? subjStd.code + ' ' : ''}'${topic}'에 관한 다양한 사례를 통해 ${josa(concept1, '와')} ${josa(concept2, '의')} 관계를 ${canDo(mainSkill)}.`);
      objectives.push(`[도서관] ${libStd ? libStd.code + ' ' : ''}${stratSummaryNames} 전략과 도서관 자료를 활용하여 핵심 정보를 탐색·조직하고 출처를 바르게 표기할 수 있다.`);
    } else if (track === 'B') {
      objectives.push(`[교과 성취기준] ${subjStd ? subjStd.code + ' ' + subjStd.text : `'${topic}'의 사례를 탐구하여 '${generalization}'라는 일반화 원리를 설명할 수 있다.`}`);
      objectives.push(`[탐구·기능] ${stratSummaryNames} 전략을 활용하여 '${topic}'에 담긴 '${concept1}'·'${concept2}'의 원리를 ${canDo(mainSkill)}.`);
    } else {
      objectives.push(`[2022 도서관과 정보생활] ${libStd ? libStd.code + ' ' + libStd.text : '문제를 해결하기 위해 필요한 정보를 탐색하고 활용할 수 있다.'}`);
      objectives.push(`[과정·태도] ${stratSummaryNames} 전략으로 자료를 분석하고 저작권과 정보 윤리를 준수하며 표현할 수 있다.`);
    }

    /* ---------------- 트랙별 교수·학습 타임라인 구성 ---------------- */
    let timeline = [];
    let trackTitle = '';
    let trackBadge = '';
    let modelName = '';

    if (track === 'A') {
      trackTitle = '함께하는 협력수업 — 교과×사서교사 협력수업 (2열 코티칭 지도안)';
      trackBadge = '함께하는 협력수업 · 교과×사서교사 협력수업';
      modelName = '개념기반 탐구 + 학교도서관 정보활용 통합 모형 (40분)';
      timeline = [
        {
          phase: '도입',
          subPhase: '관계맺기 · 정보요구 정의',
          time: '8분',
          strategy: sIntro,
          subjectTeacher: [
            `• [동기유발] '${topic}' 관련 실생활 상황(사진·질문)을 제시하며 사전 경험을 깨운다.`,
            `• 발문: "${sIntro.prompts[0] || `${josa(topic, '을')} 본 경험이 있나요?`}"`,
            `• 핵심 개념(${concept1}, ${concept2})과 오늘의 탐구 질문("${question}")을 칠판에 제시한다.`,
          ],
          librarianTeacher: [
            `• [전략안내] 오늘 수업에서 활용할 ${stratSummaryNames} 활동 절차를 안내하고, 질문 해결에 필요한 정보의 종류를 함께 정의한다.`,
            `• 발문: "이 질문을 해결하려면 어떤 자료(KDC ${kdcList[0].code} ${kdcList[0].name} 서가, 수업 읽기 지문)를 찾아보아야 할까요?"`,
            `• ${libStd ? libStd.code : ''} 성취기준과 연계하여 도서관 탐색 규칙을 안내한다.`,
          ],
          studentActivity: [
            `• 실생활 사례를 떠올리며 오늘 해결할 탐구 질문과 핵심 개념을 확인한다.`,
            `• 모둠별로 찾아야 할 핵심 키워드와 활동 순서를 파악한다.`,
          ],
          materials: [`시청각 자극 자료`, `탐구 질문 판`],
          assessment: `사전 지식 활성화 및 탐구 질문의 적절성 관찰`,
        },
        {
          phase: '전개 1',
          subPhase: '조사하기 · 정보탐색 및 비판적 읽기',
          time: '12분',
          strategy: sDev1,
          subjectTeacher: [
            `• [교과탐구] 수업용 읽기 자료(「${readingText.title}」)의 핵심 어휘(${readingText.vocab.map(v => v.word).join(', ')})와 교과 개념(${kList.slice(0, 2).join(', ')})의 연결점을 짚어 준다.`,
            `• 모둠별 읽기 과정에서 어려움을 겪는 학생에게 발문으로 비계(Scaffolding)를 제공한다.`,
          ],
          librarianTeacher: [
            `• [정보활용] KDC ${kdcList[0].code}번대(${kdcList[0].name}) 서가 위치 및 청구기호(분류기호+저자기호) 읽는 법을 시범 보인다.`,
            `• 【${sDev1.name}】 전략으로 읽기 자료와 도서에서 핵심 근거를 탐색·기록하도록 지도한다.`,
            `• 발문: "${sDev1.prompts[0] || '자료에서 가장 중요한 근거 문장은 어디에 있나요?'}"`,
          ],
          studentActivity: [
            `• 수업용 읽기 자료(「${readingText.title}」)와 도서관 주제 도서를 함께 읽으며 핵심 사실에 밑줄을 긋는다.`,
            `• ${sDev1.act}`,
          ],
          materials: [`수업용 읽기 텍스트`, `KDC ${kdcList[0].code} 주제 도서 꾸러미`, wsLabel(sDev1)],
          assessment: `핵심 정보 추출의 정확성 및 출처 기록 확인`,
        },
        {
          phase: '전개 2',
          subPhase: '조직하기 · 개념 관계 구조화',
          time: '12분',
          strategy: sDev2,
          subjectTeacher: [
            `• [개념조직] 【${sDev2.name}】 활동을 통해 수집한 사실들을 '${concept1}'과(와) '${concept2}'의 관계로 구조화하도록 안내한다.`,
            `• 발문: "${sDev2.prompts[0] || `찾은 사실들 사이에는 어떤 공통된 패턴이 있나요?`}"`,
            `• 모둠별 조직 결과를 순회 점검하며 사실 나열을 넘어 개념 간 인과·비교 관계가 드러나도록 피드백한다.`,
          ],
          librarianTeacher: [
            `• [정보통합] 여러 자료에서 뽑은 정보를 한눈에 보이게 정리·비교하는 요령을 안내한다.`,
            `• 인용한 문장이나 자료 옆에 출처(지은이, 책 제목, 발행연도)를 바르게 표기했는지 점검한다.`,
          ],
          studentActivity: [
            `• ${sDev2.act}`,
            `• 모둠원과 토의하며 '${concept1}'과(와) '${concept2}' 사이의 연결 고리를 찾고 출처를 함께 적는다.`,
          ],
          materials: [wsLabel(sDev2), `색펜·포스트잇`, `출처 표기 가이드`],
          assessment: `개념 구조화 완성도 및 협동 참여도 평가`,
        },
        {
          phase: '정리',
          subPhase: '일반화 · 전이 및 메타인지 성찰',
          time: '8분',
          strategy: sWrap,
          subjectTeacher: [
            `• [일반화 도출] 모둠별 핵심 발견을 모아 오늘의 일반화 문장("${generalization}")을 학생들의 말로 완성한다.`,
            `• 발문: "오늘 찾은 원리를 우리 학급이나 실생활의 새로운 상황에 적용한다면 무엇을 실천할 수 있을까요?"`,
          ],
          librarianTeacher: [
            `• [정보윤리·성찰] 【${sWrap.name}】 결과를 공유하며 탐구 전후의 생각 변화와 정보 탐색 과정을 성찰하게 한다.`,
            `• 오늘 주제와 연결된 후속 추천 도서(KDC ${kdcList.map(k => k.code).join('·')}번대)를 소개하며 평생 독서로 확장한다.`,
          ],
          studentActivity: [
            `• ${sWrap.act}`,
            `• 나만의 일반화 한 문장과 출처를 발표하고, 더 읽고 싶은 책을 기록한다.`,
          ],
          materials: [`일반화 문장띠`, wsLabel(sWrap), `후속 추천 도서 안내판`],
          assessment: `일반화 문장의 보편성 및 자기성찰 루브릭 평가`,
        },
      ];
    } else if (track === 'B') {
      // 교실수업: 에릭슨 개념기반 탐구 7단계 (초등교사 단독 1열 지도안)
      const modeB = state.inquiryMode || 'compact40'; // compact40 (40분 압축) vs full7 (7단계 상세)
      trackTitle = '교실수업 — 초등교사 단독수업 (개념기반 탐구 1열 지도안)';
      trackBadge = '교실수업 · 초등교사 단독수업';
      modelName = modeB === 'full7'
        ? '린 에릭슨(Lynn Erickson) 개념기반 탐구 7단계 전체 흐름안'
        : '린 에릭슨 개념기반 탐구 7단계 → 40분 차시 압축 지도안';

      if (modeB === 'full7') {
        const phases7 = [
          { no: 1, name: '1단계: 관계맺기 (Engage)', time: '5분', strat: sIntro, goal: '호기심 유발 및 삶의 경험 연결' },
          { no: 2, name: '2단계: 집중하기 (Focus)', time: '5분', strat: sIntro, goal: '핵심 개념 정의 및 탐구 질문 명료화' },
          { no: 3, name: '3단계: 조사하기 (Investigate)', time: '8분', strat: sDev1, goal: '읽기 텍스트 및 구체적 사례 탐색·증거 수집' },
          { no: 4, name: '4단계: 조직하기 (Organize)', time: '8분', strat: sDev2, goal: '수집한 사실 범주화 및 개념 관계 시각화' },
          { no: 5, name: '5단계: 일반화하기 (Generalize)', time: '5분', strat: sWrap, goal: '두 개념을 잇는 영속적 이해(일반화) 도출' },
          { no: 6, name: '6단계: 전이하기 (Transfer)', time: '5분', strat: sWrap, goal: '새로운 실생활 맥락에 일반화 원리 적용' },
          { no: 7, name: '7단계: 성찰하기 (Reflect)', time: '4분', strat: sWrap, goal: '사고 변화 메타인지 성찰 및 후속 질문' },
        ];
        timeline = phases7.map(p => {
          const st = applyVarsToStrategy(p.strat, vars);
          return {
            phase: p.name,
            subPhase: p.goal,
            time: p.time,
            strategy: st,
            teacherActivity: [
              `• [${p.goal}] 【${st.name}】 활동을 안내하고 학생의 사고를 가시화한다.`,
              `• 핵심 발문: "${st.prompts[0] || question}"`,
              p.no === 3 ? `• 수업용 읽기 자료(「${readingText.title}」)를 배포하고 핵심 어휘와 사실 관계를 탐색하게 한다.`
                : p.no === 5 ? `• 고유명사를 배제하고 '${concept1}'과(와) '${concept2}'의 관계를 현재형 동사로 연결하도록 비계를 제공한다.`
                  : `• 학생 활동을 순회 관찰하며 개념적 렌즈(${concept1}, ${concept2})에 집중하도록 피드백한다.`,
            ],
            studentActivity: [
              `• ${st.act}`,
              p.no === 5 ? `• 모둠별로 도출한 일반화 초안을("${generalization}") 동료와 상호 피드백하며 다듬는다.`
                : `• 짝·모둠과 생각을 공유하며 탐구 활동지를 작성한다.`,
            ],
            materials: [wsLabel(st), p.no === 3 ? `읽기 자료「${readingText.title}」` : `개념 카드·생각 기록판`],
            assessment: `${p.name.split(':')[1] || p.name} 단계 수행 관찰 및 활동지 평가`,
          };
        });
      } else {
        timeline = [
          {
            phase: '도입',
            subPhase: '1단계 관계맺기(Engage) · 2단계 집중하기(Focus)',
            time: '8분',
            strategy: sIntro,
            teacherActivity: [
              `• [관계맺기] '${topic}' 관련 도발적 질문·시각 자료를 제시하여 학생의 삶과 연결한다.`,
              `• 발문: "${sIntro.prompts[0] || `${josa(topic, '을')} 보면 어떤 생각이 떠오르나요?`}"`,
              `• [집중하기] 오늘의 핵심 개념 【${concept1}】, 【${concept2}】을(를) 도입하고 개념적 탐구 질문("${question}")과 ${stratSummaryNames} 활동 순서를 안내한다.`,
            ],
            studentActivity: [
              `• 핵심 개념의 뜻을 짐작해 보고 오늘 해결할 탐구 질문을 자신의 말로 바꿔 읽어 본다.`,
              `• 사전 경험과 배경지식을 짝과 간단히 나눈다.`,
            ],
            materials: [`도입 시각 자료`, `핵심 개념 카드(${concept1}, ${concept2})`],
            assessment: `배경지식 연결 및 탐구 질문 이해도 관찰`,
          },
          {
            phase: '전개 1',
            subPhase: '3단계 조사하기(Investigate)',
            time: '12분',
            strategy: sDev1,
            teacherActivity: [
              `• [조사하기] 수업용 읽기 자료(「${readingText.title}」)를 배부하고 핵심 어휘(${readingText.vocab.map(v => v.word).join(', ')})를 짚어 준다.`,
              `• 【${sDev1.name}】 전략을 활용하여 지문 속 구체적 사례와 사실적 근거를 찾도록 안내한다.`,
              `• 발문: "${sDev1.prompts[0] || readingText.questions.factual}"`,
            ],
            studentActivity: [
              `• 읽기 자료를 문단별로 읽으며 '${kList.slice(0, 2).join(', ')}' 관련 핵심 사실과 근거에 표시한다.`,
              `• ${sDev1.act}`,
            ],
            materials: [`수업용 읽기 자료「${readingText.title}」`, wsLabel(sDev1)],
            assessment: `텍스트 기반 사실적 증거 수집 능력 평가`,
          },
          {
            phase: '전개 2',
            subPhase: '4단계 조직하기(Organize) · 5단계 일반화하기(Generalize)',
            time: '12분',
            strategy: sDev2,
            teacherActivity: [
              `• [조직하기] 【${sDev2.name}】 전략으로 조사한 사실들 사이의 공통 패턴과 관계를 시각화하게 한다.`,
              `• 발문: "${sDev2.prompts[0] || readingText.questions.inferential}"`,
              `• [일반화하기] 개념 연결 문장틀("[${concept1}]와(과) [${concept2}]은(는) ~한다")을 제시하여 학생 스스로 일반화 문장에 도달하도록 유도한다.`,
            ],
            studentActivity: [
              `• ${sDev2.act}`,
              `• 조직한 패턴을 바탕으로 모둠의 일반화 문장("${generalization}")을 작성하고 칠판에 공유한다.`,
            ],
            materials: [wsLabel(sDev2), `일반화 문장틀 카드`],
            assessment: `개념 관계 구조화 및 일반화 진술의 타당성 평가`,
          },
          {
            phase: '정리',
            subPhase: '6단계 전이하기(Transfer) · 7단계 성찰하기(Reflect)',
            time: '8분',
            strategy: sWrap,
            teacherActivity: [
              `• [전이하기] 도출한 일반화 원리를 우리 학급·가정·마을의 새로운 문제 상황에 적용하는 참과제 질문을 던진다.`,
              `• 발문: "${readingText.questions.critical}"`,
              `• [성찰하기] 【${sWrap.name}】 활동을 마무리하며 수업 전후의 생각 변화를 메타인지적으로 성찰하게 한다.`,
            ],
            studentActivity: [
              `• 배운 원리를 실생활의 새로운 사례에 적용해 실천 방법을 제안한다.`,
              `• ${sWrap.act}`,
            ],
            materials: [wsLabel(sWrap), `성찰 기록판`],
            assessment: `실생활 전이 적용력 및 메타인지 자기성찰 평가`,
          },
        ];
      }
    } else {
      // 도서관과 정보생활: 사서교사 단독수업 (2022 도서관과 정보생활 + Big6 6단계 정보문제해결 모형)
      trackTitle = '도서관과 정보생활 — 사서교사 단독수업 (Big6 정보활용 1열 지도안)';
      trackBadge = '도서관과 정보생활 · 사서교사 단독수업';
      modelName = 'Big6 정보문제해결 6단계 모형 + 2022 도서관과 정보생활 교육과정';
      timeline = [
        {
          phase: '도입 (Big6 1~2단계)',
          subPhase: '1단계 과제 정의 · 2단계 정보탐색 전략 수립',
          time: '8분',
          strategy: sIntro,
          teacherActivity: [
            `• [1단계 과제 정의] '${topic}' 관련 정보 문제 상황을 제시하고 해결해야 할 과제를 명확히 인식시킨다.`,
            `• 오늘 적용할 ${stratSummaryNames} 활동 순서를 안내하고, 알아내야 할 정보(탐구 질문)를 정의한다.`,
            `• [2단계 탐색 전략] 질문 해결에 적합한 정보원(인쇄 도서, 백과사전, 디지털 DB)과 KDC 분류(${kdcList[0].code} ${kdcList[0].name}) 및 핵심 검색어를 함께 수립한다.`,
          ],
          studentActivity: [
            `• 해결할 탐구 질문을 정하고, 도서관에서 찾을 핵심 검색어와 KDC 분류 번호를 예상해 본다.`,
          ],
          materials: [`학교도서관 배가 안내도`, `KDC 십진분류표 포스터`],
          assessment: `정보 요구 파악 및 검색 전략 수립의 적절성`,
        },
        {
          phase: '전개 1 (Big6 3단계)',
          subPhase: '3단계 소재 파악 및 접근 (OPAC · 서가 탐색)',
          time: '10분',
          strategy: sDev1,
          teacherActivity: [
            `• [3단계 소재 파악] 도서관 검색 시스템(OPAC) 검색 방법과 KDC ${kdcList[0].code}번대(${kdcList[0].name}) 서가의 청구기호(분류기호+저자기호) 읽는 법을 시범 보인다.`,
            `• 【${sDev1.name}】 활동을 통해 서가에서 직접 주제 도서를 찾고, 수업용 읽기 텍스트(「${readingText.title}」)의 핵심 내용을 함께 탐색하게 한다.`,
            `• 발문: "${sDev1.prompts[0] || `${topic} 관련 자료는 어느 서가에서 어떻게 찾을 수 있나요?`}"`,
          ],
          studentActivity: [
            `• OPAC 검색 또는 KDC 분류표를 활용해 KDC ${kdcList[0].code}번대 서가에서 주제 도서를 직접 찾아낸다.`,
            `• ${sDev1.act}`,
          ],
          materials: [`도서관 검색대(OPAC)`, `KDC ${kdcList[0].code}번대 서가 도서`, `수업용 읽기 텍스트`, wsLabel(sDev1)],
          assessment: `청구기호 해독 및 실제 도서 탐색 수행 평가`,
        },
        {
          phase: '전개 2 (Big6 4단계)',
          subPhase: '4단계 정보 활용 (읽기 · 사실/의견 구분 · 신뢰성 평가)',
          time: '14분',
          strategy: sDev2,
          teacherActivity: [
            `• [4단계 정보 활용] 찾은 자료와 읽기 텍스트(「${readingText.title}」)를 읽으며 탐구 질문에 맞는 핵심 정보를 발췌·요약하도록 지도한다.`,
            `• 【${sDev2.name}】 전략을 적용하여 사실과 의견을 구분하거나 정보원의 신뢰성을 비판적으로 판별하게 한다.`,
            `• 발문: "${sDev2.prompts[0] || '이 자료의 정보는 믿을 만한가요? 사실과 의견을 어떻게 구분했나요?'}"`,
          ],
          studentActivity: [
            `• 읽기 텍스트에서 핵심 정보를 추출하고 사실 문장과 의견 문장을 판별한다.`,
            `• ${sDev2.act}`,
          ],
          materials: [`읽기 텍스트「${readingText.title}」`, wsLabel(sDev2), `형광펜`],
          assessment: `핵심 정보 추출·비판적 판별 및 요약 완성도`,
        },
        {
          phase: '정리 (Big6 5~6단계)',
          subPhase: '5단계 통합 및 표현 · 6단계 과정 및 결과 평가',
          time: '8분',
          strategy: sWrap,
          teacherActivity: [
            `• [5단계 통합·표현] 분석한 정보를 자신의 말로 재구성하고, 저작권 규칙에 따라 출처(저자, 서명, 출판사, 연도)를 정확히 표기하도록 지도한다.`,
            `• [6단계 평가] 【${sWrap.name}】 활동을 마무리하며 오늘의 정보 탐색 과정(Big6 1~5단계)과 배움 결과를 스스로 성찰하게 한다.`,
          ],
          studentActivity: [
            `• 도서관에서 탐색·인용한 실제 자료의 출처(지은이, 『책 제목』, 출판사, 발행연도)를 표준 형식에 맞추어 바르게 적는다.`,
            `• ${sWrap.act}`,
          ],
          materials: [`출처 표기 체크리스트`, wsLabel(sWrap)],
          assessment: `올바른 출처 표기(저작권 윤리) 및 Big6 자기평가`,
        },
      ];
    }

    /* ---------------- 루브릭(3단계 평가 기준표) 자동 생성 ---------------- */
    const rubric = [
      {
        criterion: track === 'C' ? '정보 탐색 및 접근 (과정·기능)' : `개념적 이해 (${concept1} · ${concept2})`,
        high: track === 'C'
          ? `KDC 분류 체계와 검색어를 스스로 활용하여 '${topic}'에 알맞은 자료를 정확하고 빠르게 찾아낸다.`
          : `'${topic}'의 다양한 사례를 분석하여 '${generalization}'라는 일반화 원리를 자신의 말로 명확하게 설명한다.`,
        mid: track === 'C'
          ? `도움을 받아 KDC 분류기호나 검색어로 '${topic}' 관련 자료를 찾아낸다.`
          : `'${topic}'의 주요 특징과 '${concept1}'·'${concept2}'의 관계를 사례를 들어 설명한다.`,
        low: track === 'C'
          ? `도서관에서 자료를 찾는 방법이나 청구기호의 의미를 이해하는 데 추가 안내가 필요하다.`
          : `'${topic}'의 단편적인 사실은 찾았으나 개념 간의 관계를 연결하는 데 도움이 필요하다.`,
      },
      {
        criterion: `수업 전략 수행 (${rubricStratNames})`,
        high: `선택한 탐구·독서 전략의 절차를 정확히 이해하고 텍스트의 핵심 근거를 찾아 체계적으로 구조화한다.`,
        mid: `활동지의 안내 단계에 따라 텍스트에서 주요 내용을 찾아 정리한다.`,
        low: `교사나 모둠원의 도움을 받아 활동지의 기본 항목을 채운다.`,
      },
      {
        criterion: track === 'B' ? '실생활 전이 및 메타인지 성찰 (가치·태도)' : '정보 윤리(출처 표기) 및 협력적 성찰 (가치·태도)',
        high: track === 'B'
          ? `배운 원리를 새로운 실생활 문제에 창의적으로 적용하고 수업 전후의 생각 변화를 깊이 있게 성찰한다.`
          : `인용한 자료의 출처를 규칙에 맞게 정확히 표기하고, 동료와 적극적으로 소통하며 탐구 과정을 성찰한다.`,
        mid: track === 'B'
          ? `배운 내용과 관련된 일상 사례를 찾고 오늘 새롭게 알게 된 점을 기록한다.`
          : `안내된 형식에 따라 기본 출처(책 제목, 지은이)를 적고 성찰 활동에 참여한다.`,
        low: track === 'B'
          ? `수업 내용을 되돌아보고 느낀 점을 한 줄로 표현한다.`
          : `저작권 보호의 필요성을 알고 출처 표기 예시를 따라 적는다.`,
      },
    ];

    const basePlan = {
      createdAt: today(),
      isAiGenerated: false,
      track,
      trackTitle,
      trackBadge,
      modelName,
      grade,
      gradeBand: band,
      subjectName: track === 'C' ? '도서관과 정보생활' : (subj ? subj.name : ''),
      subjectShort: track === 'C' ? '도서관과 정보생활' : (subj ? subj.short : ''),
      areaName: track === 'C' ? (libArea ? libArea.name : '') : (area ? area.name : ''),
      unitTitle: state.unitTitle || `${topic} 탐구 프로젝트`,
      topic,
      duration: '40분 (1차시 기준 · 블록수업 확장 가능)',
      place: track === 'B' ? `${grade}학년 교실` : '학교도서관 (또는 교실-도서관 연계)',
      teachers: track === 'A' ? '담임(교과)교사 · 사서교사 협력(Co-teaching)' : (track === 'B' ? '담임(교과)교사' : '사서교사'),
      competencies: track === 'C'
        ? kb.library.competencies
        : (subj ? subj.competencies.map(c => c.name) : []),
      subjectStandard: subjStd || null,
      libraryStandard: libStd || null,
      libraryArea: libArea || null,
      contentElements: {
        knowledge: kList,
        skills: sList,
        attitudes: aList,
      },
      conceptualFrame: {
        macroConcepts: [concept1, concept2],
        factualQ: state.factualQ || frame.factualQ,
        conceptualQ: question,
        debatableQ: state.debatableQ || frame.debatableQ,
        generalization,
        coreIdeaFromOntology: frame.coreIdeaFromOntology,
      },
      kdcRecommendations: kdcList,
      strategies: strats,
      objectives,
      timeline,
      rubric,
      readingTextTitle: readingText.title,
    };

    if (state.aiLessonPlan) {
      const ai = state.aiLessonPlan;
      basePlan.isAiGenerated = true;
      if (Array.isArray(ai.objectives) && ai.objectives.length) basePlan.objectives = ai.objectives;
      if (ai.factualQ) basePlan.conceptualFrame.factualQ = ai.factualQ;
      if (ai.conceptualQ) basePlan.conceptualFrame.conceptualQ = ai.conceptualQ;
      if (ai.debatableQ) basePlan.conceptualFrame.debatableQ = ai.debatableQ;
      if (ai.generalization) basePlan.conceptualFrame.generalization = ai.generalization;
      if (Array.isArray(ai.timeline) && ai.timeline.length) {
        basePlan.timeline = basePlan.timeline.map((row, idx) => {
          const aiRow = ai.timeline[idx] || {};
          return {
            ...row,
            subjectTeacher: Array.isArray(aiRow.subjectTeacher) && aiRow.subjectTeacher.length ? aiRow.subjectTeacher : row.subjectTeacher,
            librarianTeacher: Array.isArray(aiRow.librarianTeacher) && aiRow.librarianTeacher.length ? aiRow.librarianTeacher : row.librarianTeacher,
            teacherActivity: Array.isArray(aiRow.teacherActivity) && aiRow.teacherActivity.length ? aiRow.teacherActivity : row.teacherActivity,
            studentActivity: Array.isArray(aiRow.studentActivity) && aiRow.studentActivity.length ? aiRow.studentActivity : row.studentActivity,
            checkpoints: aiRow.checkpoints || row.checkpoints,
          };
        });
      }
      if (Array.isArray(ai.rubric) && ai.rubric.length) {
        basePlan.rubric = ai.rubric;
      }
    }

    if (global.CooperationEngine && typeof global.CooperationEngine.punctualizeLessonPlan === 'function') {
      return global.CooperationEngine.punctualizeLessonPlan(state, kb, basePlan, readingText);
    }

    return basePlan;
  }

  global.Generators = {
    TEXT_GENRES,
    GRADE_TEXT_SPECS,
    computeReadingTextStats,
    generateReadingText,
    generateLessonPlan,
    resolveStrategies,
  };
})(window);
