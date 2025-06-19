import React, { useEffect, useRef, useState } from 'react';
import sword from './sword.png';

const SwordCursor = () => {
  const swordRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const swordEl = swordRef.current;
    const heroSection = document.querySelector('.hero');

    const handleMouseMove = (e) => {
      const heroBounds = heroSection.getBoundingClientRect();
      const insideHero =
        e.clientX >= heroBounds.left &&
        e.clientX <= heroBounds.right &&
        e.clientY >= heroBounds.top &&
        e.clientY <= heroBounds.bottom;

      setVisible(insideHero);

      if (insideHero && swordEl) {
        swordEl.style.left = `${e.clientX}px`;
        swordEl.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return visible ? (
    <img
      ref={swordRef}
      src={sword}
      alt="sword cursor"
      className="sword-cursor"
      style={{
        position: 'fixed',
        width: '30px',
        height: '30px',
        pointerEvents: 'none',
        zIndex: 1000,
        transform: 'translate(-50%, -50%)',
      }}
    />
  ) : null;
};

export default SwordCursor;
