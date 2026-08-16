import type { Day } from '~/types'

export const EXAM_DATE = '2026-09-25'

/**
 * Exam day is an entry in DAYS so you can navigate to it, but it is not a study
 * day — counting it gives 35 and contradicts every other number we quote.
 * A day with no slots is not a day of work.
 */
export function studyDays() {
  return DAYS.filter(d => d.slots.length > 0)
}

/**
 * 34 study days. The Alps week (14.–21.09.) is absent on purpose — it is rest,
 * not a gap to be filled. Strategy and gates live in /kalender.
 */
export const DAYS: Day[] = [
  // ── Woche 1 · Neustart ────────────────────────────────────────────────
  {
    date: '2026-08-14', kind: 'class', setup: true,
    headline: 'ÜT4 Hörverstehen, ganz durch',
    tagline: 'Zweiter Durchgang. Ziel 20 von 25 — beim ersten Mal waren es 14.',
    needs: ['MP3 auf dem Handy', 'ÜT4 PDF am Bildschirm'],
    thema: { title: 'Reise', cards: ['Stefanie Berger, 24, Studentin', 'Klaus Schmidt, 31, Kundenberater'] },
    aufgabe: 'Ihr Kurs macht am Samstag einen Ausflug in die Berge. Planen Sie ihn gemeinsam.', aufgabeEn: 'Your class is going on a trip to the mountains on Saturday. Plan it together.',
    slots: [
      { place: 'gym', minutes: 15, datei: 'telc-b1-uebungstest-4-hoerverstehen.mp3', what: 'Kopfhörer auf, ÜT4 <b>Teil 1</b> (die ersten 8 Minuten) einmal laufen lassen. Nichts ankreuzen — nur hören.', en: 'Headphones on, ÜT4 Teil 1 (first 8 minutes), play it once. Tick nothing — just listen.', note: 'Du kennst den Text schon. Achte diesmal nur auf <b>immer / nur / alle</b>.' },
      { place: 'sofa', minutes: 35, datei: 'telc-b1-uebungstest-4-hoerverstehen.mp3', what: 'Das ganze Hörverstehen, <b>22 Minuten am Stück</b>, mit den Aufgaben am Bildschirm. Nicht pausieren, nicht zurückspulen.', en: 'The whole listening paper, 22 minutes straight, with the answer sheet. No pausing, no rewinding.', note: 'Danach mit dem Lösungsschlüssel vergleichen und nur die Zahl notieren — die Analyse machen wir zusammen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze auf Deutsch: Was war schwerer als erwartet?', en: 'Three sentences in German: what was harder than you expected?', note: 'Egal wie holprig. Es geht ums Schreiben, nicht ums Richtigsein.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-15', kind: 'big',
    headline: 'Teil 1 + Teil 3, in der App',
    tagline: 'Kein Stapel startet kalt. Erst aufwärmen, dann die Uhr.',
    needs: ['Laptop + deutsche Tastatur'],
    slots: [
      { place: 'sofa', minutes: 15, karten: ['v-reise', 'falle'], what: 'Kartenrunde <b>Reisen</b> + <b>Fallen</b> — laut, auf Deutsch. Das ist das Aufwärmen, nicht der Test.', en: 'Card round: travel + traps — out loud, in German. This is the warm-up, not the test.', note: 'Absichtlich <i>nicht</i> die Wörter aus ÜT4 (Arbeit, Büro, Durchsagen). Sonst misst der Test die letzten zehn Minuten statt der letzten zwei Wochen.' },
      { place: 'sofa', minutes: 10, karten: ['falle'], what: 'Die <b>30-Sekunden-Routine</b>: sechs neue Karten. Danach fünf Aussagen lesen und je das <b>Scharnier</b> laut sagen — nicht markieren.', en: 'The 30-second routine: six new cards. Then read five statements and say the hinge word of each one out loud — do not mark them.', note: 'Teil 1 kalt war 2/5. Nicht das Ohr, sondern die Lesezeit: 30 Sekunden für fünf Aussagen sind 6 Sekunden pro Satz.' },
      { place: 'sofa', minutes: 20, hoeren: ['eigen-01-teil1'], what: '<b>Teil 1, kalt, mit Uhr.</b> Fünf Aussagen, 30 Sekunden Lesezeit, dann einmal hören. Ankreuzen, abschicken.', en: 'Teil 1, cold, on the clock. Five statements, 30 seconds to read, then one listen. Tick, submit.', note: 'Genau die Routine von eben — heute zum ersten Mal unter Zeitdruck. Nie ein Feld leer lassen.' },
      { place: 'sofa', minutes: 30, hoeren: ['eigen-01-teil3'], what: '<b>Teil 3: fünf Durchsagen</b>, jede zweimal. Direkt im Anschluss, ohne Pause dazwischen — das ist der Stapel.', en: 'Teil 3: five announcements, each twice. Straight after Teil 1, no break — that is what makes it a stack.', note: 'Teil 3 war in ÜT4 dein bester Teil (5/5). Der hier ist härter gebaut: die Fallen sitzen im Register der Durchsagen.' },
      { place: 'sofa', minutes: 30, what: 'Beide Teile Zeile für Zeile gegen das Transkript — es steht unter jeder Übung. Jeder Fehler bekommt einen Fallentyp, dann schick mir die Zahlen.', en: 'Both Teile line by line against the transcript (it sits under each exercise). Give every mistake a trap type, then send me the numbers.', note: 'Nicht „was war die richtige Antwort", sondern „welche Falle war das". Ein Fehler ohne Kategorie kommt wieder.' },
      { place: 'sofa', minutes: 35, datei: 'telc-b1-uebungstest-4-hoerverstehen.mp3', what: '<b>Zugabe, nur wenn die ÜT4-Datei schon auf dem Handy ist:</b> das ganze Hörverstehen am Stück, Aufgaben am Bildschirm.', en: 'Encore, only if the ÜT4 file is already on your phone: the whole listening paper in one go, questions on screen.', note: 'Ohne die Datei ist der Tag trotzdem voll. Sonntag holen wir die Datei aufs Handy — dann steht der zweite Durchgang zum Ziel 16/20.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze: ein Wort, das du heute zum ersten Mal wirklich verstanden hast.', en: 'Three sentences: one word you truly understood for the first time today.' },
    ],
    deck: ['v-reise', 'falle'],
  },
  {
    date: '2026-08-16', kind: 'big',
    headline: 'Voller Probetest am Laptop — ÜT1 Schule',
    tagline: 'Heute läuft nichts in der App: der Mock läuft am Rechner, im telc-Layout.',
    needs: ['Laptop', 'deutsche QWERTZ-Tastatur', 'Kopfhörer'],
    slots: [
      { place: 'sofa', minutes: 15, what: '⌨️ <b>Deutsche Tastatur einrichten und warmtippen</b> — Systemeinstellungen → Tastatur → Eingabequellen → „Deutsch". Dann zehn Minuten tippen: ä ö ü ß, y und z vertauscht.', en: 'Set up the German keyboard and warm up — System Settings → Keyboard → Input Sources → German. Then type for ten minutes: ä ö ü ß, y and z swapped.', note: 'Der Brief im Mock wird auf genau dieser Tastatur getippt — wie am 25.09.' },
      { place: 'sofa', minutes: 160, what: '🖥️ <b>Der Mock — am Laptop, nicht hier.</b> <code>~/projects/learning/german/mock/ut1-schule.html</code> im Browser öffnen. Ablauf wie in der echten Prüfung: Lesen + Sprachbausteine <b>90 min</b> → Hören ca. 30 min → Brief <b>30 min</b>, getippt. Nicht pausieren, nie ein Feld leer lassen.', en: 'The mock — on the laptop, not here. Open ~/projects/learning/german/mock/ut1-schule.html in the browser. Real exam order: Lesen + Sprachbausteine 90 min → Hören ~30 min → Brief 30 min, typed. No pausing, never leave a field blank.', note: 'Am Ende erzeugt die Seite <b>einen Bericht</b> — kopieren und mir im Chat schicken. Die Analyse machen wir zusammen, in einer Sitzung.' },
      { place: 'sofa', minutes: 20, what: '🗣 <b>Sprechen-Mock mit Gemini</b> — den Prompt aus <code>mock/sprechen-gemini-prompt-schule.md</code> einfügen und die drei Teile durchspielen. Pausen sind erlaubt; einmal korrigieren, dann weiter.', en: 'Speaking mock with Gemini — paste the prompt from mock/sprechen-gemini-prompt.md and run all three parts. Pauses are allowed; correct once, then move on.', note: 'Transkript oder Notizen mit in den Bericht.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über den Test — auf der deutschen Tastatur getippt.', en: 'Three sentences about the test — typed on the German keyboard.' },
    ],
    deck: ['falle'],
  },

  // ── Woche 2 · Hörverstehen Teil 2 ─────────────────────────────────────
  {
    date: '2026-08-17', kind: 'class',
    headline: 'Wortschatz: Arbeit & Beruf',
    tagline: 'Die Wörter, an denen Teil 1 gescheitert ist.',
    thema: { title: 'Arbeiten in der Gastronomie', cards: ['Alexander, 29, Hotelrestaurant', 'Angelika, 46, Tochter in der Ausbildung'] },
    aufgabe: 'Sie wollen zusammen ein Abendessen für vier Gäste kochen. Planen Sie Einkauf, Rezept, Kosten und wer was macht.', aufgabeEn: 'You want to cook dinner for four guests together. Plan the shopping, the recipe, the cost and who does what.',
    slots: [
      { place: 'gym', minutes: 15, karten: ['v-buero'], what: 'Kartenrunde <b>Büro &amp; Telefon</b> — alle 6 Karten, zweimal durch.', en: 'Card round: office & telephone — all 6 cards, twice through.', note: 'Genau dafür ist die Zeit zwischen den Sätzen da. Die 20 Arbeitswörter kommen abends.' },
      { place: 'sofa', minutes: 35, karten: ['v-arbeit'], what: 'Das Themenfeld <b>Arbeit &amp; Beruf</b> — 25 Karten, hier im Block. Danach schreib mir: ich drille sie hart, mit Sätzen statt Übersetzungen.', en: 'The word field work & career — 25 cards, here in this block. Then message me: I drill them hard, in sentences rather than translations.', note: 'Umdrehen zeigt die deutsche Erklärung <i>und</i> die englische Bedeutung.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit drei neuen Wörtern von heute.', en: 'Three sentences using three new words from today.' },
    ],
    deck: ['v-arbeit', 'v-buero'],
  },
  {
    date: '2026-08-18', kind: 'day',
    headline: 'Brief #1 — 30 Minuten, getippt',
    tagline: 'Neu ab 16.08.: Schreiben ist der Engpass (Mock: Brief 21/45, HV 80 %).',
    needs: ['Laptop + deutsche QWERTZ-Tastatur'],
    aufgabe: 'Die Firma plant eine Weihnachtsfeier. Planen Sie mit einer Kollegin Termin, Ort, Essen und Budget.', aufgabeEn: 'The company is planning a Christmas party. With a colleague, plan the date, the place, the food and the budget.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief-Mechanik</b>.', en: 'Card round: letter mechanics.' },
      { place: 'sofa', minutes: 35, what: '✍️ <b>Brief #1, 30 Minuten, getippt, mit Uhr</b> — QWERTZ, Rechtschreibprüfung aus. Vor dem Tippen die 4 Leitpunkte als Checkliste antippen; <b>Liebe/r nach Genus</b>. Danach den Text an mich — ich prüfe gegen die Mock-Fehlerliste (Ledger 44–46).', en: 'Letter #1, 30 minutes, typed, on the clock — QWERTZ, spellcheck off. Tap the 4 guide points as a checklist before typing; Liebe/r by gender. Then send me the text — I grade it against the mock error list.', note: 'Der Mock hat gezeigt: Leitpunkt vergessen und „Lieber Maria" kosten mehr als jede Vokabel. WPM notieren — Baseline ist 10.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>Erst der Null-äh-Drill</b>: dein Teil-1-Intro einmal laut, null Füllwörter — stille Pausen sind erlaubt und erwünscht. <b>Dann KI-Runde, 10 Minuten</b> (Prompt unter <i>Sprechen</i>, jetzt mit Teil-Ansagen). Danach drei Sätze aufschreiben, die gefehlt haben.', en: 'First the zero-filler drill: your Teil 1 intro once, out loud, zero fillers — silent pauses are allowed and encouraged. Then the 10-minute speaking round (prompt under Sprechen, now with proper announcements). Afterwards write down three missing sentences.', note: 'Baseline vom 16.08.: äh/ähm alle 2–3 Wörter. Die Regel: still denken statt äh — und kein englisches „so". Wortfeld <b>Arbeit</b>.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-19', kind: 'class',
    headline: 'Präp + Kasus — die Wiederholungstäter-Familie',
    tagline: 'Vier Mock-Fehler, eine Regel: das Verb nennt die Präposition, die Präposition den Kasus.',
    thema: { title: 'Stress', cards: ['Claudia Gärtner, 42, Sekretärin', 'Andreas Elbert, 35, Verkaufsleiter'] },
    aufgabe: 'Sie organisieren einen gemeinsamen Lernnachmittag vor der Prüfung. Einigen Sie sich auf Termin, Ort, Dauer und Pausen.', aufgabeEn: 'You are organising a joint study afternoon before the exam. Agree on date, place, length and breaks.',
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Grammatik</b>.', en: 'Card round: grammar.' },
      { place: 'sofa', minutes: 35, what: '⚙️ <b>Präp+Kasus-Familie im Chat</b>: <i>sauer auf + Akk · teilnehmen an + Dat · sich freuen auf · helfen + Dat (→ denen)</i> — 20 Lücken, dann Briefsätze von gestern reparieren.', en: 'The preposition+case family in chat: 20 gaps, then repair yesterday\'s letter sentences.', note: 'Vier Mock-Fehler kamen aus genau dieser Familie (Ledger 39, 43) — SB 23/34 und zweimal im Brief.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit <i>obwohl</i>, <i>trotzdem</i>, <i>deshalb</i>.', en: 'Three sentences using obwohl, trotzdem, deshalb.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-20', kind: 'day',
    headline: 'Paraphrasen-Drill — gegen den Falsch-Negativ-Bias',
    tagline: 'Mock-Befund: 3 von 4 HV-Fehlern waren richtige Aussagen, als falsch markiert.',
    aufgabe: 'Nächste Woche fängt ein neuer Kollege an. Planen Sie gemeinsam seinen ersten Arbeitstag.', aufgabeEn: 'A new colleague starts next week. Plan their first day at work together.',
    slots: [
      { place: 'gym', minutes: 15, hoeren: ['eigen-01-teil2'], what: 'Teil 2 noch einmal hören — ohne die Aussagen zu sehen, nur zuhören.', en: 'Listen to Teil 2 again — without looking at the statements, just listen.', note: 'Beim zweiten Hören ohne Papier hörst du plötzlich Sätze, die vorher nicht da waren.' },
      { place: 'sofa', minutes: 35, hoeren: ['eigen-01-teil2'], what: 'Transkript mitlesen: <b>jede Aussage ihrer Paraphrase im Text zuordnen</b> — laut („aufhören heißt: nicht mehr zusammen spielen"). Danach 10 neue ✓/✗-Aussagen im Chat.', en: 'Read along with the transcript: match every statement to its paraphrase in the text, out loud. Then 10 new true/false statements in chat.', note: 'Die Regel aus dem Mock: Wortgleichheit gefunden → Falle vermuten. Keine Wortgleichheit → Paraphrase suchen, nicht automatisch „falsch" tippen.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Benutze bewusst die Wörter von gestern: der Ablauf, die Schicht, der Vorgesetzte, einstellen.' },
    ],
    deck: ['v-buero', 'koll'],
  },
  {
    date: '2026-08-21', kind: 'class',
    headline: 'Brief #2 — alle 4 Leitpunkte, null Mechanikfehler',
    tagline: 'telc ist digital. Deutsche Tastatur, Autokorrektur aus, Uhr läuft.',
    needs: ['Laptop + deutsche Tastatur'],
    thema: { title: 'Zukunftspläne', cards: ['Jana, 16, Schülerin', 'Max, 17, Schüler'] },
    aufgabe: 'Sie möchten nach B1 zusammen weiterlernen. Wählen Sie gemeinsam einen Kurs aus und planen Sie die Anmeldung.', aufgabeEn: 'You want to carry on learning together after B1. Choose a course together and plan how to enrol.',
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Brief-Mechanik</b> + Grammatik.', en: 'Card round: letter mechanics + grammar.' },
      { place: 'sofa', minutes: 35, what: 'Ein Brief, <b>30 Minuten, getippt, mit Uhr</b> — deutsche Tastatur, Autokorrektur und Rechtschreibprüfung aus. Dann den Text hierher kopieren.', en: 'One letter, 30 minutes, typed, on the clock — German keyboard, autocorrect and spellcheck off. Then copy the text over to me.', note: 'Checkliste vorher lesen: Betreff · Anrede + Gruß · alle 4 Leitpunkte · Schluss mit einer Frage.' },
    ],
    deck: ['brief', 'gramm', 'digital'],
  },
  {
    date: '2026-08-22', kind: 'big',
    headline: 'Stapel (3): HV 1 + HV 2 + SB 2 — Prüfungstraining MT1',
    tagline: 'Frisches Material. Zweieinhalb Stunden am Stück.',
    needs: ['Laptop', 'Kopfhörer'],
    slots: [
      { place: 'sofa', minutes: 150, what: 'Drei Teile hintereinander, mit Uhr, ohne Pause: <b>HV Teil 1 + Teil 2 (Prüfungstraining Modelltest 1)</b>, dann <b>SB Teil 2</b>. Claude baut Audio + Aufgabenblatt bis Freitag.', en: 'Three Teile back to back, on the clock, no break: HV Teil 1 + 2 (Prüfungstraining Modelltest 1), then SB Teil 2. Claude builds the audio and task sheet by Friday.', note: 'Die Rampe: letzte Woche voller Mock, heute gezielter Dreier-Stapel. Teil 2: erst Paraphrase suchen, dann ankreuzen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze: an welcher Stelle ist die Konzentration weggebrochen?', en: 'Three sentences: at which point did your concentration break?' },
    ],
    deck: ['v-arbeit', 'falle'],
  },
  {
    date: '2026-08-23', kind: 'day',
    headline: 'Analyse + Gate',
    tagline: 'Gate: Brief #2 ohne Mechanikfehler? HV Teil 2 ≥ 8/10?',
    needs: ['deine Antworten'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde, gemischt.', en: 'Card round, mixed.' },
      { place: 'sofa', minutes: 40, what: 'Ergebnisse an mich (1 Minute) → Fehleranalyse zusammen im Chat → Ledger. <b>Quelle für Woche 3 aus der Ersatzbank bestätigen.</b>', en: 'Results to me (1 minute) → error analysis together in chat → ledger. Confirm next week\'s source from the reserve bank.', note: 'Gate verfehlt heißt: Woche 3 bleibt auf Schreiben, Sprachbausteine rutschen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über die Woche.', en: 'Three sentences about the week.' },
    ],
    deck: ['koll', 'gramm'],
  },

  // ── Woche 3 · vertiefen ───────────────────────────────────────────────
  {
    date: '2026-08-24', kind: 'class',
    headline: 'Wortschatz: Wohnen & Nachbarschaft',
    tagline: 'Neues Themenfeld, gleiche Methode.',
    thema: { title: 'Nachbarn', cards: ['Streif, 24, Büroangestellte', 'Horst Gebhardt, 21, Büroangestellter'] },
    aufgabe: 'Sie planen ein Grillfest im Hof für die Nachbarn. Klären Sie Termin, Einladung, Essen und Unkostenbeitrag.', aufgabeEn: 'You are planning a barbecue in the courtyard for the neighbours. Settle the date, the invitation, the food and the contribution to costs.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Durchsagen &amp; Kollokationen</b>.', en: 'Card round: announcements & collocations.' },
      { place: 'sofa', minutes: 35, karten: ['v-wohnen'], what: 'Das Themenfeld <b>Wohnen &amp; Nachbarn</b> — 20 Karten: Miete, Nebenkosten, Hausordnung, Ruhezeit. Danach im Chat abfragen lassen.', en: 'The word field living & neighbours — 20 cards: rent, utilities, house rules, quiet hours. Then let me test you in chat.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über deine Wohnung.', en: 'Three sentences about your flat.' },
    ],
    deck: ['v-ansage', 'koll'],
  },
  {
    date: '2026-08-25', kind: 'day',
    headline: 'HV Teil 2, kalt (neuer Test)',
    tagline: 'Zweiter Anlauf am teuersten Teil.',
    needs: ['Audio'],
    aufgabe: 'Das Treppenhaus in Ihrem Haus soll gestrichen werden. Planen Sie mit Ihrem Nachbarn Termin, Material und wer was macht.', aufgabeEn: 'The stairwell in your building needs painting. With your neighbour, plan the date, the materials and who does what.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Nur Karten.', en: 'Cards only.' },
      { place: 'sofa', minutes: 35, what: 'Teil 2 kalt, mit Uhr → Antworten an mich. <i>Quelle wird am 23.08. bestätigt (Ersatzbank: Klett MT2 / Prüfungstraining MT2) — Schule-ÜT1 ist seit dem Mock verbraucht.</i>', en: 'Teil 2 cold, on the clock → answers to me. Source confirmed on 23.08 from the reserve bank — Schule ÜT1 was used up by the mock.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Wortfeld <b>Wohnen</b>. Einmal höflich widersprechen — das ist der Punkt, den Teil 3 wirklich zählt.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-26', kind: 'class',
    headline: 'Absolutizer-Radar',
    tagline: 'immer · ganz · nur · alle · nie — zwei Fehler allein daran.',
    thema: { title: 'Ausziehen und alleine wohnen', cards: ['Carsten Daubner, 18, Auszubildender', 'Jenny Groh, 21, Studentin'] },
    aufgabe: 'Ein Freund zieht um und braucht Hilfe. Planen Sie Termin, Transporter, Helfer und Verpflegung.', aufgabeEn: 'A friend is moving house and needs help. Plan the date, the van, the helpers and the food.',
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Fallen</b>, bis alle sitzen.', en: 'Card round: traps, until every one of them sits.' },
      { place: 'sofa', minutes: 35, what: '20 Aussagen im Chat: ✓ oder ✗, jedes Mal mit Begründung.', en: '20 statements in chat: ✓ or ✗, with a reason every time.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit Einschränkung: <i>meistens, selten, nur wenn</i>.', en: 'Three sentences that qualify: meistens, selten, nur wenn.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-27', kind: 'day',
    headline: 'Wiederholung + SB-Kollokationen',
    tagline: 'Die Sprachbausteine-Lücken sind Wortschatz, keine Grammatik.',
    needs: ['Audio von Dienstag'],
    aufgabe: 'Sie suchen zusammen eine größere Wohnung. Planen Sie Suche, Besichtigung und Umzug.', aufgabeEn: 'The two of you are looking for a bigger flat. Plan the search, the viewing and the move.',
    slots: [
      { place: 'gym', minutes: 15, datei: 'telc-b1-schule-1-hoerverstehen.mp3', what: 'Teil 2 noch einmal, ohne die Aussagen.', en: 'Teil 2 once more, without the statements.' },
      { place: 'sofa', minutes: 35, datei: 'telc-b1-schule-1-hoerverstehen.mp3', karten: ['koll'], what: 'Wiederholung am Bildschirm, dann Kollokationen aus dem Ledger.', en: 'Repeat on screen, then collocations from the ledger.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Baue <i>sich erkundigen nach</i>, <i>mitteilen</i> und <i>stattfinden</i> ins Gespräch ein — dieselben drei, jetzt gesprochen.' },
    ],
    deck: ['koll'],
  },
  {
    date: '2026-08-28', kind: 'class',
    headline: 'Brief #2 + Sprechen-Format',
    tagline: 'Letzte 15 Minuten: die drei Sprechen-Teile.',
    needs: ['Papier'],
    thema: { title: 'Schöner Wohnen', cards: ['Stefan Heeg, 38, Lehrer', 'Mara Weiß, 39, Teamleiterin'] },
    aufgabe: 'Sie richten gemeinsam ein Zimmer neu ein. Einigen Sie sich auf Möbel, Budget und wer was besorgt.', aufgabeEn: 'You are furnishing a room together. Agree on furniture, budget and who gets what.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.', en: 'Card round: letter.' },
      { place: 'sofa', minutes: 40, what: 'Brief auf Zeit, getippt auf QWERTZ. Danach zeige ich dir den Aufbau der mündlichen Prüfung — geübt wird sie im Kurs.', en: 'Timed letter, typed on QWERTZ. Then I show you the shape of the oral exam — you practise it in class.' },
    ],
    deck: ['brief', 'gramm'],
  },
  {
    date: '2026-08-29', kind: 'big',
    headline: 'Stapel (4): LV 1 + LV 3 + HV 2 + SB 2',
    tagline: 'Zum ersten Mal Lesen und Hören in einer Sitzung.',
    needs: ['Test', 'Audio', 'Laptop'],
    slots: [
      { place: 'sofa', minutes: 150, datei: 'telc-b1-uebungstest-4-hoerverstehen.mp3', what: 'Vier Teile hintereinander, mit Uhr.', en: 'Four Teile back to back, on the clock.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze: welcher Teil hat am meisten Kraft gekostet?', en: 'Three sentences: which Teil cost you the most energy?' },
    ],
    deck: ['v-arbeit', 'v-buero'],
  },
  {
    date: '2026-08-30', kind: 'day',
    headline: 'Analyse + Ledger ausmisten',
    tagline: 'Einträge mit zwei sauberen Treffern werden gestrichen.',
    needs: ['deine Antworten'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde, gemischt.', en: 'Card round, mixed.' },
      { place: 'sofa', minutes: 40, what: 'Analyse → Ledger. <b>15 und 19 stehen kurz vor dem Streichen.</b> Test für nächste Woche nennen.', en: 'Analysis → ledger. Items 15 and 19 are close to being struck off. Name next week\'s test.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.', en: 'Three sentences.' },
    ],
    deck: ['gramm'],
  },

  // ── Woche 4 · Schreiben ───────────────────────────────────────────────
  {
    date: '2026-08-31', kind: 'class',
    headline: 'Wortschatz: Gesundheit + Briefbausteine',
    tagline: 'Woche 4 gehört dem Schreiben — 10 billige Punkte.',
    thema: { title: 'Gesundheit', cards: ['Silke Bauer, 21, Studentin', 'Karsten Martens, 23, Angestellter'] },
    aufgabe: 'Sie wollen zusammen mit Sport anfangen. Planen Sie Fitnessstudio oder Verein, Termine in der Woche und Kosten.', aufgabeEn: 'You want to take up sport together. Plan gym or club, which days of the week, and the cost.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Brief + Grammatik</b>.', en: 'Card round: letter + grammar.' },
      { place: 'sofa', minutes: 35, karten: ['v-gesund'], what: 'Das Themenfeld <b>Gesundheit</b> — 20 Karten: Beschwerden, Rezept, Überweisung, Krankenkasse. Dann eine Phrasenbank für den halbformellen Ton.', en: 'The word field health — 20 cards: symptoms, prescription, referral, health insurance. Then a phrase bank for the semi-formal tone.', note: '„Rezept" und „Überweisung" haben je zwei Bedeutungen — genau daraus baut telc Fallen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit Briefbausteinen.', en: 'Three sentences using letter building blocks.' },
    ],
    deck: ['brief', 'gramm'],
  },
  {
    date: '2026-09-01', kind: 'day',
    headline: 'HV Teil 1 + Teil 3, kalt',
    tagline: 'Die kurzen Teile, frisch getestet.',
    needs: ['Audio'],
    aufgabe: 'Ihr Freund hat sich das Bein gebrochen. Planen Sie gemeinsam, wie Sie ihm die nächsten zwei Wochen helfen.', aufgabeEn: 'Your friend has broken their leg. Plan together how you will help them over the next two weeks.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Nur Karten.', en: 'Cards only.' },
      { place: 'sofa', minutes: 35, datei: 'telc-b1-schule-1-hoerverstehen.mp3', what: 'Beide Teile mit Uhr → Antworten an mich.', en: 'Both Teile on the clock → answers to me.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Wortfeld <b>Gesundheit</b>. Am Ende laut zusammenfassen, worauf ihr euch geeinigt habt.' },
    ],
    deck: ['v-ansage'],
  },
  {
    date: '2026-09-02', kind: 'class',
    headline: 'Sprachbausteine Teil 1 — Grammatik',
    tagline: 'Futur I · geteiltes Hilfsverb · Artikel vs. Pronomen.',
    thema: { title: 'Einkäufe', cards: ['Paul Krügel, 27', 'Juliane Teubert, 18'] },
    aufgabe: 'Sie kaufen zu zweit für eine Party ein. Planen Sie Einkaufsliste, Geschäft, Budget und Transport.', aufgabeEn: 'The two of you are shopping for a party. Plan the list, the shop, the budget and the transport.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Grammatik</b>, alle 11.', en: 'Card round: grammar, all 11.' },
      { place: 'sofa', minutes: 35, what: 'Die drei Ledger-Punkte 10–12, dann 20 Lückensätze im Chat.', en: 'The three ledger points 10–12, then 20 gap sentences in chat.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze im Futur I.', en: 'Three sentences in Futur I.' },
    ],
    deck: ['gramm'],
  },
  {
    date: '2026-09-03', kind: 'day',
    headline: 'Brief #3 auf Zeit',
    tagline: 'Bewertung nach telc-Kriterien I / II / III.',
    needs: ['Papier'],
    aufgabe: 'Sie wollen sich zusammen gesünder ernähren. Planen Sie Einkauf, Kochabende und ein Ziel für vier Wochen.', aufgabeEn: 'You want to eat more healthily together. Plan the shopping, the cooking evenings and a goal for four weeks.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.', en: 'Card round: letter.' },
      { place: 'sofa', minutes: 35, what: '30 Minuten, getippt, Autokorrektur aus, Text an mich.', en: '30 minutes, typed, autocorrect off, send me the text.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Nach dem Brief noch zehn Minuten sprechen — der Kopf ist im Deutschen, das ist die billigste Übung des Tages.' },
    ],
    deck: ['brief'],
  },
  {
    date: '2026-09-04', kind: 'class',
    headline: 'Brief #4 — Reparatur + frisch',
    tagline: 'Ziel: null Mechanikfehler.',
    needs: ['Papier'],
    thema: { title: 'Online Lebensmittel kaufen', cards: ['Tobias Krämer, 27, Student', 'Irina Kovalcik, 25, Webdesignerin'] },
    aufgabe: 'Sie suchen zusammen ein Geschenk für Ihre Lehrerin aus und bestellen es online. Einigen Sie sich auf Geschenk, Preis und Lieferung.', aufgabeEn: 'Together you pick a present for your teacher and order it online. Agree on the present, the price and the delivery.',
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Grammatik</b>.', en: 'Card round: grammar.' },
      { place: 'sofa', minutes: 40, what: 'Erst den schwächsten Absatz von #3 neu schreiben, dann ein frisches Thema.', en: 'First rewrite the weakest paragraph of #3, then take a fresh prompt.' },
    ],
    deck: ['gramm', 'brief'],
  },
  {
    date: '2026-09-05', kind: 'big',
    headline: 'Stapel (5 + Brief)',
    tagline: 'Die schriftliche Hälfte läuft zum ersten Mal ganz durch.',
    needs: ['Test', 'Laptop'],
    slots: [
      { place: 'sofa', minutes: 180, what: 'LV 1–3, SB 1–2 und ein 30-Minuten-Brief. Drei Stunden, mit Uhr, alles am Rechner.', en: 'Reading 1–3, Sprachbausteine 1–2 and a 30-minute letter. Three hours, on the clock, all on the computer.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze: wie fühlten sich die letzten 30 Minuten an?', en: 'Three sentences: how did the last 30 minutes feel?' },
    ],
    deck: ['falle', 'koll', 'digital'],
  },
  {
    date: '2026-09-06', kind: 'day',
    headline: 'Analyse + Gate',
    tagline: 'Gate: HV ≥ 65 %, Schreiben ≥ 30/45.',
    needs: ['deine Antworten'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde.', en: 'Card round.' },
      { place: 'sofa', minutes: 45, what: 'Große Analyse. <b>Verfehlt heißt: Woche 5 streicht die Lesen-Pflege komplett.</b> Test für die Generalprobe festlegen.', en: 'Big analysis. Missing the gate means week 5 drops reading maintenance completely. Fix the test for the dress rehearsal.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.', en: 'Three sentences.' },
    ],
    deck: ['gramm', 'falle'],
  },

  // ── Woche 5 · Integration + Generalprobe ──────────────────────────────
  {
    date: '2026-09-07', kind: 'class',
    headline: 'Wortschatz: Reisen, Verkehr & Behörden',
    tagline: 'Doppelt nützlich — das ist auch dein Alpen-Wortschatz.',
    thema: { title: 'Verkehrsmittel', cards: ['Bernd Kleinefeld, 45, Elektrotechniker', 'Carola Ahrenholz, 25, Sekretärin'] },
    aufgabe: 'Sie fahren gemeinsam zur Prüfung. Planen Sie Verkehrsmittel, Uhrzeit, Treffpunkt und einen Plan B.', aufgabeEn: 'You are travelling to the exam together. Plan the transport, the time, the meeting point and a plan B.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Durchsagen</b> — Einfahrt, Kennzeichen, umgehend.', en: 'Card round: announcements — Einfahrt, Kennzeichen, umgehend.' },
      { place: 'sofa', minutes: 35, karten: ['v-reise'], what: 'Das Themenfeld <b>Reisen &amp; Behörden</b> — 20 Karten: Verspätung, Anschluss, Antrag stellen, Gebühr.', en: 'The word field travel & public offices — 20 cards: delay, connection, filing an application, fee.', note: 'Doppelt nützlich: dieselben Wörter brauchst du nächste Woche in den Alpen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über die geplante Reise.', en: 'Three sentences about the trip you are planning.' },
    ],
    deck: ['v-ansage'],
  },
  {
    date: '2026-09-08', kind: 'day',
    headline: 'HV Teil 2, kalt — der letzte vor der Probe',
    tagline: 'Letzter Einzelteil.',
    needs: ['Audio'],
    aufgabe: 'Sie müssen beide zum Bürgeramt. Planen Sie Termin, Unterlagen und Anfahrt.', aufgabeEn: 'You both have to go to the citizens’ office. Plan the appointment, the documents and how you get there.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Nur Karten.', en: 'Cards only.' },
      { place: 'sofa', minutes: 35, dateien: true, what: 'Teil 2 mit Uhr → Antworten an mich.', en: 'Teil 2 on the clock → answers to me.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Wortfeld <b>Behörden</b>: der Antrag, der Termin, die Unterlagen, die Gebühr.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-09-09', kind: 'class',
    headline: 'Ledger-Sweep',
    tagline: 'Jeder noch offene Eintrag bekommt eine eigene Übung.',
    thema: { title: 'Gruppenreisen', cards: ['Sabine Klostermann, 33, Bürokauffrau', 'Jens Mühle, 39, Physiker'] },
    aufgabe: 'Sie planen ein Wochenende in einer anderen Stadt. Klären Sie Anreise, Übernachtung, Programm und Kosten.', aufgabeEn: 'You are planning a weekend in another city. Settle the journey, the accommodation, the programme and the cost.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde, alles gemischt.', en: 'Card round, everything mixed.' },
      { place: 'sofa', minutes: 35, what: 'Wir gehen das Ledger von oben nach unten durch. Was bleibt, kommt auf den Alpen-Zettel.', en: 'We go through the ledger top to bottom. Whatever is still open goes on the Alps sheet.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.', en: 'Three sentences.' },
    ],
    deck: ['gramm', 'koll', 'falle'],
  },
  {
    date: '2026-09-10', kind: 'day',
    headline: 'Der schwächste Hörteil der Kampagne',
    tagline: 'Noch einmal, gezielt.',
    needs: ['altes Audio'],
    aufgabe: 'Ihr Zug ist ausgefallen. Planen Sie gemeinsam, wie Sie trotzdem rechtzeitig ankommen.', aufgabeEn: 'Your train has been cancelled. Plan together how to get there on time anyway.',
    slots: [
      { place: 'gym', minutes: 15, hoeren: ['eigen-01-teil2'], what: 'Genau diesen Teil hören.', en: 'Listen to exactly that Teil.', note: 'Falls es ein E1-Teil war: die Versuchsliste zeigt dir, welcher der schwächste ist.' },
      { place: 'sofa', minutes: 35, dateien: true, karten: true, what: 'Am Bildschirm, dann Wortschatz-Rettung für alles, was daran gescheitert ist.', en: 'On screen, then a vocabulary rescue for everything it failed on.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Unter Druck planen — genau die Situation, in der dir sonst die Wörter wegbrechen.' },
    ],
    deck: ['v-buero', 'v-ansage'],
  },
  {
    date: '2026-09-11', kind: 'class',
    headline: 'Brief #5 + Redemittel fürs Planen',
    tagline: 'Die Sprechen-Teil-3-Phrasen brauchst du nächste Woche im Bus.',
    needs: ['Papier'],
    thema: { title: 'Urlaub mit Freunden', cards: ['N.N., 29, Ingenieur', 'Tamara Rößner, 31, Lehrerin'] },
    aufgabe: 'Sie planen die Woche in den Alpen: Route, Stellplatz, Einkauf und Essen. Einigen Sie sich am Ende.', aufgabeEn: 'You are planning the week in the Alps: route, pitch, shopping and food. Agree on it at the end.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.', en: 'Card round: letter.' },
      { place: 'sofa', minutes: 40, what: 'Brief auf Zeit. Danach: Redemittel für <i>gemeinsam planen</i> — Vorschlag, Zustimmung, Einwand, Kompromiss.', en: 'Timed letter. Then: phrases for planning together — proposal, agreement, objection, compromise.' },
    ],
    deck: ['brief', 'gramm', 'digital'],
  },
  {
    date: '2026-09-12', kind: 'exam',
    headline: 'GENERALPROBE — die ganze Prüfung',
    tagline: 'LV+SB 90 min · Hören · Schreiben 30 min. Keine Pause, kein Nachschlagen.',
    needs: ['ganzer Test', 'Audio', 'Laptop + deutsche Tastatur', 'Uhr'],
    slots: [
      { place: 'sofa', minutes: 210, datei: 'telc-b1-uebungstest-1-hoerverstehen.mp3', what: 'Dreieinhalb Stunden unter echten Bedingungen: am Rechner, deutsche Tastatur, Brief getippt. Handy weg.', en: 'Three and a half hours under real conditions: on the computer, German keyboard, letter typed. Phone away.', note: 'Ziel: alle Teile ≥ 60 %, Hören ≥ 70 %.' },
      { place: 'bed', minutes: 0, what: 'Nichts. Ausruhen.', en: 'Nothing. Rest.' },
    ],
    // The rehearsal drills no words — only the six cards about operating the
    // machine, which is the one thing a paper mock cannot rehearse.
    deck: ['digital'],
  },
  {
    date: '2026-09-13', kind: 'day',
    headline: 'Große Analyse → Alpen-Zettel packen',
    tagline: 'Eine Seite Lücken, ausgedruckt, kommt mit.',
    needs: ['deine Antworten'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde, gemischt.', en: 'Card round, mixed.' },
      { place: 'sofa', minutes: 50, what: 'Volle Fehleranalyse. Am Ende: eine Seite mit allem, was offen ist — in den Notizen auf dem Handy, im Wohnmobil gibt es keinen Drucker. Dazu Gesprächsthemen für deinen Freund.', en: 'Full error analysis. At the end: one page with everything still open — in your phone notes, there is no printer in a campervan. Plus conversation topics for your friend.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über die Reise.', en: 'Three sentences about the trip.' },
    ],
    deck: ['gramm', 'falle'],
  },

  // ── Rückkehr & Taper ──────────────────────────────────────────────────
  {
    date: '2026-09-22', kind: 'day',
    headline: 'Nur Hörverstehen — Rost abschütteln',
    tagline: 'Zurück aus den Alpen. Sanft anfangen.',
    needs: ['letzter unbenutzter Test'],
    aufgabe: 'Erzählen Sie von den Alpen und planen Sie gemeinsam einen kurzen Ausflug am nächsten Wochenende.', aufgabeEn: 'Talk about the Alps, then plan a short trip together for next weekend.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde vom Alpen-Zettel.', en: 'Card round from the Alps sheet.' },
      { place: 'sofa', minutes: 40, datei: 'goethe-b1-modellsatz-hoeren.mp3', what: 'Ein Hörverstehen komplett, aus dem letzten unbenutzten Test. Danach Zettel durchgehen.', en: 'One complete listening paper, from the last unused test. Then go through the sheet.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Nach acht Tagen Sprechen ist das kein Test, sondern der Beweis. Locker halten.' },
    ],
    deck: ['falle', 'v-ansage'],
  },
  {
    date: '2026-09-23', kind: 'class',
    headline: 'Ein Brief + ein bekanntes Hörstück',
    tagline: 'Bewusst etwas, das du kannst. Selbstvertrauen, keine Herausforderung.',
    needs: ['Papier'],
    thema: { title: 'Familie', cards: ['Anton Majer, 34, Manager', 'Nadja Bergmann, 36, Angestellte'] },
    aufgabe: 'Sie planen eine kleine Feier nach der Prüfung. Einigen Sie sich auf Tag, Ort, Gäste und Essen.', aufgabeEn: 'You are planning a small celebration after the exam. Agree on the day, the place, the guests and the food.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.', en: 'Card round: letter.' },
      { place: 'sofa', minutes: 35, hoeren: ['eigen-01-teil1', 'eigen-01-teil3'], what: 'Brief auf Zeit, dann ein Hörteil, den du schon zweimal gehört hast.', en: 'Timed letter, then a listening Teil you have already heard twice.', note: 'Bewusst ein alter Teil: die Versuchsliste soll heute nach oben zeigen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.', en: 'Three sentences.' },
    ],
    deck: ['brief', 'digital'],
  },
  {
    date: '2026-09-24', kind: 'rest',
    headline: 'Vormittags einmal den Zettel lesen. Dann Schluss.',
    tagline: 'Nach 12 Uhr kein Deutsch mehr.',
    slots: [
      { place: 'gym', minutes: 30, what: 'Den Lückenzettel einmal durchlesen. Nichts Neues.', en: 'Read the gap sheet through once. Nothing new.', note: 'Packen: Ausweis, Anmeldung, zwei Stifte, Uhr.' },
      { place: 'bed', minutes: 0, what: 'Früh ins Bett.', en: 'Early to bed.' },
    ],
    deck: [],
  },
  {
    date: '2026-09-25', kind: 'exam',
    headline: 'telc Deutsch B1',
    tagline: 'Nie ein Feld leer lassen — es gibt keinen Punktabzug.',
    needs: ['Ausweis', 'Anmeldung'],
    slots: [],
    deck: [],
  },
]
