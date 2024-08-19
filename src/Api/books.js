import axiosSecure from ".";

export const postBook = async (BookInformation) => {
  const { data } = await axiosSecure.post("/book", BookInformation);
  return data;
};

// get all books
export const getAllBooks = async (page = 1, limit = 1) => {
  const url = `/all-books?page=${page}&limit=${limit}`;
  const { data } = await axiosSecure(url);
  return data;
};

export const getBookProviders = async () => {
  const { data } = await axiosSecure("/book-providers");
  return data;
};

export const getUnavailableIds = async (email) => {
  const { data } = await axiosSecure(`/unavailable-ids?email=${email}`);
  return data;
};

export const getEmails = async () => {
  const { data } = await axiosSecure("/emails");
  return data;
};

// post email
export const postEmail = async (email) => {
  const { data } = await axiosSecure.post("/email", { email });
  return data;
};
