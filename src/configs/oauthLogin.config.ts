export default {
  github: {
    clientId: '7d2c51f4e42637217f96',
    oauthUrl: 'https://github.com/login/oauth/authorize',
    redirectUri:
      process.env.NODE_ENV === 'development'
        ? 'https://localhost:3000/githubLoginCallback'
        : '',
  },
  qq: {
    jsSDKSrc: 'https://connect.qq.com/qc_jssdk.js',
    clientId: '101870667',
    redirectUri:
      process.env.NODE_ENV === 'development'
        ? 'https://localhost:3000/qqLoginCallback'
        : 'https://m.yumecoder.top/qqLoginCallback',
  },
}
