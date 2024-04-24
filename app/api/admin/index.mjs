export async function get({ session }) {
    const authorized = !!(session.authorized)
    if (!authorized) return { location: '/admin/login' }

    return
}
