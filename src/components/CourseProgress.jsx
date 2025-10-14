import React from 'react';

const CourseProgress = ({ progressPercentage }) => {
  return (
    <div className=" mb-3">
      <h2 className="text-2xl font-semibold mb-4">Topics For This Course</h2>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-green-600">
              {progressPercentage}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-out"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;