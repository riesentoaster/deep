/* eslint-disable max-len */
export interface Question {
  question: string
  index?: number
  deepness: number
  date: string
  tags?: string[]
  author?: string
}

interface QuestionByDate {
    question: string
    deepness: number
    index: number
    tags?: string[]
    author?: string
    date?: string
  }

interface QuestionsByDate {
  [date: string]: QuestionByDate[]
}

const questionsByDate: QuestionsByDate = {
  '2022-08-31': [
    {
      'question': 'What decision of yours do you regret the most?',
      'deepness': 5,
      'index': 0
    },
    {
      'question': 'What is your story with Jesus?',
      'deepness': 2,
      'tags': [
        'christians'
      ],
      'index': 1
    },
    {
      'question': 'What behaviour of others annoys you?',
      'deepness': 2,
      'index': 2
    },
    {
      'question': 'What would you like to know about the future?',
      'deepness': 2,
      'index': 3
    },
    {
      'question': 'What have you no idea about?',
      'deepness': 1,
      'index': 4
    },
    {
      'question': 'What do you usually do to de-stress?',
      'deepness': 1,
      'index': 5
    },
    {
      'question': 'What are the most important entries in your calendar?',
      'deepness': 3,
      'index': 6
    },
    {
      'question': 'What makes you interesting?',
      'deepness': 2,
      'index': 7
    },
    {
      'question': 'What bothers you at the moment?',
      'deepness': 2,
      'index': 8
    },
    {
      'question': 'What are you thinking about regarding your faith?',
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'index': 9
    },
    {
      'question': 'What are you currently responsible for?',
      'deepness': 3,
      'index': 10
    },
    {
      'question': 'What is something you like talking about?',
      'deepness': 1,
      'index': 11
    },
    {
      'question': 'What would you change about your looks?',
      'deepness': 3,
      'index': 12
    },
    {
      'question': 'Who are you in 10 years?',
      'deepness': 3,
      'index': 13
    },
    {
      'question': 'What are you grateful for?',
      'deepness': 2,
      'index': 14
    },
    {
      'question': 'What is the coolest thing you\'ve done in your life so far?',
      'deepness': 2,
      'index': 15
    },
    {
      'question': 'What story is particularly important to you?',
      'deepness': 2,
      'index': 16
    },
    {
      'question': 'When did you fail the hardest in your life? What was your biggest triumph?',
      'deepness': 5,
      'index': 17
    },
    {
      'question': 'In which direction would you like to change the world?',
      'deepness': 3,
      'index': 18
    },
    {
      'question': 'What bible story is particularly important to you?',
      'deepness': 2,
      'tags': [
        'christians'
      ],
      'index': 19
    },
    {
      'question': 'What is a property/habit of yours that annoys other people?',
      'deepness': 2,
      'index': 20
    },
    {
      'question': 'In life, are you where you wanted to be at this point?',
      'deepness': 4,
      'index': 21
    },
    {
      'question': 'If you would be able to change your first name, how would you like to be called?',
      'deepness': 1,
      'index': 22
    },
    {
      'question': 'How do you reach a decision?',
      'deepness': 4,
      'index': 23
    },
    {
      'question': 'What is likeable/admirable about you?',
      'deepness': 3,
      'index': 24
    },
    {
      'question': 'Which trait of Jesus do you appreciate most?',
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'index': 25
    },
    {
      'question': 'What must I never forget?',
      'deepness': 4,
      'index': 26
    },
    {
      'question': 'What have you wanted to try to change about your life, but haven\'t managed?',
      'deepness': 5,
      'index': 27
    },
    {
      'question': 'What blind spots of me should I change?',
      'deepness': 5,
      'index': 28
    },
    {
      'question': 'What is my best quality that I don\'t see?',
      'deepness': 4,
      'index': 29
    },
    {
      'question': 'What is your best (secret) advice for working relationships?',
      'deepness': 3,
      'index': 30
    },
    {
      'question': 'On a scale from 1 through 10, how would you rate your life? What could you do to improve it?',
      'deepness': 3,
      'index': 31
    },
    {
      'question': 'What opinion of yours is unpopular with your friends?',
      'deepness': 3,
      'index': 32
    },
    {
      'question': 'What 3 traits would a person that is an exact opposite of you have?',
      'deepness': 2,
      'index': 33
    },
    {
      'question': 'What breaks your heart?',
      'deepness': 5,
      'index': 34
    },
    {
      'question': 'What is the best advice you have received?',
      'deepness': 3,
      'index': 35
    },
    {
      'question': 'Of what friend are you particularly proud? Why?',
      'deepness': 3,
      'index': 36
    },
    {
      'question': 'Show me your best imitation of me!',
      'deepness': 1,
      'tags': [
        'twoPeople'
      ],
      'index': 37
    },
    {
      'question': 'What do you like about our culture?',
      'deepness': 3,
      'index': 38
    },
    {
      'question': 'When was the last time you felt misunderstood?',
      'deepness': 3,
      'index': 39
    },
    {
      'question': 'What can other people learn from you?',
      'deepness': 3,
      'index': 40
    },
    {
      'question': 'What part of getting older worries you? What are you looking forward to?',
      'deepness': 4,
      'index': 41
    },
    {
      'question': 'What TV series are you currently watching?',
      'deepness': 1,
      'index': 42
    },
    {
      'question': 'What do you think is the most beautiful part of your body?',
      'deepness': 4,
      'index': 43
    },
    {
      'question': 'What bothers you most about what christians believe and how they live?',
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'index': 44
    },
    {
      'question': 'How are you maintaining your relationship to God?',
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'index': 45
    },
    {
      'question': 'Tell me/us something about you that only few people know!',
      'deepness': 3,
      'index': 46
    },
    {
      'question': 'What is something you learned during the past week?',
      'deepness': 2,
      'index': 47
    },
    {
      'question': 'What advice would you give to a recently converted christian?',
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'index': 48
    },
    {
      'question': 'What are you ashamed of?',
      'deepness': 5,
      'index': 49
    },
    {
      'question': 'What is your favourite story from a movie or book?',
      'deepness': 1,
      'index': 50
    },
    {
      'question': 'What is something that pastors should preach about more often?',
      'deepness': 1,
      'tags': [
        'christians'
      ],
      'index': 51
    },
    {
      'question': 'What are your goals in your faith?',
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'index': 52
    },
    {
      'question': 'What is most important to you in our relationship?',
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'index': 53
    },
    {
      'question': 'Is there an ability you\'d like to master?',
      'deepness': 1,
      'index': 54
    },
    {
      'question': 'What are your trademarks?',
      'deepness': 1,
      'index': 55
    },
    {
      'question': 'From what mistakes of yours can people learn?',
      'deepness': 4,
      'index': 56
    },
    {
      'question': 'What is something that life is currently teaching you?',
      'deepness': 5,
      'index': 57
    },
    {
      'question': 'What is most important to you in a relationship?',
      'deepness': 3,
      'index': 58
    },
    {
      'question': 'What do you know especially much about?',
      'deepness': 1,
      'index': 59
    },
    {
      'question': 'What persons do you admire? What for?',
      'deepness': 2,
      'index': 60
    },
    {
      'question': 'Is there something about Jesus and his doctrine that annoys you?',
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'index': 61
    },
    {
      'question': 'What wrong belief did you hold in the past?',
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'index': 62
    },
    {
      'question': 'What are your biggest goals in life?',
      'deepness': 3,
      'index': 63
    },
    {
      'question': 'What treats show mature christians?',
      'deepness': 3,
      'tags': [
        'christians'
      ],
      'index': 64
    },
    {
      'question': 'How does somebody become a friend of yours?',
      'deepness': 3,
      'index': 65
    },
    {
      'question': 'What is something that I have to experience?',
      'deepness': 4,
      'index': 66
    },
    {
      'question': 'What is a common prejudice people have about you?',
      'deepness': 3,
      'index': 67
    },
    {
      'question': 'Who is your best friend? Why?',
      'deepness': 3,
      'index': 68
    },
    {
      'question': 'What was the most difficult decision of your life?',
      'deepness': 5,
      'index': 69
    },
    {
      'question': 'What is something you like doing in particular?',
      'deepness': 1,
      'index': 70
    },
    {
      'question': 'What accomplishment of yours are you most proud of?',
      'deepness': 2,
      'index': 71
    },
    {
      'question': 'What would you change about your personality?',
      'deepness': 3,
      'index': 72
    },
    {
      'question': 'How are you inspiring other people?',
      'deepness': 3,
      'index': 73
    },
    {
      'question': 'Tell me an embarrassing story from your life!',
      'deepness': 5,
      'index': 74
    }
  ],
  '2022-09-03': [
    {
      'question': 'What is a decision you are struggling with? What is keeping you from making it?',
      'deepness': 5,
      'index': 0
    }
  ],
  '2022-09-09': [
    {
      'question': 'What is the last song you listened to?',
      'deepness': 1,
      'index': 0
    }
  ],
  '2022-09-11': [
    {
      'question': 'When do you feel at home?',
      'deepness': 3,
      'index': 0
    },
    {
      'question': 'When did you last cry? Why?',
      'deepness': 3,
      'index': 1
    }
  ],
  '2022-09-19': [
    {
      'question': 'Where are you deceiving yourself?',
      'deepness': 5,
      'index': 0
    }
  ],
  '2022-10-12': [
    {
      'question': 'What is out of balance in your life right now?',
      'deepness': 3,
      'index': 0
    }
  ],
  '2022-10-21': [
    {
      'question': 'What is love?',
      'deepness': 3,
      'author': 'Alex No',
      'index': 0
    }
  ],
  '2022-10-23': [
    {
      'question': 'What scares you?',
      'deepness': 4,
      'index': 0
    }
  ],
  '2022-10-31': [
    {
      'question': 'What is something that you do differently from your parents? Why?',
      'deepness': 3,
      'index': 0
    }
  ],
  '2022-11-09': [
    {
      'question': 'How do you show love? How do you like being shown love?',
      'deepness': 4,
      'author': 'Alex No',
      'index': 0
    },
    {
      'question': 'What is the best compliment somebody ever gave you?',
      'deepness': 2,
      'index': 1
    }
  ],
  '2022-11-25': [
    {
      'question': 'What needs to happen in your life for it to have gone right?',
      'deepness': 4,
      'index': 0
    },
    {
      'question': 'What sound or song would summon you?',
      'deepness': 1,
      'author': 'Alex No',
      'index': 1
    },
    {
      'question': 'Are there evil humans?',
      'deepness': 2,
      'tags': [
        'philosophy'
      ],
      'index': 2
    },
    {
      'question': 'What role did music play in the household you grew up in?',
      'deepness': 2,
      'index': 3
    },
    {
      'question': 'What song is playing in your head?',
      'deepness': 1,
      'author': 'Alex No',
      'index': 4
    },
    {
      'question': 'What line from a song or poem means a lot to you?',
      'deepness': 3,
      'index': 5
    },
    {
      'question': 'What is something that you took after your grandparents? What is something you took after your parents?',
      'deepness': 3,
      'index': 6
    }
  ],
  '2022-12-21': [
    {
      'question': 'What are your pet peeves?',
      'deepness': 2,
      'index': 0
    },
    {
      'question': 'Where are you choosing wrong? Where am I choosing wrong?',
      'deepness': 5,
      'tags': [
        'twoPeople'
      ],
      'author': 'Samer Massad',
      'index': 1
    },
    {
      'question': 'What is something you\'re distracted from?',
      'deepness': 3,
      'author': 'Samer Massad',
      'index': 2
    },
    {
      'question': 'What is a coping mechanism you used to rely on? What for?',
      'deepness': 3,
      'index': 3
    }
  ],
  '2023-02-02': [
    {
      'question': 'What is the pain in me you wish you could heal?',
      'deepness': 5,
      'tags': [
        'twoPeople'
      ],
      'index': 0
    },
    {
      'question': 'What do you think I need to hear?',
      'deepness': 4,
      'index': 1
    },
    {
      'question': 'What is your biggest fear and how can I help you to face it?',
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'index': 2
    },
    {
      'question': 'What is something you think I\'m really good at?',
      'deepness': 2,
      'index': 3
    },
    {
      'question': 'What do you like about your parents?',
      'deepness': 3,
      'author': 'Sofia',
      'index': 4
    },
    {
      'question': 'What is something you\'ve done to try and be cool?',
      'deepness': 2,
      'index': 5
    },
    {
      'question': 'When have you seen me the most vulnerable and what did it teach you about me?',
      'deepness': 5,
      'index': 6
    },
    {
      'question': 'What do you think is my sexiest quality?',
      'deepness': 3,
      'tags': [
        'love'
      ],
      'index': 7
    },
    {
      'question': 'What do you think I\'m hesitant to tell you?',
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'index': 8
    },
    {
      'question': 'Who has more power in this relationship?',
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'index': 9
    },
    {
      'question': 'What is one experience you hope we share in the future?',
      'deepness': 2,
      'tags': [
        'twoPeople'
      ],
      'index': 10
    },
    {
      'question': 'If this was our last conversation, what is something you\'d never want me to forget?',
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'index': 11
    },
    {
      'question': 'What is one thing I could do to improve our relationship?',
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'index': 12
    },
    {
      'question': 'When do you feel most empowered in your body?',
      'deepness': 3,
      'index': 13
    },
    {
      'question': 'What would you never, ever want my help with?',
      'deepness': 2,
      'index': 14
    },
    {
      'question': 'What about me would make you come back for more?',
      'deepness': 3,
      'tags': [
        'twoPeople',
        'love'
      ],
      'index': 15
    },
    {
      'question': 'When did you feel closest to me?',
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'index': 16
    },
    {
      'question': 'What is a possible challenge for me in the future? What can I do about it now?',
      'deepness': 4,
      'index': 17
    },
    {
      'question': 'What are you hesitant to talk to me about?',
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'index': 18
    },
    {
      'question': 'When you look into my eyes, what do you see?',
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'index': 19
    },
    {
      'question': 'What is a question you\'ve always wanted to ask me?',
      'deepness': 3,
      'index': 20
    },
    {
      'question': 'What do you want to be known for?',
      'deepness': 3,
      'author': 'Andy Stanley',
      'index': 21
    },
    {
      'question': 'What is your favourite imperfection of mine?',
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'index': 22
    },
    {
      'question': 'How were you raised differently and how do you think it affects our relationship?',
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'index': 23
    },
    {
      'question': 'What is something you learned from me that changed you?',
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'index': 24
    },
    {
      'question': 'What would your last partner warn me about?',
      'deepness': 4,
      'tags': [
        'love'
      ],
      'index': 25
    },
    {
      'question': 'When are you most worried about me?',
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'index': 26
    }
  ],
  '2023-04-06': [
    {
      'question': 'What should people think and say about you after your death?',
      'deepness': 3,
      'author': 'Franziska von Grünigen',
      'index': 0
    },
    {
      'question': 'What do you want your funeral to be like? Any songs that must be played? What should be said? By who?',
      'deepness': 4,
      'author': 'Franziska von Grünigen',
      'index': 1
    }
  ],
  '2023-04-12': [
    {
      'question': 'What should never change about your environment?',
      'deepness': 3,
      'author': 'Robert',
      'index': 0
    },
    {
      'question': 'Did you recently need courage? What for?',
      'deepness': 4,
      'index': 1
    },
    {
      'question': 'Have you ever broken anyone is heart?',
      'deepness': 4,
      'author': 'Tim Harford',
      'index': 2
    },
    {
      'question': 'How stressed are you right now?',
      'deepness': 3,
      'index': 3
    },
    {
      'question': 'How would you describe your parents with three words each?',
      'deepness': 3,
      'author': 'Felizitas Ambauen',
      'index': 4
    }
  ],
  '2023-04-19': [
    {
      'question': 'When did I disappoint you? How do you feel about it now?',
      'deepness': 5,
      'tags': [
        'twoPeople'
      ],
      'index': 0
    },
    {
      'question': 'Why do you love me?',
      'deepness': 4,
      'tags': [
        'love',
        'twoPeople'
      ],
      'index': 1
    },
    {
      'question': 'What is one experience you wish we never shared?',
      'deepness': 4,
      'tags': [
        'twoPeople'
      ],
      'index': 2
    },
    {
      'question': 'What is something you are missing out on for being in this relationship?',
      'deepness': 4,
      'tags': [
        'love',
        'twoPeople'
      ],
      'index': 3
    },
    {
      'question': 'What could be the reason for us to break up? What can we do about it now?',
      'deepness': 4,
      'tags': [
        'love',
        'twoPeople'
      ],
      'index': 4
    },
    {
      'question': 'Where do we misunderstand each other most? Why do you think that is?',
      'deepness': 3,
      'tags': [
        'twoPeople'
      ],
      'index': 5
    },
    {
      'question': 'When have you felt sexiest around me and what did it teach you about yourself?',
      'deepness': 3,
      'tags': [
        'love',
        'twoPeople'
      ],
      'index': 6
    },
    {
      'question': 'When did you realize I was in love with you?',
      'deepness': 2,
      'tags': [
        'love',
        'twoPeople'
      ],
      'index': 7
    },
    {
      'question': 'What is something I do that turns you on that I don\'t realize?',
      'deepness': 2,
      'tags': [
        'love',
        'twoPeople'
      ],
      'index': 8
    },
    {
      'question': 'How do you describe me to others?',
      'deepness': 2,
      'tags': [
        'twoPeople'
      ],
      'index': 9
    }
  ]
}

export const questions: Question[] = Object.entries( questionsByDate )
  .sort( ( a, b ) => ( a[0] <= b[0] ? -1 : 1 ) )
  .map( ( [date, q], i, arr ) => {
    const p = arr.slice( 0, i ).map( e => e[1].length ).reduce( ( acc, cur ) => acc + cur, 0 )
    return q.map( e => {
      e.date = date
      e.index += p
      if ( e.author ) {
        if ( e.tags ) e.tags.push( 'hasAuthor' )
        else e.tags = ['hasAuthor']
      }
      return e as Question
    }
    )
  } )
  .flat()
