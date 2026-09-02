const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");

function loadGenerator(fetchImpl = async () => ({ ok: true, text: async () => "" })) {
  const context = vm.createContext({
    console: { error() {} },
    fetch: fetchImpl,
    Math,
    Promise,
    document: {
      getElementById: () => ({ addEventListener() {}, textContent: "" }),
    },
  });
  const source = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
  vm.runInContext(source, context);
  return context;
}

test("word-list parsing removes comments, blanks, case differences, and duplicates", async () => {
  const context = loadGenerator(async () => ({
    ok: true,
    text: async () => "Bright\n# ignored\nbright\n\nCalm\n",
  }));

  const words = await context.loadWordlist("words.txt");

  assert.deepEqual(Array.from(words), ["bright", "calm"]);
});

test("a failed word-list request identifies the file", async () => {
  const context = loadGenerator(async () => ({ ok: false }));

  await assert.rejects(context.loadWordlist("missing.txt"), /missing\.txt/);
});

test("selecting from an empty word list fails explicitly", () => {
  const context = loadGenerator();

  assert.throws(() => context.randomItem([]), /empty word list/i);
});
