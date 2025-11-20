const {
  author,
  repository,
  version,
} = require("../package.json");

module.exports = {
  name: "TeleSOVLS",
  namespace: "http://tampermonkey.net/",
  version: version,
  author: author.name,
  description: "TRVE T3L3SOVLS 3XP3RI3NC3",
  source: repository.url,
  match: ["https://telehack.com/"],
  grant: ["none"],
  "run-at": "document-start",
  "inject-into": "page",

};
