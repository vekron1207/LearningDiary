import type { Flashcard, Item, Drill, QuizQuestion, StudyModule } from './types';
import { makeChapter } from './german-helpers';

/* ════════════════════════════════════════════════════════════════
   GERMAN A1 — FULL COURSE (Kapitel 1–4, 8–12)
   Kapitel 5–7 live in data-german-kapitel.ts (the "Test 1" package).
   Each chapter is a package: Lessons + Flashcards + Drills + Quiz.
   Order and topics follow the 12-chapter blueprint.
   ════════════════════════════════════════════════════════════════ */

/* ─────────────────────────── KAPITEL 1 ─────────────────────────── */
const k1Vocab: Flashcard[] = [
  { id: 'k1v1', de: 'Hallo', en: 'hello', emoji: '👋', example: 'Hallo, wie geht’s?', exampleEn: 'Hello, how are you?' },
  { id: 'k1v2', de: 'Guten Morgen', en: 'good morning', emoji: '🌅', example: 'Guten Morgen, Frau Müller!', exampleEn: 'Good morning, Mrs Müller!' },
  { id: 'k1v3', de: 'Guten Tag', en: 'good day (formal)', emoji: '☀️', example: 'Guten Tag, mein Name ist Tom.', exampleEn: 'Hello, my name is Tom.' },
  { id: 'k1v4', de: 'Guten Abend', en: 'good evening', emoji: '🌆', example: 'Guten Abend zusammen!', exampleEn: 'Good evening everyone!' },
  { id: 'k1v5', de: 'Tschüss', en: 'bye (informal)', emoji: '👋', example: 'Tschüss, bis morgen!', exampleEn: 'Bye, see you tomorrow!' },
  { id: 'k1v6', de: 'Auf Wiedersehen', en: 'goodbye (formal)', emoji: '🚪', example: 'Auf Wiedersehen, Herr Klein.', exampleEn: 'Goodbye, Mr Klein.' },
  { id: 'k1v7', de: 'ja / nein', en: 'yes / no', emoji: '✅', example: 'Kommst du? — Ja!', exampleEn: 'Are you coming? — Yes!' },
  { id: 'k1v8', de: 'danke', en: 'thank you', emoji: '🙏', example: 'Danke schön!', exampleEn: 'Thank you very much!' },
  { id: 'k1v9', de: 'bitte', en: 'please / you’re welcome', emoji: '🤲', example: 'Ein Kaffee, bitte.', exampleEn: 'A coffee, please.' },
  { id: 'k1v10', de: 'heißen', en: 'to be called', emoji: '🏷️', example: 'Ich heiße Anna.', exampleEn: 'My name is Anna.' },
  { id: 'k1v11', de: 'kommen', en: 'to come', emoji: '➡️', example: 'Ich komme aus Indien.', exampleEn: 'I come from India.' },
  { id: 'k1v12', de: 'wohnen', en: 'to live / reside', emoji: '🏠', example: 'Ich wohne in Berlin.', exampleEn: 'I live in Berlin.' },
  { id: 'k1v13', de: 'sprechen', en: 'to speak', emoji: '💬', example: 'Ich spreche Englisch.', exampleEn: 'I speak English.' },
  { id: 'k1v14', de: 'Name', en: 'name', gender: 'der', plural: 'die Namen', emoji: '📛', example: 'Wie ist dein Name?', exampleEn: 'What is your name?' },
  { id: 'k1v15', de: 'Land', en: 'country', gender: 'das', plural: 'die Länder', emoji: '🗺️', example: 'Welches Land ist das?', exampleEn: 'Which country is that?' },
  { id: 'k1v16', de: 'Sprache', en: 'language', gender: 'die', plural: 'die Sprachen', emoji: '🗣️', example: 'Deutsch ist eine Sprache.', exampleEn: 'German is a language.' },
  { id: 'k1v17', de: 'Deutschland', en: 'Germany', emoji: '🇩🇪', example: 'Ich lerne Deutsch für Deutschland.', exampleEn: 'I learn German for Germany.' },
  { id: 'k1v18', de: 'die Zahl', en: 'number', gender: 'die', plural: 'die Zahlen', emoji: '🔢', example: 'Zwölf ist eine Zahl.', exampleEn: 'Twelve is a number.' },
];

const k1Lessons: Item[] = [
  { id: 'k1-l1', text: 'Grammar — personal pronouns & sein (to be)', content: [
    { kind: 'para', text: '**sein** (to be) is the most important verb in German. It is irregular, so memorise it. Pair each **pronoun** with its form.' },
    { kind: 'table', caption: '**sein** — to be', headers: ['Person', 'Form', 'Example'], rows: [
      ['ich', 'bin', 'Ich **bin** Tom.'],
      ['du', 'bist', 'Du **bist** nett.'],
      ['er/sie/es', 'ist', 'Er **ist** aus Berlin.'],
      ['wir', 'sind', 'Wir **sind** hier.'],
      ['ihr', 'seid', 'Ihr **seid** Studenten.'],
      ['sie/Sie', 'sind', 'Sie **sind** Frau Klein.'],
    ] },
    { kind: 'callout', tone: 'tip', text: '**Sie** (capital, formal "you") uses the same form as **sie** (they): `sind`. Context tells them apart.' },
  ] },
  { id: 'k1-l2', text: 'Grammar — introducing yourself (W-questions)', content: [
    { kind: 'para', text: 'Three questions cover most introductions. Answer each with a full sentence.' },
    { kind: 'table', headers: ['Question', 'Meaning', 'Answer'], rows: [
      ['Wie heißt du?', 'What’s your name?', 'Ich heiße Anna.'],
      ['Woher kommst du?', 'Where are you from?', 'Ich komme aus Indien.'],
      ['Wo wohnst du?', 'Where do you live?', 'Ich wohne in Berlin.'],
    ] },
    { kind: 'callout', tone: 'tip', text: 'Formal version uses **Sie**: `Wie heißen Sie?` · `Woher kommen Sie?`' },
  ] },
  { id: 'k1-l3', text: 'Grammar — numbers 0–20', content: [
    { kind: 'table', headers: ['0–10', '', '11–20', ''], rows: [
      ['null', '0', 'elf', '11'],
      ['eins', '1', 'zwölf', '12'],
      ['zwei', '2', 'dreizehn', '13'],
      ['drei', '3', 'vierzehn', '14'],
      ['vier', '4', 'fünfzehn', '15'],
      ['fünf', '5', 'sechzehn', '16'],
      ['sechs', '6', 'siebzehn', '17'],
      ['sieben', '7', 'achtzehn', '18'],
      ['acht', '8', 'neunzehn', '19'],
      ['neun / zehn', '9 / 10', 'zwanzig', '20'],
    ] },
    { kind: 'callout', tone: 'warn', text: 'Watch the irregular ones: **sechzehn** (not *sechszehn*) and **siebzehn** (not *siebenzehn*).' },
  ] },
  { id: 'k1-l4', text: 'Grammar — the alphabet & spelling', content: [
    { kind: 'para', text: 'German uses the 26 Latin letters plus **ä, ö, ü** and **ß** (say "eszett"). To spell your name, use **buchstabieren**.' },
    { kind: 'examples', items: [
      { de: 'Wie schreibt man das?', en: 'How do you write that?' },
      { de: 'Können Sie das buchstabieren?', en: 'Can you spell that?' },
      { de: 'A-N-N-A, Anna.', en: 'A-N-N-A, Anna.' },
    ] },
  ] },
];

const k1Drills: Drill[] = [
  { id: 'k1d1', kind: 'blank', prompt: 'Wie ___ du? — Ich heiße Tom.', gloss: 'heißen', answer: 'heißt', options: ['heiße', 'heißt', 'heißen'], explanation: '"du" takes -t here: Wie heißt du?' },
  { id: 'k1d2', kind: 'blank', prompt: 'Ich ___ aus Indien.', gloss: 'kommen', answer: 'komme', options: ['komme', 'kommst', 'kommen'], explanation: '"ich" + kommen → komme.' },
  { id: 'k1d3', kind: 'blank', prompt: 'Woher ___ du?', gloss: 'kommen (du)', answer: 'kommst', options: ['komme', 'kommst', 'kommt'], explanation: '"du" always adds -st: kommst.' },
  { id: 'k1d4', kind: 'blank', prompt: 'Er ___ mein Freund.', gloss: 'sein', answer: 'ist', options: ['bin', 'bist', 'ist'], explanation: 'er/sie/es + sein → ist.' },
  { id: 'k1d5', kind: 'order', prompt: 'Build: "My name is Anna."', gloss: 'introduction', tokens: ['Anna', 'Ich', 'heiße'], solution: ['Ich', 'heiße', 'Anna'], explanation: 'Verb in position 2: Ich heiße Anna.' },
  { id: 'k1d6', kind: 'order', prompt: 'Build: "Where are you from?" (informal)', gloss: 'W-question', tokens: ['du', 'Woher', 'kommst'], solution: ['Woher', 'kommst', 'du'], explanation: 'Question word + verb + subject: Woher kommst du?' },
  { id: 'k1d7', kind: 'blank', prompt: 'Die Zahl nach elf ist ___.', gloss: 'numbers', answer: 'zwölf', explanation: '11 = elf, 12 = zwölf.' },
];

const k1Quiz: QuizQuestion[] = [
  { id: 'k1q1', question: 'Which is the formal daytime greeting?', options: ['Hallo', 'Guten Tag', 'Tschüss', 'Gute Nacht'], correctIndex: 1, explanation: '"Guten Tag" is the standard formal daytime greeting.', level: 'A1' },
  { id: 'k1q2', question: 'The ich-form of "sein" is:', options: ['bin', 'bist', 'ist', 'sind'], correctIndex: 0, explanation: 'ich bin.', level: 'A1' },
  { id: 'k1q3', question: '"Woher kommst du?" means:', options: ['What’s your name?', 'Where do you live?', 'Where are you from?', 'How are you?'], correctIndex: 2, explanation: 'woher = from where.', level: 'A1' },
  { id: 'k1q4', question: 'How do you say 15?', options: ['fünfzig', 'fünfzehn', 'fünf', 'fünfundzwanzig'], correctIndex: 1, explanation: '15 = fünfzehn (fünfzig = 50).', level: 'A1' },
  { id: 'k1q5', question: 'The du-form of "kommen" is:', options: ['komme', 'kommst', 'kommt', 'kommen'], correctIndex: 1, explanation: 'du kommst.', level: 'A1' },
  { id: 'k1q6', question: '"Auf Wiedersehen" is:', options: ['an informal hello', 'a formal goodbye', 'thank you', 'good night'], correctIndex: 1, explanation: 'It’s the formal goodbye.', level: 'A1' },
  { id: 'k1q7', question: 'To answer "Wie heißt du?" you start with:', options: ['Ich komme…', 'Ich heiße…', 'Ich wohne…', 'Ich bin aus…'], correctIndex: 1, explanation: 'Ich heiße + name.', level: 'A1' },
  { id: 'k1q8', question: 'Germany in German is:', options: ['Deutschland', 'Deutsch', 'Germanien', 'Holland'], correctIndex: 0, explanation: 'Deutschland = Germany; Deutsch = the language.', level: 'A1' },
];

const chapter1 = makeChapter({
  n: 1, label: 'Kapitel 1', subtitle: 'Greetings & Introductions',
  objectives: ['Greet people formally and informally', 'Introduce yourself: name, origin, home', 'Use the verb sein with all pronouns', 'Count 0–20 and spell your name'],
  grammarSummary: 'sein, personal pronouns, W-questions, numbers', situations: 'Meeting someone, saying your name and country',
  lessons: k1Lessons, vocab: k1Vocab, drills: k1Drills, quiz: k1Quiz,
});

