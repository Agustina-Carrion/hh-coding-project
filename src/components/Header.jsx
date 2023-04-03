const Header = () => {
  return (
    <nav className="p-2 max-w-sm mx-auto bg-zinc-300 rounded-full shadow-md flex sm:justify-center space-x-4">
      {[
        ["Home", "/dashboard"],
        ["Photos", "/photos"],
        ["Projects", "/projects"],
        ["About", "/about"],
      ].map(([title, url]) => (
        <a
          href={url}
          className="rounded-lg px-3 py-4 text-zinc-700 font-medium hover:bg-slate-100 hover:text-slate-900"
        >
          {title}
        </a>
      ))}
    </nav>
  );
};
export default Header;
