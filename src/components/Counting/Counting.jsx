import { useEffect, useState } from "react";
import pencil from "../../assets/pencil.jpg";
import axios from "axios";

const Counting = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allBooks")
      .then((res) => setAllBooks(res.data.result));
  }, []);

  // finding total book provider
  const emails = allBooks.map((book) => book.book_provider_email);
  const filterUniqueEmails = (emails) => {
    const uniqueEmails = [];
    const seen = new Set();

    emails.forEach((email) => {
      if (!seen.has(email)) {
        uniqueEmails.push(email);
        seen.add(email);
      }
    });

    return uniqueEmails;
  };

  const uniqueEmails = filterUniqueEmails(emails);
  console.log(uniqueEmails);
  // console.log(uniqueGmail.length);
  // finding total book provider end

  return (
    <div
      className="hero min-h-[30vh]"
      style={{
        backgroundImage: `url(${pencil})`,
      }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content text-center text-neutral-content">
        <div
          data-aos="flip-up"
          data-aos-duration="1000"
          className="grid grid-cols-1 md:grid-cols-3 text-4xl gap-8 lg:gap-52"
        >
          <div>
            <p className="text-red-500">Books</p>
            <p className="text-gray-500">{allBooks?.length}</p>
          </div>
          <div>
            <p className="text-green-500">Provider</p>
            <p className="text-gray-500">{uniqueEmails.length}</p>
          </div>
          <div>
            <p className="text-blue-500">Author</p>
            <p className="text-gray-500">{uniqueEmails.length * 2 + 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counting;