/* ─────────────────────────── KAPITEL 2 ─────────────────────────── */
const k2Vocab: Flashcard[] = [
  { id: 'k2v1', de: 'Beruf', en: 'profession', gender: 'der', plural: 'die Berufe', emoji: '💼', example: 'Was ist dein Beruf?', exampleEn: 'What’s your profession?' },
  { id: 'k2v2', de: 'Arzt', en: 'doctor (m)', gender: 'der', plural: 'die Ärzte', emoji: '🩺', example: 'Er ist Arzt.', exampleEn: 'He is a doctor.' },
  { id: 'k2v3', de: 'Lehrer', en: 'teacher (m)', gender: 'der', plural: 'die Lehrer', emoji: '👨‍🏫', example: 'Mein Lehrer ist nett.', exampleEn: 'My teacher is nice.' },
  { id: 'k2v4', de: 'Student', en: 'student (m)', gender: 'der', plural: 'die Studenten', emoji: '🎓', example: 'Ich bin Student.', exampleEn: 'I am a student.' },
  { id: 'k2v5', de: 'arbeiten', en: 'to work', emoji: '🛠️', example: 'Ich arbeite in Berlin.', exampleEn: 'I work in Berlin.' },
  { id: 'k2v6', de: 'Hobby', en: 'hobby', gender: 'das', plural: 'die Hobbys', emoji: '🎨', example: 'Mein Hobby ist Lesen.', exampleEn: 'My hobby is reading.' },
  { id: 'k2v7', de: 'spielen', en: 'to play', emoji: '⚽', example: 'Ich spiele Gitarre.', exampleEn: 'I play the guitar.' },
  { id: 'k2v8', de: 'lesen', en: 'to read', emoji: '📖', example: 'Sie liest ein Buch.', exampleEn: 'She reads a book.' },
  { id: 'k2v9', de: 'Familie', en: 'family', gender: 'die', plural: 'die Familien', emoji: '👪', example: 'Meine Familie ist klein.', exampleEn: 'My family is small.' },
  { id: 'k2v10', de: 'Bruder', en: 'brother', gender: 'der', plural: 'die Brüder', emoji: '👦', example: 'Ich habe einen Bruder.', exampleEn: 'I have a brother.' },
  { id: 'k2v11', de: 'Schwester', en: 'sister', gender: 'die', plural: 'die Schwestern', emoji: '👧', example: 'Meine Schwester heißt Lea.', exampleEn: 'My sister is called Lea.' },
  { id: 'k2v12', de: 'haben', en: 'to have', emoji: '🤲', example: 'Ich habe Zeit.', exampleEn: 'I have time.' },
  { id: 'k2v13', de: 'machen', en: 'to do / make', emoji: '🔧', example: 'Was machst du?', exampleEn: 'What are you doing?' },
  { id: 'k2v14', de: 'lernen', en: 'to learn / study', emoji: '📝', example: 'Ich lerne Deutsch.', exampleEn: 'I learn German.' },
  { id: 'k2v15', de: 'Freund', en: 'friend (m)', gender: 'der', plural: 'die Freunde', emoji: '🧑‍🤝‍🧑', example: 'Er ist mein Freund.', exampleEn: 'He is my friend.' },
  { id: 'k2v16', de: 'Auto', en: 'car', gender: 'das', plural: 'die Autos', emoji: '🚗', example: 'Ich habe ein Auto.', exampleEn: 'I have a car.' },
  { id: 'k2v17', de: 'Hund', en: 'dog', gender: 'der', plural: 'die Hunde', emoji: '🐕', example: 'Der Hund ist groß.', exampleEn: 'The dog is big.' },
  { id: 'k2v18', de: 'Katze', en: 'cat', gender: 'die', plural: 'die Katzen', emoji: '🐈', example: 'Die Katze schläft.', exampleEn: 'The cat is sleeping.' },
];

const k2Lessons: Item[] = [
  { id: 'k2-l1', text: 'Grammar — haben (to have)', content: [
    { kind: 'table', caption: '**haben** — to have', headers: ['Person', 'Form', 'Example'], rows: [
      ['ich', 'habe', 'Ich **habe** einen Hund.'],
      ['du', 'hast', 'Du **hast** Zeit.'],
      ['er/sie/es', 'hat', 'Sie **hat** ein Auto.'],
      ['wir', 'haben', 'Wir **haben** Hunger.'],
      ['ihr', 'habt', 'Ihr **habt** ein Hobby.'],
      ['sie/Sie', 'haben', 'Sie **haben** eine Katze.'],
    ] },
    { kind: 'callout', tone: 'warn', text: 'Only **du hast** and **er/sie/es hat** drop the "b" — everything else keeps "hab-".' },
  ] },
  { id: 'k2-l2', text: 'Grammar — the articles der / die / das & ein / eine', content: [
    { kind: 'para', text: 'Every noun has a gender carried by its **article**. Learn nouns together with the article.' },
    { kind: 'table', caption: 'Nominativ (subject) forms', headers: ['Gender', 'Definite (the)', 'Indefinite (a)'], rows: [
      ['Masculine', 'der Hund', 'ein Hund'],
      ['Feminine', 'die Katze', 'eine Katze'],
      ['Neuter', 'das Auto', 'ein Auto'],
      ['Plural', 'die Autos', '— (no plural "a")'],
    ] },
    { kind: 'callout', tone: 'tip', text: 'Masculine and neuter share the same indefinite article **ein**; only feminine adds **-e** → **eine**.' },
  ] },
  { id: 'k2-l3', text: 'Grammar — regular verb endings', content: [
    { kind: 'para', text: 'Take the **stem** (infinitive minus -en) and add the ending.' },
    { kind: 'table', headers: ['Person', 'Ending', 'spielen', 'lernen'], rows: [
      ['ich', '-e', 'spiele', 'lerne'],
      ['du', '-st', 'spielst', 'lernst'],
      ['er/sie/es', '-t', 'spielt', 'lernt'],
      ['wir', '-en', 'spielen', 'lernen'],
      ['ihr', '-t', 'spielt', 'lernt'],
      ['sie/Sie', '-en', 'spielen', 'lernen'],
    ] },
    { kind: 'callout', tone: 'warn', text: 'After stems ending in -t/-d (like **arbeiten**), add an extra **e**: du arbeit**e**st, er arbeit**e**t.' },
  ] },
  { id: 'k2-l4', text: 'Grammar — professions take no article', content: [
    { kind: 'para', text: 'To state a job, use **sein + profession with no article**.' },
    { kind: 'examples', items: [
      { de: 'Ich bin Lehrer.', en: 'I am a teacher. (no "a"!)' },
      { de: 'Sie ist Ärztin.', en: 'She is a doctor. (feminine form)' },
      { de: 'Was bist du von Beruf?', en: 'What’s your profession?' },
    ] },
  ] },
];

const k2Drills: Drill[] = [
  { id: 'k2d1', kind: 'blank', prompt: 'Ich ___ einen Bruder.', gloss: 'haben', answer: 'habe', options: ['habe', 'hast', 'hat'], explanation: 'ich habe.' },
  { id: 'k2d2', kind: 'blank', prompt: 'Du ___ ein Auto.', gloss: 'haben (du)', answer: 'hast', options: ['habe', 'hast', 'habt'], explanation: 'du hast (drops the b).' },
  { id: 'k2d3', kind: 'blank', prompt: 'Das ist ___ Auto. (a)', gloss: 'indefinite, neuter', answer: 'ein', options: ['ein', 'eine', 'einen'], explanation: 'Auto is neuter → ein.' },
  { id: 'k2d4', kind: 'blank', prompt: '___ Katze ist süß. (the)', gloss: 'definite, feminine', answer: 'Die', options: ['Der', 'Die', 'Das'], explanation: 'Katze is feminine → die.' },
  { id: 'k2d5', kind: 'blank', prompt: 'Du ___ Fußball. (spielen)', gloss: 'regular verb', answer: 'spielst', options: ['spiele', 'spielst', 'spielt'], explanation: 'du + -st → spielst.' },
  { id: 'k2d6', kind: 'order', prompt: 'Build: "I have a car."', gloss: 'haben + article', tokens: ['ein', 'habe', 'Ich', 'Auto'], solution: ['Ich', 'habe', 'ein', 'Auto'], explanation: 'Ich habe ein Auto.' },
  { id: 'k2d7', kind: 'blank', prompt: 'Ich bin ___. (teacher — no article!)', gloss: 'professions', answer: 'Lehrer', explanation: 'Professions take no article: Ich bin Lehrer.' },
];

const k2Quiz: QuizQuestion[] = [
  { id: 'k2q1', question: 'The ich-form of "haben" is:', options: ['habe', 'hast', 'hat', 'haben'], correctIndex: 0, explanation: 'ich habe.', level: 'A1' },
  { id: 'k2q2', question: 'The indefinite article for "Frau" (feminine) is:', options: ['ein', 'eine', 'einen', 'der'], correctIndex: 1, explanation: 'Feminine → eine.', level: 'A1' },
  { id: 'k2q3', question: '"Ich bin Arzt." — how many articles before "Arzt"?', options: ['ein', 'der', 'none', 'einen'], correctIndex: 2, explanation: 'Professions take no article after sein.', level: 'A1' },
  { id: 'k2q4', question: 'The du-form of "spielen" is:', options: ['spiele', 'spielst', 'spielt', 'spielen'], correctIndex: 1, explanation: 'du spielst.', level: 'A1' },
  { id: 'k2q5', question: 'The definite article for "Auto" is:', options: ['der', 'die', 'das', 'den'], correctIndex: 2, explanation: 'Auto is neuter → das.', level: 'A1' },
  { id: 'k2q6', question: '"der Beruf" means:', options: ['hobby', 'profession', 'family', 'friend'], correctIndex: 1, explanation: 'der Beruf = profession.', level: 'A1' },
  { id: 'k2q7', question: 'The correct du-form of "arbeiten" is:', options: ['arbeitst', 'arbeitest', 'arbeitt', 'arbeitn'], correctIndex: 1, explanation: 'Stems ending in -t add an extra -e-: du arbeitest.', level: 'A1' },
  { id: 'k2q8', question: '"die Katze" means:', options: ['dog', 'cat', 'car', 'bird'], correctIndex: 1, explanation: 'die Katze = cat.', level: 'A1' },
];

const chapter2 = makeChapter({
  n: 2, label: 'Kapitel 2', subtitle: 'Professions, Hobbies & Family',
  objectives: ['Say your profession and hobbies', 'Use haben with all pronouns', 'Choose der/die/das and ein/eine correctly', 'Conjugate regular verbs'],
  grammarSummary: 'haben, articles, regular verbs, professions', situations: 'Talking about your job, family and free time',
  lessons: k2Lessons, vocab: k2Vocab, drills: k2Drills, quiz: k2Quiz,
});

