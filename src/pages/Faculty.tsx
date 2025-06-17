import { Link } from "react-router-dom";
import { ArrowRight, Star, Award, BookOpen, Users } from "lucide-react";

const Faculty = () => {
  const teachers = [
    {
      name: "Dr. Rajesh Kumar",
      subject: "Physics & Mathematics",
      experience: "12 years",
      education: "Ph.D. in Physics, IIT Delhi",
      rating: 4.9,
      students: 1250,
      specialization: "Quantum Physics, Advanced Mathematics",
      achievements: ["Best Teacher Award 2023", "Research Publications: 25+"],
      image:
        "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Ms. Priya Sharma",
      subject: "Chemistry & Biology",
      experience: "8 years",
      education: "M.Sc. Chemistry, Delhi University",
      rating: 4.8,
      students: 980,
      specialization: "Organic Chemistry, Cell Biology",
      achievements: [
        "Excellence in Teaching 2022",
        "Student Mentor of the Year",
      ],
      image:
        "https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Mr. Amit Patel",
      subject: "Social Science",
      experience: "10 years",
      education: "M.A. History, Jawaharlal Nehru University",
      rating: 4.7,
      students: 1150,
      specialization: "Ancient History, Geography",
      achievements: ["Outstanding Educator 2023", "Curriculum Developer"],
      image:
        "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Ms. Kavita Singh",
      subject: "English Literature",
      experience: "9 years",
      education: "M.A. English Literature, BHU",
      rating: 4.9,
      students: 1080,
      specialization: "Creative Writing, Literature Analysis",
      achievements: ["Literary Excellence Award", "Published Author"],
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const stats = [
    {
      label: "Expert Teachers",
      value: "50+",
      icon: <Users className="h-8 w-8" />,
    },
    {
      label: "Years of Experience",
      value: "15+",
      icon: <Award className="h-8 w-8" />,
    },
    {
      label: "Students Taught",
      value: "10,000+",
      icon: <BookOpen className="h-8 w-8" />,
    },
    { label: "Success Rate", value: "98%", icon: <Star className="h-8 w-8" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-lg mb-6">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <ArrowRight className="h-5 w-5" />
            <span>Faculty</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Best Teachers</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Who are in extremely love with tech-friendly system of interactive
            learning
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
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

      {/* Teachers Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Faculty
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn from highly qualified and experienced teachers who are
              passionate about education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {teacher.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="text-lg font-semibold text-gray-900">
                            {teacher.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-lg text-blue-600 font-semibold mb-2">
                        {teacher.subject}
                      </p>
                      <p className="text-gray-600 mb-3">{teacher.education}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          {teacher.experience}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {teacher.students} students
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Specialization
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {teacher.specialization}
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Achievements
                    </h4>
                    <ul className="space-y-1">
                      {teacher.achievements.map(
                        (achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="flex items-center text-gray-600"
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                            {achievement}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Learn from the Best?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have achieved academic excellence
            with our expert teachers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/subjects"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faculty;
