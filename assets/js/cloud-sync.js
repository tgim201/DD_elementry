/* =====================================================================
 *  인증코드 입장(비회원) & 교사 개별 로그인(회원) + Firebase 연동 모듈 (cloud-sync.js)
 *  1) 비회원 모드: 관리자에게 받은 인증코드만 입력하면 즉시 시스템 입장 & 지도안 생성 가능
 *     (비회원 입장 시 생성된 이용자 접속 정보도 Firebase Firestore 'users' 컬렉션에 자동 기록)
 *  2) 회원 모드: 필요한 경우 개별 계정(아이디/비밀번호)으로 가입·로그인하여
 *     개인별 [내 수업 자료함]에 수업을 영구 저장·불러오기 (회원 정보 역시 Firebase에 저장)
 * ===================================================================== */
(function (global) {
  'use strict';

  const LS_USERS = 'dd_elementary_users_v3';
  const LS_SESSION = 'dd_elementary_current_session_v3';
  const LS_LESSONS_PREFIX = 'dd_elementary_lessons_user_';
  const LS_CUSTOM_CODES = 'dd_elementary_custom_invite_codes_v3';

  function getAdminCfg() {
    return global.ADMIN_CONFIG || { firebase: {}, validInviteCodes: ['DD2026', 'LIB2026'], adminPasscode: 'admin2026' };
  }

  function isFirebaseEnabled() {
    const fb = getAdminCfg().firebase || {};
    return Boolean(fb.projectId && String(fb.projectId).trim());
  }

  function firestoreDocUrl(colName, docId) {
    const fb = getAdminCfg().firebase;
    const prefix = fb.collectionPrefix || 'dd_elementary_v3';
    const col = `${prefix}_${colName}`;
    const keyQuery = fb.apiKey ? `?key=${encodeURIComponent(fb.apiKey)}` : '';
    return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(fb.projectId)}/databases/(default)/documents/${encodeURIComponent(col)}${docId ? '/' + encodeURIComponent(docId) : ''}${keyQuery}`;
  }

  /** 간단한 비밀번호 해시 (클라이언트 비교용) */
  function simpleHash(str) {
    let h = 2166136261;
    const s = String(str || '');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return 'h_' + (h >>> 0).toString(16);
  }

  /* ---------------- 1. 유효 인증코드 관리 ---------------- */
  function getValidCodes() {
    const base = (getAdminCfg().validInviteCodes || ['DD2026', 'LIB2026']).map(c => String(c).trim().toUpperCase());
    let custom = [];
    try { custom = JSON.parse(localStorage.getItem(LS_CUSTOM_CODES) || '[]'); } catch (_) {}
    return [...new Set([...base, ...custom.map(c => String(c).trim().toUpperCase())])].filter(Boolean);
  }

  async function addInviteCode(newCode, adminPass) {
    if (adminPass !== getAdminCfg().adminPasscode) {
      throw new Error('관리자 비밀번호가 올바르지 않습니다.');
    }
    const clean = String(newCode || '').trim().toUpperCase();
    if (!clean || clean.length < 3) throw new Error('인증코드는 3자 이상 입력해 주세요.');
    let custom = [];
    try { custom = JSON.parse(localStorage.getItem(LS_CUSTOM_CODES) || '[]'); } catch (_) {}
    if (!custom.includes(clean)) custom.push(clean);
    localStorage.setItem(LS_CUSTOM_CODES, JSON.stringify(custom));

    if (isFirebaseEnabled()) {
      try {
        await fetch(firestoreDocUrl('invite_codes', clean), {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              code: { stringValue: clean },
              createdAt: { stringValue: new Date().toLocaleString('ko-KR') },
            },
          }),
        });
      } catch (_) {}
    }

    return getValidCodes();
  }

  function removeInviteCode(code, adminPass) {
    if (adminPass !== getAdminCfg().adminPasscode) {
      throw new Error('관리자 비밀번호가 올바르지 않습니다.');
    }
    const clean = String(code || '').trim().toUpperCase();
    let custom = [];
    try { custom = JSON.parse(localStorage.getItem(LS_CUSTOM_CODES) || '[]'); } catch (_) {}
    custom = custom.filter(c => c !== clean);
    localStorage.setItem(LS_CUSTOM_CODES, JSON.stringify(custom));
    return getValidCodes();
  }

  async function verifyInviteCodeAsync(inputCode) {
    const code = String(inputCode || '').trim().toUpperCase();
    if (!code) return false;
    if (getValidCodes().includes(code)) return true;

    // Firebase에 등록된 추가 인증코드가 있는지 확인
    if (isFirebaseEnabled()) {
      try {
        const res = await fetch(firestoreDocUrl('invite_codes', code));
        if (res.ok) {
          let custom = [];
          try { custom = JSON.parse(localStorage.getItem(LS_CUSTOM_CODES) || '[]'); } catch (_) {}
          if (!custom.includes(code)) {
            custom.push(code);
            localStorage.setItem(LS_CUSTOM_CODES, JSON.stringify(custom));
          }
          return true;
        }
      } catch (_) {}
    }
    return false;
  }

  /* ---------------- 2. Firebase에 이용자 정보(회원/비회원 모두) 저장 ---------------- */
  async function syncUserRecordToFirebase(userRecord) {
    if (!userRecord || !userRecord.userId) return;
    if (!isFirebaseEnabled()) return;
    try {
      await fetch(firestoreDocUrl('users', userRecord.userId), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            userId: { stringValue: String(userRecord.userId) },
            userType: { stringValue: String(userRecord.userType || (userRecord.isGuest ? 'guest' : 'member')) },
            name: { stringValue: String(userRecord.name || '비회원 교사') },
            role: { stringValue: String(userRecord.role || '초등교사') },
            school: { stringValue: String(userRecord.school || '') },
            pwHash: { stringValue: String(userRecord.pwHash || '') },
            inviteCodeUsed: { stringValue: String(userRecord.inviteCodeUsed || '') },
            createdAt: { stringValue: String(userRecord.createdAt || new Date().toLocaleString('ko-KR')) },
            lastActiveAt: { stringValue: new Date().toLocaleString('ko-KR') },
          },
        }),
      });
    } catch (_) {
      // 네트워크 오류 시에도 로컬에서는 정상 진행
    }
  }

  /* ---------------- 3. 세션 및 로컬 이용자 관리 ---------------- */
  function getLocalUsers() {
    try { return JSON.parse(localStorage.getItem(LS_USERS) || '{}'); }
    catch (_) { return {}; }
  }

  function saveLocalUsers(usersMap) {
    localStorage.setItem(LS_USERS, JSON.stringify(usersMap));
  }

  function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(LS_SESSION) || 'null'); }
    catch (_) { return null; }
  }

  function setCurrentUser(userObj) {
    if (!userObj) localStorage.removeItem(LS_SESSION);
    else localStorage.setItem(LS_SESSION, JSON.stringify(userObj));
  }

  /**
   * 현재 이용자가 인증코드를 통과했거나(비회원) 개별 로그인한 상태(회원)인지 확인
   */
  function isAuthorized() {
    const u = getCurrentUser();
    return Boolean(u && u.userId && (u.inviteCodeVerified || !u.isGuest));
  }

  /**
   * [비회원 모드] 관리자 인증코드만 입력하여 즉시 입장 & 이용자 정보 생성·Firebase 저장
   * @param {Object} info - { inviteCode, role, name, school }
   */
  async function enterAsGuest(info) {
    const inviteCode = String((info && info.inviteCode) || '').trim().toUpperCase();
    const defaultRoleByCode = inviteCode === 'LIB2026' ? '사서교사' : '초등교사';
    const role = inviteCode === 'LIB2026'
      ? '사서교사'
      : (inviteCode === 'DD2026' ? '초등교사' : String((info && info.role) || defaultRoleByCode).trim());
    const name = String((info && info.name) || '').trim() || (inviteCode === 'LIB2026' ? '비회원 사서교사' : '비회원 초등교사');
    const school = String((info && info.school) || '').trim();

    const valid = await verifyInviteCodeAsync(inviteCode);
    if (!valid) {
      throw new Error('유효하지 않은 인증코드입니다. 관리자에게 안내받은 인증코드를 다시 확인해 주세요.');
    }

    const nowStr = new Date().toLocaleString('ko-KR');
    const guestId = 'guest_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);

    const guestRecord = {
      userId: guestId,
      userType: 'guest',
      isGuest: true,
      inviteCodeVerified: true,
      name,
      role,
      school,
      pwHash: '',
      inviteCodeUsed: inviteCode,
      createdAt: nowStr,
      lastActiveAt: nowStr,
    };

    const users = getLocalUsers();
    users[guestId] = guestRecord;
    saveLocalUsers(users);

    // 생성된 비회원 이용자 정보를 Firebase Firestore에 저장
    await syncUserRecordToFirebase(guestRecord);

    const sessionUser = {
      userId: guestId,
      userType: 'guest',
      isGuest: true,
      inviteCodeVerified: true,
      name,
      role,
      school,
      inviteCodeUsed: inviteCode,
    };
    setCurrentUser(sessionUser);
    return sessionUser;
  }

  /**
   * [회원 모드] 교사 개별 회원가입 (인증코드 필수 검증 + Firebase 저장)
   * @param {Object} info - { userId, name, role, school, password, inviteCode }
   */
  async function registerTeacher(info) {
    const userId = String(info.userId || '').trim().toLowerCase();
    const name = String(info.name || '').trim();
    const role = String(info.role || '초등교사').trim();
    const school = String(info.school || '').trim();
    const password = String(info.password || '');
    const inviteCode = String(info.inviteCode || '').trim().toUpperCase();

    const valid = await verifyInviteCodeAsync(inviteCode);
    if (!valid) {
      throw new Error('유효하지 않은 인증코드입니다. 관리자에게 발급받은 인증코드를 확인해 주세요.');
    }
    if (!userId || userId.length < 3 || userId.startsWith('guest_')) {
      throw new Error('아이디는 3자 이상 입력해 주세요. (guest_ 시작 아이디 제외)');
    }
    if (!name) {
      throw new Error('선생님 성함(또는 별칭)을 입력해 주세요.');
    }
    if (!password || password.length < 4) {
      throw new Error('비밀번호는 4자리 이상 입력해 주세요.');
    }

    const users = getLocalUsers();
    if (users[userId]) {
      throw new Error('이미 사용 중인 아이디입니다. 다른 아이디를 입력하거나 로그인을 이용해 주세요.');
    }

    // Firebase에 이미 존재하는 아이디인지 확인
    if (isFirebaseEnabled()) {
      try {
        const checkRes = await fetch(firestoreDocUrl('users', userId));
        if (checkRes.ok) {
          throw new Error('이미 클라우드에 등록된 아이디입니다. 다른 아이디를 입력하거나 로그인을 이용해 주세요.');
        }
      } catch (e) {
        if (e.message.includes('이미 클라우드에 등록된')) throw e;
      }
    }

    const nowStr = new Date().toLocaleString('ko-KR');
    const userRecord = {
      userId,
      userType: 'member',
      isGuest: false,
      inviteCodeVerified: true,
      name,
      role,
      school,
      pwHash: simpleHash(password),
      inviteCodeUsed: inviteCode,
      createdAt: nowStr,
      lastActiveAt: nowStr,
    };

    users[userId] = userRecord;
    saveLocalUsers(users);

    // 생성된 회원 정보를 Firebase Firestore에 저장
    await syncUserRecordToFirebase(userRecord);

    const sessionUser = {
      userId,
      userType: 'member',
      isGuest: false,
      inviteCodeVerified: true,
      name,
      role,
      school,
      inviteCodeUsed: inviteCode,
    };
    setCurrentUser(sessionUser);
    return sessionUser;
  }

  /**
   * [회원 모드] 교사 개별 로그인 (로컬 + Firebase 양방향 조회 및 로그인 기록 업데이트)
   */
  async function loginTeacher(userIdInput, passwordInput) {
    const userId = String(userIdInput || '').trim().toLowerCase();
    const pwHash = simpleHash(passwordInput || '');
    if (!userId || !passwordInput) {
      throw new Error('아이디와 비밀번호를 모두 입력해 주세요.');
    }

    const users = getLocalUsers();
    let user = users[userId];

    // 로컬에 없고 Firebase가 활성화된 경우 클라우드에서 계정 조회
    if (!user && isFirebaseEnabled()) {
      try {
        const res = await fetch(firestoreDocUrl('users', userId));
        if (res.ok) {
          const doc = await res.json();
          const f = doc.fields || {};
          user = {
            userId: (f.userId && f.userId.stringValue) || userId,
            userType: 'member',
            isGuest: false,
            inviteCodeVerified: true,
            name: (f.name && f.name.stringValue) || userId,
            role: (f.role && f.role.stringValue) || '초등교사',
            school: (f.school && f.school.stringValue) || '',
            pwHash: (f.pwHash && f.pwHash.stringValue) || '',
            inviteCodeUsed: (f.inviteCodeUsed && f.inviteCodeUsed.stringValue) || '',
            createdAt: (f.createdAt && f.createdAt.stringValue) || '',
          };
          users[userId] = user;
          saveLocalUsers(users);
        }
      } catch (_) {}
    }

    if (!user || user.isGuest) {
      throw new Error('등록되지 않은 회원 아이디입니다. [회원가입] 탭에서 인증코드로 먼저 계정을 만들어 주세요.');
    }
    if (user.pwHash !== pwHash) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    user.lastActiveAt = new Date().toLocaleString('ko-KR');
    users[userId] = user;
    saveLocalUsers(users);
    await syncUserRecordToFirebase(user);

    const sessionUser = {
      userId: user.userId,
      userType: 'member',
      isGuest: false,
      inviteCodeVerified: true,
      name: user.name,
      role: user.role,
      school: user.school || '',
      inviteCodeUsed: user.inviteCodeUsed || '',
    };
    setCurrentUser(sessionUser);
    return sessionUser;
  }

  function logoutTeacher() {
    setCurrentUser(null);
  }

  /**
   * 관리자용: 생성된 전체 이용자(회원 + 비회원) 목록 조회 (로컬 + Firebase 병합)
   */
  async function listAllUsersForAdmin() {
    const localMap = getLocalUsers();
    const merged = { ...localMap };

    if (isFirebaseEnabled()) {
      try {
        const res = await fetch(firestoreDocUrl('users'));
        if (res.ok) {
          const data = await res.json();
          (data.documents || []).forEach(doc => {
            const f = doc.fields || {};
            const str = k => (f[k] && f[k].stringValue) || '';
            const uid = str('userId');
            if (uid) {
              merged[uid] = {
                userId: uid,
                userType: str('userType') || 'member',
                name: str('name'),
                role: str('role'),
                school: str('school'),
                inviteCodeUsed: str('inviteCodeUsed'),
                createdAt: str('createdAt'),
                lastActiveAt: str('lastActiveAt'),
              };
            }
          });
        }
      } catch (_) {}
    }

    return Object.values(merged).sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  }

  /* ---------------- 4. 로그인한 회원 교사 개인별 수업 자료 저장 · 조회 · 삭제 ---------------- */
  function userLessonStorageKey(userId) {
    return LS_LESSONS_PREFIX + String(userId || 'guest').toLowerCase();
  }

  async function getMyLessons() {
    const user = getCurrentUser();
    if (!user || user.isGuest) return [];
    const key = userLessonStorageKey(user.userId);
    let localList = [];
    try { localList = JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) {}

    if (isFirebaseEnabled()) {
      try {
        const res = await fetch(firestoreDocUrl('lessons'));
        if (res.ok) {
          const data = await res.json();
          const remoteDocs = (data.documents || []).map(doc => {
            const f = doc.fields || {};
            const str = k => (f[k] && f[k].stringValue) || '';
            let state = {};
            try { state = JSON.parse(str('stateJson') || '{}'); } catch (_) {}
            return {
              id: str('id'),
              ownerId: str('ownerId'),
              title: str('title'),
              track: str('track') || 'A',
              grade: +((f.grade && f.grade.integerValue) || 4),
              subjectName: str('subjectName'),
              createdAt: str('createdAt'),
              state,
              markdown: str('markdown'),
            };
          }).filter(item => item.ownerId === user.userId);

          if (remoteDocs.length) {
            const mergedMap = new Map();
            [...remoteDocs, ...localList].forEach(item => {
              if (item && item.id && !mergedMap.has(item.id)) mergedMap.set(item.id, item);
            });
            localList = Array.from(mergedMap.values());
            localStorage.setItem(key, JSON.stringify(localList));
          }
        }
      } catch (_) {}
    }
    return localList;
  }

  async function saveMyLesson(entry) {
    const user = getCurrentUser();
    if (!user || user.isGuest) {
      throw new Error('내 수업 자료함에 저장하려면 개인 회원 로그인(또는 회원가입)이 필요합니다.');
    }

    const record = {
      ...entry,
      ownerId: user.userId,
      ownerName: user.name,
      ownerRole: user.role,
    };

    const key = userLessonStorageKey(user.userId);
    let list = [];
    try { list = JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) {}
    list = list.filter(x => x.id !== record.id);
    list.unshift(record);
    localStorage.setItem(key, JSON.stringify(list.slice(0, 100)));

    if (isFirebaseEnabled()) {
      try {
        await fetch(firestoreDocUrl('lessons', `${user.userId}_${record.id}`), {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              id: { stringValue: String(record.id) },
              ownerId: { stringValue: String(user.userId) },
              ownerName: { stringValue: String(user.name) },
              title: { stringValue: String(record.title || '') },
              track: { stringValue: String(record.track || 'A') },
              grade: { integerValue: String(record.grade || 4) },
              subjectName: { stringValue: String(record.subjectName || '') },
              createdAt: { stringValue: String(record.createdAt || '') },
              stateJson: { stringValue: JSON.stringify(record.state || {}) },
              markdown: { stringValue: String(record.markdown || '') },
            },
          }),
        });
      } catch (_) {}
    }

    return list;
  }

  async function deleteMyLesson(lessonId) {
    const user = getCurrentUser();
    if (!user || user.isGuest) return [];
    const key = userLessonStorageKey(user.userId);
    let list = [];
    try { list = JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) {}
    list = list.filter(x => x.id !== lessonId);
    localStorage.setItem(key, JSON.stringify(list));

    if (isFirebaseEnabled()) {
      try {
        await fetch(firestoreDocUrl('lessons', `${user.userId}_${lessonId}`), { method: 'DELETE' });
      } catch (_) {}
    }
    return list;
  }

  global.AuthStore = {
    getCurrentUser,
    isAuthorized,
    enterAsGuest,
    registerTeacher,
    loginTeacher,
    logoutTeacher,
    listAllUsersForAdmin,
    getMyLessons,
    saveMyLesson,
    deleteMyLesson,
    getValidCodes,
    addInviteCode,
    removeInviteCode,
    isFirebaseEnabled,
  };
})(window);
