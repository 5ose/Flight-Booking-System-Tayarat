import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookingHistory from "../pages/BookingHistory";
import EmailVerification from "../pages/EmailVerification";
import NotFound from "../pages/NotFound";


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookings" element={<BookingHistory />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </Router>
  );
}