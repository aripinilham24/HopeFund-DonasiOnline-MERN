import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages';
import DetailCampaign from './pages/detailCampaign';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detailcampaign/:id" element={<DetailCampaign />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
