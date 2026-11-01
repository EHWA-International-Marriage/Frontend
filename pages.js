// Page data and HTML rendering, shared by the browser (index.html) and the build (scripts/build.mjs).
/* ======================================================================
   Subpages. Each page is data; render() turns it into the docs layout.
   Section types: prose, steps, reqs, compare, table, list, callout,
   links, cases, notices, contact.
   ====================================================================== */
const ICON = {
  won: '<circle cx="12" cy="12" r="9"/><path d="M7 9l2 7 3-6 3 6 2-7M6 12h12"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 13h18"/>',
  building: '<path d="M5 21V4h10v17M15 9h4v12M8 8h4M8 12h4M8 16h4"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2 .7 3.5 2.6 3.5 6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/>',
  plane: '<path d="M2 14l8-1 7-7c1.5-1.5 4-1 3 1l-7 7-1 8-2 1-1.5-6-4 2-1 2-1.5-.5.5-3z"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
  scale: '<path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7h6zM18 7l-3 7h6z"/>',
};
const CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="#1ba673" stroke-width="2"><path d="M4 10l4 4 8-8"/></svg>';

const F6_REQS = { type: 'reqs', id: 'f6', title: 'F-6 결혼비자 심사 요건', sub: '혼인신고를 마쳤다고 비자가 자동으로 나오지는 않습니다. 재외공관은 아래 네 가지를 서류로 확인합니다.', items: [
  ['won', '소득', '한국인 배우자의 최근 1년 소득이 법무부 고시 기준 이상이어야 합니다. 소득금액증명원, 근로소득 원천징수영수증, 급여 통장 내역으로 입증합니다.'],
  ['chat', '의사소통', 'TOPIK 1급 이상이나 세종학당 등 지정 기관 이수증을 냅니다. 부부가 공통 언어로 대화할 수 있다면 그 사실을 소명하는 방법도 있습니다.'],
  ['home', '주거', '부부가 함께 살 독립된 거처가 필요합니다. 부동산 등기부등본이나 임대차계약서로 확인합니다.'],
  ['heart', '혼인의 진정성', '교제 경위서에 만남부터 결혼까지의 과정을 쓰고, 대화·통화 기록, 사진, 송금 내역을 시간순으로 붙입니다.'],
]};
const F6_LIMIT = { type: 'callout', title: '불허되면 6개월간 재신청이 제한됩니다', text: '결혼비자는 한 번 불허되면 원칙적으로 6개월 동안 다시 신청할 수 없습니다. 첫 신청에서 서류 불일치와 누락을 없애는 것이 가장 빠른 길입니다.' };

