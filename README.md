# BookRecon

A full-stack mobile app for sharing and discovering book recommendations. Users can sign up, post reviews with ratings and cover images, browse a community feed, and manage their own recommendations from a profile screen.

## Features

- **Authentication** — Register and log in with JWT-based sessions persisted on device
- **Community feed** — Browse book recommendations from all users with pull-to-refresh and infinite scroll
- **Create posts** — Share a book title, star rating, cover image, and review
- **Profile** — View your recommendations and delete posts you own
- **Image uploads** — Cover images are stored on Cloudinary via the API

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Mobile app | Expo 57, React Native, Expo Router, Zustand, TypeScript |
| API | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Media | Cloudinary |

## Project Structure

```
bookapp/
├── bookrecon/          # Expo mobile app (iOS, Android, web)
│   └── src/
│       ├── app/        # File-based routes (auth + tabs)
│       ├── components/
│       ├── constants/
│       └── store/      # Zustand auth state
└── server/             # Express REST API
    └── src/
        ├── config/
        ├── middleware/
        ├── models/
        ├── routes/
        └── utils/
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/)
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for book cover uploads)
- [Expo Go](https://expo.dev/go) on your phone, or Android Studio / Xcode for emulators

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd bookapp
```

### 2. Set up the API

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your values:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
PASSWORD_LENGTH=4

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

MONGO_URI=your_mongo_uri

NODE_ENV=development
```

Start the server:

```bash
node src/index.js
```

The API runs at `http://localhost:5000`.

### 3. Set up the mobile app

```bash
cd ../bookrecon
npm install
```

By default, the app points to the production API at `https://bookrecon.onrender.com`. To use your local server, create a `.env` file in `bookrecon/`:

```env
SERVER_API_URL=http://localhost:5000
```

> When testing on a physical device, replace `localhost` with your machine's local IP address (e.g. `http://192.168.1.10:5000`).

Start the Expo dev server:

```bash
npm start
```

Then press `a` for Android, `i` for iOS, or `w` for web.

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | No | Create a new account |
| `POST` | `/api/auth/login` | No | Log in and receive a JWT |
| `GET` | `/api/books` | No | List all book recommendations (paginated) |
| `GET` | `/api/books/user` | Yes | Get the current user's books |
| `GET` | `/api/books/:id` | No | Get a single book by ID |
| `POST` | `/api/books` | Yes | Create a new recommendation |
| `DELETE` | `/api/books/:id` | Yes | Delete one of your recommendations |

Protected routes require an `Authorization: Bearer <token>` header.

## App Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Login | `/(auth)` | Sign in to your account |
| Sign up | `/(auth)/signup` | Create a new account |
| Home | `/(tabs)` | Community book feed |
| Create | `/(tabs)/create` | Post a new recommendation |
| Profile | `/(tabs)/profile` | Your posts and logout |

## Building for Android

An EAS build profile is included for generating an APK:

```bash
cd bookrecon
npx eas build --platform android --profile preview
```

## Scripts

**Mobile app** (`bookrecon/`)

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo dev server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run web` | Run in the browser |
| `npm run lint` | Run ESLint |

**API** (`server/`)

```bash
node src/index.js
```

## License

See [bookrecon/LICENSE](bookrecon/LICENSE).
