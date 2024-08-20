import axiosSecure from ".";

// used only in useTanQuery hook
export const getData = async (url) => {
  const { data } = await axiosSecure(url);
  return data;
};

export const getBook = async (id) => {
  const { data } = await axiosSecure(`/book/${id}`);
  return data;
};

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

// update all books
export const updateAllBooks = async (email, booksInfo) => {
  const { data } = await axiosSecure.put(`/my-all-books/${email}`, booksInfo);
  return data;
};

export const updateBook = async (id, email, booksData) => {
  const { data } = await axiosSecure.put(`/book/${id}/${email}`, booksData);
  return data;
};
