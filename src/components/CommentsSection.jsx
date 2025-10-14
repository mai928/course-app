import React, { useState } from 'react';

const Comment = ({ author, date, content }) => (
  <div className="flex  space-x-4 mb-6">
    <div className="flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
        {author.charAt(0)}
      </div>
    </div>
    <div>
      <p className="font-semibold text-gray-900">{author}</p>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="mt-2 text-gray-700">{content}</p>
    </div>
  </div>
);

const CommentsSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6" id="course-comments">
      <h2 className="text-2xl font-semibold mb-6">Comments</h2>
      <div className="space-y-6 mb-8">
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>

      <h3 className="text-xl font-medium mb-4">Write a comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;