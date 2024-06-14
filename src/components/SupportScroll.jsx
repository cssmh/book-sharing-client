import { useState, useEffect } from "react";
import { BiSupport } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa";

const SupportScroll = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleSupportClick = () => {
    const email = "mominitmbstu@gmail.com";
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button onClick={handleSupportClick}>
        <div
          className="z-10 fixed bottom-32 left-5 rounded-full p-3 flex justify-center items-center DZ-bt-support-now text-2xl bg-cyan-400 text-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <BiSupport />
          {isHovered && <span className="ml-2 text-sm">SUPPORT</span>}
        </div>
      </button>

      {isVisible && (
        <button onClick={handleScrollToTop}>
          <div className="z-10 fixed bottom-16 left-5 rounded-full p-3 flex justify-center items-center DZ-bt-support-now text-2xl bg-pink-400 text-white">
            <FaArrowUp />
          </div>
        </button>
      )}
    </>
  );
};

export default SupportScroll;
