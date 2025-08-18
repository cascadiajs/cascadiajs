import * as stytch from 'stytch'
import { upsertUser, findUser } from '../../shared/data/users.mjs'
import { upsertTicket, findTicket } from '../../shared/data/tito.mjs';

export async function get({ query, session }) {
  const { /* stytch_token_type, */ token } = query
  //console.log(stytch_token_type, token)

  const client = new stytch.Client({
    project_id: process.env.STYTCH_PROJECT_ID,
    secret: process.env.STYTCH_SECRET,
    /*env: stytch.envs.test,*/
  }
  );
  const oauth = await client.oauth.authenticate({ token})
  //console.log(oauth)
  // if there is a ticketId in the user's session, this is a sign-up operation, create record
  if (session.ticketId) {
    const _id = oauth.oauth_user_registration_id
    const name = oauth.user.name
    const email = oauth.user.emails[0].email
    const email_verified = oauth.user.emails[0].verified
    const profile_photo = oauth.user.providers[0].profile_picture_url
    const oauth_provider = oauth.provider_type
    await upsertUser({ _id, name, email, email_verified, attending: '2025', profile_photo, oauth_provider, oauth_payload: oauth })
    // update the ticket record to point to this user
    await upsertTicket({ _id: session.ticketId, user_id: _id })
    return {
      location: '/home',
      session: { userId: _id, userName: name, ticketId: session.ticketId }
    }
  }
  // else, use the email to look up the user in the database, if found, set session
  else {
    //console.log(oauth.user.emails[0].email)
    //const user = await findUser({ email: oauth.user.emails[0].email })
    //console.log(oauth.oauth_user_registration_id)
    const user = await findUser({ _id: oauth.oauth_user_registration_id })
    //console.log(oauth.oauth_user_registration_id, user)
    if (user) {
      // find the ticket associated with this user
      let ticket = await findTicket({ user_id: user._id })
      // if, for some reason, a ticket can't be found with this user id, fall back on using the email address
      if (!ticket) {
        console.log('no ticket found with user id, trying email ', user.email)
        ticket = await findTicket({ email: user.email })
        console.log(ticket)
        // now, update the ticket to reference this (correct?) Stytch user id
        await upsertTicket({ _id: ticket._id, user_id: user._id })
      }
      return {
        location: '/home',
        session: { userId: user._id, userName: user.name, ticketId: ticket._id }
      }
    }
    else {
      // else if not found, redirect to sign-up page with error message
      return {
        location: '/signup?error=must-signup'
      }
    }
  }
}
