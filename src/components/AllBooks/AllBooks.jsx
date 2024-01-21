import allBooks from "../../assets/allbooks.webp";
const AllBooks = () => {
  return (
    <div className="my-8 bg-yellow-100 py-7">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="px-4 md:px-0">
          <h1 className="text-4xl py-4">Best Place for Books Exchange</h1>
          <p>Welcome to Book Sharing website</p>
          <p className="w-96">
            Connect with fellow book lovers worldwide! Share your favorite reads
            and discover new ones. Simply list books you are willing to
            exchange, browse others collections, and arrange swaps. Enhance your
            reading experience with a global community of bibliophiles. Join
            today and unlock a world of literary connections.
          </p>
        </div>
        <img src={allBooks} alt="" />
      </div>
    </div>
  );
};

export default AllBooks;
