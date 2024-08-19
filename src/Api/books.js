import axiosSecure from ".";

// get all books
export const getAllBooks = async (page, limit, searchTerm) => {
  const url = `/all-books?page=${page}&limit=${limit}&search=${searchTerm}`;
  const { data } = await axiosSecure(url);
  return data;
};

export const getBookProviders = async () => {
  const { data } = await axiosSecure("/book-providers");
  return data;
};
