import axiosSecure from ".";

export const deleteBook = async (id, email) => {
  const { data } = await axiosSecure.delete(`/book/${id}/${email}`);
  return data;
};

export const deleteBooking = async (id, email) => {
  const { data } = await axiosSecure.delete(`/booking/${id}/${email}`);
  return data;
};

export const deleteAllBookings = async () => {
  const { data } = await axiosSecure.delete("/all-bookings");
  return data;
};

export const deleteEmail = async (id) => {
  const { data } = await axiosSecure.delete(`/email/${id}`);
  return data;
};

export const deleteAllEmails = async () => {
  const { data } = await axiosSecure.delete("/email/all");
  return data;
};
