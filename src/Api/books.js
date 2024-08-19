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

export const getUnavailableIds = async (email) => {
  const { data } = await axiosSecure(`/unavailable-ids?email=${email}`);
  return data;
};

export const getEmails = async () => {
  const { data } = await axiosSecure("/emails");
  return data;
};
