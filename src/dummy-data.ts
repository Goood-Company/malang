// 더미 데이터

export interface DUMMY_WORD_TYPE {
  id: string;
  text: string;
  phonetic: string | null;
  created_at: string;
  definition_kor: string;
  definition_eng: string;
  example_sentence: string | null;
  part_of_speech: string | null;
  order: number;
}

export const DUMMY_WORD_LIST: DUMMY_WORD_TYPE[] = [
  {
    id: "1",
    text: "apple",
    phonetic: "/ˈæpəl/",
    created_at: "2024-01-01",
    definition_kor: "사과",
    definition_eng:
      "a round fruit with red or green skin and a firm white flesh",
    example_sentence: "She ate an apple for lunch.",
    part_of_speech: "noun",
    order: 1,
  },
  {
    id: "2",
    text: "banana",
    phonetic: "/bəˈnænə/",
    created_at: "2024-01-01",
    definition_kor: "바나나",
    definition_eng: "a long curved fruit with a yellow skin",
    example_sentence: "Monkeys love eating bananas.",
    part_of_speech: "noun",
    order: 2,
  },
  {
    id: "3",
    text: "cat",
    phonetic: "/kæt/",
    created_at: "2024-01-01",
    definition_kor: "고양이",
    definition_eng: "a small domesticated carnivorous mammal",
    example_sentence: "The cat slept on the couch.",
    part_of_speech: "noun",
    order: 3,
  },
  {
    id: "4",
    text: "dog",
    phonetic: "/dɔːɡ/",
    created_at: "2024-01-01",
    definition_kor: "개",
    definition_eng:
      "a domesticated carnivorous mammal that typically has a long snout",
    example_sentence: "Dogs are loyal pets.",
    part_of_speech: "noun",
    order: 4,
  },
  {
    id: "5",
    text: "house",
    phonetic: "/haʊs/",
    created_at: "2024-01-01",
    definition_kor: "집",
    definition_eng: "a building for human habitation",
    example_sentence: "They live in a big house.",
    part_of_speech: "noun",
    order: 5,
  },
  {
    id: "6",
    text: "run",
    phonetic: "/rʌn/",
    created_at: "2024-01-01",
    definition_kor: "달리다",
    definition_eng: "to move swiftly on foot",
    example_sentence: "He runs every morning.",
    part_of_speech: "verb",
    order: 6,
  },
  {
    id: "7",
    text: "happy",
    phonetic: "/ˈhæpi/",
    created_at: "2024-01-01",
    definition_kor: "행복한",
    definition_eng: "feeling or showing pleasure or contentment",
    example_sentence: "She felt happy about the news.",
    part_of_speech: "adjective",
    order: 7,
  },
  {
    id: "8",
    text: "book",
    phonetic: "/bʊk/",
    created_at: "2024-01-01",
    definition_kor: "책",
    definition_eng: "a set of written or printed pages bound together",
    example_sentence: "I borrowed a book from the library.",
    part_of_speech: "noun",
    order: 8,
  },
  {
    id: "9",
    text: "blue",
    phonetic: "/bluː/",
    created_at: "2024-01-01",
    definition_kor: "파란색",
    definition_eng: "a color like that of a clear sky",
    example_sentence: "The sky is blue today.",
    part_of_speech: "adjective",
    order: 9,
  },
  {
    id: "10",
    text: "water",
    phonetic: "/ˈwɔːtər/",
    created_at: "2024-01-01",
    definition_kor: "물",
    definition_eng: "a colorless, transparent, odorless liquid",
    example_sentence: "Drink plenty of water.",
    part_of_speech: "noun",
    order: 10,
  },
];

export interface DUMMY_QUESTION_TYPE {
  id: string;
  word_id: string;
  type:
    | "eng_to_kor_choice"
    | "eng_to_eng_choice"
    | "kor_to_eng_choice"
    | "eng_to_kor_blank"
    | "eng_to_eng_blank"
    | "kor_to_eng_blank";
  prompt: string;
  choices: string[] | null;
  answer: string;
  explanation?: string;
}

export const DUMMY_QUESTION_LIST: DUMMY_QUESTION_TYPE[] = [
  {
    id: "1",
    word_id: "1",
    type: "eng_to_kor_choice",
    prompt: "What is the meaning of 'apple'?",
    choices: ["사과", "바나나", "포도", "딸기"],
    answer: "사과",
    explanation: "'apple'은 과일의 이름으로 '사과'를 의미합니다.",
  },
  {
    id: "2",
    word_id: "2",
    type: "eng_to_eng_choice",
    prompt: "Which definition best matches 'banana'?",
    choices: [
      "a long curved fruit with a yellow skin",
      "a small red fruit",
      "a green citrus fruit",
      "a fruit with a hard shell",
    ],
    answer: "a long curved fruit with a yellow skin",
    explanation: "banana는 노란 껍질을 가진 길쭉한 과일입니다.",
  },
  {
    id: "3",
    word_id: "3",
    type: "kor_to_eng_choice",
    prompt: "다음 중 '고양이'에 해당하는 영어 단어는?",
    choices: ["cat", "dog", "bird", "fish"],
    answer: "cat",
    explanation: "'cat'은 고양이를 뜻합니다.",
  },
  {
    id: "4",
    word_id: "4",
    type: "eng_to_kor_blank",
    prompt: "'dog'의 뜻을 한글로 작성하세요.",
    choices: null,
    answer: "개",
    explanation: "'dog'는 일반적으로 '개'로 번역됩니다.",
  },
  {
    id: "5",
    word_id: "5",
    type: "eng_to_eng_blank",
    prompt: "Define the word 'house' in English.",
    choices: null,
    answer: "a building for human habitation",
    explanation: "'house'는 사람들이 사는 건물입니다.",
  },
  {
    id: "6",
    word_id: "6",
    type: "kor_to_eng_blank",
    prompt: "'달리다'를 영어로 쓰세요.",
    choices: null,
    answer: "run",
    explanation: "'달리다'는 영어로 'run'입니다.",
  },
  {
    id: "7",
    word_id: "7",
    type: "eng_to_kor_choice",
    prompt: "What is the Korean meaning of 'happy'?",
    choices: ["슬픈", "기쁜", "화난", "놀란"],
    answer: "기쁜",
    explanation: "'happy'는 기쁘거나 행복한 감정을 나타냅니다.",
  },
  {
    id: "8",
    word_id: "8",
    type: "eng_to_eng_choice",
    prompt: "What best defines 'book'?",
    choices: [
      "a set of written or printed pages bound together",
      "a type of vegetable",
      "a piece of furniture",
      "a musical instrument",
    ],
    answer: "a set of written or printed pages bound together",
    explanation: "book은 책을 뜻합니다.",
  },
  {
    id: "9",
    word_id: "9",
    type: "kor_to_eng_choice",
    prompt: "다음 중 '파란색'에 해당하는 영어 단어는?",
    choices: ["blue", "red", "green", "yellow"],
    answer: "blue",
    explanation: "'blue'는 파란색을 의미합니다.",
  },
  {
    id: "10",
    word_id: "10",
    type: "kor_to_eng_blank",
    prompt: "'물'을 영어로 쓰세요.",
    choices: null,
    answer: "water",
    explanation: "'water'는 '물'입니다.",
  },
];
