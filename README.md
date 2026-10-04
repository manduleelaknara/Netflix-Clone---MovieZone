# 🎬 MovieZone - Netflix Clone

## 📖 Overview

MovieZone is a Netflix-style movie streaming web application. Users can create an account, sign in, browse movies by category and watch trailers. Movie data is loaded from the TMDB API, and user accounts are handled with Firebase.

**Live demo:** https://netflix-clone-movie-zone.vercel.app

## ✨ Features

- User sign up, sign in and sign out
- Movie categories: Now Playing, Top Rated, Popular and Upcoming
- Horizontal scrolling of movie rows with the mouse wheel
- Trailer player page
- Error messages using toast notifications
- Automatic redirect: signed-in users go to Home, signed-out users go to Login

## ⚙️ How It Works

```
                 User
                  |
                  v
        React Application (Vite)
                  |
                  v
            React Router
     --------------------------------
     |              |               |
     v              v               v
 Login Page     Home Page      Player Page
     |              |               |
     v              v               v
Firebase Auth   TMDB API        TMDB API
Cloud Firestore (movie lists)   (movie videos)
                                    |
                                    v
                              YouTube Embed
```

- **Login page:** creates and authenticates users with Firebase Authentication and saves user details in Cloud Firestore.
- **Home page:** shows a hero banner and several movie rows, each loaded from a TMDB category.
- **Player page:** fetches the trailer for the selected movie from TMDB and plays it using a YouTube embed.

## 🛠️ Technologies Used

### 💻 Frontend

- React
- Vite
- React Router DOM
- React Toastify
- HTML and CSS

### ☁️ Backend and Services

- Firebase Authentication (user login and registration)
- Cloud Firestore (user data storage)
- TMDB API (movie data and images)

### 🚀 Deployment

- Vercel (hosting)
- GitHub (version control)

## 📁 Project Structure

```
src/
├── assets/            Images, icons and card data
├── components/
│   ├── Footer/
│   ├── Navbar/
│   └── TitleCards/    Movie row component
├── pages/
│   ├── Home/
│   ├── Login/
│   └── Player/        Trailer page
├── App.jsx            Routes and authentication listener
├── firebase.js        Firebase configuration and auth functions
└── main.jsx
```

## 🌐 Deployment

The application is hosted on Vercel and connected to the GitHub repository. Every push to the `main` branch triggers an automatic rebuild and deployment.

- **GitHub Repository:** https://github.com/manduleelaknara/Netflix-Clone---MovieZone
- **Live Demo:** https://netflix-clone-movie-zone.vercel.app

## ⚠️ Known Limitations

- Movie data depends on the availability of the TMDB API.
- Some movies do not have an embeddable trailer.
- Only trailers are available, not full movies.
- Search, My List and user profile features are not implemented.
- Only email and password sign in is supported.

## 👩‍💻 Author

**Mandulee Laknara**
GitHub: [@manduleelaknara](https://github.com/manduleelaknara)