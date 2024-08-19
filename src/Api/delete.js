import axiosSecure from ".";

export const deleteBook = async (id, email) => {
  const { data } = await axiosSecure.delete(`/book/${id}/${email}`);
  return data;
};
