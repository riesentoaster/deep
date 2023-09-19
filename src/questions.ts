/* eslint-disable max-len */

import { unique } from './helpers'

type HandPutTag = 'christians' | 'twoPeople' | 'philosophy' | 'love'
export type Tag = HandPutTag | 'hasAuthor'
export interface Question {
  question: string
  index: number
  deepness: number
  date: string
  tags?: Tag[]
  author?: string
}

interface QuestionByDate {
  translations: {
    en: string
    de: string
  }
  deepness: number
  tags?: HandPutTag[]
  author?: string
  date?: string
}

interface QuestionsByDate {
  [date: string]: QuestionByDate[]
}

const questionsByDate: QuestionsByDate = {
  '2022-08-31': [
    {
      'deepness': 5,
      'translations': {
        'en': 'What decision of yours do you regret the most?',
        'de': 'Welche deiner Entscheidungen bereust du am meisten?'
      }
    },
    {
      'deepness': 2,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'What is your story with Jesus?',
        'de': 'Was ist deine Story mit Jesus?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What behaviour of others annoys you?',
        'de': 'Welches Verhalten von anderen nervt dich?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What would you like to know about the future?',
        'de': 'Was würdest du wissen wollen über die Zukunft?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'What have you no idea about?',
        'de': 'Worin hast du keine Ahnung?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'What do you usually do to de-stress?',
        'de': 'Was machst du normalerweise, um Stress abzubauen?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What are the most important entries in your calendar?',
        'de': 'Was sind die wichtigsten Termine in deiner Agenda?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What makes you interesting?',
        'de': 'Was macht dich interessant?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What bothers you at the moment?',
        'de': 'Was beschäftigt dich gerade?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'What are you thinking about regarding your faith?',
        'de': 'Was beschäftigt dich in deinem Glaubensleben?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What are you currently responsible for?',
        'de': 'Wofür trägst du momentan Verantwortung?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'What is something you like talking about?',
        'de': 'Wovon erzählst du gerne?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What would you change about your looks?',
        'de': 'Was würdest du an deinem Aussehen ändern?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'Who are you in 10 years?',
        'de': 'Wer bist du in 10 Jahren?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What are you grateful for?',
        'de': 'Wofür bist du dankbar?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What is the coolest thing you\'ve done in your life so far?',
        'de': 'Was ist das Coolste, was du in deinem Leben schon gemacht hast?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What story is particularly important to you?',
        'de': 'Was ist eine Geschichte, die dir besonders wichtig ist?'
      }
    },
    {
      'deepness': 5,
      'translations': {
        'en': 'When did you fail the hardest in your life? What was your biggest triumph?',
        'de': 'Wo bist du im Leben am schlimmsten gescheitert? Was war dein grösster Triumph?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'In which direction would you like to change the world?',
        'de': 'In welche Richtung möchtest du diese Welt verändern?'
      }
    },
    {
      'deepness': 2,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'What bible story is particularly important to you?',
        'de': 'Was ist eine Bibelgeschichte, die dir besonders wichtig ist?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What is a property/habit of yours that annoys other people?',
        'de': 'Was ist eine deiner Eigenschaften/Gewohnheiten, die andere nervt?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'In life, are you where you wanted to be at this point?',
        'de': 'Bist du da im Leben, wo du zum jetzigen Zeitpunkt sein wolltest?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'If you would be able to change your first name, how would you like to be called?',
        'de': 'Wenn du einen neuen Vornamen haben könntest, welchen würdest du wählen?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'How do you reach a decision?',
        'de': 'Wie triffst du Entscheidungen?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What is likeable/admirable about you?',
        'de': 'Was ist liebenswert an dir?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'Which trait of Jesus do you appreciate most?',
        'de': 'Welche Eigenschaft von Jesus schätzt du am meisten?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'What must I never forget?',
        'de': 'Was sollte ich nie vergessen?'
      }
    },
    {
      'deepness': 5,
      'translations': {
        'en': 'What have you wanted to try to change about your life, but haven\'t managed?',
        'de': 'Was willst du schon lange an dir ändern, schaffst es aber nicht?'
      }
    },
    {
      'deepness': 5,
      'translations': {
        'en': 'What blind spots of me should I change?',
        'de': 'Was sind meine blinden Flecken, was sollte ich deiner Meinung nach an mir ändern?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'What is my best quality that I don\'t see?',
        'de': 'Was ist meine beste Qualität, die ich selber nicht sehe?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What is your best (secret) advice for working relationships?',
        'de': 'Was ist dein bester Rat (oder Geheimtipp) für eine funktionierende Beziehung?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'On a scale from 1 through 10, how would you rate your life? What could you do to improve it?',
        'de': 'Auf einer Skala von 1–10, wie bewertest du dein Leben? Was könntest du tun, um es zu verbessern?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What opinion of yours is unpopular with your friends?',
        'de': 'Welche Meinung von dir ist in deinem Freundeskreis unpopulär?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What 3 traits would a person that is an exact opposite of you have?',
        'de': 'Welche 3 Eigenschaften weist eine Person auf, die das exakte Gegenteil von dir ist?'
      }
    },
    {
      'deepness': 5,
      'translations': {
        'en': 'What breaks your heart?',
        'de': 'Was bricht dein Herz?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What is the best advice you have received?',
        'de': 'Was ist der beste Ratschlag, den du in deinem Leben erhalten hast?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'Of what friend are you particularly proud? Why?',
        'de': 'Auf welchen deiner Freunde bist du am meisten stolz? Warum?'
      }
    },
    {
      'deepness': 1,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'Show me your best imitation of me!',
        'de': 'Zeig mir die beste Nachahmung von mir!'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What do you like about our culture?',
        'de': 'Was findest du toll an unserer Kultur?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'When was the last time you felt misunderstood?',
        'de': 'Wann fühltest du dich zuletzt falsch verstanden?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What can other people learn from you?',
        'de': 'Was können andere von dir lernen?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'What part of getting older worries you? What are you looking forward to?',
        'de': 'Welcher Aspekt des Älterwerdens bereitet dir Sorgen? Auf was freust du dich?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'What TV series are you currently watching?',
        'de': 'Welche Serien schaust du gerade?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'What do you think is the most beautiful part of your body?',
        'de': 'Was findest du das Schönste an deinem Körper?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'What bothers you most about what christians believe and how they live?',
        'de': 'Was stört dich am meisten an dem, was Christen glauben und leben?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'How are you maintaining your relationship to God?',
        'de': 'Wie pflegst du deine Freundschaft mit Gott?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'Tell me/us something about you that only few people know!',
        'de': 'Erzähle etwas Spannendes über dich, das nur wenige wissen.'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What is something you learned during the past week?',
        'de': 'Was ist etwas, was du in der letzten Woche gelernt hast?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'What advice would you give to a recently converted christian?',
        'de': 'Was sind gute Tipps, die du frisch bekehrten Christen geben würdest?'
      }
    },
    {
      'deepness': 5,
      'translations': {
        'en': 'What are you ashamed of?',
        'de': 'Wofür schämst du dich?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'What is your favourite story from a movie or book?',
        'de': 'Welches ist deine Lieblings-Geschichte (Film/Buch)?'
      }
    },
    {
      'deepness': 1,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'What is something that pastors should preach about more often?',
        'de': 'Worüber sollte in der Kirche/im Boxenstopp mehr gepredigt werden?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'What are your goals in your faith?',
        'de': 'Was sind deine Ziele im Glauben?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What is most important to you in our relationship?',
        'de': 'Was ist dir in unserer Freundschaft am wichtigsten?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'Is there an ability you\'d like to master?',
        'de': 'Gibt es eine Fähigkeit, welche du wirklich beherrschen möchtest?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'What are your trademarks?',
        'de': 'Was sind deine Markenzeichen?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'From what mistakes of yours can people learn?',
        'de': 'Von welchen Fehlern, die du gemacht hast, können andere lernen?'
      }
    },
    {
      'deepness': 5,
      'translations': {
        'en': 'What is something that life is currently teaching you?',
        'de': 'Was lehrt dich das Leben gerade?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What is most important to you in a relationship?',
        'de': 'Was ist dir in einer Freundschaft am wichtigsten?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'What do you know especially much about?',
        'de': 'Worin kennst du dich besonders gut aus?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What persons do you admire? What for?',
        'de': 'Welche Menschen bewunderst du? Wofür?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'Is there something about Jesus and his doctrine that annoys you?',
        'de': 'Gibt es etwas über Jesus und seine Lehre, das dich verärgert?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'What wrong belief did you hold in the past?',
        'de': 'Was hast du in Vergangenheit falsch geglaubt?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What are your biggest goals in life?',
        'de': 'Was sind deine grössten Lebensziele?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'translations': {
        'en': 'What treats show mature christians?',
        'de': 'Was sind Merkmale eines reifen Christen?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'How does somebody become a friend of yours?',
        'de': 'Wie wird man ein Freund von dir? (Freundschaft)'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'What is something that I have to experience?',
        'de': 'Was ist etwas, das ich unbedingt erleben soll?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What is a common prejudice people have about you?',
        'de': 'Was ist ein häufiges Vorurteil, welches Leute von dir haben?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'Who is your best friend? Why?',
        'de': 'Wer ist dein bester Freund / deine beste Freundin? Warum?'
      }
    },
    {
      'deepness': 5,
      'translations': {
        'en': 'What was the most difficult decision of your life?',
        'de': 'Was war die schwierigste Entscheidung deines Lebens?'
      }
    },
    {
      'deepness': 1,
      'translations': {
        'en': 'What is something you like doing in particular?',
        'de': 'Was machst du besonders gerne?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What accomplishment of yours are you most proud of?',
        'de': 'Auf welche deiner Leistungen / Errungenschaften bist du am meisten Stolz?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What would you change about your personality?',
        'de': 'Was würdest du an deiner Persönlichkeit ändern?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'How are you inspiring other people?',
        'de': 'Wie inspirierst du andere?'
      }
    },
    {
      'deepness': 5,
      'translations': {
        'en': 'Tell me an embarrassing story from your life!',
        'de': 'Erzähle von einem peinlichen Erlebnis in deinem Leben.'
      }
    }
  ],
  '2022-09-03': [
    {
      'deepness': 5,
      'translations': {
        'en': 'What is a decision you are struggling with? What is keeping you from making it?',
        'de': 'Was für eine Entscheidung fällt dir schwer zu treffen? Was hält dich davon ab?'
      }
    }
  ],
  '2022-09-09': [
    {
      'deepness': 1,
      'translations': {
        'en': 'What is the last song you listened to?',
        'de': 'Welchen Song hast du zuletzt angehört?'
      }
    }
  ],
  '2022-09-11': [
    {
      'deepness': 3,
      'translations': {
        'en': 'When do you feel at home?',
        'de': 'Wann fühlst du dich zuhause?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'When did you last cry? Why?',
        'de': 'Wann hast du das letzte mal geweint? Warum?'
      }
    }
  ],
  '2022-09-19': [
    {
      'deepness': 5,
      'translations': {
        'en': 'Where are you deceiving yourself?',
        'de': 'Wann lügst du dich selbst an?'
      }
    }
  ],
  '2022-10-12': [
    {
      'deepness': 3,
      'translations': {
        'en': 'What is out of balance in your life right now?',
        'de': 'Wo ist dein Leben zur Zeit nicht im Gleichgewicht?'
      }
    }
  ],
  '2022-10-21': [
    {
      'deepness': 3,
      'author': 'Alex No',
      'translations': {
        'en': 'What is love?',
        'de': 'Was ist Liebe?'
      }
    }
  ],
  '2022-10-23': [
    {
      'deepness': 4,
      'translations': {
        'en': 'What scares you?',
        'de': 'Was macht dir Angst?'
      }
    }
  ],
  '2022-10-31': [
    {
      'deepness': 3,
      'translations': {
        'en': 'What is something that you do differently from your parents? Why?',
        'de': 'Was machst du anders als deine Eltern? Warum?'
      }
    }
  ],
  '2022-11-09': [
    {
      'deepness': 4,
      'author': 'Alex No',
      'translations': {
        'en': 'How do you show love? How do you like being shown love?',
        'de': 'Wie zeigst du Liebe? Wie können dir andere Liebe zeigen?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What is the best compliment somebody ever gave you?',
        'de': 'Was ist das beste Kompliment, das du je bekommen hast?'
      }
    }
  ],
  '2022-11-25': [
    {
      'deepness': 4,
      'translations': {
        'en': 'What needs to happen in your life for it to have gone right?',
        'de': 'Was muss in deinem Leben passieren, damit es gut war?'
      }
    },
    {
      'deepness': 1,
      'author': 'Alex No',
      'translations': {
        'en': 'What sound or song would summon you?',
        'de': 'Welcher Ton oder welches Lied würde dich herbeirufen?'
      }
    },
    {
      'deepness': 2,
      'tags': [
        'philosophy'
      ],
      'translations': {
        'en': 'Are there evil humans?',
        'de': 'Gibt es böse Menschen?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What role did music play in the household you grew up in?',
        'de': 'Was für eine Rolle hat Musik gespielt im Haushalt wo du aufgewachsen bist?'
      }
    },
    {
      'deepness': 1,
      'author': 'Alex No',
      'translations': {
        'en': 'What song is playing in your head?',
        'de': 'Was hast du gerade für einen Ohrwurm?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What line from a song or poem means a lot to you?',
        'de': 'Was ist eine Zeile aus einem Gedicht oder Lied die dir viel bedeutet?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What is something that you took after your grandparents? What is something you took after your parents?',
        'de': 'Wo bist du wie deine Grosseltern? Wo bist du wie deine Eltern?'
      }
    }
  ],
  '2022-12-21': [
    {
      'deepness': 2,
      'translations': {
        'en': 'What are your pet peeves?',
        'de': 'Was kannst du nicht leiden in anderen Menschen? Was sind deine pet peeves?'
      }
    },
    {
      'deepness': 5,
      'tags': [
        'twoPeople'
      ],
      'author': 'Samer Massad',
      'translations': {
        'en': 'Where are you choosing wrong? Where am I choosing wrong?',
        'de': 'Wo wählst du falsch? Wo wähle ich falsch?'
      }
    },
    {
      'deepness': 3,
      'author': 'Samer Massad',
      'translations': {
        'en': 'What is something you\'re distracted from?',
        'de': 'Wo bist du von etwas abelenkt, dass du eigentlich machen möchtest?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What is a coping mechanism you used to rely on? What for?',
        'de': 'Was ist ein coping mechanism, den du in der Vergangenheit misbrauchst hast? Wofür?'
      }
    }
  ],
  '2023-02-02': [
    {
      'deepness': 5,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What is the pain in me you wish you could heal?',
        'de': 'Was ist der Schmerz in mir, den du heilen würdest?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'What do you think I need to hear?',
        'de': 'Was glaubst du, müsste ich mal hören?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What is your biggest fear and how can I help you to face it?',
        'de': 'Was ist deine grösste Angst und wie kann ich dir helfen, sie zu überwinden?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What is something you think I\'m really good at?',
        'de': 'Was ist etwas, was ich wirklich gut kann?'
      }
    },
    {
      'deepness': 3,
      'author': 'Sofia',
      'translations': {
        'en': 'What do you like about your parents?',
        'de': 'Was magst du an deinen Eltern?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What is something you\'ve done to try and be cool?',
        'de': 'Was hast to in der Vergangenheit gemacht um cool zu scheinen?'
      }
    },
    {
      'deepness': 5,
      'translations': {
        'en': 'When have you seen me the most vulnerable and what did it teach you about me?',
        'de': 'Wann hast du mich am verwundbarsten gesehen? Was hat es dich über mich gelehrt?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'love'
      ],
      'translations': {
        'en': 'What do you think is my sexiest quality?',
        'de': 'Was findest du ist meine sexieste Qualität?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What do you think I\'m hesitant to tell you?',
        'de': 'Was glaubst du zögere ich dir zu sagen?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'Who has more power in this relationship?',
        'de': 'Wer hat mehr Macht in dieser Beziehung?'
      }
    },
    {
      'deepness': 2,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What is one experience you hope we share in the future?',
        'de': 'Was ist ein Erlebnis, von dem du hoffst, dass wir es mal zusammen machen?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'If this was our last conversation, what is something you\'d never want me to forget?',
        'de': 'Angenommen, das wäre unser letztes Gespräch: Was sollte ich niemals vergessen?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What is one thing I could do to improve our relationship?',
        'de': 'Was könnte ich machen, um unsere Beziehung zu verbessern?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'When do you feel most empowered in your body?',
        'de': 'Wann fühlst du dich am stärksten (most empowered) in deinem Körper?'
      }
    },
    {
      'deepness': 2,
      'translations': {
        'en': 'What would you never, ever want my help with?',
        'de': 'Bei was möchtest du nie und nimmer meine Hilfe haben?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'twoPeople',
        'love'
      ],
      'translations': {
        'en': 'What about me would make you come back for more?',
        'de': 'Was an mir würde dich motivieren, für mehr zurückzukommen?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'When did you feel closest to me?',
        'de': 'Wann hast du dich mir am nächsten gefühlt?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'What is a possible challenge for me in the future? What can I do about it now?',
        'de': 'Was ist eine mögliche Herausforderung die du in meiner Zukunft siehst? Was kann ich jetzt schon dafür machen?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What are you hesitant to talk to me about?',
        'de': 'Über was zögerst du, mit mir zu reden?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'When you look into my eyes, what do you see?',
        'de': 'Wenn du in meine Augen schaust, was siehst du dann?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'What is a question you\'ve always wanted to ask me?',
        'de': 'Was wolltest du mich schon immer mal fragen?'
      }
    },
    {
      'deepness': 3,
      'author': 'Andy Stanley',
      'translations': {
        'en': 'What do you want to be known for?',
        'de': 'Für was möchtest du bekannt sein?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What is your favourite imperfection of mine?',
        'de': 'Was ist deine Lieblingsfehler an mir?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'How were you raised differently and how do you think it affects our relationship?',
        'de': 'Inwiefer wurden wir unterschiedlich erzogen und wie beeinflusst das unsere Beziehung?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What is something you learned from me that changed you?',
        'de': 'Was hast du von mir gelernt, was dich verändert hat?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'love'
      ],
      'translations': {
        'en': 'What would your last partner warn me about?',
        'de': 'Vor was würde mich dein letzer Partner/deine letzte Partnerin warnen?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'When are you most worried about me?',
        'de': 'Wann machst du dir am meisten Sorgen um mich?'
      }
    }
  ],
  '2023-04-06': [
    {
      'deepness': 3,
      'author': 'Franziska von Grünigen',
      'translations': {
        'en': 'What should people think and say about you after your death?',
        'de': 'Was sollen Leute über dich sagen und denken nach deinem Tod?'
      }
    },
    {
      'deepness': 4,
      'author': 'Franziska von Grünigen',
      'translations': {
        'en': 'What do you want your funeral to be like? Any songs that must be played? What should be said? By who?',
        'de': 'Wie soll deine Beerdigung sein? Was für ein Lied muss unbedingt gespielt werden? Was soll gesagt werden? Von wem?'
      }
    }
  ],
  '2023-04-12': [
    {
      'deepness': 3,
      'author': 'Robert',
      'translations': {
        'en': 'What should never change about your environment?',
        'de': 'Was soll sich in deinem Umfeld nie ändern?'
      }
    },
    {
      'deepness': 4,
      'translations': {
        'en': 'Did you recently need courage? What for?',
        'de': 'Brauchtest du in letzter Zeit Mut? Für was?'
      }
    },
    {
      'deepness': 4,
      'author': 'Tim Harford',
      'translations': {
        'en': 'Have you ever broken anyone is heart?',
        'de': 'Hast du schon einmal das Herz von jemandem gebrochen?'
      }
    },
    {
      'deepness': 3,
      'translations': {
        'en': 'How stressed are you right now?',
        'de': 'Wie gestresst bist du gerade?'
      }
    },
    {
      'deepness': 3,
      'author': 'Felizitas Ambauen',
      'translations': {
        'en': 'How would you describe your parents with three words each?',
        'de': 'Wie würdest du deine Eltern in je drei Begriffen beschreiben?'
      }
    }
  ],
  '2023-04-19': [
    {
      'deepness': 5,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'When did I disappoint you? How do you feel about it now?',
        'de': 'Wann habe ich dich enttäuscht? Wie denkst du heute darüber?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'love',
        'twoPeople'
      ],
      'translations': {
        'en': 'Why do you love me?',
        'de': 'Warum liebst du mich?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'What is one experience you wish we never shared?',
        'de': 'Was ist ein Erlebnis, von dem du dir wünschen würdest, dass wir es nie zusammen erlebt hätten?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'love',
        'twoPeople'
      ],
      'translations': {
        'en': 'What is something you are missing out on for being in this relationship?',
        'de': 'Was ist etwas, was du wegen dieser Beziehung verpasst?'
      }
    },
    {
      'deepness': 4,
      'tags': [
        'love',
        'twoPeople'
      ],
      'translations': {
        'en': 'What could be the reason for us to break up? What can we do about it now?',
        'de': 'Was könnte der Grund sein, dass wir uns trennen? War können wir jetzt dagegen machen?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'Where do we misunderstand each other most? Why do you think that is?',
        'de': 'Wo verstehen wir uns am häufigsten falsch? Warum denkst du ist das so?'
      }
    },
    {
      'deepness': 3,
      'tags': [
        'love',
        'twoPeople'
      ],
      'translations': {
        'en': 'When have you felt sexiest around me and what did it teach you about yourself?',
        'de': 'Wann hast du dich am sexiesten mit mir gefühlt? Was hast du dabei über dich gelernt?'
      }
    },
    {
      'deepness': 2,
      'tags': [
        'love',
        'twoPeople'
      ],
      'translations': {
        'en': 'When did you realize I was in love with you?',
        'de': 'Wann hast du realisiert, dass ich dich liebe?'
      }
    },
    {
      'deepness': 2,
      'tags': [
        'love',
        'twoPeople'
      ],
      'translations': {
        'en': 'What is something I do that turns you on that I don\'t realize?',
        'de': 'Was ist etwas, das ich mache, und dass dich antörnt, ohne dass ich es weiss?'
      }
    },
    {
      'deepness': 2,
      'tags': [
        'twoPeople'
      ],
      'translations': {
        'en': 'How do you describe me to others?',
        'de': 'Wie beschreibst du mich gegenüber anderen?'
      }
    }
  ]
}

