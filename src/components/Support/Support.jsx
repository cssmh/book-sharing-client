import { useState } from 'react';
import { BiSupport } from "react-icons/bi";

const Support = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="z-10 fixed bottom-32 left-6 rounded-full p-3 flex justify-center items-center DZ-bt-support-now text-2xl bg-cyan-400 text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BiSupport />
      {isHovered && <span className="ml-2 text-sm">SUPPORT</span>}
    </div>
  );
};

export default Support;
