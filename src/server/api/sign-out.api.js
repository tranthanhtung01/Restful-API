export async function signOutTeacher(req, res) {
  res.clearCookies('token');
  res.json('Account logout is success !!');
}