const OLD = {
  vietnam: {
    nav: '베트남', group: '국제결혼', title: '베트남 국제결혼', short: '베트남',
    code: 'F-6', kicker: '베트남 · HAN', card: 'pc-coral', mrz: 'V<VNMF6<<HANOI<<ICN<<EHWA<<<<',
    lead: '베트남 서류의 번역공증과 외교부 인증, 주한 베트남대사관 혼인요건인증서, 양국 혼인신고, 주베트남 대사관 F-6 신청까지 진행합니다.',
    sections: [
      { type: 'prose', id: 'way', title: '진행 방식', paras: ['혼인신고는 한국에서 먼저 하는 방식과 베트남에서 먼저 하는 방식이 있습니다. 부부의 일정과 체류 상황에 맞춰 고르며, 아래는 한국에서 먼저 신고하는 경우입니다.'] },
      { type: 'steps', id: 'flow', title: '진행 절차', sub: '한국 선혼인신고 기준', items: [
        ['베트남 배우자 서류', '미혼증명서, 출생증명서, 신분증, 호적부, 건강진단서를 번역공증해 한국으로 보냅니다.'],
        ['한국인 배우자 서류', '영문 주민등록등본, 영문 범죄경력회신서, 영문 건강진단서, 여권 사본을 준비합니다.'],
        ['혼인요건인증서 발급', '주한 베트남대사관에 서류를 내고 혼인요건인증서를 받습니다.'],
        ['양국 혼인신고', '국내 시·구청에 먼저 신고한 뒤 베트남 측 혼인신고를 진행합니다.'],
        ['F-6 비자 신청', '의사소통·소득 증빙 등을 갖춰 주베트남 한국대사관에 신청합니다.'],
      ]},
      F6_REQS, F6_LIMIT,
    ],
  },

  philippines: {
    nav: '필리핀', group: '국제결혼', title: '필리핀 국제결혼', short: '필리핀',
    code: 'F-6', kicker: '필리핀 · MNL', card: 'pc-coral', mrz: 'V<PHLF6<<MANILA<<ICN<<EHWA<<<',
    lead: '혼인요건 구비증명서(LCCM), 현지 혼인허가, PSA 등록, CFO 출국 전 교육까지 필리핀에만 있는 절차를 빠짐없이 챙깁니다.',
    sections: [
      { type: 'steps', id: 'flow', title: '진행 절차', sub: '필리핀 선혼인신고 기준', items: [
        ['LCCM 발급', '한국인 배우자의 기본증명서·혼인관계증명서를 번역공증하고 영사확인을 받아 주필리핀 한국대사관에서 혼인요건 구비증명서를 받습니다.'],
        ['현지 혼인허가·결혼식', '시청에 혼인허가(Marriage License)를 신청하고, 10일 게시 기간이 지나면 주례자 앞에서 혼인합니다.'],
        ['국내 혼인신고', 'PSA에 등록된 혼인증명서 원본과 배우자 여권 사본으로 시·구청에 신고합니다.'],
        ['CFO 교육 이수', '배우자가 해외이주위원회(CFO)의 출국 전 교육을 받고 여권에 확인 스티커를 붙입니다.'],
        ['F-6 비자 신청', '주필리핀 한국대사관에 신청합니다. 부부간 영어 의사소통으로 요건을 입증할 수도 있습니다.'],
      ]},
      F6_REQS,
      { type: 'callout', title: 'CFO 교육은 출국 일정에 미리 넣어야 합니다', text: '비자가 나와도 CFO 교육을 마치지 않으면 필리핀 출국 단계에서 막힐 수 있습니다. 비자 신청과 함께 교육 일정을 잡아 둡니다.' },
    ],
  },

  china: {
    nav: '중국', group: '국제결혼', title: '중국 국제결혼', short: '중국',
    code: 'F-6', kicker: '중국 · PEK', card: 'pc-coral', mrz: 'V<CHNF6<<BEIJING<<ICN<<EHWA<<',
    lead: '한국 선신고와 중국 선신고 중 부부에게 유리한 방식을 고르고, 공증·인증과 주중 공관 F-6 심사까지 준비합니다.',
    sections: [
      { type: 'compare', id: 'methods', title: '두 가지 신고 방식', sub: '부부가 어디에 머무르고 있는지에 따라 유리한 쪽이 달라집니다.', items: [
        ['A', '한국 선혼인신고', [
          '중국 배우자가 미혼공증서를 받아 중국 외교부 인증(또는 아포스티유)을 거칩니다.',
          '번역문과 함께 한국 구청에 먼저 혼인신고를 합니다.',
          '혼인관계증명서를 번역공증해 중국 호구부의 혼인 상태를 기혼으로 정리합니다.',
          '필요 서류: 미(재)혼증명서 인증본, 중국 신분증 원본, 여권 사본' ]],
        ['B', '중국 선혼인신고', [
          '한국인 배우자의 기본증명서와 혼인관계증명서를 번역공증하고 인증을 받습니다.',
          '중국 민정국을 직접 방문해 결혼증을 받습니다.',
          '국내 시·구청에 수리 신고 방식으로 혼인신고를 마칩니다.',
          '필요 서류: 한국인 배우자 혼인관계증명서 상세(번역공증·영사인증)' ]],
      ]},
      F6_REQS,
      { type: 'callout', title: '과거 이력부터 확인합니다', text: '불법체류 이력이나 위장결혼 의심이 있으면 실태조사 대상이 되기 쉽습니다. 접수 전에 두 사람의 출입국 이력을 먼저 검토합니다.' },
    ],
  },

  thailand: {
    nav: '태국', group: '국제결혼', title: '태국 국제결혼', short: '태국',
    code: 'F-6', kicker: '태국 · BKK', card: 'pc-coral', mrz: 'V<THAF6<<BANGKOK<<ICN<<EHWA<<',
    lead: '암퍼(구청) 서류의 번역과 태국 외교부 인증부터 양국 혼인신고, 주태국 대사관 F-6 심사 대비까지 진행합니다.',
    sections: [
      { type: 'steps', id: 'flow', title: '진행 절차', sub: '한국 선혼인신고 기준', items: [
        ['태국 배우자 서류', '암퍼에서 미혼증명서 등을 발급받아 영문 번역 후 태국 외교부 인증을 받습니다. 여권 사본과 신분증 원본도 준비합니다.'],
        ['국내 혼인신고', '한국 구청에 먼저 신고해 가족관계등록부에 올립니다.'],
        ['태국 혼인신고', '한국 혼인관계증명서를 번역·공증·인증해 암퍼에 가족 기록을 등재합니다.'],
        ['F-6 비자 신청', '의사소통·소득 증빙 등을 갖춰 주태국 한국대사관에 신청합니다.'],
      ]},
      F6_REQS,
      { type: 'callout', title: '태국은 심층 인터뷰가 잦습니다', text: '진정성이 조금이라도 의심되면 인터뷰나 현지 실태조사로 이어져 심사가 길어질 수 있습니다. 교제 경위서를 시간순 증빙과 함께 꼼꼼히 정리합니다.' },
    ],
  },

  cambodia: {
    nav: '캄보디아', group: '국제결혼', title: '캄보디아 국제결혼', short: '캄보디아',
    code: 'F-6', kicker: '캄보디아 · PNH', card: 'pc-coral', mrz: 'V<KHMF6<<PHNOMPENH<<ICN<<EHWA<',
    lead: '외국인과의 결혼을 정부가 엄격히 관리하는 캄보디아의 허가 절차와 현지 인터뷰를 대비하고 F-6 발급까지 진행합니다.',
    sections: [
      { type: 'steps', id: 'flow', title: '진행 절차', sub: '캄보디아 선혼인신고 기준', items: [
        ['한국 서류 인증', '혼인관계증명서·가족관계증명서 상세, 소득 증빙, 범죄경력회신서 등을 번역공증해 주한 캄보디아대사관 영사인증을 받습니다.'],
        ['현지 미혼증명서', '현지로 출국해 주캄보디아 한국대사관에서 미혼증명서를 받습니다.'],
        ['정부 심사·현지 혼인', '캄보디아 정부 심사와 인터뷰를 거쳐 결혼증명서를 받습니다.'],
        ['국내 혼인신고', '결혼증명서 번역공증본과 배우자 여권 사본으로 신고합니다.'],
        ['F-6 비자 신청', '주캄보디아 한국대사관에 신청합니다.'],
      ]},
      F6_REQS,
      { type: 'callout', title: '캄보디아 측 소득 기준이 따로 있습니다', text: '캄보디아 정부 절차에서도 한국인 배우자의 소득(연 3만 달러 이상)을 확인합니다. 한국 F-6 기준과 별도로 미리 맞춰 둡니다.' },
    ],
  },

  uzbekistan: {
    nav: '우즈벡 외 기타국가', group: '국제결혼', title: '우즈베키스탄 등 기타국가', short: '우즈벡 외',
    code: 'F-6', kicker: '우즈베키스탄 · TAS', card: 'pc-coral', mrz: 'V<UZBF6<<TASHKENT<<ICN<<EHWA<',
    lead: '우즈베키스탄과 몽골, 러시아, 카자흐스탄, 키르기스스탄 등은 아포스티유 협약 가입 여부에 따라 인증 방식이 달라집니다. 국가별 체계부터 확인합니다.',
    sections: [
      { type: 'steps', id: 'flow', title: '우즈베키스탄 진행 절차', sub: '우즈베키스탄 선혼인신고 기준', items: [
        ['한국 서류 준비', '혼인관계증명서 상세, 재직증명서, 범죄경력회신서, 건강진단서, 여권 사본을 번역공증하고 아포스티유를 받습니다.'],
        ['현지 혼인 등록', '작스(ZAGS, 주민등록사무소)에서 혼인을 등록하고 결혼증명서를 받습니다.'],
        ['국내 혼인신고', '결혼증명서와 배우자 여권 사본으로 신고합니다.'],
        ['F-6 비자 신청', '주우즈베키스탄 한국대사관에 신청합니다.'],
      ]},
      { type: 'table', id: 'others', title: '기타 국가 진행 포인트', head: ['국가', '핵심 서류', '참고'], rows: [
        ['몽골', '국가등록청 미혼증명서', '영사확인 후 한국 제출'],
        ['러시아', '주한 러시아대사관 혼인요건 인증', '러시아어 번역공증'],
        ['카자흐스탄 · 키르기스스탄', '현지 미혼증명서', '인증 방식을 먼저 확인'],
      ]},
      F6_REQS,
      { type: 'callout', title: '오탈자 하나로 지연될 수 있습니다', text: '러시아어 번역과 현지 인증 절차가 복잡해 이름 철자나 공증 누락만으로도 심사가 늦어집니다. 서류마다 표기를 맞춘 뒤 접수합니다.' },
    ],
  },

  invitation: {
    nav: '가족 · 비즈니스 초청', group: '비자 업무', title: '가족 · 비즈니스 초청', short: '초청',
    code: 'C-3', kicker: '초청비자', card: 'pc-cyan', mrz: 'V<KORC3<<INVITATION<<EHWA<<<<<',
    lead: '배우자 부모님 방문부터 해외 바이어 초청까지, 목적에 맞는 비자 코드를 고르고 초청 사유와 귀국 보증을 입증합니다.',
    sections: [
      { type: 'compare', id: 'types', title: '초청 유형', items: [
        ['C-3-1 · F-1-5 · F-3', '가족 초청', [
          'C-3-1 단기방문: 결혼식 참석, 간병, 친지 방문 등 최대 90일 체류',
          'F-1-5: 결혼이민자 가정의 임신·출산·육아를 돕는 부모 초청, 자녀 나이에 따라 최장 3년',
          'F-3: E-7, D-8 등 장기체류자의 배우자와 미성년 자녀 동반',
          '가장 많은 경우는 외국인 배우자의 부모 초청입니다' ]],
        ['C-3-4', '비즈니스 초청', [
          '해외 거래처 관계자, 바이어, 기술 미팅 상대를 초청할 때 씁니다',
          '사업자등록증, 납세증명서, 초청 사유서, 신원보증서',
          '계약서, 상담 내역, L/C 등 실제 거래 실적',
          '불법체류가 많은 국가의 초청은 심사가 더 까다롭습니다' ]],
      ]},
      { type: 'reqs', id: 'review', title: '대사관이 보는 것', items: [
        ['doc', '초청 목적', '방문 일정표와 체류 중 활동 계획으로 왜 지금 와야 하는지 설명합니다.'],
        ['won', '신원보증·재정 능력', '초청인의 재직증명서와 소득금액증명원으로 체류 경비를 감당할 수 있음을 보입니다.'],
        ['plane', '귀국 보증', '피초청인의 본국 직장, 재산, 가족관계로 돌아갈 이유가 분명함을 소명합니다.'],
        ['users', '가족관계 입증', '가족관계증명서와 출생증명서 등으로 초청인과 피초청인의 관계를 확인합니다.'],
      ]},
      { type: 'callout', title: '한 번 불허되면 기록이 남습니다', text: '부모 외 형제자매 초청은 심사가 특히 까다롭고, 불허 이력은 다음 심사에도 영향을 줍니다. 처음부터 사유서와 보증 서류를 갖춰 신청합니다.' },
    ],
  },

  nationality: {
    nav: '국적 및 영주권', group: '비자 업무', title: '국적 및 영주권', short: '국적 · 영주권',
    code: 'F-5', kicker: '영주 · 귀화 · 국적회복', card: 'pc-magenta', mrz: 'V<KORF5<<RESIDENT<<EHWA<<<<<<<',
    lead: '혼인 간이귀화, 일반귀화, 국적회복과 F-5 영주권까지 지금의 체류자격에서 갈 수 있는 가장 빠른 길을 찾습니다.',
    sections: [
      { type: 'compare', id: 'types', title: '국적과 영주권', items: [
        ['귀화 · 국적회복', '대한민국 국적', [
          '귀화: 일반귀화, 간이(혼인)귀화, 특별귀화',
          '국적회복: 일반회복, 중국동포 회복 / 국적판정: 북한·사할린 동포',
          '가장 많은 혼인 간이귀화는 혼인 상태로 국내 2년 이상 거주, 또는 혼인 3년 경과와 국내 1년 이상 거주 시 대상입니다',
          '소득·재산 요건이 비교적 완화되어 있고 복수국적을 유지할 수 있습니다' ]],
        ['F-5', '영주권', [
          'F-5-2 국민의 배우자: F-6로 2년 이상 체류',
          'F-5-1 일반: 5년 이상 거주, GNI 기준 소득, 사회통합프로그램(KIIP) 5단계',
          '전문인력·투자 영주: 석·박사, 첨단 분야 인재, 5억 원 이상 투자자 등',
          '동포는 비교적 짧은 체류로 영주권을 받을 수 있습니다' ]],
      ]},
      { type: 'reqs', id: 'review', title: '심사의 세 가지 축', items: [
        ['won', '생계유지 능력', '소득금액증명원, 원천징수부, 금융자산, 부동산 가액으로 안정적인 생계를 보입니다.'],
        ['shield', '품행 단정', '국내외 범죄경력(해외는 아포스티유), 음주운전, 출입국관리법 위반 이력을 미리 검토합니다.'],
        ['book', '기본 소양', '사회통합프로그램 종합평가 합격증을 준비하거나 귀화 면접에 대비합니다.'],
        ['clock', '긴 심사 기간', '서류 검토만 수개월에서 1년 이상 걸립니다. 보완 요구 없이 한 번에 접수하는 것이 중요합니다.'],
      ]},
      { type: 'callout', title: '작은 범칙금도 불허 사유가 됩니다', text: '소득 누락이나 과거 범칙금 이력 하나로도 불허될 수 있습니다. 접수 전에 이력을 모두 확인하고, 요건이 부족하면 장기 계획부터 세웁니다.' },
    ],
  },

  cases: {
    nav: '비자업무사례', group: '사무소', title: '비자업무사례', short: '업무사례',
    code: 'CASE', kicker: '고객센터', card: 'pc-dark', mrz: 'V<KORCASES<<ARCHIVE<<EHWA<<<<<',
    lead: '자주 맡는 사건 유형별로 어떤 문제를 어떻게 풀었는지 정리했습니다.',
    sections: [
      { type: 'cases', id: 'list', title: '사례 모음', items: [
        [['F-6', '베트남'], '국제결혼 혼인신고와 결혼비자 발급', '한국 선혼인신고 후 소득 요건이 기준에 조금 못 미쳐, 배우자 명의 예금과 근로소득을 합산하는 방식으로 다시 구성했습니다.', '첫 신청에 F-6 발급'],
        [['E-7-1', '해외영업'], '외국인 해외영업 인력 채용', '지원자의 전공과 직무가 맞지 않는다는 점이 걸림돌이었습니다. 실제 업무 내용을 다시 정리해 직종 코드를 바꾸고 고용사유서를 보강했습니다.', 'E-7-1 사증발급인정서 승인'],
        [['구제', 'F-6'], '불법체류 중 혼인과 체류 합법화', '자녀 출생을 앞둔 부부였습니다. 출국이 어려운 인도적 사유를 소명해 국내에서 체류자격 변경을 신청했습니다.', '국내 체류허가 특례 승인'],
        [['D-8-1', '무역법인'], '외국인투자기업 등록과 D-8 심사', 'FDI 신고부터 외투 등록까지 진행하고, 사업장 실사에 대비해 계약서와 수출입 실적을 미리 정리했습니다.', 'D-8-1 체류자격 변경 승인'],
      ]},
      { type: 'note', text: '디자인 시안용 예시 사례입니다. 실제 사건 정보가 아닙니다.' },
    ],
  },

};


