// 자동 생성 파일입니다. 직접 수정하지 말고 build-data.ps1 을 실행하세요.
// 생성 시각: 2026-10-23 22:33:09
window.TTL_SOURCES = {
  "instruction_strategy.ttl": "@prefix ex:   <http://example.org/instruction-strategy#> .\n@prefix read: <http://example.org/reading#> .\n@prefix pisa: <http://example.org/pisa#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:CurriculumInstructionStrategyOntology a owl:Ontology ;\n    dc:title \"교과 기능 및 정보 장르 연계 수업전략 온톨로지\"@ko ;\n    dc:description \"교과 교육과정의 과정·기능어와 정보 장르, 대상 학년, 정보활용교육 단계를 연결한 수업전략 온톨로지\"@ko .\n\n# --- Classes ---\nex:InstructionalStrategy a owl:Class ; rdfs:label \"수업 전략\"@ko .\nex:CurriculumSkillVerb a owl:Class ; rdfs:label \"교과 기능 동사\"@ko .\nex:InformationGenre a owl:Class ; rdfs:label \"정보 장르\"@ko .\n\n# --- Properties ---\nex:hasSkillVerb a owl:ObjectProperty ;\n    rdfs:domain ex:InstructionalStrategy ;\n    rdfs:range ex:CurriculumSkillVerb ;\n    rdfs:label \"연결 기능어\"@ko .\n\nex:hasGenre a owl:ObjectProperty ;\n    rdfs:domain ex:InstructionalStrategy ;\n    rdfs:range ex:InformationGenre ;\n    rdfs:label \"적합 정보 장르\"@ko .\n\nex:targetSchoolLevel a owl:DatatypeProperty ;\n    rdfs:domain ex:InstructionalStrategy ;\n    rdfs:range xsd:string ;\n    rdfs:label \"대상 학년군\"@ko .\n\nex:infoLiteracyStage a owl:DatatypeProperty ;\n    rdfs:domain ex:InstructionalStrategy ;\n    rdfs:range xsd:string ;\n    rdfs:label \"정보활용교육 단계\"@ko .\n\nex:strategyDescription a owl:DatatypeProperty ;\n    rdfs:domain ex:InstructionalStrategy ;\n    rdfs:range xsd:string ;\n    rdfs:label \"전략 설명\"@ko .\n\n# --- Instances: Verbs (41개 기능어) ---\nex:Verb_감상하기 a ex:CurriculumSkillVerb ; rdfs:label \"감상하기\"@ko .\nex:Verb_계획하기 a ex:CurriculumSkillVerb ; rdfs:label \"계획하기\"@ko .\nex:Verb_고려하기 a ex:CurriculumSkillVerb ; rdfs:label \"고려하기\"@ko .\nex:Verb_공유하기 a ex:CurriculumSkillVerb ; rdfs:label \"공유하기\"@ko .\nex:Verb_관련짓기 a ex:CurriculumSkillVerb ; rdfs:label \"관련짓기\"@ko .\nex:Verb_교환하기 a ex:CurriculumSkillVerb ; rdfs:label \"교환하기\"@ko .\nex:Verb_구별하기 a ex:CurriculumSkillVerb ; rdfs:label \"구별하기\"@ko .\nex:Verb_구성하기 a ex:CurriculumSkillVerb ; rdfs:label \"구성하기\"@ko .\nex:Verb_말하기 a ex:CurriculumSkillVerb ; rdfs:label \"말하기\"@ko .\nex:Verb_분류하기 a ex:CurriculumSkillVerb ; rdfs:label \"분류하기\"@ko .\nex:Verb_분석하기 a ex:CurriculumSkillVerb ; rdfs:label \"분석하기\"@ko .\nex:Verb_비교하기 a ex:CurriculumSkillVerb ; rdfs:label \"비교하기\"@ko .\nex:Verb_생각하기 a ex:CurriculumSkillVerb ; rdfs:label \"생각하기\"@ko .\nex:Verb_생성하기 a ex:CurriculumSkillVerb ; rdfs:label \"생성하기\"@ko .\nex:Verb_선별하기 a ex:CurriculumSkillVerb ; rdfs:label \"선별하기\"@ko .\nex:Verb_설명하기 a ex:CurriculumSkillVerb ; rdfs:label \"설명하기\"@ko .\nex:Verb_소통하기 a ex:CurriculumSkillVerb ; rdfs:label \"소통하기\"@ko .\nex:Verb_수집하기 a ex:CurriculumSkillVerb ; rdfs:label \"수집하기\"@ko .\nex:Verb_식별하기 a ex:CurriculumSkillVerb ; rdfs:label \"식별하기\"@ko .\nex:Verb_연결하기 a ex:CurriculumSkillVerb ; rdfs:label \"연결하기\"@ko .\nex:Verb_예측하기 a ex:CurriculumSkillVerb ; rdfs:label \"예측하기\"@ko .\nex:Verb_요약하기 a ex:CurriculumSkillVerb ; rdfs:label \"요약하기\"@ko .\nex:Verb_이해하기 a ex:CurriculumSkillVerb ; rdfs:label \"이해하기\"@ko .\nex:Verb_읽기 a ex:CurriculumSkillVerb ; rdfs:label \"읽기\"@ko .\nex:Verb_전달하기 a ex:CurriculumSkillVerb ; rdfs:label \"전달하기\"@ko .\nex:Verb_정리하기 a ex:CurriculumSkillVerb ; rdfs:label \"정리하기\"@ko .\nex:Verb_제시하기 a ex:CurriculumSkillVerb ; rdfs:label \"제시하기\"@ko .\nex:Verb_제작하기 a ex:CurriculumSkillVerb ; rdfs:label \"제작하기\"@ko .\nex:Verb_조사하기 a ex:CurriculumSkillVerb ; rdfs:label \"조사하기\"@ko .\nex:Verb_조정하기 a ex:CurriculumSkillVerb ; rdfs:label \"조정하기\"@ko .\nex:Verb_조직하기 a ex:CurriculumSkillVerb ; rdfs:label \"조직하기\"@ko .\nex:Verb_주장하기 a ex:CurriculumSkillVerb ; rdfs:label \"주장하기\"@ko .\nex:Verb_질문하기 a ex:CurriculumSkillVerb ; rdfs:label \"질문하기\"@ko .\nex:Verb_참여하기 a ex:CurriculumSkillVerb ; rdfs:label \"참여하기\"@ko .\nex:Verb_추론하기 a ex:CurriculumSkillVerb ; rdfs:label \"추론하기\"@ko .\nex:Verb_탐색하기 a ex:CurriculumSkillVerb ; rdfs:label \"탐색하기\"@ko .\nex:Verb_토론하기 a ex:CurriculumSkillVerb ; rdfs:label \"토론하기\"@ko .\nex:Verb_파악하기 a ex:CurriculumSkillVerb ; rdfs:label \"파악하기\"@ko .\nex:Verb_평가하기 a ex:CurriculumSkillVerb ; rdfs:label \"평가하기\"@ko .\nex:Verb_표현하기 a ex:CurriculumSkillVerb ; rdfs:label \"표현하기\"@ko .\nex:Verb_해결하기 a ex:CurriculumSkillVerb ; rdfs:label \"해결하기\"@ko .\n\n# --- Instances: Information Genres ---\nex:Genre_논픽션 a ex:InformationGenre ; rdfs:label \"논픽션\"@ko .\nex:Genre_논픽션_원인_결과 a ex:InformationGenre ; rdfs:label \"논픽션(원인-결과)\"@ko .\nex:Genre_논픽션_비교_대조 a ex:InformationGenre ; rdfs:label \"논픽션(비교-대조)\"@ko .\nex:Genre_논픽션_설명문 a ex:InformationGenre ; rdfs:label \"논픽션(설명문)\"@ko .\nex:Genre_논픽션_주장_근거 a ex:InformationGenre ; rdfs:label \"논픽션(주장-근거)\"@ko .\nex:Genre_픽션 a ex:InformationGenre ; rdfs:label \"픽션\"@ko .\nex:Genre_픽션_단편 a ex:InformationGenre ; rdfs:label \"픽션(단편)\"@ko .\n\n# --- Instances: Instructional Strategies (29개 수업 전략) ---\n\nex:Strat_KWLS a ex:InstructionalStrategy ;\n    rdfs:label \"KWLS\"@ko ;\n    ex:strategyDescription \"KWL에 S(Still wondering) 추가해 '아직 궁금한 것' 을 기록\"@ko ;\n    ex:targetSchoolLevel \"전학년\"@ko ;\n    ex:infoLiteracyStage \"1.0\"@ko ;\n    ex:hasSkillVerb ex:Verb_예측하기, ex:Verb_질문하기, ex:Verb_탐색하기 ;\n    ex:hasGenre ex:Genre_논픽션_주장_근거 .\n\nex:Strat_SQ3R a ex:InstructionalStrategy ;\n    rdfs:label \"SQ3R\"@ko ;\n    ex:strategyDescription \"Survey-Question-Read-Recite-Review 5단계로 읽기 전·중·후 활동 구조화\"@ko ;\n    ex:targetSchoolLevel \"고\"@ko ;\n    ex:infoLiteracyStage \"1.0\"@ko ;\n    ex:hasSkillVerb ex:Verb_읽기, ex:Verb_파악하기, ex:Verb_질문하기, ex:Verb_요약하기 ;\n    ex:hasGenre ex:Genre_논픽션_주장_근거 .\n\nex:Strat_그래픽_조직자 a ex:InstructionalStrategy ;\n    rdfs:label \"그래픽 조직자\"@ko ;\n    ex:strategyDescription \"순서·비교·인과 등 정보 유형별 도표 활용\"@ko ;\n    ex:targetSchoolLevel \"전학년\"@ko ;\n    ex:infoLiteracyStage \"1.0\"@ko ;\n    ex:hasSkillVerb ex:Verb_정리하기, ex:Verb_분류하기, ex:Verb_조직하기, ex:Verb_조사하기 ;\n    ex:hasGenre ex:Genre_논픽션_원인_결과, ex:Genre_논픽션_비교_대조 .\n\nex:Strat_벤다이어그램 a ex:InstructionalStrategy ;\n    rdfs:label \"벤다이어그램\"@ko ;\n    ex:strategyDescription \"중첩 원으로 두 개념 공통점·차이점 시각화\"@ko ;\n    ex:targetSchoolLevel \"전학년\"@ko ;\n    ex:infoLiteracyStage \"1.0\"@ko ;\n    ex:hasSkillVerb ex:Verb_비교하기, ex:Verb_구별하기, ex:Verb_분류하기 ;\n    ex:hasGenre ex:Genre_논픽션_비교_대조 .\n\nex:Strat_사슬_그리기 a ex:InstructionalStrategy ;\n    rdfs:label \"사슬 그리기\"@ko ;\n    ex:strategyDescription \"사건의 인과를 연속 고리로 시각화\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:infoLiteracyStage \"1.0\"@ko ;\n    ex:hasSkillVerb ex:Verb_연결하기, ex:Verb_이해하기, ex:Verb_파악하기 ;\n    ex:hasGenre ex:Genre_논픽션_원인_결과 .\n\nex:Strat_생각_그물망 a ex:InstructionalStrategy ;\n    rdfs:label \"생각 그물망\"@ko ;\n    ex:strategyDescription \"알고 있는 개념과 새 정보를 선으로 연결해 개념 관계 시각화\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:infoLiteracyStage \"1.0\"@ko ;\n    ex:hasSkillVerb ex:Verb_연결하기, ex:Verb_추론하기, ex:Verb_조직하기, ex:Verb_조사하기 ;\n    ex:hasGenre ex:Genre_논픽션_비교_대조, ex:Genre_논픽션_원인_결과 .\n\nex:Strat_라면_대화 a ex:InstructionalStrategy ;\n    rdfs:label \"라면 대화\"@ko ;\n    ex:strategyDescription \"‘만약~라면?’ 가정으로 사고 확장\"@ko ;\n    ex:targetSchoolLevel \"전학년\"@ko ;\n    ex:infoLiteracyStage \"2.0\"@ko ;\n    ex:hasSkillVerb ex:Verb_생각하기, ex:Verb_추론하기, ex:Verb_토론하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_4칸_문제해결 a ex:InstructionalStrategy ;\n    rdfs:label \"4칸 문제해결\"@ko ;\n    ex:strategyDescription \"문제–조건–풀이–해결을 4개면에 정리\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_해결하기, ex:Verb_조직하기, ex:Verb_설명하기 ;\n    ex:hasGenre ex:Genre_논픽션_원인_결과 .\n\nex:Strat_PMI a ex:InstructionalStrategy ;\n    rdfs:label \"PMI\"@ko ;\n    ex:strategyDescription \"Plus/Minus/Interesting 관점으로 제안 평가\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_평가하기, ex:Verb_고려하기, ex:Verb_분석하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_Y차트_확장 a ex:InstructionalStrategy ;\n    rdfs:label \"Y차트 확장\"@ko ;\n    ex:strategyDescription \"보이는/느끼는/상상하는 칸에 작성 후 아이디어 연결 및 질문 추가\"@ko ;\n    ex:targetSchoolLevel \"저·중\"@ko ;\n    ex:hasSkillVerb ex:Verb_감상하기, ex:Verb_분석하기, ex:Verb_표현하기 ;\n    ex:hasGenre ex:Genre_픽션, ex:Genre_논픽션_비교_대조 .\n\nex:Strat_네모퉁이_토론 a ex:InstructionalStrategy ;\n    rdfs:label \"네모퉁이 토론\"@ko ;\n    ex:strategyDescription \"4입장 위치 선정 후 근거 토의\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_비교하기, ex:Verb_조정하기, ex:Verb_주장하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_띵페세_Think_Pair_Share a ex:InstructionalStrategy ;\n    rdfs:label \"띵페세(Think-Pair-Share)\"@ko ;\n    ex:strategyDescription \"개별 사고→짝 토의→전체 공유 3단계\"@ko ;\n    ex:targetSchoolLevel \"전학년\"@ko ;\n    ex:infoLiteracyStage \"1.0\"@ko ;\n    ex:hasSkillVerb ex:Verb_말하기, ex:Verb_소통하기, ex:Verb_공유하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_말풍선_설명 a ex:InstructionalStrategy ;\n    rdfs:label \"말풍선 설명\"@ko ;\n    ex:strategyDescription \"말풍선으로 설명 이어붙여 작성하거나 다른의견 제시\"@ko ;\n    ex:targetSchoolLevel \"저·중\"@ko ;\n    ex:hasSkillVerb ex:Verb_표현하기, ex:Verb_설명하기, ex:Verb_생각하기 ;\n    ex:hasGenre ex:Genre_픽션 .\n\nex:Strat_미니북_제작 a ex:InstructionalStrategy ;\n    rdfs:label \"미니북 제작\"@ko ;\n    ex:strategyDescription \"A4 한 장 접어 만든 8p 소책자 제작\"@ko ;\n    ex:targetSchoolLevel \"저·중\"@ko ;\n    ex:hasSkillVerb ex:Verb_제작하기, ex:Verb_구성하기, ex:Verb_표현하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_브레인라이팅_6_3_5 a ex:InstructionalStrategy ;\n    rdfs:label \"브레인라이팅 (6-3-5)\"@ko ;\n    ex:strategyDescription \"6명·3아이디어·5분 릴레이 작성\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_생성하기, ex:Verb_연결하기, ex:Verb_공유하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_스케치_노트 a ex:InstructionalStrategy ;\n    rdfs:label \"스케치 노트\"@ko ;\n    ex:strategyDescription \"그림+텍스트로 핵심 정보 시각 요약\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_표현하기, ex:Verb_요약하기, ex:Verb_정리하기, ex:Verb_조사하기 ;\n    ex:hasGenre ex:Genre_픽션, ex:Genre_논픽션_설명문 .\n\nex:Strat_아하_대화 a ex:InstructionalStrategy ;\n    rdfs:label \"아하 대화\"@ko ;\n    ex:strategyDescription \"아하!라고 답하며 설명듣기\"@ko ;\n    ex:targetSchoolLevel \"전학년\"@ko ;\n    ex:infoLiteracyStage \"1.0\"@ko ;\n    ex:hasSkillVerb ex:Verb_소통하기, ex:Verb_조정하기, ex:Verb_참여하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_월드카페 a ex:InstructionalStrategy ;\n    rdfs:label \"월드카페\"@ko ;\n    ex:strategyDescription \"테이블 순환 대화로 아이디어 확산\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_교환하기, ex:Verb_조정하기, ex:Verb_참여하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_의견벽 a ex:InstructionalStrategy ;\n    rdfs:label \"의견벽\"@ko ;\n    ex:strategyDescription \"포스트잇 등등으로 의견 수렴 후 분류\"@ko ;\n    ex:targetSchoolLevel \"전학년\"@ko ;\n    ex:hasSkillVerb ex:Verb_공유하기, ex:Verb_분류하기, ex:Verb_관련짓기 ;\n    ex:hasGenre ex:Genre_논픽션_비교_대조 .\n\nex:Strat_이야기별_그리기 a ex:InstructionalStrategy ;\n    rdfs:label \"이야기별 그리기\"@ko ;\n    ex:strategyDescription \"이야기나 관찰 내용을 읽고 이해한 후, 사건의 흐름을 재구성함\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_이해하기, ex:Verb_표현하기, ex:Verb_추론하기, ex:Verb_분석하기, ex:Verb_정리하기 ;\n    ex:hasGenre ex:Genre_픽션 .\n\nex:Strat_정보_스케치 a ex:InstructionalStrategy ;\n    rdfs:label \"정보 스케치\"@ko ;\n    ex:strategyDescription \"키워드·아이콘 자유 배치로 정보 구조 시각화\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_표현하기, ex:Verb_조직하기, ex:Verb_정리하기, ex:Verb_조사하기 ;\n    ex:hasGenre ex:Genre_논픽션_비교_대조 .\n\nex:Strat_정보_장바구니 a ex:InstructionalStrategy ;\n    rdfs:label \"정보 장바구니\"@ko ;\n    ex:strategyDescription \"시각적 공간에 자료를 수집·분류\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_수집하기, ex:Verb_분류하기, ex:Verb_선별하기 ;\n    ex:hasGenre ex:Genre_논픽션_주장_근거 .\n\nex:Strat_질문_그물망 a ex:InstructionalStrategy ;\n    rdfs:label \"질문 그물망\"@ko ;\n    ex:strategyDescription \"중심 질문에서 파생 질문을 그물 형태로 확장\"@ko ;\n    ex:targetSchoolLevel \"전학년\"@ko ;\n    ex:hasSkillVerb ex:Verb_질문하기, ex:Verb_생성하기, ex:Verb_탐색하기 ;\n    ex:hasGenre ex:Genre_논픽션_주장_근거 .\n\nex:Strat_질문_해부_전략 a ex:InstructionalStrategy ;\n    rdfs:label \"질문 해부 전략\"@ko ;\n    ex:strategyDescription \"누가?·왜?,어떻게? 등으로 질문 세분화[5W1H]\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_질문하기, ex:Verb_분석하기 ;\n    ex:hasGenre ex:Genre_논픽션 .\n\nex:Strat_출처_추적 a ex:InstructionalStrategy ;\n    rdfs:label \"출처 추적\"@ko ;\n    ex:strategyDescription \"정보출처를 시각화하여 정보의 신뢰성 판단\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_조사하기, ex:Verb_분석하기, ex:Verb_정리하기, ex:Verb_평가하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_토큰_대화 a ex:InstructionalStrategy ;\n    rdfs:label \"토큰 대화\"@ko ;\n    ex:strategyDescription \"토큰을 가지고 타인과 대화를 진행\"@ko ;\n    ex:targetSchoolLevel \"전학년\"@ko ;\n    ex:hasSkillVerb ex:Verb_소통하기, ex:Verb_공유하기, ex:Verb_설명하기 ;\n    ex:hasGenre ex:Genre_논픽션, ex:Genre_픽션 .\n\nex:Strat_프레이어_모델 a ex:InstructionalStrategy ;\n    rdfs:label \"프레이어 모델\"@ko ;\n    ex:strategyDescription \"핵심개념을 바탕으로 4개면에 정의, 속성, 해당사례, 해당하지 않는 것을 기재\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_분류하기, ex:Verb_식별하기, ex:Verb_이해하기 ;\n    ex:hasGenre ex:Genre_논픽션_비교_대조 .\n\nex:Strat_프로젝트_보드 a ex:InstructionalStrategy ;\n    rdfs:label \"프로젝트 보드\"@ko ;\n    ex:strategyDescription \"단계별 과정 사진·메모를 스티커에 기록해 게시\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_정리하기, ex:Verb_계획하기, ex:Verb_공유하기 ;\n    ex:hasGenre ex:Genre_논픽션_설명문 .\n\nex:Strat_핵심_한_장_카드 a ex:InstructionalStrategy ;\n    rdfs:label \"핵심 한 장 카드\"@ko ;\n    ex:strategyDescription \"중요 개념을 카드 한 장에 요약 전시·교환\"@ko ;\n    ex:targetSchoolLevel \"중·고\"@ko ;\n    ex:hasSkillVerb ex:Verb_제시하기, ex:Verb_설명하기, ex:Verb_전달하기 ;\n    ex:hasGenre ex:Genre_픽션_단편, ex:Genre_논픽션_설명문 .",
  "library_information_life_2022.ttl": "@prefix lil:   <http://example.org/curriculum/library-info-life#> .\n@prefix curr:  <http://example.org/curriculum/core#> .\n@prefix inq:   <http://example.org/concept-inquiry#> .\n@prefix strat: <http://example.org/strategy#> .\n@prefix info:  <http://example.org/infolit#> .\n@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:   <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:   <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:    <http://purl.org/dc/elements/1.1/> .\n\n# =================================================================\n# 온톨로지 메타데이터 정의\n# =================================================================\nlil:LibraryAndInformationLifeCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 도서관과 정보생활 교육과정(초등학교) 내용 체계 및 성취기준 온톨로지\"@ko ;\n    rdfs:label \"도서관과 정보생활 온톨로지\"@ko ;\n    dc:description \"2022 개정 도서관과 정보생활 교육과정 초등학교(1-2, 3-4, 5-6학년군)의 4대 핵심 영역, 핵심 아이디어, 3대 내용 범주(지식·이해, 과정·기능, 가치·태도) 및 전 성취기준을 정형화한 RDF/OWL 온톨로지\"@ko .\n\n# =================================================================\n# 1. RDFS / OWL 클래스 모델링\n# =================================================================\nlil:Subject a owl:Class ; rdfs:label \"교과\"@ko .\nlil:GradeBand a owl:Class ; rdfs:label \"학년군\"@ko .\nlil:Area a owl:Class ; rdfs:label \"내용 영역\"@ko .\nlil:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nlil:ContentCategory a owl:Class ; rdfs:label \"내용 범주\"@ko .\n\nlil:KnowledgeUnderstanding a owl:Class ;\n    rdfs:subClassOf lil:ContentCategory ;\n    rdfs:label \"지식·이해\"@ko .\n\nlil:ProcessSkill a owl:Class ;\n    rdfs:subClassOf lil:ContentCategory ;\n    rdfs:label \"과정·기능\"@ko .\n\nlil:ValueAttitude a owl:Class ;\n    rdfs:subClassOf lil:ContentCategory ;\n    rdfs:label \"가치·태도\"@ko .\n\nlil:AchievementStandard a owl:Class ; rdfs:label \"성취기준\"@ko .\nlil:Competency a owl:Class ; rdfs:label \"교과 역량\"@ko .\n\n# =================================================================\n# 2. 오브젝트 및 데이터 속성 정의\n# =================================================================\nlil:hasArea a owl:ObjectProperty ;\n    rdfs:domain lil:Subject ;\n    rdfs:range lil:Area ;\n    rdfs:label \"내용 영역 포함\"@ko .\n\nlil:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain lil:Area ;\n    rdfs:range lil:CoreIdea ;\n    rdfs:label \"핵심 아이디어 보유\"@ko .\n\nlil:hasKnowledgeElement a owl:ObjectProperty ;\n    rdfs:domain lil:Area ;\n    rdfs:range lil:KnowledgeUnderstanding ;\n    rdfs:label \"지식·이해 내용요소\"@ko .\n\nlil:hasSkillElement a owl:ObjectProperty ;\n    rdfs:domain lil:Area ;\n    rdfs:range lil:ProcessSkill ;\n    rdfs:label \"과정·기능 내용요소\"@ko .\n\nlil:hasAttitudeElement a owl:ObjectProperty ;\n    rdfs:domain lil:Area ;\n    rdfs:range lil:ValueAttitude ;\n    rdfs:label \"가치·태도 내용요소\"@ko .\n\nlil:hasAchievementStandard a owl:ObjectProperty ;\n    rdfs:domain lil:Area ;\n    rdfs:range lil:AchievementStandard ;\n    rdfs:label \"관련 성취기준\"@ko .\n\nlil:targetsGradeBand a owl:ObjectProperty ;\n    rdfs:range lil:GradeBand ;\n    rdfs:label \"해당 학년군\"@ko .\n\nlil:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain lil:Subject ;\n    rdfs:range lil:Competency ;\n    rdfs:label \"함양 교과역량\"@ko .\n\nlil:mappedInquiryPhase a owl:ObjectProperty ;\n    rdfs:domain lil:AchievementStandard ;\n    rdfs:label \"개념기반 탐구단계 연계\"@ko .\n\nlil:mappedInfoLiteracyStage a owl:ObjectProperty ;\n    rdfs:domain lil:AchievementStandard ;\n    rdfs:label \"정보활용단계(Big6) 연계\"@ko .\n\nlil:standardCode a owl:DatatypeProperty ;\n    rdfs:domain lil:AchievementStandard ;\n    rdfs:range xsd:string ;\n    rdfs:label \"성취기준 코드\"@ko .\n\nlil:standardDescription a owl:DatatypeProperty ;\n    rdfs:domain lil:AchievementStandard ;\n    rdfs:range xsd:string ;\n    rdfs:label \"성취기준 해설\"@ko .\n\n# =================================================================\n# 3. 교과, 학년군 및 교과 역량\n# =================================================================\nlil:Subject_LibraryInfoLife a lil:Subject ;\n    rdfs:label \"도서관과 정보생활\"@ko ;\n    lil:hasArea lil:Area_InfoAwareness, lil:Area_InfoSeeking, lil:Area_InfoAnalysis, lil:Area_ReadingCulture ;\n    lil:developsCompetency lil:Comp_InfoLiteracy, lil:Comp_ReadingCulture, lil:Comp_CriticalThinking, lil:Comp_DigitalCitizenship .\n\nlil:GradeBand_1_2 a lil:GradeBand ; rdfs:label \"초등학교 1-2학년군\"@ko .\nlil:GradeBand_3_4 a lil:GradeBand ; rdfs:label \"초등학교 3-4학년군\"@ko .\nlil:GradeBand_5_6 a lil:GradeBand ; rdfs:label \"초등학교 5-6학년군\"@ko .\n\nlil:Comp_InfoLiteracy a lil:Competency ; rdfs:label \"정보활용역량\"@ko .\nlil:Comp_ReadingCulture a lil:Competency ; rdfs:label \"독서문화향유역량\"@ko .\nlil:Comp_CriticalThinking a lil:Competency ; rdfs:label \"비판적·창의적사고역량\"@ko .\nlil:Comp_DigitalCitizenship a lil:Competency ; rdfs:label \"디지털시민성역량\"@ko .\n\n# =================================================================\n# 4. 4대 내용 체계(핵심 아이디어, 내용 요소) 모델링\n# =================================================================\n\n# -----------------------------------------------------------------\n# [영역 1] 정보인식과 도서관\n# -----------------------------------------------------------------\nlil:Area_InfoAwareness a lil:Area ;\n    rdfs:label \"정보인식과 도서관\"@ko ;\n    lil:hasCoreIdea lil:CoreIdea_InfoAwareness ;\n    lil:hasKnowledgeElement lil:Know_LibraryRole_12, lil:Know_InfoNeed_34, lil:Know_TaskDefinition_56 ;\n    lil:hasSkillElement lil:Skill_RecognizeNeed, lil:Skill_Questioning ;\n    lil:hasAttitudeElement lil:Value_Curiosity, lil:Value_OpenMind ;\n    lil:hasAchievementStandard lil:Std_2도정01_01, lil:Std_4도정01_01, lil:Std_6도정01_01 .\n\nlil:CoreIdea_InfoAwareness a lil:CoreIdea ;\n    rdfs:label \"정보는 삶의 문제를 해결하고 성장을 돕는 핵심 자원이며, 도서관은 지식 탐구와 평생 배움의 중심 공간이다.\"@ko .\n\n# 지식·이해\nlil:Know_LibraryRole_12 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"학교도서관의 기능과 이용 규칙\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_1_2 .\n\nlil:Know_InfoNeed_34 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"문제 해결을 위한 정보 요구와 탐구 질문의 의미\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\nlil:Know_TaskDefinition_56 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"학습 과제 해결을 위한 정보 탐색 계획과 탐구 설계\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\n# -----------------------------------------------------------------\n# [영역 2] 정보탐색과 도서관\n# -----------------------------------------------------------------\nlil:Area_InfoSeeking a lil:Area ;\n    rdfs:label \"정보탐색과 도서관\"@ko ;\n    lil:hasCoreIdea lil:CoreIdea_InfoSeeking ;\n    lil:hasKnowledgeElement lil:Know_MediaForm_12, lil:Know_ClassificationOPAC_34, lil:Know_DiverseSourceEval_56 ;\n    lil:hasSkillElement lil:Skill_LibrarySearching, lil:Skill_KeywordBoolean, lil:Skill_EvaluateSource ;\n    lil:hasAttitudeElement lil:Value_CriticalAttitude ;\n    lil:hasAchievementStandard lil:Std_2도정02_01, lil:Std_4도정02_01, lil:Std_4도정02_02, lil:Std_6도정02_01, lil:Std_6도정02_02 .\n\nlil:CoreIdea_InfoSeeking a lil:CoreIdea ;\n    rdfs:label \"문제 해결에 적합한 정보를 찾기 위해 다양한 탐색 도구와 분류 체계를 활용하고, 정보원의 신뢰성을 비판적으로 판단한다.\"@ko .\n\n# 지식·이해\nlil:Know_MediaForm_12 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"그림책과 인쇄 자료의 구성 및 특징\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_1_2 .\n\nlil:Know_ClassificationOPAC_34 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"한국십진분류법(KDC), 청구기호, 도서관 검색시스템(OPAC)\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\nlil:Know_DiverseSourceEval_56 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"인쇄·디지털 정보원의 유형, 정보의 신뢰성·정확성·최신성 평가 기준\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\n# -----------------------------------------------------------------\n# [영역 3] 정보분석과 표현\n# -----------------------------------------------------------------\nlil:Area_InfoAnalysis a lil:Area ;\n    rdfs:label \"정보분석과 표현\"@ko ;\n    lil:hasCoreIdea lil:CoreIdea_InfoAnalysis ;\n    lil:hasKnowledgeElement lil:Know_ExpressionForm_12, lil:Know_FactOpinionCopyright_34, lil:Know_SynthesisEthics_56 ;\n    lil:hasSkillElement lil:Skill_ExtractSummarize, lil:Skill_SynthesizeExpress, lil:Skill_CiteCopyright ;\n    lil:hasAttitudeElement lil:Value_Ethics, lil:Value_Responsibility ;\n    lil:hasAchievementStandard lil:Std_4도정03_01, lil:Std_4도정03_02, lil:Std_6도정03_01, lil:Std_6도정03_02, lil:Std_6도정03_03 .\n\nlil:CoreIdea_InfoAnalysis a lil:CoreIdea ;\n    rdfs:label \"수집한 정보를 체계적으로 분석·조직하여 새로운 지식을 구성하고, 윤리적 기준을 준수하며 창의적으로 공유한다.\"@ko .\n\n# 지식·이해\nlil:Know_ExpressionForm_12 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"생각과 느낌을 글과 그림으로 나타내기\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_1_2 .\n\nlil:Know_FactOpinionCopyright_34 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"사실과 의견의 구분, 기본 저작권 및 출처 표기 규칙\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\nlil:Know_SynthesisEthics_56 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"정보의 구조화와 재구성, 디지털 저작권(CCL) 및 정보 공유 윤리\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\n# -----------------------------------------------------------------\n# [영역 4] 독서문화와 평생배움\n# -----------------------------------------------------------------\nlil:Area_ReadingCulture a lil:Area ;\n    rdfs:label \"독서문화와 평생배움\"@ko ;\n    lil:hasCoreIdea lil:CoreIdea_ReadingCulture ;\n    lil:hasKnowledgeElement lil:Know_ReadingHabit_12, lil:Know_ReadingBalance_34, lil:Know_SelfDirectedReading_56 ;\n    lil:hasSkillElement lil:Skill_SelectBook, lil:Skill_RecordReading, lil:Skill_ReflectLearning ;\n    lil:hasAttitudeElement lil:Value_ReadingAppreciation, lil:Value_Collaboration ;\n    lil:hasAchievementStandard lil:Std_2도정04_01, lil:Std_4도정04_01, lil:Std_6도정04_01 .\n\nlil:CoreIdea_ReadingCulture a lil:CoreIdea ;\n    rdfs:label \"다양한 주제와 매체의 책을 즐겨 읽으며 공감과 성찰을 실천하고, 도서관 문화를 향유하며 협력적 배움을 확장한다.\"@ko .\n\n# 지식·이해\nlil:Know_ReadingHabit_12 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"다양한 이야기책 읽기와 책 읽는 즐거움\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_1_2 .\n\nlil:Know_ReadingBalance_34 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"문학 및 지식 도서의 균형 있는 독서와 독서 기록\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\nlil:Know_SelfDirectedReading_56 a lil:KnowledgeUnderstanding ;\n    rdfs:label \"자신의 독서 성향 탐색, 비판적 책 읽기, 평생학습자로서의 성찰\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\n# =================================================================\n# 5. 과정·기능 및 가치·태도 인스턴스 전수\n# =================================================================\nlil:Skill_RecognizeNeed a lil:ProcessSkill ; rdfs:label \"정보 필요 인식하기\"@ko .\nlil:Skill_Questioning a lil:ProcessSkill ; rdfs:label \"탐구 질문 만들기\"@ko .\nlil:Skill_LibrarySearching a lil:ProcessSkill ; rdfs:label \"도서관 자료 탐색하기\"@ko .\nlil:Skill_KeywordBoolean a lil:ProcessSkill ; rdfs:label \"키워드 선정 및 검색식 구성하기\"@ko .\nlil:Skill_EvaluateSource a lil:ProcessSkill ; rdfs:label \"정보원 신뢰성 및 가치 평가하기\"@ko .\nlil:Skill_ExtractSummarize a lil:ProcessSkill ; rdfs:label \"핵심 내용 추출 및 요약하기\"@ko .\nlil:Skill_SynthesizeExpress a lil:ProcessSkill ; rdfs:label \"정보 종합 및 표현물 제작하기\"@ko .\nlil:Skill_CiteCopyright a lil:ProcessSkill ; rdfs:label \"저작권 준수 및 출처 표기하기\"@ko .\nlil:Skill_SelectBook a lil:ProcessSkill ; rdfs:label \"적합한 도서 선별하기\"@ko .\nlil:Skill_RecordReading a lil:ProcessSkill ; rdfs:label \"독서 과정 기록하기\"@ko .\nlil:Skill_ReflectLearning a lil:ProcessSkill ; rdfs:label \"탐구 과정 및 배움 성찰하기\"@ko .\n\nlil:Value_Curiosity a lil:ValueAttitude ; rdfs:label \"지적 호기심과 질문하는 태도\"@ko .\nlil:Value_OpenMind a lil:ValueAttitude ; rdfs:label \"다양한 정보와 관점을 대하는 열린 태도\"@ko .\nlil:Value_CriticalAttitude a lil:ValueAttitude ; rdfs:label \"정보를 비판적으로 수용하는 태도\"@ko .\nlil:Value_Ethics a lil:ValueAttitude ; rdfs:label \"지적 재산 및 타인의 저작권을 존중하는 태도\"@ko .\nlil:Value_Responsibility a lil:ValueAttitude ; rdfs:label \"책임감 있는 정보 생산과 공유 태도\"@ko .\nlil:Value_ReadingAppreciation a lil:ValueAttitude ; rdfs:label \"독서를 자발적으로 즐기고 향유하는 태도\"@ko .\nlil:Value_Collaboration a lil:ValueAttitude ; rdfs:label \"지식 공유와 협력적 배움의 가치를 인정하는 태도\"@ko .\n\n# =================================================================\n# 6. 초등학교 성취기준(전수) 인스턴스\n# =================================================================\n\n# -----------------------------------------------------------------\n# 초등학교 1~2학년군 성취기준\n# -----------------------------------------------------------------\nlil:Std_2도정01_01 a lil:AchievementStandard ;\n    lil:standardCode \"[2도정01-01]\" ;\n    rdfs:label \"학교도서관의 위치와 기본 이용 규칙을 알고 바르게 이용한다.\"@ko ;\n    lil:standardDescription \"학교도서관의 시설, 공간 구성, 자료 대출·반납 방법 및 도서관 예절을 익혀 바르게 실천한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_1_2 .\n\nlil:Std_2도정02_01 a lil:AchievementStandard ;\n    lil:standardCode \"[2도정02-01]\" ;\n    rdfs:label \"그림책과 인쇄 매체의 표지, 그림, 글을 살펴보며 궁금한 점을 찾는다.\"@ko ;\n    lil:standardDescription \"도서 자료의 시각적 요소와 텍스트를 관찰하여 탐색적 호기심을 갖고 질문을 생성한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_1_2 .\n\nlil:Std_2도정04_01 a lil:AchievementStandard ;\n    lil:standardCode \"[2도정04-01]\" ;\n    rdfs:label \"다양한 이야기책을 즐겨 읽고 느낌과 생각을 그림이나 말로 표현한다.\"@ko ;\n    lil:standardDescription \"도서관에 비치된 그림책과 동화책을 읽고 감상을 창의적으로 표현하며 책 읽는 즐거움을 느낀다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_1_2 .\n\n# -----------------------------------------------------------------\n# 초등학교 3~4학년군 성취기준\n# -----------------------------------------------------------------\nlil:Std_4도정01_01 a lil:AchievementStandard ;\n    lil:standardCode \"[4도정01-01]\" ;\n    rdfs:label \"궁금한 문제를 해결하기 위해 어떤 정보가 필요한지 파악하고 탐구 질문을 만든다.\"@ko ;\n    lil:standardDescription \"해결하고자 하는 문제 상황에서 필요한 정보의 종류를 규명하고 구체적인 질문으로 구체화한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\nlil:Std_4도정02_01 a lil:AchievementStandard ;\n    lil:standardCode \"[4도정02-01]\" ;\n    rdfs:label \"한국십진분류표(KDC)의 10대 기본 분류와 청구기호의 구조를 이해하고 서가에서 원하는 책을 찾는다.\"@ko ;\n    lil:standardDescription \"도서관의 주제별 분류 체계와 청구기호 라벨(별치기호, 분류기호, 저자기호, 권차기호)을 이해하고 실제 책 위치를 파악한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\nlil:Std_4도정02_02 a lil:AchievementStandard ;\n    lil:standardCode \"[4도정02-02]\" ;\n    rdfs:label \"도서관 온라인 목록(OPAC)과 적절한 검색어를 활용하여 필요한 자료를 검색한다.\"@ko ;\n    lil:standardDescription \"서명, 저자, 주제어 등을 활용하여 컴퓨터 목록 시스템에서 자료의 소장 여부와 위치를 스스로 검색한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\nlil:Std_4도정03_01 a lil:AchievementStandard ;\n    lil:standardCode \"[4도정03-01]\" ;\n    rdfs:label \"수집한 자료에서 사실과 의견을 구분하고, 질문에 알맞은 핵심 내용을 활동지에 정리한다.\"@ko ;\n    lil:standardDescription \"자료 속의 객관적 사실과 주관적 의견을 구별하며, 탐구 과제에 부합하는 주요 정보를 선별해 요약한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\nlil:Std_4도정03_02 a lil:AchievementStandard ;\n    lil:standardCode \"[4도정03-02]\" ;\n    rdfs:label \"자료를 인용할 때 지켜야 할 저작권 규칙을 알고, 자료의 출처(저자, 책 제목)를 바르게 적는다.\"@ko ;\n    lil:standardDescription \"타인의 저작물을 무단으로 복제하거나 표절하지 않으며, 인용한 자료의 기본 출처 정보를 명시한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\nlil:Std_4도정04_01 a lil:AchievementStandard ;\n    lil:standardCode \"[4도정04-01]\" ;\n    rdfs:label \"주제별 논픽션 도서와 문학 도서를 균형 있게 읽고 독서 통장이나 독서 기록판에 기록한다.\"@ko ;\n    lil:standardDescription \"교과 연계 지식 정보 도서와 문학 작품을 균형 있게 선택해 읽고 지속적으로 독서 활동을 누가 기록한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_3_4 .\n\n# -----------------------------------------------------------------\n# 초등학교 5~6학년군 성취기준\n# -----------------------------------------------------------------\nlil:Std_6도정01_01 a lil:AchievementStandard ;\n    lil:standardCode \"[6도정01-01]\" ;\n    rdfs:label \"교과 학습 과제나 실생활 문제 해결을 위한 구체적인 정보탐색 계획을 수립한다.\"@ko ;\n    lil:standardDescription \"과제의 목적과 성격을 분석하여 탐구 범위, 요구되는 정보의 형태, 탐색 일정 및 전략을 체계적으로 세운다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\nlil:Std_6도정02_01 a lil:AchievementStandard ;\n    lil:standardCode \"[6도정02-01]\" ;\n    rdfs:label \"인쇄 매체뿐만 아니라 웹 검색, 공공 디지털 데이터베이스 등 다양한 정보원을 목적에 맞게 비교·선택한다.\"@ko ;\n    lil:standardDescription \"단행본, 신문, 웹 문서, 공공기관 통계, 디지털 백과사전 등 다양한 매체의 장단점을 파악하여 탐구에 가장 적합한 정보원을 결정한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\nlil:Std_6도정02_02 a lil:AchievementStandard ;\n    lil:standardCode \"[6도정02-02]\" ;\n    rdfs:label \"정보원의 정확성, 최신성, 공정성, 저자의 전문성을 기준(CRAAP 등)으로 정보의 신뢰도를 비판적으로 평가한다.\"@ko ;\n    lil:standardDescription \"허위 조작 정보나 편향된 정보를 걸러내기 위해 공신력 있는 평가 기준을 적용하여 정보의 신뢰성을 엄격히 판별한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\nlil:Std_6도정03_01 a lil:AchievementStandard ;\n    lil:standardCode \"[6도정03-01]\" ;\n    rdfs:label \"여러 자료에서 추출한 정보를 그래픽 조직자와 개념도를 활용하여 비교·분류하고 인과관계를 구조화한다.\"@ko ;\n    lil:standardDescription \"복수의 정보원 간 공통점과 차이점을 비교하고, 마인드맵, 벤다이어그램, 인과망 등을 활용하여 지식을 체계화한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\nlil:Std_6도정03_02 a lil:AchievementStandard ;\n    lil:standardCode \"[6도정03-02]\" ;\n    rdfs:label \"분석한 정보를 바탕으로 결론을 도출하여 미니북, 카드뉴스, 보고서 등 창의적인 산출물로 재구성한다.\"@ko ;\n    lil:standardDescription \"자신의 관점과 탐구 결과를 종합하여 전달 대상과 매체 특성에 어울리는 창의적 정보 결과물로 변환한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\nlil:Std_6도정03_03 a lil:AchievementStandard ;\n    lil:standardCode \"[6도정03-03]\" ;\n    rdfs:label \"디지털 저작권(CCL), 초상권, 개인정보 보호 윤리를 준수하며 책임감 있게 산출물을 공유한다.\"@ko ;\n    lil:standardDescription \"온라인 환경에서 타인의 지적 재산과 인격권을 침해하지 않도록 정당한 인용 및 자유이용허락표시(CCL)를 준수하며 소통한다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .\n\nlil:Std_6도정04_01 a lil:AchievementStandard ;\n    lil:standardCode \"[6도정04-01]\" ;\n    rdfs:label \"자신의 독서 성향을 파악하여 자기주도적으로 도서를 선별·향유하고, 탐구의 전 과정을 메타인지적으로 성찰한다.\"@ko ;\n    lil:standardDescription \"자신의 관심사와 독서 이력을 바탕으로 주도적으로 도서를 선택해 깊이 있게 읽고, 정보 탐색 및 문제 해결 전반을 되돌아본다.\"@ko ;\n    lil:targetsGradeBand lil:GradeBand_5_6 .",
  "readstrategy.ttl": "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl: <http://www.w3.org/2002/07/owl#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix ex: <http://example.org/reading#> .\n\n# Ontology Declaration\nex:ReadingStrategyOntology a owl:Ontology ;\n    rdfs:label \"독서기능, 독서전략, 독서과정 온톨로지\"@ko ;\n    rdfs:comment \"KNU 독서기능, 과정-기능 동사 및 해당 전략 매핑 데이터\"@ko .\n\n# Classes\nex:ReadingFunction a owl:Class ;\n    rdfs:label \"핵심기능\"@ko .\n\nex:ReadingVerb a owl:Class ;\n    rdfs:label \"과정-기능에 해당하는 동사\"@ko .\n\nex:ReadingStrategy a owl:Class ;\n    rdfs:label \"해당 전략(대표 예시)\"@ko .\n\n# Properties\nex:hasVerb a owl:ObjectProperty ;\n    rdfs:domain ex:ReadingFunction ;\n    rdfs:range ex:ReadingVerb ;\n    rdfs:label \"해당 동사를 가짐\"@ko .\n\nex:hasStrategy a owl:ObjectProperty ;\n    rdfs:domain ex:ReadingFunction ;\n    rdfs:range ex:ReadingStrategy ;\n    rdfs:label \"해당 전략을 가짐\"@ko .\n\n# Instances & Relationships\n\n# 1. 이해\nex:Func_Understanding a ex:ReadingFunction ;\n    rdfs:label \"이해\"@ko ;\n    ex:hasVerb ex:Verb_이해하다, ex:Verb_파악하다, ex:Verb_설명하다, ex:Verb_의미를_연결하다, ex:Verb_해석하다 ;\n    ex:hasStrategy ex:Strat_단어의_나무, ex:Strat_낱말_접사_만들기, ex:Strat_손_그리기_활동, ex:Strat_감정표, ex:Strat_개념_정의_지도그리기, ex:Strat_LEAD_어휘연습, ex:Strat_밑줄_긋기, ex:Strat_빈칸_메우기, ex:Strat_중심생각_수레바퀴, ex:Strat_수학책을_읽는_열쇠 .\n\n# 2. 탐색\nex:Func_Exploration a ex:ReadingFunction ;\n    rdfs:label \"탐색\"@ko ;\n    ex:hasVerb ex:Verb_살펴보다, ex:Verb_훑어보다, ex:Verb_질문하다, ex:Verb_조사하다, ex:Verb_예상하다, ex:Verb_찾아보다 ;\n    ex:hasStrategy ex:Strat_SQ3R, ex:Strat_과학책_훑어보기, ex:Strat_미리보기, ex:Strat_앙케이트_질문표, ex:Strat_밑줄_긋기, ex:Strat_질문의_답은_어디에_QAR, ex:Strat_KWL .\n\n# 3. 추론\nex:Func_Inference a ex:ReadingFunction ;\n    rdfs:label \"추론\"@ko ;\n    ex:hasVerb ex:Verb_추리하다, ex:Verb_유추하다, ex:Verb_근거를_찾다, ex:Verb_맥락을_파악하다, ex:Verb_숨은_의미를_발견하다 ;\n    ex:hasStrategy ex:Strat_질문의_답은_어디에_QAR, ex:Strat_정교한_질문, ex:Strat_실마리_낱말로_유추하기, ex:Strat_빈칸_메우기, ex:Strat_경계_어휘전략, ex:Strat_예측_안내하기, ex:Strat_A_QU_A .\n\n# 4. 예측\nex:Func_Prediction a ex:ReadingFunction ;\n    rdfs:label \"예측\"@ko ;\n    ex:hasVerb ex:Verb_예상하다, ex:Verb_가정하다, ex:Verb_전망하다, ex:Verb_추측하다, ex:Verb_미리_생각하다 ;\n    ex:hasStrategy ex:Strat_어휘_예상하기, ex:Strat_예측_안내하기, ex:Strat_사진_속으로, ex:Strat_상상_속으로, ex:Strat_KWL, ex:Strat_실마리_낱말로_유추하기, ex:Strat_미리보기 .\n\n# 5. 비교\nex:Func_Comparison a ex:ReadingFunction ;\n    rdfs:label \"비교\"@ko ;\n    ex:hasVerb ex:Verb_비교하다, ex:Verb_공통점을_찾다, ex:Verb_유사성을_분석하다, ex:Verb_연결하다 ;\n    ex:hasStrategy ex:Strat_벤다이어그램, ex:Strat_의미자질_분석하기, ex:Strat_대조표, ex:Strat_대립_척도표 .\n\n# 6. 대조\nex:Func_Contrast a ex:ReadingFunction ;\n    rdfs:label \"대조\"@ko ;\n    ex:hasVerb ex:Verb_대비하다, ex:Verb_차이점을_찾다, ex:Verb_구별하다, ex:Verb_구분하다 ;\n    ex:hasStrategy ex:Strat_대조표, ex:Strat_벤다이어그램, ex:Strat_의미자질_분석하기, ex:Strat_대립_척도표 .\n\n# 7. 분류\nex:Func_Classification a ex:ReadingFunction ;\n    rdfs:label \"분류\"@ko ;\n    ex:hasVerb ex:Verb_나누다, ex:Verb_범주화하다, ex:Verb_묶다, ex:Verb_유형화하다, ex:Verb_체계화하다 ;\n    ex:hasStrategy ex:Strat_단어_분류하기, ex:Strat_의미자질_분석하기, ex:Strat_피라미드_다이어그램, ex:Strat_닿소리표_그리기, ex:Strat_낱말_접사_만들기 .\n\n# 8. 관계화\nex:Func_Relation a ex:ReadingFunction ;\n    rdfs:label \"관계화\"@ko ;\n    ex:hasVerb ex:Verb_연결하다, ex:Verb_관련짓다, ex:Verb_구조화하다, ex:Verb_흐름을_파악하다, ex:Verb_맥락화하다 ;\n    ex:hasStrategy ex:Strat_역사의_흐름_파악하기, ex:Strat_플롯_조직표, ex:Strat_이야기_지도_그리기, ex:Strat_의미_구조도_그리기, ex:Strat_인물망, ex:Strat_생각_그물, ex:Strat_상호텍스트_전략 .\n\n# 9. 분석\nex:Func_Analysis a ex:ReadingFunction ;\n    rdfs:label \"분석\"@ko ;\n    ex:hasVerb ex:Verb_분석하다, ex:Verb_분해하다, ex:Verb_구조를_파악하다, ex:Verb_원인을_찾다, ex:Verb_검토하다 ;\n    ex:hasStrategy ex:Strat_글_구조_전략, ex:Strat_오류_찾기, ex:Strat_단어_유래_찾기, ex:Strat_인물지도, ex:Strat_상호텍스트_전략, ex:Strat_수학책을_읽는_열쇠 .\n\n# 10. 종합\nex:Func_Synthesis a ex:ReadingFunction ;\n    rdfs:label \"종합\"@ko ;\n    ex:hasVerb ex:Verb_종합하다, ex:Verb_통합하다, ex:Verb_요약하다, ex:Verb_재구성하다, ex:Verb_핵심화하다 ;\n    ex:hasStrategy ex:Strat_요약하기, ex:Strat_자석_요약하기, ex:Strat_의미지도_그리기, ex:Strat_중심생각_수레바퀴, ex:Strat_생각_그물, ex:Strat_문학지도, ex:Strat_피라미드_다이어그램 .\n\n# 11. 평가\nex:Func_Evaluation a ex:ReadingFunction ;\n    rdfs:label \"평가\"@ko ;\n    ex:hasVerb ex:Verb_판단하다, ex:Verb_비판하다, ex:Verb_검증하다, ex:Verb_근거를_따지다, ex:Verb_가치화하다 ;\n    ex:hasStrategy ex:Strat_오류_찾기, ex:Strat_참_거짓_가리기, ex:Strat_대립_척도표, ex:Strat_상호텍스트_전략, ex:Strat_복식_기재_일지 .\n\n# 12. 적용\nex:Func_Application a ex:ReadingFunction ;\n    rdfs:label \"적용\"@ko ;\n    ex:hasVerb ex:Verb_활용하다, ex:Verb_적용하다, ex:Verb_실행하다, ex:Verb_실천하다, ex:Verb_전이하다 ;\n    ex:hasStrategy ex:Strat_RAFT, ex:Strat_수학책을_읽는_열쇠, ex:Strat_LEAD_어휘연습, ex:Strat_인물_따라하기 .\n\n# 13. 창안\nex:Func_Creation a ex:ReadingFunction ;\n    rdfs:label \"창안\"@ko ;\n    ex:hasVerb ex:Verb_창조하다, ex:Verb_상상하다, ex:Verb_구안하다, ex:Verb_발명하다, ex:Verb_생성하다 ;\n    ex:hasStrategy ex:Strat_브레인스토밍, ex:Strat_가능한_문장_만들기, ex:Strat_상상_속으로, ex:Strat_RAFT, ex:Strat_사진_속으로 .\n\n# 14. 표현\nex:Func_Expression a ex:ReadingFunction ;\n    rdfs:label \"표현\"@ko ;\n    ex:hasVerb ex:Verb_표현하다, ex:Verb_말하다, ex:Verb_서술하다, ex:Verb_재현하다, ex:Verb_발표하다 ;\n    ex:hasStrategy ex:Strat_다시_이야기하기, ex:Strat_인물_인용하기, ex:Strat_인물_따라하기, ex:Strat_RAFT, ex:Strat_문학지도, ex:Strat_손_그리기_활동 .\n\n# 15. 조절(메타인지)\nex:Func_Regulation a ex:ReadingFunction ;\n    rdfs:label \"조절(메타인지)\"@ko ;\n    ex:hasVerb ex:Verb_점검하다, ex:Verb_반성하다, ex:Verb_계획하다, ex:Verb_조정하다, ex:Verb_성찰하다 ;\n    ex:hasStrategy ex:Strat_KWL, ex:Strat_SQ3R, ex:Strat_복식_기재_일지, ex:Strat_A_QU_A, ex:Strat_정교한_질문 .\n\n\n# Verbs Definitions (RDF Types)\nex:Verb_이해하다 a ex:ReadingVerb ; rdfs:label \"이해하다\"@ko .\nex:Verb_파악하다 a ex:ReadingVerb ; rdfs:label \"파악하다\"@ko .\nex:Verb_설명하다 a ex:ReadingVerb ; rdfs:label \"설명하다\"@ko .\nex:Verb_의미를_연결하다 a ex:ReadingVerb ; rdfs:label \"의미를 연결하다\"@ko .\nex:Verb_해석하다 a ex:ReadingVerb ; rdfs:label \"해석하다\"@ko .\nex:Verb_살펴보다 a ex:ReadingVerb ; rdfs:label \"살펴보다\"@ko .\nex:Verb_훑어보다 a ex:ReadingVerb ; rdfs:label \"훑어보다\"@ko .\nex:Verb_질문하다 a ex:ReadingVerb ; rdfs:label \"질문하다\"@ko .\nex:Verb_조사하다 a ex:ReadingVerb ; rdfs:label \"조사하다\"@ko .\nex:Verb_예상하다 a ex:ReadingVerb ; rdfs:label \"예상하다\"@ko .\nex:Verb_찾아보다 a ex:ReadingVerb ; rdfs:label \"찾아보다\"@ko .\nex:Verb_추리하다 a ex:ReadingVerb ; rdfs:label \"추리하다\"@ko .\nex:Verb_유추하다 a ex:ReadingVerb ; rdfs:label \"유추하다\"@ko .\nex:Verb_근거를_찾다 a ex:ReadingVerb ; rdfs:label \"근거를 찾다\"@ko .\nex:Verb_맥락을_파악하다 a ex:ReadingVerb ; rdfs:label \"맥락을 파악하다\"@ko .\nex:Verb_숨은_의미를_발견하다 a ex:ReadingVerb ; rdfs:label \"숨은 의미를 발견하다\"@ko .\nex:Verb_가정하다 a ex:ReadingVerb ; rdfs:label \"가정하다\"@ko .\nex:Verb_전망하다 a ex:ReadingVerb ; rdfs:label \"전망하다\"@ko .\nex:Verb_추측하다 a ex:ReadingVerb ; rdfs:label \"추측하다\"@ko .\nex:Verb_미리_생각하다 a ex:ReadingVerb ; rdfs:label \"미리 생각하다\"@ko .\nex:Verb_비교하다 a ex:ReadingVerb ; rdfs:label \"비교하다\"@ko .\nex:Verb_공통점을_찾다 a ex:ReadingVerb ; rdfs:label \"공통점을 찾다\"@ko .\nex:Verb_유사성을_분석하다 a ex:ReadingVerb ; rdfs:label \"유사성을 분석하다\"@ko .\nex:Verb_연결하다 a ex:ReadingVerb ; rdfs:label \"연결하다\"@ko .\nex:Verb_대비하다 a ex:ReadingVerb ; rdfs:label \"대비하다\"@ko .\nex:Verb_차이점을_찾다 a ex:ReadingVerb ; rdfs:label \"차이점을 찾다\"@ko .\nex:Verb_구별하다 a ex:ReadingVerb ; rdfs:label \"구별하다\"@ko .\nex:Verb_구분하다 a ex:ReadingVerb ; rdfs:label \"구분하다\"@ko .\nex:Verb_나누다 a ex:ReadingVerb ; rdfs:label \"나누다\"@ko .\nex:Verb_범주화하다 a ex:ReadingVerb ; rdfs:label \"범주화하다\"@ko .\nex:Verb_묶다 a ex:ReadingVerb ; rdfs:label \"묶다\"@ko .\nex:Verb_유형화하다 a ex:ReadingVerb ; rdfs:label \"유형화하다\"@ko .\nex:Verb_체계화하다 a ex:ReadingVerb ; rdfs:label \"체계화하다\"@ko .\nex:Verb_관련짓다 a ex:ReadingVerb ; rdfs:label \"관련짓다\"@ko .\nex:Verb_구조화하다 a ex:ReadingVerb ; rdfs:label \"구조화하다\"@ko .\nex:Verb_흐름을_파악하다 a ex:ReadingVerb ; rdfs:label \"흐름을 파악하다\"@ko .\nex:Verb_맥락화하다 a ex:ReadingVerb ; rdfs:label \"맥락화하다\"@ko .\nex:Verb_분석하다 a ex:ReadingVerb ; rdfs:label \"분석하다\"@ko .\nex:Verb_분해하다 a ex:ReadingVerb ; rdfs:label \"분해하다\"@ko .\nex:Verb_구조를_파악하다 a ex:ReadingVerb ; rdfs:label \"구조를 파악하다\"@ko .\nex:Verb_원인을_찾다 a ex:ReadingVerb ; rdfs:label \"원인을 찾다\"@ko .\nex:Verb_검토하다 a ex:ReadingVerb ; rdfs:label \"검토하다\"@ko .\nex:Verb_종합하다 a ex:ReadingVerb ; rdfs:label \"종합하다\"@ko .\nex:Verb_통합하다 a ex:ReadingVerb ; rdfs:label \"통합하다\"@ko .\nex:Verb_요약하다 a ex:ReadingVerb ; rdfs:label \"요약하다\"@ko .\nex:Verb_재구성하다 a ex:ReadingVerb ; rdfs:label \"재구성하다\"@ko .\nex:Verb_핵심화하다 a ex:ReadingVerb ; rdfs:label \"핵심화하다\"@ko .\nex:Verb_판단하다 a ex:ReadingVerb ; rdfs:label \"판단하다\"@ko .\nex:Verb_비판하다 a ex:ReadingVerb ; rdfs:label \"비판하다\"@ko .\nex:Verb_검증하다 a ex:ReadingVerb ; rdfs:label \"검증하다\"@ko .\nex:Verb_근거를_따지다 a ex:ReadingVerb ; rdfs:label \"근거를 따지다\"@ko .\nex:Verb_가치화하다 a ex:ReadingVerb ; rdfs:label \"가치화하다\"@ko .\nex:Verb_활용하다 a ex:ReadingVerb ; rdfs:label \"활용하다\"@ko .\nex:Verb_실행하다 a ex:ReadingVerb ; rdfs:label \"실행하다\"@ko .\nex:Verb_실천하다 a ex:ReadingVerb ; rdfs:label \"실천하다\"@ko .\nex:Verb_전이하다 a ex:ReadingVerb ; rdfs:label \"전이하다\"@ko .\nex:Verb_창조하다 a ex:ReadingVerb ; rdfs:label \"창조하다\"@ko .\nex:Verb_상상하다 a ex:ReadingVerb ; rdfs:label \"상상하다\"@ko .\nex:Verb_구안하다 a ex:ReadingVerb ; rdfs:label \"구안하다\"@ko .\nex:Verb_발명하다 a ex:ReadingVerb ; rdfs:label \"발명하다\"@ko .\nex:Verb_생성하다 a ex:ReadingVerb ; rdfs:label \"생성하다\"@ko .\nex:Verb_표현하다 a ex:ReadingVerb ; rdfs:label \"표현하다\"@ko .\nex:Verb_말하다 a ex:ReadingVerb ; rdfs:label \"말하다\"@ko .\nex:Verb_서술하다 a ex:ReadingVerb ; rdfs:label \"서술하다\"@ko .\nex:Verb_재현하다 a ex:ReadingVerb ; rdfs:label \"재현하다\"@ko .\nex:Verb_발표하다 a ex:ReadingVerb ; rdfs:label \"발표하다\"@ko .\nex:Verb_점검하다 a ex:ReadingVerb ; rdfs:label \"점검하다\"@ko .\nex:Verb_반성하다 a ex:ReadingVerb ; rdfs:label \"반성하다\"@ko .\nex:Verb_계획하다 a ex:ReadingVerb ; rdfs:label \"계획하다\"@ko .\nex:Verb_조정하다 a ex:ReadingVerb ; rdfs:label \"조정하다\"@ko .\nex:Verb_성찰하다 a ex:ReadingVerb ; rdfs:label \"성찰하다\"@ko .\n\n# Strategy Definitions (RDF Types)\nex:Strat_단어의_나무 a ex:ReadingStrategy ; rdfs:label \"단어의 나무\"@ko .\nex:Strat_낱말_접사_만들기 a ex:ReadingStrategy ; rdfs:label \"낱말 접사 만들기\"@ko .\nex:Strat_손_그리기_활동 a ex:ReadingStrategy ; rdfs:label \"손 그리기 활동\"@ko .\nex:Strat_감정표 a ex:ReadingStrategy ; rdfs:label \"감정표\"@ko .\nex:Strat_개념_정의_지도그리기 a ex:ReadingStrategy ; rdfs:label \"개념 정의 지도그리기\"@ko .\nex:Strat_LEAD_어휘연습 a ex:ReadingStrategy ; rdfs:label \"LEAD 어휘연습\"@ko .\nex:Strat_밑줄_긋기 a ex:ReadingStrategy ; rdfs:label \"밑줄 긋기\"@ko .\nex:Strat_빈칸_메우기 a ex:ReadingStrategy ; rdfs:label \"빈칸 메우기\"@ko .\nex:Strat_중심생각_수레바퀴 a ex:ReadingStrategy ; rdfs:label \"중심생각 수레바퀴\"@ko .\nex:Strat_수학책을_읽는_열쇠 a ex:ReadingStrategy ; rdfs:label \"수학책을 읽는 열쇠\"@ko .\nex:Strat_SQ3R a ex:ReadingStrategy ; rdfs:label \"SQ3R\"@ko .\nex:Strat_과학책_훑어보기 a ex:ReadingStrategy ; rdfs:label \"과학책 훑어보기\"@ko .\nex:Strat_미리보기 a ex:ReadingStrategy ; rdfs:label \"미리보기\"@ko .\nex:Strat_앙케이트_질문표 a ex:ReadingStrategy ; rdfs:label \"앙케이트/질문표\"@ko .\nex:Strat_질문의_답은_어디에_QAR a ex:ReadingStrategy ; rdfs:label \"질문의 답은 어디에(QAR)\"@ko .\nex:Strat_KWL a ex:ReadingStrategy ; rdfs:label \"KWL\"@ko .\nex:Strat_정교한_질문 a ex:ReadingStrategy ; rdfs:label \"정교한 질문\"@ko .\nex:Strat_실마리_낱말로_유추하기 a ex:ReadingStrategy ; rdfs:label \"실마리 낱말로 유추하기\"@ko .\nex:Strat_경계_어휘전략 a ex:ReadingStrategy ; rdfs:label \"경계 어휘전략\"@ko .\nex:Strat_예측_안내하기 a ex:ReadingStrategy ; rdfs:label \"예측 안내하기\"@ko .\nex:Strat_A_QU_A a ex:ReadingStrategy ; rdfs:label \"A-QU-A\"@ko .\nex:Strat_어휘_예상하기 a ex:ReadingStrategy ; rdfs:label \"어휘 예상하기\"@ko .\nex:Strat_사진_속으로 a ex:ReadingStrategy ; rdfs:label \"사진 속으로\"@ko .\nex:Strat_상상_속으로 a ex:ReadingStrategy ; rdfs:label \"상상 속으로\"@ko .\nex:Strat_벤다이어그램 a ex:ReadingStrategy ; rdfs:label \"벤다이어그램\"@ko .\nex:Strat_의미자질_분석하기 a ex:ReadingStrategy ; rdfs:label \"의미자질 분석하기\"@ko .\nex:Strat_대조표 a ex:ReadingStrategy ; rdfs:label \"대조표\"@ko .\nex:Strat_대립_척도표 a ex:ReadingStrategy ; rdfs:label \"대립 척도표\"@ko .\nex:Strat_단어_분류하기 a ex:ReadingStrategy ; rdfs:label \"단어 분류하기\"@ko .\nex:Strat_피라미드_다이어그램 a ex:ReadingStrategy ; rdfs:label \"피라미드 다이어그램\"@ko .\nex:Strat_닿소리표_그리기 a ex:ReadingStrategy ; rdfs:label \"닿소리표 그리기\"@ko .\nex:Strat_역사의_흐름_파악하기 a ex:ReadingStrategy ; rdfs:label \"역사의 흐름 파악하기\"@ko .\nex:Strat_플롯_조직표 a ex:ReadingStrategy ; rdfs:label \"플롯 조직표\"@ko .\nex:Strat_이야기_지도_그리기 a ex:ReadingStrategy ; rdfs:label \"이야기 지도 그리기\"@ko .\nex:Strat_의미_구조도_그리기 a ex:ReadingStrategy ; rdfs:label \"의미 구조도 그리기\"@ko .\nex:Strat_인물망 a ex:ReadingStrategy ; rdfs:label \"인물망\"@ko .\nex:Strat_생각_그물 a ex:ReadingStrategy ; rdfs:label \"생각 그물\"@ko .\nex:Strat_상호텍스트_전략 a ex:ReadingStrategy ; rdfs:label \"상호텍스트 전략\"@ko .\nex:Strat_글_구조_전략 a ex:ReadingStrategy ; rdfs:label \"글 구조 전략\"@ko .\nex:Strat_오류_찾기 a ex:ReadingStrategy ; rdfs:label \"오류 찾기\"@ko .\nex:Strat_단어_유래_찾기 a ex:ReadingStrategy ; rdfs:label \"단어 유래 찾기\"@ko .\nex:Strat_인물지도 a ex:ReadingStrategy ; rdfs:label \"인물지도\"@ko .\nex:Strat_요약하기 a ex:ReadingStrategy ; rdfs:label \"요약하기\"@ko .\nex:Strat_자석_요약하기 a ex:ReadingStrategy ; rdfs:label \"자석 요약하기\"@ko .\nex:Strat_의미지도_그리기 a ex:ReadingStrategy ; rdfs:label \"의미지도 그리기\"@ko .\nex:Strat_문학지도 a ex:ReadingStrategy ; rdfs:label \"문학지도\"@ko .\nex:Strat_참_거짓_가리기 a ex:ReadingStrategy ; rdfs:label \"참/거짓 가리기\"@ko .\nex:Strat_복식_기재_일지 a ex:ReadingStrategy ; rdfs:label \"복식 기재 일지\"@ko .\nex:Strat_RAFT a ex:ReadingStrategy ; rdfs:label \"RAFT\"@ko .\nex:Strat_인물_따라하기 a ex:ReadingStrategy ; rdfs:label \"인물 따라하기\"@ko .\nex:Strat_브레인스토밍 a ex:ReadingStrategy ; rdfs:label \"브레인스토밍\"@ko .\nex:Strat_가능한_문장_만들기 a ex:ReadingStrategy ; rdfs:label \"가능한 문장 만들기\"@ko .\nex:Strat_다시_이야기하기 a ex:ReadingStrategy ; rdfs:label \"다시 이야기하기\"@ko .\nex:Strat_인물_인용하기 a ex:ReadingStrategy ; rdfs:label \"인물 인용하기\"@ko .",
  "개념기반탐구.ttl": "@prefix ex:   <http://example.org/concept-inquiry/> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\n# =================================================================\n# 온톨로지 정의 (Ontology Declaration)\n# =================================================================\nex:ConceptBasedInquiryOntology a owl:Ontology ;\n    dc:title \"개념기반 탐구과정을 활용한 초등 교과 융합 온톨로지\"@ko ;\n    rdfs:label \"개념기반 탐구과정 온톨로지\"@ko ;\n    rdfs:comment \"린 에릭슨(Lynn Erickson)과 레이첼 프렌치(Rachel French)의 개념기반 탐구학습(Concept-Based Inquiry) 7단계를 체계화하고, 초등 교과 융합 및 도서관 협력수업에 적용할 수 있는 교수전략, 사고 루틴, 탐구활동, 학습자료, 평가방법을 연계한 교육과정 온톨로지.\"@ko .\n\n# =================================================================\n# RDFS / OWL 클래스 정의 (Class Hierarchies)\n# =================================================================\n\nex:InquiryPhase a owl:Class ;\n    rdfs:label \"탐구단계\"@ko ;\n    rdfs:comment \"개념기반 탐구 모형에서 학습자의 깊이 있는 개념적 이해와 전이를 이끌어내기 위해 단계적으로 설계된 탐구 사태.\"@ko .\n\nex:ConceptBasedCurriculumLesson a owl:Class ;\n    rdfs:label \"개념기반 탐구 수업\"@ko ;\n    rdfs:comment \"사실적 지식을 넘어 핵심 개념(Concept)과 일반화(Generalization)에 도달하도록 설계된 교과 통합 탐구 단원 및 수업.\"@ko .\n\nex:TeachingStrategy a owl:Class ;\n    rdfs:label \"교수·학습 전략\"@ko ;\n    rdfs:comment \"각 탐구단계에서 교사가 학습자의 사고를 촉진하고 스캐폴딩(비계)을 제공하기 위해 적용하는 수업 전략.\"@ko .\n\nex:ThinkingRoutine a owl:Class ;\n    rdfs:subClassOf ex:TeachingStrategy ;\n    rdfs:label \"사고 루틴(Thinking Routine)\"@ko ;\n    rdfs:comment \"하버드 Project Zero 등에서 제안한 학습자의 가시적 사고(Visible Thinking)를 돕는 구조화된 사고 도구.\"@ko .\n\nex:LearningActivity a owl:Class ;\n    rdfs:label \"학습 활동\"@ko ;\n    rdfs:comment \"학습자가 개념적 이해를 구성하기 위해 각 탐구단계에서 수행하는 학생 주도 탐구 실천 활동.\"@ko .\n\nex:LearningResource a owl:Class ;\n    rdfs:label \"학습 자료 및 도구\"@ko ;\n    rdfs:comment \"탐구 수행을 지원하는 도서관 서지 자료, 시각 매체, 조작물, 그래픽 조직자 등.\"@ko .\n\nex:AssessmentMethod a owl:Class ;\n    rdfs:label \"평가 방법\"@ko ;\n    rdfs:comment \"탐구 과정과 산출물에서 개념적 이해와 역량 도달도를 측정하는 과정중심 및 총괄 평가 방식.\"@ko .\n\n# =================================================================\n# 속성 정의 (Object & Datatype Properties)\n# =================================================================\n\nex:hasPhase a owl:ObjectProperty ;\n    rdfs:domain ex:ConceptBasedCurriculumLesson ;\n    rdfs:range ex:InquiryPhase ;\n    rdfs:label \"탐구단계를 포함한다\"@ko .\n\nex:hasStrategy a owl:ObjectProperty ;\n    rdfs:domain ex:InquiryPhase ;\n    rdfs:range ex:TeachingStrategy ;\n    rdfs:label \"교수 전략 및 사고 루틴을 사용한다\"@ko .\n\nex:hasActivity a owl:ObjectProperty ;\n    rdfs:domain ex:InquiryPhase ;\n    rdfs:range ex:LearningActivity ;\n    rdfs:label \"학습 활동을 포함한다\"@ko .\n\nex:usesResource a owl:ObjectProperty ;\n    rdfs:domain ex:InquiryPhase ;\n    rdfs:range ex:LearningResource ;\n    rdfs:label \"학습 자료를 활용한다\"@ko .\n\nex:hasAssessment a owl:ObjectProperty ;\n    rdfs:domain ex:InquiryPhase ;\n    rdfs:range ex:AssessmentMethod ;\n    rdfs:label \"평가 방법을 적용한다\"@ko .\n\nex:sequenceNumber a owl:DatatypeProperty ;\n    rdfs:domain ex:InquiryPhase ;\n    rdfs:range xsd:integer ;\n    rdfs:label \"탐구단계 순서\"@ko .\n\nex:elementaryApplicationCase a owl:DatatypeProperty ;\n    rdfs:domain ex:InquiryPhase ;\n    rdfs:range xsd:string ;\n    rdfs:label \"초등 교과 적용 사례\"@ko .\n\nex:nextPhase a owl:ObjectProperty, owl:TransitiveProperty ;\n    rdfs:domain ex:InquiryPhase ;\n    rdfs:range ex:InquiryPhase ;\n    rdfs:label \"다음 탐구단계\"@ko .\n\n# =================================================================\n# 대표 단원 인스턴스 (Exemplar Lesson Instance)\n# =================================================================\n\nex:ElemIntegratedInquiryLesson a ex:ConceptBasedCurriculumLesson ;\n    rdfs:label \"초등 융합 개념기반 탐구 단원: 생태계와 인간의 상호작용 및 지속가능성\"@ko ;\n    rdfs:comment \"초등 5-6학년 과학, 사회, 국어, 실과 융합 단원으로 '상호의존성'과 '시스템'의 개념을 탐구하여 '생태계 구성 요소들의 상호의존적 관계가 붕괴되면 전체 시스템의 균형과 지속가능성이 위협받는다'는 일반화에 도달하는 단원.\"@ko ;\n    ex:hasPhase ex:phase1_Engage, ex:phase2_Focus, ex:phase3_Investigate,\n                ex:phase4_Organize, ex:phase5_Generalize, ex:phase6_Transfer,\n                ex:phase7_Reflect .\n\n# =================================================================\n# 1단계: 관계 맺기 (Engage)\n# =================================================================\n\nex:phase1_Engage a ex:InquiryPhase ;\n    ex:sequenceNumber 1 ;\n    rdfs:label \"1단계: 관계 맺기 (Engage)\"@ko ;\n    rdfs:comment \"호기심을 자극하고 학생의 삶과 사전 경험을 연결하며, 긍정적인 정서적 몰입과 질문을 유도하는 단계.\"@ko ;\n    ex:hasStrategy ex:strat1_Provocation, ex:strat1_SeeThinkWonder, ex:strat1_KWL, ex:strat1_ChalkTalk ;\n    ex:hasActivity ex:act1_ArtifactExploration, ex:act1_EmotionQuestioning ;\n    ex:usesResource ex:res1_ProvocationKit, ex:res1_ThinkingPad ;\n    ex:hasAssessment ex:assess1_DiagnosticObservation ;\n    ex:elementaryApplicationCase \"꿀벌이 사라진 생태계와 마트 과일 코너가 텅 빈 미래 가상 뉴스를 보여주며 호기심을 유발하고, '만약 우리가 좋아하는 과일이 모두 사라진다면?'이라는 발문으로 사전 경험을 이끌어냄.\"@ko ;\n    ex:nextPhase ex:phase2_Focus .\n\n# 전략 & 사고루틴\nex:strat1_Provocation a ex:TeachingStrategy ;\n    rdfs:label \"도발적 자극(Provocation) 전략\"@ko ;\n    rdfs:comment \"강렬한 이미지, 충격적인 통계, 미스터리 상자 등 비일상적 상황을 제시하여 인지적 갈등과 호기심을 유발하는 전략.\"@ko .\n\nex:strat1_SeeThinkWonder a ex:ThinkingRoutine ;\n    rdfs:label \"보·생·궁 (See-Think-Wonder) 루틴\"@ko ;\n    rdfs:comment \"본 것(See)에 집중하고, 그것에 대해 생각한 바(Think)를 나누며, 떠오르는 궁금한 질문(Wonder)을 가시화하는 사고 루틴.\"@ko .\n\nex:strat1_KWL a ex:TeachingStrategy ;\n    rdfs:label \"K-W-L / K-W-L-S 전략\"@ko ;\n    rdfs:comment \"이미 알고 있는 것(Know), 알고 싶은 것(Want to know)을 점검하여 탐구의 출발점을 형성하는 전략.\"@ko .\n\nex:strat1_ChalkTalk a ex:ThinkingRoutine ;\n    rdfs:label \"무언의 대화 (Chalk Talk) 루틴\"@ko ;\n    rdfs:comment \"말을 하지 않고 종이나 칠판에 아이디어와 질문을 포스트잇이나 펜으로 릴레이 작성하며 생각을 교환하는 침묵의 브레인스토밍.\"@ko .\n\n# 활동, 자원, 평가\nex:act1_ArtifactExploration a ex:LearningActivity ;\n    rdfs:label \"호기심 유발 실물/미디어 탐색 활동\"@ko .\n\nex:act1_EmotionQuestioning a ex:LearningActivity ;\n    rdfs:label \"공감 기반 궁금한 질문 만들기 활동\"@ko .\n\nex:res1_ProvocationKit a ex:LearningResource ;\n    rdfs:label \"도발적 시청각 자극 자료(뉴스 클립, 사진 아카이브)\"@ko .\n\nex:res1_ThinkingPad a ex:LearningResource ;\n    rdfs:label \"생각 그물 기록판 및 질문 포스트잇\"@ko .\n\nex:assess1_DiagnosticObservation a ex:AssessmentMethod ;\n    rdfs:label \"선수지식 및 호기심 수준 관찰평가\"@ko .\n\n# =================================================================\n# 2단계: 집중하기 (Focus)\n# =================================================================\n\nex:phase2_Focus a ex:InquiryPhase ;\n    ex:sequenceNumber 2 ;\n    rdfs:label \"2단계: 집중하기 (Focus)\"@ko ;\n    rdfs:comment \"탐구의 초점을 좁히고, 핵심 개념(거시개념 및 미시개념)을 도입하며 탐구 질문(개념적 질문, 논쟁적 질문)을 정교화하는 단계.\"@ko ;\n    ex:hasStrategy ex:strat2_ConceptAttainment, ex:strat2_ConceptSorting, ex:strat2_QuestionFormulation, ex:strat2_FrayerModel ;\n    ex:hasActivity ex:act2_DefiningConcepts, ex:act2_RefiningInquiryQuestions ;\n    ex:usesResource ex:res2_FrayerBoard, ex:res2_QuestionMatrix ;\n    ex:hasAssessment ex:assess2_QuestionFormulationRubric ;\n    ex:elementaryApplicationCase \"'상호작용(Interaction)'과 '균형(Balance)'이라는 단어를 제시하고 프레이어 모델(Frayer Model)을 활용해 예시와 비예시를 찾으며, '생물과 환경은 서로 어떤 영향을 주고받는가?'라는 개념적 탐구 질문을 도출함.\"@ko ;\n    ex:nextPhase ex:phase3_Investigate .\n\n# 전략 & 사고루틴\nex:strat2_ConceptAttainment a ex:TeachingStrategy ;\n    rdfs:label \"개념 획득 모델 (Concept Attainment Model)\"@ko ;\n    rdfs:comment \"긍정적 사례(Yes)와 부정적 사례(No)를 대조 제시하여 학습자가 공통된 결정적 속성을 귀납적으로 찾아내게 하는 전략.\"@ko .\n\nex:strat2_ConceptSorting a ex:TeachingStrategy ;\n    rdfs:label \"개념 분류하기 (Concept Card Sorting)\"@ko ;\n    rdfs:comment \"낱말 카드를 개방형 또는 폐쇄형 기준에 따라 범주화하며 개념 간 위계와 범위를 명료화하는 전략.\"@ko .\n\nex:strat2_FrayerModel a ex:ThinkingRoutine ;\n    rdfs:label \"프레이어 모델 (Frayer Model) 어휘·개념 분석\"@ko ;\n    rdfs:comment \"정의, 결정적 특징, 예시, 비예시 4분면으로 개념의 내포와 외연을 명확히 규정하는 구조화 전략.\"@ko .\n\nex:strat2_QuestionFormulation a ex:ThinkingRoutine ;\n    rdfs:label \"질문 생성 기법 (QFT - Question Formulation Technique)\"@ko ;\n    rdfs:comment \"질문 초점(Q-Focus)을 기반으로 규칙에 따라 질문을 쏟아내고, 닫힌 질문과 열린 질문을 전환하며 우선순위 질문을 결정하는 루틴.\"@ko .\n\n# 활동, 자원, 평가\nex:act2_DefiningConcepts a ex:LearningActivity ;\n    rdfs:label \"핵심 개념 속성 규명 및 정의문 작성 활동\"@ko .\n\nex:act2_RefiningInquiryQuestions a ex:LearningActivity ;\n    rdfs:label \"사실적·개념적·논쟁적 질문 위계화 활동\"@ko .\n\nex:res2_FrayerBoard a ex:LearningResource ;\n    rdfs:label \"프레이어 개념 분석 활동지 및 공유 보드\"@ko .\n\nex:res2_QuestionMatrix a ex:LearningResource ;\n    rdfs:label \"질문 매트릭스(Q-Matrix) 및 분류 차트\"@ko .\n\nex:assess2_QuestionFormulationRubric a ex:AssessmentMethod ;\n    rdfs:label \"탐구 질문 수준 진단 루브릭 평가\"@ko .\n\n# =================================================================\n# 3단계: 조사하기 (Investigate)\n# =================================================================\n\nex:phase3_Investigate a ex:InquiryPhase ;\n    ex:sequenceNumber 3 ;\n    rdfs:label \"3단계: 조사하기 (Investigate)\"@ko ;\n    rdfs:comment \"다양한 사례, 데이터, 텍스트를 능동적으로 탐색하고 정보를 수집·비교하며 개념을 뒷받침하는 사실적 기반을 다지는 단계.\"@ko ;\n    ex:hasStrategy ex:strat3_JigsawReading, ex:strat3_Big6Search, ex:strat3_CaseStudy, ex:strat3_ExpertInterview ;\n    ex:hasActivity ex:act3_MultiSourceGathering, ex:act3_ExperimentObservation ;\n    ex:usesResource ex:res3_LibraryBooks, ex:res3_DigitalDatabase, ex:res3_FactOrganizer ;\n    ex:hasAssessment ex:assess3_SourceEvaluationChecklist ;\n    ex:elementaryApplicationCase \"도서관의 다양한 논픽션 도서(DDC 400 순수과학, 500 응용과학), 공공기관 환경 데이터, 다큐멘터리 영상을 직소(Jigsaw) 모둠별로 분담 탐색하여 생태계 파괴 사례와 원인 데이터를 수집함.\"@ko ;\n    ex:nextPhase ex:phase4_Organize .\n\n# 전략 & 사고루틴\nex:strat3_Big6Search a ex:TeachingStrategy ;\n    rdfs:label \"Big6 정보탐색 및 출처평가 전략\"@ko ;\n    rdfs:comment \"과제 정의, 정보 탐색 전략, 소재 파악 및 접근을 통해 신뢰성 높은 서지 자료와 디지털 데이터를 선별하는 정보활용 전략.\"@ko .\n\nex:strat3_JigsawReading a ex:TeachingStrategy ;\n    rdfs:label \"직소(Jigsaw) 협동 독서 탐구 전략\"@ko ;\n    rdfs:comment \"전문가 모둠에서 특정 사례나 텍스트를 깊이 읽고 분석한 후, 원 모둠으로 돌아와 동료에게 가르치는 상호의존적 협동 학습.\"@ko .\n\nex:strat3_CaseStudy a ex:TeachingStrategy ;\n    rdfs:label \"대조적 다중 사례 연구 (Multiple Case Studies)\"@ko ;\n    rdfs:comment \"서로 다른 시대, 지역, 환경의 사례(예: 황석어잡이의 쇠퇴, 옐로스톤 늑대 복원 사례 등)를 조사하여 공통된 패턴을 추출할 수 있는 다면적 기반을 구축하는 전략.\"@ko .\n\nex:strat3_ExpertInterview a ex:TeachingStrategy ;\n    rdfs:label \"전문가 인터뷰 및 현장 가상 탐방\"@ko ;\n    rdfs:comment \"환경 전문가, 생태 연구원의 글이나 인터뷰 영상, 가상 현장 조사를 통해 1차 자료를 확보하는 전략.\"@ko .\n\n# 활동, 자원, 평가\nex:act3_MultiSourceGathering a ex:LearningActivity ;\n    rdfs:label \"다매체 도서관 자료 추출 및 발췌록 작성 활동\"@ko .\n\nex:act3_ExperimentObservation a ex:LearningActivity ;\n    rdfs:label \"실험 관찰 및 데이터 수집 활동\"@ko .\n\nex:res3_LibraryBooks a ex:LearningResource ;\n    rdfs:label \"학교도서관 주제별 북큐레이션 컬렉션\"@ko .\n\nex:res3_DigitalDatabase a ex:LearningResource ;\n    rdfs:label \"어린이 과학·환경 디지털 아카이브 및 통계 DB\"@ko .\n\nex:res3_FactOrganizer a ex:LearningResource ;\n    rdfs:label \"사실 수집 및 출처 기록 카드\"@ko .\n\nex:assess3_SourceEvaluationChecklist a ex:AssessmentMethod ;\n    rdfs:label \"자료의 타당성 및 출처 신뢰도 체크리스트 평가\"@ko .\n\n# =================================================================\n# 4단계: 조직하기 (Organize)\n# =================================================================\n\nex:phase4_Organize a ex:InquiryPhase ;\n    ex:sequenceNumber 4 ;\n    rdfs:label \"4단계: 조직하기 (Organize)\"@ko ;\n    rdfs:comment \"수집한 데이터와 사실을 범주화하고, 패턴과 관계를 시각적으로 구조화하여 개념 간의 연결고리를 가시화하는 단계.\"@ko ;\n    ex:hasStrategy ex:strat4_ConceptMapping, ex:strat4_CSI, ex:strat4_VennDiagram, ex:strat4_ConnectExtendChallenge, ex:strat4_CauseEffectChain ;\n    ex:hasActivity ex:act4_PatternFinding, ex:act4_DiagrammingRelationships ;\n    ex:usesResource ex:res4_GraphicOrganizers, ex:res4_MuralWhiteboard ;\n    ex:hasAssessment ex:assess4_ConceptStructureRubric ;\n    ex:elementaryApplicationCase \"수집한 사실들을 '원인-과정-결과' 인과관계 사슬망과 벤다이어그램으로 정리하고, '연결-확장-도전(C-E-C)' 루틴을 통해 각 생물종의 멸종이 다른 생물종에게 미친 파급효과의 패턴을 구조화함.\"@ko ;\n    ex:nextPhase ex:phase5_Generalize .\n\n# 전략 & 사고루틴\nex:strat4_ConceptMapping a ex:TeachingStrategy ;\n    rdfs:label \"개념도 (Concept Mapping) 구조화 전략\"@ko ;\n    rdfs:comment \"조셉 노박(Joseph Novak)의 개념도 기법으로 핵심 개념들을 노드로 배치하고 관계 연결어(Linking words)를 명시하여 지식의 위계를 구조화하는 전략.\"@ko .\n\nex:strat4_ConnectExtendChallenge a ex:ThinkingRoutine ;\n    rdfs:label \"연결·확장·도전 (Connect-Extend-Challenge) 루틴\"@ko ;\n    rdfs:comment \"새로 알게 된 사실이 기존 생각과 어떻게 '연결'되는지, 생각을 어떻게 '확장'했는지, 여전히 해결되지 않은 '도전 과제'는 무엇인지 정리하는 루틴.\"@ko .\n\nex:strat4_CSI a ex:ThinkingRoutine ;\n    rdfs:label \"색·상·은 (Color, Symbol, Image - CSI) 루틴\"@ko ;\n    rdfs:comment \"분석한 데이터의 본질적 아이디어를 색깔(Color), 기호(Symbol), 이미지(Image)로 압축 표현하여 추상적 사고를 가시화하는 루틴.\"@ko .\n\nex:strat4_CauseEffectChain a ex:TeachingStrategy ;\n    rdfs:label \"인과관계 사슬망 (Cause-and-Effect Web)\"@ko ;\n    rdfs:comment \"원인과 결과가 단선적이 아닌 복합적인 피드백 루프(환류)로 얽혀 있음을 화살표와 네트워크로 표현하는 시스템 사고 도구.\"@ko .\n\nex:strat4_VennDiagram a ex:TeachingStrategy ;\n    rdfs:label \"비교·대조 다이어그램 (Venn & Matrix)\"@ko ;\n    rdfs:comment \"둘 이상의 사례에서 공통점과 차이점을 대조 분석하여 보편적 원리를 추론하는 도구.\"@ko .\n\n# 활동, 자원, 평가\nex:act4_PatternFinding a ex:LearningActivity ;\n    rdfs:label \"사례 간 공통 패턴 및 불일치점 분석 활동\"@ko .\n\nex:act4_DiagrammingRelationships a ex:LearningActivity ;\n    rdfs:label \"개념 간 연결 관계망 다이어그램 제작 활동\"@ko .\n\nex:res4_GraphicOrganizers a ex:LearningResource ;\n    rdfs:label \"다양한 유형의 그래픽 조직자 양식(인과망, 매트릭스)\"@ko .\n\nex:res4_MuralWhiteboard a ex:LearningResource ;\n    rdfs:label \"협업용 디지털 화이트보드(Miro, Padlet)\"@ko .\n\nex:assess4_ConceptStructureRubric a ex:AssessmentMethod ;\n    rdfs:label \"개념 구조화 및 패턴 분석 완성도 루브릭 평가\"@ko .\n\n# =================================================================\n# 5단계: 일반화하기 (Generalize)\n# =================================================================\n\nex:phase5_Generalize a ex:InquiryPhase ;\n    ex:sequenceNumber 5 ;\n    rdfs:label \"5단계: 일반화하기 (Generalize)\"@ko ;\n    rdfs:comment \"구조화된 패턴과 관계 속에서 사실 수준을 뛰어넘어 두 개 이상의 개념을 연결하는 영속적 이해(Enduring Understanding)이자 일반화된 진술을 형성하는 단계.\"@ko ;\n    ex:hasStrategy ex:strat5_InductiveGeneralization, ex:strat5_HeadlineRoutine, ex:strat5_SentencePhraseWord, ex:strat5_GeneralizationStems ;\n    ex:hasActivity ex:act5_DraftingGeneralization, ex:act5_PeerCritiqueOfStatements ;\n    ex:usesResource ex:res5_GeneralizationFormulaGuide, ex:res5_CritiqueCards ;\n    ex:hasAssessment ex:assess5_GeneralizationQualityRubric ;\n    ex:elementaryApplicationCase \"'개념 연결 프레임([개념 A]는 [개념 B]와 관련하여 [어떠한 영향/결과]를 가져온다)'을 활용하여, 학생 스스로 '생태계 내 한 생물종의 급격한 변화는 먹이사슬 전체의 평형을 깨뜨려 생물다양성을 위협한다'는 일반화 문장을 완성함.\"@ko ;\n    ex:nextPhase ex:phase6_Transfer .\n\n# 전략 & 사고루틴\nex:strat5_InductiveGeneralization a ex:TeachingStrategy ;\n    rdfs:label \"귀납적 개념 일반화 형성법 (Erickson Stems)\"@ko ;\n    rdfs:comment \"특정한 사실적 고유명사나 특정 시공간을 배제하고, 추상적인 개념 간의 역동적 상호관계를 강력한 현재형 동사로 서술하게 하는 전략.\"@ko .\n\nex:strat5_HeadlineRoutine a ex:ThinkingRoutine ;\n    rdfs:label \"헤드라인 (Headlines) 루틴\"@ko ;\n    rdfs:comment \"탐구한 내용의 핵심 개념적 통찰을 신문 1면의 강력한 헤드라인 형태로 한 문장으로 압축하는 사고 루틴.\"@ko .\n\nex:strat5_SentencePhraseWord a ex:ThinkingRoutine ;\n    rdfs:label \"문·구·단 (Sentence-Phrase-Word) 루틴\"@ko ;\n    rdfs:comment \"자신의 배움을 대변하는 핵심 문장(Sentence), 핵심 구(Phrase), 핵심 단어(Word)를 단계적으로 선별하여 본질을 도출하는 루틴.\"@ko .\n\nex:strat5_GeneralizationStems a ex:TeachingStrategy ;\n    rdfs:label \"일반화 문장 유도 구문 (Sentence Stems)\"@ko ;\n    rdfs:comment \"'~은/는 ~에 영향을 미친다', '~할 때 ~시스템은 ~하게 반응한다' 등의 언어적 비계를 제공하여 초등학생이 개념적 진술을 작성하도록 지원하는 기법.\"@ko .\n\n# 활동, 자원, 평가\nex:act5_DraftingGeneralization a ex:LearningActivity ;\n    rdfs:label \"개념 간 관계를 엮은 일반화 문장 초안 작성 및 다듬기 활동\"@ko .\n\nex:act5_PeerCritiqueOfStatements a ex:LearningActivity ;\n    rdfs:label \"일반화 진술의 명료성·보편성 동료 상호 피드백 활동\"@ko .\n\nex:res5_GeneralizationFormulaGuide a ex:LearningResource ;\n    rdfs:label \"개념 일반화 공식 안내판 및 금지어(고유명사 배제) 가이드\"@ko .\n\nex:res5_CritiqueCards a ex:LearningResource ;\n    rdfs:label \"일반화 진술 검증용 점검 카드\"@ko .\n\nex:assess5_GeneralizationQualityRubric a ex:AssessmentMethod ;\n    rdfs:label \"일반화의 깊이·보편성·증거 기반 평가 루브릭\"@ko .\n\n# =================================================================\n# 6단계: 전이하기 (Transfer)\n# =================================================================\n\nex:phase6_Transfer a ex:InquiryPhase ;\n    ex:sequenceNumber 6 ;\n    rdfs:label \"6단계: 전이하기 (Transfer)\"@ko ;\n    rdfs:comment \"도출한 개념적 일반화를 새로운 맥락, 낯선 사례, 실생활 문제, 미래 사회의 도전에 적용하여 문제 해결 능력을 발휘하는 단계.\"@ko ;\n    ex:hasStrategy ex:strat6_GRASPS, ex:strat6_CreativeActionProject, ex:strat6_AnalogicalTransfer, ex:strat6_ClaimSupportQuestion ;\n    ex:hasActivity ex:act6_RealWorldProblemSolving, ex:act6_CreatingAdvocacyProduct ;\n    ex:usesResource ex:res6_AuthenticScenarioBrief, ex:res6_ProductToolkits ;\n    ex:hasAssessment ex:assess6_PerformanceAssessmentGRASPS ;\n    ex:elementaryApplicationCase \"GRASPS 모형을 활용하여, 학생들이 '지역 생태 보전 위원회 자문관'이 되어 학교 주변 숲이나 하천의 생태 교란종(외래종) 확산 문제를 해결하는 주민 안내 가이드북과 조례 제안서를 작성함.\"@ko ;\n    ex:nextPhase ex:phase7_Reflect .\n\n# 전략 & 사고루틴\nex:strat6_GRASPS a ex:TeachingStrategy ;\n    rdfs:label \"GRASPS 참과제 설계 전략\"@ko ;\n    rdfs:comment \"실제적 맥락의 목표(Goal), 역할(Role), 청중(Audience), 상황(Situation), 산출물(Product), 평가기준(Standards)을 부여하여 배운 일반화를 전이하게 하는 수행 과제 설계 기법.\"@ko .\n\nex:strat6_AnalogicalTransfer a ex:TeachingStrategy ;\n    rdfs:label \"유추적 전이 (Analogical Transfer) 전략\"@ko ;\n    rdfs:comment \"자연 생태계에서 발견한 '상호의존성' 원리를 '인간 사회의 경제 시스템'이나 '학급 공동체 규칙' 등 질적으로 다른 맥락에 유추 적용하는 심층 확장 전략.\"@ko .\n\nex:strat6_CreativeActionProject a ex:TeachingStrategy ;\n    rdfs:label \"행동 실천 프로젝트 (Action Project)\"@ko ;\n    rdfs:comment \"배움이 교실에 머물지 않고 학교나 지역사회의 실질적인 변화를 이끌어내는 캠페인, 전시, 청원 등의 사회 참여 실천 전략.\"@ko .\n\nex:strat6_ClaimSupportQuestion a ex:ThinkingRoutine ;\n    rdfs:label \"주·근·질 (Claim, Support, Question) 루틴\"@ko ;\n    rdfs:comment \"새로운 문제 상황에 대한 자신의 해결 주장(Claim)을 펼치고, 일반화에서 얻은 근거(Support)를 제시하며, 남겨진 심층 질문(Question)을 식별하는 루틴.\"@ko .\n\n# 활동, 자원, 평가\nex:act6_RealWorldProblemSolving a ex:LearningActivity ;\n    rdfs:label \"실제 삶의 문제 해결안 기획 및 프로토타입 제작 활동\"@ko .\n\nex:act6_CreatingAdvocacyProduct a ex:LearningActivity ;\n    rdfs:label \"공공 캠페인 카드뉴스/인포그래픽/제안서 제작 활동\"@ko .\n\nex:res6_AuthenticScenarioBrief a ex:LearningResource ;\n    rdfs:label \"실제성 높은 시나리오 과제 안내서(GRASPS Brief)\"@ko .\n\nex:res6_ProductToolkits a ex:LearningResource ;\n    rdfs:label \"산출물 제작용 멀티미디어/메이커 도구 키트\"@ko .\n\nex:assess6_PerformanceAssessmentGRASPS a ex:AssessmentMethod ;\n    rdfs:label \"GRASPS 기반 참수행평가 채점 기준표(Rubric)\"@ko .\n\n# =================================================================\n# 7단계: 성찰하기 (Reflect)\n# =================================================================\n\nex:phase7_Reflect a ex:InquiryPhase ;\n    ex:sequenceNumber 7 ;\n    rdfs:label \"7단계: 성찰하기 (Reflect)\"@ko ;\n    rdfs:comment \"자신의 사고 변화, 탐구 과정, 협업 태도를 메타인지적으로 돌아보고, 남겨진 질문을 통해 새로운 탐구로 연결하는 단계.\"@ko ;\n    ex:hasStrategy ex:strat7_IUsedToThinkNowIThink, ex:strat7_321Bridge, ex:strat7_CompassPoints, ex:strat7_MetacognitiveJournal ;\n    ex:hasActivity ex:act7_SelfAssessmentPortfolio, ex:act7_NextInquiryPledging ;\n    ex:usesResource ex:res7_MetacognitiveReflectSheet, ex:res7_LearningJourneyMap ;\n    ex:hasAssessment ex:assess7_MetacognitiveSelfEvaluation ;\n    ex:elementaryApplicationCase \"'예전에는 ~라고 생각했지만, 지금은 ~라고 생각한다' 루틴을 작성하며 생태계와 인간의 관계에 대한 인식 전환을 기록하고, 앞으로 실천할 환경 지킴이 다짐을 배움 포트폴리오에 정리함.\"@ko .\n\n# 전략 & 사고루틴\nex:strat7_IUsedToThinkNowIThink a ex:ThinkingRoutine ;\n    rdfs:label \"예전에는-지금은 (I used to think..., Now I think...) 루틴\"@ko ;\n    rdfs:comment \"탐구 전 자신의 선입견이나 좁은 생각과 탐구 후 확장된 개념적 이해를 직접 비교하며 인지적 성장을 체감하는 성찰 루틴.\"@ko .\n\nex:strat7_321Bridge a ex:ThinkingRoutine ;\n    rdfs:label \"3-2-1 다리놓기 (3-2-1 Bridge) 루틴\"@ko ;\n    rdfs:comment \"탐구 전과 후에 각각 '3가지 생각, 2가지 질문, 1가지 비유'를 작성하고 두 지점을 다리로 연결하여 배움의 궤적을 성찰하는 루틴.\"@ko .\n\nex:strat7_CompassPoints a ex:ThinkingRoutine ;\n    rdfs:label \"나침반 (Compass Points - E, W, N, S) 루틴\"@ko ;\n    rdfs:comment \"동(Excited - 기대되는 점), 서(Worrisome - 우려되는 점), 북(Need to know - 더 알아야 할 점), 남(Stance/Suggestion - 나의 입장/제안)을 나침반 4방위로 성찰하는 도구.\"@ko .\n\nex:strat7_MetacognitiveJournal a ex:TeachingStrategy ;\n    rdfs:label \"메타인지 학습 일지 및 배움 여정 지도 (Learning Journey Map)\"@ko ;\n    rdfs:comment \"전체 7단계 탐구 과정을 되짚어보며 어느 순간 가장 큰 통찰을 얻었는지 시각적으로 회고하는 자기주도적 성찰 기법.\"@ko .\n\n# 활동, 자원, 평가\nex:act7_SelfAssessmentPortfolio a ex:LearningActivity ;\n    rdfs:label \"배움 여정 포트폴리오 및 메타인지 성찰문 작성 활동\"@ko .\n\nex:act7_NextInquiryPledging a ex:LearningActivity ;\n    rdfs:label \"후속 탐구 질문 생성 및 실천 다짐 선언 활동\"@ko .\n\nex:res7_MetacognitiveReflectSheet a ex:LearningResource ;\n    rdfs:label \"메타인지 성찰 기록지 및 성장 점검표\"@ko .\n\nex:res7_LearningJourneyMap a ex:LearningResource ;\n    rdfs:label \"배움 여정 로드맵 양식\"@ko .\n\nex:assess7_MetacognitiveSelfEvaluation a ex:AssessmentMethod ;\n    rdfs:label \"자기성찰 및 동료 다면 평가(Self & Peer Assessment)\"@ko .",
  "과학과.ttl": "@prefix ex:   <https://example.org/curriculum/science#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:ScienceCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 과학과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 과학과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:Science a ex:Subject ;\n    rdfs:label \"과학\"@ko ;\n    ex:description \"자연 현상에 대한 호기심을 바탕으로 과학적 소양을 기르고 탐구 능력을 함양하는 교과\"@ko ;\n    ex:hasArea ex:MovementEnergy, ex:MatterMatterChange, ex:LifeEcosystem, ex:EarthSpace .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"과학적 사고력\"@ko ;\n    ex:description \"과학적 지식과 증거를 바탕으로 논리적이고 합리적으로 사고하는 역량\"@ko .\nex:Science ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"과학적 탐구 능력\"@ko ;\n    ex:description \"자연 현상에 대해 문제를 제기하고 가설을 검증하며 실험을 수행하는 역량\"@ko .\nex:Science ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"과학적 문제 해결력\"@ko ;\n    ex:description \"과학적 지식과 과학기술을 활용하여 실생활 문제를 창의적으로 해결하는 역량\"@ko .\nex:Science ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"과학적 의사소통 능력\"@ko ;\n    ex:description \"과학적 탐구 결과와 주장을 타당한 근거와 함께 표현하고 소통하는 역량\"@ko .\nex:Science ex:developsCompetency ex:Comp_4 .\nex:Comp_5 a ex:Competency ;\n    rdfs:label \"과학적 참여와 평생 학습 능력\"@ko ;\n    ex:description \"과학기술의 사회적 영향력을 이해하고 사회적 문제 해결에 참여하는 역량\"@ko .\nex:Science ex:developsCompetency ex:Comp_5 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 운동과 에너지\nex:MovementEnergy a ex:LearningArea ;\n    rdfs:label \"운동과 에너지\"@ko .\nex:MovementEnergy_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"운동과 에너지 핵심 아이디어 1\"@ko ;\n    ex:description \"물체의 운동은 힘의 작용에 의해 변하며 위치와 속력으로 기술된다.\"@ko .\nex:MovementEnergy ex:hasCoreIdea ex:MovementEnergy_CoreIdea_1 .\nex:MovementEnergy_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"물체의 무게와 힘\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Elem_1_1 .\nex:MovementEnergy_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"속력과 운동\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Elem_1_2 .\nex:MovementEnergy_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"도구와 기계\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Elem_1_3 .\nex:MovementEnergy_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"운동과 에너지 핵심 아이디어 2\"@ko ;\n    ex:description \"빛, 소리, 열, 전기는 에너지의 형태로서 다양한 현상을 일으키고 변환된다.\"@ko .\nex:MovementEnergy ex:hasCoreIdea ex:MovementEnergy_CoreIdea_2 .\nex:MovementEnergy_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"빛의 굴절과 반사\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Elem_2_1 .\nex:MovementEnergy_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"소리의 성질\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Elem_2_2 .\nex:MovementEnergy_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"온도와 열의 이동\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Elem_2_3 .\nex:MovementEnergy_Elem_2_4 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"전기 회로\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Elem_2_4 .\nex:MovementEnergy_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"실험 기구 조작하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Skill_1 .\nex:MovementEnergy_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"힘과 운동 측정하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Skill_2 .\nex:MovementEnergy_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"변인 통제 실험 수행하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MovementEnergy ex:hasContentElement ex:MovementEnergy_Skill_3 .\n\n# [영역] 물질\nex:MatterMatterChange a ex:LearningArea ;\n    rdfs:label \"물질\"@ko .\nex:MatterMatterChange_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"물질 핵심 아이디어 1\"@ko ;\n    ex:description \"물질은 고유한 성질을 가지며 고체, 액체, 기체의 상태로 존재한다.\"@ko .\nex:MatterMatterChange ex:hasCoreIdea ex:MatterMatterChange_CoreIdea_1 .\nex:MatterMatterChange_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"물질의 성질\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Elem_1_1 .\nex:MatterMatterChange_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"물질의 상태 변화\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Elem_1_2 .\nex:MatterMatterChange_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"기체의 부피와 압력\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Elem_1_3 .\nex:MatterMatterChange_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"물질 핵심 아이디어 2\"@ko ;\n    ex:description \"물질의 혼합과 분리는 물질의 성질 차이를 이용하며, 화학 반응을 통해 새로운 물질이 생성된다.\"@ko .\nex:MatterMatterChange ex:hasCoreIdea ex:MatterMatterChange_CoreIdea_2 .\nex:MatterMatterChange_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"혼합물의 분리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Elem_2_1 .\nex:MatterMatterChange_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"용해와 용액\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Elem_2_2 .\nex:MatterMatterChange_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"산과 염기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Elem_2_3 .\nex:MatterMatterChange_Elem_2_4 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"연소와 소화\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Elem_2_4 .\nex:MatterMatterChange_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"물질의 특성 관찰하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Skill_1 .\nex:MatterMatterChange_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"혼합물 분리 실험하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Skill_2 .\nex:MatterMatterChange_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"용액의 진하기 비교하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MatterMatterChange ex:hasContentElement ex:MatterMatterChange_Skill_3 .\n\n# [영역] 생명\nex:LifeEcosystem a ex:LearningArea ;\n    rdfs:label \"생명\"@ko .\nex:LifeEcosystem_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"생명 핵심 아이디어 1\"@ko ;\n    ex:description \"생물은 세포와 기관으로 구성되며 환경에 적응하며 살아간다.\"@ko .\nex:LifeEcosystem ex:hasCoreIdea ex:LifeEcosystem_CoreIdea_1 .\nex:LifeEcosystem_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"동물의 생활\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeEcosystem ex:hasContentElement ex:LifeEcosystem_Elem_1_1 .\nex:LifeEcosystem_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"식물의 구조와 기능\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeEcosystem ex:hasContentElement ex:LifeEcosystem_Elem_1_2 .\nex:LifeEcosystem_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"균류·세균·원생생물\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeEcosystem ex:hasContentElement ex:LifeEcosystem_Elem_1_3 .\nex:LifeEcosystem_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"생명 핵심 아이디어 2\"@ko ;\n    ex:description \"생태계는 생물과 환경의 상호작용으로 유지되며 생물 다양성은 보존되어야 한다.\"@ko .\nex:LifeEcosystem ex:hasCoreIdea ex:LifeEcosystem_CoreIdea_2 .\nex:LifeEcosystem_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"생물과 환경\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeEcosystem ex:hasContentElement ex:LifeEcosystem_Elem_2_1 .\nex:LifeEcosystem_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"먹이 그물\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeEcosystem ex:hasContentElement ex:LifeEcosystem_Elem_2_2 .\nex:LifeEcosystem_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"생태계 평형과 보전\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeEcosystem ex:hasContentElement ex:LifeEcosystem_Elem_2_3 .\nex:LifeEcosystem_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"현미경 관찰하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeEcosystem ex:hasContentElement ex:LifeEcosystem_Skill_1 .\nex:LifeEcosystem_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"생물의 한살이 기록하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeEcosystem ex:hasContentElement ex:LifeEcosystem_Skill_2 .\nex:LifeEcosystem_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"생태계 모형 설계하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeEcosystem ex:hasContentElement ex:LifeEcosystem_Skill_3 .\n\n# [영역] 지구와 우주\nex:EarthSpace a ex:LearningArea ;\n    rdfs:label \"지구와 우주\"@ko .\nex:EarthSpace_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"지구와 우주 핵심 아이디어 1\"@ko ;\n    ex:description \"지구는 지표, 대기, 해양으로 이루어져 있으며 끊임없이 변화한다.\"@ko .\nex:EarthSpace ex:hasCoreIdea ex:EarthSpace_CoreIdea_1 .\nex:EarthSpace_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"지층과 화석\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EarthSpace ex:hasContentElement ex:EarthSpace_Elem_1_1 .\nex:EarthSpace_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"화산과 지진\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EarthSpace ex:hasContentElement ex:EarthSpace_Elem_1_2 .\nex:EarthSpace_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"날씨와 계절의 변화\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EarthSpace ex:hasContentElement ex:EarthSpace_Elem_1_3 .\nex:EarthSpace_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"지구와 우주 핵심 아이디어 2\"@ko ;\n    ex:description \"지구와 달의 운동은 다양한 천체 현상을 만들어내며 태양계는 거대한 시스템을 이룬다.\"@ko .\nex:EarthSpace ex:hasCoreIdea ex:EarthSpace_CoreIdea_2 .\nex:EarthSpace_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"지구의 자전과 공전\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EarthSpace ex:hasContentElement ex:EarthSpace_Elem_2_1 .\nex:EarthSpace_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"달의 모양 변화\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EarthSpace ex:hasContentElement ex:EarthSpace_Elem_2_2 .\nex:EarthSpace_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"태양계의 행성 탐사\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EarthSpace ex:hasContentElement ex:EarthSpace_Elem_2_3 .\nex:EarthSpace_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"지층 모형 만들기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EarthSpace ex:hasContentElement ex:EarthSpace_Skill_1 .\nex:EarthSpace_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"날씨 관측 및 일기도 해석하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EarthSpace ex:hasContentElement ex:EarthSpace_Skill_2 .\nex:EarthSpace_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"천체 관측 및 모델링하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EarthSpace ex:hasContentElement ex:EarthSpace_Skill_3 .\n",
  "국어과.ttl": "@prefix ex:   <https://example.org/curriculum/korean#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:KoreanCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 국어과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 국어과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:Korean a ex:Subject ;\n    rdfs:label \"국어\"@ko ;\n    ex:description \"국어로 이루어지는 다양한 담화와 글을 비판적이고 창의적으로 수용·생산하며 국어 발전에 기여하는 능력을 기르는 교과\"@ko ;\n    ex:hasArea ex:ListeningSpeaking, ex:Reading, ex:Writing, ex:GrammarLiteracy, ex:Literature, ex:Media .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"비판적·창의적 사고 역량\"@ko ;\n    ex:description \"다양한 상황이나 자료 등에서 적절하고 가치 있는 정보를 추출하고 비판적이고 창의적으로 판단·종합하는 역량\"@ko .\nex:Korean ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"디지털·미디어 역량\"@ko ;\n    ex:description \"다양한 디지털 매체를 활용하여 정보를 수집, 분석, 평가하고 매체 자료를 생산·소통하는 역량\"@ko .\nex:Korean ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"의사소통 역량\"@ko ;\n    ex:description \"음성언어, 문자언어, 매체 등을 통해 다른 사람과 원활하게 생각과 감정을 나누는 역량\"@ko .\nex:Korean ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"공동체·대인 관계 역량\"@ko ;\n    ex:description \"공동체 구성원으로서 배려와 협동의 태도를 지니고 소통하고 연대하는 역량\"@ko .\nex:Korean ex:developsCompetency ex:Comp_4 .\nex:Comp_5 a ex:Competency ;\n    rdfs:label \"문화 향유 역량\"@ko ;\n    ex:description \"국어 문학 및 언어문화를 향유하며 심미적 감수성을 계발하고 자아를 형성하는 역량\"@ko .\nex:Korean ex:developsCompetency ex:Comp_5 .\nex:Comp_6 a ex:Competency ;\n    rdfs:label \"자기성찰·계발 역량\"@ko ;\n    ex:description \"자신의 언어생활과 학습 과정을 점검·조절하며 자율적으로 학습하고 실천하는 역량\"@ko .\nex:Korean ex:developsCompetency ex:Comp_6 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 듣기·말하기\nex:ListeningSpeaking a ex:LearningArea ;\n    rdfs:label \"듣기·말하기\"@ko .\nex:ListeningSpeaking_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"듣기·말하기 핵심 아이디어 1\"@ko ;\n    ex:description \"듣기·말하기는 화자와 청자가 구어 및 매체 자료를 매개로 상호작용하며 의미를 구성하는 과정이다.\"@ko .\nex:ListeningSpeaking ex:hasCoreIdea ex:ListeningSpeaking_CoreIdea_1 .\nex:ListeningSpeaking_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"담화의 본질\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Elem_1_1 .\nex:ListeningSpeaking_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"맥락 고려\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Elem_1_2 .\nex:ListeningSpeaking_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"공감적 대화\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Elem_1_3 .\nex:ListeningSpeaking_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"듣기·말하기 핵심 아이디어 2\"@ko ;\n    ex:description \"상황과 목적에 맞는 적절한 언어적·비언어적 전략을 활용하여 원활하게 소통한다.\"@ko .\nex:ListeningSpeaking ex:hasCoreIdea ex:ListeningSpeaking_CoreIdea_2 .\nex:ListeningSpeaking_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"경청과 반응\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Elem_2_1 .\nex:ListeningSpeaking_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"발표와 토의\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Elem_2_2 .\nex:ListeningSpeaking_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"갈등 조정\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Elem_2_3 .\nex:ListeningSpeaking_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"상황 파악하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Skill_1 .\nex:ListeningSpeaking_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"내용 생성하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Skill_2 .\nex:ListeningSpeaking_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"조직·표현하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Skill_3 .\nex:ListeningSpeaking_Skill_4 a ex:ProcessSkill ;\n    rdfs:label \"경청하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Skill_4 .\nex:ListeningSpeaking_Skill_5 a ex:ProcessSkill ;\n    rdfs:label \"상호작용하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Skill_5 .\nex:ListeningSpeaking_Skill_6 a ex:ProcessSkill ;\n    rdfs:label \"점검·조정하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ListeningSpeaking ex:hasContentElement ex:ListeningSpeaking_Skill_6 .\n\n# [영역] 읽기\nex:Reading a ex:LearningArea ;\n    rdfs:label \"읽기\"@ko .\nex:Reading_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"읽기 핵심 아이디어 1\"@ko ;\n    ex:description \"읽기는 독자가 배경지식을 활용하여 텍스트의 의미를 구성하고 비판적으로 수용하는 과정이다.\"@ko .\nex:Reading ex:hasCoreIdea ex:Reading_CoreIdea_1 .\nex:Reading_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"글의 구조 파악\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Elem_1_1 .\nex:Reading_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"중심 생각 찾기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Elem_1_2 .\nex:Reading_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"사실과 의견 구별\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Elem_1_3 .\nex:Reading_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"읽기 핵심 아이디어 2\"@ko ;\n    ex:description \"다양한 매체와 형식의 글을 능동적으로 읽으며 지식과 정서를 풍부하게 확장한다.\"@ko .\nex:Reading ex:hasCoreIdea ex:Reading_CoreIdea_2 .\nex:Reading_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"다양한 목적의 독서\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Elem_2_1 .\nex:Reading_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"독서 습관 형성\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Elem_2_2 .\nex:Reading_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"비판적 독해\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Elem_2_3 .\nex:Reading_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"글자·낱말 인지하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Skill_1 .\nex:Reading_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"내용 확인하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Skill_2 .\nex:Reading_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"추론하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Skill_3 .\nex:Reading_Skill_4 a ex:ProcessSkill ;\n    rdfs:label \"비판하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Skill_4 .\nex:Reading_Skill_5 a ex:ProcessSkill ;\n    rdfs:label \"감상하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Skill_5 .\nex:Reading_Skill_6 a ex:ProcessSkill ;\n    rdfs:label \"독서 과정 점검하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Reading ex:hasContentElement ex:Reading_Skill_6 .\n\n# [영역] 쓰기\nex:Writing a ex:LearningArea ;\n    rdfs:label \"쓰기\"@ko .\nex:Writing_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"쓰기 핵심 아이디어 1\"@ko ;\n    ex:description \"쓰기는 독자와 상호작용하며 의미를 문자 및 다양한 매체로 표현하는 과정이다.\"@ko .\nex:Writing ex:hasCoreIdea ex:Writing_CoreIdea_1 .\nex:Writing_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"주제 설정\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Elem_1_1 .\nex:Writing_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자료 수집·선별\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Elem_1_2 .\nex:Writing_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"내용 조직 및 초고 작성\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Elem_1_3 .\nex:Writing_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"쓰기 핵심 아이디어 2\"@ko ;\n    ex:description \"글쓰기 윤리를 준수하며 책임감 있게 자신의 생각과 감정을 표현한다.\"@ko .\nex:Writing ex:hasCoreIdea ex:Writing_CoreIdea_2 .\nex:Writing_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"고쳐쓰기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Elem_2_1 .\nex:Writing_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"공유 및 피드백\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Elem_2_2 .\nex:Writing_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"저작권 준수\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Elem_2_3 .\nex:Writing_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"아이디어 착상하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Skill_1 .\nex:Writing_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"자료 탐색하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Skill_2 .\nex:Writing_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"조직하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Skill_3 .\nex:Writing_Skill_4 a ex:ProcessSkill ;\n    rdfs:label \"초고 쓰기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Skill_4 .\nex:Writing_Skill_5 a ex:ProcessSkill ;\n    rdfs:label \"고쳐쓰기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Skill_5 .\nex:Writing_Skill_6 a ex:ProcessSkill ;\n    rdfs:label \"독자와 소통하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Writing ex:hasContentElement ex:Writing_Skill_6 .\n\n# [영역] 문법\nex:GrammarLiteracy a ex:LearningArea ;\n    rdfs:label \"문법\"@ko .\nex:GrammarLiteracy_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"문법 핵심 아이디어 1\"@ko ;\n    ex:description \"국어는 음운, 단어, 문장, 담화의 규칙적인 체계로 구성되어 있다.\"@ko .\nex:GrammarLiteracy ex:hasCoreIdea ex:GrammarLiteracy_CoreIdea_1 .\nex:GrammarLiteracy_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"낱말 형성\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Elem_1_1 .\nex:GrammarLiteracy_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"문장 성분\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Elem_1_2 .\nex:GrammarLiteracy_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"올바른 발음과 표기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Elem_1_3 .\nex:GrammarLiteracy_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"문법 핵심 아이디어 2\"@ko ;\n    ex:description \"국어의 가치를 인식하고 올바른 언어 예절을 지키며 국어생활을 영위한다.\"@ko .\nex:GrammarLiteracy ex:hasCoreIdea ex:GrammarLiteracy_CoreIdea_2 .\nex:GrammarLiteracy_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"언어 예절\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Elem_2_1 .\nex:GrammarLiteracy_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"한글의 창제 원리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Elem_2_2 .\nex:GrammarLiteracy_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"국어 생활 성찰\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Elem_2_3 .\nex:GrammarLiteracy_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"언어 현상 관찰하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Skill_1 .\nex:GrammarLiteracy_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"규칙 탐구하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Skill_2 .\nex:GrammarLiteracy_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"적용하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Skill_3 .\nex:GrammarLiteracy_Skill_4 a ex:ProcessSkill ;\n    rdfs:label \"언어생활 점검하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GrammarLiteracy ex:hasContentElement ex:GrammarLiteracy_Skill_4 .\n\n# [영역] 문학\nex:Literature a ex:LearningArea ;\n    rdfs:label \"문학\"@ko .\nex:Literature_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"문학 핵심 아이디어 1\"@ko ;\n    ex:description \"문학은 인간의 삶과 세계를 언어로 형상화한 예술적 산물이다.\"@ko .\nex:Literature ex:hasCoreIdea ex:Literature_CoreIdea_1 .\nex:Literature_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"시·이야기·극의 특성\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Elem_1_1 .\nex:Literature_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"인물의 마음 파악\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Elem_1_2 .\nex:Literature_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"문학적 표현의 아름다움\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Elem_1_3 .\nex:Literature_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"문학 핵심 아이디어 2\"@ko ;\n    ex:description \"문학 작품을 감상하고 창의적으로 재구성하며 심미적 감수성과 인간에 대한 이해를 높인다.\"@ko .\nex:Literature ex:hasCoreIdea ex:Literature_CoreIdea_2 .\nex:Literature_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"작품 감상\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Elem_2_1 .\nex:Literature_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"모방 및 재창작\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Elem_2_2 .\nex:Literature_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"문학 나눔\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Elem_2_3 .\nex:Literature_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"작품 수용하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Skill_1 .\nex:Literature_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"인물·사건 분석하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Skill_2 .\nex:Literature_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"심미적 체험하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Skill_3 .\nex:Literature_Skill_4 a ex:ProcessSkill ;\n    rdfs:label \"재구성 및 창작하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Skill_4 .\nex:Literature_Skill_5 a ex:ProcessSkill ;\n    rdfs:label \"가치 평가하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Literature ex:hasContentElement ex:Literature_Skill_5 .\n\n# [영역] 매체\nex:Media a ex:LearningArea ;\n    rdfs:label \"매체\"@ko .\nex:Media_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"매체 핵심 아이디어 1\"@ko ;\n    ex:description \"매체 언어는 문자, 음성, 이미지, 영상 등이 복합된 다면적 의사소통 양식이다.\"@ko .\nex:Media ex:hasCoreIdea ex:Media_CoreIdea_1 .\nex:Media_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"복합양식성\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Elem_1_1 .\nex:Media_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"매체 자료의 비판적 수용\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Elem_1_2 .\nex:Media_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"디지털 매체 윤리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Elem_1_3 .\nex:Media_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"매체 핵심 아이디어 2\"@ko ;\n    ex:description \"디지털 환경에서 목적에 맞게 매체 자료를 생산하고 책임감 있게 공유한다.\"@ko .\nex:Media ex:hasCoreIdea ex:Media_CoreIdea_2 .\nex:Media_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"매체 제작 도구 활용\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Elem_2_1 .\nex:Media_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"정보 공유와 소통\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Elem_2_2 .\nex:Media_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"디지털 시민성\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Elem_2_3 .\nex:Media_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"매체 자료 탐색하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Skill_1 .\nex:Media_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"정보의 신뢰성 판별하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Skill_2 .\nex:Media_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"매체 언어 제작하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Skill_3 .\nex:Media_Skill_4 a ex:ProcessSkill ;\n    rdfs:label \"상호작용 및 공유하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:Media ex:hasContentElement ex:Media_Skill_4 .\n",
  "도덕과.ttl": "@prefix ex:   <https://example.org/curriculum/ethics#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:EthicsCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 도덕과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 도덕과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:Ethics a ex:Subject ;\n    rdfs:label \"도덕\"@ko ;\n    ex:description \"도덕적 탐구와 성찰을 통해 올바른 도덕적 판단력과 실천 역량을 길러 바람직한 인격을 형성하는 교과\"@ko ;\n    ex:hasArea ex:SelfRelation, ex:OthersRelation, ex:SocietyRelation, ex:NatureUniverseRelation .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"도덕적 사고 역량\"@ko ;\n    ex:description \"도덕적 쟁점과 가치를 비판적·합리적으로 탐구하고 판단하는 역량\"@ko .\nex:Ethics ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"도덕적 정서 역량\"@ko ;\n    ex:description \"도덕적 정서를 바탕으로 타인과 공감하고 윤리적 민감성을 발휘하는 역량\"@ko .\nex:Ethics ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"도덕적 공동체 역량\"@ko ;\n    ex:description \"민주시민으로서 공동체의 규범과 정의를 존중하고 협력하는 역량\"@ko .\nex:Ethics ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"도덕적 자아 정체성 역량\"@ko ;\n    ex:description \"도덕적 신념과 가치에 따라 삶을 성찰하고 자기주도적으로 실천하는 역량\"@ko .\nex:Ethics ex:developsCompetency ex:Comp_4 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 자신과의 관계\nex:SelfRelation a ex:LearningArea ;\n    rdfs:label \"자신과의 관계\"@ko .\nex:SelfRelation_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"자신과의 관계 핵심 아이디어 1\"@ko ;\n    ex:description \"인간은 자신의 삶을 주체적으로 이끌어가는 도덕적 존재이다.\"@ko .\nex:SelfRelation ex:hasCoreIdea ex:SelfRelation_CoreIdea_1 .\nex:SelfRelation_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"정직과 성실\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SelfRelation ex:hasContentElement ex:SelfRelation_Elem_1_1 .\nex:SelfRelation_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자율과 자존감\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SelfRelation ex:hasContentElement ex:SelfRelation_Elem_1_2 .\nex:SelfRelation_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"생명 존중\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SelfRelation ex:hasContentElement ex:SelfRelation_Elem_1_3 .\nex:SelfRelation_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"자신과의 관계 핵심 아이디어 2\"@ko ;\n    ex:description \"자기 성찰을 통해 내면을 단련하고 바람직한 생활 습관을 형성한다.\"@ko .\nex:SelfRelation ex:hasCoreIdea ex:SelfRelation_CoreIdea_2 .\nex:SelfRelation_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"감정 조절\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SelfRelation ex:hasContentElement ex:SelfRelation_Elem_2_1 .\nex:SelfRelation_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"도덕적 자아상\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SelfRelation ex:hasContentElement ex:SelfRelation_Elem_2_2 .\nex:SelfRelation_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"시간과 습관 관리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SelfRelation ex:hasContentElement ex:SelfRelation_Elem_2_3 .\nex:SelfRelation_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"도덕적 자기성찰하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SelfRelation ex:hasContentElement ex:SelfRelation_Skill_1 .\nex:SelfRelation_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"감정 조절하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SelfRelation ex:hasContentElement ex:SelfRelation_Skill_2 .\nex:SelfRelation_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"올바른 습관 실천하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SelfRelation ex:hasContentElement ex:SelfRelation_Skill_3 .\n\n# [영역] 타인과의 관계\nex:OthersRelation a ex:LearningArea ;\n    rdfs:label \"타인과의 관계\"@ko .\nex:OthersRelation_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"타인과의 관계 핵심 아이디어 1\"@ko ;\n    ex:description \"타인은 상호존중과 배려 속에서 함께 살아가는 관계이다.\"@ko .\nex:OthersRelation ex:hasCoreIdea ex:OthersRelation_CoreIdea_1 .\nex:OthersRelation_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"배려와 공감\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:OthersRelation ex:hasContentElement ex:OthersRelation_Elem_1_1 .\nex:OthersRelation_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"예절과 소통\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:OthersRelation ex:hasContentElement ex:OthersRelation_Elem_1_2 .\nex:OthersRelation_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"친구 간의 우정\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:OthersRelation ex:hasContentElement ex:OthersRelation_Elem_1_3 .\nex:OthersRelation_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"타인과의 관계 핵심 아이디어 2\"@ko ;\n    ex:description \"갈등 상황에서 평화적 대화와 협력을 통해 상생을 도모한다.\"@ko .\nex:OthersRelation ex:hasCoreIdea ex:OthersRelation_CoreIdea_2 .\nex:OthersRelation_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"갈등 해결\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:OthersRelation ex:hasContentElement ex:OthersRelation_Elem_2_1 .\nex:OthersRelation_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"사이버 예절\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:OthersRelation ex:hasContentElement ex:OthersRelation_Elem_2_2 .\nex:OthersRelation_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"역지사지 실천\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:OthersRelation ex:hasContentElement ex:OthersRelation_Elem_2_3 .\nex:OthersRelation_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"공감하고 경청하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:OthersRelation ex:hasContentElement ex:OthersRelation_Skill_1 .\nex:OthersRelation_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"입장 바꿔 생각하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:OthersRelation ex:hasContentElement ex:OthersRelation_Skill_2 .\nex:OthersRelation_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"비폭력적 갈등 해결하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:OthersRelation ex:hasContentElement ex:OthersRelation_Skill_3 .\n\n# [영역] 사회·공동체와의 관계\nex:SocietyRelation a ex:LearningArea ;\n    rdfs:label \"사회·공동체와의 관계\"@ko .\nex:SocietyRelation_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"사회·공동체와의 관계 핵심 아이디어 1\"@ko ;\n    ex:description \"공동체는 공정과 정의, 연대를 바탕으로 유지된다.\"@ko .\nex:SocietyRelation ex:hasCoreIdea ex:SocietyRelation_CoreIdea_1 .\nex:SocietyRelation_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"준법과 규칙\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyRelation ex:hasContentElement ex:SocietyRelation_Elem_1_1 .\nex:SocietyRelation_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"공정성과 인권\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyRelation ex:hasContentElement ex:SocietyRelation_Elem_1_2 .\nex:SocietyRelation_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"민주적 의사결정\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyRelation ex:hasContentElement ex:SocietyRelation_Elem_1_3 .\nex:SocietyRelation_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"사회·공동체와의 관계 핵심 아이디어 2\"@ko ;\n    ex:description \"다양성을 존중하고 약자를 배려하며 따뜻한 사회를 만드는 데 기여한다.\"@ko .\nex:SocietyRelation ex:hasCoreIdea ex:SocietyRelation_CoreIdea_2 .\nex:SocietyRelation_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"문화 다양성\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyRelation ex:hasContentElement ex:SocietyRelation_Elem_2_1 .\nex:SocietyRelation_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"소외 계층 배려\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyRelation ex:hasContentElement ex:SocietyRelation_Elem_2_2 .\nex:SocietyRelation_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"연대와 협력\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyRelation ex:hasContentElement ex:SocietyRelation_Elem_2_3 .\nex:SocietyRelation_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"규칙 준수하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyRelation ex:hasContentElement ex:SocietyRelation_Skill_1 .\nex:SocietyRelation_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"인권 존중하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyRelation ex:hasContentElement ex:SocietyRelation_Skill_2 .\nex:SocietyRelation_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"공동체 문제 참여하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyRelation ex:hasContentElement ex:SocietyRelation_Skill_3 .\n\n# [영역] 자연·초월과의 관계\nex:NatureUniverseRelation a ex:LearningArea ;\n    rdfs:label \"자연·초월과의 관계\"@ko .\nex:NatureUniverseRelation_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"자연·초월과의 관계 핵심 아이디어 1\"@ko ;\n    ex:description \"인간과 자연은 생명공동체로서 유기적 조화를 이룬다.\"@ko .\nex:NatureUniverseRelation ex:hasCoreIdea ex:NatureUniverseRelation_CoreIdea_1 .\nex:NatureUniverseRelation_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"환경 보호\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureUniverseRelation ex:hasContentElement ex:NatureUniverseRelation_Elem_1_1 .\nex:NatureUniverseRelation_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"생태 감수성\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureUniverseRelation ex:hasContentElement ex:NatureUniverseRelation_Elem_1_2 .\nex:NatureUniverseRelation_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"지속가능한 삶\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureUniverseRelation ex:hasContentElement ex:NatureUniverseRelation_Elem_1_3 .\nex:NatureUniverseRelation_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"자연·초월과의 관계 핵심 아이디어 2\"@ko ;\n    ex:description \"삶의 의미와 생명의 소중함을 깊이 인식하고 숭고함을 느낀다.\"@ko .\nex:NatureUniverseRelation ex:hasCoreIdea ex:NatureUniverseRelation_CoreIdea_2 .\nex:NatureUniverseRelation_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"평화 애호\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureUniverseRelation ex:hasContentElement ex:NatureUniverseRelation_Elem_2_1 .\nex:NatureUniverseRelation_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"삶의 유한성과 감사\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureUniverseRelation ex:hasContentElement ex:NatureUniverseRelation_Elem_2_2 .\nex:NatureUniverseRelation_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"통일과 인류애\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureUniverseRelation ex:hasContentElement ex:NatureUniverseRelation_Elem_2_3 .\nex:NatureUniverseRelation_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"생태 감수성 기르기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureUniverseRelation ex:hasContentElement ex:NatureUniverseRelation_Skill_1 .\nex:NatureUniverseRelation_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"환경 친화적 실천하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureUniverseRelation ex:hasContentElement ex:NatureUniverseRelation_Skill_2 .\nex:NatureUniverseRelation_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"삶의 의미 탐구하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureUniverseRelation ex:hasContentElement ex:NatureUniverseRelation_Skill_3 .\n",
  "미술과.ttl": "@prefix ex:   <https://example.org/curriculum/art#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:ArtCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 미술과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 미술과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:Art a ex:Subject ;\n    rdfs:label \"미술\"@ko ;\n    ex:description \"시각적 소양과 조형 능력을 바탕으로 창의적으로 표현하고 시각문화를 비판적으로 향유하는 교과\"@ko ;\n    ex:hasArea ex:AestheticExperience, ex:ArtisticExpression, ex:ArtAppreciation .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"심미적 감수성 역량\"@ko ;\n    ex:description \"자연과 시각문화에서 아름다움과 가치를 발견하고 정서적으로 반응하는 역량\"@ko .\nex:Art ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"시각적 소통 역량\"@ko ;\n    ex:description \"이미지와 조형 언어를 활용하여 생각과 느낌을 시각화하고 소통하는 역량\"@ko .\nex:Art ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"창의·융합 능력\"@ko ;\n    ex:description \"자신의 경험과 다양한 재료·매체를 융합하여 독창적인 작품을 창출하는 역량\"@ko .\nex:Art ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"미술 문화 이해 역량\"@ko ;\n    ex:description \"미술 작품의 역사적·문화적 맥락을 이해하고 미술 문화를 존중하는 역량\"@ko .\nex:Art ex:developsCompetency ex:Comp_4 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 체험(미적 감수성 및 시각문화)\nex:AestheticExperience a ex:LearningArea ;\n    rdfs:label \"체험(미적 감수성 및 시각문화)\"@ko .\nex:AestheticExperience_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"체험(미적 감수성 및 시각문화) 핵심 아이디어 1\"@ko ;\n    ex:description \"자연과 일상 속 다양한 시각 대상에서 조형적 요소와 아름다움을 발견한다.\"@ko .\nex:AestheticExperience ex:hasCoreIdea ex:AestheticExperience_CoreIdea_1 .\nex:AestheticExperience_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자연물과 인공물의 특징\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:AestheticExperience ex:hasContentElement ex:AestheticExperience_Elem_1_1 .\nex:AestheticExperience_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"감각적 탐색(색, 형태, 질감)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:AestheticExperience ex:hasContentElement ex:AestheticExperience_Elem_1_2 .\nex:AestheticExperience_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"일상 속 디자인\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:AestheticExperience ex:hasContentElement ex:AestheticExperience_Elem_1_3 .\nex:AestheticExperience_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"체험(미적 감수성 및 시각문화) 핵심 아이디어 2\"@ko ;\n    ex:description \"시각 이미지가 전달하는 다양한 의미와 메시지를 비판적으로 해석한다.\"@ko .\nex:AestheticExperience ex:hasCoreIdea ex:AestheticExperience_CoreIdea_2 .\nex:AestheticExperience_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"시각 기호와 상징\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:AestheticExperience ex:hasContentElement ex:AestheticExperience_Elem_2_1 .\nex:AestheticExperience_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"광고 및 미디어 이미지\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:AestheticExperience ex:hasContentElement ex:AestheticExperience_Elem_2_2 .\nex:AestheticExperience_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"공공 미술의 역할\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:AestheticExperience ex:hasContentElement ex:AestheticExperience_Elem_2_3 .\nex:AestheticExperience_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"오감으로 대상 관찰하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:AestheticExperience ex:hasContentElement ex:AestheticExperience_Skill_1 .\nex:AestheticExperience_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"시각 이미지의 메시지 해석하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:AestheticExperience ex:hasContentElement ex:AestheticExperience_Skill_2 .\nex:AestheticExperience_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"아름다움 사진으로 기록하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:AestheticExperience ex:hasContentElement ex:AestheticExperience_Skill_3 .\n\n# [영역] 표현(조형 및 발상)\nex:ArtisticExpression a ex:LearningArea ;\n    rdfs:label \"표현(조형 및 발상)\"@ko .\nex:ArtisticExpression_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"표현(조형 및 발상) 핵심 아이디어 1\"@ko ;\n    ex:description \"주제에 어울리는 조형 요소와 원리를 탐색하여 창의적인 발상을 구체화한다.\"@ko .\nex:ArtisticExpression ex:hasCoreIdea ex:ArtisticExpression_CoreIdea_1 .\nex:ArtisticExpression_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"점·선·면·형·색의 조화\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtisticExpression ex:hasContentElement ex:ArtisticExpression_Elem_1_1 .\nex:ArtisticExpression_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"균형·대비·동세\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtisticExpression ex:hasContentElement ex:ArtisticExpression_Elem_1_2 .\nex:ArtisticExpression_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"아이디어 발상 기법\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtisticExpression ex:hasContentElement ex:ArtisticExpression_Elem_1_3 .\nex:ArtisticExpression_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"표현(조형 및 발상) 핵심 아이디어 2\"@ko ;\n    ex:description \"다양한 재료, 용구, 디지털 매체의 특성을 이해하고 효과적으로 다루어 표현한다.\"@ko .\nex:ArtisticExpression ex:hasCoreIdea ex:ArtisticExpression_CoreIdea_2 .\nex:ArtisticExpression_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"회화·판화·조소·공예\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtisticExpression ex:hasContentElement ex:ArtisticExpression_Elem_2_1 .\nex:ArtisticExpression_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"새활용(업사이클링) 미술\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtisticExpression ex:hasContentElement ex:ArtisticExpression_Elem_2_2 .\nex:ArtisticExpression_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"디지털 드로잉과 애니메이션\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtisticExpression ex:hasContentElement ex:ArtisticExpression_Elem_2_3 .\nex:ArtisticExpression_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"발상 스케치하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtisticExpression ex:hasContentElement ex:ArtisticExpression_Skill_1 .\nex:ArtisticExpression_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"재료와 도구 안전하게 다루기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtisticExpression ex:hasContentElement ex:ArtisticExpression_Skill_2 .\nex:ArtisticExpression_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"다양한 조형 기법으로 제작하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtisticExpression ex:hasContentElement ex:ArtisticExpression_Skill_3 .\n\n# [영역] 감상(비평 및 문화)\nex:ArtAppreciation a ex:LearningArea ;\n    rdfs:label \"감상(비평 및 문화)\"@ko .\nex:ArtAppreciation_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"감상(비평 및 문화) 핵심 아이디어 1\"@ko ;\n    ex:description \"미술 작품의 특징, 표현 방법, 작가의 의도를 다각도로 탐색하고 감상한다.\"@ko .\nex:ArtAppreciation ex:hasCoreIdea ex:ArtAppreciation_CoreIdea_1 .\nex:ArtAppreciation_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"전통 미술과 현대 미술\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtAppreciation ex:hasContentElement ex:ArtAppreciation_Elem_1_1 .\nex:ArtAppreciation_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"작품의 조형적 특징\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtAppreciation ex:hasContentElement ex:ArtAppreciation_Elem_1_2 .\nex:ArtAppreciation_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"작가의 생애와 시대 배경\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtAppreciation ex:hasContentElement ex:ArtAppreciation_Elem_1_3 .\nex:ArtAppreciation_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"감상(비평 및 문화) 핵심 아이디어 2\"@ko ;\n    ex:description \"미술 전시 관람 예절을 지키고 자신의 비평적 관점을 타인과 공유한다.\"@ko .\nex:ArtAppreciation ex:hasCoreIdea ex:ArtAppreciation_CoreIdea_2 .\nex:ArtAppreciation_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"미술관·갤러리 관람 예절\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtAppreciation ex:hasContentElement ex:ArtAppreciation_Elem_2_1 .\nex:ArtAppreciation_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"작품 감상문 쓰기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtAppreciation ex:hasContentElement ex:ArtAppreciation_Elem_2_2 .\nex:ArtAppreciation_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"학급 전시회 큐레이션\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtAppreciation ex:hasContentElement ex:ArtAppreciation_Elem_2_3 .\nex:ArtAppreciation_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"작품 설명하고 질문하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtAppreciation ex:hasContentElement ex:ArtAppreciation_Skill_1 .\nex:ArtAppreciation_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"공통점과 차이점 비교 감상하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtAppreciation ex:hasContentElement ex:ArtAppreciation_Skill_2 .\nex:ArtAppreciation_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"전시 작품 기획 및 비평하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ArtAppreciation ex:hasContentElement ex:ArtAppreciation_Skill_3 .\n",
  "사회과.ttl": "@prefix ex:   <https://example.org/curriculum/social-studies#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:SocialStudiesCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 사회과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 사회과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:SocialStudies a ex:Subject ;\n    rdfs:label \"사회\"@ko ;\n    ex:description \"사회현상을 체계적으로 탐구하고 민주 시민으로서의 자질과 비판적 문제해결력을 기르는 교과\"@ko ;\n    ex:hasArea ex:LocalPlaceLife, ex:SocietyChangeDemocracy, ex:EconomyLifeGlobal, ex:HistoryHeritage .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"창의적·비판적 사고 역량\"@ko ;\n    ex:description \"다양한 사회 현상과 자료를 종합하여 문제를 합리적으로 해결하는 역량\"@ko .\nex:SocialStudies ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"문제 해결력 및 의사결정 역량\"@ko ;\n    ex:description \"사회적 쟁점에 대해 다양한 대안을 모색하고 최선의 방안을 결정하는 역량\"@ko .\nex:SocialStudies ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"의사소통 및 협업 역량\"@ko ;\n    ex:description \"타인의 의견을 존중하고 공동의 목표를 위해 협력하며 소통하는 역량\"@ko .\nex:SocialStudies ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"정보 활용 역량\"@ko ;\n    ex:description \"공간 정보 및 사회과학적 통계 자료를 수집·분석·가공하는 역량\"@ko .\nex:SocialStudies ex:developsCompetency ex:Comp_4 .\nex:Comp_5 a ex:Competency ;\n    rdfs:label \"시민적 참여 및 사회성 역량\"@ko ;\n    ex:description \"민주 시민으로서 사회 문제 해결에 적극적으로 참여하고 연대하는 역량\"@ko .\nex:SocialStudies ex:developsCompetency ex:Comp_5 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 우리가 사는 곳과 고장의 생활\nex:LocalPlaceLife a ex:LearningArea ;\n    rdfs:label \"우리가 사는 곳과 고장의 생활\"@ko .\nex:LocalPlaceLife_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"우리가 사는 곳과 고장의 생활 핵심 아이디어 1\"@ko ;\n    ex:description \"고장의 지리적 환경과 인문 환경은 주민들의 삶의 모습과 밀접한 관계를 맺는다.\"@ko .\nex:LocalPlaceLife ex:hasCoreIdea ex:LocalPlaceLife_CoreIdea_1 .\nex:LocalPlaceLife_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"고장의 모습\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LocalPlaceLife ex:hasContentElement ex:LocalPlaceLife_Elem_1_1 .\nex:LocalPlaceLife_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"디지털 영상지도 활용\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LocalPlaceLife ex:hasContentElement ex:LocalPlaceLife_Elem_1_2 .\nex:LocalPlaceLife_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"우리 고장의 자랑거리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LocalPlaceLife ex:hasContentElement ex:LocalPlaceLife_Elem_1_3 .\nex:LocalPlaceLife_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"우리가 사는 곳과 고장의 생활 핵심 아이디어 2\"@ko ;\n    ex:description \"고장의 유래와 문화유산을 탐구하며 고장에 대한 애향심을 기른다.\"@ko .\nex:LocalPlaceLife ex:hasCoreIdea ex:LocalPlaceLife_CoreIdea_2 .\nex:LocalPlaceLife_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"역사 문화유산\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LocalPlaceLife ex:hasContentElement ex:LocalPlaceLife_Elem_2_1 .\nex:LocalPlaceLife_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"고장의 옛이야기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LocalPlaceLife ex:hasContentElement ex:LocalPlaceLife_Elem_2_2 .\nex:LocalPlaceLife_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"지역 주민의 상호작용\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LocalPlaceLife ex:hasContentElement ex:LocalPlaceLife_Elem_2_3 .\nex:LocalPlaceLife_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"지도 읽기 및 위치 파악하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LocalPlaceLife ex:hasContentElement ex:LocalPlaceLife_Skill_1 .\nex:LocalPlaceLife_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"지역 답사 및 현장 조사하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LocalPlaceLife ex:hasContentElement ex:LocalPlaceLife_Skill_2 .\nex:LocalPlaceLife_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"고장 소개 자료 제작하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LocalPlaceLife ex:hasContentElement ex:LocalPlaceLife_Skill_3 .\n\n# [영역] 사회의 변화와 민주주의\nex:SocietyChangeDemocracy a ex:LearningArea ;\n    rdfs:label \"사회의 변화와 민주주의\"@ko .\nex:SocietyChangeDemocracy_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"사회의 변화와 민주주의 핵심 아이디어 1\"@ko ;\n    ex:description \"민주주의는 모든 인간의 존엄성과 자유, 평등을 실현하기 위한 제도이자 생활양식이다.\"@ko .\nex:SocietyChangeDemocracy ex:hasCoreIdea ex:SocietyChangeDemocracy_CoreIdea_1 .\nex:SocietyChangeDemocracy_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"민주주의의 기본 정신\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyChangeDemocracy ex:hasContentElement ex:SocietyChangeDemocracy_Elem_1_1 .\nex:SocietyChangeDemocracy_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"국민 투표와 선거\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyChangeDemocracy ex:hasContentElement ex:SocietyChangeDemocracy_Elem_1_2 .\nex:SocietyChangeDemocracy_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"국가 기관의 역할\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyChangeDemocracy ex:hasContentElement ex:SocietyChangeDemocracy_Elem_1_3 .\nex:SocietyChangeDemocracy_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"사회의 변화와 민주주의 핵심 아이디어 2\"@ko ;\n    ex:description \"현대 사회의 다양한 변화(저출생·고령화, 다문화, 정보화)에 능동적으로 대처한다.\"@ko .\nex:SocietyChangeDemocracy ex:hasCoreIdea ex:SocietyChangeDemocracy_CoreIdea_2 .\nex:SocietyChangeDemocracy_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"사회 변동\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyChangeDemocracy ex:hasContentElement ex:SocietyChangeDemocracy_Elem_2_1 .\nex:SocietyChangeDemocracy_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"다양성 존중\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyChangeDemocracy ex:hasContentElement ex:SocietyChangeDemocracy_Elem_2_2 .\nex:SocietyChangeDemocracy_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"민주적 의사결정 원리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyChangeDemocracy ex:hasContentElement ex:SocietyChangeDemocracy_Elem_2_3 .\nex:SocietyChangeDemocracy_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"선거 및 모의투표 체험하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyChangeDemocracy ex:hasContentElement ex:SocietyChangeDemocracy_Skill_1 .\nex:SocietyChangeDemocracy_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"사회 쟁점 토론하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyChangeDemocracy ex:hasContentElement ex:SocietyChangeDemocracy_Skill_2 .\nex:SocietyChangeDemocracy_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"민주적 문제 해결안 제안하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocietyChangeDemocracy ex:hasContentElement ex:SocietyChangeDemocracy_Skill_3 .\n\n# [영역] 경제생활과 지속가능한 지구촌\nex:EconomyLifeGlobal a ex:LearningArea ;\n    rdfs:label \"경제생활과 지속가능한 지구촌\"@ko .\nex:EconomyLifeGlobal_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"경제생활과 지속가능한 지구촌 핵심 아이디어 1\"@ko ;\n    ex:description \"합리적 선택과 시장 경제의 기본 원리를 이해하여 책임 있는 경제 주체로 성장한다.\"@ko .\nex:EconomyLifeGlobal ex:hasCoreIdea ex:EconomyLifeGlobal_CoreIdea_1 .\nex:EconomyLifeGlobal_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"희소성과 선택\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EconomyLifeGlobal ex:hasContentElement ex:EconomyLifeGlobal_Elem_1_1 .\nex:EconomyLifeGlobal_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"시장과 가격\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EconomyLifeGlobal ex:hasContentElement ex:EconomyLifeGlobal_Elem_1_2 .\nex:EconomyLifeGlobal_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"현명한 소비\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EconomyLifeGlobal ex:hasContentElement ex:EconomyLifeGlobal_Elem_1_3 .\nex:EconomyLifeGlobal_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"경제생활과 지속가능한 지구촌 핵심 아이디어 2\"@ko ;\n    ex:description \"지구촌의 다양한 문제(기후변화, 빈곤, 분쟁)를 인식하고 지속가능한 발전을 위해 연대한다.\"@ko .\nex:EconomyLifeGlobal ex:hasCoreIdea ex:EconomyLifeGlobal_CoreIdea_2 .\nex:EconomyLifeGlobal_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"세계 시민 의식\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EconomyLifeGlobal ex:hasContentElement ex:EconomyLifeGlobal_Elem_2_1 .\nex:EconomyLifeGlobal_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"지구촌 환경 문제\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EconomyLifeGlobal ex:hasContentElement ex:EconomyLifeGlobal_Elem_2_2 .\nex:EconomyLifeGlobal_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"국제 협력\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EconomyLifeGlobal ex:hasContentElement ex:EconomyLifeGlobal_Elem_2_3 .\nex:EconomyLifeGlobal_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"가계·기업 경제활동 분석하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EconomyLifeGlobal ex:hasContentElement ex:EconomyLifeGlobal_Skill_1 .\nex:EconomyLifeGlobal_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"지구촌 문제 원인 조사하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EconomyLifeGlobal ex:hasContentElement ex:EconomyLifeGlobal_Skill_2 .\nex:EconomyLifeGlobal_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"캠페인 및 제안서 작성하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:EconomyLifeGlobal ex:hasContentElement ex:EconomyLifeGlobal_Skill_3 .\n\n# [영역] 우리나라의 역사와 문화\nex:HistoryHeritage a ex:LearningArea ;\n    rdfs:label \"우리나라의 역사와 문화\"@ko .\nex:HistoryHeritage_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"우리나라의 역사와 문화 핵심 아이디어 1\"@ko ;\n    ex:description \"우리 역사의 주요 발전 과정과 인물들의 활약을 통해 역사의식과 정체성을 확립한다.\"@ko .\nex:HistoryHeritage ex:hasCoreIdea ex:HistoryHeritage_CoreIdea_1 .\nex:HistoryHeritage_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"선사시대부터 현대까지의 발전\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HistoryHeritage ex:hasContentElement ex:HistoryHeritage_Elem_1_1 .\nex:HistoryHeritage_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"주요 역사적 사건과 인물\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HistoryHeritage ex:hasContentElement ex:HistoryHeritage_Elem_1_2 .\nex:HistoryHeritage_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"국난 극복\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HistoryHeritage ex:hasContentElement ex:HistoryHeritage_Elem_1_3 .\nex:HistoryHeritage_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"우리나라의 역사와 문화 핵심 아이디어 2\"@ko ;\n    ex:description \"역사적 사료와 유물을 비판적으로 검토하며 과거와 현재를 연결하여 조망한다.\"@ko .\nex:HistoryHeritage ex:hasCoreIdea ex:HistoryHeritage_CoreIdea_2 .\nex:HistoryHeritage_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"사료 비판\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HistoryHeritage ex:hasContentElement ex:HistoryHeritage_Elem_2_1 .\nex:HistoryHeritage_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"문화재 보호\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HistoryHeritage ex:hasContentElement ex:HistoryHeritage_Elem_2_2 .\nex:HistoryHeritage_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"역사적 상상력\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HistoryHeritage ex:hasContentElement ex:HistoryHeritage_Elem_2_3 .\nex:HistoryHeritage_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"역사 연표 만들기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HistoryHeritage ex:hasContentElement ex:HistoryHeritage_Skill_1 .\nex:HistoryHeritage_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"사료 비교 분석하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HistoryHeritage ex:hasContentElement ex:HistoryHeritage_Skill_2 .\nex:HistoryHeritage_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"역사적 인물 가상 인터뷰하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HistoryHeritage ex:hasContentElement ex:HistoryHeritage_Skill_3 .\n",
  "수학과.ttl": "@prefix ex:   <https://example.org/curriculum/mathematics#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:MathematicsCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 수학과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 수학과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:Mathematics a ex:Subject ;\n    rdfs:label \"수학\"@ko ;\n    ex:description \"수학적 개념, 원리, 법칙을 이해하고 수학적 사고력과 문제해결력을 길러 합리적으로 판단하는 교과\"@ko ;\n    ex:hasArea ex:NumberOperations, ex:GeometryMeasurement, ex:PatternsRelationships, ex:DataPossibility .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"문제해결 역량\"@ko ;\n    ex:description \"해결 방법을 스스로 탐색하고 다양한 전략을 활용하여 문제를 해결하는 역량\"@ko .\nex:Mathematics ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"추론 역량\"@ko ;\n    ex:description \"수학적 사실을 관찰·귀납·연역적으로 분석하여 정당화하고 수학적으로 사고하는 역량\"@ko .\nex:Mathematics ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"의사소통 역량\"@ko ;\n    ex:description \"수학적 아이디어를 기호, 문자, 시각 자료 등으로 정확히 표현하고 소통하는 역량\"@ko .\nex:Mathematics ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"연결 역량\"@ko ;\n    ex:description \"수학의 개념·원리 간의 상호연관성을 파악하고 타 교과 및 실생활과 융합하는 역량\"@ko .\nex:Mathematics ex:developsCompetency ex:Comp_4 .\nex:Comp_5 a ex:Competency ;\n    rdfs:label \"정보처리 역량\"@ko ;\n    ex:description \"다양한 공학적 도구 및 교구를 활용하여 수학적 자료를 탐구하고 분석하는 역량\"@ko .\nex:Mathematics ex:developsCompetency ex:Comp_5 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 수와 연산\nex:NumberOperations a ex:LearningArea ;\n    rdfs:label \"수와 연산\"@ko .\nex:NumberOperations_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"수와 연산 핵심 아이디어 1\"@ko ;\n    ex:description \"수는 양의 크기를 수량화하고 체계화하여 나타낸 수학의 기본 언어이다.\"@ko .\nex:NumberOperations ex:hasCoreIdea ex:NumberOperations_CoreIdea_1 .\nex:NumberOperations_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자연수·분수·소수의 개념\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NumberOperations ex:hasContentElement ex:NumberOperations_Elem_1_1 .\nex:NumberOperations_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자릿값 원리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NumberOperations ex:hasContentElement ex:NumberOperations_Elem_1_2 .\nex:NumberOperations_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"수의 대소 비교\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NumberOperations ex:hasContentElement ex:NumberOperations_Elem_1_3 .\nex:NumberOperations_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"수와 연산 핵심 아이디어 2\"@ko ;\n    ex:description \"연산은 수 사이의 관계를 나타내고 문제를 해결하는 연산 감각의 기초이다.\"@ko .\nex:NumberOperations ex:hasCoreIdea ex:NumberOperations_CoreIdea_2 .\nex:NumberOperations_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"사칙연산의 계산 원리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NumberOperations ex:hasContentElement ex:NumberOperations_Elem_2_1 .\nex:NumberOperations_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"어림하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NumberOperations ex:hasContentElement ex:NumberOperations_Elem_2_2 .\nex:NumberOperations_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"혼합 계산\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NumberOperations ex:hasContentElement ex:NumberOperations_Elem_2_3 .\nex:NumberOperations_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"수 세기 및 자릿값 이해하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NumberOperations ex:hasContentElement ex:NumberOperations_Skill_1 .\nex:NumberOperations_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"사칙계산 원리 조작하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NumberOperations ex:hasContentElement ex:NumberOperations_Skill_2 .\nex:NumberOperations_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"어림셈 및 계산 결과 검산하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NumberOperations ex:hasContentElement ex:NumberOperations_Skill_3 .\n\n# [영역] 도형과 측정\nex:GeometryMeasurement a ex:LearningArea ;\n    rdfs:label \"도형과 측정\"@ko .\nex:GeometryMeasurement_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"도형과 측정 핵심 아이디어 1\"@ko ;\n    ex:description \"평면 및 입체도형은 공간 감각을 기르고 세상의 공간적 형태를 이해하는 틀이다.\"@ko .\nex:GeometryMeasurement ex:hasCoreIdea ex:GeometryMeasurement_CoreIdea_1 .\nex:GeometryMeasurement_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"평면도형의 성질\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GeometryMeasurement ex:hasContentElement ex:GeometryMeasurement_Elem_1_1 .\nex:GeometryMeasurement_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"입체도형의 특징\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GeometryMeasurement ex:hasContentElement ex:GeometryMeasurement_Elem_1_2 .\nex:GeometryMeasurement_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"공간 지각력\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GeometryMeasurement ex:hasContentElement ex:GeometryMeasurement_Elem_1_3 .\nex:GeometryMeasurement_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"도형과 측정 핵심 아이디어 2\"@ko ;\n    ex:description \"측정은 길이, 들이, 무게, 각도, 넓이, 부피 등을 단위와 수치로 수량화하는 과정이다.\"@ko .\nex:GeometryMeasurement ex:hasCoreIdea ex:GeometryMeasurement_CoreIdea_2 .\nex:GeometryMeasurement_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"측정 단위의 이해\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GeometryMeasurement ex:hasContentElement ex:GeometryMeasurement_Elem_2_1 .\nex:GeometryMeasurement_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"어림과 실측\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GeometryMeasurement ex:hasContentElement ex:GeometryMeasurement_Elem_2_2 .\nex:GeometryMeasurement_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"도형의 둘레와 넓이 산출\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GeometryMeasurement ex:hasContentElement ex:GeometryMeasurement_Elem_2_3 .\nex:GeometryMeasurement_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"도형 작도 및 분류하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GeometryMeasurement ex:hasContentElement ex:GeometryMeasurement_Skill_1 .\nex:GeometryMeasurement_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"도형의 합동과 대칭 파악하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GeometryMeasurement ex:hasContentElement ex:GeometryMeasurement_Skill_2 .\nex:GeometryMeasurement_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"측정 도구 사용 및 공식 유도하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:GeometryMeasurement ex:hasContentElement ex:GeometryMeasurement_Skill_3 .\n\n# [영역] 변화와 관계\nex:PatternsRelationships a ex:LearningArea ;\n    rdfs:label \"변화와 관계\"@ko .\nex:PatternsRelationships_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"변화와 관계 핵심 아이디어 1\"@ko ;\n    ex:description \"패턴과 규칙성은 사물과 수의 반복적인 질서를 발견하고 일반화하는 도구이다.\"@ko .\nex:PatternsRelationships ex:hasCoreIdea ex:PatternsRelationships_CoreIdea_1 .\nex:PatternsRelationships_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"규칙 찾기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PatternsRelationships ex:hasContentElement ex:PatternsRelationships_Elem_1_1 .\nex:PatternsRelationships_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"규칙의 수치화 및 표현\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PatternsRelationships ex:hasContentElement ex:PatternsRelationships_Elem_1_2 .\nex:PatternsRelationships_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"무늬 꾸미기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PatternsRelationships ex:hasContentElement ex:PatternsRelationships_Elem_1_3 .\nex:PatternsRelationships_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"변화와 관계 핵심 아이디어 2\"@ko ;\n    ex:description \"비와 비율, 비례식은 두 양 사이의 관계를 상대적 크기로 비교 분석하는 개념이다.\"@ko .\nex:PatternsRelationships ex:hasCoreIdea ex:PatternsRelationships_CoreIdea_2 .\nex:PatternsRelationships_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"비와 비율\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PatternsRelationships ex:hasContentElement ex:PatternsRelationships_Elem_2_1 .\nex:PatternsRelationships_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"백분율\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PatternsRelationships ex:hasContentElement ex:PatternsRelationships_Elem_2_2 .\nex:PatternsRelationships_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"비례배분과 반비례\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PatternsRelationships ex:hasContentElement ex:PatternsRelationships_Elem_2_3 .\nex:PatternsRelationships_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"규칙성 탐색 및 확장하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PatternsRelationships ex:hasContentElement ex:PatternsRelationships_Skill_1 .\nex:PatternsRelationships_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"비율 계산하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PatternsRelationships ex:hasContentElement ex:PatternsRelationships_Skill_2 .\nex:PatternsRelationships_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"대응 관계식 세우기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PatternsRelationships ex:hasContentElement ex:PatternsRelationships_Skill_3 .\n\n# [영역] 자료와 가능성\nex:DataPossibility a ex:LearningArea ;\n    rdfs:label \"자료와 가능성\"@ko .\nex:DataPossibility_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"자료와 가능성 핵심 아이디어 1\"@ko ;\n    ex:description \"자료의 수집, 분류, 정리는 통계적 문제 해결을 위한 필수적 탐구 과정이다.\"@ko .\nex:DataPossibility ex:hasCoreIdea ex:DataPossibility_CoreIdea_1 .\nex:DataPossibility_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"표와 막대·꺾은선·원그래프\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DataPossibility ex:hasContentElement ex:DataPossibility_Elem_1_1 .\nex:DataPossibility_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자료 분류\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DataPossibility ex:hasContentElement ex:DataPossibility_Elem_1_2 .\nex:DataPossibility_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"평균 구하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DataPossibility ex:hasContentElement ex:DataPossibility_Elem_1_3 .\nex:DataPossibility_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"자료와 가능성 핵심 아이디어 2\"@ko ;\n    ex:description \"가능성은 미래의 불확실한 사건에 대한 논리적 예측과 확률적 사고를 가능하게 한다.\"@ko .\nex:DataPossibility ex:hasCoreIdea ex:DataPossibility_CoreIdea_2 .\nex:DataPossibility_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"일어날 가능성 표현\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DataPossibility ex:hasContentElement ex:DataPossibility_Elem_2_1 .\nex:DataPossibility_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"사건의 가짓수\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DataPossibility ex:hasContentElement ex:DataPossibility_Elem_2_2 .\nex:DataPossibility_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자료의 해석과 비판\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DataPossibility ex:hasContentElement ex:DataPossibility_Elem_2_3 .\nex:DataPossibility_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"자료 수집 및 그래프 변환하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DataPossibility ex:hasContentElement ex:DataPossibility_Skill_1 .\nex:DataPossibility_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"통계 표와 그래프 해석하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DataPossibility ex:hasContentElement ex:DataPossibility_Skill_2 .\nex:DataPossibility_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"사건 가능성 판단하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DataPossibility ex:hasContentElement ex:DataPossibility_Skill_3 .\n",
  "실과.ttl": "@prefix ex:   <https://example.org/curriculum/practical-arts#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:PracticalArtsCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 실과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 실과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:PracticalArts a ex:Subject ;\n    rdfs:label \"실과\"@ko ;\n    ex:description \"가정과 기술, 디지털 정보 사회에서의 실생활 능력을 기르고 자립적인 삶과 창의적 메이커 능력을 함양하는 교과\"@ko ;\n    ex:hasArea ex:HumanDevelopmentLiving, ex:LifeResourcesLivingEnvironment, ex:TechnologyWorldMaking, ex:DigitalInformationTechnology .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"관계 형성 및 자기관리 역량\"@ko ;\n    ex:description \"자신과 가족의 건강한 발달을 도모하고 균형 잡힌 생활을 설계하는 역량\"@ko .\nex:PracticalArts ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"실천적 문제 해결 역량\"@ko ;\n    ex:description \"일상생활 속 의식주 및 자원 관리 문제를 창의적·비판적으로 해결하는 역량\"@ko .\nex:PracticalArts ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"기술적 문제 해결 역량\"@ko ;\n    ex:description \"기술적 지식과 실천 도구를 활용하여 유용한 발명품 및 구조물을 설계·제작하는 역량\"@ko .\nex:PracticalArts ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"기술 시스템 역량\"@ko ;\n    ex:description \"생명 기술, 수송 기술 등의 원리를 이해하고 지속가능한 시스템을 탐색하는 역량\"@ko .\nex:PracticalArts ex:developsCompetency ex:Comp_4 .\nex:Comp_5 a ex:Competency ;\n    rdfs:label \"디지털 소양\"@ko ;\n    ex:description \"소프트웨어와 인공지능 기초 원리를 이해하고 알고리즘을 설계하여 프로그래밍하는 역량\"@ko .\nex:PracticalArts ex:developsCompetency ex:Comp_5 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 인간 발달과 가족\nex:HumanDevelopmentLiving a ex:LearningArea ;\n    rdfs:label \"인간 발달과 가족\"@ko .\nex:HumanDevelopmentLiving_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"인간 발달과 가족 핵심 아이디어 1\"@ko ;\n    ex:description \"인간은 생애주기에 따라 발달하며 가족은 상호존중과 돌봄의 공간이다.\"@ko .\nex:HumanDevelopmentLiving ex:hasCoreIdea ex:HumanDevelopmentLiving_CoreIdea_1 .\nex:HumanDevelopmentLiving_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"아동기 신체·정서 발달\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HumanDevelopmentLiving ex:hasContentElement ex:HumanDevelopmentLiving_Elem_1_1 .\nex:HumanDevelopmentLiving_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"가족의 역할과 배려\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HumanDevelopmentLiving ex:hasContentElement ex:HumanDevelopmentLiving_Elem_1_2 .\nex:HumanDevelopmentLiving_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"소통하는 가정\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HumanDevelopmentLiving ex:hasContentElement ex:HumanDevelopmentLiving_Elem_1_3 .\nex:HumanDevelopmentLiving_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"인간 발달과 가족 핵심 아이디어 2\"@ko ;\n    ex:description \"균형 잡힌 식생활과 바른 의생활은 개인의 건강과 지속가능한 환경에 기여한다.\"@ko .\nex:HumanDevelopmentLiving ex:hasCoreIdea ex:HumanDevelopmentLiving_CoreIdea_2 .\nex:HumanDevelopmentLiving_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"균형 잡힌 식사\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HumanDevelopmentLiving ex:hasContentElement ex:HumanDevelopmentLiving_Elem_2_1 .\nex:HumanDevelopmentLiving_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"간단한 조리 실습\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HumanDevelopmentLiving ex:hasContentElement ex:HumanDevelopmentLiving_Elem_2_2 .\nex:HumanDevelopmentLiving_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"옷 관리와 바느질\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HumanDevelopmentLiving ex:hasContentElement ex:HumanDevelopmentLiving_Elem_2_3 .\nex:HumanDevelopmentLiving_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"영양소 분석 및 식단 계획하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HumanDevelopmentLiving ex:hasContentElement ex:HumanDevelopmentLiving_Skill_1 .\nex:HumanDevelopmentLiving_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"간단한 조리 도구 다루기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HumanDevelopmentLiving ex:hasContentElement ex:HumanDevelopmentLiving_Skill_2 .\nex:HumanDevelopmentLiving_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"손바느질 및 의복 수선하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HumanDevelopmentLiving ex:hasContentElement ex:HumanDevelopmentLiving_Skill_3 .\n\n# [영역] 생활 자원과 생활환경\nex:LifeResourcesLivingEnvironment a ex:LearningArea ;\n    rdfs:label \"생활 자원과 생활환경\"@ko .\nex:LifeResourcesLivingEnvironment_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"생활 자원과 생활환경 핵심 아이디어 1\"@ko ;\n    ex:description \"시간과 용돈 등 생활 자원을 계획적으로 관리하여 합리적인 소비를 실천한다.\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasCoreIdea ex:LifeResourcesLivingEnvironment_CoreIdea_1 .\nex:LifeResourcesLivingEnvironment_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"시간 관리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasContentElement ex:LifeResourcesLivingEnvironment_Elem_1_1 .\nex:LifeResourcesLivingEnvironment_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"용돈 기입장\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasContentElement ex:LifeResourcesLivingEnvironment_Elem_1_2 .\nex:LifeResourcesLivingEnvironment_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"친환경 소비\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasContentElement ex:LifeResourcesLivingEnvironment_Elem_1_3 .\nex:LifeResourcesLivingEnvironment_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"생활 자원과 생활환경 핵심 아이디어 2\"@ko ;\n    ex:description \"쾌적하고 안전한 주거 환경을 유지하며 자원 재활용을 실천한다.\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasCoreIdea ex:LifeResourcesLivingEnvironment_CoreIdea_2 .\nex:LifeResourcesLivingEnvironment_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"정리와 수납\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasContentElement ex:LifeResourcesLivingEnvironment_Elem_2_1 .\nex:LifeResourcesLivingEnvironment_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"생활 쓰레기 분리배출\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasContentElement ex:LifeResourcesLivingEnvironment_Elem_2_2 .\nex:LifeResourcesLivingEnvironment_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"안전사고 예방\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasContentElement ex:LifeResourcesLivingEnvironment_Elem_2_3 .\nex:LifeResourcesLivingEnvironment_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"생활 자원 계획표 수립하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasContentElement ex:LifeResourcesLivingEnvironment_Skill_1 .\nex:LifeResourcesLivingEnvironment_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"정리정돈 실습하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasContentElement ex:LifeResourcesLivingEnvironment_Skill_2 .\nex:LifeResourcesLivingEnvironment_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"자원 재활용 프로젝트 수행하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:LifeResourcesLivingEnvironment ex:hasContentElement ex:LifeResourcesLivingEnvironment_Skill_3 .\n\n# [영역] 기술의 세계와 메이킹\nex:TechnologyWorldMaking a ex:LearningArea ;\n    rdfs:label \"기술의 세계와 메이킹\"@ko .\nex:TechnologyWorldMaking_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"기술의 세계와 메이킹 핵심 아이디어 1\"@ko ;\n    ex:description \"기술은 인간 생활의 문제를 해결하고 편익을 증진하는 창의적 산물이다.\"@ko .\nex:TechnologyWorldMaking ex:hasCoreIdea ex:TechnologyWorldMaking_CoreIdea_1 .\nex:TechnologyWorldMaking_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"기술의 발전과 발명\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:TechnologyWorldMaking ex:hasContentElement ex:TechnologyWorldMaking_Elem_1_1 .\nex:TechnologyWorldMaking_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"목재·플라스틱 재료 활용\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:TechnologyWorldMaking ex:hasContentElement ex:TechnologyWorldMaking_Elem_1_2 .\nex:TechnologyWorldMaking_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"창의적 제품 구상\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:TechnologyWorldMaking ex:hasContentElement ex:TechnologyWorldMaking_Elem_1_3 .\nex:TechnologyWorldMaking_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"기술의 세계와 메이킹 핵심 아이디어 2\"@ko ;\n    ex:description \"동식물 자원을 친환경적으로 기르고 활용하는 생명 기술의 가치를 인식한다.\"@ko .\nex:TechnologyWorldMaking ex:hasCoreIdea ex:TechnologyWorldMaking_CoreIdea_2 .\nex:TechnologyWorldMaking_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"식물 가꾸기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:TechnologyWorldMaking ex:hasContentElement ex:TechnologyWorldMaking_Elem_2_1 .\nex:TechnologyWorldMaking_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"동물 돌보기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:TechnologyWorldMaking ex:hasContentElement ex:TechnologyWorldMaking_Elem_2_2 .\nex:TechnologyWorldMaking_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"생명 자원의 이용\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:TechnologyWorldMaking ex:hasContentElement ex:TechnologyWorldMaking_Elem_2_3 .\nex:TechnologyWorldMaking_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"아이디어 스케치하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:TechnologyWorldMaking ex:hasContentElement ex:TechnologyWorldMaking_Skill_1 .\nex:TechnologyWorldMaking_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"생활용품 제작 도구 조작하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:TechnologyWorldMaking ex:hasContentElement ex:TechnologyWorldMaking_Skill_2 .\nex:TechnologyWorldMaking_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"재배 및 사육 일지 작성하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:TechnologyWorldMaking ex:hasContentElement ex:TechnologyWorldMaking_Skill_3 .\n\n# [영역] 디지털과 정보 기술\nex:DigitalInformationTechnology a ex:LearningArea ;\n    rdfs:label \"디지털과 정보 기술\"@ko .\nex:DigitalInformationTechnology_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"디지털과 정보 기술 핵심 아이디어 1\"@ko ;\n    ex:description \"소프트웨어와 인공지능은 데이터와 알고리즘을 기반으로 복잡한 문제를 자동화한다.\"@ko .\nex:DigitalInformationTechnology ex:hasCoreIdea ex:DigitalInformationTechnology_CoreIdea_1 .\nex:DigitalInformationTechnology_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"알고리즘의 개념\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DigitalInformationTechnology ex:hasContentElement ex:DigitalInformationTechnology_Elem_1_1 .\nex:DigitalInformationTechnology_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"블록 코딩(순차·선택·반복)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DigitalInformationTechnology ex:hasContentElement ex:DigitalInformationTechnology_Elem_1_2 .\nex:DigitalInformationTechnology_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"인공지능의 이해\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DigitalInformationTechnology ex:hasContentElement ex:DigitalInformationTechnology_Elem_1_3 .\nex:DigitalInformationTechnology_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"디지털과 정보 기술 핵심 아이디어 2\"@ko ;\n    ex:description \"정보통신윤리와 저작권을 준수하며 안전하고 책임감 있게 디지털 사회에 참여한다.\"@ko .\nex:DigitalInformationTechnology ex:hasCoreIdea ex:DigitalInformationTechnology_CoreIdea_2 .\nex:DigitalInformationTechnology_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"개인정보 보호\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DigitalInformationTechnology ex:hasContentElement ex:DigitalInformationTechnology_Elem_2_1 .\nex:DigitalInformationTechnology_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"저작권 준수\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DigitalInformationTechnology ex:hasContentElement ex:DigitalInformationTechnology_Elem_2_2 .\nex:DigitalInformationTechnology_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"사이버 폭력 예방\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DigitalInformationTechnology ex:hasContentElement ex:DigitalInformationTechnology_Elem_2_3 .\nex:DigitalInformationTechnology_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"알고리즘 순서도 작성하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DigitalInformationTechnology ex:hasContentElement ex:DigitalInformationTechnology_Skill_1 .\nex:DigitalInformationTechnology_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"엔트리/스크래치 프로그래밍하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DigitalInformationTechnology ex:hasContentElement ex:DigitalInformationTechnology_Skill_2 .\nex:DigitalInformationTechnology_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"디지털 콘텐츠 제작하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:DigitalInformationTechnology ex:hasContentElement ex:DigitalInformationTechnology_Skill_3 .\n",
  "영어과.ttl": "@prefix ex:   <https://example.org/curriculum/english#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:EnglishCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 영어과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 영어과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:English a ex:Subject ;\n    rdfs:label \"영어\"@ko ;\n    ex:description \"기초적인 영어 의사소통 능력을 기르고 다양한 세계 문화를 이해하여 글로벌 역량을 함양하는 교과\"@ko ;\n    ex:hasArea ex:ReceptiveSkills, ex:ProductiveSkills, ex:SocioCulturalAspects .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"영어 의사소통 역량\"@ko ;\n    ex:description \"일상생활 속 기초 영어를 듣고 말하고 읽고 쓰며 의미를 주고받는 역량\"@ko .\nex:English ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"자기관리 역량\"@ko ;\n    ex:description \"영어 학습에 대한 흥미와 자신감을 가지고 자기주도적으로 학습을 실천하는 역량\"@ko .\nex:English ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"공동체 역량\"@ko ;\n    ex:description \"글로벌 사회의 구성원으로서 세계 다양한 문화를 편견 없이 수용하고 존중하는 역량\"@ko .\nex:English ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"지식정보처리 역량\"@ko ;\n    ex:description \"다양한 영어 텍스트와 디지털 도구를 활용하여 필요한 정보를 탐색·활용하는 역량\"@ko .\nex:English ex:developsCompetency ex:Comp_4 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 이해(Listening & Reading)\nex:ReceptiveSkills a ex:LearningArea ;\n    rdfs:label \"이해(Listening & Reading)\"@ko .\nex:ReceptiveSkills_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"이해(Listening & Reading) 핵심 아이디어 1\"@ko ;\n    ex:description \"음성 언어와 문자 언어로 제시되는 기초적인 영어 표현을 듣고 읽으며 맥락을 파악한다.\"@ko .\nex:ReceptiveSkills ex:hasCoreIdea ex:ReceptiveSkills_CoreIdea_1 .\nex:ReceptiveSkills_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"알파벳과 파닉스 소리 규칙\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Elem_1_1 .\nex:ReceptiveSkills_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"기초 낱말과 짧은 문장 이해\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Elem_1_2 .\nex:ReceptiveSkills_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"그림 단서를 활용한 읽기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Elem_1_3 .\nex:ReceptiveSkills_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"이해(Listening & Reading) 핵심 아이디어 2\"@ko ;\n    ex:description \"일상생활 속 대화, 쉬운 이야기, 안내문에서 주요 정보와 세부 내용을 추출한다.\"@ko .\nex:ReceptiveSkills ex:hasCoreIdea ex:ReceptiveSkills_CoreIdea_2 .\nex:ReceptiveSkills_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"주제 및 중심 내용 파악\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Elem_2_1 .\nex:ReceptiveSkills_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"지시문 수행하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Elem_2_2 .\nex:ReceptiveSkills_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"육하원칙(Wh-questions) 정보 파악\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Elem_2_3 .\nex:ReceptiveSkills_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"소리와 철자 식별하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Skill_1 .\nex:ReceptiveSkills_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"그림과 텍스트 연결하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Skill_2 .\nex:ReceptiveSkills_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"음성 자료의 핵심어 파악하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Skill_3 .\nex:ReceptiveSkills_Skill_4 a ex:ProcessSkill ;\n    rdfs:label \"짧은 글 읽고 질문에 답하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ReceptiveSkills ex:hasContentElement ex:ReceptiveSkills_Skill_4 .\n\n# [영역] 표현(Speaking & Writing)\nex:ProductiveSkills a ex:LearningArea ;\n    rdfs:label \"표현(Speaking & Writing)\"@ko .\nex:ProductiveSkills_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"표현(Speaking & Writing) 핵심 아이디어 1\"@ko ;\n    ex:description \"기초적인 낱말과 어구를 활용하여 일상적인 주제에 관해 묻고 답하며 말한다.\"@ko .\nex:ProductiveSkills ex:hasCoreIdea ex:ProductiveSkills_CoreIdea_1 .\nex:ProductiveSkills_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"인사하기 및 자기소개\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Elem_1_1 .\nex:ProductiveSkills_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"주변 사물과 사람 묘사\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Elem_1_2 .\nex:ProductiveSkills_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"감정과 상태 표현\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Elem_1_3 .\nex:ProductiveSkills_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"표현(Speaking & Writing) 핵심 아이디어 2\"@ko ;\n    ex:description \"철자 규칙에 맞추어 낱말을 바르게 쓰고, 간단한 문장으로 자신의 생각이나 일과를 쓴다.\"@ko .\nex:ProductiveSkills ex:hasCoreIdea ex:ProductiveSkills_CoreIdea_2 .\nex:ProductiveSkills_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"알파벳 대소문자 바르게 쓰기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Elem_2_1 .\nex:ProductiveSkills_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"낱말 철자 쓰기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Elem_2_2 .\nex:ProductiveSkills_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"짧은 카드나 메모 작성\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Elem_2_3 .\nex:ProductiveSkills_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"정확한 발음과 억양으로 따라 말하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Skill_1 .\nex:ProductiveSkills_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"짝 활동으로 묻고 답하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Skill_2 .\nex:ProductiveSkills_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"철자 쓰기 및 단어 완성하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Skill_3 .\nex:ProductiveSkills_Skill_4 a ex:ProcessSkill ;\n    rdfs:label \"예시문을 활용하여 짧은 문장 쓰기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ProductiveSkills ex:hasContentElement ex:ProductiveSkills_Skill_4 .\n\n# [영역] 상호작용 및 문화(Interaction & Culture)\nex:SocioCulturalAspects a ex:LearningArea ;\n    rdfs:label \"상호작용 및 문화(Interaction & Culture)\"@ko .\nex:SocioCulturalAspects_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"상호작용 및 문화(Interaction & Culture) 핵심 아이디어 1\"@ko ;\n    ex:description \"영어권 및 다양한 세계 문화의 생활양식, 축제, 예절을 탐색하며 문화적 다양성을 이해한다.\"@ko .\nex:SocioCulturalAspects ex:hasCoreIdea ex:SocioCulturalAspects_CoreIdea_1 .\nex:SocioCulturalAspects_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"영어권 문화의 일상생활\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocioCulturalAspects ex:hasContentElement ex:SocioCulturalAspects_Elem_1_1 .\nex:SocioCulturalAspects_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"세계 명절과 풍습\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocioCulturalAspects ex:hasContentElement ex:SocioCulturalAspects_Elem_1_2 .\nex:SocioCulturalAspects_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"언어 예절과 제스처\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocioCulturalAspects ex:hasContentElement ex:SocioCulturalAspects_Elem_1_3 .\nex:SocioCulturalAspects_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"상호작용 및 문화(Interaction & Culture) 핵심 아이디어 2\"@ko ;\n    ex:description \"문화적 차이를 편견 없이 존중하며 열린 마음으로 세계인과 소통하는 태도를 가진다.\"@ko .\nex:SocioCulturalAspects ex:hasCoreIdea ex:SocioCulturalAspects_CoreIdea_2 .\nex:SocioCulturalAspects_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"문화 다양성 존중\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocioCulturalAspects ex:hasContentElement ex:SocioCulturalAspects_Elem_2_1 .\nex:SocioCulturalAspects_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"글로벌 에티켓\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocioCulturalAspects ex:hasContentElement ex:SocioCulturalAspects_Elem_2_2 .\nex:SocioCulturalAspects_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"상호문화적 공감\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocioCulturalAspects ex:hasContentElement ex:SocioCulturalAspects_Elem_2_3 .\nex:SocioCulturalAspects_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"세계 문화 차이 비교하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocioCulturalAspects ex:hasContentElement ex:SocioCulturalAspects_Skill_1 .\nex:SocioCulturalAspects_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"상황에 맞는 인사 예절 실천하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocioCulturalAspects ex:hasContentElement ex:SocioCulturalAspects_Skill_2 .\nex:SocioCulturalAspects_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"문화 소개 자료 만들기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SocioCulturalAspects ex:hasContentElement ex:SocioCulturalAspects_Skill_3 .\n",
  "음악과.ttl": "@prefix ex:   <https://example.org/curriculum/music#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:MusicCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 음악과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 음악과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:Music a ex:Subject ;\n    rdfs:label \"음악\"@ko ;\n    ex:description \"음악적 감수성과 창의적 표현력을 기르고 음악 문화를 향유하며 소통하는 교과\"@ko ;\n    ex:hasArea ex:MusicExpression, ex:MusicCreation, ex:MusicAppreciation, ex:MusicEverydayLife .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"음악적 감수성 역량\"@ko ;\n    ex:description \"음악의 요소와 아름다움을 오감으로 느끼고 반응하는 역량\"@ko .\nex:Music ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"음악적 창의·융합 사고 역량\"@ko ;\n    ex:description \"음악 요소를 바탕으로 새로운 음악을 창작하고 타 분야와 융합하는 역량\"@ko .\nex:Music ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"음악적 소통 역량\"@ko ;\n    ex:description \"음악을 통해 자신의 생각과 감정을 표현하고 타인과 공감하며 교류하는 역량\"@ko .\nex:Music ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"문화적 공동체 역량\"@ko ;\n    ex:description \"전통음악 및 세계 다양한 음악 문화를 존중하고 음악 활동에 참여하는 역량\"@ko .\nex:Music ex:developsCompetency ex:Comp_4 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 연주(가창·기악)\nex:MusicExpression a ex:LearningArea ;\n    rdfs:label \"연주(가창·기악)\"@ko .\nex:MusicExpression_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"연주(가창·기악) 핵심 아이디어 1\"@ko ;\n    ex:description \"노래 부르기와 악기 연주는 음악 요소를 신체와 악기로 구현하는 표현 활동이다.\"@ko .\nex:MusicExpression ex:hasCoreIdea ex:MusicExpression_CoreIdea_1 .\nex:MusicExpression_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"바른 발성과 호흡\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicExpression ex:hasContentElement ex:MusicExpression_Elem_1_1 .\nex:MusicExpression_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"다양한 악기 주법(리코더, 실로폰, 장구)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicExpression ex:hasContentElement ex:MusicExpression_Elem_1_2 .\nex:MusicExpression_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"앙상블과 하모니\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicExpression ex:hasContentElement ex:MusicExpression_Elem_1_3 .\nex:MusicExpression_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"연주(가창·기악) 핵심 아이디어 2\"@ko ;\n    ex:description \"악곡의 분위기와 특징을 살려 감정을 담아 능동적으로 연주한다.\"@ko .\nex:MusicExpression ex:hasCoreIdea ex:MusicExpression_CoreIdea_2 .\nex:MusicExpression_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"셈여림과 빠르기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicExpression ex:hasContentElement ex:MusicExpression_Elem_2_1 .\nex:MusicExpression_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"장단과 리듬꼴\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicExpression ex:hasContentElement ex:MusicExpression_Elem_2_2 .\nex:MusicExpression_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"협주와 화음\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicExpression ex:hasContentElement ex:MusicExpression_Elem_2_3 .\nex:MusicExpression_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"악보 읽고 계이름 부르기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicExpression ex:hasContentElement ex:MusicExpression_Skill_1 .\nex:MusicExpression_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"악기 주법 익혀 연주하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicExpression ex:hasContentElement ex:MusicExpression_Skill_2 .\nex:MusicExpression_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"합창 및 합주 호흡 맞추기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicExpression ex:hasContentElement ex:MusicExpression_Skill_3 .\n\n# [영역] 창작\nex:MusicCreation a ex:LearningArea ;\n    rdfs:label \"창작\"@ko .\nex:MusicCreation_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"창작 핵심 아이디어 1\"@ko ;\n    ex:description \"음악 창작은 소리의 성질과 음악 요소를 탐색하여 새로운 소리를 조직하는 행위이다.\"@ko .\nex:MusicCreation ex:hasCoreIdea ex:MusicCreation_CoreIdea_1 .\nex:MusicCreation_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"주변 소리 탐색\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicCreation ex:hasContentElement ex:MusicCreation_Elem_1_1 .\nex:MusicCreation_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"리듬꼴 만들기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicCreation ex:hasContentElement ex:MusicCreation_Elem_1_2 .\nex:MusicCreation_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"가사 바꾸기 및 간단한 가락 짓기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicCreation ex:hasContentElement ex:MusicCreation_Elem_1_3 .\nex:MusicCreation_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"창작 핵심 아이디어 2\"@ko ;\n    ex:description \"디지털 음악 도구를 활용하여 다양한 음악적 아이디어를 자유롭게 구현한다.\"@ko .\nex:MusicCreation ex:hasCoreIdea ex:MusicCreation_CoreIdea_2 .\nex:MusicCreation_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"신체 타악기 창작\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicCreation ex:hasContentElement ex:MusicCreation_Elem_2_1 .\nex:MusicCreation_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"디지털 음원 제작\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicCreation ex:hasContentElement ex:MusicCreation_Elem_2_2 .\nex:MusicCreation_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"극음악 배경음악 만들기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicCreation ex:hasContentElement ex:MusicCreation_Elem_2_3 .\nex:MusicCreation_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"말리듬 짓기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicCreation ex:hasContentElement ex:MusicCreation_Skill_1 .\nex:MusicCreation_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"오스티나토 만들기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicCreation ex:hasContentElement ex:MusicCreation_Skill_2 .\nex:MusicCreation_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"디지털 악기 앱으로 음악 만들기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicCreation ex:hasContentElement ex:MusicCreation_Skill_3 .\n\n# [영역] 감상\nex:MusicAppreciation a ex:LearningArea ;\n    rdfs:label \"감상\"@ko .\nex:MusicAppreciation_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"감상 핵심 아이디어 1\"@ko ;\n    ex:description \"음악 감상은 음악의 요소와 형식을 이해하고 심미적 반응을 경험하는 과정이다.\"@ko .\nex:MusicAppreciation ex:hasCoreIdea ex:MusicAppreciation_CoreIdea_1 .\nex:MusicAppreciation_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"악기 음색 구별\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicAppreciation ex:hasContentElement ex:MusicAppreciation_Elem_1_1 .\nex:MusicAppreciation_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"음악의 구조와 형식\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicAppreciation ex:hasContentElement ex:MusicAppreciation_Elem_1_2 .\nex:MusicAppreciation_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"표제음악과 순수음악\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicAppreciation ex:hasContentElement ex:MusicAppreciation_Elem_1_3 .\nex:MusicAppreciation_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"감상 핵심 아이디어 2\"@ko ;\n    ex:description \"우리 국악의 멋과 세계 여러 나라의 다양한 음악적 특징을 비교 감상한다.\"@ko .\nex:MusicAppreciation ex:hasCoreIdea ex:MusicAppreciation_CoreIdea_2 .\nex:MusicAppreciation_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"판소리·민요·사물놀이\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicAppreciation ex:hasContentElement ex:MusicAppreciation_Elem_2_1 .\nex:MusicAppreciation_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"세계 민속음악\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicAppreciation ex:hasContentElement ex:MusicAppreciation_Elem_2_2 .\nex:MusicAppreciation_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"시대별 클래식 음악\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicAppreciation ex:hasContentElement ex:MusicAppreciation_Elem_2_3 .\nex:MusicAppreciation_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"음악 요소 집중하여 듣기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicAppreciation ex:hasContentElement ex:MusicAppreciation_Skill_1 .\nex:MusicAppreciation_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"악곡의 특징 신체나 그림으로 표현하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicAppreciation ex:hasContentElement ex:MusicAppreciation_Skill_2 .\nex:MusicAppreciation_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"감상평 작성하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicAppreciation ex:hasContentElement ex:MusicAppreciation_Skill_3 .\n\n# [영역] 생활화\nex:MusicEverydayLife a ex:LearningArea ;\n    rdfs:label \"생활화\"@ko .\nex:MusicEverydayLife_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"생활화 핵심 아이디어 1\"@ko ;\n    ex:description \"음악은 개인의 정서 함양과 공동체의 화합을 이끄는 생활 속 문화이다.\"@ko .\nex:MusicEverydayLife ex:hasCoreIdea ex:MusicEverydayLife_CoreIdea_1 .\nex:MusicEverydayLife_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"생활 속 행사 음악\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicEverydayLife ex:hasContentElement ex:MusicEverydayLife_Elem_1_1 .\nex:MusicEverydayLife_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"음악을 통한 치유와 휴식\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicEverydayLife ex:hasContentElement ex:MusicEverydayLife_Elem_1_2 .\nex:MusicEverydayLife_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"교내외 음악 축제\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicEverydayLife ex:hasContentElement ex:MusicEverydayLife_Elem_1_3 .\nex:MusicEverydayLife_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"생활화 핵심 아이디어 2\"@ko ;\n    ex:description \"음악 저작권을 보호하고 바른 관람 예절을 실천하는 문화 시민으로 성장한다.\"@ko .\nex:MusicEverydayLife ex:hasCoreIdea ex:MusicEverydayLife_CoreIdea_2 .\nex:MusicEverydayLife_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"공연 관람 에티켓\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicEverydayLife ex:hasContentElement ex:MusicEverydayLife_Elem_2_1 .\nex:MusicEverydayLife_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"음악 저작권 존중\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicEverydayLife ex:hasContentElement ex:MusicEverydayLife_Elem_2_2 .\nex:MusicEverydayLife_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"지속적인 음악 활동 참여\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicEverydayLife ex:hasContentElement ex:MusicEverydayLife_Elem_2_3 .\nex:MusicEverydayLife_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"공연 관람 예절 지키기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicEverydayLife ex:hasContentElement ex:MusicEverydayLife_Skill_1 .\nex:MusicEverydayLife_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"음악 플레이리스트 만들기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicEverydayLife ex:hasContentElement ex:MusicEverydayLife_Skill_2 .\nex:MusicEverydayLife_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"음악 봉사 및 발표회 참여하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:MusicEverydayLife ex:hasContentElement ex:MusicEverydayLife_Skill_3 .\n",
  "체육과.ttl": "@prefix ex:   <https://example.org/curriculum/physical-education#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:PhysicalEducationCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 체육과 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 체육과 영역, 핵심 아이디어, 내용 범주 및 교과 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:PhysicalEducation a ex:Subject ;\n    rdfs:label \"체육\"@ko ;\n    ex:description \"신체활동 가치를 내면화하여 건강을 증진하고 스포츠 정신과 안전 의식을 함양하는 교과\"@ko ;\n    ex:hasArea ex:HealthMovement, ex:ChallengeMovement, ex:CompetitionMovement, ex:ExpressionMovement, ex:SafetyMovement .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"신체활동 역량\"@ko ;\n    ex:description \"다양한 신체활동에 능동적으로 참여하며 신체 움직임 능력을 개발하는 역량\"@ko .\nex:PhysicalEducation ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"건강 관리 역량\"@ko ;\n    ex:description \"신체 건강과 체력을 스스로 진단하고 지속적으로 운동을 실천하는 역량\"@ko .\nex:PhysicalEducation ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"스포츠맨십 역량\"@ko ;\n    ex:description \"경기 규칙을 준수하고 타인을 존중하며 협력과 페어플레이를 실천하는 역량\"@ko .\nex:PhysicalEducation ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"안전 의식 역량\"@ko ;\n    ex:description \"신체활동 중 발생할 수 있는 위험을 인지하고 예방 및 대처하는 역량\"@ko .\nex:PhysicalEducation ex:developsCompetency ex:Comp_4 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 건강\nex:HealthMovement a ex:LearningArea ;\n    rdfs:label \"건강\"@ko .\nex:HealthMovement_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"건강 핵심 아이디어 1\"@ko ;\n    ex:description \"건강은 신체적, 정신적, 사회적 안녕을 포괄하며 규칙적인 운동으로 유지된다.\"@ko .\nex:HealthMovement ex:hasCoreIdea ex:HealthMovement_CoreIdea_1 .\nex:HealthMovement_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"체력 측정 및 운동 처방\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HealthMovement ex:hasContentElement ex:HealthMovement_Elem_1_1 .\nex:HealthMovement_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"생활 습관과 면역\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HealthMovement ex:hasContentElement ex:HealthMovement_Elem_1_2 .\nex:HealthMovement_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자세와 체형 관리\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HealthMovement ex:hasContentElement ex:HealthMovement_Elem_1_3 .\nex:HealthMovement_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"건강 핵심 아이디어 2\"@ko ;\n    ex:description \"신체 성장에 따른 변화를 긍정적으로 수용하고 자기 존중감을 함양한다.\"@ko .\nex:HealthMovement ex:hasCoreIdea ex:HealthMovement_CoreIdea_2 .\nex:HealthMovement_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"성장과 발달\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HealthMovement ex:hasContentElement ex:HealthMovement_Elem_2_1 .\nex:HealthMovement_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"비만 예방\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HealthMovement ex:hasContentElement ex:HealthMovement_Elem_2_2 .\nex:HealthMovement_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"스트레스 해소\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HealthMovement ex:hasContentElement ex:HealthMovement_Elem_2_3 .\nex:HealthMovement_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"체력 측정하기(PAPS)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HealthMovement ex:hasContentElement ex:HealthMovement_Skill_1 .\nex:HealthMovement_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"체력 증진 운동 계획하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HealthMovement ex:hasContentElement ex:HealthMovement_Skill_2 .\nex:HealthMovement_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"스트레칭 및 바른 자세 실천하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:HealthMovement ex:hasContentElement ex:HealthMovement_Skill_3 .\n\n# [영역] 도전\nex:ChallengeMovement a ex:LearningArea ;\n    rdfs:label \"도전\"@ko .\nex:ChallengeMovement_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"도전 핵심 아이디어 1\"@ko ;\n    ex:description \"도전 활동은 자신의 한계를 극복하고 목표를 달성하는 과정에서 성취감을 준다.\"@ko .\nex:ChallengeMovement ex:hasCoreIdea ex:ChallengeMovement_CoreIdea_1 .\nex:ChallengeMovement_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"기록 도전(육상, 수영)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ChallengeMovement ex:hasContentElement ex:ChallengeMovement_Elem_1_1 .\nex:ChallengeMovement_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"동작 도전(체조, 매트 운동)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ChallengeMovement ex:hasContentElement ex:ChallengeMovement_Elem_1_2 .\nex:ChallengeMovement_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자신감과 인내심\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ChallengeMovement ex:hasContentElement ex:ChallengeMovement_Elem_1_3 .\nex:ChallengeMovement_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"도전 핵심 아이디어 2\"@ko ;\n    ex:description \"안전 장비와 규칙을 준수하며 두려움을 극복하고 끈기 있게 수련한다.\"@ko .\nex:ChallengeMovement ex:hasCoreIdea ex:ChallengeMovement_CoreIdea_2 .\nex:ChallengeMovement_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"위험 극복\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ChallengeMovement ex:hasContentElement ex:ChallengeMovement_Elem_2_1 .\nex:ChallengeMovement_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"정확한 기본 동작\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ChallengeMovement ex:hasContentElement ex:ChallengeMovement_Elem_2_2 .\nex:ChallengeMovement_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"지속적 연습\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ChallengeMovement ex:hasContentElement ex:ChallengeMovement_Elem_2_3 .\nex:ChallengeMovement_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"도전 목표 설정하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ChallengeMovement ex:hasContentElement ex:ChallengeMovement_Skill_1 .\nex:ChallengeMovement_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"기록 측정 및 비교하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ChallengeMovement ex:hasContentElement ex:ChallengeMovement_Skill_2 .\nex:ChallengeMovement_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"동작 분석 및 피드백하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ChallengeMovement ex:hasContentElement ex:ChallengeMovement_Skill_3 .\n\n# [영역] 경쟁\nex:CompetitionMovement a ex:LearningArea ;\n    rdfs:label \"경쟁\"@ko .\nex:CompetitionMovement_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"경쟁 핵심 아이디어 1\"@ko ;\n    ex:description \"경쟁 활동은 팀워크와 전략을 통해 상호작용하며 페어플레이 정신을 함양한다.\"@ko .\nex:CompetitionMovement ex:hasCoreIdea ex:CompetitionMovement_CoreIdea_1 .\nex:CompetitionMovement_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"영역형 경쟁(축구, 농구)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:CompetitionMovement ex:hasContentElement ex:CompetitionMovement_Elem_1_1 .\nex:CompetitionMovement_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"필드형 경쟁(발야구, 티볼)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:CompetitionMovement ex:hasContentElement ex:CompetitionMovement_Elem_1_2 .\nex:CompetitionMovement_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"네트형 경쟁(배드민턴)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:CompetitionMovement ex:hasContentElement ex:CompetitionMovement_Elem_1_3 .\nex:CompetitionMovement_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"경쟁 핵심 아이디어 2\"@ko ;\n    ex:description \"규칙을 준수하고 상대방을 배려하며 승패를 겸허히 수용하는 태도를 기른다.\"@ko .\nex:CompetitionMovement ex:hasCoreIdea ex:CompetitionMovement_CoreIdea_2 .\nex:CompetitionMovement_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"경기 전략 수립\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:CompetitionMovement ex:hasContentElement ex:CompetitionMovement_Elem_2_1 .\nex:CompetitionMovement_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"역할 분담과 소통\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:CompetitionMovement ex:hasContentElement ex:CompetitionMovement_Elem_2_2 .\nex:CompetitionMovement_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"스포츠맨십 발휘\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:CompetitionMovement ex:hasContentElement ex:CompetitionMovement_Elem_2_3 .\nex:CompetitionMovement_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"공 다루기 및 패스하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:CompetitionMovement ex:hasContentElement ex:CompetitionMovement_Skill_1 .\nex:CompetitionMovement_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"경기 전략 적용하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:CompetitionMovement ex:hasContentElement ex:CompetitionMovement_Skill_2 .\nex:CompetitionMovement_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"심판 판정 수용 및 상호 존중하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:CompetitionMovement ex:hasContentElement ex:CompetitionMovement_Skill_3 .\n\n# [영역] 표현\nex:ExpressionMovement a ex:LearningArea ;\n    rdfs:label \"표현\"@ko .\nex:ExpressionMovement_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"표현 핵심 아이디어 1\"@ko ;\n    ex:description \"표현 활동은 신체 움직임을 통해 생각과 감정을 심미적으로 나타내는 예술적 행위이다.\"@ko .\nex:ExpressionMovement ex:hasCoreIdea ex:ExpressionMovement_CoreIdea_1 .\nex:ExpressionMovement_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"기본 움직임 표현\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ExpressionMovement ex:hasContentElement ex:ExpressionMovement_Elem_1_1 .\nex:ExpressionMovement_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"리듬 표현(포크댄스, 음악줄넘기)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ExpressionMovement ex:hasContentElement ex:ExpressionMovement_Elem_1_2 .\nex:ExpressionMovement_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"주제 표현(창작 무용)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ExpressionMovement ex:hasContentElement ex:ExpressionMovement_Elem_1_3 .\nex:ExpressionMovement_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"표현 핵심 아이디어 2\"@ko ;\n    ex:description \"자신과 타인의 움직임을 감상하며 독창성과 다양성을 존중한다.\"@ko .\nex:ExpressionMovement ex:hasCoreIdea ex:ExpressionMovement_CoreIdea_2 .\nex:ExpressionMovement_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"움직임 요소 활용\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ExpressionMovement ex:hasContentElement ex:ExpressionMovement_Elem_2_1 .\nex:ExpressionMovement_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"창의적 표현\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ExpressionMovement ex:hasContentElement ex:ExpressionMovement_Elem_2_2 .\nex:ExpressionMovement_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"감상과 비평\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ExpressionMovement ex:hasContentElement ex:ExpressionMovement_Elem_2_3 .\nex:ExpressionMovement_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"리듬에 맞춰 신체 움직이기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ExpressionMovement ex:hasContentElement ex:ExpressionMovement_Skill_1 .\nex:ExpressionMovement_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"주제에 어울리는 동작 창작하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ExpressionMovement ex:hasContentElement ex:ExpressionMovement_Skill_2 .\nex:ExpressionMovement_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"신체 표현 작품 감상하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:ExpressionMovement ex:hasContentElement ex:ExpressionMovement_Skill_3 .\n\n# [영역] 안전\nex:SafetyMovement a ex:LearningArea ;\n    rdfs:label \"안전\"@ko .\nex:SafetyMovement_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"안전 핵심 아이디어 1\"@ko ;\n    ex:description \"신체활동과 일상생활의 안전 수칙을 준수하여 사고를 미연에 방지한다.\"@ko .\nex:SafetyMovement ex:hasCoreIdea ex:SafetyMovement_CoreIdea_1 .\nex:SafetyMovement_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"운동장·체육관 안전\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SafetyMovement ex:hasContentElement ex:SafetyMovement_Elem_1_1 .\nex:SafetyMovement_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"수상 안전 및 생존 수영\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SafetyMovement ex:hasContentElement ex:SafetyMovement_Elem_1_2 .\nex:SafetyMovement_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"응급처치와 심폐소생술\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SafetyMovement ex:hasContentElement ex:SafetyMovement_Elem_1_3 .\nex:SafetyMovement_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"안전 핵심 아이디어 2\"@ko ;\n    ex:description \"위기 상황 발생 시 신속하고 침착하게 대처하는 능력을 기른다.\"@ko .\nex:SafetyMovement ex:hasCoreIdea ex:SafetyMovement_CoreIdea_2 .\nex:SafetyMovement_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"대피 요령 숙지\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SafetyMovement ex:hasContentElement ex:SafetyMovement_Elem_2_1 .\nex:SafetyMovement_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"보호 장구 착용\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SafetyMovement ex:hasContentElement ex:SafetyMovement_Elem_2_2 .\nex:SafetyMovement_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"안전 의식 생활화\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SafetyMovement ex:hasContentElement ex:SafetyMovement_Elem_2_3 .\nex:SafetyMovement_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"생존 수영 실습하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SafetyMovement ex:hasContentElement ex:SafetyMovement_Skill_1 .\nex:SafetyMovement_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"간단한 응급처치(RICE) 수행하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SafetyMovement ex:hasContentElement ex:SafetyMovement_Skill_2 .\nex:SafetyMovement_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"안전 점검 체크리스트 작성하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SafetyMovement ex:hasContentElement ex:SafetyMovement_Skill_3 .\n",
  "통합교과.ttl": "@prefix ex:   <https://example.org/curriculum/integrated-subjects#> .\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl:  <http://www.w3.org/2002/07/owl#> .\n@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .\n@prefix dc:   <http://purl.org/dc/elements/1.1/> .\n\nex:IntegratedSubjectsCurriculum a owl:Ontology ;\n    dc:title \"2022 개정 초등학교 통합교과(바른생활·슬기로운생활·즐거운생활) 교육과정 구조화\"@ko ;\n    dc:description \"2022 개정 초등학교 1-2학년군 바른 생활, 슬기로운 생활, 즐거운 생활의 영역, 핵심 아이디어, 내용 범주 및 역량을 표현한 온톨로지\"@ko .\n\n# --- RDFS: 클래스 정의 ---\nex:Curriculum a owl:Class ; rdfs:label \"교육과정\"@ko .\nex:Subject a owl:Class ; rdfs:subClassOf ex:Curriculum ; rdfs:label \"교과\"@ko .\nex:LearningArea a owl:Class ; rdfs:label \"내용 영역\"@ko .\nex:CoreIdea a owl:Class ; rdfs:label \"핵심 아이디어\"@ko .\nex:ContentElement a owl:Class ; rdfs:label \"내용 요소\"@ko .\nex:Competency a owl:Class ; rdfs:label \"역량\"@ko .\nex:ProcessSkill a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"과정·기능\"@ko .\nex:ValueAttitude a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"가치·태도\"@ko .\nex:KnowledgeUnderstanding a owl:Class ; rdfs:subClassOf ex:ContentElement ; rdfs:label \"지식·이해\"@ko .\n\n# --- 속성 정의 (Object & Datatype Properties) ---\nex:hasArea a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:LearningArea ; rdfs:label \"포함 영역\"@ko .\nex:hasCoreIdea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:CoreIdea ; rdfs:label \"핵심 아이디어\"@ko .\nex:hasContentElement a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:ContentElement ; rdfs:label \"내용 요소\"@ko .\nex:developsCompetency a owl:ObjectProperty ;\n    rdfs:domain ex:Subject ; rdfs:range ex:Competency ; rdfs:label \"함양 역량\"@ko .\nex:relatedToArea a owl:ObjectProperty ;\n    rdfs:domain ex:LearningArea ; rdfs:range ex:LearningArea ; rdfs:label \"관련 영역\"@ko .\nex:gradeBand a owl:DatatypeProperty ;\n    rdfs:domain ex:ContentElement ; rdfs:range xsd:string ; rdfs:label \"학년군\"@ko .\nex:description a owl:DatatypeProperty ;\n    rdfs:range xsd:string ; rdfs:label \"설명\"@ko .\n\n# --- OWL: 제약 및 공리 ---\nex:LearningArea owl:disjointWith ex:CoreIdea, ex:ContentElement, ex:Competency .\nex:CoreIdea owl:disjointWith ex:ContentElement, ex:Competency .\nex:KnowledgeUnderstanding owl:disjointWith ex:ProcessSkill, ex:ValueAttitude .\nex:ProcessSkill owl:disjointWith ex:ValueAttitude .\n\n# --- RDF: 교과 개체 ---\nex:IntegratedSubjects a ex:Subject ;\n    rdfs:label \"통합교과\"@ko ;\n    ex:description \"초등학교 1-2학년 학생의 발달 특성을 고려하여 자신, 학교, 마을, 계절 등 학생의 삶과 밀접한 주제를 통합적으로 탐구하고 실천하는 교과\"@ko ;\n    ex:hasArea ex:SchoolAndI, ex:PeopleAndVillage, ex:NatureAndSeasons, ex:WorldAndFuture .\n\n# --- 교과 역량 인스턴스 ---\nex:Comp_1 a ex:Competency ;\n    rdfs:label \"지금-여기-우리 삶 역량\"@ko ;\n    ex:description \"자신의 일상과 주변 세계를 주체적으로 인식하고 건강하게 살아가는 역량\"@ko .\nex:IntegratedSubjects ex:developsCompetency ex:Comp_1 .\nex:Comp_2 a ex:Competency ;\n    rdfs:label \"탐구 역량\"@ko ;\n    ex:description \"주변의 사람, 사물, 자연에 호기심을 가지고 관찰하며 질문하고 탐구하는 역량\"@ko .\nex:IntegratedSubjects ex:developsCompetency ex:Comp_2 .\nex:Comp_3 a ex:Competency ;\n    rdfs:label \"표현 역량\"@ko ;\n    ex:description \"신체, 음악, 미술, 놀이 등 다양한 감각과 방법으로 자신의 생각과 느낌을 표현하는 역량\"@ko .\nex:IntegratedSubjects ex:developsCompetency ex:Comp_3 .\nex:Comp_4 a ex:Competency ;\n    rdfs:label \"실천 역량\"@ko ;\n    ex:description \"기본적인 생활 습관과 안전 수칙을 지키며 공동체 속에서 배려하고 협력하는 역량\"@ko .\nex:IntegratedSubjects ex:developsCompetency ex:Comp_4 .\n\n# --- 내용 영역 및 핵심 아이디어, 내용 요소 ---\n# [영역] 학교와 나\nex:SchoolAndI a ex:LearningArea ;\n    rdfs:label \"학교와 나\"@ko .\nex:SchoolAndI_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"학교와 나 핵심 아이디어 1\"@ko ;\n    ex:description \"학교는 다양한 친구들과 선생님이 함께 생활하며 배우고 성장하는 배움터이다.\"@ko .\nex:SchoolAndI ex:hasCoreIdea ex:SchoolAndI_CoreIdea_1 .\nex:SchoolAndI_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"학교 시설과 친구들\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SchoolAndI ex:hasContentElement ex:SchoolAndI_Elem_1_1 .\nex:SchoolAndI_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"학급 규칙과 약속\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SchoolAndI ex:hasContentElement ex:SchoolAndI_Elem_1_2 .\nex:SchoolAndI_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"나의 몸과 마음 돌보기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SchoolAndI ex:hasContentElement ex:SchoolAndI_Elem_1_3 .\nex:SchoolAndI_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"학교와 나 핵심 아이디어 2\"@ko ;\n    ex:description \"기본 생활 습관을 바르게 익히고 건강한 자아를 형성한다.\"@ko .\nex:SchoolAndI ex:hasCoreIdea ex:SchoolAndI_CoreIdea_2 .\nex:SchoolAndI_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"바른 생활 습관\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SchoolAndI ex:hasContentElement ex:SchoolAndI_Elem_2_1 .\nex:SchoolAndI_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"안전한 등하굣길\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SchoolAndI ex:hasContentElement ex:SchoolAndI_Elem_2_2 .\nex:SchoolAndI_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"친구와 사이좋게 지내기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SchoolAndI ex:hasContentElement ex:SchoolAndI_Elem_2_3 .\nex:SchoolAndI_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"학교 탐방하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SchoolAndI ex:hasContentElement ex:SchoolAndI_Skill_1 .\nex:SchoolAndI_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"약속 정하고 지키기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SchoolAndI ex:hasContentElement ex:SchoolAndI_Skill_2 .\nex:SchoolAndI_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"자기소개 놀이하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:SchoolAndI ex:hasContentElement ex:SchoolAndI_Skill_3 .\n\n# [영역] 사람과 마을\nex:PeopleAndVillage a ex:LearningArea ;\n    rdfs:label \"사람과 마을\"@ko .\nex:PeopleAndVillage_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"사람과 마을 핵심 아이디어 1\"@ko ;\n    ex:description \"마을은 다양한 사람들의 삶의 터전이며 서로 도우며 살아가는 공동체이다.\"@ko .\nex:PeopleAndVillage ex:hasCoreIdea ex:PeopleAndVillage_CoreIdea_1 .\nex:PeopleAndVillage_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"마을의 다양한 직업\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PeopleAndVillage ex:hasContentElement ex:PeopleAndVillage_Elem_1_1 .\nex:PeopleAndVillage_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"고마운 이웃들\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PeopleAndVillage ex:hasContentElement ex:PeopleAndVillage_Elem_1_2 .\nex:PeopleAndVillage_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"우리 마을의 여러 장소\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PeopleAndVillage ex:hasContentElement ex:PeopleAndVillage_Elem_1_3 .\nex:PeopleAndVillage_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"사람과 마을 핵심 아이디어 2\"@ko ;\n    ex:description \"이웃과 어울려 소통하고 공공장소의 예절과 질서를 실천한다.\"@ko .\nex:PeopleAndVillage ex:hasCoreIdea ex:PeopleAndVillage_CoreIdea_2 .\nex:PeopleAndVillage_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"이웃 배려하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PeopleAndVillage ex:hasContentElement ex:PeopleAndVillage_Elem_2_1 .\nex:PeopleAndVillage_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"공공시설 올바르게 이용하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PeopleAndVillage ex:hasContentElement ex:PeopleAndVillage_Elem_2_2 .\nex:PeopleAndVillage_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"마을 축제 참여\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PeopleAndVillage ex:hasContentElement ex:PeopleAndVillage_Elem_2_3 .\nex:PeopleAndVillage_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"마을 지도 그리기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PeopleAndVillage ex:hasContentElement ex:PeopleAndVillage_Skill_1 .\nex:PeopleAndVillage_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"고마운 분들께 편지 쓰기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PeopleAndVillage ex:hasContentElement ex:PeopleAndVillage_Skill_2 .\nex:PeopleAndVillage_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"역할놀이(가게 놀이, 직업 놀이)\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:PeopleAndVillage ex:hasContentElement ex:PeopleAndVillage_Skill_3 .\n\n# [영역] 자연과 계절(봄·여름·가을·겨울)\nex:NatureAndSeasons a ex:LearningArea ;\n    rdfs:label \"자연과 계절(봄·여름·가을·겨울)\"@ko .\nex:NatureAndSeasons_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"자연과 계절(봄·여름·가을·겨울) 핵심 아이디어 1\"@ko ;\n    ex:description \"자연은 계절의 흐름에 따라 변화하며 생명들이 저마다의 모습으로 살아간다.\"@ko .\nex:NatureAndSeasons ex:hasCoreIdea ex:NatureAndSeasons_CoreIdea_1 .\nex:NatureAndSeasons_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"사계절의 날씨 변화\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureAndSeasons ex:hasContentElement ex:NatureAndSeasons_Elem_1_1 .\nex:NatureAndSeasons_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"계절별 동식물의 모습\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureAndSeasons ex:hasContentElement ex:NatureAndSeasons_Elem_1_2 .\nex:NatureAndSeasons_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자연의 아름다움 느끼기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureAndSeasons ex:hasContentElement ex:NatureAndSeasons_Elem_1_3 .\nex:NatureAndSeasons_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"자연과 계절(봄·여름·가을·겨울) 핵심 아이디어 2\"@ko ;\n    ex:description \"계절의 변화에 알맞게 생활하며 생명을 소중히 여기고 환경을 보호한다.\"@ko .\nex:NatureAndSeasons ex:hasCoreIdea ex:NatureAndSeasons_CoreIdea_2 .\nex:NatureAndSeasons_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"계절별 생활 모습\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureAndSeasons ex:hasContentElement ex:NatureAndSeasons_Elem_2_1 .\nex:NatureAndSeasons_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"생명 존중 실천\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureAndSeasons ex:hasContentElement ex:NatureAndSeasons_Elem_2_2 .\nex:NatureAndSeasons_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"자연물 놀이\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureAndSeasons ex:hasContentElement ex:NatureAndSeasons_Elem_2_3 .\nex:NatureAndSeasons_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"자연물 관찰하고 채집하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureAndSeasons ex:hasContentElement ex:NatureAndSeasons_Skill_1 .\nex:NatureAndSeasons_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"계절 노래 부르고 신체 표현하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureAndSeasons ex:hasContentElement ex:NatureAndSeasons_Skill_2 .\nex:NatureAndSeasons_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"자연물로 만들기 놀이\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:NatureAndSeasons ex:hasContentElement ex:NatureAndSeasons_Skill_3 .\n\n# [영역] 세계와 미래\nex:WorldAndFuture a ex:LearningArea ;\n    rdfs:label \"세계와 미래\"@ko .\nex:WorldAndFuture_CoreIdea_1 a ex:CoreIdea ;\n    rdfs:label \"세계와 미래 핵심 아이디어 1\"@ko ;\n    ex:description \"세상에는 다양한 나라와 문화가 존재하며 우리는 서로 연결되어 있다.\"@ko .\nex:WorldAndFuture ex:hasCoreIdea ex:WorldAndFuture_CoreIdea_1 .\nex:WorldAndFuture_Elem_1_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"다양한 나라의 문화와 놀이\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:WorldAndFuture ex:hasContentElement ex:WorldAndFuture_Elem_1_1 .\nex:WorldAndFuture_Elem_1_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"미래의 모습 상상하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:WorldAndFuture ex:hasContentElement ex:WorldAndFuture_Elem_1_2 .\nex:WorldAndFuture_Elem_1_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"통일과 평화\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:WorldAndFuture ex:hasContentElement ex:WorldAndFuture_Elem_1_3 .\nex:WorldAndFuture_CoreIdea_2 a ex:CoreIdea ;\n    rdfs:label \"세계와 미래 핵심 아이디어 2\"@ko ;\n    ex:description \"새로운 세계에 대한 호기심을 가지고 상상력과 창의성을 발휘한다.\"@ko .\nex:WorldAndFuture ex:hasCoreIdea ex:WorldAndFuture_CoreIdea_2 .\nex:WorldAndFuture_Elem_2_1 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"미래 기술 상상 놀이\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:WorldAndFuture ex:hasContentElement ex:WorldAndFuture_Elem_2_1 .\nex:WorldAndFuture_Elem_2_2 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"세계 전통 놀이 체험\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:WorldAndFuture ex:hasContentElement ex:WorldAndFuture_Elem_2_2 .\nex:WorldAndFuture_Elem_2_3 a ex:KnowledgeUnderstanding ;\n    rdfs:label \"지구촌 친구들에게 인사하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:WorldAndFuture ex:hasContentElement ex:WorldAndFuture_Elem_2_3 .\nex:WorldAndFuture_Skill_1 a ex:ProcessSkill ;\n    rdfs:label \"세계 여러 나라 전통의상 꾸미기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:WorldAndFuture ex:hasContentElement ex:WorldAndFuture_Skill_1 .\nex:WorldAndFuture_Skill_2 a ex:ProcessSkill ;\n    rdfs:label \"미래 마을 상상화 그리기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:WorldAndFuture ex:hasContentElement ex:WorldAndFuture_Skill_2 .\nex:WorldAndFuture_Skill_3 a ex:ProcessSkill ;\n    rdfs:label \"다문화 놀이하기\"@ko ;\n    ex:gradeBand \"초등\"@ko .\nex:WorldAndFuture ex:hasContentElement ex:WorldAndFuture_Skill_3 .\n",
};
// Auto-generated module for Educational Platform Integration
window.INQUIRY_DATA = {
  "metadata": {
    "title": "초등 11개 교과 표준 수행동사 및 개념기반 탐구·독서·정보활용 연계 데이터베이스",
    "version": "2026.1.0",
    "curriculumRevision": "2022 개정 초등 교육과정",
    "totalRawItems": 576,
    "totalStandardVerbs": 113,
    "totalStrategies": 29
  },
  "inquiryPhases": {
    "1단계": {
      "phase": "1단계",
      "phaseName": "1단계: 관계맺기 (Engage)",
      "corePurpose": "호기심 유발 및 학생 삶/배경지식 연결",
      "uniqueVerbCount": 24,
      "totalFrequency": 85,
      "topVerbs": "탐색하기(27), 인식하기(7), 생각하기(6), 놀이하기(5), 반응하기(3)",
      "recommendedStrategies": "도발적 자극(Provocation), See-Think-Wonder, Chalk Talk, K-W-L-S"
    },
    "2단계": {
      "phase": "2단계",
      "phaseName": "2단계: 집중하기 (Focus)",
      "corePurpose": "탐구 초점 명료화, 개념 속성 정의, 질문 구체화",
      "uniqueVerbCount": 8,
      "totalFrequency": 24,
      "topVerbs": "설계하기(7), 선택하기(5), 식별하기(4), 계획하기(2), 구별하기(2)",
      "recommendedStrategies": "개념 획득 모델, 프레이어 모델(Frayer Model), QFT(질문생성기법), 개념 카드 소팅"
    },
    "3단계": {
      "phase": "3단계",
      "phaseName": "3단계: 조사하기 (Investigate)",
      "corePurpose": "다양한 텍스트·데이터 탐색, 사실적 증거 수집",
      "uniqueVerbCount": 15,
      "totalFrequency": 98,
      "topVerbs": "탐구하기(18), 읽기(18), 조사하기(17), 듣기(8), 수집하기(8)",
      "recommendedStrategies": "Big6 정보탐색, SQ3R, 직소(Jigsaw) 협동독서, 다중 사례 연구, 출처 추적"
    },
    "4단계": {
      "phase": "4단계",
      "phaseName": "4단계: 조직하기 (Organize)",
      "corePurpose": "수집 데이터 범주화, 인과관계 및 패턴 구조화",
      "uniqueVerbCount": 12,
      "totalFrequency": 84,
      "topVerbs": "파악하기(28), 분석하기(11), 비교하기(10), 이해하기(7), 계산하기(7)",
      "recommendedStrategies": "개념도(Concept Map), C-E-C(연결·확장·도전), 벤다이어그램, 인과관계 사슬망, PMI"
    },
    "5단계": {
      "phase": "5단계",
      "phaseName": "5단계: 일반화하기 (Generalize)",
      "corePurpose": "개념 간의 관계 도출, 보편적 일반화 진술 형성",
      "uniqueVerbCount": 8,
      "totalFrequency": 40,
      "topVerbs": "설명하기(16), 해석하기(6), 추론하기(6), 도출하기(4), 요약하기(3)",
      "recommendedStrategies": "귀납적 일반화 유도(Erickson Stems), 헤드라인(Headlines), 문·구·단(S-P-W) 루틴"
    },
    "6단계": {
      "phase": "6단계",
      "phaseName": "6단계: 전이하기 (Transfer)",
      "corePurpose": "일반화된 개념 이해를 실생활 문제 및 새 맥락에 적용",
      "uniqueVerbCount": 32,
      "totalFrequency": 188,
      "topVerbs": "표현하기(31), 활용하기(26), 활동하기(15), 쓰기(15), 문제해결하기(11)",
      "recommendedStrategies": "GRASPS 참과제, 유추적 전이(Analogical Transfer), 행동 실천 프로젝트(Action), 4칸 문제해결"
    },
    "7단계": {
      "phase": "7단계",
      "phaseName": "7단계: 성찰하기 (Reflect)",
      "corePurpose": "사고 변화 메타인지 성찰 및 후속 탐구 연계",
      "uniqueVerbCount": 14,
      "totalFrequency": 57,
      "topVerbs": "소통하기(10), 점검하기(10), 공유하기(8), 고려하기(8), 평가하기(6)",
      "recommendedStrategies": "예전에는-지금은(I used to think...), 3-2-1 다리놓기, 나침반(Compass Points), 배움 여정 지도"
    }
  },
  "processSkills": {
    "표현하기": {
      "rank": 1,
      "verb": "표현하기",
      "subjectCount": 8,
      "totalFrequency": 31,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "새로운 산출물 구현",
      "recommendedStrategies": [
        "미니북 제작",
        "스케치 노트",
        "정보 스케치"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "사회과",
        "수학과",
        "과학과",
        "체육과",
        "음악과",
        "영어과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 8,
        "사회과": 3,
        "수학과": 3,
        "과학과": 4,
        "체육과": 1,
        "음악과": 4,
        "영어과": 6,
        "바슬즐(통합)": 2
      }
    },
    "탐색하기": {
      "rank": 2,
      "verb": "탐색하기",
      "subjectCount": 8,
      "totalFrequency": 27,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "초기 소재 및 주변 탐색",
      "recommendedStrategies": [
        "KWLS",
        "질문 그물망"
      ],
      "recommendedInfoStage": "2단계(탐색전략)",
      "subjects": [
        "국어과",
        "도덕과",
        "사회과",
        "실과/정보과",
        "체육과",
        "음악과",
        "미술과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "도덕과": 7,
        "사회과": 2,
        "실과/정보과": 8,
        "체육과": 1,
        "음악과": 1,
        "미술과": 3,
        "바슬즐(통합)": 4
      }
    },
    "활용하기": {
      "rank": 3,
      "verb": "활용하기",
      "subjectCount": 8,
      "totalFrequency": 26,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "새 맥락에 지식 적용",
      "recommendedStrategies": [
        "GRASPS 참과제",
        "유추적 전이"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "사회과",
        "과학과",
        "체육과",
        "음악과",
        "미술과",
        "영어과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 5,
        "사회과": 4,
        "과학과": 4,
        "체육과": 2,
        "음악과": 1,
        "미술과": 4,
        "영어과": 4,
        "바슬즐(통합)": 2
      }
    },
    "설명하기": {
      "rank": 4,
      "verb": "설명하기",
      "subjectCount": 7,
      "totalFrequency": 16,
      "inquiryPhase": "5단계",
      "phaseEnglish": "Generalize",
      "phaseCharacter": "원리 및 인과 서술",
      "recommendedStrategies": [
        "말풍선 설명",
        "핵심 한 장 카드",
        "토큰 대화"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "도덕과",
        "수학과",
        "과학과",
        "실과/정보과",
        "음악과",
        "미술과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "도덕과": 3,
        "수학과": 4,
        "과학과": 5,
        "실과/정보과": 1,
        "음악과": 1,
        "미술과": 1,
        "바슬즐(통합)": 1
      }
    },
    "소통하기": {
      "rank": 5,
      "verb": "소통하기",
      "subjectCount": 6,
      "totalFrequency": 10,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "성찰 공유 및 상호작용",
      "recommendedStrategies": [
        "띵페세(Think-Pair-Share)",
        "토큰 대화"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "국어과",
        "도덕과",
        "과학과",
        "음악과",
        "영어과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "도덕과": 1,
        "과학과": 1,
        "음악과": 2,
        "영어과": 2,
        "바슬즐(통합)": 2
      }
    },
    "제작하기": {
      "rank": 6,
      "verb": "제작하기",
      "subjectCount": 6,
      "totalFrequency": 9,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "메이커 및 실물 제작",
      "recommendedStrategies": [
        "미니북 제작",
        "프로젝트 보드",
        "창작물"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "수학과",
        "실과/정보과",
        "음악과",
        "미술과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "수학과": 1,
        "실과/정보과": 3,
        "음악과": 1,
        "미술과": 1,
        "바슬즐(통합)": 1
      }
    },
    "파악하기": {
      "rank": 7,
      "verb": "파악하기",
      "subjectCount": 5,
      "totalFrequency": 28,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "맥락 및 핵심 파악",
      "recommendedStrategies": [
        "사슬 그리기",
        "SQ3R",
        "스케치 노트"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "국어과",
        "사회과",
        "실과/정보과",
        "체육과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 9,
        "사회과": 3,
        "실과/정보과": 2,
        "체육과": 10,
        "영어과": 4
      }
    },
    "문제해결하기": {
      "rank": 8,
      "verb": "문제해결하기",
      "subjectCount": 5,
      "totalFrequency": 11,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "실제 상황 문제 해결",
      "recommendedStrategies": [
        "4칸 문제해결",
        "GRASPS 참과제"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "사회과",
        "수학과",
        "과학과",
        "실과/정보과"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "사회과": 3,
        "수학과": 4,
        "과학과": 1,
        "실과/정보과": 1
      }
    },
    "생각하기": {
      "rank": 9,
      "verb": "생각하기",
      "subjectCount": 5,
      "totalFrequency": 6,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "선수지식 상기 및 착상",
      "recommendedStrategies": [
        "라면 대화(만약~라면?)",
        "브레인라이팅"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과",
        "도덕과",
        "음악과",
        "미술과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "도덕과": 1,
        "음악과": 1,
        "미술과": 1,
        "바슬즐(통합)": 1
      }
    },
    "참여하기": {
      "rank": 10,
      "verb": "참여하기",
      "subjectCount": 5,
      "totalFrequency": 5,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "공동체 실천 및 연대",
      "recommendedStrategies": [
        "월드카페",
        "아하 대화",
        "캠페인"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "사회과",
        "실과/정보과",
        "미술과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "사회과": 1,
        "실과/정보과": 1,
        "미술과": 1,
        "바슬즐(통합)": 1
      }
    },
    "탐구하기": {
      "rank": 11,
      "verb": "탐구하기",
      "subjectCount": 4,
      "totalFrequency": 18,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "체계적 조사 및 실험",
      "recommendedStrategies": [
        "직소(Jigsaw) 협동 탐구",
        "실험 관찰"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "도덕과",
        "사회과",
        "수학과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "도덕과": 1,
        "사회과": 4,
        "수학과": 10,
        "바슬즐(통합)": 3
      }
    },
    "조사하기": {
      "rank": 12,
      "verb": "조사하기",
      "subjectCount": 4,
      "totalFrequency": 17,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "자료 및 데이터 탐색",
      "recommendedStrategies": [
        "Big6 정보탐색",
        "출처 추적",
        "SQ3R"
      ],
      "recommendedInfoStage": "3단계(소재파악·접근)",
      "subjects": [
        "도덕과",
        "사회과",
        "과학과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "도덕과": 3,
        "사회과": 11,
        "과학과": 1,
        "바슬즐(통합)": 2
      }
    },
    "활동하기": {
      "rank": 13,
      "verb": "활동하기",
      "subjectCount": 4,
      "totalFrequency": 15,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "실천적 과제 수행",
      "recommendedStrategies": [
        "행동 실천 프로젝트",
        "역할극"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "실과/정보과",
        "체육과",
        "음악과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "실과/정보과": 5,
        "체육과": 3,
        "음악과": 4,
        "바슬즐(통합)": 3
      }
    },
    "분석하기": {
      "rank": 14,
      "verb": "분석하기",
      "subjectCount": 4,
      "totalFrequency": 11,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "요소 분해 및 심층 파악",
      "recommendedStrategies": [
        "PMI",
        "질문 해부 전략",
        "Y차트"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "국어과",
        "사회과",
        "과학과",
        "미술과"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "사회과": 5,
        "과학과": 3,
        "미술과": 1
      }
    },
    "비교하기": {
      "rank": 15,
      "verb": "비교하기",
      "subjectCount": 4,
      "totalFrequency": 10,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "공통점과 차이점 대조",
      "recommendedStrategies": [
        "벤다이어그램",
        "비교 매트릭스"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "국어과",
        "사회과",
        "수학과",
        "과학과"
      ],
      "subjectFrequencies": {
        "국어과": 3,
        "사회과": 2,
        "수학과": 2,
        "과학과": 3
      }
    },
    "공유하기": {
      "rank": 16,
      "verb": "공유하기",
      "subjectCount": 4,
      "totalFrequency": 8,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "배움 나눔 및 환류",
      "recommendedStrategies": [
        "띵페세",
        "브레인라이팅",
        "의견벽"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "국어과",
        "과학과",
        "실과/정보과",
        "미술과"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "과학과": 4,
        "실과/정보과": 1,
        "미술과": 1
      }
    },
    "적용하기": {
      "rank": 17,
      "verb": "적용하기",
      "subjectCount": 4,
      "totalFrequency": 7,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "타 영역/실생활 전이",
      "recommendedStrategies": [
        "유추적 전이",
        "행동 실천 프로젝트"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "과학과",
        "실과/정보과",
        "체육과",
        "미술과"
      ],
      "subjectFrequencies": {
        "과학과": 4,
        "실과/정보과": 1,
        "체육과": 1,
        "미술과": 1
      }
    },
    "해석하기": {
      "rank": 18,
      "verb": "해석하기",
      "subjectCount": 4,
      "totalFrequency": 6,
      "inquiryPhase": "5단계",
      "phaseEnglish": "Generalize",
      "phaseCharacter": "자료 및 현상 의미화",
      "recommendedStrategies": [
        "이야기별 그리기",
        "관점 분석"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "사회과",
        "수학과",
        "과학과",
        "미술과"
      ],
      "subjectFrequencies": {
        "사회과": 1,
        "수학과": 1,
        "과학과": 2,
        "미술과": 2
      }
    },
    "확인하기": {
      "rank": 19,
      "verb": "확인하기",
      "subjectCount": 4,
      "totalFrequency": 6,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "사실 확인 및 검증",
      "recommendedStrategies": [
        "출처 추적",
        "팩트체크"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "국어과",
        "사회과",
        "실과/정보과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "사회과": 2,
        "실과/정보과": 1,
        "영어과": 1
      }
    },
    "관찰하기": {
      "rank": 20,
      "verb": "관찰하기",
      "subjectCount": 4,
      "totalFrequency": 5,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "현상 및 대상 정밀 관찰",
      "recommendedStrategies": [
        "관찰 일지",
        "사실 수집 카드"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "국어과",
        "도덕과",
        "사회과",
        "과학과"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "도덕과": 1,
        "사회과": 1,
        "과학과": 1
      }
    },
    "읽기": {
      "rank": 21,
      "verb": "읽기",
      "subjectCount": 3,
      "totalFrequency": 18,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "텍스트 심층 독해",
      "recommendedStrategies": [
        "SQ3R",
        "문맥 단서 추론"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "국어과",
        "수학과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 10,
        "수학과": 1,
        "영어과": 7
      }
    },
    "쓰기": {
      "rank": 22,
      "verb": "쓰기",
      "subjectCount": 3,
      "totalFrequency": 15,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "글 및 제안서 작성",
      "recommendedStrategies": [
        "제안서 쓰기",
        "주장하는 글",
        "캠페인"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "수학과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 6,
        "수학과": 1,
        "영어과": 8
      }
    },
    "점검하기": {
      "rank": 23,
      "verb": "점검하기",
      "subjectCount": 3,
      "totalFrequency": 10,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "과정 및 결과 모니터링",
      "recommendedStrategies": [
        "자기점검 체크리스트",
        "예전에는-지금은"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "국어과",
        "도덕과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 6,
        "도덕과": 2,
        "영어과": 2
      }
    },
    "듣기": {
      "rank": 24,
      "verb": "듣기",
      "subjectCount": 3,
      "totalFrequency": 8,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "구어 정보 청취 및 이해",
      "recommendedStrategies": [
        "경청 기록지",
        "음성자료 분석"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "국어과",
        "음악과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "음악과": 2,
        "영어과": 5
      }
    },
    "수집하기": {
      "rank": 25,
      "verb": "수집하기",
      "subjectCount": 3,
      "totalFrequency": 8,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "정보원 및 사례 수집",
      "recommendedStrategies": [
        "정보 장바구니",
        "발췌록 작성"
      ],
      "recommendedInfoStage": "3단계(소재파악·접근)",
      "subjects": [
        "사회과",
        "수학과",
        "과학과"
      ],
      "subjectFrequencies": {
        "사회과": 2,
        "수학과": 2,
        "과학과": 4
      }
    },
    "살펴보기": {
      "rank": 26,
      "verb": "살펴보기",
      "subjectCount": 3,
      "totalFrequency": 7,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "전반적 훑어보기",
      "recommendedStrategies": [
        "SQ3R(Survey)",
        "훑어읽기"
      ],
      "recommendedInfoStage": "3단계(소재파악·접근)",
      "subjects": [
        "도덕과",
        "실과/정보과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "도덕과": 3,
        "실과/정보과": 2,
        "바슬즐(통합)": 2
      }
    },
    "이해하기": {
      "rank": 27,
      "verb": "이해하기",
      "subjectCount": 3,
      "totalFrequency": 7,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "개념적 의미 파악",
      "recommendedStrategies": [
        "이야기별 그리기",
        "사슬 그리기"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "국어과",
        "체육과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 3,
        "체육과": 1,
        "영어과": 3
      }
    },
    "인식하기": {
      "rank": 28,
      "verb": "인식하기",
      "subjectCount": 3,
      "totalFrequency": 7,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "문제 및 상황 인식",
      "recommendedStrategies": [
        "도발적 자극",
        "질문 그물망"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과",
        "과학과",
        "음악과"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "과학과": 5,
        "음악과": 1
      }
    },
    "구성하기": {
      "rank": 29,
      "verb": "구성하기",
      "subjectCount": 3,
      "totalFrequency": 6,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "새 모델/체계 구축",
      "recommendedStrategies": [
        "미니북 제작",
        "융합 모델링"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "사회과",
        "체육과"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "사회과": 3,
        "체육과": 1
      }
    },
    "나타내기": {
      "rank": 30,
      "verb": "나타내기",
      "subjectCount": 3,
      "totalFrequency": 6,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "시각적/조형적 표출",
      "recommendedStrategies": [
        "인포그래픽",
        "시각 디자인"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "수학과",
        "음악과",
        "미술과"
      ],
      "subjectFrequencies": {
        "수학과": 4,
        "음악과": 1,
        "미술과": 1
      }
    },
    "사용하기": {
      "rank": 31,
      "verb": "사용하기",
      "subjectCount": 3,
      "totalFrequency": 6,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "도구 및 매체 실사용",
      "recommendedStrategies": [
        "도구 조작 실습"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "수학과",
        "과학과"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "수학과": 1,
        "과학과": 3
      }
    },
    "추론하기": {
      "rank": 32,
      "verb": "추론하기",
      "subjectCount": 3,
      "totalFrequency": 6,
      "inquiryPhase": "5단계",
      "phaseEnglish": "Generalize",
      "phaseCharacter": "논리적 법칙 유도",
      "recommendedStrategies": [
        "라면 대화",
        "귀납적 일반화 유도"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "국어과",
        "사회과",
        "수학과"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "사회과": 2,
        "수학과": 2
      }
    },
    "놀이하기": {
      "rank": 33,
      "verb": "놀이하기",
      "subjectCount": 3,
      "totalFrequency": 5,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "동기유발 및 신체활동",
      "recommendedStrategies": [
        "놀이 기반 탐색"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과",
        "음악과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "음악과": 1,
        "바슬즐(통합)": 3
      }
    },
    "선택하기": {
      "rank": 34,
      "verb": "선택하기",
      "subjectCount": 3,
      "totalFrequency": 5,
      "inquiryPhase": "2단계",
      "phaseEnglish": "Focus",
      "phaseCharacter": "탐구 주제/방향 선정",
      "recommendedStrategies": [
        "QFT(질문생성기법)",
        "토큰 대화"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과",
        "도덕과",
        "사회과"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "도덕과": 1,
        "사회과": 3
      }
    },
    "실천하기": {
      "rank": 35,
      "verb": "실천하기",
      "subjectCount": 3,
      "totalFrequency": 5,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "생활 속 행동 실천",
      "recommendedStrategies": [
        "행동 실천 프로젝트",
        "생활 습관 점검"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "실과/정보과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "실과/정보과": 2,
        "바슬즐(통합)": 2
      }
    },
    "연결하기": {
      "rank": 36,
      "verb": "연결하기",
      "subjectCount": 3,
      "totalFrequency": 5,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "개념 간 관계 잇기",
      "recommendedStrategies": [
        "사슬 그리기",
        "생각 그물망",
        "C-E-C 루틴"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "수학과",
        "미술과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "수학과": 2,
        "미술과": 2,
        "바슬즐(통합)": 1
      }
    },
    "분류하기": {
      "rank": 37,
      "verb": "분류하기",
      "subjectCount": 3,
      "totalFrequency": 4,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "기준별 정보 구분",
      "recommendedStrategies": [
        "그래픽 조직자",
        "벤다이어그램",
        "의견벽"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "사회과",
        "수학과",
        "과학과"
      ],
      "subjectFrequencies": {
        "사회과": 1,
        "수학과": 2,
        "과학과": 1
      }
    },
    "찾기": {
      "rank": 38,
      "verb": "찾기",
      "subjectCount": 3,
      "totalFrequency": 4,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "정보 검색 및 발췌",
      "recommendedStrategies": [
        "도서관 서지 검색",
        "키워드 불리언 탐색"
      ],
      "recommendedInfoStage": "3단계(소재파악·접근)",
      "subjects": [
        "도덕과",
        "사회과",
        "영어과"
      ],
      "subjectFrequencies": {
        "도덕과": 2,
        "사회과": 1,
        "영어과": 1
      }
    },
    "돌아보기": {
      "rank": 39,
      "verb": "돌아보기",
      "subjectCount": 3,
      "totalFrequency": 3,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "배움의 과정 성찰",
      "recommendedStrategies": [
        "나침반(Compass Points) 루틴"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "음악과",
        "미술과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "음악과": 1,
        "미술과": 1,
        "바슬즐(통합)": 1
      }
    },
    "반응하기": {
      "rank": 40,
      "verb": "반응하기",
      "subjectCount": 3,
      "totalFrequency": 3,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "자극에 대한 정서적 감응",
      "recommendedStrategies": [
        "See-Think-Wonder",
        "감상 나눔"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과",
        "음악과",
        "미술과"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "음악과": 1,
        "미술과": 1
      }
    },
    "정리하기": {
      "rank": 41,
      "verb": "정리하기",
      "subjectCount": 3,
      "totalFrequency": 3,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "정보 요약 및 정돈",
      "recommendedStrategies": [
        "스케치 노트",
        "정보 스케치",
        "프로젝트 보드"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "수학과",
        "과학과"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "수학과": 1,
        "과학과": 1
      }
    },
    "생성하기": {
      "rank": 42,
      "verb": "생성하기",
      "subjectCount": 2,
      "totalFrequency": 8,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "새로운 대안 창출",
      "recommendedStrategies": [
        "브레인라이팅(6-3-5)",
        "질문 그물망"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "사회과"
      ],
      "subjectFrequencies": {
        "국어과": 3,
        "사회과": 5
      }
    },
    "말하기": {
      "rank": 43,
      "verb": "말하기",
      "subjectCount": 2,
      "totalFrequency": 7,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "생각과 정보 구어 표현",
      "recommendedStrategies": [
        "띵페세",
        "발표하기"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 3,
        "영어과": 4
      }
    },
    "설계하기": {
      "rank": 44,
      "verb": "설계하기",
      "subjectCount": 2,
      "totalFrequency": 7,
      "inquiryPhase": "2단계",
      "phaseEnglish": "Focus",
      "phaseCharacter": "탐구·실험 설계",
      "recommendedStrategies": [
        "프로젝트 보드",
        "4칸 문제해결"
      ],
      "recommendedInfoStage": "2단계(탐색전략)",
      "subjects": [
        "과학과",
        "실과/정보과"
      ],
      "subjectFrequencies": {
        "과학과": 5,
        "실과/정보과": 2
      }
    },
    "평가하기": {
      "rank": 45,
      "verb": "평가하기",
      "subjectCount": 2,
      "totalFrequency": 6,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "타당성 및 질적 판별",
      "recommendedStrategies": [
        "PMI",
        "출처 추적",
        "3-2-1 다리놓기"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "국어과",
        "사회과"
      ],
      "subjectFrequencies": {
        "국어과": 5,
        "사회과": 1
      }
    },
    "감상하기": {
      "rank": 46,
      "verb": "감상하기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "호기심 및 심미적 인식",
      "recommendedStrategies": [
        "Y차트 확장",
        "See-Think-Wonder"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "바슬즐(통합)": 1
      }
    },
    "경험하기": {
      "rank": 47,
      "verb": "경험하기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "직접/간접 경험 체득",
      "recommendedStrategies": [
        "도발적 자극",
        "실물 탐색"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "실과/정보과",
        "미술과"
      ],
      "subjectFrequencies": {
        "실과/정보과": 2,
        "미술과": 1
      }
    },
    "묘사하기": {
      "rank": 48,
      "verb": "묘사하기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "대상과 현상 상세 서술",
      "recommendedStrategies": [
        "CSI 루틴",
        "상세 묘사 기록"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "음악과",
        "영어과"
      ],
      "subjectFrequencies": {
        "음악과": 1,
        "영어과": 2
      }
    },
    "바꾸기": {
      "rank": 49,
      "verb": "바꾸기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "관점 전환 및 변형",
      "recommendedStrategies": [
        "이야기 이어쓰기",
        "관점 바꾸기"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "음악과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "음악과": 2,
        "바슬즐(통합)": 1
      }
    },
    "발견하기": {
      "rank": 50,
      "verb": "발견하기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "호기심 포착",
      "recommendedStrategies": [
        "See-Think-Wonder"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "음악과",
        "미술과"
      ],
      "subjectFrequencies": {
        "음악과": 1,
        "미술과": 2
      }
    },
    "발표하기": {
      "rank": 51,
      "verb": "발표하기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "청중 대상 브리핑",
      "recommendedStrategies": [
        "핵심 한 장 카드",
        "스케치 발표"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "체육과",
        "음악과"
      ],
      "subjectFrequencies": {
        "체육과": 1,
        "음악과": 2
      }
    },
    "보기": {
      "rank": 52,
      "verb": "보기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "시각적 대상 관찰",
      "recommendedStrategies": [
        "See-Think-Wonder"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "미술과",
        "영어과"
      ],
      "subjectFrequencies": {
        "미술과": 1,
        "영어과": 2
      }
    },
    "상상하기": {
      "rank": 53,
      "verb": "상상하기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "아이디어 발상",
      "recommendedStrategies": [
        "라면 대화",
        "Y차트 확장"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "바슬즐(통합)": 2
      }
    },
    "소개하기": {
      "rank": 54,
      "verb": "소개하기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "타인 대상 안내 및 브리핑",
      "recommendedStrategies": [
        "핵심 한 장 카드",
        "미니북"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "영어과": 2
      }
    },
    "예측하기": {
      "rank": 55,
      "verb": "예측하기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "가설 및 결과 추측",
      "recommendedStrategies": [
        "KWLS",
        "예측하며 읽기"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과",
        "영어과"
      ],
      "subjectFrequencies": {
        "국어과": 2,
        "영어과": 1
      }
    },
    "추측하기": {
      "rank": 56,
      "verb": "추측하기",
      "subjectCount": 2,
      "totalFrequency": 3,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "사전 정보 기반 짐작",
      "recommendedStrategies": [
        "가설 설정",
        "See-Think-Wonder"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "수학과",
        "영어과"
      ],
      "subjectFrequencies": {
        "수학과": 2,
        "영어과": 1
      }
    },
    "검색하기": {
      "rank": 57,
      "verb": "검색하기",
      "subjectCount": 2,
      "totalFrequency": 2,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "디지털 및 서지 검색",
      "recommendedStrategies": [
        "Big6 정보탐색",
        "불리언 검색"
      ],
      "recommendedInfoStage": "3단계(소재파악·접근)",
      "subjects": [
        "국어과",
        "실과/정보과"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "실과/정보과": 1
      }
    },
    "계획하기": {
      "rank": 58,
      "verb": "계획하기",
      "subjectCount": 2,
      "totalFrequency": 2,
      "inquiryPhase": "2단계",
      "phaseEnglish": "Focus",
      "phaseCharacter": "탐구 계획 수립",
      "recommendedStrategies": [
        "프로젝트 보드",
        "탐색 계획서"
      ],
      "recommendedInfoStage": "2단계(탐색전략)",
      "subjects": [
        "도덕과",
        "실과/정보과"
      ],
      "subjectFrequencies": {
        "도덕과": 1,
        "실과/정보과": 1
      }
    },
    "구별하기": {
      "rank": 59,
      "verb": "구별하기",
      "subjectCount": 2,
      "totalFrequency": 2,
      "inquiryPhase": "2단계",
      "phaseEnglish": "Focus",
      "phaseCharacter": "개념 간 경계 파악",
      "recommendedStrategies": [
        "벤다이어그램",
        "프레이어 모델"
      ],
      "recommendedInfoStage": "2단계(탐색전략)",
      "subjects": [
        "국어과",
        "음악과"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "음악과": 1
      }
    },
    "질문하기": {
      "rank": 60,
      "verb": "질문하기",
      "subjectCount": 2,
      "totalFrequency": 2,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "탐구 질문 형성",
      "recommendedStrategies": [
        "KWLS",
        "질문 그물망",
        "질문 해부 전략"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과",
        "미술과"
      ],
      "subjectFrequencies": {
        "국어과": 1,
        "미술과": 1
      }
    },
    "형성하기": {
      "rank": 61,
      "verb": "형성하기",
      "subjectCount": 2,
      "totalFrequency": 2,
      "inquiryPhase": "5단계",
      "phaseEnglish": "Generalize",
      "phaseCharacter": "개념 및 가치 내면화",
      "recommendedStrategies": [
        "문·구·단 루틴",
        "가치 정립"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "실과/정보과",
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "실과/정보과": 1,
        "바슬즐(통합)": 1
      }
    },
    "고려하기": {
      "rank": 62,
      "verb": "고려하기",
      "subjectCount": 1,
      "totalFrequency": 8,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "다각적 맥락 숙고",
      "recommendedStrategies": [
        "PMI",
        "다관점 성찰"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 8
      }
    },
    "계산하기": {
      "rank": 63,
      "verb": "계산하기",
      "subjectCount": 1,
      "totalFrequency": 7,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "수학적 연산 및 데이터 처리",
      "recommendedStrategies": [
        "수치 데이터 계산표"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "수학과"
      ],
      "subjectFrequencies": {
        "수학과": 7
      }
    },
    "시도하기": {
      "rank": 64,
      "verb": "시도하기",
      "subjectCount": 1,
      "totalFrequency": 6,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "새로운 도전 과제 실행",
      "recommendedStrategies": [
        "GRASPS 시나리오 실행"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "체육과"
      ],
      "subjectFrequencies": {
        "체육과": 6
      }
    },
    "도출하기": {
      "rank": 65,
      "verb": "도출하기",
      "subjectCount": 1,
      "totalFrequency": 4,
      "inquiryPhase": "5단계",
      "phaseEnglish": "Generalize",
      "phaseCharacter": "결론 및 법칙 이끌어내기",
      "recommendedStrategies": [
        "헤드라인 루틴"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "과학과"
      ],
      "subjectFrequencies": {
        "과학과": 4
      }
    },
    "식별하기": {
      "rank": 66,
      "verb": "식별하기",
      "subjectCount": 1,
      "totalFrequency": 4,
      "inquiryPhase": "2단계",
      "phaseEnglish": "Focus",
      "phaseCharacter": "개념 요소 및 특징 식별",
      "recommendedStrategies": [
        "프레이어 모델",
        "개념 카드 소팅"
      ],
      "recommendedInfoStage": "2단계(탐색전략)",
      "subjects": [
        "영어과"
      ],
      "subjectFrequencies": {
        "영어과": 4
      }
    },
    "조정하기": {
      "rank": 67,
      "verb": "조정하기",
      "subjectCount": 1,
      "totalFrequency": 4,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "전략 및 협력 재조정",
      "recommendedStrategies": [
        "월드카페",
        "아하 대화",
        "네모퉁이 토론"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 4
      }
    },
    "조직하기": {
      "rank": 68,
      "verb": "조직하기",
      "subjectCount": 1,
      "totalFrequency": 4,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "구조화 및 체계화",
      "recommendedStrategies": [
        "개념도(Concept Map)",
        "그래픽 조직자"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 4
      }
    },
    "요약하기": {
      "rank": 69,
      "verb": "요약하기",
      "subjectCount": 1,
      "totalFrequency": 3,
      "inquiryPhase": "5단계",
      "phaseEnglish": "Generalize",
      "phaseCharacter": "핵심 아이디어 압축",
      "recommendedStrategies": [
        "헤드라인 루틴",
        "문·구·단 루틴"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 3
      }
    },
    "체험하기": {
      "rank": 70,
      "verb": "체험하기",
      "subjectCount": 1,
      "totalFrequency": 3,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "오감 기반 실감 체험",
      "recommendedStrategies": [
        "현장 체험학습",
        "실물 조작"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "실과/정보과"
      ],
      "subjectFrequencies": {
        "실과/정보과": 3
      }
    },
    "구상하기": {
      "rank": 71,
      "verb": "구상하기",
      "subjectCount": 1,
      "totalFrequency": 2,
      "inquiryPhase": "2단계",
      "phaseEnglish": "Focus",
      "phaseCharacter": "개념 및 설계 구상",
      "recommendedStrategies": [
        "QFT",
        "아이디어 스케치"
      ],
      "recommendedInfoStage": "2단계(탐색전략)",
      "subjects": [
        "실과/정보과"
      ],
      "subjectFrequencies": {
        "실과/정보과": 2
      }
    },
    "그리기": {
      "rank": 72,
      "verb": "그리기",
      "subjectCount": 1,
      "totalFrequency": 2,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "시각적 드로잉 및 표현",
      "recommendedStrategies": [
        "스케치 노트",
        "정보 스케치"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "수학과"
      ],
      "subjectFrequencies": {
        "수학과": 2
      }
    },
    "답하기": {
      "rank": 73,
      "verb": "답하기",
      "subjectCount": 1,
      "totalFrequency": 2,
      "inquiryPhase": "5단계",
      "phaseEnglish": "Generalize",
      "phaseCharacter": "질문에 대한 답변 서술",
      "recommendedStrategies": [
        "토큰 대화",
        "띵페세"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "영어과"
      ],
      "subjectFrequencies": {
        "영어과": 2
      }
    },
    "묻기": {
      "rank": 74,
      "verb": "묻기",
      "subjectCount": 1,
      "totalFrequency": 2,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "질문 던지기",
      "recommendedStrategies": [
        "KWLS",
        "QFT"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "영어과"
      ],
      "subjectFrequencies": {
        "영어과": 2
      }
    },
    "준수하기": {
      "rank": 75,
      "verb": "준수하기",
      "subjectCount": 1,
      "totalFrequency": 2,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "규칙 및 윤리 준수",
      "recommendedStrategies": [
        "연구/정보윤리 체크리스트"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 2
      }
    },
    "지시하기": {
      "rank": 76,
      "verb": "지시하기",
      "subjectCount": 1,
      "totalFrequency": 2,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "안내 및 규칙 전달",
      "recommendedStrategies": [
        "역할 분담 및 가이드"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "영어과"
      ],
      "subjectFrequencies": {
        "영어과": 2
      }
    },
    "감지하기": {
      "rank": 77,
      "verb": "감지하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "자극 인지",
      "recommendedStrategies": [
        "See-Think-Wonder"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "음악과"
      ],
      "subjectFrequencies": {
        "음악과": 1
      }
    },
    "개선하기": {
      "rank": 78,
      "verb": "개선하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "피드백 기반 보완",
      "recommendedStrategies": [
        "동료 피드백 및 수정 루틴"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "미술과"
      ],
      "subjectFrequencies": {
        "미술과": 1
      }
    },
    "고안하기": {
      "rank": 79,
      "verb": "고안하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "새 아이디어 및 방안 고안",
      "recommendedStrategies": [
        "브레인라이팅",
        "4칸 문제해결"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "도덕과"
      ],
      "subjectFrequencies": {
        "도덕과": 1
      }
    },
    "관계맺기": {
      "rank": 80,
      "verb": "관계맺기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "관계맺기",
      "recommendedStrategies": [
        "보·생·궁(See-Think-Wonder)",
        "Chalk Talk",
        "K-W-L"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "바슬즐(통합)": 1
      }
    },
    "관련짓기": {
      "rank": 81,
      "verb": "관련짓기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "상호 연관성 규명",
      "recommendedStrategies": [
        "생각 그물망",
        "인과관계 사슬망"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "미술과"
      ],
      "subjectFrequencies": {
        "미술과": 1
      }
    },
    "관리하기": {
      "rank": 82,
      "verb": "관리하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "자원 및 산출물 유지 관리",
      "recommendedStrategies": [
        "프로젝트 보드"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "바슬즐(통합)": 1
      }
    },
    "교환하기": {
      "rank": 83,
      "verb": "교환하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "의견 및 피드백 교환",
      "recommendedStrategies": [
        "월드카페",
        "동료 평가"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "구현하기": {
      "rank": 84,
      "verb": "구현하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "아이디어의 실제적 구현",
      "recommendedStrategies": [
        "메이커 활동",
        "코딩/제작"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "바슬즐(통합)": 1
      }
    },
    "권리누리기??": {
      "rank": 85,
      "verb": "권리누리기??",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "시민적 권리 실천",
      "recommendedStrategies": [
        "행동 실천 프로젝트"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "바슬즐(통합)": 1
      }
    },
    "나열하기": {
      "rank": 86,
      "verb": "나열하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "4단계",
      "phaseEnglish": "Organize",
      "phaseCharacter": "순서적 목록화",
      "recommendedStrategies": [
        "그래픽 조직자",
        "타임라인"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "사회과"
      ],
      "subjectFrequencies": {
        "사회과": 1
      }
    },
    "답사하기": {
      "rank": 87,
      "verb": "답사하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "현장 답사 및 조사",
      "recommendedStrategies": [
        "현장 답사 일지",
        "인터뷰"
      ],
      "recommendedInfoStage": "3단계(소재파악·접근)",
      "subjects": [
        "사회과"
      ],
      "subjectFrequencies": {
        "사회과": 1
      }
    },
    "대응하기": {
      "rank": 88,
      "verb": "대응하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "상황에 맞는 능동적 대처",
      "recommendedStrategies": [
        "역할극",
        "시나리오 대응"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "바슬즐(통합)": 1
      }
    },
    "대처하기": {
      "rank": 89,
      "verb": "대처하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "위기 및 문제 대처",
      "recommendedStrategies": [
        "안전 매뉴얼 제작",
        "시뮬레이션"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "체육과"
      ],
      "subjectFrequencies": {
        "체육과": 1
      }
    },
    "모방하기": {
      "rank": 90,
      "verb": "모방하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "시범 관찰 후 따라하기",
      "recommendedStrategies": [
        "기본 동작 모델링"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "음악과"
      ],
      "subjectFrequencies": {
        "음악과": 1
      }
    },
    "바라보기": {
      "rank": 91,
      "verb": "바라보기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "관점 인식 및 관찰",
      "recommendedStrategies": [
        "See-Think-Wonder"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "도덕과"
      ],
      "subjectFrequencies": {
        "도덕과": 1
      }
    },
    "반영하기": {
      "rank": 92,
      "verb": "반영하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "피드백 수용 및 적용",
      "recommendedStrategies": [
        "동료 피드백 수정 루틴"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "도덕과"
      ],
      "subjectFrequencies": {
        "도덕과": 1
      }
    },
    "사고하기": {
      "rank": 93,
      "verb": "사고하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "5단계",
      "phaseEnglish": "Generalize",
      "phaseCharacter": "고차원적 사고 전개",
      "recommendedStrategies": [
        "라면 대화",
        "PMI"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "실과/정보과"
      ],
      "subjectFrequencies": {
        "실과/정보과": 1
      }
    },
    "선별하기": {
      "rank": 94,
      "verb": "선별하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "적합한 자료 선택",
      "recommendedStrategies": [
        "정보 장바구니",
        "출처 추적"
      ],
      "recommendedInfoStage": "3단계(소재파악·접근)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "설정하기": {
      "rank": 95,
      "verb": "설정하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "2단계",
      "phaseEnglish": "Focus",
      "phaseCharacter": "목표 및 조건 설정",
      "recommendedStrategies": [
        "탐구 계획서",
        "조건 설정표"
      ],
      "recommendedInfoStage": "2단계(탐색전략)",
      "subjects": [
        "수학과"
      ],
      "subjectFrequencies": {
        "수학과": 1
      }
    },
    "성찰하기": {
      "rank": 96,
      "verb": "성찰하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "사고 변화 메타인지 회고",
      "recommendedStrategies": [
        "예전에는-지금은 루틴",
        "배움 여정 지도"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "도덕과"
      ],
      "subjectFrequencies": {
        "도덕과": 1
      }
    },
    "세기": {
      "rank": 97,
      "verb": "세기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "수량 데이터 측정",
      "recommendedStrategies": [
        "수량 데이터 시트"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "수학과"
      ],
      "subjectFrequencies": {
        "수학과": 1
      }
    },
    "수용하기": {
      "rank": 98,
      "verb": "수용하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "타인의견 및 다양성 포용",
      "recommendedStrategies": [
        "월드카페",
        "공감적 경청"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "예상하기": {
      "rank": 99,
      "verb": "예상하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "앞선 전개 가설 설정",
      "recommendedStrategies": [
        "KWLS",
        "예측하며 읽기"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "수학과"
      ],
      "subjectFrequencies": {
        "수학과": 1
      }
    },
    "움직이기": {
      "rank": 100,
      "verb": "움직이기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "신체 움직임 구현",
      "recommendedStrategies": [
        "움직임 표현 활동"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "체육과"
      ],
      "subjectFrequencies": {
        "체육과": 1
      }
    },
    "융합하기": {
      "rank": 101,
      "verb": "융합하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "이종 영역 지식 결합",
      "recommendedStrategies": [
        "융합 프로젝트 보드"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "미술과"
      ],
      "subjectFrequencies": {
        "미술과": 1
      }
    },
    "인지하기": {
      "rank": 102,
      "verb": "인지하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "기본 개념 인지",
      "recommendedStrategies": [
        "프레이어 모델",
        "어휘 카드"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "재미느끼기": {
      "rank": 103,
      "verb": "재미느끼기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "흥미 및 정서적 몰입",
      "recommendedStrategies": [
        "놀이 기반 탐색"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "전달하기": {
      "rank": 104,
      "verb": "전달하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "메시지 소통",
      "recommendedStrategies": [
        "핵심 한 장 카드",
        "카드뉴스"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "전시하기": {
      "rank": 105,
      "verb": "전시하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "산출물 갤러리 공개",
      "recommendedStrategies": [
        "갤러리 워크",
        "학급 전시회"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "바슬즐(통합)": 1
      }
    },
    "접근하기": {
      "rank": 106,
      "verb": "접근하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "정보원 소재 도달",
      "recommendedStrategies": [
        "도서관 DDC 서가 접근"
      ],
      "recommendedInfoStage": "3단계(소재파악·접근)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "제시하기": {
      "rank": 107,
      "verb": "제시하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "아이디어 공유 및 발제",
      "recommendedStrategies": [
        "핵심 한 장 카드",
        "네모퉁이 토론"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "제안하기": {
      "rank": 108,
      "verb": "제안하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "6단계",
      "phaseEnglish": "Transfer",
      "phaseCharacter": "해결책 및 정책 건의",
      "recommendedStrategies": [
        "제안서 쓰기",
        "네모퉁이 토론"
      ],
      "recommendedInfoStage": "5단계(종합·표현)",
      "subjects": [
        "도덕과"
      ],
      "subjectFrequencies": {
        "도덕과": 1
      }
    },
    "짐작하기": {
      "rank": 109,
      "verb": "짐작하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "단서 기반 상황 추측",
      "recommendedStrategies": [
        "문맥 단서 추론"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "집중하기": {
      "rank": 110,
      "verb": "집중하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "2단계",
      "phaseEnglish": "Focus",
      "phaseCharacter": "초점 맞추기",
      "recommendedStrategies": [
        "QFT",
        "질문 초점(Q-Focus)"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "국어과"
      ],
      "subjectFrequencies": {
        "국어과": 1
      }
    },
    "측정하기": {
      "rank": 111,
      "verb": "측정하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "3단계",
      "phaseEnglish": "Investigate",
      "phaseCharacter": "양적 데이터 계측",
      "recommendedStrategies": [
        "측정 기록표"
      ],
      "recommendedInfoStage": "4단계(정보추출·분석)",
      "subjects": [
        "체육과"
      ],
      "subjectFrequencies": {
        "체육과": 1
      }
    },
    "협력하기": {
      "rank": 112,
      "verb": "협력하기",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "7단계",
      "phaseEnglish": "Reflect",
      "phaseCharacter": "동료와의 상호 협력",
      "recommendedStrategies": [
        "띵페세",
        "월드카페"
      ],
      "recommendedInfoStage": "6단계(평가·성찰)",
      "subjects": [
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "바슬즐(통합)": 1
      }
    },
    "호기심갖기??": {
      "rank": 113,
      "verb": "호기심갖기??",
      "subjectCount": 1,
      "totalFrequency": 1,
      "inquiryPhase": "1단계",
      "phaseEnglish": "Engage",
      "phaseCharacter": "탐구 동기 유발",
      "recommendedStrategies": [
        "도발적 자극",
        "질문 그물망"
      ],
      "recommendedInfoStage": "1단계(과제정의)",
      "subjects": [
        "바슬즐(통합)"
      ],
      "subjectFrequencies": {
        "바슬즐(통합)": 1
      }
    }
  },
  "subjectSkills": {
    "국어과": [
      "표현하기",
      "탐색하기",
      "활용하기",
      "소통하기",
      "제작하기",
      "파악하기",
      "문제해결하기",
      "생각하기",
      "참여하기",
      "분석하기",
      "비교하기",
      "공유하기",
      "확인하기",
      "관찰하기",
      "읽기",
      "쓰기",
      "점검하기",
      "듣기",
      "이해하기",
      "인식하기",
      "구성하기",
      "사용하기",
      "추론하기",
      "놀이하기",
      "선택하기",
      "실천하기",
      "반응하기",
      "정리하기",
      "생성하기",
      "말하기",
      "평가하기",
      "감상하기",
      "상상하기",
      "소개하기",
      "예측하기",
      "검색하기",
      "구별하기",
      "질문하기",
      "고려하기",
      "조정하기",
      "조직하기",
      "요약하기",
      "준수하기",
      "교환하기",
      "선별하기",
      "수용하기",
      "인지하기",
      "재미느끼기",
      "전달하기",
      "접근하기",
      "제시하기",
      "짐작하기",
      "집중하기"
    ],
    "도덕과": [
      "탐색하기",
      "설명하기",
      "소통하기",
      "생각하기",
      "탐구하기",
      "조사하기",
      "관찰하기",
      "점검하기",
      "살펴보기",
      "선택하기",
      "찾기",
      "계획하기",
      "고안하기",
      "바라보기",
      "반영하기",
      "성찰하기",
      "제안하기"
    ],
    "사회과": [
      "표현하기",
      "탐색하기",
      "활용하기",
      "파악하기",
      "문제해결하기",
      "참여하기",
      "탐구하기",
      "조사하기",
      "분석하기",
      "비교하기",
      "해석하기",
      "확인하기",
      "관찰하기",
      "수집하기",
      "구성하기",
      "추론하기",
      "선택하기",
      "분류하기",
      "찾기",
      "생성하기",
      "평가하기",
      "나열하기",
      "답사하기"
    ],
    "수학과": [
      "표현하기",
      "설명하기",
      "제작하기",
      "문제해결하기",
      "탐구하기",
      "비교하기",
      "해석하기",
      "읽기",
      "쓰기",
      "수집하기",
      "나타내기",
      "사용하기",
      "추론하기",
      "연결하기",
      "분류하기",
      "정리하기",
      "추측하기",
      "계산하기",
      "그리기",
      "설정하기",
      "세기",
      "예상하기"
    ],
    "과학과": [
      "표현하기",
      "활용하기",
      "설명하기",
      "소통하기",
      "문제해결하기",
      "조사하기",
      "분석하기",
      "비교하기",
      "공유하기",
      "적용하기",
      "해석하기",
      "관찰하기",
      "수집하기",
      "인식하기",
      "사용하기",
      "분류하기",
      "정리하기",
      "설계하기",
      "도출하기"
    ],
    "실과/정보과": [
      "탐색하기",
      "설명하기",
      "제작하기",
      "파악하기",
      "문제해결하기",
      "참여하기",
      "활동하기",
      "공유하기",
      "적용하기",
      "확인하기",
      "살펴보기",
      "실천하기",
      "설계하기",
      "경험하기",
      "검색하기",
      "계획하기",
      "형성하기",
      "체험하기",
      "구상하기",
      "사고하기"
    ],
    "체육과": [
      "표현하기",
      "탐색하기",
      "활용하기",
      "파악하기",
      "활동하기",
      "적용하기",
      "이해하기",
      "구성하기",
      "발표하기",
      "시도하기",
      "대처하기",
      "움직이기",
      "측정하기"
    ],
    "음악과": [
      "표현하기",
      "탐색하기",
      "활용하기",
      "설명하기",
      "소통하기",
      "제작하기",
      "생각하기",
      "활동하기",
      "듣기",
      "인식하기",
      "나타내기",
      "놀이하기",
      "돌아보기",
      "반응하기",
      "묘사하기",
      "바꾸기",
      "발견하기",
      "발표하기",
      "구별하기",
      "감지하기",
      "모방하기"
    ],
    "미술과": [
      "탐색하기",
      "활용하기",
      "설명하기",
      "제작하기",
      "생각하기",
      "참여하기",
      "분석하기",
      "공유하기",
      "적용하기",
      "해석하기",
      "나타내기",
      "연결하기",
      "돌아보기",
      "반응하기",
      "경험하기",
      "발견하기",
      "보기",
      "질문하기",
      "개선하기",
      "관련짓기",
      "융합하기"
    ],
    "영어과": [
      "표현하기",
      "활용하기",
      "소통하기",
      "파악하기",
      "확인하기",
      "읽기",
      "쓰기",
      "점검하기",
      "듣기",
      "이해하기",
      "찾기",
      "말하기",
      "묘사하기",
      "보기",
      "소개하기",
      "예측하기",
      "추측하기",
      "식별하기",
      "답하기",
      "묻기",
      "지시하기"
    ],
    "바슬즐(통합)": [
      "표현하기",
      "탐색하기",
      "활용하기",
      "설명하기",
      "소통하기",
      "제작하기",
      "생각하기",
      "참여하기",
      "탐구하기",
      "조사하기",
      "활동하기",
      "살펴보기",
      "놀이하기",
      "실천하기",
      "연결하기",
      "돌아보기",
      "감상하기",
      "바꾸기",
      "상상하기",
      "형성하기",
      "관계맺기",
      "관리하기",
      "구현하기",
      "권리누리기??",
      "대응하기",
      "전시하기",
      "협력하기",
      "호기심갖기??"
    ]
  },
  "strategies": [
    {
      "id": 1,
      "name": "KWLS",
      "description": "KWL에 S(Still wondering) 추가해 '아직 궁금한 것' 을 기록",
      "linkedVerbs": [
        "예측하기",
        "질문하기",
        "탐색하기"
      ],
      "genre": "논픽션(주장-근거)",
      "targetGrade": "전학년",
      "infoLiteracyStage": "1단계"
    },
    {
      "id": 2,
      "name": "SQ3R",
      "description": "Survey-Question-Read-Recite-Review 5단계로 읽기 전·중·후 활동 구조화",
      "linkedVerbs": [
        "읽기",
        "파악하기",
        "질문하기",
        "요약하기"
      ],
      "genre": "논픽션(주장-근거)",
      "targetGrade": "고",
      "infoLiteracyStage": "1단계"
    },
    {
      "id": 3,
      "name": "그래픽 조직자",
      "description": "순서·비교·인과 등 정보 유형별 도표 활용",
      "linkedVerbs": [
        "정리하기",
        "분류하기",
        "조직하기",
        "조사하기"
      ],
      "genre": "논픽션(원인-결과, 비교-대조)",
      "targetGrade": "전학년",
      "infoLiteracyStage": "1단계"
    },
    {
      "id": 4,
      "name": "벤다이어그램",
      "description": "중첩 원으로 두 개념 공통점·차이점 시각화",
      "linkedVerbs": [
        "비교하기",
        "구별하기",
        "분류하기"
      ],
      "genre": "논픽션(비교-대조)",
      "targetGrade": "전학년",
      "infoLiteracyStage": "1단계"
    },
    {
      "id": 5,
      "name": "사슬 그리기",
      "description": "사건의 인과를 연속 고리로 시각화",
      "linkedVerbs": [
        "연결하기",
        "이해하기",
        "파악하기"
      ],
      "genre": "논픽션(원인-결과)",
      "targetGrade": "중·고",
      "infoLiteracyStage": "1단계"
    },
    {
      "id": 6,
      "name": "생각 그물망",
      "description": "알고 있는 개념과 새 정보를 선으로 연결해 개념 관계 시각화",
      "linkedVerbs": [
        "연결하기",
        "추론하기",
        "조직하기",
        "조사하기"
      ],
      "genre": "논픽션(비교-대조, 원인-결과)",
      "targetGrade": "중·고",
      "infoLiteracyStage": "1단계"
    },
    {
      "id": 7,
      "name": "라면 대화",
      "description": "‘만약~라면?’ 가정으로 사고 확장",
      "linkedVerbs": [
        "생각하기",
        "추론하기",
        "토론하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "전학년",
      "infoLiteracyStage": "2단계"
    },
    {
      "id": 8,
      "name": "4칸 문제해결",
      "description": "문제–조건–풀이–해결을 4개면에 정리",
      "linkedVerbs": [
        "해결하기",
        "조직하기",
        "설명하기"
      ],
      "genre": "논픽션(원인-결과)",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 9,
      "name": "PMI",
      "description": "Plus/Minus/Interesting 관점으로 제안 평가",
      "linkedVerbs": [
        "평가하기",
        "고려하기",
        "분석하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 10,
      "name": "Y차트 확장",
      "description": "보이는/느끼는/상상하는 칸에 작성 후 아이디어 연결 및 질문 추가",
      "linkedVerbs": [
        "감상하기",
        "분석하기",
        "표현하기"
      ],
      "genre": "픽션, 논픽션(비교-대조)",
      "targetGrade": "저·중",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 11,
      "name": "네모퉁이 토론",
      "description": "4입장 위치 선정 후 근거 토의",
      "linkedVerbs": [
        "비교하기",
        "조정하기",
        "주장하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 12,
      "name": "띵페세(Think-Pair-Share)",
      "description": "개별 사고→짝 토의→전체 공유 3단계",
      "linkedVerbs": [
        "말하기",
        "소통하기",
        "공유하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "전학년",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 13,
      "name": "말풍선 설명",
      "description": "말풍선으로 설명 이어붙여 작성하거나 다른의견 제시",
      "linkedVerbs": [
        "표현하기",
        "설명하기",
        "생각하기"
      ],
      "genre": "픽션",
      "targetGrade": "저·중",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 14,
      "name": "미니북 제작",
      "description": "A4 한 장 접어 만든 8p 소책자 제작",
      "linkedVerbs": [
        "제작하기",
        "구성하기",
        "표현하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "저·중",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 15,
      "name": "브레인라이팅 (6-3-5)",
      "description": "6명·3아이디어·5분 릴레이 작성",
      "linkedVerbs": [
        "생성하기",
        "연결하기",
        "공유하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 16,
      "name": "스케치 노트",
      "description": "그림+텍스트로 핵심 정보 시각 요약",
      "linkedVerbs": [
        "표현하기",
        "요약하기",
        "정리하기",
        "조사하기"
      ],
      "genre": "픽션, 논픽션(설명문)",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 17,
      "name": "아하 대화",
      "description": "아하!라고 답하며 설명듣기",
      "linkedVerbs": [
        "소통하기",
        "조정하기",
        "참여하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "전학년",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 18,
      "name": "월드카페",
      "description": "테이블 순환 대화로 아이디어 확산",
      "linkedVerbs": [
        "교환하기",
        "조정하기",
        "참여하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 19,
      "name": "의견벽",
      "description": "포스트잇 등등으로 의견 수렴 후 분류",
      "linkedVerbs": [
        "공유하기",
        "분류하기",
        "관련짓기"
      ],
      "genre": "논픽션(비교-대조)",
      "targetGrade": "전학년",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 20,
      "name": "이야기별 그리기",
      "description": "이야기나 관찰 내용을 읽고 이해한 후, 사건의 흐름을 재구성함",
      "linkedVerbs": [
        "이해하기",
        "표현하기",
        "추론하기",
        "분석하기",
        "정리하기"
      ],
      "genre": "픽션",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 21,
      "name": "정보 스케치",
      "description": "키워드·아이콘 자유 배치로 정보 구조 시각화",
      "linkedVerbs": [
        "표현하기",
        "조직하기",
        "정리하기",
        "조사하기"
      ],
      "genre": "논픽션(비교-대조)",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 22,
      "name": "정보 장바구니",
      "description": "시각적 공간에 자료를 수집·분류",
      "linkedVerbs": [
        "수집하기",
        "분류하기",
        "선별하기"
      ],
      "genre": "논픽션(주장-근거)",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 23,
      "name": "질문 그물망",
      "description": "중심 질문에서 파생 질문을 그물 형태로 확장",
      "linkedVerbs": [
        "질문하기",
        "생성하기",
        "탐색하기"
      ],
      "genre": "논픽션(주장-근거)",
      "targetGrade": "전학년",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 24,
      "name": "질문 해부 전략",
      "description": "누가?·왜?,어떻게? 등으로 질문 세분화[5W1H]",
      "linkedVerbs": [
        "질문하기",
        "분석하기"
      ],
      "genre": "논픽션",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 25,
      "name": "출처 추적",
      "description": "정보출처를 시각화하여 정보의 신뢰성 판단",
      "linkedVerbs": [
        "조사하기",
        "분석하기",
        "정리하기",
        "평가하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 26,
      "name": "토큰 대화",
      "description": "토큰을 가지고 타인과 대화를 진행",
      "linkedVerbs": [
        "소통하기",
        "공유하기",
        "설명하기"
      ],
      "genre": "논픽션, 픽션",
      "targetGrade": "전학년",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 27,
      "name": "프레이어 모델",
      "description": "핵심개념을 바탕으로 4개면에 정의, 속성, 해당사례, 해당하지 않는 것을 기재",
      "linkedVerbs": [
        "분류하기",
        "식별하기",
        "이해하기"
      ],
      "genre": "논픽션(비교-대조)",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 28,
      "name": "프로젝트 보드",
      "description": "단계별 과정 사진·메모를 스티커에 기록해 게시",
      "linkedVerbs": [
        "정리하기",
        "계획하기",
        "공유하기"
      ],
      "genre": "논픽션(설명문)",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    },
    {
      "id": 29,
      "name": "핵심 한 장 카드",
      "description": "중요 개념을 카드 한 장에 요약 전시·교환",
      "linkedVerbs": [
        "제시하기",
        "설명하기",
        "전달하기"
      ],
      "genre": "픽션(단편), 논픽션(설명문)",
      "targetGrade": "중·고",
      "infoLiteracyStage": "전 단계 공통"
    }
  ]
};

