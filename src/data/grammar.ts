export interface GrammarUsage {
  title: string;
  usage: string;
  exampleEn: string;
  exampleVi: string;
}

export interface GrammarRule {
  title: string;
  rule: string;
  examples: string[];
}

export const PRESENT_SIMPLE_USAGES: GrammarUsage[] = [
  {
    title: '1. Thói quen / Hành động lặp đi lặp lại',
    usage: 'Dùng để diễn tả thói quen hoặc những việc thường xuyên xảy ra ở hiện tại.',
    exampleEn: 'We go to school everyday.',
    exampleVi: 'Chúng tôi đi học mỗi ngày.',
  },
  {
    title: '2. Sự việc mang tính chất quy luật',
    usage: 'Dùng để diễn tả những sự vật, sự việc xảy ra mang tính chất chu kỳ hoặc quy luật.',
    exampleEn: 'This festival occurs every 4 years.',
    exampleVi: 'Lễ hội này diễn ra 4 năm một lần.',
  },
  {
    title: '3. Sự thật hiển nhiên / Chân lý tự nhiên',
    usage: 'Dùng để diễn tả các sự thật hiển nhiên, chân lý khoa học, phong tục tập quán, các hiện tượng tự nhiên.',
    exampleEn: 'The earth moves around the Sun. / The sun rises in the east.',
    exampleVi: 'Trái đất xoay quanh Mặt Trời. / Mặt trời mọc ở đằng Đông.',
  },
  {
    title: '4. Lịch trình, thời khóa biểu cố định',
    usage: 'Dùng để diễn tả lịch trình cố định của tàu, xe, máy bay, thời khóa biểu lớp học, chương trình phát sóng...',
    exampleEn: 'The train leaves at 8 a.m. tomorrow. / The lesson starts at 9 a.m.',
    exampleVi: 'Tàu khởi hành lúc 8 giờ sáng mai. / Tiết học bắt đầu lúc 9 giờ sáng.',
  },
];

export const VERB_FORMS = [
  {
    type: 'Động từ thường (Ordinary Verbs)',
    affirmative: 'S + V(s/es) + (O)',
    affirmativeEg: 'I/You/We/They play football.\nHe/She/It enjoys playing the violin.',
    negative: "S + do not (don't) / does not (doesn't) + V(nguyên thể)",
    negativeEg: "They don't like exercising.\nNam doesn't do judo on weekdays.",
    interrogative: 'Do / Does + S + V(nguyên thể)?',
    interrogativeEg: 'Do you read books in your free time? - Yes, I do. / No, I don\'t.\nDoes she like yoga? - Yes, she does. / No, she doesn\'t.',
  },
  {
    type: 'Động từ "TO BE" (am / is / are)',
    affirmative: 'S + am / is / are + (adj / noun)',
    affirmativeEg: 'I am a student. / He is a good footballer. / We are happy.',
    negative: 'S + am not / is not (isn\'t) / are not (aren\'t) + ...',
    negativeEg: 'I am not interested in art. / It isn\'t difficult.',
    interrogative: 'Am / Is / Are + S + ...?',
    interrogativeEg: 'Are you interested in gardening? - Yes, I am. / Is he a doctor? - No, he isn\'t.',
  },
];

export const SPELLING_RULES: GrammarRule[] = [
  {
    title: 'Động từ kết thúc bằng: -o, -s, -ch, -x, -sh, -z',
    rule: 'Thêm "-es" vào sau động từ (Mẹo nhớ: O Sông Chán Xỉu Sóng Zô).',
    examples: ['go → goes', 'do → does', 'watch → watches', 'wash → washes', 'fix → fixes', 'miss → misses'],
  },
  {
    title: 'Động từ kết thúc bằng "phụ âm + y"',
    rule: 'Đổi "-y" thành "-i" rồi thêm "-es" ("-ies").',
    examples: ['study → studies', 'fly → flies', 'cry → cries', '(Lưu ý nguyên âm + y giữ nguyên: play → plays, stay → stays)'],
  },
  {
    title: 'Các động từ còn lại',
    rule: 'Chỉ cần thêm "-s" vào sau động từ.',
    examples: ['work → works', 'read → reads', 'love → loves', 'arrive → arrives', 'start → starts'],
  },
  {
    title: 'Động từ bất quy tắc đặc biệt',
    rule: 'Biến đổi dạng riêng.',
    examples: ['have → has (He has a new timetable.)'],
  },
];

export const PRONUNCIATION_RULES: GrammarRule[] = [
  {
    title: 'Phát âm là /s/',
    rule: 'Khi tận cùng bằng các âm vô thanh: /p/, /t/, /k/, /f/, /θ/ (Mẹo nhớ: Phải Thôi Không Phí Thức).',
    examples: ['stops /stɒps/', 'starts /stɑːts/', 'looks /lʊks/', 'laughs /lɑːfs/'],
  },
  {
    title: 'Phát âm là /ɪz/',
    rule: 'Khi tận cùng bằng các âm gió xì: /s/, /z/, /ʃ/, /tʃ/, /ʒ/, /dʒ/ (kết thúc bằng: s, ss, ch, sh, x, z, ge, ce).',
    examples: ['watches /ˈwɒtʃɪz/', 'washes /ˈwɒʃɪz/', 'rises /ˈraɪzɪz/', 'reduces /rɪˈdjuːsɪz/'],
  },
  {
    title: 'Phát âm là /z/',
    rule: 'Khi tận cùng bằng các nguyên âm và phụ âm hữu thanh còn lại (b, d, g, l, m, n, r, v, w, y...).',
    examples: ['plays /pleɪz/', 'loves /lʌvz/', 'runs /rʌnz/', 'flows /fləʊz/', 'reads /riːdz/'],
  },
];

export const SIGNALS = [
  { label: 'Trạng từ chỉ tần suất (Adverbs of frequency)', list: 'always (luôn luôn), usually (thường thường), often (thường), sometimes (thỉnh thoảng), seldom/rarely (hiếm khi), never (không bao giờ)' },
  { label: 'Cụm từ chỉ thời gian lặp lại', list: 'every day / every week / every month / every Sunday, once a week, twice a month, three times a year...' },
  { label: 'Vị trí của trạng từ chỉ tần suất', list: 'Đứng TRƯỚC động từ thường (He often plays tennis), đứng SAU động từ To Be (She is always happy).' },
];

export const UNIT1_HOBBY_STRUCTURES = [
  { structure: 'like / love / enjoy / prefer + V-ing', meaning: 'Thích làm gì', example: 'Nam enjoys playing the violin. / She likes doing yoga.' },
  { structure: 'be interested in + N / V-ing', meaning: 'Hứng thú / Say mê điều gì', example: 'I am not interested in art. / Are you interested in gardening?' },
  { structure: 'spend time + V-ing', meaning: 'Dành thời gian làm việc gì', example: 'He spends hours collecting coins. / We love spending time together.' },
  { structure: 'help + (sb) + (to) V-inf', meaning: 'Giúp ai làm gì', example: 'Gardening helps you be more patient. / Collecting stamps helps reduce stress.' },
];
