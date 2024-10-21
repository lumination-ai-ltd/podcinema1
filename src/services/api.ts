// This file contains mock API services

export interface TranscriptLine {
  text: string;
  translation?: string;
}

// Mock function to simulate OpenAI's Whisper transcription
export const transcribeAudio = async (audioFile: File): Promise<TranscriptLine[]> => {
  // In a real implementation, you would send the audio file to your backend,
  // which would then use OpenAI's Whisper API for transcription
  console.log('Transcribing audio file:', audioFile.name);
  
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Return mock transcript
  return [
    { text: "Welcome to our podcast about the wonders of space." },
    { text: "Today, we'll explore the mysteries of black holes." },
    { text: "Black holes are regions where gravity is so strong," },
    { text: "that nothing, not even light, can escape." },
    { text: "They're formed when massive stars collapse at the end of their lives." },
  ];
};

// Mock function to simulate translation
export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  // In a real implementation, you would send the text to your backend,
  // which would then use a translation API
  console.log(`Translating text to ${targetLanguage}:`, text);

  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return mock translation (French in this case)
  const translations: { [key: string]: string } = {
    "Welcome to our podcast about the wonders of space.": "Bienvenue dans notre podcast sur les merveilles de l'espace.",
    "Today, we'll explore the mysteries of black holes.": "Aujourd'hui, nous explorerons les mystères des trous noirs.",
    "Black holes are regions where gravity is so strong,": "Les trous noirs sont des régions où la gravité est si forte,",
    "that nothing, not even light, can escape.": "que rien, pas même la lumière, ne peut s'échapper.",
    "They're formed when massive stars collapse at the end of their lives.": "Ils se forment lorsque des étoiles massives s'effondrent à la fin de leur vie.",
  };

  return translations[text] || text;
};