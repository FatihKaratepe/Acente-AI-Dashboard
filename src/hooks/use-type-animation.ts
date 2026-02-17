import { useEffect, useMemo, useState } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number;
}

export function useTypewriter({ text, speed = 400 }: UseTypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');

  const words = useMemo(() => text.split(' '), [text]);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => prev + words[index] + ' ');
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [words, speed]);

  return displayedText;
}