/* ─────────────────────────── KAPITEL 3 ─────────────────────────── */
const k3Vocab: Flashcard[] = [
  { id: 'k3v1', de: 'Stadt', en: 'city', gender: 'die', plural: 'die Städte', emoji: '🏙️', example: 'Berlin ist eine große Stadt.', exampleEn: 'Berlin is a big city.' },
  { id: 'k3v2', de: 'Bahnhof', en: 'train station', gender: 'der', plural: 'die Bahnhöfe', emoji: '🚉', example: 'Wo ist der Bahnhof?', exampleEn: 'Where is the station?' },
  { id: 'k3v3', de: 'Bus', en: 'bus', gender: 'der', plural: 'die Busse', emoji: '🚌', example: 'Der Bus kommt gleich.', exampleEn: 'The bus is coming soon.' },
  { id: 'k3v4', de: 'Zug', en: 'train', gender: 'der', plural: 'die Züge', emoji: '🚆', example: 'Der Zug fährt nach Köln.', exampleEn: 'The train goes to Cologne.' },
  { id: 'k3v5', de: 'fahren', en: 'to go / drive', emoji: '🚗', example: 'Ich fahre nach Berlin.', exampleEn: 'I’m going to Berlin.' },
  { id: 'k3v6', de: 'gehen', en: 'to go (on foot)', emoji: '🚶', example: 'Ich gehe nach Hause.', exampleEn: 'I’m going home.' },
  { id: 'k3v7', de: 'links', en: 'left', emoji: '⬅️', example: 'Gehen Sie links.', exampleEn: 'Go left.' },
  { id: 'k3v8', de: 'rechts', en: 'right', emoji: '➡️', example: 'Die Bank ist rechts.', exampleEn: 'The bank is on the right.' },
  { id: 'k3v9', de: 'geradeaus', en: 'straight ahead', emoji: '⬆️', example: 'Fahren Sie geradeaus.', exampleEn: 'Go straight ahead.' },
  { id: 'k3v10', de: 'Monat', en: 'month', gender: 'der', plural: 'die Monate', emoji: '📅', example: 'Der Monat hat 30 Tage.', exampleEn: 'The month has 30 days.' },
  { id: 'k3v11', de: 'Januar', en: 'January', emoji: '❄️', example: 'Im Januar ist es kalt.', exampleEn: 'It’s cold in January.' },
  { id: 'k3v12', de: 'Datum', en: 'date', gender: 'das', plural: 'die Daten', emoji: '🗓️', example: 'Welches Datum ist heute?', exampleEn: 'What’s the date today?' },
  { id: 'k3v13', de: 'Supermarkt', en: 'supermarket', gender: 'der', plural: 'die Supermärkte', emoji: '🛒', example: 'Der Supermarkt ist offen.', exampleEn: 'The supermarket is open.' },
  { id: 'k3v14', de: 'Apotheke', en: 'pharmacy', gender: 'die', plural: 'die Apotheken', emoji: '💊', example: 'Die Apotheke ist links.', exampleEn: 'The pharmacy is on the left.' },
  { id: 'k3v15', de: 'Straße', en: 'street', gender: 'die', plural: 'die Straßen', emoji: '🛣️', example: 'Die Straße ist lang.', exampleEn: 'The street is long.' },
  { id: 'k3v16', de: 'abbiegen', en: 'to turn (off)', emoji: '↩️', example: 'Biegen Sie rechts ab.', exampleEn: 'Turn right.' },
  { id: 'k3v17', de: 'Flughafen', en: 'airport', gender: 'der', plural: 'die Flughäfen', emoji: '✈️', example: 'Der Flughafen ist weit.', exampleEn: 'The airport is far.' },
  { id: 'k3v18', de: 'Karte', en: 'map / ticket', gender: 'die', plural: 'die Karten', emoji: '🗺️', example: 'Ich habe eine Karte.', exampleEn: 'I have a map.' },
];

const k3Lessons: Item[] = [
  { id: 'k3-l1', text: 'Grammar — the imperative (commands)', content: [
    { kind: 'para', text: 'Use the **imperative** to give directions and instructions. The form depends on whom you address.' },
    { kind: 'table', headers: ['Verb', 'du', 'ihr', 'Sie'], rows: [
      ['gehen', 'Geh!', 'Geht!', 'Gehen Sie!'],
      ['fahren', 'Fahr!', 'Fahrt!', 'Fahren Sie!'],
      ['abbiegen', 'Bieg ab!', 'Biegt ab!', 'Biegen Sie ab!'],
    ] },
    { kind: 'callout', tone: 'tip', text: 'The **Sie**-imperative is just verb + Sie: `Gehen Sie geradeaus!` Very common when asking or giving directions.' },
  ] },
  { id: 'k3-l2', text: 'Grammar — negation with kein', content: [
    { kind: 'para', text: 'Use **kein** to negate a noun (instead of *nicht ein*). It takes the same endings as **ein**.' },
    { kind: 'table', headers: ['Gender', 'positive', 'negative'], rows: [
      ['Masculine', 'ein Bus', 'kein Bus'],
      ['Feminine', 'eine Karte', 'keine Karte'],
      ['Neuter', 'ein Auto', 'kein Auto'],
      ['Plural', '— Autos', 'keine Autos'],
    ] },
    { kind: 'examples', items: [
      { de: 'Ich habe **kein** Auto.', en: 'I have no car.' },
      { de: 'Hier ist **keine** Apotheke.', en: 'There’s no pharmacy here.' },
    ] },
  ] },
  { id: 'k3-l3', text: 'Grammar — months & dates', content: [
    { kind: 'para', text: 'Use **im** + month, and **am** + ordinal date.' },
    { kind: 'examples', items: [
      { de: 'Im Januar ist es kalt.', en: 'In January it’s cold.' },
      { de: 'Mein Geburtstag ist am dritten Mai.', en: 'My birthday is on the 3rd of May.' },
      { de: 'Welches Datum ist heute?', en: 'What’s today’s date?' },
    ] },
    { kind: 'callout', tone: 'tip', text: 'The 12 months: Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember.' },
  ] },
  { id: 'k3-l4', text: 'Grammar — asking for directions', content: [
    { kind: 'examples', items: [
      { de: 'Wie komme ich zum Bahnhof?', en: 'How do I get to the station?' },
      { de: 'Gehen Sie geradeaus und dann links.', en: 'Go straight ahead and then left.' },
      { de: 'Ist die Apotheke weit?', en: 'Is the pharmacy far?' },
    ] },
  ] },
];

const k3Drills: Drill[] = [
  { id: 'k3d1', kind: 'blank', prompt: 'Ich habe ___ Auto. (no)', gloss: 'kein, neuter', answer: 'kein', options: ['kein', 'keine', 'keinen'], explanation: 'Auto is neuter → kein.' },
  { id: 'k3d2', kind: 'blank', prompt: '___ Sie geradeaus! (gehen, Sie)', gloss: 'imperative', answer: 'Gehen', options: ['Geh', 'Geht', 'Gehen'], explanation: 'Sie-imperative: Gehen Sie!' },
  { id: 'k3d3', kind: 'blank', prompt: 'Hier ist ___ Apotheke. (no)', gloss: 'kein, feminine', answer: 'keine', options: ['kein', 'keine', 'keinen'], explanation: 'Apotheke is feminine → keine.' },
  { id: 'k3d4', kind: 'blank', prompt: '___ Januar ist es kalt.', gloss: 'month', answer: 'Im', options: ['Am', 'Im', 'In'], explanation: 'im + month: im Januar.' },
  { id: 'k3d5', kind: 'order', prompt: 'Build: "How do I get to the station?"', gloss: 'directions', tokens: ['ich', 'zum', 'Wie', 'Bahnhof', 'komme'], solution: ['Wie', 'komme', 'ich', 'zum', 'Bahnhof'], explanation: 'Wie komme ich zum Bahnhof?' },
  { id: 'k3d6', kind: 'blank', prompt: 'Biegen Sie ___ ab. (right)', gloss: 'direction', answer: 'rechts', explanation: 'rechts = right.' },
  { id: 'k3d7', kind: 'blank', prompt: 'Der Monat nach Januar ist ___.', gloss: 'months', answer: 'Februar', explanation: 'Januar → Februar.' },
];

const k3Quiz: QuizQuestion[] = [
  { id: 'k3q1', question: 'The negative article for masculine "Bus" is:', options: ['kein', 'keine', 'keinen', 'nicht'], correctIndex: 0, explanation: 'kein Bus (masculine, Nominativ).', level: 'A1' },
  { id: 'k3q2', question: 'The Sie-imperative of "kommen" is:', options: ['Komm!', 'Kommt!', 'Kommen Sie!', 'Du kommst'], correctIndex: 2, explanation: 'Verb + Sie: Kommen Sie!', level: 'A1' },
  { id: 'k3q3', question: '"links" means:', options: ['right', 'left', 'straight', 'back'], correctIndex: 1, explanation: 'links = left.', level: 'A1' },
  { id: 'k3q4', question: 'The month after Januar is:', options: ['März', 'Februar', 'April', 'Dezember'], correctIndex: 1, explanation: 'Januar → Februar.', level: 'A1' },
  { id: 'k3q5', question: '"der Bahnhof" is the:', options: ['airport', 'train station', 'pharmacy', 'supermarket'], correctIndex: 1, explanation: 'der Bahnhof = train station.', level: 'A1' },
  { id: 'k3q6', question: '"geradeaus" means:', options: ['turn left', 'turn right', 'straight ahead', 'stop'], correctIndex: 2, explanation: 'geradeaus = straight ahead.', level: 'A1' },
  { id: 'k3q7', question: 'Negate: "Ich habe eine Katze." →', options: ['Ich habe nicht Katze.', 'Ich habe keine Katze.', 'Ich habe kein Katze.', 'Ich habe keinen Katze.'], correctIndex: 1, explanation: 'Katze is feminine → keine Katze.', level: 'A1' },
  { id: 'k3q8', question: 'You say "in January" as:', options: ['am Januar', 'im Januar', 'in Januar', 'zu Januar'], correctIndex: 1, explanation: 'im + month: im Januar.', level: 'A1' },
];

const chapter3 = makeChapter({
  n: 3, label: 'Kapitel 3', subtitle: 'Places, Transport & Directions',
  objectives: ['Name places, transport and directions', 'Give commands with the imperative', 'Negate nouns with kein', 'Say months and dates'],
  grammarSummary: 'imperative, kein, months & dates', situations: 'Asking the way, using public transport',
  lessons: k3Lessons, vocab: k3Vocab, drills: k3Drills, quiz: k3Quiz,
});

