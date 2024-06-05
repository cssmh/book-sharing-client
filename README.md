# MBSTU BookHaven <img alt="" src="https://raw.githubusercontent.com/cssmh/book-sharing-client/main/src/assets/Favicon.png" width="450" height="70" style="max-width: 100%;">

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Live Demo

- [BookHaven on Firebase](https://bookshare-c1817.web.app)
- [BookHaven on Netlify](https://bookhaven1.netlify.app)
- [BookHaven on Surge](https://open-rest.surge.sh)

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Credits](#credits)
- [Packages Used](#packages-used)

## Description

MBSTU BookHaven is a comprehensive platform for book sharing, enabling users to sign up, add, manage, and book books efficiently. It incorporates various features to ensure a seamless and user-friendly experience.

## Features

1. **User Authentication:**
   - Sign up with name, photo URL, email, and password.
   - Login with email or Google account.
   - Email verification required for new users.
   - Password matching and validation during registration.

2. **Navigation and Accessibility:**
   - Private route protection and redirection.
   - Forgot password option.
   - Auto-redirection for logged-in users attempting to access the login/register page.

3. **User Interface:**
   - Responsive design for mobile and tablet.
   - AOS animations and Lottie Animation for enhanced visuals.
   - Skeleton loaders on the home page.

4. **Book Management:**
   - Add, delete, and update books with validation.
   - View all books and search by name or provider.
   - Swipeable book carousel using Swiper React.

5. **User-Specific Features:**
   - Manage personal book listings and bookings.
   - Profile updates reflected across all user data.
   - Reviews and status updates for booked books.

6. **Admin Capabilities:**
   - Admin dashboard for comprehensive data management.
   - Book and booking deletion capabilities.

7. **Advanced Functionalities:**
   - JWT for secure authorization.
   - React CountUp and Intersection Observer for dynamic counting.
   - Booking status management and duplicate booking prevention.

## Credits

This project was created by [Md. Momin Hossain](https://github.com/cssmh).

## Packages Used

### Dependencies

- @tanstack/react-query
- aos
- axios
- firebase
- flowbite-react
- lottie-react
- react-countup
- react-helmet-async
- react-hot-toast
- react-icons
- react-intersection-observer
- react-loader-spinner
- react-router-dom
- react-spinners
- sweetalert
- swiper

### Dev Dependencies

- @types/react-dom
- daisyui
- tailwindcss
- vite
