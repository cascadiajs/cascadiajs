export async function get(req) {
  const { path } = req;
  return {
    json: {
      path,
    },
  };
}
