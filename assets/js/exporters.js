/* =====================================================================
 *  내보내기 & 외부 AI 프롬프트 파이프라인 (exporters.js)
 *  - Markdown (.md) 다운로드
 *  - 한글(HWP) / MS Word 호환 문서 (.doc / .html) 다운로드
 *  - A4 인쇄 / PDF 저장 (전체 패키지 또는 현재 탭)
 *  - 3트랙 동적 시스템 프롬프트 생성 (guide.md 5.2절 명세)
 * ===================================================================== */
(function (global) {
  'use strict';
  const { esc } = global.Util;

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob(['\uFEFF' + content], { type: mimeType || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
  }

  /* ---------------- 1. Markdown (.md) 변환 ---------------- */
  function toMarkdown(plan, text, worksheets) {
    const lines = [];
    lines.push(`# ${plan.unitTitle} (${plan.trackTitle})`);
    lines.push('');
    lines.push(`- **수업 트랙**: ${plan.trackBadge} (${plan.modelName})`);
    lines.push(`- **대상 학년**: 초등학교 ${plan.grade}학년 (${plan.gradeBand}학년군)`);
    lines.push(`- **관련 교과 / 영역**: ${plan.subjectName} — ${plan.areaName}`);
    if (plan.subjectStandard) {
      lines.push(`- **교과 성취기준**: ${plan.subjectStandard.code} ${plan.subjectStandard.text}`);
    }
    if (plan.libraryStandard) {
      lines.push(`- **2022 도서관과 정보생활 성취기준**: ${plan.libraryStandard.code} ${plan.libraryStandard.text}`);
    }
    lines.push(`- **${plan.track === 'C' ? '도서관과 정보생활 교과 역량' : `${plan.subjectShort} 교과 핵심역량`}**: ${plan.competencies.join(', ')}`);
    lines.push(`- **핵심 개념(Lens)**: ${plan.conceptualFrame.macroConcepts.join(', ')}`);
    lines.push(`- **일반화(Enduring Understanding)**: ${plan.conceptualFrame.generalization}`);
    lines.push(`- **적용 수업 전략**: ${plan.strategies.map(s => s.name).join(' → ')}`);
    if (plan.track === 'A' && plan.cooperationDesignMeta) {
      const cm = plan.cooperationDesignMeta;
      lines.push(`- **도서관 협력수업 단계**: ${cm.cooperationLevel.label}`);
      lines.push(`- **도서관 탐구활동 유형**: ${cm.infoActivities.map(a => a.label).join(' · ')}`);
      lines.push(`- **교사 간 협력수업 형태**: ${cm.coTeachingApproach.label} (교과교사 ${cm.roleBalance.subjectTeacherRatio}% : 사서교사 ${cm.roleBalance.librarianTeacherRatio}%)`);
      lines.push(`- **시간표 운영 방식**: ${cm.scheduleModel.label} (${cm.scheduleModel.durationText})`);
      lines.push(`- **디지털·도서관 도구 활용**: ${cm.picratIntegration.surfaceLabel} — ${cm.picratIntegration.toolExamples.join(', ')}`);
      lines.push(`- **학생 맞춤형 배려**: ${cm.inclusiveSupportPlan.modeLabel}`);
    }
    lines.push('');
    lines.push(`## 1. 탐구 질문 체계`);
    lines.push(`- **사실적 질문**: ${plan.conceptualFrame.factualQ}`);
    lines.push(`- **개념적 질문**: ${plan.conceptualFrame.conceptualQ}`);
    lines.push(`- **논쟁적 질문**: ${plan.conceptualFrame.debatableQ}`);
    lines.push('');
    lines.push(`## 2. 차시 학습목표`);
    plan.objectives.forEach(o => lines.push(`- ${o}`));
    lines.push('');
    lines.push(`## 3. 교수·학습 과정안 (40분)`);
    if (plan.track === 'A') {
      lines.push(`| 단계 (시간) | 적용 전략 | 교과교사 활동 | 사서교사 활동 | 학생 활동 | 자료 및 평가 |`);
      lines.push(`| :--- | :--- | :--- | :--- | :--- | :--- |`);
      plan.timeline.forEach(row => {
        lines.push(`| **${row.phase}**<br>${row.subPhase}<br>(${row.time}) | ${row.strategy.name} | ${row.subjectTeacher.join('<br>')} | ${row.librarianTeacher.join('<br>')} | ${row.studentActivity.join('<br>')} | **자료**: ${row.materials.join(', ')}<br>**평가**: ${row.assessment} |`);
      });
    } else {
      lines.push(`| 단계 (시간) | 적용 전략 | 교사 활동 | 학생 활동 | 자료 및 평가 |`);
      lines.push(`| :--- | :--- | :--- | :--- | :--- |`);
      plan.timeline.forEach(row => {
        lines.push(`| **${row.phase}**<br>${row.subPhase}<br>(${row.time}) | ${row.strategy.name} | ${row.teacherActivity.join('<br>')} | ${row.studentActivity.join('<br>')} | **자료**: ${row.materials.join(', ')}<br>**평가**: ${row.assessment} |`);
      });
    }
    lines.push('');
    lines.push(`## 4. 수업용 읽기 텍스트: 「${text.title}」`);
    lines.push(`> ${text.subtitle}${plan.track !== 'B' ? ` | 추천 서가 분류: KDC ${text.source.kdcCode} (${text.source.kdcName})` : ''}`);
    lines.push('');
    text.paragraphs.forEach(p => { lines.push(p); lines.push(''); });
    lines.push(`### 핵심 어휘`);
    text.vocab.forEach(v => lines.push(`- **${v.word}**: ${v.meaning}`));
    lines.push('');
    lines.push(`### 읽기 후 질문`);
    lines.push(`1. ${text.questions.factual}`);
    lines.push(`2. ${text.questions.inferential}`);
    lines.push(`3. ${text.questions.critical}`);
    lines.push('');
    const rawSearchCandidates = [
      ...(plan.contentElements && Array.isArray(plan.contentElements.knowledge) ? plan.contentElements.knowledge : []),
      plan.topic || '',
      plan.areaName || '',
    ].join(' ')
      .replace(/우리\s*고장/g, '우리고장')
      .replace(/지역\s*사회/g, '지역사회')
      .replace(/지역\s*문제/g, '지역문제')
      .replace(/문화\s*유산/g, '문화유산')
      .replace(/먹이\s*그물/g, '먹이그물')
      .replace(/생물\s*다양성/g, '생물다양성')
      .replace(/가짜\s*뉴스/g, '가짜뉴스')
      .replace(/\([^)]*\)/g, ' ')
      .split(/[\s·,\/\-]+/)
      .map(w => w.replace(/[^가-힣a-zA-Z0-9]/g, '').replace(/(으로부터|에서|으로|은|는|이|가|을|를|의|와|과|로|도)$/, ''))
      .filter(w => w.length >= 2 && !['초등', '어린이', '탐구', '이해', '방법', '모습', '생활', '우리', '알아보기', '찾기', '구분', '구별', '구성', '요소'].includes(w));
    const singleSearchWord = rawSearchCandidates[0] || '도서관';
    const searchQ = encodeURIComponent(singleSearchWord);
    lines.push(`### 수업 주제 연계 실제 도서 검색 (핵심 검색어: #${singleSearchWord})`);
    lines.push(`- [알라딘 '${singleSearchWord}' 도서 검색 바로가기](https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${searchQ})`);
    lines.push(`- [예스24 '${singleSearchWord}' 도서 검색 바로가기](https://www.yes24.com/Product/Search?domain=BOOK&query=${searchQ})`);
    lines.push(`- [교보문고 '${singleSearchWord}' 도서 검색 바로가기](https://search.kyobobook.co.kr/search?keyword=${searchQ})`);
    lines.push('');
    lines.push(`## 5. 평가 루브릭`);
    lines.push(`| 평가 요소 | 상 (매우 잘함) | 중 (잘함) | 하 (노력 요함) |`);
    lines.push(`| :--- | :--- | :--- | :--- |`);
    plan.rubric.forEach(r => {
      lines.push(`| **${r.criterion}** | ${r.high} | ${r.mid} | ${r.low} |`);
    });
    lines.push('');
    lines.push(`## 6. 수록 활동지 목록`);
    (worksheets || []).forEach((w, i) => lines.push(`${i + 1}. [${w.category}] ${w.name} 활동지`));
    if (plan.track === 'A' && plan.cooperationDesignMeta && plan.cooperationDesignMeta.quickConsultationChecklist) {
      const qc = plan.cooperationDesignMeta.quickConsultationChecklist;
      lines.push('');
      lines.push(`## 7. 교과교사 × 사서교사 5분 핵심 사전·사후 협의 체크리스트`);
      lines.push(`### [사전협의 (3분)]`);
      qc.preLesson3Min.forEach(item => lines.push(`- [ ] ${item}`));
      lines.push(`### [사후협의 (2분)]`);
      qc.postLesson2Min.forEach(item => lines.push(`- [ ] ${item}`));
    }
    return lines.join('\n');
  }

  /* ---------------- 2. 한글(HWP) · MS Word 호환 HTML 문서 ---------------- */
  function toHwpCompatibleHtml(containerSelector, title) {
    const el = document.querySelector(containerSelector);
    const bodyHtml = el ? el.innerHTML : '';
    return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" lang="ko">
<head>
<meta charset="utf-8">
<title>${esc(title || '초등 3트랙 수업설계 패키지')}</title>
<style>
  @page { size: A4 portrait; margin: 15mm; }
  body { font-family: '맑은 고딕', 'Malgun Gothic', '함초롬바탕', sans-serif; font-size: 10.5pt; line-height: 1.55; color: #111827; }
  h1, h2, h3, h4 { color: #1e3a8a; margin: 10pt 0 6pt; }
  table { width: 100%; border-collapse: collapse; margin: 8pt 0; table-layout: fixed; }
  th, td { border: 1px solid #475569; padding: 8pt 10pt; vertical-align: top; word-break: keep-all; font-size: 9.5pt; }
  th { background-color: #eff6ff; font-weight: bold; text-align: center; }
  .worksheet-page { page-break-before: always; border: 1px solid #cbd5e1; padding: 16pt; margin-top: 14pt; }
  .ws-write-box { border: 1px dashed #94a3b8; padding: 10pt; min-height: 60pt; }
  .no-print { display: none !important; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
  }

  /* ---------------- 3. 3트랙 동적 LLM 시스템 프롬프트 생성기 ---------------- */
  function buildDynamicPrompt(plan, text) {
    const roleDesc = plan.track === 'A'
      ? '초등 교과교사와 사서교사의 2열(Two-column) 코티칭 협력수업 설계 전문가'
      : (plan.track === 'B'
        ? '린 에릭슨(Lynn Erickson)의 개념기반 탐구 7단계 초등 수업 설계 전문가'
        : '2022 개정 도서관과 정보생활 교육과정 및 Big6 모형 기반 사서교사 수업 설계 전문가');

    return `[시스템 역할]
당신은 ${roleDesc}입니다.

[수업 설계 맥락 (온톨로지 매핑 정보)]
- 수업 형태: ${plan.trackBadge} (${plan.modelName})
- 대상: 초등학교 ${plan.grade}학년 (${plan.gradeBand}학년군)
- 교과 및 영역: ${plan.subjectName} > ${plan.areaName}
${plan.subjectStandard ? `- 교과 성취기준: ${plan.subjectStandard.code} ${plan.subjectStandard.text}\n` : ''}${plan.libraryStandard ? `- 2022 도서관과 정보생활 성취기준: ${plan.libraryStandard.code} ${plan.libraryStandard.text}\n` : ''}- 단원/주제: ${plan.topic}
- 내용 요소(지식·이해): ${plan.contentElements.knowledge.join(', ')}
- 과정·기능 수행동사: ${plan.contentElements.skills.join(', ')}
- 핵심 개념(Lens): ${plan.conceptualFrame.macroConcepts.join(', ')}
- 일반화(Enduring Understanding): "${plan.conceptualFrame.generalization}"
- 탐구 질문:
  1) 사실적 질문: ${plan.conceptualFrame.factualQ}
  2) 개념적 질문: ${plan.conceptualFrame.conceptualQ}
  3) 논쟁적 질문: ${plan.conceptualFrame.debatableQ}
- 선택한 수업 전략: ${plan.strategies.map(s => `【${s.name}】(${s.cat})`).join(' → ')}${plan.kdcRecommendations && plan.kdcRecommendations.length ? `\n- 추천 KDC 분류: ${plan.kdcRecommendations.map(k => `${k.code} ${k.name}`).join(', ')}` : ''}${plan.track === 'A' && plan.cooperationDesignMeta ? `\n- 도서관 탐구활동: ${plan.cooperationDesignMeta.infoActivities.map(a => a.label).join(' · ')}\n- 교사 간 협력수업 형태: ${plan.cooperationDesignMeta.coTeachingApproach.label}\n- 시간표 운영: ${plan.cooperationDesignMeta.scheduleModel.label}\n- 디지털·도서관 도구 활용: ${plan.cooperationDesignMeta.picratIntegration.surfaceLabel} (${plan.cooperationDesignMeta.picratIntegration.toolExamples.join(', ')})` : ''}

[요청 사항]
1. 위 맥락을 완벽히 반영하여 ${plan.track === 'A' ? '교과교사와 사서교사의 발문·역할이 분리된 2열 코티칭' : '단계별 발문과 비계(Scaffolding)가 구체적으로 드러난 1열'} 40분 차시 지도안을 더 풍부하게 확장해 주세요. 함양 교과역량은 반드시 해당 교과의 공식 핵심역량(${plan.competencies.join(', ')})으로만 한정하여 표기하세요.
2. '${text.title}' 주제의 ${plan.grade}학년 눈높이 수업용 읽기 텍스트(4문단, 사실 문장 2개·의견 문장 2개 포함, 거짓 도서명·가상 저자 표기 금지)와, 선택한 전략(${plan.strategies.map(s => s.name).join(', ')})에 맞추어 교사가 바로 인쇄해 배부할 수 있는 학생용 활동지 문항(예시 답안 표출 금지, 학생 작성 공간 확보)을 작성해 주세요.`;
  }

  global.Exporters = {
    downloadFile,
    toMarkdown,
    toHwpCompatibleHtml,
    buildDynamicPrompt,
  };
})(window);
