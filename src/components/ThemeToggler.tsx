import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

interface ThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number;
  onClick?: () => void;
}

export const ThemeToggler = ({ className, duration = 500, onClick, ...props }: ThemeTogglerProps) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return stored === 'dark' || (!stored && prefersDark);
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const supportsTransition = typeof document !== 'undefined' && 'startViewTransition' in document;

    if (!supportsTransition) {
      setIsDark((prev) => !prev);
      onClick?.();
      return;
    }

    const transition = document.startViewTransition?.(() => {
      flushSync(() => {
        setIsDark((prev) => !prev);
      });
    });

    await transition?.ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();

    const x = left + width / 2;
    const y = top + height / 2;

    const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top));

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );

    onClick?.();
  }, [duration, onClick]);

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={cn('relative', className)} {...props}>
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
};
