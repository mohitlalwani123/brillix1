import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  Eye,
  EyeOff,
  BookOpen,
  Brain,
  Target,
  Trophy,
  Search,
  Filter,
  Star,
  Clock,
  Shuffle,
  Users,
  Timer,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  SkipForward,
  Play,
  Pause,
  Volume2,
  Settings,
  Lightbulb,
  TrendingUp,
  Award,
  Flame,
  Heart,
  RefreshCw,
} from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  createdBy: string;
  isPublic: boolean;
  createdAt: string;
  studyCount: number;
  rating: number;
  image?: string;
  explanation?: string;
  confidence?: 'easy' | 'medium' | 'hard';
}

interface StudySession {
  totalCards: number;
  currentIndex: number;
  correctAnswers: number;
  timeSpent: number;
  startTime: Date;
}

const Flashcards = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [studyModeType, setStudyModeType] = useState<'flip' | 'swipe' | 'typing' | 'timed' | 'confidence'>('flip');
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [theme, setTheme] = useState('light');
  const [shuffleMode, setShuffleMode] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);
  const [newCard, setNewCard] = useState({
    question: "",
    answer: "",
    subject: "science",
    difficulty: "Medium" as const,
    tags: "",
    isPublic: true,
    image: "",
    explanation: "",
  });

  // Demo flashcards with enhanced data
  const demoFlashcards: Flashcard[] = [
    {
      id: "1",
      question: "What is photosynthesis?",
      answer: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.",
      explanation: "This process occurs in the chloroplasts of plant cells and is essential for life on Earth as it produces oxygen and forms the base of most food chains.",
      subject: "science",
      difficulty: "Medium",
      tags: ["biology", "plants", "energy"],
      createdBy: "Dr. Smith",
      isPublic: true,
      createdAt: "2024-01-15",
      studyCount: 245,
      rating: 4.8,
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "2",
      question: "What is the quadratic formula?",
      answer: "x = (-b ± √(b² - 4ac)) / 2a, where a, b, and c are coefficients of the quadratic equation ax² + bx + c = 0.",
      explanation: "This formula allows you to find the roots (solutions) of any quadratic equation. The discriminant (b² - 4ac) tells you how many real solutions exist.",
      subject: "mathematics",
      difficulty: "Hard",
      tags: ["algebra", "equations", "formula"],
      createdBy: "Prof. Johnson",
      isPublic: true,
      createdAt: "2024-01-14",
      studyCount: 189,
      rating: 4.6,
    },
    {
      id: "3",
      question: "Who was the first President of India?",
      answer: "Dr. Rajendra Prasad was the first President of India, serving from 1950 to 1962.",
      explanation: "Dr. Rajendra Prasad was a key figure in the Indian independence movement and played a crucial role in drafting the Indian Constitution.",
      subject: "social-science",
      difficulty: "Easy",
      tags: ["history", "india", "president"],
      createdBy: "Ms. Patel",
      isPublic: true,
      createdAt: "2024-01-13",
      studyCount: 156,
      rating: 4.9,
    },
    {
      id: "4",
      question: "What is a metaphor?",
      answer: "A metaphor is a figure of speech that compares two unlike things without using 'like' or 'as', stating that one thing is another.",
      explanation: "Metaphors create vivid imagery and help readers understand complex ideas by relating them to familiar concepts. Example: 'Time is money.'",
      subject: "english",
      difficulty: "Medium",
      tags: ["grammar", "literature", "figures of speech"],
      createdBy: "Mrs. Brown",
      isPublic: true,
      createdAt: "2024-01-12",
      studyCount: 203,
      rating: 4.7,
    },
    {
      id: "5",
      question: "What is the chemical formula for water?",
      answer: "H₂O - two hydrogen atoms bonded to one oxygen atom.",
      explanation: "Water is a polar molecule, which gives it unique properties like being able to dissolve many substances and having a high boiling point.",
      subject: "science",
      difficulty: "Easy",
      tags: ["chemistry", "molecules", "basic"],
      createdBy: "Dr. Wilson",
      isPublic: true,
      createdAt: "2024-01-11",
      studyCount: 312,
      rating: 4.9,
    },
    {
      id: "6",
      question: "What is the area of a circle?",
      answer: "A = πr², where r is the radius of the circle and π (pi) ≈ 3.14159.",
      explanation: "This formula calculates the space inside a circle. Pi is the ratio of a circle's circumference to its diameter, approximately 3.14159.",
      subject: "mathematics",
      difficulty: "Medium",
      tags: ["geometry", "area", "circle"],
      createdBy: "Mr. Davis",
      isPublic: true,
      createdAt: "2024-01-10",
      studyCount: 178,
      rating: 4.5,
    },
    {
      id: "7",
      question: "What are the three states of matter?",
      answer: "Solid, liquid, and gas are the three basic states of matter.",
      explanation: "Matter can exist in different states depending on temperature and pressure. Plasma is sometimes considered a fourth state.",
      subject: "science",
      difficulty: "Easy",
      tags: ["physics", "states", "matter"],
      createdBy: "Dr. Lee",
      isPublic: true,
      createdAt: "2024-01-09",
      studyCount: 267,
      rating: 4.8,
    },
    {
      id: "8",
      question: "What is the capital of France?",
      answer: "Paris is the capital and largest city of France.",
      explanation: "Paris is located in northern France and is known for landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
      subject: "social-science",
      difficulty: "Easy",
      tags: ["geography", "capitals", "europe"],
      createdBy: "Ms. Garcia",
      isPublic: true,
      createdAt: "2024-01-08",
      studyCount: 198,
      rating: 4.6,
    },
  ];

  useEffect(() => {
    setFlashcards(demoFlashcards);
    setFilteredCards(demoFlashcards);
  }, []);

  useEffect(() => {
    let filtered = flashcards;

    if (searchTerm) {
      filtered = filtered.filter(
        (card) =>
          card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedSubject !== "all") {
      filtered = filtered.filter((card) => card.subject === selectedSubject);
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((card) => card.difficulty === selectedDifficulty);
    }

    if (shuffleMode) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    setFilteredCards(filtered);
  }, [searchTerm, selectedSubject, selectedDifficulty, flashcards, shuffleMode]);

  // Timer effect for timed mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleCreateCard = () => {
    if (!newCard.question.trim() || !newCard.answer.trim()) return;

    const card: Flashcard = {
      id: Date.now().toString(),
      question: newCard.question,
      answer: newCard.answer,
      explanation: newCard.explanation,
      subject: newCard.subject,
      difficulty: newCard.difficulty,
      tags: newCard.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      createdBy: "You",
      isPublic: newCard.isPublic,
      createdAt: new Date().toISOString().split("T")[0],
      studyCount: 0,
      rating: 0,
      image: newCard.image,
    };

    setFlashcards([card, ...flashcards]);
    setNewCard({
      question: "",
      answer: "",
      subject: "science",
      difficulty: "Medium",
      tags: "",
      isPublic: true,
      image: "",
      explanation: "",
    });
    setActiveTab("browse");
  };

  const startStudyMode = (mode: typeof studyModeType) => {
    if (filteredCards.length === 0) return;
    setStudyModeType(mode);
    setStudyMode(true);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setUserAnswer("");
    setConfidenceLevel(null);
    setShowExplanation(false);
    setStreak(0);
    setStudySession({
      totalCards: filteredCards.length,
      currentIndex: 0,
      correctAnswers: 0,
      timeSpent: 0,
      startTime: new Date(),
    });

    if (mode === 'timed') {
      setTimeLeft(30);
      setIsTimerActive(true);
    }
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
    setShowAnswer(true);
  };

  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
      setUserAnswer("");
      setConfidenceLevel(null);
      setShowExplanation(false);
      
      if (studyModeType === 'timed') {
        setTimeLeft(30);
        setIsTimerActive(true);
      }
    } else {
      setStudyMode(false);
      setIsTimerActive(false);
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
      setUserAnswer("");
      setConfidenceLevel(null);
      setShowExplanation(false);
      
      if (studyModeType === 'timed') {
        setTimeLeft(30);
        setIsTimerActive(true);
      }
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setStreak(streak + 1);
      if (studySession) {
        setStudySession({
          ...studySession,
          correctAnswers: studySession.correctAnswers + 1,
        });
      }
    } else {
      setStreak(0);
    }
    nextCard();
  };

  const handleConfidenceSelect = (level: 'easy' | 'medium' | 'hard') => {
    setConfidenceLevel(level);
    if (level === 'easy') {
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    setTimeout(() => {
      nextCard();
    }, 1000);
  };

  const handleTypingSubmit = () => {
    const currentCard = filteredCards[currentCardIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === currentCard.answer.toLowerCase().trim();
    
    if (isCorrect) {
      setStreak(streak + 1);
      if (studySession) {
        setStudySession({
          ...studySession,
          correctAnswers: studySession.correctAnswers + 1,
        });
      }
    } else {
      setStreak(0);
    }
    
    setShowAnswer(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-learnkins-green-100 text-learnkins-green-800";
      case "Medium":
        return "bg-learnkins-orange-100 text-learnkins-orange-800";
      case "Hard":
        return "bg-learnkins-purple-100 text-learnkins-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "science":
        return "bg-learnkins-purple-500";
      case "mathematics":
        return "bg-learnkins-blue-500";
      case "social-science":
        return "bg-learnkins-green-500";
      case "english":
        return "bg-learnkins-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'neon':
        return 'bg-gradient-to-br from-purple-900 to-blue-900 text-neon-green';
      case 'parchment':
        return 'bg-yellow-50 text-amber-900 border-amber-200';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const tabs = [
    { id: "browse", label: "Browse Cards", icon: <BookOpen className="h-5 w-5" /> },
    { id: "create", label: "Create Card", icon: <Plus className="h-5 w-5" /> },
    { id: "study", label: "Study Modes", icon: <Brain className="h-5 w-5" /> },
    { id: "progress", label: "Progress", icon: <TrendingUp className="h-5 w-5" /> },
  ];

  const studyModes = [
    {
      id: 'flip',
      title: 'Classic Flip Cards',
      description: 'Traditional flashcard experience with smooth flip animations',
      icon: <RotateCcw className="h-8 w-8" />,
      color: 'from-learnkins-blue-500 to-learnkins-blue-600',
    },
    {
      id: 'confidence',
      title: 'Confidence Review',
      description: 'Rate your confidence level for spaced repetition learning',
      icon: <Target className="h-8 w-8" />,
      color: 'from-learnkins-green-500 to-learnkins-green-600',
    },
    {
      id: 'swipe',
      title: 'Swipe Cards',
      description: 'Tinder-style swiping for quick review sessions',
      icon: <Shuffle className="h-8 w-8" />,
      color: 'from-learnkins-purple-500 to-learnkins-purple-600',
    },
    {
      id: 'typing',
      title: 'Type Answer',
      description: 'Type your answers for active recall practice',
      icon: <Edit className="h-8 w-8" />,
      color: 'from-learnkins-orange-500 to-learnkins-orange-600',
    },
    {
      id: 'timed',
      title: 'Timed Challenge',
      description: 'Race against time to improve speed and retention',
      icon: <Timer className="h-8 w-8" />,
      color: 'from-red-500 to-red-600',
    },
  ];

  if (studyMode && filteredCards.length > 0) {
    const currentCard = filteredCards[currentCardIndex];
    
    return (
      <div className={`min-h-screen ${getThemeClasses()} flex items-center justify-center p-4`}>
        <div className="max-w-4xl w-full">
          {/* Study Mode Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold">
                  {studyModes.find(m => m.id === studyModeType)?.title}
                </h2>
                {streak > 0 && (
                  <div className="flex items-center space-x-1 bg-learnkins-orange-100 text-learnkins-orange-800 px-3 py-1 rounded-full">
                    <Flame className="h-4 w-4" />
                    <span className="font-bold">{streak}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setStudyMode(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Exit
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4">
              <span>Card {currentCardIndex + 1} of {filteredCards.length}</span>
              {studySession && (
                <>
                  <span>Correct: {studySession.correctAnswers}</span>
                  <span>Accuracy: {Math.round((studySession.correctAnswers / (currentCardIndex + 1)) * 100)}%</span>
                </>
              )}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-learnkins-gradient h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Timer for Timed Mode */}
          {studyModeType === 'timed' && (
            <div className="text-center mb-6">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                timeLeft <= 10 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                <Timer className="h-4 w-4" />
                <span className="font-bold">{timeLeft}s</span>
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className={`${getThemeClasses()} rounded-2xl shadow-xl p-8 min-h-[500px] flex flex-col justify-center relative overflow-hidden`}>
            {/* Card Image */}
            {currentCard.image && (
              <div className="mb-6">
                <img
                  src={currentCard.image}
                  alt="Flashcard visual"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Subject and Difficulty Tags */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                    currentCard.difficulty
                  )}`}
                >
                  {currentCard.difficulty}
                </span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${getSubjectColor(
                    currentCard.subject
                  )}`}
                >
                  {currentCard.subject}
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4">
                {showAnswer ? "Answer:" : "Question:"}
              </h3>
              <p className="text-xl leading-relaxed">
                {showAnswer ? currentCard.answer : currentCard.question}
              </p>
            </div>

            {/* Typing Mode Input */}
            {studyModeType === 'typing' && !showAnswer && (
              <div className="mb-6">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-learnkins-blue-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleTypingSubmit()}
                />
                <button
                  onClick={handleTypingSubmit}
                  disabled={!userAnswer.trim()}
                  className="mt-4 w-full bg-learnkins-blue-600 text-white py-3 rounded-lg hover:bg-learnkins-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Explanation */}
            {showAnswer && showExplanation && currentCard.explanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Explanation:</span>
                </div>
                <p className="text-blue-700">{currentCard.explanation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              {studyModeType === 'flip' && (
                <>
                  {!showAnswer ? (
                    <button
                      onClick={() => setShowAnswer(true)}
                      className="flex items-center px-8 py-4 bg-learnkins-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      Show Answer
                    </button>
                  ) : (
                    <div className="flex space-x-4">
                      <button
                        onClick={previousCard}
                        disabled={currentCardIndex === 0}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {currentCard.explanation && (
                        <button
                          onClick={() => setShowExplanation(!showExplanation)}
                          className="flex items-center px-6 py-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          {showExplanation ? 'Hide' : 'Show'} Explanation
                        </button>
                      )}
                      <button
                        onClick={nextCard}
                        className="px-6 py-3 bg-learnkins-gradient text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        {currentCardIndex === filteredCards.length - 1 ? "Finish" : "Next"}
                      </button>
                    </div>
                  )}
                </>
              )}

              {studyModeType === 'swipe' && (
                <div className="flex space-x-6">
                  <button
                    onClick={() => handleSwipe('left')}
                    className="flex items-center px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-lg font-semibold"
                  >
                    <XCircle className="h-6 w-6 mr-2" />
                    Need Practice
                  </button>
                  <button
                    onClick={() => handleSwipe('right')}
                    className="flex items-center px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
                  >
                    <CheckCircle className="h-6 w-6 mr-2" />
                    Got It!
                  </button>
                </div>
              )}

              {studyModeType === 'confidence' && showAnswer && !confidenceLevel && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleConfidenceSelect('easy')}
                    className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Easy
                  </button>
                  <button
                    onClick={() => handleConfidenceSelect('medium')}
                    className="flex items-center px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Medium
                  </button>
                  <button
                    onClick={() => handleConfidenceSelect('hard')}
                    className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Hard
                  </button>
                </div>
              )}

              {studyModeType === 'confidence' && !showAnswer && (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="flex items-center px-8 py-4 bg-learnkins-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Show Answer
                </button>
              )}

              {studyModeType === 'timed' && !showAnswer && (
                <button
                  onClick={() => {
                    setIsTimerActive(false);
                    setShowAnswer(true);
                  }}
                  className="flex items-center px-8 py-4 bg-learnkins-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Show Answer
                </button>
              )}

              {studyModeType === 'timed' && showAnswer && (
                <button
                  onClick={nextCard}
                  className="px-8 py-4 bg-learnkins-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
                >
                  {currentCardIndex === filteredCards.length - 1 ? "Finish" : "Next Card"}
                </button>
              )}
            </div>

            {/* Confidence Feedback */}
            {confidenceLevel && (
              <div className="text-center mt-4">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  confidenceLevel === 'easy' ? 'bg-green-100 text-green-800' :
                  confidenceLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  <span>Marked as {confidenceLevel}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-learnkins-blue-900 to-slate-800 text-white py-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-lg mb-6">
            <Link to="/" className="hover:text-learnkins-blue-400 transition-colors">
              Home
            </Link>
            <ArrowRight className="h-5 w-5" />
            <span>Flashcards</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Smart Flashcards</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master any subject with our advanced flashcard system featuring multiple study modes, spaced repetition, and progress tracking
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                label: "Total Cards",
                value: flashcards.length.toString(),
                icon: <BookOpen className="h-8 w-8" />,
                color: "text-learnkins-blue-600",
              },
              {
                label: "Study Sessions",
                value: "1,250+",
                icon: <Brain className="h-8 w-8" />,
                color: "text-learnkins-purple-600",
              },
              {
                label: "Success Rate",
                value: "94%",
                icon: <Target className="h-8 w-8" />,
                color: "text-learnkins-green-600",
              },
              {
                label: "Active Streak",
                value: streak.toString(),
                icon: <Flame className="h-8 w-8" />,
                color: "text-learnkins-orange-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-learnkins-blue-500 text-learnkins-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "browse" && (
            <div>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Browse Flashcards
                  </h2>
                  <p className="text-lg text-gray-600">
                    Discover and study from our collection of flashcards
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShuffleMode(!shuffleMode)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      shuffleMode 
                        ? 'bg-learnkins-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Shuffle className="h-4 w-4 mr-2" />
                    Shuffle
                  </button>
                  <button
                    onClick={() => startStudyMode('flip')}
                    disabled={filteredCards.length === 0}
                    className="flex items-center px-6 py-3 bg-learnkins-gradient text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Quick Study ({filteredCards.length} cards)
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search flashcards..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Subjects</option>
                      <option value="science">Science</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="social-science">Social Science</option>
                      <option value="english">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Levels</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="neon">Neon</option>
                      <option value="parchment">Parchment</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedSubject("all");
                        setSelectedDifficulty("all");
                        setShuffleMode(false);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Flashcards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className={`${getThemeClasses()} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 transform hover:-translate-y-1`}
                  >
                    {card.image && (
                      <img
                        src={card.image}
                        alt="Card visual"
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          card.difficulty
                        )}`}
                      >
                        {card.difficulty}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-learnkins-orange-400 fill-current" />
                        <span className="text-sm text-gray-600">{card.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {card.question}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {card.answer}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {card.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {card.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{card.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>By {card.createdBy}</span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{card.studyCount}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-learnkins-blue-600 text-white py-2 px-3 rounded-lg hover:bg-learnkins-blue-700 transition-colors text-sm">
                        Study
                      </button>
                      <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCards.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No flashcards found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or create a new flashcard
                  </p>
                  <button
                    onClick={() => setActiveTab("create")}
                    className="px-6 py-3 bg-learnkins-gradient text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Create Flashcard
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "create" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create New Flashcard
                </h2>
                <p className="text-lg text-gray-600">
                  Add your own flashcard to help others learn
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-md p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question *
                      </label>
                      <textarea
                        value={newCard.question}
                        onChange={(e) =>
                          setNewCard({ ...newCard, question: e.target.value })
                        }
                        placeholder="Enter your question here..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer *
                      </label>
                      <textarea
                        value={newCard.answer}
                        onChange={(e) =>
                          setNewCard({ ...newCard, answer: e.target.value })
                        }
                        placeholder="Enter the answer here..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Explanation (Optional)
                      </label>
                      <textarea
                        value={newCard.explanation}
                        onChange={(e) =>
                          setNewCard({ ...newCard, explanation: e.target.value })
                        }
                        placeholder="Add additional explanation or context..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={newCard.image}
                        onChange={(e) =>
                          setNewCard({ ...newCard, image: e.target.value })
                        }
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <select
                          value={newCard.subject}
                          onChange={(e) =>
                            setNewCard({ ...newCard, subject: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                        >
                          <option value="science">Science</option>
                          <option value="mathematics">Mathematics</option>
                          <option value="social-science">Social Science</option>
                          <option value="english">English</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Difficulty
                        </label>
                        <select
                          value={newCard.difficulty}
                          onChange={(e) =>
                            setNewCard({
                              ...newCard,
                              difficulty: e.target.value as "Easy" | "Medium" | "Hard",
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={newCard.tags}
                        onChange={(e) =>
                          setNewCard({ ...newCard, tags: e.target.value })
                        }
                        placeholder="e.g., biology, plants, photosynthesis"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isPublic"
                        checked={newCard.isPublic}
                        onChange={(e) =>
                          setNewCard({ ...newCard, isPublic: e.target.checked })
                        }
                        className="h-4 w-4 text-learnkins-blue-600 focus:ring-learnkins-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                        Make this flashcard public for others to study
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={handleCreateCard}
                        disabled={!newCard.question.trim() || !newCard.answer.trim()}
                        className="flex-1 px-6 py-3 bg-learnkins-gradient text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Create Flashcard
                      </button>
                      <button
                        onClick={() => setActiveTab("browse")}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "study" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Choose Your Study Mode
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Select the study method that works best for your learning style
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {studyModes.map((mode) => (
                  <div
                    key={mode.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer"
                    onClick={() => startStudyMode(mode.id as typeof studyModeType)}
                  >
                    <div className={`bg-gradient-to-br ${mode.color} p-8 text-white text-center`}>
                      <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                        {mode.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{mode.title}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{mode.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{filteredCards.length} cards available</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Study Settings */}
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Filter
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Subjects</option>
                      <option value="science">Science</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="social-science">Social Science</option>
                      <option value="english">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Filter
                    </label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-learnkins-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Levels</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Shuffle Cards
                    </label>
                    <button
                      onClick={() => setShuffleMode(!shuffleMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        shuffleMode ? 'bg-learnkins-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          shuffleMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-4">
                      {filteredCards.length} flashcards ready for study
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Progress
                </h2>
                <p className="text-lg text-gray-600">
                  Track your learning journey and achievements
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="text-learnkins-blue-600 mb-4 flex justify-center">
                    <Trophy className="h-12 w-12" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {flashcards.filter(card => card.createdBy === 'You').length}
                  </div>
                  <div className="text-gray-600">Cards Created</div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="text-learnkins-green-600 mb-4 flex justify-center">
                    <Target className="h-12 w-12" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {Math.round(flashcards.reduce((acc, card) => acc + card.studyCount, 0) / flashcards.length)}
                  </div>
                  <div className="text-gray-600">Avg. Study Count</div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="text-learnkins-orange-600 mb-4 flex justify-center">
                    <Flame className="h-12 w-12" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {streak}
                  </div>
                  <div className="text-gray-600">Current Streak</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Subject Performance
                </h3>
                <div className="space-y-4">
                  {['science', 'mathematics', 'social-science', 'english'].map((subject) => {
                    const subjectCards = flashcards.filter(card => card.subject === subject);
                    const avgRating = subjectCards.length > 0 
                      ? subjectCards.reduce((acc, card) => acc + card.rating, 0) / subjectCards.length 
                      : 0;
                    const progress = Math.round((avgRating / 5) * 100);
                    
                    return (
                      <div key={subject}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 font-medium capitalize">
                            {subject.replace('-', ' ')}
                          </span>
                          <span className="text-gray-600">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getSubjectColor(subject)}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-learnkins-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Master Any Subject with Smart Flashcards
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Experience the future of learning with our advanced flashcard system featuring AI-powered spaced repetition, multiple study modes, and comprehensive progress tracking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab("create")}
              className="inline-flex items-center px-8 py-4 bg-white text-learnkins-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Create Your First Card
              <Plus className="ml-2 h-5 w-5" />
            </button>
            <Link
              to="/subjects"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-learnkins-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Explore Subjects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Flashcards;