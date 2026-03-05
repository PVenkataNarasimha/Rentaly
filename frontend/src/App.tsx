import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Topbar from "./components/Topbar/Topbar";
import Header from "./components/Header/Header";
import Features from "./components/Features/Features";
import StatsSection from "./components/StatsSection/StatsSection";
import AdventureSection from "./components/AdventureSection/AdventureSection";
import Carousel from "./components/Carousel/Carousel";
import type { Car } from "./components/Carousel/Carousel";
import NewsPromo from "./components/NewsPromo/NewsPromo";
import Testimonials from "./components/Testimonials/Testimonials";
import Faq from "./components/QandA/qanda";
import Footer from "./components/Footer/Footer";
import QuickBooking from "./components/QuickBooking/QuickBooking";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Booking from "./components/Header/Booking";
import MyBookings from "./components/MyBookings/MyBookings";
import Dashbord from "./components/My_Profile/Dashbord/Dashbord";
import Profile from "./components/My_Profile/Profile/Profile";

import { useAuth } from "./contexts/AuthContext";
import "./App.css";

/* -------------------- PRIVATE ROUTE -------------------- */
const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p className="container">Checking authentication...</p>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/* -------------------- HOME PAGE -------------------- */
const Home = ({ vehicles }: { vehicles: Car[] }) => (
  <>
    <Header />
    <Features />
    <StatsSection />
    <Carousel vehicles={vehicles} />
    <AdventureSection />
    <NewsPromo />
    <Testimonials />
    <Faq />
  </>
);

/* -------------------- APP -------------------- */
function App() {
  const { isAuthenticated } = useAuth();
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/vehicles", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch vehicles");

        const data = await res.json();

        const mappedVehicles: Car[] = data.map(
          (vehicle: any, index: number) => ({
            _id: vehicle._id ?? vehicle.id ?? String(index + 1),
            id: vehicle._id ?? vehicle.id ?? String(index + 1),
            name: vehicle.name,
            price: vehicle.price,
            likes: vehicle.likes ?? 0,
            type: vehicle.type,
            passengers: vehicle.passengers,
            luggage: vehicle.luggage,
            doors: vehicle.doors,
            image: vehicle.image,
          })
        );

        setVehicles(mappedVehicles);
      } catch (error) {
        console.error("Vehicle fetch failed:", error);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={
          loading ? (
            <p className="container">Loading vehicles...</p>
          ) : (
            <Home vehicles={vehicles} />
          )
        } />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/booking"
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          }
        />

        <Route
          path="/mybookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />

        <Route
          path="/quickbooking"
          element={
            <PrivateRoute>
              <QuickBooking vehicles ={vehicles} />
            </PrivateRoute>
          }
        />
        <Route
         path="/dashbord"
          element={
            <PrivateRoute>
              <Dashbord />
            </PrivateRoute>
          }
        />
        <Route path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
