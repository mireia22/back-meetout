const serverless = require("serverless-http");
const { api } = require("../../index.js");

const handler = serverless(api);
module.exports = { handler };