/* ─────────────────────────── KAPITEL 4 ─────────────────────────── */
const k4Vocab: Flashcard[] = [
  { id: 'k4v1', de: 'Brot', en: 'bread', gender: 'das', plural: 'die Brote', emoji: '🍞', example: 'Ich kaufe Brot.', exampleEn: 'I buy bread.' },
  { id: 'k4v2', de: 'Milch', en: 'milk', gender: 'die', plural: '(meist Singular)', emoji: '🥛', example: 'Die Milch ist frisch.', exampleEn: 'The milk is fresh.' },
  { id: 'k4v3', de: 'Käse', en: 'cheese', gender: 'der', plural: 'die Käse', emoji: '🧀', example: 'Der Käse schmeckt gut.', exampleEn: 'The cheese tastes good.' },
  { id: 'k4v4', de: 'Apfel', en: 'apple', gender: 'der', plural: 'die Äpfel', emoji: '🍎', example: 'Ich esse einen Apfel.', exampleEn: 'I eat an apple.' },
  { id: 'k4v5', de: 'Wasser', en: 'water', gender: 'das', plural: 'die Wässer', emoji: '💧', example: 'Ein Wasser, bitte.', exampleEn: 'A water, please.' },
  { id: 'k4v6', de: 'Kaffee', en: 'coffee', gender: 'der', plural: 'die Kaffees', emoji: '☕', example: 'Ich möchte einen Kaffee.', exampleEn: 'I’d like a coffee.' },
  { id: 'k4v7', de: 'Bier', en: 'beer', gender: 'das', plural: 'die Biere', emoji: '🍺', example: 'Das Bier ist kalt.', exampleEn: 'The beer is cold.' },
  { id: 'k4v8', de: 'essen', en: 'to eat', emoji: '🍽️', example: 'Was isst du?', exampleEn: 'What are you eating?' },
  { id: 'k4v9', de: 'trinken', en: 'to drink', emoji: '🥤', example: 'Ich trinke Wasser.', exampleEn: 'I drink water.' },
  { id: 'k4v10', de: 'kaufen', en: 'to buy', emoji: '🛍️', example: 'Ich kaufe Obst.', exampleEn: 'I buy fruit.' },
  { id: 'k4v11', de: 'Restaurant', en: 'restaurant', gender: 'das', plural: 'die Restaurants', emoji: '🍴', example: 'Wir gehen ins Restaurant.', exampleEn: 'We’re going to the restaurant.' },
  { id: 'k4v12', de: 'Rechnung', en: 'bill / check', gender: 'die', plural: 'die Rechnungen', emoji: '🧾', example: 'Die Rechnung, bitte!', exampleEn: 'The bill, please!' },
  { id: 'k4v13', de: 'bestellen', en: 'to order', emoji: '📝', example: 'Ich bestelle eine Suppe.', exampleEn: 'I order a soup.' },
  { id: 'k4v14', de: 'Hunger', en: 'hunger', gender: 'der', plural: '(meist Singular)', emoji: '😋', example: 'Ich habe Hunger.', exampleEn: 'I’m hungry.' },
  { id: 'k4v15', de: 'lecker', en: 'tasty', emoji: '😋', example: 'Das ist lecker!', exampleEn: 'That’s tasty!' },
  { id: 'k4v16', de: 'Gemüse', en: 'vegetables', gender: 'das', plural: '(meist Singular)', emoji: '🥦', example: 'Gemüse ist gesund.', exampleEn: 'Vegetables are healthy.' },
  { id: 'k4v17', de: 'Obst', en: 'fruit', gender: 'das', plural: '(meist Singular)', emoji: '🍇', example: 'Ich esse gern Obst.', exampleEn: 'I like eating fruit.' },
  { id: 'k4v18', de: 'Suppe', en: 'soup', gender: 'die', plural: 'die Suppen', emoji: '🍲', example: 'Die Suppe ist warm.', exampleEn: 'The soup is warm.' },
];

const k4Lessons: Item[] = [
  { id: 'k4-l1', text: 'Grammar — the accusative case', content: [
    { kind: 'para', text: 'The **accusative** marks the **direct object** (what you eat, buy, order). Only the **masculine** article changes.' },
    { kind: 'table', headers: ['Gender', 'Nominativ', 'Akkusativ'], rows: [
      ['Masculine', 'der / ein Apfel', '**den / einen** Apfel'],
      ['Feminine', 'die / eine Suppe', 'die / eine Suppe'],
      ['Neuter', 'das / ein Brot', 'das / ein Brot'],
      ['Plural', 'die Äpfel', 'die Äpfel'],
    ] },
    { kind: 'examples', items: [
      { de: 'Ich kaufe **einen** Apfel.', en: 'I buy an apple. (ein → einen)' },
      { de: 'Ich esse **eine** Suppe.', en: 'I eat a soup. (feminine stays)' },
    ] },
  ] },
  { id: 'k4-l2', text: 'Grammar — mögen vs. möchten', content: [
    { kind: 'table', headers: ['Verb', 'Meaning', 'Example'], rows: [
      ['mögen', 'to like (in general)', 'Ich **mag** Kaffee.'],
      ['möchten', 'would like (polite request)', 'Ich **möchte** einen Kaffee.'],
    ] },
    { kind: 'table', caption: '**möchten** conjugation', headers: ['Person', 'Form'], rows: [
      ['ich / er', 'möchte'], ['du', 'möchtest'], ['wir / sie', 'möchten'], ['ihr', 'möchtet'],
    ] },
    { kind: 'callout', tone: 'tip', text: 'Use **möchten** to order food politely — it’s the go-to verb in a café or restaurant.' },
  ] },
  { id: 'k4-l3', text: 'Grammar — ordering in a restaurant', content: [
    { kind: 'examples', items: [
      { de: 'Ich möchte einen Kaffee, bitte.', en: 'I’d like a coffee, please.' },
      { de: 'Was möchten Sie trinken?', en: 'What would you like to drink?' },
      { de: 'Die Rechnung, bitte!', en: 'The bill, please!' },
    ] },
    { kind: 'callout', tone: 'warn', text: 'Negate hunger with **keinen** (masculine, accusative): `Ich habe **keinen** Hunger.`' },
  ] },
];

const k4Drills: Drill[] = [
  { id: 'k4d1', kind: 'blank', prompt: 'Ich möchte ___ Kaffee. (a)', gloss: 'accusative, masculine', answer: 'einen', options: ['ein', 'eine', 'einen'], explanation: 'Kaffee is masculine, accusative → einen.' },
  { id: 'k4d2', kind: 'blank', prompt: 'Ich esse ___ Suppe. (a)', gloss: 'accusative, feminine', answer: 'eine', options: ['ein', 'eine', 'einen'], explanation: 'Suppe is feminine → eine (unchanged).' },
  { id: 'k4d3', kind: 'blank', prompt: '___ du Bier? (mögen, du)', gloss: 'mögen', answer: 'Magst', options: ['Mag', 'Magst', 'Mögt'], explanation: 'du magst → Magst du Bier?' },
  { id: 'k4d4', kind: 'blank', prompt: 'Ich habe ___ Hunger. (no)', gloss: 'kein, accusative masc.', answer: 'keinen', options: ['kein', 'keine', 'keinen'], explanation: 'Hunger is masculine, accusative → keinen.' },
  { id: 'k4d5', kind: 'order', prompt: 'Build: "I’d like a coffee."', gloss: 'polite request', tokens: ['einen', 'möchte', 'Ich', 'Kaffee'], solution: ['Ich', 'möchte', 'einen', 'Kaffee'], explanation: 'Ich möchte einen Kaffee.' },
  { id: 'k4d6', kind: 'blank', prompt: 'Die ___, bitte!', gloss: 'restaurant', answer: 'Rechnung', explanation: 'Die Rechnung, bitte! = The bill, please!' },
  { id: 'k4d7', kind: 'order', prompt: 'Build: "I buy an apple."', gloss: 'accusative', tokens: ['einen', 'Ich', 'Apfel', 'kaufe'], solution: ['Ich', 'kaufe', 'einen', 'Apfel'], explanation: 'ein → einen in the accusative.' },
];

const k4Quiz: QuizQuestion[] = [
  { id: 'k4q1', question: 'In the accusative, masculine "der" becomes:', options: ['dem', 'den', 'des', 'der'], correctIndex: 1, explanation: 'der → den (accusative).', level: 'A1' },
  { id: 'k4q2', question: '"möchten" means:', options: ['must', 'would like', 'can', 'to have'], correctIndex: 1, explanation: 'möchten = would like (polite).', level: 'A1' },
  { id: 'k4q3', question: '"Ich möchte ___ Tee." (Tee is masculine)', options: ['ein', 'eine', 'einen', 'der'], correctIndex: 2, explanation: 'Masculine + accusative → einen.', level: 'A1' },
  { id: 'k4q4', question: 'The du-form of "mögen" is:', options: ['mag', 'magst', 'mögt', 'mögen'], correctIndex: 1, explanation: 'du magst.', level: 'A1' },
  { id: 'k4q5', question: '"die Rechnung" means:', options: ['the menu', 'the bill', 'the tip', 'the table'], correctIndex: 1, explanation: 'die Rechnung = the bill.', level: 'A1' },
  { id: 'k4q6', question: '"trinken" means:', options: ['to eat', 'to drink', 'to buy', 'to cook'], correctIndex: 1, explanation: 'trinken = to drink.', level: 'A1' },
  { id: 'k4q7', question: 'Accusative of "ein Apfel":', options: ['ein Apfel', 'einen Apfel', 'einem Apfel', 'eines Apfels'], correctIndex: 1, explanation: 'einen Apfel.', level: 'A1' },
  { id: 'k4q8', question: 'Polite way to order:', options: ['Ich will…', 'Gib mir…', 'Ich möchte…', 'Ich mag…'], correctIndex: 2, explanation: 'Ich möchte… is the polite request form.', level: 'A1' },
];

const chapter4 = makeChapter({
  n: 4, label: 'Kapitel 4', subtitle: 'Food, Shopping & Restaurant',
  objectives: ['Name common foods and drinks', 'Use the accusative case', 'Order politely with möchten', 'Handle a café or restaurant'],
  grammarSummary: 'accusative, mögen, möchten', situations: 'Shopping for food, ordering in a restaurant',
  lessons: k4Lessons, vocab: k4Vocab, drills: k4Drills, quiz: k4Quiz,
});

/* ─────────────────────────── KAPITEL 8 ─────────────────────────── */
const k8Vocab: Flashcard[] = [
  { id: 'k8v1', de: 'Körper', en: 'body', gender: 'der', plural: 'die Körper', emoji: '🧍', example: 'Der Körper braucht Sport.', exampleEn: 'The body needs exercise.' },
  { id: 'k8v2', de: 'Kopf', en: 'head', gender: 'der', plural: 'die Köpfe', emoji: '🧠', example: 'Mein Kopf tut weh.', exampleEn: 'My head hurts.' },
  { id: 'k8v3', de: 'Bauch', en: 'stomach / belly', gender: 'der', plural: 'die Bäuche', emoji: '🫃', example: 'Der Bauch tut weh.', exampleEn: 'The stomach hurts.' },
  { id: 'k8v4', de: 'Arm', en: 'arm', gender: 'der', plural: 'die Arme', emoji: '💪', example: 'Mein Arm ist gebrochen.', exampleEn: 'My arm is broken.' },
  { id: 'k8v5', de: 'Bein', en: 'leg', gender: 'das', plural: 'die Beine', emoji: '🦵', example: 'Das Bein tut weh.', exampleEn: 'The leg hurts.' },
  { id: 'k8v6', de: 'Hand', en: 'hand', gender: 'die', plural: 'die Hände', emoji: '✋', example: 'Gib mir die Hand.', exampleEn: 'Give me your hand.' },
  { id: 'k8v7', de: 'Rücken', en: 'back', gender: 'der', plural: 'die Rücken', emoji: '🔙', example: 'Mein Rücken tut weh.', exampleEn: 'My back hurts.' },
  { id: 'k8v8', de: 'krank', en: 'sick / ill', emoji: '🤒', example: 'Ich bin krank.', exampleEn: 'I am sick.' },
  { id: 'k8v9', de: 'gesund', en: 'healthy', emoji: '💚', example: 'Obst ist gesund.', exampleEn: 'Fruit is healthy.' },
  { id: 'k8v10', de: 'Arzt', en: 'doctor', gender: 'der', plural: 'die Ärzte', emoji: '🩺', example: 'Ich gehe zum Arzt.', exampleEn: 'I go to the doctor.' },
  { id: 'k8v11', de: 'Schmerzen', en: 'pain (pl)', gender: 'die', plural: '(nur Plural)', emoji: '😣', example: 'Ich habe Schmerzen.', exampleEn: 'I’m in pain.' },
  { id: 'k8v12', de: 'Medikament', en: 'medicine', gender: 'das', plural: 'die Medikamente', emoji: '💊', example: 'Nimm das Medikament.', exampleEn: 'Take the medicine.' },
  { id: 'k8v13', de: 'wehtun', en: 'to hurt', emoji: '🤕', example: 'Der Kopf tut weh.', exampleEn: 'The head hurts.' },
  { id: 'k8v14', de: 'Termin', en: 'appointment', gender: 'der', plural: 'die Termine', emoji: '🗓️', example: 'Ich habe einen Termin.', exampleEn: 'I have an appointment.' },
  { id: 'k8v15', de: 'Fieber', en: 'fever', gender: 'das', plural: '(meist Singular)', emoji: '🌡️', example: 'Ich habe Fieber.', exampleEn: 'I have a fever.' },
  { id: 'k8v16', de: 'Erkältung', en: 'cold (illness)', gender: 'die', plural: 'die Erkältungen', emoji: '🤧', example: 'Ich habe eine Erkältung.', exampleEn: 'I have a cold.' },
  { id: 'k8v17', de: 'Apotheke', en: 'pharmacy', gender: 'die', plural: 'die Apotheken', emoji: '💊', example: 'Die Apotheke ist zu.', exampleEn: 'The pharmacy is closed.' },
  { id: 'k8v18', de: 'sich fühlen', en: 'to feel', emoji: '🫀', example: 'Ich fühle mich schlecht.', exampleEn: 'I feel bad.' },
];

