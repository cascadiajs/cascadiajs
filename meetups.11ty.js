module.exports = {
    data: () => {
        return {
            layout: 'layout',
            title: 'Meetups'
        }
    },
    render: ({title, collections}) => {
        const allMeetups = collections.meetups
        const meetups = allMeetups.filter(meetup => meetup.date > new Date()).sort(function(meetup1, meetup2) {
            if (meetup1.date > meetup2.date) return 1
            if (meetup1.date < meetup2.date) return -1
            return 0
        })
        return `<h1>${title}</h1>
        <ul>
    ${meetups.map((meetup) => `<li> ${meetup.date.getMonth() + 1}/${meetup.date.getDate()}      <a href="${meetup.url }">${meetup.data.title}</a></li>`).join("")}
        </ul>`;
    }
}