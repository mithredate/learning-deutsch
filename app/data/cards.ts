import type { Card, CardTag } from '~/types'

export const TAG_NAMES: Record<CardTag, string> = {
  'v-arbeit': 'Arbeit & Beruf',
  'v-buero': 'Büro & Telefon',
  'v-ansage': 'Durchsagen',
  'v-wohnen': 'Wohnen & Nachbarn',
  'v-gesund': 'Gesundheit',
  'v-reise': 'Reisen & Behörden',
  koll: 'Kollokationen',
  gramm: 'Grammatik',
  falle: 'Hörfallen',
  brief: 'Brief',
  digital: 'Digitale Prüfung',
  thema: 'Sprechthemen',
}

/**
 * Two kinds of card, and they must not share a round.
 *
 * „die Seilbahn" and „immer ankreuzen, nie ein Feld leer lassen" are both cards,
 * but they are not the same activity: one is a word you either have or you
 * don't, the other is a tactic you understand once and then only need reminding
 * of. Shuffled together the tactics dilute the vocabulary — and vocabulary is
 * the root cause this ledger keeps pointing at. Reported 2026-08-15:
 * „separate words from general tips and tricks."
 */
export type CardKind = 'wort' | 'tipp'

export const CARD_KIND: Record<CardTag, CardKind> = {
  'v-arbeit': 'wort',
  'v-buero': 'wort',
  'v-ansage': 'wort',
  'v-wohnen': 'wort',
  'v-gesund': 'wort',
  'v-reise': 'wort',
  // A collocation is a word you cannot store one word at a time — still a word.
  koll: 'wort',
  gramm: 'tipp',
  falle: 'tipp',
  brief: 'tipp',
  digital: 'tipp',
  // An opinion sentence is a Redemittel with your name on it — reminded, not memorized.
  thema: 'tipp',
}

export const KIND_NAMES: Record<CardKind, string> = {
  wort: 'Wörter',
  tipp: 'Regeln & Tipps',
}

/** Words first: they are the gap, the tactics are the reminder. */
export function groupByKind(cards: Card[]) {
  return (['wort', 'tipp'] as CardKind[])
    .map(kind => ({ kind, cards: cards.filter(c => CARD_KIND[c.tag] === kind) }))
    .filter(group => group.cards.length > 0)
}

/**
 * Three sides to a card, and each one earns its place:
 *
 *   cue      the German you meet in the exam
 *   answer   the German explanation — this is what has to survive into September
 *   meaning  plain English, because a German gloss cannot teach you a word you
 *            have never met. Without it you cannot mark yourself honestly: you
 *            end up nodding at an explanation you also don't understand.
 *
 * The Ledger cards are real misses from Übungstest 4 (learning-records/0004);
 * their `hint` carries the exam item they cost. The Themenfeld decks below are
 * built for the four Wortschatz evenings in the calendar.
 */
