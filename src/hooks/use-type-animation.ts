import { useEffect, useMemo, useState } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number;
}

export function useTypewriter({ text, speed = 400 }: UseTypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const words = useMemo(() => text.split(' '), [text]);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (index < words.length) {
        const word = words[index];
        if (word !== undefined) {
          setDisplayedText((prev) => prev + (index === 0 ? '' : ' ') + word);
        }
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [words, speed]);

  return { displayedText, isComplete };
}
