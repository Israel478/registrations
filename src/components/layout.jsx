import { Outlet, Link } from "react-router-dom";

export default function Layout(){
    return (
      <>
        <nav className="w-full mb-16 flex items-center justify-end gap-8 p-4  bg-cyan-800 text-white">
          <Link
            to="/home"
            className="text-white  hover:underline hover:font-semibold"
          >
            Home
          </Link>
          <Link
            to="/news"
            className="text-white  hover:underline hover:font-semibold"
          >
            News
          </Link>
          <Link
            to="/contact"
            className="text-white  hover:underline hover:font-semibold"
          >
            Contact
          </Link>
          <Link
            to="/registration"
            className="text-white  hover:underline hover:font-semibold"
          >
            Registration
          </Link>
        </nav>
        <Outlet/>
      </>
    );
}