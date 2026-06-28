import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      
      <h1 className="text-xl font-bold">
        Room Booking
      </h1>

      <div className="flex gap-4 items-center">

        <Link to="/" className="hover:underline">
          Home
        </Link>

        {user ? (
          <>
            <Link to="/my-bookings" className="hover:underline">
              My Bookings
            </Link>

            {user.role === "admin" && (
              <Link to="/admin" className="hover:underline">
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>

            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;