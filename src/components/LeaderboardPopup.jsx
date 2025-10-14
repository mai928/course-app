import React from 'react';

const LeaderboardPopup = ({ isOpen, onClose, leaderboardData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
        <h3 className="text-2xl font-semibold mb-4">Course Leaderboard</h3>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <div className="space-y-3">
          {leaderboardData.length > 0 ? (
            leaderboardData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium text-gray-800">{index + 1}. {entry.name}</span>
                <span className="text-blue-600 font-bold">{entry.score} points</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No leaderboard data available yet.</p>
          )}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPopup;