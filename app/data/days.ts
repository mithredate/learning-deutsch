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
    aufgabe: {
      situation: 'Ihr Deutschkurs möchte am Samstag zusammen einen Ausflug in die Berge machen. Sie haben die Aufgabe, diesen Ausflug zusammen mit Ihrem Gesprächspartner/Ihrer Gesprächspartnerin zu planen. Überlegen Sie sich, was alles zu tun ist und wer welche Aufgaben übernimmt. Sie haben sich schon diese Liste gemacht:',
      en: 'Your German class wants to go to the mountains together on Saturday. Plan the trip with your partner: what has to be done, and who does what.',
      titel: 'Ausflug in die Berge',
      punkte: ['Wann losfahren?', 'Wie hinkommen?', 'Was mitnehmen?', 'Wer organisiert was?', 'Kosten', '…'],
    },
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
    aufgabe: {
      situation: 'Sie und Ihr Gesprächspartner/Ihre Gesprächspartnerin wollen am Wochenende zusammen für vier Gäste kochen. Sie haben die Aufgabe, diesen Abend gemeinsam zu planen. Überlegen Sie sich, was alles zu tun ist und wer welche Aufgaben übernimmt. Sie haben sich schon diese Liste gemacht:',
      en: 'You and your partner want to cook for four guests at the weekend. Plan the evening together: what has to be done, and who does what.',
      titel: 'Abendessen für vier Gäste',
      punkte: ['Wann?', 'Was kochen?', 'Einkauf', 'Getränke', 'Wer bezahlt wofür?', '…'],
    },
    slots: [
      { place: 'gym', minutes: 15, karten: ['v-buero'], what: 'Kartenrunde <b>Büro &amp; Telefon</b> — alle 6 Karten, zweimal durch.', en: 'Card round: office & telephone — all 6 cards, twice through.', note: 'Genau dafür ist die Zeit zwischen den Sätzen da. Die 20 Arbeitswörter kommen abends.' },
      { place: 'sofa', minutes: 35, karten: ['v-arbeit'], what: 'Das Themenfeld <b>Arbeit &amp; Beruf</b> — <b>erst der Kern (12 Karten)</b>, der Rest bleibt zu, bis der Kern sitzt. Danach schreib mir: ich drille sie hart, mit Sätzen statt Übersetzungen.', en: 'The word field work & career — the core 12 cards first; the rest stays locked until the core sits. Then message me: I drill them hard, in sentences rather than translations.', note: 'Niemand behält 25 neue Wörter aus einem Abend. Kern heute, Ausbau, wenn er sitzt.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit drei neuen Wörtern von heute.', en: 'Three sentences using three new words from today.' },
    ],
    deck: ['v-arbeit', 'v-buero', 'brief'],
  },
  {
    date: '2026-08-18', kind: 'day',
    headline: 'Brief #1 — 30 Minuten, getippt',
    tagline: 'Neu ab 16.08.: Schreiben ist der Engpass (Mock: Brief 21/45, HV 80 %).',
    needs: ['Laptop + deutsche QWERTZ-Tastatur'],
    aufgabe: {
      situation: 'In Ihrer Firma soll es im Dezember eine Weihnachtsfeier geben. Ihr Chef hat Sie und eine Kollegin gebeten, die Feier zu organisieren. Sie haben die Aufgabe, alles gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'Your company is having a Christmas party in December. The boss has asked you and a colleague to organise it. Plan it together.',
      titel: 'Weihnachtsfeier',
      punkte: ['Wann?', 'Wo?', 'Essen und Getränke', 'Programm', 'Budget', '…'],
    },
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief-Mechanik</b>.', en: 'Card round: letter mechanics.' },
      { place: 'sofa', minutes: 35, what: '✍️ <b>Brief #1 — Thema „Kino", 30 Minuten, getippt, mit Uhr</b> (QWERTZ, Rechtschreibprüfung aus). Aufgabe: <i>Sie waren im Kino und haben einen Film gesehen. Ihr Freund war auf der Reise und konnte nicht kommen. Schreiben Sie: Wie war der Film? · Was hat Ihnen (nicht) gefallen? · Machen Sie einen Termin — Sie möchten den Film noch mal sehen.</i> Vorher die Leitpunkte als Checkliste antippen; <b>Liebe/r nach Genus</b>. Danach den Text an mich.', en: 'Letter #1 — topic “cinema”, 30 minutes, typed, on the clock (QWERTZ, spellcheck off). Task: you saw a film, your friend was travelling and missed it. Cover: how was the film · what you liked (or not) · propose a date to see it again. Tap the guide points as a checklist first; Liebe/r by gender. Then send me the text.', note: 'Das Skelett steht in reference/brief-themen-lehrerin.md — die 12 Lehrerin-Themen sind EIN Brief mit 12 Kostümen. WPM notieren — Baseline ist 10.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>Erst der Null-äh-Drill</b>: dein Teil-1-Intro einmal laut, null Füllwörter — stille Pausen sind erlaubt und erwünscht. <b>Dann KI-Runde, 10 Minuten</b> (Prompt unter <i>Sprechen</i>, jetzt mit Teil-Ansagen). Danach drei Sätze aufschreiben, die gefehlt haben.', en: 'First the zero-filler drill: your Teil 1 intro once, out loud, zero fillers — silent pauses are allowed and encouraged. Then the 10-minute speaking round (prompt under Sprechen, now with proper announcements). Afterwards write down three missing sentences.', note: 'Baseline vom 16.08.: äh/ähm alle 2–3 Wörter. Die Regel: still denken statt äh — und kein englisches „so". Wortfeld <b>Arbeit</b>.' },
    ],
    deck: ['brief', 'falle'],
  },
  {
    date: '2026-08-19', kind: 'class',
    headline: 'Präp + Kasus — die Wiederholungstäter-Familie',
    tagline: 'Vier Mock-Fehler, eine Regel: das Verb nennt die Präposition, die Präposition den Kasus.',
    thema: { title: 'Stress', cards: ['Claudia Gärtner, 42, Sekretärin', 'Andreas Elbert, 35, Verkaufsleiter'] },
    aufgabe: {
      situation: 'In vier Wochen ist die B1-Prüfung, und Sie möchten sich nicht allein darauf vorbereiten. Sie haben die Aufgabe, zusammen mit Ihrem Gesprächspartner/Ihrer Gesprächspartnerin einen gemeinsamen Lernnachmittag zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'The B1 exam is in four weeks and you do not want to prepare alone. Plan a joint study afternoon with your partner.',
      titel: 'Lernnachmittag',
      punkte: ['Wann?', 'Wo?', 'Was wiederholen?', 'Wie lange?', 'Pausen', '…'],
    },
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
    aufgabe: {
      situation: 'Nächste Woche fängt in Ihrer Abteilung ein neuer Kollege an. Ihre Chefin hat Sie und Ihren Gesprächspartner/Ihre Gesprächspartnerin gebeten, seinen ersten Arbeitstag vorzubereiten. Überlegen Sie sich, was alles zu tun ist und wer welche Aufgaben übernimmt. Sie haben sich schon diese Liste gemacht:',
      en: 'A new colleague joins your department next week. Your boss has asked you and your partner to prepare his first day at work.',
      titel: 'Erster Arbeitstag',
      punkte: ['Wer holt ihn ab?', 'Arbeitsplatz vorbereiten', 'Kollegen vorstellen', 'Mittagessen', 'Wer erklärt was?', '…'],
    },
    slots: [
      { place: 'gym', minutes: 15, hoeren: ['eigen-01-teil2'], what: 'Teil 2 noch einmal hören — ohne die Aussagen zu sehen, nur zuhören.', en: 'Listen to Teil 2 again — without looking at the statements, just listen.', note: 'Beim zweiten Hören ohne Papier hörst du plötzlich Sätze, die vorher nicht da waren.' },
      { place: 'sofa', minutes: 35, hoeren: ['eigen-01-teil2'], what: 'Transkript mitlesen: <b>jede Aussage ihrer Paraphrase im Text zuordnen</b> — laut („aufhören heißt: nicht mehr zusammen spielen"). Danach 10 neue ✓/✗-Aussagen im Chat.', en: 'Read along with the transcript: match every statement to its paraphrase in the text, out loud. Then 10 new true/false statements in chat.', note: 'Die Regel aus dem Mock: Wortgleichheit gefunden → Falle vermuten. Keine Wortgleichheit → Paraphrase suchen, nicht automatisch „falsch" tippen.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Benutze bewusst die Wörter von gestern: der Ablauf, die Schicht, der Vorgesetzte, einstellen.' },
    ],
    deck: ['v-buero', 'koll', 'thema'],
  },
  {
    date: '2026-08-21', kind: 'class',
    headline: 'Brief #2 — erste telc-Aufgabe („Jennifer"), null Mechanikfehler',
    tagline: 'telc ist digital. Deutsche Tastatur, Autokorrektur aus, Uhr läuft.',
    needs: ['Laptop + deutsche Tastatur'],
    thema: { title: 'Zukunftspläne', cards: ['Jana, 16, Schülerin', 'Max, 17, Schüler'] },
    aufgabe: {
      situation: 'Sie und Ihr Gesprächspartner/Ihre Gesprächspartnerin möchten nach der B1-Prüfung zusammen weiterlernen. Sie haben die Aufgabe, einen passenden Kurs auszusuchen und die Anmeldung zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'After the B1 exam you and your partner want to keep learning together. Choose a suitable course and plan how to enrol.',
      titel: 'Kurs nach B1',
      punkte: ['Welcher Kurs?', 'Wo?', 'Wie oft?', 'Kosten', 'Anmeldung bis wann?', '…'],
    },
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Brief-Mechanik</b> + Grammatik.', en: 'Card round: letter mechanics + grammar.' },
      { place: 'sofa', minutes: 35, what: '✍️ <b>Brief #2 — Aufgabe 3 „Jennifer", 30 Minuten, getippt, mit Uhr.</b> Am Laptop: <code>~/projects/learning/german/mock/brief.html</code> öffnen, unter <i>telc-Format</i> Nr. 3 wählen. Jennifer schreibt, dass ihre Schwester im Oktober heiratet. Vier Punkte: <i>Reaktion auf die Neuigkeit · Übernachtungsmöglichkeit · Sie möchten zur Hochzeit kommen · Hochzeitsgeschenk.</i> Danach den Bericht kopieren und mir schicken.', en: 'Letter #2 — task 3 “Jennifer”, 30 minutes, typed, on the clock. Open ~/projects/learning/german/mock/brief.html on the laptop and pick no. 3 under telc-Format. Jennifer writes that her sister is getting married in October. Four points: react to the news · where you could stay · you want to come · the wedding present. Then copy the report and send it to me.', note: '⚠️ <b>Neues Format.</b> Die zwölf Themen der Lehrerin sind Goethe-Aufgaben (3 Punkte, keine Vorlage). telc gibt dir einen <b>Brief zum Lesen</b>, <b>vier</b> Punkte und verlangt einen <b>Betreff</b>. Ziel heute: alle vier Punkte sichtbar + null Mechanikfehler (Anrede nach Genus, Schluss mit Frage).' },
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
    aufgabe: {
      situation: 'In Ihrem Haus wohnen viele neue Nachbarn, die sich noch nicht kennen. Deshalb möchten Sie im Hof ein Grillfest organisieren. Sie haben die Aufgabe, dieses Fest zusammen mit Ihrem Gesprächspartner/Ihrer Gesprächspartnerin zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'Many new neighbours in your building do not know each other yet, so you want to organise a barbecue in the courtyard. Plan it with your partner.',
      titel: 'Grillfest im Hof',
      punkte: ['Wann?', 'Einladung', 'Essen und Getränke', 'Tische und Stühle', 'Wer bezahlt wofür?', '…'],
    },
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Durchsagen &amp; Kollokationen</b>.', en: 'Card round: announcements & collocations.' },
      { place: 'sofa', minutes: 35, karten: ['v-wohnen'], what: 'Das Themenfeld <b>Wohnen &amp; Nachbarn</b> — erst der Kern (10 Karten): Miete, Nebenkosten, Hausordnung, Ruhezeit. Danach im Chat abfragen lassen.', en: 'The word field living & neighbours — the core 10 cards first: rent, utilities, house rules, quiet hours. Then let me test you in chat.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über deine Wohnung.', en: 'Three sentences about your flat.' },
    ],
    deck: ['v-ansage', 'koll'],
  },
  {
    date: '2026-08-25', kind: 'day',
    headline: 'HV Teil 2, kalt (neuer Test)',
    tagline: 'Zweiter Anlauf am teuersten Teil.',
    needs: ['Audio'],
    aufgabe: {
      situation: 'Das Treppenhaus in Ihrem Haus sieht schlecht aus und soll gestrichen werden. Der Vermieter bezahlt das Material, die Arbeit machen die Mieter selbst. Sie haben die Aufgabe, das zusammen mit Ihrem Nachbarn/Ihrer Nachbarin zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'The stairwell in your building looks bad and needs painting. The landlord pays for the materials, the tenants do the work themselves. Plan it with your neighbour.',
      titel: 'Treppenhaus streichen',
      punkte: ['Wann?', 'Welche Farbe?', 'Material besorgen', 'Wer hilft mit?', 'Wie lange?', '…'],
    },
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
    aufgabe: {
      situation: 'Ein Freund von Ihnen zieht am nächsten Wochenende in eine andere Wohnung um und hat Sie beide um Hilfe gebeten. Sie haben die Aufgabe, diesen Umzugstag gemeinsam zu planen. Überlegen Sie sich, was alles zu tun ist und wer welche Aufgaben übernimmt. Sie haben sich schon diese Liste gemacht:',
      en: 'A friend is moving to another flat next weekend and has asked you both for help. Plan the moving day: what has to be done, and who does what.',
      titel: 'Umzug am Samstag',
      punkte: ['Wann anfangen?', 'Transporter mieten', 'Wer hilft noch?', 'Kartons', 'Essen und Getränke', '…'],
    },
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
    aufgabe: {
      situation: 'Sie und Ihr Gesprächspartner/Ihre Gesprächspartnerin wohnen zusammen in einer WG. Die Wohnung ist zu klein geworden, deshalb suchen Sie eine größere. Sie haben die Aufgabe, die Suche und den Umzug gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'You and your partner share a flat that has become too small, so you are looking for a bigger one. Plan the search and the move together.',
      titel: 'Wohnungssuche',
      punkte: ['Wo suchen?', 'Wie groß?', 'Miete', 'Besichtigungstermine', 'Umzug wann?', '…'],
    },
    slots: [
      { place: 'gym', minutes: 15, datei: 'telc-b1-schule-uebungstest-1-hoerverstehen.mp3', what: 'Teil 2 noch einmal, ohne die Aussagen.', en: 'Teil 2 once more, without the statements.' },
      { place: 'sofa', minutes: 35, datei: 'telc-b1-schule-uebungstest-1-hoerverstehen.mp3', karten: ['koll'], what: 'Wiederholung am Bildschirm, dann Kollokationen aus dem Ledger.', en: 'Repeat on screen, then collocations from the ledger.' },
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
    aufgabe: {
      situation: 'In Ihrer WG ist ein Zimmer frei geworden, und Sie möchten es neu einrichten und als Gemeinschaftsraum nutzen. Sie haben die Aufgabe, das zusammen mit Ihrem Gesprächspartner/Ihrer Gesprächspartnerin zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'A room in your shared flat is free and you want to refurnish it as a common room. Plan this with your partner.',
      titel: 'Zimmer einrichten',
      punkte: ['Welche Möbel?', 'Neu oder gebraucht?', 'Farben', 'Budget', 'Wer besorgt was?', '…'],
    },
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
      { place: 'sofa', minutes: 150, hoeren: ['eigen-02-teil2'], what: 'Vier Teile hintereinander, mit Uhr. Das <b>HV Teil 2</b> ist das neue Sportverein-Gespräch hier in der App (läuft zweimal), LV 1, LV 3 und SB 2 wie gehabt aus dem Test.', en: 'Four Teile back to back, on the clock. HV Teil 2 is the new sports-club conversation here in the app (it plays twice); LV 1, LV 3 and SB 2 come from the test as before.' },
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
      { place: 'gym', minutes: 10, hoeren: ['eigen-02-teil1'], what: 'Kopfhörer auf: <b>E2 Teil 1 — Wohnen &amp; Nachbarn</b>. Fünf Aussagen lesen, dann läuft jeder Text <b>nur einmal</b>.', en: 'Headphones on: E2 Teil 1 — housing and neighbours. Read the five statements, then each text plays only once.', note: 'Neues Material, kalt. Ankreuzen und abschicken — die Versuchsliste merkt sich die Zahl.' },
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
    aufgabe: {
      situation: 'Sie und Ihr Gesprächspartner/Ihre Gesprächspartnerin sitzen im Beruf den ganzen Tag und möchten endlich mit Sport anfangen. Sie haben die Aufgabe, das gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'You and your partner sit all day at work and finally want to take up sport. Plan it together.',
      titel: 'Zusammen Sport machen',
      punkte: ['Welcher Sport?', 'Fitnessstudio oder Verein?', 'Wie oft?', 'An welchen Tagen?', 'Kosten', '…'],
    },
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Brief + Grammatik</b>.', en: 'Card round: letter + grammar.' },
      { place: 'sofa', minutes: 35, karten: ['v-gesund'], what: 'Das Themenfeld <b>Gesundheit</b> — erst der Kern (10 Karten): Beschwerden, Rezept, Überweisung, Krankenkasse. Dann eine Phrasenbank für den halbformellen Ton.', en: 'The word field health — the core 10 cards first: symptoms, prescription, referral, health insurance. Then a phrase bank for the semi-formal tone.', note: '„Rezept" und „Überweisung" haben je zwei Bedeutungen — genau daraus baut telc Fallen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit Briefbausteinen.', en: 'Three sentences using letter building blocks.' },
    ],
    deck: ['brief', 'gramm'],
  },
  {
    date: '2026-09-01', kind: 'day',
    headline: 'HV Teil 1 + Teil 3, kalt',
    tagline: 'Die kurzen Teile, frisch getestet.',
    needs: ['Audio'],
    aufgabe: {
      situation: 'Ein guter Freund hat sich das Bein gebrochen und kann zwei Wochen lang nicht einkaufen und nicht kochen. Sie haben die Aufgabe, zusammen mit Ihrem Gesprächspartner/Ihrer Gesprächspartnerin zu planen, wie Sie ihm helfen. Überlegen Sie sich, wer welche Aufgaben übernimmt. Sie haben sich schon diese Liste gemacht:',
      en: 'A good friend has broken his leg and cannot shop or cook for two weeks. Plan with your partner how you will help him, and who does what.',
      titel: 'Hilfe für einen Freund',
      punkte: ['Wer besucht wann?', 'Einkaufen', 'Kochen', 'Arzttermine', 'Wer bezahlt was?', '…'],
    },
    slots: [
      { place: 'gym', minutes: 12, hoeren: ['eigen-02-teil3'], what: '<b>E2 Teil 3 — fünf Durchsagen</b>. Jede läuft zweimal, die Datei macht das von selbst.', en: 'E2 Teil 3 — five announcements. Each plays twice; the file does that by itself.', note: 'Das Register der Durchsagen ist höflich und unpersönlich — genau dort sitzen die Fallen.' },
      { place: 'sofa', minutes: 35, datei: 'telc-b1-schule-uebungstest-1-hoerverstehen.mp3', what: 'Beide Teile mit Uhr → Antworten an mich.', en: 'Both Teile on the clock → answers to me.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Wortfeld <b>Gesundheit</b>. Am Ende laut zusammenfassen, worauf ihr euch geeinigt habt.' },
    ],
    deck: ['v-ansage'],
  },
  {
    date: '2026-09-02', kind: 'class',
    headline: 'Sprachbausteine Teil 1 — Grammatik',
    tagline: 'Futur I · geteiltes Hilfsverb · Artikel vs. Pronomen.',
    thema: { title: 'Einkäufe', cards: ['Paul Krügel, 27', 'Juliane Teubert, 18'] },
    aufgabe: {
      situation: 'Am Samstag feiern Sie mit Freunden eine Party, und Sie beide sollen den Einkauf übernehmen. Sie haben die Aufgabe, diesen Einkauf gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'On Saturday you are having a party with friends and the two of you are doing the shopping. Plan the shopping together.',
      titel: 'Einkauf für die Party',
      punkte: ['Wann einkaufen?', 'In welchem Geschäft?', 'Was auf die Liste?', 'Budget', 'Wie transportieren?', '…'],
    },
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
    aufgabe: {
      situation: 'Sie und Ihr Gesprächspartner/Ihre Gesprächspartnerin essen unter der Woche fast immer schnell und ungesund. Das wollen Sie in den nächsten vier Wochen zusammen ändern. Sie haben die Aufgabe, das gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'During the week you and your partner almost always eat fast and unhealthy food. You want to change that together over the next four weeks. Plan how.',
      titel: 'Gesünder essen',
      punkte: ['Was ändern?', 'Wo einkaufen?', 'Wann kochen?', 'Wer kocht wann?', 'Ziel nach vier Wochen', '…'],
    },
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.', en: 'Card round: letter.' },
      { place: 'sofa', minutes: 35, what: '✍️ <b>Brief #3 — Aufgabe 14 „Sophie"</b> in <code>mock/brief.html</code>. 30 Minuten, getippt, Autokorrektur aus. Sophie ist neu in Würzburg und kennt niemanden. Vier Punkte: <i>Was es Neues bei Ihnen gibt · was Sie in der Freizeit machen · Tipps für Sophie · Reaktion auf den Vorschlag.</i>', en: 'Letter #3 — task 14 “Sophie” in mock/brief.html. 30 minutes, typed, autocorrect off. Sophie is new in Würzburg and knows nobody. Four points: your news · what you do in your free time · tips for Sophie · reaction to her proposal.', note: 'Der Ratschlag-Punkt ist die Lücke aus dem Lernstoff-Extrakt: <i>An deiner Stelle würde ich … · Ich rate dir, … zu … · Du solltest …</i> Mindestens zwei davon einbauen.' },
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
    aufgabe: {
      situation: 'Ihr Deutschkurs endet bald, und Sie möchten sich bei Ihrer Lehrerin mit einem Geschenk bedanken. Sie haben die Aufgabe, zusammen mit Ihrem Gesprächspartner/Ihrer Gesprächspartnerin das Geschenk auszusuchen und online zu bestellen. Sie haben sich schon diese Liste gemacht:',
      en: 'Your German course ends soon and you want to thank your teacher with a present. Choose it with your partner and order it online.',
      titel: 'Geschenk für die Lehrerin',
      punkte: ['Welches Geschenk?', 'Wo bestellen?', 'Wie teuer?', 'Wer sammelt das Geld?', 'Lieferung bis wann?', '…'],
    },
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Grammatik</b>.', en: 'Card round: grammar.' },
      { place: 'sofa', minutes: 40, what: 'Erst den schwächsten Absatz von #3 neu schreiben, dann frisch: <b>Aufgabe 15 „Vera"</b> in <code>mock/brief.html</code>. Vera hat eine neue Stelle und ein Verkehrsproblem. Vier Punkte: <i>Was es bei Ihnen Neues gibt · wie Sie zur Arbeit kommen · was Sie über Veras Stelle wissen wollen · Vorschlag für eine Unternehmung.</i>', en: 'First rewrite the weakest paragraph of #3, then fresh: task 15 “Vera” in mock/brief.html. Vera has a new job and a commuting problem. Four points: your news · how you get to work · what you want to know about her job · a proposal for doing something together.', note: 'Punkt 3 verlangt eine <b>indirekte Frage</b>: „Kannst du mir sagen, <b>ob</b> …?" / „Ich würde gern wissen, <b>wie viel</b> …" — Verb ans Ende.' },
    ],
    deck: ['gramm', 'brief'],
  },
  {
    date: '2026-09-05', kind: 'big',
    headline: 'Stapel (5 + Brief)',
    tagline: 'Die schriftliche Hälfte läuft zum ersten Mal ganz durch.',
    needs: ['Test', 'Laptop'],
    slots: [
      { place: 'sofa', minutes: 180, what: 'LV 1–3, SB 1–2 und ein 30-Minuten-Brief. Drei Stunden, mit Uhr, alles am Rechner. Für den Brief: <code>mock/brief.html</code> → <b>🎲 Zufällige telc-Aufgabe</b> — nicht vorher aussuchen.', en: 'Reading 1–3, Sprachbausteine 1–2 and a 30-minute letter. Three hours, on the clock, all on the computer. For the letter: mock/brief.html → 🎲 random telc task — do not pick it in advance.', note: 'Zufall ist der Punkt: am 25.09. suchst du dir das Thema auch nicht aus.' },
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
      { place: 'gym', minutes: 10, hoeren: ['eigen-03-teil1'], what: '<b>E3 Teil 1 — Reisen &amp; Verkehr</b>. Fünf kurze Texte, jeder <b>nur einmal</b>.', en: 'E3 Teil 1 — travel and transport. Five short texts, each only once.', note: 'Kalt. Erst die fünf Aussagen lesen — 30 Sekunden reichen — dann starten.' },
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
    aufgabe: {
      situation: 'Am Prüfungstag müssen Sie beide um acht Uhr im Prüfungszentrum sein. Sie wollen zusammen hinfahren, damit niemand zu spät kommt. Sie haben die Aufgabe, die Fahrt gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'On exam day you both have to be at the exam centre at eight. You want to travel together so nobody arrives late. Plan the journey.',
      titel: 'Fahrt zur Prüfung',
      punkte: ['Welches Verkehrsmittel?', 'Wann losfahren?', 'Treffpunkt', 'Fahrkarten', 'Plan B bei Verspätung', '…'],
    },
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Durchsagen</b> — Einfahrt, Kennzeichen, umgehend.', en: 'Card round: announcements — Einfahrt, Kennzeichen, umgehend.' },
      { place: 'sofa', minutes: 35, karten: ['v-reise'], what: 'Das Themenfeld <b>Reisen &amp; Behörden</b> — erst der Kern (10 Karten): Verspätung, Anschluss, Antrag stellen, Gebühr.', en: 'The word field travel & public offices — the core 10 cards first: delay, connection, filing an application, fee.', note: 'Doppelt nützlich: dieselben Wörter brauchst du nächste Woche in den Alpen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über die geplante Reise.', en: 'Three sentences about the trip you are planning.' },
    ],
    deck: ['v-ansage'],
  },
  {
    date: '2026-09-08', kind: 'day',
    headline: 'HV Teil 2, kalt — der letzte vor der Probe',
    tagline: 'Letzter Einzelteil.',
    needs: ['Prüfungstraining MT2 auf dem Handy'],
    aufgabe: {
      situation: 'Sie und Ihr Gesprächspartner/Ihre Gesprächspartnerin müssen beide zum Bürgeramt und wollen deshalb zusammen hingehen. Sie haben die Aufgabe, diesen Termin gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'You and your partner both have to go to the citizens office, so you want to go together. Plan the appointment.',
      titel: 'Termin beim Bürgeramt',
      punkte: ['Welcher Tag?', 'Termin online buchen', 'Welche Unterlagen?', 'Wie hinkommen?', 'Frei nehmen?', '…'],
    },
    slots: [
      { place: 'gym', minutes: 12, hoeren: ['eigen-03-teil3'], what: '<b>E3 Teil 3 — fünf Durchsagen unterwegs</b>. Jede zweimal, ohne Pause dazwischen.', en: 'E3 Teil 3 — five announcements on the move. Each twice, no break in between.', note: 'Bahnhof, Flughafen, Baustelle. Zahlen, Gleise und Uhrzeiten sind hier die halbe Miete.' },
      { place: 'sofa', minutes: 35, datei: 'pruefungstraining-b1-modelltest-2-hoerverstehen.mp3', what: 'Das <b>Hörverstehen Teil 2</b> aus <b>Prüfungstraining Modelltest 2</b>, mit Uhr → Antworten an mich.', en: 'Hörverstehen Teil 2 from Prüfungstraining Modelltest 2, on the clock → answers to me.', note: 'Frisches Papier — die Datei muss vorher vom Laptop aufs Handy.' },
      { place: 'bed', minutes: 10, what: '🗣 <b>KI-Runde, 10 Minuten</b> — Teil 3 mit der Sprach-KI. Prompt und Regeln stehen unter <i>Sprechen</i>. Danach drei Sätze aufschreiben, die dir im Gespräch gefehlt haben.', en: 'Speaking round, 10 minutes — Teil 3 with the voice AI. The prompt and the rules are on the Sprechen page. Afterwards write down three sentences you were missing.', note: 'Wortfeld <b>Behörden</b>: der Antrag, der Termin, die Unterlagen, die Gebühr.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-09-09', kind: 'class',
    headline: 'Ledger-Sweep',
    tagline: 'Jeder noch offene Eintrag bekommt eine eigene Übung.',
    thema: { title: 'Gruppenreisen', cards: ['Sabine Klostermann, 33, Bürokauffrau', 'Jens Mühle, 39, Physiker'] },
    aufgabe: {
      situation: 'Sie haben ein langes Wochenende frei und möchten zusammen mit Ihrem Gesprächspartner/Ihrer Gesprächspartnerin in eine andere Stadt fahren. Sie haben die Aufgabe, dieses Wochenende gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'You have a long weekend off and want to travel to another city with your partner. Plan the weekend together.',
      titel: 'Wochenende in einer anderen Stadt',
      punkte: ['Wohin?', 'Anreise', 'Übernachtung', 'Programm', 'Kosten', '…'],
    },
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
    aufgabe: {
      situation: 'Sie beide wollten mit dem Zug zu einer Familienfeier fahren, aber der Zug ist ausgefallen. Die Feier fängt in vier Stunden an. Sie haben die Aufgabe, gemeinsam zu planen, wie Sie trotzdem rechtzeitig ankommen. Sie haben sich schon diese Liste gemacht:',
      en: 'The two of you wanted to take the train to a family celebration, but the train has been cancelled and the party starts in four hours. Plan how to get there on time anyway.',
      titel: 'Der Zug ist ausgefallen',
      punkte: ['Nächster Zug?', 'Bus oder Mietwagen?', 'Kosten', 'Wer ruft an?', 'Gepäck', '…'],
    },
    slots: [
      { place: 'gym', minutes: 15, hoeren: ['eigen-03-teil2'], what: '<b>E3 Teil 2 — unverpackt einkaufen</b>. Zehn Aussagen, das Gespräch läuft zweimal.', en: 'E3 Teil 2 — shopping unpackaged. Ten statements, the conversation plays twice.', note: 'Der letzte frische Teil 2 vor der Generalprobe. Der schwächste alte Teil kommt am Sofa dran — die Versuchsliste zeigt dir, welcher.' },
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
    aufgabe: {
      situation: 'Sie und Ihr Gesprächspartner/Ihre Gesprächspartnerin fahren nächste Woche zusammen für sieben Tage in die Alpen und übernachten im Camper. Sie haben die Aufgabe, diese Woche gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'You and your partner are going to the Alps together for seven days next week, sleeping in a camper van. Plan the week together.',
      titel: 'Eine Woche in den Alpen',
      punkte: ['Route', 'Stellplätze', 'Einkauf', 'Wer kocht?', 'Wanderungen', '…'],
    },
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.', en: 'Card round: letter.' },
      { place: 'sofa', minutes: 40, what: 'Brief auf Zeit: <b>Aufgabe 5 „Sonja"</b> in <code>mock/brief.html</code> — Musikfestival, Anreise, Übernachtung, jemanden mitbringen. Danach: Redemittel für <i>gemeinsam planen</i> — Vorschlag, Zustimmung, Einwand, Kompromiss.', en: 'Timed letter: task 5 “Sonja” in mock/brief.html — music festival, travel, overnight stay, bringing someone along. Then: phrases for planning together — proposal, agreement, objection, compromise.', note: 'Bewusst gewählt: derselbe Wortschatz, den du eine Woche später in den Alpen wirklich brauchst.' },
    ],
    deck: ['brief', 'gramm', 'digital'],
  },
  {
    date: '2026-09-12', kind: 'exam',
    headline: 'GENERALPROBE — die ganze Prüfung',
    tagline: 'LV+SB 90 min · Hören · Schreiben 30 min. Keine Pause, kein Nachschlagen.',
    needs: ['ganzer Test', 'Audio', 'Laptop + deutsche Tastatur', 'Uhr'],
    slots: [
      { place: 'sofa', minutes: 210, what: 'Dreieinhalb Stunden unter echten Bedingungen — der ganze Test läuft am Laptop in <code>mock/klett-mt1.html</code>: deutsche Tastatur, Brief getippt, Handy weg.', en: 'Three and a half hours under real conditions — the whole test runs on the laptop in mock/klett-mt1.html: German keyboard, letter typed, phone away.', note: 'Klett Modelltest 1, frisches Papier; das Hörverstehen (20:51) liegt dort schon fertig. Die App erinnert heute nur. Ziel: alle Teile ≥ 60 %, Hören ≥ 70 %.' },
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
    needs: ['Klett MT2 auf dem Handy'],
    aufgabe: {
      situation: 'Sie sind gerade aus den Alpen zurück und haben Lust auf mehr. Am nächsten Wochenende möchten Sie deshalb mit Ihrem Gesprächspartner/Ihrer Gesprächspartnerin einen kurzen Ausflug machen. Sie haben die Aufgabe, diesen Ausflug gemeinsam zu planen. Sie haben sich schon diese Liste gemacht:',
      en: 'You are just back from the Alps and want more. Next weekend you want to make a short trip with your partner. Plan it together.',
      titel: 'Kurzer Ausflug',
      punkte: ['Wohin?', 'Samstag oder Sonntag?', 'Wie hinkommen?', 'Was mitnehmen?', 'Kosten', '…'],
    },
    slots: [
      { place: 'gym', minutes: 15, hoeren: ['eigen-02-teil1', 'eigen-03-teil1'], what: 'Zweites Hören: <b>Teil 1 aus E2 und E3</b> hintereinander. Beide kennst du — heute zählt nur, ob die Zahl steigt.', en: 'Second listen: Teil 1 from E2 and E3, back to back. You know both — today only the score matters.', note: 'Bewusst die zweite und letzte Runde für diese beiden Teile.' },
      { place: 'sofa', minutes: 40, datei: 'klett-mit-erfolg-b1-modelltest-2-hoerverstehen.mp3', what: 'Das Hörverstehen aus <b>Klett Modelltest 2</b> komplett, am Stück. Danach Zettel durchgehen.', en: 'The complete listening paper from Klett Modelltest 2, in one go. Then go through the sheet.', note: 'Frisches Papier — die Datei muss vorher vom Laptop aufs Handy.' },
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
    aufgabe: {
      situation: 'Übermorgen schreiben Sie die B1-Prüfung, und danach möchten Sie mit Ihrer Familie und Ihrem Kurs feiern. Sie haben die Aufgabe, diese Feier zusammen mit Ihrem Gesprächspartner/Ihrer Gesprächspartnerin zu planen. Überlegen Sie sich, wer welche Aufgaben übernimmt. Sie haben sich schon diese Liste gemacht:',
      en: 'The day after tomorrow you sit the B1 exam, and afterwards you want to celebrate with your family and your class. Plan the party with your partner, and who does what.',
      titel: 'Feier nach der Prüfung',
      punkte: ['Wann?', 'Wo?', 'Wen einladen?', 'Essen und Getränke', 'Wer bezahlt wofür?', '…'],
    },
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.', en: 'Card round: letter.' },
      { place: 'sofa', minutes: 35, hoeren: ['eigen-02-teil3', 'eigen-03-teil3'], what: 'Brief auf Zeit, dann die <b>Durchsagen aus E2 und E3</b> — beide kennst du schon.', en: 'Timed letter, then the announcements from E2 and E3 — you already know both.', note: 'Bewusst bekannte Teile: die Versuchsliste soll heute nach oben zeigen.' },
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
