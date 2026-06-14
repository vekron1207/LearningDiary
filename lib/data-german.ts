import type { Phase, Resource } from './types';

/* ════════════════════════════════════════════════════════
   RESOURCES
   ════════════════════════════════════════════════════════ */
export const DE_RESOURCES: Resource[] = [
  /* Apps & Tools */
  { id: 'der1', text: 'Duolingo — German course (good for daily habit)', url: 'https://www.duolingo.com/course/de/en/Learn-German' },
  { id: 'der2', text: 'Anki — spaced-repetition flashcards (download a German deck)', url: 'https://ankiweb.net/shared/decks/german' },
  { id: 'der3', text: 'Clozemaster — fill-in-the-blank sentences by frequency', url: 'https://www.clozemaster.com/l/deu-eng' },
  { id: 'der4', text: 'Leo.org — comprehensive German-English dictionary', url: 'https://www.leo.org/german-english' },
  { id: 'der5', text: 'dict.cc — quick German-English lookup with forums', url: 'https://www.dict.cc' },
  /* Grammar References */
  { id: 'der6', text: 'Deutschakademie — free grammar exercises online', url: 'https://www.deutschakademie.de/online-deutschkurs' },
  { id: 'der7', text: 'German Grammar in a Nutshell (dartmouth.edu)', url: 'https://sites.dartmouth.edu/german/german-grammar-in-a-nutshell' },
  { id: 'der8', text: 'Canoo — detailed German grammar & morphology reference', url: 'http://canoo.net' },
  /* DW (Deutsche Welle) */
  { id: 'der9',  text: 'DW Nicos Weg — A1–B1 video course with exercises', url: 'https://learngerman.dw.com/en/nicos-weg/c-36519789' },
  { id: 'der10', text: 'DW Learn German — full A1–C1 materials', url: 'https://learngerman.dw.com/en/learn-german/s-9095' },
  /* YouTube */
  { id: 'der11', text: 'Easy German — street interviews with subtitles (immersion)', url: 'https://www.youtube.com/@EasyGerman' },
  { id: 'der12', text: 'Deutsch mit Marija — grammar explanations in German & English', url: 'https://www.youtube.com/@DeutschmitMarija' },
  { id: 'der13', text: 'Grammatik erklärt — concise grammar video series', url: 'https://www.youtube.com/@GrammatikerklaertTV' },
  /* Podcasts & Listening */
  { id: 'der14', text: 'Slow German mit Annik Rubens — beginner-friendly podcast', url: 'https://slowgerman.com' },
  { id: 'der15', text: 'Coffee Break German — structured podcast A1–B2', url: 'https://coffebreakgerman.com' },
  { id: 'der16', text: 'Deutsch Warum Nicht? — DW classic audio course', url: 'https://learngerman.dw.com/en/deutsch-warum-nicht/c-37254528' },
  /* Reading */
  { id: 'der17', text: 'Nachrichtenleicht — weekly news in simple German', url: 'https://www.nachrichtenleicht.de' },
  { id: 'der18', text: 'Deutsche Welle — Top-Thema (reading texts with audio, B1+)', url: 'https://learngerman.dw.com/en/top-thema/s-11421' },
];

/* ════════════════════════════════════════════════════════
   PHASE 1 — A1 BASICS
   ════════════════════════════════════════════════════════ */
