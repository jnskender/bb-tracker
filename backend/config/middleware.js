// file: root_project/config/middleware.js:

module.exports = {
  settings: {
    cors: {
      enabled: true,
      credentials: true,
      origin: ["http://localhost:3000",
      "http://localhost:1337",
      "https://bb-tracker.herokuapp.com",
      "https://musing-nobel-8819d0.netlify.app"]
    },
  }
}