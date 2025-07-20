import React from "react";
import Link from "next/link"; 

const Footer = () => {
  return (
    <div className="items-center flex max-lg:flex-col flex-row justify-between gap-3">
      <p className="text-gray-400">
        © {new Date().getFullYear()} All rights reserved
      </p>

      <div className=" flex gap-5 flex-row max-lg:mx-auto">
         
        <Link
          href="#"
          className="text-gray-400 transition-hover hover:text-white font-mona-sans "
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-gray-400 transition-hover hover:text-white font-mona-sans "
        >
          Support
        </Link>
        <Link
          href="#"
          className="text-gray-400 transition-hover hover:text-white font-mona-sans "
        >
          Terms and Conditions
        </Link>
        <Link
          href="#"
          className="text-gray-400 transition-hover hover:text-white font-mona-sans "
        >
          Privacy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
