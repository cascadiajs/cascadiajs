import * as stytch from 'stytch'
import { upsertUser } from '../../shared/data/users.mjs'

export async function get({ query }) {
    const { stytch_token_type, token } = query
    console.log(stytch_token_type, token)
    
    const client = new stytch.Client({
        project_id: process.env.STYTCH_PROJECT_ID,
        secret: process.env.STYTCH_SECRET,
        env: stytch.envs.test,
      }
    );
        
    const oauth = await client.oauth.authenticate({ token})
    const id = oauth.oauth_user_registration_id
    const name = oauth.user.name
    const email = oauth.user.emails[0].email
    const email_verified = oauth.user.emails[0].verified
    const profile_photo = oauth.user.providers[0].profile_picture_url
    const oauth_provider = oauth.provider_type
    const resp = await upsertUser({ id, name, email, email_verified, profile_photo, oauth_provider, oauth_payload: oauth })
    
    console.log(resp)



    return {
      location: '/live',
      session: { id, name }
    }

}