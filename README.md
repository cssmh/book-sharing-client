# MBSTU BookHaven (Student Book Sharing Web)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Demo Admin Access

- Email: **admin@mail.com**
- Password: **123456**

## Live Demo

- [BookHaven on Firebase](https://bookshare-c1817.web.app)
- [BookHaven on Netlify](https://bookhaven1.netlify.app)
- [BookHaven on Surge](https://bookhaven.surge.sh)

### Admin Dashboard

![User Dashboard](./src/assets/Screenshot.png)
_Screenshot of the Admin Dashboard showcasing administrative controls and statistics._

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Packages Used](#packages-used)

## Description

MBSTU BookHaven is my university final year project. It allows students to exchange hard-copy books, track borrowing, and review books. The platform includes role-based authentication with JWT, interactive dashboards using React Google Charts, and mobile-friendly design. A feature to prevent duplicate submissions has also been added.

## Features

1. **User Authentication:**

   - Sign up with name, photo URL, email, and password.
   - Log in with email or Google account.
   - Email verification required for new users.
   - Change password and update profile options in the profile section.
   - Users are added to the database with their details and role.

2. **Navigation and Accessibility:**

   - Private route protection and redirection, including admin routes.
   - Forgot password option and password reset.
   - Auto-redirection for logged-in users attempting to access the login/register page.

3. **User Interface:**

   - Responsive design for mobile and tablet devices.
   - AOS animations and Lottie animations for enhanced visuals.
   - Skeleton loaders on the home page and React spinner.

4. **Book Management:**

   - Add, delete, and update books with validation.
   - View all books and search by name, provider, and location.
   - Swipeable book carousel using Swiper React.

5. **User-Specific Features:**

   - User analytics displayed as pie charts.
   - Manage personal book listings and bookings.
   - Profile updates reflected across all user data.
   - Reviews and status updates for booked books.

6. **Admin Capabilities:**

   - Admin dashboard for comprehensive data management.
   - Book and booking deletion capabilities.
   - Ability to upgrade users to admin.
   - Admin routes are protected with JWT and conditions.
   - Admins can access charts, view user book statistics, and perform various management tasks.

7. **Advanced Functionalities:**

   - JWT for secure authorization.
   - React CountUp and Intersection Observer for dynamic counting.
   - A single hook for all TanStack Query operations.
   - Booking status management and duplicate booking prevention.
   - Providers can mark a booking as 'Completed'; other bookings for the same book will be disabled.
   - Pagination integrated with search, maintaining accurate page count and limiting results per page.

8. **New Feature: User Admin Panel**
   - New users are added to the database with all info, including accounts created time, last login and also effect on updating name and image.
   - Users can now be upgraded to admin.
   - Admins cannot downgrade their own role to 'guest' if they are the only admin left.
   - Admins can delete users but cannot delete other admins.
   - **Demo Admin**: Read-only access for `admin@mail.com`. This demo admin can view all data but cannot perform actions like updating or deleting.

## Packages Used

### Dependencies

- [aos](https://www.npmjs.com/package/aos)
- [axios](https://www.npmjs.com/package/axios)
- [firebase](https://www.npmjs.com/package/firebase)
- [flowbite-react](https://www.npmjs.com/package/flowbite-react)
- [lottie-react](https://www.npmjs.com/package/lottie-react)
- [react-countup](https://www.npmjs.com/package/react-countup)
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)
- [react-hot-toast](https://www.npmjs.com/package/react-hot-toast)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-google-charts](https://www.react-google-charts.com/)
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [sweetalert](https://www.npmjs.com/package/sweetalert)
- [swiper](https://www.npmjs.com/package/swiper)

### Dev Dependencies

- [@types/react](https://www.npmjs.com/package/@types/react)
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom)
- [daisyui](https://daisyui.com/docs/install)
- [tailwindcss](https://tailwindcss.com/docs/guides/vite)
- [vite](https://www.npmjs.com/package/vite)
