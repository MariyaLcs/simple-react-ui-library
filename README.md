# Simple React UI Library

A small component library built with **React + TypeScript** and documented in [**Storybook**](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/).  
It includes a `Notification` molecule, a `NotificationList` organism, and a `NotificationScreen` connected to a Redux store. Stories are mocked with **MSW** and verified with **Chromatic** visual tests.

## Live Storybook

- **Chromatic**: https://www.chromatic.com/library?appId=6899a9c29f133ea45a4e8f68

## Highlights

- ✅ Storybook 8 (React + Vite) with CSF stories
- ✅ Component hierarchy: **atoms → molecules → organisms → screens**
- ✅ **Redux Toolkit** store for the screen; action callbacks in stories for molecules
- ✅ **MSW** per-story API mocking (Default + Error states)
- ✅ **play()** interaction test (Mark Read → Mark Unread)
- ✅ **Chromatic** deploy + visual regression checks via GitHub Actions

## Tech Stack

- React 18, TypeScript, Vite
- Storybook 8, MSW, Storybook Test Runner (play functions)
- Redux Toolkit
- Chromatic (hosted Storybook + visual tests)

## Quick start

```bash
# install
yarn

# run the component library locally
yarn storybook

# app preview (optional, if you render the screen in App.tsx)
yarn dev
```

## Scripts

```bash
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "test-storybook": "test-storybook",
  "init-msw": "msw init public/",
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "chromatic": "npx chromatic"
}
```

The Chromatic token is provided via GitHub Actions secrets.

## Structure

```bash
src/
  components/
    atoms/
      Button/
    molecules/
      Notification/
    organisms/
      NotificationList/
    screens/
      NotificationScreen.tsx
  lib/
    store.ts            # RTK slice + async thunk (fetchNotifications)
  types.ts
.storybook/
  main.ts               # addons incl. msw-storybook-addon
  preview.ts            # initialize MSW + mswLoader
.github/
  workflows/
    chromatic.yml       # deploy Storybook to Chromatic
```

## Testing in Storybook

- **Mocking** — stories use `parameters.msw.handlers` to intercept `fetch` and return deterministic data.
- **Interactions** — `play()` simulates clicks (e.g., “Mark Read”) and asserts the UI change.
- **Visual tests** — Chromatic creates screenshots for every story and flags pixel diffs on PRs.

## CI / Deploy

- GitHub Action (`.github/workflows/chromatic.yml`) runs on push/PR:
  - installs deps → builds Storybook → uploads to Chromatic
  - runs visual regression checks
- Published builds appear on your Chromatic project page (link from the Action **“View build”**).

## Notes

- `storybook-static/` is a build artifact and is **ignored** via `.gitignore`.
- In Storybook, **MSW** fakes the network so the thunk follows the **same code path** as production without calling real APIs.

## Roadmap

- [ ] More interaction tests (dismiss, ordering)
- [ ] Theme **variables / design tokens**
- [ ] **PoC: Figma integration** (e.g., sync or reference tokens, design handoff)
