import { NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
// import { Button } from "./Button";
import { useState } from "react";
import { Button } from "./webBtn";
import { LogIn } from "./LoginBtn";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Appointment", href: "/appointment" },
    { name: "Hospitals", href: "/hospitals" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-20 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Brand
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between space-x-1">
            <div className="nav-item flex space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
  `relative px-4 py-2 rounded-lg font-medium transition-all duration-300
   flex items-center gap-2
   
   after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
   after:h-1 after:min-w-4/5 after:rounded-full after:transition-all after:duration-300
   ${isActive ? "after:bg-teal-600 after:scale-x-100" : "after:bg-teal-500 after:scale-x-0 hover:after:scale-x-100"}`
}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="hidden md:block">
           <LogIn />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-2 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-600 bg-gray-100 dark:text-blue-400 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Button />
        </div>
      </div>
    </nav>
  );
};
