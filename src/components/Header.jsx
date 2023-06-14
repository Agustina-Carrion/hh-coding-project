import React, { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      <nav className="px-4 max-w-2xl mx-auto bg-white/90 dark:bg-zinc-800/90 rounded-full shadow-md lg:flex sm:justify-center space-x-4 hidden">
        {[
          ["Home", "/"],
          ["Photos", "/photos"],
          ["Projects", "/projects"],
          ["About", "/about"],
        ].map(([title, url]) => (
          <Link
            href={url}
            className="rounded-full p-2.5 text-2xl text-zinc-700 dark:text-zinc-200 dark:hover:text-killarney-400 font-medium hover:text-killarney-300"
          >
            {title}
          </Link>
        ))}
      </nav>
      {/* hamburger icon in mobile view*/}
      <section className="flex justify-end lg:hidden">
        <div
          className="w-6 h-6 p-2.5"
          onClick={() => setMobileNav((prev) => !prev)}
        >
          <i className="fa-solid fa-burger dark:text-white/90"></i>
        </div>
        {/* if mobile view, then show the showMenuNav or hide it, these are in the style at the bottom*/}
        <div className={mobileNav ? "absolute w-full h-[50vh] top-0 left-0 bg-white/90 z-10 flex flex-col justify-evenly items-center dark:bg-zinc-800/90 " : "hidden"}>
          <div
            className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
            onClick={() => setMobileNav(false)}
          >
            <i className="text-3xl fa-solid fa-arrow-right-from-bracket"></i>
          </div>
          
          <nav className="flex flex-col items-center justify-between min-h-[250px]">
            {[
              ["Home", "/dashboard"],
              ["Photos", "/photos"],
              ["Projects", "/projects"],
              ["About", "/about"],
            ].map(([title, url]) => (
              <Link
                href={url}
                className="rounded-full px-5 py-4 text-2xl text-zinc-700 dark:text-zinc-200 dark:active:text-killarney-400 font-medium active:text-killarney-300"
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
