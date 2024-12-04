import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="text-center p-4">
      <div className="text-3xl font-bold text-red-500">
        {message}
      </div>
    </div>
  );
};

export default ErrorDisplay;