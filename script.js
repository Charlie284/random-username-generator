let adjectives = [];
let nouns = [];
let verbs = [];

async function loadWordlist(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  const text = await res.text();
  return text
    .split("\n")
    .map(w => w.trim().toLowerCase())
    .filter(w => w && !w.startsWith("#"));
}

async function loadAllWordlists() {
  try {
    [adjectives, nouns, verbs] = await Promise.all([
      loadWordlist("adjectives.txt"),
      loadWordlist("nouns.txt"),
      loadWordlist("verbs.txt")
    ]);

    generateUsername();
  } catch (err) {
    console.error(err);
    document.getElementById("username").textContent = "error";
  }
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsername() {
  if (!adjectives.length || !nouns.length) {
    return;
  }

  const style = Math.random();

  let name;
  if (style < 0.6) {
    name = randomItem(adjectives) + randomItem(nouns);
  } else if (style < 0.85) {
    name =
      randomItem(adjectives) +
      randomItem(nouns) +
      randomItem(verbs);
  } else {
    name = randomItem([...adjectives, ...nouns]);
  }

  document.getElementById("username").textContent = name;
}

document.getElementById("generate").addEventListener("click", generateUsername);

loadAllWordlists();
