'use client'
import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import CoursePlayer from '../components/CoursePlayer';
import ActionButtons from '../components/ActionButtons';
import CourseMaterials from '../components/CourseMaterials';
import CourseProgress from '../components/CourseProgress';
import TopicsList from '../components/TopicsList';
import CommentsSection from '../components/CommentsSection';
import AskQuestionPopup from '../components/AskQuestionPopup';
import LeaderboardPopup from '../components/LeaderboardPopup';

const CourseDetailsPage = () => {
  // --- State for Popups ---
  const [isAskQuestionOpen, setIsAskQuestionOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false); // For PDF viewer
  const [isExamOpen, setIsExamOpen] = useState(false); // For Exam popup
  const [currentPdfUrl, setCurrentPdfUrl] = useState(''); // To hold the URL of the PDF to display
  const [currentExamId, setCurrentExamId] = useState(''); // To hold the ID of the exam


  console.log(currentPdfUrl)
  // --- Dummy Data (Replace with actual data fetching from an API) ---
  const courseData = {
    title: "Starting SEO as your Home Based Business",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual course video
    materials: {
      duration: "3 weeks",
      lessons: 8,
      enrolledStudents: 65,
      language: "English",
    },
    topics: [
      {
        numOfWeek: 'Week 1-4',
        title: "Advanced storytelling techniques for writers; Personas, Characters & Plots",
        lessons: [
          { title: "Introduction", status: "completed", duration: "" },
          { title: "Course Overview", status: "in-progress", duration: "10 MINUTES" },
          { title: "Course Exercise / Reference Files", status: "locked", duration: "" },
          { title: "Code Editor Installation (Optional if you have one)", status: "locked", duration: "" },
          { title: "Embedding PHP in HTML (PDF available)", status: "pdf", duration: "", isPdf: true, pdfUrl: "/Mai-Frontend-CV.pdf" },
        ],
      },
      {
        numOfWeek: 'Week 5-8',

        title: "Advanced storytelling techniques for writers; Personas, Characters & Plots",
        lessons: [
          { title: "Defining Functions", status: "locked", duration: "" },
          { title: "Function Parameters", status: "locked", duration: "" },
          { title: "Return Values From Functions (Exam)", status: "exam", duration: "15 MINUTES", isExam: true, examId: "exam-101" },
          { title: "Global Variable and Scope", status: "locked", duration: "" },
          { title: "Newer Way of Creating a Constant", status: "locked", duration: "" },
        ],
      },

      {
        numOfWeek: 'Week 9-12',

        title: "Advanced storytelling techniques for writers; Personas, Characters & Plots",
        lessons: [
          { title: "Defining Functions", status: "locked", duration: "" },
          { title: "Function Parameters", status: "locked", duration: "" },
          { title: "Return Values From Functions (Exam)", status: "exam", duration: "15 MINUTES", isExam: true, examId: "exam-101" },
          { title: "Global Variable and Scope", status: "locked", duration: "" },
          { title: "Newer Way of Creating a Constant", status: "locked", duration: "" },
        ],
      },
    ],
    comments: [
      { author: "Student Name Goes Here", date: "Oct 10, 2021", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { author: "Student Name Goes Here", date: "Oct 15, 2021", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { author: "Student Name Goes Here", date: "Oct 18, 2021", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    ],
    leaderboard: [
      { name: "Alice Smith", score: 1200 },
      { name: "Bob Johnson", score: 1150 },
      { name: "Charlie Brown", score: 1100 },
    ],
  };

  const [comments, setComments] = useState(courseData.comments);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // --- Refs for scrolling ---
  const curriculumRef = useRef(null);
  const commentsRef = useRef(null);

  // --- Handlers for ActionButtons ---
  const handleCurriculumClick = () => {
    curriculumRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCommentsClick = () => {
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAskQuestionSubmit = (questionText) => {
    console.log("New question submitted:", questionText);
    // Here you would typically send this to an API
    alert(`Question submitted: "${questionText}"`);
  };

  const handleAddComment = (commentText) => {
    const newComment = {
      author: "Current User", // Replace with actual user name
      date: new Date().toLocaleDateString('en-US'),
      content: commentText,
    };
    setComments([...comments, newComment]);
  };

  // --- Handlers for PDF/Exam popups ---
  const handleOpenPdf = (pdfUrl) => {
    setCurrentPdfUrl(pdfUrl);
    setIsPdfViewerOpen(true);
  };

  const handleClosePdf = () => {
    setIsPdfViewerOpen(false);
    setCurrentPdfUrl('');
  };

  const handleOpenExam = (examId) => {
    setCurrentExamId(examId);
    setIsExamOpen(true);
    // You would also save the current progress before opening exam
    console.log(`Opening exam: ${examId}. Saving current course progress...`);
  };

  const handleCloseExam = () => {
    setIsExamOpen(false);
    setCurrentExamId('');
    // Potentially load saved progress after exam or update based on result
    console.log(`Closing exam. Updating course progress...`);
  };

  // --- Scroll-based progress update (simplified) ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(100, (scrollY / docHeight) * 100 || 0);
      setProgressPercentage(Math.round(progress));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <Layout title={courseData.title}>
      <h1 className="text-3xl font-bold mb-6">{courseData.title}</h1>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CoursePlayer videoUrl={courseData.videoUrl} />

            <ActionButtons
              onCurriculumClick={handleCurriculumClick}
              onCommentsClick={handleCommentsClick}
              onAskQuestionClick={() => setIsAskQuestionOpen(true)}
              onLeaderboardClick={() => setIsLeaderboardOpen(true)}
            />

            <CourseMaterials materials={courseData.materials} />

            <div className='lg:block hidden' ref={commentsRef}>
              <CommentsSection comments={comments} onAddComment={handleAddComment} />
            </div>
          </div>

          {/* Right Sidebar (can be used for 'Topics for This Course' from original design, etc.) */}
          <div className="lg:col-span-1">
            <CourseProgress progressPercentage={progressPercentage} />

            <div ref={curriculumRef}>
              <TopicsList topics={courseData.topics} onOpenPdf={handleOpenPdf} onOpenExam={handleOpenExam} />
            </div>
          </div>
        </div>


        <div className='block lg:hidden' ref={commentsRef}>
          <CommentsSection comments={comments} onAddComment={handleAddComment} />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setIsAskQuestionOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Ask a Question
          </button>

          <button
            onClick={() => setIsLeaderboardOpen(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            View Leaderboard
          </button>
        </div>

      </div>


      {/* Popups */}
      <AskQuestionPopup
        isOpen={isAskQuestionOpen}
        onClose={() => setIsAskQuestionOpen(false)}
        onSubmit={handleAskQuestionSubmit}
      />
      <LeaderboardPopup
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        leaderboardData={courseData.leaderboard}
      />

      {/* Generic PDF Viewer Popup */}
      {isPdfViewerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full h-5/6 max-w-4xl relative flex flex-col overflow-hidden">
            <button
              onClick={handleClosePdf}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl z-10"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold p-4 border-b">Viewing PDF</h3>
            <iframe
              src={typeof window !== "undefined" ? `${window.location.origin}${currentPdfUrl}` : currentPdfUrl}
              className="flex-grow w-full border-0"
              style={{ height: "100%" }}
              title="PDF Viewer"
            ></iframe>
          </div>
        </div>
      )}


      {/* Generic Exam Popup */}
      {isExamOpen && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-75 flex items-start justify-center p-0 sm:p-4 z-50 overflow-auto">
          <div className="bg-blue-900 w-full min-h-screen sm:min-h-0 sm:h-auto sm:max-w-md rounded-lg sm:shadow-xl relative flex flex-col pt-4">

            <div className="flex justify-between items-center px-4 pb-4">
              <button
                onClick={handleCloseExam}
                className="text-white text-2xl"
                aria-label="Go back"
              >
                &lt;
              </button>
              <div className="bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-full flex items-center space-x-2 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>09 : 32</span>
              </div>
              <div className="w-8"></div>
            </div>

            <div className="flex justify-center space-x-3 mb-8 px-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold text-lg ${num === 2 ? 'bg-blue-600' : 'bg-blue-700 opacity-75'
                    }`}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-t-3xl shadow-xl flex-grow p-6 flex flex-col h-full overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-6">1.</h3>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Among the following states of India, which one has the oldest
                rock formations in the country?
              </p>

              {/* Options */}
              <div className="space-y-4">
                {['Asam', 'Bahar', 'Kamaltake', 'Utter Pardesh'].map((option, index) => (
                  <label
                    key={option}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors duration-200 ${option === 'Bahar'
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
                      }`}
                  >
                    <input
                      type="radio"
                      name="question1"
                      value={option}
                      className="hidden"
                      checked={option === 'Bahar'}
                      readOnly
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${option === 'Bahar'
                          ? 'border-white bg-blue-600'
                          : 'border-gray-400'
                        }`}
                    >
                      {option === 'Bahar' && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </label>
                ))}
              </div>

              <div className="p-4 mt-auto text-center text-gray-500 text-sm">
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CourseDetailsPage;