# Watchlist App

The **Watchlist App** allows users to search for movies using the [OMDb API](https://www.omdbapi.com/) and save them to a personal watchlist. The app is built using React and Redux, with a responsive design and clean user interface.

## Features

- **Search for Movies**: Search for movies by title using the OMDb API.
- **Movie Details**: View details such as the plot, cast, ratings, and more.
- **Watchlist Management**: Add or remove movies from your personal watchlist.
- **Responsive Design**: Optimized layout for both desktop and mobile screens.
- **Toast Notifications**: Feedback for actions like adding or removing movies.

## Tech Stack

- **React**: Front-end JavaScript framework.
- **Redux**: State management for handling movie data and the watchlist.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Toastify**: For toast notifications.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** or **yarn**: Package managers to install dependencies.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/watchlist-app.git
   cd watchlist-app
   ```

2. **Install dependencies**:

   Using `npm`:

   ```bash
   npm install
   ```

   Or using `yarn`:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add your OMDb API key:

   ```bash
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**:

   Using `npm`:

   ```bash
   npm start
   ```

   Or using `yarn`:

   ```bash
   yarn start
   ```

   The app will be available at `http://localhost:3000`.

### Getting an OMDb API Key

The app uses the OMDb API to retrieve movie data. Follow these steps to obtain an API key:

1. Visit [OMDb API](https://www.omdbapi.com/apikey.aspx).
2. Sign up with your email and requested details.
3. You'll receive an API key via email.
4. Copy the API key and add it to your `.env` file like so:

   ```bash
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```

### Available Scripts

- **`npm start`**: Starts the development server.
- **`npm run build`**: Builds the app for production.
- **`npm test`**: Runs the test suite (if tests are available).
