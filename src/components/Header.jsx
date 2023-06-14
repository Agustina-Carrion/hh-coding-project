import React, { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      <nav className="p-2 max-w-2xl mx-auto bg-zinc-300 rounded-full shadow-md lg:flex sm:justify-center space-x-4 hidden">
        {[
          ["Home", "/"],
          ["Photos", "/photos"],
          ["Projects", "/projects"],
          ["About", "/about"],
        ].map(([title, url]) => (
          <Link
            href={url}
            className="rounded-full px-3 py-4 text-4xl text-zinc-700 font-medium hover:bg-slate-100 hover:text-slate-900"
          >
            {title}
          </Link>
        ))}
      </nav>
      {/* hamburger icon in mobile view*/}
      <section className="flex justify-end lg:hidden">
        <div
          className="text-5xl px-8 py-8"
          onClick={() => setMobileNav((prev) => !prev)}
        >
          <i className="fa-solid fa-burger"></i>
        </div>
        {/* if mobile view, then show the showMenuNav or hide it, these are in the style at the bottom*/}
        <div className={mobileNav ? "showMenuNav" : "hideMenuNav"}>
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
                className="rounded-full px-5 py-4 text-4xl text-zinc-700 font-medium hover:bg-slate-200 hover:text-slate-900"
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      {/* the style can be modified later */}
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 50vh;
        top: 0;
        left: 0;
        background: #8d8b8b;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </>
  );
}
