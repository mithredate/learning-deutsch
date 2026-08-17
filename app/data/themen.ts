import KARTEN_JSON from './themaKarten.json'

/**
 * The readable half of a Sprechen-Teil-2 evening, keyed by date.
 *
 * `days.ts` carries the schedule (which topic, which evening); this file
 * carries the material. Split on purpose: the schedule is a table you scan,
 * the material is prose you read — merging them made days.ts unreadable and
 * left the app showing only captions („Alexander, 29" and nothing to say
 * about him — reported 2026-08-17).
 *
 * The texts are **rewritten**: same person, same stance, own words. The
 * teacher's photos and printed quotes are copyrighted and stay out of this
 * public repo (see `Thema` in types.ts). Since no photo can ship, `bild`
 * *describes* the photo instead — which is exactly the exam's first move,
 * so reading it doubles as rehearsing it.
 */
export interface ThemaKarte {
  /** Name, Alter, Beruf — wie auf der Karte im Kurs. */
  wer: string
  /** Was auf dem Foto zu sehen ist — Übungsstoff für Schritt ① (Bild beschreiben). */
  bild: string
  /** Die Meinung der Person, umgeschrieben — Stoff für Schritt ② (wiedergeben). */
  zitat: string
}

/**
 * The topic's toolkit: what to *say* tonight, small enough to actually stick.
 *
 * Hard cap by design — 5 words, 4 Redemittel, 2 grammar traps. „I can't
 * memorize 200 things" (2026-08-17) is a constraint, not a complaint: the
 * toolkit is the floor you speak from, the big Themenfeld deck is where the
 * vocabulary grows. The grammar lines are not a curriculum; each one is a
 * ledger entry that this topic's typical sentences will trip.
 */
export interface Werkzeug {
  woerter: { de: string; en: string }[]
  redemittel: string[]
  /** May carry <b>/<i> — rendered with v-html like the cards. */
  grammatik: string[]
}

export const KARTEN = KARTEN_JSON as Record<string, { title: string; karten: ThemaKarte[] }>

export function themaKarten(date: string): ThemaKarte[] {
  return KARTEN[date]?.karten ?? []
}

