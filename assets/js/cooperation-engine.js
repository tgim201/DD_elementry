/* =====================================================================
 *  초등 도서관협력수업 통합 설계 엔진 (cooperation-engine.js)
 *  - [블랙박스(Black Box) 아키텍처]:
 *    내부 데이터 모델과 검증 파이프라인은 학술 이론을 정밀하게 구현하되,
 *    화면에 표시되는 모든 UI 텍스트와 생성 문서에는 현장 교사 친화적 표면 용어만 사용합니다.
 *  - 핵심 제공 함수:
 *    1) bindEntitiesForCurriculum(kb, state)
 *    2) validateTranslationStep(targetStep, state, kb)
 *    3) validateRoleParity(state)
 *    4) detectStigmaRisk(state)
 *    5) punctualizeLessonPlan(formData, kb, basePlan, readingText)
 * ===================================================================== */
(function (global) {
  'use strict';

  /* ---------------- 1. 협력수준 5단계 (표면 용어 캡슐화) ---------------- */
  const COOPERATION_LEVELS = {
    level1_library_use: {
      id: 'level1_library_use',
      step: 1,
      label: '1단계 · 도서관 시설·공간 활용 수업',
      description: '담임(교과)교사가 도서관 공간과 기본 장서를 활용하여 진행하는 수업',
      isBalancedCoTeaching: false,
    },
    level2_material_prep: {
      id: 'level2_material_prep',
      step: 2,
      label: '2단계 · 단원 맞춤 자료준비 협력',
      description: '사서교사가 단원 관련 도서 목록과 서가 꾸러미를 사전에 준비·지원하는 수업',
      isBalancedCoTeaching: false,
    },
    level3_instruction_support: {
      id: 'level3_instruction_support',
      step: 3,
      label: '3단계 · 정보탐색·독서전략 부분 협력',
      description: '수업 중 자료 탐색이나 독서 전략 지도 구간을 사서교사가 맡아 함께 지원하는 수업',
      isBalancedCoTeaching: true,
    },
    level4_co_teaching: {
      id: 'level4_co_teaching',
      step: 4,
      label: '4단계 · 정보활용×교과 공동수업 (권장 표준)',
      description: '교과 성취기준과 도서관 성취기준을 결합하여 사전협의·수업·평가를 대등하게 함께 이끄는 수업',
      isBalancedCoTeaching: true,
    },
    level5_transdisciplinary: {
      id: 'level5_transdisciplinary',
      step: 5,
      label: '5단계 · 학교자율시간·범교과 통합 프로젝트',
      description: '학교자율시간·창의적 체험활동 및 여러 교과를 도서관 탐구 프로젝트로 통합 운영하는 수업',
      isBalancedCoTeaching: true,
    },
  };

  /* ---------------- 2. 도서관 정보활동 8대 유형 ---------------- */
  const INFO_ACTIVITIES_8 = {
    info_presentation: {
      id: 'info_presentation',
      icon: '🖼️',
      label: '정보제시·안내',
      shortDesc: '단원 도입 그림책·북트레일러·주제 자료 큐레이션 안내',
      description: '단원 도입에 필요한 핵심 배경지식과 그림책·시청각 자료·서가 안내도를 제시하여 탐구 동기를 깨우는 활동',
      preferredSubjects: ['integrated', 'korean', 'moral', 'music', 'art'],
      linkedSkills: ['관찰하기', '살펴보기', '이해하기', '경청하기', '감상하기'],
      defaultPicrat: 'PA',
      recommendedTools: ['디지털 그림책 큐레이션 보드', '청구기호·서가 위치 시각화 안내도'],
    },
    info_search: {
      id: 'info_search',
      icon: '🔎',
      label: '정보탐색·조사',
      shortDesc: 'KDC 십진분류표·도서관 검색대(OPAC)로 주제 도서 직접 탐색',
      description: '한국십진분류표(KDC)와 도서관 검색대(OPAC), 핵심 검색어를 활용해 탐구 질문 해결에 필요한 자료를 찾아내는 활동',
      preferredSubjects: ['social', 'science', 'korean', 'practical', 'integrated'],
      linkedSkills: ['조사하기', '찾기', '탐색하기', '수집하기', '선별하기'],
      defaultPicrat: 'IA',
      recommendedTools: ['학교도서관 온라인 검색대(OPAC)', '모둠 공유 디지털 정보 장바구니'],
    },
    info_analysis: {
      id: 'info_analysis',
      icon: '⚖️',
      label: '정보분석·자료해석',
      shortDesc: '사실·의견 구분, 정보 신뢰성(CRAAP) 검증 및 비교·대조 해석',
      description: '찾은 자료에서 객관적 사실과 글쓴이의 의견을 구분하고 정보원의 신뢰성(CRAAP)과 인과·비교 관계를 분석하는 활동',
      preferredSubjects: ['social', 'science', 'math', 'korean', 'moral'],
      linkedSkills: ['비교하기', '분석하기', '구분하기', '분류하기', '추론하기', '해석하기', '비판하기'],
      defaultPicrat: 'IA',
      recommendedTools: ['디지털 벤다이어그램·비교 매트릭스', '팩트체크(CRAAP) 상호점검 보드'],
    },
    info_synthesis: {
      id: 'info_synthesis',
      icon: '🧩',
      label: '정보종합·표현제작',
      shortDesc: '여러 자료의 핵심 근거를 묶어 개념도·미니북·카드뉴스로 재구성',
      description: '복수의 자료에서 뽑은 근거를 통합하여 개념도, 미니북, 인포그래픽 등 자신의 말로 재구성하고 출처를 표기하는 활동',
      preferredSubjects: ['korean', 'social', 'art', 'music', 'english', 'practical'],
      linkedSkills: ['종합하기', '조직하기', '표현하기', '제작하기', '쓰기', '요약하기'],
      defaultPicrat: 'CT',
      recommendedTools: ['공동 편집 디지털 북·포스터 제작 도구', '표준 출처 표기 체크리스트'],
    },
    info_simulation: {
      id: 'info_simulation',
      icon: '🎭',
      label: '정보탐구·모의활동',
      shortDesc: '역사 인물 인터뷰·경제 선택·역할극 등 자료 기반 모의 시연',
      description: '역사적 사건, 경제적 선택, 의사소통 맥락 등을 역할극이나 모의 상황으로 설정하여 조사한 근거로 시연하는 활동',
      preferredSubjects: ['social', 'moral', 'english', 'pe', 'integrated'],
      linkedSkills: ['시연하기', '역할극하기', '소통하기', '공감하기', '적용하기'],
      defaultPicrat: 'IT',
      recommendedTools: ['역할별 관점 자료 카드 세트', '모의 의사결정 실시간 의견 보드'],
    },
    info_experiment: {
      id: 'info_experiment',
      icon: '🔬',
      label: '정보탐구·실험관찰',
      shortDesc: '실험·관찰 결과와 도서관 과학 도감·백과사전 교차 검증',
      description: '자연 현상이나 수학·과학적 원리에 대한 실험·관찰 결과를 도서관의 과학 백과·도감 자료와 대조하여 검증하는 활동',
      preferredSubjects: ['science', 'math', 'practical', 'integrated'],
      linkedSkills: ['실험하기', '관찰하기', '측정하기', '검증하기', '설계하기'],
      defaultPicrat: 'CA',
      recommendedTools: ['실험·도감 교차검증 기록 시트', '과학·수학 개념 시각화 도구'],
    },
    info_project: {
      id: 'info_project',
      icon: '🚀',
      label: '정보탐구·프로젝트',
      shortDesc: '우리 학교·마을 실생활 문제 해결을 위한 장기·블록 탐구 프로젝트',
      description: '실생활 및 지역사회의 문제를 해결하기 위해 질문 수립부터 도서관 자료 조사, 산출물 제작, 실천 캠페인까지 수행하는 활동',
      preferredSubjects: ['social', 'science', 'practical', 'integrated', 'art'],
      linkedSkills: ['계획하기', '설계하기', '문제 해결하기', '실천하기', '제안하기'],
      defaultPicrat: 'CT',
      recommendedTools: ['모둠 프로젝트 진행 보드', '우리 학교·마을 문제해결 디지털 아카이브'],
    },
    info_debate: {
      id: 'info_debate',
      icon: '💬',
      label: '정보탐구·토론',
      shortDesc: '도서관 자료·통계에서 찬반 근거를 찾아 출처를 밝히며 토의·토론',
      description: '논쟁적 질문에 대해 도서관 장서와 통계 자료에서 찬반 논거를 수집·검증하고 민주적 절차에 따라 토의·토론하는 활동',
      preferredSubjects: ['korean', 'social', 'moral', 'science'],
      linkedSkills: ['토론하기', '토의하기', '주장하기', '근거 들기', '판단하기', '조정하기'],
      defaultPicrat: 'IT',
      recommendedTools: ['찬반 근거·출처 공유 보드', '토론 전후 생각 변화 그래프'],
    },
  };

  /* ---------------- 3. 교사 간 협력수업 형태 6대 유형 (1수업 2교사제) ---------------- */
  const CO_TEACHING_APPROACHES = {
    team_coteaching: {
      id: 'team_coteaching',
      icon: '🤝',
      label: '팀티칭·코티칭 수업 (권장 표준)',
      summary: '교과교사와 사서교사가 한 공간에서 대화를 주고받듯 교과 개념 탐구와 도서관 정보활용 전략을 대등하게 함께 진행합니다.',
      subjectTeacherRole: '교과 핵심 개념 발문, 실생활 맥락 제시 및 일반화 원리 도출 주도',
      librarianTeacherRole: 'KDC 서가 탐색 전략 시범, 사실·의견 판별(CRAAP) 코칭 및 출처 윤리 지도 주도',
      defaultBalance: { subject: 50, librarian: 50 },
      preventsStigma: true,
    },
    parallel_station: {
      id: 'parallel_station',
      icon: '🔄',
      label: '병렬·스테이션 수업 (위축 예방·모둠 순회 최적)',
      summary: '학급을 2개 조(스테이션 A·B)로 나누어 [교과 개념 탐구 코너]와 [도서관 자료 탐색·독서 코너]를 교차 운영합니다.',
      subjectTeacherRole: '스테이션 A에서 읽기 텍스트 분석 및 개념 구조화(개념도·비교표) 집중 지도',
      librarianTeacherRole: '스테이션 B에서 OPAC·서가 탐색, 다층 수준별 도서 매칭 및 출처 표기 밀착 지도',
      defaultBalance: { subject: 50, librarian: 50 },
      preventsStigma: true,
    },
    strategy_supplement: {
      id: 'strategy_supplement',
      icon: '🧭',
      label: '독서·학습전략 보충지도',
      summary: '교과 탐구 흐름 속에서 학생들의 정보 독해와 그래픽 조직자 작성을 두 교사가 모둠 순회로 촘촘하게 지원합니다.',
      subjectTeacherRole: '단원 성취기준 핵심 활동 진행 및 교과 개념 오개념 교정',
      librarianTeacherRole: '어휘 디딤돌 카드, 읽기 전략(SQ3R·KWL) 및 단계별 정보 요약 비계(Scaffolding) 제공',
      defaultBalance: { subject: 50, librarian: 50 },
      preventsStigma: true,
    },
    alternative_teaching: {
      id: 'alternative_teaching',
      icon: '🎨',
      label: '교수·학습 대안수업 (다층 자료 선택형)',
      summary: '학생들이 자신의 흥미와 읽기 수준에 맞는 자료(심층 지식도서 vs 그림책·시각 백과)를 선택해 맞춤형으로 탐구합니다.',
      subjectTeacherRole: '지식도서·교과 텍스트 중심 모둠의 개념 관계 분석 및 일반화 도출 지도',
      librarianTeacherRole: '그림책·인포그래픽·쉬운 읽기(Easy-Read) 자료 선택 모둠의 핵심 의미 파악 및 표현 지도',
      defaultBalance: { subject: 55, librarian: 45 },
      preventsStigma: true,
    },
    lead_assist: {
      id: 'lead_assist',
      icon: '🙋',
      label: '주도-보조 수업',
      summary: '한 교사가 전체 수업 흐름을 이끌고, 다른 교사가 모둠을 순회하며 자료 탐색과 개별 질문을 돕습니다.',
      subjectTeacherRole: '전체 차시 수업 진행 및 핵심 질문·토의 총괄',
      librarianTeacherRole: '모둠별 주제 도서 배부, 검색어 조언 및 활동지 작성 순회 지원',
      defaultBalance: { subject: 65, librarian: 35 },
      preventsStigma: true,
    },
    lead_observe: {
      id: 'lead_observe',
      icon: '📋',
      label: '주도-관찰 수업 (과정중심평가 집중)',
      summary: '한 교사가 수업을 진행하는 동안 다른 교사가 평가 루브릭에 따라 학생들의 탐구·정보활용 과정을 정밀 관찰·기록합니다.',
      subjectTeacherRole: '핵심 탐구 과제 제시 및 모둠 토의 진행',
      librarianTeacherRole: '학생별 정보 탐색 태도, 사실·의견 판별 및 출처 표기 과정 관찰·피드백 기록',
      defaultBalance: { subject: 60, librarian: 40 },
      preventsStigma: true,
    },
  };

  /* ---------------- 4. 시간표 운영 4대 모델 ---------------- */
  const SCHEDULE_MODELS = {
    fixed_40: {
      id: 'fixed_40',
      label: '고정형 시간표 (40분 · 1차시)',
      durationText: '40분 (1차시 표준 협력수업)',
      phaseMinutes: [8, 12, 12, 8],
      description: '정규 40분 차시 안에서 도입(8분)-전개1(12분)-전개2(12분)-정리(8분)로 알차게 운영하는 표준 시간표',
    },
    block_80: {
      id: 'block_80',
      label: '블록형 시간표 (80분 · 2차시 연속 묶음)',
      durationText: '80분 (1~2차시 연속 블록타임)',
      phaseMinutes: [15, 25, 25, 15],
      description: '서가 직접 탐색과 심층 읽기, 모둠 산출물 제작·발표까지 충분한 시간을 확보하는 80분 연속 블록 수업',
    },
    flexible: {
      id: 'flexible',
      label: '탄력형 시간표 (교실 사전활동 + 도서관 본시 연동)',
      durationText: '40분 본시 + 사전·사후 탄력 연동',
      phaseMinutes: [7, 13, 13, 7],
      description: '교실에서 사전 질문 만들기를 마친 뒤 도서관으로 이동하여 자료 탐색과 개념 구조화에 집중하는 탄력 운영',
    },
    autonomous_creative: {
      id: 'autonomous_creative',
      label: '학교자율시간 · 창의적 체험활동 연계',
      durationText: '학교자율시간·창체 연계 프로젝트 (40~80분)',
      phaseMinutes: [10, 15, 15, 10],
      description: '2022 개정 교육과정 학교자율시간 또는 창의적 체험활동과 교과·도서관 수업을 통합한 주제 탐구 운영',
    },
  };

  /* ---------------- 5. 디지털·도서관 도구 활용 매트릭스 (PICRAT 9칸) ---------------- */
  const PICRAT_MATRIX = {
    PR: {
      code: 'PR',
      studentDimLabel: '수동적 수용(P)',
      teacherDimLabel: '매체 대체(R)',
      surfaceLabel: '디지털 자료 화면 제시 (수동적 수용 · 매체 대체)',
      toolExamples: ['전자책(e-Book) 화면 공유', '디지털 슬라이드 안내'],
      pedagogicalEffect: '인쇄 자료를 대형 화면으로 선명하게 제시하여 학급 전체의 주의를 집중시킵니다.',
    },
    PA: {
      code: 'PA',
      studentDimLabel: '수동적 수용(P)',
      teacherDimLabel: '기능 확장(A)',
      surfaceLabel: '시청각 북트레일러·서가 안내 (수동적 수용 · 기능 확장)',
      toolExamples: ['북트레일러 영상', 'KDC 서가 위치 디지털 안내도', '멀티미디어 백과'],
      pedagogicalEffect: '시각·청각 자료를 결합하여 단원 주제의 배경지식과 탐구 호기심을 빠르게 깨웁니다.',
    },
    PT: {
      code: 'PT',
      studentDimLabel: '수동적 수용(P)',
      teacherDimLabel: '수업 변혁(T)',
      surfaceLabel: '실감형 전문가·현장 연결 (수동적 수용 · 수업 변혁)',
      toolExamples: ['온라인 작가·전문가 인터뷰 영상', '디지털 박물관·생태관 VR 투어'],
      pedagogicalEffect: '교실과 도서관의 물리적 한계를 넘어 생생한 현장 맥락을 수업 안으로 연결합니다.',
    },
    IR: {
      code: 'IR',
      studentDimLabel: '상호작용 탐구(I)',
      teacherDimLabel: '매체 대체(R)',
      surfaceLabel: '도서관 검색대(OPAC) 직접 검색 (상호작용 · 매체 대체)',
      toolExamples: ['학교도서관 OPAC 도서 검색', '디지털 국어·백과사전 어휘 검색'],
      pedagogicalEffect: '학생이 직접 검색어를 입력하며 필요한 도서의 청구기호와 서가 위치를 스스로 찾아냅니다.',
    },
    IA: {
      code: 'IA',
      studentDimLabel: '상호작용 탐구(I)',
      teacherDimLabel: '기능 확장(A)',
      surfaceLabel: '모둠 공유 보드 & 팩트체크 (상호작용 · 기능 확장)',
      toolExamples: ['패들렛(Padlet) 모둠 자료 장바구니', '디지털 사실·의견 분류 보드'],
      pedagogicalEffect: '모둠원들이 도서에서 찾은 근거를 실시간으로 모아 비교하고 정보 신뢰성을 함께 검증합니다.',
    },
    IT: {
      code: 'IT',
      studentDimLabel: '상호작용 탐구(I)',
      teacherDimLabel: '수업 변혁(T)',
      surfaceLabel: '실시간 협력 토의·시뮬레이션 (상호작용 · 수업 변혁)',
      toolExamples: ['실시간 찬반 논거·출처 아카이빙 보드', '학급 전체 생각 변화 디지털 투표'],
      pedagogicalEffect: '도서관 자료에서 찾은 근거를 바탕으로 학급 전체가 역동적으로 상호작용하며 숙의합니다.',
    },
    CR: {
      code: 'CR',
      studentDimLabel: '창의적 제작(C)',
      teacherDimLabel: '매체 대체(R)',
      surfaceLabel: '디지털 활동지·독서 기록 작성 (창의적 제작 · 매체 대체)',
      toolExamples: ['디지털 독서 기록장', '한글·워드 요약 카드 작성'],
      pedagogicalEffect: '탐구한 내용과 출처를 깔끔한 문서 양식으로 기록하고 고쳐쓰기 과정을 거칩니다.',
    },
    CA: {
      code: 'CA',
      studentDimLabel: '창의적 제작(C)',
      teacherDimLabel: '기능 확장(A)',
      surfaceLabel: '디지털 개념도·그래픽 조직자 제작 (창의적 제작 · 기능 확장)',
      toolExamples: ['협업 마인드맵·개념도 도구', '디지털 프레이어 모델·벤다이어그램 보드'],
      pedagogicalEffect: '수집한 사실들을 핵심 개념 간의 관계망으로 시각화하여 일반화 문장을 도출합니다.',
    },
    CT: {
      code: 'CT',
      studentDimLabel: '창의적 제작(C)',
      teacherDimLabel: '수업 변혁(T)',
      surfaceLabel: '공동 창작 디지털북·캠페인 제작 (창의적 제작 · 수업 변혁)',
      toolExamples: ['북크리에이터·캔바 학급 공동 백과사전', '출처 포함 어린이 카드뉴스·미니북 제작'],
      pedagogicalEffect: '학생들이 지식 소비자를 넘어 올바른 출처를 밝히는 창의적 지식 생산자로 성장합니다.',
    },
  };

  /* ---------------- 6. 사서교사 협력 역할 범위 옵션 ---------------- */
  const LIBRARIAN_ROLE_MODES = [
    {
      id: 'co_instruction_inquiry',
      label: '🌟 정보탐색 전략 및 비판적 읽기 공동 지도 (권장 · 5:5 대등 협력)',
      desc: 'KDC 서가 탐색, 사실·의견 구분(CRAAP), 출처 표기까지 교과교사와 대등하게 수업을 함께 이끕니다.',
      badge: '4~5단계 공동수업',
      isBalanced: true,
    },
    {
      id: 'reading_feedback_coach',
      label: '📖 독서 전략 코칭 및 출처·저작권 피드백 집중 지원 (권장)',
      desc: '학생들의 눈높이 도서 매칭, 읽기 전략(KWL·요약) 비계 제공 및 출처 작성 피드백을 주도합니다.',
      badge: '3~4단계 협력수업',
      isBalanced: true,
    },
    {
      id: 'material_prep_only',
      label: '📚 단원 관련 도서 목록 준비 및 대출·비치 보조만 수행 (단순 자료준비)',
      desc: '수업 전 주제 도서 꾸러미 비치 및 대출만 지원합니다. (※ 선택 시 수업 완성도를 높이는 역할 추천 안내가 제공됩니다)',
      badge: '2단계 자료준비',
      isBalanced: false,
    },
  ];

  /* ---------------- 7. 기초학력·맞춤 지원 운영 방식 옵션 ---------------- */
  const SUPPORT_DELIVERY_MODES = [
    {
      id: 'station_rotation',
      label: '🔄 학급 2개 조 병렬·스테이션 및 모둠 순회 지도 (권장 · 위축 예방)',
      desc: '특정 학생을 따로 부르지 않고 학급 전체가 스테이션을 순환하며 두 교사에게 자연스럽게 맞춤형 비계를 지원받습니다.',
      safe: true,
    },
    {
      id: 'universal_scaffold',
      label: '🃏 전체 학생 대상 다층 수준별 읽기 자료(그림책·어휘 카드) 보편적 제공 (권장)',
      desc: '모든 모둠에 그림책·쉬운 설명문·핵심 어휘 카드를 함께 제공하여 낙인감 없이 스스로 이해하도록 돕습니다.',
      safe: true,
    },
    {
      id: 'pull_out',
      label: '⚠️ 특정 학생 별도 분리(개별 차출) 집중 보충지도',
      desc: '기초학력 지원 대상 학생만 별도 테이블로 분리하여 지도합니다. (※ 학생의 심리적 위축 예방을 위한 대안 안내가 작동합니다)',
      safe: false,
    },
  ];

  /* =====================================================================
   *  핵심 로직 1: 교과/단원 기반 도서관 탐구활동·자원 자동 결합 엔진
   *  bindEntitiesForCurriculum(kb, state)
   * ===================================================================== */
  function bindEntitiesForCurriculum(kb, state) {
    const subjKey = state.subjectKey || 'social';
    const subj = (kb && kb.subjectByKey && kb.subjectByKey[subjKey]) || (kb && kb.subjects && kb.subjects[0]) || { key: subjKey, short: '교과', areas: [] };
    const area = (subj.areas || []).find(a => a.id === state.areaId) || (subj.areas && subj.areas[0]) || { id: '', name: '', skills: [], knowledge: [] };
    const skillText = [...(state.skills || []), ...(area.skills || [])].join(' ');
    const topicText = `${state.topic || ''} ${(state.knowledge || []).join(' ')}`;

    const scoredActivities = Object.values(INFO_ACTIVITIES_8)
      .map(act => {
        let score = 10;
        if (act.preferredSubjects.includes(subjKey)) score += 18;
        act.linkedSkills.forEach(kw => {
          if (skillText.includes(kw) || topicText.includes(kw)) score += 12;
        });
        if (state.genre === 'argument' && act.id === 'info_debate') score += 22;
        if (state.genre === 'compare' && act.id === 'info_analysis') score += 20;
        if (state.genre === 'cause' && (act.id === 'info_analysis' || act.id === 'info_experiment')) score += 18;
        if (state.genre === 'fiction' && (act.id === 'info_presentation' || act.id === 'info_synthesis')) score += 16;
        return { act, score };
      })
      .sort((a, b) => b.score - a.score);

    const primaryAct = (scoredActivities[0] && scoredActivities[0].act) || INFO_ACTIVITIES_8.info_search;
    const secondaryAct = (scoredActivities[1] && scoredActivities[1].act) || INFO_ACTIVITIES_8.info_analysis;

    const kdcList = global.Recommender && global.Recommender.recommendKDC
      ? global.Recommender.recommendKDC(subjKey, area.name, `${state.topic || ''} ${(state.knowledge || []).join(' ')}`)
      : [{ code: '300', name: '사회과학', sub: '300 사회과학 일반' }];

    const picratCode = state.picratCode || primaryAct.defaultPicrat || 'IA';
    const picratSpec = PICRAT_MATRIX[picratCode] || PICRAT_MATRIX.IA;

    const defaultSchedId = state.scheduleModel || (primaryAct.id === 'info_project' ? 'block_80' : 'fixed_40');
    const scheduleSpec = SCHEDULE_MODELS[defaultSchedId] || SCHEDULE_MODELS.fixed_40;

    const defaultApproachId = state.coTeachingApproach || (state.supportSlowLearners ? 'parallel_station' : 'team_coteaching');
    const approachSpec = CO_TEACHING_APPROACHES[defaultApproachId] || CO_TEACHING_APPROACHES.team_coteaching;

    return {
      subjectKey: subjKey,
      areaId: area.id,
      subjectStandardCode: state.subjStdCode || '',
      libraryStandardCode: state.libStdCode || '',
      recommendedInfoActivities: [primaryAct, secondaryAct],
      kdcCollections: kdcList,
      picratRecommendation: picratSpec,
      recommendedSchedule: scheduleSpec,
      recommendedApproach: approachSpec,
      mutualBenefitSummary: {
        forSubjectTeacher: `단원 탐구에 필요한 수준별 도서 큐레이션과 정보 판별·출처 지도를 사서교사와 함께 분담하여, 수업 준비 부담을 덜고 교과 핵심 개념 구조화에 집중할 수 있습니다.`,
        forLibrarianTeacher: `『2022 도서관과 정보생활』 성취기준(${state.libStdCode || '정보활용'})을 ${subj.short || '교과'} 실제 단원 맥락과 연결하여 살아 있는 정보문해 교육을 실현합니다.`,
        forStudents: `교과서 단일 지문을 넘어 학교도서관의 풍부한 도서(KDC ${kdcList[0] ? kdcList[0].code : '000'}번대)와 디지털 도구를 활용하며 격차 없이 주도적으로 탐구합니다.`,
      },
    };
  }

  /* =====================================================================
   *  핵심 로직 2: 역할 편중 방지 가드 (Role Parity Guard)
   *  validateRoleParity(state)
   * ===================================================================== */
  function validateRoleParity(state) {
    const isCoopTrack = (state.track || 'A') === 'A';
    const roleMode = state.librarianRoleMode || 'co_instruction_inquiry';
    const approachId = state.coTeachingApproach || 'team_coteaching';
    const approach = CO_TEACHING_APPROACHES[approachId] || CO_TEACHING_APPROACHES.team_coteaching;

    if (!isCoopTrack) {
      return {
        isValid: true,
        cooperationLevel: COOPERATION_LEVELS.level1_library_use,
        balanceScore: { subjectTeacherRatio: 100, librarianTeacherRatio: 0, parityIndex: 100 },
        warningMessage: null,
        suggestedRoles: [],
        recommendedRoleMode: 'co_instruction_inquiry',
        recommendedApproachId: 'team_coteaching',
      };
    }

    if (roleMode === 'material_prep_only') {
      return {
        isValid: false,
        cooperationLevel: COOPERATION_LEVELS.level2_material_prep,
        balanceScore: {
          subjectTeacherRatio: 85,
          librarianTeacherRatio: 15,
          parityIndex: 30,
        },
        warningMessage:
          "사서교사의 '정보탐색 전략' 또는 '독서 피드백' 지도가 함께 포함되면 수업 완성도가 높아집니다. 추천 협력 역할을 추가하시겠습니까?",
        suggestedRoles: [
          'KDC 청구기호 해독 및 핵심 검색어 탐색 전략 시범 지도',
          '읽기 자료의 사실·의견 판별(CRAAP) 및 독서 피드백 코칭',
          '인용 자료의 올바른 출처 표기 및 저작권 윤리 지도',
        ],
        recommendedRoleMode: 'co_instruction_inquiry',
        recommendedApproachId: 'team_coteaching',
      };
    }

    let subjRatio = approach.defaultBalance.subject;
    let libRatio = approach.defaultBalance.librarian;
    if (roleMode === 'reading_feedback_coach' && subjRatio === 50) {
      subjRatio = 55;
      libRatio = 45;
    }
    const diff = Math.abs(subjRatio - libRatio);
    const parityIndex = Math.max(0, 100 - diff * 2);

    const coopLevel =
      state.scheduleModel === 'autonomous_creative'
        ? COOPERATION_LEVELS.level5_transdisciplinary
        : roleMode === 'co_instruction_inquiry'
          ? COOPERATION_LEVELS.level4_co_teaching
          : COOPERATION_LEVELS.level3_instruction_support;

    return {
      isValid: true,
      cooperationLevel: coopLevel,
      balanceScore: {
        subjectTeacherRatio: subjRatio,
        librarianTeacherRatio: libRatio,
        parityIndex,
      },
      warningMessage: null,
      suggestedRoles: [
        'KDC 서가 탐색 전략 및 정보 판별(CRAAP) 공동 지도',
        '모둠별 독서 전략 비계(Scaffolding) 및 출처 표기 피드백',
      ],
      recommendedRoleMode: roleMode,
      recommendedApproachId: approachId,
    };
  }

  /* =====================================================================
   *  핵심 로직 3: 낙인효과 방지 가드 (Anti-Stigma Guard)
   *  detectStigmaRisk(state)
   * ===================================================================== */
  function detectStigmaRisk(state) {
    const isCoopTrack = (state.track || 'A') === 'A';
    const includeSupport = Boolean(state.supportSlowLearners);
    const deliveryMode = state.supportDeliveryMode || 'station_rotation';

    if (isCoopTrack && includeSupport && deliveryMode === 'pull_out') {
      return {
        hasRisk: true,
        riskLevel: 'high',
        warningMessage:
          "학생의 심리적 위축(낙인감)을 예방하기 위해, 학급을 2개 조로 나누어 지도하는 '병렬·스테이션 수업'이나 모둠 순회 지도를 권장합니다.",
        recommendedApproachId: 'parallel_station',
        recommendedDeliveryMode: 'station_rotation',
        alternativeGuidance:
          '특정 학생을 별도로 분리하지 않고 학급 전체를 2개 스테이션(교과 개념 코너 / 도서관 다층 자료 코너)으로 나누어 순환 지도하면, 모든 학생이 위축감 없이 맞춤형 독서 비계를 지원받을 수 있습니다.',
      };
    }

    return {
      hasRisk: false,
      riskLevel: 'none',
      warningMessage: null,
      recommendedApproachId: state.coTeachingApproach || 'parallel_station',
      recommendedDeliveryMode: deliveryMode === 'pull_out' ? 'station_rotation' : deliveryMode,
      alternativeGuidance: includeSupport
        ? '학급 전체 모둠 순회 지도 및 다층 수준별 읽기 자료(그림책·쉬운 설명문·핵심 어휘 카드) 제공으로 심리적 위축 없는 맞춤형 지원이 적용되었습니다.'
        : '전체 학생 대상 핵심 어휘 사전과 단계별 발문 비계(Scaffolding)가 기본 제공됩니다.',
    };
  }

  /* =====================================================================
   *  핵심 로직 4: 위저드 4단계 상태 검증 파이프라인
   *  validateTranslationStep(targetStep, state, kb)
   * ===================================================================== */
  function validateTranslationStep(targetStep, state, kb) {
    const step = Math.min(4, Math.max(1, +targetStep || 1));
    const autoResolvedNotes = [];
    const bound = bindEntitiesForCurriculum(kb, state);

    // Step 1 → 2: 도서관 협력 탐구 과제 및 성취기준 기본 바인딩 점검
    if (step >= 2 && state.track === 'A') {
      if (!state.infoActivities || !state.infoActivities.length) {
        state.infoActivities = bound.recommendedInfoActivities.map(a => a.id);
      }
      if (!state.picratCode) {
        state.picratCode = bound.picratRecommendation.code;
      }
    }

    // Step 2 → 3: 협력수업 형태 및 시간표 기본값 보장
    if (step >= 3 && state.track === 'A') {
      if (!state.coTeachingApproach) {
        state.coTeachingApproach = bound.recommendedApproach.id;
      }
      if (!state.scheduleModel) {
        state.scheduleModel = bound.recommendedSchedule.id;
      }
      if (!state.librarianRoleMode) {
        state.librarianRoleMode = 'co_instruction_inquiry';
      }
    }

    const roleParityGuard = validateRoleParity(state);
    const antiStigmaGuard = detectStigmaRisk(state);

    // Step 4로 이동할 때 역할 편중이나 낙인 위험이 감지되면 인터셉터 모달 요청
    const requiresTeacherConfirmation =
      step === 4 && state.track === 'A' && (!roleParityGuard.isValid || antiStigmaGuard.hasRisk);

    return {
      step,
      passed: !requiresTeacherConfirmation,
      autoResolvedNotes,
      boundResource: bound,
      roleParityGuard,
      antiStigmaGuard,
      requiresTeacherConfirmation,
    };
  }

  /* =====================================================================
   *  핵심 로직 5: 통합 지도안 패키징 엔진
   *  punctualizeLessonPlan(formData, kb, basePlan, readingText)
   * ===================================================================== */
  function punctualizeLessonPlan(formData, kb, basePlan, readingText) {
    if (!basePlan) return basePlan;
    const bound = bindEntitiesForCurriculum(kb, formData);
    const parity = validateRoleParity(formData);
    const stigma = detectStigmaRisk(formData);

    const pickedActIds =
      Array.isArray(formData.infoActivities) && formData.infoActivities.length
        ? formData.infoActivities
        : bound.recommendedInfoActivities.map(a => a.id);
    const infoActivities = pickedActIds
      .map(id => INFO_ACTIVITIES_8[id])
      .filter(Boolean);
    if (!infoActivities.length) {
      infoActivities.push(INFO_ACTIVITIES_8.info_search, INFO_ACTIVITIES_8.info_analysis);
    }

    const approachId = formData.coTeachingApproach || bound.recommendedApproach.id;
    const coTeachingApproach = CO_TEACHING_APPROACHES[approachId] || CO_TEACHING_APPROACHES.team_coteaching;

    const scheduleId = formData.scheduleModel || bound.recommendedSchedule.id;
    const scheduleModel = SCHEDULE_MODELS[scheduleId] || SCHEDULE_MODELS.fixed_40;

    const picratCode = formData.picratCode || bound.picratRecommendation.code;
    const picratIntegration = PICRAT_MATRIX[picratCode] || PICRAT_MATRIX.IA;

    const kdcCodes = (basePlan.kdcRecommendations || []).map(k => `KDC ${k.code}(${k.name})`).join(', ') || 'KDC 주제 서가';
    const actLabels = infoActivities.map(a => a.label).join(' · ');

    const subjectTeacherRoles = [
      `${basePlan.subjectShort || '교과'} 성취기준(${basePlan.subjectStandard ? basePlan.subjectStandard.code : ''}) 핵심 개념(${(basePlan.conceptualFrame ? basePlan.conceptualFrame.macroConcepts : []).join('·')}) 도입 및 탐구 발문`,
      coTeachingApproach.subjectTeacherRole,
      `일반화 문장 도출 및 실생활 적용·과정중심 평가 피드백`,
    ];

    const librarianTeacherRoles =
      formData.librarianRoleMode === 'material_prep_only'
        ? [
            `단원 연계 주제 도서 꾸러미(${kdcCodes}) 사전 비치 및 대출 지원`,
          ]
        : [
            `『2022 도서관과 정보생활』(${basePlan.libraryStandard ? basePlan.libraryStandard.code : ''}) 연계 【${actLabels}】 전략 지도`,
            coTeachingApproach.librarianTeacherRole,
            `정보원 신뢰성(CRAAP) 판별 코칭 및 저작권·표준 출처 표기 지도`,
          ];

    const inclusiveSupportPlan = {
      enabled: Boolean(formData.supportSlowLearners),
      deliveryMode: formData.supportDeliveryMode || 'station_rotation',
      modeLabel: formData.supportSlowLearners
        ? (formData.supportDeliveryMode === 'pull_out'
            ? '개별 보충 지원 (※ 병렬·스테이션 모둠 순회 권장)'
            : formData.supportDeliveryMode === 'universal_scaffold'
              ? '전체 모둠 다층 수준별 읽기 자료(그림책·어휘 카드) 보편적 제공'
              : '학급 2개 조 병렬·스테이션 및 모둠 순회 맞춤형 지도 (위축 예방)')
        : '보편적 학습 설계(UDL) 기반 핵심 어휘 사전 및 단계별 발문 비계 제공',
      scaffoldingNote: stigma.alternativeGuidance,
    };

    // Track A(협력수업)일 때 선택된 시간표 모델(40분 vs 80분 등), 협력수업 형태(병렬·스테이션 등), 정보활동, 디지털 도구, 맞춤형 비계를 타임라인에 반영
    let updatedTimeline = Array.isArray(basePlan.timeline) ? [...basePlan.timeline] : [];
    if (basePlan.track === 'A' && updatedTimeline.length === 4 && !basePlan.isAiGenerated) {
      const [m1, m2, m3, m4] = scheduleModel.phaseMinutes;
      const primaryAct = infoActivities[0] || INFO_ACTIVITIES_8.info_search;
      const secondaryAct = infoActivities[1] || primaryAct;
      const toolName = picratIntegration.toolExamples[0] || '공유 활동 보드';

      updatedTimeline = updatedTimeline.map((row, idx) => {
        const cloned = {
          ...row,
          subjectTeacher: [...(row.subjectTeacher || [])],
          librarianTeacher: [...(row.librarianTeacher || [])],
          studentActivity: [...(row.studentActivity || [])],
          materials: [...(row.materials || [])],
        };

        if (idx === 0) {
          cloned.time = `${m1}분`;
          cloned.subPhase = `관계맺기 · 도서관 탐구과제(${primaryAct.label}) 정의`;
        } else if (idx === 1) {
          cloned.time = `${m2}분`;
          cloned.subPhase = `조사하기 · 【${primaryAct.label}】 및 정보 탐색`;
          if (approachId === 'parallel_station') {
            cloned.subjectTeacher.push(`• [스테이션 A 운영] 1조 모둠과 함께 읽기 지문의 교과 핵심 개념과 사실 근거를 먼저 분석한다.`);
            cloned.librarianTeacher.push(`• [스테이션 B 운영] 2조 모둠과 함께 KDC 서가 탐색 및 다층 수준별 도서(그림책·지식도서)에서 핵심 정보를 찾는다.`);
          } else if (approachId === 'strategy_supplement') {
            cloned.librarianTeacher.push(`• [독서전략 보충] 모둠을 순회하며 핵심 어휘 디딤돌 카드와 밑줄 긋기·요약 비계를 지원한다.`);
          }
          if (formData.supportSlowLearners && formData.supportDeliveryMode !== 'pull_out') {
            cloned.librarianTeacher.push(`• [맞춤 배려] 모든 모둠에 시각 자료·그림책이 포함된 다층 도서 꾸러미를 자연스럽게 제공하여 독해 부담을 덜어 준다.`);
          }
        } else if (idx === 2) {
          cloned.time = `${m3}분`;
          cloned.subPhase = `조직하기 · 【${secondaryAct.label}】 및 개념 구조화`;
          cloned.librarianTeacher.push(`• [도구·정보통합] ${toolName}(${picratIntegration.surfaceLabel})을 활용하여 모둠별 근거와 출처를 한눈에 종합하도록 돕는다.`);
          if (approachId === 'parallel_station') {
            cloned.studentActivity.push(`• 스테이션 A·B 역할을 교대하여 모든 모둠이 서가 탐색과 개념 구조화를 균형 있게 완성한다.`);
          }
          if (!cloned.materials.includes(toolName)) {
            cloned.materials.push(toolName);
          }
        } else if (idx === 3) {
          cloned.time = `${m4}분`;
          cloned.subPhase = `일반화 · 출처 점검 및 배움 성찰`;
        }
        return cloned;
      });
    }

    const updatedModelName =
      basePlan.track === 'A'
        ? `${coTeachingApproach.label} × 도서관 탐구(${actLabels}) 통합 모형 (${scheduleModel.label})`
        : basePlan.modelName;

    return {
      ...basePlan,
      modelName: updatedModelName,
      duration: basePlan.track === 'A' ? scheduleModel.durationText : basePlan.duration,
      timeline: updatedTimeline,
      cooperationDesignMeta: {
        cooperationLevel: parity.cooperationLevel,
        infoActivities,
        coTeachingApproach,
        scheduleModel,
        picratIntegration,
        mutualBenefitSummary: bound.mutualBenefitSummary,
        roleBalance: {
          subjectTeacherRatio: parity.balanceScore.subjectTeacherRatio,
          librarianTeacherRatio: parity.balanceScore.librarianTeacherRatio,
          parityIndex: parity.balanceScore.parityIndex,
          subjectTeacherRoles,
          librarianTeacherRoles,
        },
        inclusiveSupportPlan,
        quickConsultationChecklist: {
          preLesson3Min: [
            `[성취기준 연계] ${basePlan.subjectShort} ${basePlan.subjectStandard ? basePlan.subjectStandard.code : ''} × 도서관과 정보생활 ${basePlan.libraryStandard ? basePlan.libraryStandard.code : ''} 핵심 탐구 질문 합의`,
            `[역할 분담 확정] '${coTeachingApproach.label}' 방식으로 교과교사(${parity.balanceScore.subjectTeacherRatio}%)·사서교사(${parity.balanceScore.librarianTeacherRatio}%) 진행 구간 확인`,
            `[자료·도구 준비] ${kdcCodes} 도서 꾸러미, 다층 수준별 읽기 자료 및 ${picratIntegration.toolExamples[0] || '활동지'} 점검`,
          ],
          postLesson2Min: [
            `[배움 목표 도달] 학생들의 일반화 문장 도출 수준 및 표준 출처 표기 정확도 함께 확인`,
            `[후속 연계 기록] 모둠 순회 중 발견한 우수 탐구 사례 및 다음 차시 독서·보충 지원 메모`,
          ],
        },
      },
    };
  }

  global.CooperationEngine = {
    COOPERATION_LEVELS,
    INFO_ACTIVITIES_8,
    CO_TEACHING_APPROACHES,
    SCHEDULE_MODELS,
    PICRAT_MATRIX,
    LIBRARIAN_ROLE_MODES,
    SUPPORT_DELIVERY_MODES,
    bindEntitiesForCurriculum,
    validateRoleParity,
    detectStigmaRisk,
    validateTranslationStep,
    punctualizeLessonPlan,
  };
})(window);
