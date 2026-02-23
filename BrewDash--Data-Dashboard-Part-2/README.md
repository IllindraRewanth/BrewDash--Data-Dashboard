# Web Development Project 6 - BrewDash

Submitted by: **Hotragn Pettugani**

This web app: **BrewDash is a comprehensive brewery dashboard that allows users to explore and discover breweries across the United States. It fetches data from the Open Brewery DB API and provides an interactive, visually appealing dashboard with dynamic filters, search functionality, individual detail views, and visual insights via charts.**

Time spent: **7.5 hours** spent in total

---

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays at least 10 unique items, one per row.
  - Each row includes at least two features (e.g., name, type, city, state).
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data**
  - Total number of breweries.
  - Number of microbreweries.
  - Number of brewpubs.
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query.
  - The list of results dynamically updates as the user types into the search bar.
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items using a **different attribute** than the search bar (e.g., brewery type or state).
  - The dashboard dynamically updates based on filter selection.

---

### Project 6 Features

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on a brewery shows more info like address, contact, and website.
  - The same sidebar is displayed in the detail view as in the dashboard.
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  - URLs are dynamic (e.g., `/brewery/:id`) and can be shared/bookmarked.
- [x] **The app includes at least two unique charts developed using the fetched data**
  - Chart 1: Distribution of brewery types (bar chart)
  - Chart 2: Breweries per state (pie or bar chart)

---

## Optional Features

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - Text input for name and city.
  - Dropdown for type and state.
  - Slider for zip code length (as proxy for size).
- [x] The user can enter specific bounds for filter values
- [x] The dashboard contains additional content explaining the data
  - Summary section highlights key trends and insights.
- [x] Users can toggle between different visualizations
  - Toggle button allows switching between brewery type and state-based charts.

---

## Additional Features

- [x] Sidebar navigation with functional links:
  - "Dashboard" for the main view
  - "Search" for advanced filtering
  - "About" to describe the app and data source
- [x] Brewery-themed background and dark mode styling
- [x] Responsive design for both desktop and mobile views
- [x] Clean routing using React Router for navigation and unique detail pages

---

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://github.com/Hotragn/BrewDash--Data-Dashboard-Part-2/blob/main/recording-demop2.gif' title='Video Walkthrough' alt='Video Walkthrough' />

GIF created with **[Licecap]**

<br>
# Try it now: Fingerprint Matcher App
# Live Demo: [https://brewdash-omega.vercel.app/)</br>
---

## Notes

### Challenges Encountered:
- Managing multiple dynamic filters with React state
- Implementing dynamic routing with React Router
- Ensuring responsive and accessible layout across screen sizes

### Solutions:
- Used `useEffect` with dependencies to track real-time updates
- Set up dynamic routing for detail views using `react-router-dom`
- Leveraged Material-UI and custom CSS media queries for responsiveness

---

## License

    Copyright 2025 Hotragn Pettugani

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
