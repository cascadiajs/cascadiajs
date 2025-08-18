import { findUser } from '../../../shared/data/users.mjs';

export async function get({ pathParameters }) {
  const { id } = pathParameters;
  //console.log(id);
  const user = await findUser({ _id: id });
  //console.log(user);
  return {
    location: user.profile_photo
  };
}
