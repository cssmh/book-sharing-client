import axiosSecure from ".";

export const getBookings = async (email) => {
  const { data } = await axiosSecure(`/my-bookings?email=${email}`);
  return data;
};

// for myPendingCard
export const updateBookingStatus = async (id, email, updatedPendingStatus) => {
  const { data } = await axiosSecure.put(`/booking-status/${id}/${email}`, {
    updatedPendingStatus,
  });
  return data;
};

export const updateBookStatus = async (id, email, bookStatus) => {
  const { data } = await axiosSecure.put(`/book-status/${id}/${email}`, {
    bookStatus,
  });
  return data;
};

export const addTimeBooking = async (id, email, todayDateTime) => {
  const { data } = await axiosSecure.put(`/add-time/${id}/${email}`, {
    todayDateTime,
  });
  return data;
};
// for myPendingCard end
