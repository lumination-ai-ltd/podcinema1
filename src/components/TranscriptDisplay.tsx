import React from 'react';

interface TranscriptLine {
  text: string;
  translation?: string;
}

interface TranscriptDisplayProps {
  transcript: TranscriptLine[];
  currentLineIndex: number;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript, currentLineIndex }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center p-4">
        <p className="text-white text-3xl font-light mb-2 transition-opacity duration-300">
          {transcript[currentLineIndex].text}
        </p>
        {transcript[currentLineIndex].translation && (
          <p className="text-gray-300 text-xl font-light italic transition-opacity duration-300">
            {transcript[currentLineIndex].translation}
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptDisplay;