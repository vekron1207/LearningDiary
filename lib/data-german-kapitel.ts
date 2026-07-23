import type { Phase, Section, ContentBlock, FlashcardDeck, Flashcard, DrillSet, Quiz } from './types';

/* ════════════════════════════════════════════════════════════════
   KAPITEL 5–7 — A1 learning module
   Familie & Alltag · Freizeit · Im Büro

   One dataset drives three surfaces:
     • the lesson phase/tab  (grammar + auto-generated vocab tables)
     • the flashcard decks   (active recall + spaced repetition)
     • the interactive drills (fill-in-the-blank + sentence builder)

   Grammar lessons use the shared ContentBlock renderer, so they look
   identical to the rest of the German track.
   ════════════════════════════════════════════════════════════════ */

/* ── Vocabulary (source of truth) ── */
const vocabK5: Flashcard[] = [
  { id: 'k5v1', de: 'Familie', en: 'family', gender: 'die', plural: 'die Familien', emoji: '👪', example: 'Meine Familie ist groß.', exampleEn: 'My family is big.' },
  { id: 'k5v2', de: 'Vater', en: 'father', gender: 'der', plural: 'die Väter', emoji: '👨', example: 'Mein Vater arbeitet viel.', exampleEn: 'My father works a lot.' },
  { id: 'k5v3', de: 'Mutter', en: 'mother', gender: 'die', plural: 'die Mütter', emoji: '👩', example: 'Meine Mutter kocht gern.', exampleEn: 'My mother likes to cook.' },
  { id: 'k5v4', de: 'Eltern', en: 'parents', gender: 'die', plural: '(nur Plural)', emoji: '👨‍👩‍👧', example: 'Meine Eltern wohnen in Berlin.', exampleEn: 'My parents live in Berlin.' },
  { id: 'k5v5', de: 'Bruder', en: 'brother', gender: 'der', plural: 'die Brüder', emoji: '👦', example: 'Mein Bruder ist zehn Jahre alt.', exampleEn: 'My brother is ten years old.' },
  { id: 'k5v6', de: 'Schwester', en: 'sister', gender: 'die', plural: 'die Schwestern', emoji: '👧', example: 'Ich habe eine Schwester.', exampleEn: 'I have one sister.' },
  { id: 'k5v7', de: 'Kind', en: 'child', gender: 'das', plural: 'die Kinder', emoji: '🧒', example: 'Das Kind spielt im Garten.', exampleEn: 'The child plays in the garden.' },
  { id: 'k5v8', de: 'Großeltern', en: 'grandparents', gender: 'die', plural: '(nur Plural)', emoji: '👴', example: 'Meine Großeltern sind nett.', exampleEn: 'My grandparents are nice.' },
  { id: 'k5v9', de: 'aufstehen', en: 'to get up', emoji: '⏰', example: 'Ich stehe um 7 Uhr auf.', exampleEn: 'I get up at 7.' },
  { id: 'k5v10', de: 'frühstücken', en: 'to have breakfast', emoji: '🍞', example: 'Wir frühstücken zusammen.', exampleEn: 'We have breakfast together.' },
  { id: 'k5v11', de: 'arbeiten', en: 'to work', emoji: '💼', example: 'Sie arbeitet in Frankfurt.', exampleEn: 'She works in Frankfurt.' },
  { id: 'k5v12', de: 'schlafen', en: 'to sleep', emoji: '😴', example: 'Das Baby schläft.', exampleEn: 'The baby is sleeping.' },
  { id: 'k5v13', de: 'Uhr', en: 'clock / watch / o’clock', gender: 'die', plural: 'die Uhren', emoji: '🕐', example: 'Es ist acht Uhr.', exampleEn: 'It is eight o’clock.' },
  { id: 'k5v14', de: 'Zeit', en: 'time', gender: 'die', plural: 'die Zeiten', emoji: '⏳', example: 'Ich habe keine Zeit.', exampleEn: 'I have no time.' },
  { id: 'k5v15', de: 'Morgen', en: 'morning', gender: 'der', plural: 'die Morgen', emoji: '🌅', example: 'Am Morgen trinke ich Kaffee.', exampleEn: 'In the morning I drink coffee.' },
  { id: 'k5v16', de: 'Abend', en: 'evening', gender: 'der', plural: 'die Abende', emoji: '🌆', example: 'Am Abend sehe ich fern.', exampleEn: 'In the evening I watch TV.' },
  { id: 'k5v17', de: 'früh', en: 'early', emoji: '☀️', example: 'Ich stehe früh auf.', exampleEn: 'I get up early.' },
  { id: 'k5v18', de: 'spät', en: 'late', emoji: '🌙', example: 'Es ist schon spät.', exampleEn: 'It is already late.' },
  { id: 'k5v19', de: 'Alltag', en: 'everyday life / routine', gender: 'der', plural: '(meist Singular)', emoji: '🔁', example: 'Mein Alltag ist stressig.', exampleEn: 'My everyday life is stressful.' },
  { id: 'k5v20', de: 'die Woche', en: 'week', gender: 'die', plural: 'die Wochen', emoji: '📅', example: 'Die Woche hat sieben Tage.', exampleEn: 'The week has seven days.' },
];

