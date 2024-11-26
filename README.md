# Hockey Tracking App

## Overview

This app helps hockey players track their games, stats, expenses, and team details. It includes features such as weather forecasts for upcoming games, player statistics, expenses tracking, team management, and user settings. Below is the detailed breakdown of tasks and how they are implemented.

---

## Features and Implementation

### **Homepage**

#### **Feature Description:**

The homepage displays the user's next game information:

- **Next game details:** Date, time, and location.
- **Incoming weather:** Weather forecast near the game location.
- **Time to leave:** Calculated departure time considering travel time and traffic.
- **Gas cost:** Estimated fuel cost for traveling to the game.

#### **Steps to Implement:**

1. Fetch game details dynamically from the database (e.g., Supabase).
2. Use a weather API (e.g., OpenWeatherMap) to fetch and display weather data.
3. Use a geolocation API (e.g., Google Maps) to calculate travel time and suggest departure time.
4. Estimate gas cost based on distance and predefined fuel prices.

---

### **Stats Page**

#### **Feature Description:**

This page shows individual player statistics, including:

- **Playtime** tracked.
- **Goals**, **assists**, and **second assists**.
- **Points** (Goals + Assists).
- **Penalty minutes (PIM)**.
- Results of the **last 5 games** (final scores).
- Optionally, integrate Strava tracking for game-related activities.

#### **Steps to Implement:**

1. Fetch player stats dynamically from the database.
2. Show stats in a visually appealing format (e.g., cards or tables).
3. Use a charting library (e.g., Chart.js or Recharts) for visualizing trends in stats.
4. Add optional Strava API integration to display activity data.

---

### **Expenses Page**

#### **Feature Description:**

Track and display expenses related to hockey, including:

- **Gas cost** for games.
- **Game fees** or tournament costs.
- **Beer costs** for post-game beverages.
- **Equipment costs**, like sticks or gear.

#### **Steps to Implement:**

1. Create input forms for adding expenses with categories and dates.
2. Fetch expense data from the database and display totals for each category.
3. Provide a breakdown of monthly and yearly expenses.

---

### **Team Page**

#### **Feature Description:**

Manage details about the teams the user plays for, including:

- List of **teams** with names and colors.
- Option to **add new teams** and specify their colors (e.g., White/Black or Home/Away).

#### **Steps to Implement:**

1. Fetch the list of teams from the database.
2. Create a form for adding a new team with fields for name and colors.
3. Display teams dynamically and allow editing/deleting teams.

---

### **Settings Page**

#### **Feature Description:**

Configure global settings for the user:

- **Home address**: Used for travel and arena distance calculations.
- **Recurring playing day**: Set default game day(s).

#### **Steps to Implement:**

1. Fetch user settings from the database and pre-fill fields.
2. Allow users to update their home address and save it securely.
3. Add a dropdown or checkboxes for selecting recurring game days.

---

### **Arena Page**

#### **Feature Description:**

Manage and display details about arenas where the user plays games:

- List of arenas with names and addresses.
- **Distance** from the user's home in kilometers.
- **Travel cost** calculated based on distance and fuel price.

#### **Steps to Implement:**

1. Fetch arena details from the database.
2. Use a geolocation API to calculate distance from the user’s home to the arena.
3. Calculate travel costs dynamically and display alongside arena details.

---

## Project Structure

### **Backend:**

- Use Supabase for the database. Tables needed:
  - `users` (user settings and profiles).
  - `teams` (team details).
  - `games` (game schedules and results).
  - `expenses` (cost tracking).
  - `arenas` (arena details).
- APIs to fetch, update, and delete data for each page.

### **Frontend:**

- Built using React (with Vite).
- Component-based architecture for modularity and reuse.
- Custom hooks (e.g., `useUserSettings`, `useAddressAutocomplete`) for encapsulating logic.
- State management using React Context API or libraries like Zustand if necessary.

### **Styling:**

- TailwindCSS for responsive and consistent design.
- Ensure PWA compatibility for mobile-first usability.

### **Testing:**

- Unit tests for components and hooks.
- Integration tests for APIs.
- End-to-end testing for workflows like adding a new team or submitting expenses.

---

## Getting Started

1. **Setup Environment Variables:**
   - Add necessary API keys (e.g., Weather API, Google Maps API).
   - Configure Supabase credentials in `.env`.

zipalign -v 4 app-release-unsigned.apk app-release-aligned.apk
apksigner sign --ks my-release-key.jks --ks-key-alias my-key --out app-release-signed.apk app-release-aligned.apk
adb install app-release-signed.apk
