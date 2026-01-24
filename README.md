# Username Generator

A minimal, client-side username generator built with plain HTML, CSS, and JavaScript.

The page generates a single random username at a time using external wordlists and a simple, focused interface.

## Features
- One-click username generation
- Large, readable username display
- Clean dark UI
- Uses separate wordlist files for easy expansion
- Fully client-side, no backend, no tracking

## How it works
The generator randomly combines words from:
- `adjectives.txt`
- `nouns.txt`
- `verbs.txt`

The wordlists are loaded at runtime using `fetch`, then combined using a few simple patterns to create readable usernames.

## File structure