const vocabK6: Flashcard[] = [
  { id: 'k6v1', de: 'Freizeit', en: 'free time', gender: 'die', plural: '(meist Singular)', emoji: '🎉', example: 'In der Freizeit lese ich.', exampleEn: 'In my free time I read.' },
  { id: 'k6v2', de: 'Hobby', en: 'hobby', gender: 'das', plural: 'die Hobbys', emoji: '🎨', example: 'Mein Hobby ist Musik.', exampleEn: 'My hobby is music.' },
  { id: 'k6v3', de: 'Sport', en: 'sport', gender: 'der', plural: 'die Sportarten', emoji: '⚽', example: 'Ich mache gern Sport.', exampleEn: 'I like doing sport.' },
  { id: 'k6v4', de: 'schwimmen', en: 'to swim', emoji: '🏊', example: 'Wir schwimmen im Sommer.', exampleEn: 'We swim in summer.' },
  { id: 'k6v5', de: 'spielen', en: 'to play', emoji: '🎮', example: 'Die Kinder spielen Fußball.', exampleEn: 'The children play football.' },
  { id: 'k6v6', de: 'lesen', en: 'to read', emoji: '📖', example: 'Ich lese ein Buch.', exampleEn: 'I am reading a book.' },
  { id: 'k6v7', de: 'tanzen', en: 'to dance', emoji: '💃', example: 'Sie tanzt sehr gut.', exampleEn: 'She dances very well.' },
  { id: 'k6v8', de: 'Musik', en: 'music', gender: 'die', plural: '(meist Singular)', emoji: '🎵', example: 'Ich höre gern Musik.', exampleEn: 'I like listening to music.' },
  { id: 'k6v9', de: 'Kino', en: 'cinema', gender: 'das', plural: 'die Kinos', emoji: '🎬', example: 'Wir gehen ins Kino.', exampleEn: 'We are going to the cinema.' },
  { id: 'k6v10', de: 'Einladung', en: 'invitation', gender: 'die', plural: 'die Einladungen', emoji: '💌', example: 'Danke für die Einladung!', exampleEn: 'Thanks for the invitation!' },
  { id: 'k6v11', de: 'einladen', en: 'to invite', emoji: '🙋', example: 'Ich lade dich ein.', exampleEn: 'I invite you.' },
  { id: 'k6v12', de: 'treffen', en: 'to meet', emoji: '🤝', example: 'Wir treffen uns um acht.', exampleEn: 'We meet at eight.' },
  { id: 'k6v13', de: 'Wochenende', en: 'weekend', gender: 'das', plural: 'die Wochenenden', emoji: '🛌', example: 'Am Wochenende schlafe ich lange.', exampleEn: 'On the weekend I sleep in.' },
  { id: 'k6v14', de: 'Party', en: 'party', gender: 'die', plural: 'die Partys', emoji: '🥳', example: 'Die Party war toll.', exampleEn: 'The party was great.' },
  { id: 'k6v15', de: 'Lust haben', en: 'to feel like (doing sth)', emoji: '😃', example: 'Hast du Lust auf Kino?', exampleEn: 'Do you feel like the cinema?' },
  { id: 'k6v16', de: 'besuchen', en: 'to visit', emoji: '🚪', example: 'Ich besuche meine Oma.', exampleEn: 'I visit my grandma.' },
  { id: 'k6v17', de: 'Café', en: 'café', gender: 'das', plural: 'die Cafés', emoji: '☕', example: 'Wir sitzen im Café.', exampleEn: 'We are sitting in the café.' },
  { id: 'k6v18', de: 'Karte', en: 'ticket / card', gender: 'die', plural: 'die Karten', emoji: '🎟️', example: 'Ich kaufe zwei Karten.', exampleEn: 'I buy two tickets.' },
  { id: 'k6v19', de: 'gern', en: 'gladly / to like doing', emoji: '❤️', example: 'Ich koche gern.', exampleEn: 'I like to cook.' },
  { id: 'k6v20', de: 'zusammen', en: 'together', emoji: '👫', example: 'Wir lernen zusammen.', exampleEn: 'We study together.' },
];

