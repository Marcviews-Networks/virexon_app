import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Optional: Your public Header / Navbar here */}
      <main>
        <Outlet />
      </main>
      {/* Optional: Your public Footer here */}
    </div>
  );
}
