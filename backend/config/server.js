module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('HOST_URL', 'http:/localhost:1377'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'd018f35877506b2f19d83ce4d87deba9'),
    },
  },
});
