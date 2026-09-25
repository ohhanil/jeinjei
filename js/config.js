/* ==========================================================================
   사이트 설정 — 운영 전 이 파일의 값만 바꾸면 됩니다.
   ========================================================================== */
window.JNJ_CONFIG = {
  // 외부 후원 페이지 주소. 비워두면 후원 버튼이 사이트 내 '후원하기' 페이지로 연결됩니다.
  donateUrl: 'https://www.ihappynanum.com/Nanum/B/90SGLLJSH8',

  // 관리자 게시판 저장소
  // - Supabase 값을 채우면 실제 서버에 저장됩니다 (supabase/README.md 참고).
  // - 비워두면 '데모 모드'로 동작: 이 브라우저(localStorage)에만 저장됩니다.
  supabaseUrl: '',
  supabaseAnonKey: '',

  // 소식 게시판 분류
  newsCategories: ['미자립교회', '선교', '자립청년', '행사'],

  // 메인페이지 후원자 명단 — 이름은 가운데 글자를 *로 가려서 입력하세요.
  // type: '정기' 또는 '일시'
  donors: [
    { name: '이*진', type: '정기' },
    { name: '심*경', type: '정기' },
    { name: '문*희', type: '정기' },
    { name: '조*일', type: '정기' },
    { name: '변*진', type: '정기' },
    { name: '김*민', type: '정기' },
    { name: '신*열', type: '정기' },
    { name: '권*혁', type: '정기' },
    { name: '백*미', type: '정기' },
  ],

  // 데모 모드 전용 관리자 비밀번호 (Supabase 연결 후에는 사용되지 않습니다)
  demoPassword: 'jnj1234',

  // 기관 정보 (푸터 등에 사용)
  org: {
    name: '제이앤제이',
    nameEn: 'Jei&Jei',
    legalName: '제이앤제이(J&J)',
    ceo: '지석구',
    bizNo: '504-82-90499',
    address: '경기도 화성시 정남면 세자로 30',
    tel: '010-4829-6521',
    fax: '', // 없으면 비워두세요 (푸터에서 숨겨집니다)
    email: 'jeinjei.kr@gmail.com',
    hours: '09:00 ~ 18:00',
    accounts: [
      { bank: '기업은행', number: '053-123272-04-014' },
    ],
    accountHolder: '제이앤제이',
  },
};
