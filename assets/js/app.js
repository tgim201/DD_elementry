/* =====================================================================
 *  메인 애플리케이션 컨트롤러 v3.1 (app.js)
 *  - 초보 교사도 3~4번 클릭으로 완성하는 깔끔한 4단계 스텝 위저드
 *  - 지도안 최종 생성 페이지 및 문서 내 '교사 최종 확인 필수' 안내 배너
 *  - 내 수업 보관함 + Firebase(Firestore) + GitHub(Gist/Repo) 실시간 연동
 * ===================================================================== */
(function (global) {
  'use strict';
  const { esc, uniq, uid } = global.Util;
  const { gradeBandOf } = global.Ontology;
  const { recommendKDC, recommendSubjectStandards, recommendLibraryStandards, suggestConceptualFrame, scoreStrategies, recommendStrategySet, buildStep2TailoredRecommendations, STRATEGY_PRESETS } = global.Recommender;
  const { TEXT_GENRES, generateReadingText, generateLessonPlan } = global.Generators;
  const { generateWorksheets } = global.Worksheets;
  const { downloadFile, toMarkdown, toHwpCompatibleHtml, buildDynamicPrompt } = global.Exporters;
  const Auth = global.AuthStore;
  const Gemini = global.GeminiAI;

  /* ---------------- 원클릭 추천 수업 샘플 6종 (1~3종 알짜 전략 구성) ---------------- */
  const QUICK_SAMPLES = [
    {
      id: 'sample_coop_sci',
      badge: '함께하는 협력수업 · 대표 예시',
      title: '5학년 과학 × 도서관: 생태계 상호작용과 팩트체크 (2종)',
      state: {
        track: 'A', grade: 5, subjectKey: 'science', areaId: 'LifeEcosystem',
        knowledge: ['생물과 환경', '먹이 그물'],
        skills: ['생태계 모형 설계하기'],
        subjStdCode: '[6과03-03]',
        libStdCode: '[6도정02-02]',
        topic: '생태계 구성 요소의 상호작용과 생물다양성 보전',
        concept1: '상호작용', concept2: '균형',
        genre: 'expository',
        selectedStrategies: ['kdc', 'conceptmap'],
      },
    },
    {
      id: 'sample_coop_soc',
      badge: '함께하는 협력수업',
      title: '4학년 사회 × 도서관: 우리 고장의 문화유산과 KDC 탐색 (3종)',
      state: {
        track: 'A', grade: 4, subjectKey: 'social', areaId: 'LocalPlaceLife',
        knowledge: ['역사 문화유산', '고장의 옛이야기'],
        skills: ['지역 답사 및 현장 조사하기', '고장 소개 자료 제작하기'],
        subjStdCode: '[4사01-03]',
        libStdCode: '[4도정02-01]',
        topic: '우리 고장 문화유산의 가치와 보존 방법',
        concept1: '정체성', concept2: '보존과 변화',
        genre: 'news',
        selectedStrategies: ['kdc', 'factopinion', 'venn'],
      },
    },
    {
      id: 'sample_subj_kor',
      badge: '교실수업 · 초등교사 단독',
      title: '3학년 국어 단독: 사실과 의견을 구분하며 설득하는 글 읽기 (2종)',
      state: {
        track: 'B', grade: 3, subjectKey: 'korean', areaId: 'Reading',
        knowledge: ['사실과 의견 구별', '비판적 독해'],
        skills: ['추론하기', '비판하기'],
        subjStdCode: '[4국02-02]',
        topic: '글에 담긴 사실과 의견을 구분하며 내 생각 세우기',
        concept1: '관점', concept2: '타당성',
        genre: 'argument',
        inquiryMode: 'compact40',
        selectedStrategies: ['factopinion', 'usedtothink'],
      },
    },
    {
      id: 'sample_subj_int',
      badge: '교실수업 · 저학년 통합교과',
      title: '2학년 통합교과(바슬즐): 봄이 오면 달라지는 자연과 우리 생활 (2종)',
      state: {
        track: 'B', grade: 2, subjectKey: 'integrated', areaId: 'NatureAndSeasons',
        knowledge: ['사계절의 날씨 변화', '계절별 동식물의 모습'],
        skills: ['자연물 관찰하고 채집하기', '계절 노래 부르고 신체 표현하기'],
        subjStdCode: '[2슬03-01]',
        topic: '계절이 바뀌며 달라지는 동식물과 우리의 생활 모습',
        concept1: '변화', concept2: '순환',
        genre: 'fiction',
        inquiryMode: 'compact40',
        selectedStrategies: ['stw', 'ychart'],
      },
    },
    {
      id: 'sample_lib_34',
      badge: '도서관과 정보생활 · 3~4학년',
      title: '3학년 도서관 단독: 청구기호 암호를 풀고 KDC 서가 보물찾기 (2종)',
      state: {
        track: 'C', grade: 3, subjectKey: 'korean', areaId: 'Reading',
        libStdCode: '[4도정02-01]',
        topic: '한국십진분류표(KDC)와 청구기호로 원하는 책 찾기',
        concept1: '분류 체계', concept2: '접근성',
        genre: 'expository',
        selectedStrategies: ['kdc', 'opac'],
      },
    },
    {
      id: 'sample_lib_56',
      badge: '도서관과 정보생활 · 5~6학년 (심화 1종)',
      title: '6학년 도서관 단독: 가짜 뉴스·정보원 신뢰성 판별 집중 (CRAAP 1종)',
      state: {
        track: 'C', grade: 6, subjectKey: 'practical', areaId: 'DigitalInformationTechnology',
        libStdCode: '[6도정02-02]',
        topic: '디지털 정보원의 신뢰성 평가(CRAAP)와 올바른 정보 판별',
        concept1: '신뢰성', concept2: '정보 윤리',
        genre: 'argument',
        selectedStrategies: ['craap'],
      },
    },
  ];

  /* ---------------- 앱 전역 상태 ---------------- */
  let KB = null;
  let CURRENT_STEP = 1;
  let STATE = {
    track: 'A',
    grade: 4,
    subjectKey: 'social',
    areaId: '',
    knowledge: [],
    skills: [],
    attitudes: [],
    subjStdCode: '',
    libStdCode: '[4도정02-01]',
    unitTitle: '',
    topic: '',
    concept1: '',
    concept2: '',
    factualQ: '',
    conceptualQ: '',
    debatableQ: '',
    generalization: '',
    inquiryMode: 'compact40',
    genre: 'expository',
    customTextTitle: '',
    customText: '',
    sourceTitle: '',
    sourceAuthor: '',
    sourcePublisher: '',
    selectedStrategies: ['kdc', 'factopinion', 'conceptmap'],
    infoActivities: ['info_search', 'info_analysis'],
    coTeachingApproach: 'team_coteaching',
    librarianRoleMode: 'co_instruction_inquiry',
    scheduleModel: 'fixed_40',
    picratCode: 'IA',
    supportSlowLearners: false,
    supportDeliveryMode: 'station_rotation',
    activeRecTab: 'step2_custom',
    strategyFilterPhase: 'step2_rec',
    strategyFilterCat: 'all',
    strategySearch: '',
    activeOutputTab: 'plan',
    showTeacherAnswer: true,
    editableMode: false,
    teacherVerified: false,
  };

  let CURRENT_TEXT = null;
  let CURRENT_PLAN = null;
  let CURRENT_WORKSHEETS = [];

  /* ---------------- 위저드 단계 이동 (4단계 상태 검증 파이프라인 & 안전 가드 연동) ---------------- */
  function openSafetyGuardModal(validation, targetStep) {
    const modal = document.getElementById('safety-guard-modal');
    const bodyEl = document.getElementById('safety-guard-body');
    const keepBtn = document.getElementById('btn-safety-keep-current');
    const applyBtn = document.getElementById('btn-safety-apply-recommended');
    const closeBtn = document.getElementById('btn-close-safety-guard');
    if (!modal || !bodyEl) {
      goToStep(targetStep, true);
      return;
    }

    const cardsHtml = [];
    if (!validation.roleParityGuard.isValid) {
      cardsHtml.push(`
        <div class="guard-alert-box guard-role">
          <div class="guard-alert-head">
            <span class="guard-badge">⚖️ 교사 간 역할 균형 점검</span>
            <strong>현재 상태: ${esc(validation.roleParityGuard.cooperationLevel.label)} (교과 ${validation.roleParityGuard.balanceScore.subjectTeacherRatio}% : 사서 ${validation.roleParityGuard.balanceScore.librarianTeacherRatio}%)</strong>
          </div>
          <p class="guard-alert-msg">"${esc(validation.roleParityGuard.warningMessage)}"</p>
          <div class="guard-suggest-list">
            <strong>✨ 추천 추가 협력 역할 (5:5 균형 코티칭):</strong>
            <ul>
              ${validation.roleParityGuard.suggestedRoles.map(r => `<li>${esc(r)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `);
    }

    if (validation.antiStigmaGuard.hasRisk) {
      cardsHtml.push(`
        <div class="guard-alert-box guard-stigma">
          <div class="guard-alert-head">
            <span class="guard-badge">🌱 학생 심리적 위축 예방 점검</span>
            <strong>현재 설정: 특정 학생 별도 분리 보충지도</strong>
          </div>
          <p class="guard-alert-msg">"${esc(validation.antiStigmaGuard.warningMessage)}"</p>
          <div class="guard-suggest-list">
            <strong>💡 권장 대안 운영 방식:</strong>
            <p style="margin:4px 0 0;font-size:13px;color:#334155">${esc(validation.antiStigmaGuard.alternativeGuidance)}</p>
          </div>
        </div>
      `);
    }

    bodyEl.innerHTML = cardsHtml.join('');
    modal.classList.add('open');

    if (closeBtn) closeBtn.onclick = () => modal.classList.remove('open');
    if (keepBtn) {
      keepBtn.onclick = () => {
        modal.classList.remove('open');
        goToStep(targetStep, true);
      };
    }
    if (applyBtn) {
      applyBtn.onclick = () => {
        if (!validation.roleParityGuard.isValid) {
          STATE.librarianRoleMode = validation.roleParityGuard.recommendedRoleMode || 'co_instruction_inquiry';
        }
        if (validation.antiStigmaGuard.hasRisk) {
          STATE.coTeachingApproach = validation.antiStigmaGuard.recommendedApproachId || 'parallel_station';
          STATE.supportDeliveryMode = validation.antiStigmaGuard.recommendedDeliveryMode || 'station_rotation';
        }
        modal.classList.remove('open');
        refreshUI();
        goToStep(targetStep, true);
        showToast('✨ 권장 협력 역할(5:5 균형) 및 학생 배려 설정이 자동 반영되었습니다!');
      };
    }
  }

  function goToStep(stepNo, bypassGuard) {
    const targetStep = +stepNo || 1;
    if (!bypassGuard && global.CooperationEngine && typeof global.CooperationEngine.validateTranslationStep === 'function') {
      const validation = global.CooperationEngine.validateTranslationStep(targetStep, STATE, KB);
      if (validation.requiresTeacherConfirmation) {
        openSafetyGuardModal(validation, targetStep);
        return;
      }
    }

    CURRENT_STEP = targetStep;
    document.querySelectorAll('.wizard-step-tab').forEach(tab => {
      const s = +tab.getAttribute('data-goto-step');
      tab.classList.toggle('active', s === CURRENT_STEP);
      tab.classList.toggle('done', s < CURRENT_STEP);
    });
    document.querySelectorAll('.wizard-panel').forEach(panel => {
      panel.classList.toggle('active', +panel.getAttribute('data-step-panel') === CURRENT_STEP);
    });
    updateStepperSummary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateStepperSummary() {
    const trackNames = { A: '교과×사서교사 협력수업', B: '초등교사 단독수업', C: '사서교사 단독수업' };
    const subj = KB.subjectByKey[STATE.subjectKey];
    const s1 = document.getElementById('summary-step-1');
    const s2 = document.getElementById('summary-step-2');
    const s3 = document.getElementById('summary-step-3');
    if (s1) s1.textContent = trackNames[STATE.track] || '협력수업';
    if (s2) s2.textContent = `${STATE.grade}학년 · ${STATE.track === 'C' ? '도서관과 정보생활' : (subj ? subj.short : '')}`;
    if (s3) s3.textContent = `전략 ${STATE.selectedStrategies.length}종 선택됨`;
  }

  /* ---------------- 상태 정규화 ---------------- */
  function normalizeState(autoPickStrategies) {
    const g = +STATE.grade || 4;
    let subj = KB.subjectByKey[STATE.subjectKey] || KB.subjects[0];
    if (!subj) subj = KB.subjects[0];
    STATE.subjectKey = subj.key;

    const area = subj.areas.find(a => a.id === STATE.areaId) || subj.areas[0];
    STATE.areaId = area ? area.id : '';

    if (!STATE.knowledge || !STATE.knowledge.length || !STATE.knowledge.every(k => area.knowledge.includes(k))) {
      STATE.knowledge = area ? area.knowledge.slice(0, 2) : [];
    }
    if (!STATE.skills || !STATE.skills.length || !STATE.skills.every(s => area.skills.includes(s))) {
      STATE.skills = area ? area.skills.slice(0, 2) : [];
    }

    // 1) 교과 성취기준 정규화 (협력수업 A 및 교과교사 단독수업 B)
    const recSubj = recommendSubjectStandards(KB, g, subj, area, STATE.topic, STATE.knowledge, STATE.skills);
    if (!STATE.subjStdCode || !recSubj.some(s => s.code === STATE.subjStdCode)) {
      STATE.subjStdCode = recSubj[0] ? recSubj[0].code : '';
    }

    // 2) 2022 도서관과 정보생활 성취기준 정규화 (협력수업 A 및 사서교사 단독수업 C)
    const recLib = recommendLibraryStandards(KB, g, subj, area, STATE.topic, STATE.skills);
    const band = gradeBandOf(g);
    const curStd = (KB.library.standards || []).find(s => s.code === STATE.libStdCode);
    if (!curStd || curStd.band !== band) {
      STATE.libStdCode = recLib[0] ? recLib[0].code : (KB.library.standards[0] ? KB.library.standards[0].code : '');
    }

    const frame = suggestConceptualFrame(KB, { ...STATE, topic: '', concept1: '', concept2: '' });
    if (!STATE.topic) {
      if (STATE.track === 'C') {
        const std = (KB.library.standards || []).find(s => s.code === STATE.libStdCode);
        STATE.topic = std ? std.text.replace(/\.$/, '') : frame.topic;
      } else {
        STATE.topic = `${STATE.knowledge.join('·') || frame.topic} 탐구`;
      }
    }
    if (!STATE.concept1) STATE.concept1 = frame.concept1;
    if (!STATE.concept2) STATE.concept2 = frame.concept2;

    if (autoPickStrategies) {
      STATE.aiReadingText = null;
      STATE.aiLessonPlan = null;
    }

    if (autoPickStrategies || !STATE.selectedStrategies || !STATE.selectedStrategies.length) {
      STATE.selectedStrategies = recommendStrategySet(KB, STATE);
    } else if (STATE.selectedStrategies.length > 3) {
      STATE.selectedStrategies = STATE.selectedStrategies.slice(0, 3);
    }

    if (global.CooperationEngine && typeof global.CooperationEngine.bindEntitiesForCurriculum === 'function') {
      const bound = global.CooperationEngine.bindEntitiesForCurriculum(KB, {
        ...STATE,
        picratCode: autoPickStrategies ? '' : STATE.picratCode,
      });
      if (autoPickStrategies || !STATE.infoActivities || !STATE.infoActivities.length) {
        STATE.infoActivities = bound.recommendedInfoActivities.map(a => a.id);
      }
      if (autoPickStrategies || !STATE.picratCode) {
        STATE.picratCode = bound.picratRecommendation.code;
      }
    }
  }

  /* =====================================================================
   *  인증코드별(DD2026: 교과교사 / LIB2026: 사서교사) 맞춤 우선 추천 & 안내 팝업
   * ===================================================================== */
  function getEntryCodeProfile() {
    const u = Auth && Auth.getCurrentUser ? Auth.getCurrentUser() : null;
    if (!u) return null;
    const code = String(u.inviteCodeUsed || '').trim().toUpperCase();
    if (code === 'LIB2026' || u.role === '사서교사') return 'LIB';
    if (code === 'DD2026' || u.role === '초등교사') return 'DD';
    return 'DD';
  }

  function showEntryRoleGuidePopup(profile) {
    const mode = profile || getEntryCodeProfile() || 'DD';
    if (mode === 'LIB') {
      openContextHelpModal(
        '📖 사서교사 맞춤 활용 안내',
        '사서교사 선생님을 위한 스튜디오 활용 가이드',
        `
          <div class="help-pop-section">
            <div class="help-pop-highlight">
              반갑습니다, 선생님! <strong>사서교사 전용 모드</strong>로 입장하셨습니다.<br>
              이 안내 창을 닫으면 1단계 화면에서 사서교사 선생님이 가장 많이 활용하시는 수업 형태에 <strong>별표(⭐⭐)와 굵은 강조 테두리</strong>가 표시됩니다.
            </div>
          </div>

          <div class="help-pop-section">
            <h4>⭐⭐ 1. 도서관 단독수업 설계 — 『📖 사서교사 단독수업』</h4>
            <ul class="help-pop-list">
              <li><strong>교육과정 완벽 연동:</strong> 『2022 도서관과 정보생활』 학년군별 성취기준과 <strong>도서관 교과 핵심역량</strong>만 엄격하게 표출되는 <strong>Big6 6단계 지도안</strong>을 생성합니다.</li>
              <li><strong>실전 읽기 지문 &amp; 활동지:</strong> KDC 십진분류(000~900), 청구기호 해독, OPAC 검색, CRAAP 정보원 신뢰성 판별, 저작권·출처 표기 실습 활동지를 학년별 적정 분량으로 즉시 인쇄할 수 있습니다.</li>
            </ul>
          </div>

          <div class="help-pop-section">
            <h4>⭐⭐ 2. 담임(교과)교사와의 협력수업 제안·설계 — 『🤝 교과×사서교사 협력수업』</h4>
            <ul class="help-pop-list">
              <li><strong>2열 코티칭 지도안:</strong> 초등 11개 교과 성취기준과 도서관 성취기준을 1:1로 매핑하여, <strong>[교과교사 활동]과 [사서교사 활동]이 5:5로 나란히 분리된 협력 지도안</strong>을 자동 생성합니다.</li>
              <li><strong>사전협의 &amp; 추천 서가 자동화:</strong> 단원별 추천 KDC 서가, 도서관 탐구활동 8대 유형, 교사 간 5분 사전·사후 협의 체크리스트가 함께 제공되어 교과교사에게 협력수업을 제안하기 매우 편리합니다.</li>
            </ul>
          </div>

          <div class="help-pop-box">
            💡 <strong>시작 방법:</strong> 아래 <strong>[확인]</strong>을 눌러 창을 닫은 뒤, 1단계 화면에서 <strong>별표(⭐⭐)와 굵은 테두리</strong>가 표시된 <strong>『사서교사 단독수업』</strong> 또는 <strong>『교과×사서교사 협력수업』</strong> 카드를 클릭해 수업을 시작해 보세요!
          </div>
        `
      );
    } else {
      openContextHelpModal(
        '🏫 초등 교과교사 맞춤 활용 안내',
        '교과교사 선생님을 위한 스튜디오 활용 가이드',
        `
          <div class="help-pop-section">
            <div class="help-pop-highlight">
              반갑습니다, 선생님! <strong>초등 교과교사 전용 모드</strong>로 입장하셨습니다.<br>
              이 안내 창을 닫으면 1단계 화면에서 교과교사 선생님이 가장 많이 활용하시는 수업 형태에 <strong>별표(⭐⭐)와 굵은 강조 테두리</strong>가 표시됩니다.
            </div>
          </div>

          <div class="help-pop-section">
            <h4>⭐⭐ 1. 교실 교과수업 설계 — 『🏫 초등교사 단독수업 (교실수업)』</h4>
            <ul class="help-pop-list">
              <li><strong>11개 초등 교과 성취기준 직결:</strong> 국어·수학·바슬즐·사회·과학·도덕·실과·영어·체육·음악·미술 등 2022 개정 교육과정 성취기준과 <strong>해당 교과 공식 핵심역량</strong>만 정확히 반영된 <strong>40분 차시 지도안</strong>을 생성합니다.</li>
              <li><strong>실전 수업용 읽기 지문 &amp; 활동지:</strong> 태양계 행성, 화산과 지진, 주장과 근거, 우리고장 문화유산 등 <strong>실제 수업에 바로 읽힐 수 있는 학년별(1~6학년) 맞춤 읽기 텍스트</strong>와 <strong>1~3장의 핵심 활동지(예시 답안 미표시·즉시 인쇄용)</strong>가 함께 완성됩니다.</li>
            </ul>
          </div>

          <div class="help-pop-section">
            <h4>⭐ 2. 학교도서관 연계 수업 설계 — 『🤝 교과×사서교사 협력수업』</h4>
            <ul class="help-pop-list">
              <li>우리 반 교과 단원 수업에 학교도서관 도서 탐색과 사서교사의 정보활용 교육을 결합하고 싶을 때 선택하세요. <strong>교과교사·사서교사 2열 코티칭 지도안</strong>과 단원 맞춤 KDC 추천 서가가 자동 구성됩니다.</li>
            </ul>
          </div>

          <div class="help-pop-box">
            💡 <strong>시작 방법:</strong> 아래 <strong>[확인]</strong>을 눌러 창을 닫은 뒤, 1단계 화면에서 <strong>별표(⭐⭐)와 굵은 테두리</strong>가 표시된 <strong>『초등교사 단독수업』</strong> 또는 <strong>『교과×사서교사 협력수업』</strong> 카드를 클릭해 수업을 시작해 보세요!
          </div>
        `
      );
    }
  }

  function applyRolePriorityOnEntry(openPopup = true) {
    const profile = getEntryCodeProfile() || 'DD';
    // 실제 수업(2단계)으로 바로 넘어가지 않고 1단계 화면을 유지하되, 우선 선택 확률이 높은 트랙을 기본 하이라이트로 설정
    STATE.track = profile === 'LIB' ? 'C' : 'B';
    STATE.topic = '';
    normalizeState(true);
    CURRENT_STEP = 1;
    document.querySelectorAll('.wizard-step-tab').forEach(btn => {
      btn.classList.toggle('active', +btn.getAttribute('data-goto-step') === 1);
    });
    document.querySelectorAll('.wizard-panel').forEach(panel => {
      panel.classList.toggle('active', +panel.getAttribute('data-step-panel') === 1);
    });
    refreshUI();
    if (openPopup) {
      showEntryRoleGuidePopup(profile);
    }
  }

  /* =====================================================================
   *  Step 1 ~ Step 3 컨트롤 렌더링
   * ===================================================================== */
  function renderQuickSampleBar() {
    const el = document.getElementById('quick-sample-bar');
    if (!el) return;
    const profile = getEntryCodeProfile();

    // 입장 코드 유형에 따라 우선 추천 예시를 앞쪽으로 정렬하고 ★ 별표 및 강조 테두리 부여
    const orderedSamples = [...QUICK_SAMPLES].sort((a, b) => {
      if (profile === 'LIB') {
        const rank = t => (t === 'C' ? 0 : t === 'A' ? 1 : 2);
        return rank(a.state.track) - rank(b.state.track);
      }
      if (profile === 'DD') {
        const rank = t => (t === 'B' ? 0 : t === 'A' ? 1 : 2);
        return rank(a.state.track) - rank(b.state.track);
      }
      return 0;
    });

    el.innerHTML = orderedSamples.map(s => {
      const isPriority = (profile === 'DD' && s.state.track === 'B') || (profile === 'LIB' && (s.state.track === 'C' || s.state.track === 'A'));
      const starPrefix = isPriority ? '⭐ 우선 추천 · ' : '';
      return `
        <button type="button" class="sample-pill ${isPriority ? 'priority-sample' : ''}" data-sample-id="${esc(s.id)}">
          <span class="sample-badge ${isPriority ? 'priority-badge' : ''}">${esc(starPrefix + s.badge)}</span>
          <span class="sample-title">${esc(s.title)}</span>
        </button>
      `;
    }).join('');
  }

  function renderTrackSelector() {
    const profile = getEntryCodeProfile();
    const reopenBtn = document.getElementById('btn-reopen-role-guide');
    if (reopenBtn) {
      if (profile) {
        reopenBtn.style.display = 'inline-flex';
        reopenBtn.textContent = profile === 'LIB'
          ? '💡 사서교사 맞춤 활용 안내 보기'
          : '💡 교과교사 맞춤 활용 안내 보기';
      } else {
        reopenBtn.style.display = 'none';
      }
    }

    const roleBannerEl = document.getElementById('step1-role-recommend-banner');
    if (roleBannerEl) {
      if (profile === 'LIB') {
        roleBannerEl.style.display = 'flex';
        roleBannerEl.className = 'role-recommend-banner lib-mode';
        roleBannerEl.innerHTML = `
          <span>📖 <strong>사서교사 맞춤 우선 추천:</strong> 아래에서 <strong>별표(⭐⭐)와 굵은 강조 테두리</strong>가 표시된 <strong>『사서교사 단독수업』</strong> 또는 <strong>『교과×사서교사 협력수업』</strong>을 클릭해 시작하세요.</span>
        `;
      } else if (profile === 'DD') {
        roleBannerEl.style.display = 'flex';
        roleBannerEl.className = 'role-recommend-banner dd-mode';
        roleBannerEl.innerHTML = `
          <span>🏫 <strong>교과교사 맞춤 우선 추천:</strong> 아래에서 <strong>별표(⭐⭐)와 굵은 강조 테두리</strong>가 표시된 <strong>『초등교사 단독수업(교실수업)』</strong> 또는 <strong>『교과×사서교사 협력수업』</strong>을 클릭해 시작하세요.</span>
        `;
      } else {
        roleBannerEl.style.display = 'none';
      }
    }

    document.querySelectorAll('.track-card').forEach(card => {
      const t = card.getAttribute('data-track');
      card.classList.toggle('active', t === STATE.track);
      card.classList.remove('role-priority-primary', 'role-priority-secondary', 'role-priority-lib');

      const slot = card.querySelector('[data-priority-slot]');
      if (slot) slot.innerHTML = '';

      if (profile === 'DD') {
        if (t === 'B') {
          card.classList.add('role-priority-primary');
          if (slot) {
            slot.innerHTML = `<div class="track-star-ribbon primary">⭐⭐ 교과교사 최우선 추천 (교실 교과수업)</div>`;
          }
        } else if (t === 'A') {
          card.classList.add('role-priority-secondary');
          if (slot) {
            slot.innerHTML = `<div class="track-star-ribbon secondary">⭐ 교과교사 추천 (도서관 연계 협력수업)</div>`;
          }
        }
      } else if (profile === 'LIB') {
        if (t === 'C') {
          card.classList.add('role-priority-primary', 'role-priority-lib');
          if (slot) {
            slot.innerHTML = `<div class="track-star-ribbon lib-primary">⭐⭐ 사서교사 최우선 추천 (도서관 단독수업)</div>`;
          }
        } else if (t === 'A') {
          card.classList.add('role-priority-secondary', 'role-priority-lib');
          if (slot) {
            slot.innerHTML = `<div class="track-star-ribbon primary">⭐⭐ 사서교사 최우선 추천 (교과×사서 협력수업)</div>`;
          }
        }
      }
    });
    const subjWrap = document.getElementById('subject-config-section');
    const subjStdWrap = document.getElementById('subject-std-section');
    const libWrap = document.getElementById('library-config-section');
    const modeBWrap = document.getElementById('track-b-mode-wrap');

    // 협력수업(A): 교과 성취기준 + 2022 도서관과 정보생활 성취기준 2개 모두 제시
    // 교실수업(B, 교과교사 단독): 교과 성취기준만 제시 (도서관 성취기준 숨김)
    // 도서관과 정보생활(C, 사서교사 단독): 2022 도서관과 정보생활 성취기준만 제시 (교과 성취기준 숨김)
    const showSubject = STATE.track === 'A' || STATE.track === 'B';
    const showLibrary = STATE.track === 'A' || STATE.track === 'C';

    if (subjWrap) subjWrap.style.display = showSubject ? 'block' : 'none';
    if (subjStdWrap) subjStdWrap.style.display = showSubject ? 'block' : 'none';
    if (libWrap) libWrap.style.display = showLibrary ? 'block' : 'none';
    if (modeBWrap) modeBWrap.style.display = STATE.track === 'B' ? 'block' : 'none';

    const c1Title = document.getElementById('step2-card1-title');
    const c1Desc = document.getElementById('step2-card1-desc');
    if (c1Title && c1Desc) {
      if (STATE.track === 'C') {
        c1Title.textContent = '대상 학년 선택';
        c1Desc.textContent = '2022 도서관과 정보생활 수업을 진행할 대상 학년을 선택해 주세요.';
      } else {
        c1Title.textContent = '대상 학년과 교과 · 단원 영역 선택';
        c1Desc.textContent = '수업을 진행할 학년과 교과목, 단원 영역을 차례대로 선택해 주세요.';
      }
    }

    const libTitle = document.getElementById('library-std-title');
    const libDesc = document.getElementById('library-std-desc');
    if (libTitle && libDesc) {
      if (STATE.track === 'C') {
        libTitle.textContent = '적용할 『2022 도서관과 정보생활』 성취기준 선택';
        libDesc.textContent = '선택한 학년군에 해당하는 2022 도서관과 정보생활 교육과정 성취기준과 추천 KDC 서가를 선택해 주세요.';
      } else {
        libTitle.textContent = '연계할 『2022 도서관과 정보생활』 성취기준 선택';
        libDesc.textContent = '협력수업을 위해 선택한 학년·교과 성취기준과 가장 잘 어울리는 2022 도서관과 정보생활 성취기준과 KDC 서가가 자동 추천됩니다.';
      }
    }

    // 표시되는 섹션 카드의 번호 배지(1, 2, 3...) 자동 정렬
    const stack = document.getElementById('step2-cards-stack');
    if (stack) {
      let num = 1;
      stack.querySelectorAll('.step-section-card').forEach(card => {
        if (card.style.display !== 'none') {
          const badge = card.querySelector('.sec-num-badge');
          if (badge) badge.textContent = String(num++);
        }
      });
    }

    const coopConsultCard = document.getElementById('coop-consultation-card');
    if (coopConsultCard) {
      coopConsultCard.style.display = STATE.track === 'A' ? 'block' : 'none';
    }
    const stack3 = document.getElementById('step3-cards-stack');
    if (stack3) {
      let num3 = 1;
      stack3.querySelectorAll('.step-section-card').forEach(card => {
        if (card.style.display !== 'none') {
          const badge = card.querySelector('.sec-num-badge');
          if (badge) badge.textContent = String(num3++);
        }
      });
    }
  }

  function renderCurriculumControls() {
    document.querySelectorAll('.grade-btn').forEach(btn => {
      btn.classList.toggle('active', +btn.getAttribute('data-grade') === +STATE.grade);
    });

    const subjGrid = document.getElementById('subject-grid');
    if (subjGrid) {
      subjGrid.innerHTML = KB.subjects.map(s => {
        const fitGrade = s.grades.includes(+STATE.grade);
        return `
          <button type="button" class="subj-btn ${s.key === STATE.subjectKey ? 'active' : ''} ${fitGrade ? '' : 'sub-grade-warn'}"
                  data-subj-key="${esc(s.key)}" title="${esc(s.desc)} (권장: ${s.grades.join(',')}학년)">
            <span class="subj-icon">${s.icon}</span>
            <span class="subj-name">${esc(s.short)}</span>
            <span class="subj-grades">${s.grades[0]}~${s.grades[s.grades.length - 1]}학년</span>
          </button>`;
      }).join('');
    }

    const subj = KB.subjectByKey[STATE.subjectKey] || KB.subjects[0];
    const area = subj.areas.find(a => a.id === STATE.areaId) || subj.areas[0];

    const areaSel = document.getElementById('area-select');
    if (areaSel && subj) {
      areaSel.innerHTML = subj.areas.map(a =>
        `<option value="${esc(a.id)}" ${a.id === area.id ? 'selected' : ''}>${esc(a.name)} — ${esc(a.knowledge.slice(0, 3).join(', '))}</option>`
      ).join('');
    }

    const ciBox = document.getElementById('ontology-core-idea');
    if (ciBox && area) {
      ciBox.innerHTML = `
        <button type="button" class="btn-help-chip" data-help-key="step2_core_idea">
          💡 단원 핵심 아이디어 · 교과 핵심역량 보기
        </button>
      `;
    }

    const kWrap = document.getElementById('knowledge-chips');
    if (kWrap && area) {
      kWrap.innerHTML = area.knowledge.map(k => {
        const on = STATE.knowledge.includes(k);
        return `<button type="button" class="chip-toggle ${on ? 'active' : ''}" data-k="${esc(k)}">${on ? '✓ ' : ''}${esc(k)}</button>`;
      }).join('');
    }

    const sWrap = document.getElementById('skill-chips');
    if (sWrap && area) {
      sWrap.innerHTML = area.skills.map(s => {
        const on = STATE.skills.includes(s);
        return `<button type="button" class="chip-toggle skill ${on ? 'active' : ''}" data-s="${esc(s)}">${on ? '✓ ' : ''}${esc(s)}</button>`;
      }).join('');
    }

    // 1) 교과 성취기준 목록 렌더링 (해설 작은 글씨는 ? 팝업으로 분리)
    const subjStdTitleEl = document.getElementById('subject-std-title');
    if (subjStdTitleEl && subj) {
      subjStdTitleEl.textContent = `적용할 2022 개정 『${subj.short}』 교과 성취기준 선택`;
    }
    const subjListEl = document.getElementById('subject-std-list');
    if (subjListEl && subj && area) {
      const recSubjStds = recommendSubjectStandards(KB, STATE.grade, subj, area, STATE.topic, STATE.knowledge, STATE.skills);
      if (!STATE.subjStdCode || !recSubjStds.some(s => s.code === STATE.subjStdCode)) {
        STATE.subjStdCode = recSubjStds[0] ? recSubjStds[0].code : '';
      }
      subjListEl.innerHTML = recSubjStds.map((std, idx) => {
        const on = std.code === STATE.subjStdCode;
        return `
          <label class="lib-std-item compact-std-item ${on ? 'active' : ''}">
            <input type="radio" name="subjStd" value="${esc(std.code)}" ${on ? 'checked' : ''}>
            <div class="lib-std-body">
              <div class="lib-std-head">
                <span class="lib-code" style="background:#0f766e">${esc(std.code)}</span>
                <span class="lib-area-tag">${esc(subj.short)} · ${esc(std.areaName)}</span>
                ${idx === 0 ? '<span class="lib-rec-badge">★ 추천</span>' : ''}
                <button type="button" class="btn-help-mini" data-std-help="subj:${esc(std.code)}" title="성취기준 해설 보기">? 해설</button>
              </div>
              <div class="lib-std-text">${esc(std.text)}</div>
            </div>
          </label>`;
      }).join('');
    }

    // 2) 2022 도서관과 정보생활 성취기준 목록 렌더링 (해설 작은 글씨는 ? 팝업으로 분리)
    const libListEl = document.getElementById('library-std-list');
    if (libListEl) {
      const recStds = recommendLibraryStandards(KB, STATE.grade, subj, area, STATE.topic, STATE.skills);
      libListEl.innerHTML = recStds.map((std, idx) => {
        const on = std.code === STATE.libStdCode;
        return `
          <label class="lib-std-item compact-std-item ${on ? 'active' : ''}">
            <input type="radio" name="libStd" value="${esc(std.code)}" ${on ? 'checked' : ''}>
            <div class="lib-std-body">
              <div class="lib-std-head">
                <span class="lib-code">${esc(std.code)}</span>
                <span class="lib-area-tag">${esc(std.areaName)}</span>
                ${idx === 0 ? '<span class="lib-rec-badge">★ 추천</span>' : ''}
                <button type="button" class="btn-help-mini" data-std-help="lib:${esc(std.code)}" title="성취기준 해설 보기">? 해설</button>
              </div>
              <div class="lib-std-text">${esc(std.text)}</div>
            </div>
          </label>`;
      }).join('');
    }

    const kdcEl = document.getElementById('kdc-recommend-box');
    if (kdcEl) {
      const kdcs = recommendKDC(STATE.subjectKey, area ? area.name : '', `${STATE.topic} ${STATE.knowledge.join(' ')}`);
      kdcEl.innerHTML = kdcs.map((k, i) => `
        <span class="kdc-badge ${i === 0 ? 'primary' : ''}">
          <strong>추천 서가: KDC ${k.code} ${esc(k.name)}</strong>
        </span>
      `).join('') + `<button type="button" class="btn-help-mini" data-help-key="step2_kdc_detail" title="추천 KDC 세부 분류 보기">? 세부 분류</button>`;
    }

    renderCoopEntityBindingBox();

    const topicInput = document.getElementById('input-topic');
    if (topicInput && document.activeElement !== topicInput) topicInput.value = STATE.topic;
    const c1Input = document.getElementById('input-concept1');
    if (c1Input && document.activeElement !== c1Input) c1Input.value = STATE.concept1;
    const c2Input = document.getElementById('input-concept2');
    if (c2Input && document.activeElement !== c2Input) c2Input.value = STATE.concept2;

    const frame = suggestConceptualFrame(KB, STATE);
    const cHintEl = document.getElementById('concept-recommend-chips');
    if (cHintEl) {
      cHintEl.innerHTML = frame.conceptCandidates.slice(0, 8).map(c =>
        `<button type="button" class="mini-concept-chip" data-concept="${esc(c)}">+ ${esc(c)}</button>`
      ).join('');
    }

    const genreSel = document.getElementById('genre-select');
    if (genreSel) {
      genreSel.innerHTML = TEXT_GENRES.map(g =>
        `<option value="${esc(g.id)}" ${g.id === STATE.genre ? 'selected' : ''}>${esc(g.name)} — ${esc(g.desc)}</option>`
      ).join('');
    }
  }

  function renderCoopEntityBindingBox() {
    const el = document.getElementById('coop-entity-binding-box');
    if (!el || !global.CooperationEngine) return;
    if (STATE.track !== 'A' && STATE.track !== 'C') {
      el.style.display = 'none';
      return;
    }
    el.style.display = 'block';
    const CE = global.CooperationEngine;
    const bound = CE.bindEntitiesForCurriculum(KB, STATE);
    const activeIds = (STATE.infoActivities && STATE.infoActivities.length)
      ? STATE.infoActivities
      : bound.recommendedInfoActivities.map(a => a.id);
    const picratList = Object.values(CE.PICRAT_MATRIX);
    const curPicrat = CE.PICRAT_MATRIX[STATE.picratCode] || bound.picratRecommendation;

    el.innerHTML = `
      <div class="coop-bind-head" style="justify-content:space-between">
        <span class="coop-bind-badge">📚 도서관 탐구활동 · 디지털 도구 연계 (클릭하여 변경)</span>
        <button type="button" class="btn-help-mini" data-help-key="step2_coop_binding" title="탐구활동 8종 설명 및 협력수업 기대효과 보기">? 활동 설명 · 기대효과</button>
      </div>

      <div class="info-act-pill-bar" style="margin-bottom:12px">
        ${Object.values(CE.INFO_ACTIVITIES_8).map(act => {
          const on = activeIds.includes(act.id);
          const isRec = bound.recommendedInfoActivities.some(r => r.id === act.id);
          return `
            <button type="button" class="info-act-pill ${on ? 'active' : ''}" data-info-act="${esc(act.id)}" title="${esc(act.shortDesc)}">
              <span>${act.icon} ${esc(act.label)}</span>
              ${isRec ? '<span class="mini-rec-dot">★</span>' : ''}
            </button>
          `;
        }).join('')}
      </div>

      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <label class="field-label" for="picrat-select" style="margin:0;white-space:nowrap">🛠️ 도서관·디지털 도구 활용:</label>
        <select id="picrat-select" class="select-box" style="flex:1;min-width:240px">
          ${picratList.map(p => `
            <option value="${esc(p.code)}" ${p.code === curPicrat.code ? 'selected' : ''}>
              [${esc(p.code)}] ${esc(p.surfaceLabel)} — ${esc(p.toolExamples[0])}
            </option>
          `).join('')}
        </select>
      </div>
    `;
  }

  function renderCoopConsultationCard() {
    const card = document.getElementById('coop-consultation-card');
    const bodyEl = document.getElementById('coop-consultation-body');
    const pillWrap = document.getElementById('role-balance-pill-wrap');
    if (!card || !bodyEl || !global.CooperationEngine) return;
    if (STATE.track !== 'A') {
      card.style.display = 'none';
      return;
    }
    card.style.display = 'block';

    const CE = global.CooperationEngine;
    const parity = CE.validateRoleParity(STATE);
    const stigma = CE.detectStigmaRisk(STATE);
    const curAp = CE.CO_TEACHING_APPROACHES[STATE.coTeachingApproach || 'team_coteaching'] || Object.values(CE.CO_TEACHING_APPROACHES)[0];
    const curSc = CE.SCHEDULE_MODELS[STATE.scheduleModel || 'fixed_40'] || Object.values(CE.SCHEDULE_MODELS)[0];

    if (pillWrap) {
      const isBalanced = parity.isValid;
      pillWrap.innerHTML = `
        <span class="role-balance-pill ${isBalanced ? 'balanced' : 'warn'}">
          ${isBalanced ? '⚖️ 역할 균형' : '⚠️ 역할 점검'} · 교과 ${parity.balanceScore.subjectTeacherRatio}% : 사서 ${parity.balanceScore.librarianTeacherRatio}%
        </span>
      `;
    }

    bodyEl.innerHTML = `
      <!-- 1) 6대 협력수업 형태 간결 버튼 -->
      <div class="approach-compact-bar">
        ${Object.values(CE.CO_TEACHING_APPROACHES).map(ap => {
          const on = (STATE.coTeachingApproach || 'team_coteaching') === ap.id;
          return `
            <button type="button" class="approach-pill-btn ${on ? 'active' : ''}" data-approach-id="${esc(ap.id)}" title="${esc(ap.summary)}">
              <span>${ap.icon} <strong>${esc(ap.label)}</strong></span>
              <span class="approach-ratio-tag">${ap.defaultBalance.subject}:${ap.defaultBalance.librarian}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- 2) 사서교사 역할 · 시간표 · 학생 맞춤 지원 간결 설정 줄 -->
      <div class="coop-quick-controls-row">
        <div class="coop-quick-item">
          <label class="field-label" style="margin:0">👩‍🏫 사서교사 협력 역할</label>
          <select id="sel-librarian-role-mode" class="select-box">
            ${CE.LIBRARIAN_ROLE_MODES.map(rm => `
              <option value="${esc(rm.id)}" ${(STATE.librarianRoleMode || 'co_instruction_inquiry') === rm.id ? 'selected' : ''}>
                ${esc(rm.label)}
              </option>
            `).join('')}
          </select>
        </div>

        <div class="coop-quick-item">
          <label class="field-label" style="margin:0">⏱️ 차시 시간표 운영</label>
          <select id="sel-schedule-model" class="select-box">
            ${Object.values(CE.SCHEDULE_MODELS).map(sc => `
              <option value="${esc(sc.id)}" ${(STATE.scheduleModel || 'fixed_40') === sc.id ? 'selected' : ''}>
                ${esc(sc.label)}
              </option>
            `).join('')}
          </select>
        </div>

        <div class="coop-quick-item" style="display:flex;align-items:center;gap:8px;padding-top:18px">
          <label class="switch-label" style="margin:0">
            <input type="checkbox" id="chk-support-slow-learners" ${STATE.supportSlowLearners ? 'checked' : ''}>
            <span>🌱 느린학습자 지원 포함</span>
          </label>
          ${STATE.supportSlowLearners ? `
            <select id="sel-support-delivery-mode" class="select-box" style="width:auto">
              ${CE.SUPPORT_DELIVERY_MODES.map(sd => `
                <option value="${esc(sd.id)}" ${(STATE.supportDeliveryMode || 'station_rotation') === sd.id ? 'selected' : ''}>
                  ${esc(sd.label)}
                </option>
              `).join('')}
            </select>
          ` : ''}
        </div>
      </div>

      ${!parity.isValid ? `
      <div class="inline-guard-banner warn" style="margin-top:10px">
        <span>💡 사서교사 역할이 보조에 치우쳐 있습니다.</span>
        <button type="button" class="btn-inline-fix" id="btn-fix-role-parity">+ 5:5 공동 지도로 맞추기</button>
      </div>` : ''}
      ${STATE.supportSlowLearners && stigma.hasRisk ? `
      <div class="inline-guard-banner danger" style="margin-top:10px">
        <span>⚠️ 학생 위축 예방을 위해 모둠 순회 지도를 권장합니다.</span>
        <button type="button" class="btn-inline-fix" id="btn-fix-stigma-risk">🔄 모둠 순회 지도로 전환</button>
      </div>` : ''}
    `;
  }

  function renderStrategyBank() {
    renderCoopConsultationCard();

    // 1) 추천 전략 탭 전환 상태 동기화 (탭 1: 2단계 학년·교과 맞춤형 추천 / 탭 2: 범용 프리셋)
    const activeTab = STATE.activeRecTab || 'step2_custom';
    document.querySelectorAll('#rec-strategy-tabs-bar [data-rec-tab]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-rec-tab') === activeTab);
    });
    const step2PanelEl = document.getElementById('step2-custom-rec-panel');
    const genPanelEl = document.getElementById('general-presets-rec-panel');
    if (step2PanelEl) step2PanelEl.style.display = activeTab === 'step2_custom' ? 'block' : 'none';
    if (genPanelEl) genPanelEl.style.display = activeTab === 'general_presets' ? 'block' : 'none';

    // 2) 2단계 학년·교과·단원 맞춤형 추천 데이터 생성 및 렌더링 (작은 글씨는 ? 팝업으로 분리)
    const step2Rec = buildStep2TailoredRecommendations(KB, STATE);
    const cs = step2Rec.contextSummary;
    const tabSubEl = document.getElementById('rec-tab-step2-label');
    if (tabSubEl) {
      tabSubEl.textContent = `${cs.grade}학년 · ${cs.subjectShort} (${cs.areaLabel})`;
    }

    if (step2PanelEl) {
      const topIndiv = step2Rec.topStrategies.slice(0, 6);
      step2PanelEl.innerHTML = `
        <!-- 2단계 선택 내용 1줄 요약 바 -->
        <div class="step2-context-summary-bar compact">
          <div class="step2-ctx-main">
            <span class="step2-ctx-badge">📌 2단계 선택 연계</span>
            <strong>${cs.grade}학년</strong> ·
            <strong>${esc(cs.subjectShort)} (${esc(cs.areaLabel)})</strong>
            ${cs.subjStdCode ? `<span class="step2-ctx-code">${esc(cs.subjStdCode)}</span>` : ''}
            ${cs.libStdCode && cs.track !== 'B' ? `<span class="step2-ctx-code lib">${esc(cs.libStdCode)}</span>` : ''}
          </div>
          <button type="button" class="btn-help-mini" data-help-key="step3_step2_context" title="2단계 선택 연계 정보 상세 보기">? 연계 정보</button>
        </div>

        <!-- ① 2단계 학년·교과·단원 맞춤형 추천 조합 코스 (4종 · 간결 카드 + ? 팝업) -->
        <div class="step2-rec-subhead">
          <strong>① ${cs.grade}학년 『${esc(cs.subjectShort)}』 맞춤형 추천 코스 (클릭 시 바로 적용)</strong>
        </div>
        <div class="preset-grid-lg" style="margin-bottom:14px">
          ${step2Rec.packages.map(p => {
            const isCurrent = p.ids.length === STATE.selectedStrategies.length && p.ids.every((id, idx) => STATE.selectedStrategies[idx] === id);
            const stratNames = p.ids.map(id => (global.StrategyCatalog.byId[id] || {}).name).filter(Boolean);
            return `
              <div class="preset-card compact-preset ${isCurrent ? 'active' : ''} ${p.isSingleDeep ? 'preset-deep-single' : ''} ${p.isStep2Primary ? 'preset-step2-primary' : ''}" data-step2-pkg-id="${esc(p.id)}" role="button" tabindex="0">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
                  <div class="preset-name">${p.isSingleDeep ? '🔥' : (p.isStep2Primary ? '🎯' : '✨')} ${esc(p.name)}</div>
                  <div style="display:flex;align-items:center;gap:5px">
                    ${p.badge ? `<span class="preset-count-badge ${p.isSingleDeep ? 'single' : ''}">${esc(p.badge)}</span>` : ''}
                    <button type="button" class="btn-help-pop sm" data-pkg-help="${esc(p.id)}" title="코스 설명 및 포함 전략 상세 보기">?</button>
                  </div>
                </div>
                <div class="preset-strat-pills" style="margin-top:8px">
                  ${stratNames.map((n, idx) => `<span class="preset-mini-pill">${p.ids.length === 1 ? '단독 집중: ' : `${idx + 1}. `}${esc(n)}</span>`).join('')}
                </div>
              </div>`;
          }).join('')}
        </div>

        <!-- ② 2단계 학년·교과·성취기준 맞춤 개별 추천 전략 TOP 6 (간결 카드 + ? 팝업) -->
        <div class="step2-rec-subhead">
          <strong>② ${cs.grade}학년 『${esc(cs.subjectShort)}』 맞춤 개별 추천 전략 TOP 6</strong>
        </div>
        <div class="step2-top-indiv-grid">
          ${topIndiv.map((s, idx) => {
            const selectedIdx = STATE.selectedStrategies.indexOf(s.id);
            const isSelected = selectedIdx >= 0;
            const depthBadge = s.depth === 'deep'
              ? '<span class="strat-depth-tag deep">🔥 심화 (1개 단독)</span>'
              : s.depth === 'core'
                ? '<span class="strat-depth-tag core">⭐ 핵심 전략</span>'
                : '';
            const highlightClass = s.depth === 'deep'
              ? 'strat-is-deep'
              : s.depth === 'core'
                ? 'strat-is-core'
                : '';
            return `
              <div class="step2-indiv-card compact ${highlightClass} ${isSelected ? 'selected' : ''}">
                <div class="strat-card-top">
                  <span class="strat-cat-tag">${idx + 1}순위 · ${esc(s.cat)}</span>
                  ${depthBadge}
                  <button type="button" class="btn-help-pop sm" style="margin-left:auto" data-strat-help="${esc(s.id)}" title="전략 설명·발문·추천 근거 보기">?</button>
                </div>
                <div class="strat-card-title" style="margin:6px 0 10px">
                  ${isSelected ? `<span class="strat-order-badge">${selectedIdx + 1}</span>` : ''}
                  <strong>${esc(s.name)}</strong>
                </div>
                <div class="step2-indiv-actions">
                  <button type="button" class="btn-indiv-toggle ${isSelected ? 'on' : ''}" data-strat-id="${esc(s.id)}">
                    ${isSelected ? '✓ 담김' : '+ 담기'}
                  </button>
                  ${s.depth === 'deep' ? `
                    <button type="button" class="btn-indiv-only-deep" data-keep-only-id="${esc(s.id)}" title="이 심화 전략 1개만으로 수업 구성">
                      🔥 1개 단독
                    </button>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // 3) 범용 프리셋 탭 렌더링 (간결 카드 + ? 팝업)
    const presetEl = document.getElementById('strategy-presets');
    if (presetEl) {
      presetEl.innerHTML = STRATEGY_PRESETS.map(p => {
        const isCurrent = p.ids.length === STATE.selectedStrategies.length && p.ids.every(id => STATE.selectedStrategies.includes(id));
        const stratNames = p.ids.map(id => (global.StrategyCatalog.byId[id] || {}).name).filter(Boolean);
        return `
          <div class="preset-card compact-preset ${isCurrent ? 'active' : ''} ${p.isSingleDeep ? 'preset-deep-single' : ''}" data-preset-id="${esc(p.id)}" role="button" tabindex="0">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
              <div class="preset-name">${p.isSingleDeep ? '🔥' : '✨'} ${esc(p.name)}</div>
              <div style="display:flex;align-items:center;gap:5px">
                ${p.badge ? `<span class="preset-count-badge ${p.isSingleDeep ? 'single' : ''}">${esc(p.badge)}</span>` : ''}
                <button type="button" class="btn-help-pop sm" data-preset-help="${esc(p.id)}" title="코스 상세 설명 보기">?</button>
              </div>
            </div>
            <div class="preset-strat-pills" style="margin-top:8px">
              ${stratNames.map((n, idx) => `<span class="preset-mini-pill">${p.ids.length === 1 ? '단독 집중: ' : `${idx + 1}. `}${esc(n)}</span>`).join('')}
            </div>
          </div>`;
      }).join('');
    }

    const selectedObjs = STATE.selectedStrategies.map(id => global.StrategyCatalog.byId[id]).filter(Boolean);
    const count = selectedObjs.length;
    const deepInSelected = selectedObjs.filter(s => s.depth === 'deep');

    const pacingBannerEl = document.getElementById('strategy-pacing-banner');
    if (pacingBannerEl) {
      const badgeLabel = count === 1
        ? `🎯 1종 집중 구성 (활동지 1장)`
        : count === 2
          ? `✨ 2종 균형 구성 (활동지 2장)`
          : `📚 3종 단계별 구성 (활동지 3장)`;
      pacingBannerEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <span class="role-balance-pill ${deepInSelected.length && count >= 3 ? 'warn' : 'balanced'}">${esc(badgeLabel)}</span>
          ${deepInSelected.length && count >= 2 ? `
            <button type="button" class="btn-help-chip warn" data-keep-only-id="${esc(deepInSelected[0].id)}">
              🔥 【${esc(deepInSelected[0].name)}】 1개만 남기기
            </button>
          ` : ''}
        </div>
      `;
    }

    const trayEl = document.getElementById('selected-strategy-tray');
    if (trayEl) {
      const stageLabels = count === 1
        ? ['🎯 단독 집중 (활동지 ①)']
        : count === 2
          ? ['① 전반부 (활동지 ①)', '② 후반부 (활동지 ②)']
          : ['① 1단계 (활동지 ①)', '② 2단계 (활동지 ②)', '③ 3단계 (활동지 ③)'];

      trayEl.innerHTML = STATE.selectedStrategies.map((id, i) => {
        const s = global.StrategyCatalog.byId[id];
        if (!s) return '';
        const depthBadge = s.depth === 'deep'
          ? '<span class="strat-depth-tag deep">🔥 심화 (1개 단독)</span>'
          : s.depth === 'core'
            ? '<span class="strat-depth-tag core">⭐ 핵심 전략</span>'
            : '';
        const highlightClass = s.depth === 'deep'
          ? 'strat-is-deep'
          : s.depth === 'core'
            ? 'strat-is-core'
            : '';
        return `
          <div class="tray-item compact-tray-item ${highlightClass}">
            <div class="tray-item-top">
              <span class="tray-slot">${stageLabels[i] || `활동지 ${i + 1}`}</span>
              <span class="tray-cat">${esc(s.cat)}</span>
              ${depthBadge}
              <div class="tray-actions">
                <button type="button" class="btn-help-pop sm" data-strat-help="${esc(s.id)}" title="전략 상세 설명 및 발문 보기">?</button>
                ${i > 0 ? `<button type="button" class="tray-move" data-move-idx="${i}" data-dir="-1" title="앞으로 이동">◀</button>` : ''}
                ${i < STATE.selectedStrategies.length - 1 ? `<button type="button" class="tray-move" data-move-idx="${i}" data-dir="1" title="뒤로 이동">▶</button>` : ''}
                <button type="button" class="tray-remove" data-remove-id="${esc(s.id)}" title="제외">✕</button>
              </div>
            </div>
            <strong class="tray-name">${esc(s.name)}</strong>
          </div>`;
      }).join('');
    }

    const scored = scoreStrategies(KB, STATE);
    const step2RecIds = new Set(step2Rec.topStrategies.slice(0, 12).map(s => s.id));

    // 단계별 필터 버튼 활성 상태 동기화
    document.querySelectorAll('.phase-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-phase') === STATE.strategyFilterPhase);
    });

    const cats = uniq(['all', ...global.StrategyCatalog.list.map(s => s.cat)]);
    const catBar = document.getElementById('strategy-cat-bar');
    if (catBar) {
      catBar.innerHTML = cats.map(c => `
        <button type="button" class="filter-pill ${STATE.strategyFilterCat === c ? 'active' : ''}" data-cat="${esc(c)}">
          ${c === 'all' ? '전체 영역 (' + scored.length + ')' : esc(c)}
        </button>`
      ).join('');
    }

    const q = (STATE.strategySearch || '').trim().toLowerCase();
    const filtered = scored.filter(s => {
      if (STATE.strategyFilterCat !== 'all' && s.cat !== STATE.strategyFilterCat) return false;
      if (STATE.strategyFilterPhase === 'step2_rec') {
        if (!step2RecIds.has(s.id)) return false;
      } else if (STATE.strategyFilterPhase === 'core') {
        if (s.depth !== 'core') return false;
      } else if (STATE.strategyFilterPhase === 'deep') {
        if (s.depth !== 'deep') return false;
      } else if (STATE.strategyFilterPhase !== 'all') {
        const pNo = +STATE.strategyFilterPhase;
        if (!s.phases.includes(pNo)) return false;
      }
      if (q && !(s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q))) return false;
      return true;
    });

    const gridEl = document.getElementById('strategy-bank-grid');
    if (gridEl) {
      gridEl.innerHTML = filtered.map((s) => {
        const selectedIdx = STATE.selectedStrategies.indexOf(s.id);
        const isSelected = selectedIdx >= 0;
        const isTopRec = step2RecIds.has(s.id);
        const depthTag = s.depth === 'deep'
          ? '<span class="strat-depth-tag deep">🔥 심화 (1개 단독)</span>'
          : s.depth === 'core'
            ? '<span class="strat-depth-tag core">⭐ 핵심 전략</span>'
            : '';
        const highlightClass = s.depth === 'deep'
          ? 'strat-is-deep'
          : s.depth === 'core'
            ? 'strat-is-core'
            : '';
        return `
          <div class="strat-card compact-strat-card ${highlightClass} ${isSelected ? 'selected' : ''}" data-strat-id="${esc(s.id)}">
            <div class="strat-card-top">
              <span class="strat-cat-tag">${esc(s.cat)}</span>
              ${depthTag}
              ${isTopRec ? `<span class="strat-rec-star">🎯 맞춤추천</span>` : ''}
              <button type="button" class="btn-help-pop sm" style="margin-left:auto" data-strat-help="${esc(s.id)}" title="전략 상세 안내 · 발문 보기">?</button>
            </div>
            <div class="strat-card-title" style="margin:6px 0 8px">
              ${isSelected ? `<span class="strat-order-badge">${selectedIdx + 1}</span>` : ''}
              <strong>${esc(s.name)}</strong>
            </div>
            <div class="strat-card-foot">
              <span class="strat-toggle-label">${isSelected ? '✓ 내 수업에 담김' : '+ 내 수업에 담기'}</span>
            </div>
          </div>`;
      }).join('');
    }
  }

  /* =====================================================================
   *  Step 4: 지도안(교사 최종 확인 안내 포함) / 텍스트 / 활동지 렌더링
   * ===================================================================== */
  function renderLessonPlanDocument(plan) {
    const ce = plan.contentElements;
    const cf = plan.conceptualFrame;
    const isCoop = plan.track === 'A';

    return `
      <article class="doc-sheet" id="lesson-plan-sheet" ${STATE.editableMode ? 'contenteditable="true"' : ''}>
        <div class="doc-banner track-${plan.track.toLowerCase()}">
          <div>
            <span class="doc-track-pill">${esc(plan.trackBadge)}</span>
            <h2 class="doc-main-title">${esc(plan.unitTitle)} — 교수·학습 과정안</h2>
            <p class="doc-sub-title">${esc(plan.modelName)}</p>
          </div>
          <div class="doc-meta-stamp">
            <div>대상: <strong>초등 ${plan.grade}학년 (${plan.gradeBand}학년군)</strong></div>
            <div>차시 시간: <strong>${esc(plan.duration)}</strong></div>
            <div>수업 장소: <strong>${esc(plan.place)}</strong></div>
          </div>
        </div>

        <!-- 문서 내부 교사 최종 확인 필수 안내 박스 -->
        <div class="doc-verify-notice ${STATE.teacherVerified ? 'verified' : ''}">
          <strong>${STATE.teacherVerified ? '✅ [교사 확인 완료]' : '⚠️ [교사 최종 확인 안내]'}</strong>
          제공된 <strong>교과 내용 체계, 성취기준, 교과 핵심역량 및 교수·학습 활동</strong>은 온톨로지 기반 자동 생성 예시이므로 실제 교육과정 고시 원문이나 학교 현장 여건과 다를 수 있습니다. 수업 적용 전 반드시 <strong>지도 교사의 최종 확인 및 재구성</strong>을 거쳐 활용하시기 바랍니다.
        </div>

        <!-- 1. 기본 수업 개요 및 교육과정·온톨로지 연계표 -->
        <h3 class="doc-sec-title">1. 교육과정 성취기준 및 내용 체계 매핑 개요 (교사 확인 필수)</h3>
        <table class="doc-table">
          <tbody>
            <tr>
              <th style="width:18%">수업 형태 / 지도교사</th>
              <td style="width:32%"><strong>${esc(plan.trackTitle)}</strong><br><small>지도: ${esc(plan.teachers)}</small></td>
              <th style="width:18%">대상 교과 및 영역</th>
              <td style="width:32%"><strong>${esc(plan.subjectName)}</strong> &gt; ${esc(plan.areaName)}</td>
            </tr>
            ${plan.subjectStandard ? `
            <tr>
              <th>${esc(plan.subjectShort)} 교과<br>성취기준 (2022 개정)</th>
              <td colspan="3">
                <strong style="color:#0f766e;font-size:15px">${esc(plan.subjectStandard.code)}</strong> <strong>${esc(plan.subjectStandard.text)}</strong>
                <div style="font-size:13px;color:#475569;margin-top:4px">• 해설: ${esc(plan.subjectStandard.desc)} | 영역: <strong>${esc(plan.subjectStandard.areaName)}</strong></div>
              </td>
            </tr>` : ''}
            ${plan.libraryStandard ? `
            <tr>
              <th>2022 도서관과 정보생활<br>${plan.track === 'A' ? '연계 성취기준' : '성취기준'}</th>
              <td colspan="3">
                <strong style="color:#1d4ed8;font-size:15px">${esc(plan.libraryStandard.code)}</strong> <strong>${esc(plan.libraryStandard.text)}</strong>
                <div style="font-size:13px;color:#475569;margin-top:4px">• 해설: ${esc(plan.libraryStandard.desc)}${plan.kdcRecommendations && plan.kdcRecommendations.length ? ` | 추천 KDC 분류: <strong>${plan.kdcRecommendations.map(k => `KDC ${k.code}(${k.name})`).join(', ')}</strong>` : ''}</div>
              </td>
            </tr>` : ''}
            <tr>
              <th>2022 내용 요소<br><small>(원문 대조 확인)</small></th>
              <td colspan="3">
                <strong>[지식·이해]</strong> ${esc(ce.knowledge.join(', '))} &nbsp;|&nbsp;
                <strong>[과정·기능]</strong> ${esc(ce.skills.join(', '))} &nbsp;|&nbsp;
                <strong>[가치·태도]</strong> ${esc(ce.attitudes.join(', '))}
              </td>
            </tr>
            <tr>
              <th>${plan.track === 'C' ? '도서관과 정보생활<br>교과 역량' : `${esc(plan.subjectShort)} 교과 핵심역량`}</th>
              <td colspan="3">${plan.competencies.map(c => `<span class="doc-tag">${esc(c)}</span>`).join(' ')}</td>
            </tr>
          </tbody>
        </table>

        ${isCoop && plan.cooperationDesignMeta ? `
        <!-- 1-2. 도서관협력수업 통합 설계 및 교사 간 역할 분담 명세 -->
        <h3 class="doc-sec-title">1-2. 도서관협력수업 통합 설계 및 교사 간 역할 분담 · 사전협의 명세</h3>
        <table class="doc-table">
          <tbody>
            <tr>
              <th style="width:18%">협력수업 단계</th>
              <td style="width:32%"><strong>${esc(plan.cooperationDesignMeta.cooperationLevel.label)}</strong></td>
              <th style="width:18%">도서관 탐구활동</th>
              <td style="width:32%">
                ${plan.cooperationDesignMeta.infoActivities.map(a => `<span class="doc-tag" style="background:#eef2ff;color:#3730a3;font-weight:800">${a.icon} ${esc(a.label)}</span>`).join(' ')}
              </td>
            </tr>
            <tr>
              <th>협력수업 형태<br><small>(역할 비중)</small></th>
              <td>
                <strong>${esc(plan.cooperationDesignMeta.coTeachingApproach.label)}</strong><br>
                <small style="color:#1d4ed8;font-weight:700">교과교사 ${plan.cooperationDesignMeta.roleBalance.subjectTeacherRatio}% : 사서교사 ${plan.cooperationDesignMeta.roleBalance.librarianTeacherRatio}%</small>
              </td>
              <th>시간표 운영 방식</th>
              <td>
                <strong>${esc(plan.cooperationDesignMeta.scheduleModel.label)}</strong><br>
                <small>${esc(plan.cooperationDesignMeta.scheduleModel.durationText)}</small>
              </td>
            </tr>
            <tr>
              <th>교과교사 핵심 역할</th>
              <td>
                ${plan.cooperationDesignMeta.roleBalance.subjectTeacherRoles.map(r => `<div style="margin-bottom:3px">• ${esc(r)}</div>`).join('')}
              </td>
              <th>사서교사 핵심 역할</th>
              <td>
                ${plan.cooperationDesignMeta.roleBalance.librarianTeacherRoles.map(r => `<div style="margin-bottom:3px">• ${esc(r)}</div>`).join('')}
              </td>
            </tr>
            <tr>
              <th>도서관 · 디지털<br>도구 활용</th>
              <td colspan="3">
                <strong>[${esc(plan.cooperationDesignMeta.picratIntegration.code)}] ${esc(plan.cooperationDesignMeta.picratIntegration.surfaceLabel)}</strong>
                — 활용 도구: <strong>${esc(plan.cooperationDesignMeta.picratIntegration.toolExamples.join(', '))}</strong>
                <div style="font-size:12.5px;color:#475569;margin-top:2px">• 기대 효과: ${esc(plan.cooperationDesignMeta.picratIntegration.pedagogicalEffect)}</div>
              </td>
            </tr>
            <tr>
              <th>학생 맞춤형 배려<br><small>(학습격차 완화)</small></th>
              <td colspan="3">
                <strong>${esc(plan.cooperationDesignMeta.inclusiveSupportPlan.modeLabel)}</strong>
                <div style="font-size:12.5px;color:#475569;margin-top:2px">• 운영 가이드: ${esc(plan.cooperationDesignMeta.inclusiveSupportPlan.scaffoldingNote)}</div>
              </td>
            </tr>
            <tr>
              <th>교과×사서교사<br>5분 핵심 협의</th>
              <td colspan="3">
                <div style="margin-bottom:4px"><strong>[수업 전 3분 핵심 체크]</strong> ${plan.cooperationDesignMeta.quickConsultationChecklist.preLesson3Min.map(c => `□ ${esc(c)}`).join(' &nbsp;|&nbsp; ')}</div>
                <div><strong>[수업 후 2분 핵심 성찰]</strong> ${plan.cooperationDesignMeta.quickConsultationChecklist.postLesson2Min.map(c => `□ ${esc(c)}`).join(' &nbsp;|&nbsp; ')}</div>
              </td>
            </tr>
          </tbody>
        </table>` : ''}

        <!-- 2. 개념기반 탐구 설계 프레임 -->
        <h3 class="doc-sec-title">2. 개념기반 탐구 설계 프레임 (Concept-Based Inquiry Frame)</h3>
        <table class="doc-table">
          <tbody>
            <tr>
              <th style="width:16%">핵심 개념 (Lens)</th>
              <td style="width:34%">
                ${cf.macroConcepts.map(c => `<span class="doc-concept-badge">${esc(c)}</span>`).join(' × ')}
              </td>
              <th style="width:16%">적용 수업 전략</th>
              <td style="width:34%">${plan.strategies.map((s, i) => `<strong>${i + 1}. ${esc(s.name)}</strong>`).join(' → ')}</td>
            </tr>
            <tr>
              <th>일반화 진술<br><small>(영속적 이해)</small></th>
              <td colspan="3" class="doc-gen-highlight">
                " ${esc(cf.generalization)} "
              </td>
            </tr>
            <tr>
              <th>탐구 질문 위계</th>
              <td colspan="3">
                <div>• <strong>[사실적 질문 (Factual)]</strong> ${esc(cf.factualQ)}</div>
                <div>• <strong>[개념적 질문 (Conceptual)]</strong> ${esc(cf.conceptualQ)}</div>
                <div>• <strong>[논쟁적 질문 (Debatable)]</strong> ${esc(cf.debatableQ)}</div>
              </td>
            </tr>
            <tr>
              <th>차시 학습목표</th>
              <td colspan="3">
                ${plan.objectives.map(o => `<div>✓ ${esc(o)}</div>`).join('')}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 3. 40분 차시 교수·학습 과정안 -->
        <h3 class="doc-sec-title">3. 본시 교수·학습 과정안 (${isCoop ? '교과교사 × 사서교사 2열 코티칭' : '1열 탐구 과정안'})</h3>
        <table class="doc-table timeline-table">
          <thead>
            ${isCoop ? `
            <tr>
              <th style="width:13%">단계 (시간)<br>적용 전략</th>
              <th style="width:27%">교과교사 활동 및 발문</th>
              <th style="width:27%">사서교사 활동 및 발문</th>
              <th style="width:20%">학생 탐구 활동</th>
              <th style="width:13%">자료 및 평가(★)</th>
            </tr>` : `
            <tr>
              <th style="width:15%">단계 (시간)<br>적용 전략</th>
              <th style="width:42%">교사 교수 활동 및 핵심 발문</th>
              <th style="width:27%">학생 탐구 활동</th>
              <th style="width:16%">자료 및 평가(★)</th>
            </tr>`}
          </thead>
          <tbody>
            ${plan.timeline.map(row => isCoop ? `
            <tr>
              <td class="td-phase">
                <strong>${esc(row.phase)}</strong>
                <div class="td-subphase">${esc(row.subPhase)}</div>
                <span class="td-time">${esc(row.time)}</span>
                <div class="td-strat-pill">【${esc(row.strategy.name)}】</div>
              </td>
              <td>${row.subjectTeacher.map(line => `<p>${esc(line)}</p>`).join('')}</td>
              <td class="td-librarian">${row.librarianTeacher.map(line => `<p>${esc(line)}</p>`).join('')}</td>
              <td>${row.studentActivity.map(line => `<p>${esc(line)}</p>`).join('')}</td>
              <td class="td-meta">
                <div><strong>[자료]</strong> ${esc(row.materials.join(', '))}</div>
                <div style="margin-top:4px"><strong>[★평가]</strong> ${esc(row.assessment)}</div>
              </td>
            </tr>` : `
            <tr>
              <td class="td-phase">
                <strong>${esc(row.phase)}</strong>
                <div class="td-subphase">${esc(row.subPhase)}</div>
                <span class="td-time">${esc(row.time)}</span>
                <div class="td-strat-pill">【${esc(row.strategy.name)}】</div>
              </td>
              <td>${row.teacherActivity.map(line => `<p>${esc(line)}</p>`).join('')}</td>
              <td>${row.studentActivity.map(line => `<p>${esc(line)}</p>`).join('')}</td>
              <td class="td-meta">
                <div><strong>[자료]</strong> ${esc(row.materials.join(', '))}</div>
                <div style="margin-top:4px"><strong>[★평가]</strong> ${esc(row.assessment)}</div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>

        <!-- 4. 과정중심 평가 루브릭 -->
        <h3 class="doc-sec-title">4. 과정중심 수행평가 기준표 (Rubric)</h3>
        <table class="doc-table">
          <thead>
            <tr>
              <th style="width:22%">평가 요소</th>
              <th style="width:26%">상 (매우 잘함)</th>
              <th style="width:26%">중 (잘함)</th>
              <th style="width:26%">하 (노력 요함)</th>
            </tr>
          </thead>
          <tbody>
            ${plan.rubric.map(r => `
            <tr>
              <th>${esc(r.criterion)}</th>
              <td>${esc(r.high)}</td>
              <td>${esc(r.mid)}</td>
              <td>${esc(r.low)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </article>`;
  }

  function buildBookstoreLinks(query) {
    const q = encodeURIComponent((query || '').trim() || '도서관');
    return {
      aladin: `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${q}`,
      yes24: `https://www.yes24.com/Product/Search?domain=BOOK&query=${q}`,
      kyobo: `https://search.kyobobook.co.kr/search?keyword=${q}`,
      nlcy: `https://www.nlcy.go.kr/NLCY/contents/C10101000000.do?schM=list&schText=${q}`,
    };
  }

  // 단원 영역별 실제 서점 검색 적중률이 높은 핵심 '단일 단어(1어절)' 추천 사전
  const AREA_SINGLE_WORD_BOOK_KEYWORDS = {
    // 사회
    LocalPlaceLife: ['우리고장', '지역사회', '지역문제', '문화유산', '지도', '마을', '지형'],
    SocietyChangeDemocracy: ['민주주의', '인권', '선거', '헌법', '다문화', '시민', '국회'],
    EconomyLifeGlobal: ['경제', '시장', '소비', '무역', '기후변화', '환경', '지구촌'],
    HistoryHeritage: ['한국사', '문화유산', '역사', '유물', '독립운동', '조선', '인물'],
    // 과학
    MovementEnergy: ['에너지', '전기', '자석', '빛', '소리', '속력', '힘'],
    MatterMatterChange: ['물질', '화학', '용액', '기체', '액체', '연소', '실험'],
    LifeEcosystem: ['생태계', '먹이그물', '생물다양성', '환경', '식물', '동물', '곤충'],
    EarthSpace: ['우주', '태양계', '화산', '지진', '화석', '날씨', '지구'],
    // 국어
    ListeningSpeaking: ['대화', '토론', '말하기', '발표', '경청', '소통'],
    Reading: ['독서', '문해력', '비문학', '추론', '글읽기', '요약'],
    Writing: ['글쓰기', '논술', '일기', '편지', '저작권', '작문'],
    GrammarLiteracy: ['어휘력', '맞춤법', '한글', '훈민정음', '속담', '낱말'],
    Literature: ['동화', '동시', '문학', '이야기', '전래동화', '인물'],
    Media: ['미디어', '가짜뉴스', '팩트체크', '뉴스', '광고', '정보윤리'],
    // 수학
    NumberOperations: ['분수', '소수', '자연수', '사칙연산', '수학', '계산'],
    GeometryMeasurement: ['도형', '입체도형', '측정', '넓이', '각도', '시계'],
    PatternsRelationships: ['규칙', '비율', '비례', '패턴', '수학퍼즐'],
    DataPossibility: ['그래프', '통계', '평균', '확률', '데이터'],
    // 통합교과 (1~2학년)
    SchoolAndI: ['학교', '입학', '친구', '교실', '안전', '규칙'],
    PeopleAndVillage: ['마을', '이웃', '직업', '공공장소', '동네', '가족'],
    NatureAndSeasons: ['사계절', '봄', '여름', '가을', '겨울', '자연', '동식물'],
    WorldAndFuture: ['세계문화', '다문화', '전통놀이', '미래', '통일', '지구촌'],
    // 도덕
    SelfRelation: ['정직', '성실', '자존감', '생명존중', '감정', '자율'],
    OthersRelation: ['배려', '공감', '우정', '예절', '갈등해결', '사이버예절'],
    SocietyRelation: ['인권', '공정', '준법', '다문화', '봉사', '공동체'],
    NatureUniverseRelation: ['환경보호', '생태', '평화', '통일', '생명', '지구'],
    // 영어·체육·음악·미술·실과
    ReceptiveSkills: ['영어동화', '파닉스', '영단어', '알파벳', '영어'],
    ProductiveSkills: ['영어회화', '영단어', '영어동화', '알파벳', '소통'],
    SocioCulturalAspects: ['세계문화', '다문화', '명절', '전통문화', '지구촌'],
    HealthMovement: ['건강', '체력', '운동', '면역력', '식습관'],
    ChallengeMovement: ['스포츠', '육상', '수영', '체조', '도전'],
    CompetitionMovement: ['축구', '야구', '배드민턴', '페어플레이', '올림픽'],
    ExpressionMovement: ['무용', '전통춤', '체조', '리듬', '신체표현'],
    SafetyMovement: ['안전', '응급처치', '심폐소생술', '수상안전', '재난안전'],
    MusicExpression: ['음악', '노래', '악기', '합창', '리듬'],
    MusicCreation: ['작곡', '소리', '리듬', '악기', '음악'],
    MusicAppreciation: ['국악', '클래식', '판소리', '민요', '오케스트라'],
    MusicEverydayLife: ['음악회', '공연예절', '저작권', '축제', '음악'],
    AestheticExperience: ['미술', '디자인', '색채', '관찰', '시각문화'],
    ArtisticExpression: ['그림', '조형', '공예', '업사이클링', '드로잉'],
    ArtAppreciation: ['명화', '전통미술', '미술관', '화가', '전시회'],
    HumanDevelopmentLiving: ['요리', '영양소', '바느질', '가족', '성장'],
    LifeResourcesLivingEnvironment: ['용돈', '재활용', '분리배출', '환경', '정리정돈'],
    TechnologyWorldMaking: ['발명', '로봇', '건축', '식물기르기', '반려동물'],
    DigitalInformationTechnology: ['코딩', '인공지능', '알고리즘', '저작권', '사이버윤리'],
  };

  // 복합 구절 → 실제 서점 검색용 1단어(붙여쓰기 단일 명사) 변환 매핑
  const PHRASE_TO_SINGLE_BOOK_WORD = [
    { re: /고장|지역\s*사회|우리가\s*사는\s*지역/, words: ['우리고장', '지역사회', '지역문제', '마을'] },
    { re: /문화\s*유산|역사\s*문화/, words: ['문화유산', '역사', '유물'] },
    { re: /생태계|먹이\s*그물|먹이\s*사슬|생물\s*다양성/, words: ['생태계', '먹이그물', '생물다양성', '환경'] },
    { re: /십진\s*분류|KDC|청구\s*기호|서가/, words: ['도서관', '십진분류법', '청구기호', '백과사전'] },
    { re: /신뢰성|CRAAP|가짜\s*뉴스|허위\s*정보|매체/, words: ['가짜뉴스', '미디어', '팩트체크', '정보윤리'] },
    { re: /사실과\s*의견|설득|주장|토론/, words: ['토론', '논술', '비판적읽기', '미디어'] },
    { re: /저작권|출처|인용/, words: ['저작권', '정보윤리', '글쓰기', '도서관'] },
    { re: /기후\s*변화|환경\s*문제|지속\s*가능/, words: ['기후변화', '환경오염', '지구온난화', '생태'] },
    { re: /민주\s*주의|선거|인권/, words: ['민주주의', '인권', '선거', '헌법'] },
    { re: /사계절|봄|여름|가을|겨울|동식물/, words: ['사계절', '자연', '동식물', '날씨'] },
  ];

  // 도서 검색어로 부적합한 일반 수업 용어(불용어)
  const BOOK_SEARCH_STOPWORDS = new Set([
    '초등', '어린이', '탐구', '이해', '방법', '모습', '생활', '우리', '알아보기', '찾기',
    '세우기', '구분', '구별', '비교', '분석', '구성', '요소', '변화', '특징', '원리',
    '실천', '활용', '중심', '내용', '생각', '이야기', '교실', '학교', '수업', '단원',
    '학습', '과제', '관계', '영향', '보전', '보호', '가치', '의미', '종류', '성질',
    '현상', '과정', '결과', '원인', '문제', '해결', '태도', '습관', '활동', '자료',
    '정보', '평가', '판별', '올바른', '다양한', '여러', '가지', '통한', '대한', '위한',
    '원하는', '달라지는', '살펴보기', '만들기', '기르기', '익히기', '표현', '감상',
  ]);

  /**
   * 4단계 도서검색 배너용: 단어 조합이 아닌 실제 검색 적중률 높은 '1개 단일 단어'만 추출
   */
  function extractSingleWordBookKeywords(plan, text) {
    const out = [];
    const addWord = raw => {
      if (!raw) return;
      // 괄호 및 특수문자 제거 후 공백 제거한 순수 한글/영문 단일 명사만 허용
      let w = String(raw)
        .replace(/\([^)]*\)/g, '')
        .replace(/[^가-힣a-zA-Z0-9]/g, '')
        .trim();
      // 조사 제거 (은/는/이/가/을/를/의/와/과/로/으로/에서/에)
      w = w.replace(/(으로부터|에서|으로|이란|란|은|는|이|가|을|를|의|와|과|로|도|만)$/, '');
      if (w.length < 2 || w.length > 7) return;
      if (BOOK_SEARCH_STOPWORDS.has(w)) return;
      if (!out.includes(w)) out.push(w);
    };

    const kList = (plan.contentElements && Array.isArray(plan.contentElements.knowledge))
      ? plan.contentElements.knowledge
      : [];
    const contextText = [
      plan.topic || '',
      plan.areaName || '',
      ...kList,
      ...(text && Array.isArray(text.keywords) ? text.keywords : []),
    ].join(' ');

    // 1) 주제·지식요소 문맥에서 핵심 단일어 매핑 우선 추출 (예: 우리 고장 -> 우리고장, 지역사회, 지역문제)
    PHRASE_TO_SINGLE_BOOK_WORD.forEach(rule => {
      if (rule.re.test(contextText)) {
        rule.words.forEach(addWord);
      }
    });

    // 2) 현재 단원 영역(areaId)의 검증된 단일 단어 키워드 추가
    const areaId = STATE.areaId || (plan.subjectStandard && plan.subjectStandard.areaId) || '';
    if (plan.track === 'C') {
      ['도서관', '십진분류법', '정보탐색', '저작권', '미디어', '독서', '백과사전'].forEach(addWord);
    }
    if (areaId && AREA_SINGLE_WORD_BOOK_KEYWORDS[areaId]) {
      AREA_SINGLE_WORD_BOOK_KEYWORDS[areaId].forEach(addWord);
    }

    // 3) 지식·이해 요소 및 주제어에서 어절 단위로 쪼개어 핵심 단일 명사 추출
    [...kList, plan.topic || ''].forEach(phrase => {
      String(phrase || '')
        .replace(/\([^)]*\)/g, ' ')
        .split(/[\s·,\/\-]+/)
        .forEach(token => addWord(token));
    });

    // 4) 핵심 개념 렌즈 및 어휘 사전의 단일 단어 보충
    if (text && Array.isArray(text.vocab)) {
      text.vocab.forEach(v => {
        if (v && v.word && !/\s/.test(v.word.trim())) addWord(v.word);
      });
    }
    if (plan.conceptualFrame && Array.isArray(plan.conceptualFrame.macroConcepts)) {
      plan.conceptualFrame.macroConcepts.forEach(c => {
        if (c && !/\s/.test(c.trim())) addWord(c);
      });
    }

    if (!out.length) {
      ['도서관', '독서', '과학', '역사', '환경', '생태계'].forEach(addWord);
    }
    return out.slice(0, 7);
  }

  function renderReadingTextDocument(plan, text) {
    const isClassOnly = plan.track === 'B';
    const headerRightBadge = isClassOnly
      ? `<span class="reading-callno-pill">📌 적용 교과 성취기준: <strong>${esc(plan.subjectStandard ? plan.subjectStandard.code : '')}</strong> (${esc(plan.subjectShort)} · ${esc(plan.areaName)})</span>`
      : `<span class="reading-callno-pill">${plan.subjectStandard ? `📌 교과 <strong>${esc(plan.subjectStandard.code)}</strong> · ` : ''}📚 ${plan.libraryStandard ? `도서관 <strong>${esc(plan.libraryStandard.code)}</strong> · ` : ''}추천 서가 분류: <strong>KDC ${esc(text.source.kdcCode)} (${esc(text.source.kdcName)})</strong></span>`;

    const candidateKeywords = extractSingleWordBookKeywords(plan, text);
    const defaultSearchWord = candidateKeywords[0] || '도서관';
    const links = buildBookstoreLinks(defaultSearchWord);

    const bookstoreSearchBox = `
      <div class="bookstore-search-box no-print" contenteditable="false">
        <div class="bookstore-head">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <strong>🔎 수업 주제 연계 실제 도서 검색 (알라딘 · 예스24 · 교보문고 · 어린이도서관 웹 연동)</strong>
          </div>
          ${!isClassOnly ? `<span class="bookstore-kdc-tag">추천 서가: KDC ${esc(text.source.kdcCode)} ${esc(text.source.kdcName)}</span>` : ''}
        </div>

        <div class="bookstore-chip-row">
          <span class="bookstore-chip-label">추천 핵심 단어 클릭:</span>
          ${candidateKeywords.map((kw, idx) => `
            <button type="button" class="bookstore-kw-chip ${idx === 0 ? 'active' : ''}" data-book-kw="${esc(kw)}">#${esc(kw)}</button>
          `).join('')}
        </div>

        <div class="bookstore-control-row">
          <input type="search" id="bookstore-query-input" class="text-input-lg bookstore-input" value="${esc(defaultSearchWord)}" placeholder="검색할 핵심 단어 1개를 입력하세요 (예: 우리고장, 지역사회, 생태계, 저작권)">
          <div class="bookstore-btn-group">
            <a id="link-store-aladin" href="${esc(links.aladin)}" target="_blank" rel="noopener noreferrer" class="btn-bookstore aladin">📘 알라딘 도서 검색 ↗</a>
            <a id="link-store-yes24" href="${esc(links.yes24)}" target="_blank" rel="noopener noreferrer" class="btn-bookstore yes24">📗 예스24 도서 검색 ↗</a>
            <a id="link-store-kyobo" href="${esc(links.kyobo)}" target="_blank" rel="noopener noreferrer" class="btn-bookstore kyobo">📙 교보문고 검색 ↗</a>
            <a id="link-store-nlcy" href="${esc(links.nlcy)}" target="_blank" rel="noopener noreferrer" class="btn-bookstore nlcy">🏛️ 국립어린이청소년도서관 ↗</a>
          </div>
        </div>
      </div>`;

    const st = text.stats || (global.Generators && global.Generators.computeReadingTextStats
      ? global.Generators.computeReadingTextStats(text.paragraphs, plan.grade)
      : null);
    const gradeTypographyClass = plan.grade <= 2
      ? 'reading-grade-12'
      : (plan.grade <= 4 ? 'reading-grade-34' : 'reading-grade-56');

    const lengthInfoBar = st ? `
      <div class="reading-length-info-bar no-print" contenteditable="false">
        <div class="reading-len-main">
          <span class="reading-len-badge">📏 ${plan.grade}학년 맞춤 분량</span>
          <strong>공백 포함 ${st.charCountWithSpaces.toLocaleString()}자</strong>
          <span style="color:#475569;font-size:12.5px">(공백 제외 ${st.charCountNoSpaces.toLocaleString()}자 · ${st.paragraphCount}단락 · ${st.sentenceCount}문장 · 예상 읽기 ${esc(st.estimatedReadTime)})</span>
        </div>
        <div class="reading-len-right">
          <span class="reading-target-tag">🎯 ${plan.grade}학년 적정 기준: ${esc(st.targetRangeLabel)}</span>
          <button type="button" class="btn-help-pop sm" data-help-key="step4_text_length_guide" title="1~6학년 연령별 적정 글자수 및 문단 기준표 보기">?</button>
        </div>
      </div>
    ` : '';

    return `
      <article class="doc-sheet reading-sheet" id="reading-text-sheet" ${STATE.editableMode ? 'contenteditable="true"' : ''}>
        <div class="reading-header">
          <div class="reading-kdc-bar">
            <span class="reading-genre-pill">수업용 읽기 텍스트 · ${esc(text.genreName)} ${text.isAiGenerated ? '· ✨ Gemini AI 맞춤 집필' : ''}</span>
            ${headerRightBadge}
          </div>
          <h2 class="reading-title">${esc(text.title)}</h2>
          <p class="reading-sub">${esc(text.subtitle)} &nbsp;|&nbsp; 핵심 개념 렌즈: <strong>${esc(plan.conceptualFrame.macroConcepts.join(' · '))}</strong></p>
        </div>

        ${lengthInfoBar}

        <div class="reading-body-box ${gradeTypographyClass}">
          ${text.paragraphs.map(p => `<p class="reading-para">${esc(p)}</p>`).join('')}
        </div>

        <div class="reading-bottom-grid">
          <div class="reading-subcard">
            <h4>📖 쏙쏙 핵심 어휘 사전</h4>
            <ul class="vocab-list">
              ${text.vocab.map(v => `<li><strong>${esc(v.word)}</strong>: ${esc(v.meaning)}</li>`).join('')}
            </ul>
          </div>
          <div class="reading-subcard">
            <h4>💬 읽고 함께 생각 나누기 (3단계 발문)</h4>
            <ol class="reading-q-list">
              <li>${esc(text.questions.factual)}</li>
              <li>${esc(text.questions.inferential)}</li>
              <li>${esc(text.questions.critical)}</li>
            </ol>
          </div>
        </div>

        ${bookstoreSearchBox}
      </article>`;
  }

  function regenerateAll() {
    CURRENT_TEXT = generateReadingText(KB, STATE);
    CURRENT_PLAN = generateLessonPlan(KB, STATE, CURRENT_TEXT);
    CURRENT_WORKSHEETS = generateWorksheets(CURRENT_PLAN, CURRENT_TEXT);

    const planContainer = document.getElementById('output-tab-plan');
    const textContainer = document.getElementById('output-tab-text');
    const wsContainer = document.getElementById('output-tab-worksheet');
    const allPrintContainer = document.getElementById('all-print-bundle');

    const planHtml = renderLessonPlanDocument(CURRENT_PLAN);
    const textHtml = renderReadingTextDocument(CURRENT_PLAN, CURRENT_TEXT);
    const wsHtml = CURRENT_WORKSHEETS.map(w => w.html).join('');

    if (planContainer) planContainer.innerHTML = planHtml;
    if (textContainer) textContainer.innerHTML = textHtml;
    if (wsContainer) wsContainer.innerHTML = `<div class="ws-bundle-wrap">${wsHtml}</div>`;
    if (allPrintContainer) {
      allPrintContainer.innerHTML = `
        <div>
          ${planHtml}
          <div style="page-break-before:always"></div>
          ${textHtml}
          ${wsHtml}
        </div>`;
    }

    const wsCountBadge = document.getElementById('ws-count-badge');
    if (wsCountBadge) wsCountBadge.textContent = CURRENT_WORKSHEETS.length;
    syncVerificationLockUI();
    updateStepperSummary();
  }

  function syncVerificationLockUI() {
    const verified = !!STATE.teacherVerified;
    const chk = document.getElementById('chk-teacher-verified');
    if (chk && chk.checked !== verified) chk.checked = verified;

    const banner = document.getElementById('teacher-verify-banner') || document.querySelector('.teacher-verify-banner');
    if (banner) banner.classList.toggle('verified', verified);

    const iconEl = document.getElementById('verify-status-icon');
    if (iconEl) iconEl.textContent = verified ? '✅' : '🔒';

    const titleEl = document.getElementById('verify-status-title');
    if (titleEl) {
      titleEl.textContent = verified
        ? '[검수 완료] 교사 최종 확인이 완료되어 저장 · 다운로드 · 인쇄 기능이 활성화되었습니다'
        : '[필수 확인] 교육과정 성취기준 · 읽기 자료 · 활동지 교사 최종 검수 (우측 체크 후 저장·다운로드 가능)';
    }

    const labelTextEl = document.getElementById('verify-check-label-text');
    if (labelTextEl) {
      labelTextEl.textContent = verified ? '✅ 교사 최종 확인 완료됨' : '교사 최종 확인 완료 (체크 시 잠금 해제)';
    }

    const lockTargets = [
      { id: 'btn-save-my-lesson', unlockedText: '💾 내 자료함에 수업 저장', lockedText: '🔒 내 자료함에 수업 저장' },
      { id: 'btn-export-hwp', unlockedText: '⬇ 한글/워드(.doc)', lockedText: '🔒 한글/워드(.doc)' },
      { id: 'btn-export-md', unlockedText: '⬇ MD', lockedText: '🔒 MD' },
      { id: 'btn-print-all', unlockedText: '🖨️ 전체 인쇄 / PDF', lockedText: '🔒 전체 인쇄 / PDF' },
      { id: 'btn-modal-save-lesson', unlockedText: '💾 현재 수업 저장하기', lockedText: '🔒 현재 수업 저장하기 (4단계 검수 필요)' },
    ];
    lockTargets.forEach(t => {
      const btn = document.getElementById(t.id);
      if (!btn) return;
      btn.classList.toggle('locked-until-verified', !verified);
      btn.setAttribute('aria-disabled', verified ? 'false' : 'true');
      btn.textContent = verified ? t.unlockedText : t.lockedText;
    });
  }

  function requireTeacherVerification(actionLabel) {
    if (STATE.teacherVerified) return true;
    if (CURRENT_STEP !== 4) {
      goToStep(4);
    }
    const banner = document.getElementById('teacher-verify-banner') || document.querySelector('.teacher-verify-banner');
    if (banner) {
      banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      banner.classList.remove('verify-shake');
      void banner.offsetWidth;
      banner.classList.add('verify-shake');
    }
    showToast(`🔒 상단의 [☑ 교사 최종 확인 완료]에 먼저 체크해 주셔야 ${actionLabel || '저장 및 다운로드'}가 가능합니다.`);
    return false;
  }

  function updateOutputTabVisibility() {
    if (!['plan', 'text', 'worksheet'].includes(STATE.activeOutputTab)) {
      STATE.activeOutputTab = 'plan';
    }
    document.querySelectorAll('.output-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === STATE.activeOutputTab);
    });
    document.querySelectorAll('.output-pane').forEach(pane => {
      pane.classList.toggle('active', pane.getAttribute('data-pane') === STATE.activeOutputTab);
    });
  }

  /* =====================================================================
   *  교사 개별 로그인(인증코드 가입) 및 개인별 수업 자료함 렌더링/액션
   * ===================================================================== */
  let pendingSaveAfterAuth = false;

  function buildCurrentLessonEntry() {
    return {
      id: 'lesson_' + uid(),
      title: CURRENT_PLAN.topic,
      track: CURRENT_PLAN.track,
      grade: CURRENT_PLAN.grade,
      subjectName: CURRENT_PLAN.subjectShort,
      createdAt: new Date().toLocaleString('ko-KR'),
      state: JSON.parse(JSON.stringify(STATE)),
      markdown: toMarkdown(CURRENT_PLAN, CURRENT_TEXT, CURRENT_WORKSHEETS),
    };
  }

  async function updateAuthHeaderUI() {
    const user = Auth.getCurrentUser();
    const gateOverlay = document.getElementById('entry-gate-overlay');
    const outBar = document.getElementById('auth-logged-out-bar');
    const inBar = document.getElementById('auth-logged-in-bar');
    const badge = document.getElementById('header-user-badge');
    const guestBadge = document.getElementById('header-guest-badge');
    const countBadge = document.getElementById('my-lesson-count-badge');

    if (Auth.isAuthorized() && user) {
      if (gateOverlay) gateOverlay.classList.add('hidden');
      if (user.isGuest) {
        if (outBar) outBar.style.display = 'flex';
        if (inBar) inBar.style.display = 'none';
        if (guestBadge) {
          guestBadge.textContent = `🔑 비회원 이용 중 (${user.role} · 인증코드 확인됨)`;
        }
        if (countBadge) countBadge.textContent = '0';
      } else {
        if (outBar) outBar.style.display = 'none';
        if (inBar) inBar.style.display = 'flex';
        const schoolTxt = user.school ? ` · ${user.school}` : '';
        if (badge) badge.textContent = `👩‍🏫 ${user.name} 선생님 (${user.role}${schoolTxt})`;
        const lessons = await Auth.getMyLessons();
        if (countBadge) countBadge.textContent = lessons.length;
      }
    } else {
      if (gateOverlay) gateOverlay.classList.remove('hidden');
      if (outBar) outBar.style.display = 'flex';
      if (inBar) inBar.style.display = 'none';
      if (countBadge) countBadge.textContent = '0';
    }
  }

  function renderMyLessonCards(list) {
    const el = document.getElementById('my-lessons-list');
    const countBadge = document.getElementById('my-lesson-count-badge');
    if (countBadge) countBadge.textContent = (list && list.length) || 0;
    if (!el) return;

    if (!list || !list.length) {
      el.innerHTML = `<div class="empty-saved">아직 저장된 수업 자료가 없습니다. 위 <strong>[💾 현재 수업 저장하기]</strong> 버튼을 눌러 첫 수업을 보관해 보세요!</div>`;
      return;
    }

    const trackLabelMap = { A: '교과×사서교사 협력수업', B: '초등교사 단독수업', C: '사서교사 단독수업' };
    el.innerHTML = list.map((item, idx) => `
      <div class="saved-lesson-card" data-idx="${idx}">
        <div>
          <span class="sample-badge">${esc(trackLabelMap[item.track] || '수업')} · ${esc(item.grade)}학년 ${esc(item.subjectName)}</span>
          <strong style="margin-left:6px">${esc(item.title)}</strong>
          <div style="font-size:12px;color:#64748b;margin-top:3px">저장 일시: ${esc(item.createdAt)}</div>
        </div>
        <div style="display:flex;gap:6px">
          <button type="button" class="btn-secondary btn-load-saved" data-idx="${idx}">📂 이 수업 불러오기</button>
          <button type="button" class="btn-secondary btn-del-saved" data-id="${esc(item.id)}" style="color:#dc2626">삭제</button>
        </div>
      </div>
    `).join('');

    el.querySelectorAll('.btn-load-saved').forEach(btn => {
      btn.onclick = () => {
        const item = list[+btn.getAttribute('data-idx')];
        if (!item || !item.state) return;
        Object.assign(STATE, item.state);
        normalizeState(false);
        refreshUI();
        document.getElementById('my-lessons-modal').classList.remove('open');
        goToStep(4);
        showToast(`📂 「${item.title}」 수업을 불러왔습니다!`);
      };
    });

    el.querySelectorAll('.btn-del-saved').forEach(btn => {
      btn.onclick = async () => {
        const updated = await Auth.deleteMyLesson(btn.getAttribute('data-id'));
        renderMyLessonCards(updated);
        showToast('내 수업 자료함에서 삭제되었습니다.');
      };
    });
  }

  function switchAuthTab(tabName) {
    document.querySelectorAll('[data-auth-tab]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-auth-tab') === tabName);
    });
    document.querySelectorAll('[data-auth-pane]').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-auth-pane') === tabName);
    });
    const loginErr = document.getElementById('login-error-msg');
    const regErr = document.getElementById('register-error-msg');
    if (loginErr) loginErr.textContent = '';
    if (regErr) regErr.textContent = '';
  }

  function openAuthModal(promptText, defaultTab = 'login') {
    const modal = document.getElementById('auth-modal');
    const banner = document.getElementById('auth-prompt-banner');
    const user = Auth.getCurrentUser();
    const regCodeInput = document.getElementById('reg-invite-code');
    if (regCodeInput && !regCodeInput.value && user && user.inviteCodeUsed) {
      regCodeInput.value = user.inviteCodeUsed;
    }
    if (banner) {
      if (promptText) {
        banner.textContent = promptText;
        banner.style.display = 'block';
      } else {
        banner.style.display = 'none';
      }
    }
    switchAuthTab(defaultTab);
    modal.classList.add('open');
  }

  async function openMyLessonsModal() {
    const user = Auth.getCurrentUser();
    if (!user || user.isGuest) {
      openAuthModal('내 수업 자료함을 열려면 개인 회원 로그인이 필요합니다.');
      return;
    }
    const titleEl = document.getElementById('my-lessons-title');
    const subEl = document.getElementById('my-lessons-sub');
    if (titleEl) titleEl.textContent = `📁 ${user.name} 선생님의 개인 수업 자료함`;
    if (subEl) subEl.textContent = `${user.role}${user.school ? ' · ' + user.school : ''} | 선생님 계정으로 저장된 지도안·텍스트·활동지 목록입니다.`;

    const list = await Auth.getMyLessons();
    renderMyLessonCards(list);
    document.getElementById('my-lessons-modal').classList.add('open');
  }

  async function handleSaveCurrentLesson() {
    if (!requireTeacherVerification('내 자료함 수업 저장')) return;
    const user = Auth.getCurrentUser();
    if (!user || user.isGuest) {
      pendingSaveAfterAuth = true;
      openAuthModal('💡 현재 비회원(인증코드 입장) 상태입니다. 내 수업 자료함에 수업을 보관하려면 개별 회원 로그인 또는 10초 회원가입을 진행해 주세요!');
      return;
    }
    const list = await Auth.saveMyLesson(buildCurrentLessonEntry());
    renderMyLessonCards(list);
    await openMyLessonsModal();
    showToast(`💾 ${user.name} 선생님의 수업 자료함에 안전하게 저장되었습니다!`);
  }

  async function renderAdminCodeChips() {
    const wrap = document.getElementById('admin-active-codes');
    if (wrap) {
      const codes = Auth.getValidCodes();
      wrap.innerHTML = codes.map(c => `
        <span class="chip active" style="cursor:default">
          🔑 ${esc(c)}
        </span>
      `).join('');
    }
    const usersEl = document.getElementById('admin-users-list');
    if (usersEl) {
      const users = await Auth.listAllUsersForAdmin();
      if (!users.length) {
        usersEl.innerHTML = `<div class="empty-saved">아직 생성된 이용자 기록이 없습니다.</div>`;
      } else {
        usersEl.innerHTML = users.map(u => `
          <div class="saved-lesson-card" style="padding:8px 12px">
            <div>
              <span class="sample-badge" style="background:${u.userType === 'guest' ? '#fef3c7;color:#92400e' : '#dbeafe;color:#1e40af'}">
                ${u.userType === 'guest' ? '비회원(인증코드 입장)' : '정회원(개별계정)'}
              </span>
              <strong style="margin-left:6px">${esc(u.name || u.userId)}</strong>
              <span style="font-size:12px;color:#475569">(${esc(u.role || '교사')}${u.school ? ' · ' + esc(u.school) : ''})</span>
              <div style="font-size:11px;color:#64748b;margin-top:2px">
                ID: <code>${esc(u.userId)}</code> · 사용 코드: <strong>${esc(u.inviteCodeUsed || '-')}</strong> · 최근 접속: ${esc(u.lastActiveAt || u.createdAt || '')}
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  function initAuthAndStorage() {
    const authModal = document.getElementById('auth-modal');
    const myLessonsModal = document.getElementById('my-lessons-modal');

    // 1. 첫 화면 입장 게이트 (비회원 인증코드 즉시 입장 & 회원 로그인/가입 버튼)
    const gateGuestBtn = document.getElementById('btn-gate-guest-enter');
    const gateCodeInput = document.getElementById('gate-invite-code');
    const handleGuestEnter = async () => {
      const errEl = document.getElementById('gate-error-msg');
      if (errEl) errEl.textContent = '';
      try {
        const code = gateCodeInput ? gateCodeInput.value : '';
        const role = document.getElementById('gate-guest-role').value;
        const name = document.getElementById('gate-guest-name').value;
        await Auth.enterAsGuest({ inviteCode: code, role, name });
        await updateAuthHeaderUI();
        applyRolePriorityOnEntry(true);
        showToast('🔑 인증코드 확인 완료! 선생님 맞춤형 활용 안내를 확인해 보세요.');
      } catch (err) {
        if (errEl) errEl.textContent = '⚠️ ' + err.message;
      }
    };
    if (gateGuestBtn) gateGuestBtn.onclick = handleGuestEnter;
    if (gateCodeInput) {
      gateCodeInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleGuestEnter();
      });
    }

    const gateLoginBtn = document.getElementById('btn-gate-open-login');
    if (gateLoginBtn) {
      gateLoginBtn.onclick = () => {
        pendingSaveAfterAuth = false;
        openAuthModal('', 'login');
      };
    }

    const gateRegBtn = document.getElementById('btn-gate-open-register');
    if (gateRegBtn) {
      gateRegBtn.onclick = () => {
        pendingSaveAfterAuth = false;
        const regCodeInput = document.getElementById('reg-invite-code');
        if (regCodeInput && gateCodeInput && gateCodeInput.value.trim()) {
          regCodeInput.value = gateCodeInput.value.trim();
        }
        openAuthModal('', 'register');
      };
    }

    // 2. 헤더 버튼들
    const openAuthBtn = document.getElementById('btn-open-auth');
    if (openAuthBtn) {
      openAuthBtn.onclick = () => {
        pendingSaveAfterAuth = false;
        openAuthModal('');
      };
    }

    const guestExitBtn = document.getElementById('btn-guest-exit');
    if (guestExitBtn) {
      guestExitBtn.onclick = () => {
        Auth.logoutTeacher();
        updateAuthHeaderUI();
      };
    }

    const closeAuthBtn = document.getElementById('btn-close-auth');
    if (closeAuthBtn) closeAuthBtn.onclick = () => authModal.classList.remove('open');

    const openMyLessonsBtn = document.getElementById('btn-open-my-lessons');
    if (openMyLessonsBtn) openMyLessonsBtn.onclick = () => openMyLessonsModal();

    const closeMyLessonsBtn = document.getElementById('btn-close-my-lessons');
    if (closeMyLessonsBtn) closeMyLessonsBtn.onclick = () => myLessonsModal.classList.remove('open');

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        Auth.logoutTeacher();
        updateAuthHeaderUI();
        showToast('로그아웃되어 초기 입장 화면으로 이동했습니다.');
      };
    }

    // Step 4 툴바 저장 버튼 & 자료함 내부 저장 버튼
    const saveToolbarBtn = document.getElementById('btn-save-my-lesson');
    if (saveToolbarBtn) saveToolbarBtn.onclick = () => handleSaveCurrentLesson();

    const saveModalBtn = document.getElementById('btn-modal-save-lesson');
    if (saveModalBtn) {
      saveModalBtn.onclick = async () => {
        if (!requireTeacherVerification('내 자료함 수업 저장')) {
          myLessonsModal.classList.remove('open');
          return;
        }
        const list = await Auth.saveMyLesson(buildCurrentLessonEntry());
        renderMyLessonCards(list);
        showToast('💾 현재 수업이 내 자료함에 저장되었습니다!');
      };
    }

    // 로그인/회원가입 탭 전환
    document.querySelectorAll('[data-auth-tab]').forEach(btn => {
      btn.onclick = () => switchAuthTab(btn.getAttribute('data-auth-tab'));
    });

    const gotoRegBtn = document.getElementById('btn-goto-register');
    if (gotoRegBtn) gotoRegBtn.onclick = () => switchAuthTab('register');

    // 로그인 실행
    const doLoginBtn = document.getElementById('btn-do-login');
    const handleLoginSubmit = async () => {
      const errEl = document.getElementById('login-error-msg');
      errEl.textContent = '';
      try {
        const userId = document.getElementById('login-userid').value;
        const pw = document.getElementById('login-password').value;
        const user = await Auth.loginTeacher(userId, pw);
        authModal.classList.remove('open');
        await updateAuthHeaderUI();
        if (pendingSaveAfterAuth) {
          pendingSaveAfterAuth = false;
          await handleSaveCurrentLesson();
        } else {
          applyRolePriorityOnEntry(true);
          showToast(`🎉 환영합니다, ${user.name} 선생님! 이제 내 수업 자료함을 이용하실 수 있습니다.`);
        }
      } catch (err) {
        errEl.textContent = '⚠️ ' + err.message;
      }
    };
    if (doLoginBtn) doLoginBtn.onclick = handleLoginSubmit;
    const loginPwInput = document.getElementById('login-password');
    if (loginPwInput) {
      loginPwInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleLoginSubmit();
      });
    }

    // 인증코드 회원가입 실행
    const doRegBtn = document.getElementById('btn-do-register');
    if (doRegBtn) {
      doRegBtn.onclick = async () => {
        const errEl = document.getElementById('register-error-msg');
        errEl.textContent = '';
        try {
          const user = await Auth.registerTeacher({
            inviteCode: document.getElementById('reg-invite-code').value,
            userId: document.getElementById('reg-userid').value,
            password: document.getElementById('reg-password').value,
            name: document.getElementById('reg-name').value,
            role: document.getElementById('reg-role').value,
            school: document.getElementById('reg-school').value,
          });
          authModal.classList.remove('open');
          await updateAuthHeaderUI();
          if (pendingSaveAfterAuth) {
            pendingSaveAfterAuth = false;
            await handleSaveCurrentLesson();
          } else {
            applyRolePriorityOnEntry(true);
            showToast(`🎉 인증코드 확인 완료! ${user.name} 선생님 계정으로 로그인되었습니다.`);
          }
        } catch (err) {
          errEl.textContent = '⚠️ ' + err.message;
        }
      };
    }

    // 관리자 인증코드 관리 탭
    const adminVerifyBtn = document.getElementById('btn-admin-verify');
    if (adminVerifyBtn) {
      adminVerifyBtn.onclick = async () => {
        const pass = document.getElementById('admin-pass-input').value;
        const msgEl = document.getElementById('admin-status-msg');
        const mgr = document.getElementById('admin-code-manager');
        const expected = (global.ADMIN_CONFIG && global.ADMIN_CONFIG.adminPasscode) || 'admin2026';
        if (pass === expected) {
          msgEl.textContent = '';
          mgr.style.display = 'block';
          await renderAdminCodeChips();
        } else {
          mgr.style.display = 'none';
          msgEl.textContent = '⚠️ 관리자 비밀번호가 올바르지 않습니다.';
        }
      };
    }

    const adminAddCodeBtn = document.getElementById('btn-admin-add-code');
    if (adminAddCodeBtn) {
      adminAddCodeBtn.onclick = async () => {
        const pass = document.getElementById('admin-pass-input').value;
        const newCodeInput = document.getElementById('admin-new-code');
        const msgEl = document.getElementById('admin-status-msg');
        try {
          await Auth.addInviteCode(newCodeInput.value, pass);
          newCodeInput.value = '';
          msgEl.textContent = '';
          await renderAdminCodeChips();
          showToast('새 교사 인증코드가 추가되었습니다.');
        } catch (err) {
          msgEl.textContent = '⚠️ ' + err.message;
        }
      };
    }

    updateAuthHeaderUI();
    initGeminiModal();
  }

  function initGeminiModal() {
    const modal = document.getElementById('gemini-modal');
    const openBtn = document.getElementById('btn-open-gemini');
    const closeBtn = document.getElementById('btn-close-gemini');
    const keyInput = document.getElementById('gemini-api-key');
    const modelSelect = document.getElementById('gemini-model-select');
    const extraInput = document.getElementById('gemini-extra-req');
    const statusBox = document.getElementById('gemini-status-box');

    const setStatus = (msg, isError = false) => {
      if (!statusBox) return;
      if (!msg) {
        statusBox.style.display = 'none';
        return;
      }
      statusBox.style.display = 'block';
      statusBox.className = 'gemini-status-box ' + (isError ? 'err' : 'ok');
      statusBox.textContent = msg;
    };

    if (openBtn) {
      openBtn.onclick = () => {
        if (keyInput) keyInput.value = Gemini.getApiKey();
        if (modelSelect) modelSelect.value = Gemini.getPreferredModel();
        setStatus('');
        modal.classList.add('open');
      };
    }
    if (closeBtn) closeBtn.onclick = () => modal.classList.remove('open');

    const saveKeyBtn = document.getElementById('btn-save-gemini-key');
    if (saveKeyBtn) {
      saveKeyBtn.onclick = () => {
        const k = Gemini.saveApiKey(keyInput.value);
        Gemini.savePreferredModel(modelSelect.value);
        setStatus(k ? '✅ 내 Gemini API 키가 브라우저에 안전하게 저장되었습니다.' : 'API 키가 삭제되었습니다.', false);
        showToast(k ? '🔑 Gemini API 키가 저장되었습니다.' : 'Gemini API 키가 초기화되었습니다.');
      };
    }

    if (modelSelect) {
      modelSelect.onchange = () => Gemini.savePreferredModel(modelSelect.value);
    }

    const fullBtn = document.getElementById('btn-gemini-full');
    if (fullBtn) {
      fullBtn.onclick = async () => {
        try {
          if (keyInput && keyInput.value.trim()) Gemini.saveApiKey(keyInput.value);
          if (modelSelect) Gemini.savePreferredModel(modelSelect.value);
          fullBtn.disabled = true;
          setStatus('⏳ Gemini AI가 학년·교과·주제·전략에 맞춘 새로운 읽기 지문과 차시 지도안을 작성하고 있습니다... (약 5~10초 소요)', false);
          const result = await Gemini.generateAiFullPackage(CURRENT_PLAN, CURRENT_TEXT, extraInput ? extraInput.value : '');
          if (result.readingText) STATE.aiReadingText = result.readingText;
          if (result.lessonPlan) STATE.aiLessonPlan = result.lessonPlan;
          regenerateAll();
          setStatus('');
          modal.classList.remove('open');
          showToast('✨ Gemini AI 맞춤 지문·지도안·활동지 생성이 완료되었습니다!');
        } catch (err) {
          setStatus('⚠️ ' + err.message, true);
        } finally {
          fullBtn.disabled = false;
        }
      };
    }

    const textOnlyBtn = document.getElementById('btn-gemini-text-only');
    if (textOnlyBtn) {
      textOnlyBtn.onclick = async () => {
        try {
          if (keyInput && keyInput.value.trim()) Gemini.saveApiKey(keyInput.value);
          if (modelSelect) Gemini.savePreferredModel(modelSelect.value);
          textOnlyBtn.disabled = true;
          setStatus('⏳ Gemini AI가 수업용 읽기 지문과 어휘·발문을 새로 집필하고 있습니다... (약 4~8초 소요)', false);
          const aiText = await Gemini.generateAiReadingText(CURRENT_PLAN, CURRENT_TEXT, extraInput ? extraInput.value : '');
          STATE.aiReadingText = aiText;
          regenerateAll();
          STATE.activeOutputTab = 'text';
          updateOutputTabVisibility();
          setStatus('');
          modal.classList.remove('open');
          showToast('📖 Gemini AI가 새로운 수업용 읽기 지문과 활동지를 완성했습니다!');
        } catch (err) {
          setStatus('⚠️ ' + err.message, true);
        } finally {
          textOnlyBtn.disabled = false;
        }
      };
    }

    const resetBtn = document.getElementById('btn-gemini-reset');
    if (resetBtn) {
      resetBtn.onclick = () => {
        STATE.aiReadingText = null;
        STATE.aiLessonPlan = null;
        regenerateAll();
        modal.classList.remove('open');
        showToast('🔄 기본 생성본으로 복원되었습니다.');
      };
    }

    const copyPromptBtn = document.getElementById('btn-copy-prompt');
    if (copyPromptBtn) {
      copyPromptBtn.onclick = () => {
        navigator.clipboard.writeText(buildDynamicPrompt(CURRENT_PLAN, CURRENT_TEXT));
        setStatus('📋 현재 수업 조건이 담긴 AI 프롬프트가 복사되었습니다! Gemini나 ChatGPT 웹사이트에 붙여넣어 활용하세요.', false);
        showToast('📋 AI 프롬프트가 클립보드에 복사되었습니다!');
      };
    }
  }

  function showToast(msg) {
    const t = document.getElementById('toast-msg');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  /* =====================================================================
   *  ❓ 단계별 · 카드별 · 성취기준별 · 전략별 도움말 팝업 모달 컨트롤러
   * ===================================================================== */
  function openContextHelpModal(tag, title, bodyHtml) {
    const modal = document.getElementById('context-help-modal');
    const tagEl = document.getElementById('context-help-tag');
    const titleEl = document.getElementById('context-help-title');
    const bodyEl = document.getElementById('context-help-body');
    if (!modal || !titleEl || !bodyEl) return;
    if (tagEl) tagEl.textContent = tag || '💡 상세 안내';
    titleEl.textContent = title || '도움말 안내';
    bodyEl.innerHTML = bodyHtml || '';
    modal.classList.add('open');
  }

  function closeContextHelpModal() {
    const modal = document.getElementById('context-help-modal');
    if (modal) modal.classList.remove('open');
  }

  function showStrategyHelpPopup(stratId) {
    const s = global.StrategyCatalog.byId[stratId];
    if (!s) return;
    const scored = scoreStrategies(KB, STATE);
    const matched = scored.find(x => x.id === stratId) || s;
    const depthText = s.depth === 'deep'
      ? '🔥 고난도 심화 전략 (한 차시 1개 단독 적용 권장)'
      : s.depth === 'light'
        ? '🌱 도입·성찰 루틴 (5~10분 호흡 · 2~3개 조합 권장)'
        : '📌 핵심 탐구 전략 (15~20분 호흡 · 2~3개 조합 권장)';

    openContextHelpModal(
      `📘 수업 전략 상세 안내 · ${s.cat}`,
      s.name,
      `
        <div class="help-pop-section">
          <div class="help-pop-badges">
            <span class="help-pop-badge">${esc(s.cat)}</span>
            <span class="help-pop-badge">${esc(depthText)}</span>
            <span class="help-pop-badge">권장 학년군: ${esc((s.bands || []).join('·'))}학년군</span>
          </div>
          <p class="help-pop-lead">${esc(s.desc)}</p>
          ${matched.reason ? `<div class="help-pop-highlight">🎯 <strong>현재 2단계 단원 추천 사유:</strong> ${esc(matched.reason)}</div>` : ''}
        </div>

        <div class="help-pop-section">
          <h4>📋 수업 진행 3단계 흐름</h4>
          <ol class="help-pop-list">
            ${(s.steps || []).map(st => `<li>${esc(st)}</li>`).join('')}
          </ol>
        </div>

        <div class="help-pop-section">
          <h4>💬 교사 핵심 발문 예시</h4>
          <ul class="help-pop-list">
            ${(s.prompts || []).map(pr => `<li>"${esc(pr)}"</li>`).join('')}
          </ul>
        </div>

        <div class="help-pop-section">
          <h4>📝 연결되는 학생 활동지 과제</h4>
          <div class="help-pop-box">${esc(s.act || '')}</div>
          ${s.tip ? `<div style="margin-top:6px;font-size:12.5px;color:#0f766e">💡 <strong>지도 팁:</strong> ${esc(s.tip)}</div>` : ''}
        </div>
      `
    );
  }

  function showPackageHelpPopup(pkg, isStep2Custom) {
    if (!pkg) return;
    const strats = pkg.ids.map(id => global.StrategyCatalog.byId[id]).filter(Boolean);
    openContextHelpModal(
      isStep2Custom ? '🎯 2단계 학년·교과 맞춤형 추천 코스' : '📦 수업 모형별 추천 코스 안내',
      pkg.name,
      `
        <div class="help-pop-section">
          <div class="help-pop-badges">
            <span class="help-pop-badge">${esc(pkg.badge || `${pkg.ids.length}종 구성`)}</span>
            <span class="help-pop-badge">생성되는 학생 활동지: 총 ${pkg.ids.length}장</span>
          </div>
          <p class="help-pop-lead">${esc(pkg.desc)}</p>
        </div>
        <div class="help-pop-section">
          <h4>📚 포함된 단계별 수업 전략 (${strats.length}종)</h4>
          <ol class="help-pop-list">
            ${strats.map((s, i) => `
              <li style="margin-bottom:8px">
                <strong>[${strats.length === 1 ? '본시 단독 집중' : `${i + 1}단계`}] ${esc(s.name)}</strong> <small>(${esc(s.cat)})</small><br>
                <span style="color:#475569;font-size:13px">${esc(s.desc)}</span>
              </li>
            `).join('')}
          </ol>
        </div>
      `
    );
  }

  function showStandardHelpPopup(spec) {
    const [kind, code] = String(spec || '').split(':');
    const subj = KB.subjectByKey[STATE.subjectKey] || KB.subjects[0];
    const area = subj ? (subj.areas.find(a => a.id === STATE.areaId) || subj.areas[0]) : null;
    if (kind === 'subj' && subj && area) {
      const recSubjStds = recommendSubjectStandards(KB, STATE.grade, subj, area, STATE.topic, STATE.knowledge, STATE.skills);
      const std = recSubjStds.find(s => s.code === code) || recSubjStds[0];
      if (!std) return;
      openContextHelpModal(
        `📘 2022 개정 ${subj.name} 성취기준 해설`,
        `${std.code} (${std.areaName})`,
        `
          <div class="help-pop-section">
            <div class="help-pop-highlight"><strong>${esc(std.code)}</strong> ${esc(std.text)}</div>
          </div>
          <div class="help-pop-section">
            <h4>💡 성취기준 해설 및 지도 중점</h4>
            <p class="help-pop-lead">${esc(std.desc)}</p>
          </div>
          ${std.linkedKnowledge && std.linkedKnowledge.length ? `
          <div class="help-pop-section">
            <h4>📌 연계된 단원 지식·이해 요소</h4>
            <div class="help-pop-badges">
              ${std.linkedKnowledge.map(k => `<span class="help-pop-badge">${esc(k)}</span>`).join('')}
            </div>
          </div>` : ''}
        `
      );
      return;
    }

    const libStd = (KB.library.standards || []).find(s => s.code === code);
    if (libStd) {
      openContextHelpModal(
        `📖 2022 도서관과 정보생활 성취기준 해설`,
        `${libStd.code} (${libStd.areaName})`,
        `
          <div class="help-pop-section">
            <div class="help-pop-highlight"><strong>${esc(libStd.code)}</strong> ${esc(libStd.text)}</div>
          </div>
          <div class="help-pop-section">
            <h4>💡 성취기준 해설 및 도서관 수업 포인트</h4>
            <p class="help-pop-lead">${esc(libStd.desc)}</p>
          </div>
        `
      );
    }
  }

  function showNamedHelpPopup(key) {
    const subj = KB.subjectByKey[STATE.subjectKey] || KB.subjects[0];
    const area = subj ? (subj.areas.find(a => a.id === STATE.areaId) || subj.areas[0]) : null;
    const CE = global.CooperationEngine;

    const HELP_CONTENT = {
      gate_intro: {
        tag: '🚪 시작 화면 안내',
        title: '비회원 바로 이용 vs 개인 회원 로그인 안내',
        html: `
          <ul class="help-pop-list">
            <li><strong>🔑 비회원 바로 이용:</strong> 별도의 회원가입이나 로그인 없이 관리자에게 안내받은 <strong>인증코드</strong>만 입력하면 즉시 지도안·읽기 지문·활동지를 제작하고 다운로드(한글·MD·PDF)할 수 있습니다.</li>
            <li><strong>👩‍🏫 개인 회원 로그인:</strong> 10초 만에 개인 아이디를 만들면 선생님이 만든 수업을 <strong>[내 수업 자료함]</strong>에 클라우드로 영구 보관하고 언제든 다시 불러와 수정할 수 있습니다.</li>
          </ul>
        `,
      },
      gate_guest: {
        tag: '🔑 비회원 이용 안내',
        title: '인증코드만 입력하고 바로 시작하기',
        html: `
          <p class="help-pop-lead">아이디·비밀번호 없이 <strong>관리자 발급 인증코드</strong>만 입력하면 모든 수업 자동 설계 기능과 한글(.doc)·PDF 인쇄 기능을 즉시 이용하실 수 있습니다.</p>
          <div class="help-pop-box">💡 비회원으로 입장한 뒤에도 화면 우측 상단의 <strong>[개인 회원 로그인·가입]</strong> 버튼을 눌러 언제든 내 수업 자료함에 저장할 수 있습니다.</div>
        `,
      },
      gate_member: {
        tag: '👩‍🏫 정회원 자료함 혜택',
        title: '개별 로그인으로 내 수업 자료함 이용하기',
        html: `
          <ul class="help-pop-list">
            <li>선생님 개인별 독립된 <strong>[📁 내 수업 자료함]</strong>이 제공됩니다.</li>
            <li>제작한 차시 지도안·읽기 텍스트·맞춤 활동지가 클라우드(Firebase)에 안전하게 보관됩니다.</li>
            <li>다음 학기나 다른 학급 수업에서도 클릭 한 번으로 이전 수업을 불러와 재편집할 수 있습니다.</li>
          </ul>
        `,
      },
      step1_overview: {
        tag: 'STEP 1 · 수업 형태 선택 안내',
        title: '어떤 수업 형태를 고르면 좋을까요?',
        html: `
          <ul class="help-pop-list">
            <li><strong>🤝 교과×사서교사 협력수업:</strong> 교과 성취기준과 도서관과 정보생활 성취기준을 결합하여, <strong>교과교사와 사서교사의 교수·학습 활동이 나란히 표시되는 2열 코티칭 지도안</strong>을 생성합니다.</li>
            <li><strong>🏫 초등교사 단독수업:</strong> 국어·수학·사회·과학 등 <strong>11개 초등 교과</strong>의 교과 핵심역량과 성취기준을 바탕으로 개념기반 탐구 지도안과 활동지를 생성합니다.</li>
            <li><strong>📖 사서교사 단독수업:</strong> 2022 개정 『도서관과 정보생활』 교육과정 성취기준과 역량만을 적용하여 Big6 정보활용 지도안과 도서관 활동지를 생성합니다.</li>
          </ul>
        `,
      },
      track_A: {
        tag: '🤝 수업 형태 상세 안내',
        title: '교과×사서교사 협력수업 (2열 코티칭 지도안)',
        html: `
          <p class="help-pop-lead">교과 단원 학습과 학교도서관의 풍부한 장서·정보탐색 전략을 결합하는 협력수업 트랙입니다.</p>
          <ul class="help-pop-list">
            <li><strong>자동 생성 지도안:</strong> 도입~전개~정리 전 과정에서 <strong>[교과교사 활동]</strong>과 <strong>[사서교사 활동]</strong>이 대등하게 분리된 2열 코티칭 과정안이 작성됩니다.</li>
            <li><strong>함양 역량 표기:</strong> 선택한 해당 교과의 <strong>교과 핵심역량</strong>을 중심으로 매핑됩니다.</li>
            <li><strong>맞춤 활동지:</strong> KDC 서가 탐색, 정보 신뢰성 판별, 교과 개념 구조화 활동지가 함께 생성됩니다.</li>
          </ul>
        `,
      },
      track_B: {
        tag: '🏫 수업 형태 상세 안내',
        title: '초등교사 단독수업 (개념기반 탐구 지도안)',
        html: `
          <p class="help-pop-lead">초등 11개 교과(국어, 수학, 바슬즐, 사회, 과학, 도덕, 실과, 영어, 체육, 음악, 미술) 교실 수업을 위한 트랙입니다.</p>
          <ul class="help-pop-list">
            <li><strong>자동 생성 지도안:</strong> 사실적·개념적·논쟁적 탐구 질문과 일반화 문장이 포함된 40분 차시 지도안이 생성됩니다.</li>
            <li><strong>함양 역량 표기:</strong> 선택한 교과의 공식 <strong>교과 핵심역량</strong>만 정확히 표출됩니다.</li>
          </ul>
        `,
      },
      track_C: {
        tag: '📖 수업 형태 상세 안내',
        title: '사서교사 단독수업 (2022 도서관과 정보생활)',
        html: `
          <p class="help-pop-lead">학교도서관에서 사서교사가 진행하는 독서교육 및 정보활용교육(Big6) 전용 트랙입니다.</p>
          <ul class="help-pop-list">
            <li><strong>교육과정 기준:</strong> 2022 개정 『도서관과 정보생활』 학년군별 성취기준과 <strong>도서관과 정보생활 교과 역량</strong>만 엄격하게 표출됩니다.</li>
            <li><strong>맞춤 활동지:</strong> KDC 청구기호 서가 미션지, OPAC 검색지, CRAAP 신뢰성 판별표, 출처 표기 실습지 등이 생성됩니다.</li>
          </ul>
        `,
      },
      step1_samples: {
        tag: '⚡ 원클릭 대표 수업 예시 안내',
        title: '1초 만에 완성본 체험하기',
        html: `
          <p class="help-pop-lead">대표 수업 예시 버튼을 클릭하면 2·3단계를 일일이 거치지 않고 곧바로 <strong>4단계 최종 결과 화면(지도안 · 읽기 텍스트 · 학생용 활동지)</strong>으로 이동합니다.</p>
          <div class="help-pop-box">예시 화면을 확인한 뒤에도 상단 탭의 <strong>[2. 학년·교과·주제]</strong>나 <strong>[3. 수업 전략 고르기]</strong>를 눌러 언제든 우리 반에 맞게 변경할 수 있습니다.</div>
        `,
      },
      step2_overview: {
        tag: 'STEP 2 · 학년·교과·주제 선택 안내',
        title: '2단계에서는 무엇을 설정하나요?',
        html: `
          <ol class="help-pop-list">
            <li><strong>학년 · 교과 · 단원 영역:</strong> 대상 학년(1~6학년)과 교과, 단원 영역을 고르면 해당 단원의 성취기준과 핵심 개념이 자동으로 세팅됩니다.</li>
            <li><strong>성취기준 선택:</strong> 추천된 성취기준 중 본시 수업에 적용할 기준을 클릭하세요. (각 성취기준의 <code>? 해설</code>을 누르면 상세 해설을 볼 수 있습니다.)</li>
            <li><strong>3단계 자동 연동:</strong> 2단계에서 선택한 학년·교과·단원에 맞춰 <strong>3단계의 맞춤형 추천 전략(2~3종 또는 심화 1종)</strong>이 자동으로 선택됩니다!</li>
          </ol>
        `,
      },
      step2_grade_subject: {
        tag: '📘 학년 · 교과 · 단원 선택 안내',
        title: '대상 학년과 교과·단원 영역 고르기',
        html: `
          <ul class="help-pop-list">
            <li><strong>1~2학년군:</strong> 국어, 수학, 통합교과(바른 생활·슬기로운 생활·즐거운 생활) 중심으로 편제되어 있습니다.</li>
            <li><strong>3~6학년군:</strong> 국어, 수학, 사회, 과학, 도덕, 영어, 체육, 음악, 미술 및 실과(5~6학년)를 선택할 수 있습니다.</li>
            <li>단원 영역을 변경하면 아래의 <strong>성취기준, 오늘 수업 주제, 3단계 추천 수업 전략</strong>이 해당 단원에 맞게 즉시 갱신됩니다.</li>
          </ul>
        `,
      },
      step2_core_idea: {
        tag: `💡 ${subj ? subj.name : ''} · 단원 교육과정 정보`,
        title: `${area ? area.name : '단원'} 영역 핵심 아이디어 및 교과 핵심역량`,
        html: `
          <div class="help-pop-section">
            <h4>📌 단원 핵심 아이디어 (Big Idea)</h4>
            <ul class="help-pop-list">
              ${(area && area.coreIdeas ? area.coreIdeas : []).map(ci => `<li>${esc(ci.text)}</li>`).join('')}
            </ul>
          </div>
          <div class="help-pop-section">
            <h4>🏆 ${subj ? esc(subj.name) : '교과'} 공식 교과 핵심역량</h4>
            <div class="help-pop-badges">
              ${(subj && subj.competencies ? subj.competencies : []).map(c => `<span class="help-pop-badge">${esc(c)}</span>`).join('')}
            </div>
            <p style="font-size:12.5px;color:#475569;margin-top:8px">* 4단계 최종 지도안에는 위 공식 교과 핵심역량만 정확히 표기됩니다.</p>
          </div>
        `,
      },
      step2_subj_std: {
        tag: '📘 교과 성취기준 안내',
        title: '2022 개정 교과 성취기준 선택',
        html: `
          <p class="help-pop-lead">선택한 학년·교과·단원 영역에 해당하는 2022 개정 교육과정 성취기준 목록입니다.</p>
          <ul class="help-pop-list">
            <li>성취기준을 선택하면 해당 성취기준의 핵심 내용 요소가 <strong>오늘 수업 주제</strong>와 <strong>3단계 맞춤 추천 전략</strong>에 자동으로 반영됩니다.</li>
            <li>각 성취기준 우측의 <strong>[? 해설]</strong> 버튼을 누르면 교육과정 성취기준 해설과 연계 지식 요소를 팝업으로 확인할 수 있습니다.</li>
          </ul>
        `,
      },
      step2_lib_std: {
        tag: '📖 도서관과 정보생활 성취기준 안내',
        title: '2022 도서관과 정보생활 성취기준 및 추천 KDC 서가',
        html: `
          <p class="help-pop-lead">학년군(1~2학년군 / 3~4학년군 / 5~6학년군)과 단원 특성에 맞춰 자동 추천된 『2022 도서관과 정보생활』 성취기준입니다.</p>
          <ul class="help-pop-list">
            <li><strong>협력수업(Track A):</strong> 교과 성취기준과 도서관 성취기준이 함께 지도안에 매핑됩니다.</li>
            <li><strong>사서교사 단독수업(Track C):</strong> 도서관과 정보생활 성취기준과 도서관 교과 핵심역량만 지도안에 표출됩니다.</li>
          </ul>
        `,
      },
      step2_kdc_detail: {
        tag: '🏛️ 한국십진분류법(KDC) 추천 서가 안내',
        title: '본시 수업 연계 추천 학교도서관 KDC 서가',
        html: (() => {
          const kdcs = recommendKDC(STATE.subjectKey, area ? area.name : '', `${STATE.topic} ${STATE.knowledge.join(' ')}`);
          return `
            <p class="help-pop-lead">수업 주제와 관련하여 학교도서관에서 탐색하기 좋은 한국십진분류법(KDC) 서가 분류입니다.</p>
            <ul class="help-pop-list">
              ${kdcs.map((k, i) => `
                <li>
                  <strong>${i === 0 ? '★ 1순위 추천: ' : ''}KDC ${esc(k.code)} (${esc(k.name)})</strong><br>
                  <span style="font-size:13px;color:#475569">세부 분류: ${esc(k.sub)}</span>
                </li>
              `).join('')}
            </ul>
          `;
        })(),
      },
      step2_coop_binding: {
        tag: '📚 도서관 탐구활동 · 디지털 도구 연계 안내',
        title: '도서관 탐구활동 8종 및 협력수업 기대 효과',
        html: (() => {
          if (!CE) return '';
          const bound = CE.bindEntitiesForCurriculum(KB, STATE);
          const curPicrat = CE.PICRAT_MATRIX[STATE.picratCode] || bound.picratRecommendation;
          return `
            <div class="help-pop-section">
              <h4>① 학교도서관 탐구활동 8대 유형</h4>
              <ul class="help-pop-list">
                ${Object.values(CE.INFO_ACTIVITIES_8).map(a => `<li><strong>${a.icon} ${esc(a.label)}:</strong> ${esc(a.shortDesc)}</li>`).join('')}
              </ul>
            </div>
            <div class="help-pop-section">
              <h4>② 현재 선택된 도서관·디지털 도구 효과 ([${esc(curPicrat.code)}] ${esc(curPicrat.surfaceLabel)})</h4>
              <div class="help-pop-box">
                • <strong>추천 활용 도구:</strong> ${esc(curPicrat.toolExamples.join(', '))}<br>
                • <strong>교수·학습 효과:</strong> ${esc(curPicrat.pedagogicalEffect)}
              </div>
            </div>
            ${STATE.track === 'A' ? `
            <div class="help-pop-section">
              <h4>③ 교과×사서교사 협력수업 기대 효과</h4>
              <ul class="help-pop-list">
                <li><strong>교과교사:</strong> ${esc(bound.mutualBenefitSummary.forSubjectTeacher)}</li>
                <li><strong>사서교사:</strong> ${esc(bound.mutualBenefitSummary.forLibrarianTeacher)}</li>
                <li><strong>학생 배움:</strong> ${esc(bound.mutualBenefitSummary.forStudents)}</li>
              </ul>
            </div>` : ''}
          `;
        })(),
      },
      step2_topic_genre: {
        tag: '✍️ 수업 주제 및 읽기 자료 설정 안내',
        title: '오늘 수업 주제와 읽기 글의 종류 설정',
        html: `
          <ul class="help-pop-list">
            <li><strong>오늘 수업 주제:</strong> 선택한 성취기준에 맞춰 자동 입력되며, 선생님이 원하는 문구로 자유롭게 수정할 수 있습니다.</li>
            <li><strong>수업에 쓸 읽기 글의 종류:</strong> 설명글, 논설·토론글, 이야기(문학), 비교·대조글, 원인·결과글, 기사문 중 선택하면 4단계의 <strong>수업용 읽기 텍스트</strong>와 <strong>3단계 추천 독서 전략</strong>이 해당 글 갈래에 맞게 자동 구성됩니다.</li>
            <li><strong>⚙️ 세부 설정 열기:</strong> 선생님이 직접 준비한 지문 텍스트를 붙여넣거나 핵심 개념어·성취요소를 세부 조정하고 싶을 때만 펼쳐서 사용하세요.</li>
          </ul>
        `,
      },
      step3_overview: {
        tag: 'STEP 3 · 수업 전략 선택 가이드',
        title: '한 차시(40분)에 몇 개의 전략이 적당할까요?',
        html: `
          <div class="help-pop-highlight">
            한 수업에 너무 많은 활동지가 제시되지 않도록 <strong>2~3가지 전략 조합</strong>을 기본으로 권장하며, <strong>난이도가 있는 심화 전략은 1개만 단독 적용</strong>해도 훌륭한 한 차시 수업이 완성됩니다.
          </div>
          <ul class="help-pop-list" style="margin-top:10px">
            <li><strong>🎯 2단계 학년·교과·단원 맞춤형 추천 탭:</strong> 2단계에서 고른 학년·교과·성취기준에 가장 잘 어울리는 맞춤 전략 코스와 개별 추천 전략 TOP 6를 바로 적용할 수 있습니다.</li>
            <li><strong>🔥 고난도 심화 전략 1개 단독 코스:</strong> CRAAP 신뢰성 판별, 직소(Jigsaw) 협동 독서, GRASPS 수행과제, QFT 질문 만들기 등은 1개만 선택하면 활동지 1장으로 40분 수업 전체를 깊이 있게 운영합니다.</li>
            <li>각 전략 카드의 <strong>[?]</strong> 버튼을 누르면 해당 전략의 <strong>진행 단계, 교사 발문 예시, 활동지 과제</strong>를 팝업으로 미리 확인할 수 있습니다.</li>
          </ul>
        `,
      },
      step3_coop_guide: {
        tag: '🤝 교사 간 협력수업 사전협의 가이드',
        title: '1수업 2교사 협력 형태(6종) 및 역할 분담 상세 안내',
        html: (() => {
          if (!CE) return '';
          return `
            <div class="help-pop-section">
              <h4>① 6가지 협력수업 형태별 교사 역할</h4>
              <ul class="help-pop-list">
                ${Object.values(CE.CO_TEACHING_APPROACHES).map(ap => `
                  <li style="margin-bottom:8px">
                    <strong>${ap.icon} ${esc(ap.label)} (교과 ${ap.defaultBalance.subject} : 사서 ${ap.defaultBalance.librarian})</strong> — ${esc(ap.summary)}<br>
                    <span style="font-size:12.5px;color:#334155">• 교과교사: ${esc(ap.subjectTeacherRole)} / • 사서교사: ${esc(ap.librarianTeacherRole)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div class="help-pop-section">
              <h4>② 학생 심리적 위축 없는 맞춤형 배려 팁</h4>
              <div class="help-pop-box">기초학력·느린학습자 지원을 포함할 때 특정 학생만 따로 분리해 지도하면 위축될 수 있으므로, <strong>병렬·스테이션 회전이나 전체 모둠 순회 지도</strong> 속에서 자연스럽게 읽기 비계(Scaffolding) 자료를 제공하는 것을 권장합니다.</div>
            </div>
          `;
        })(),
      },
      step3_rec_tabs: {
        tag: '🎯 추천 전략 탭 활용 안내',
        title: '2단계 맞춤형 추천 탭 vs 범용 추천 코스 탭',
        html: `
          <ul class="help-pop-list">
            <li><strong>🎯 2단계 학년·교과·단원 맞춤형 추천 탭 (기본):</strong> 2단계에서 선택한 학년, 교과, 단원 영역, 성취기준, 과정·기능 동사를 실시간 분석하여 최적화된 <strong>맞춤 코스 4종(2~3종 표준 / 2종 핵심 / 1종 심화 단독 / 2종 독서·정보)</strong>과 <strong>개별 추천 전략 TOP 6</strong>를 제시합니다.</li>
            <li><strong>📦 범용 수업 모형별 추천 코스 탭:</strong> 교과와 무관하게 자주 쓰이는 10가지 대표 전략 조합(2~3종 조합 및 1종 심화 코스)을 한눈에 고를 수 있습니다.</li>
          </ul>
        `,
      },
      step3_step2_context: {
        tag: '📌 2단계 선택 연계 상세 정보',
        title: '현재 3단계 자동 추천에 반영된 2단계 교육과정 정보',
        html: (() => {
          const step2Rec = buildStep2TailoredRecommendations(KB, STATE);
          const cs = step2Rec.contextSummary;
          return `
            <ul class="help-pop-list">
              <li><strong>대상 학년:</strong> 초등 ${cs.grade}학년 (${cs.band}학년군)</li>
              <li><strong>교과 및 단원 영역:</strong> ${esc(cs.subjectLabel)} &gt; ${esc(cs.areaLabel)}</li>
              ${cs.subjStdCode ? `<li><strong>교과 성취기준:</strong> ${esc(cs.subjStdCode)} ${esc(cs.subjStdText)}</li>` : ''}
              ${cs.libStdCode && cs.track !== 'B' ? `<li><strong>도서관 성취기준:</strong> ${esc(cs.libStdCode)} ${esc(cs.libStdText)}</li>` : ''}
              <li><strong>적용된 과정·기능:</strong> ${esc(cs.skillsLabel)}</li>
              <li><strong>오늘 수업 주제:</strong> ${esc(cs.topic)}</li>
            </ul>
          `;
        })(),
      },
      step3_selected_tray: {
        tag: '📋 담긴 전략 흐름 및 활동지 연동 안내',
        title: '선택한 전략 개수만큼 맞춤형 활동지가 생성됩니다',
        html: `
          <ul class="help-pop-list">
            <li><strong>🎯 전략 1개 선택 (심화 1종 집중):</strong> 고난도 심화 전략 1개로 40분 수업 전체(탐색→분석→정리)를 깊이 있게 운영하며, <strong>학생 활동지 1장</strong>이 생성됩니다.</li>
            <li><strong>✨ 전략 2개 선택 (2종 균형 구성):</strong> 전반부 탐색·읽기(활동지 ①)와 후반부 구조화·성찰(활동지 ②)로 진행되며, <strong>학생 활동지 2장</strong>이 생성됩니다.</li>
            <li><strong>📚 전략 3개 선택 (3종 단계별 구성):</strong> 도입 탐색 → 전개 구조화 → 정리 일반화·성찰로 진행되며, <strong>학생 활동지 3장</strong>이 생성됩니다. (한 차시 최대 3개까지 선택 가능)</li>
          </ul>
        `,
      },
      step3_catalog: {
        tag: '🔎 전략 도감 직접 고르기 안내',
        title: '난이도·호흡 배지 및 전략 도감 활용법',
        html: `
          <ul class="help-pop-list">
            <li><strong>⭐ 2단계 학년·교과 맞춤 추천 필터:</strong> 현재 2단계에서 선택한 학년·교과·단원에 적합도가 높은 추천 전략들만 모아 보여줍니다.</li>
            <li><strong>🔥 심화 배지:</strong> 호흡이 길고 깊이 있는 전략입니다. 한 차시에 <strong>1개만 단독 적용</strong>하거나 가벼운 루틴과 2개 이내로 조합하는 것이 좋습니다.</li>
            <li><strong>📌 핵심 / 🌱 루틴 배지:</strong> 한 차시에 <strong>2~3개를 조합</strong>하여 단계별로 운영하기 좋은 전략입니다.</li>
            <li>각 카드의 <strong>[?]</strong> 버튼을 클릭하면 전략의 상세 설명, 수업 진행 단계, 교사 발문 예시를 팝업으로 확인할 수 있습니다.</li>
          </ul>
        `,
      },
      step4_verify: {
        tag: '⚠️ 교사 최종 검수 필수 안내',
        title: '수업 활용 전 교사 최종 확인 및 편집 안내',
        html: `
          <p class="help-pop-lead">본 시스템이 생성한 <strong>교과 내용 체계(핵심 아이디어·내용 요소·교과 핵심역량), 성취기준 코드 및 진술문, 수업용 읽기 텍스트 및 학생용 활동지</strong>는 온톨로지 기반 자동 매핑·생성 결과이므로 실제 교육과정 고시 원문이나 학교 현장 여건과 다를 수 있습니다.</p>
          <ul class="help-pop-list">
            <li>수업에 활용하시기 전 반드시 <strong>지도 교사(교과교사·사서교사)의 최종 확인</strong>을 거쳐 주시기 바랍니다.</li>
            <li>툴바의 <strong>[✏️ 문서 직접 편집]</strong>에 체크하면 화면의 지도안·읽기 텍스트·활동지 문구를 워드프로세서처럼 마우스로 클릭해 즉시 수정할 수 있습니다.</li>
            <li>학생용 활동지에는 학생의 자기주도적 사고를 위해 예시 답안이 일절 표시되지 않으며, A4 인쇄 시 필기 공간이 넉넉하게 유지됩니다.</li>
          </ul>
        `,
      },
      step4_text_length_guide: {
        tag: '📏 학년별(1~6학년) 적정 읽기 텍스트 분량 및 수준 기준표',
        title: '연령별·학년별 맞춤형 읽기 텍스트 글자 수 및 단락 설계 기준',
        html: (() => {
          const specs = (global.Generators && global.Generators.GRADE_TEXT_SPECS) || {};
          const curSt = CURRENT_TEXT && CURRENT_TEXT.stats;
          return `
            ${curSt ? `
            <div class="help-pop-highlight" style="margin-bottom:12px">
              📌 <strong>현재 생성된 ${STATE.grade}학년 텍스트 실측치:</strong>
              공백 포함 <strong>${curSt.charCountWithSpaces.toLocaleString()}자</strong> (공백 제외 ${curSt.charCountNoSpaces.toLocaleString()}자) ·
              <strong>${curSt.paragraphCount}단락 (${curSt.sentenceCount}문장)</strong> · 예상 읽기 시간 <strong>${esc(curSt.estimatedReadTime)}</strong>
            </div>` : ''}
            <table class="doc-table" style="font-size:12.5px">
              <thead>
                <tr>
                  <th style="width:14%">대상 학년</th>
                  <th style="width:26%">권장 글자 수 (공백 포함)</th>
                  <th style="width:22%">단락 · 문장 수</th>
                  <th>문장 호흡 및 발달 수준 특징</th>
                </tr>
              </thead>
              <tbody>
                ${Object.values(specs).map(sp => `
                  <tr style="${+sp.grade === +STATE.grade ? 'background:#eff6ff;font-weight:700' : ''}">
                    <th style="text-align:center">${sp.grade}학년 ${+sp.grade === +STATE.grade ? '★' : ''}</th>
                    <td>${sp.targetCharsMin.toLocaleString()} ~ ${sp.targetCharsMax.toLocaleString()}자</td>
                    <td>${esc(sp.paragraphCountLabel)}</td>
                    <td>${esc(sp.sentenceStyle)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="help-pop-box" style="margin-top:10px">
              💡 <strong>저학년(1~2학년)</strong>은 짧은 단락과 큰 글씨·넓은 줄간격으로 읽기 부담을 낮추고, <strong>고학년(5~6학년)</strong>은 다각적 근거와 심층 개념이 담긴 5~6단락 장문으로 자동 생성됩니다.
            </div>
          `;
        })(),
      },
    };

    const item = HELP_CONTENT[key];
    if (item) {
      openContextHelpModal(item.tag, item.title, item.html);
    }
  }

  /* =====================================================================
   *  이벤트 리스너 바인딩
   * ===================================================================== */
  function bindEvents() {
    // 0) 전역 ? 도움말 팝업 버튼 이벤트 (카드 선택이나 라디오 변경이 실행되지 않도록 최우선 캡처)
    document.body.addEventListener('click', e => {
      const helpKeyBtn = e.target.closest('[data-help-key]');
      if (helpKeyBtn) {
        e.preventDefault();
        e.stopPropagation();
        showNamedHelpPopup(helpKeyBtn.getAttribute('data-help-key'));
        return;
      }
      const stratHelpBtn = e.target.closest('[data-strat-help]');
      if (stratHelpBtn) {
        e.preventDefault();
        e.stopPropagation();
        showStrategyHelpPopup(stratHelpBtn.getAttribute('data-strat-help'));
        return;
      }
      const pkgHelpBtn = e.target.closest('[data-pkg-help]');
      if (pkgHelpBtn) {
        e.preventDefault();
        e.stopPropagation();
        const pkgId = pkgHelpBtn.getAttribute('data-pkg-help');
        const step2Rec = buildStep2TailoredRecommendations(KB, STATE);
        const pkg = step2Rec.packages.find(x => x.id === pkgId);
        showPackageHelpPopup(pkg, true);
        return;
      }
      const presetHelpBtn = e.target.closest('[data-preset-help]');
      if (presetHelpBtn) {
        e.preventDefault();
        e.stopPropagation();
        const presetId = presetHelpBtn.getAttribute('data-preset-help');
        const p = STRATEGY_PRESETS.find(x => x.id === presetId);
        showPackageHelpPopup(p, false);
        return;
      }
      const stdHelpBtn = e.target.closest('[data-std-help]');
      if (stdHelpBtn) {
        e.preventDefault();
        e.stopPropagation();
        showStandardHelpPopup(stdHelpBtn.getAttribute('data-std-help'));
        return;
      }
    }, true);

    const closeHelpBtn = document.getElementById('btn-close-context-help');
    if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeContextHelpModal);
    const okHelpBtn = document.getElementById('btn-ok-context-help');
    if (okHelpBtn) okHelpBtn.addEventListener('click', closeContextHelpModal);
    const helpModalEl = document.getElementById('context-help-modal');
    if (helpModalEl) {
      helpModalEl.addEventListener('click', e => {
        if (e.target === helpModalEl) closeContextHelpModal();
      });
    }

    // 스텝 이동 버튼들 (상단 탭 + 하단 이전/다음 버튼)
    document.body.addEventListener('click', e => {
      const stepBtn = e.target.closest('[data-goto-step]');
      if (stepBtn) {
        goToStep(+stepBtn.getAttribute('data-goto-step'));
      }
    });

    const reopenGuideBtn = document.getElementById('btn-reopen-role-guide');
    if (reopenGuideBtn) {
      reopenGuideBtn.addEventListener('click', () => {
        showEntryRoleGuidePopup(getEntryCodeProfile());
      });
    }

    // 1) 원클릭 샘플 수업 클릭 → 즉시 Step 4 결과 화면으로 이동!
    document.getElementById('quick-sample-bar').addEventListener('click', e => {
      const btn = e.target.closest('[data-sample-id]');
      if (!btn) return;
      const sample = QUICK_SAMPLES.find(s => s.id === btn.getAttribute('data-sample-id'));
      if (!sample) return;
      Object.assign(STATE, {
        unitTitle: '', factualQ: '', conceptualQ: '', debatableQ: '', generalization: '',
        customText: '', customTextTitle: '', teacherVerified: false,
      }, JSON.parse(JSON.stringify(sample.state)));
      normalizeState(false);
      refreshUI();
      goToStep(4);
      showToast(`⚡ 「${sample.title}」 완성본이 생성되었습니다!`);
    });

    // 2) Step 1: 트랙 카드 클릭 → 선택 후 Step 2로 부드럽게 이동
    document.querySelectorAll('.track-card').forEach(card => {
      card.addEventListener('click', () => {
        STATE.track = card.getAttribute('data-track');
        STATE.topic = '';
        normalizeState(true);
        refreshUI();
        goToStep(2);
      });
    });

    document.querySelectorAll('[name="inquiryMode"]').forEach(r => {
      r.addEventListener('change', e => {
        STATE.inquiryMode = e.target.value;
        regenerateAll();
      });
    });

    // 3) 학년 선택
    document.querySelectorAll('.grade-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        STATE.grade = +btn.getAttribute('data-grade');
        if (STATE.grade <= 2 && !['korean', 'math', 'integrated'].includes(STATE.subjectKey)) {
          STATE.subjectKey = 'integrated';
          STATE.areaId = '';
          STATE.topic = '';
        } else if (STATE.grade >= 3 && STATE.subjectKey === 'integrated') {
          STATE.subjectKey = 'social';
          STATE.areaId = '';
          STATE.topic = '';
        } else if (STATE.grade <= 4 && STATE.subjectKey === 'practical') {
          STATE.subjectKey = 'science';
          STATE.areaId = '';
          STATE.topic = '';
        }
        STATE.subjStdCode = '';
        normalizeState(true);
        refreshUI();
      });
    });

    // 4) 교과 선택
    document.getElementById('subject-grid').addEventListener('click', e => {
      const btn = e.target.closest('[data-subj-key]');
      if (!btn) return;
      const newKey = btn.getAttribute('data-subj-key');
      const targetSubj = KB.subjectByKey[newKey];
      if (targetSubj && !targetSubj.grades.includes(+STATE.grade)) {
        STATE.grade = targetSubj.grades[0];
        showToast(`📌 『${targetSubj.short}』 교과 편제에 맞추어 ${STATE.grade}학년으로 자동 전환되었습니다.`);
      }
      STATE.subjectKey = newKey;
      STATE.areaId = '';
      STATE.subjStdCode = '';
      STATE.topic = '';
      STATE.concept1 = '';
      STATE.concept2 = '';
      normalizeState(true);
      refreshUI();
    });

    // 5) 영역 선택
    document.getElementById('area-select').addEventListener('change', e => {
      STATE.areaId = e.target.value;
      STATE.knowledge = [];
      STATE.skills = [];
      STATE.subjStdCode = '';
      STATE.topic = '';
      STATE.concept1 = '';
      STATE.concept2 = '';
      normalizeState(true);
      refreshUI();
    });

    // 6) 지식·이해 / 과정·기능 칩
    document.getElementById('knowledge-chips').addEventListener('click', e => {
      const btn = e.target.closest('[data-k]');
      if (!btn) return;
      const k = btn.getAttribute('data-k');
      if (STATE.knowledge.includes(k)) {
        if (STATE.knowledge.length > 1) STATE.knowledge = STATE.knowledge.filter(x => x !== k);
      } else {
        STATE.knowledge.push(k);
      }
      STATE.subjStdCode = '';
      STATE.topic = `${STATE.knowledge.join('·')} 탐구`;
      STATE.selectedStrategies = recommendStrategySet(KB, STATE);
      renderCurriculumControls();
      renderStrategyBank();
      regenerateAll();
    });

    document.getElementById('skill-chips').addEventListener('click', e => {
      const btn = e.target.closest('[data-s]');
      if (!btn) return;
      const s = btn.getAttribute('data-s');
      if (STATE.skills.includes(s)) {
        if (STATE.skills.length > 1) STATE.skills = STATE.skills.filter(x => x !== s);
      } else {
        STATE.skills.push(s);
      }
      STATE.subjStdCode = '';
      STATE.selectedStrategies = recommendStrategySet(KB, STATE);
      renderCurriculumControls();
      renderStrategyBank();
      regenerateAll();
    });

    // 7-1) 교과 성취기준 선택 (협력수업 A 및 교과교사 단독수업 B)
    const subjStdListEl = document.getElementById('subject-std-list');
    if (subjStdListEl) {
      subjStdListEl.addEventListener('change', e => {
        if (e.target.name === 'subjStd') {
          STATE.subjStdCode = e.target.value;
          const subj = KB.subjectByKey[STATE.subjectKey] || KB.subjects[0];
          const area = subj ? (subj.areas.find(a => a.id === STATE.areaId) || subj.areas[0]) : null;
          const recSubjStds = recommendSubjectStandards(KB, STATE.grade, subj, area, STATE.topic, STATE.knowledge, STATE.skills);
          const picked = recSubjStds.find(s => s.code === STATE.subjStdCode);
          if (picked) {
            if (picked.linkedKnowledge && picked.linkedKnowledge.length) {
              STATE.knowledge = [...picked.linkedKnowledge];
              STATE.topic = `${STATE.knowledge.join('·')} 탐구`;
            }
            if (STATE.track === 'A') {
              const recLib = recommendLibraryStandards(KB, STATE.grade, subj, area, STATE.topic, STATE.skills);
              if (recLib[0]) STATE.libStdCode = recLib[0].code;
            }
          }
          STATE.selectedStrategies = recommendStrategySet(KB, STATE);
          renderCurriculumControls();
          renderStrategyBank();
          regenerateAll();
        }
      });
    }

    // 7-2) 2022 도서관과 정보생활 성취기준 선택 (협력수업 A 및 사서교사 단독수업 C)
    document.getElementById('library-std-list').addEventListener('change', e => {
      if (e.target.name === 'libStd') {
        STATE.libStdCode = e.target.value;
        if (STATE.track === 'C') {
          const std = (KB.library.standards || []).find(s => s.code === STATE.libStdCode);
          if (std) STATE.topic = std.text.replace(/\.$/, '');
        }
        STATE.selectedStrategies = recommendStrategySet(KB, STATE);
        renderCurriculumControls();
        renderStrategyBank();
        regenerateAll();
      }
    });

    // 8) 주제·핵심 개념·장르·직접 입력 텍스트
    const bindInput = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', e => {
        STATE[key] = e.target.value;
        regenerateAll();
      });
    };
    bindInput('input-topic', 'topic');
    bindInput('input-concept1', 'concept1');
    bindInput('input-concept2', 'concept2');
    bindInput('input-custom-text', 'customText');

    document.getElementById('concept-recommend-chips').addEventListener('click', e => {
      const btn = e.target.closest('[data-concept]');
      if (!btn) return;
      const c = btn.getAttribute('data-concept');
      if (!STATE.concept1 || STATE.concept1 === c) STATE.concept2 = c;
      else STATE.concept1 = c;
      renderCurriculumControls();
      regenerateAll();
    });

    document.getElementById('genre-select').addEventListener('change', e => {
      STATE.genre = e.target.value;
      STATE.selectedStrategies = recommendStrategySet(KB, STATE);
      renderCurriculumControls();
      renderStrategyBank();
      regenerateAll();
    });

    // 8-2) Step 2: 도서관 탐구활동(8대 유형) 및 디지털 도구(PICRAT) 이벤트 바인딩
    const coopBindEl = document.getElementById('coop-entity-binding-box');
    if (coopBindEl) {
      coopBindEl.addEventListener('click', e => {
        const actBtn = e.target.closest('[data-info-act]');
        if (!actBtn) return;
        const actId = actBtn.getAttribute('data-info-act');
        const cur = Array.isArray(STATE.infoActivities) ? [...STATE.infoActivities] : [];
        if (cur.includes(actId)) {
          if (cur.length <= 1) {
            showToast('최소 1개 이상의 도서관 탐구활동이 선택되어야 합니다.');
            return;
          }
          STATE.infoActivities = cur.filter(x => x !== actId);
        } else {
          if (cur.length >= 2) cur.shift();
          cur.push(actId);
          STATE.infoActivities = cur;
        }
        STATE.selectedStrategies = recommendStrategySet(KB, STATE);
        renderCoopEntityBindingBox();
        renderStrategyBank();
        regenerateAll();
      });

      coopBindEl.addEventListener('change', e => {
        if (e.target.id === 'picrat-select') {
          STATE.picratCode = e.target.value;
          renderCoopEntityBindingBox();
          regenerateAll();
        }
      });
    }

    // 8-3) Step 3: 협력수업 형태(6종), 사서교사 역할 범위, 시간표 모델, 맞춤형 배려 설정 이벤트 바인딩
    const coopConsultEl = document.getElementById('coop-consultation-card');
    if (coopConsultEl) {
      coopConsultEl.addEventListener('click', e => {
        const apBtn = e.target.closest('[data-approach-id]');
        if (apBtn) {
          STATE.coTeachingApproach = apBtn.getAttribute('data-approach-id');
          renderCoopConsultationCard();
          regenerateAll();
          return;
        }
        if (e.target.closest('#btn-fix-role-parity')) {
          STATE.librarianRoleMode = 'co_instruction_inquiry';
          renderCoopConsultationCard();
          regenerateAll();
          showToast('✨ 사서교사 협력 역할이 정보탐색 전략 및 비판적 읽기 공동 지도(5:5 균형)로 설정되었습니다.');
          return;
        }
        if (e.target.closest('#btn-fix-stigma-risk')) {
          STATE.coTeachingApproach = 'parallel_station';
          STATE.supportDeliveryMode = 'station_rotation';
          renderCoopConsultationCard();
          regenerateAll();
          showToast('🔄 학생 심리적 위축 예방을 위해 학급 2개 조 병렬·스테이션 및 모둠 순회 지도로 전환되었습니다.');
          return;
        }
      });

      coopConsultEl.addEventListener('change', e => {
        if (e.target.id === 'sel-librarian-role-mode' || e.target.name === 'librarianRoleMode') {
          STATE.librarianRoleMode = e.target.value;
          renderCoopConsultationCard();
          regenerateAll();
        } else if (e.target.id === 'sel-schedule-model' || e.target.name === 'scheduleModel') {
          STATE.scheduleModel = e.target.value;
          renderCoopConsultationCard();
          regenerateAll();
        } else if (e.target.id === 'chk-support-slow-learners') {
          STATE.supportSlowLearners = e.target.checked;
          if (STATE.supportSlowLearners && !STATE.supportDeliveryMode) {
            STATE.supportDeliveryMode = 'station_rotation';
          }
          renderCoopConsultationCard();
          regenerateAll();
        } else if (e.target.id === 'sel-support-delivery-mode' || e.target.name === 'supportDeliveryMode') {
          STATE.supportDeliveryMode = e.target.value;
          renderCoopConsultationCard();
          regenerateAll();
        }
      });
    }

    // 9) 추천 전략 탭 전환 & 2단계 학년·교과 맞춤형 추천 패널 & 범용 프리셋 & 카탈로그
    const recTabsBar = document.getElementById('rec-strategy-tabs-bar');
    if (recTabsBar) {
      recTabsBar.addEventListener('click', e => {
        const tabBtn = e.target.closest('[data-rec-tab]');
        if (!tabBtn) return;
        STATE.activeRecTab = tabBtn.getAttribute('data-rec-tab');
        renderStrategyBank();
      });
    }

    const step2RecPanel = document.getElementById('step2-custom-rec-panel');
    if (step2RecPanel) {
      step2RecPanel.addEventListener('click', e => {
        const pkgBtn = e.target.closest('[data-step2-pkg-id]');
        if (pkgBtn) {
          const pkgId = pkgBtn.getAttribute('data-step2-pkg-id');
          const step2Rec = buildStep2TailoredRecommendations(KB, STATE);
          const pkg = step2Rec.packages.find(x => x.id === pkgId);
          if (pkg) {
            STATE.selectedStrategies = [...pkg.ids];
            renderStrategyBank();
            regenerateAll();
            showToast(`🎯 「${pkg.name}」 (${pkg.ids.length}종) 맞춤 전략이 적용되었습니다.`);
          }
          return;
        }

        const keepBtn = e.target.closest('[data-keep-only-id]');
        if (keepBtn) {
          const keepId = keepBtn.getAttribute('data-keep-only-id');
          if (keepId) {
            STATE.selectedStrategies = [keepId];
            renderStrategyBank();
            regenerateAll();
            const s = global.StrategyCatalog.byId[keepId];
            showToast(`🔥 심화 전략 【${s ? s.name : ''}】 1개만 단독 적용되었습니다.`);
          }
          return;
        }

        const indivBtn = e.target.closest('[data-strat-id]');
        if (indivBtn) {
          const id = indivBtn.getAttribute('data-strat-id');
          if (STATE.selectedStrategies.includes(id)) {
            if (STATE.selectedStrategies.length > 1) {
              STATE.selectedStrategies = STATE.selectedStrategies.filter(x => x !== id);
            } else {
              showToast('최소 1개 이상의 전략이 필요합니다.');
              return;
            }
          } else {
            if (STATE.selectedStrategies.length >= 3) {
              showToast('한 차시 수업에는 활동지가 과밀해지지 않도록 최대 3개까지만 전략을 담을 수 있습니다.');
              return;
            }
            STATE.selectedStrategies.push(id);
          }
          renderStrategyBank();
          regenerateAll();
        }
      });
    }

    document.getElementById('strategy-presets').addEventListener('click', e => {
      const btn = e.target.closest('[data-preset-id]');
      if (!btn) return;
      const p = STRATEGY_PRESETS.find(x => x.id === btn.getAttribute('data-preset-id'));
      if (!p) return;
      STATE.selectedStrategies = [...p.ids];
      renderStrategyBank();
      regenerateAll();
      showToast(`✨ 「${p.name}」 (${p.ids.length}종) 구성이 적용되었습니다.`);
    });

    document.getElementById('btn-auto-strategy').addEventListener('click', () => {
      STATE.activeRecTab = 'step2_custom';
      STATE.selectedStrategies = recommendStrategySet(KB, STATE, 'standard');
      renderStrategyBank();
      regenerateAll();
      showToast(`🪄 2단계 선택 학년·교과에 알맞은 핵심 전략 ${STATE.selectedStrategies.length}종이 자동 선택되었습니다.`);
    });

    const btnSingleDeep = document.getElementById('btn-auto-single-deep');
    if (btnSingleDeep) {
      btnSingleDeep.addEventListener('click', () => {
        STATE.activeRecTab = 'step2_custom';
        STATE.selectedStrategies = recommendStrategySet(KB, STATE, 'single_deep');
        renderStrategyBank();
        regenerateAll();
        const s = global.StrategyCatalog.byId[STATE.selectedStrategies[0]];
        showToast(`🔥 2단계 맞춤 심화 전략 【${s ? s.name : ''}】 1개 단독 집중 구성으로 설정되었습니다.`);
      });
    }

    const pacingBanner = document.getElementById('strategy-pacing-banner');
    if (pacingBanner) {
      pacingBanner.addEventListener('click', e => {
        const keepBtn = e.target.closest('[data-keep-only-id]');
        if (!keepBtn) return;
        const keepId = keepBtn.getAttribute('data-keep-only-id');
        if (keepId) {
          STATE.selectedStrategies = [keepId];
          renderStrategyBank();
          regenerateAll();
          const s = global.StrategyCatalog.byId[keepId];
          showToast(`🔥 【${s ? s.name : ''}】 전략 1개만 단독 적용하도록 조정되었습니다.`);
        }
      });
    }

    document.getElementById('selected-strategy-tray').addEventListener('click', e => {
      const rm = e.target.closest('[data-remove-id]');
      if (rm) {
        const id = rm.getAttribute('data-remove-id');
        if (STATE.selectedStrategies.length <= 1) {
          showToast('최소 1개 이상의 전략이 선택되어야 합니다.');
          return;
        }
        STATE.selectedStrategies = STATE.selectedStrategies.filter(x => x !== id);
        renderStrategyBank();
        regenerateAll();
        return;
      }
      const mv = e.target.closest('[data-move-idx]');
      if (mv) {
        const idx = +mv.getAttribute('data-move-idx');
        const dir = +mv.getAttribute('data-dir');
        const target = idx + dir;
        if (target >= 0 && target < STATE.selectedStrategies.length) {
          const arr = [...STATE.selectedStrategies];
          [arr[idx], arr[target]] = [arr[target], arr[idx]];
          STATE.selectedStrategies = arr;
          renderStrategyBank();
          regenerateAll();
        }
      }
    });

    document.querySelectorAll('.phase-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.phase-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.strategyFilterPhase = btn.getAttribute('data-phase');
        renderStrategyBank();
      });
    });

    document.getElementById('strategy-cat-bar').addEventListener('click', e => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      STATE.strategyFilterCat = btn.getAttribute('data-cat');
      renderStrategyBank();
    });

    document.getElementById('strategy-search-input').addEventListener('input', e => {
      STATE.strategySearch = e.target.value;
      renderStrategyBank();
    });

    document.getElementById('strategy-bank-grid').addEventListener('click', e => {
      const card = e.target.closest('[data-strat-id]');
      if (!card) return;
      const id = card.getAttribute('data-strat-id');
      if (STATE.selectedStrategies.includes(id)) {
        if (STATE.selectedStrategies.length > 1) {
          STATE.selectedStrategies = STATE.selectedStrategies.filter(x => x !== id);
        } else {
          showToast('최소 1개 이상의 전략이 필요합니다.');
        }
      } else {
        if (STATE.selectedStrategies.length >= 3) {
          showToast('한 차시 수업에는 활동지가 과밀해지지 않도록 최대 3개까지만 전략을 담을 수 있습니다.');
          return;
        }
        STATE.selectedStrategies.push(id);
      }
      renderStrategyBank();
      regenerateAll();
    });

    // 10) Step 4: 교사 최종 확인 체크박스 (체크 전 저장/다운로드 잠금)
    const verifyChk = document.getElementById('chk-teacher-verified');
    if (verifyChk) {
      verifyChk.addEventListener('change', e => {
        STATE.teacherVerified = e.target.checked;
        syncVerificationLockUI();
        regenerateAll();
        showToast(
          STATE.teacherVerified
            ? '✅ 교사 최종 확인 완료! 이제 저장 · 한글(.doc) · MD · PDF 인쇄가 가능합니다.'
            : '🔒 교사 최종 확인 체크가 해제되어 저장 및 다운로드가 잠겼습니다.'
        );
      });
    }

    // 11) 출력 탭 전환 & 인터넷 서점 도서 검색 연동 & 내보내기
    document.querySelectorAll('.output-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        STATE.activeOutputTab = btn.getAttribute('data-tab');
        updateOutputTabVisibility();
      });
    });

    const textTabEl = document.getElementById('output-tab-text');
    if (textTabEl) {
      const syncBookstoreHref = queryStr => {
        const links = buildBookstoreLinks(queryStr);
        const aAladin = document.getElementById('link-store-aladin');
        const aYes24 = document.getElementById('link-store-yes24');
        const aKyobo = document.getElementById('link-store-kyobo');
        const aNlcy = document.getElementById('link-store-nlcy');
        if (aAladin) aAladin.href = links.aladin;
        if (aYes24) aYes24.href = links.yes24;
        if (aKyobo) aKyobo.href = links.kyobo;
        if (aNlcy) aNlcy.href = links.nlcy;
      };
      textTabEl.addEventListener('input', e => {
        if (e.target.id === 'bookstore-query-input') {
          syncBookstoreHref(e.target.value);
        }
      });
      textTabEl.addEventListener('click', e => {
        const chip = e.target.closest('[data-book-kw]');
        if (!chip) return;
        const kw = chip.getAttribute('data-book-kw');
        textTabEl.querySelectorAll('.bookstore-kw-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const inputEl = document.getElementById('bookstore-query-input');
        if (inputEl) inputEl.value = kw;
        syncBookstoreHref(kw);
      });
    }

    document.getElementById('toggle-editable').addEventListener('change', e => {
      STATE.editableMode = e.target.checked;
      regenerateAll();
      showToast(STATE.editableMode ? '직접 편집 모드 ON: 문서의 글자를 클릭해 바로 수정하세요.' : '직접 편집 모드가 해제되었습니다.');
    });

    document.getElementById('btn-print-all').addEventListener('click', () => {
      if (!requireTeacherVerification('전체 인쇄 및 PDF 저장')) return;
      document.body.classList.add('print-all-mode');
      window.print();
      setTimeout(() => document.body.classList.remove('print-all-mode'), 500);
    });

    document.getElementById('btn-export-hwp').addEventListener('click', () => {
      if (!requireTeacherVerification('한글/워드(.doc) 다운로드')) return;
      const html = toHwpCompatibleHtml('#all-print-bundle', `${CURRENT_PLAN.grade}학년_${CURRENT_PLAN.subjectShort}_${CURRENT_PLAN.topic}`);
      downloadFile(`${CURRENT_PLAN.grade}학년_${CURRENT_PLAN.subjectShort}_${CURRENT_PLAN.topic}_수업패키지.doc`, html, 'application/msword;charset=utf-8');
      showToast('한글(HWP)·MS 워드 호환 문서(.doc)가 다운로드되었습니다.');
    });

    document.getElementById('btn-export-md').addEventListener('click', () => {
      if (!requireTeacherVerification('Markdown(.md) 다운로드')) return;
      const md = toMarkdown(CURRENT_PLAN, CURRENT_TEXT, CURRENT_WORKSHEETS);
      downloadFile(`${CURRENT_PLAN.grade}학년_${CURRENT_PLAN.subjectShort}_${CURRENT_PLAN.topic}_지도안.md`, md, 'text/markdown;charset=utf-8');
      showToast('Markdown(.md) 파일이 다운로드되었습니다.');
    });

    // 가이드 모달
    const guideModal = document.getElementById('guide-modal');
    document.getElementById('btn-open-guide').onclick = () => guideModal.classList.add('open');
    document.getElementById('btn-close-guide').onclick = () => guideModal.classList.remove('open');

    initAuthAndStorage();
  }

  function refreshUI() {
    renderTrackSelector();
    renderQuickSampleBar();
    renderCurriculumControls();
    renderStrategyBank();
    regenerateAll();
    updateOutputTabVisibility();
  }

  /* ---------------- 초기화 ---------------- */
  function init() {
    KB = global.Ontology.buildKB(global.TTL_SOURCES || {}, global.INQUIRY_DATA || {});
    const ensureStrat = (name, desc, cat, phases, info) => {
      if (!name || global.StrategyCatalog.findByName(name)) return;
      const id = 'onto_' + global.StrategyCatalog.list.length;
      const item = {
        id, name, aliases: [name], cat: cat || '독서전략',
        phases: phases || [3, 4], info: info || [4], bands: ['1-2', '3-4', '5-6'],
        desc: desc || `${name} 전략을 활용하여 텍스트와 개념을 탐구합니다.`,
        steps: ['핵심 주제를 확인한다', `${name} 절차에 따라 탐구한다`, '모둠과 결과를 공유한다'],
        prompts: [`【${name}】 전략을 활용해 '{topic}'의 핵심을 정리해 볼까요?`],
        act: `${name} 전략으로 자료를 분석하고 활동지에 정리한다.`,
        ws: 'generic',
        depth: 'normal',
        depthLabel: '일반 수업 전략',
      };
      global.StrategyCatalog.list.push(item);
      global.StrategyCatalog.byId[id] = item;
    };
    (KB.instructionStrategies || []).forEach(s => ensureStrat(s.name, s.desc, '수업전략', [3, 4], [4]));
    (KB.inquiry.phases || []).forEach(p => (p.strategies || []).forEach(s => ensureStrat(s.name, s.desc, s.routine ? '사고루틴' : '개념학습', [p.seq], [Math.min(6, p.seq)])));
    (KB.reading || []).forEach(r => (r.strategies || []).forEach(sn => ensureStrat(sn, `'${r.name}' 독서 기능을 기르는 대표 독서 전략입니다.`, '독서전략', [3, 4], [4])));

    const statEl = document.getElementById('kb-status-pill');
    if (statEl) {
      statEl.textContent = `온톨로지 ${KB.stats.files}종 · 전략 ${global.StrategyCatalog.list.length}종 연동`;
    }
    const initProfile = getEntryCodeProfile();
    if (initProfile === 'LIB') STATE.track = 'C';
    else if (initProfile === 'DD') STATE.track = 'B';
    renderQuickSampleBar();
    normalizeState(true);
    bindEvents();
    refreshUI();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