export const CARDS: Card[] = [
  // ── Ledger 6 · Hörverstehen Teil 1, Themenfeld „Arbeit" ──────────────
  { tag: 'v-arbeit', cue: 'ausnützen', answer: 'ausnutzen, ausbeuten — jemanden zu viel arbeiten lassen', meaning: 'to exploit, take advantage of someone', examples: ['jemanden <b>ausnützen</b>', 'Der Chef <b>nützt</b> seine Mitarbeiter <b>aus</b>.', 'Sie fühlt sich von der Firma <b>ausgenützt</b>.'], hint: 'süddt./österr. Form von ausnutzen' },
  { tag: 'v-arbeit', cue: 'abschaffen', answer: 'beenden — es gibt etwas danach nicht mehr', meaning: 'to abolish, do away with', examples: ['eine Regel <b>abschaffen</b>', 'Die Firma hat die Gleitzeit <b>abgeschafft</b>.', 'Viele Betriebe wollen die Zeiterfassung wieder <b>abschaffen</b>.'] },
  { tag: 'v-arbeit', cue: 'frech', answer: 'unhöflich, ohne Respekt', meaning: 'cheeky, impudent', examples: ['eine <b>freche</b> Antwort', 'Sei nicht so <b>frech</b> zu deinen Kollegen!', 'Der neue Praktikant wird langsam <b>frech</b>.'] },
  { tag: 'v-arbeit', cue: 'beschäftigen', answer: 'jemanden angestellt haben · sich ~ mit = Zeit mit etwas verbringen', meaning: 'to employ · sich ~ mit = to occupy oneself with', examples: ['sich mit einem Thema <b>beschäftigen</b>', 'Die Firma <b>beschäftigt</b> 200 Leute.', 'Am Wochenende <b>beschäftige ich mich mit</b> Grammatik.'] },
  { tag: 'v-arbeit', cue: 'der Ablauf', answer: 'die Reihenfolge, in der etwas passiert (auch: das Ende einer Frist)', meaning: 'sequence, procedure — also: expiry', examples: ['der <b>Ablauf</b> der Prüfung', 'Der <b>Ablauf</b> des Tages ist genau geplant.', 'Nach <b>Ablauf</b> der Frist können Sie nichts mehr ändern.'] },

  // ── Ledger 7 · Hörverstehen Teil 2 ───────────────────────────────────
  { tag: 'v-buero', cue: 'der Unkostenbeitrag', answer: 'ein kleiner Betrag, den alle zu den Kosten dazugeben', meaning: 'contribution towards costs', examples: ['ein kleiner <b>Unkostenbeitrag</b>', 'Wir bitten um einen kleinen <b>Unkostenbeitrag</b>.', 'Der <b>Unkostenbeitrag</b> beträgt fünf Euro pro Person.'] },
  { tag: 'v-buero', cue: 'überregional', answer: 'in vielen Regionen, nicht nur am Ort', meaning: 'nationwide, beyond one region', examples: ['eine <b>überregionale</b> Tageszeitung', 'Die Anzeige erscheint auch <b>überregional</b>.', 'Wir suchen <b>überregional</b> nach einem Nachfolger.'] },
  { tag: 'v-buero', cue: 'der Ansprechpartner', answer: 'die Person, an die man sich mit einer Frage wendet', meaning: 'contact person', examples: ['der zuständige <b>Ansprechpartner</b>', 'Wer ist mein <b>Ansprechpartner</b> in dieser Sache?', 'Frau Weber ist Ihre <b>Ansprechpartnerin</b> für alle Fragen.'] },
  { tag: 'v-buero', cue: 'besetzt', answer: 'schon von jemandem benutzt — Platz, Toilette, Telefonleitung', meaning: 'occupied · engaged (phone) · taken (seat)', examples: ['ein <b>besetzter</b> Platz', 'Die Leitung ist gerade <b>besetzt</b>.', 'Ich habe dreimal angerufen, es war immer <b>besetzt</b>.'] },
  { tag: 'v-buero', cue: 'stattfinden', answer: 'passieren wie geplant', meaning: 'to take place', examples: ['der Kurs <b>findet statt</b>', 'Das Treffen <b>findet</b> am Montag <b>statt</b>.', 'Bei Regen <b>findet</b> das Fest im Saal <b>statt</b>.'] },
  { tag: 'v-buero', cue: 'die Redaktion', answer: 'das Büro, in dem Zeitung, Radio oder Fernsehen gemacht wird', meaning: 'editorial office, newsroom', examples: ['in der <b>Redaktion</b> anrufen', 'Fragen Sie bei uns in der <b>Redaktion</b> nach.', 'Die <b>Redaktion</b> ist von neun bis siebzehn Uhr erreichbar.'], hint: 'Falle 47: Redaktion → das läuft im Rundfunk' },

  // ── Ledger 8 · Hörverstehen Teil 3, Durchsagen ────────────────────────
  { tag: 'v-ansage', cue: 'umgehend', answer: 'sofort, ohne zu warten', meaning: 'immediately, without delay', examples: ['Bitte melden Sie sich <b>umgehend</b> im Büro.'] },
  { tag: 'v-ansage', cue: 'versperren', answer: 'den Weg blockieren, sodass niemand durchkommt', meaning: 'to block, obstruct', examples: ['Ein Auto <b>versperrt</b> die Einfahrt.'] },
  { tag: 'v-ansage', cue: 'die Einfahrt', answer: 'die Stelle, wo Autos auf ein Grundstück fahren', meaning: 'driveway, vehicle entrance', examples: ['<b>Einfahrt</b> bitte freihalten!'] },
  { tag: 'v-ansage', cue: 'das Kennzeichen', answer: 'das Nummernschild am Auto', meaning: 'licence plate — also: a distinguishing mark', examples: ['der Wagen mit dem <b>Kennzeichen</b> M-AB 1234'] },
  { tag: 'v-ansage', cue: 'der Schlüsselbund', answer: 'mehrere Schlüssel an einem Ring', meaning: 'bunch of keys', examples: ['Ein <b>Schlüsselbund</b> wurde am Eingang gefunden.'] },
  { tag: 'v-ansage', cue: 'das Gericht', answer: 'ein Essen auf der Speisekarte — und: der Ort, wo ein Richter arbeitet', meaning: 'dish (food) — and also: court of law', examples: ['Das <b>Gericht</b> des Tages ist Gulasch.'], hint: 'in einer Restaurant-Durchsage nie „Gerichtssaal"' },
  { tag: 'v-ansage', cue: 'die Auswahl', answer: 'alles, woraus man wählen kann', meaning: 'selection, choice, range', examples: ['eine große <b>Auswahl</b> an warmen Getränken'] },

  // ── Themenfeld „Arbeit & Beruf" · Mo 17.08. ───────────────────────────
  { tag: 'v-arbeit', cue: 'die Bewerbung', answer: 'die Unterlagen, die man an eine Firma schickt, um eine Stelle zu bekommen', meaning: 'job application', examples: ['eine <b>Bewerbung</b> schreiben', 'Ich habe meine <b>Bewerbung</b> gestern abgeschickt.', 'Auf meine <b>Bewerbung</b> habe ich noch keine Antwort bekommen.'] },
  { tag: 'v-arbeit', cue: 'sich bewerben um', answer: 'schriftlich um eine Stelle bitten', meaning: 'to apply for (a job) — always sich bewerben <b>um</b> + Akk.', examples: ['sich <b>um</b> eine Stelle <b>bewerben</b>', 'Ich <b>bewerbe mich um</b> eine Stelle als Entwickler.', 'Sie hat <b>sich</b> bei drei Firmen <b>beworben</b>.'] },
  { tag: 'v-arbeit', cue: 'das Vorstellungsgespräch', answer: 'das Gespräch in der Firma, bevor man die Stelle bekommt', meaning: 'job interview', examples: ['zum <b>Vorstellungsgespräch</b> einladen', 'Am Dienstag habe ich ein <b>Vorstellungsgespräch</b>.', 'Das <b>Vorstellungsgespräch</b> ist besser gelaufen als erwartet.'] },
  { tag: 'v-arbeit', cue: 'der Lebenslauf', answer: 'die Liste von Schule, Ausbildung und bisherigen Stellen', meaning: 'CV, résumé', examples: ['ein tabellarischer <b>Lebenslauf</b>', 'Bitte schicken Sie uns Ihren <b>Lebenslauf</b>.', 'In Ihrem <b>Lebenslauf</b> fehlt das letzte Arbeitszeugnis.'] },
  { tag: 'v-arbeit', cue: 'die Ausbildung', answer: 'die Lehre — Betrieb und Berufsschule zusammen, meist drei Jahre', meaning: 'vocational training, apprenticeship', examples: ['eine <b>Ausbildung</b> machen', 'Meine Tochter macht eine <b>Ausbildung</b> als Köchin.', 'Nach der <b>Ausbildung</b> wurde er sofort übernommen.'], hint: 'Sprechen-Karte „Arbeiten in der Gastronomie"' },
  { tag: 'v-arbeit', cue: 'die Schicht', answer: 'ein fester Arbeitsblock, z. B. von 6 bis 14 Uhr', meaning: 'shift', examples: ['in <b>Schichten</b> arbeiten', 'Diese Woche habe ich <b>Spätschicht</b>.', 'Meine <b>Schicht</b> beginnt schon um sechs Uhr morgens.'] },
  { tag: 'v-arbeit', cue: 'die Gleitzeit', answer: 'man darf selbst wählen, wann man anfängt und aufhört', meaning: 'flexitime', examples: ['<b>Gleitzeit</b> haben', 'Wir haben <b>Gleitzeit</b> — ich komme meistens um neun.', 'Dank der <b>Gleitzeit</b> kann ich die Kinder in die Schule bringen.'] },
  { tag: 'v-arbeit', cue: 'die Überstunden', answer: 'die Stunden, die man nach dem Feierabend noch arbeitet', meaning: 'overtime', examples: ['<b>Überstunden</b> machen', 'Letzte Woche habe ich zehn <b>Überstunden</b> gemacht.', 'Die <b>Überstunden</b> bekomme ich später als freie Tage zurück.'] },
  { tag: 'v-arbeit', cue: 'der Feierabend', answer: 'das Ende des Arbeitstages', meaning: 'the end of the working day — English has no single word for it', examples: ['nach <b>Feierabend</b>', 'Um 17 Uhr ist bei mir <b>Feierabend</b>.', 'Ich mache jetzt <b>Feierabend</b> — bis morgen!'] },
  { tag: 'v-arbeit', cue: 'kündigen', answer: 'einen Vertrag beenden — der Angestellte oder die Firma', meaning: 'to quit — or, from the other side, to sack someone', examples: ['den Vertrag <b>kündigen</b>', 'Ich habe zum 30. Juni <b>gekündigt</b>.', 'Ihm wurde nach nur zwei Monaten <b>gekündigt</b>.'] },
  { tag: 'v-arbeit', cue: 'einstellen', answer: 'jemanden neu anstellen', meaning: 'to hire — also: to adjust a setting, or to stop doing something', examples: ['neue Mitarbeiter <b>einstellen</b>', 'Die Firma <b>stellt</b> im Herbst zwanzig Leute <b>ein</b>.', 'Bitte <b>stellen</b> Sie den Wecker auf sechs Uhr <b>ein</b>.'] },
  { tag: 'v-arbeit', cue: 'der Betrieb', answer: 'die Firma als Arbeitsplatz — auch: dass etwas läuft', meaning: 'company, plant · also: operation ("in Betrieb" = running)', examples: ['ein kleiner <b>Betrieb</b>', 'In unserem <b>Betrieb</b> arbeiten 50 Leute.', 'Der Aufzug ist seit gestern wieder <b>in Betrieb</b>.'] },
  { tag: 'v-arbeit', cue: 'der/die Vorgesetzte', answer: 'die Person über dir — der Chef, die Chefin', meaning: 'superior, line manager', examples: ['mein direkter <b>Vorgesetzter</b>', 'Das muss ich mit meiner <b>Vorgesetzten</b> besprechen.', 'Die <b>Vorgesetzte</b> hat den Urlaub schon genehmigt.'] },
  { tag: 'v-arbeit', cue: 'das Gehalt', answer: 'das Geld, das man jeden Monat bekommt (Angestellte)', meaning: 'salary — monthly', examples: ['ein gutes <b>Gehalt</b>', 'Das <b>Gehalt</b> kommt immer am Ersten.', 'Über das <b>Gehalt</b> sprechen wir erst im zweiten Gespräch.'] },
  { tag: 'v-arbeit', cue: 'der Lohn', answer: 'das Geld pro Stunde (Arbeiter)', meaning: 'wages — by the hour', examples: ['der <b>Lohn</b> pro Stunde', 'Der <b>Mindestlohn</b> ist gesetzlich festgelegt.', 'Der <b>Lohn</b> wird jeden Freitag ausgezahlt.'] },
  { tag: 'v-arbeit', cue: 'die Stelle', answer: 'der Arbeitsplatz, die Position — auch: der Ort', meaning: 'position, job · also: a spot, a place', examples: ['eine freie <b>Stelle</b>', 'Sie hat eine neue <b>Stelle</b> gefunden.', 'An dieser <b>Stelle</b> müssen Sie noch unterschreiben.'] },
  { tag: 'v-arbeit', cue: 'anspruchsvoll', answer: 'schwer, verlangt viel Können', meaning: 'demanding, challenging', examples: ['eine <b>anspruchsvolle</b> Arbeit', 'Das ist eine sehr <b>anspruchsvolle</b> Aufgabe.', 'Der Kurs ist <b>anspruchsvoll</b>, aber man lernt sehr viel.'] },
  { tag: 'v-arbeit', cue: 'zuverlässig', answer: 'man kann sich auf ihn verlassen', meaning: 'reliable, dependable', examples: ['ein <b>zuverlässiger</b> Kollege', 'Sie ist die <b>zuverlässigste</b> Kollegin im Team.', 'Er arbeitet schnell und <b>zuverlässig</b>.'] },
  { tag: 'v-arbeit', cue: 'die Teilzeit ↔ die Vollzeit', answer: 'weniger Stunden ↔ die volle Woche', meaning: 'part-time ↔ full-time', examples: ['in <b>Teilzeit</b> arbeiten', 'Nach der Elternzeit arbeitet er <b>in Teilzeit</b>.', 'Die Stelle ist zunächst nur <b>in Vollzeit</b> zu besetzen.'] },
  { tag: 'v-arbeit', cue: 'die Fortbildung', answer: 'ein Kurs, um im Beruf mehr zu können', meaning: 'further training, professional development', examples: ['an einer <b>Fortbildung</b> teilnehmen', 'Die Firma bezahlt eine <b>Fortbildung</b> in Excel.', 'Nächste Woche bin ich auf einer <b>Fortbildung</b> in Köln.'] },

  // ── Themenfeld „Wohnen & Nachbarschaft" · Mo 24.08. ───────────────────
  { tag: 'v-wohnen', cue: 'die Miete', answer: 'das Geld, das man jeden Monat für die Wohnung zahlt', meaning: 'rent', examples: ['Die <b>Miete</b> ist am dritten Werktag fällig.'] },
  { tag: 'v-wohnen', cue: 'die Nebenkosten', answer: 'Heizung, Wasser, Müll — alles zusätzlich zur Miete', meaning: 'utilities, service charges', examples: ['600 Euro <b>plus Nebenkosten</b>.'] },
  { tag: 'v-wohnen', cue: 'die Kaution', answer: 'das Geld, das man am Anfang hinterlegt und am Ende zurückbekommt', meaning: 'security deposit', examples: ['Die <b>Kaution</b> beträgt drei Monatsmieten.'] },
  { tag: 'v-wohnen', cue: 'der Vermieter ↔ der Mieter', answer: 'dem die Wohnung gehört ↔ wer darin wohnt und zahlt', meaning: 'landlord ↔ tenant — one letter apart, opposite sides', examples: ['Der <b>Vermieter</b> hat die Heizung reparieren lassen.'], hint: 'Hörfalle: die beiden Wörter klingen fast gleich' },
  { tag: 'v-wohnen', cue: 'die Hausordnung', answer: 'die Regeln im Haus: Ruhezeiten, Treppenhaus, Müll', meaning: 'house rules', examples: ['Laut <b>Hausordnung</b> ist ab 22 Uhr Ruhe.'] },
  { tag: 'v-wohnen', cue: 'die Ruhezeit', answer: 'die Stunden, in denen es leise sein muss', meaning: 'quiet hours', examples: ['Sonntags ist den ganzen Tag <b>Ruhezeit</b>.'] },
  { tag: 'v-wohnen', cue: 'der Lärm', answer: 'lauter, störender Krach', meaning: 'noise — the unwanted kind', examples: ['Der <b>Lärm</b> von der Baustelle beginnt um sieben.'] },
  { tag: 'v-wohnen', cue: 'sich beschweren über', answer: 'sagen, dass einen etwas stört — offiziell', meaning: 'to complain about (+ Akk.)', examples: ['Die Nachbarn haben <b>sich über</b> den Lärm <b>beschwert</b>.'] },
  { tag: 'v-wohnen', cue: 'der Umzug', answer: 'wenn man in eine andere Wohnung wechselt', meaning: 'a move (house) — also: a parade', examples: ['Der <b>Umzug</b> ist am ersten Samstag im Monat.'] },
  { tag: 'v-wohnen', cue: 'umziehen', answer: 'die Wohnung wechseln — auch: andere Kleidung anziehen', meaning: 'to move house · sich umziehen = to get changed', examples: ['Wir <b>ziehen</b> im Oktober nach München <b>um</b>.'] },
  { tag: 'v-wohnen', cue: 'der Hausmeister', answer: 'wer sich um das Haus kümmert und Kleinigkeiten repariert', meaning: 'caretaker, janitor', examples: ['Melden Sie das bitte dem <b>Hausmeister</b>.'] },
  { tag: 'v-wohnen', cue: 'das Treppenhaus', answer: 'der Bereich mit der Treppe, den alle im Haus benutzen', meaning: 'stairwell, common staircase', examples: ['Im <b>Treppenhaus</b> darf nichts stehen.'] },
  { tag: 'v-wohnen', cue: 'die Mülltrennung', answer: 'Papier, Glas, Bio und Restmüll in verschiedene Tonnen', meaning: 'separating waste for recycling', examples: ['Bei der <b>Mülltrennung</b> sind die Deutschen streng.'] },
  { tag: 'v-wohnen', cue: 'möbliert', answer: 'mit Möbeln — Bett und Schrank sind schon da', meaning: 'furnished', examples: ['Wir suchen ein <b>möbliertes</b> Zimmer für drei Monate.'] },
  { tag: 'v-wohnen', cue: 'die Wohngemeinschaft (WG)', answer: 'mehrere Leute teilen sich eine Wohnung', meaning: 'shared flat, flatshare', examples: ['Ich wohne in einer <b>WG</b> mit zwei Studenten.'] },
  { tag: 'v-wohnen', cue: 'die Nachbarschaft', answer: 'die Leute und Häuser rundherum', meaning: 'neighbourhood — the people as much as the place', examples: ['In unserer <b>Nachbarschaft</b> hilft man sich.'] },
  { tag: 'v-wohnen', cue: 'renovieren', answer: 'die Wohnung neu streichen und herrichten', meaning: 'to renovate, redecorate', examples: ['Vor dem Auszug muss ich <b>renovieren</b>.'] },
  { tag: 'v-wohnen', cue: 'die Besichtigung', answer: 'der Termin, an dem man sich die Wohnung ansieht', meaning: 'a viewing', examples: ['Zur <b>Besichtigung</b> kamen dreißig Leute.'] },
  { tag: 'v-wohnen', cue: 'der Stellplatz', answer: 'der Platz, wo ein Auto oder Wohnmobil stehen darf', meaning: 'parking space, pitch', examples: ['Ein <b>Stellplatz</b> kostet 40 Euro im Monat.'], hint: 'brauchst du auch für die Alpen-Woche' },
  { tag: 'v-wohnen', cue: 'die Nebenkostenabrechnung', answer: 'die Rechnung am Jahresende: hast du zu viel oder zu wenig gezahlt', meaning: 'the annual utilities statement', examples: ['Die <b>Nebenkostenabrechnung</b> kam mit einer Nachzahlung.'] },

  // ── Themenfeld „Gesundheit" · Mo 31.08. ───────────────────────────────
  { tag: 'v-gesund', cue: 'die Beschwerden', answer: 'was einem fehlt — Schmerzen, Husten, Schwindel', meaning: 'symptoms, complaints (always plural here)', examples: ['Seit wann haben Sie diese <b>Beschwerden</b>?'], hint: 'die erste Frage jedes Arztes' },
  { tag: 'v-gesund', cue: 'das Rezept', answer: 'der Zettel vom Arzt für die Apotheke — und: die Anleitung zum Kochen', meaning: 'prescription — and also: recipe', examples: ['Für dieses Medikament brauchen Sie ein <b>Rezept</b>.'], hint: 'klassische Hörfalle: Arzt oder Küche?' },
  { tag: 'v-gesund', cue: 'die Überweisung', answer: 'der Zettel zum Facharzt — und: Geld von Konto zu Konto', meaning: 'referral to a specialist — and also: bank transfer', examples: ['Ich gebe Ihnen eine <b>Überweisung</b> zum Orthopäden.'], hint: 'zwei ganz verschiedene Welten, ein Wort' },
  { tag: 'v-gesund', cue: 'die Krankenkasse', answer: 'die Versicherung, die die Behandlung bezahlt', meaning: 'health insurance fund', examples: ['Das übernimmt die <b>Krankenkasse</b> nicht.'] },
  { tag: 'v-gesund', cue: 'die Krankschreibung', answer: 'der Zettel, der sagt: du darfst zu Hause bleiben', meaning: 'sick note', examples: ['Der Arzt hat mich für drei Tage <b>krankgeschrieben</b>.'] },
  { tag: 'v-gesund', cue: 'die Praxis', answer: 'das Büro des Arztes — nicht das Krankenhaus', meaning: "doctor's surgery, practice", examples: ['Die <b>Praxis</b> ist mittwochs nachmittags geschlossen.'] },
  { tag: 'v-gesund', cue: 'die Sprechstunde', answer: 'die Zeit, in der der Arzt Patienten sieht', meaning: 'consultation hours', examples: ['Die <b>Sprechstunde</b> geht bis 12 Uhr.'] },
  { tag: 'v-gesund', cue: 'der Facharzt', answer: 'ein Arzt für ein Gebiet: Augen, Haut, Herz', meaning: 'specialist', examples: ['Dafür müssen Sie zum <b>Facharzt</b>.'] },
  { tag: 'v-gesund', cue: 'die Untersuchung', answer: 'wenn der Arzt nachsieht, was los ist', meaning: 'examination, check-up', examples: ['Die <b>Untersuchung</b> dauert zehn Minuten.'] },
  { tag: 'v-gesund', cue: 'die Behandlung', answer: 'alles, was der Arzt gegen die Krankheit tut', meaning: 'treatment', examples: ['Die <b>Behandlung</b> dauert sechs Wochen.'] },
  { tag: 'v-gesund', cue: 'die Nebenwirkung', answer: 'was ein Medikament <i>außerdem</i> macht — meistens nichts Gutes', meaning: 'side effect', examples: ['Mögliche <b>Nebenwirkungen</b> stehen auf dem Beipackzettel.'] },
  { tag: 'v-gesund', cue: 'die Vorsorgeuntersuchung', answer: 'der Check-up, wenn man <i>nicht</i> krank ist', meaning: 'preventive screening', examples: ['Ab 35 zahlt die Kasse eine <b>Vorsorgeuntersuchung</b>.'] },
  { tag: 'v-gesund', cue: 'sich impfen lassen', answer: 'eine Spritze bekommen, damit man nicht krank wird', meaning: 'to get vaccinated', examples: ['Ich <b>lasse mich</b> jedes Jahr gegen Grippe <b>impfen</b>.'], hint: 'lassen + Infinitiv — jemand anders tut es an dir' },
  { tag: 'v-gesund', cue: 'die Notaufnahme', answer: 'die Station im Krankenhaus für dringende Fälle', meaning: 'A&E, emergency room', examples: ['Nachts müssen Sie in die <b>Notaufnahme</b>.'] },
  { tag: 'v-gesund', cue: 'schwindelig', answer: 'alles dreht sich', meaning: 'dizzy — "mir ist schwindelig", never "ich bin"', examples: ['Mir ist beim Aufstehen <b>schwindelig</b> geworden.'] },
  { tag: 'v-gesund', cue: 'sich erholen', answer: 'wieder zu Kräften kommen', meaning: 'to recover, to recuperate', examples: ['Nach der Grippe muss ich <b>mich</b> noch <b>erholen</b>.'] },
  { tag: 'v-gesund', cue: 'sich ausruhen', answer: 'nichts tun, damit es besser wird', meaning: 'to rest', examples: ['Sie sollten <b>sich</b> ein paar Tage <b>ausruhen</b>.'] },
  { tag: 'v-gesund', cue: 'die Ernährung', answer: 'wie und was man isst', meaning: 'diet, nutrition — the way you eat, not a weight-loss diet', examples: ['Eine gesunde <b>Ernährung</b> ist die halbe Miete.'] },
  { tag: 'v-gesund', cue: 'zunehmen ↔ abnehmen', answer: 'schwerer werden ↔ leichter werden (auch: ans Telefon gehen)', meaning: 'to put on ↔ to lose weight — abnehmen also: to pick up the phone', examples: ['Im Winter <b>nehme</b> ich immer zwei Kilo <b>zu</b>.'] },
  { tag: 'v-gesund', cue: 'der Termin', answer: 'die feste Zeit für einen Besuch', meaning: 'appointment — the single most useful noun in German bureaucracy', examples: ['Ich hätte gern einen <b>Termin</b> für nächste Woche.'] },

  // ── Themenfeld „Reisen, Verkehr & Behörden" · Mo 07.09. ───────────────
  { tag: 'v-reise', cue: 'die Verspätung', answer: 'wenn der Zug später kommt als geplant', meaning: 'delay', examples: ['<b>Verspätung</b> haben', 'Der ICE hat 20 Minuten <b>Verspätung</b>.', 'Wegen der <b>Verspätung</b> habe ich meinen Anschluss verpasst.'] },
  { tag: 'v-reise', cue: 'der Anschluss', answer: 'der nächste Zug, in den man umsteigen will', meaning: 'connection (onward train)', examples: ['den <b>Anschluss</b> verpassen', 'Ihr <b>Anschluss</b> in Ulm wird nicht erreicht.', 'Haben Sie heute Abend noch einen <b>Anschluss</b> nach München?'], hint: 'Durchsagen-Klassiker' },
  { tag: 'v-reise', cue: 'umsteigen', answer: 'aus einem Zug aussteigen und in einen anderen einsteigen', meaning: 'to change trains', examples: ['in Ulm <b>umsteigen</b>', 'In Stuttgart müssen Sie <b>umsteigen</b>.', 'Sie <b>steigen</b> am Hauptbahnhof in die S-Bahn <b>um</b>.'] },
  { tag: 'v-reise', cue: 'das Gleis', answer: 'die Nummer, an der der Zug steht', meaning: 'track, platform number', examples: ['auf <b>Gleis</b> 3', 'Der Zug fährt heute von <b>Gleis</b> 8 ab.', 'Der Zug fährt heute ausnahmsweise von einem anderen <b>Gleis</b> ab.'] },
  { tag: 'v-reise', cue: 'die Durchsage', answer: 'die Ansage aus dem Lautsprecher', meaning: 'public announcement', examples: ['eine <b>Durchsage</b> hören', 'Bitte achten Sie auf die <b>Durchsagen</b>.', 'In der <b>Durchsage</b> hieß es, der Zug fällt heute aus.'] },
  { tag: 'v-reise', cue: 'entwerten', answer: 'den Fahrschein am Automaten stempeln, bevor man einsteigt', meaning: 'to validate/stamp a ticket', examples: ['den Fahrschein <b>entwerten</b>', 'Ein nicht <b>entwerteter</b> Fahrschein gilt nicht.', 'Bitte <b>entwerten</b> Sie Ihr Ticket vor der Fahrt.'] },
  { tag: 'v-reise', cue: 'die Ermäßigung', answer: 'weniger Preis für Studenten, Kinder, Senioren', meaning: 'reduction, concession', examples: ['eine <b>Ermäßigung</b> bekommen', 'Mit dem Ausweis bekommen Sie eine <b>Ermäßigung</b>.', 'Studenten zahlen mit <b>Ermäßigung</b> nur die Hälfte.'] },
  { tag: 'v-reise', cue: 'die Umleitung', answer: 'ein anderer Weg, weil die Straße gesperrt ist', meaning: 'diversion, detour', examples: ['einer <b>Umleitung</b> folgen', 'Wegen der Baustelle gibt es eine <b>Umleitung</b>.', 'Die <b>Umleitung</b> führt durch mehrere kleine Dörfer.'] },
  { tag: 'v-reise', cue: 'die Baustelle', answer: 'die Stelle, an der gebaut wird', meaning: 'building site, roadworks', examples: ['eine <b>Baustelle</b> auf der Autobahn', 'Vor der <b>Baustelle</b> steht der Verkehr.', 'Zwischen Ulm und Augsburg gibt es eine große <b>Baustelle</b>.'] },
  { tag: 'v-reise', cue: 'der Stau', answer: 'viele Autos, die nicht weiterfahren', meaning: 'traffic jam', examples: ['im <b>Stau</b> stehen', 'Auf der A8 sind fünf Kilometer <b>Stau</b>.', 'Wir haben heute zwei Stunden im <b>Stau</b> gestanden.'] },
  { tag: 'v-reise', cue: 'die Unterkunft', answer: 'wo man übernachtet — Hotel, Pension, Ferienwohnung', meaning: 'accommodation', examples: ['eine günstige <b>Unterkunft</b>', 'Habt ihr die <b>Unterkunft</b> schon gebucht?', 'Die <b>Unterkunft</b> liegt zehn Minuten vom Bahnhof entfernt.'] },
  { tag: 'v-reise', cue: 'die Behörde', answer: 'ein Amt des Staates', meaning: 'public authority, government office', examples: ['bei der <b>Behörde</b>', 'Dafür ist eine andere <b>Behörde</b> zuständig.', 'Die <b>Behörde</b> hat mir den Bescheid gestern zugeschickt.'] },
  { tag: 'v-reise', cue: 'zuständig sein für', answer: 'für etwas verantwortlich sein', meaning: 'to be responsible for, to be in charge of', examples: ['<b>zuständig</b> sein <b>für</b> + Akkusativ', 'Wer ist hier <b>für</b> Anmeldungen <b>zuständig</b>?', 'Für Ihren Antrag ist das Bürgeramt <b>zuständig</b>.'] },
  { tag: 'v-reise', cue: 'die Anmeldung', answer: 'wenn man sich offiziell eintragen lässt — auch: der Empfang', meaning: 'registration · also: the reception desk', examples: ['die <b>Anmeldung</b> beim Einwohnermeldeamt', 'Nach dem Umzug haben Sie zwei Wochen für die <b>Anmeldung</b>.', 'Bitte melden Sie sich zuerst an der <b>Anmeldung</b> im Erdgeschoss.'] },
  { tag: 'v-reise', cue: 'einen Antrag stellen', answer: 'offiziell um etwas bitten, mit Formular', meaning: 'to submit an application', examples: ['einen <b>Antrag</b> <b>stellen</b>', 'Sie müssen einen <b>Antrag</b> auf Kindergeld <b>stellen</b>.', 'Den <b>Antrag</b> können Sie auch online <b>stellen</b>.'], hint: 'Antrag <i>stellen</i>, nicht „machen"' },
  { tag: 'v-reise', cue: 'beantragen', answer: 'einen Antrag für etwas stellen', meaning: 'to apply for (officially)', examples: ['einen Ausweis <b>beantragen</b>', 'Ich möchte einen neuen Pass <b>beantragen</b>.', 'Wir haben Wohngeld <b>beantragt</b> und warten auf die Antwort.'] },
  { tag: 'v-reise', cue: 'die Bescheinigung', answer: 'ein Papier, das etwas offiziell bestätigt', meaning: 'certificate, written confirmation', examples: ['eine <b>Bescheinigung</b> vorlegen', 'Bitte bringen Sie eine <b>Bescheinigung</b> vom Arbeitgeber mit.', 'Ohne <b>Bescheinigung</b> vom Arzt geht das leider nicht.'] },
  { tag: 'v-reise', cue: 'die Gebühr', answer: 'das Geld, das ein Amt für seine Arbeit nimmt', meaning: 'fee, charge', examples: ['eine <b>Gebühr</b> bezahlen', 'Die <b>Gebühr</b> beträgt 37 Euro.', 'Die <b>Gebühren</b> müssen Sie vorher überweisen.'] },
  { tag: 'v-reise', cue: 'das Formular ausfüllen', answer: 'die leeren Felder auf dem Papier beschriften', meaning: 'to fill in a form', examples: ['ein <b>Formular</b> <b>ausfüllen</b>', 'Bitte <b>füllen</b> Sie das <b>Formular</b> vollständig <b>aus</b>.', 'Ich habe das <b>Formular</b> falsch <b>ausgefüllt</b> und muss noch einmal hin.'] },
  { tag: 'v-reise', cue: 'die Öffnungszeiten', answer: 'wann geöffnet ist', meaning: 'opening hours', examples: ['die <b>Öffnungszeiten</b> des Amtes', 'Die <b>Öffnungszeiten</b> stehen auf der Internetseite.', 'Am Donnerstag hat das Amt längere <b>Öffnungszeiten</b>.'] },

  // ── Ledger 9 · Sprachbausteine-Lücken ────────────────────────────────
  { tag: 'koll', cue: 'Wir ___ uns ein Zimmer.', loesung: 'Wir teilen uns ein Zimmer.', answer: 'teilen — sich (Dat.) etwas teilen', meaning: 'to share something between you', examples: ['sich etwas <b>teilen</b>', 'Wir <b>teilen uns</b> ein Zimmer.', 'Die beiden Studenten <b>teilen sich</b> eine kleine Wohnung.'], hint: 'SB 32' },
  { tag: 'koll', cue: 'Bitte antworten Sie so bald wie ___.', loesung: 'Bitte antworten Sie so bald wie möglich.', answer: 'möglich — so bald wie möglich', meaning: 'as soon as possible — a fixed phrase, learn it whole', examples: ['<b>so bald wie möglich</b>', 'Melden Sie sich bitte <b>so bald wie möglich</b>.', 'Ich brauche Ihre Antwort <b>so bald wie möglich</b>, spätestens am Freitag.'], hint: 'SB 37' },
  { tag: 'koll', cue: 'Ich erkundige mich ___ dem Preis.', loesung: 'Ich erkundige mich nach dem Preis.', answer: 'nach — sich erkundigen nach + Dativ', meaning: 'to enquire about something', examples: ['sich <b>nach</b> etwas <b>erkundigen</b>', 'Ich <b>erkundige mich nach</b> den Öffnungszeiten.', 'Er hat <b>sich</b> im Reisebüro <b>nach</b> günstigen Flügen <b>erkundigt</b>.'], hint: 'SB 38' },
  { tag: 'koll', cue: 'jdm. etwas ___ (= informieren)', loesung: 'jdm. etwas mitteilen', answer: 'mitteilen — jdm. etwas mitteilen', meaning: 'to inform someone of something (separable: teile … mit)', examples: ['jemandem etwas <b>mitteilen</b>', 'Bitte <b>teilen</b> Sie uns Ihre neue Adresse <b>mit</b>.', 'Die Schule hat uns den neuen Termin schriftlich <b>mitgeteilt</b>.'] },
  { tag: 'koll', cue: 'Ich bin ___ unter 0170 …', loesung: 'Ich bin erreichbar unter 0170.', answer: 'erreichbar — erreichbar unter + Nummer', meaning: 'reachable / available on (a number)', examples: ['<b>erreichbar unter</b> + Nummer', 'Ich bin <b>erreichbar unter</b> 0170 123456.', 'Am Wochenende bin ich nur per E-Mail <b>erreichbar</b>.'] },

  // ── Ledger 10–19 · meist aus dem Schriftlichen Ausdruck ───────────────
  { tag: 'gramm', cue: '„ich freue mich auf ihnen besuchen"', answer: 'ich freue mich <b>darauf, dich zu besuchen</b>', meaning: 'A verb with a fixed preposition takes da(r)+prep before a zu-clause: "I am looking forward to visiting you."', examples: ['sich freuen <b>auf</b> → da<b>r</b>auf + Komma + zu-Infinitiv'], hint: 'Ledger 14 — dein häufigster Briefsatz' },
  { tag: 'gramm', cue: '„… und ihn kennenlernen zu"', answer: '… und ihn <b>kennenzulernen</b>', meaning: 'With a separable verb the zu goes inside the word, not in front of it.', examples: ['Bei trennbaren Verben steht <b>zu</b> in der Mitte: an<b>zu</b>rufen, ein<b>zu</b>laden.'], hint: 'Ledger 16' },
  { tag: 'gramm', cue: 'Versprechen: „Ich rufe Sie zurück."', answer: 'Futur I: Ich <b>werde</b> Sie zurück<b>rufen</b>.', meaning: 'A promise takes werden + infinitive at the end — telc tests this directly.', examples: ['werden + Infinitiv am Satzende.'], hint: 'Ledger 12 · SB 40' },
  { tag: 'gramm', cue: '„mit denen Kollegen"', answer: '<b>mit den</b> Kollegen', meaning: 'denen replaces a noun; it can never stand in front of one. Use the article den.', examples: ['<b>denen</b> kann nie vor einem Nomen stehen — es ersetzt das Nomen.'], hint: 'Ledger 11 · SB 28' },
  { tag: 'gramm', cue: '„Er hatte sich beworben und hat gemietet."', answer: 'Er <b>hatte</b> sich beworben und … <b>gemietet</b>.', meaning: 'Two participles share one auxiliary — the second hatte/hat is dropped.', examples: ['Ein Hilfsverb trägt beide Partizipien.'], hint: 'Ledger 10 · SB 24' },
  { tag: 'gramm', cue: 'damit oder dann?', answer: '<b>damit</b> = Zweck · <b>dann</b> = Zeit', meaning: 'damit = so that (purpose) · dann = then (time)', examples: ['Ich schreibe früh, <b>damit</b> du antworten kannst. — Erst esse ich, <b>dann</b> lerne ich.'], hint: 'Ledger 17' },
  { tag: 'gramm', cue: '„mit Einander"', answer: '<b>miteinander</b> — ein Wort', meaning: 'one word: with each other', examples: ['Wir haben lange <b>miteinander</b> gesprochen.'] },
  { tag: 'gramm', cue: '„Ich hoffe dich bald zu sehen"', answer: 'Ich hoffe<b>,</b> dich bald zu sehen.', meaning: 'Comma before an extended zu-infinitive — a free point.', examples: ['Komma vor dem erweiterten zu-Infinitiv.'], hint: 'Ledger 18 — billiger Punkt' },
  { tag: 'gramm', cue: 'Satzanfang: „ich danke Ihnen."', answer: '<b>Ich</b> danke Ihnen.', meaning: 'Capital at the start of every sentence; the polite Ihnen stays capitalised anywhere.', examples: ['<b>Ihnen</b> bleibt groß — Höflichkeitsform.'], hint: 'Ledger 18 — 3× im letzten Brief falsch' },
  { tag: 'gramm', cue: 'Imperativ von „sich beeilen" (du)', answer: '<b>Beeil dich!</b>', meaning: '"Hurry up!" — the du-imperative keeps the du-reflexive dich, never sich.', examples: ['Der Imperativ nimmt die <b>du</b>-Zeile: dich, nicht sich.'], hint: 'Ledger 19' },
  { tag: 'gramm', cue: '„Ich erinnere ___ an den Termin."', loesung: 'Ich erinnere mich an den Termin.', answer: 'mich — <b>Akkusativ</b>', meaning: 'sich erinnern an = to remember; the reflexive is accusative, because an + Akk. is not a direct object.', examples: ['Eine Präpositionalphrase ist kein direktes Objekt → kein Dativ-Reflexiv.'], hint: 'Ledger 19' },

  // ── Ledger 1–5 · Hörverstehen-Fallentypen ────────────────────────────
  { tag: 'falle', cue: 'Das Wort aus der Aussage kommt im Hörtext vor.', answer: 'Beweist <b>nichts</b>. Wortgleichheit ist die häufigste Falle.', meaning: 'A shared word proves nothing — word-match is the trap you fall for most.', examples: ['ÜT4/44: „bezahlen" fällt — aber sie beklagt Ausbeutung und fordert nie mehr Geld.'], hint: 'Ledger 2' },
  { tag: 'falle', cue: 'Die Aussage enthält immer / ganz / nur / alle / nie', answer: 'Alarm. Meist <b>falsch</b>, sobald der Text einschränkt.', meaning: 'Absolutes (always/only/all/never) are usually false as soon as the text qualifies anything.', examples: ['ÜT4/48: Telefon ist <b>zu festen Zeiten</b> besetzt, sonst AB → nicht „immer".'], hint: 'Ledger 3 — zwei Fehler in einem Test' },
  { tag: 'falle', cue: 'Im Hörtext fällt ein klares „Nein, nicht …"', answer: 'Explizite Verneinung kippt die Aussage — sofort mitschreiben.', meaning: 'An explicit negation flips the statement. Write it down the moment you hear it.', examples: ['ÜT4/49: „Nein, nicht die Adresse" → die Liste enthält keine Adressen.'], hint: 'Ledger 4' },
  { tag: 'falle', cue: '„Alles richtet sich nach der Arbeit."', answer: '= „Das Leben besteht nur noch aus Arbeit." <b>Richtig.</b>', meaning: 'Paraphrase works at the level of meaning — no shared word is needed for a statement to be true.', examples: ['Paraphrase auf Bedeutungsebene.'], hint: 'Ledger 1 · ÜT4/43' },
  { tag: 'falle', cue: '„Das können Sie bei uns in der Redaktion erfragen."', answer: 'Das Interview läuft also im <b>Rundfunk</b>.', meaning: 'Infer the situation from the setting, instead of hunting for the word itself.', examples: ['Ort und Situation erschließen, nicht nach dem Wort suchen.'], hint: 'Ledger 5 · ÜT4/47' },
  { tag: 'falle', cue: 'Österreich + Belgien — Aussage sagt „ganz Europa"', answer: '<b>Falsch.</b> Zwei Länder sind nicht ein Kontinent.', meaning: 'Over-generalisation: the statement claims more than the text says.', examples: ['Die Aussage macht mehr aus dem Text, als dort steht.'], hint: 'Ledger 3 · ÜT4/55' },
  { tag: 'falle', cue: 'Du weißt die Antwort nicht. Was tun?', answer: '<b>Immer ankreuzen.</b> Nie ein Feld leer lassen.', meaning: 'Always tick something. telc deducts nothing for a wrong answer: a guess is 50 %, a blank is 0 %.', examples: ['telc zieht für falsche Antworten nichts ab.'], hint: 'Ledger 13 — im Übungstest zweimal leer gelassen' },

  // ── Die 30-Sekunden-Routine · Teil 1 ─────────────────────────────────
  //
  // Teil 1 kalt: 2 von 5. Nicht das Ohr — die Lesezeit. Fünf Aussagen in
  // 30 Sekunden sind 6 Sekunden pro Satz: genug zum Markieren, nie genug
  // zum Übersetzen. Diese sechs Karten sind die ganze Routine.
  { tag: 'falle', cue: 'Teil 1: 30 Sekunden, fünf Aussagen. Was tust du?', answer: 'Nicht lesen — das <b>Scharnier</b> finden. In jeder Aussage nur das eine Wort, an dem sie hängt. Digital: <b>merken</b>, nicht markieren.', meaning: "Don't read for meaning — find the hinge. Six seconds a statement is enough to see what each one turns on, never enough to translate it. The digital exam can highlight, but dragging a mouse over five words does not fit into 30 seconds.", examples: ['Danach wartest du beim Hören auf fünf <b>Signale</b> statt auf fünf Sätze.'], hint: '2026-08-15 · Teil 1 kalt 2/5' },
  { tag: 'falle', cue: 'Scharnier: meistens · oft · normalerweise · selten', answer: '<b>Häufigkeit.</b> Der Text muss sagen, <i>wie oft</i> — nicht <i>ob</i>.', meaning: 'Frequency hinge. The audio has to match how often, not whether it happens at all.', examples: ['Er fährt <b>meistens</b> mit dem Zug — ein einziges Mal mit dem Auto widerlegt das nicht.'] },
  { tag: 'falle', cue: 'Scharnier: trotz · obwohl · trotzdem', answer: '<b>Einräumung.</b> Zwei Hälften — es gilt die zweite.', meaning: 'Concession. Two halves, and only the second one is what the statement actually claims.', examples: ['„<b>Trotz</b> des Regens war es schön" ist richtig, wenn es schön war. Der Regen ist Kulisse.'] },
  { tag: 'falle', cue: 'Scharnier: lieber · am liebsten · statt', answer: '<b>Präferenz.</b> A <i>gegen</i> B — nicht A allein.', meaning: 'Preference. The claim compares two options; both sides have to be in the audio.', examples: ['Er verreist <b>lieber</b> allein <b>als</b> mit Freunden. „Er reist gern allein" reicht nicht.'] },
  { tag: 'falle', cue: 'Scharnier: mehr · weniger · als geplant', answer: '<b>Vergleich.</b> Hör auf die <i>Richtung</i>, nicht auf die Zahl.', meaning: 'Comparison. Listen for the direction of the difference — the number itself is usually a decoy.', examples: ['Der Aufenthalt kostete <b>weniger</b> als geplant. Teurer geworden? Dann falsch.'] },
  { tag: 'falle', cue: 'Wie oft hörst du Teil 1?', answer: '<b>Nur einmal.</b> Teil 2 und Teil 3 zweimal.', meaning: 'Teil 1 plays once. A statement you are still decoding while it runs is a statement you have already lost.', examples: ['Darum die 30 Sekunden davor — es ist die einzige Vorbereitung, die du bekommst.'], hint: 'Testheft: „Sie hören diese Texte nur einmal."' },

  // ── Ledger 18 · Schreiben-Mechanik ───────────────────────────────────
  { tag: 'brief', cue: 'Die vier Dinge, die jeder Brief braucht', answer: '<b>Betreff</b> · Anrede + Gruß · alle 4 Leitpunkte · Schluss mit einer <b>Frage</b>', meaning: 'Subject line · greeting and sign-off · all four bullet points · close with a question.', examples: ['Im letzten Test fehlte der Betreff — das kostet in Kriterium II direkt eine Note.'], hint: 'Ledger 18' },
  { tag: 'brief', cue: '„Sehr geehrte Damen und Herren," → Gruß?', answer: '<b>Mit freundlichen Grüßen</b>', meaning: 'Formal opening takes the formal close. Never "Liebe Grüße" after "Sehr geehrte".', examples: ['Formell ↔ formell.'] },
  { tag: 'brief', cue: '„Liebe Frau Meier," → Gruß?', answer: '<b>Viele Grüße</b> / Herzliche Grüße', meaning: 'Semi-formal — exactly the register telc B1 asks for almost every time.', examples: ['Halbformell — genau der Ton, den telc B1 fast immer verlangt.'] },

  // ── Die Prüfung ist digital (bestätigt 2026-08-15) ────────────────────
  //
  // Nicht Wortschatz, sondern Bedienung: sechs Dinge, die am 25.09. anders
  // sind als in jedem Übungstest auf Papier, den wir bisher gerechnet haben.
  { tag: 'digital', cue: 'Womit schreibst du den Brief?', answer: 'Getippt, auf der <b>deutschen QWERTZ-Tastatur</b> des Prüfungszentrums. Rechner, Maus und Kopfhörer stellt das Zentrum.', meaning: 'Typed, on the test centre’s German QWERTZ keyboard. Computer, mouse and headphones are provided — you cannot bring or configure your own.', examples: ['Du tippst sonst Dvorak. Auf QWERTZ sind <b>y und z vertauscht</b>.'], hint: 'telc digital ab 2026' },
  { tag: 'digital', cue: 'Wo liegen ä, ö, ü und ß auf QWERTZ?', answer: '<b>ö ä</b> rechts neben dem L · <b>ü</b> rechts neben dem P · <b>ß</b> rechts neben der 0.', meaning: 'ö ä sit right of L, ü right of P, ß right of the 0. Learn them by feel — hunting for an umlaut costs seconds you do not have in a 30-minute letter.', examples: ['Üben, bis du <b>Grüße</b> und <b>möchte</b> ohne Hinsehen tippst.'] },
  { tag: 'digital', cue: 'Was zeigt der Bildschirm beim Schreiben mit?', answer: 'Die <b>Wortzahl</b>, laufend. Kein Zählen mehr — und keine Ausrede für zu kurz.', meaning: 'A live word count. No counting by hand any more — and no excuse for coming in short.', examples: ['Ändern und umstellen geht ohne Durchstreichen: der Text bleibt sauber.'] },
  { tag: 'digital', cue: 'Kann man den Text am Bildschirm markieren?', answer: 'Ja, mit der Maus — aber es kostet Zeit. Im Lesen sinnvoll, in <b>Hören Teil 1</b> nicht: 30 Sekunden für fünf Aussagen.', meaning: 'Yes, with the mouse. Worth it in the reading paper, not in listening Teil 1 — you have 30 seconds for five statements.', examples: ['Regel: markieren, wo du zurückspringst. Merken, wo die Uhr läuft.'] },
  { tag: 'digital', cue: 'Was nimmst du mit in die Prüfung?', answer: 'Nur <b>Ausweis</b> und Anmeldung. Eigene Stifte und eigenes Papier sind nicht erlaubt.', meaning: 'Only your ID and the registration. Your own pens and paper are not allowed — ask the centre whether they hand out scratch paper.', examples: ['Alles Schriftliche passiert am Rechner.'] },
  { tag: 'digital', cue: 'Kopfhörer im Hörverstehen — was tust du zuerst?', answer: 'Die <b>Lautstärke einstellen</b>, bevor Teil 1 startet. Jeder hat eigene Kopfhörer.', meaning: 'Set the volume before Teil 1 begins. Everyone gets their own headphones — the room acoustics no longer decide what you hear.', examples: ['Der einzige Teil der Prüfung, den du selbst regeln kannst. Nutze ihn vorher, nicht mittendrin.'] },

  // ── Brief-Bausteine — das eine Skelett hinter allen 12 Lehrerin-Themen ──
  // (german/reference/brief-themen-lehrerin.md · aus dem Mock vom 16.08.:
  //  „Lieber Maria" und ein vergessener Leitpunkt kosten mehr als jede Vokabel)
  { tag: 'brief', cue: 'Der Dreischritt jedes Lehrerin-Briefs', answer: '<b>Beschreiben</b> (Wie war es?) → <b>Begründen</b> (Warum?) → <b>Vorschlag / Termin</b>.', meaning: 'Describe how it was, give reasons why, then propose a meeting or date. Every one of the twelve letter prompts follows exactly this shape.', examples: ['Erst die drei Leitpunkte antippen, dann tippen.'], hint: 'Ledger 47' },
  { tag: 'brief', cue: 'Die Anrede — Freundin Anna, Freund Karim', answer: '<b>Liebe</b> Anna, · <b>Lieber</b> Karim,', meaning: 'Liebe for a woman, Lieber for a man. The one-letter mistake that opened the mock letter.', examples: ['Liebe Maria, wie schön, von dir zu hören!'], hint: 'Ledger 45' },
  { tag: 'brief', cue: 'Der Einstieg — er/sie konnte nicht kommen', answer: 'Wie schade, dass du nicht dabei sein konntest! Ich hoffe, es geht dir wieder besser.', meaning: 'What a pity you could not be there! I hope you are feeling better again.', examples: ['Passt nach jeder Anrede — Krankheit, Reise oder Termin.'] },
  { tag: 'brief', cue: 'Baustein Beschreiben', answer: 'Der Ausflug war wirklich toll. <b>Besonders gut hat mir</b> die Aussicht <b>gefallen</b>.', meaning: 'The trip was really great. I especially liked the view. — The all-purpose describing pair: „… war wirklich toll" plus „besonders gut hat mir … gefallen".', examples: ['Die Party war wunderbar — besonders gut hat mir die Musik gefallen.'] },
  { tag: 'brief', cue: 'Baustein Begründen', answer: 'Ich fand den Abend so schön, <b>weil</b> endlich alle Freunde zusammen <b>waren</b>.', meaning: 'I found the evening so lovely because all my friends were finally together. — weil sends the verb to the end.', examples: ['Ich habe dieses Auto gekauft, weil es wenig verbraucht.'] },
  { tag: 'brief', cue: 'Baustein Begründen — negativ (Thema Gruppenreise!)', answer: 'Ein bisschen <b>geärgert habe ich mich über</b> das Wetter.', meaning: 'I was a little annoyed about the weather. — sich ärgern über + accusative; the only prompt with a negative point.', examples: ['Geärgert habe ich mich über den lauten Reiseleiter.'], hint: 'Ledger 39' },
  { tag: 'brief', cue: 'Baustein Vorschlag', answer: '<b>Hast du am Samstag Zeit? Wollen wir</b> den Film zusammen sehen?', meaning: 'Are you free on Saturday? Shall we watch the film together? — question plus wollen wir covers the third bullet in one line.', examples: ['Hast du nächste Woche Zeit? Wollen wir zusammen ins Einkaufszentrum fahren?'] },
  { tag: 'brief', cue: 'Baustein Vorschlag — förmlicher', answer: '<b>Ich schlage vor, dass</b> wir uns nächste Woche <b>treffen</b>. Dann erzähle ich dir alles.', meaning: 'I suggest that we meet next week. Then I will tell you everything. — dass sends the verb to the end.', examples: ['Ich schlage vor, dass wir am Sonntag zusammen zum Tanzkurs gehen.'] },
  { tag: 'brief', cue: 'Der Schluss vor dem Gruß', answer: '<b>Ich freue mich auf deine Antwort.</b> Melde dich bald!', meaning: 'I look forward to your reply. Get in touch soon! — sich freuen auf + accusative closes every letter.', examples: ['Ich freue mich darauf, dich bald zu sehen.'], hint: 'Ledger 14' },

  // ── Sprechthemen der Lehrerin — eine Meinung + zwei eigene Beispiele pro Thema ──
  { tag: 'thema', cue: 'Vor- und Nachteile vom Internet — deine Meinung?', answer: '<b>Einerseits</b> finde ich das Internet sehr praktisch, weil man alles schnell findet. <b>Andererseits</b> verliert man dabei leicht die Zeit.', meaning: 'On the one hand the internet is very practical because you find everything fast; on the other hand you easily lose track of time.', examples: ['Ich arbeite als Softwareentwickler — ohne Internet könnte ich gar nicht arbeiten.'] },
  { tag: 'thema', cue: 'Sollen Kinder im Kindergarten eine Fremdsprache lernen?', answer: 'Ich finde ja, <b>denn</b> kleine Kinder lernen Sprachen viel leichter als Erwachsene.', meaning: 'I think yes, because small children learn languages much more easily than adults.', examples: ['Ich lerne seit zwei Jahren Deutsch — als Kind wäre es schneller gegangen!'] },
  { tag: 'thema', cue: 'Soll Arbeiten an den Feiertagen verboten sein?', answer: '<b>Ich bin dagegen</b>, es ganz zu verbieten — im Krankenhaus zum Beispiel muss immer jemand arbeiten.', meaning: 'I am against banning it completely — in a hospital, for example, someone always has to work.', examples: ['Wer am Feiertag arbeitet, sollte aber mehr Geld bekommen.'] },
  { tag: 'thema', cue: 'Urlaub am Strand und im Hotel — oder zu Hause?', answer: '<b>Für mich</b> ist Urlaub am Strand die bessere Wahl, weil ich dort wirklich abschalten kann.', meaning: 'For me a beach holiday is the better choice because I can really switch off there.', examples: ['Zu Hause denke ich sofort wieder an die Arbeit.'] },
  { tag: 'thema', cue: 'E-Bücher — braucht man noch gedruckte Bücher?', answer: '<b>Meiner Meinung nach</b> braucht man beides: E-Bücher für unterwegs, gedruckte Bücher zum Verschenken.', meaning: 'In my opinion you need both: e-books for on the go, printed books as presents.', examples: ['Auf dem Handy lese ich unterwegs — aber ein Geschenk soll man anfassen können.'] },
  { tag: 'thema', cue: 'Dürfen Männer weinen?', answer: 'Natürlich, <b>ich finde es sogar wichtig</b> — Gefühle zu zeigen ist keine Schwäche, sondern ehrlich.', meaning: 'Of course — I even think it is important. Showing feelings is not weakness, it is honest.', examples: ['Bei einem traurigen Film weine ich manchmal auch.'] },
  { tag: 'thema', cue: 'Autofreies Stadtzentrum?', answer: '<b>Ich bin dafür</b>, weil die Luft besser wird und man in Ruhe zu Fuß gehen kann.', meaning: 'I am in favour, because the air gets better and you can walk in peace.', examples: ['In Frankfurt fahre ich sowieso lieber mit der Bahn als mit dem Auto.'] },
  { tag: 'thema', cue: 'Vegetarische Ernährung — deine Meinung?', answer: 'Ich esse zwar Fleisch, <b>aber</b> ein oder zwei vegetarische Tage pro Woche <b>finde ich eine gute Idee</b>.', meaning: 'I do eat meat, but I think one or two vegetarian days a week are a good idea.', examples: ['Ich backe gern Brot — vegetarisch kochen macht mir auch Spaß.'] },
  { tag: 'thema', cue: 'Umwelt — was kann jeder Einzelne tun?', answer: '<b>Ich glaube</b>, jeder kann etwas tun: weniger Auto fahren, Müll trennen und weniger wegwerfen.', meaning: 'I believe everyone can do something: drive less, separate the rubbish and throw away less.', examples: ['Ich fahre mit der Bahn zur Arbeit statt mit dem Auto.'] },
  { tag: 'thema', cue: 'Mahlzeit bei der Arbeit — Kantine oder mitbringen?', answer: '<b>Am liebsten</b> bringe ich mein Essen selbst mit, weil es gesünder und billiger ist.', meaning: 'I prefer to bring my own food because it is healthier and cheaper.', examples: ['In der Kantine esse ich nur, wenn ich keine Zeit zum Kochen hatte.'] },
  { tag: 'thema', cue: 'Ernährung bei der Arbeit — wie bleibt man fit?', answer: '<b>Wichtig ist</b>, dass man regelmäßig isst und genug Wasser trinkt — sonst kann man sich nicht konzentrieren.', meaning: 'The important thing is to eat regularly and drink enough water — otherwise you cannot concentrate.', examples: ['Ich sitze den ganzen Tag am Computer, deshalb gehe ich mittags kurz spazieren.'] },
]

