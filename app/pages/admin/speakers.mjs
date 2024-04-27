function speaker(e) {
    return `<details>
        <summary>${ e ? e.name : 'New Speaker' }</summary>
        <form action=/admin/speakers method=post>
          ${ e ? `<input type=hidden name=_id placeholder="id" value="${e._id}"` : '' }
          <input type=text name=slug placeholder="Slug" value="${ e ? e.name : '' }">
          <input type=text name=name placeholder="Name" value="${ e ? e.name : '' }">
          <input type=text name=image placeholder="Image" value="${ e ? e.image : '' }">
          <input type=text name=url placeholder="Website" value="${ e ? e.url : '' }">
          <input type=text name=twitter placeholder="Twitter" value="${ e ? e.twitter : '' }">
          <button>Save</button>
        </form>
      </details>`
  }


export default function ({ html, state }) {
    const { speakers } = state.store
    return html`
        <admin-layout>
            <h1>Speakers</h1>
            ${ speakers.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(speaker).join('')}
            ${ speaker() }
        </admin-layout>
    `
}