const k8Lessons: Item[] = [
  { id: 'k8-l1', text: 'Grammar — modal verbs sollen & dürfen', content: [
    { kind: 'table', caption: 'Two more modals', headers: ['Person', 'sollen (should)', 'dürfen (may)'], rows: [
      ['ich', 'soll', 'darf'],
      ['du', 'sollst', 'darfst'],
      ['er/sie/es', 'soll', 'darf'],
      ['wir', 'sollen', 'dürfen'],
      ['ihr', 'sollt', 'dürft'],
      ['sie/Sie', 'sollen', 'dürfen'],
    ] },
    { kind: 'examples', items: [
      { de: 'Du **sollst** mehr schlafen.', en: 'You should sleep more. (advice)' },
      { de: '**Darf** ich hier sitzen?', en: 'May I sit here? (permission)' },
    ] },
  ] },
  { id: 'k8-l2', text: 'Grammar — the nicht dürfen trap', content: [
    { kind: 'callout', tone: 'warn', text: '**nicht dürfen ≠ nicht müssen.** `Du darfst nicht rauchen` = you **may not** smoke (forbidden). `Du musst nicht kommen` = you **don’t have to** come (optional).' },
    { kind: 'examples', items: [
      { de: 'Sie dürfen hier nicht parken.', en: 'You may not park here. (forbidden)' },
      { de: 'Du musst nicht warten.', en: 'You don’t have to wait. (optional)' },
    ] },
  ] },
  { id: 'k8-l3', text: 'Grammar — talking about pain', content: [
    { kind: 'para', text: 'Two ways to say something hurts:' },
    { kind: 'table', headers: ['Pattern', 'Example', 'English'], rows: [
      ['… tut weh', 'Mein Kopf tut weh.', 'My head hurts.'],
      ['Ich habe …schmerzen', 'Ich habe Kopfschmerzen.', 'I have a headache.'],
    ] },
    { kind: 'examples', items: [
      { de: 'Ich habe Bauchschmerzen.', en: 'I have a stomach ache.' },
      { de: 'Mein Rücken tut weh.', en: 'My back hurts.' },
    ] },
  ] },
];

const k8Drills: Drill[] = [
  { id: 'k8d1', kind: 'blank', prompt: 'Du ___ mehr schlafen. (advice)', gloss: 'sollen', answer: 'sollst', options: ['soll', 'sollst', 'sollt'], explanation: 'du sollst.' },
  { id: 'k8d2', kind: 'blank', prompt: '___ ich hier sitzen? (permission)', gloss: 'dürfen', answer: 'Darf', options: ['Darf', 'Darfst', 'Dürfen'], explanation: 'ich darf → Darf ich…?' },
  { id: 'k8d3', kind: 'blank', prompt: 'Mein Kopf tut ___.', gloss: 'pain', answer: 'weh', explanation: '… tut weh = … hurts.' },
  { id: 'k8d4', kind: 'blank', prompt: 'Man ___ hier nicht rauchen. (forbidden → dürfen)', gloss: 'nicht dürfen', answer: 'darf', options: ['darf', 'muss', 'soll'], explanation: 'nicht dürfen = forbidden: Man darf hier nicht rauchen.' },
  { id: 'k8d5', kind: 'order', prompt: 'Build: "I have an appointment at the doctor’s."', gloss: 'health', tokens: ['einen', 'Ich', 'beim', 'habe', 'Arzt', 'Termin'], solution: ['Ich', 'habe', 'einen', 'Termin', 'beim', 'Arzt'], explanation: 'Ich habe einen Termin beim Arzt.' },
  { id: 'k8d6', kind: 'blank', prompt: 'Ich bin ___. (sick)', gloss: 'adjective', answer: 'krank', explanation: 'krank = sick.' },
  { id: 'k8d7', kind: 'blank', prompt: 'Ich habe eine ___. (a cold)', gloss: 'illness', answer: 'Erkältung', explanation: 'eine Erkältung = a cold.' },
];

const k8Quiz: QuizQuestion[] = [
  { id: 'k8q1', question: 'The ich-form of "sollen" is:', options: ['soll', 'sollst', 'sollt', 'sollen'], correctIndex: 0, explanation: 'ich soll.', level: 'A1' },
  { id: 'k8q2', question: '"dürfen" expresses:', options: ['necessity', 'permission', 'ability', 'a wish'], correctIndex: 1, explanation: 'dürfen = to be allowed / permission.', level: 'A1' },
  { id: 'k8q3', question: '"Du darfst nicht rauchen" means:', options: ['You don’t have to smoke', 'You may not smoke', 'You should smoke', 'You can smoke'], correctIndex: 1, explanation: 'nicht dürfen = forbidden.', level: 'A1' },
  { id: 'k8q4', question: '"der Kopf" means:', options: ['hand', 'head', 'back', 'leg'], correctIndex: 1, explanation: 'der Kopf = head.', level: 'A1' },
  { id: 'k8q5', question: '"krank" means:', options: ['healthy', 'tired', 'sick', 'strong'], correctIndex: 2, explanation: 'krank = sick.', level: 'A1' },
  { id: 'k8q6', question: '"Mein Bauch tut weh" means:', options: ['My head hurts', 'My stomach hurts', 'My arm hurts', 'My back hurts'], correctIndex: 1, explanation: 'der Bauch = stomach.', level: 'A1' },
  { id: 'k8q7', question: 'The du-form of "dürfen" is:', options: ['darf', 'darfst', 'dürft', 'darfen'], correctIndex: 1, explanation: 'du darfst.', level: 'A1' },
  { id: 'k8q8', question: '"die Apotheke" is the:', options: ['hospital', 'pharmacy', 'doctor', 'clinic'], correctIndex: 1, explanation: 'die Apotheke = pharmacy.', level: 'A1' },
];

const chapter8 = makeChapter({
  n: 8, label: 'Kapitel 8', subtitle: 'Health & the Doctor',
  objectives: ['Name body parts and symptoms', 'Use the modals sollen and dürfen', 'Avoid the nicht dürfen / nicht müssen trap', 'Describe pain and make an appointment'],
  grammarSummary: 'sollen, dürfen, expressing pain', situations: 'Visiting the doctor, describing symptoms',
  lessons: k8Lessons, vocab: k8Vocab, drills: k8Drills, quiz: k8Quiz,
});

/* ─────────────────────────── KAPITEL 9 ─────────────────────────── */
const k9Vocab: Flashcard[] = [
  { id: 'k9v1', de: 'Wohnung', en: 'apartment / flat', gender: 'die', plural: 'die Wohnungen', emoji: '🏢', example: 'Die Wohnung ist groß.', exampleEn: 'The apartment is big.' },
  { id: 'k9v2', de: 'Zimmer', en: 'room', gender: 'das', plural: 'die Zimmer', emoji: '🚪', example: 'Das Zimmer ist hell.', exampleEn: 'The room is bright.' },
  { id: 'k9v3', de: 'Küche', en: 'kitchen', gender: 'die', plural: 'die Küchen', emoji: '🍳', example: 'Ich koche in der Küche.', exampleEn: 'I cook in the kitchen.' },
  { id: 'k9v4', de: 'Bad', en: 'bathroom', gender: 'das', plural: 'die Bäder', emoji: '🛁', example: 'Das Bad ist klein.', exampleEn: 'The bathroom is small.' },
  { id: 'k9v5', de: 'Schlafzimmer', en: 'bedroom', gender: 'das', plural: 'die Schlafzimmer', emoji: '🛏️', example: 'Das Schlafzimmer ist ruhig.', exampleEn: 'The bedroom is quiet.' },
  { id: 'k9v6', de: 'Wohnzimmer', en: 'living room', gender: 'das', plural: 'die Wohnzimmer', emoji: '🛋️', example: 'Wir sitzen im Wohnzimmer.', exampleEn: 'We sit in the living room.' },
  { id: 'k9v7', de: 'Tisch', en: 'table', gender: 'der', plural: 'die Tische', emoji: '🪑', example: 'Das Buch ist auf dem Tisch.', exampleEn: 'The book is on the table.' },
  { id: 'k9v8', de: 'Stuhl', en: 'chair', gender: 'der', plural: 'die Stühle', emoji: '🪑', example: 'Der Stuhl ist neu.', exampleEn: 'The chair is new.' },
  { id: 'k9v9', de: 'Bett', en: 'bed', gender: 'das', plural: 'die Betten', emoji: '🛏️', example: 'Das Bett ist bequem.', exampleEn: 'The bed is comfortable.' },
  { id: 'k9v10', de: 'Schrank', en: 'cupboard / wardrobe', gender: 'der', plural: 'die Schränke', emoji: '🗄️', example: 'Der Schrank ist voll.', exampleEn: 'The wardrobe is full.' },
  { id: 'k9v11', de: 'Sofa', en: 'sofa', gender: 'das', plural: 'die Sofas', emoji: '🛋️', example: 'Das Sofa ist grün.', exampleEn: 'The sofa is green.' },
  { id: 'k9v12', de: 'Lampe', en: 'lamp', gender: 'die', plural: 'die Lampen', emoji: '💡', example: 'Die Lampe ist an.', exampleEn: 'The lamp is on.' },
  { id: 'k9v13', de: 'Farbe', en: 'colour', gender: 'die', plural: 'die Farben', emoji: '🎨', example: 'Welche Farbe magst du?', exampleEn: 'Which colour do you like?' },
  { id: 'k9v14', de: 'rot', en: 'red', emoji: '🔴', example: 'Das Auto ist rot.', exampleEn: 'The car is red.' },
  { id: 'k9v15', de: 'blau', en: 'blue', emoji: '🔵', example: 'Der Himmel ist blau.', exampleEn: 'The sky is blue.' },
  { id: 'k9v16', de: 'grün', en: 'green', emoji: '🟢', example: 'Das Gras ist grün.', exampleEn: 'The grass is green.' },
  { id: 'k9v17', de: 'gelb', en: 'yellow', emoji: '🟡', example: 'Die Sonne ist gelb.', exampleEn: 'The sun is yellow.' },
  { id: 'k9v18', de: 'schwarz / weiß', en: 'black / white', emoji: '⚫', example: 'Die Katze ist schwarz.', exampleEn: 'The cat is black.' },
];

