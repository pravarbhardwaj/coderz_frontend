import React from 'react'

function Loading({login = false}) {
  return (
    <div className="flex flex-col items-center space-y-4 text-blue-700">
      <div className="flex items-center space-x-4 text-2xl font-semibold">
        <svg
          className="w-8 h-8 animate-spin text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        <span>{login ? 'Logging in...' : 'Loading...'}</span>
      </div>
      {login && <p className="text-lg text-gray-600">Please don’t close this window</p>}
    </div>
  )
}

export default Loading