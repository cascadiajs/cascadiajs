const sponsors = [
  { 
      id: 'datastax',
      tier: 'gold',
      logo: 'datastax.svg',
      name: 'DataStax',
      url: 'https://www.datastax.com'
  },
  { 
      id: 'stytch',
      tier: 'gold',
      logo: 'stytch.svg',
      name: 'Stytch',
      url: 'https://stytch.com/'
  },
  { 
      id: 'temporal',
      tier: 'gold',
      logo: 'temporal.svg',
      name: 'Temporal',
      url: 'https://temporal.io/'
  },
  { 
      id: 'codingscape',
      tier: 'gold',
      logo: 'codingscape.svg',
      name: 'Codingscape',
      url: 'https://codingscape.com'
  },
  { 
      id: 'infobip',
      tier: 'gold',
      logo: 'infobip.svg',
      name: 'Infobip',
      url: 'http://infobip.com/developers'
  },
  { 
      id: 'hookdeck',
      tier: 'community',
      logo: 'hookdeck.svg',
      name: 'HookDeck',
      url: 'https://hookdeck.com?ref=cascadiajs-2024'
  },
  { 
      id: 'langchain',
      tier: 'community',
      logo: 'langchain.svg',
      name: 'LangChain',
      url: 'https://langchain.com'
  },
  { 
      id: 'google',
      tier: 'community',
      logo: 'google.png',
      name: 'Google',
      url: 'https://google.com'
  },
  { 
      id: 'begin',
      tier: 'community',
      logo: 'begin.svg',
      name: 'Begin',
      url: 'https://begin.com'
  },
  { 
      id: 'mux',
      tier: 'community',
      logo: 'mux.png',
      name: 'Mux',
      url: 'https://mux.com'
  },
  { 
      id: 'seattlejs',
      tier: 'community',
      logo: 'seattlejs.png',
      name: 'SeattleJS',
      url: 'https://seattlejs.com'
  },
  { 
      id: 'seattle-node',
      tier: 'community',
      logo: 'seattle-node.png',
      name: 'Seattle Node',
      url: 'https://www.meetup.com/seattle-node-js/'
  },
  { 
      id: 'seattle-reactjs',
      tier: 'community',
      logo: 'seattle-reactjs.jpg',
      name: 'Seattle React.js',
      url: 'https://www.meetup.com/seattle-react-js/'
  },
  { 
      id: 'pdx-angular',
      tier: 'community',
      logo: 'portland-angular.jpg',
      name: 'Portland Angular.js',
      url: 'https://www.meetup.com/ngpdxers/'
  }
]

export async function get(req) {
  return {
    json: {
      sponsors
    }
  }
}