/**
 * Der Kern der vier Themenfeld-Abende — one place instead of forty scattered
 * flags, so the tier can be re-cut in one edit when a word turns out to be
 * already known. ~10 per field: the everyday, exam-frequent words first; the
 * rest of the deck is the Ausbau and stays locked until the core has sat
 * (see `Card.core` in types.ts and the gate in CardDrill).
 *
 * Cut by two rules: (1) words the Sprechen evening of the same week actually
 * needs out loud, (2) words telc uses in task rubrics and Durchsagen. Swaps
 * are cheap — say so in chat and the set moves.
 */
const CORE_CUES = new Set([
  // Arbeit & Beruf — Mo 17.08. (die Gastronomie-Karte spricht über Schicht & Ausbildung)
  'die Bewerbung', 'das Vorstellungsgespräch', 'die Ausbildung', 'die Schicht',
  'die Überstunden', 'der Feierabend', 'kündigen', 'einstellen', 'das Gehalt',
  'die Stelle', 'der Ablauf', 'beschäftigen',
  // Wohnen & Nachbarn — Mo 24.08.
  'die Miete', 'die Nebenkosten', 'der Vermieter ↔ der Mieter', 'die Hausordnung',
  'die Ruhezeit', 'der Lärm', 'sich beschweren über', 'umziehen',
  'die Nachbarschaft', 'die Besichtigung',
  // Gesundheit — Mo 31.08.
  'die Beschwerden', 'das Rezept', 'die Überweisung', 'die Krankenkasse',
  'die Praxis', 'der Termin', 'die Untersuchung', 'sich erholen',
  'die Ernährung', 'der Facharzt',
  // Reisen & Behörden — Mo 07.09.
  'die Verspätung', 'der Anschluss', 'umsteigen', 'das Gleis', 'die Durchsage',
  'der Stau', 'die Unterkunft', 'zuständig sein für', 'einen Antrag stellen',
  'die Gebühr',
])

for (const card of CARDS) {
  if (CORE_CUES.has(card.cue)) card.core = true
}
