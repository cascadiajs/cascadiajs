function speaker(s) {
    return `<details>
        <summary>${ s ? s.name : 'New Speaker' }</summary>
        <form action=/admin/speakers method=post>
          ${ s ? `<input type=text name=_id placeholder="id" value="${s._id}" readonly>` : '' }
          <input type=text name=slug placeholder="Slug" value="${ s ? s.name : '' }">
          <input type=text name=name placeholder="Name" value="${ s ? s.name : '' }">
          <input type=text name=image placeholder="Image" value="${ s ? s.image : '' }">
          <input type=text name=url placeholder="Website" value="${ s ? s.url : '' }">
          <input type=text name=twitter placeholder="Twitter" value="${ s ? s.twitter : '' }">
          <input type=text name=location placeholder="Location" value="${ s ? s.location : '' }">
          <input type=text name=company placeholder="Company" value="${ s ? s.company : '' }">
          <input type=text name=pronouns placeholder="Pronouns" value="${ s ? s.pronouns : '' }">
          <button>Save</button>
        </form>
        ${ s ? `
        <form action=/admin/speakers method=post>
            <input type=hidden name=_id value="${s._id}">
            <input type=hidden name=__delete value="true">
            <button>Delete</button>
        </form>` : '' }
      </details>`
  }


export default function ({ html, state }) {
    const { speakers } = state.store
    console.log(speakers.length)
    return html`
        <admin-layout>
            <h1>Speakers</h1>
            ${ speakers.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(speaker).join('')}
            ${ speaker() }
        </admin-layout>
    `
}