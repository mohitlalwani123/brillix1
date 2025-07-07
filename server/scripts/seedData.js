import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Subject from '../models/Subject.js';
import { Achievement } from '../models/Community.js';

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learnkins');

const seedData = async () => {
  try {
    console.log('Seeding database...');

    // Clear existing data
    await User.deleteMany({});
    await Subject.deleteMany({});
    await Achievement.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@learnkins.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create teacher
    const teacher = await User.create({
      name: 'Dr. Rajesh Kumar',
      email: 'teacher@learnkins.com',
      password: 'teacher123',
      role: 'teacher'
    });

    // Create parent
    const parent = await User.create({
      name: 'Parent User',
      email: 'parent@learnkins.com',
      password: 'parent123',
      role: 'parent'
    });

    // Create student
    const student = await User.create({
      name: 'Alex Johnson',
      email: 'student@learnkins.com',
      password: 'student123',
      role: 'student',
      grade: '8th',
      parentId: parent._id
    });

    // Update parent's children
    parent.children.push(student._id);
    await parent.save();

    // Create subjects
    const subjects = [
      {
        name: 'Science',
        slug: 'science',
        description: 'Explore the fascinating world of science through interactive experiments and engaging content.',
        icon: '🔬',
        color: 'from-purple-500 to-indigo-600',
        grade: '8th',
        chapters: [
          {
            title: 'Crop Production and Management',
            description: 'Learn about modern farming techniques and crop management.',
            duration: '45 min',
            difficulty: 'Beginner',
            topics: ['Introduction to Agriculture', 'Types of Crops', 'Modern Farming Methods', 'Crop Protection'],
            order: 1
          },
          {
            title: 'Microorganisms: Friend and Foe',
            description: 'Understand the role of microorganisms in our daily life.',
            duration: '50 min',
            difficulty: 'Intermediate',
            topics: ['Types of Microorganisms', 'Helpful Microorganisms', 'Harmful Microorganisms', 'Food Preservation'],
            order: 2
          }
        ]
      },
      {
        name: 'Mathematics',
        slug: 'mathematics',
        description: 'Master mathematical concepts through step-by-step explanations and practice problems.',
        icon: '📊',
        color: 'from-blue-500 to-cyan-600',
        grade: '8th',
        chapters: [
          {
            title: 'Rational Numbers',
            description: 'Learn about rational numbers and their operations.',
            duration: '60 min',
            difficulty: 'Intermediate',
            topics: ['Introduction to Rational Numbers', 'Operations', 'Properties', 'Word Problems'],
            order: 1
          },
          {
            title: 'Linear Equations in One Variable',
            description: 'Solve linear equations and understand their applications.',
            duration: '55 min',
            difficulty: 'Intermediate',
            topics: ['Solving Linear Equations', 'Applications', 'Word Problems', 'Graphical Representation'],
            order: 2
          }
        ]
      },
      {
        name: 'Social Science',
        slug: 'social-science',
        description: 'Discover history, geography, and civics through engaging stories and interactive content.',
        icon: '🌍',
        color: 'from-green-500 to-teal-600',
        grade: '8th',
        chapters: [
          {
            title: 'How, When and Where',
            description: 'Understanding historical sources and dating.',
            duration: '45 min',
            difficulty: 'Beginner',
            topics: ['Historical Sources', 'Dating in History', 'Maps and History', 'Colonial Records'],
            order: 1
          }
        ]
      },
      {
        name: 'English',
        slug: 'english',
        description: 'Develop language skills through literature, grammar, and creative writing.',
        icon: '📚',
        color: 'from-orange-500 to-red-600',
        grade: '8th',
        chapters: [
          {
            title: 'The Best Christmas Present in the World',
            description: 'A heartwarming story about love and war.',
            duration: '40 min',
            difficulty: 'Beginner',
            topics: ['Reading Comprehension', 'Vocabulary', 'Character Analysis', 'Theme Discussion'],
            order: 1
          }
        ]
      }
    ];

    await Subject.insertMany(subjects);

    // Create achievements
    const achievements = [
      {
        title: 'Quiz Master',
        description: 'Scored 100% on 10 quizzes',
        icon: '🏆',
        rarity: 'Gold',
        criteria: 'Score 100% on 10 different quizzes',
        points: 500
      },
      {
        title: 'Helpful Helper',
        description: 'Helped 50 students with their questions',
        icon: '🤝',
        rarity: 'Silver',
        criteria: 'Provide helpful answers to 50 community questions',
        points: 300
      },
      {
        title: 'Discussion Starter',
        description: 'Started 25 meaningful discussions',
        icon: '💬',
        rarity: 'Bronze',
        criteria: 'Start 25 discussions in the community',
        points: 200
      },
      {
        title: 'Study Streak',
        description: 'Studied for 30 consecutive days',
        icon: '🔥',
        rarity: 'Gold',
        criteria: 'Maintain a 30-day study streak',
        points: 600
      }
    ];

    await Achievement.insertMany(achievements);

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@learnkins.com / admin123');
    console.log('Teacher credentials: teacher@learnkins.com / teacher123');
    console.log('Parent credentials: parent@learnkins.com / parent123');
    console.log('Student credentials: student@learnkins.com / student123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();