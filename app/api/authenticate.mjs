import * as stytch from 'stytch'

export async function get({ query }) {
    const { stytch_token_type, token } = query
    console.log(stytch_token_type, token)
    
    const client = new stytch.Client({
        project_id: process.env.STYTCH_PROJECT_ID,
        secret: process.env.STYTCH_SECRET,
        env: stytch.envs.test,
      }
    );
        
    const resp = await client.oauth.authenticate({ token})
    console.log(resp)
    return {
      location: '/'
    }
}