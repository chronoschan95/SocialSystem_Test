import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MessageCircle, Heart, Share2, BookMarked } from 'lucide-react';

const BackgroundAnimation = () => {
  const { isDarkMode } = useTheme();
  const animationFrameRef = useRef();
  const lastUpdateRef = useRef(Date.now());
  const [animationElements, setAnimationElements] = useState([]);

  useEffect(() => {
    const generateElements = () => {
      return Array.from({ length: 12 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: i * 0.3,
        scale: 0.8 + Math.random() * 0.4,
        type: i % 4,
        speed: 0.3 + Math.random() * 0.3,
        angle: Math.random() * Math.PI * 2
      }));
    };

    setAnimationElements(generateElements());

    const updateAnimations = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateRef.current) / 1000;
      lastUpdateRef.current = now;

      setAnimationElements(prev => prev.map(el => {
        const newTop = el.top + Math.sin(el.angle) * el.speed * deltaTime;
        const newLeft = el.left + Math.cos(el.angle) * el.speed * deltaTime;

        if (newTop <= 0 || newTop >= 100) el.angle = Math.PI - el.angle;
        if (newLeft <= 0 || newLeft >= 100) el.angle = -el.angle;

        return {
          ...el,
          top: Math.max(0, Math.min(100, newTop)),
          left: Math.max(0, Math.min(100, newLeft)),
          scale: 0.8 + Math.sin(now / 3000 + el.delay) * 0.2
        };
      }));

      animationFrameRef.current = requestAnimationFrame(updateAnimations);
    };

    animationFrameRef.current = requestAnimationFrame(updateAnimations);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {animationElements.map((el) => (
        <div
          key={el.id}
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            transform: `scale(${el.scale})`,
          }}
        >
          {el.type === 0 ? (
            <MessageCircle className={`w-8 h-8 ${isDarkMode ? 'text-pink-400/20' : 'text-pink-400/30'}`} />
          ) : el.type === 1 ? (
            <Heart className={`w-8 h-8 ${isDarkMode ? 'text-pink-300/20' : 'text-pink-400/30'}`} />
          ) : el.type === 2 ? (
            <Share2 className={`w-8 h-8 ${isDarkMode ? 'text-pink-200/20' : 'text-pink-400/30'}`} />
          ) : (
            <BookMarked className={`w-8 h-8 ${isDarkMode ? 'text-pink-100/20' : 'text-pink-400/30'}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimation; 