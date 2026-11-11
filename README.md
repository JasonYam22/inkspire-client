# Inkspire (frontend)

An app for tracking tattoo ideas. You can keep ideas private or share them in Explore.

## Info

- [Live demo](https://inkspire-client.vercel.app/)
- [Backend repo and setup](https://github.com/JasonYam22/inkspire-backend)

## Features

- Sign up with email or log in with Google.
- Create, edit, and delete your tattoo ideas. You can add a photo and mark ideas as favorites.
- Browse and comment on public ideas. Save ideas you like to your Collection.
- Update your profile picture. Artists can also add a short bio.

## Tech stack

React, TypeScript, Vite, Tailwind CSS, React Router, and Axios.

## Getting started

1. Clone this repo and open the `inkspire-client` folder.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `VITE_SERVER_URL=http://localhost:5005`.
4. Start the backend using its [setup instructions](https://github.com/JasonYam22/inkspire-backend).
5. Run `npm run dev` and open the local URL Vite prints.

## How it works

When you heart an idea in Explore, React sends a request to the Express API. The backend saves the idea to your Collection in PostgreSQL, and the page updates the heart.

## What I'd improve next

- Add a demo account with a few sample tattoo ideas.
- Add tests for creating ideas and saving them to Collection.
