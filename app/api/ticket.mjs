export const get = async function redirect({ query }) {
  const { ticketId } = query

  return {
    location: `/ticket/${ticketId}`
  }
}
