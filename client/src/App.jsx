import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages';
import DetailCampaign from './pages/detailCampaign';
import Footer from './components/Footer';
import DonationPage from './pages/DonationPage';

function App() {

  return (
    <>
    <Router>
      <header className="fixed top-0 z-50 w-full">
        <Navbar />
      </header>
      <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detailcampaign/:id" element={<DetailCampaign />} />
        <Route path="/donation/:id" element={<DonationPage />} />
      </Routes>
      </main>
      <Footer />
    </Router>
    </>
  )
}

export default App
