const organizers = [
  {
    id: '',
    name: 'Carter Rabasa',
    image: 'carter-rabasa.jpg',
    location: 'Seattle, WA',
    role: 'Lead Organizer'
  },
  {
    id: '',
    name: 'Carrie Rabasa',
    image: 'carrie-rabasa.jpg',
    location: 'Seattle, WA',
    role: 'Co-Organizer'
  },
  {
    id: '',
    name: 'Daphne Oakes',
    image: 'daphne-oakes.jpg',
    location: 'Seattle, WA',
    role: 'Emcee'
  },
  {
    id: '',
    name: 'Jim Liu',
    image: 'jim-liu.jpg',
    location: 'Seattle, WA',
    role: 'Startup Fair'
  },
  {
    id: '',
    name: 'Cristina Rodriguez',
    image: 'cristina-rodriguez.jpg',
    location: 'Seattle, WA',
    role: 'Scholarships'
  },
  {
    id: '',
    name: 'Andre Wiggins',
    image: 'andre-wiggins.jpg',
    location: 'Seattle, WA',
    role: 'Speaker Wrangler'
  },
  {
    id: '',
    name: 'Bibiana Marocco De Souza',
    image: 'bibiana-marocco-de-souza.jpg',
    location: 'Vancouver, BC',
    role: 'Vancouver Lead'
  },
  {
    id: '',
    name: 'Joel Hooks',
    image: 'joel-hooks.jpg',
    location: 'Vancouver, WA',
    role: 'Portland Lead'
  },
  {
    id: '',
    name: 'Kelli Rockwell',
    image: 'kelli-rockwell.jpg',
    location: 'Seattle, WA',
    role: 'Volunteer'
  },
  {
    id: '',
    name: 'Shivay Lamba',
    image: 'shivay-lamba.jpg',
    location: 'Delhi, India',
    role: 'Volunteer'
  },
  {
    id: '',
    name: 'Kate Pond',
    image: 'kate-pond.jpg',
    location: 'Seattle, WA',
    role: 'Volunteer'
  },
  {
    id: '',
    name: 'Justin Oliver Lee',
    image: 'justin-oliver-lee.jpg',
    location: 'Seattle, WA',
    role: 'Volunteer'
  },
  {
    id: '',
    name: 'FX Wood',
    image: 'fx-wood.jpg',
    location: 'Seattle, WA',
    role: 'Volunteer'
  }
]

export default function Organizers({ html, /* state */ }) {
  return html`
        <style>
        .organizers-list {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: center;
        }
        .organizer {
            width: 250px;
            display:flex;
            flex-direction: column;
            margin-right: 8px;
            margin-bottom: 16px;
        }
        </style>
        <div class="organizers-list">
        ${ organizers.map(o => /*html*/`
            <div class="organizer">
                <person-photo
                    image="/_public/images/organizers/${ o.image }"
                    name="${ o.name }">
                </person-photo>
                <person-info name="${ o.name }" role="${ o.role }" location="${ o.location }"></person-info>
            </div>
        `).join('')}
    `
}
