import swal from "sweetalert";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import addBook from "../../assets/DataAdd.png";
import SmallLoader from "../../Components/SmallLoader";
import useDataQuery from "../../Hooks/useDataQuery";
import { postBook } from "../../Api/books";
import HavenHelmet from "../../Components/HavenHelmet";

const AddBook = () => {
  const { loading, user } = useAuth();
  const url = `/providers-books?email=${user?.email}`;
  const {
    isLoading,
    data: myBooks = [],
    refetch,
  } = useDataQuery(["myBooks"], url);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleAddBook = async (e) => {
    e.preventDefault();
    const form = e.target;
    const book_name = form.book_name.value;
    if (myBooks.some((myBook) => myBook.book_name === book_name)) {
      return toast.error("You already added this Book!");
    }
    const book_image = form.book_image.value || import.meta.env.VITE_Cover_URL;
    const provider_phone = form.provider_phone.value;
    if (!/^(\+?8801|01)(\d{9})$/.test(provider_phone)) {
      return toast.error("Enter a valid phone number!");
    }

    const BookInformation = {
      book_name,
      book_image,
      provider_name: form.provider_name.value,
      provider_email: form.provider_email.value,
      provider_image: user?.photoURL,
      provider_phone,
      provider_location: form.provider_location.value,
      description: form.description.value,
      added_time: formattedDate,
      book_status: "available",
    };

    try {
      const res = await postBook(BookInformation);
      if (res?.insertedId) {
        swal({
          title: "Thank You!",
          text: `${book_name} added`,
          icon: "success",
          timer: 2000,
        });
        form.reset();
        refetch();
      }
    } catch (error) {
      toast.error("Failed to add the book. Please try again.");
    }
  };

  if (loading || isLoading) return <SmallLoader size={80} />;

  return (
    <div className="mb-8">
      <HavenHelmet title="Add Book" />
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-3 px-1 md:px-0">
        <div className="w-2/3 md:w-[31%]">
          <img
            className="w-[65%] mx-auto"
            src={addBook}
            onContextMenu={(e) => e.preventDefault()}
            alt="Add Book"
          />
        </div>
        <div className="text-center md:w-2/2">
          <h1 className="text-2xl md:text-2xl font-bold mx-2 md:mx-0">
            Add Book to the <span className="text-green-400">Database</span>
          </h1>
          <p className="text-gray-500 mt-2 mx-2 md:mx-0">
            Enter Book details and click Add Book button to add Book <br />
            to the database. Must add your location <br />
            and your Valid Phone number
          </p>
        </div>
      </div>
      <form onSubmit={handleAddBook} className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Name</span>
            </label>
            <input
              type="text"
              name="book_name"
              required
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Image Url</span>
            </label>
            <input
              type="text"
              name="book_image"
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="provider_name"
              readOnly
              defaultValue={user?.displayName}
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              readOnly
              name="provider_email"
              defaultValue={user?.email}
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              required
              name="provider_location"
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              required
              defaultValue={"+880"}
              name="provider_phone"
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="form-control mx-2 lg:mx-0">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            placeholder="Write something about your book..."
            cols="10"
            rows="5"
            className="rounded-2xl border-gray-300 focus:border-transparent"
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary rounded-2xl mx-2 md:mx-0 text-white">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
