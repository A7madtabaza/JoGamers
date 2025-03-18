import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (pageId) => {
    setCurrentCategory(pageId);
    setIsOpen(false);
  };

  const pages = [
    { id: "home", name: "Home", link: "/" },
    { id: "about", name: "About", link: "/about" },
    { id: "articles", name: "Articles", link: "/articles" },
    { id: "upcoming-releases", name: "Upcoming Releases", link: "/upcoming-releases" },
    { id: "contact", name: "Contact", link: "/contact" },
  ];

  const authPages = [
    { id: "login", name: "Login", link: "/login" },
    { id: "register", name: "Register", link: "/register" },
  ];

  const userPages = [
    { id: "profile", name: "Profile", link: "/profile" },
    { id: "admin", name: "Admin", link: "/admin" },
    { id: "publisher", name: "Publisher", link: "/publisher" },
    { id: "article-details", name: "Article Details", link: "/article-details" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/40 backdrop-blur-md shadow-lg" : "bg-gray-900/40 backdrop-blur-md"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => handleNavigation("home")}>
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-white">YourSite</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-1">
            {pages.map((page) => (
              <Link
                key={page.id}
                to={page.link}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentCategory === page.id
                    ? "text-[#EB6440] border-b-2 border-[#EB6440]"
                    : "text-white hover:text-[#EB6440] hover:bg-[#D6E4E5]"
                }`}
                onClick={() => handleNavigation(page.id)}
              >
                {page.name}
              </Link>
            ))}
            <div className="relative group ml-2">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-[#EB6440] hover:bg-[#D6E4E5] group-hover:text-[#EB6440]">
                Dashboard
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-[#497174] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                {userPages.map((page) => (
                  <Link
                    key={page.id}
                    to={page.link}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#D6E4E5] hover:text-[#EB6440]"
                    onClick={() => handleNavigation(page.id)}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {authPages.map((page) => (
              <Link
                key={page.id}
                to={page.link}
                className="text-white hover:text-[#EB6440] text-sm font-medium"
                onClick={() => handleNavigation(page.id)}
              >
                {page.name}
              </Link>
            ))}
            <Link to="/profile" onClick={() => handleNavigation("profile")}>
              <button className="p-2 rounded-full text-white hover:text-[#EB6440] hover:bg-[#D6E4E5] transition-colors duration-200">
                <FiUser className="h-5 w-5" />
              </button>
            </Link>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#EB6440] hover:bg-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#EB6440]"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="border-b border-[#497174] pb-2 mb-2">
            {pages.map((page) => (
              <Link
                key={page.id}
                to={page.link}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  currentCategory === page.id
                    ? "text-[#EB6440] bg-[#497174]"
                    : "text-white hover:text-[#EB6440] hover:bg-[#D6E4E5]"
                }`}
                onClick={() => handleNavigation(page.id)}
              >
                {page.name}
              </Link>
            ))}
          </div>

          <div className="border-b border-[#497174] pb-2 mb-2">
            <p className="px-3 text-xs font-semibold text-white uppercase tracking-wider">
              Dashboard
            </p>
            {userPages.map((page) => (
              <Link
                key={page.id}
                to={page.link}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  currentCategory === page.id
                    ? "text-[#EB6440] bg-[#497174]"
                    : "text-white hover:text-[#EB6440] hover:bg-[#D6E4E5]"
                }`}
                onClick={() => handleNavigation(page.id)}
              >
                {page.name}
              </Link>
            ))}
          </div>

          <div>
            <p className="px-3 text-xs font-semibold text-white uppercase tracking-wider">
              Account
            </p>
            {authPages.map((page) => (
              <Link
                key={page.id}
                to={page.link}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  currentCategory === page.id
                    ? "text-[#EB6440] bg-[#497174]"
                    : "text-white hover:text-[#EB6440] hover:bg-[#D6E4E5]"
                }`}
                onClick={() => handleNavigation(page.id)}
              >
                {page.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center mt-4 px-3">
            <Link to="/profile" onClick={() => handleNavigation("profile")}>
              <button className="flex items-center gap-2 p-2 rounded text-white hover:text-[#EB6440] hover:bg-[#D6E4E5]">
                <FiUser className="h-5 w-5" />
                <span>Profile</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
