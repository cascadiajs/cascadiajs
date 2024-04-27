import satori from 'satori'

export async function get(req) {
    const foo = await satori(
        {
          type: 'div',
          props: {
            children: 'hello, world',
            style: { color: 'black' },
          },
        },
        {}
      )
  return {
    json: {
      foo
    }
  }
}