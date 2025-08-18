import React from 'react';

interface LoadingMessageProps {
    text: string;
}
const LoadingAnimation: React.FC<LoadingMessageProps> = ({text}) => {
  return (
    <div className="flex items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-semibold flex items-center gap-1">{text}
          <span className="flex gap-1 ml-2">
            <span className="dot dot1">.</span>
            <span className="dot dot2">.</span>
            <span className="dot dot3">.</span>
          </span>
        </h1>
      </div>
  );
};

export default LoadingAnimation;