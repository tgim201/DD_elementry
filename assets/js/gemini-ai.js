/* =====================================================================
 *  교사 개인용 Gemini AI 연동 모듈 (assets/js/gemini-ai.js)
 *  - 교사가 본인의 Google AI Studio (Gemini) API 키를 등록하여
 *    1) 학년·장르·세부 주제에 꼭 맞는 새로운 수업용 읽기 텍스트(어휘·발문·사실/의견 문장) 집필
 *    2) 3트랙(협력 2열 / 교과 7단계 / 사서 Big6) 맞춤형 차시 지도안 발문·수업활동·루브릭 정교화
 *    를 실시간으로 생성하고 활동지까지 자동 연동합니다.
 * ===================================================================== */
(function (global) {
  'use strict';

  const LS_GEMINI_KEY_PREFIX = 'dd_elementary_gemini_key_';
  const LS_GEMINI_MODEL = 'dd_elementary_gemini_model_v3';

  function getStorageKey() {
    const user = global.AuthStore && global.AuthStore.getCurrentUser ? global.AuthStore.getCurrentUser() : null;
    return LS_GEMINI_KEY_PREFIX + (user ? user.userId : 'guest');
  }

  function getApiKey() {
    return localStorage.getItem(getStorageKey()) || localStorage.getItem(LS_GEMINI_KEY_PREFIX + 'guest') || '';
  }

  function saveApiKey(key) {
    const clean = String(key || '').trim();
    if (!clean) {
      localStorage.removeItem(getStorageKey());
      return '';
    }
    localStorage.setItem(getStorageKey(), clean);
    return clean;
  }

  function getPreferredModel() {
    return localStorage.getItem(LS_GEMINI_MODEL) || 'gemini-2.5-flash';
  }

  function savePreferredModel(model) {
    if (model) localStorage.setItem(LS_GEMINI_MODEL, model);
  }

  /**
   * Gemini REST API 호출 (모델 폴백 지원)
   */
  async function callGeminiJson(promptText) {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('먼저 개인 Gemini API 키(AIza...)를 입력하고 저장해 주세요.');
    }

    const preferred = getPreferredModel();
    const models = [preferred, 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'].filter(
      (m, idx, arr) => m && arr.indexOf(m) === idx
    );

    let lastErr = null;
    for (const model of models) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: promptText }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: 'application/json',
            },
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const msg = (errData.error && errData.error.message) || `HTTP ${res.status}`;
          lastErr = new Error(msg);
          if (res.status === 400 && /API key not valid/i.test(msg)) {
            throw new Error('입력하신 Gemini API 키가 유효하지 않습니다. Google AI Studio에서 발급받은 키를 다시 확인해 주세요.');
          }
          continue;
        }

        const data = await res.json();
        const rawText =
          data &&
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content &&
          data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0] &&
          data.candidates[0].content.parts[0].text;

        if (!rawText) {
          lastErr = new Error('Gemini 응답이 비어 있습니다.');
          continue;
        }

        const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        return JSON.parse(cleaned);
      } catch (err) {
        lastErr = err;
        if (err.message.includes('API 키가 유효하지')) throw err;
      }
    }

    throw lastErr || new Error('Gemini API 호출 중 오류가 발생했습니다.');
  }

  /**
   * 1) 수업용 읽기 지문 + 어휘 + 발문 + 사실/의견 문장 AI 맞춤 생성
   */
  async function generateAiReadingText(plan, currentText, extraRequest) {
    const specs = (global.Generators && global.Generators.GRADE_TEXT_SPECS) || {};
    const spec = specs[plan.grade] || {
      targetRangeLabel: plan.grade <= 2 ? '공백 포함 180~350자 (짧은 3단락)' : (plan.grade <= 4 ? '공백 포함 480~750자 (4단락)' : '공백 포함 900~1,250자 (5~6단락)'),
      aiPromptGuide: plan.grade <= 2
        ? '초등 저학년 눈높이에 맞춰 짧은 3개의 단락(전체 글자 수 공백 포함 200~330자 내외, 짧은 단문)으로 작성하세요.'
        : (plan.grade <= 4
          ? '초등 중학년 눈높이에 맞춰 4개의 단락(전체 글자 수 공백 포함 500~720자 내외)으로 작성하세요.'
          : '초등 고학년 눈높이에 맞춰 깊이 있는 5~6개의 단락(전체 글자 수 공백 포함 900~1,250자 내외)으로 충실하게 작성하세요.'),
    };
    const paraGuideNums = plan.grade <= 2 ? '❶, ❷, ❸ (3개 단락)' : (plan.grade <= 4 ? '❶, ❷, ❸, ❹ (4개 단락)' : (plan.grade === 5 ? '❶, ❷, ❸, ❹, ❺ (5개 단락)' : '❶, ❷, ❸, ❹, ❺, ❻ (6개 단락)'));
    const prompt = `당신은 대한민국 초등학교 수석교사이자 어린이 도서 작가입니다.
다음 수업 설계 조건에 완벽히 부합하는 초등학교 ${plan.grade}학년 대상 수업용 읽기 텍스트와 활동지 연동 데이터를 JSON 형식으로 작성해 주세요.

[수업 조건]
- 대상 학년: 초등학교 ${plan.grade}학년 (${plan.gradeBand}학년군 · 권장 분량: ${spec.targetRangeLabel})
- 교과 및 단원 영역: ${plan.subjectName} (${plan.areaName})
${plan.subjectStandard ? `- 교과 성취기준: ${plan.subjectStandard.code} ${plan.subjectStandard.text}\n` : ''}${plan.libraryStandard ? `- 2022 도서관과 정보생활 성취기준: ${plan.libraryStandard.code} ${plan.libraryStandard.text}\n` : ''}- 수업 주제: ${plan.topic}
- 핵심 개념 렌즈: ${(plan.conceptualFrame.macroConcepts || []).join(', ')}
- 일반화 원리: ${plan.conceptualFrame.generalization}
- 글의 장르: ${currentText.genreName}
- 지식·이해 요소: ${(plan.contentElements.knowledge || []).join(', ')}
${extraRequest ? `- 교사 추가 요청사항: ${extraRequest}` : ''}

[작성 지침 — 학년별 적정 글자 수 및 문단 호흡 엄수]
1. ${spec.aiPromptGuide}
2. paragraphs 배열에는 문단 번호 ${paraGuideNums}로 시작하는 문단들을 작성하세요.
3. 가상의 거짓 도서명이나 가짜 저자명을 절대 지어내지 마세요. 순수하게 수업 시간에 활용할 완성도 높은 읽기 텍스트 본문만 작성하세요.
4. vocab 배열에는 본문에 등장하는 핵심 어휘 ${plan.grade <= 2 ? '3개' : '4개'}의 단어(word)와 ${plan.grade}학년 눈높이에 맞는 뜻풀이(meaning)를 작성하세요.
5. factSentences 배열에는 본문에서 사실(Fact)에 해당하는 문장 2개를, opinionSentences 배열에는 의견/주장(Opinion)에 해당하는 문장 2개를 작성하세요. (사실과 의견 구분 활동지에 자동 연동됩니다.)
6. questions 객체에는 사실 확인 발문(factual), 개념 추론 발문(inferential), 비판·삶 적용 발문(critical)을 각각 1개씩 작성하세요.

반드시 아래 JSON 스키마로만 응답하세요:
{
  "title": "수업용 읽기 텍스트 제목",
  "paragraphs": ["❶ 첫째 문단...", "❷ 둘째 문단...", "❸ 셋째 문단..."],
  "vocab": [
    { "word": "어휘1", "meaning": "뜻풀이1" },
    { "word": "어휘2", "meaning": "뜻풀이2" },
    { "word": "어휘3", "meaning": "뜻풀이3" },
    { "word": "어휘4", "meaning": "뜻풀이4" }
  ],
  "factSentences": ["사실 문장 1", "사실 문장 2"],
  "opinionSentences": ["의견 문장 1", "의견 문장 2"],
  "questions": {
    "factual": "[사실 확인] 질문...",
    "inferential": "[개념 추론] 질문...",
    "critical": "[비판·전이] 질문..."
  }
}`;

    return await callGeminiJson(prompt);
  }

  /**
   * 2) 수업용 읽기 지문 + 3트랙 차시 지도안 전체 패키지 AI 맞춤 생성
   */
  async function generateAiFullPackage(plan, currentText, extraRequest) {
    const isCoop = plan.track === 'A';
    const stratNames = (plan.strategies || []).map((s, i) => `${i + 1}단계(${s.name})`).join(', ');
    const phaseDesc = (plan.timeline || []).map((row, idx) =>
      `${idx + 1}번째 단계 [${row.phase} - ${row.subPhase} (${row.time})] 적용전략: ${row.strategy ? row.strategy.name : ''}`
    ).join('\n');
    const specs = (global.Generators && global.Generators.GRADE_TEXT_SPECS) || {};
    const spec = specs[plan.grade] || {};

    const prompt = `당신은 대한민국 2022 개정 초등 교육과정 및 학교도서관 협력수업(개념기반 탐구·Big6) 전문 수석교사입니다.
아래 수업 조건에 맞추어 1) 수업용 읽기 텍스트와 2) ${plan.trackTitle} 차시 지도안의 핵심 발문·교수활동·평가 루브릭을 JSON 형식으로 작성해 주세요.

[수업 조건]
- 수업 형태: ${plan.trackTitle}
- 대상 학년: 초등학교 ${plan.grade}학년 (${plan.gradeBand}학년군)
- 학년별 읽기 텍스트 분량 지침: ${spec.aiPromptGuide || ''}
- 교과 및 영역: ${plan.subjectName} (${plan.areaName})
${plan.subjectStandard ? `- 교과 성취기준: ${plan.subjectStandard.code} ${plan.subjectStandard.text}\n` : ''}${plan.libraryStandard ? `- 2022 도서관과 정보생활 성취기준: ${plan.libraryStandard.code} ${plan.libraryStandard.text}\n` : ''}- 수업 주제: ${plan.topic}
- 핵심 개념 렌즈: ${(plan.conceptualFrame.macroConcepts || []).join(', ')}
- 선택된 수업 전략: ${stratNames}
- 텍스트 장르: ${currentText.genreName}
${extraRequest ? `- 교사 특별 요청사항: ${extraRequest}` : ''}

[지도안 단계 구성 (반드시 아래 ${plan.timeline.length}개 단계 순서에 맞춰 timeline 배열을 작성하세요)]
${phaseDesc}

반드시 아래 JSON 스키마로만 응답하세요:
{
  "readingText": {
    "title": "읽기 자료 제목",
    "paragraphs": ["❶ 문단1...", "❷ 문단2...", "❸ 문단3...", "❹ 문단4..."],
    "vocab": [
      { "word": "어휘1", "meaning": "뜻풀이1" },
      { "word": "어휘2", "meaning": "뜻풀이2" },
      { "word": "어휘3", "meaning": "뜻풀이3" },
      { "word": "어휘4", "meaning": "뜻풀이4" }
    ],
    "factSentences": ["본문 속 사실 문장 1", "본문 속 사실 문장 2"],
    "opinionSentences": ["본문 속 의견 문장 1", "본문 속 의견 문장 2"],
    "questions": {
      "factual": "[사실 확인] 질문...",
      "inferential": "[개념 추론] 질문...",
      "critical": "[비판·전이] 질문..."
    }
  },
  "lessonPlan": {
    "objectives": ["차시 학습목표 1", "차시 학습목표 2"],
    "factualQ": "사실적 질문 (무엇을/어떻게)",
    "conceptualQ": "개념적 질문 (왜/어떻게 관계 맺는가)",
    "debatableQ": "논쟁적 질문 (어떤 선택이 바람직한가)",
    "generalization": "일반화(영속적 이해) 한 문장",
    "timeline": [
      {
        ${isCoop
          ? `"subjectTeacher": ["• 교과교사 활동 및 발문 1", "• 교과교사 활동 2", "• 교과교사 활동 3"],
        "librarianTeacher": ["• 사서교사 활동 및 발문 1", "• 사서교사 활동 2", "• 사서교사 활동 3"],`
          : `"teacherActivity": ["• 교사 발문 및 지도 활동 1", "• 교사 활동 2", "• 교사 활동 3"],`}
        "studentActivity": ["• 학생 탐구 및 활동지 수행 1", "• 학생 활동 2"],
        "checkpoints": "단계별 지도 유의점 및 평가 포인트"
      }
    ],
    "rubric": [
      { "criterion": "평가 요소 1", "high": "상 수준 기준", "mid": "중 수준 기준", "low": "하 수준 기준" },
      { "criterion": "평가 요소 2", "high": "상 수준 기준", "mid": "중 수준 기준", "low": "하 수준 기준" },
      { "criterion": "평가 요소 3", "high": "상 수준 기준", "mid": "중 수준 기준", "low": "하 수준 기준" }
    ]
  }
}`;

    return await callGeminiJson(prompt);
  }

  global.GeminiAI = {
    getApiKey,
    saveApiKey,
    getPreferredModel,
    savePreferredModel,
    generateAiReadingText,
    generateAiFullPackage,
  };
})(window);