/* ---- 이화국제결혼 page set (goodwed.kr). OLD supplies pages kept from the earlier draft. ---- */
const BOARD = 'https://goodwed.kr/bbs/board.php?bo_table=';
const COST_ITEMS = (extra = {}) => [
  ['출국 전 준비서류', '출국 전 서류 번역 · 공증 비용'],
  ['항공료', '신랑 출국 항공료'],
  ['현지 체류비', '현지 공항 픽업, 숙박과 식사, 차량 렌트, 통역'],
  ['맞선 진행비', '맞선 장소, 예비신부 교통비와 식대'],
  ['처가 방문', '처가 방문 비용'],
  ['결혼 비용', '예식장, 하객 식사(30명 기준), 피로연, 신부 드레스와 메이크업' + (extra.album ? ', 앨범' : '') + ', 기타'],
  ['현지 서류 비용', '서류 번역공증, 인증서 발급, 영사확인 수수료, 국제 탁송'],
  ['국내 서류 비용', '서류 번역공증과 서류대행, 국제 탁송'],
  ['현지 지급 비용', '현지 진행비, 인건비, 통신비' + (extra.office ? ', 사무실 임대료' : '') + ', 광고비'],
  ['국내 지출 비용', '사무실 임대료, 인건비, 통신비, 광고비, 출장비, 간접비'],
  ['신부 입국 항공', '신부 입국 항공비는 ' + (extra.flightSeparate ? '별도' : '포함되지 않음')],
];
const COST_NOTES = [
  '2차 출국 비용은 개인 부담입니다.',
  '신부와 처가에 드리는 지참금, 선물, 쇼핑, 신부 어학비 등은 따로 준비해 신부에게 직접 전달합니다.',
  '현지 사정이나 급격한 환율 변동이 있으면 금액에 차이가 생길 수 있습니다.',
  '행사 일정은 신랑과 업체 사정에 따라 바뀔 수 있습니다.',
  '고급 VIP 진행은 별도로 협의합니다.',
];
function costPage({ name, alias, iata, mid, extra, info, docKey, card = 'pc-coral' }) {
  return {
    nav: name, group: '비용 및 절차', title: `${alias || name} 국제결혼 비용 및 절차`, short: name,
    code: iata, kicker: `${name} · F-6`, card, mrz: `V<KOR${iata}<<MARRIAGE<<EHWA<<<<<<`,
    lead: `${name} 국제결혼에 드는 비용 항목과 중개 비용, 알아 두시면 좋은 현지 정보를 정리했습니다.`,
    sections: [
      { type: 'table', id: 'items', title: '비용에 포함되는 항목', head: ['항목', '포함 내역'], rows: COST_ITEMS(extra) },
      { type: 'table', id: 'price', title: '중개 비용', sub: '계약금, 중도금, 잔금으로 나누어 냅니다. 성혼사례비는 따로 있습니다.', head: ['구분', '금액'], rows: [
        ['계약금', '300만 원'], ['중도금', `${mid}만 원`], ['잔금', '200만 원'], ['성혼사례비', '200만 원'] ] },
      { type: 'list', id: 'notes', title: '참고하세요', items: COST_NOTES },
      { type: 'table', id: 'info', title: `${name} 국가 정보`, head: ['항목', '내용'], rows: info },
      { type: 'links', id: 'docs', title: '함께 보기', keys: ['cost', docKey, 'documents'] },
    ],
  };
}

const GROUPS = [
  ['회사소개', ['intro', 'license', 'insurance']],
  ['비용 및 절차', ['cost', 'cost-uz', 'cost-kg', 'cost-ru', 'cost-cn', 'cost-vn', 'special']],
  ['결혼 이야기', ['story', 'couples']],
  ['서류대행', ['documents', 'f6-visa', 'invitation', 'nationality', 'vietnam', 'china', 'uzbekistan', 'philippines', 'thailand', 'cambodia']],
  ['커뮤니티', ['notice', 'community']],
];
const NAV_OF_GROUP = { '회사소개': 'about', '비용 및 절차': 'cost', '결혼 이야기': 'story', '서류대행': 'docs', '커뮤니티': 'community' };

