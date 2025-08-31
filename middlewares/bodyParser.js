const bodyParser = require("body-parser")

const encoder = new bodyParser.urlencoded()

module.exports = encoder

// Parse incoming request bodies in a middleware before your handlers,availlable under the req.body property.