## MBSTU BookHaven

## Live:

### https://bookshare-c1817.web.app

### https://bookhaven1.netlify.app

### https://open-rest.surge.sh

## Features of the Project:

1. Users can sign up with their name, photo URL, email, and password. They can also log in using their Google account.
2. A verification email will be sent when a new user registers. New users cannot log in without email verification. Additionally, the password and confirm password fields have been added with onchange matching and requirements.
3. If a user attempts to access a private route without logging in, they will be redirected to the login page with the intended route saved. After registration, the user can access the intended private route for 1.5 seconds, but if email verification is not completed, they will be redirected back to the login page.
4. The login page includes a "forgot password" option.
5. Logged-in users will be automatically redirected to the home page if they attempt to access the login/register page.
6. The home page features a sleek design with various components using AOS. Lottie Animation is used for the BookHaven icon, and a cart button displaying the number of my bookings is also added in navbar.
7. The design is fully responsive for both mobile and tablet devices. Added skeleton in Home page popular books while loading.
8. Popular Books include swiper react and made books swipe to make more attractive.
9. Users can view all books on the "All Books" page and use the search function to find books by name or provider.
10. Users can add, delete, and update books. When adding a book, there is regex validation for a valid phone number, ensuring only valid Bangladeshi phone numbers are accepted.
11. On the 'My Added Books' page, users can view the books they have added. For each book, they have the option to view details, update information, or delete the book. However, if a book has been taken by someone and is therefore unavailable, only the 'Details' button will be displayed.
12. When a user updates their profile photo and name, these changes will automatically reflect across all their book data, including the provider's name and photo.
13. User react-countup and react-intersection-observer package in Count component to count the number everytime it scroll down.
14. Duplicate book entries are not allowed, and clicking multiple times at once will not result in adding multiple book purchase requests.
15. Users cannot collect their own books. Each book can only be collected by a user once.
16. The book details page includes various conditions, such as only allowing the owner to update the book and displaying a "More Books of That User" button if the user has more than one book. The purchase button is hidden from the owner on the book details page.
17. Only the admin can delete books from the book details page, but only if the book is available and has not been taken yet. Additionally, it mentions that the delete button is only visible to the admin.
18. If the book image field is left empty when adding a book, a default photo will be added. When updating book details, the photo URL field will be emptied if it contains the default photo URL.
19. A default photo is provided for new users during sign-up, following the same conditions as updating book photos.
20. Added a "View Profile" page. Users have the option to update their username and photo. If a user leaves the image URL field empty, the default photo will be set, and the field will remain empty each time. The URL will only be displayed if the user sets any photo.
21. "My Booking" displays the books the user has booked to receive, while "My Pending" indicates if any user has booked any of the user's books with booked date and time.
22. While booking a book, the status will display as 'Pending.' Only the book owner can change it to 'Processing' or 'Completed.' However, if a provider receives multiple bookings for their book, they can only assign it to one user. Therefore, when they mark one user's booking as 'Completed,' the buttons for other bookings of the same book will be disabled. Other collectors will then see that the book has already been taken by someone in their booking.
23. While booking a book, the booking date and time will be added in BD format. After completing the booking, the completion date and time will also be added in BD format, and the book provider cannot update or delete that book from MyBooks after completion.
24. After completing a booking, the collector/user can give a review for that book once, and the review will be added to the book details page with a note that the book is unavailable to collect.
25. While adding a book, a default value of 'available' will be assigned to the book status on the server. When a user requests a book and the owner sets it from 'pending' to 'completed', the book status will change to 'unavailable'. Afterward, other users won't be able to collect that book, and it will indicate that the book has already been taken.
26. There will be shown completed date and time while booking completed and also Booked date time.
27. Added React Spinners, HashLoader, and other awesome React packages.
28. The counting component on the homepage dynamically displays the total number of users and book providers.
29. Implemented JSON Web Token (JWT) for authorization. Only logged-in users can access their own data, including the delete option. Additionally, TanStack Query is used in most components to load data.
30. Used interceptors to automatically log out users and redirect them to the login page if the token expires or encounters any issues.
31. Created an admin dashboard accessible only to admin@\*\*\*.com. Other users attempting to access this route will be automatically redirected to the homepage.
32. The "More Books of a User" page and the Admin Page display book details. If the book count is 0 or 1, the page title will be singular ("Book"). If there are more than one book, it will display in plural form ("Books"/"Providers"/"Bookings").
33. In the admin dashboard, the admin can view the total number of books, total number of book providers, and provider emails, along with the count of books each user has added. Each count number serves as a link to see the books added by that user. Additionally, the admin can access total bookings and their details.
34. Access to all bookings from the database is restricted to authorized admins only. Even with a valid token and user credentials, users cannot access this data. The server implements an admin email condition to restrict access to admin emails only.
35. The admin can delete any bookings, including completed bookings, or all bookings at once.
36. Users cannot update other users' book data using the book ID from the URL. Provider validation is applied both server-side and client-side. Postman requests will not work due to JWT token verification during updates.
37. Users cannot delete any book using Postman with the book ID from the book details URL. Provider email and JWT verification are required for deletion. Only the admin and the book owner can delete a book.
38. Similarly, access to all bookings for the admin is restricted. Only the admin can delete bookings. Postman requests will not work due to JWT verification and query conditions restricting access to admin emails.
