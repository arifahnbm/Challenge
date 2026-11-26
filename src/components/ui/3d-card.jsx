'use client';

import React, { createContext, useContext, useRef, useState } from 'react';

const MouseEnterContext = createContext([false, () => {}]);

export function CardContainer({ children, className = '', containerClassName = '' }) {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    containerRef.current.style.transform = `rotateY(${x.toFixed(2)}deg) rotateX(${(-y).toFixed(2)}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={`card3d-perspective ${containerClassName}`.trim()}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={containerRef}
          className={`card3d-pivot ${isMouseEntered ? 'is-hovered' : ''} ${className}`.trim()}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`card3d-body ${className}`.trim()}>{children}</div>;
}

export function CardItem({
  as: Tag = 'div',
  children,
  className = '',
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) {
  const [isMouseEntered] = useContext(MouseEnterContext);

  const transform = isMouseEntered
    ? `translate3d(${Number(translateX)}px, ${Number(translateY)}px, ${Number(translateZ)}px) rotateX(${Number(rotateX)}deg) rotateY(${Number(rotateY)}deg) rotateZ(${Number(rotateZ)}deg)`
    : 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';

  return (
    <Tag
      className={`card3d-item ${className}`.trim()}
      style={{ transform }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