const vocabK7: Flashcard[] = [
  { id: 'k7v1', de: 'Büro', en: 'office', gender: 'das', plural: 'die Büros', emoji: '🏢', example: 'Ich arbeite im Büro.', exampleEn: 'I work in the office.' },
  { id: 'k7v2', de: 'Kollege', en: 'colleague (m)', gender: 'der', plural: 'die Kollegen', emoji: '👔', example: 'Mein Kollege heißt Tom.', exampleEn: 'My colleague is called Tom.' },
  { id: 'k7v3', de: 'Kollegin', en: 'colleague (f)', gender: 'die', plural: 'die Kolleginnen', emoji: '👩‍💼', example: 'Meine Kollegin ist nett.', exampleEn: 'My colleague is nice.' },
  { id: 'k7v4', de: 'Chef', en: 'boss', gender: 'der', plural: 'die Chefs', emoji: '🧑‍💼', example: 'Der Chef ist im Meeting.', exampleEn: 'The boss is in the meeting.' },
  { id: 'k7v5', de: 'Computer', en: 'computer', gender: 'der', plural: 'die Computer', emoji: '💻', example: 'Der Computer ist kaputt.', exampleEn: 'The computer is broken.' },
  { id: 'k7v6', de: 'Drucker', en: 'printer', gender: 'der', plural: 'die Drucker', emoji: '🖨️', example: 'Der Drucker druckt nicht.', exampleEn: 'The printer isn’t printing.' },
  { id: 'k7v7', de: 'Telefon', en: 'telephone', gender: 'das', plural: 'die Telefone', emoji: '☎️', example: 'Das Telefon klingelt.', exampleEn: 'The phone is ringing.' },
  { id: 'k7v8', de: 'anrufen', en: 'to call (phone)', emoji: '📞', example: 'Ich rufe den Kunden an.', exampleEn: 'I call the customer.' },
  { id: 'k7v9', de: 'E-Mail', en: 'email', gender: 'die', plural: 'die E-Mails', emoji: '📧', example: 'Ich schreibe eine E-Mail.', exampleEn: 'I write an email.' },
  { id: 'k7v10', de: 'schreiben', en: 'to write', emoji: '✍️', example: 'Er schreibt einen Bericht.', exampleEn: 'He writes a report.' },
  { id: 'k7v11', de: 'Besprechung', en: 'meeting', gender: 'die', plural: 'die Besprechungen', emoji: '📋', example: 'Die Besprechung ist um zehn.', exampleEn: 'The meeting is at ten.' },
  { id: 'k7v12', de: 'Termin', en: 'appointment', gender: 'der', plural: 'die Termine', emoji: '🗓️', example: 'Ich habe einen Termin.', exampleEn: 'I have an appointment.' },
  { id: 'k7v13', de: 'drucken', en: 'to print', emoji: '🖨️', example: 'Kannst du das drucken?', exampleEn: 'Can you print that?' },
  { id: 'k7v14', de: 'schicken', en: 'to send', emoji: '📤', example: 'Ich schicke dir die Datei.', exampleEn: 'I send you the file.' },
  { id: 'k7v15', de: 'Schreibtisch', en: 'desk', gender: 'der', plural: 'die Schreibtische', emoji: '🪑', example: 'Der Schreibtisch ist voll.', exampleEn: 'The desk is full.' },
  { id: 'k7v16', de: 'helfen', en: 'to help (+ Dativ)', emoji: '🆘', example: 'Ich helfe dem Kollegen.', exampleEn: 'I help the colleague.' },
  { id: 'k7v17', de: 'fragen', en: 'to ask', emoji: '❓', example: 'Ich frage den Chef.', exampleEn: 'I ask the boss.' },
  { id: 'k7v18', de: 'Arbeit', en: 'work', gender: 'die', plural: 'die Arbeiten', emoji: '🛠️', example: 'Die Arbeit macht Spaß.', exampleEn: 'The work is fun.' },
  { id: 'k7v19', de: 'Projekt', en: 'project', gender: 'das', plural: 'die Projekte', emoji: '📁', example: 'Das Projekt ist fertig.', exampleEn: 'The project is finished.' },
  { id: 'k7v20', de: 'Kunde', en: 'customer (m)', gender: 'der', plural: 'die Kunden', emoji: '🤵', example: 'Der Kunde wartet.', exampleEn: 'The customer is waiting.' },
];

/* ── Flashcard decks (exported for the Flashcards tab) ── */
export const DE_FLASHCARDS: FlashcardDeck[] = [
  { id: 'deck-k5', title: 'Kapitel 5 — Familie & Alltag', chapter: 'Kapitel 5', description: 'Family, daily routine & time — 20 words', cards: vocabK5 },
  { id: 'deck-k6', title: 'Kapitel 6 — Freizeit', chapter: 'Kapitel 6', description: 'Hobbies, invitations & dates — 20 words', cards: vocabK6 },
  { id: 'deck-k7', title: 'Kapitel 7 — Im Büro', chapter: 'Kapitel 7', description: 'Office, computer & colleagues — 20 words', cards: vocabK7 },
];

/* Build a vocabulary table ContentBlock from a deck (single source of truth). */
function vocabTable(cards: Flashcard[]): ContentBlock {
  return {
    kind: 'table',
    caption: 'Tip: study these in the **Flashcards** tab with audio and spaced repetition.',
    headers: ['German', 'English', 'Plural / note', 'Example'],
    rows: cards.map(c => [
      (c.gender ? `${c.gender} ` : '') + c.de,
      c.en,
      c.plural ?? '—',
      c.example ?? '—',
    ]),
  };
}

/* ════════════════════════════════════════════════════════════════
   GRAMMAR LESSONS  →  the "Kapitel 5–7" phase/tab
   ════════════════════════════════════════════════════════════════ */

function overview(objectives: string[], time: string, difficulty: string, vocab: number, grammar: string, situations: string): ContentBlock[] {
  return [
    { kind: 'heading', text: 'Learning objectives' },
    { kind: 'list', items: objectives },
    {
      kind: 'table',
      headers: ['At a glance', ''],
      rows: [
        ['Estimated time', time],
        ['Difficulty', difficulty],
        ['Vocabulary', `${vocab} words`],
        ['Grammar', grammar],
        ['Real-life situations', situations],
      ],
    },
    { kind: 'callout', tone: 'tip', text: 'Work the loop: **read the lesson → study the flashcards → do the drills → take the quiz.** Come back tomorrow and let spaced repetition surface the words you forgot.' },
  ];
}

