import { EnrollIcon, langIcon, lessonIcon, timerIcon } from '@/data';
import React from 'react';

const CourseMaterials = ({ materials }) => {
  const items = [
    { icon: timerIcon, label: 'Duration', value: materials.duration },
    { icon: lessonIcon, label: 'Lessons', value: materials.lessons },
    { icon: EnrollIcon, label: 'Enrolled', value: `${materials.enrolledStudents} students` },
    { icon: langIcon, label: 'Language', value: materials.language },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6" id="course-materials">
      <h2 className="text-2xl font-semibold mb-6">Course Materials</h2>

      {/* Two equal columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700">
        {Array(2)
          .fill()
          .map((_, colIndex) => (
            <div key={colIndex} className="space-y-4">
              {items.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{item.icon}</span>
                    <span>
                      {item.label}: <span className="font-medium">{item.value}</span>
                    </span>
                  </div>
                  {i !== items.length - 1 && (
                    <div className="border-t border-gray-200 my-3" />
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseMaterials;
