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
  { tag: 'v-arbeit', cue: 'ausnützen', answer: 'ausnutzen, ausbeuten — jemanden zu viel arbeiten lassen', meaning: 'to exploit, take advantage of someone', example: 'Der Chef <b>nützt</b> seine Mitarbeiter <b>aus</b>.', hint: 'süddt./österr. Form von ausnutzen' },
  { tag: 'v-arbeit', cue: 'abschaffen', answer: 'beenden — es gibt etwas danach nicht mehr', meaning: 'to abolish, do away with', example: 'Die Firma hat die Gleitzeit <b>abgeschafft</b>.' },
  { tag: 'v-arbeit', cue: 'frech', answer: 'unhöflich, ohne Respekt', meaning: 'cheeky, impudent', example: 'Sei nicht so <b>frech</b> zu deinen Kollegen!' },
  { tag: 'v-arbeit', cue: 'beschäftigen', answer: 'jemanden angestellt haben · sich ~ mit = Zeit mit etwas verbringen', meaning: 'to employ · sich ~ mit = to occupy oneself with', example: 'Die Firma <b>beschäftigt</b> 200 Leute.' },
  { tag: 'v-arbeit', cue: 'der Ablauf', answer: 'die Reihenfolge, in der etwas passiert (auch: das Ende einer Frist)', meaning: 'sequence, procedure — also: expiry', example: 'Der <b>Ablauf</b> des Tages ist genau geplant.' },

  // ── Ledger 7 · Hörverstehen Teil 2 ───────────────────────────────────
  { tag: 'v-buero', cue: 'der Unkostenbeitrag', answer: 'ein kleiner Betrag, den alle zu den Kosten dazugeben', meaning: 'contribution towards costs', example: 'Wir bitten um einen kleinen <b>Unkostenbeitrag</b>.' },
  { tag: 'v-buero', cue: 'überregional', answer: 'in vielen Regionen, nicht nur am Ort', meaning: 'nationwide, beyond one region', example: 'eine <b>überregionale</b> Tageszeitung' },
  { tag: 'v-buero', cue: 'der Ansprechpartner', answer: 'die Person, an die man sich mit einer Frage wendet', meaning: 'contact person', example: 'Wer ist mein <b>Ansprechpartner</b> in dieser Sache?' },
  { tag: 'v-buero', cue: 'besetzt', answer: 'schon von jemandem benutzt — Platz, Toilette, Telefonleitung', meaning: 'occupied · engaged (phone) · taken (seat)', example: 'Die Leitung ist gerade <b>besetzt</b>.' },
  { tag: 'v-buero', cue: 'stattfinden', answer: 'passieren wie geplant', meaning: 'to take place', example: 'Das Treffen <b>findet</b> am Montag <b>statt</b>.' },
  { tag: 'v-buero', cue: 'die Redaktion', answer: 'das Büro, in dem Zeitung, Radio oder Fernsehen gemacht wird', meaning: 'editorial office, newsroom', example: 'Fragen Sie bei uns in der <b>Redaktion</b> nach.', hint: 'Falle 47: Redaktion → das läuft im Rundfunk' },

  // ── Ledger 8 · Hörverstehen Teil 3, Durchsagen ────────────────────────
  { tag: 'v-ansage', cue: 'umgehend', answer: 'sofort, ohne zu warten', meaning: 'immediately, without delay', example: 'Bitte melden Sie sich <b>umgehend</b> im Büro.' },
  { tag: 'v-ansage', cue: 'versperren', answer: 'den Weg blockieren, sodass niemand durchkommt', meaning: 'to block, obstruct', example: 'Ein Auto <b>versperrt</b> die Einfahrt.' },
  { tag: 'v-ansage', cue: 'die Einfahrt', answer: 'die Stelle, wo Autos auf ein Grundstück fahren', meaning: 'driveway, vehicle entrance', example: '<b>Einfahrt</b> bitte freihalten!' },
  { tag: 'v-ansage', cue: 'das Kennzeichen', answer: 'das Nummernschild am Auto', meaning: 'licence plate — also: a distinguishing mark', example: 'der Wagen mit dem <b>Kennzeichen</b> M-AB 1234' },
  { tag: 'v-ansage', cue: 'der Schlüsselbund', answer: 'mehrere Schlüssel an einem Ring', meaning: 'bunch of keys', example: 'Ein <b>Schlüsselbund</b> wurde am Eingang gefunden.' },
  { tag: 'v-ansage', cue: 'das Gericht', answer: 'ein Essen auf der Speisekarte — und: der Ort, wo ein Richter arbeitet', meaning: 'dish (food) — and also: court of law', example: 'Das <b>Gericht</b> des Tages ist Gulasch.', hint: 'in einer Restaurant-Durchsage nie „Gerichtssaal"' },
  { tag: 'v-ansage', cue: 'die Auswahl', answer: 'alles, woraus man wählen kann', meaning: 'selection, choice, range', example: 'eine große <b>Auswahl</b> an warmen Getränken' },

  // ── Themenfeld „Arbeit & Beruf" · Mo 17.08. ───────────────────────────
  { tag: 'v-arbeit', cue: 'die Bewerbung', answer: 'die Unterlagen, die man an eine Firma schickt, um eine Stelle zu bekommen', meaning: 'job application', example: 'Ich habe meine <b>Bewerbung</b> gestern abgeschickt.' },
  { tag: 'v-arbeit', cue: 'sich bewerben um', answer: 'schriftlich um eine Stelle bitten', meaning: 'to apply for (a job) — always sich bewerben <b>um</b> + Akk.', example: 'Ich <b>bewerbe mich um</b> eine Stelle als Entwickler.' },
  { tag: 'v-arbeit', cue: 'das Vorstellungsgespräch', answer: 'das Gespräch in der Firma, bevor man die Stelle bekommt', meaning: 'job interview', example: 'Am Dienstag habe ich ein <b>Vorstellungsgespräch</b>.' },
  { tag: 'v-arbeit', cue: 'der Lebenslauf', answer: 'die Liste von Schule, Ausbildung und bisherigen Stellen', meaning: 'CV, résumé', example: 'Bitte schicken Sie uns Ihren <b>Lebenslauf</b>.' },
  { tag: 'v-arbeit', cue: 'die Ausbildung', answer: 'die Lehre — Betrieb und Berufsschule zusammen, meist drei Jahre', meaning: 'vocational training, apprenticeship', example: 'Meine Tochter macht eine <b>Ausbildung</b> als Köchin.', hint: 'Sprechen-Karte „Arbeiten in der Gastronomie"' },
  { tag: 'v-arbeit', cue: 'die Schicht', answer: 'ein fester Arbeitsblock, z. B. von 6 bis 14 Uhr', meaning: 'shift', example: 'Diese Woche habe ich <b>Spätschicht</b>.' },
  { tag: 'v-arbeit', cue: 'die Gleitzeit', answer: 'man darf selbst wählen, wann man anfängt und aufhört', meaning: 'flexitime', example: 'Wir haben <b>Gleitzeit</b> — ich komme meistens um neun.' },
  { tag: 'v-arbeit', cue: 'die Überstunden', answer: 'die Stunden, die man nach dem Feierabend noch arbeitet', meaning: 'overtime', example: 'Letzte Woche habe ich zehn <b>Überstunden</b> gemacht.' },
  { tag: 'v-arbeit', cue: 'der Feierabend', answer: 'das Ende des Arbeitstages', meaning: 'the end of the working day — English has no single word for it', example: 'Um 17 Uhr ist bei mir <b>Feierabend</b>.' },
  { tag: 'v-arbeit', cue: 'kündigen', answer: 'einen Vertrag beenden — der Angestellte oder die Firma', meaning: 'to quit — or, from the other side, to sack someone', example: 'Ich habe zum 30. Juni <b>gekündigt</b>.' },
  { tag: 'v-arbeit', cue: 'einstellen', answer: 'jemanden neu anstellen', meaning: 'to hire — also: to adjust a setting, or to stop doing something', example: 'Die Firma <b>stellt</b> im Herbst zwanzig Leute <b>ein</b>.' },
  { tag: 'v-arbeit', cue: 'der Betrieb', answer: 'die Firma als Arbeitsplatz — auch: dass etwas läuft', meaning: 'company, plant · also: operation ("in Betrieb" = running)', example: 'In unserem <b>Betrieb</b> arbeiten 50 Leute.' },
  { tag: 'v-arbeit', cue: 'der/die Vorgesetzte', answer: 'die Person über dir — der Chef, die Chefin', meaning: 'superior, line manager', example: 'Das muss ich mit meiner <b>Vorgesetzten</b> besprechen.' },
  { tag: 'v-arbeit', cue: 'das Gehalt', answer: 'das Geld, das man jeden Monat bekommt (Angestellte)', meaning: 'salary — monthly', example: 'Das <b>Gehalt</b> kommt immer am Ersten.' },
  { tag: 'v-arbeit', cue: 'der Lohn', answer: 'das Geld pro Stunde (Arbeiter)', meaning: 'wages — by the hour', example: 'Der <b>Mindestlohn</b> ist gesetzlich festgelegt.' },
  { tag: 'v-arbeit', cue: 'die Stelle', answer: 'der Arbeitsplatz, die Position — auch: der Ort', meaning: 'position, job · also: a spot, a place', example: 'Sie hat eine neue <b>Stelle</b> gefunden.' },
  { tag: 'v-arbeit', cue: 'anspruchsvoll', answer: 'schwer, verlangt viel Können', meaning: 'demanding, challenging', example: 'Das ist eine sehr <b>anspruchsvolle</b> Aufgabe.' },
  { tag: 'v-arbeit', cue: 'zuverlässig', answer: 'man kann sich auf ihn verlassen', meaning: 'reliable, dependable', example: 'Sie ist die <b>zuverlässigste</b> Kollegin im Team.' },
  { tag: 'v-arbeit', cue: 'die Teilzeit ↔ die Vollzeit', answer: 'weniger Stunden ↔ die volle Woche', meaning: 'part-time ↔ full-time', example: 'Nach der Elternzeit arbeitet er <b>in Teilzeit</b>.' },
  { tag: 'v-arbeit', cue: 'die Fortbildung', answer: 'ein Kurs, um im Beruf mehr zu können', meaning: 'further training, professional development', example: 'Die Firma bezahlt eine <b>Fortbildung</b> in Excel.' },

  // ── Themenfeld „Wohnen & Nachbarschaft" · Mo 24.08. ───────────────────
  { tag: 'v-wohnen', cue: 'die Miete', answer: 'das Geld, das man jeden Monat für die Wohnung zahlt', meaning: 'rent', example: 'Die <b>Miete</b> ist am dritten Werktag fällig.' },
  { tag: 'v-wohnen', cue: 'die Nebenkosten', answer: 'Heizung, Wasser, Müll — alles zusätzlich zur Miete', meaning: 'utilities, service charges', example: '600 Euro <b>plus Nebenkosten</b>.' },
  { tag: 'v-wohnen', cue: 'die Kaution', answer: 'das Geld, das man am Anfang hinterlegt und am Ende zurückbekommt', meaning: 'security deposit', example: 'Die <b>Kaution</b> beträgt drei Monatsmieten.' },
  { tag: 'v-wohnen', cue: 'der Vermieter ↔ der Mieter', answer: 'dem die Wohnung gehört ↔ wer darin wohnt und zahlt', meaning: 'landlord ↔ tenant — one letter apart, opposite sides', example: 'Der <b>Vermieter</b> hat die Heizung reparieren lassen.', hint: 'Hörfalle: die beiden Wörter klingen fast gleich' },
  { tag: 'v-wohnen', cue: 'die Hausordnung', answer: 'die Regeln im Haus: Ruhezeiten, Treppenhaus, Müll', meaning: 'house rules', example: 'Laut <b>Hausordnung</b> ist ab 22 Uhr Ruhe.' },
  { tag: 'v-wohnen', cue: 'die Ruhezeit', answer: 'die Stunden, in denen es leise sein muss', meaning: 'quiet hours', example: 'Sonntags ist den ganzen Tag <b>Ruhezeit</b>.' },
  { tag: 'v-wohnen', cue: 'der Lärm', answer: 'lauter, störender Krach', meaning: 'noise — the unwanted kind', example: 'Der <b>Lärm</b> von der Baustelle beginnt um sieben.' },
  { tag: 'v-wohnen', cue: 'sich beschweren über', answer: 'sagen, dass einen etwas stört — offiziell', meaning: 'to complain about (+ Akk.)', example: 'Die Nachbarn haben <b>sich über</b> den Lärm <b>beschwert</b>.' },
  { tag: 'v-wohnen', cue: 'der Umzug', answer: 'wenn man in eine andere Wohnung wechselt', meaning: 'a move (house) — also: a parade', example: 'Der <b>Umzug</b> ist am ersten Samstag im Monat.' },
  { tag: 'v-wohnen', cue: 'umziehen', answer: 'die Wohnung wechseln — auch: andere Kleidung anziehen', meaning: 'to move house · sich umziehen = to get changed', example: 'Wir <b>ziehen</b> im Oktober nach München <b>um</b>.' },
  { tag: 'v-wohnen', cue: 'der Hausmeister', answer: 'wer sich um das Haus kümmert und Kleinigkeiten repariert', meaning: 'caretaker, janitor', example: 'Melden Sie das bitte dem <b>Hausmeister</b>.' },
  { tag: 'v-wohnen', cue: 'das Treppenhaus', answer: 'der Bereich mit der Treppe, den alle im Haus benutzen', meaning: 'stairwell, common staircase', example: 'Im <b>Treppenhaus</b> darf nichts stehen.' },
  { tag: 'v-wohnen', cue: 'die Mülltrennung', answer: 'Papier, Glas, Bio und Restmüll in verschiedene Tonnen', meaning: 'separating waste for recycling', example: 'Bei der <b>Mülltrennung</b> sind die Deutschen streng.' },
  { tag: 'v-wohnen', cue: 'möbliert', answer: 'mit Möbeln — Bett und Schrank sind schon da', meaning: 'furnished', example: 'Wir suchen ein <b>möbliertes</b> Zimmer für drei Monate.' },
  { tag: 'v-wohnen', cue: 'die Wohngemeinschaft (WG)', answer: 'mehrere Leute teilen sich eine Wohnung', meaning: 'shared flat, flatshare', example: 'Ich wohne in einer <b>WG</b> mit zwei Studenten.' },
  { tag: 'v-wohnen', cue: 'die Nachbarschaft', answer: 'die Leute und Häuser rundherum', meaning: 'neighbourhood — the people as much as the place', example: 'In unserer <b>Nachbarschaft</b> hilft man sich.' },
  { tag: 'v-wohnen', cue: 'renovieren', answer: 'die Wohnung neu streichen und herrichten', meaning: 'to renovate, redecorate', example: 'Vor dem Auszug muss ich <b>renovieren</b>.' },
  { tag: 'v-wohnen', cue: 'die Besichtigung', answer: 'der Termin, an dem man sich die Wohnung ansieht', meaning: 'a viewing', example: 'Zur <b>Besichtigung</b> kamen dreißig Leute.' },
  { tag: 'v-wohnen', cue: 'der Stellplatz', answer: 'der Platz, wo ein Auto oder Wohnmobil stehen darf', meaning: 'parking space, pitch', example: 'Ein <b>Stellplatz</b> kostet 40 Euro im Monat.', hint: 'brauchst du auch für die Alpen-Woche' },
  { tag: 'v-wohnen', cue: 'die Nebenkostenabrechnung', answer: 'die Rechnung am Jahresende: hast du zu viel oder zu wenig gezahlt', meaning: 'the annual utilities statement', example: 'Die <b>Nebenkostenabrechnung</b> kam mit einer Nachzahlung.' },

  // ── Themenfeld „Gesundheit" · Mo 31.08. ───────────────────────────────
  { tag: 'v-gesund', cue: 'die Beschwerden', answer: 'was einem fehlt — Schmerzen, Husten, Schwindel', meaning: 'symptoms, complaints (always plural here)', example: 'Seit wann haben Sie diese <b>Beschwerden</b>?', hint: 'die erste Frage jedes Arztes' },
  { tag: 'v-gesund', cue: 'das Rezept', answer: 'der Zettel vom Arzt für die Apotheke — und: die Anleitung zum Kochen', meaning: 'prescription — and also: recipe', example: 'Für dieses Medikament brauchen Sie ein <b>Rezept</b>.', hint: 'klassische Hörfalle: Arzt oder Küche?' },
  { tag: 'v-gesund', cue: 'die Überweisung', answer: 'der Zettel zum Facharzt — und: Geld von Konto zu Konto', meaning: 'referral to a specialist — and also: bank transfer', example: 'Ich gebe Ihnen eine <b>Überweisung</b> zum Orthopäden.', hint: 'zwei ganz verschiedene Welten, ein Wort' },
  { tag: 'v-gesund', cue: 'die Krankenkasse', answer: 'die Versicherung, die die Behandlung bezahlt', meaning: 'health insurance fund', example: 'Das übernimmt die <b>Krankenkasse</b> nicht.' },
  { tag: 'v-gesund', cue: 'die Krankschreibung', answer: 'der Zettel, der sagt: du darfst zu Hause bleiben', meaning: 'sick note', example: 'Der Arzt hat mich für drei Tage <b>krankgeschrieben</b>.' },
  { tag: 'v-gesund', cue: 'die Praxis', answer: 'das Büro des Arztes — nicht das Krankenhaus', meaning: "doctor's surgery, practice", example: 'Die <b>Praxis</b> ist mittwochs nachmittags geschlossen.' },
  { tag: 'v-gesund', cue: 'die Sprechstunde', answer: 'die Zeit, in der der Arzt Patienten sieht', meaning: 'consultation hours', example: 'Die <b>Sprechstunde</b> geht bis 12 Uhr.' },
  { tag: 'v-gesund', cue: 'der Facharzt', answer: 'ein Arzt für ein Gebiet: Augen, Haut, Herz', meaning: 'specialist', example: 'Dafür müssen Sie zum <b>Facharzt</b>.' },
  { tag: 'v-gesund', cue: 'die Untersuchung', answer: 'wenn der Arzt nachsieht, was los ist', meaning: 'examination, check-up', example: 'Die <b>Untersuchung</b> dauert zehn Minuten.' },
  { tag: 'v-gesund', cue: 'die Behandlung', answer: 'alles, was der Arzt gegen die Krankheit tut', meaning: 'treatment', example: 'Die <b>Behandlung</b> dauert sechs Wochen.' },
  { tag: 'v-gesund', cue: 'die Nebenwirkung', answer: 'was ein Medikament <i>außerdem</i> macht — meistens nichts Gutes', meaning: 'side effect', example: 'Mögliche <b>Nebenwirkungen</b> stehen auf dem Beipackzettel.' },
  { tag: 'v-gesund', cue: 'die Vorsorgeuntersuchung', answer: 'der Check-up, wenn man <i>nicht</i> krank ist', meaning: 'preventive screening', example: 'Ab 35 zahlt die Kasse eine <b>Vorsorgeuntersuchung</b>.' },
  { tag: 'v-gesund', cue: 'sich impfen lassen', answer: 'eine Spritze bekommen, damit man nicht krank wird', meaning: 'to get vaccinated', example: 'Ich <b>lasse mich</b> jedes Jahr gegen Grippe <b>impfen</b>.', hint: 'lassen + Infinitiv — jemand anders tut es an dir' },
  { tag: 'v-gesund', cue: 'die Notaufnahme', answer: 'die Station im Krankenhaus für dringende Fälle', meaning: 'A&E, emergency room', example: 'Nachts müssen Sie in die <b>Notaufnahme</b>.' },
  { tag: 'v-gesund', cue: 'schwindelig', answer: 'alles dreht sich', meaning: 'dizzy — "mir ist schwindelig", never "ich bin"', example: 'Mir ist beim Aufstehen <b>schwindelig</b> geworden.' },
  { tag: 'v-gesund', cue: 'sich erholen', answer: 'wieder zu Kräften kommen', meaning: 'to recover, to recuperate', example: 'Nach der Grippe muss ich <b>mich</b> noch <b>erholen</b>.' },
  { tag: 'v-gesund', cue: 'sich ausruhen', answer: 'nichts tun, damit es besser wird', meaning: 'to rest', example: 'Sie sollten <b>sich</b> ein paar Tage <b>ausruhen</b>.' },
  { tag: 'v-gesund', cue: 'die Ernährung', answer: 'wie und was man isst', meaning: 'diet, nutrition — the way you eat, not a weight-loss diet', example: 'Eine gesunde <b>Ernährung</b> ist die halbe Miete.' },
  { tag: 'v-gesund', cue: 'zunehmen ↔ abnehmen', answer: 'schwerer werden ↔ leichter werden (auch: ans Telefon gehen)', meaning: 'to put on ↔ to lose weight — abnehmen also: to pick up the phone', example: 'Im Winter <b>nehme</b> ich immer zwei Kilo <b>zu</b>.' },
  { tag: 'v-gesund', cue: 'der Termin', answer: 'die feste Zeit für einen Besuch', meaning: 'appointment — the single most useful noun in German bureaucracy', example: 'Ich hätte gern einen <b>Termin</b> für nächste Woche.' },

  // ── Themenfeld „Reisen, Verkehr & Behörden" · Mo 07.09. ───────────────
  { tag: 'v-reise', cue: 'die Verspätung', answer: 'wenn der Zug später kommt als geplant', meaning: 'delay', example: 'Der ICE hat 20 Minuten <b>Verspätung</b>.' },
  { tag: 'v-reise', cue: 'der Anschluss', answer: 'der nächste Zug, in den man umsteigen will', meaning: 'connection (onward train)', example: 'Ihr <b>Anschluss</b> in Ulm wird nicht erreicht.', hint: 'Durchsagen-Klassiker' },
  { tag: 'v-reise', cue: 'umsteigen', answer: 'aus einem Zug aussteigen und in einen anderen einsteigen', meaning: 'to change trains', example: 'In Stuttgart müssen Sie <b>umsteigen</b>.' },
  { tag: 'v-reise', cue: 'das Gleis', answer: 'die Nummer, an der der Zug steht', meaning: 'track, platform number', example: 'Der Zug fährt heute von <b>Gleis</b> 8 ab.' },
  { tag: 'v-reise', cue: 'die Durchsage', answer: 'die Ansage aus dem Lautsprecher', meaning: 'public announcement', example: 'Bitte achten Sie auf die <b>Durchsagen</b>.' },
  { tag: 'v-reise', cue: 'entwerten', answer: 'den Fahrschein am Automaten stempeln, bevor man einsteigt', meaning: 'to validate/stamp a ticket', example: 'Ein nicht <b>entwerteter</b> Fahrschein gilt nicht.' },
  { tag: 'v-reise', cue: 'die Ermäßigung', answer: 'weniger Preis für Studenten, Kinder, Senioren', meaning: 'reduction, concession', example: 'Mit dem Ausweis bekommen Sie eine <b>Ermäßigung</b>.' },
  { tag: 'v-reise', cue: 'die Umleitung', answer: 'ein anderer Weg, weil die Straße gesperrt ist', meaning: 'diversion, detour', example: 'Wegen der Baustelle gibt es eine <b>Umleitung</b>.' },
  { tag: 'v-reise', cue: 'die Baustelle', answer: 'die Stelle, an der gebaut wird', meaning: 'building site, roadworks', example: 'Vor der <b>Baustelle</b> steht der Verkehr.' },
  { tag: 'v-reise', cue: 'der Stau', answer: 'viele Autos, die nicht weiterfahren', meaning: 'traffic jam', example: 'Auf der A8 sind fünf Kilometer <b>Stau</b>.' },
  { tag: 'v-reise', cue: 'die Unterkunft', answer: 'wo man übernachtet — Hotel, Pension, Ferienwohnung', meaning: 'accommodation', example: 'Habt ihr die <b>Unterkunft</b> schon gebucht?' },
  { tag: 'v-reise', cue: 'die Behörde', answer: 'ein Amt des Staates', meaning: 'public authority, government office', example: 'Dafür ist eine andere <b>Behörde</b> zuständig.' },
  { tag: 'v-reise', cue: 'zuständig sein für', answer: 'für etwas verantwortlich sein', meaning: 'to be responsible for, to be in charge of', example: 'Wer ist hier <b>für</b> Anmeldungen <b>zuständig</b>?' },
  { tag: 'v-reise', cue: 'die Anmeldung', answer: 'wenn man sich offiziell eintragen lässt — auch: der Empfang', meaning: 'registration · also: the reception desk', example: 'Nach dem Umzug haben Sie zwei Wochen für die <b>Anmeldung</b>.' },
  { tag: 'v-reise', cue: 'einen Antrag stellen', answer: 'offiziell um etwas bitten, mit Formular', meaning: 'to submit an application', example: 'Sie müssen einen <b>Antrag</b> auf Kindergeld <b>stellen</b>.', hint: 'Antrag <i>stellen</i>, nicht „machen"' },
  { tag: 'v-reise', cue: 'beantragen', answer: 'einen Antrag für etwas stellen', meaning: 'to apply for (officially)', example: 'Ich möchte einen neuen Pass <b>beantragen</b>.' },
  { tag: 'v-reise', cue: 'die Bescheinigung', answer: 'ein Papier, das etwas offiziell bestätigt', meaning: 'certificate, written confirmation', example: 'Bitte bringen Sie eine <b>Bescheinigung</b> vom Arbeitgeber mit.' },
  { tag: 'v-reise', cue: 'die Gebühr', answer: 'das Geld, das ein Amt für seine Arbeit nimmt', meaning: 'fee, charge', example: 'Die <b>Gebühr</b> beträgt 37 Euro.' },
  { tag: 'v-reise', cue: 'das Formular ausfüllen', answer: 'die leeren Felder auf dem Papier beschriften', meaning: 'to fill in a form', example: 'Bitte <b>füllen</b> Sie das <b>Formular</b> vollständig <b>aus</b>.' },
  { tag: 'v-reise', cue: 'die Öffnungszeiten', answer: 'wann geöffnet ist', meaning: 'opening hours', example: 'Die <b>Öffnungszeiten</b> stehen auf der Internetseite.' },

  // ── Ledger 9 · Sprachbausteine-Lücken ────────────────────────────────
  { tag: 'koll', cue: 'Wir ___ uns ein Zimmer.', answer: 'teilen — sich (Dat.) etwas teilen', meaning: 'to share something between you', example: 'Wir <b>teilen uns</b> ein Zimmer.', hint: 'SB 32' },
  { tag: 'koll', cue: 'Bitte antworten Sie so bald wie ___.', answer: 'möglich — so bald wie möglich', meaning: 'as soon as possible — a fixed phrase, learn it whole', example: 'Melden Sie sich bitte <b>so bald wie möglich</b>.', hint: 'SB 37' },
  { tag: 'koll', cue: 'Ich erkundige mich ___ dem Preis.', answer: 'nach — sich erkundigen nach + Dativ', meaning: 'to enquire about something', example: 'Ich <b>erkundige mich nach</b> den Öffnungszeiten.', hint: 'SB 38' },
  { tag: 'koll', cue: 'jdm. etwas ___ (= informieren)', answer: 'mitteilen — jdm. etwas mitteilen', meaning: 'to inform someone of something (separable: teile … mit)', example: 'Bitte <b>teilen</b> Sie uns Ihre neue Adresse <b>mit</b>.' },
  { tag: 'koll', cue: 'Ich bin ___ unter 0170 …', answer: 'erreichbar — erreichbar unter + Nummer', meaning: 'reachable / available on (a number)', example: 'Ich bin <b>erreichbar unter</b> 0170 123456.' },

  // ── Ledger 10–19 · meist aus dem Schriftlichen Ausdruck ───────────────
  { tag: 'gramm', cue: '„ich freue mich auf ihnen besuchen"', answer: 'ich freue mich <b>darauf, dich zu besuchen</b>', meaning: 'A verb with a fixed preposition takes da(r)+prep before a zu-clause: "I am looking forward to visiting you."', example: 'sich freuen <b>auf</b> → da<b>r</b>auf + Komma + zu-Infinitiv', hint: 'Ledger 14 — dein häufigster Briefsatz' },
  { tag: 'gramm', cue: '„… und ihn kennenlernen zu"', answer: '… und ihn <b>kennenzulernen</b>', meaning: 'With a separable verb the zu goes inside the word, not in front of it.', example: 'Bei trennbaren Verben steht <b>zu</b> in der Mitte: an<b>zu</b>rufen, ein<b>zu</b>laden.', hint: 'Ledger 16' },
  { tag: 'gramm', cue: 'Versprechen: „Ich rufe Sie zurück."', answer: 'Futur I: Ich <b>werde</b> Sie zurück<b>rufen</b>.', meaning: 'A promise takes werden + infinitive at the end — telc tests this directly.', example: 'werden + Infinitiv am Satzende.', hint: 'Ledger 12 · SB 40' },
  { tag: 'gramm', cue: '„mit denen Kollegen"', answer: '<b>mit den</b> Kollegen', meaning: 'denen replaces a noun; it can never stand in front of one. Use the article den.', example: '<b>denen</b> kann nie vor einem Nomen stehen — es ersetzt das Nomen.', hint: 'Ledger 11 · SB 28' },
  { tag: 'gramm', cue: '„Er hatte sich beworben und hat gemietet."', answer: 'Er <b>hatte</b> sich beworben und … <b>gemietet</b>.', meaning: 'Two participles share one auxiliary — the second hatte/hat is dropped.', example: 'Ein Hilfsverb trägt beide Partizipien.', hint: 'Ledger 10 · SB 24' },
  { tag: 'gramm', cue: 'damit oder dann?', answer: '<b>damit</b> = Zweck · <b>dann</b> = Zeit', meaning: 'damit = so that (purpose) · dann = then (time)', example: 'Ich schreibe früh, <b>damit</b> du antworten kannst. — Erst esse ich, <b>dann</b> lerne ich.', hint: 'Ledger 17' },
  { tag: 'gramm', cue: '„mit Einander"', answer: '<b>miteinander</b> — ein Wort', meaning: 'one word: with each other', example: 'Wir haben lange <b>miteinander</b> gesprochen.' },
  { tag: 'gramm', cue: '„Ich hoffe dich bald zu sehen"', answer: 'Ich hoffe<b>,</b> dich bald zu sehen.', meaning: 'Comma before an extended zu-infinitive — a free point.', example: 'Komma vor dem erweiterten zu-Infinitiv.', hint: 'Ledger 18 — billiger Punkt' },
  { tag: 'gramm', cue: 'Satzanfang: „ich danke Ihnen."', answer: '<b>Ich</b> danke Ihnen.', meaning: 'Capital at the start of every sentence; the polite Ihnen stays capitalised anywhere.', example: '<b>Ihnen</b> bleibt groß — Höflichkeitsform.', hint: 'Ledger 18 — 3× im letzten Brief falsch' },
  { tag: 'gramm', cue: 'Imperativ von „sich beeilen" (du)', answer: '<b>Beeil dich!</b>', meaning: '"Hurry up!" — the du-imperative keeps the du-reflexive dich, never sich.', example: 'Der Imperativ nimmt die <b>du</b>-Zeile: dich, nicht sich.', hint: 'Ledger 19' },
  { tag: 'gramm', cue: '„Ich erinnere ___ an den Termin."', answer: 'mich — <b>Akkusativ</b>', meaning: 'sich erinnern an = to remember; the reflexive is accusative, because an + Akk. is not a direct object.', example: 'Eine Präpositionalphrase ist kein direktes Objekt → kein Dativ-Reflexiv.', hint: 'Ledger 19' },

  // ── Ledger 1–5 · Hörverstehen-Fallentypen ────────────────────────────
  { tag: 'falle', cue: 'Das Wort aus der Aussage kommt im Hörtext vor.', answer: 'Beweist <b>nichts</b>. Wortgleichheit ist die häufigste Falle.', meaning: 'A shared word proves nothing — word-match is the trap you fall for most.', example: 'ÜT4/44: „bezahlen" fällt — aber sie beklagt Ausbeutung und fordert nie mehr Geld.', hint: 'Ledger 2' },
  { tag: 'falle', cue: 'Die Aussage enthält immer / ganz / nur / alle / nie', answer: 'Alarm. Meist <b>falsch</b>, sobald der Text einschränkt.', meaning: 'Absolutes (always/only/all/never) are usually false as soon as the text qualifies anything.', example: 'ÜT4/48: Telefon ist <b>zu festen Zeiten</b> besetzt, sonst AB → nicht „immer".', hint: 'Ledger 3 — zwei Fehler in einem Test' },
  { tag: 'falle', cue: 'Im Hörtext fällt ein klares „Nein, nicht …"', answer: 'Explizite Verneinung kippt die Aussage — sofort mitschreiben.', meaning: 'An explicit negation flips the statement. Write it down the moment you hear it.', example: 'ÜT4/49: „Nein, nicht die Adresse" → die Liste enthält keine Adressen.', hint: 'Ledger 4' },
  { tag: 'falle', cue: '„Alles richtet sich nach der Arbeit."', answer: '= „Das Leben besteht nur noch aus Arbeit." <b>Richtig.</b>', meaning: 'Paraphrase works at the level of meaning — no shared word is needed for a statement to be true.', example: 'Paraphrase auf Bedeutungsebene.', hint: 'Ledger 1 · ÜT4/43' },
  { tag: 'falle', cue: '„Das können Sie bei uns in der Redaktion erfragen."', answer: 'Das Interview läuft also im <b>Rundfunk</b>.', meaning: 'Infer the situation from the setting, instead of hunting for the word itself.', example: 'Ort und Situation erschließen, nicht nach dem Wort suchen.', hint: 'Ledger 5 · ÜT4/47' },
  { tag: 'falle', cue: 'Österreich + Belgien — Aussage sagt „ganz Europa"', answer: '<b>Falsch.</b> Zwei Länder sind nicht ein Kontinent.', meaning: 'Over-generalisation: the statement claims more than the text says.', example: 'Die Aussage macht mehr aus dem Text, als dort steht.', hint: 'Ledger 3 · ÜT4/55' },
  { tag: 'falle', cue: 'Du weißt die Antwort nicht. Was tun?', answer: '<b>Immer ankreuzen.</b> Nie ein Feld leer lassen.', meaning: 'Always tick something. telc deducts nothing for a wrong answer: a guess is 50 %, a blank is 0 %.', example: 'telc zieht für falsche Antworten nichts ab.', hint: 'Ledger 13 — im Übungstest zweimal leer gelassen' },

  // ── Ledger 18 · Schreiben-Mechanik ───────────────────────────────────
  { tag: 'brief', cue: 'Die vier Dinge, die jeder Brief braucht', answer: '<b>Betreff</b> · Anrede + Gruß · alle 4 Leitpunkte · Schluss mit einer <b>Frage</b>', meaning: 'Subject line · greeting and sign-off · all four bullet points · close with a question.', example: 'Im letzten Test fehlte der Betreff — das kostet in Kriterium II direkt eine Note.', hint: 'Ledger 18' },
  { tag: 'brief', cue: '„Sehr geehrte Damen und Herren," → Gruß?', answer: '<b>Mit freundlichen Grüßen</b>', meaning: 'Formal opening takes the formal close. Never "Liebe Grüße" after "Sehr geehrte".', example: 'Formell ↔ formell.' },
  { tag: 'brief', cue: '„Liebe Frau Meier," → Gruß?', answer: '<b>Viele Grüße</b> / Herzliche Grüße', meaning: 'Semi-formal — exactly the register telc B1 asks for almost every time.', example: 'Halbformell — genau der Ton, den telc B1 fast immer verlangt.' },
]