const sectionK5: Section = {
  id: 'de-k5',
  title: 'Kapitel 5 — Familie und Alltag',
  week: 'Family · Daily routine · Time',
  items: [
    { id: 'k5-overview', text: 'Overview — what you’ll learn', content: overview(
      ['Talk about your family and describe your daily routine', 'Use the modal verbs können, müssen and wollen correctly', 'Build sentences with the Satzklammer (modal + infinitive)', 'Tell the time, both officially and informally'],
      '2–3 hours', 'A1 · beginner', vocabK5.length, 'Modal verbs, Satzklammer, telling time, possessives', 'Introducing family, describing a normal day, making plans by time',
    ) },
    { id: 'k5-modals', text: 'Grammar — modal verbs: können, müssen, wollen', content: [
      { kind: 'para', text: 'A **modal verb** changes the meaning of another verb — it says whether an action is possible, necessary or wanted. German has six; three of them are the heart of Kapitel 5.' },
      { kind: 'table', caption: 'Conjugation', headers: ['Person', 'können (can)', 'müssen (must)', 'wollen (want)'], rows: [
        ['ich', 'kann', 'muss', 'will'],
        ['du', 'kannst', 'musst', 'willst'],
        ['er/sie/es', 'kann', 'muss', 'will'],
        ['wir', 'können', 'müssen', 'wollen'],
        ['ihr', 'könnt', 'müsst', 'wollt'],
        ['sie/Sie', 'können', 'müssen', 'wollen'],
      ] },
      { kind: 'examples', items: [
        { de: 'Ich **kann** gut kochen.', en: 'I can cook well.' },
        { de: 'Du **musst** früh aufstehen.', en: 'You have to get up early.' },
        { de: 'Wir **wollen** ins Kino gehen.', en: 'We want to go to the cinema.' },
      ] },
      { kind: 'callout', tone: 'warn', text: 'Common mistake: the **ich** and **er/sie/es** forms are identical and have **no ending** — say `ich kann`, never *ich kanne*. This is true for every modal verb.' },
      { kind: 'para', text: '**Summary:** modal verb = possibility (können), necessity (müssen), or wish (wollen). ich- and er-forms match and take no ending.' },
    ] },
    { id: 'k5-klammer', text: 'Grammar — the Satzklammer (sentence bracket)', content: [
      { kind: 'para', text: 'When you use a modal verb, the sentence forms a **bracket**: the modal is conjugated in **position 2**, and the main verb stays an **infinitive** and jumps to the **very end**.' },
      { kind: 'examples', items: [
        { de: 'Ich **muss** heute Deutsch **lernen**.', en: 'I have to study German today.' },
        { de: 'Er **kann** am Wochenende nicht **kommen**.', en: 'He can’t come at the weekend.' },
        { de: '**Willst** du mit mir **essen**?', en: 'Do you want to eat with me?' },
      ] },
      { kind: 'callout', tone: 'tip', text: 'Quick check: in a modal sentence the **infinitive must be the last word**. If it isn’t, the bracket is broken.' },
    ] },
    { id: 'k5-time', text: 'Grammar — telling the time (die Uhrzeit)', content: [
      { kind: 'para', text: 'There are two systems. **Informal** (spoken) uses 1–12 with `nach`/`vor`/`halb`/`Viertel`. **Formal** (timetables) uses the 24-hour clock.' },
      { kind: 'table', headers: ['Time', 'Informal', 'Formal'], rows: [
        ['3:00', 'drei Uhr', 'drei Uhr'],
        ['3:15', 'Viertel nach drei', 'drei Uhr fünfzehn'],
        ['3:30', 'halb vier', 'drei Uhr dreißig'],
        ['3:45', 'Viertel vor vier', 'drei Uhr fünfundvierzig'],
        ['15:20', 'zwanzig nach drei', 'fünfzehn Uhr zwanzig'],
      ] },
      { kind: 'callout', tone: 'warn', text: 'The big trap: **halb vier = 3:30**, not 4:30. `halb` points to the *coming* hour — "half of four" = halfway to four.' },
      { kind: 'para', text: 'Ask the time with **Wie spät ist es?** or **Wie viel Uhr ist es?** Answer with **Es ist …**' },
    ] },
    { id: 'k5-possessiv', text: 'Grammar — possessive articles (mein, dein, sein …)', content: [
      { kind: 'para', text: 'Possessive articles say *whose* something is. They take the **same endings as ein/kein**.' },
      { kind: 'table', headers: ['German', 'English'], rows: [
        ['mein', 'my'], ['dein', 'your (informal)'], ['sein', 'his / its'], ['ihr', 'her / their'], ['unser', 'our'], ['euer', 'your (plural)'], ['Ihr', 'your (formal)'],
      ] },
      { kind: 'examples', items: [
        { de: 'Das ist **mein** Bruder.', en: 'That is my brother. (Nominativ)' },
        { de: 'Ich liebe **meine** Familie.', en: 'I love my family.' },
        { de: 'Wo ist **dein** Vater?', en: 'Where is your father?' },
      ] },
    ] },
    { id: 'k5-vocab', text: 'Vocabulary — family, routine & time', content: [
      { kind: 'para', text: 'Learn each noun **with its article and plural**. Cover the English column and test yourself.' },
      vocabTable(vocabK5),
    ] },
  ],
};

