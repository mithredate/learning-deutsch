/**
 * telc B1 Mündliche Prüfung — the three Teile, as a paired exam.
 *
 * The learner has never practised speaking and does it in the course rather
 * than in study blocks. So this is built to be read on a phone *during* class
 * and handed to a partner: each Teil carries the task as the exam words it,
 * a Redemittel bank (their bottleneck is production, not comprehension), and
 * the specific grammar traps from reference/wortschatz-gaps.md.
 */

export interface Block {
  label: string
  lines: string[]
}

export interface Teil {
  n: number
  title: string
  minutes: string
  task: string
  /** What the examiner is actually scoring in this part. */
  looksFor: string[]
  /** Partner cards, where the exam hands each candidate different material. */
  cards?: { label: string; text: string }[]
  steps?: string[]
  blocks: Block[]
  /** This learner's own recurring errors, from the ledger. */
  traps: string[]
}

export const TEILE: Teil[] = [
  {
    n: 1,
    title: 'Kontaktaufnahme',
    minutes: '~3 Min',
    task: 'Sie und Ihr Partner lernen sich kennen. Stellen Sie sich vor und stellen Sie einander Fragen.',
    looksFor: [
      'Du musst FRAGEN stellen, nicht nur antworten — das ist die halbe Note.',
      'Vollständige Sätze, keine Stichwörter.',
      'Reagieren auf das, was der andere sagt.',
    ],
    blocks: [
      {
        label: 'Fragen, die du stellen solltest',
        lines: [
          'Wie ist Ihr Name? / Wie heißen Sie?',
          'Woher kommen Sie ursprünglich?',
          'Wie lange wohnen Sie schon hier?',
          'Was machen Sie beruflich?',
          'Haben Sie Familie?',
          'Welche Sprachen sprechen Sie?',
          'Was machen Sie in Ihrer Freizeit?',
          'Warum lernen Sie Deutsch?',
        ],
      },
      {
        label: 'Antwort-Bausteine',
        lines: [
          'Ich heiße … und komme ursprünglich aus dem Iran.',
          'Ich wohne seit … Jahren in …',
          'Ich arbeite als Softwareentwickler. / Ich bin … von Beruf.',
          'Ich bin verheiratet und lebe mit meiner Frau in …',
          'Ich spreche Persisch, Englisch und ein bisschen Deutsch.',
          'In meiner Freizeit lese ich gern und gehe ins Fitnessstudio.',
          'Ich lerne Deutsch, weil ich hier arbeite und im September die B1-Prüfung mache.',
        ],
      },
      {
        label: 'Zurückfragen — hier holst du die Punkte',
        lines: [
          'Und Sie? Wie ist das bei Ihnen?',
          'Darf ich Sie auch etwas fragen?',
          'Das ist interessant. Wie lange machen Sie das schon?',
          'Ach wirklich? Und gefällt Ihnen das?',
        ],
      },
    ],
    traps: [
      '„weil" schickt das Verb ans Ende: <b>weil ich hier arbeite</b> — nicht „weil ich arbeite hier".',
      'seit + Dativ und Präsens: <b>Ich wohne seit drei Jahren hier</b> — nicht „ich wohnte".',
    ],
  },
  {
    n: 2,
    title: 'Gespräch über ein Thema',
    minutes: '~6 Min',
    task: 'Jeder bekommt eine Karte zum gleichen Thema. Beschreiben Sie, was auf Ihrer Karte steht, sagen Sie Ihre Meinung — und sprechen Sie dann gemeinsam darüber.',
    cards: [
      {
        label: 'Karte A',
        text: 'Immer mehr Menschen arbeiten von zu Hause. Sie sparen den Weg ins Büro und können sich ihre Zeit frei einteilen. Manche Firmen haben feste Bürozeiten sogar ganz abgeschafft.',
      },
      {
        label: 'Karte B',
        text: 'Im Büro trifft man seine Kollegen jeden Tag. Man hat einen festen Ansprechpartner, kann Fragen sofort klären und trennt Arbeit und Privatleben besser voneinander.',
      },
    ],
    steps: [
      'Sag, worum es auf deiner Karte geht.',
      'Sag deine eigene Meinung — mit Begründung.',
      'Erzähl von deiner eigenen Erfahrung.',
      'Frag deinen Partner nach seiner Meinung.',
    ],
    looksFor: [
      'Meinung MIT Begründung — „Ich finde das gut" allein zählt kaum.',
      'Auf den Partner eingehen, nicht zwei Monologe halten.',
      'Vorteile und Nachteile gegenüberstellen.',
    ],
    blocks: [
      {
        label: 'Das Gerüst — diese Reihenfolge, jedes Mal',
        lines: [
          '① Auf dem Bild sehe ich <b>einen</b> Mann / <b>eine</b> Frau. Er/Sie heißt …',
          '① Er/Sie ist … Jahre alt und arbeitet als … Er/Sie trägt …',
          '① Das Foto wurde wahrscheinlich in/im … aufgenommen. Er/Sie sieht … aus.',
          '② <b>Es geht um das Thema</b> „…" — <i>nicht</i> „Das Bild berichtet uns vom Thema".',
          '② Ich habe einen kurzen Text gelesen, der <b>die Meinung von</b> … enthält.',
          '② Darin <b>sagt er/sie, dass</b> … <i>(Verb ans Ende!)</i>. Außerdem erwähnt er/sie, dass …',
          '③ Ich sehe das ähnlich / anders, denn … · Meiner Meinung nach …',
          '③ <b>Aus eigener Erfahrung kann ich sagen:</b> … <i>(ein konkretes Beispiel)</i>',
          '④ Was denkst du darüber? Ich würde gerne deine Meinung hören.',
        ],
      },
      {
        label: 'Die Karte beschreiben',
        lines: [
          'Auf meiner Karte geht es um …',
          'Hier steht, dass …',
          'In meinem Text wird gesagt, dass …',
        ],
      },
      {
        label: 'Nicht sagen — verbrauchte Hüllen',
        lines: [
          '✗ „Ich denke, das ist eine persönliche Angelegenheit" — im Kursmaterial 10×.',
          '✗ „Natürlich ist dieses Thema von Person zu Person unterschiedlich" — 8×.',
          '✗ „Das Bild berichtet uns vom Thema …" — falsch <i>und</i> 50×.',
          '✓ Ich finde das nachvollziehbar, aber …',
          '✓ Da bin ich ganz anderer Meinung, weil …',
          '✓ Das kommt für mich darauf an, ob …',
          '✓ Bei diesem Thema gibt es zwei Seiten: einerseits … andererseits …',
        ],
      },
      {
        label: 'Meinung sagen',
        lines: [
          'Meiner Meinung nach …',
          'Ich finde das richtig, weil …',
          'Ich halte das für problematisch, weil …',
          'Ein Vorteil ist … Ein Nachteil ist allerdings …',
          'Einerseits … , andererseits …',
        ],
      },
      {
        label: 'Eigene Erfahrung',
        lines: [
          'Bei mir ist es so, dass …',
          'Ich habe die Erfahrung gemacht, dass …',
          'In meiner Firma ist der Ablauf so: …',
        ],
      },
      {
        label: 'Auf den Partner reagieren',
        lines: [
          'Was denken Sie darüber?',
          'Da bin ich ganz Ihrer Meinung.',
          'Das sehe ich anders, weil …',
          'Sie haben recht, aber man muss auch sehen, dass …',
        ],
      },
    ],
    traps: [
      '„dass" schickt das Verb ans Ende: <b>… dass er im Büro besser arbeitet</b>.',
      'Trennbare Verben: <b>Ich teile mir die Zeit frei ein</b> — die Vorsilbe ans Satzende.',
      'Nicht „Ich bin agree" — sag <b>Ich stimme Ihnen zu</b> oder <b>Da bin ich Ihrer Meinung</b>.',
      '<b>sehen + Akkusativ</b>: ich sehe <b>einen</b> Mann — „ein Mann" ist der häufigste Fehler im Kursmaterial.',
      'Nach einem Vorfeld kommt das Verb an Position 2: <b>In diesem Text hat er</b> gesagt … — nicht „er hat".',
      'Besitz mit <b>von</b> + Dativ: die Meinung <b>von</b> Anton Majer — nicht „die Meinungen Anton Majer".',
      'Zahlen: vierund<b>dreißig</b> · <b>ein</b>undzwanzig · <b>sieb</b>zehn. Geschenkte Punkte, wenn sie sitzen.',
    ],
  },
  {
    n: 3,
    title: 'Gemeinsam eine Aufgabe lösen',
    minutes: '~6 Min',
    task: 'Ihr Deutschkurs macht am Samstag einen Ausflug in die Berge. Planen Sie den Ausflug gemeinsam. Sie müssen sich am Ende einigen.',
    steps: [
      'Wann fahren wir los, und wie lange bleiben wir?',
      'Wie kommen wir hin — Zug, Bus oder Fahrgemeinschaft?',
      'Was nehmen wir mit?',
      'Wer organisiert was?',
      'Was kostet es? Machen wir einen Unkostenbeitrag?',
    ],
    looksFor: [
      'VORSCHLAGEN, nicht nur zustimmen. Wer nur „ja, gut" sagt, verliert Punkte.',
      'Mindestens einmal höflich widersprechen und eine Alternative anbieten.',
      'Am Ende laut zusammenfassen, worauf ihr euch geeinigt habt.',
    ],
    blocks: [
      {
        label: 'Vorschlagen',
        lines: [
          'Wollen wir um acht Uhr losfahren?',
          'Wie wäre es, wenn wir mit dem Zug fahren?',
          'Ich schlage vor, dass wir uns am Bahnhof treffen.',
          'Was hältst du davon, wenn wir …?',
        ],
      },
      {
        label: 'Zustimmen',
        lines: [
          'Das ist eine gute Idee.',
          'Einverstanden, das machen wir so.',
          'Ja, das finde ich sinnvoll.',
        ],
      },
      {
        label: 'Widersprechen — höflich',
        lines: [
          'Das finde ich schwierig, weil …',
          'Meinst du nicht, dass das zu früh ist?',
          'Da bin ich mir nicht sicher. Vielleicht können wir stattdessen …',
        ],
      },
      {
        label: 'Einigen und abschließen',
        lines: [
          'Dann machen wir es so: …',
          'Einigen wir uns auf zehn Uhr?',
          'Also, wir haben jetzt Folgendes geplant: … Ist das okay für dich?',
          'Ich werde die Getränke mitbringen, und du kümmerst dich um die Tickets.',
        ],
      },
    ],
    traps: [
      'Zusage im Futur I: <b>Ich werde die Tickets kaufen.</b> (werden + Infinitiv ans Ende)',
      'Reflexiv: <b>Wir treffen uns</b> am Bahnhof · <b>Ich kümmere mich um</b> das Essen.',
      'Trennbar: <b>Ich bringe die Getränke mit</b> — nicht „Ich bringe mit die Getränke".',
      '<b>Ich freue mich darauf, in die Berge zu fahren</b> — darauf + Komma + zu-Infinitiv.',
    ],
  },
]

export const SURVIVAL: Block = {
  label: 'Wenn du stecken bleibst',
  lines: [
    'Entschuldigung, wie sagt man … auf Deutsch?',
    'Können Sie das bitte wiederholen?',
    'Moment, ich überlege kurz.',
    'Ich meine Folgendes: …',
    'Wie meinen Sie das genau?',
    'Ich weiß das Wort gerade nicht — ich meine so etwas wie …',
  ],
}
