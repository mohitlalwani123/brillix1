import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Subjects from './pages/Subjects';
import SubjectDetail from './pages/SubjectDetail';
import StudyMaterials from './pages/StudyMaterials';
import Flashcards from './pages/Flashcards';
import GamesQuiz from './pages/GamesQuiz';
import Community from './pages/Community';
import ParentalControl from './pages/ParentalControl';
import Contact from './pages/Contact';
import Faculty from './pages/Faculty';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subject" element={<SubjectDetail />} />
            <Route path="/study-materials" element={<StudyMaterials />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/games-quiz" element={<GamesQuiz />} />
            <Route path="/community" element={<Community />} />
            <Route path="/parental-control" element={<ParentalControl />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;