const phaseA1: Phase = {
  id: 'de-a1',
  label: 'A1 — Basics',
  weeks: 'Level A1',
  theme: 'success',
  sections: [
    {
      id: 'de-a1-alphabet',
      title: 'Alphabet & Pronunciation',
      week: 'Week 1',
      items: [
        {
          id: 'de-a1-alph-1',
          text: 'Learn the German alphabet — 26 letters + 4 special characters (Ä, Ö, Ü, ß)',
          note: 'Umlaut sounds: Ä ≈ "eh", Ö ≈ "ur" (rounded), Ü ≈ "ee" (rounded). ß = "ss".',
          details: 'The German alphabet is the same 26 letters as English plus:\n  • Ä (a-umlaut) — like "e" in "bed"\n  • Ö (o-umlaut) — like French "eu", say "e" with rounded lips\n  • Ü (u-umlaut) — like French "u", say "ee" with rounded lips\n  • ß (Eszett / sharp S) — always sounds like "ss"; used after long vowels & diphthongs\n\nCapital ß (ẞ) exists but rarely used. In Switzerland, ß is replaced by "ss" entirely.',
        },
        {
          id: 'de-a1-alph-2',
          text: 'Master vowel sounds — short vs long vowels change meaning (Stahl vs stall)',
          note: 'Double vowels (aa, ee, oo) or h after vowel = long. Single vowel before double consonant = short.',
          details: 'Short vowels: bitte, Mutter, Bett, Gott, Hund\nLong vowels: biete, Muter (rare), Boot, Beet, Stuhl\n\nRules for length:\n  • Single consonant after vowel → usually long: kam, Ton\n  • Double consonant after vowel → short: kann, Tonne\n  • -ie- is always long: Liebe, viel\n  • h after vowel = length marker: gehen, fahren (the h is silent)',
        },
        {
          id: 'de-a1-alph-3',
          text: 'Learn consonant pronunciation rules — ch, sch, sp, st, z, w, v',
          note: 'German W = English V. German V ≈ English F. Z = "ts". ch has two sounds (ich vs Bach).',
          details: 'Key differences from English:\n  • w → "v" sound: Wasser, Wein\n  • v → "f" sound: Vater, Vogel (but "v" in foreign words: Villa)\n  • z → "ts": Zeit, Zug, Pizza\n  • sp at start of word → "shp": Sprache, Sport\n  • st at start of word → "sht": Stadt, Stuhl\n  • sch → "sh": Schule, Schiff\n  • ch after a/o/u/au → guttural "Bach-sound": Bach, doch\n  • ch after e/i/ä/ö/ü → soft "ich-sound": ich, nicht, Milch\n  • r → slightly rolled or guttural, not English r',
        },
        {
          id: 'de-a1-alph-4',
          text: 'Practice with tongue-twisters and minimal pairs to train your ear',
          url: 'https://www.germanpod101.com/german-tongue-twisters/',
          note: 'Classic: "Fischers Fritz fischt frische Fische." Focus on s vs sch, r, ch.',
        },
      ],
    },
    {
      id: 'de-a1-greetings',
      title: 'Greetings & Introductions',
      week: 'Week 1',
      items: [
        {
          id: 'de-a1-greet-1',
          text: 'Formal vs informal greetings — Sie vs du, Guten Tag vs Hallo',
          note: 'Sie (capitalized) = formal "you". du = informal. Always use Sie with strangers, bosses, elders.',
          details: 'Formal greetings:\n  • Guten Morgen — Good morning\n  • Guten Tag — Good day / Hello (daytime)\n  • Guten Abend — Good evening\n  • Auf Wiedersehen — Goodbye (formal)\n  • Wie geht es Ihnen? — How are you? (formal)\n\nInformal:\n  • Hallo — Hello\n  • Hi — Hi\n  • Tschüss / Ciao — Bye\n  • Wie geht es dir? / Wie geht\'s? — How are you?\n\nRegional:\n  • Servus — hello/bye in Bavaria & Austria\n  • Moin — hello in northern Germany\n  • Grüß Gott — hello in Bavaria/Austria (formal)',
        },
        {
          id: 'de-a1-greet-2',
          text: 'Introduce yourself — Ich heiße / Ich bin, Ich komme aus, Ich wohne in',
          note: 'Heiße = "am called" (from heißen). Bin = "am" (from sein). Both work for introductions.',
          details: 'Basic introduction template:\n  Hallo! Ich heiße [Name]. (Hello! My name is [Name].)\n  Ich bin [Name]. (I am [Name].)\n  Ich komme aus [Land/Stadt]. (I come from [country/city].)\n  Ich wohne in [Stadt]. (I live in [city].)\n  Ich bin [Alter] Jahre alt. (I am [age] years old.)\n  Ich spreche Englisch und etwas Deutsch. (I speak English and some German.)\n  Ich lerne Deutsch. (I\'m learning German.)\n\nAsking others:\n  Wie heißen Sie? / Wie heißt du? — What is your name?\n  Woher kommen Sie? / Woher kommst du? — Where are you from?\n  Wo wohnen Sie? / Wo wohnst du? — Where do you live?',
        },
        {
          id: 'de-a1-greet-3',
          text: 'Numbers 1–100 — eins bis hundert',
          note: 'German numbers are mostly logical. 13–19: dreizehn...neunzehn. 21 = einundzwanzig (one-and-twenty).',
          details: '1-12: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf\n13-19: dreizehn, vierzehn, fünfzehn, sechzehn, siebzehn, achtzehn, neunzehn\n20, 30...: zwanzig, dreißig, vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig\n100: hundert\n\nCompound numbers (21–99) = [ones]und[tens]:\n  21 = einundzwanzig\n  35 = fünfunddreißig\n  99 = neunundneunzig\n\nNote: "eins" = standalone 1; before nouns it becomes "ein/eine/einen" (article).\nFor phone numbers, Germans often say digits in pairs: 42 36 78.',
        },
        {
          id: 'de-a1-greet-4',
          text: 'Days of the week and months — Wochentage und Monate',
          note: 'All days end in -tag (day). Months mostly similar to English.',
          details: 'Days (Montag = Monday, not starting Sunday):\n  Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag (or Sonnabend), Sonntag\n\nMonths:\n  Januar, Februar, März, April, Mai, Juni,\n  Juli, August, September, Oktober, November, Dezember\n\nUseful phrases:\n  Heute ist Montag. — Today is Monday.\n  Welcher Tag ist heute? — What day is today?\n  Am Montag — on Monday (am = an + dem)\n  Im Januar — in January (im = in + dem)',
        },
      ],
    },
    {
      id: 'de-a1-articles',
      title: 'Articles & Noun Gender (der/die/das)',
      week: 'Week 2',
      items: [
        {
          id: 'de-a1-art-1',
          text: 'Understand grammatical gender — every German noun is masculine, feminine, or neuter',
          note: 'Gender must be memorized with every noun. No perfect rule — learn noun + article together.',
          details: 'German has three grammatical genders:\n  • Masculine (der): der Mann (the man), der Hund (the dog), der Tisch (the table)\n  • Feminine (die): die Frau (the woman), die Katze (the cat), die Lampe (the lamp)\n  • Neuter (das): das Kind (the child), das Buch (the book), das Auto (the car)\n\nAlways learn: "der/die/das [Nomen]" — not just the noun alone!\nGender determines article forms, adjective endings, and pronoun usage.\n\nHelpful patterns (not rules, but tendencies):\n  • -ung, -heit, -keit, -schaft, -tion → die (feminine)\n  • -er (agent nouns), -ismus → der (masculine)\n  • -chen, -lein (diminutives), -ment, -um → das (neuter)\n  • Infinitives used as nouns → das: das Essen, das Schlafen',
        },
        {
          id: 'de-a1-art-2',
          text: 'Definite articles (der/die/das) vs indefinite articles (ein/eine/ein)',
          note: '"Ein" has no masculine/neuter distinction in nominative. "kein" = not a / no (negative of ein).',
          details: 'Definite (the):\n  Masculine: der   Feminine: die   Neuter: das   Plural: die\n\nIndefinite (a/an):\n  Masculine: ein   Feminine: eine   Neuter: ein   Plural: — (no indefinite plural)\n\nNegation (no/not a):\n  Masculine: kein   Feminine: keine   Neuter: kein   Plural: keine\n\nExamples:\n  der Hund / ein Hund / kein Hund\n  die Katze / eine Katze / keine Katze\n  das Kind / ein Kind / kein Kind\n  die Kinder / — Kinder / keine Kinder',
        },
        {
          id: 'de-a1-art-3',
          text: 'Plural forms — German has 5+ plural patterns (no single rule)',
          note: 'Plural is always "die" for definite article. Learn plural form with each noun.',
          details: 'Main plural patterns:\n  1. No change: der Lehrer → die Lehrer (many -er nouns)\n  2. Add -e: der Tag → die Tage, die Hand → die Hände (often + umlaut)\n  3. Add -er: das Kind → die Kinder, das Buch → die Bücher (+umlaut)\n  4. Add -en/-n: die Frau → die Frauen, die Blume → die Blumen\n  5. Add -s (foreign words): das Auto → die Autos, das Café → die Cafés\n  6. Umlaut only: der Vater → die Väter, die Mutter → die Mütter\n\nDictionaries list plural in parentheses: Mann (¨,er) → Männer',
        },
        {
          id: 'de-a1-art-4',
          text: 'Essential A1 vocabulary — 100 most common German nouns',
          url: 'https://www.germanveryeasy.com/most-common-german-nouns',
          note: 'Focus on: Haus, Mann, Frau, Kind, Tag, Jahr, Zeit, Hand, Stadt, Land, Welt, Leben.',
          details: 'High-frequency nouns to learn with articles:\n  der Mann (man), die Frau (woman), das Kind (child)\n  das Haus (house), die Wohnung (apartment)\n  der Tag (day), die Nacht (night), die Zeit (time), das Jahr (year)\n  die Stadt (city), das Land (country), die Welt (world)\n  der Freund/die Freundin (friend/boyfriend/girlfriend)\n  die Arbeit (work), das Geld (money), die Schule (school)\n  das Essen (food/eating), das Wasser (water), das Brot (bread)\n  der Weg (way/path), die Straße (street), der Bahnhof (train station)',
        },
      ],
    },
    {
      id: 'de-a1-sentences',
      title: 'Basic Sentence Structure',
      week: 'Week 2–3',
      items: [
        {
          id: 'de-a1-sent-1',
          text: 'Subject-Verb-Object order (SVO) — and the verb-second (V2) rule',
          note: 'In a main clause, the conjugated verb is ALWAYS in position 2. Subject can move to position 1 or later.',
          details: 'German main clauses: the finite verb must be in second position (V2 rule).\nThis means if something other than the subject starts the sentence, the subject and verb invert.\n\nSVO (normal): Ich esse einen Apfel. (I eat an apple.)\nV2 with adverb first: Heute esse ich einen Apfel. (Today I eat an apple.)\n  → "heute" is position 1, "esse" stays in position 2, "ich" moves to 3\n\nThis is fundamentally different from English, where adverbs don\'t cause inversion.\n\nIn questions (yes/no): verb goes to position 1:\n  Isst du einen Apfel? — Do you eat an apple?\nW-questions: W-word + verb + subject:\n  Was isst du? — What do you eat?',
        },
        {
          id: 'de-a1-sent-2',
          text: 'Present tense conjugation of sein (to be) and haben (to have)',
          note: 'These are the two most important verbs. Sein is highly irregular.',
          details: 'SEIN (to be) — highly irregular:\n  ich bin        wir sind\n  du bist        ihr seid\n  er/sie/es ist  sie/Sie sind\n\nHABEN (to have) — mostly regular:\n  ich habe       wir haben\n  du hast        ihr habt\n  er/sie/es hat  sie/Sie haben\n\nUsage:\n  Ich bin müde. — I am tired.\n  Er ist 25 Jahre alt. — He is 25 years old.\n  Wir haben ein Auto. — We have a car.\n  Sie hat einen Bruder. — She has a brother.\n\nBoth are also used as auxiliary verbs in Perfekt (past tense) later.',
        },
        {
          id: 'de-a1-sent-3',
          text: 'Regular verb conjugation in present tense — -en stem verbs',
          note: 'Remove -en from infinitive → stem. Add endings: -e, -st, -t, -en, -t, -en.',
          details: 'Pattern: infinitive ends in -en (machen, spielen, wohnen)\nStem = infinitive minus -en\n\nEndings:\n  ich    → -e      (ich mache)\n  du     → -st     (du machst)\n  er/sie/es → -t  (er macht)\n  wir    → -en     (wir machen)\n  ihr    → -t      (ihr macht)\n  sie/Sie → -en   (sie machen)\n\nCommon regular verbs:\n  machen (to do/make), spielen (to play), wohnen (to live/reside)\n  arbeiten (to work) — stem ends in t/d: add -e- before -st/-t: du arbeitest\n  kaufen (to buy), trinken (to drink), lernen (to learn), kommen (to come)',
        },
        {
          id: 'de-a1-sent-4',
          text: 'Negation with nicht and kein',
          note: '"Nicht" negates verbs, adjectives, adverbs. "Kein" negates nouns (replaces ein/keine).',
          details: 'NICHT — negates everything except nouns with an article:\n  Ich verstehe nicht. — I don\'t understand.\n  Das ist nicht richtig. — That\'s not correct.\n  Er kommt nicht. — He\'s not coming.\n\nPosition of nicht:\n  • Usually at the END or before the word it negates\n  • Before predicative adjectives: Das ist nicht gut.\n  • After time expressions: Ich gehe heute nicht.\n  • Before infinitives/participles at end: Ich kann das nicht machen.\n\nKEIN — negates nouns (like "not a" or "no"):\n  Ich habe kein Geld. — I have no money.\n  Das ist keine Katze. — That\'s not a cat.\n  Ich habe keinen Bruder. — I don\'t have a brother.\n\nRule: use kein wherever you would use ein/eine in the positive.',
        },
        {
          id: 'de-a1-sent-5',
          text: 'Simple questions — W-Fragen and yes/no questions',
          note: 'W-words: wer (who), was (what), wo (where), wann (when), wie (how), warum (why), woher (where from), wohin (where to).',
          details: 'Yes/No questions: invert subject and verb\n  Du sprichst Deutsch. → Sprichst du Deutsch?\n  Er hat ein Auto. → Hat er ein Auto?\n\nW-Questions: W-word + verb + subject + ...\n  Was machst du? — What are you doing?\n  Wer ist das? — Who is that?\n  Wo wohnst du? — Where do you live?\n  Woher kommst du? — Where are you from?\n  Wohin gehst du? — Where are you going?\n  Wann kommst du? — When are you coming?\n  Wie heißt du? — What\'s your name?\n  Wie viel kostet das? — How much does that cost?\n  Warum lernst du Deutsch? — Why are you learning German?',
        },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════
   PHASE 2 — A2 EVERYDAY GERMAN
   ════════════════════════════════════════════════════════ */
const phaseA2: Phase = {
  id: 'de-a2',
  label: 'A2 — Everyday',
  weeks: 'Level A2',
  theme: 'info',
  sections: [
    {
      id: 'de-a2-cases',
      title: 'Cases — Nominativ & Akkusativ',
      week: 'Week 3–4',
      items: [
        {
          id: 'de-a2-case-1',
          text: 'Understand grammatical cases — German has 4 cases that change articles and adjectives',
          note: 'Cases show the role of a noun in the sentence. Nominativ = subject. Akkusativ = direct object.',
          details: 'German 4 cases:\n  1. Nominativ — subject of the sentence (who/what does the action)\n  2. Akkusativ — direct object (who/what is affected by the action)\n  3. Dativ — indirect object (to whom / for whom)\n  4. Genitiv — possession (whose)\n\nThe case system is one of the biggest differences from English.\nCases change the article form but NOT the noun itself (mostly).\n\nExample: der Mann (nom) / den Mann (acc)\n  Subject: Der Mann kauft den Hund. — The man buys the dog.\n  → "der Mann" = nominativ (subject), "den Hund" = akkusativ (direct object)',
        },
        {
          id: 'de-a2-case-2',
          text: 'Nominativ vs Akkusativ article changes — only masculine changes (der → den)',
          note: 'Only masculine definite/indefinite article changes in Akkusativ: der→den, ein→einen. Feminine/neuter/plural stay the same.',
          details: 'Article changes Nominativ → Akkusativ:\n\n         Nom.    Akk.\n  Masc:  der  →  den   |  ein  →  einen  |  kein →  keinen\n  Fem:   die  →  die   |  eine →  eine   |  keine → keine\n  Neut:  das  →  das   |  ein  →  ein    |  kein  → kein\n  Plur:  die  →  die   |  —   →  —      |  keine → keine\n\nOnly masculine changes! This is the most common beginner mistake.\n\nExamples:\n  Ich sehe den Mann. (acc.) — I see the man. (der→den)\n  Ich sehe die Frau. (acc.) — I see the woman. (die stays)\n  Ich kaufe einen Hund. (acc.) — I buy a dog. (ein→einen)\n  Ich habe keine Zeit. (acc.) — I have no time. (keine stays)',
        },
        {
          id: 'de-a2-case-3',
          text: 'Verbs that take Akkusativ — haben, sehen, kaufen, essen, trinken, lieben, brauchen',
          note: 'Most action verbs use Akkusativ for their object. Ask "Wen? Was?" to find the Akkusativ object.',
          details: 'Common Akkusativ verbs:\n  haben (to have): Ich habe einen Bruder.\n  sehen (to see): Ich sehe den Film.\n  kaufen (to buy): Er kauft das Buch.\n  essen (to eat): Sie isst einen Apfel.\n  trinken (to drink): Wir trinken den Kaffee.\n  lieben (to love): Er liebt die Musik.\n  brauchen (to need): Ich brauche einen Stift.\n  nehmen (to take): Nimm den Bus!\n  kennen (to know a person): Ich kenne den Mann.\n\nTest: ask "Wen? (whom?)" or "Was? (what?)" after the verb.\n  Ich kaufe ___ . → Was? → das Buch (Akk.) ✓\n\nContrast with sein/werden which take Nominativ in predicate:\n  Er ist ein guter Mann. (nom, not acc) — "ein" not "einen"',
        },
        {
          id: 'de-a2-case-4',
          text: 'Accusative prepositions — durch, für, gegen, ohne, um',
          note: 'These 5 prepositions ALWAYS take Akkusativ. Memorize the list.',
          details: 'Accusative-only prepositions (always Akkusativ after these):\n  durch — through: durch den Park\n  für — for: für einen Freund\n  gegen — against/around (time): gegen den Wind / gegen 8 Uhr\n  ohne — without: ohne einen Plan\n  um — around/at (time): um den See / um 9 Uhr\n\nMemory trick: "DUGO" + für: durch, um, gegen, ohne, für\n\nExamples in sentences:\n  Wir gehen durch den Park. — We walk through the park.\n  Das ist für dich. — That is for you.\n  Ich bin gegen die Idee. — I\'m against the idea.\n  Er reist ohne seinen Pass. — He travels without his passport.\n  Wir treffen uns um den Brunnen. — We meet around the fountain.',
        },
      ],
    },
    {
      id: 'de-a2-verbs',
      title: 'Irregular Verbs & Modal Verbs',
      week: 'Week 4–5',
      items: [
        {
          id: 'de-a2-verb-1',
          text: 'Strong (irregular) verbs with vowel changes — fahren, lesen, schlafen, treffen, sprechen',
          note: 'In du/er/sie/es forms, the stem vowel changes. Must be memorized individually.',
          details: 'Strong verbs change their stem vowel in 2nd/3rd person singular:\n\na → ä:  fahren (fahr-): du fährst, er fährt\n        schlafen: du schläfst, er schläft\n        tragen: du trägst, er trägt\n\ne → i:  sprechen: du sprichst, er spricht\n        treffen: du triffst, er trifft\n        helfen: du hilfst, er hilft\n        nehmen: du nimmst, er nimmt (also n→mm)\n\ne → ie: lesen: du liest, er liest\n        sehen: du siehst, er sieht\n        geben: du gibst... wait → e→i here\n\nCommon verbs to memorize:\n  essen: ich esse, du isst, er isst\n  werden: ich werde, du wirst, er wird\n  wissen: ich weiß, du weißt, er weiß',
        },
        {
          id: 'de-a2-verb-2',
          text: 'The 6 modal verbs — können, müssen, wollen, sollen, dürfen, mögen/möchten',
          note: 'Modal verbs pair with an infinitive at the end of the clause. All have irregular ich/er forms.',
          details: 'Modal verbs + infinitive at end:\n  Ich kann Deutsch sprechen. — I can speak German.\n\nConjugation (ich / du / er,sie,es / wir / ihr / sie):\n  können:  kann / kannst / kann / können / könnt / können  (can/be able to)\n  müssen:  muss / musst / muss / müssen / müsst / müssen  (must/have to)\n  wollen:  will / willst / will / wollen / wollt / wollen  (want to)\n  sollen:  soll / sollst / soll / sollen / sollt / sollen  (should/supposed to)\n  dürfen:  darf / darfst / darf / dürfen / dürft / dürfen  (may/allowed to)\n  mögen:   mag / magst / mag / mögen / mögt / mögen  (to like)\n  möchten: möchte / möchtest / möchte / möchten / möchtet / möchten  (would like)\n\nNote: ich/er/sie/es forms are IDENTICAL for all modals (no -t ending on er)!\n\nMöchten is technically Konjunktiv II of mögen but treated as separate modal.',
        },
        {
          id: 'de-a2-verb-3',
          text: 'Separable verbs (trennbare Verben) — anrufen, aufstehen, einladen, mitkommen',
          note: 'The prefix splits off and goes to the END of the clause in main sentences.',
          details: 'Many German verbs have prefixes that detach in main clauses:\n  anrufen (to call): Ich rufe dich an. (prefix "an" goes to end)\n  aufstehen (to get up): Er steht um 7 Uhr auf.\n  einladen (to invite): Sie lädt ihre Freunde ein.\n  mitkommen (to come along): Kommst du mit?\n  ausgehen (to go out): Wir gehen heute Abend aus.\n  aufmachen (to open): Mach bitte das Fenster auf.\n\nIn SUBORDINATE clauses, the verb stays together at the end:\n  Ich weiß, dass er früh aufsteht. — I know that he gets up early.\n\nWith modal verbs, separable verb stays together as infinitive:\n  Ich muss jetzt aufstehen. — I have to get up now.\n\nInfinitive: anrufen, aufstehen (written as one word)\nPast participle: angerufen, aufgestanden (ge- goes BETWEEN prefix and stem)',
        },
        {
          id: 'de-a2-verb-4',
          text: 'Essential A2 verb vocabulary — 50 high-frequency verbs',
          url: 'https://www.germanveryeasy.com/most-important-german-verbs',
          note: 'Priority verbs: gehen, kommen, machen, sagen, sehen, geben, nehmen, wissen, denken, finden.',
          details: 'Top verbs to know at A2:\n  gehen (to go), kommen (to come), fahren (to drive/travel)\n  machen (to make/do), sagen (to say), sprechen (to speak)\n  sehen (to see), hören (to hear), lesen (to read), schreiben (to write)\n  geben (to give), nehmen (to take), bringen (to bring), holen (to fetch)\n  denken (to think), wissen (to know facts), kennen (to know people/places)\n  finden (to find/think), glauben (to believe/think)\n  essen (to eat), trinken (to drink), schlafen (to sleep), wohnen (to live)\n  arbeiten (to work), lernen (to learn), spielen (to play), kaufen (to buy)\n  helfen (to help), fragen (to ask), antworten (to answer)\n  brauchen (to need), möchten (would like), gefallen (to please/like)',
        },
      ],
    },
    {
      id: 'de-a2-dativ',
      title: 'Dativ Case',
      week: 'Week 5–6',
      items: [
        {
          id: 'de-a2-dat-1',
          text: 'Dativ = indirect object — "to whom" or "for whom" the action happens',
          note: 'Ask "Wem?" to find the Dative object. Dativ changes all articles including feminine.',
          details: 'Article changes in Dativ:\n\n         Nom.  Akk.   Dat.\n  Masc:  der   den  →  dem  |  ein → einem\n  Fem:   die   die  →  der  |  eine → einer\n  Neut:  das   das  →  dem  |  ein → einem\n  Plur:  die   die  →  den  (+n to noun!)  |  keine → keinen\n\nKey rule: PLURAL nouns in Dativ add -n to the noun itself (if not already ending in -n or -s):\n  die Kinder → (mit) den Kindern\n  die Männer → (mit) den Männern\n  die Autos → (mit) den Autos (no extra n after -s)\n\nExamples:\n  Ich gebe dem Mann das Buch. — I give the man the book. (dem Mann = Dat.)\n  Sie hilft der Frau. — She helps the woman. (der Frau = Dat.)\n  Wir danken dem Kind. — We thank the child.',
        },
        {
          id: 'de-a2-dat-2',
          text: 'Dative prepositions — aus, bei, mit, nach, seit, von, zu, gegenüber',
          note: 'These prepositions ALWAYS take Dativ. Memorize as a set.',
          details: 'Dative-only prepositions:\n  aus — from/out of: aus dem Haus, aus Deutschland\n  bei — at/near/with: bei der Arbeit, bei meiner Mutter\n  mit — with: mit dem Auto, mit einem Freund\n  nach — after/to (cities/countries): nach der Schule, nach Berlin\n  seit — since/for (with present tense!): seit einem Jahr\n  von — from/of: von der Arbeit, von einem Freund\n  zu — to (people/places): zum Bahnhof (zu+dem), zur Schule (zu+der)\n  gegenüber — opposite: gegenüber dem Hotel\n\nContracted forms (very common):\n  zu + dem = zum: zum Supermarkt\n  zu + der = zur: zur Schule\n  bei + dem = beim: beim Arzt\n  von + dem = vom: vom Bahnhof\n  an + dem = am: am Montag, am Tisch (two-way prep)\n  in + dem = im: im Sommer, im Haus (two-way prep)',
        },
        {
          id: 'de-a2-dat-3',
          text: 'Dative verbs — helfen, danken, gehören, gefallen, glauben, schmecken, fehlen',
          note: 'Some verbs take ONLY Dative (no Accusative). The "object" is actually Dative.',
          details: 'Verbs that always take Dative (not Accusative):\n  helfen + Dat. — to help someone\n    Ich helfe dir. — I help you.\n  danken + Dat. — to thank someone\n    Er dankt ihr. — He thanks her.\n  gehören + Dat. — to belong to\n    Das Buch gehört dem Lehrer. — The book belongs to the teacher.\n  gefallen + Dat. — to please / to like (inverted from English!)\n    Das gefällt mir. — I like that. (lit: "That pleases me.")\n  schmecken + Dat. — to taste good to\n    Das schmeckt mir gut. — That tastes good to me.\n  fehlen + Dat. — to be missing/to miss\n    Du fehlst mir. — I miss you. (lit: "You are missing from me.")\n  passen + Dat. — to suit/fit\n    Das passt mir nicht. — That doesn\'t suit me.\n  glauben + Dat. — to believe someone\n    Ich glaube dir. — I believe you.',
        },
      ],
    },
    {
      id: 'de-a2-everyday',
      title: 'Everyday Vocabulary & Phrases',
      week: 'Week 6',
      items: [
        {
          id: 'de-a2-ev-1',
          text: 'Shopping and ordering food — im Supermarkt, im Restaurant',
          note: 'Key phrases: Was kostet das? Haben Sie...? Ich hätte gern... Einmal bitte.',
          details: 'Shopping:\n  Was kostet das? — How much does that cost?\n  Wie viel kostet...? — How much does ... cost?\n  Das ist zu teuer. — That\'s too expensive.\n  Haben Sie...? — Do you have...?\n  Ich suche... — I\'m looking for...\n  Wo finde ich...? — Where can I find...?\n  Kann ich mit Karte zahlen? — Can I pay by card?\n  Einen Kassenbon, bitte. — A receipt, please.\n\nRestaurant:\n  Ich hätte gern... — I\'d like... (polite order)\n  Einmal [Gericht], bitte. — One [dish], please.\n  Was empfehlen Sie? — What do you recommend?\n  Die Karte, bitte. — The menu, please.\n  Zahlen, bitte! — Bill, please!\n  Zusammen oder getrennt? — Together or separate?\n  Das stimmt so. — Keep the change.',
        },
        {
          id: 'de-a2-ev-2',
          text: 'Telling the time — Wie spät ist es? Um wie viel Uhr?',
          note: 'German uses 24h clock formally. Informally: halb drei = 2:30 (half of 3, not half past 2!).',
          details: 'Official time (24h):\n  Es ist 14:30 — vierzehn Uhr dreißig\n\nConversational time:\n  Es ist drei Uhr. — It\'s 3:00\n  Es ist Viertel nach drei. — It\'s 3:15 (quarter past)\n  Es ist halb vier. — It\'s 3:30 ← CAREFUL: "half of four" not "half past three"!\n  Es ist Viertel vor vier. — It\'s 3:45 (quarter to four)\n  Es ist kurz nach neun. — It\'s just after 9.\n  Es ist ungefähr acht. — It\'s about 8.\n\nCommon traps:\n  halb drei = 2:30 (not 3:30!)\n  halb acht = 7:30\n\nAsking time:\n  Wie spät ist es? — What time is it?\n  Um wie viel Uhr...? — At what time...?\n  Um halb sieben. — At 6:30.',
        },
        {
          id: 'de-a2-ev-3',
          text: 'Travel and directions — am Bahnhof, in der Stadt',
          note: 'Useful prepositions: links (left), rechts (right), geradeaus (straight ahead), gegenüber (opposite).',
          details: 'At the train station:\n  Wann fährt der nächste Zug nach Berlin? — When does the next train to Berlin leave?\n  Eine Fahrkarte nach München, bitte. — A ticket to Munich, please.\n  Einfach oder hin und zurück? — Single or return?\n  Von welchem Gleis? — From which platform?\n  Muss ich umsteigen? — Do I need to change trains?\n\nDirections:\n  Wie komme ich zum Bahnhof? — How do I get to the train station?\n  Gehen Sie geradeaus. — Go straight ahead.\n  Biegen Sie links/rechts ab. — Turn left/right.\n  Nehmen Sie die erste/zweite Straße links. — Take the first/second street on the left.\n  Das ist auf der linken/rechten Seite. — It\'s on the left/right side.\n  Das ist ungefähr 5 Minuten zu Fuß. — It\'s about 5 minutes on foot.',
        },
        {
          id: 'de-a2-ev-4',
          text: 'Personal pronouns in all cases — ich/mich/mir, du/dich/dir, etc.',
          note: 'Pronouns change form depending on case, just like articles.',
          details: '           Nom.   Akk.   Dat.\n  ich      →  ich    mich   mir\n  du       →  du     dich   dir\n  er       →  er     ihn    ihm\n  sie(she) →  sie    sie    ihr\n  es       →  es     es     ihm\n  wir      →  wir    uns    uns\n  ihr      →  ihr    euch   euch\n  sie(they)→  sie    sie    ihnen\n  Sie(formal)→ Sie  Sie    Ihnen\n\nExamples:\n  Er sieht mich. (Akk.) — He sees me.\n  Ich helfe dir. (Dat.) — I help you.\n  Sie liebt ihn. (Akk.) — She loves him.\n  Wir danken Ihnen. (Dat.) — We thank you (formal).\n  Das gehört uns. (Dat.) — That belongs to us.',
        },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════
   PHASE 3 — B1 INTERMEDIATE
   ════════════════════════════════════════════════════════ */
const phaseB1: Phase = {
  id: 'de-b1',
  label: 'B1 — Intermediate',
  weeks: 'Level B1',
  theme: 'warning',
  sections: [
    {
      id: 'de-b1-perfekt',
      title: 'Past Tenses — Perfekt & Präteritum',
      week: 'Week 7–8',
      items: [
        {
          id: 'de-b1-perf-1',
          text: 'Perfekt — the standard spoken past tense (haben/sein + Partizip II)',
          note: 'Use Perfekt in conversation. Use Präteritum in writing. Partizip II goes to the END.',
          details: 'Perfekt structure: [auxiliary] + ... + [Partizip II]\n  Ich habe das Buch gelesen. — I read the book.\n  Er ist nach Hause gegangen. — He went home.\n\nPARTIZIP II formation:\n  Regular: ge- + stem + -t:  machen → gemacht, kaufen → gekauft\n  Irregular: ge- + stem + -en (vowel may change): lesen → gelesen, fahren → gefahren, gehen → gegangen\n  Verbs ending in -ieren: no ge-: telefonieren → telefoniert, studieren → studiert\n  Separable verbs: ge- goes between prefix and stem: aufstehen → aufgestanden, anrufen → angerufen\n  Inseparable prefixes (be-, ge-, er-, ver-, ent-, zer-): no ge-: besuchen → besucht, vergessen → vergessen\n\nAUXILIARY:\n  haben → most verbs: essen → gegessen, arbeiten → gearbeitet\n  sein → movement or change of state verbs: gehen → gegangen, kommen → gekommen, werden → geworden, bleiben → geblieben, passieren → passiert, einschlafen → eingeschlafen',
        },
        {
          id: 'de-b1-perf-2',
          text: 'Präteritum — the written/narrative past tense',
          note: 'Used in novels, newspapers, formal writing. Sein and haben always use Präteritum (not Perfekt) even in speech.',
          details: 'Präteritum of regular verbs: stem + -te endings\n  machen: ich machte, du machtest, er machte, wir machten, ihr machtet, sie machten\n\nPräteritum of sein and haben (memorize these!):\n  sein:  ich war, du warst, er war, wir waren, ihr wart, sie waren\n  haben: ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten\n\nPräteritum of modals (also very common in speech):\n  können → konnte   müssen → musste   wollen → wollte\n  sollen → sollte   dürfen → durfte   mögen → mochte\n\nStrong verbs (irregular):\n  gehen → ging    kommen → kam     fahren → fuhr\n  sehen → sah     geben → gab      nehmen → nahm\n  lesen → las     schreiben → schrieb  trinken → trank\n\nWhen to use which:\n  Spoken: "Ich habe gegessen" ✓, "Ich aß" (sounds old-fashioned)\n  Written: both fine, but Präteritum preferred in narratives\n  ALWAYS Präteritum: sein (war), haben (hatte), modal verbs',
        },
        {
          id: 'de-b1-perf-3',
          text: 'Plusquamperfekt — the past perfect (hatte/war + Partizip II)',
          note: 'Used to describe an event that happened BEFORE another past event.',
          details: 'Structure: hatte/war (Präteritum) + Partizip II\n  Ich hatte das Buch schon gelesen, als er es kaufte.\n  — I had already read the book when he bought it.\n  Sie war schon gegangen, als ich ankam.\n  — She had already left when I arrived.\n\nUsage:\n  • Two past events: Plusquamperfekt for the earlier one, Präteritum/Perfekt for the later\n  • Often with "schon" (already), "noch nicht" (not yet), "bevor" (before), "nachdem" (after)\n\nNachdem + Plusquamperfekt → main clause in Präteritum/Perfekt:\n  Nachdem ich gegessen hatte, ging ich spazieren.\n  — After I had eaten, I went for a walk.',
        },
      ],
    },
    {
      id: 'de-b1-subordinate',
      title: 'Subordinate Clauses',
      week: 'Week 8–9',
      items: [
        {
          id: 'de-b1-sub-1',
          text: 'Subordinating conjunctions — verb goes to the END of the clause',
          note: 'Key conjunctions: dass, weil, wenn, ob, obwohl, damit, bevor, nachdem, während, als.',
          details: 'In subordinate (dependent) clauses introduced by a conjunction, the VERB moves to the VERY END.\n\n  Ich weiß, dass er Deutsch spricht. — I know that he speaks German.\n  (Main: "er spricht Deutsch" → Sub: "er Deutsch spricht")\n\nCommon subordinating conjunctions:\n  dass — that: Ich denke, dass es richtig ist.\n  weil — because: Ich lerne Deutsch, weil es interessant ist.\n  wenn — when/if (present/future or repeated past): Wenn ich Zeit habe,...\n  ob — whether/if (indirect question): Ich frage, ob er kommt.\n  obwohl — although: Obwohl es regnet, gehe ich spazieren.\n  damit — so that: Ich lerne, damit ich bestehe.\n  bevor — before: Bevor ich schlafe, lese ich.\n  nachdem — after: Nachdem ich gegessen hatte, ...\n  während — while: Während er schläft, arbeite ich.\n  als — when (single past event): Als ich jung war,...\n  bis — until: Warte, bis ich fertig bin.\n\nModal verbs in subordinate clauses:\n  Ich weiß, dass er kommen kann. (modal goes last, infinitive before it)',
        },
        {
          id: 'de-b1-sub-2',
          text: 'Relative clauses — der/die/das as relative pronouns',
          note: 'Relative pronouns match the GENDER/NUMBER of their antecedent, but CASE of their role in the relative clause.',
          details: 'Relative clauses describe a noun. The relative pronoun matches the noun in gender/number\nbut takes its case from its function in the relative clause.\n\nRelative pronouns:\n  Nom: der / die / das / die\n  Akk: den / die / das / die\n  Dat: dem / der / dem / denen\n  Gen: dessen / deren / dessen / deren\n\nExamples:\n  Das ist der Mann, der Deutsch spricht. (Nom — subject in rel. clause)\n  Das ist der Mann, den ich kenne. (Akk — direct object in rel. clause)\n  Das ist der Mann, dem ich helfe. (Dat — after "helfen")\n  Das ist das Buch, das ich gelesen habe. (Nom, neut)\n  Die Frau, deren Auto rot ist, wohnt hier. (Gen, fem)\n\nVerb goes to end of relative clause.\nRelative clause is always separated by commas.',
        },
        {
          id: 'de-b1-sub-3',
          text: 'Indirect questions — "ob" and W-words introduce indirect questions',
          note: 'Indirect questions use normal subordinate clause word order (verb to end). No question mark.',
          details: 'Direct → Indirect:\n  "Kommt er?" → Ich frage, ob er kommt.\n  "Wann kommt er?" → Ich frage, wann er kommt.\n  "Was macht sie?" → Ich weiß nicht, was sie macht.\n  "Wo wohnt er?" → Er sagt mir, wo er wohnt.\n\nW-words as subordinating conjunctions:\n  wer (who), was (what), wo (where), wann (when), wie (how),\n  warum (why), woher (where from), wohin (where to), wie viel (how much)\n\nVerb goes to end in both ob- and W-question indirect clauses:\n  Kannst du mir sagen, wie ich zum Bahnhof komme?\n  — Can you tell me how I get to the train station?\n  Ich weiß nicht, ob er kommt oder nicht.\n  — I don\'t know whether he\'s coming or not.',
        },
        {
          id: 'de-b1-sub-4',
          text: 'Two-way prepositions — an, auf, in, über, unter, vor, hinter, neben, zwischen',
          note: 'These take Akkusativ for movement (direction) and Dativ for location (position). Wo? = Dat. Wohin? = Akk.',
          details: 'Two-way prepositions (Wechselpräpositionen) use:\n  • Akkusativ for direction/movement (Wohin? Where to?)\n  • Dativ for location/position (Wo? Where?)\n\nLocation (Wo? → Dativ):\n  Das Buch liegt auf dem Tisch. — The book lies on the table.\n  Er sitzt in dem (im) Zimmer. — He sits in the room.\n  Das Bild hängt an der Wand. — The picture hangs on the wall.\n\nDirection (Wohin? → Akkusativ):\n  Leg das Buch auf den Tisch. — Put the book on the table.\n  Er geht in das (ins) Zimmer. — He goes into the room.\n  Häng das Bild an die Wand. — Hang the picture on the wall.\n\nThe 9 two-way prepositions:\n  an (at/on vertical), auf (on horizontal), in (in/into)\n  über (over/above), unter (under/below), vor (in front of/before)\n  hinter (behind), neben (next to/beside), zwischen (between)\n\nCommon contractions:\n  in+das=ins, in+dem=im, an+das=ans, an+dem=am\n  auf+das=aufs, über+das=übers',
        },
      ],
    },
    {
      id: 'de-b1-adj',
      title: 'Adjective Endings',
      week: 'Week 9–10',
      items: [
        {
          id: 'de-b1-adj-1',
          text: 'Adjective declension after definite articles (der/die/das) — weak declension',
          note: 'After a definite article, most adjective endings are -e or -en. The article carries the case signal.',
          details: 'After der/die/das (definite article) — weak endings:\n\n         Masc.   Fem.    Neut.   Plural\n  Nom:   -e      -e      -e      -en\n  Akk:   -en     -e      -e      -en\n  Dat:   -en     -en     -en     -en\n  Gen:   -en     -en     -en     -en\n\nExamples:\n  der alte Mann (Nom.Masc.) — the old man\n  den alten Mann (Akk.Masc.) — the old man\n  dem alten Mann (Dat.Masc.) — the old man\n  die alte Frau (Nom.Fem.)\n  das alte Haus (Nom.Neut.)\n  die alten Männer (Nom.Plur.)\n\nPattern: only 5 "strong" slots get distinctive endings (the -e ones);\neverything else is -en.',
        },
        {
          id: 'de-b1-adj-2',
          text: 'Adjective declension after indefinite articles (ein/eine) — mixed declension',
          note: 'After ein/eine/kein: where the article has no gender signal, the adjective must show it (-er/-e/-es).',
          details: 'After ein/eine/kein — mixed endings (adjective "steps in" where article is ambiguous):\n\n         Masc.   Fem.    Neut.   Plural (kein-)\n  Nom:   -er     -e      -es     -en\n  Akk:   -en     -e      -es     -en\n  Dat:   -en     -en     -en     -en\n  Gen:   -en     -en     -en     -en\n\nExamples:\n  ein alter Mann (Nom.Masc.) — compare: der alte Mann → after "ein" adjective adds -er\n  eine alte Frau (Nom.Fem.)\n  ein altes Haus (Nom.Neut.) — adjective adds -es to show neuter\n  einen alten Mann (Akk.Masc.)\n  einem alten Mann (Dat.Masc.)\n\nTrick: where the definite article ends in -r/-m/-s, ein-article shows it → weak -e/-en\nWhere ein-article is ambiguous (Nom.Masc./Neut.), adjective adds strong ending.',
        },
        {
          id: 'de-b1-adj-3',
          text: 'Adjective declension without an article — strong declension',
          note: 'When there\'s no article at all, the adjective carries ALL the case information itself.',
          details: 'Without any article — strong endings (adjective = the article):\n\n         Masc.   Fem.    Neut.   Plural\n  Nom:   -er     -e      -es     -e\n  Akk:   -en     -e      -es     -e\n  Dat:   -em     -er     -em     -en\n  Gen:   -en     -er     -en     -er\n\nExamples (common with mass nouns, plural without article):\n  kalter Kaffee (Nom.Masc.) — cold coffee\n  frische Milch (Nom.Fem.) — fresh milk\n  gutes Bier (Nom.Neut.) — good beer\n  kaltem Wasser (Dat.Neut.) — with cold water\n  mit netten Leuten (Dat.Plur.) — with nice people\n\nCommon contexts: "ohne [adj.] [noun]", plural without article,\nmass nouns: "mit frischer Butter", "aus gutem Holz"',
        },
        {
          id: 'de-b1-adj-4',
          text: 'Comparative and superlative — schnell → schneller → am schnellsten',
          note: 'Comparative: adj + -er. Superlative: am + adj + -sten (or der/die/das + adj + -ste).',
          details: 'Comparative: add -er to the adjective\n  schnell → schneller (faster)\n  interessant → interessanter\n  Mein Auto ist schneller als dein Auto. — My car is faster than your car.\n  (als = than in comparisons)\n\nSuperlative:\n  Predicate: am + adj + -(e)sten:\n    Das ist am schnellsten. — That is the fastest.\n  Attributive (before noun): definite article + adj + -(e)sten:\n    Das schnellste Auto — the fastest car\n    der beste Film — the best film\n\nUmlaut in common adjectives:\n  alt → älter → am ältesten\n  groß → größer → am größten\n  jung → jünger → am jüngsten\n  kurz → kürzer → am kürzesten\n  warm → wärmer → am wärmsten\n\nIrregulars:\n  gut → besser → am besten\n  viel → mehr → am meisten\n  gern → lieber → am liebsten\n  hoch → höher → am höchsten\n  nah → näher → am nächsten',
        },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════
   PHASE 4 — B2 CONVERSATIONAL
   ════════════════════════════════════════════════════════ */
const phaseB2: Phase = {
  id: 'de-b2',
  label: 'B2 — Conversational',
  weeks: 'Level B2',
  theme: 'danger',
  sections: [
    {
      id: 'de-b2-konjunktiv',
      title: 'Konjunktiv II — Subjunctive',
      week: 'Week 11–12',
      items: [
        {
          id: 'de-b2-konj-1',
          text: 'Konjunktiv II for polite requests and hypotheticals — würde + infinitive',
          note: '"Würde + infinitive" is the safe way to form Konjunktiv II for most verbs in modern German.',
          details: 'Konjunktiv II expresses:\n  • Polite requests: Könnten Sie mir helfen? — Could you help me?\n  • Hypotheticals: Wenn ich reich wäre, würde ich reisen.\n  • Wishes: Ich wünschte, er wäre hier.\n  • Conditional: Was würdest du tun?\n\nFORMATION — "würde" construction (most common):\n  würde + infinitive at end\n  ich würde, du würdest, er würde, wir würden, ihr würdet, sie würden\n  Ich würde das gerne machen. — I would like to do that.\n  Würdest du mitkommen? — Would you come along?\n\nReal Konjunktiv II forms (used for common verbs — preferred over würde):\n  sein: wäre, wärst, wäre, wären, wärt, wären\n  haben: hätte, hättest, hätte, hätten, hättet, hätten\n  werden: würde (same as auxiliary above)\n  können: könnte    müssen: müsste    wollen: wollte\n  sollen: sollte    dürfen: dürfte    mögen: möchte / mögte',
        },
        {
          id: 'de-b2-konj-2',
          text: 'Conditional sentences — Wenn...dann (real and hypothetical)',
          note: 'Real condition (Indikativ): Wenn ich Zeit habe, komme ich. Hypothetical (Konjunktiv II): Wenn ich Zeit hätte, käme ich.',
          details: 'Real conditions (likely/possible):\n  Wenn ich Zeit habe, komme ich. — If I have time, I\'ll come.\n  Both clauses in Indikativ (present or future)\n\nHypothetical/counterfactual conditions (unlikely or impossible):\n  Wenn ich mehr Geld hätte, würde ich reisen.\n  — If I had more money, I would travel.\n  Wenn ich du wäre, würde ich das nicht machen.\n  — If I were you, I wouldn\'t do that.\n  Both clauses in Konjunktiv II\n\nPast hypothetical (Konjunktiv II + Perfekt):\n  Wenn ich das gewusst hätte, wäre ich nicht gegangen.\n  — If I had known that, I wouldn\'t have gone.\n  hätte/wäre + Partizip II in both clauses\n\nWord order:\n  Wenn-clause: verb to end\n  Result clause: verb-second (if wenn-clause comes first, result inverts)\n  Wenn ich käme, würde ich dir helfen. OR\n  Ich würde dir helfen, wenn ich käme.',
        },
        {
          id: 'de-b2-konj-3',
          text: 'Indirect speech with Konjunktiv I — Er sagt, er sei krank',
          note: 'Newspapers and formal writing use Konjunktiv I to report speech. In conversation, Konjunktiv II or dass+Indikativ is used.',
          details: 'Konjunktiv I is formed from the verb stem (infinitive minus -en) + special endings:\n  ich lerne → (dass) ich lerne (same as Indikativ — use K II instead to avoid ambiguity)\n  er lerne → er lerne (K I distinct from Indikativ "er lernt")\n\nBe/have K I:\n  sein: sei, seist, sei, seien, seiet, seien\n  haben: habe, habest, habe, haben, habet, haben\n\nExamples (journalistic):\n  Der Sprecher sagte, die Wirtschaft wachse. — The spokesman said the economy is growing.\n  Er betonte, er sei nicht schuldig. — He emphasized he was not guilty.\n\nIn everyday speech, use:\n  Er sagt, dass er krank ist. (dass + Indikativ)\n  Or: Er sagt, er sei krank. (K I) — sounds formal',
        },
      ],
    },
    {
      id: 'de-b2-passive',
      title: 'Passive Voice',
      week: 'Week 12',
      items: [
        {
          id: 'de-b2-pass-1',
          text: 'Vorgangspassiv — werden + Partizip II (the main passive)',
          note: '"Das Auto wird repariert." The agent (by whom) can be added with "von + Dativ".',
          details: 'Active → Passive:\n  Der Mechaniker repariert das Auto. (active)\n  → Das Auto wird von dem Mechaniker repariert. (passive)\n\nStructure: [subject] + werden (conjugated) + ... + Partizip II (at end)\n\nAll tenses:\n  Present: Das Auto wird repariert. — The car is being repaired.\n  Präteritum: Das Auto wurde repariert. — The car was repaired.\n  Perfekt: Das Auto ist repariert worden. — The car has been repaired. (worden, NOT geworden!)\n  Futur I: Das Auto wird repariert werden. — The car will be repaired.\n  Konjunktiv II: Das Auto würde repariert werden. — The car would be repaired.\n\nAgent with "von":\n  Das Buch wurde von Goethe geschrieben. — The book was written by Goethe.\n\nModals in passive:\n  Das muss erledigt werden. — That must be done.\n  Das kann gemacht werden. — That can be done.',
        },
        {
          id: 'de-b2-pass-2',
          text: 'Zustandspassiv — sein + Partizip II (state, not action)',
          note: 'Vorgangspassiv (werden) = the action/process happening. Zustandspassiv (sein) = the resulting state.',
          details: 'Vorgangspassiv describes the process:\n  Die Tür wird geschlossen. — The door is being closed. (action)\n  Die Tür wurde geschlossen. — The door was closed. (action happened)\n\nZustandspassiv describes the result/state:\n  Die Tür ist geschlossen. — The door is closed. (state/result)\n  Das Geschäft ist geöffnet. — The shop is open. (state)\n  Das Fenster war geöffnet. — The window was open.\n\nDistinction matters:\n  Das Essen wird zubereitet. (Vorgang) — The food is being prepared.\n  Das Essen ist zubereitet. (Zustand) — The food is prepared/ready.\n\nCommon Zustandspassiv adjectives:\n  besetzt (occupied), geöffnet/geschlossen (open/closed),\n  verheiratet (married), verletzt (injured), bekannt (known)',
        },
        {
          id: 'de-b2-pass-3',
          text: 'Impersonal passive — "Es wird getanzt" (subject-less passive)',
          note: 'Used to describe an activity without a specific subject. Very common for describing events/activities.',
          details: 'Impersonal passive: no grammatical subject, or "es" as placeholder\n\n  Es wird getanzt. — There is dancing. / People are dancing.\n  Es wurde viel gelacht. — There was a lot of laughter.\n  In Deutschland wird viel Bier getrunken. — A lot of beer is drunk in Germany.\n\n"Es" is a placeholder that disappears if something else starts the sentence:\n  Es wird hier nicht geraucht. OR\n  Hier wird nicht geraucht. — No smoking here. (lit: It is not smoked here.)\n\nUseful for signs/rules:\n  Hier wird Deutsch gesprochen. — German is spoken here.\n  Sonntags wird nicht gearbeitet. — Nobody works on Sundays.\n\nCan also use with some intransitive verbs (verbs that can\'t have passive normally):\n  Ihm wird geholfen. — He is being helped. (helfen = Dativ verb)',
        },
      ],
    },
    {
      id: 'de-b2-genitiv',
      title: 'Genitive Case & Advanced Grammar',
      week: 'Week 13',
      items: [
        {
          id: 'de-b2-gen-1',
          text: 'Genitiv case — possession and genitive prepositions',
          note: 'Genitiv adds -s/-es to masculine/neuter nouns. Articles change to des/der/des/der.',
          details: 'Genitiv articles:\n         Nom.  Akk.  Dat.  Gen.\n  Masc:  der   den   dem   des (+s to noun)\n  Fem:   die   die   der   der\n  Neut:  das   das   dem   des (+s to noun)\n  Plur:  die   die   den   der\n\nNoun endings in Genitiv:\n  Masculine/Neuter: add -s (or -es for single-syllable nouns)\n    des Mannes, des Kindes, des Autos\n  Feminine/Plural: no change to noun\n    der Frau, der Kinder\n\nExamples:\n  Das Auto des Mannes — the man\'s car\n  Die Tasche der Frau — the woman\'s bag\n  Der Titel des Buches — the title of the book\n  Die Spielzeuge der Kinder — the children\'s toys\n\nGenitive prepositions (always Genitiv):\n  wegen — because of: wegen des Wetters (wegen + Genitiv)\n  trotz — despite: trotz des Regens\n  während — during: während des Sommers\n  statt/anstatt — instead of: statt des Kaffees\n  innerhalb — inside/within: innerhalb eines Jahres\n  außerhalb — outside of: außerhalb der Stadt\n\nNote: in colloquial speech, "wegen" often takes Dativ: wegen dem Wetter',
        },
        {
          id: 'de-b2-gen-2',
          text: 'Extended participial phrases — Erweitertes Partizipialattribut',
          note: 'German stacks modifiers BEFORE the noun inside an article-adjective-noun bracket. Very common in written German.',
          details: 'In German, relative clauses can be compressed into a participial phrase placed between the article and noun.\n\nRelative clause:\n  Der Mann, der das Buch liest, ist mein Vater.\n  — The man who is reading the book is my father.\n\nParticipial phrase (written style):\n  Der das Buch lesende Mann ist mein Vater.\n  — The book-reading man is my father.\n\nStructure: [Article] + [all modifiers] + [Partizip I or II] + [Noun]\n\nPartizip I (ongoing action) = infinitive + -d:\n  lesend (reading), schreibend (writing), laufend (running)\n\nPartizip II (completed/passive action):\n  geschrieben (written), gebaut (built)\n\nExamples:\n  die neu gebaute Brücke — the newly built bridge\n  der von mir gestern gekaufte Computer — the computer bought by me yesterday\n  das in der Zeitung berichtete Ereignis — the event reported in the newspaper\n\nCommon in newspapers, legal texts, academic writing. Understand, but use relative clauses in speech.',
        },
        {
          id: 'de-b2-gen-3',
          text: 'Idioms and fixed expressions — Deutsche Redewendungen',
          note: 'Idioms are key to sounding natural. Learn them in context.',
          details: 'Common German idioms:\n  Da liegt der Hund begraben. — That\'s the crux of the matter. (lit: that\'s where the dog is buried)\n  Ich verstehe nur Bahnhof. — It\'s all Greek to me. (lit: I only understand "train station")\n  Das ist nicht mein Bier. — That\'s not my problem. (lit: not my beer)\n  Jetzt ist der Ofen aus. — Now it\'s all over. (lit: now the oven is off)\n  Auf dem Holzweg sein. — To be on the wrong track. (lit: on the wood path)\n  Tomaten auf den Augen haben. — To be oblivious. (lit: to have tomatoes on one\'s eyes)\n  Die Daumen drücken. — To keep fingers crossed. (lit: to press thumbs)\n  Auf Wolke 7 sein. — To be on cloud nine. (Germans use 7, not 9)\n  Unter vier Augen. — In private. (lit: under four eyes = just the two of us)\n  Das geht auf keine Kuhhaut. — That\'s beyond the pale. (lit: won\'t fit on a cow hide)',
        },
        {
          id: 'de-b2-gen-4',
          text: 'Register and formal writing — Formelle Sprache',
          note: 'Formal German uses passive voice, Konjunktiv I, nominalization, and complex sentence structures.',
          details: 'Features of formal/written German:\n  1. Passive voice preferred over active: "Es wird gebeten..." not "Wir bitten..."\n  2. Nominalization (turning verbs into nouns): "Die Durchführung des Projekts" not "das Projekt durchführen"\n  3. Konjunktiv I in reported speech\n  4. Longer sentences with multiple subordinate clauses\n  5. Avoidance of contractions: "in das" not "ins" in formal texts\n\nFormal letter/email phrases:\n  Sehr geehrte Damen und Herren — Dear Sir/Madam\n  Sehr geehrter Herr [Name] — Dear Mr [Name]\n  Bezüglich Ihrer Anfrage — Regarding your enquiry\n  Ich freue mich, Ihnen mitteilen zu können, dass...\n  — I am pleased to inform you that...\n  Mit freundlichen Grüßen — Kind regards (standard closing)\n  Hochachtungsvoll — Yours faithfully (very formal)\n\nFormal vs informal:\n  Informal: Hallo, kannst du mir helfen?\n  Formal: Sehr geehrter Herr Müller, könnten Sie mir behilflich sein?',
        },
      ],
    },
    {
      id: 'de-b2-fluency',
      title: 'Fluency & Immersion Strategies',
      week: 'Ongoing',
      items: [
        {
          id: 'de-b2-flu-1',
          text: 'Build a daily German habit — minimum 15 minutes every day beats 2 hours once a week',
          note: 'Consistency > intensity. Use dead time: commutes, walks, household chores.',
          details: 'Habit stacking ideas:\n  Morning: 10 Anki flashcards before coffee\n  Commute: German podcast (Slow German, Coffee Break German)\n  Lunch: read one Nachrichtenleicht article\n  Evening: 15 min DW course video or Easy German YouTube\n  Before sleep: review 5 new words\n\nSpaced repetition (Anki) is the most efficient vocabulary method:\n  • Download "German Top 2000 words" Anki deck\n  • New cards: 10-20/day\n  • Review: takes ~5 min/day after first month\n  • After 1 year → 2000 most common words = ~87% of everyday speech\n\nTracking: log your daily streak. Don\'t break the chain.',
        },
        {
          id: 'de-b2-flu-2',
          text: 'Language exchange and speaking practice — iTalki, Tandem, HelloTalk',
          url: 'https://www.italki.com',
          note: 'Speaking is the skill most learners neglect and the one that improves fastest with practice.',
          details: 'Platforms for practice:\n  • iTalki — find professional tutors or community partners (paid & free)\n  • Tandem — text/voice/video with native speakers (app)\n  • HelloTalk — language exchange community (app)\n  • Meetup.com — find local German conversation groups\n\nTips for conversation practice:\n  1. Prepare 3-5 topics you can talk about before your session\n  2. Ask your partner to correct every mistake (Korrektionen, bitte!)\n  3. Record yourself reading German — hear your own accent\n  4. Don\'t switch to English when stuck — describe around the word\n  5. Accept that you will make mistakes — making them is how you learn\n\nSpeaking schedule:\n  A2: 30 min/week with tutor + guided exercises\n  B1: 1 hr/week conversation + shadowing\n  B2: 2+ hrs/week + try to think in German',
        },
        {
          id: 'de-b2-flu-3',
          text: 'Input methods — extensive reading and listening for natural acquisition',
          url: 'https://www.nachrichtenleicht.de',
          note: 'Comprehensible input (i+1 level) is the core of language acquisition. Read and listen a LOT.',
          details: 'The input hypothesis: you acquire language by understanding messages slightly above your current level.\n\nListening (by level):\n  A1-A2: DW Nicos Weg, Slow German, Deutsch warum nicht?\n  B1: Easy German (with subtitles), Deutsche Welle news (slow)\n  B2+: German TV shows (Dark, Babylon Berlin), radio (Deutschlandfunk), podcasts without subtitles\n\nReading (by level):\n  A2: Nachrichtenleicht (news in simple German)\n  B1: Deutsche Welle Top-Thema, graded readers\n  B2: Regular news (Spiegel, Zeit), German Wikipedia, novels\n\nShadowing technique:\n  1. Find a clip with transcript\n  2. Listen and read together\n  3. Pause and repeat each sentence, mimicking rhythm and intonation\n  4. Gradually remove transcript and shadow in real-time\n  → Rapidly improves pronunciation and speaking speed',
        },
        {
          id: 'de-b2-flu-4',
          text: 'Prepare for the Goethe-Zertifikat exam — official German language certificate',
          url: 'https://www.goethe.de/en/spr/kup/prf.html',
          note: 'Goethe-Zertifikat is recognized worldwide for jobs, visas, and university admission.',
          details: 'Goethe-Institut exam levels:\n  A1 — Start Deutsch 1\n  A2 — Start Deutsch 2\n  B1 — Goethe-Zertifikat B1 (required for German citizenship)\n  B2 — Goethe-Zertifikat B2\n  C1 — Goethe-Zertifikat C1 (for university admission)\n  C2 — Goethe-Zertifikat C2 — Großes Deutsches Sprachdiplom\n\nExam components (B1/B2 example):\n  1. Lesen (Reading) — multiple choice, matching, gap-fill\n  2. Hören (Listening) — audio clips with questions\n  3. Schreiben (Writing) — essay/letter\n  4. Sprechen (Speaking) — discussion, roleplay, presentation\n\nPreparation:\n  • Download past exam papers from goethe.de (free)\n  • Practice Schreiben with the exact format required\n  • Do timed practice under exam conditions\n  • Estimated hours to reach B1 from zero: 350-500 hours',
        },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════
   EXPORT
   ════════════════════════════════════════════════════════ */
export const DE_PHASES: Phase[] = [phaseA1, phaseA2, phaseB1, phaseB2];