const k9Lessons: Item[] = [
  { id: 'k9-l1', text: 'Grammar — two-way prepositions (Wo vs. Wohin)', content: [
    { kind: 'para', text: 'Nine prepositions take **either** case. **Movement toward** a place → Akkusativ (*Wohin?*). **Static position** → Dativ (*Wo?*).' },
    { kind: 'table', headers: ['Question', 'Case', 'Example'], rows: [
      ['Wohin? (where to)', 'Akkusativ', 'Ich gehe in **die** Küche.'],
      ['Wo? (where)', 'Dativ', 'Ich bin in **der** Küche.'],
      ['Wohin?', 'Akkusativ', 'Ich lege es auf **den** Tisch.'],
      ['Wo?', 'Dativ', 'Es liegt auf **dem** Tisch.'],
    ] },
    { kind: 'callout', tone: 'tip', text: 'The nine: **an, auf, in, über, unter, vor, hinter, neben, zwischen**. At A1 master **in, an, auf** first. Contractions: in dem → **im**, in das → **ins**.' },
  ] },
  { id: 'k9-l2', text: 'Grammar — colours & adjectives after sein', content: [
    { kind: 'para', text: 'After **sein**, an adjective (like a colour) takes **no ending** — it never changes.' },
    { kind: 'examples', items: [
      { de: 'Das Sofa ist grün.', en: 'The sofa is green.' },
      { de: 'Die Lampe ist rot.', en: 'The lamp is red.' },
      { de: 'Die Wände sind weiß.', en: 'The walls are white.' },
    ] },
  ] },
  { id: 'k9-l3', text: 'Grammar — describing your home', content: [
    { kind: 'examples', items: [
      { de: 'Die Wohnung hat drei Zimmer.', en: 'The apartment has three rooms.' },
      { de: 'Der Tisch steht im Wohnzimmer.', en: 'The table is in the living room.' },
      { de: 'Neben dem Bett ist eine Lampe.', en: 'Next to the bed there’s a lamp.' },
    ] },
  ] },
];

const k9Drills: Drill[] = [
  { id: 'k9d1', kind: 'blank', prompt: 'Ich bin ___ der Küche. (where — position)', gloss: 'Wo? + Dativ', answer: 'in', options: ['in', 'an', 'auf'], explanation: 'Position → Dativ: in der Küche.' },
  { id: 'k9d2', kind: 'blank', prompt: 'Das Sofa ist ___. (green)', gloss: 'colour', answer: 'grün', explanation: 'grün = green; no ending after sein.' },
  { id: 'k9d3', kind: 'blank', prompt: 'Ich gehe ___ das Wohnzimmer. (into → Akkusativ)', gloss: 'Wohin?', answer: 'in', options: ['in', 'auf', 'zu'], explanation: 'Movement → Akkusativ: in das (ins) Wohnzimmer.' },
  { id: 'k9d4', kind: 'blank', prompt: '"in dem" contracts to ___.', gloss: 'contraction', answer: 'im', options: ['im', 'ins', 'am'], explanation: 'in dem → im.' },
  { id: 'k9d5', kind: 'order', prompt: 'Build: "The chair is next to the table."', gloss: 'position (Dativ)', tokens: ['neben', 'Der', 'dem', 'steht', 'Stuhl', 'Tisch'], solution: ['Der', 'Stuhl', 'steht', 'neben', 'dem', 'Tisch'], explanation: 'Position → Dativ: neben dem Tisch.' },
  { id: 'k9d6', kind: 'blank', prompt: 'Die Lampe ist ___. (red)', gloss: 'colour', answer: 'rot', explanation: 'rot = red.' },
  { id: 'k9d7', kind: 'blank', prompt: 'Das ___ ist zum Schlafen. (bedroom)', gloss: 'rooms', answer: 'Schlafzimmer', explanation: 'das Schlafzimmer = bedroom.' },
];

