import * as stytch from 'stytch'
import { upsertUser, findUser } from '../../shared/data/users.mjs'

export async function get({ query, session }) {
    const { stytch_token_type, token } = query
    //console.log(stytch_token_type, token)
    
    const client = new stytch.Client({
        project_id: process.env.STYTCH_PROJECT_ID,
        secret: process.env.STYTCH_SECRET,
        /*env: stytch.envs.test,*/
      }
    );
        
    const oauth = await client.oauth.authenticate({ token})

    // if there is a ticketRef in the user's session, this is a sign-up operation, create record
    if (session.ticketRef) {
      const _id = oauth.oauth_user_registration_id
      const name = oauth.user.name
      const email = oauth.user.emails[0].email
      const email_verified = oauth.user.emails[0].verified
      const profile_photo = oauth.user.providers[0].profile_picture_url
      const oauth_provider = oauth.provider_type
      const ticket_ref = session.ticketRef
      await upsertUser({ _id, name, email, email_verified, profile_photo, oauth_provider, oauth_payload: oauth, ticket_ref })
  
      return {
        location: '/live',
        session: { userId: _id, userName: name }
      }
    }
    // else, use the email to look up the user in the database, if found, set session
    else {
        const user = await findUser({ email: oauth.user.emails[0].email })
        if (user) {
            return {
                location: '/live',
                session: { userId: user._id, userName: user.name }
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