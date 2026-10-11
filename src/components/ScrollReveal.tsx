import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';
  delay?: number; // ms
  duration?: number; // ms
  distance?: number; // px
  threshold?: number;
  className?: string;
  triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  distance = 32,
  threshold = 0.12,
  className = '',
  triggerOnce = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce]);

  let initialTransform = '';
  switch (direction) {
    case 'up':
      initialTransform = `translateY(${distance}px)`;
      break;
    case 'down':
      initialTransform = `translateY(-${distance}px)`;
      break;
    case 'left':
      initialTransform = `translateX(${distance}px)`;
      break;
    case 'right':
      initialTransform = `translateX(-${distance}px)`;
      break;
    case 'zoom':
      initialTransform = 'scale(0.92)';
      break;
    case 'fade':
      initialTransform = 'none';
      break;
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : initialTransform,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none origin-left bg-gradient-to-r from-[#C7A36A] via-[#FAF6EF] to-[#C7A36A] shadow-xs transition-transform duration-75 no-print"
      style={{ transform: `scaleX(${scrollProgress / 100})`, transformOrigin: '0%' }}
    />
  );
};
