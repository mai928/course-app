import React from 'react';

const CoursePlayer = ({ videoUrl }) => {
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
        title="Course Video"
      ></iframe>
      {/* You can add custom controls or overlay buttons here if needed */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button className="bg-gray-700 text-white p-2 rounded-full text-sm">Maximize</button>
        <button className="bg-gray-700 text-white p-2 rounded-full text-sm">Wide</button>
      </div>
    </div>
  );
};

export default CoursePlayer;