const sectionK6: Section = {
  id: 'de-k6',
  title: 'Kapitel 6 — Freizeit',
  week: 'Hobbies · Invitations · Dates',
  items: [
    { id: 'k6-overview', text: 'Overview — what you’ll learn', content: overview(
      ['Talk about hobbies and free-time activities', 'Use the accusative pronouns (mich, dich, ihn …)', 'Use the preposition für + Akkusativ', 'Invite someone and accept or decline politely'],
      '2–3 hours', 'A1 · beginner', vocabK6.length, 'Akkusativ pronouns, für + Akkusativ, invitations', 'Suggesting an activity, inviting a friend, agreeing on a time',
    ) },
    { id: 'k6-akkpron', text: 'Grammar — accusative pronouns', content: [
      { kind: 'para', text: 'When a pronoun is the **direct object**, it takes its accusative form. Ask *Wen?* (whom?).' },
      { kind: 'table', headers: ['Nominativ', 'Akkusativ', 'English'], rows: [
        ['ich', 'mich', 'me'], ['du', 'dich', 'you'], ['er', 'ihn', 'him'], ['sie', 'sie', 'her'], ['es', 'es', 'it'], ['wir', 'uns', 'us'], ['ihr', 'euch', 'you (pl)'], ['sie/Sie', 'sie/Sie', 'them / you'],
      ] },
      { kind: 'examples', items: [
        { de: 'Ich liebe **dich**.', en: 'I love you.' },
        { de: 'Rufst du **mich** an?', en: 'Will you call me?' },
        { de: 'Ich besuche **ihn** morgen.', en: 'I visit him tomorrow.' },
      ] },
      { kind: 'callout', tone: 'warn', text: 'Common mistake: only **ich→mich, du→dich, er→ihn** really change shape. `sie`, `es`, `Sie` look the same in the accusative — don’t invent new forms.' },
    ] },
    { id: 'k6-fuer', text: 'Grammar — für + Akkusativ', content: [
      { kind: 'para', text: '**für** (for) always takes the **accusative**. So masculine `der/ein` becomes `den/einen`.' },
      { kind: 'examples', items: [
        { de: 'Das Geschenk ist **für dich**.', en: 'The present is for you.' },
        { de: 'Ich kaufe eine Karte **für den Film**.', en: 'I buy a ticket for the film. (der → den)' },
        { de: 'Er kocht **für seine Familie**.', en: 'He cooks for his family.' },
      ] },
      { kind: 'callout', tone: 'tip', text: 'für belongs to the accusative-preposition set **durch, für, gegen, ohne, um** — all always accusative, never dative.' },
    ] },
    { id: 'k6-einladen', text: 'Grammar — inviting, accepting & declining', content: [
      { kind: 'heading', text: 'Making an invitation' },
      { kind: 'list', items: [
        '**Möchtest du** ins Kino gehen? — Would you like to go to the cinema?',
        '**Hast du Lust**, Fußball zu spielen? — Do you feel like playing football?',
        '**Wollen wir** zusammen essen? — Shall we eat together?',
      ] },
      { kind: 'heading', text: 'Accepting' },
      { kind: 'list', items: ['Ja, gern! — Yes, gladly!', 'Ja, gute Idee! — Yes, good idea!', 'Das klingt gut. — That sounds good.'] },
      { kind: 'heading', text: 'Declining politely' },
      { kind: 'list', items: ['Tut mir leid, ich habe keine Zeit. — Sorry, I have no time.', 'Leider kann ich nicht. — Unfortunately I can’t.', 'Vielleicht ein anderes Mal. — Maybe another time.'] },
    ] },
    { id: 'k6-vocab', text: 'Vocabulary — hobbies, invitations & dates', content: [
      { kind: 'para', text: 'Many free-time verbs pair with **gern**: `Ich schwimme gern` = I like swimming.' },
      vocabTable(vocabK6),
    ] },
  ],
};

const sectionK7: Section = {
  id: 'de-k7',
  title: 'Kapitel 7 — Im Büro',
  week: 'Office · Computer · Colleagues',
  items: [
    { id: 'k7-overview', text: 'Overview — what you’ll learn', content: overview(
      ['Talk about your workplace, computer and colleagues', 'Understand and use the Dativ case', 'Use mit + Dativ and the other dative prepositions', 'Handle common office situations on the phone and by email'],
      '2–3 hours', 'A1 · beginner–intermediate', vocabK7.length, 'Dativ case, mit + Dativ, dative prepositions', 'Phoning a colleague, asking for help, arranging a meeting',
    ) },
    { id: 'k7-dativ', text: 'Grammar — the Dativ case', content: [
      { kind: 'para', text: 'The **Dativ** marks the **indirect object** — the person *to* or *for* whom something happens. Ask *Wem?* (to whom?). Unlike the accusative, it changes **every** gender.' },
      { kind: 'table', caption: 'Article forms in the Dativ', headers: ['', 'Masculine', 'Feminine', 'Neuter', 'Plural'], rows: [
        ['definite', 'dem', 'der', 'dem', 'den (+n)'],
        ['indefinite', 'einem', 'einer', 'einem', '—'],
      ] },
      { kind: 'examples', items: [
        { de: 'Ich helfe **dem** Kollegen.', en: 'I help the colleague. (Wem? → dem)' },
        { de: 'Sie gibt **der** Chefin die E-Mail.', en: 'She gives the boss the email.' },
        { de: 'Ich danke **dir**.', en: 'I thank you.' },
      ] },
      { kind: 'callout', tone: 'warn', text: 'Some verbs are always dative: **helfen, danken, gefallen, gehören, antworten**. `Ich helfe dir` — never *ich helfe dich*.' },
    ] },
    { id: 'k7-mitdativ', text: 'Grammar — mit + Dativ and the dative prepositions', content: [
      { kind: 'para', text: 'These prepositions **always** take the dative — memorise the set.' },
      { kind: 'table', headers: ['Preposition', 'Meaning', 'Example'], rows: [
        ['mit', 'with / by (transport)', 'mit **dem** Bus'],
        ['aus', 'from / out of', 'aus **der** Schweiz'],
        ['bei', 'at / with', 'bei **der** Arbeit'],
        ['nach', 'after / to (city)', 'nach **der** Besprechung'],
        ['seit', 'since / for', 'seit **einem** Jahr'],
        ['von', 'from / of', 'von **dem** Chef'],
        ['zu', 'to (person/place)', 'zu **dem** Termin'],
      ] },
      { kind: 'callout', tone: 'tip', text: 'Contractions you’ll use constantly: **zu dem → zum**, **zu der → zur**, **bei dem → beim**, **von dem → vom**.' },
    ] },
    { id: 'k7-office', text: 'Grammar — useful office expressions', content: [
      { kind: 'list', items: [
        '**Kann ich Ihnen helfen?** — Can I help you? (formal)',
        '**Ich hätte eine Frage.** — I have a question. (polite)',
        '**Können Sie mir das schicken?** — Can you send me that?',
        '**Einen Moment, bitte.** — One moment, please.',
        '**Ich rufe später zurück.** — I’ll call back later.',
      ] },
      { kind: 'para', text: 'Notice **Ihnen** and **mir** — office language is full of dative pronouns because you constantly do things *for* people.' },
    ] },
    { id: 'k7-vocab', text: 'Vocabulary — office, computer & colleagues', content: [
      { kind: 'para', text: 'Two dative verbs live here: **helfen** and (with people) **anrufen** takes accusative — watch the case.' },
      vocabTable(vocabK7),
    ] },
  ],
};

