function talk(t) {
    return `<details>
        <summary>${ t ? t.title : 'New Talk' }</summary>
        ${ t ? `
        <p>
            Speaker: ${ t.speaker.name }<br/>
            Event: ${ t.event.name }<br/>
            Slug: ${ t.slug }
        </p>` : ''}
        <form action=/admin/talks method=post>
          <input type=${ t ? 'hidden' : 'text' } name=_id value="${ t ? t._id : '' }">
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