const k9Quiz: QuizQuestion[] = [
  { id: 'k9q1', question: '"Wo?" (position) is answered with which case?', options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'], correctIndex: 2, explanation: 'Static position → Dativ.', level: 'A1' },
  { id: 'k9q2', question: '"Wohin?" (movement) is answered with which case?', options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'], correctIndex: 1, explanation: 'Movement toward → Akkusativ.', level: 'A1' },
  { id: 'k9q3', question: '"die Küche" means:', options: ['bedroom', 'kitchen', 'bathroom', 'living room'], correctIndex: 1, explanation: 'die Küche = kitchen.', level: 'A1' },
  { id: 'k9q4', question: '"grün" means:', options: ['red', 'blue', 'green', 'yellow'], correctIndex: 2, explanation: 'grün = green.', level: 'A1' },
  { id: 'k9q5', question: '"in dem" contracts to:', options: ['im', 'ins', 'am', 'zum'], correctIndex: 0, explanation: 'in dem → im.', level: 'A1' },
  { id: 'k9q6', question: '"das Schlafzimmer" is the:', options: ['kitchen', 'bathroom', 'bedroom', 'garage'], correctIndex: 2, explanation: 'das Schlafzimmer = bedroom.', level: 'A1' },
  { id: 'k9q7', question: 'After "sein", an adjective (colour) takes:', options: ['no ending', '-e', '-en', '-er'], correctIndex: 0, explanation: 'Predicate adjectives after sein don’t change.', level: 'A1' },
  { id: 'k9q8', question: 'Which is a two-way preposition?', options: ['mit', 'für', 'auf', 'aus'], correctIndex: 2, explanation: 'auf is two-way (mit/aus are dative, für is accusative).', level: 'A1' },
];

const chapter9 = makeChapter({
  n: 9, label: 'Kapitel 9', subtitle: 'Home, Rooms & Colours',
  objectives: ['Name rooms, furniture and colours', 'Use two-way prepositions (Wo vs. Wohin)', 'Use colour adjectives after sein', 'Describe where things are'],
  grammarSummary: 'two-way prepositions, colours', situations: 'Describing your home and where things are',
  lessons: k9Lessons, vocab: k9Vocab, drills: k9Drills, quiz: k9Quiz,
});

/* ─────────────────────────── KAPITEL 10 ────────────────────────── */
const k10Vocab: Flashcard[] = [
  { id: 'k10v1', de: 'Reise', en: 'trip / journey', gender: 'die', plural: 'die Reisen', emoji: '🧳', example: 'Die Reise war schön.', exampleEn: 'The trip was nice.' },
  { id: 'k10v2', de: 'reisen', en: 'to travel', emoji: '🌍', example: 'Ich reise gern.', exampleEn: 'I like to travel.' },
  { id: 'k10v3', de: 'Urlaub', en: 'holiday / vacation', gender: 'der', plural: 'die Urlaube', emoji: '🏖️', example: 'Ich habe Urlaub.', exampleEn: 'I’m on holiday.' },
  { id: 'k10v4', de: 'Wochenende', en: 'weekend', gender: 'das', plural: 'die Wochenenden', emoji: '🛌', example: 'Am Wochenende schlafe ich lange.', exampleEn: 'On the weekend I sleep in.' },
  { id: 'k10v5', de: 'besuchen', en: 'to visit', emoji: '🚪', example: 'Ich habe Oma besucht.', exampleEn: 'I visited grandma.' },
  { id: 'k10v6', de: 'gestern', en: 'yesterday', emoji: '📆', example: 'Gestern war ich müde.', exampleEn: 'Yesterday I was tired.' },
  { id: 'k10v7', de: 'letzte Woche', en: 'last week', emoji: '⏮️', example: 'Letzte Woche war ich krank.', exampleEn: 'Last week I was ill.' },
  { id: 'k10v8', de: 'fahren', en: 'to go / drive', emoji: '🚗', example: 'Wir sind nach Köln gefahren.', exampleEn: 'We went to Cologne.' },
  { id: 'k10v9', de: 'fliegen', en: 'to fly', emoji: '✈️', example: 'Ich bin nach Rom geflogen.', exampleEn: 'I flew to Rome.' },
  { id: 'k10v10', de: 'Flugzeug', en: 'plane', gender: 'das', plural: 'die Flugzeuge', emoji: '🛫', example: 'Das Flugzeug ist spät.', exampleEn: 'The plane is late.' },
  { id: 'k10v11', de: 'gemacht', en: 'done / made (past part.)', emoji: '✅', example: 'Was hast du gemacht?', exampleEn: 'What did you do?' },
  { id: 'k10v12', de: 'gegangen', en: 'gone (past part.)', emoji: '🚶', example: 'Ich bin nach Hause gegangen.', exampleEn: 'I went home.' },
  { id: 'k10v13', de: 'gesehen', en: 'seen (past part.)', emoji: '👀', example: 'Ich habe einen Film gesehen.', exampleEn: 'I watched a film.' },
  { id: 'k10v14', de: 'schön', en: 'nice / beautiful', emoji: '😊', example: 'Der Urlaub war schön.', exampleEn: 'The holiday was nice.' },
  { id: 'k10v15', de: 'interessant', en: 'interesting', emoji: '🤔', example: 'Die Stadt war interessant.', exampleEn: 'The city was interesting.' },
  { id: 'k10v16', de: 'das Meer', en: 'sea', gender: 'das', plural: 'die Meere', emoji: '🌊', example: 'Wir waren am Meer.', exampleEn: 'We were at the sea.' },
];

const k10Lessons: Item[] = [
  { id: 'k10-l1', text: 'Grammar — the Perfekt (spoken past)', content: [
    { kind: 'para', text: 'German talks about the past with the **Perfekt**: a helper verb (**haben** or **sein**) in position 2 + the **past participle** at the end.' },
    { kind: 'examples', items: [
      { de: 'Ich **habe** Fußball **gespielt**.', en: 'I played football.' },
      { de: 'Wir **sind** nach Berlin **gefahren**.', en: 'We went to Berlin.' },
    ] },
    { kind: 'callout', tone: 'tip', text: 'Regular participle = **ge + stem + t** (spielen → gespielt). Many strong verbs = **ge + stem + en** (sehen → gesehen).' },
  ] },
  { id: 'k10-l2', text: 'Grammar — haben or sein?', content: [
    { kind: 'para', text: 'Most verbs take **haben**. Verbs of **movement** or **change of state** take **sein**.' },
    { kind: 'table', headers: ['Auxiliary', 'When', 'Example'], rows: [
      ['haben', 'most verbs', 'Ich habe gegessen.'],
      ['sein', 'movement (gehen, fahren, fliegen)', 'Ich bin gegangen.'],
      ['sein', 'change of state (aufstehen)', 'Ich bin aufgestanden.'],
    ] },
    { kind: 'callout', tone: 'warn', text: 'Learn the auxiliary **with** the verb. `gehen → ist gegangen`, `fahren → ist gefahren`, but `machen → hat gemacht`.' },
  ] },
  { id: 'k10-l3', text: 'Grammar — talking about your weekend', content: [
    { kind: 'examples', items: [
      { de: 'Was hast du am Wochenende gemacht?', en: 'What did you do at the weekend?' },
      { de: 'Ich habe meine Familie besucht.', en: 'I visited my family.' },
      { de: 'Wir sind ans Meer gefahren.', en: 'We went to the sea.' },
    ] },
  ] },
];

const k10Drills: Drill[] = [
  { id: 'k10d1', kind: 'blank', prompt: 'Ich ___ Fußball gespielt.', gloss: 'Perfekt auxiliary', answer: 'habe', options: ['habe', 'bin', 'war'], explanation: 'spielen takes haben: Ich habe gespielt.' },
  { id: 'k10d2', kind: 'blank', prompt: 'Wir ___ nach Berlin gefahren.', gloss: 'movement → sein', answer: 'sind', options: ['haben', 'sind', 'waren'], explanation: 'fahren is movement → sein: Wir sind gefahren.' },
  { id: 'k10d3', kind: 'blank', prompt: 'Ich habe einen Film ___. (sehen)', gloss: 'past participle', answer: 'gesehen', explanation: 'sehen → gesehen (strong verb).' },
  { id: 'k10d4', kind: 'blank', prompt: 'Er ist nach Hause ___. (gehen)', gloss: 'past participle', answer: 'gegangen', explanation: 'gehen → gegangen (with sein).' },
  { id: 'k10d5', kind: 'order', prompt: 'Build: "I worked at the weekend."', gloss: 'Perfekt', tokens: ['am', 'gearbeitet', 'Ich', 'habe', 'Wochenende'], solution: ['Ich', 'habe', 'am', 'Wochenende', 'gearbeitet'], explanation: 'Participle at the end: … gearbeitet.' },
  { id: 'k10d6', kind: 'blank', prompt: 'Gestern ___ ich müde. (sein, past)', gloss: 'war', answer: 'war', explanation: 'sein past = war: Gestern war ich müde.' },
  { id: 'k10d7', kind: 'blank', prompt: 'Was hast du ___? (do — participle)', gloss: 'machen', answer: 'gemacht', explanation: 'machen → gemacht.' },
];

const k10Quiz: QuizQuestion[] = [
  { id: 'k10q1', question: 'The past participle of "machen" is:', options: ['macht', 'gemacht', 'gemachen', 'machte'], correctIndex: 1, explanation: 'ge + mach + t = gemacht.', level: 'A1' },
  { id: 'k10q2', question: 'Which verbs use "sein" in the Perfekt?', options: ['all verbs', 'verbs of movement / change of state', 'only modal verbs', 'only regular verbs'], correctIndex: 1, explanation: 'Movement (gehen, fahren) and change of state take sein.', level: 'A1' },
  { id: 'k10q3', question: '"Ich habe gegessen" — the auxiliary is:', options: ['haben', 'sein', 'werden', 'war'], correctIndex: 0, explanation: 'essen takes haben.', level: 'A1' },
  { id: 'k10q4', question: 'The participle of "spielen" is:', options: ['spielt', 'gespielt', 'gespielen', 'spielte'], correctIndex: 1, explanation: 'gespielt.', level: 'A1' },
  { id: 'k10q5', question: '"gestern" means:', options: ['today', 'tomorrow', 'yesterday', 'now'], correctIndex: 2, explanation: 'gestern = yesterday.', level: 'A1' },
  { id: 'k10q6', question: '"Wir sind gefahren" uses "sein" because "fahren" is:', options: ['a modal', 'a movement verb', 'irregular only', 'reflexive'], correctIndex: 1, explanation: 'Movement → sein.', level: 'A1' },
  { id: 'k10q7', question: 'In the Perfekt, the participle goes:', options: ['in position 1', 'in position 2', 'at the end', 'after the subject'], correctIndex: 2, explanation: 'The participle is the last element.', level: 'A1' },
  { id: 'k10q8', question: '"die Reise" means:', options: ['the room', 'the trip', 'the rice', 'the price'], correctIndex: 1, explanation: 'die Reise = trip/journey.', level: 'A1' },
];

const chapter10 = makeChapter({
  n: 10, label: 'Kapitel 10', subtitle: 'The Past (Perfekt) & Travel',
  objectives: ['Talk about the past with the Perfekt', 'Choose haben or sein correctly', 'Form regular and common irregular participles', 'Describe your weekend and trips'],
  grammarSummary: 'Perfekt tense, haben vs. sein', situations: 'Talking about the weekend and past travel',
  lessons: k10Lessons, vocab: k10Vocab, drills: k10Drills, quiz: k10Quiz,
});

/* ─────────────────────────── KAPITEL 11 ────────────────────────── */
const k11Vocab: Flashcard[] = [
  { id: 'k11v1', de: 'Kleidung', en: 'clothing', gender: 'die', plural: '(meist Singular)', emoji: '👕', example: 'Die Kleidung ist neu.', exampleEn: 'The clothing is new.' },
  { id: 'k11v2', de: 'Hemd', en: 'shirt', gender: 'das', plural: 'die Hemden', emoji: '👔', example: 'Das Hemd ist weiß.', exampleEn: 'The shirt is white.' },
  { id: 'k11v3', de: 'Hose', en: 'trousers', gender: 'die', plural: 'die Hosen', emoji: '👖', example: 'Die Hose ist zu lang.', exampleEn: 'The trousers are too long.' },
  { id: 'k11v4', de: 'Rock', en: 'skirt', gender: 'der', plural: 'die Röcke', emoji: '👗', example: 'Der Rock ist schön.', exampleEn: 'The skirt is nice.' },
  { id: 'k11v5', de: 'Kleid', en: 'dress', gender: 'das', plural: 'die Kleider', emoji: '👗', example: 'Das Kleid ist rot.', exampleEn: 'The dress is red.' },
  { id: 'k11v6', de: 'Jacke', en: 'jacket', gender: 'die', plural: 'die Jacken', emoji: '🧥', example: 'Die Jacke ist warm.', exampleEn: 'The jacket is warm.' },
  { id: 'k11v7', de: 'Schuhe', en: 'shoes (pl)', gender: 'die', plural: '(Plural)', emoji: '👟', example: 'Die Schuhe sind neu.', exampleEn: 'The shoes are new.' },
  { id: 'k11v8', de: 'Pullover', en: 'sweater', gender: 'der', plural: 'die Pullover', emoji: '🧶', example: 'Der Pullover ist blau.', exampleEn: 'The sweater is blue.' },
  { id: 'k11v9', de: 'teuer', en: 'expensive', emoji: '💰', example: 'Die Jacke ist teuer.', exampleEn: 'The jacket is expensive.' },
  { id: 'k11v10', de: 'billig', en: 'cheap', emoji: '🏷️', example: 'Das Hemd ist billig.', exampleEn: 'The shirt is cheap.' },
  { id: 'k11v11', de: 'groß', en: 'big / tall', emoji: '📏', example: 'Der Pullover ist zu groß.', exampleEn: 'The sweater is too big.' },
  { id: 'k11v12', de: 'klein', en: 'small', emoji: '🤏', example: 'Die Schuhe sind zu klein.', exampleEn: 'The shoes are too small.' },
  { id: 'k11v13', de: 'tragen', en: 'to wear', emoji: '🧍', example: 'Ich trage eine Jacke.', exampleEn: 'I’m wearing a jacket.' },
  { id: 'k11v14', de: 'anprobieren', en: 'to try on', emoji: '🔁', example: 'Ich probiere die Hose an.', exampleEn: 'I try on the trousers.' },
  { id: 'k11v15', de: 'Größe', en: 'size', gender: 'die', plural: 'die Größen', emoji: '📐', example: 'Welche Größe haben Sie?', exampleEn: 'What size are you?' },
  { id: 'k11v16', de: 'kosten', en: 'to cost', emoji: '💶', example: 'Was kostet das Kleid?', exampleEn: 'How much is the dress?' },
];

const k11Lessons: Item[] = [
  { id: 'k11-l1', text: 'Grammar — comparatives & superlatives', content: [
    { kind: 'para', text: 'To compare, add **-er** (comparative) and **am …-sten** (superlative). Some short adjectives add an umlaut.' },
    { kind: 'table', headers: ['Adjective', 'Comparative', 'Superlative'], rows: [
      ['klein', 'kleiner', 'am kleinsten'],
      ['groß', 'größer', 'am größten'],
      ['teuer', 'teurer', 'am teuersten'],
      ['gut', 'besser', 'am besten'],
    ] },
    { kind: 'callout', tone: 'warn', text: 'Irregulars to memorise: **gut → besser → am besten**, **viel → mehr → am meisten**, **gern → lieber → am liebsten**.' },
  ] },
  { id: 'k11-l2', text: 'Grammar — comparing with als and wie', content: [
    { kind: 'examples', items: [
      { de: 'Die Jacke ist teurer **als** das Hemd.', en: 'The jacket is more expensive than the shirt.' },
      { de: 'Der Rock ist so schön **wie** das Kleid.', en: 'The skirt is as nice as the dress.' },
    ] },
    { kind: 'callout', tone: 'tip', text: 'Use **als** for "than" (unequal) and **so … wie** for "as … as" (equal).' },
  ] },
  { id: 'k11-l3', text: 'Grammar — shopping for clothes', content: [
    { kind: 'examples', items: [
      { de: 'Was kostet der Pullover?', en: 'How much is the sweater?' },
      { de: 'Welche Größe haben Sie?', en: 'What size are you?' },
      { de: 'Kann ich das anprobieren?', en: 'Can I try this on?' },
    ] },
  ] },
];

const k11Drills: Drill[] = [
  { id: 'k11d1', kind: 'blank', prompt: 'Das Kleid ist ___ als die Hose. (teuer)', gloss: 'comparative', answer: 'teurer', explanation: 'teuer → teurer (drops the e).' },
  { id: 'k11d2', kind: 'blank', prompt: 'gut → ___ → am besten', gloss: 'irregular comparative', answer: 'besser', options: ['guter', 'besser', 'mehr'], explanation: 'gut → besser → am besten.' },
  { id: 'k11d3', kind: 'blank', prompt: 'Der Pullover ist zu ___. (big)', gloss: 'adjective', answer: 'groß', explanation: 'groß = big.' },
  { id: 'k11d4', kind: 'blank', prompt: 'Die Jacke ist teurer ___ das Hemd. (than)', gloss: 'comparison word', answer: 'als', options: ['als', 'wie', 'so'], explanation: '"than" after a comparative = als.' },
  { id: 'k11d5', kind: 'order', prompt: 'Build: "How much is the dress?"', gloss: 'shopping', tokens: ['das', 'Was', 'Kleid', 'kostet'], solution: ['Was', 'kostet', 'das', 'Kleid'], explanation: 'Was kostet das Kleid?' },
  { id: 'k11d6', kind: 'blank', prompt: 'Das ist das ___ Kleid. (nicest — superlative)', gloss: 'superlative adjective', answer: 'schönste', explanation: 'schön → das schönste (superlative before a noun).' },
  { id: 'k11d7', kind: 'blank', prompt: 'Ich ___ eine Jacke. (wear)', gloss: 'tragen', answer: 'trage', explanation: 'ich trage.' },
];

const k11Quiz: QuizQuestion[] = [
  { id: 'k11q1', question: 'The comparative of "klein" is:', options: ['kleiner', 'kleinst', 'am kleinen', 'mehr klein'], correctIndex: 0, explanation: 'klein → kleiner.', level: 'A1' },
  { id: 'k11q2', question: '"billig" means:', options: ['expensive', 'cheap', 'big', 'small'], correctIndex: 1, explanation: 'billig = cheap.', level: 'A1' },
  { id: 'k11q3', question: 'The comparative of "gut" is:', options: ['guter', 'gutter', 'besser', 'mehr gut'], correctIndex: 2, explanation: 'gut → besser (irregular).', level: 'A1' },
  { id: 'k11q4', question: '"die Hose" means:', options: ['jacket', 'shirt', 'trousers', 'dress'], correctIndex: 2, explanation: 'die Hose = trousers.', level: 'A1' },
  { id: 'k11q5', question: 'The superlative of "groß" is:', options: ['größer', 'am größten', 'am großsten', 'groß'], correctIndex: 1, explanation: 'groß → größer → am größten.', level: 'A1' },
  { id: 'k11q6', question: '"tragen" means:', options: ['to buy', 'to wear', 'to try', 'to cost'], correctIndex: 1, explanation: 'tragen = to wear.', level: 'A1' },
  { id: 'k11q7', question: '"than" in a comparison is:', options: ['wie', 'als', 'so', 'dann'], correctIndex: 1, explanation: 'als = than (unequal comparison).', level: 'A1' },
  { id: 'k11q8', question: '"Was kostet das?" means:', options: ['What is that?', 'How much is that?', 'Where is that?', 'Which is that?'], correctIndex: 1, explanation: 'kosten = to cost → how much is it.', level: 'A1' },
];

const chapter11 = makeChapter({
  n: 11, label: 'Kapitel 11', subtitle: 'Clothing & Comparisons',
  objectives: ['Name clothing items and sizes', 'Form comparatives and superlatives', 'Compare with als and so … wie', 'Shop for clothes'],
  grammarSummary: 'comparatives, superlatives, adjectives', situations: 'Shopping for clothes, comparing prices',
  lessons: k11Lessons, vocab: k11Vocab, drills: k11Drills, quiz: k11Quiz,
});

/* ─────────────────────────── KAPITEL 12 ────────────────────────── */
const k12Vocab: Flashcard[] = [
  { id: 'k12v1', de: 'Hotel', en: 'hotel', gender: 'das', plural: 'die Hotels', emoji: '🏨', example: 'Das Hotel ist am Meer.', exampleEn: 'The hotel is by the sea.' },
  { id: 'k12v2', de: 'Zimmer', en: 'room', gender: 'das', plural: 'die Zimmer', emoji: '🛎️', example: 'Ich möchte ein Zimmer.', exampleEn: 'I’d like a room.' },
  { id: 'k12v3', de: 'buchen', en: 'to book', emoji: '📖', example: 'Ich habe ein Hotel gebucht.', exampleEn: 'I booked a hotel.' },
  { id: 'k12v4', de: 'reservieren', en: 'to reserve', emoji: '✅', example: 'Ich möchte reservieren.', exampleEn: 'I’d like to reserve.' },
  { id: 'k12v5', de: 'Koffer', en: 'suitcase', gender: 'der', plural: 'die Koffer', emoji: '🧳', example: 'Der Koffer ist schwer.', exampleEn: 'The suitcase is heavy.' },
  { id: 'k12v6', de: 'Pass', en: 'passport', gender: 'der', plural: 'die Pässe', emoji: '🛂', example: 'Wo ist mein Pass?', exampleEn: 'Where is my passport?' },
  { id: 'k12v7', de: 'Fahrkarte', en: 'ticket', gender: 'die', plural: 'die Fahrkarten', emoji: '🎫', example: 'Ich kaufe eine Fahrkarte.', exampleEn: 'I buy a ticket.' },
  { id: 'k12v8', de: 'ankommen', en: 'to arrive', emoji: '🛬', example: 'Der Zug kommt um 9 an.', exampleEn: 'The train arrives at 9.' },
  { id: 'k12v9', de: 'abfahren', en: 'to depart', emoji: '🚉', example: 'Der Bus fährt um 8 ab.', exampleEn: 'The bus departs at 8.' },
  { id: 'k12v10', de: 'Flughafen', en: 'airport', gender: 'der', plural: 'die Flughäfen', emoji: '🛫', example: 'Wir sind am Flughafen.', exampleEn: 'We’re at the airport.' },
  { id: 'k12v11', de: 'Meer', en: 'sea', gender: 'das', plural: 'die Meere', emoji: '🌊', example: 'Wir fahren ans Meer.', exampleEn: 'We’re going to the sea.' },
  { id: 'k12v12', de: 'Strand', en: 'beach', gender: 'der', plural: 'die Strände', emoji: '🏖️', example: 'Der Strand ist schön.', exampleEn: 'The beach is beautiful.' },
  { id: 'k12v13', de: 'Sonne', en: 'sun', gender: 'die', plural: 'die Sonnen', emoji: '☀️', example: 'Die Sonne scheint.', exampleEn: 'The sun is shining.' },
  { id: 'k12v14', de: 'Empfang', en: 'reception', gender: 'der', plural: 'die Empfänge', emoji: '🛎️', example: 'Der Empfang ist unten.', exampleEn: 'Reception is downstairs.' },
  { id: 'k12v15', de: 'Übernachtung', en: 'overnight stay', gender: 'die', plural: 'die Übernachtungen', emoji: '🌙', example: 'Die Übernachtung kostet 80 Euro.', exampleEn: 'The overnight stay costs 80 euros.' },
  { id: 'k12v16', de: 'die Karte', en: 'map / ticket', gender: 'die', plural: 'die Karten', emoji: '🗺️', example: 'Ich brauche eine Karte.', exampleEn: 'I need a map.' },
];

const k12Lessons: Item[] = [
  { id: 'k12-l1', text: 'Grammar — booking & reserving (möchten recap)', content: [
    { kind: 'examples', items: [
      { de: 'Ich möchte ein Zimmer reservieren.', en: 'I’d like to reserve a room.' },
      { de: 'Haben Sie ein Zimmer frei?', en: 'Do you have a room available?' },
      { de: 'Für wie viele Nächte?', en: 'For how many nights?' },
    ] },
    { kind: 'callout', tone: 'tip', text: 'Note the **Satzklammer**: `Ich möchte ein Zimmer **reservieren**` — the infinitive goes to the end.' },
  ] },
  { id: 'k12-l2', text: 'Grammar — separable verbs at the station (ankommen / abfahren)', content: [
    { kind: 'para', text: 'Travel verbs are often **separable** — the prefix jumps to the end.' },
    { kind: 'examples', items: [
      { de: 'Der Zug **kommt** um 9 Uhr **an**.', en: 'The train arrives at 9.' },
      { de: 'Der Bus **fährt** um 8 Uhr **ab**.', en: 'The bus departs at 8.' },
    ] },
  ] },
  { id: 'k12-l3', text: 'Revision — the three cases at a glance', content: [
    { kind: 'table', caption: 'Final A1 case recap (masculine der)', headers: ['Case', 'Question', 'Article', 'Example'], rows: [
      ['Nominativ', 'Wer?', 'der', 'Der Mann kommt.'],
      ['Akkusativ', 'Wen?', 'den', 'Ich sehe den Mann.'],
      ['Dativ', 'Wem?', 'dem', 'Ich helfe dem Mann.'],
    ] },
    { kind: 'callout', tone: 'tip', text: 'This recap covers everything from Kapitel 1–12. If a case still feels shaky, revisit Test 1 (Akkusativ & Dativ) and Kapitel 4.' },
  ] },
];

const k12Drills: Drill[] = [
  { id: 'k12d1', kind: 'blank', prompt: 'Ich möchte ein Zimmer ___. (reserve)', gloss: 'infinitive at the end', answer: 'reservieren', explanation: 'Satzklammer: … reservieren.' },
  { id: 'k12d2', kind: 'order', prompt: 'Build: "I booked a hotel."', gloss: 'Perfekt', tokens: ['ein', 'Hotel', 'Ich', 'gebucht', 'habe'], solution: ['Ich', 'habe', 'ein', 'Hotel', 'gebucht'], explanation: 'Ich habe ein Hotel gebucht.' },
  { id: 'k12d3', kind: 'blank', prompt: 'Der Zug ___ um 9 Uhr an. (arrive)', gloss: 'separable verb', answer: 'kommt', explanation: 'ankommen splits: kommt … an.' },
  { id: 'k12d4', kind: 'blank', prompt: 'Wo ist der ___? (reception)', gloss: 'hotel', answer: 'Empfang', explanation: 'der Empfang = reception.' },
  { id: 'k12d5', kind: 'blank', prompt: 'Ich helfe ___ Mann. (Dativ, recap)', gloss: 'case revision', answer: 'dem', options: ['der', 'den', 'dem'], explanation: 'helfen + Dativ: dem Mann.' },
  { id: 'k12d6', kind: 'order', prompt: 'Build: "We’re going to the sea."', gloss: 'travel', tokens: ['ans', 'fahren', 'Wir', 'Meer'], solution: ['Wir', 'fahren', 'ans', 'Meer'], explanation: 'Wir fahren ans Meer.' },
  { id: 'k12d7', kind: 'blank', prompt: 'Ich brauche eine ___ für den Zug. (ticket)', gloss: 'travel', answer: 'Fahrkarte', explanation: 'die Fahrkarte = ticket.' },
];

const k12Quiz: QuizQuestion[] = [
  { id: 'k12q1', question: '"buchen" means:', options: ['to read', 'to book', 'to cook', 'to pay'], correctIndex: 1, explanation: 'buchen = to book.', level: 'A1' },
  { id: 'k12q2', question: '"der Koffer" is the:', options: ['coffee', 'suitcase', 'ticket', 'passport'], correctIndex: 1, explanation: 'der Koffer = suitcase.', level: 'A1' },
  { id: 'k12q3', question: '"ankommen" means:', options: ['to depart', 'to arrive', 'to book', 'to pack'], correctIndex: 1, explanation: 'ankommen = to arrive.', level: 'A1' },
  { id: 'k12q4', question: 'In "Der Zug kommt um 9 an", the separable prefix is:', options: ['der', 'um', 'an', 'kommt'], correctIndex: 2, explanation: 'ankommen → kommt … an.', level: 'A1' },
  { id: 'k12q5', question: 'Polite way to reserve a room:', options: ['Ich will ein Zimmer', 'Gib mir ein Zimmer', 'Ich möchte ein Zimmer reservieren', 'Ein Zimmer!'], correctIndex: 2, explanation: 'Ich möchte … reservieren is polite.', level: 'A1' },
  { id: 'k12q6', question: '"der Strand" means:', options: ['street', 'beach', 'sea', 'sand'], correctIndex: 1, explanation: 'der Strand = beach.', level: 'A1' },
  { id: 'k12q7', question: 'The Dativ question word is:', options: ['Wer?', 'Wen?', 'Wem?', 'Was?'], correctIndex: 2, explanation: 'Dativ answers Wem? (to whom).', level: 'A1' },
  { id: 'k12q8', question: '"die Fahrkarte" is the:', options: ['map', 'ticket', 'card', 'menu'], correctIndex: 1, explanation: 'die Fahrkarte = travel ticket.', level: 'A1' },
];

const chapter12 = makeChapter({
  n: 12, label: 'Kapitel 12', subtitle: 'Travel, Hotel & Final Revision',
  objectives: ['Book a hotel and reserve a room', 'Handle the station and airport', 'Use separable travel verbs', 'Revise the three A1 cases'],
  grammarSummary: 'booking phrases, separable verbs, case revision', situations: 'Booking a hotel, travelling, final A1 review',
  lessons: k12Lessons, vocab: k12Vocab, drills: k12Drills, quiz: k12Quiz,
});

export const GERMAN_CHAPTERS_BEFORE: StudyModule[] = [chapter1, chapter2, chapter3, chapter4];
export const GERMAN_CHAPTERS_AFTER: StudyModule[] = [chapter8, chapter9, chapter10, chapter11, chapter12];
