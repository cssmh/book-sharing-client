const HavenFeatures = () => {
  return (
    <>
      <button onClick={() => document.getElementById("my_modal_4").showModal()}>
        <p className="text-green-500">Features of this Web</p>
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="modal-action mt-0">
            <form method="dialog">
              <button className="btn btn-primary text-white btn-sm rounded-lg">
                close
              </button>
            </form>
          </div>
          <p className="py-1">
            1. Users can sign up with their name, photo URL, email, and
            password. They can also log in using their Google account. &quot;
            <br />
            <br />
            2. A verification email will be sent when a new user registers. New
            users cannot log in without email verification. &quot;
            <br />
            <br />
            3. If a user attempts to access a private route without logging in,
            they will be redirected to the login page with the intended route
            saved. After registration, the user can access the intended private
            route for 1.5 seconds, but if email verification is not completed,
            they will be redirected back to the login page. &quot;
            <br />
            <br />
            4. The login page includes a &quot;forgot password&quot; option.
            &quot;
            <br />
            <br />
            5. Logged-in users will be automatically redirected to the home page
            if they attempt to access the login/register page. &quot;
            <br />
            <br />
            6. The home page features a sleek design with various components
            using AOS. Lottie Animation is used for the BookHaven icon. &quot;
            <br />
            <br />
            7. The design is fully responsive for both mobile and tablet
            devices. Added skeleton in Home page popular books while loading.
            &quot;
            <br />
            <br />
            8. Users can view all books on the &quot;All Books&quot; page and
            use the search function to find books by name or provider. &quot;
            <br />
            <br />
            9. Users can add, delete, and update books. When adding a book,
            there is regex validation for a valid phone number, ensuring only
            valid Bangladeshi phone numbers are accepted. &quot;
            <br />
            <br />
            10. On the &lsquo;My Added Books&rsquo; page, users can view the
            books they have added. For each book, they have the option to view
            details, update information, or delete the book. However, if a book
            has been taken by someone and is therefore unavailable, only the
            &lsquo;Details&rsquo; button will be displayed. &quot;
            <br />
            <br />
            11. When a user updates their profile photo and name, these changes
            will automatically reflect across all their book data, including the
            provider&apos;s name and photo. &quot;
            <br />
            <br />
            12. Duplicate book entries are not allowed, and clicking multiple
            times at once will not result in adding multiple book purchase
            requests. &quot;
            <br />
            <br />
            13. Users cannot collect their own books. Each book can only be
            collected by a user once. &quot;
            <br />
            <br />
            14. The book details page includes various conditions, such as only
            allowing the owner to update the book and displaying a &quot;More
            Books of That User&quot; button if the user has more than one book.
            The purchase button is hidden from the owner on the book details
            page. &quot;
            <br />
            <br />
            15. Only the admin can delete books from the book details page, but
            only if the book is available and has not been taken yet.
            Additionally, it mentions that the delete button is only visible to
            the admin. &quot;
            <br />
            <br />
            16. If the book image field is left empty when adding a book, a
            default photo will be added. When updating book details, the photo
            URL field will be emptied if it contains the default photo URL.
            &quot;
            <br />
            <br />
            17. A default photo is provided for new users during sign-up,
            following the same conditions as updating book photos. &quot;
            <br />
            <br />
            18. Added a &quot;View Profile&quot; page. Users have the option to
            update their username and photo. If a user leaves the image URL
            field empty, the default photo will be set, and the field will
            remain empty each time. The URL will only be displayed if the user
            sets any photo. &quot;
            <br />
            <br />
            19. &quot;My Booking&quot; displays the books the user has booked to
            receive, while &quot;My Pending&quot; indicates if any user has
            booked any of the user&apos;s books with booked date and time.
            &quot;
            <br />
            <br />
            20. While booking a book, the status will display as
            &apos;Pending.&apos; Only the book owner can change it to
            &apos;Processing&apos; or &apos;Completed.&apos; However, if a
            provider receives multiple bookings for their book, they can only
            assign it to one user. Therefore, when they mark one user&apos;s
            booking as &apos;Completed,&apos; the buttons for other bookings of
            the same book will be disabled. Other collectors will then see that
            the book has already been taken by someone in their booking.
            <br />
            <br />
            21. While adding a book, a default value of &lsquo;available&rsquo;
            will be assigned to the book status on the server. When a user
            requests a book and the owner sets it from &lsquo;pending&rsquo; to
            &lsquo;completed&rsquo;, the book status will change to
            &lsquo;unavailable&rsquo;. Afterward, other users won&apos;t be able
            to collect that book, and it will indicate that the book has already
            been taken. &quot;
            <br />
            <br />
            22. There will be shown completed date and time while booking
            completed and also Booked date time. &quot;
            <br />
            <br />
            23. Added React Spinners, HashLoader, and other awesome React
            packages. &quot;
            <br />
            <br />
            24. The counting component on the homepage dynamically displays the
            total number of users and book providers. &quot;
            <br />
            <br />
            25. Implemented JSON Web Token (JWT) for authorization. Only
            logged-in users can access their own data, not others. &quot;
            <br />
            <br />
            26. Used interceptors to automatically log out users and redirect
            them to the login page if the token expires or encounters any
            issues. &quot;
            <br />
            <br />
            27. Created an admin dashboard accessible only to admin@***.com.
            Other users attempting to access this route will be automatically
            redirected to the homepage. &quot;
            <br />
            <br />
            28. The &quot;More Books of a User&quot; page and the Admin Page
            display book details. If the book count is 0 or 1, the page title
            will be singular (&quot;Book&quot;). If there are more than one
            book, it will display in plural form
            (&quot;Books&quot;/&quot;Providers&quot;/&quot;Bookings&quot;).
            &quot;
            <br />
            <br />
            29. In the admin dashboard, the admin can view the total number of
            books, total number of book providers, and provider emails, along
            with the count of books each user has added. Each count number
            serves as a link to see the books added by that user. Additionally,
            the admin can access total bookings and their details. &quot;
            <br />
            <br />
            30. Access to all bookings from the database is restricted to
            authorized admins only. Even with a valid token and user
            credentials, users cannot access this data. The server implements an
            admin email condition to restrict access to admin emails only.
            &quot;
            <br />
            <br />
            31. The admin can delete any bookings, including completed bookings,
            or all bookings at once. &quot;
            <br />
            <br />
            32. Users cannot update other users&apos; book data using the book
            ID from the URL. Provider validation is applied both server-side and
            client-side. Postman requests will not work due to JWT token
            verification during updates. &quot;
            <br />
            <br />
            33. Users cannot delete any book using Postman with the book ID from
            the book details URL. Provider email and JWT verification are
            required for deletion. Only the admin and the book owner can delete
            a book. &quot;
            <br />
            <br />
            34. Similarly, access to all bookings for the admin is restricted.
            Only the admin can delete bookings. Postman requests will not work
            due to JWT verification and query conditions restricting access to
            admin emails. &quot;
            <br />
          </p>
        </div>
        <div
          className="modal-backdrop"
          onClick={() => document.getElementById("my_modal_4").close()}
        ></div>
      </dialog>
    </>
  );
};

export default HavenFeatures;
