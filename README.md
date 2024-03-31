## MBSTU BookHaven

## Live:

### https://bookshare-c1817.web.app

### https://bookhaven1.netlify.app

- Feature of this Project:

1. User signUp with name, photoURL, email password, also can login using google account.
2. Verification email will be sent while new user register. New Register user can't login without email verification.
3. There is also a forgot password option in login page.
4. If user is already logged in will auto redirect to home page if tried to go to login/register page
5. Awesome Home page with good design having a lot component with aos. Used Lottie Animation for BookHaven icon.
6. Full responsive for mobile and Tablet.
7. User can see all Books in all Books page. There is a search Book option in all Books page.
8. User can add Book, delete, update. while adding a book there is regex for valid phone number. user can't add invalid BD phone number.
9. One user can't update other user book data using book id from url
10. User can't collect their own book also can't collect a book more than one time.
11. There is a lot of condition in Book details page, more than one book than "more book of that user" button will show. Purchase button will not be shown to the owner in book details page
12. Update button will be shown that book owner only in every book details page
13. Now every book details page if User added more than one book, there will be a button of "More Books of that user" that will redirect a page and show all books of that user
14. If you make book image field empty while adding a book, there will be added a default photo for the book and while updating book details photo url field will be empty if it has default photo.
15. While sign up there is also a default photo for new user.
16. Added a view Profile page. there is an option to update username and photo for user. Here also if user make image url field empty it will again set default photo and let the field empty not that default photo url, url gonna show only if user set any photo!
17. In dashboard you can to see my added books, my booking and my pending.
18. my booking is which books i booked to get and my pending is if any user booked any of my books.
19. While booking a book there will be showing status: pending, only that book owner can change it.
20. Added React Spinners, HashLoader for outlet while it is idle.
21. Counting component User and Book Provider is Dynamic.
22. Implemented Json Web token for authorization. only logged in user can access his/her own data, not others.
23. Used interceptors, while token expire or any issue user will automatically logout.
24. There is also an admin dashboard only for admin@admin.com. Other user will auto redirect to home page while accessing this route.
25. In admin dashboard admin can see Total Books, Total Book Providers, Providers email and Total Bookings also all bookings with their details.
26. AllBookings from database made only admin authorized only. Valid token and valid user but still user can't access that. Implemented admin email condition there in server to access for admin only.
27. Admin can delete completed bookings also can delete any bookings if he want.
28. In Book Details page of any Book there is also a delete option for that book only visible for admin.
29. Pagination added in all books page. User can also change number of books he/she wants to see in a page.
30. Search system also will work will pagination, search item found will decide pagination.
