/* =====================================================================
 *  텍스트·전략 맞춤형 활동지 생성 엔진 (worksheets.js)
 *  - 선택한 수업 전략(60여 종)과 생성된 읽기 텍스트의 핵심 어휘·문장·
 *    KDC 분류·탐구 질문·일반화 문장을 결합하여 교사가 즉시 A4 인쇄하여
 *    배부할 수 있는 학생용 활동지(예시 답안 미포함, 수기 작성 간격 확보)를 생성합니다.
 * ===================================================================== */
(function (global) {
  'use strict';
  const { esc } = global.Util;

  /** 학생 직접 작성란 (예시 답안 표출 금지 · 인쇄 후 수기 작성에 적합한 넉넉한 여백과 간격 유지) */
  function ans(_teacherText, placeholder, lines) {
    const lineCount = Math.max(2, lines || 2);
    const h = Math.max(76, lineCount * 38);
    return `
      <div class="ws-write-box" style="min-height:${h}px">
        ${placeholder ? `<div class="ws-student-hint">${esc(placeholder)}</div>` : ''}
      </div>`;
  }

  /** 공통 활동지 상단 헤더 (학년·반·번호·이름·단원·전략 배지) */
  function renderHeader(plan, strat, idx, total) {
    return `
      <div class="ws-sheet-header">
        <div class="ws-sheet-top">
          <span class="ws-badge-track">${esc(plan.trackBadge)}</span>
          <span class="ws-badge-strat">활동지 ${idx}/${total} · ${esc(strat.cat)} 【${esc(strat.name)}】</span>
        </div>
        <div class="ws-title-row">
          <div>
            <h3 class="ws-sheet-title">${esc(plan.topic)} — ${esc(strat.name)} 활동지</h3>
            <p class="ws-sheet-sub">${esc(plan.subjectShort)} · ${esc(plan.areaName)} | 핵심 개념: <strong>${esc(plan.conceptualFrame.macroConcepts.join(', '))}</strong></p>
          </div>
          <table class="ws-student-info">
            <tr>
              <th>${esc(plan.grade)}학년</th>
              <td>( &nbsp;&nbsp; )반</td>
              <th>번호</th>
              <td>( &nbsp;&nbsp; )번</td>
              <th>이름</th>
              <td style="min-width:78px"></td>
            </tr>
          </table>
        </div>
        <div class="ws-guide-strip">
          <strong>활동 안내:</strong> ${esc(strat.desc)}
          ${strat.steps && strat.steps.length ? `<span class="ws-step-pills">${strat.steps.map((s, i) => `<em>${i + 1}</em> ${esc(s)}`).join(' → ')}</span>` : ''}
        </div>
      </div>`;
  }

  /* =====================================================================
   *  전략별 전용 활동지 템플릿 렌더러
   * ===================================================================== */
  function renderBody(wsType, strat, plan, text) {
    const topic = plan.topic;
    const [c1, c2] = plan.conceptualFrame.macroConcepts;
    const q = plan.conceptualFrame.conceptualQ;
    const gen = plan.conceptualFrame.generalization;
    const kdc = plan.kdcRecommendations[0] || { code: '000', name: '총류', sub: '' };
    const v0 = text.vocab[0] || { word: c1, meaning: '' };
    const v1 = text.vocab[1] || { word: c2, meaning: '' };
    const f0 = text.factSentences[0] || '';
    const f1 = text.factSentences[1] || '';
    const o0 = text.opinionSentences[0] || '';
    const o1 = text.opinionSentences[1] || '';

    switch (wsType) {
      /* 1. K-W-L-S 표 */
      case 'kwls':
        return `
          <div class="ws-prompt-box"><strong>탐구 질문:</strong> ${esc(q)}</div>
          <table class="ws-table">
            <thead>
              <tr>
                <th style="width:25%">K (이미 알고 있는 것)</th>
                <th style="width:25%">W (알고 싶은 것 · 질문)</th>
                <th style="width:25%">L (읽고 새로 알게 된 것)</th>
                <th style="width:25%">S (더 탐구하고 싶은 것)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${ans(`우리 주변에서 '${topic}'과(와) 관련된 모습을 본 적이 있다.`, '수업 전에 알고 있던 경험이나 지식을 적어 보세요.', 5)}</td>
                <td>${ans(q, '오늘 글을 읽으며 꼭 알아내고 싶은 질문을 적어 보세요.', 5)}</td>
                <td>${ans(f0, `「${text.title}」을(를) 읽고 새롭게 알게 된 핵심 내용을 적어 보세요.`, 5)}</td>
                <td>${ans(`도서관 KDC ${kdc.code}번대(${kdc.name}) 서가에서 다른 나라의 사례도 더 찾아보고 싶다.`, '수업 후 더 궁금해진 점이나 찾아볼 자료를 적어 보세요.', 5)}</td>
              </tr>
            </tbody>
          </table>`;

      /* 2. 보·생·궁 (See-Think-Wonder) */
      case 'stw':
        return `
          <p class="ws-inst">선생님이 보여 주신 자료와 읽기 지문 「${esc(text.title)}」을(를) 살펴보며 세 칸을 채워 봅시다.</p>
          <div class="ws-grid-3">
            <div class="ws-card">
              <div class="ws-card-head">👀 See (자세히 본 것)</div>
              <p class="ws-card-sub">눈에 보이는 사실이나 글에 나온 내용을 그대로 적어 보세요.</p>
              ${ans(f0, '관찰한 내용·사실 기록', 4)}
            </div>
            <div class="ws-card">
              <div class="ws-card-head">💭 Think (내 생각)</div>
              <p class="ws-card-sub">그것을 보고 어떤 생각이 들었나요? 왜 그렇게 생각했나요?</p>
              ${ans(`'${c1}'과(와) '${c2}'이(가) 서로 깊이 연결되어 있다고 생각한다.`, '생각과 그 까닭 기록', 4)}
            </div>
            <div class="ws-card">
              <div class="ws-card-head">❓ Wonder (궁금한 질문)</div>
              <p class="ws-card-sub">새롭게 떠오른 궁금증을 질문 문장으로 만들어 보세요.</p>
              ${ans(q, '왜 ~할까? 어떻게 ~할까?', 4)}
            </div>
          </div>`;

      /* 3. 프레이어 모델 (Frayer Model) */
      case 'frayer':
        return `
          <p class="ws-inst">오늘의 핵심 개념 <strong>【${esc(c1)}】</strong>(또는 <strong>${esc(topic)}</strong>)을 네 칸으로 깊이 분석해 봅시다.</p>
          <div class="ws-frayer">
            <div class="ws-frayer-cell">
              <div class="ws-card-head">1. 정의 (내 말로 뜻 풀이하기)</div>
              ${ans(v0.meaning || `'${topic}'에서 여러 요소가 서로 영향을 주고받으며 작동하는 원리`, '사전 뜻과 글의 내용을 참고해 내 말로 정의해 보세요.', 3)}
            </div>
            <div class="ws-frayer-cell">
              <div class="ws-card-head">2. 중요한 특징·속성</div>
              ${ans(`① 혼자서가 아니라 함께 연결될 때 나타난다.\n② '${c2}'에 직접적인 영향을 미친다.`, '이 개념이 가진 꼭 필요한 특징 2~3가지를 적어 보세요.', 3)}
            </div>
            <div class="ws-frayer-center">핵심 개념<br><strong>${esc(c1)}</strong><br><small>(${esc(topic)})</small></div>
            <div class="ws-frayer-cell">
              <div class="ws-card-head">3. 해당하는 예 (Examples)</div>
              ${ans(`글 「${text.title}」에 나온 사례, 우리 교실과 일상 속 실천 사례`, '글 속 사례나 생활 속 예를 찾아 적어 보세요.', 3)}
            </div>
            <div class="ws-frayer-cell">
              <div class="ws-card-head">4. 해당하지 않는 것 (Non-examples)</div>
              ${ans(`서로 관계를 맺지 않고 혼자 동떨어져 있거나 규칙을 무시하는 경우`, '헷갈리기 쉽지만 이 개념이 아닌 것을 적어 보세요.', 3)}
            </div>
          </div>`;

      /* 4. KDC 한국십진분류 서가 탐색 미션지 (Track A / C 핵심) */
      case 'kdc':
        return `
          <div class="ws-prompt-box">
            <strong>📚 학교도서관 KDC 서가 탐색 미션!</strong> 우리 모둠의 탐구 주제 <strong>'${esc(topic)}'</strong>과(와) 어울리는 책을 한국십진분류표(KDC)와 청구기호를 이용해 직접 찾아봅시다.
          </div>
          <div class="ws-kdc-strip">
            ${global.Recommender.KDC_TABLE.map(k => `<span class="ws-kdc-chip"><strong>${k.code}</strong> ${esc(k.name)}</span>`).join('')}
          </div>
          <table class="ws-table">
            <tbody>
              <tr>
                <th style="width:24%">1. 예상 KDC 분류 번호</th>
                <td>
                  <p style="margin:0 0 8px;font-size:12.5px;color:#475569">위 10가지 분류 중 '${esc(topic)}' 관련 책이 가장 많이 꽂혀 있을 분류 번호를 고르고 그 까닭을 써 보세요.</p>
                  ${ans('', '예상 분류 번호: (         )번대 / 그렇게 생각한 까닭:', 3)}
                </td>
              </tr>
              <tr>
                <th>2. 청구기호 해독하기<br><small>(도서관 서가에서 찾은 책)</small></th>
                <td>
                  <div class="ws-callno-grid">
                    <div class="ws-callno-box" style="min-width:130px;min-height:76px;display:flex;flex-direction:column;justify-content:center">
                      <div class="ws-callno-label">내가 찾은 책의 청구기호 적기</div>
                      <div class="ws-callno-val" style="color:#64748b;font-size:13px;margin-top:8px">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</div>
                    </div>
                    <div style="flex:1">
                      ${ans('', '① 앞의 숫자(분류기호)가 뜻하는 주제:\n② 뒤의 글자+숫자(저자기호)가 뜻하는 것:', 3)}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>3. 서가에서 직접 찾은 책</th>
                <td>
                  ${ans('', '• 책 제목:\n• 지은이 / 출판사:\n• 탐구 질문과 관련하여 이 책에서 찾은 핵심 내용:', 4)}
                </td>
              </tr>
            </tbody>
          </table>`;

      /* 5. OPAC 검색 및 검색어 확장 실습지 */
      case 'opac':
      case 'keyword':
        return `
          <p class="ws-inst">탐구 질문 <strong>"${esc(q)}"</strong>을(를) 해결하기 위해 검색어를 확장하고 도서관 검색대(OPAC)에서 자료를 찾아봅시다.</p>
          <table class="ws-table">
            <thead>
              <tr>
                <th style="width:16%">구분</th>
                <th style="width:21%">핵심 검색어</th>
                <th style="width:21%">비슷한 말 (유의어)</th>
                <th style="width:21%">더 넓은 말 (상위어)</th>
                <th style="width:21%">더 좁은 말 (하위어)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>검색어 확장</th>
                <td style="text-align:center;vertical-align:middle"><strong>${esc(topic)}</strong></td>
                <td>${ans('', '비슷한 뜻을 가진 낱말', 2)}</td>
                <td>${ans('', '더 큰 범위의 주제어', 2)}</td>
                <td>${ans('', '구체적인 사례나 낱말', 2)}</td>
              </tr>
            </tbody>
          </table>
          <table class="ws-table" style="margin-top:14px">
            <thead>
              <tr>
                <th style="width:22%">입력한 검색어</th>
                <th style="width:34%">검색된 책 제목 / 지은이</th>
                <th style="width:22%">청구기호 (서가 위치)</th>
                <th style="width:22%">비치 상태 / 선택 이유</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${ans('', '검색창에 입력한 낱말', 3)}</td>
                <td>${ans('', '책 제목 / 지은이', 3)}</td>
                <td>${ans('', '청구기호 기록', 3)}</td>
                <td>${ans('', '대출 가능 여부 및 선택 이유', 3)}</td>
              </tr>
            </tbody>
          </table>`;

      /* 6. 사실과 의견 구분하기 (읽기 텍스트 문장 직접 연동) */
      case 'factopinion':
      case 'truefalse':
        return `
          <p class="ws-inst">수업 읽기 자료 「${esc(text.title)}」에서 뽑은 문장입니다. <strong>사실(확인할 수 있는 것)</strong>인지 <strong>의견(글쓴이의 생각·주장)</strong>인지 구분하고 까닭을 써 봅시다.</p>
          <table class="ws-table">
            <thead>
              <tr>
                <th style="width:48%">글 속 문장</th>
                <th style="width:16%">구분</th>
                <th style="width:36%">그렇게 판단한 까닭</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>① ${esc(f0)}</td>
                <td style="text-align:center;vertical-align:middle;line-height:2">□ 사실<br>□ 의견</td>
                <td>${ans('', '판단한 까닭을 적어 보세요.', 2)}</td>
              </tr>
              <tr>
                <td>② ${esc(o0)}</td>
                <td style="text-align:center;vertical-align:middle;line-height:2">□ 사실<br>□ 의견</td>
                <td>${ans('', '판단한 까닭을 적어 보세요.', 2)}</td>
              </tr>
              <tr>
                <td>③ ${esc(f1)}</td>
                <td style="text-align:center;vertical-align:middle;line-height:2">□ 사실<br>□ 의견</td>
                <td>${ans('', '판단한 까닭을 적어 보세요.', 2)}</td>
              </tr>
              <tr>
                <td>④ 내가 글에서 직접 찾은 문장:<br>${ans('', '글에서 사실 또는 의견 문장 하나를 찾아 옮겨 적어 보세요.', 2)}</td>
                <td style="text-align:center;vertical-align:middle;line-height:2">□ 사실<br>□ 의견</td>
                <td>${ans('', '판단한 까닭을 적어 보세요.', 2)}</td>
              </tr>
            </tbody>
          </table>`;

      /* 7. CRAAP 정보원 신뢰성 평가표 */
      case 'craap':
      case 'sourcetrace':
        return `
          <p class="ws-inst">수업 읽기 자료 「${esc(text.title)}」 또는 도서관에서 찾은 탐구 자료의 신뢰도를 <strong>CRAAP 5가지 기준</strong>으로 점검해 봅시다.</p>
          <table class="ws-table">
            <thead>
              <tr>
                <th style="width:18%">평가 기준</th>
                <th style="width:38%">점검 질문</th>
                <th style="width:28%">내가 확인한 내용</th>
                <th style="width:16%">점수 (1~3점)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>C 최신성<br><small>(Currency)</small></th>
                <td>언제 만들어졌나요? 최근의 정보가 반영되었나요?</td>
                <td>${ans('', '발행 연도·최근 정보 여부 기록', 2)}</td>
                <td style="text-align:center;vertical-align:middle">☆ ☆ ☆<br><small>( &nbsp;&nbsp; / 3점)</small></td>
              </tr>
              <tr>
                <th>R 관련성<br><small>(Relevance)</small></th>
                <td>우리의 탐구 질문("${esc(q)}")을 해결하는 데 알맞은가요?</td>
                <td>${ans('', '탐구 질문과의 관련성 기록', 2)}</td>
                <td style="text-align:center;vertical-align:middle">☆ ☆ ☆<br><small>( &nbsp;&nbsp; / 3점)</small></td>
              </tr>
              <tr>
                <th>A 권위<br><small>(Authority)</small></th>
                <td>누가(지은이·기관) 썼나요? 믿을 만한 전문가인가요?</td>
                <td>${ans('', '지은이·출판사·기관 확인 기록', 2)}</td>
                <td style="text-align:center;vertical-align:middle">☆ ☆ ☆<br><small>( &nbsp;&nbsp; / 3점)</small></td>
              </tr>
              <tr>
                <th>A 정확성<br><small>(Accuracy)</small></th>
                <td>근거와 출처가 분명하고 다른 자료와 비교해도 정확한가요?</td>
                <td>${ans('', '근거·오류 여부 확인 기록', 2)}</td>
                <td style="text-align:center;vertical-align:middle">☆ ☆ ☆<br><small>( &nbsp;&nbsp; / 3점)</small></td>
              </tr>
              <tr>
                <th>P 목적<br><small>(Purpose)</small></th>
                <td>정보 제공 목적인가요, 아니면 광고·편향된 선전 목적인가요?</td>
                <td>${ans('', '글의 작성 목적 기록', 2)}</td>
                <td style="text-align:center;vertical-align:middle">☆ ☆ ☆<br><small>( &nbsp;&nbsp; / 3점)</small></td>
              </tr>
            </tbody>
          </table>
          <div style="margin-top:12px">${ans('', '종합 판정 (총점:     / 15점): 이 자료를 우리 모둠의 탐구 근거 자료로 사용할까요? 그 까닭을 써 보세요.', 2)}</div>`;

      /* 8. 저작권 보호 및 출처 표기 실습지 */
      case 'citation':
        return `
          <p class="ws-inst">자료를 인용할 때는 만든 사람의 저작권을 존중하여 <strong>출처</strong>를 바르게 적어야 합니다. 오늘 읽은 글이나 도서관에서 찾은 책을 바탕으로 실습해 봅시다.</p>
          <div class="ws-prompt-box">
            <strong>📌 초등 표준 출처 표기 공식</strong><br>
            • <strong>단행본(책):</strong> 지은이(발행연도). 『책 제목』. 출판사, 인용한 쪽.<br>
            • <strong>누리집(웹):</strong> 작성자 또는 기관명(작성연도). "문서 제목". 사이트 이름. 주소(URL) (검색일: ${esc(plan.createdAt)})
          </div>
          <table class="ws-table">
            <tbody>
              <tr>
                <th style="width:24%">1. 자료에서 찾은 핵심 문장</th>
                <td>${ans('', '내 생각의 근거로 삼고 싶은 문장을 큰따옴표(" ") 안에 적어 보세요.', 3)}</td>
              </tr>
              <tr>
                <th>2. 내 말로 바꿔 쓰기<br><small>(요약·재구성)</small></th>
                <td>${ans('', '문장을 그대로 베끼지 않고 나의 말로 자연스럽게 바꿔 써 보세요.', 3)}</td>
              </tr>
              <tr>
                <th>3. 바른 출처 표기 완성</th>
                <td>${ans('', '지은이(발행연도). 『책 제목』. 출판사, 쪽수. 형식에 맞추어 실제로 참고한 자료의 출처를 적어 보세요.', 3)}</td>
              </tr>
            </tbody>
          </table>`;

      /* 9. 개념도 (Concept Map) & 생각 그물 */
      case 'conceptMap':
      case 'web':
        return `
          <p class="ws-inst">중심 주제 <strong>【${esc(topic)}】</strong>을(를) 둘러싼 핵심 개념들의 관계를 선과 <strong>연결어(예: ~에 영향을 준다, ~의 바탕이 된다)</strong>로 이어 개념도를 완성해 봅시다.</p>
          <div class="ws-conceptmap-canvas">
            <div class="ws-cm-row">
              <div class="ws-cm-node sub">핵심 개념 1<br><strong>${esc(c1)}</strong></div>
              <div class="ws-cm-arrow">⟷ <span class="ws-cm-blank">( 연결어: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span> ⟷</div>
              <div class="ws-cm-node main">중심 주제<br><strong>${esc(topic)}</strong></div>
              <div class="ws-cm-arrow">⟷ <span class="ws-cm-blank">( 연결어: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span> ⟷</div>
              <div class="ws-cm-node sub">핵심 개념 2<br><strong>${esc(c2)}</strong></div>
            </div>
            <div style="margin-top:14px">
              ${ans('', '위 개념 마디들을 잇는 구체적인 사례(가지치기)와 개념 연결 설명을 자유롭게 그리고 적어 보세요.', 5)}
            </div>
          </div>`;

      /* 10. 벤다이어그램 / 비교·대조표 */
      case 'venn':
      case 'compareTable':
      case 'intertext':
        const itemA = plan.contentElements.knowledge[0] || `${c1} 측면`;
        const itemB = plan.contentElements.knowledge[1] || `${c2} 측면`;
        return `
          <p class="ws-inst">글 「${esc(text.title)}」을(를) 읽고 <strong>'${esc(itemA)}'</strong>과(와) <strong>'${esc(itemB)}'</strong>의 공통점과 차이점을 비교해 봅시다.</p>
          <div class="ws-venn-grid">
            <div class="ws-venn-box left">
              <div class="ws-card-head">【${esc(itemA)}】만의 특징 (차이점)</div>
              ${ans(`'${itemA}'은(는) 기본 구조와 원리를 형성하는 출발점이 된다.`, `'${itemA}'에만 해당하는 특징을 적어 보세요.`, 4)}
            </div>
            <div class="ws-venn-box center">
              <div class="ws-card-head">공통점 (함께 만나는 점)</div>
              ${ans(`둘 다 '${topic}'을(를) 이루는 핵심 요소이며 '${c1}' 원리로 연결되어 '${c2}'에 영향을 준다.`, '두 대상이 공통으로 가진 성질이나 원리를 적어 보세요.', 4)}
            </div>
            <div class="ws-venn-box right">
              <div class="ws-card-head">【${esc(itemB)}】만의 특징 (차이점)</div>
              ${ans(`'${itemB}'은(는) 실제 생활 맥락에서 적용되고 변화가 드러나는 과정이다.`, `'${itemB}'에만 해당하는 특징을 적어 보세요.`, 4)}
            </div>
          </div>`;

      /* 11. 인과관계 사슬망 / 연표 흐름 */
      case 'chain':
      case 'timeline':
        return `
          <p class="ws-inst">글 「${esc(text.title)}」에 나타난 원인과 결과(또는 시간의 흐름)를 사슬 고리로 이어 정리해 봅시다.</p>
          <div class="ws-chain-row">
            <div class="ws-chain-step">
              <div class="ws-card-head">① 시작 원인 · 배경</div>
              ${ans(`'${plan.contentElements.knowledge[0] || topic}'에서 작은 변화나 문제가 시작됨`, '무엇 때문에 일이 시작되었나요?', 3)}
            </div>
            <div class="ws-chain-arrow">➜</div>
            <div class="ws-chain-step">
              <div class="ws-card-head">② 중간 과정 (${esc(c1)})</div>
              ${ans(`연결된 요소들이 서로 '${c1}'하며 영향이 주변으로 확산됨`, '그 일로 인해 어떤 과정이 이어졌나요?', 3)}
            </div>
            <div class="ws-chain-arrow">➜</div>
            <div class="ws-chain-step">
              <div class="ws-card-head">③ 나타난 결과 (${esc(c2)})</div>
              ${ans(`전체 모습에 '${c2}'이(가) 나타나며 새로운 균형이나 해결이 필요해짐`, '결국 어떤 결과가 나타났나요?', 3)}
            </div>
          </div>
          <div style="margin-top:8px">${ans(gen, '사슬 전체를 보고 깨달은 원리를 한 문장으로 정리해 보세요.', 2)}</div>`;

      /* 12. 에릭슨 개념 일반화 문장 만들기 / 헤드라인 / 문·구·단 */
      case 'generalization':
      case 'headline':
      case 'spw':
        return `
          <div class="ws-prompt-box">
            <strong>💡 개념 일반화 공식 (Erickson Stems)</strong><br>
            특정 인물·장소 이름(고유명사)을 빼고, 오늘의 핵심 개념 <strong>【${esc(c1)}】</strong>과(와) <strong>【${esc(c2)}】</strong>을(를) 넣어 <em>"언제, 어디서나 통하는 원리 문장"</em>을 만들어 봅시다!
          </div>
          <table class="ws-table">
            <tbody>
              <tr>
                <th style="width:26%">1단계: 핵심 낱말·구·문장 뽑기</th>
                <td>${ans(`• 핵심 단어: ${c1}, ${c2}\n• 핵심 구: 서로 영향을 주고받는 유기적 관계\n• 핵심 문장: ${f0}`, '글에서 가장 중요한 단어(Word) → 구(Phrase) → 문장(Sentence)을 골라 보세요.', 3)}</td>
              </tr>
              <tr>
                <th>2단계: 일반화 문장 초안 만들기<br><small>(문장틀 활용)</small></th>
                <td>
                  <div style="font-size:12px;color:#334155;margin-bottom:4px">문장틀 예시: "구성 요소 간의 <strong>[${esc(c1)}]</strong>은(는) <strong>[${esc(c2)}]</strong>에 ____________ 영향을 미친다."</div>
                  ${ans(gen, '문장틀을 참고하여 모둠의 일반화 문장을 완성해 보세요.', 2)}
                </td>
              </tr>
              <tr>
                <th>3단계: 신문 1면 헤드라인으로 압축!</th>
                <td>${ans(`"${c1}이 살아날 때 ${c2}도 함께 자란다!"`, '오늘의 배움을 신문 머리기사 한 줄로 멋지게 표현해 보세요.', 2)}</td>
              </tr>
            </tbody>
          </table>`;

      /* 13. GRASPS 실생활 전이 참과제 / 4칸 문제해결 / 행동 실천 */
      case 'grasps':
      case 'fourBox':
      case 'actionPlan':
      case 'analogy':
        return `
          <div class="ws-prompt-box">
            <strong>🌟 GRASPS 실생활 전이 미션!</strong> 오늘 탐구한 핵심 개념(<strong>${esc(c1)}, ${esc(c2)}</strong>)의 원리를 우리 학교와 마을의 실제 상황에 적용해 문제를 해결해 봅시다.
          </div>
          <div class="ws-grid-2">
            <div class="ws-card">
              <div class="ws-card-head">🎯 나의 역할(Role)과 대상(Audience)</div>
              <p class="ws-card-sub">• 역할: 우리 학교 '${esc(topic)}' 어린이 자문위원<br>• 대상: 우리 학교 친구들과 가족, 이웃 주민</p>
              ${ans('', '내가 맡은 역할과 알리고 싶은 대상을 적어 보세요.', 3)}
            </div>
            <div class="ws-card">
              <div class="ws-card-head">🔍 해결할 실생활 문제 상황(Situation)</div>
              <p class="ws-card-sub">우리 교실·가정·마을에서 '${esc(c1)}'이(가) 잘 지켜지지 않아 생기는 문제는?</p>
              ${ans('', '해결하고 싶은 실제 문제 상황을 적어 보세요.', 3)}
            </div>
            <div class="ws-card">
              <div class="ws-card-head">💡 탐구한 원리를 적용한 해결 방법</div>
              ${ans('', '오늘 배운 원리를 적용한 구체적인 해결 방법을 써 보세요.', 3)}
            </div>
            <div class="ws-card">
              <div class="ws-card-head">📣 산출물 표현 (포스터·제안서·한 줄 선언)</div>
              ${ans('', '슬로건·실천 약속문·그림으로 자유롭게 표현해 보세요.', 3)}
            </div>
          </div>`;

      /* 14. 성찰 루틴 (예전에는-지금은 / 3-2-1 다리놓기 / 연결·확장·도전 / 자기평가) */
      case 'usedToThink':
      case 'bridge321':
      case 'cec':
      case 'selfCheck':
      case 'journey':
      case 'exit':
        return `
          <p class="ws-inst">오늘 수업을 시작할 때의 생각과 지금의 생각을 비교하며 나의 배움 성장을 돌아봅시다.</p>
          <div class="ws-grid-2">
            <div class="ws-card">
              <div class="ws-card-head">🌱 수업 전: 예전에는 이렇게 생각했다</div>
              ${ans(`예전에는 '${topic}'이(가) 나와는 멀거나 단순한 낱말이라고만 생각했다.`, '수업 전에 가지고 있던 생각을 솔직하게 적어 보세요.', 3)}
            </div>
            <div class="ws-card">
              <div class="ws-card-head">🌳 수업 후: 지금은 이렇게 생각한다!</div>
              ${ans(`지금은 '${topic}' 속에서 '${c1}'과(와) '${c2}'이(가) 서로 깊이 연결되어 우리 생활에 큰 영향을 준다고 생각한다.`, '수업 후 넓어진 생각과 그 까닭을 적어 보세요.', 3)}
            </div>
          </div>
          <table class="ws-table" style="margin-top:10px">
            <thead>
              <tr>
                <th>나의 배움·정보활용 자기점검</th>
                <th style="width:24%">스스로 평가</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1. 탐구 질문에 알맞은 자료를 찾고 핵심 내용을 정확하게 파악했나요?</td>
                <td style="text-align:center">😊 매우 잘함 &nbsp; 🙂 잘함 &nbsp; 🌱 노력</td>
              </tr>
              <tr>
                <td>2. 핵심 개념(<strong>${esc(c1)}, ${esc(c2)}</strong>)의 관계를 내 말로 설명할 수 있나요?</td>
                <td style="text-align:center">😊 매우 잘함 &nbsp; 🙂 잘함 &nbsp; 🌱 노력</td>
              </tr>
              <tr>
                <td>3. 자료의 출처를 바르게 적고 모둠 친구들과 적극적으로 소통했나요?</td>
                <td style="text-align:center">😊 매우 잘함 &nbsp; 🙂 잘함 &nbsp; 🌱 노력</td>
              </tr>
            </tbody>
          </table>`;

      /* 15. SQ3R / QAR / 자석 요약 / 밑줄 긋기 (독서전략 전용) */
      case 'sq3r':
      case 'qar':
      case 'magnetSummary':
      case 'underline':
        return `
          <p class="ws-inst">읽기 자료 「${esc(text.title)}」을(를) 전략적으로 읽고 핵심 내용을 정리해 봅시다.</p>
          <table class="ws-table">
            <tbody>
              <tr>
                <th style="width:25%">1. 훑어보며 만든 질문 (S·Q)</th>
                <td>${ans(text.questions.factual, '제목과 굵은 글씨를 보고 떠오른 질문을 적어 보세요.', 2)}</td>
              </tr>
              <tr>
                <th>2. 문단별 자석 낱말(핵심어) 뽑기</th>
                <td>
                  <div class="ws-vocab-chips">${text.keywords.map(k => `<span class="ws-chip">${esc(k)}</span>`).join('')}</div>
                  ${ans(`1문단: ${topic} / 2문단: ${c1} / 3문단: ${c2} / 4문단: 실천과 적용`, '각 문단에서 가장 중요한 자석 낱말을 골라 보세요.', 2)}
                </td>
              </tr>
              <tr>
                <th>3. 글에서 바로 찾은 답 vs 생각해서 찾은 답 (QAR)</th>
                <td>${ans(`• 바로 찾은 답: ${f0}\n• 생각해서 찾은 답: ${gen}`, '글에 그대로 있는 내용과 내 생각을 더해 찾은 내용을 나누어 적어 보세요.', 3)}</td>
              </tr>
              <tr>
                <th>4. 나만의 한 줄 요약문</th>
                <td>${ans(`「${text.title}」은(는) '${topic}'에서 나타나는 '${c1}'과(와) '${c2}'의 원리를 설명하고 올바른 실천을 강조하는 글이다.`, '자석 낱말들을 모두 넣어 글을 한두 문장으로 요약해 보세요.', 2)}</td>
              </tr>
            </tbody>
          </table>`;

      /* 16. 미니북 8쪽 설계도 / 카드뉴스 스토리보드 / 스케치 노트 */
      case 'minibook':
      case 'cardNews':
      case 'sketch':
      case 'oneCard':
        return `
          <p class="ws-inst">오늘 탐구한 <strong>'${esc(topic)}'</strong>의 핵심 내용을 친구들에게 알리는 <strong>미니북(또는 4컷 카드뉴스)</strong>으로 디자인해 봅시다.</p>
          <div class="ws-grid-4">
            <div class="ws-card">
              <div class="ws-card-head">1쪽 (표지 · 제목)</div>
              ${ans('', '눈길을 끄는 제목과 표지 그림 구상', 4)}
            </div>
            <div class="ws-card">
              <div class="ws-card-head">2쪽 (핵심 개념 · 뜻)</div>
              ${ans('', '꼭 알아야 할 핵심 낱말과 뜻 적기', 4)}
            </div>
            <div class="ws-card">
              <div class="ws-card-head">3쪽 (중요한 사실 · 사례)</div>
              ${ans('', '글이나 도서에서 찾은 핵심 사실과 그림', 4)}
            </div>
            <div class="ws-card">
              <div class="ws-card-head">4쪽 (우리의 결론 · 참고 자료 출처)</div>
              ${ans('', '오늘의 결론 한 문장 + 참고한 책/자료 출처 적기', 4)}
            </div>
          </div>`;

      /* 17. 기본 범용 구조화 활동지 (나머지 모든 전략 대응) */
      default:
        return `
          <div class="ws-prompt-box">
            <strong>탐구 질문:</strong> ${esc(q)}<br>
            <strong>활용 읽기 자료:</strong> 「${esc(text.title)}」 ${plan.track !== 'B' ? `(연계 서가: KDC ${esc(kdc.code)} ${esc(kdc.name)})` : ''}
          </div>
          <table class="ws-table">
            <tbody>
              <tr>
                <th style="width:26%">1단계: 핵심 어휘 & 사전 생각</th>
                <td>
                  <div class="ws-vocab-chips">${text.vocab.map(v => `<span class="ws-chip"><strong>${esc(v.word)}</strong></span>`).join('')}</div>
                  ${ans('', '위 핵심 어휘를 살펴보고 주제에 대해 떠오르는 나의 생각을 적어 보세요.', 3)}
                </td>
              </tr>
              <tr>
                <th>2단계: 【${esc(strat.name)}】 핵심 탐구 기록</th>
                <td>${ans('', `${strat.act || '글의 내용을 분석하여 표나 그림, 문장으로 정리해 보세요.'}`, 5)}</td>
              </tr>
              <tr>
                <th>3단계: 모둠 생각 나누기 & 일반화 결론</th>
                <td>${ans('', '친구들과 생각을 나눈 뒤 오늘 깨달은 핵심 원리를 나의 한 문장으로 정리해 보세요.', 3)}</td>
              </tr>
            </tbody>
          </table>`;
    }
  }

  /**
   * 선택된 전략 목록 전체에 대해 맞춤형 활동지 세트 생성
   */
  function generateWorksheets(plan, readingText, extraWorksheetIds) {
    const strats = [...(plan.strategies || [])];
    (extraWorksheetIds || []).forEach(id => {
      const s = global.StrategyCatalog.byId[id];
      if (s && !strats.some(x => x.id === s.id)) strats.push(s);
    });

    return strats.map((strat, idx) => ({
      id: strat.id,
      name: strat.name,
      category: strat.cat,
      wsType: strat.ws,
      html: `
        <section class="worksheet-page" data-ws-id="${esc(strat.id)}">
          ${renderHeader(plan, strat, idx + 1, strats.length)}
          <div class="ws-sheet-body">
            ${renderBody(strat.ws, strat, plan, readingText)}
          </div>
        </section>`,
    }));
  }

  global.Worksheets = { generateWorksheets };
})(window);
