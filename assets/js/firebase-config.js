/* =====================================================================
 *  관리자 전용 설정 파일 (assets/js/firebase-config.js)
 *  - 일반 교사 화면에는 노출되지 않으며, 관리자가 이 파일만 수정하여
 *    Firebase 연동 및 교사 가입용 인증코드를 관리합니다.
 * ===================================================================== */
window.ADMIN_CONFIG = {
  // 1. Firebase 프로젝트 설정 (관리자가 Firebase 콘솔에서 발급받은 값 입력)
  //    비워 두면 브라우저 로컬 DB 모드로 즉시 작동하며,
  //    projectId 와 apiKey 를 입력하면 자동으로 Firebase 클라우드 DB(Firestore)에
  //    교사 계정과 개인별 수업 자료가 실시간 저장·동기화됩니다.
  firebase: {
    apiKey: "AIzaSyCrVQohR2RBYkMt2WuSnftMVSK4PL7Kkn0",
    authDomain: "dd-elementry.firebaseapp.com",
    projectId: "dd-elementry",
    storageBucket: "dd-elementry.firebasestorage.app",
    messagingSenderId: "650379117447",
    appId: "1:650379117447:web:895cb5bbb4472d1fd80922",
    measurementId: "G-KQMVD3HCC3",
    collectionPrefix: "dd_elementary_v3"
  },

  // 2. 교사 입장 및 회원가입 시 필요한 인증코드 목록 (2개로 한정)
  //    - DD2026  : 초등 교과교사용 인증코드 (교과수업 우선 추천 안내 및 강조)
  //    - LIB2026 : 사서교사용 인증코드 (사서교사·도서관 수업 우선 추천 안내 및 강조)
  validInviteCodes: [
    "DD2026",
    "LIB2026"
  ],

  // 3. 관리자 전용 마스터 비밀번호 (로그인 창에서 인증코드 추가/교사 목록 확인용)
  adminPasscode: "admin2026"
};
