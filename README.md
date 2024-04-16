## MBSTU BookHaven

## Live:

### https://bookshare-c1817.web.app

### https://bookhaven1.netlify.app

### https://open-rest.surge.sh

## Features of the Project:

1. Users can sign up with their name, photo URL, email, and password. They can also log in using their Google account.
2. A verification email will be sent when a new user registers. New users cannot log in without email verification.
3. If a user attempts to access a private route without logging in, they will be redirected to the login page with the intended route saved. After registration, the user can access the intended private route for 1.5 seconds, but if email verification is not completed, they will be redirected back to the login page.
4. The login page includes a "forgot password" option.
5. Logged-in users will be automatically redirected to the home page if they attempt to access the login/register page.
6. The home page features a sleek design with various components using AOS. Lottie Animation is used for the BookHaven icon.
7. The design is fully responsive for both mobile and tablet devices.
8. Users can view all books on the "All Books" page and use the search function to find books by name or provider.
9. Users can add, delete, and update books. When adding a book, there is regex validation for a valid phone number, ensuring only valid Bangladeshi phone numbers are accepted.
10. When a user updates their profile photo and name, these changes will automatically reflect across all their book data, including the provider's name and photo.
11. Duplicate book entries are not allowed.
12. Users cannot collect their own books or book a book more than once.
13. The book details page includes various conditions, such as only allowing the owner to update the book and displaying a "More Books of That User" button if the user has more than one book. The purchase button is hidden from the owner on the book details page.
14. Only the admin can delete books from the book details page. That delete button also only shown for admin.
15. If the book image field is left empty when adding a book, a default photo will be added. When updating book details, the photo URL field will be emptied if it contains the default photo URL.
16. A default photo is provided for new users during sign-up, following the same conditions as updating book photos.
17. Added a "View Profile" page. Users have the option to update their username and photo. If a user leaves the image URL field empty, the default photo will be set, and the field will remain empty each time. The URL will only be displayed if the user sets any photo.
18. "My Booking" displays the books the user has booked to receive, while "My Pending" indicates if any user has booked any of the user's books.
19. While booking a book, the status will display as "Pending." Only the book owner can change it to "Process" or "Completed."
20. Added React Spinners, HashLoader, and other awesome React packages.
21. The counting component on the homepage dynamically displays the total number of users and book providers.
22. Implemented JSON Web Token (JWT) for authorization. Only logged-in users can access their own data, not others.
23. Used interceptors to automatically log out users and redirect them to the login page if the token expires or encounters any issues.
24. Created an admin dashboard accessible only to admin@***.com. Other users attempting to access this route will be automatically redirected to the homepage.
25. The "More Books of a User" page and the Admin Page display book details. If the book count is 0 or 1, the page title will be singular ("Book"). If there are more than one book, it will display in plural form ("Books"/"Providers"/"Bookings").
26. In the admin dashboard, the admin can view the total number of books, total number of book providers, and provider emails, along with the count of books each user has added. Each count number serves as a link to see the books added by that user. Additionally, the admin can access total bookings and their details.
27. Access to all bookings from the database is restricted to authorized admins only. Even with a valid token and user credentials, users cannot access this data. The server implements an admin email condition to restrict access to admin emails only.
28. The admin can delete any bookings, including completed bookings, or all bookings at once.
29. Users cannot update other users' book data using the book ID from the URL. Provider validation is applied both server-side and client-side. Postman requests will not work due to JWT token verification during updates.
30. Users cannot delete any book using Postman with the book ID from the book details URL. Provider email and JWT verification are required for deletion. Only the admin and the book owner can delete a book.
31. Similarly, access to all bookings for the admin is restricted. Only the admin can delete bookings. Postman requests will not work due to JWT verification and query conditions restricting access to admin emails.
