import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import TranscriptDisplay from './components/TranscriptDisplay';
import FileUpload from './components/FileUpload';
import { transcribeAudio, translateText, TranscriptLine } from './services/api';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
        setCurrentLineIndex((prev) => 
          prev < transcript.length - 1 ? prev + 1 : prev
        );
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, transcript.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      const transcriptData = await transcribeAudio(file);
      const translatedTranscript = await Promise.all(
        transcriptData.map(async (line) => ({
          ...line,
          translation: await translateText(line.text, 'fr') // 'fr' for French
        }))
      );
      setTranscript(translatedTranscript);
      setCurrentLineIndex(0);
      setProgress(0);
    } catch (error) {
      console.error('Error processing file:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl">
        {transcript.length === 0 ? (
          <div className="p-4">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <>
            <div className="relative aspect-video bg-gray-800">
              <TranscriptDisplay 
                transcript={transcript} 
                currentLineIndex={currentLineIndex}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={togglePlayPause}
                  className="text-white hover:text-gray-300 transition-colors"
                  disabled={isLoading}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <div className="text-white text-sm">
                  {Math.floor(progress)}%
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-2xl">Processing audio...</div>
        </div>
      )}
    </div>
  );
}

export default App;