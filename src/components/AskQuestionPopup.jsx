import React, { useState, useEffect } from 'react';

const AskQuestionPopup = ({ isOpen, onClose, onSubmit }) => {
  const [question, setQuestion] = useState('');
  const localStorageKey = 'askQuestionDraft';

  useEffect(() => {
    if (isOpen) {
      const savedDraft = localStorage.getItem(localStorageKey);
      if (savedDraft) {
        setQuestion(savedDraft);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) { 
      localStorage.setItem(localStorageKey, question);
    }
  }, [question, isOpen]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion('');
      localStorage.removeItem(localStorageKey); 
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <h3 className="text-2xl font-semibold mb-4">Ask a Question</h3>
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-4"
            rows="6"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestionPopup;