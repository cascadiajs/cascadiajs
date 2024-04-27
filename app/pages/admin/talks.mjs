function talk(t) {
    console.log(t)
    return `<details>
        <summary>${ t ? (t.title || t.speaker.name) : 'New Talk' }</summary>
        ${ t ? `
        <p>
            Speaker: ${ t.speaker.name }<br/>
            Event: ${ t.event.name }<br/>
            Slug: ${ t.slug }
        </p>` : ''}
        <form action=/admin/talks method=post>
        ${ t ? `<input type=hidden name=_id value="${ t._id}">` : '' }
          <input type=${ t ? 'hidden' : 'text' } name=event_id placeholder="event_id" value="${ t ? t.event_id : '' }">
          <input type=${ t ? 'hidden' : 'text' } name=speaker_id placeholder="speaker_id" value="${ t ? t.speaker_id : '' }">
          <input type=text name=title placeholder="Title" value="${ t ? t.title : '' }">
          <textarea name=abstract placeholder="Abstract">${ t ? t.abstract : '' }</textarea>
          <input type=text name=short placeholder="Short Description" value="${ t ? t.short : '' }">
          <input type=text name=tags placeholder="Tags" value="${ t && t.tags ? t.tags.join(',') : '' }">
          <button>Save</button>
        </form>
      </details>`
  }


export default function ({ html, state }) {
    const { talks } = state.store
    return html`
        <admin-layout>
            <h1>Talks</h1>
            ${ talks.map(talk).join('')}
            ${ talk() }
        </admin-layout>
    `
}