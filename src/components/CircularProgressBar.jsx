import React from 'react'

function CircularProgressBar({percentage}) {
   
    const circleSize = 100; // Total size of the outer circle
    const innerSize = (percentage / 100) * circleSize; // Dynamic size for the inner circle
  
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: circleSize, height: circleSize }}
      >
        {/* Outer Circle (Background) */}
        <div
          className="absolute rounded-full bg-custom-green border-custom-blue border-2"
          style={{
            width: circleSize,
            height: circleSize,
          }}
        ></div>
  
        {/* Dynamic Growing Circle */}
        <div
          className="absolute rounded-full bg-sky-400"
          style={{
            width: innerSize,
            height: innerSize,
          }}
        ></div>
  
        {/* Inner Circle with Percentage */}
        <div
          className="absolute flex items-center justify-center bg-white rounded-full"
          style={{
            width: circleSize * 0.6,
            height: circleSize * 0.6,
          }}
        >
          <span className="text-lg font-semibold text-sky-400">
            {percentage}%
          </span>
        </div>
      </div>
    );
}

export default CircularProgressBar

