"use client";

import Link from "next/link";
import Image from "next/image";
import robo from "../../public/service-3.png";
import menu_button from "../../public/menu_button.png";
import user from "../../public/user.png";
import { useState } from "react";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNav = () => {
    setOpenNavigation(!openNavigation);
  };

  return (
    <header
      className={`bg-[#08021b] shadow-lg px-2 lg:px-4 fixed left-0 top-0 z-50 min-h-[7rem] w-full text-white bg-opacity-90 backdrop-blur-sm transition-all duration-300 border-b border-b-black ${
        openNavigation ? "bg-[#08021b]" : "opacity-95 backdrop-blur-sm"
      } `}
    >
      <div className="container mx-auto px-4 py-7">
        <div className="flex flex-wrap justify-between items-center">
          <Link href="/">
            <Image
              src={robo}
              alt="logo"
              className={
                " text-black bg-white rounded-bl-2xl rounded-tr-2xl cursor-pointer size-[3rem] p-1"
              }
            />
          </Link>

          <div>
            <button
              className="text-black p-1 bg-white cursor-pointer ml-auto lg:hidden"
              onClick={toggleNav}
              aria-label={
                openNavigation ? "Close Navigation" : "Open Navigation"
              }
              aria-expanded={openNavigation}
            >
              <Image alt="menu" src={menu_button} />{" "}
            </button>
          </div>

          <nav
            className={`flex flex-col lg:flex-row items-center gap-5 ${
              openNavigation ? "flex" : "hidden"
            } fixed top-[6rem] left-0 right-0 bottom-0 lg:static lg:flex ml-auto gap-8 lg:gap-12 xl:gap-14 z-2 bg-[#08021b] backdrop-blur-sm max-lg:h-[20rem] `}
          >
             <Link
              href="/"
              className="text-gray-300 transition-hover hover:text-white font-mona-sans "
            >
              Home
            </Link>
            <Link
              href="/features"
              className="text-gray-300 transition-hover hover:text-white font-mona-sans "
            >
              Features
            </Link>
            <Link
              href={"/profile"}
              className="text-black bg-white rounded-full p-2 cursor-pointer"
            >
              <Image alt="user" src={user} className="size-[2rem]" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
