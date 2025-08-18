import { findUser } from '../../shared/data/users.mjs';

export async function get({ query }) {
  const { user_id } = query;
  const user = await findUser({ _id: user_id });
  return {
    location: user.profile_photo
  };
}
