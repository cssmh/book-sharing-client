import axiosSecure from ".";

// used only in useTanQuery hook
export const getData = async (url) => {
  const { data } = await axiosSecure(url);
  return data;
};