const keep = (key, patch) => Object.assign({}, OLD[key], { group: '서류대행' }, patch);

const PAGES = {
  intro: {
    nav: '인사말', group: '회사소개', title: '인사말', short: '인사말',
    code: 'EHWA', kicker: '다문화가정이 운영하는 국제결혼 정보회사', card: 'pc-dark', mrz: 'P<KOREHWA<<INTERNATIONAL<<MARRIAGE<',
    lead: '행복한 가정을 이룰 믿음직한 배우자를 주선하는 이화국제결혼을 찾아 주셔서 감사합니다.',
    sections: [
      { type: 'prose', id: 'greeting', title: '인사드립니다', paras: [
        '부담 없는 만남, 멋진 만남, 좋은 만남을 이화국제결혼에서 시작해 보세요. 개인의 여건과 상황에 맞춰 희망하시는 상대를 고려한 다양한 만남의 기회를 드리고, 진실되고 나에게 꼭 맞는 상대를 찾으실 수 있도록 노력하고 있습니다.',
        '저희와 함께 선택의 폭은 넓히고 실패의 가능성은 줄여 나가신다면, 가장 잘 맞는 분과 새 삶을 열어 가시고 형제자매님의 미래도 더욱 밝아지리라 믿습니다.',
        '이상적인 결혼은 나에게 맞는 결혼관과 결혼 설계, 하나님을 믿는 사람들로서 서로 잘 어울리는 가치관과 소신, 그리고 충분한 정보가 고루 갖추어질 때 가능합니다.',
        '행복은 준비하고 노력하는 사람의 몫이고, 용기 있는 사람만이 얻을 수 있습니다. 지금 형제자매님께 그 행복을 드리고 싶습니다. 언제나 한결같은 마음과 신뢰를 바탕으로 여러분을 위해 최선을 다하겠습니다.' ] },
      { type: 'reqs', id: 'promise', title: '이화가 약속하는 것', items: [
        ['heart', '부담 없는 만남', '처음 국제결혼을 생각하시는 분도 편하게 시작하실 수 있도록 만남을 준비합니다.'],
        ['users', '맞춤 주선', '개인의 여건과 상황, 희망하시는 상대를 고려해 만남의 기회를 드립니다.'],
        ['globe', '다문화가정의 경험', '다문화가정이 직접 운영해 국제결혼 부부의 생활을 가까이에서 이해합니다.'],
        ['doc', '서류까지 함께', '양국 혼인신고와 신부 비자, 처가 초청, 번역공증까지 이어서 진행합니다.'],
      ]},
      { type: 'contact', id: 'office', title: '사무소 정보' },
    ],
  },

  license: {
    nav: '인증현황', group: '회사소개', title: '인증현황', short: '인증현황',
    code: 'REG', kicker: '등록 · 인증', card: 'pc-dark', mrz: 'P<KOREHWA<<22<0001<<JONGNO<<<<<<<<',
    lead: '이화국제결혼은 「결혼중개업의 관리에 관한 법률」에 따라 종로구청에 등록한 국제결혼중개업체입니다.',
    sections: [
      { type: 'table', id: 'certs', title: '등록 · 인증 내역', head: ['서류', '내용', '발급'], rows: [
        ['국제결혼중개업 등록증', '등록번호 서울-종로-국제-22-0001 · 상호 이화국제결혼 · 대표 임지상', '종로구청장 · 2022.03.24'],
        ['사업자등록증', '등록번호 566-05-00714 · 업태 서비스 · 종목 국제결혼 · 개업 2017.03.01', '종로세무서장'],
        ['인허가보증보험증권', '결혼중개업법에 따른 국제결혼중개업 영업보증금 보증 · 보험가입금액 5,000만 원', '서울보증보험'],
      ]},
      { type: 'links', id: 'more', title: '함께 보기', keys: ['insurance', 'intro'] },
    ],
  },

  insurance: {
    nav: '보증보험 피해보상절차', group: '회사소개', title: '보증보험 피해보상절차', short: '피해보상절차',
    code: 'SGI', kicker: '서울보증보험', card: 'pc-dark', mrz: 'P<KOREHWA<<GUARANTEE<<SGI<<<<<<<<',
    lead: '이화국제결혼과 계약한 뒤 당사로 인해 손해가 생겼다면 결혼중개업법에 따라 손해배상을 청구하실 수 있습니다.',
    sections: [
      { type: 'list', id: 'claim', title: '손해배상 청구절차', items: [
        '제1항 · 계약서상 결혼중개업무와 관련해 손해를 입은 이용자는 관련 법률에 따라 손해배상금을 보증보험금 또는 예치금에서 지급해 달라고 청구할 수 있습니다.',
        '제2항 · 청구할 때는 이용자와 결혼중개업자 사이의 손해배상합의서(공증증서), 화해조서, 확정된 법원 판결문 정본 또는 이에 준하는 효력이 있는 서류를 시 · 도지사 또는 군수 · 구청장에게 제출합니다.' ] },
      { type: 'steps', id: 'flow', title: '보상 진행 순서', sub: '보험계약자는 이화국제결혼, 피보험자는 이용자, 보험사는 서울보증보험입니다.', items: [
        ['보험사고 발생', '보험계약자의 채무 또는 의무 불이행으로 피보험자에게 손해가 생깁니다.'],
        ['이행 요청', '피보험자가 이행을 요청했는데도 불이행이 계속되면 보험금을 청구합니다.'],
        ['보험금 청구', '보험금청구서와 손해를 증빙하는 서류를 보험증권 발급지점에 제출합니다.'],
        ['손해조사 · 보상심사', '서울보증보험이 사고 내용을 조사하고 지급할 보험금을 결정합니다.'],
        ['보험금 지급', '지급할 보험금이 결정된 날부터 10일 이내에 보험가입금액 범위에서 손해액을 보상합니다.'],
      ]},
      { type: 'callout', title: '보험금은 은행 계좌로 받습니다', text: '피보험자가 요청한 은행 계좌로 입금하는 것이 원칙이며, 보험금을 받을 때는 보험금영수증 등 구비서류를 제출해야 합니다.' },
    ],
  },

  cost: {
    nav: '국제결혼 비용 한눈에', group: '비용 및 절차', title: '국제결혼 비용 총정리 · 국가별 비교', short: '국제결혼 비용',
    code: 'COST', kicker: '비용 및 절차', card: 'pc-coral', mrz: 'V<KORCOST<<MARRIAGE<<EHWA<<<<<<<',
    lead: '국제결혼 비용이 얼마나 드는지 나라별로 비교했습니다. 중개 비용과 그 안에 포함되는 항목, 따로 준비할 비용을 한 번에 확인하세요.',
    sections: [
      { type: 'table', id: 'compare', title: '국가별 중개 비용', sub: '계약금, 중도금, 잔금으로 나누어 내고 성혼사례비가 따로 있습니다. 나라마다 중도금이 다릅니다.', head: ['국가', '계약금', '중도금', '잔금', '성혼사례비'], rows: [
        ['우즈베키스탄', '300만 원', '1,900만 원', '200만 원', '200만 원'],
        ['러시아', '300만 원', '2,300만 원', '200만 원', '200만 원'],
        ['중국', '300만 원', '1,200만 원', '200만 원', '200만 원'],
        ['베트남', '300만 원', '1,000만 원', '200만 원', '200만 원'],
        ['키르기스스탄', '상담 시 안내', '상담 시 안내', '상담 시 안내', '상담 시 안내'],
      ]},
      { type: 'table', id: 'included', title: '중개 비용에 포함되는 항목', head: ['항목', '포함 내역'], rows: COST_ITEMS() },
      { type: 'list', id: 'extra', title: '따로 준비하는 비용', items: [
        '2차 출국 비용',
        '신부와 처가에 드리는 지참금, 선물, 쇼핑, 신부 어학비 (신부에게 직접 전달)',
        '신부 입국 항공비',
        '고급 VIP 진행 (별도 협의)' ] },
      { type: 'callout', title: '금액은 바뀔 수 있습니다', text: '현지 사정이나 급격한 환율 변동이 있으면 금액에 차이가 생길 수 있습니다. 정확한 비용과 일정은 상담 때 희망 국가와 상황을 듣고 안내해 드립니다.' },
      { type: 'prose', id: 'save', title: '비용을 줄이고 싶다면', paras: [
        '항공권과 현지 만남을 직접 준비하고 국제결혼 서류비만 내는 특가결혼 방식도 있습니다. 서류만 필요하시다면 국제결혼 서류대행을 이용하실 수 있습니다.' ] },
      { type: 'links', id: 'countries', title: '나라별 비용과 절차 자세히 보기', keys: ['cost-uz', 'cost-ru', 'cost-cn', 'cost-vn', 'cost-kg', 'special'] },
    ],
  },

  'cost-uz': costPage({ name: '우즈베키스탄', alias: '우즈베키스탄(우즈벡)', iata: 'TAS', mid: 1900, extra: {}, docKey: 'uzbekistan', info: [
    ['국명', '우즈베키스탄 공화국'], ['수도', '타슈켄트'], ['시차', '한국보다 4시간 늦음'], ['언어', '우즈베크어, 러시아어'],
    ['면적', '한반도의 약 2배'], ['국제전화', '+998'], ['전압', '220V, 50Hz'],
    ['기후', '대륙성 기후로 4~11월은 건조하고 일교차가 큽니다. 여름은 평균 40℃ 안팎으로 덥고 건조하며, 겨울은 평균 -1℃ 내외지만 영하 15℃ 아래로 내려가기도 합니다. 겨울이 우기라 눈과 비가 잦습니다.'] ] }),

  'cost-kg': {
    nav: '키르기스스탄', group: '비용 및 절차', title: '키르기스스탄 국제결혼 비용 및 절차', short: '키르기스스탄',
    code: 'FRU', kicker: '키르기스스탄 · F-6', card: 'pc-coral', mrz: 'V<KORFRU<<MARRIAGE<<EHWA<<<<<<',
    lead: '키르기스스탄 국제결혼의 진행 순서와 혼인 서류, 현지 정보를 정리했습니다. 비용은 상담 때 안내해 드립니다.',
    sections: [
      { type: 'prose', id: 'about', title: '키르기스스탄 국제결혼', paras: [
        '키르기스스탄은 키르기스어와 러시아어를 함께 쓰는 중앙아시아 국가입니다. 혼인 서류는 우즈베키스탄 등 다른 CIS 국가처럼 현지 혼인 등록과 아포스티유 인증을 거쳐 준비합니다.' ] },
      { type: 'steps', id: 'flow', title: '진행 절차', items: [
        ['상담 · 맞선', '희망 상대와 일정을 정하고 현지에서 맞선을 봅니다.'],
        ['한국 서류 준비', '혼인관계증명서, 범죄경력회신서, 건강진단서 등을 번역공증하고 아포스티유를 받습니다.'],
        ['현지 혼인 등록', '현지 등록 기관에 혼인을 등록하고 결혼증명서를 받습니다.'],
        ['국내 혼인신고', '결혼증명서 번역본과 배우자 여권 사본으로 시 · 구청에 신고합니다.'],
        ['F-6 비자 신청', '주키르기스스탄 대한민국 대사관에 결혼비자를 신청합니다.'],
      ]},
      F6_REQS,
      { type: 'table', id: 'info', title: '키르기스스탄 국가 정보', head: ['항목', '내용'], rows: [
        ['국명', '키르기스 공화국'], ['수도', '비슈케크'], ['시차', '한국보다 3시간 늦음'], ['언어', '키르기스어, 러시아어'],
        ['면적', '한반도의 약 0.9배'], ['국제전화', '+996'], ['전압', '220V, 50Hz'],
        ['기후', '국토 대부분이 산악 지대인 대륙성 기후로 여름은 덥고 건조하며 겨울은 춥습니다.'] ] },
      { type: 'note', text: '키르기스스탄 비용 상세는 회원 전용 내용이라 상담 시 안내해 드립니다.' },
      { type: 'links', id: 'more', title: '함께 보기', keys: ['cost', 'uzbekistan', 'documents'] },
    ],
  },

  'cost-ru': costPage({ name: '러시아', iata: 'SVO', mid: 2300, extra: { album: true, office: true }, docKey: 'uzbekistan', info: [
    ['국명', '러시아 연방'], ['수도', '모스크바'], ['시차', '모스크바 기준 한국보다 6시간 늦음'], ['언어', '러시아어'],
    ['면적', '세계에서 가장 넓은 나라'], ['국제전화', '+7'], ['전압', '220V, 50Hz'],
    ['기후', '길고 매우 추운 겨울과 짧고 서늘한 여름이 있는 대륙성 기후입니다. 지역마다 연교차가 크게 달라 시베리아는 60℃를 넘고 모스크바는 30℃ 안팎입니다.'] ] }),

  'cost-cn': costPage({ name: '중국', iata: 'PEK', mid: 1200, extra: { office: true, flightSeparate: true }, docKey: 'china', info: [
    ['국명', '중화인민공화국'], ['수도', '베이징'], ['시차', '베이징 기준 한국보다 1시간 늦음'], ['언어', '중국어'],
    ['면적', '한반도의 약 44배'], ['국제전화', '+86'], ['전압', '220V, 50Hz'],
    ['기후', '땅이 넓어 지역마다 다릅니다. 베이징은 2월 평균 최저 -6.9℃, 최고 4℃로 춥고 일교차가 큰 편이며 비는 적게 옵니다.'] ] }),

  'cost-vn': costPage({ name: '베트남', iata: 'HAN', mid: 1000, extra: { album: true, office: true }, docKey: 'vietnam', info: [
    ['국명', '베트남 사회주의 공화국'], ['수도', '하노이'], ['시차', '한국보다 2시간 늦음'], ['언어', '베트남어'],
    ['면적', '한반도의 약 1.5배'], ['국제전화', '+84'], ['전압', '220V, 50Hz'],
    ['기후', '북부는 아열대, 남부는 열대 몬순 기후입니다. 하노이 등 북부는 계절 변화가 있어 연초와 연말 날씨가 한국의 늦가을과 비슷합니다.'] ] }),

  special: {
    nav: '특가결혼비용', group: '비용 및 절차', title: '특가결혼비용', short: '특가결혼',
    code: 'SALE', kicker: '서류비만으로 진행', card: 'pc-sunset', mrz: 'V<KORSPECIAL<<PRICE<<EHWA<<<<<<',
    lead: '항공권과 현지 만남은 직접 준비하시고, 이화는 국제결혼 서류비만으로 진행을 돕는 방식입니다.',
    sections: [
      { type: 'prose', id: 'what', title: '특가 결혼비용이란', paras: [
        '비용 부담을 줄이고 싶은 분이 직접 항공권을 발권해 출국하고, 현지 소개자나 결혼 진행 에이전시를 통해 마음에 맞는 여성을 소개받는 방식입니다. 이화는 국제결혼 서류비만 받고 진행을 돕습니다.' ] },
      { type: 'callout', title: '지나치게 저렴한 결혼비용은 다시 확인하세요', text: '결혼중개업도 사무실 임대료, 광고비, 인건비, 통신비 같은 기본 지출이 있습니다. 남들보다 눈에 띄게 싼 가격에는 대개 다른 명목의 추가 옵션이 붙습니다. 가장 낮은 트림의 자동차 가격만 보여 주는 것과 같으니, 표시된 가격이 전부인지 꼭 확인하세요.' },
      { type: 'compare', id: 'pros', title: '장점과 단점', items: [
        ['장점', '비용을 아끼고 마음을 더 쓸 수 있습니다', [
          '업체를 통하는 것보다 적은 비용으로 국제결혼을 진행할 수 있습니다',
          '아낀 금액을 미래의 아내에게 더 베풀 수 있습니다',
          '오래 만나기 어려운 국제결혼의 특성상, 평생 함께할 사람에게 배려와 신뢰를 보여 줄 수 있습니다' ]],
        ['단점', '모든 선택에 정답은 없습니다', [
          '회사가 국제결혼 관련 법에 따른 세세한 배려와 처우까지 해 드리기는 어렵습니다',
          '현지 일정과 만남은 직접 챙기셔야 합니다' ]],
      ]},
      { type: 'prose', id: 'who', title: '이런 분께 맞습니다', paras: [
        '혼자 사는 삶이 의미 없게 느껴지고 더 늦기 전에 결혼은 해야겠는데, 국제결혼을 선뜻 시작하기 망설여지는 분께 좋은 출발점입니다. 가벼운 마음으로 출국해 현지를 경험해 보고, 진짜 인연을 만나면 그때 진행하셔도 됩니다.' ] },
      { type: 'list', id: 'local', title: '국내 체류 여성과의 만남도 있습니다', sub: '해외로 나갈 시간을 내기 어려운 분을 위해 이화는 국내에 체류 중인 여성을 만나는 방법도 운영합니다.', items: [
        '출국하지 않아도 되어 먼 이동이 필요 없습니다',
        '한국에서 지낸 기간만큼 한국말을 어느 정도 해 언어 장벽이 낮습니다',
        '오래 만나고 데이트하며 성향과 성격을 천천히 알아본 뒤 결혼을 결정할 수 있습니다' ] },
    ],
  },

  story: Object.assign({}, OLD.cases, { nav: '결혼스토리', group: '결혼 이야기', title: '결혼스토리', short: '결혼스토리', kicker: '결혼 이야기' }),

  couples: {
    nav: '성혼커플', group: '결혼 이야기', title: '성혼커플', short: '성혼커플',
    code: '96', kicker: '결혼 이야기', card: 'pc-coral', mrz: 'V<KORCOUPLES<<96<<EHWA<<<<<<<<<',
    lead: '이화국제결혼을 통해 가정을 이룬 부부들의 결혼 소식입니다.',
    sections: [
      { type: 'prose', id: 'count', title: '96쌍의 결혼을 축하드립니다', paras: [
        '성혼커플 게시판에 지금까지 96건의 결혼 소식이 올라와 있습니다. 부부의 사진과 이야기는 기존 게시판에서 보실 수 있습니다.' ] },
      { type: 'extlinks', id: 'board', title: '게시판 바로가기', items: [
        ['성혼커플', '부부 사진과 결혼 소식', BOARD + 'board51'] ] },
    ],
  },

  documents: {
    nav: '서류대행 안내', group: '서류대행', title: '국제결혼 서류대행', short: '서류대행',
    code: 'DOC', kicker: '혼인신고 · 초청 · 번역공증', card: 'pc-blue', mrz: 'V<KORDOC<<DOCUMENTS<<EHWA<<<<<<',
    lead: '국제결혼 서류대행으로 양국 혼인신고와 신부 결혼비자(F-6), 장모 · 처가 초청, 번역 공증을 맡기실 수 있습니다. 지인 소개로 만난 부부도 서류만 진행합니다.',
    sections: [
      { type: 'reqs', id: 'services', title: '서류대행 업무', items: [
        ['heart', '국제결혼 서류대행', '지인 소개 등으로 만나 결혼하시는 분의 양국 혼인신고와 신부 입국 비자 절차를 진행합니다. 국내에 체류 중인 외국인 여성과 결혼하실 때는 양국 혼인신고와 결혼비자 변경 절차를 맡습니다.'],
        ['users', '초청', '장모님과 장인어른, 처가 가족을 한국으로 초청하는 서류를 준비합니다.'],
        ['globe', '기타 업무', '유학, 국적 취득, 대사관 업무, 출입국관리사무소 업무를 안내하고 국제결혼 이혼 절차도 상담합니다.'],
        ['book', '번역 및 공증', '러시아어, 영어, 베트남어, 중국어, 라오스어, 필리핀어, 미얀마어 등 서류를 번역하고 공증합니다.'],
      ]},
      { type: 'links', id: 'countries', title: '국가별 혼인 서류 절차', keys: ['vietnam', 'china', 'uzbekistan', 'philippines', 'thailand', 'cambodia'] },
      F6_REQS, F6_LIMIT,
      { type: 'links', id: 'more', title: '관련 업무', keys: ['f6-visa', 'invitation', 'nationality', 'cost'] },
    ],
  },

  'f6-visa': {
    nav: '결혼비자(F-6) 안내', group: '서류대행', title: '결혼비자(F-6) 발급 요건과 절차', short: '결혼비자 F-6',
    code: 'F-6', kicker: '결혼이민 비자', card: 'pc-blue', mrz: 'V<KORF6<<MARRIAGE<<VISA<<EHWA<<<',
    lead: '결혼비자(F-6)는 한국인과 혼인한 외국인 배우자가 받는 결혼이민 비자입니다. 발급 요건과 진행 순서, 불허를 피하는 방법을 정리했습니다.',
    sections: [
      { type: 'steps', id: 'flow', title: '진행 순서', items: [
        ['양국 혼인신고', '한국과 배우자 나라 양쪽에 혼인신고를 마칩니다. 어느 나라에서 먼저 할지는 나라와 상황에 따라 정합니다.'],
        ['서류 준비', '소득, 주거, 의사소통, 혼인의 진정성을 보여 주는 서류를 갖춥니다.'],
        ['비자 신청', '배우자 나라의 대한민국 대사관(또는 국내 출입국청)에 신청합니다.'],
        ['심사 · 인터뷰', '서류 심사와 함께 부부 인터뷰가 진행되기도 합니다.'],
        ['발급 · 입국', '비자가 나오면 배우자가 입국하고 외국인등록을 합니다.'],
      ]},
      F6_REQS, F6_LIMIT,
      { type: 'links', id: 'countries', title: '나라별 혼인 서류 절차', keys: ['vietnam', 'china', 'uzbekistan', 'philippines', 'thailand', 'cambodia'] },
      { type: 'links', id: 'more', title: '함께 보기', keys: ['documents', 'invitation', 'cost'] },
    ],
  },

  invitation: keep('invitation', { nav: '장모 · 처가 초청', title: '장모 초청 비자 · 처가 가족 초청', short: '장모 · 처가 초청',
    lead: '장모 초청 비자처럼 장모님과 장인어른, 처가 가족을 한국으로 초청하는 서류를 준비합니다. 방문 목적에 맞는 비자(C-3-1, F-1-5)를 고르고 초청 사유와 귀국 보증을 입증합니다.' }),
  nationality: keep('nationality', { nav: '국적 취득', title: '국적 취득 · 영주권', short: '국적 취득' }),
  vietnam: keep('vietnam', { nav: '베트남 혼인 서류', title: '베트남 국제결혼 서류 · 혼인신고', sections: OLD.vietnam.sections.concat([{ type: 'links', id: 'cost', title: '함께 보기', keys: ['cost-vn', 'cost', 'f6-visa'] }]) }),
  china: keep('china', { nav: '중국 혼인 서류', title: '중국 국제결혼 서류 · 혼인신고', sections: OLD.china.sections.concat([{ type: 'links', id: 'cost', title: '함께 보기', keys: ['cost-cn', 'cost', 'f6-visa'] }]) }),
  uzbekistan: keep('uzbekistan', { nav: '우즈벡 · CIS 혼인 서류', title: '우즈베키스탄 · CIS 국제결혼 서류 · 혼인신고', short: '우즈벡 · CIS', sections: OLD.uzbekistan.sections.concat([{ type: 'links', id: 'cost', title: '함께 보기', keys: ['cost-uz', 'cost', 'f6-visa'] }]) }),
  philippines: keep('philippines', { nav: '필리핀 혼인 서류', title: '필리핀 국제결혼 서류 · 혼인신고' }),
  thailand: keep('thailand', { nav: '태국 혼인 서류', title: '태국 국제결혼 서류 · 혼인신고' }),
  cambodia: keep('cambodia', { nav: '캄보디아 혼인 서류', title: '캄보디아 국제결혼 서류 · 혼인신고' }),

  notice: {
    nav: '알림방', group: '커뮤니티', title: '알림방', short: '알림방',
    code: 'NEWS', kicker: '커뮤니티', card: 'pc-dark', mrz: 'V<KORNOTICE<<BOARD<<EHWA<<<<<<<',
    lead: '국제결혼 진행에 도움이 되는 정보와 사무소 소식을 올립니다. 제목을 누르면 기존 게시판에서 글을 보실 수 있습니다.',
    sections: [
      { type: 'board', id: 'list', title: '최근 공지', href: BOARD + 'board71', items: [
        '이화국제결혼 명함',
        '러시아 국제결혼 교제 경위서 작성하기',
        '우즈베키스탄 여성이 한국 남성과 결혼하려는 이유',
        '우즈벡 국제결혼 신랑 나이',
        '우즈벡 국제결혼, 나 홀로 국제결혼',
        '우즈베키스탄 국제결혼 혼인절차 (동영상)',
        '우즈베키스탄 국제결혼 혼인절차',
        '국제결혼 진행과정 총정리 (동영상)',
        '국제결혼 서류 (동영상)',
        '업체를 통한 국제결혼과 나 홀로 결혼의 비용 차이 (동영상)',
        '신부 입국 후 신혼생활 (동영상)',
        '국제결혼 시부모와의 신혼생활 (동영상)',
      ]},
    ],
  },

  signup: {
    nav: '회원가입', group: '멤버', title: '회원가입', short: '회원가입', plain: true,
    code: 'JOIN', kicker: '멤버', card: 'pc-coral', mrz: 'P<KOREHWA<<MEMBER<<JOIN<<<<<<<<<<<',
    lead: '회원이 되시면 국가별 결혼스토리와 회원 전용 비용 안내를 보시고, 상담게시판에 글을 남기실 수 있습니다.',
    sections: [{ type: 'signup', id: 'join' }],
  },

  login: {
    nav: '로그인', group: '멤버', title: '로그인', short: '로그인', plain: true,
    lead: '회원 아이디와 비밀번호로 로그인하세요. 로그인하면 결혼스토리와 회원 전용 비용 안내를 보실 수 있습니다.',
    sections: [{ type: 'login', id: 'login' }],
  },

  community: {
    nav: '상담게시판 · 자료실', group: '커뮤니티', title: '상담게시판 · 자료실', short: '커뮤니티',
    code: 'TALK', kicker: '커뮤니티', card: 'pc-dark', mrz: 'V<KORCOMMUNITY<<EHWA<<<<<<<<<<<',
    lead: '상담 글 작성과 회원 전용 자료는 기존 이화국제결혼 홈페이지에서 이용하실 수 있습니다.',
    sections: [
      { type: 'extlinks', id: 'boards', title: '게시판 바로가기', items: [
        ['상담게시판', '로그인 후 상담 글을 남길 수 있습니다', BOARD + 'board73'],
        ['국제결혼 자료실', '국제결혼 관련 자료', BOARD + 'board72'],
        ['결혼이야기', '결혼을 준비하는 이야기', BOARD + 'lady'],
        ['사는 이야기', '결혼 후 살아가는 이야기', BOARD + 'story'],
        ['네이버 블로그', '이화국제결혼 블로그', 'https://naver.me/5tfDDmso'],
      ]},
      { type: 'contact', id: 'office', title: '전화 상담' },
    ],
  },
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const icon = k => `<svg viewBox="0 0 24 24">${ICON[k] || ICON.doc}</svg>`;
const ORDER = GROUPS.flatMap(g => g[1]);

function sectionHTML(s) {
  const head = s.title ? `<h2>${esc(s.title)}</h2>${s.sub ? `<p class="sec-sub">${esc(s.sub)}</p>` : ''}` : '';
  let body = '';
  switch (s.type) {
    case 'prose': body = s.paras.map(p => `<p class="prose">${esc(p)}</p>`).join(''); break;
    case 'steps': body = `<ol class="tl">${s.items.map(([t, d], i) => `<li><span class="dot">${i === s.items.length - 1 ? '✓' : String(i + 1).padStart(2, '0')}</span><div><span class="gate">${i === s.items.length - 1 ? 'ARRIVAL' : 'GATE ' + String(i + 1).padStart(2, '0')}</span><b>${esc(t)}</b><p>${esc(d)}</p></div></li>`).join('')}</ol>`; break;
    case 'reqs': body = `<div class="reqs">${s.items.map(([ic, t, d]) => `<div class="req"><span class="ic">${icon(ic)}</span><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('')}</div>`; break;
    case 'compare': body = `<div class="compare">${s.items.map(([tag, t, list]) => `<div class="cmp"><span class="tag">${esc(tag)}</span><h3>${esc(t)}</h3><ul>${list.map(li => `<li>${esc(li)}</li>`).join('')}</ul></div>`).join('')}</div>`; break;
    case 'table': body = `<div class="doc-table-wrap"><table class="doc-table"><thead><tr>${s.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${s.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; break;
    case 'list': body = `<ul class="blist">${s.items.map(li => `<li>${CHECK}<span>${esc(li)}</span></li>`).join('')}</ul>`; break;
    // Posts straight to the goodwed.kr member system; this site never sees the password.
    case 'login': body = `
      <form class="login-card" id="loginForm" action="https://goodwed.kr/bbs/login_check.php" method="post" novalidate>
        <input type="hidden" name="url" value="https://goodwed.kr" />
        <div class="field"><label for="loginId">아이디</label><input id="loginId" name="mb_id" autocomplete="username" required /></div>
        <div class="field"><label for="loginPw">비밀번호</label><input id="loginPw" name="mb_password" type="password" autocomplete="current-password" required /></div>
        <label class="chk plain"><input type="checkbox" id="autoLogin" name="auto_login" /> 자동 로그인</label>
        <p class="login-msg" id="loginMsg" role="alert"></p>
        <button class="btn btn-primary join-submit" type="submit">로그인</button>
        <div class="login-links"><a href="https://goodwed.kr/bbs/password_lost.php" target="_blank" rel="noopener">아이디 · 비밀번호 찾기 ↗</a><a href="/signup/">회원가입</a></div>
        <p class="login-note">로그인하면 회원 전용 게시판이 있는 이화국제결혼 회원 페이지(goodwed.kr)로 이동합니다.</p>
      </form>`; break;
    case 'signup': body = `
      <div class="join">
        <aside class="join-aside">
          <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&amp;fit=crop&amp;w=900&amp;q=80" alt="분홍 장미 부케 위에 놓인 결혼반지" loading="lazy" />
          <span class="gate">MEMBERSHIP</span>
          <b>회원이 되시면</b>
          <ul>
            <li>국가별 결혼스토리 열람</li>
            <li>회원 전용 비용 상세 안내</li>
            <li>상담게시판 글쓰기와 답변 확인</li>
          </ul>
        </aside>
        <form class="join-form" id="joinForm" novalidate>
          <p class="join-note">회원 가입은 현재 기존 이화국제결혼 홈페이지(goodwed.kr)에서 처리됩니다. 이 페이지에 입력하신 정보는 전송되거나 저장되지 않습니다.</p>
          <div class="join-step">
            <span class="gate">STEP 01</span>
            <h3>약관 동의</h3>
            <label class="chk all"><input type="checkbox" id="agreeAll" /> 전체 동의</label>
            <label class="chk"><input type="checkbox" id="agree1" class="agree" required /> 회원가입약관 동의 <em>(필수)</em><a href="https://goodwed.kr/pages.php?id=97" target="_blank" rel="noopener">보기 ↗</a></label>
            <label class="chk"><input type="checkbox" id="agree2" class="agree" required /> 개인정보처리방침 동의 <em>(필수)</em><a href="https://goodwed.kr/pages.php?id=95" target="_blank" rel="noopener">보기 ↗</a></label>
            <label class="chk"><input type="checkbox" id="agree3" class="agree" /> 국제결혼표준약관 확인 <em>(선택)</em><a href="https://goodwed.kr/pages.php?id=98" target="_blank" rel="noopener">보기 ↗</a></label>
          </div>
          <div class="join-step">
            <span class="gate">STEP 02</span>
            <h3>정보 입력</h3>
            <div class="fgrid">
              <div class="field"><label for="mbId">아이디</label><input id="mbId" autocomplete="username" required minlength="3" pattern="[A-Za-z0-9_]+" /><small>영문, 숫자, _ 3자 이상</small></div>
              <div class="field"><label for="mbName">이름</label><input id="mbName" autocomplete="name" required /></div>
              <div class="field"><label for="mbPw">비밀번호</label><input id="mbPw" type="password" autocomplete="new-password" required minlength="6" /><small>6자 이상</small></div>
              <div class="field"><label for="mbPw2">비밀번호 확인</label><input id="mbPw2" type="password" autocomplete="new-password" required /></div>
              <div class="field"><label for="mbHp">휴대폰 번호</label><input id="mbHp" type="tel" autocomplete="tel" placeholder="010-0000-0000" required /></div>
              <div class="field"><label for="mbEmail">이메일</label><input id="mbEmail" type="email" autocomplete="email" required /></div>
              <div class="field wide"><label for="mbCountry">관심 국가</label>
                <select id="mbCountry"><option>아직 정하지 않았어요</option><option>우즈베키스탄</option><option>키르기스스탄</option><option>카자흐스탄</option><option>러시아</option><option>중국</option><option>베트남</option></select></div>
            </div>
          </div>
          <p class="join-msg" id="joinMsg" role="alert"></p>
          <button class="btn btn-primary join-submit" type="submit">회원가입</button>
          <div class="join-done" id="joinDone" hidden role="status">
            <b>입력하신 내용에 문제가 없습니다</b>
            <p>가입은 기존 이화국제결혼 홈페이지에서 마무리됩니다. 아래 버튼을 눌러 같은 내용으로 가입해 주세요.</p>
            <a class="btn btn-primary" href="https://goodwed.kr/bbs/register.php" target="_blank" rel="noopener">기존 홈페이지에서 가입하기 ↗</a>
          </div>
        </form>
      </div>`; break;
    case 'callout': return `<div class="callout"><span class="ic">!</span><div><b>${esc(s.title)}</b><p>${esc(s.text)}</p></div></div>`;
    case 'note': return `<p class="sample-note">※ ${esc(s.text)}</p>`;
    case 'links': body = `<div class="linkgrid">${s.keys.map(k => { const p = PAGES[k]; return `<a class="lg-item" href="/${k}/"><span class="iata">${esc(p.code)}</span><b>${esc(p.short)}</b><small>${esc(p.kicker)}</small><span class="go">자세히 보기 →</span></a>`; }).join('')}</div>`; break;
    case 'cases': body = `<div class="cases">${s.items.map(([tags, t, d, r]) => `<article class="case"><div class="meta">${tags.map(x => `<span class="badge-code">${esc(x)}</span>`).join('')}</div><h3>${esc(t)}</h3><p>${esc(d)}</p><div class="result"><span class="live-dot"></span>${esc(r)}</div></article>`).join('')}</div>`; break;
    case 'notices': body = `<ul class="notice-list">${s.items.map(([t, d, b], i) => `<li><details><summary><span class="no">${String(s.items.length - i).padStart(2, '0')}</span><span class="t">${esc(t)}</span><span class="d">${esc(d)}</span></summary><div class="body">${esc(b)}</div></details></li>`).join('')}</ul>`; break;
    case 'contact': body = `<div class="doc-table-wrap"><table class="doc-table"><tbody>
        <tr><td>주소</td><td>서울특별시 종로구 종로3길 38 진학회관 707호 (청진동)</td></tr>
        <tr><td>전화</td><td>02-2269-3457 · 010-4519-3569</td></tr>
        <tr><td>이메일</td><td>gdwed337@naver.com</td></tr>
        <tr><td>등록번호</td><td>국제결혼중개업 서울-종로-국제-22-0001 · 사업자 566-05-00714</td></tr></tbody></table></div>`; break;
    case 'extlinks': body = `<div class="linkgrid">${s.items.map(([t, d, href]) => `<a class="lg-item" href="${esc(href)}" target="_blank" rel="noopener"><span class="iata">goodwed.kr</span><b>${esc(t)}</b><small>${esc(d)}</small><span class="go">바로가기 ↗</span></a>`).join('')}</div>`; break;
    case 'board': body = `<ul class="notice-list">${s.items.map((t, i) => `<li><a class="board-row" href="${esc(s.href)}" target="_blank" rel="noopener"><span class="no">${String(s.items.length - i).padStart(2, '0')}</span><span class="t">${esc(t)}</span><span class="d">↗</span></a></li>`).join('')}</ul><p class="sample-note">전체 글은 <a href="${esc(s.href)}" target="_blank" rel="noopener">기존 알림방 게시판 ↗</a>에서 보실 수 있습니다.</p>`; break;
  }
  return `<section class="doc-sec" id="s-${s.id}">${head}${body}</section>`;
}

function pageHTML(key) {
  const p = PAGES[key];
  const titled = p.sections.filter(s => s.title && s.id);
  const i = ORDER.indexOf(key);
  const prev = PAGES[ORDER[(i - 1 + ORDER.length) % ORDER.length]], prevKey = ORDER[(i - 1 + ORDER.length) % ORDER.length];
  const nextKey = ORDER[(i + 1) % ORDER.length], next = PAGES[nextKey];
  const crumbs = [`<a href="/">홈</a>`, '<span>/</span>', `<span>${esc(p.group)}</span>`, '<span>/</span>', `<span aria-current="page">${esc(p.short)}</span>`].join('');

  return `
    <section class="subhero${p.plain ? ' subhero-plain' : ''}"><div class="container">
      <div>
        <nav class="crumbs" aria-label="현재 위치">${crumbs}</nav>
        <h1>${esc(p.title)}</h1>
        <p class="lead">${esc(p.lead)}</p>
        ${p.plain ? '' : `<div class="cta-row">
          <a class="btn btn-primary" href="/#contact">빠른 상담 신청 <span class="arrow">→</span></a>
          <a class="btn btn-secondary" href="#s-${titled[0] ? titled[0].id : p.sections[0].id}">${titled[0] ? esc(titled[0].title) : '아래로 보기'}</a>
        </div>`}
      </div>
      ${p.plain ? '' : `<div class="pcard ${p.card}">
        <svg class="seal"><use href="#seal"/></svg>
        <div class="top"><span class="kicker">${esc(p.kicker)}</span><span class="badge badge-new">EHWA</span></div>
        <div class="code">${esc(p.code)}</div>
        <h3>${esc(p.short)}</h3>
        <div class="mrz">${esc(p.mrz)}</div>
      </div>`}
    </div></section>

    <div class="container docs">
      <article class="doc-body">
        ${p.sections.map(sectionHTML).join('')}
        ${p.plain ? '' : `<div class="sub-cta"><div class="promo-cta">
          <div><h2>${esc(p.short)}, 지금 상담받으세요</h2><p>희망하시는 국가와 상황을 말씀해 주시면 비용과 일정을 바로 안내해 드립니다.</p></div>
          <div class="btns"><a class="btn btn-tertiary" href="tel:0222693457">02-2269-3457</a><a class="btn btn-ghost-light" href="mailto:gdwed337@naver.com">gdwed337@naver.com</a></div>
        </div></div>`}
        ${i < 0 ? '' : `<nav class="pn" aria-label="이전 다음 업무">
          <a href="/${prevKey}/"><small>← 이전</small><b>${esc(prev.short)}</b></a>
          <a class="next" href="/${nextKey}/"><small>다음 →</small><b>${esc(next.short)}</b></a>
        </nav>`}
      </article>
    </div>`;
}

if (typeof module !== 'undefined') module.exports = { PAGES, pageHTML };