export const WERKZEUG: Record<string, Werkzeug> = {
  // ── Reise · Fr 14.08. (im Kurs gelaufen — bleibt für den Rückblick) ────
  '2026-08-14': {
    woerter: [
      { de: 'die Unterkunft', en: 'accommodation' },
      { de: 'buchen', en: 'to book' },
      { de: 'das Reiseziel', en: 'destination' },
      { de: 'die Sehenswürdigkeit', en: 'sight, attraction' },
      { de: 'unterwegs', en: 'on the road, travelling' },
    ],
    redemittel: [
      'Ich verreise am liebsten mit meiner Frau, weil …',
      'Letztes Jahr bin ich nach … gefahren.',
      'Für mich ist am wichtigsten, dass die Unterkunft ruhig ist.',
    ],
    grammatik: [
      'Bewegung nimmt <b>sein</b>: ich <b>bin</b> gefahren, geflogen, gereist.',
      'gern → lieber → <b>am liebsten</b>.',
    ],
  },
  // ── Arbeiten in der Gastronomie · Mo 17.08. ────────────────────────────
  '2026-08-17': {
    woerter: [
      { de: 'die Schicht', en: 'shift' },
      { de: 'die Ausbildung', en: 'vocational training' },
      { de: 'die Verpflegung', en: 'catering, meals' },
      { de: 'die Spitzenzeiten', en: 'peak hours' },
      { de: 'der Feierabend', en: 'end of the working day' },
    ],
    redemittel: [
      'In der Gastronomie muss man auch am Wochenende arbeiten.',
      'Ich könnte mir (nicht) vorstellen, im Restaurant zu arbeiten, weil …',
      'Bei mir ist das anders: Als Softwareentwickler habe ich geregelte Arbeitszeiten.',
      'Darin sagt er, dass die Arbeitszeiten schwierig sind.',
    ],
    grammatik: [
      '<b>dass</b> schickt das Verb ans Ende: …, dass sie oft am Wochenende arbeiten <b>muss</b>.',
      'Beruf ohne Artikel: Sie arbeitet <b>als Köchin</b> — nicht „als eine Köchin".',
    ],
  },
  // ── Stress · Mi 19.08. ─────────────────────────────────────────────────
  '2026-08-19': {
    woerter: [
      { de: 'der Druck', en: 'pressure' },
      { de: 'sich entspannen', en: 'to relax' },
      { de: 'anstrengend', en: 'exhausting, strenuous' },
      { de: 'die Pause', en: 'break' },
      { de: 'der Termin', en: 'appointment, deadline' },
    ],
    redemittel: [
      'Ich habe viel Stress bei der Arbeit, wenn ein Projekt fertig werden muss.',
      'Gegen Stress hilft mir das Fitnessstudio.',
      'Meiner Meinung nach sollte man Pausen fest einplanen.',
    ],
    grammatik: [
      '<b>wenn</b> schickt das Verb ans Ende: …, wenn ich zu viele Termine <b>habe</b>.',
      'Reflexiv: ich entspanne <b>mich</b> · du entspannst <b>dich</b>.',
    ],
  },
  // ── Zukunftspläne · Fr 21.08. ──────────────────────────────────────────
  '2026-08-21': {
    woerter: [
      { de: 'vorhaben', en: 'to plan, intend' },
      { de: 'das Ziel', en: 'goal' },
      { de: 'bestehen', en: 'to pass (an exam)' },
      { de: 'die Fortbildung', en: 'further training' },
      { de: 'sich entscheiden für', en: 'to decide on' },
    ],
    redemittel: [
      'Ich habe vor, im September die B1-Prüfung zu bestehen.',
      'In fünf Jahren möchte ich …',
      'Zuerst mache ich …, danach will ich …',
    ],
    grammatik: [
      'Plan mit <b>zu</b>-Infinitiv: Ich habe vor, die Prüfung <b>zu bestehen</b>.',
      'Versprechen im Futur I: Ich <b>werde</b> weiter Deutsch <b>lernen</b>. (Ledger 12)',
    ],
  },
  // ── Nachbarn · Mo 24.08. ───────────────────────────────────────────────
  '2026-08-24': {
    woerter: [
      { de: 'die Nachbarschaft', en: 'neighbourhood' },
      { de: 'der Lärm', en: 'noise' },
      { de: 'die Ruhezeit', en: 'quiet hours' },
      { de: 'sich beschweren über', en: 'to complain about' },
      { de: 'aushelfen', en: 'to help out' },
    ],
    redemittel: [
      'Ich verstehe mich gut mit meinen Nachbarn.',
      'Bei uns im Haus grüßt man sich, aber mehr auch nicht.',
      'Einerseits ist Hilfe unter Nachbarn schön, andererseits braucht man Privatsphäre.',
    ],
    grammatik: [
      'sich beschweren <b>über + Akkusativ</b>: Er beschwert sich über <b>den</b> Lärm.',
      '<b>helfen + Dativ</b>: Ich helfe <b>meinem</b> Nachbarn. (Ledger-Familie Präp+Kasus)',
    ],
  },
  // ── Ausziehen und alleine wohnen · Mi 26.08. ───────────────────────────
  '2026-08-26': {
    woerter: [
      { de: 'ausziehen', en: 'to move out' },
      { de: 'selbstständig', en: 'independent' },
      { de: 'sich gewöhnen an', en: 'to get used to' },
      { de: 'die Miete', en: 'rent' },
      { de: 'der Haushalt', en: 'household (chores)' },
    ],
    redemittel: [
      'Mit 18 auszuziehen finde ich (nicht) gut, weil …',
      'Ich bin mit … Jahren von zu Hause ausgezogen.',
      'Das kommt darauf an, ob man die Miete bezahlen kann.',
    ],
    grammatik: [
      'sich gewöhnen <b>an + Akkusativ</b>: Ich gewöhne mich an <b>das</b> Alleinsein.',
      '<b>obwohl</b> (Nebensatz, Verb ans Ende) vs. <b>trotzdem</b> (Hauptsatz).',
    ],
  },
  // ── Schöner Wohnen · Fr 28.08. ─────────────────────────────────────────
  '2026-08-28': {
    woerter: [
      { de: 'einrichten', en: 'to furnish' },
      { de: 'die Möbel', en: 'furniture' },
      { de: 'gemütlich', en: 'cosy' },
      { de: 'renovieren', en: 'to renovate' },
      { de: 'hell ↔ dunkel', en: 'bright ↔ dark' },
    ],
    redemittel: [
      'Für mich ist wichtig, dass die Wohnung hell ist.',
      'Wir haben unser Wohnzimmer neu eingerichtet.',
      'Ich halte teure Designermöbel für unnötig.',
    ],
    grammatik: [
      'Trennbar: Ich richte die Wohnung <b>ein</b> · Ich habe sie <b>eingerichtet</b>.',
      'halten <b>für + Akkusativ</b>: Ich halte das für <b>eine</b> gute Idee.',
    ],
  },
  // ── Gesundheit · Mo 31.08. ─────────────────────────────────────────────
  '2026-08-31': {
    woerter: [
      { de: 'die Beschwerden', en: 'symptoms, complaints' },
      { de: 'sich bewegen', en: 'to exercise, move' },
      { de: 'die Ernährung', en: 'diet, nutrition' },
      { de: 'sich erholen', en: 'to recover' },
      { de: 'der Termin', en: 'appointment' },
    ],
    redemittel: [
      'Um gesund zu bleiben, gehe ich ins Fitnessstudio.',
      'Ich achte auf meine Ernährung.',
      'Man sollte sich regelmäßig bewegen.',
    ],
    grammatik: [
      'Zweck mit <b>um … zu</b>: Um fit zu bleiben, treibe ich Sport.',
      'Empfehlung mit <b>sollte</b>: Man sollte mehr Wasser <b>trinken</b>.',
    ],
  },
  // ── Einkäufe · Mi 02.09. ───────────────────────────────────────────────
  '2026-09-02': {
    woerter: [
      { de: 'die Auswahl', en: 'selection, range' },
      { de: 'das Angebot', en: 'offer, special' },
      { de: 'umtauschen', en: 'to exchange (goods)' },
      { de: 'bar ↔ mit Karte zahlen', en: 'to pay cash ↔ by card' },
      { de: 'das Sonderangebot', en: 'special offer' },
    ],
    redemittel: [
      'Ich kaufe meistens im Supermarkt ein, weil es schnell geht.',
      'Mir ist wichtig, dass es eine große Auswahl gibt.',
      'Im Internet ist es oft billiger, aber man kann nichts anprobieren.',
    ],
    grammatik: [
      'Trennbar: Ich kaufe abends <b>ein</b> · Ich habe schon <b>eingekauft</b>.',
      'Vergleich: billig<b>er als</b> im Geschäft — nie „billiger wie".',
    ],
  },
  // ── Online Lebensmittel kaufen · Fr 04.09. ─────────────────────────────
  '2026-09-04': {
    woerter: [
      { de: 'bestellen', en: 'to order' },
      { de: 'die Lieferung', en: 'delivery' },
      { de: 'frisch', en: 'fresh' },
      { de: 'die Qualität', en: 'quality' },
      { de: 'bequem', en: 'convenient' },
    ],
    redemittel: [
      'Ich habe noch nie Lebensmittel online bestellt.',
      'Ein Vorteil ist, dass man Zeit spart; ein Nachteil ist allerdings, dass …',
      'Frisches Obst kaufe ich lieber selbst.',
    ],
    grammatik: [
      '<b>lassen</b>: Ich lasse mir das Essen <b>liefern</b> — jemand anders tut es für dich.',
      'Perfekt: Ich <b>habe</b> … <b>bestellt</b> — Partizip ans Satzende.',
    ],
  },
  // ── Verkehrsmittel · Mo 07.09. ─────────────────────────────────────────
  '2026-09-07': {
    woerter: [
      { de: 'die öffentlichen Verkehrsmittel', en: 'public transport' },
      { de: 'umsteigen', en: 'to change (trains)' },
      { de: 'die Verspätung', en: 'delay' },
      { de: 'der Stau', en: 'traffic jam' },
      { de: 'umweltfreundlich', en: 'environmentally friendly' },
    ],
    redemittel: [
      'Ich fahre jeden Tag mit der Bahn zur Arbeit.',
      'Das Auto ist bequemer, aber die Bahn ist umweltfreundlicher.',
      'Wenn es Stau gibt, kommt man mit dem Rad schneller ans Ziel.',
    ],
    grammatik: [
      '<b>mit + Dativ</b>: mit <b>dem</b> Bus · mit <b>der</b> Bahn · mit <b>dem</b> Rad.',
      'Komparativ + <b>als</b>: schneller <b>als</b> das Auto.',
    ],
  },
  // ── Gruppenreisen · Mi 09.09. ──────────────────────────────────────────
  '2026-09-09': {
    woerter: [
      { de: 'die Gruppenreise', en: 'group tour' },
      { de: 'gemeinsam', en: 'together, jointly' },
      { de: 'sich einigen auf', en: 'to agree on' },
      { de: 'das Programm', en: 'itinerary, programme' },
      { de: 'der Kompromiss', en: 'compromise' },
    ],
    redemittel: [
      'In der Gruppe ist man nie allein, aber man muss Kompromisse machen.',
      'Ich reise lieber mit Freunden als mit fremden Leuten, weil …',
      'Wir müssen uns auf ein Programm einigen.',
    ],
    grammatik: [
      'sich einigen <b>auf + Akkusativ</b>: Wir einigen uns auf <b>einen</b> Termin.',
      '<b>lieber … als</b>: Ich reise lieber allein <b>als</b> in der Gruppe.',
    ],
  },
  // ── Urlaub mit Freunden · Fr 11.09. (drei Tage vor den Alpen!) ─────────
  '2026-09-11': {
    woerter: [
      { de: 'der Stellplatz', en: 'pitch (campervan)' },
      { de: 'die Route', en: 'route' },
      { de: 'sich kümmern um', en: 'to take care of' },
      { de: 'die Kosten teilen', en: 'to split the costs' },
      { de: 'das Wohnmobil', en: 'campervan' },
    ],
    redemittel: [
      'Ich kümmere mich um den Einkauf.',
      'Wie wäre es, wenn wir die Route zusammen planen?',
      'Wir teilen uns die Kosten für das Benzin.',
    ],
    grammatik: [
      'sich kümmern <b>um + Akkusativ</b>: Ich kümmere mich um <b>das</b> Essen.',
      'Zusage im Futur I: Ich <b>werde</b> die Getränke <b>mitbringen</b>. (Ledger 12)',
    ],
  },
  // ── Familie · Mi 23.09. (Taper — Selbstvertrauen, keine Herausforderung) ─
  '2026-09-23': {
    woerter: [
      { de: 'eine Familie gründen', en: 'to start a family' },
      { de: 'aufwachsen', en: 'to grow up' },
      { de: 'sich kümmern um', en: 'to take care of' },
      { de: 'die Verwandten', en: 'relatives' },
      { de: 'unterstützen', en: 'to support' },
    ],
    redemittel: [
      'Familie ist für mich das Wichtigste, weil man sich aufeinander verlassen kann.',
      'Ich bin verheiratet und lebe mit meiner Frau hier.',
      'Bei uns im Iran ist die Familie sehr wichtig — man hilft sich immer.',
    ],
    grammatik: [
      'Besitz mit <b>von + Dativ</b>: die Meinung <b>von</b> Anton Majer. (Kursmaterial-Fehler Nr. 4)',
      '<b>dass</b>-Satz: Er sagt, dass Familie ihm wichtig <b>ist</b>.',
    ],
  },
}