const DEFAULT_LANG = 'en'
const extractedTranslations = Object.values( questionsByDate ).flat().map( e => e.translations )
export const translations = {
  en: Object.fromEntries( extractedTranslations.map( e => ( [e[DEFAULT_LANG], e.en ] ) ) ),
  de: Object.fromEntries( extractedTranslations.map( e => ( [e[DEFAULT_LANG], e.de ] ) ) ),
}

export const questions: Question[] = Object.entries( questionsByDate )
  .sort( ( a, b ) => ( a[0] <= b[0] ? -1 : 1 ) )
  .map( ( [date, questionsInDate], iDate, arr ) => {
    const p = arr.slice( 0, iDate ).map( e => e[1].length ).reduce( ( acc, cur ) => acc + cur, 0 )
    return questionsInDate.map( ( q, iQ ) => {
      const quesitonObject: Question = {
        question: q.translations[DEFAULT_LANG],
        index: iQ + p,
        deepness: q.deepness,
        date: date,
        tags: q.tags,
        author: q.author
      }
      if ( q.author ) {
        if ( quesitonObject.tags ) quesitonObject.tags.push( 'hasAuthor' )
        else quesitonObject.tags = ['hasAuthor']
      }
      return quesitonObject
    }
    )
  } )
  .flat()

const possibleDeepnessLevels = questions.map( e => e.deepness ).filter( unique ).sort()
export const minDeepness = Math.min( ...possibleDeepnessLevels )
export const maxDeepness = Math.max( ...possibleDeepnessLevels )
export const allTags = questions.flatMap( e => e.tags || [] ).filter( unique )
