import React from 'react';

const LeaderboardPopup = ({ isOpen, onClose, leaderboardData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <div className='text-[#080264] text-center my-3'>
          <h3 className="  ">Course Name Shown Here</h3>
          <p className='font-semibold'>Leaderboard</p>
        </div>
        <div className='flex items-center gap-3 px-2 text-[#080264] bg-gray-50'>
          <p className='text-end text-sm py-2 '>عظيم يا صديقي.. أداءك في الكورس ده أفضل من 60% من باقي الطلبة.. كمّل عايز أشوف اسمك في الليدر بورد هنا

          </p>
          <img width={30} src='/support.png' />

        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <div className="space-y-3 mt-7 bg-gray-50 p-4">
          {leaderboardData.length > 0 ? (
            leaderboardData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white  rounded-md">

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