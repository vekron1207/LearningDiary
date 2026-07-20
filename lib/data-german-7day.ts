import type { Phase } from './types';

/* ════════════════════════════════════════════════════════
   7-DAY A1 EXAM SPRINT
   A full day-by-day study course — not just a task list.
   Each grammar item carries `content`: explanations, real
   tables, vocabulary lists, and example sentences you can
   read, study, and revise every day. Drills stay checkable.
   Built from the germanUpdate.txt outline.
   ════════════════════════════════════════════════════════ */
export const phase7Day: Phase = {
  id: 'de-7day',
  label: '7-Day A1 Sprint',
  weeks: '7 Days · A1',
  theme: 'warning',
  sections: [
    /* ── REFERENCE ── */
    {
      id: 'de-7day-ref',
      title: 'Grammar Reference — revise this daily',
      week: 'Articles · Cases · Pronouns',
      items: [
        {
          id: 'de7-ref-articles',
          text: 'Articles — der / die / das across all four cases',
          note: 'This is the single most important table at A1. Read it once every morning until it is automatic.',
          content: [
            { kind: 'para', text: 'German articles change their form depending on the noun\'s **gender** (masculine, feminine, neuter) and its **case** (its job in the sentence). The noun itself rarely changes — the article carries the information.' },
            {
              kind: 'table',
              caption: 'Definite article (**the**)',
              headers: ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
              rows: [
                ['Nominativ', 'der', 'die', 'das', 'die'],
                ['Akkusativ', '**den**', 'die', 'das', 'die'],
                ['Dativ', 'dem', 'der', 'dem', 'den (+n)'],
                ['Genitiv', 'des', 'der', 'des', 'der'],
              ],
            },
            {
              kind: 'table',
              caption: 'Indefinite article (**a / an**) and negative (**kein**)',
              headers: ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural (kein)'],
              rows: [
                ['Nominativ', 'ein', 'eine', 'ein', 'keine'],
                ['Akkusativ', '**einen**', 'eine', 'ein', 'keine'],
                ['Dativ', 'einem', 'einer', 'einem', 'keinen'],
                ['Genitiv', 'eines', 'einer', 'eines', 'keiner'],
              ],
            },
            { kind: 'callout', tone: 'tip', text: 'Notice the pattern: in **Akkusativ only the masculine changes** (der→den, ein→einen). **Dativ changes everything.** If you learn just these two facts you avoid the most common A1 mistakes.' },
          ],
        },
        {
          id: 'de7-ref-pronouns',
          text: 'Personal pronouns — ich / mich / mir across cases',
          note: 'Pronouns shift with case exactly like articles do.',
          content: [
            {
              kind: 'table',
              caption: 'Personal pronouns by case',
              headers: ['Nominativ', 'Akkusativ', 'Dativ', 'English'],
              rows: [
                ['ich', 'mich', 'mir', 'I / me'],
                ['du', 'dich', 'dir', 'you (informal)'],
                ['er', 'ihn', 'ihm', 'he / him'],
                ['sie', 'sie', 'ihr', 'she / her'],
                ['es', 'es', 'ihm', 'it'],
                ['wir', 'uns', 'uns', 'we / us'],
                ['ihr', 'euch', 'euch', 'you (plural)'],
                ['sie', 'sie', 'ihnen', 'they / them'],
                ['Sie', 'Sie', 'Ihnen', 'you (formal)'],
              ],
            },
            {
              kind: 'examples',
              items: [
                { de: 'Er sieht **mich**.', en: 'He sees me. (Akkusativ)' },
                { de: 'Ich helfe **dir**.', en: 'I help you. (Dativ)' },
                { de: 'Sie gibt **ihm** das Buch.', en: 'She gives him the book. (Dativ)' },
              ],
            },
          ],
        },
        {
          id: 'de7-ref-gender',
          text: 'Noun gender — patterns that help you guess der / die / das',
          note: 'There is no perfect rule, but these endings are reliable enough to lean on.',
          content: [
            { kind: 'heading', text: 'Usually masculine (der)' },
            { kind: 'list', items: [
              'Endings **-er** (agent nouns), **-ig**, **-ling**, **-ismus**',
              'Days, months, seasons, weather: `der Montag`, `der Mai`, `der Sommer`, `der Regen`',
              'Most car brands and alcoholic drinks: `der BMW`, `der Wein` (but `das Bier`)',
            ]},
            { kind: 'heading', text: 'Usually feminine (die)' },
            { kind: 'list', items: [
              'Endings **-ung**, **-heit**, **-keit**, **-schaft**, **-tion**, **-ei**',
              'Most nouns ending in **-e**: `die Lampe`, `die Katze`, `die Blume`',
              'Numbers used as nouns: `die Eins`',
            ]},
            { kind: 'heading', text: 'Usually neuter (das)' },
            { kind: 'list', items: [
              'Diminutives **-chen**, **-lein**: `das Mädchen`, `das Brötchen`',
              'Endings **-ment**, **-um**, **-ma**',
              'Infinitives used as nouns: `das Essen` (eating/food), `das Leben` (life)',
            ]},
            { kind: 'callout', tone: 'warn', text: 'Always learn a new noun **together with its article and plural** — `die Frau, die Frauen` — never the bare noun. Guessing later is much harder than memorising up front.' },
          ],
        },
        {
          id: 'de7-ref-cases',
          text: 'The four cases at a glance — what each one is for',
          content: [
            {
              kind: 'table',
              caption: 'Cases and their question words',
              headers: ['Case', 'Role', 'Question', 'Example'],
              rows: [
                ['Nominativ', 'subject', 'Wer? / Was?', '**Der Mann** schläft.'],
                ['Akkusativ', 'direct object', 'Wen? / Was?', 'Ich sehe **den Mann**.'],
                ['Dativ', 'indirect object', 'Wem?', 'Ich gebe **dem Mann** das Buch.'],
                ['Genitiv', 'possession', 'Wessen?', 'das Auto **des Mannes**'],
              ],
            },
            { kind: 'para', text: 'At A1 you mainly need **Nominativ, Akkusativ and Dativ**. Genitiv is good to recognise but rarely tested heavily.' },
          ],
        },
      ],
    },

    /* ── DAY 1 ── */
    {
      id: 'de-7day-day1',
      title: 'Day 1 — Foundations',
      week: 'Units 1–3 · Alphabet, articles, sein & haben',
      items: [
        {
          id: 'de7-d1-1',
          text: 'Alphabet & pronunciation — the sounds that trip up English speakers',
          note: 'Get these right on Day 1 — bad habits are hard to unlearn later.',
          content: [
            { kind: 'heading', text: 'The four special characters' },
            {
              kind: 'table',
              headers: ['Letter', 'Sounds like', 'Example'],
              rows: [
                ['Ä / ä', '"e" in *bed*', 'Mädchen, Käse'],
                ['Ö / ö', 'French *eu* — "e" with rounded lips', 'schön, hören'],
                ['Ü / ü', 'French *u* — "ee" with rounded lips', 'über, Tür'],
                ['ß', 'always "ss"', 'Straße, groß'],
              ],
            },
            { kind: 'heading', text: 'Consonants that betray English speakers' },
            { kind: 'list', items: [
              '`w` → English **v**: `Wasser`, `Wein`',
              '`v` → English **f**: `Vater`, `Vogel`',
              '`z` → **ts**: `Zeit`, `Zug`',
              '`sp` / `st` at the start of a word → **shp** / **sht**: `Sprache`, `Stadt`',
              '`sch` → **sh**: `Schule`, `Schiff`',
              '`ch` after a/o/u → guttural (throat) sound: `Bach`, `doch`',
              '`ch` after e/i/ä/ö/ü → soft "h" sound: `ich`, `nicht`, `Milch`',
            ]},
            { kind: 'callout', tone: 'tip', text: 'Practice with the classic tongue-twister: **"Fischers Fritz fischt frische Fische."** It drills the s / sch / f contrast in one line.' },
          ],
        },
        {
          id: 'de7-d1-2',
          text: 'Articles & gender — der / die / das, ein / eine, kein / keine',
          note: 'See the Reference section for the full case tables — this item covers the basics.',
          content: [
            { kind: 'para', text: 'Every German noun has one of three genders. The gender is not about biology — `das Mädchen` (the girl) is neuter because of the **-chen** ending. You must memorise the article with the noun.' },
            {
              kind: 'table',
              caption: 'The three forms you need first (Nominativ)',
              headers: ['', 'Definite (the)', 'Indefinite (a)', 'Negative (no)'],
              rows: [
                ['Masculine', 'der Hund', 'ein Hund', 'kein Hund'],
                ['Feminine', 'die Katze', 'eine Katze', 'keine Katze'],
                ['Neuter', 'das Kind', 'ein Kind', 'kein Kind'],
                ['Plural', 'die Kinder', '— Kinder', 'keine Kinder'],
              ],
            },
            { kind: 'callout', tone: 'tip', text: 'There is **no indefinite plural** — "some dogs" is just `Hunde`. But the negative plural exists: `keine Hunde`.' },
          ],
        },
        {
          id: 'de7-d1-3',
          text: 'sein & haben — the two verbs you cannot avoid',
          note: 'Memorise both tables cold. They appear in almost every sentence and later form the past tense.',
          content: [
            {
              kind: 'table',
              caption: '**sein** — to be (irregular)',
              headers: ['Person', 'Form', 'Example'],
              rows: [
                ['ich', 'bin', 'Ich **bin** müde. — I am tired.'],
                ['du', 'bist', 'Du **bist** nett. — You are nice.'],
                ['er / sie / es', 'ist', 'Er **ist** 25. — He is 25.'],
                ['wir', 'sind', 'Wir **sind** hier. — We are here.'],
                ['ihr', 'seid', 'Ihr **seid** spät. — You are late.'],
                ['sie / Sie', 'sind', 'Sie **sind** Freunde.'],
              ],
            },
            {
              kind: 'table',
              caption: '**haben** — to have (mostly regular)',
              headers: ['Person', 'Form', 'Example'],
              rows: [
                ['ich', 'habe', 'Ich **habe** Zeit. — I have time.'],
                ['du', 'hast', 'Du **hast** ein Auto.'],
                ['er / sie / es', 'hat', 'Sie **hat** einen Bruder.'],
                ['wir', 'haben', 'Wir **haben** Hunger.'],
                ['ihr', 'habt', 'Ihr **habt** recht.'],
                ['sie / Sie', 'haben', 'Sie **haben** Kinder.'],
              ],
            },
          ],
        },
        {
          id: 'de7-d1-4',
          text: 'Regular verbs & the V2 word-order rule',
          note: 'The verb-second rule is the backbone of German sentence structure.',
          content: [
            { kind: 'para', text: 'To conjugate a regular verb, take the **stem** (infinitive minus **-en**) and add the personal ending. Example with `machen` (to do/make):' },
            {
              kind: 'table',
              headers: ['Person', 'Ending', 'machen', 'wohnen', 'lernen'],
              rows: [
                ['ich', '-e', 'mache', 'wohne', 'lerne'],
                ['du', '-st', 'machst', 'wohnst', 'lernst'],
                ['er/sie/es', '-t', 'macht', 'wohnt', 'lernt'],
                ['wir', '-en', 'machen', 'wohnen', 'lernen'],
                ['ihr', '-t', 'macht', 'wohnt', 'lernt'],
                ['sie/Sie', '-en', 'machen', 'wohnen', 'lernen'],
              ],
            },
            { kind: 'heading', text: 'The V2 rule — verb always in position 2' },
            { kind: 'para', text: 'In a main clause the conjugated verb is **always the second element**. If something other than the subject starts the sentence, the subject jumps to *after* the verb. This is different from English.' },
            {
              kind: 'examples',
              items: [
                { de: 'Ich lerne heute Deutsch.', en: 'I learn German today. (subject first)' },
                { de: 'Heute lerne ich Deutsch.', en: 'Today I learn German. (adverb first → subject moves after verb)' },
                { de: 'Was machst du?', en: 'What are you doing? (question word + verb + subject)' },
              ],
            },
          ],
        },
        {
          id: 'de7-d1-5',
          text: 'Questions & the imperative with Sie',
          content: [
            { kind: 'heading', text: 'W-questions (open questions)' },
            {
              kind: 'table',
              headers: ['Word', 'Meaning', 'Example'],
              rows: [
                ['wer', 'who', 'Wer ist das?'],
                ['was', 'what', 'Was machst du?'],
                ['wo', 'where', 'Wo wohnst du?'],
                ['woher', 'from where', 'Woher kommst du?'],
                ['wohin', 'to where', 'Wohin gehst du?'],
                ['wann', 'when', 'Wann kommst du?'],
                ['wie', 'how', 'Wie heißt du?'],
                ['warum', 'why', 'Warum lernst du Deutsch?'],
              ],
            },
            { kind: 'heading', text: 'Yes/no questions & polite commands' },
            { kind: 'list', items: [
              'Yes/no question → put the **verb first**: `Sprichst du Deutsch?`',
              'Formal command (Sie) → **verb first + Sie**: `Kommen Sie bitte!` · `Nehmen Sie Platz!`',
            ]},
          ],
        },
        {
          id: 'de7-d1-vocab',
          text: 'Day 1 vocabulary — greetings, people & question words',
          note: 'Learn each noun with its article. Cover the English column and test yourself.',
          content: [
            {
              kind: 'table',
              caption: 'Greetings & courtesy',
              headers: ['German', 'English'],
              rows: [
                ['Hallo / Guten Tag', 'Hello / Good day'],
                ['Guten Morgen / Guten Abend', 'Good morning / Good evening'],
                ['Tschüss / Auf Wiedersehen', 'Bye / Goodbye (formal)'],
                ['bitte / danke', 'please / thank you'],
                ['ja / nein', 'yes / no'],
                ['Wie geht es dir?', 'How are you? (informal)'],
              ],
            },
            {
              kind: 'table',
              caption: 'People & everyday nouns',
              headers: ['German', 'English'],
              rows: [
                ['der Mann', 'the man'],
                ['die Frau', 'the woman'],
                ['das Kind', 'the child'],
                ['das Haus', 'the house'],
                ['der Tag', 'the day'],
                ['die Zeit', 'the time'],
              ],
            },
          ],
        },
        { id: 'de7-d1-drill1', text: 'Drill: write out sein and haben in full from memory, then check against the tables above', tag: 'easy' },
        { id: 'de7-d1-drill2', text: 'Drill: translate 4 sentences — I am tired / you have a car / we are students / she has time', tag: 'easy' },
        { id: 'de7-d1-drill3', text: 'Drill: turn 5 statements into yes/no questions, then write 5 original W-questions', tag: 'medium' },
        { id: 'de7-d1-drill4', text: 'Drill: count aloud 1–20, say a phone number in pairs, turn 3 verbs into Sie-imperatives', tag: 'easy' },
        { id: 'de7-d1-check', text: 'Self-check: play the A1 Basics quiz (Quiz tab) — aim for 7/10 or better', note: 'Can you introduce yourself (name, city, age) with no notes?' },
      ],
    },

    /* ── DAY 2 ── */
    {
      id: 'de-7day-day2',
      title: 'Day 2 — Akkusativ Block',
      week: 'Unit 4 · Direct objects & prepositions',
      items: [
        {
          id: 'de7-d2-1',
          text: 'Akkusativ case — only the masculine article changes',
          note: 'This is the easiest case to master because three of the four genders do not change at all.',
          content: [
            { kind: 'para', text: 'The **Akkusativ** marks the **direct object** — the person or thing directly affected by the verb. Find it by asking *Wen?* (whom?) or *Was?* (what?) after the verb.' },
            {
              kind: 'table',
              caption: 'Nominativ → Akkusativ',
              headers: ['Gender', 'Nominativ', 'Akkusativ', 'Changed?'],
              rows: [
                ['Masculine', 'der / ein / kein', '**den / einen / keinen**', 'YES'],
                ['Feminine', 'die / eine / keine', 'die / eine / keine', 'no'],
                ['Neuter', 'das / ein / kein', 'das / ein / kein', 'no'],
                ['Plural', 'die / keine', 'die / keine', 'no'],
              ],
            },
            {
              kind: 'examples',
              items: [
                { de: 'Ich sehe **den** Mann.', en: 'I see the man. (der → den)' },
                { de: 'Ich sehe **die** Frau.', en: 'I see the woman. (die stays)' },
                { de: 'Ich kaufe **einen** Hund.', en: 'I buy a dog. (ein → einen)' },
                { de: 'Ich habe **keine** Zeit.', en: 'I have no time. (keine stays)' },
              ],
            },
          ],
        },
        {
          id: 'de7-d2-2',
          text: 'Akkusativ verbs & the five accusative prepositions',
          note: 'Memorise the preposition set — they take Akkusativ 100% of the time.',
          content: [
            { kind: 'heading', text: 'Common verbs that take a direct object' },
            { kind: 'list', items: [
              '`haben` (to have), `sehen` (to see), `kaufen` (to buy)',
              '`essen` (to eat), `trinken` (to drink), `nehmen` (to take)',
              '`lieben` (to love), `brauchen` (to need), `kennen` (to know a person)',
            ]},
            { kind: 'heading', text: 'The 5 accusative-only prepositions' },
            {
              kind: 'table',
              caption: 'Memory hook: **"DUGO + für"**',
              headers: ['Preposition', 'Meaning', 'Example'],
              rows: [
                ['durch', 'through', 'durch **den** Park'],
                ['um', 'around / at (time)', 'um **den** See · um 9 Uhr'],
                ['gegen', 'against', 'gegen **die** Idee'],
                ['ohne', 'without', 'ohne **einen** Plan'],
                ['für', 'for', 'für **einen** Freund'],
              ],
            },
          ],
        },
        {
          id: 'de7-d2-3',
          text: 'mögen vs. möchten — "like" vs "would like"',
          content: [
            {
              kind: 'table',
              headers: ['Verb', 'Meaning', 'Example'],
              rows: [
                ['mögen', 'to like (in general)', 'Ich **mag** Kaffee. — I like coffee.'],
                ['möchten', 'would like (specific, polite)', 'Ich **möchte** einen Kaffee. — I\'d like a coffee.'],
              ],
            },
            { kind: 'para', text: 'Conjugation of **möchten**: ich/er `möchte`, du `möchtest`, wir/sie `möchten`, ihr `möchtet`. Use it to order food and make polite requests.' },
          ],
        },
        {
          id: 'de7-d2-vocab',
          text: 'Day 2 vocabulary — food, objects & prepositions',
          content: [
            {
              kind: 'table',
              headers: ['German', 'English'],
              rows: [
                ['der Kaffee / das Wasser', 'coffee / water'],
                ['das Buch / der Apfel', 'book / apple'],
                ['der Hund / die Katze', 'dog / cat'],
                ['kaufen / brauchen', 'to buy / to need'],
                ['essen / trinken', 'to eat / to drink'],
                ['der Freund / die Freundin', 'friend (m) / friend (f)'],
              ],
            },
          ],
        },
        { id: 'de7-d2-drill1', text: 'Drill: fill in the correct Akkusativ article in 10 sentences (Ich sehe ___ Mann / Frau / Kind / Hund / Buch …)', tag: 'medium' },
        { id: 'de7-d2-drill2', text: 'Drill: write one sentence for each accusative preposition — durch, um, gegen, ohne, für', tag: 'medium' },
        { id: 'de7-d2-drill3', text: 'Drill: write 5 mögen / möchten contrast pairs expressing the same idea', tag: 'easy' },
        { id: 'de7-d2-drill4', text: 'Drill: negate 5 of your Akkusativ sentences using kein-', tag: 'medium' },
        { id: 'de7-d2-check', text: 'Self-check: can you say für / durch / um / ohne / gegen sentences without hesitating?' },
      ],
    },

    /* ── DAY 3 ── */
    {
      id: 'de-7day-day3',
      title: 'Day 3 — Time & Modal Verbs',
      week: 'Unit 5 · The trickiest day — budget extra time',
      items: [
        {
          id: 'de7-d3-1',
          text: 'Time expressions — am, um, von…bis, im',
          content: [
            {
              kind: 'table',
              headers: ['Word', 'Use', 'Example'],
              rows: [
                ['am', '+ day / date', 'am Montag · am 3. Mai'],
                ['um', '+ clock time', 'um 8 Uhr'],
                ['von … bis', 'from … to', 'von 9 bis 17 Uhr'],
                ['im', '+ month / season', 'im Januar · im Winter'],
              ],
            },
            { kind: 'callout', tone: 'warn', text: 'Telling time trap: `halb sechs` = **5:30**, not 6:30. "halb" means *half of* the coming hour.' },
          ],
        },
        {
          id: 'de7-d3-2',
          text: 'Possessive articles — mein, dein, sein, ihr …',
          note: 'They decline exactly like ein / kein.',
          content: [
            {
              kind: 'table',
              caption: 'Possessive articles (Nominativ)',
              headers: ['German', 'English'],
              rows: [
                ['mein', 'my'],
                ['dein', 'your (informal)'],
                ['sein', 'his / its'],
                ['ihr', 'her / their'],
                ['unser', 'our'],
                ['euer', 'your (plural)'],
                ['Ihr', 'your (formal)'],
              ],
            },
            { kind: 'para', text: 'Add the same endings as `ein`: masculine takes **-en** in Akkusativ, everything else follows ein/eine/ein.' },
            {
              kind: 'examples',
              items: [
                { de: 'Das ist **mein** Bruder.', en: 'That is my brother. (Nominativ)' },
                { de: 'Ich sehe **meinen** Bruder.', en: 'I see my brother. (Akkusativ, masc → -en)' },
                { de: 'Ich liebe **meine** Mutter.', en: 'I love my mother.' },
              ],
            },
          ],
        },
        {
          id: 'de7-d3-3',
          text: 'Modal verbs — können, müssen, wollen',
          note: 'The ich- and er-forms are identical for every modal verb — a distinctive feature.',
          content: [
            {
              kind: 'table',
              caption: 'The three modals for today',
              headers: ['Person', 'können', 'müssen', 'wollen'],
              rows: [
                ['ich', 'kann', 'muss', 'will'],
                ['du', 'kannst', 'musst', 'willst'],
                ['er/sie/es', 'kann', 'muss', 'will'],
                ['wir', 'können', 'müssen', 'wollen'],
                ['ihr', 'könnt', 'müsst', 'wollt'],
                ['sie/Sie', 'können', 'müssen', 'wollen'],
              ],
            },
            {
              kind: 'table',
              caption: 'What they mean',
              headers: ['Verb', 'Meaning'],
              rows: [
                ['können', 'can / to be able to'],
                ['müssen', 'must / to have to'],
                ['wollen', 'to want to'],
              ],
            },
          ],
        },
        {
          id: 'de7-d3-4',
          text: 'Satzklammer — the sentence bracket (drill this hardest)',
          note: 'This is the single most important new structure today. Do the 10-sentence drill below.',
          content: [
            { kind: 'para', text: 'With a modal verb, the sentence forms a **bracket**: the modal sits in **position 2**, and the second verb — an **infinitive** — is pushed all the way to the **end**. Everything else (objects, time, place) sits *inside* the bracket.' },
            {
              kind: 'examples',
              items: [
                { de: 'Ich **kann** gut Deutsch **sprechen**.', en: 'I can speak German well.' },
                { de: 'Ich **muss** heute früh **aufstehen**.', en: 'I have to get up early today.' },
                { de: '**Willst** du mit mir ins Kino **gehen**?', en: 'Do you want to go to the cinema with me?' },
                { de: 'Er **kann** heute nicht **kommen**.', en: 'He can\'t come today. (negation inside the bracket)' },
              ],
            },
            { kind: 'callout', tone: 'tip', text: 'Reading check: in every modal sentence you write, the **infinitive must be the very last word**. If it isn\'t, the bracket is broken.' },
          ],
        },
        {
          id: 'de7-d3-vocab',
          text: 'Day 3 vocabulary — modals, activities & frequency',
          content: [
            {
              kind: 'table',
              headers: ['German', 'English'],
              rows: [
                ['sprechen / arbeiten', 'to speak / to work'],
                ['aufstehen / spielen', 'to get up / to play'],
                ['das Kino / die Arbeit', 'cinema / work'],
                ['früh / spät', 'early / late'],
                ['oft / immer / nie', 'often / always / never'],
                ['manchmal', 'sometimes'],
              ],
            },
          ],
        },
        { id: 'de7-d3-drill1', text: 'Drill: write 10 original Satzklammer sentences — modal in position 2, infinitive last, including one question and one negation', tag: 'hard', note: 'The mandatory core drill for today — do not skip it.' },
        { id: 'de7-d3-drill2', text: 'Drill: write 5 sentences using a possessive article in Akkusativ (Ich sehe meinen …)', tag: 'medium' },
        { id: 'de7-d3-check', text: 'Self-check: read your 10 Satzklammer sentences aloud — is the infinitive always the last word?', note: 'If this feels shaky, re-run Day 2\'s Akkusativ drills — the cases build on each other.' },
      ],
    },

    /* ── DAY 4 ── */
    {
      id: 'de-7day-day4',
      title: 'Day 4 — Separable Verbs & Past Tense',
      week: 'Unit 6 · Trennbare Verben & Präteritum',
      items: [
        {
          id: 'de7-d4-1',
          text: 'Ordinal numbers & dates',
          content: [
            { kind: 'para', text: 'Ordinals add **-te** (4th–19th) or **-ste** (20th+) to the number. A few are irregular.' },
            {
              kind: 'table',
              headers: ['Number', 'Ordinal', 'English'],
              rows: [
                ['1', 'erste', 'first (irregular)'],
                ['2', 'zweite', 'second'],
                ['3', 'dritte', 'third (irregular)'],
                ['4', 'vierte', 'fourth'],
                ['7', 'siebte', 'seventh (irregular)'],
                ['20', 'zwanzigste', 'twentieth'],
              ],
            },
            { kind: 'para', text: 'Dates use `am` + ordinal: **am dritten Mai** (written *am 3. Mai*) = on the 3rd of May.' },
          ],
        },
        {
          id: 'de7-d4-2',
          text: 'Separable verbs (trennbare Verben)',
          note: 'The prefix detaches and flies to the end of the clause.',
          content: [
            { kind: 'para', text: 'Many German verbs have a prefix that **splits off** in a main clause and moves to the **end**. In the dictionary they are written as one word.' },
            {
              kind: 'table',
              headers: ['Verb', 'Meaning', 'In a sentence'],
              rows: [
                ['aufstehen', 'to get up', 'Ich stehe um 7 Uhr **auf**.'],
                ['anrufen', 'to call', 'Ich rufe dich **an**.'],
                ['einladen', 'to invite', 'Sie lädt ihre Freunde **ein**.'],
                ['mitkommen', 'to come along', 'Kommst du **mit**?'],
                ['fernsehen', 'to watch TV', 'Wir sehen abends **fern**.'],
              ],
            },
            { kind: 'callout', tone: 'tip', text: 'With a modal verb the prefix stays attached: `Ich muss früh **aufstehen**.` The whole infinitive goes to the end together.' },
          ],
        },
        {
          id: 'de7-d4-3',
          text: 'Präteritum of sein & haben — the past tense that recurs everywhere',
          note: 'Unlike other verbs, sein and haben use this simple past even in speech.',
          content: [
            {
              kind: 'table',
              headers: ['Person', 'sein → war', 'haben → hatte'],
              rows: [
                ['ich', 'war', 'hatte'],
                ['du', 'warst', 'hattest'],
                ['er/sie/es', 'war', 'hatte'],
                ['wir', 'waren', 'hatten'],
                ['ihr', 'wart', 'hattet'],
                ['sie/Sie', 'waren', 'hatten'],
              ],
            },
            {
              kind: 'examples',
              items: [
                { de: 'Ich **war** gestern müde.', en: 'I was tired yesterday.' },
                { de: 'Wir **hatten** keine Zeit.', en: 'We had no time.' },
                { de: '**Warst** du zu Hause?', en: 'Were you at home?' },
              ],
            },
          ],
        },
        {
          id: 'de7-d4-vocab',
          text: 'Day 4 vocabulary — daily routine & past-time words',
          content: [
            {
              kind: 'table',
              headers: ['German', 'English'],
              rows: [
                ['aufstehen / anrufen', 'to get up / to call'],
                ['einladen / mitkommen', 'to invite / to come along'],
                ['gestern', 'yesterday'],
                ['letzte Woche', 'last week'],
                ['letztes Jahr', 'last year'],
                ['der Morgen / der Abend', 'morning / evening'],
              ],
            },
          ],
        },
        { id: 'de7-d4-drill1', text: 'Drill: write today\'s date and your birthday using ordinal numbers', tag: 'easy' },
        { id: 'de7-d4-drill2', text: 'Drill: conjugate 4 separable verbs in full present tense with the prefix split correctly', tag: 'medium' },
        { id: 'de7-d4-drill3', text: 'Drill: replace the noun with an Akkusativ pronoun in 8 sentences (Ich sehe den Mann → Ich sehe ihn)', tag: 'medium' },
        { id: 'de7-d4-drill4', text: 'Drill: write 6 sentences about yesterday using war / hatte', tag: 'medium' },
        { id: 'de7-d4-check', text: 'Self-check: recite sein / haben Präteritum forward and backward without pausing' },
      ],
    },

    /* ── DAY 5 ── */
    {
      id: 'de-7day-day5',
      title: 'Day 5 — Dativ Case',
      week: 'Unit 7 · Indirect objects & dative prepositions',
      items: [
        {
          id: 'de7-d5-1',
          text: 'Dativ case — the indirect object (this one changes everything)',
          note: 'Unlike Akkusativ, the Dativ changes all four genders. Ask "Wem?"',
          content: [
            { kind: 'para', text: 'The **Dativ** marks the **indirect object** — the person *to* or *for* whom something happens. Find it by asking *Wem?* (to whom?).' },
            {
              kind: 'table',
              caption: 'All three cases side by side',
              headers: ['Gender', 'Nominativ', 'Akkusativ', 'Dativ'],
              rows: [
                ['Masculine', 'der / ein', 'den / einen', '**dem / einem**'],
                ['Feminine', 'die / eine', 'die / eine', '**der / einer**'],
                ['Neuter', 'das / ein', 'das / ein', '**dem / einem**'],
                ['Plural', 'die', 'die', '**den** (+n on noun)'],
              ],
            },
            { kind: 'callout', tone: 'warn', text: 'Plural nouns add **-n** in the Dativ if they don\'t already end in -n or -s: `die Kinder → mit den Kinder**n**`.' },
          ],
        },
        {
          id: 'de7-d5-2',
          text: 'Dative prepositions & their contractions',
          note: 'These eight always take Dativ. The contractions are used constantly.',
          content: [
            {
              kind: 'table',
              headers: ['Preposition', 'Meaning', 'Example'],
              rows: [
                ['aus', 'from / out of', 'aus **Deutschland**'],
                ['bei', 'at / near', 'bei **der** Arbeit'],
                ['mit', 'with', 'mit **dem** Auto'],
                ['nach', 'after / to (places)', 'nach **der** Schule · nach Berlin'],
                ['seit', 'since / for', 'seit **einem** Jahr'],
                ['von', 'from / of', 'von **einem** Freund'],
                ['zu', 'to (people/places)', 'zu **dem** Arzt'],
                ['gegenüber', 'opposite', 'gegenüber **dem** Hotel'],
              ],
            },
            {
              kind: 'table',
              caption: 'Must-know contractions',
              headers: ['Full form', 'Contraction'],
              rows: [
                ['zu dem', 'zum (zum Bahnhof)'],
                ['zu der', 'zur (zur Schule)'],
                ['bei dem', 'beim (beim Arzt)'],
                ['von dem', 'vom (vom Bahnhof)'],
              ],
            },
          ],
        },
        {
          id: 'de7-d5-3',
          text: 'Coordinating conjunctions — und, oder, aber',
          content: [
            { kind: 'para', text: 'These three simply glue two main clauses together. They **do not** change the word order — the verb stays in position 2 in each clause.' },
            {
              kind: 'examples',
              items: [
                { de: 'Ich lerne Deutsch **und** ich lerne Englisch.', en: 'I learn German and I learn English.' },
                { de: 'Willst du Kaffee **oder** Tee?', en: 'Do you want coffee or tea?' },
                { de: 'Ich bin müde, **aber** ich muss arbeiten.', en: 'I am tired, but I have to work.' },
              ],
            },
          ],
        },
        {
          id: 'de7-d5-vocab',
          text: 'Day 5 vocabulary — transport, family & connectors',
          content: [
            {
              kind: 'table',
              headers: ['German', 'English'],
              rows: [
                ['der Bus / der Zug / das Auto', 'bus / train / car'],
                ['die Mutter / der Vater', 'mother / father'],
                ['die Familie', 'family'],
                ['und / oder / aber', 'and / or / but'],
                ['wohnen / fahren', 'to live / to travel'],
                ['das Zuhause', 'home'],
              ],
            },
          ],
        },
        { id: 'de7-d5-drill1', text: 'Drill: decline the Dativ article in 10 sentences (Ich helfe ___ Mann / Frau / Kind / Freund …)', tag: 'medium' },
        { id: 'de7-d5-drill2', text: 'Drill: write one sentence for each of the 8 dative prepositions', tag: 'medium' },
        { id: 'de7-d5-drill3', text: 'Drill: use the 4 contractions (zum, zur, beim, vom) in 4 original sentences', tag: 'easy' },
        { id: 'de7-d5-drill4', text: 'Drill: join 6 sentence pairs using und / oder / aber', tag: 'easy' },
        { id: 'de7-d5-drill5', text: 'Drill: write 5 mixed sentences combining a modal verb (Day 3) with a dative preposition', tag: 'hard' },
        { id: 'de7-d5-check', text: 'Self-check: do you add -n to plural nouns in the Dativ? Can you list all 8 dative prepositions in one breath?' },
      ],
    },

    /* ── DAY 6 ── */
    {
      id: 'de-7day-day6',
      title: 'Day 6 — Imperative & Two-Way Prepositions',
      week: 'Units 8–9 · The biggest conceptual jump',
      items: [
        {
          id: 'de7-d6-1',
          text: 'The imperative — du / ihr / Sie side by side',
          content: [
            {
              kind: 'table',
              headers: ['Verb', 'du', 'ihr', 'Sie'],
              rows: [
                ['kommen', 'Komm!', 'Kommt!', 'Kommen Sie!'],
                ['nehmen*', 'Nimm!', 'Nehmt!', 'Nehmen Sie!'],
                ['warten', 'Warte!', 'Wartet!', 'Warten Sie!'],
                ['sein', 'Sei!', 'Seid!', 'Seien Sie!'],
              ],
            },
            { kind: 'callout', tone: 'tip', text: '*Strong verbs with an e→i vowel change keep it in the du-imperative but drop the -st: `du nimmst → Nimm!`' },
          ],
        },
        {
          id: 'de7-d6-2',
          text: 'sollen, dürfen & the nicht dürfen trap',
          note: 'This is the #1 A1 meaning trap — get it clear now.',
          content: [
            {
              kind: 'table',
              headers: ['Modal', 'Meaning', 'Example'],
              rows: [
                ['müssen', 'must / have to (necessity)', 'Ich muss zur Arbeit.'],
                ['sollen', 'should / supposed to', 'Ich soll mehr schlafen.'],
                ['dürfen', 'may / allowed to', 'Darf ich hier parken?'],
              ],
            },
            { kind: 'callout', tone: 'warn', text: '**nicht dürfen ≠ nicht müssen.** `Du darfst nicht rauchen` = you **may not** smoke (forbidden). `Du musst nicht rauchen` = you **don\'t have to** smoke (optional). Mixing these reverses the meaning.' },
          ],
        },
        {
          id: 'de7-d6-3',
          text: 'sein + adjective — predicate adjectives take no endings',
          content: [
            { kind: 'para', text: 'When an adjective comes **after** `sein`, it never changes: `Das Auto ist schnell.` Adjectives *before* a noun do decline — but that\'s a B1 topic, so ignore it for the exam.' },
            {
              kind: 'examples',
              items: [
                { de: 'Die Frau ist **glücklich**.', en: 'The woman is happy.' },
                { de: 'Das Essen ist **gut**.', en: 'The food is good.' },
                { de: 'Die Kinder sind **müde**.', en: 'The children are tired.' },
              ],
            },
          ],
        },
        {
          id: 'de7-d6-4',
          text: 'Two-way prepositions — Wohin (Akkusativ) vs. Wo (Dativ)',
          note: 'The big conceptual jump. Ask motion-or-position before choosing the case.',
          content: [
            { kind: 'para', text: 'Nine prepositions can take **either** case. The rule: **movement toward** a place → Akkusativ (answers *Wohin?*). **Static position** → Dativ (answers *Wo?*).' },
            {
              kind: 'table',
              caption: 'The distinction in action',
              headers: ['Question', 'Case', 'Example'],
              rows: [
                ['Wohin? (where to)', 'Akkusativ', 'Ich gehe in **die** Schule.'],
                ['Wo? (where)', 'Dativ', 'Ich bin in **der** Schule.'],
                ['Wohin?', 'Akkusativ', 'Er geht ins (in **das**) Kino.'],
                ['Wo?', 'Dativ', 'Er ist im (in **dem**) Kino.'],
              ],
            },
            { kind: 'heading', text: 'The nine two-way prepositions' },
            { kind: 'list', items: [
              '`an` (at/on), `auf` (on top of), `in` (in/into)',
              '`über` (over), `unter` (under), `vor` (in front of)',
              '`hinter` (behind), `neben` (next to), `zwischen` (between)',
            ]},
            { kind: 'callout', tone: 'tip', text: 'At A1 you mostly use **in, an, auf**. Master those three first; the others follow the same rule.' },
          ],
        },
        {
          id: 'de7-d6-vocab',
          text: 'Day 6 vocabulary — places, adjectives & direction words',
          content: [
            {
              kind: 'table',
              headers: ['German', 'English'],
              rows: [
                ['das Zimmer / das Kino', 'room / cinema'],
                ['der Arzt / die Schule', 'doctor / school'],
                ['glücklich / traurig', 'happy / sad'],
                ['schnell / langsam', 'fast / slow'],
                ['wo / wohin', 'where / where to'],
                ['in / an / auf', 'in / at / on'],
              ],
            },
          ],
        },
        { id: 'de7-d6-drill1', text: 'Drill: write the same 3 commands in du / ihr / Sie forms — 9 sentences total', tag: 'medium' },
        { id: 'de7-d6-drill2', text: 'Drill: write 4 müssen vs. nicht dürfen contrast pairs that show the meaning difference', tag: 'hard' },
        { id: 'de7-d6-drill3', text: 'Drill: write 6 sentences with sein + adjective (double-check — no endings)', tag: 'easy' },
        { id: 'de7-d6-drill4', text: 'Key drill: for 5 places, write one Wohin (Akkusativ) and one Wo (Dativ) sentence — 10 total', tag: 'hard', note: 'The highest-value drill of the week. Mark the contraction you used in each (ins / im, in die / in der).' },
        { id: 'de7-d6-check', text: 'Self-check: given a random sentence, can you tell in under 3 seconds whether it needs Wohin or Wo?', note: 'If not, that\'s expected — redo the key drill tomorrow morning before the mock test.' },
      ],
    },

    /* ── DAY 7 ── */
    {
      id: 'de-7day-day7',
      title: 'Day 7 — Full Review & Mock Test',
      week: 'Test day · Consolidate everything',
      items: [
        {
          id: 'de7-d7-1',
          text: 'Morning re-drill — hit your three weakest topics (90 min)',
          content: [
            { kind: 'para', text: 'Spend ~20 minutes each on your three weakest areas from the self-checks. For most learners the priority order is:' },
            { kind: 'list', ordered: true, items: [
              'Akkusativ vs. Dativ article choice',
              'Two-way prepositions — Wo vs. Wohin',
              'Satzklammer word order with modal verbs',
            ]},
          ],
        },
        {
          id: 'de7-d7-2',
          text: 'The A1 exam format — know what\'s coming',
          note: 'Based on the Goethe / telc Start Deutsch 1 structure. Confirm against your provider.',
          content: [
            {
              kind: 'table',
              headers: ['Section', 'Time', 'What it tests'],
              rows: [
                ['Hören (Listening)', '~20 min', 'Short dialogues & announcements — numbers, times, names'],
                ['Lesen (Reading)', '~25 min', 'Short texts, ads, forms — find key information'],
                ['Schreiben (Writing)', '~20 min', 'Fill a form + write a short personal message (5–6 sentences)'],
                ['Sprechen (Speaking)', '~15 min', 'Introduce yourself, ask & answer, make a request'],
              ],
            },
          ],
        },
        {
          id: 'de7-d7-3',
          text: 'The three traps that catch almost everyone',
          content: [
            { kind: 'list', ordered: true, items: [
              '**Only masculine changes in Akkusativ** — feminine, neuter and plural look identical to the Nominativ. Don\'t "fix" what isn\'t broken.',
              '**"halb sechs" = 5:30, not 6:30** — halb means half *of* the coming hour.',
              '**nicht dürfen ≠ nicht müssen** — one is forbidden, the other is optional.',
            ]},
          ],
        },
        { id: 'de7-d7-drill1', text: 'Drill: listen to one Easy German / DW Nicos Weg clip straight through, then answer comprehension questions from memory', tag: 'medium', url: 'https://learngerman.dw.com/en/nicos-weg/c-36519789' },
        { id: 'de7-d7-drill2', text: 'Drill: write one practice personal letter — an invitation, an apology, or a self-introduction', tag: 'medium' },
        { id: 'de7-d7-drill3', text: 'Drill: record yourself introducing yourself for 60 seconds, then check verb position 2 on playback', tag: 'medium' },
        { id: 'de7-d7-drill4', text: 'Drill: take the A1 Basics quiz timed — aim for 9–10/10 this time', tag: 'hard' },
        { id: 'de7-d7-drill5', text: 'Drill: sweep every vocabulary table from Day 1–6 one more time — the easiest points to secure', tag: 'easy' },
        { id: 'de7-d7-checklist', text: 'Exam-day checklist: ID + registration packed, arrive 20–30 min early, blue/black pen + a watch (phones usually banned)' },
      ],
    },
  ],
};
