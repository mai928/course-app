import { lessonIcon, lockIcon } from '@/data';
import React from 'react';

import { useState } from "react";
import { Minus, Plus } from "lucide-react"; // optional: use Lucide icons for clean icons

const TopicItem = ({
  title,
  status,
  duration,
  isExam,
  onOpenPdf,
  onOpenExam,
  examId,
  pdfUrl,
  isPdf,
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center space-x-2">
        <span className="fill-gray-600">{lessonIcon}</span>
        <span className="text-gray-800 text-sm">{title}</span>
      </div>

      <div>
        {status === "locked" ? (
          <div className="fill-gray-600">{lockIcon}</div>
        ) : status === "exam" || status === "pdf" ? (
          <div className="flex items-center text-xs text-gray-500">
            {duration && <span>{duration}</span>}

            {isExam && (
              <button
                onClick={() => onOpenExam(examId)}
                className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition"
              >
                Start Exam
              </button>
            )}

            {isPdf && (
              <button
                onClick={() => onOpenPdf(pdfUrl)}
                className="ml-2 bg-purple-500 text-white text-xs px-2 py-1 rounded hover:bg-purple-600 transition"
              >
                View PDF
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const TopicsList = ({ topics, onOpenPdf, onOpenExam }) => {

  const [openWeeks, setOpenWeeks] = useState([]);
  const toggleWeek = (index) => {
    setOpenWeeks(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  // const isOpen = openWeeks?.includes(index);

  return (
    <div className="mt-6" id="course-curriculum">
      {topics.map((week, index) => {
        const isOpen = openWeeks?.includes(index);
        return (
          <div
            key={index}
            className="mb-6 border border-gray-200 rounded-lg p-4 transition"
          >
            {/* Header with Week Title and Toggle Icon */}
            <div
              className="flex items-center justify-between cursor-pointer select-none"
              onClick={() => toggleWeek(index)}
            >
              <div>
                <h3 className="text-lg font-semibold">{week.numOfWeek}</h3>
                <p className="text-sm font-medium text-gray-700">
                  {week.title}
                </p>
              </div>
              <button
                className="text-gray-600 hover:text-gray-900 transition"
                aria-label="Toggle lessons"
              >
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </button>
            </div>

            {/* Lessons List */}
            {isOpen && (
              <div className="mt-4 animate-fadeIn">
                {week.lessons.map((lesson, lessonIndex) => (
                  <TopicItem
                    key={lessonIndex}
                    title={lesson.title}
                    status={lesson.status}
                    duration={lesson.duration}
                    isExam={lesson.isExam}
                    onOpenPdf={onOpenPdf}
                    onOpenExam={onOpenExam}
                    isPdf={lesson.isPdf}
                    pdfUrl={lesson.pdfUrl}
                    examId={lesson.examId}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TopicsList;


