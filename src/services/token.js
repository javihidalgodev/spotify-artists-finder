const CLIENT_ID = 'c06bb95043714483b67d7e45a2323e34'
const CLIENT_SECRET = 'ef845a36a43344b492d995575930f785'

export async function getToken () {
  const authParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
  }

  const response = await fetch('https://accounts.spotify.com/api/token', authParameters)
  const {access_token} = await response.json()
  return access_token
}