import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/dashboard";
import DetailCampaign from "./pages/campaign/detailCampaign";
import Footer from "./components/Footer";
import DonationPage from "./pages/donations/DonationPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPw from "./components/auth/ForgotPw";
import { HeadProvider } from "react-head";
import About from "./pages/about/About";
import HowItWorks from "./pages/howtWorks/HowItWorks";
import CreateDonation from "./pages/donations/CreateDonation";
import UpdateCampaign from "./pages/campaign/UpdateCampaign";

function App() {
  return (
    <>
      <HeadProvider>
        <Router>
          <header className="fixed top-0 z-50 w-full">
            <Navbar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about/" element={<About />} />
              <Route path="/create-donation" element={<CreateDonation />} />
              <Route path="/updateCampaign/:id" element={<UpdateCampaign />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/detailcampaign/:id" element={<DetailCampaign />} />
              <Route path="/donation/:id" element={<DonationPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-pw" element={<ForgotPw />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </HeadProvider>
    </>
  );
}

export default App;
