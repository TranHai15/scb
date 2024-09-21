// header

import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="bg-red-200 p-5 text-center m-5">
        <h1 className="text-9xl font-extrabold p-5 text-gray-700 transition-all hover:text-red-400 hover:scale-105 ">
          PCB Checking
        </h1>
        <nav className="flex justify-between items-center mt-8">
          <ul className="flex gap-20 ml-8">
            <li>
              <a
                href="/"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                Home Page
              </a>
            </li>
            <li>
              <a
                href="/userguide"
                target="_blank"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                User Guide
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xl font-medium text-gray-800 hover:text-red-400"
              >
                History Detection
              </a>
            </li>
          </ul>
          <div className="flex gap-5">
            <button
              className="bg-red-100 py-2 px-4 text-lg rounded hover:bg-red-200 transition"
              onClick={() => navigate(`/signup`)}
            >
              Sign up
            </button>
            <button
              className="bg-red-100 py-2 px-4 text-lg rounded hover:bg-red-200 transition"
              onClick={() => navigate(`/login`)}
            >
              Log in
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
