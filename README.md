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
9. User can't collect their own book also can't collect a book more than one time.
10. If you make book image field empty while adding a book, there will be added a default photo for the book and while updating book details photo url field will be empty if it has default photo.
11. While sign up there is also a default photo for new user.
12. Added a view Profile page. there is an option to update username and photo for user. Here also if user make image url field empty it will again set default photo and let the field empty not that default photo url, url gonna show only if user set any photo!
13. In dashboard you can to see my added books, my booking and my pending.
14. my booking is which books i booked to get and my pending is if any user booked any of my books.
15. While booking a book there will be showing status: pending, only that book owner can change it.
16. Added React Spinners, HashLoader for outlet while it is idle.
17. Implemented Json Web token for authorization. only logged in user can access his/her own data, not others.
18. There is also an admin dashboard only for admin@admin.com. Other user will auto redirect to home page while accessing this route.
19. In admin dashboard admin can see how many books added and all bookings with bookings details.
20. AllBookings from database only admin authorized only. Valid token valid user can't access that. Implemented admin email condition there in server.
21. Admin can delete completed bookings also can delete any bookings if he want.
22. In Book Details page of any Book there is also a delete option for that book only visible for admin.
kala