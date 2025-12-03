
# Stockbit React Dev Test – Movie Explorer

A simple movie search app built with **React**, **TypeScript**, **Redux Toolkit**, and **Axios**, consuming data from the [OMDb API](http://www.omdbapi.com).

> API Key used: `21a13816`  
> Example API call:
> `http://www.omdbapi.com/?apikey=21a13816&s=Batman&page=2`

---

## Features

### 1. Display List of Movies
- Users can search movies by keyword.
- Results are shown as cards with:
  - Poster
  - Title
  - Year
  - “View details” link

### 2. Infinite Scroll
- When search results are longer than 5 items, the app:
  - Loads the first page initially.
  - Uses an `IntersectionObserver` on a **sentinel div** at the bottom of the list.
  - Automatically fetches the **next page** (`page + 1`) when the sentinel scrolls into view.
- Implemented manually without third-party libraries.

### 3. Search Movies by Keyword
- Search input at the top of the page.
- Type a keyword and press **Enter** or click **Search**.
- Redux resets the movie state and fetches a new list from OMDb.

### 4. Single Page for Movie Detail
- Clicking **“View details”** on any movie card navigates to `/movie/:imdbID`.
- The page shows:
  - Large poster  
  - Title & year  
  - Genre, Director, Actors  
  - IMDb Rating  
  - Plot summary  

### 5. Movie Poster Popup Modal
- Clicking a poster in the list opens a modal popup.
- Displays a larger version of the poster and the movie title.
- Closed by clicking the backdrop or the close button.

### 6. Autocomplete Searchbox
- Input is debounced using a custom `useDebounce` hook.
- When input length ≥ 3:
  - OMDb is queried for partial matches.
  - Suggestions appear under the search bar.
- Clicking a suggestion triggers a full movie search.

### 7. Unit Tests for Components
Written with **Vitest** and **React Testing Library** for:
- `SearchBar`
- `MoviesList`
- `MovieDetailPage`

Tests include:
- Rendering components
- Input interactions
- Loading states
- Basic DOM assertions

### 8. React Hooks Usage
- `useState`, `useEffect`, `useRef`
- Custom `useDebounce` hook
- Typed `useAppDispatch` / `useAppSelector`
- `IntersectionObserver` implemented manually

---

## Tech Stack

- **React + TypeScript**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **Vitest + React Testing Library**
- **Vite**

---

## Project Structure

```bash
src/
├─ api/
│  └─ omdb.ts              # Axios client & OMDb API functions
├─ store/
│  ├─ index.ts             # Root Redux store
│  ├─ moviesSlice.ts       # Movies list & infinite scroll logic
│  └─ movieDetailSlice.ts  # Single movie detail logic
├─ hooks/
│  ├─ useDebounce.ts       # Custom debounce hook
│  ├─ useInfiniteScroll.ts # Custom infinite scroll hook
│  ├─ useModal.ts          # Custom modal hook
│  └─ useMovieSearchAutocomplete.ts # Custom debounce hook
├─ components/
│  ├─ SearchBar.tsx
│  ├─ AutoCompleteList.tsx
│  ├─ MoviesList.tsx
│  ├─ MovieCard.tsx
│  ├─ MovieCardSkeleton.tsx
│  └─ MovieModal.tsx
├─ pages/
│  ├─ HomePage.tsx
│  └─ MovieDetailPage.tsx
├─ types/
│  ├─ movie.ts
├─ App.tsx
├─ main.tsx
└─ index.css               # Basic styling
```

---

## 🚀 How to Run the App Locally

Follow these steps to run the app on your machine:

### **1. Clone the Repository**

```bash
git clone https://github.com/rizkyr99/movie-app.git
cd movie-app
```

---

### **2. Install Dependencies**

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn
```

---

### **3. Start the Development Server**

If using **Vite**:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

### **4. Run Unit Tests**

```bash
npm test
```

Tests run in watch mode and use Jest + React Testing Library.

---



## Notes

- The OMDb API key is provided for testing only.
- Poster images include a fallback in case the CDN returns 404.
- Infinite scrolling and autocomplete are implemented manually as required.
- Code is structured to keep API, store, UI, and hooks clearly separated.