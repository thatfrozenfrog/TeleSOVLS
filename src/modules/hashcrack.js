import crypt from "../modules/crypt.js";
import * as terminal from "../utils/terminal.js";
import * as keyboard from "../utils/keyboard.js";
import wordlist from "../assets/wordlist.txt";
const allWords = wordlist
  .split(/\r?\n/)
  .map((w) => w.trim())
  .filter(Boolean);

const shortlist = allWords.filter((w) => w.length <= 8);
const longlist = allWords.filter((w) => w.length > 8);

export async function crackHash(hash) {
  const salt = hash.slice(0, 2);

  if (hash.length > 13) {
    // Use longlist, only encrypt first 8 characters
    const truncatedHash = hash.slice(0, 13);
    for (const word of longlist) {
      const truncatedWord = word.slice(0, 8);
      const candidate = crypt(truncatedWord, salt);
      if (candidate === truncatedHash) {
        return word;
      }
    }
  } else {
    // Use shortlist as usual
    for (const word of shortlist) {
      const candidate = crypt(word, salt);
      if (candidate === hash) {
        return word;
      }
    }
  }
  return null;
}

export async function crackCurrentHost() {
  console.log("Debug: loaded wordlist with", allWords.length, "words");
  console.log("content: ", allWords.slice(0, 5).join(", "), "...");
  const lines = await keyboard.th_exec(
    "cat /etc/passwd | cut -f1-2 -d: | grep -v :x | tail -1",
  );

  for (const line of lines) {
    const match = line.match(/^([^:]+):([./0-9A-Za-z]+)/);

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
