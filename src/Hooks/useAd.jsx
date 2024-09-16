const useAd = () => {
  const admins = import.meta.env.VITE_admin;
  return admins ? admins.split(",") : [];
};

export default useAd;