export const phaseKapitel57: Phase = {
  id: 'de-k57',
  label: 'Kapitel 5–7',
  weeks: 'A1 · Netzwerk',
  theme: 'info',
  sections: [sectionK5, sectionK6, sectionK7],
};

/* ════════════════════════════════════════════════════════════════
   INTERACTIVE DRILLS
   ════════════════════════════════════════════════════════════════ */
export const DE_DRILLS: DrillSet[] = [
  {
    id: 'drill-k5', title: 'Kapitel 5 — Familie & Alltag', chapter: 'Kapitel 5',
    description: 'Modal verbs, word order & telling time',
    drills: [
      { id: 'd5-1', kind: 'blank', prompt: 'Ich ___ heute früh aufstehen.', gloss: 'necessity → müssen', answer: 'muss', options: ['muss', 'musst', 'müssen'], explanation: '"ich" takes muss — the ich-form of müssen has no ending.' },
      { id: 'd5-2', kind: 'blank', prompt: 'Du ___ sehr gut Deutsch sprechen.', gloss: 'ability → können', answer: 'kannst', options: ['kann', 'kannst', 'könnt'], explanation: '"du" always adds -st: du kannst.' },
      { id: 'd5-3', kind: 'order', prompt: 'Build: "I want to go to the cinema."', gloss: 'wollen + Satzklammer', tokens: ['gehen', 'Ich', 'ins', 'will', 'Kino'], solution: ['Ich', 'will', 'ins', 'Kino', 'gehen'], explanation: 'Modal (will) in position 2, infinitive (gehen) at the very end.' },
      { id: 'd5-4', kind: 'order', prompt: 'Build: "We have to work today."', gloss: 'müssen + Satzklammer', tokens: ['arbeiten', 'müssen', 'Wir', 'heute'], solution: ['Wir', 'müssen', 'heute', 'arbeiten'], explanation: 'Wir müssen … arbeiten — infinitive last.' },
      { id: 'd5-5', kind: 'blank', prompt: 'Es ist ___ vier. (3:30)', gloss: 'informal time', answer: 'halb', options: ['halb', 'Viertel', 'nach'], explanation: 'halb vier = 3:30 — halb points to the coming hour.' },
      { id: 'd5-6', kind: 'blank', prompt: 'Das ist ___ Bruder. (my)', gloss: 'possessive, masculine Nominativ', answer: 'mein', options: ['mein', 'meine', 'meinen'], explanation: 'Bruder is masculine; in the Nominativ the possessive has no ending: mein Bruder.' },
      { id: 'd5-7', kind: 'blank', prompt: 'Wie ___ ist es? — Es ist acht Uhr.', gloss: 'asking the time', answer: 'spät', explanation: 'Wie spät ist es? = What time is it?' },
      { id: 'd5-8', kind: 'order', prompt: 'Build: "I can cook well."', gloss: 'können', tokens: ['kann', 'kochen', 'gut', 'Ich'], solution: ['Ich', 'kann', 'gut', 'kochen'], explanation: 'Ich kann gut kochen — infinitive at the end.' },
    ],
  },
  {
    id: 'drill-k6', title: 'Kapitel 6 — Freizeit', chapter: 'Kapitel 6',
    description: 'Accusative pronouns, für & invitations',
    drills: [
      { id: 'd6-1', kind: 'blank', prompt: 'Ich liebe ___. (you, informal)', gloss: 'accusative pronoun', answer: 'dich', options: ['du', 'dich', 'dir'], explanation: 'du → dich in the accusative.' },
      { id: 'd6-2', kind: 'blank', prompt: 'Rufst du ___ an? (me)', gloss: 'accusative pronoun', answer: 'mich', options: ['ich', 'mich', 'mir'], explanation: 'ich → mich in the accusative.' },
      { id: 'd6-3', kind: 'blank', prompt: 'Ich besuche ___ morgen. (him)', gloss: 'accusative pronoun', answer: 'ihn', options: ['er', 'ihn', 'ihm'], explanation: 'er → ihn in the accusative.' },
      { id: 'd6-4', kind: 'blank', prompt: 'Das Geschenk ist ___ dich.', gloss: 'preposition + Akkusativ', answer: 'für', options: ['für', 'mit', 'zu'], explanation: 'für always takes the accusative: für dich.' },
      { id: 'd6-5', kind: 'blank', prompt: 'Ich kaufe eine Karte für ___ Film. (der)', gloss: 'für + Akkusativ', answer: 'den', options: ['der', 'den', 'dem'], explanation: 'für is accusative, so masculine der → den.' },
      { id: 'd6-6', kind: 'order', prompt: 'Build: "Would you like to go to the cinema?"', gloss: 'invitation', tokens: ['du', 'gehen', 'Möchtest', 'Kino', 'ins'], solution: ['Möchtest', 'du', 'ins', 'Kino', 'gehen'], explanation: 'Yes/no question → verb first; infinitive gehen at the end.' },
      { id: 'd6-7', kind: 'order', prompt: 'Build: "Do you feel like a party?"', gloss: 'Lust haben', tokens: ['Lust', 'Hast', 'auf', 'du', 'eine Party'], solution: ['Hast', 'du', 'Lust', 'auf', 'eine Party'], explanation: 'Hast du Lust auf …? is the set phrase for suggesting something.' },
      { id: 'd6-8', kind: 'blank', prompt: 'Wollen ___ zusammen essen? (we)', gloss: 'suggestion', answer: 'wir', explanation: 'Wollen wir …? = Shall we …?' },
    ],
  },
  {
    id: 'drill-k7', title: 'Kapitel 7 — Im Büro', chapter: 'Kapitel 7',
    description: 'Dativ, dative prepositions & office phrases',
    drills: [
      { id: 'd7-1', kind: 'blank', prompt: 'Ich helfe ___ Kollegen. (der)', gloss: 'helfen + Dativ', answer: 'dem', options: ['der', 'den', 'dem'], explanation: 'helfen takes the dative; masculine der → dem.' },
      { id: 'd7-2', kind: 'blank', prompt: 'Ich fahre ___ dem Bus zur Arbeit.', gloss: 'preposition + Dativ', answer: 'mit', options: ['mit', 'für', 'ohne'], explanation: 'mit always takes the dative: mit dem Bus.' },
      { id: 'd7-3', kind: 'blank', prompt: 'Ich komme ___ Deutschland.', gloss: 'origin', answer: 'aus', options: ['aus', 'nach', 'zu'], explanation: 'aus = from (origin), always dative.' },
      { id: 'd7-4', kind: 'blank', prompt: 'Ich gehe ___ Chef. (zu + dem)', gloss: 'contraction', answer: 'zum', options: ['zum', 'zur', 'zu dem'], explanation: 'zu dem contracts to zum.' },
      { id: 'd7-5', kind: 'blank', prompt: 'Ich danke ___. (you, informal)', gloss: 'danken + Dativ', answer: 'dir', options: ['du', 'dich', 'dir'], explanation: 'danken is a dative verb: ich danke dir.' },
      { id: 'd7-6', kind: 'order', prompt: 'Build: "I write an email."', gloss: 'accusative object', tokens: ['eine', 'schreibe', 'Ich', 'E-Mail'], solution: ['Ich', 'schreibe', 'eine', 'E-Mail'], explanation: 'Verb in position 2; E-Mail is the accusative object.' },
      { id: 'd7-7', kind: 'order', prompt: 'Build: "Can you help me?" (formal)', gloss: 'office phrase, dative pronoun', tokens: ['Sie', 'helfen', 'Können', 'mir'], solution: ['Können', 'Sie', 'mir', 'helfen'], explanation: 'helfen → dative mir; modal question → verb first, infinitive last.' },
      { id: 'd7-8', kind: 'blank', prompt: 'Kann ich ___ helfen? (you, formal)', gloss: 'dative pronoun', answer: 'Ihnen', explanation: 'Formal "you" in the dative is Ihnen: Kann ich Ihnen helfen?' },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════
   QUIZZES (multiple choice with explanations) — part of the package
   ════════════════════════════════════════════════════════════════ */
export const DE_KAPITEL_QUIZZES: Quiz[] = [
  {
    id: 'de-quiz-k5',
    title: 'Kapitel 5 — Familie & Alltag',
    level: 'A1',
    description: 'Modal verbs, word order, telling time, family & routine vocabulary.',
    questions: [
      { id: 'k5-q1', question: 'Complete: "Ich ___ heute früh aufstehen." (necessity)', options: ['kann', 'muss', 'will', 'musst'], correctIndex: 1, explanation: 'Necessity → müssen. The ich-form is "muss" with no ending.', level: 'A1' },
      { id: 'k5-q2', question: 'Which is correct?', options: ['Ich kann gut sprechen Deutsch.', 'Ich kann gut Deutsch sprechen.', 'Ich gut Deutsch sprechen kann.', 'Ich Deutsch kann gut sprechen.'], correctIndex: 1, explanation: 'Satzklammer: modal (kann) in position 2, infinitive (sprechen) at the very end.', level: 'A1' },
      { id: 'k5-q3', question: '"halb vier" means which time?', options: ['4:30', '3:30', '4:15', '3:15'], correctIndex: 1, explanation: 'halb vier = 3:30. "halb" points to the coming hour — halfway to four.', level: 'A1' },
      { id: 'k5-q4', question: 'What is "die Mutter" in English?', options: ['sister', 'mother', 'daughter', 'aunt'], correctIndex: 1, explanation: 'die Mutter = mother (plural: die Mütter).', level: 'A1' },
      { id: 'k5-q5', question: 'Complete: "Du ___ sehr gut kochen."', options: ['kann', 'kannst', 'könnt', 'können'], correctIndex: 1, explanation: '"du" always takes -st: du kannst.', level: 'A1' },
      { id: 'k5-q6', question: 'Choose the correct possessive: "Das ist ___ Bruder." (my)', options: ['meine', 'mein', 'meinen', 'meiner'], correctIndex: 1, explanation: 'Bruder is masculine; in the Nominativ the possessive has no ending: mein Bruder.', level: 'A1' },
      { id: 'k5-q7', question: 'How do you ask "What time is it?"', options: ['Wie alt bist du?', 'Wie spät ist es?', 'Wie geht es dir?', 'Wo ist die Uhr?'], correctIndex: 1, explanation: 'Wie spät ist es? (or: Wie viel Uhr ist es?)', level: 'A1' },
      { id: 'k5-q8', question: 'Which verb means "to get up"?', options: ['aufstehen', 'schlafen', 'arbeiten', 'frühstücken'], correctIndex: 0, explanation: 'aufstehen = to get up (separable: ich stehe … auf).', level: 'A1' },
    ],
  },
  {
    id: 'de-quiz-k6',
    title: 'Kapitel 6 — Freizeit',
    level: 'A1',
    description: 'Accusative pronouns, für + Akkusativ, invitations & hobby vocabulary.',
    questions: [
      { id: 'k6-q1', question: 'Complete: "Ich liebe ___." (you, informal)', options: ['du', 'dich', 'dir', 'dein'], correctIndex: 1, explanation: 'Direct object → accusative: du → dich.', level: 'A1' },
      { id: 'k6-q2', question: 'Complete: "Rufst du ___ an?" (me)', options: ['ich', 'mir', 'mich', 'mein'], correctIndex: 2, explanation: 'ich → mich in the accusative.', level: 'A1' },
      { id: 'k6-q3', question: '"er" in the accusative becomes:', options: ['ihm', 'ihn', 'er', 'sein'], correctIndex: 1, explanation: 'er → ihn (accusative). Careful: ihm is dative.', level: 'A1' },
      { id: 'k6-q4', question: 'Which case does "für" take?', options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'], correctIndex: 1, explanation: 'für always takes the accusative: für dich, für den Mann.', level: 'A1' },
      { id: 'k6-q5', question: 'Complete: "Ich kaufe eine Karte für ___ Film." (der)', options: ['der', 'den', 'dem', 'des'], correctIndex: 1, explanation: 'für → accusative, so masculine der → den.', level: 'A1' },
      { id: 'k6-q6', question: 'Which is a polite way to decline an invitation?', options: ['Ja, gern!', 'Gute Idee!', 'Tut mir leid, ich habe keine Zeit.', 'Das klingt gut.'], correctIndex: 2, explanation: '"Tut mir leid, ich habe keine Zeit" declines politely. The others accept.', level: 'A1' },
      { id: 'k6-q7', question: 'What does "Hast du Lust?" mean?', options: ['Are you tired?', 'Do you feel like it?', 'Do you have time?', 'Are you ready?'], correctIndex: 1, explanation: 'Lust haben = to feel like (doing something).', level: 'A1' },
      { id: 'k6-q8', question: 'What is "schwimmen"?', options: ['to dance', 'to read', 'to swim', 'to play'], correctIndex: 2, explanation: 'schwimmen = to swim.', level: 'A1' },
    ],
  },
  {
    id: 'de-quiz-k7',
    title: 'Kapitel 7 — Im Büro',
    level: 'A1',
    description: 'Dativ case, mit + Dativ, dative prepositions & office vocabulary.',
    questions: [
      { id: 'k7-q1', question: 'Complete: "Ich helfe ___ Kollegen." (der)', options: ['der', 'den', 'dem', 'des'], correctIndex: 2, explanation: 'helfen takes the dative; masculine der → dem.', level: 'A1' },
      { id: 'k7-q2', question: 'Which case does "mit" take?', options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'], correctIndex: 2, explanation: 'mit always takes the dative: mit dem Bus.', level: 'A1' },
      { id: 'k7-q3', question: '"zu dem" contracts to:', options: ['zum', 'zur', 'zom', 'zu’m'], correctIndex: 0, explanation: 'zu dem → zum. (zu der → zur.)', level: 'A1' },
      { id: 'k7-q4', question: 'Complete: "Kann ich ___ helfen?" (you, formal)', options: ['Sie', 'Ihnen', 'dir', 'euch'], correctIndex: 1, explanation: 'helfen is dative; formal "you" in the dative is Ihnen.', level: 'A1' },
      { id: 'k7-q5', question: 'What is "der Drucker"?', options: ['desk', 'printer', 'computer', 'meeting'], correctIndex: 1, explanation: 'der Drucker = printer (from drucken, to print).', level: 'A1' },
      { id: 'k7-q6', question: 'Which verb ALWAYS takes the dative?', options: ['sehen', 'kaufen', 'danken', 'besuchen'], correctIndex: 2, explanation: 'danken + Dativ: ich danke dir. (sehen/kaufen/besuchen take the accusative.)', level: 'A1' },
      { id: 'k7-q7', question: 'Complete: "Ich komme ___ Deutschland." (origin)', options: ['nach', 'zu', 'aus', 'in'], correctIndex: 2, explanation: 'aus = from/out of (origin), always dative.', level: 'A1' },
      { id: 'k7-q8', question: 'What is "die Besprechung"?', options: ['the email', 'the meeting', 'the office', 'the project'], correctIndex: 1, explanation: 'die Besprechung = meeting.', level: 'A1' },
    ],
  },
];
