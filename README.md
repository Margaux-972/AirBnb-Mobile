# 🏠 Airbnb Mobile Clone

A React Native (Expo) mobile application that replicates core Airbnb features such as authentication, user profile management, and profile picture upload.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-stucture)
- [Authentication](#authentication)
- [User Profile](#user-profile)
- [Image Handling](#image-handling)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Key Concepts](#key-concepts)
- [Future Improvements](#future-improvements)

## Features

User authentication (sign up / login / logout)
Persistent session (token + userId)
User profile management
Upload or take a profile picture
API integration

## Tech Stack

React Native (Expo)
Expo Router
Axios
AsyncStorage
Expo Image Picker
Context API (AuthContext)
React Hooks

## Project Structure

```
/components
  ├── Input
  ├── LargeInput
  ├── MainButton
  ├── Logo
  └── RedirectButton

/context
  └── AuthContext.js

/screens
  ├── auth
  │   ├── login.js
  │   └── signup.js
  ├── profile
  │   └── index.js

/assets
  └── colors
```

## Authentication

Authentication handled via external API
Token stored using AsyncStorage
Global state managed with AuthContext
Automatic session persistence

## User Profile

Fetch user data from API
Display email, username, and description
Edit profile information
Upload or take profile picture

## Image Handling

Uses expo-image-picker
Supports:

- Gallery selection
- Camera capture

## Installation

- ### install dependencies

yarn install

- ### start the project

yarn start

## Dependencies

- expo
- react-native
- axios
- expo-image-picker
- @react-native-async-storage/async-storage
- expo-router

## Key Concepts

React Hooks (useState, useEffect, useContext)
Context API for global state
API consumption (REST)
FormData for file upload
Mobile navigation with Expo Router
Conditional rendering

## Future Improvements

- Favorites system
- Search & filters
- Dark mode support
