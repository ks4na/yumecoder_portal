export default {
  github: {
    clientId: '7d2c51f4e42637217f96',
    oauthUrl: 'https://github.com/login/oauth/authorize',
    redirectUri:
      process.env.NODE_ENV === 'development'
        ? 'https://localhost:3000/githubLoginCallback'
        : '',
  },
}
