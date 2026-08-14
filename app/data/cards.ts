import type { Card, CardTag } from '~/types'

export const TAG_NAMES: Record<CardTag, string> = {
  'v-arbeit': 'Arbeit',
  'v-buero': 'Büro & Telefon',
  'v-ansage': 'Durchsagen',
  koll: 'Kollokationen',
  gramm: 'Grammatik',
  falle: 'Hörfallen',
  brief: 'Brief',
}

/**
 * Every card is a real miss from Übungstest 4 (learning-records/0004), not
 * generic B1 vocabulary. The `hint` carries the exam item it cost us.
 */
export const CARDS: Card[] = [
  // ── Ledger 6 · Hörverstehen Teil 1, Themenfeld „Arbeit" ──────────────
  { tag: 'v-arbeit', cue: 'ausnützen', answer: 'ausnutzen / ausbeuten — to exploit, take advantage of', example: 'Der Chef <b>nützt</b> seine Mitarbeiter <b>aus</b>.', hint: 'süddt./österr. Form von ausnutzen' },
  { tag: 'v-arbeit', cue: 'abschaffen', answer: 'to abolish, do away with', example: 'Die Firma hat die Gleitzeit <b>abgeschafft</b>.' },
  { tag: 'v-arbeit', cue: 'frech', answer: 'cheeky, impudent', example: 'Sei nicht so <b>frech</b> zu deinen Kollegen!' },
  { tag: 'v-arbeit', cue: 'beschäftigen', answer: 'to employ · sich ~ mit = to occupy oneself with', example: 'Die Firma <b>beschäftigt</b> 200 Leute.' },
  { tag: 'v-arbeit', cue: 'der Ablauf', answer: 'sequence, procedure (also: expiry)', example: 'Der <b>Ablauf</b> des Tages ist genau geplant.' },

  // ── Ledger 7 · Hörverstehen Teil 2 ───────────────────────────────────
  { tag: 'v-buero', cue: 'der Unkostenbeitrag', answer: 'contribution towards costs', example: 'Wir bitten um einen kleinen <b>Unkostenbeitrag</b>.' },
  { tag: 'v-buero', cue: 'überregional', answer: 'nationwide, beyond one region', example: 'eine <b>überregionale</b> Tageszeitung' },
  { tag: 'v-buero', cue: 'der Ansprechpartner', answer: 'contact person', example: 'Wer ist mein <b>Ansprechpartner</b> in dieser Sache?' },
  { tag: 'v-buero', cue: 'besetzt', answer: 'occupied · engaged (phone) · taken (seat)', example: 'Die Leitung ist gerade <b>besetzt</b>.' },
  { tag: 'v-buero', cue: 'stattfinden', answer: 'to take place', example: 'Das Treffen <b>findet</b> am Montag <b>statt</b>.' },
  { tag: 'v-buero', cue: 'die Redaktion', answer: 'editorial office, newsroom', example: 'Fragen Sie bei uns in der <b>Redaktion</b> nach.', hint: 'Falle 47: Redaktion → das läuft im Rundfunk' },

  // ── Ledger 8 · Hörverstehen Teil 3, Durchsagen ────────────────────────
  { tag: 'v-ansage', cue: 'umgehend', answer: 'immediately, without delay', example: 'Bitte melden Sie sich <b>umgehend</b> im Büro.' },
  { tag: 'v-ansage', cue: 'versperren', answer: 'to block, obstruct', example: 'Ein Auto <b>versperrt</b> die Einfahrt.' },
  { tag: 'v-ansage', cue: 'die Einfahrt', answer: 'driveway, vehicle entrance', example: '<b>Einfahrt</b> bitte freihalten!' },
  { tag: 'v-ansage', cue: 'das Kennzeichen', answer: 'licence plate · distinguishing mark', example: 'der Wagen mit dem <b>Kennzeichen</b> M-AB 1234' },
  { tag: 'v-ansage', cue: 'der Schlüsselbund', answer: 'bunch of keys', example: 'Ein <b>Schlüsselbund</b> wurde am Eingang gefunden.' },
  { tag: 'v-ansage', cue: 'das Gericht', answer: 'dish (food) — and also: court of law', example: 'Das <b>Gericht</b> des Tages ist Gulasch.', hint: 'in einer Restaurant-Durchsage nie „Gerichtssaal"' },
  { tag: 'v-ansage', cue: 'die Auswahl', answer: 'selection, choice, range', example: 'eine große <b>Auswahl</b> an warmen Getränken' },

  // ── Ledger 9 · Sprachbausteine-Lücken ────────────────────────────────
  { tag: 'koll', cue: 'Wir ___ uns ein Zimmer.', answer: 'teilen — sich (Dat.) etwas teilen', example: 'Wir <b>teilen uns</b> ein Zimmer.', hint: 'SB 32' },
  { tag: 'koll', cue: 'Bitte antworten Sie so bald wie ___.', answer: 'möglich — so bald wie möglich', example: 'Melden Sie sich bitte <b>so bald wie möglich</b>.', hint: 'SB 37' },
  { tag: 'koll', cue: 'Ich erkundige mich ___ dem Preis.', answer: 'nach — sich erkundigen nach + Dativ', example: 'Ich <b>erkundige mich nach</b> den Öffnungszeiten.', hint: 'SB 38' },
  { tag: 'koll', cue: 'jdm. etwas ___ (= informieren)', answer: 'mitteilen — jdm. etwas mitteilen', example: 'Bitte <b>teilen</b> Sie uns Ihre neue Adresse <b>mit</b>.' },
  { tag: 'koll', cue: 'Ich bin ___ unter 0170 …', answer: 'erreichbar — erreichbar unter + Nummer', example: 'Ich bin <b>erreichbar unter</b> 0170 123456.' },

  // ── Ledger 10–19 · meist aus dem Schriftlichen Ausdruck ───────────────
  { tag: 'gramm', cue: '„ich freue mich auf ihnen besuchen"', answer: 'ich freue mich <b>darauf, dich zu besuchen</b>', example: 'sich freuen <b>auf</b> → da<b>r</b>auf + Komma + zu-Infinitiv', hint: 'Ledger 14 — dein häufigster Briefsatz' },
  { tag: 'gramm', cue: '„… und ihn kennenlernen zu"', answer: '… und ihn <b>kennenzulernen</b>', example: 'Bei trennbaren Verben steht <b>zu</b> in der Mitte: an<b>zu</b>rufen, ein<b>zu</b>laden.', hint: 'Ledger 16' },
  { tag: 'gramm', cue: 'Versprechen: „Ich rufe Sie zurück."', answer: 'Futur I: Ich <b>werde</b> Sie zurück<b>rufen</b>.', example: 'werden + Infinitiv am Satzende — telc prüft das direkt.', hint: 'Ledger 12 · SB 40' },
  { tag: 'gramm', cue: '„mit denen Kollegen"', answer: '<b>mit den</b> Kollegen', example: '<b>denen</b> kann nie vor einem Nomen stehen — es ersetzt das Nomen.', hint: 'Ledger 11 · SB 28' },
  { tag: 'gramm', cue: '„Er hatte sich beworben und hat gemietet."', answer: 'Er <b>hatte</b> sich beworben und … <b>gemietet</b>.', example: 'Ein Hilfsverb trägt beide Partizipien — das zweite <i>hatte</i> fällt weg.', hint: 'Ledger 10 · SB 24' },
  { tag: 'gramm', cue: 'damit oder dann?', answer: '<b>damit</b> = Zweck (so that) · <b>dann</b> = Zeit (then)', example: 'Ich schreibe früh, <b>damit</b> du antworten kannst. — Erst esse ich, <b>dann</b> lerne ich.', hint: 'Ledger 17' },
  { tag: 'gramm', cue: '„mit Einander"', answer: '<b>miteinander</b> — ein Wort', example: 'Wir haben lange <b>miteinander</b> gesprochen.' },
  { tag: 'gramm', cue: '„Ich hoffe dich bald zu sehen"', answer: 'Ich hoffe<b>,</b> dich bald zu sehen.', example: 'Komma vor dem erweiterten zu-Infinitiv.', hint: 'Ledger 18 — billiger Punkt' },
  { tag: 'gramm', cue: 'Satzanfang: „ich danke Ihnen."', answer: '<b>Ich</b> danke Ihnen.', example: '<b>Ihnen</b> bleibt groß — Höflichkeitsform.', hint: 'Ledger 18 — 3× im letzten Brief falsch' },
  { tag: 'gramm', cue: 'Imperativ von „sich beeilen" (du)', answer: '<b>Beeil dich!</b>', example: 'Der Imperativ nimmt die <b>du</b>-Zeile: dich, nicht sich.', hint: 'Ledger 19' },
  { tag: 'gramm', cue: '„Ich erinnere ___ an den Termin."', answer: 'mich — <b>Akkusativ</b>', example: 'Eine Präpositionalphrase ist kein direktes Objekt → kein Dativ-Reflexiv.', hint: 'Ledger 19' },

  // ── Ledger 1–5 · Hörverstehen-Fallentypen ────────────────────────────
  { tag: 'falle', cue: 'Das Wort aus der Aussage kommt im Hörtext vor.', answer: 'Beweist <b>nichts</b>. Wortgleichheit ist die häufigste Falle.', example: 'ÜT4/44: „bezahlen" fällt — aber sie beklagt Ausbeutung und fordert nie mehr Geld.', hint: 'Ledger 2' },
  { tag: 'falle', cue: 'Die Aussage enthält immer / ganz / nur / alle / nie', answer: 'Alarm. Meist <b>falsch</b>, sobald der Text einschränkt.', example: 'ÜT4/48: Telefon ist <b>zu festen Zeiten</b> besetzt, sonst AB → nicht „immer".', hint: 'Ledger 3 — zwei Fehler in einem Test' },
  { tag: 'falle', cue: 'Im Hörtext fällt ein klares „Nein, nicht …"', answer: 'Explizite Verneinung kippt die Aussage — sofort mitschreiben.', example: 'ÜT4/49: „Nein, nicht die Adresse" → die Liste enthält keine Adressen.', hint: 'Ledger 4' },
  { tag: 'falle', cue: '„Alles richtet sich nach der Arbeit."', answer: '= „Das Leben besteht nur noch aus Arbeit." <b>Richtig.</b>', example: 'Paraphrase auf Bedeutungsebene — kein gemeinsames Wort nötig.', hint: 'Ledger 1 · ÜT4/43' },
  { tag: 'falle', cue: '„Das können Sie bei uns in der Redaktion erfragen."', answer: 'Das Interview läuft also im <b>Rundfunk</b>.', example: 'Ort und Situation erschließen, nicht nach dem Wort suchen.', hint: 'Ledger 5 · ÜT4/47' },
  { tag: 'falle', cue: 'Österreich + Belgien — Aussage sagt „ganz Europa"', answer: '<b>Falsch.</b> Zwei Länder sind nicht ein Kontinent.', example: 'Übergeneralisierung: die Aussage macht mehr aus dem Text, als dort steht.', hint: 'Ledger 3 · ÜT4/55' },
  { tag: 'falle', cue: 'Du weißt die Antwort nicht. Was tun?', answer: '<b>Immer ankreuzen.</b> Nie ein Feld leer lassen.', example: 'telc zieht für falsche Antworten nichts ab. Ein Kreuz ist 50 %, ein leeres Feld ist 0 %.', hint: 'Ledger 13 — im Übungstest zweimal leer gelassen' },

  // ── Ledger 18 · Schreiben-Mechanik ───────────────────────────────────
  { tag: 'brief', cue: 'Die vier Dinge, die jeder Brief braucht', answer: '<b>Betreff</b> · Anrede + Gruß · alle 4 Leitpunkte · Schluss mit einer <b>Frage</b>', example: 'Im letzten Test fehlte der Betreff — das kostet in Kriterium II direkt eine Note.', hint: 'Ledger 18' },
  { tag: 'brief', cue: '„Sehr geehrte Damen und Herren," → Gruß?', answer: '<b>Mit freundlichen Grüßen</b>', example: 'Formell ↔ formell. Nie „Liebe Grüße" nach „Sehr geehrte".' },
  { tag: 'brief', cue: '„Liebe Frau Meier," → Gruß?', answer: '<b>Viele Grüße</b> / Herzliche Grüße', example: 'Halbformell — genau der Ton, den telc B1 fast immer verlangt.' },
]
