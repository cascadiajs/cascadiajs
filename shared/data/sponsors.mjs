const sponsors = [
    { 
        id: 'temporal',
        logo: 'temporal.svg',
        logoSquare: 'temporal-square.jpg',
        name: 'Temporal',
        url: 'https://temporal.io/',
        video: '3c35df76a866b30cd714e87c82508815',
        description: 'Temporal is an open source durable execution platform that abstracts away the complexity of building scalable, distributed applications and lets developers focus on what matters – delivering reliable applications, faster. It improves meaningful engineering metrics that are directly tied to revenue, like development velocity and system reliability, and allows you to track every step of every application execution, so you gain valuable insight into your business. Temporal Cloud provides a managed service backed by the originators of the project. It has been adopted by thousands for mission-critical applications, including Stripe, Netflix, AlaskaAir, Snap, Datadog, and Hashicorp. Learn more at temporal.io.'
    },
    { 
        id: 'stytch',
        logo: 'stytch.svg',
        logoSquare: 'stytch-square.jpg',
        name: 'Stytch',
        url: 'https://stytch.com/',
        description: 'All-in-one authentication, authorization, and fraud prevention infrastructure with powerful APIs and SDKs. Stytch is the fastest way to build secure user authentication and authorization into your app. With Stytch, you can build a custom login experience in minutes, not months. Stytch is trusted by thousands of developers and businesses, including Webflow, Notion, and Figma.'
    },
    { 
        id: 'datastax',
        logo: 'datastax.svg',
        logoSquare: 'datastax-square.jpg',
        name: 'DataStax',
        url: 'https://www.datastax.com',
        description: 'DataStax is a GenAI data company that provides tools for developers to building amazing AI applications, including:\n- Astra DB - a serverless NoSQL and Vector database.\n- RAGStack - a framework for building enterprise-grade RAG applications.\n - Langflow - a visual editor and workflow engine for building AI flows.'
    },
    { 
        id: 'codingscape',
        logo: 'codingscape.svg',
        logoSquare: 'codingscape-square.jpg',
        name: 'Codingscape',
        url: 'https://codingscape.com',
        description: 'Codingscape is a modern consultancy solving global technology problems while putting people first. The world’s leading companies trust our expertise when they need a reliable partner to develop scalable software and systems. Our senior teams work across US time zones to build digital solutions faster and more efficiently than organizations can through internal hiring.'
    },
    { 
        id: 'infobip',
        logo: 'infobip.svg',
        logoSquare: 'infobip-square.jpg',
        name: 'Infobip',
        url: 'http://infobip.com/developers',
        video: '501085031dc9b27bcc6936548aa0fefa',
        description: 'Infobip is a global leader in the field of omnichannel communication powering a broad range of messaging channels, tools and solutions for advanced customer engagement, authentication, and security. We help our clients and partners overcome the complexity of consumer communications, grow their business, and enhance the customer experience quickly, securely, and reliably.'
    },
    { 
        id: 'tbd',
        logo: 'tbd.svg',
        name: 'TBD',
        url: 'https://tbd.website'
    },
    { 
        id: 'sentry',
        logo: 'sentry.svg',
        name: 'Sentry',
        url: 'https://sentry.io'
    },
    { 
        id: 'hookdeck',
        logo: 'hookdeck.svg',
        name: 'HookDeck',
        url: 'https://hookdeck.com?ref=cascadiajs-2024'
    },
    { 
        id: 'langchain',
        logo: 'langchain.svg',
        name: 'LangChain',
        url: 'https://langchain.com'
    },
    { 
        id: 'google',
        logo: 'google.png',
        name: 'Google',
        url: 'https://google.com'
    },
    { 
        id: 'mux',
        logo: 'mux.png',
        name: 'Mux',
        url: 'https://mux.com'
    },
    { 
        id: 'cloudinary',
        logo: 'cloudinary.png',
        name: 'Cloudinary',
        url: 'https://cloudinary.com'
    },
    { 
        id: 'codecrafters',
        logo: 'codecrafters.png',
        name: 'CodeCrafters',
        url: 'https://app.codecrafters.io/join?via=cascadiajs'
    },
    { 
        id: 'appwrite',
        logo: 'appwrite.png',
        name: 'appwrite',
        url: 'https://appwrite.io'
    },
    { 
        id: 'circle',
        logo: 'circle.png',
        name: 'Circle',
        url: 'https://www.circle.com'
    },
    { 
        id: 'circleci',
        logo: 'circleci.svg',
        name: 'CircleCI',
        url: 'https://circleci.com'
    },
    { 
        id: 'courier.png',
        logo: 'courier.png',
        name: 'Courier',
        url: 'https://courier.com'
    },
    { 
        id: 'datadog',
        logo: 'datadog.png',
        name: 'Datadog',
        url: 'https://www.datadoghq.com'
    },
    { 
        id: 'dolbyio',
        logo: 'dolby.svg',
        name: 'Dolby.io',
        url: 'https://dolby.io/'
    },
    { 
        id: 'elastic',
        logo: 'elastic.svg',
        name: 'Elastic',
        url: 'https://www.elastic.co/'
    },
    { 
        id: 'hasura',
        logo: 'hasura.png',
        name: 'Hasura',
        url: 'https://hasura.io'
    },
    { 
        id: 'lacework',
        logo: 'lacework.png',
        name: 'Lacework',
        url: 'https://lacework.com'
    },
    { 
        id: 'netlify',
        logo: 'netlify.svg',
        name: 'Netlify',
        url: 'https://www.netlify.com'
    },
    { 
        id: 'new-relic',
        logo: 'new-relic.svg',
        name: 'New Relic',
        url: 'https://newrelic.com'
    },
    { 
        id: 'nx',
        logo: 'nx.png',
        name: 'Nx',
        url: 'https://nx.dev'
    },
    { 
        id: 'openjs',
        logo: 'openjs.svg',
        name: 'OpenJS Foundation',
        url: 'https://openjsf.org'
    },
    { 
        id: 'postman',
        logo: 'postman.svg',
        name: 'Postman',
        url: 'https://www.postman.com'
    },
    { 
        id: 'retool',
        logo: 'retool.png',
        name: 'Retool',
        url: 'https://retool.com'
    },
    { 
        id: 'salesforce-devs',
        logo: 'salesforcedevs.png',
        name: 'Salesforce Developers',
        url: 'https://developer.salesforce.com'
    },
    { 
        id: 'saucelabs',
        logo: 'saucelabs.png',
        name: 'Sauce Labs',
        url: 'https://saucelabs.com'
    },
    { 
        id: 'stateful',
        logo: 'stateful.svg',
        name: 'Stateful',
        url: 'https://stateful.com'
    },
    { 
        id: 'tmobile',
        logo: 'tmobile.png',
        name: 'T-Mobile',
        url: 'https://www.t-mobile.com'
    },
    { 
        id: 'twilio',
        logo: 'twilio.svg',
        name: 'Twilio',
        url: 'https://www.twilio.com'
    },
    { 
        id: 'unbounce',
        logo: 'unbounce.png',
        name: 'Unbounce',
        url: 'https://unbounce.com'
    },
    { 
        id: 'vonage',
        logo: 'vonage.png',
        name: 'Vonage',
        url: 'https://www.vonage.com'
    },
    { 
        id: 'xata',
        logo: 'xata.svg',
        name: 'Xata',
        url: 'https://xata.io'
    }
]

export { sponsors }