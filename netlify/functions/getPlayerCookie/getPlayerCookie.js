const cookie = require('cookie')

// 14 days
const COOKIE_MAX_AGE = 12_096e5

const handler = async () => {
  const myCookie = cookie.serialize('PlayerCookie', 'playerData', {
    secure: true,
    httpOnly: true,
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })

 
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': myCookie,
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html',
    },
    body: html,
  }
}

module.exports = { handler }
