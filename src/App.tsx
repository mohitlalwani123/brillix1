import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import SubjectDetail from './pages/SubjectDetail';
import Faculty from './pages/Faculty';
import StudyMaterials from './pages/StudyMaterials';
import GamesQuiz from './pages/GamesQuiz';
import Community from './pages/Community';
import ParentalControl from './pages/ParentalControl';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:subject" element={<SubjectDetail />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/study-materials" element={<StudyMaterials />} />
          <Route path="/games-quiz" element={<GamesQuiz />} />
          <Route path="/community" element={<Community />} />
          <Route path="/parental-control" element={<ParentalControl />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;