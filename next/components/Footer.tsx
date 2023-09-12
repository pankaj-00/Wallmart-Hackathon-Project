import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="w-full bg-[#0072E1] mt-20 flex justify-center text-white py-2 text-l font-normal space-x-4">
        Copyright @{year}
      </div>
    </>
  );
};

export default Footer;
