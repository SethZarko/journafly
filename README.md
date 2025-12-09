# JournaFly

A simple journaling app built with <span style="color: #61DBFB; font-weight: 600">React</span>/<span style="color: #3178C6; font-weight: 600">TypeScript</span> and <span style="color: crimson; font-weight: 600">React Router</span> that allows you to create, edit, and view journal entries, with localStorage persistence.

## Tech Stack

<div style="width: 170px; display: flex; align-items: center; justify-content: space-between;">
- TypeScript: <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" style="width: 20px; heigh: 20px; cover: object-fit; padding: 12px;">
</div>
<div style="width: 170px; display: flex; align-items: center; justify-content: space-between;">
- React: <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" style="width: 20px; heigh: 20px; cover: object-fit; padding: 12px;">
</div>
<div style="width: 173px; display: flex; align-items: center; justify-content: space-between;">
- React Router: <img src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fr5nog298592rqgj6yj8n.png" style="width: 25px; heigh: 20px; cover: object-fit; padding: 12px;">
</div>
<div style="width: 177px; display: flex; align-items: center; justify-content: space-between;">
- SCSS: <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg" style="width: 30px; heigh: 20px; cover: object-fit; padding: 12px;">
</div>


## Features

- Fetch Philosopher quotes from <a href="https://philosophersapi.com/" target="_blank" rel="noopener noreferrer">**Philosopher API**</a> for inspiration
- **Add** new journal entries (title and entry)  
- When adding or updating an entry, the character count of the entry field is tracked
- **Edit** or **Delete** existing entries
- Data is saved to `localStorage` and persists between page reloads  
- Entries by default are sorted by date (newest first)
- Uses TanStack Virtualizer for Infinite Scroll on the All Journals page
- Responsive UI  

## Motivation
My motivation in building this project was two-fold. One, to deepen my understanding of Typescript, React and React Router. Two, as somone with a philosophy degree, I wanted to make a simple app that inspires and interests users in philosophy and to jot their immediate thoughts down as quick notes on the fly. 

## Lessons Leanred

Some highlights I learned working on this project:

- Creating a single source of truth in `App.tsx` `state`
- Also utilizing local component `state` when effective, i.e, such as for forms and search or fetching functionality.
- Using boolean `state` to conditionally render different views, triggered by `onClicks`
- For simple global `state` access, the `useOutletContext` hook in `React Router` was effective for this build
- Use of loading and error `state` to provide UX/UI indications to users
- Reading from, creating, and updating the application's central `state`, synchronously with `localStorage` within `App.tsx`
- Using `switch/case` statements where applicable for multivarious options exist. 
- Array sorting in React with `useMemo` for performance and working on a shallow copy (so the original state remains immutable). Journal entries store their dates as ISO-8601 strings via `toISOString()`, and sorting converts them to millisecond timestamps via `getTime()`, ensuring correct chronological order regardless of locale or timezone differences.
- Utilizing `useParams` to get the current journal from `state` using the `.find()` method to compare the `id` passed via the route with the specific journal `id` in order to display a single journal entry. (*Important Note* - using `useLocation` and `location.state` with `Link` `state` objects can be viable for read only components, but, does not work if updating functionality is needed, as the snapshot provided by `Link` `state` is not synchronous with the application's central `state` and becomes stale after updating the central `state`).

## Possible Future Features

- Associate or link journal entries with the specific inripirational quote and philosopher that the user was currently looking at when they decided to make a journal entry.
- Add a proper backend framework and database
- Potentially add authentication and authorization
- Add protected user profiles 
- Add journal sharing 
- Improve design and aesthetic to be more inspiring, and philosophy related
- Slowly add more Philosophers

## Possible Refactors / TODOs
- Refactor `state management` pattern in `App.tsx` to use a `localStorage` custom hook.
- Clean up and better organize Types and Interfaces
- Add Accessibility and Unit Tests
- Upgrade to Toast message render from window.confirm for better UX/UI when deleting an entry
<hr/>

### Mics Notes
This project is linked on my developer resume:
<a href="https://www.sethsellslondon.com/" target="_blank" rel="noopener noreferrer">Online Resume</a>


