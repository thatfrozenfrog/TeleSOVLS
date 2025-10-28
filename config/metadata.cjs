const {
  author,
  repository,
  version,
} = require("../package.json");

module.exports = {
  name: "TOTAL TELEHACK DEATH",
  namespace: "http://tampermonkey.net/",
  version: version,
  author: author.name,
  description: "Something something quelque chose o algo",
  source: repository.url,
  match: ["https://telehack.com/*"],
  grant: ["none"],
  "run-at": "document-idle",
};
