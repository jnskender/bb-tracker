// file: root_project/config/middleware.js:

module.exports = {
  settings: {
    cors: {
      enabled: true,
      credentials: true,
      origin: ["http://localhost:3000", "http://localhost:1337"]
    },
  }
}