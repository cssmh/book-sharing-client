## MBSTU BookHaven

## Live:

### https://bookshare-c1817.web.app

### https://bookhaven1.netlify.app

### https://open-rest.surge.sh

## - Feature of this Project:

1. User signUp with name, photoURL, email password, also can login using google account.
2. Verification email will be sent while new user register. New Register user can't login without email verification.
3. Without login if any user go to private route and will navigate to login page with state of that root he/she wanted to go. But then if that user enter login to register page that state still will be with him/her. And after registration that user can go to that private route for 1.5 second, but then not to make email verification that user gonna redirect to login page.
4. There is also a forgot password option in login page.
5. If user is already logged in will auto redirect to home page while trying to go to login/register page.
6. Awesome Home page with good design having a lot component with aos. Used Lottie Animation for BookHaven icon.
7. Full responsive design for both mobile and Tablet.
8. User can see all Books in all Books page. There is a search Book option in all Books page. User can search by Book name or Provider name.
9. User can add Book, delete, update. while adding a book there is regex for valid phone number. user can't add invalid BD phone number.
10. Duplicate adding Book is not allowed.
11. User can't collect their own book also can't make booking a book more than one time.
12. There is a lot of condition in Book details page, Owner only see Update that book button, "more book of that user" button will shown to other user only if that user added more than one book. Purchase button will not be shown to the owner in book details page.
13. Admin can only delete book from book details page. that button also only shown for admin.
14. If you make book image field empty while adding a book, there will be a default photo added for the book and while updating book details photo url field will be empty every time if it has that default photo url.
15. While sign up there is also a default photo for new user. same condition as book photo updating.
16. Added a view Profile page. there is an option to update username and photo for user. if user make image url field empty it will again set default photo and let the field empty every time, url gonna show only if user set any photo!
17. my booking is which books i booked to get and my pending is if any user booked any of my books.
18. While booking a book there will be showing status: Pending, only that book owner can change it Process and Completed.
19. Added React Spinners, HashLoader and more Awesome react Packages.
20. Counting component in Home page Total User and Book Provider count is Dynamic.
21. Implemented Json Web token for authorization. only logged in user can access his/her own data, not others.
22. Used interceptors, while token expire or any issue with the token user will automatically logout and redirect to login page.
23. There is also an admin dashboard only for admin@admin.com. Other user will auto redirect to home page while accessing this route and see a toast not to enter there.
24. More book of an User page and Admin Page if book length is 0 and 1 then book But more than one then show Books/Providers/Bookings plural form. Just a try.
25. In admin dashboard admin can see Total Books, Total Book Providers, Providers email and Total Bookings also all bookings with their details.
26. AllBookings from database made only admin authorized only. Valid token and valid user but still user can't access that. Implemented admin email condition there in server to access for admin email only.
27. Admin can delete any bookings like completed bookings or all bookings at a time.
28. One user can't update other user's book data using book id from url.
29. User can't delete any book using Postman using id from book details url, there provider email with jwt verification needed to delete. Only admin and that book owner can delete a book.
30. Same allBooking for admin also now only admin can delete. Postman not gonna work there because of jwt verification and query admin email condition.
