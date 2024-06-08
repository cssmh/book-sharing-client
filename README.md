# MBSTU BookHaven

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
   - Provider marks a booking as 'Completed' other bookings for the same book will be disabled.
   - Implement pagination to seamlessly integrate with search, maintaining accurate page count and limiting results per page.

## Packages Used

### Dependencies

- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)
- [aos](https://www.npmjs.com/package/aos)
- [axios](https://www.npmjs.com/package/axios)
- [firebase](https://www.npmjs.com/package/firebase)
- [flowbite-react](https://www.npmjs.com/package/flowbite-react)
- [lottie-react](https://www.npmjs.com/package/lottie-react)
- [react-countup](https://www.npmjs.com/package/react-countup)
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)
- [react-hot-toast](https://www.npmjs.com/package/react-hot-toast)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer)
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-spinners](https://www.npmjs.com/package/react-spinners)
- [sweetalert](https://www.npmjs.com/package/sweetalert)
- [swiper](https://www.npmjs.com/package/swiper)

### Dev Dependencies

- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom)
- [daisyui](https://daisyui.com/docs/install)
- [tailwindcss](https://tailwindcss.com/docs/guides/vite)
- [vite](https://www.npmjs.com/package/vite)
