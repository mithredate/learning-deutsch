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
    needs: ['MP3 auf dem Handy', 'ÜT4 PDF S. 14–16'],
    thema: { title: 'Reise', cards: ['Stefanie Berger, 24, Studentin', 'Klaus Schmidt, 31, Kundenberater'] },
    aufgabe: 'Ihr Kurs macht am Samstag einen Ausflug in die Berge. Planen Sie ihn gemeinsam.',
    slots: [
      { place: 'gym', minutes: 15, dateien: true, what: 'Kopfhörer auf, ÜT4 <b>Teil 1</b> (die ersten 8 Minuten) einmal laufen lassen. Nichts ankreuzen — nur hören.', note: 'Du kennst den Text schon. Achte diesmal nur auf <b>immer / nur / alle</b>.' },
      { place: 'sofa', minutes: 35, dateien: true, what: 'Das ganze Hörverstehen, <b>22 Minuten am Stück</b>, mit dem Aufgabenblatt. Nicht pausieren, nicht zurückspulen.', note: 'Danach mit dem Lösungsschlüssel vergleichen und nur die Zahl notieren — die Analyse machen wir zusammen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze auf Deutsch: Was war schwerer als erwartet?', note: 'Egal wie holprig. Es geht ums Schreiben, nicht ums Richtigsein.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-15', kind: 'big',
    headline: 'ÜT4 Hörverstehen komplett',
    tagline: 'Kein Stapel startet kalt. Erst aufwärmen, dann die Uhr.',
    needs: ['MP3 auf dem Handy', 'ÜT4 PDF S. 14–16', 'Stift + Papier'],
    slots: [
      { place: 'sofa', minutes: 15, karten: ['v-reise', 'falle'], what: 'Kartenrunde <b>Reisen</b> + <b>Fallen</b> — laut, auf Deutsch. Das ist das Aufwärmen, nicht der Test.', note: 'Absichtlich <i>nicht</i> die Wörter aus ÜT4 (Arbeit, Büro, Durchsagen). Sonst misst der Test die letzten zehn Minuten statt der letzten zwei Wochen.' },
      { place: 'sofa', minutes: 10, karten: ['falle'], what: 'Die <b>30-Sekunden-Routine</b>: sechs neue Karten. Danach deine fünf Zeichen oben auf S. 14 schreiben — eins pro Scharnier.', note: 'Teil 1 kalt war 2/5. Nicht das Ohr, sondern die Lesezeit: 30 Sekunden für fünf Aussagen sind 6 Sekunden pro Satz.' },
      { place: 'sofa', minutes: 35, dateien: true, what: 'Das ganze Hörverstehen am Stück, mit Aufgabenblatt. <b>Nicht pausieren, nicht zurückspulen.</b>', note: 'Ziel <b>16 von 20</b> (80 %). Erst wenn die Zahl steht, gibt es den nächsten frischen Übungstest.' },
      { place: 'sofa', minutes: 50, what: 'Zahlen abschicken, dann Zeile für Zeile gegen das Transkript. Jeder Fehler bekommt einen Fallentyp.', note: 'Nicht „was war die richtige Antwort", sondern „welche Falle war das". Ein Fehler ohne Kategorie kommt wieder.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze: ein Wort, das du heute zum ersten Mal wirklich verstanden hast.' },
    ],
    deck: ['v-reise', 'falle'],
  },
  {
    date: '2026-08-16', kind: 'day',
    headline: 'Fehleranalyse + Woche vorbereiten',
    tagline: 'Der Sonntag, an dem die nächste Woche überhaupt möglich wird.',
    needs: ['deine Zahlen von gestern'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde. Nur die Fallentypen.' },
      { place: 'sofa', minutes: 40, what: 'Schreib mir deine Ergebnisse — ich mache die Fehleranalyse. Dann: <b>sag mir, welcher Test diese Woche dran ist.</b>', note: 'Ich brauche den Vorlauf, um das Audio zu bauen — sonst gibt es Dienstag nichts zu hören.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über dein Wochenende.' },
    ],
    deck: ['falle', 'koll'],
  },

  // ── Woche 2 · Hörverstehen Teil 2 ─────────────────────────────────────
  {
    date: '2026-08-17', kind: 'class',
    headline: 'Wortschatz: Arbeit & Beruf',
    tagline: 'Die Wörter, an denen Teil 1 gescheitert ist.',
    thema: { title: 'Arbeiten in der Gastronomie', cards: ['Alexander, 29, Hotelrestaurant', 'Angelika, 46, Tochter in der Ausbildung'] },
    aufgabe: 'Sie wollen zusammen ein Abendessen für vier Gäste kochen. Planen Sie Einkauf, Rezept, Kosten und wer was macht.',
    slots: [
      { place: 'gym', minutes: 15, karten: ['v-buero'], what: 'Kartenrunde <b>Büro &amp; Telefon</b> — alle 6 Karten, zweimal durch.', note: 'Genau dafür ist die Zeit zwischen den Sätzen da. Die 20 Arbeitswörter kommen abends.' },
      { place: 'sofa', minutes: 35, karten: ['v-arbeit'], what: 'Das Themenfeld <b>Arbeit &amp; Beruf</b> — 25 Karten, hier im Block. Danach schreib mir: ich drille sie hart, mit Sätzen statt Übersetzungen.', note: 'Umdrehen zeigt die deutsche Erklärung <i>und</i> die englische Bedeutung.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit drei neuen Wörtern von heute.' },
    ],
    deck: ['v-arbeit', 'v-buero'],
  },
  {
    date: '2026-08-18', kind: 'day',
    headline: 'Hörverstehen Teil 2, kalt',
    tagline: 'Der teuerste Teil der Prüfung: 10 Items × 3 Punkte.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Nur Karten — kein neues Hören vor der Sitzung.' },
      { place: 'sofa', minutes: 35, hoeren: ['eigen-01-teil2'], what: '<b>Teil 2, einmal gehört, mit Uhr.</b> Direkt danach: schick mir die Antworten.', note: 'Kalt heißt kalt: keine Vorschau auf die Aussagen jenseits der vorgesehenen Lesezeit.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze: worüber ging das Gespräch?' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-19', kind: 'class',
    headline: 'Fallen-Taxonomie',
    tagline: 'Paraphrase gegen Wortgleichheit — deine zwei häufigsten Fehler.',
    thema: { title: 'Stress', cards: ['Claudia Gärtner, 42, Sekretärin', 'Andreas Elbert, 35, Verkaufsleiter'] },
    aufgabe: 'Sie organisieren einen gemeinsamen Lernnachmittag vor der Prüfung. Einigen Sie sich auf Termin, Ort, Dauer und Pausen.',
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Fallen</b>. Diese sieben Karten sind die ganze Theorie.' },
      { place: 'sofa', minutes: 35, what: 'Jeder Fehler von gestern wird eingeordnet: Paraphrase, Wortgleichheit, Absolutizer, Verneinung, Schluss. Dann 20 Aussagen im Chat, ✓ oder ✗.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit <i>obwohl</i>, <i>trotzdem</i>, <i>deshalb</i>.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-20', kind: 'day',
    headline: 'Teil 2 wiederholen — Ziel ≥ 8/10',
    tagline: 'Dasselbe Material, zweiter Anlauf. Da entsteht das Können.',
    slots: [
      { place: 'gym', minutes: 15, hoeren: ['eigen-01-teil2'], what: 'Teil 2 noch einmal hören — ohne Aufgabenblatt, nur zuhören.', note: 'Beim zweiten Hören ohne Papier hörst du plötzlich Sätze, die vorher nicht da waren.' },
      { place: 'sofa', minutes: 35, hoeren: ['eigen-01-teil2'], what: 'Jetzt mit Aufgabenblatt, Ziel <b>≥ 8/10</b>. Danach Transkript mitlesen und jeden Distraktor markieren.', note: 'Der alte Versuch bleibt stehen — du siehst beide Zahlen untereinander.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit Wörtern aus dem Transkript.' },
    ],
    deck: ['v-buero', 'koll'],
  },
  {
    date: '2026-08-21', kind: 'class',
    headline: 'Brief #1 — 30 Minuten, handschriftlich',
    tagline: 'telc wird mit der Hand geschrieben. Üb es auch so.',
    needs: ['Papier + Stift'],
    thema: { title: 'Zukunftspläne', cards: ['Jana, 16, Schülerin', 'Max, 17, Schüler'] },
    aufgabe: 'Sie möchten nach B1 zusammen weiterlernen. Wählen Sie gemeinsam einen Kurs aus und planen Sie die Anmeldung.',
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Brief-Mechanik</b> + Grammatik.' },
      { place: 'sofa', minutes: 35, what: 'Ein Brief, <b>30 Minuten, auf Papier, mit Uhr</b>. Dann abfotografieren und mir schicken.', note: 'Checkliste vorher lesen: Betreff · Anrede + Gruß · alle 4 Leitpunkte · Schluss mit einer Frage.' },
    ],
    deck: ['brief', 'gramm'],
  },
  {
    date: '2026-08-22', kind: 'big',
    headline: 'Stapel (3): HV 1 + HV 2 + SB 2',
    tagline: 'Küchentisch. Zweieinhalb Stunden am Stück.',
    needs: ['neuer Test', 'Audio', 'Papier'],
    slots: [
      { place: 'sofa', minutes: 150, dateien: true, what: 'Drei Teile hintereinander, mit Uhr, ohne Pause dazwischen.', note: 'Die Rampe: letzte Woche 2 Teile, heute 3.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze: an welcher Stelle ist die Konzentration weggebrochen?' },
    ],
    deck: ['v-arbeit', 'falle'],
  },
  {
    date: '2026-08-23', kind: 'day',
    headline: 'Analyse + Gate + nächster Test',
    tagline: 'Gate: erster frischer Teil 2 ≥ 6/10?',
    needs: ['deine Antworten'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde, gemischt.' },
      { place: 'sofa', minutes: 40, what: 'Ergebnisse an mich → Fehleranalyse → Ledger. <b>Und den Test für nächste Woche nennen.</b>', note: 'Unter 6/10 heißt: Woche 3 bleibt auf Teil 2, Sprachbausteine rutschen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über die Woche.' },
    ],
    deck: ['koll', 'gramm'],
  },

  // ── Woche 3 · vertiefen ───────────────────────────────────────────────
  {
    date: '2026-08-24', kind: 'class',
    headline: 'Wortschatz: Wohnen & Nachbarschaft',
    tagline: 'Neues Themenfeld, gleiche Methode.',
    thema: { title: 'Nachbarn', cards: ['Streif, 24, Büroangestellte', 'Horst Gebhardt, 21, Büroangestellter'] },
    aufgabe: 'Sie planen ein Grillfest im Hof für die Nachbarn. Klären Sie Termin, Einladung, Essen und Unkostenbeitrag.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Durchsagen &amp; Kollokationen</b>.' },
      { place: 'sofa', minutes: 35, karten: ['v-wohnen'], what: 'Das Themenfeld <b>Wohnen &amp; Nachbarn</b> — 20 Karten: Miete, Nebenkosten, Hausordnung, Ruhezeit. Danach im Chat abfragen lassen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über deine Wohnung.' },
    ],
    deck: ['v-ansage', 'koll'],
  },
  {
    date: '2026-08-25', kind: 'day',
    headline: 'HV Teil 2, kalt (neuer Test)',
    tagline: 'Zweiter Anlauf am teuersten Teil.',
    needs: ['Audio'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Nur Karten.' },
      { place: 'sofa', minutes: 35, dateien: true, what: 'Teil 2 kalt, mit Uhr → Antworten an mich.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze zum Thema des Gesprächs.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-26', kind: 'class',
    headline: 'Absolutizer-Radar',
    tagline: 'immer · ganz · nur · alle · nie — zwei Fehler allein daran.',
    thema: { title: 'Ausziehen und alleine wohnen', cards: ['Carsten Daubner, 18, Auszubildender', 'Jenny Groh, 21, Studentin'] },
    aufgabe: 'Ein Freund zieht um und braucht Hilfe. Planen Sie Termin, Transporter, Helfer und Verpflegung.',
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Fallen</b>, bis alle sitzen.' },
      { place: 'sofa', minutes: 35, what: '20 Aussagen im Chat: ✓ oder ✗, jedes Mal mit Begründung.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit Einschränkung: <i>meistens, selten, nur wenn</i>.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-08-27', kind: 'day',
    headline: 'Wiederholung + SB-Kollokationen',
    tagline: 'Die Sprachbausteine-Lücken sind Wortschatz, keine Grammatik.',
    needs: ['Audio von Dienstag'],
    slots: [
      { place: 'gym', minutes: 15, dateien: true, what: 'Teil 2 noch einmal, ohne Papier.' },
      { place: 'sofa', minutes: 35, dateien: true, karten: ['koll'], what: 'Wiederholung mit Blatt, dann Kollokationen aus dem Ledger.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit <i>sich erkundigen nach</i>, <i>mitteilen</i>, <i>stattfinden</i>.' },
    ],
    deck: ['koll'],
  },
  {
    date: '2026-08-28', kind: 'class',
    headline: 'Brief #2 + Sprechen-Format',
    tagline: 'Letzte 15 Minuten: die drei Sprechen-Teile.',
    needs: ['Papier'],
    thema: { title: 'Schöner Wohnen', cards: ['Stefan Heeg, 38, Lehrer', 'Mara Weiß, 39, Teamleiterin'] },
    aufgabe: 'Sie richten gemeinsam ein Zimmer neu ein. Einigen Sie sich auf Möbel, Budget und wer was besorgt.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.' },
      { place: 'sofa', minutes: 40, what: 'Brief auf Zeit, handschriftlich. Danach zeige ich dir den Aufbau der mündlichen Prüfung — geübt wird sie im Kurs.' },
    ],
    deck: ['brief', 'gramm'],
  },
  {
    date: '2026-08-29', kind: 'big',
    headline: 'Stapel (4): LV 1 + LV 3 + HV 2 + SB 2',
    tagline: 'Zum ersten Mal Lesen und Hören in einer Sitzung.',
    needs: ['Test', 'Audio', 'Papier'],
    slots: [
      { place: 'sofa', minutes: 150, dateien: true, what: 'Vier Teile hintereinander, mit Uhr.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze: welcher Teil hat am meisten Kraft gekostet?' },
    ],
    deck: ['v-arbeit', 'v-buero'],
  },
  {
    date: '2026-08-30', kind: 'day',
    headline: 'Analyse + Ledger ausmisten',
    tagline: 'Einträge mit zwei sauberen Treffern werden gestrichen.',
    needs: ['deine Antworten'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde, gemischt.' },
      { place: 'sofa', minutes: 40, what: 'Analyse → Ledger. <b>15 und 19 stehen kurz vor dem Streichen.</b> Test für nächste Woche nennen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.' },
    ],
    deck: ['gramm'],
  },

  // ── Woche 4 · Schreiben ───────────────────────────────────────────────
  {
    date: '2026-08-31', kind: 'class',
    headline: 'Wortschatz: Gesundheit + Briefbausteine',
    tagline: 'Woche 4 gehört dem Schreiben — 10 billige Punkte.',
    thema: { title: 'Gesundheit', cards: ['Silke Bauer, 21, Studentin', 'Karsten Martens, 23, Angestellter'] },
    aufgabe: 'Sie wollen zusammen mit Sport anfangen. Planen Sie Fitnessstudio oder Verein, Termine in der Woche und Kosten.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Brief + Grammatik</b>.' },
      { place: 'sofa', minutes: 35, karten: ['v-gesund'], what: 'Das Themenfeld <b>Gesundheit</b> — 20 Karten: Beschwerden, Rezept, Überweisung, Krankenkasse. Dann eine Phrasenbank für den halbformellen Ton.', note: '„Rezept" und „Überweisung" haben je zwei Bedeutungen — genau daraus baut telc Fallen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze mit Briefbausteinen.' },
    ],
    deck: ['brief', 'gramm'],
  },
  {
    date: '2026-09-01', kind: 'day',
    headline: 'HV Teil 1 + Teil 3, kalt',
    tagline: 'Die kurzen Teile, frisch getestet.',
    needs: ['Audio'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Nur Karten.' },
      { place: 'sofa', minutes: 35, dateien: true, what: 'Beide Teile mit Uhr → Antworten an mich.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.' },
    ],
    deck: ['v-ansage'],
  },
  {
    date: '2026-09-02', kind: 'class',
    headline: 'Sprachbausteine Teil 1 — Grammatik',
    tagline: 'Futur I · geteiltes Hilfsverb · Artikel vs. Pronomen.',
    thema: { title: 'Einkäufe', cards: ['Paul Krügel, 27', 'Juliane Teubert, 18'] },
    aufgabe: 'Sie kaufen zu zweit für eine Party ein. Planen Sie Einkaufsliste, Geschäft, Budget und Transport.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Grammatik</b>, alle 11.' },
      { place: 'sofa', minutes: 35, what: 'Die drei Ledger-Punkte 10–12, dann 20 Lückensätze im Chat.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze im Futur I.' },
    ],
    deck: ['gramm'],
  },
  {
    date: '2026-09-03', kind: 'day',
    headline: 'Brief #3 auf Zeit',
    tagline: 'Bewertung nach telc-Kriterien I / II / III.',
    needs: ['Papier'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.' },
      { place: 'sofa', minutes: 35, what: '30 Minuten, handschriftlich, abfotografieren, an mich.' },
    ],
    deck: ['brief'],
  },
  {
    date: '2026-09-04', kind: 'class',
    headline: 'Brief #4 — Reparatur + frisch',
    tagline: 'Ziel: null Mechanikfehler.',
    needs: ['Papier'],
    thema: { title: 'Online Lebensmittel kaufen', cards: ['Tobias Krämer, 27, Student', 'Irina Kovalcik, 25, Webdesignerin'] },
    aufgabe: 'Sie suchen zusammen ein Geschenk für Ihre Lehrerin aus und bestellen es online. Einigen Sie sich auf Geschenk, Preis und Lieferung.',
    slots: [
      { place: 'gym', minutes: 12, karten: true, what: 'Kartenrunde <b>Grammatik</b>.' },
      { place: 'sofa', minutes: 40, what: 'Erst den schwächsten Absatz von #3 neu schreiben, dann ein frisches Thema.' },
    ],
    deck: ['gramm', 'brief'],
  },
  {
    date: '2026-09-05', kind: 'big',
    headline: 'Stapel (5 + Brief)',
    tagline: 'Die schriftliche Hälfte läuft zum ersten Mal ganz durch.',
    needs: ['Test', 'Audio', 'Papier'],
    slots: [
      { place: 'sofa', minutes: 180, dateien: true, what: 'LV 1–3, SB 1–2 und ein 30-Minuten-Brief. Drei Stunden, mit Uhr.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze: wie fühlten sich die letzten 30 Minuten an?' },
    ],
    deck: ['falle', 'koll'],
  },
  {
    date: '2026-09-06', kind: 'day',
    headline: 'Analyse + Gate',
    tagline: 'Gate: HV ≥ 65 %, Schreiben ≥ 30/45.',
    needs: ['deine Antworten'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde.' },
      { place: 'sofa', minutes: 45, what: 'Große Analyse. <b>Verfehlt heißt: Woche 5 streicht die Lesen-Pflege komplett.</b> Test für die Generalprobe festlegen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.' },
    ],
    deck: ['gramm', 'falle'],
  },

  // ── Woche 5 · Integration + Generalprobe ──────────────────────────────
  {
    date: '2026-09-07', kind: 'class',
    headline: 'Wortschatz: Reisen, Verkehr & Behörden',
    tagline: 'Doppelt nützlich — das ist auch dein Alpen-Wortschatz.',
    thema: { title: 'Verkehrsmittel', cards: ['Bernd Kleinefeld, 45, Elektrotechniker', 'Carola Ahrenholz, 25, Sekretärin'] },
    aufgabe: 'Sie fahren gemeinsam zur Prüfung. Planen Sie Verkehrsmittel, Uhrzeit, Treffpunkt und einen Plan B.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde <b>Durchsagen</b> — Einfahrt, Kennzeichen, umgehend.' },
      { place: 'sofa', minutes: 35, karten: ['v-reise'], what: 'Das Themenfeld <b>Reisen &amp; Behörden</b> — 20 Karten: Verspätung, Anschluss, Antrag stellen, Gebühr.', note: 'Doppelt nützlich: dieselben Wörter brauchst du nächste Woche in den Alpen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über die geplante Reise.' },
    ],
    deck: ['v-ansage'],
  },
  {
    date: '2026-09-08', kind: 'day',
    headline: 'HV Teil 2, kalt — der letzte vor der Probe',
    tagline: 'Letzter Einzelteil.',
    needs: ['Audio'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Nur Karten.' },
      { place: 'sofa', minutes: 35, dateien: true, what: 'Teil 2 mit Uhr → Antworten an mich.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.' },
    ],
    deck: ['falle'],
  },
  {
    date: '2026-09-09', kind: 'class',
    headline: 'Ledger-Sweep',
    tagline: 'Jeder noch offene Eintrag bekommt eine eigene Übung.',
    thema: { title: 'Gruppenreisen', cards: ['Sabine Klostermann, 33, Bürokauffrau', 'Jens Mühle, 39, Physiker'] },
    aufgabe: 'Sie planen ein Wochenende in einer anderen Stadt. Klären Sie Anreise, Übernachtung, Programm und Kosten.',
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde, alles gemischt.' },
      { place: 'sofa', minutes: 35, what: 'Wir gehen das Ledger von oben nach unten durch. Was bleibt, kommt auf den Alpen-Zettel.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.' },
    ],
    deck: ['gramm', 'koll', 'falle'],
  },
  {
    date: '2026-09-10', kind: 'day',
    headline: 'Der schwächste Hörteil der Kampagne',
    tagline: 'Noch einmal, gezielt.',
    needs: ['altes Audio'],
    slots: [
      { place: 'gym', minutes: 15, hoeren: ['eigen-01-teil2'], what: 'Genau diesen Teil hören.', note: 'Falls es ein E1-Teil war: die Versuchsliste zeigt dir, welcher der schwächste ist.' },
      { place: 'sofa', minutes: 35, dateien: true, karten: true, what: 'Mit Blatt, dann Wortschatz-Rettung für alles, was daran gescheitert ist.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.' },
    ],
    deck: ['v-buero', 'v-ansage'],
  },
  {
    date: '2026-09-11', kind: 'class',
    headline: 'Brief #5 + Redemittel fürs Planen',
    tagline: 'Die Sprechen-Teil-3-Phrasen brauchst du nächste Woche im Bus.',
    needs: ['Papier'],
    thema: { title: 'Urlaub mit Freunden', cards: ['N.N., 29, Ingenieur', 'Tamara Rößner, 31, Lehrerin'] },
    aufgabe: 'Sie planen die Woche in den Alpen: Route, Stellplatz, Einkauf und Essen. Einigen Sie sich am Ende.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.' },
      { place: 'sofa', minutes: 40, what: 'Brief auf Zeit. Danach: Redemittel für <i>gemeinsam planen</i> — Vorschlag, Zustimmung, Einwand, Kompromiss.' },
    ],
    deck: ['brief', 'gramm'],
  },
  {
    date: '2026-09-12', kind: 'exam',
    headline: 'GENERALPROBE — die ganze Prüfung',
    tagline: 'LV+SB 90 min · Hören · Schreiben 30 min. Keine Pause, kein Nachschlagen.',
    needs: ['ganzer Test', 'Audio', 'Papier', 'Uhr'],
    slots: [
      { place: 'sofa', minutes: 210, dateien: true, what: 'Dreieinhalb Stunden unter echten Bedingungen. Handy weg.', note: 'Ziel: alle Teile ≥ 60 %, Hören ≥ 70 %.' },
      { place: 'bed', minutes: 0, what: 'Nichts. Ausruhen.' },
    ],
    deck: [],
  },
  {
    date: '2026-09-13', kind: 'day',
    headline: 'Große Analyse → Alpen-Zettel packen',
    tagline: 'Eine Seite Lücken, ausgedruckt, kommt mit.',
    needs: ['deine Antworten'],
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde, gemischt.' },
      { place: 'sofa', minutes: 50, what: 'Volle Fehleranalyse. Am Ende: ein DIN-A4-Blatt mit allem, was offen ist. Dazu Gesprächsthemen für deinen Freund.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über die Reise.' },
    ],
    deck: ['gramm', 'falle'],
  },

  // ── Rückkehr & Taper ──────────────────────────────────────────────────
  {
    date: '2026-09-22', kind: 'day',
    headline: 'Nur Hörverstehen — Rost abschütteln',
    tagline: 'Zurück aus den Alpen. Sanft anfangen.',
    needs: ['letzter unbenutzter Test'],
    slots: [
      { place: 'gym', minutes: 15, karten: true, what: 'Kartenrunde vom Alpen-Zettel.' },
      { place: 'sofa', minutes: 40, dateien: true, what: 'Ein Hörverstehen komplett, aus dem letzten unbenutzten Test. Danach Zettel durchgehen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze über die Reise — auf Deutsch, du hast eine Woche geübt.' },
    ],
    deck: ['falle', 'v-ansage'],
  },
  {
    date: '2026-09-23', kind: 'class',
    headline: 'Ein Brief + ein bekanntes Hörstück',
    tagline: 'Bewusst etwas, das du kannst. Selbstvertrauen, keine Herausforderung.',
    needs: ['Papier'],
    thema: { title: 'Familie', cards: ['Anton Majer, 34, Manager', 'Nadja Bergmann, 36, Angestellte'] },
    aufgabe: 'Sie planen eine kleine Feier nach der Prüfung. Einigen Sie sich auf Tag, Ort, Gäste und Essen.',
    slots: [
      { place: 'gym', minutes: 10, karten: true, what: 'Kartenrunde <b>Brief</b>.' },
      { place: 'sofa', minutes: 35, hoeren: ['eigen-01-teil1', 'eigen-01-teil3'], what: 'Brief auf Zeit, dann ein Hörteil, den du schon zweimal gehört hast.', note: 'Bewusst ein alter Teil: die Versuchsliste soll heute nach oben zeigen.' },
      { place: 'bed', minutes: 5, what: 'Drei Sätze.' },
    ],
    deck: ['brief'],
  },
  {
    date: '2026-09-24', kind: 'rest',
    headline: 'Vormittags einmal den Zettel lesen. Dann Schluss.',
    tagline: 'Nach 12 Uhr kein Deutsch mehr.',
    slots: [
      { place: 'gym', minutes: 30, what: 'Den Lückenzettel einmal durchlesen. Nichts Neues.', note: 'Packen: Ausweis, Anmeldung, zwei Stifte, Uhr.' },
      { place: 'bed', minutes: 0, what: 'Früh ins Bett.' },
    ],
    deck: [],
  },
  {
    date: '2026-09-25', kind: 'exam',
    headline: 'telc Deutsch B1',
    tagline: 'Nie ein Feld leer lassen — es gibt keinen Punktabzug.',
    needs: ['Ausweis', 'Anmeldung', 'Stifte', 'Uhr'],
    slots: [],
    deck: [],
  },
]
