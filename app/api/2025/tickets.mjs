export async function get({ path }) {
  return {
    json: {
      path,
    },
  };
}
