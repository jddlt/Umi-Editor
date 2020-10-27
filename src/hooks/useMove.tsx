import React, { useState, useRef, useEffect } from 'react';

interface ICoordinate {
  x: number;
  y: number;
}

const useMove = (): [
  { x: number; y: number },
  (e: React.MouseEvent) => void,
] => {
  const [transXY, setTransXY] = useState<ICoordinate>({ x: 0, y: 0 });
  const [isMove, setIsMove] = useState<boolean>(false);
  const [preXY, setPreXY] = useState<ICoordinate>({ x: 0, y: 0 });
  const pointRef = useRef<ICoordinate>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent): void => {
    pointRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
    setIsMove(true);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isMove) return;
    const moveX = e.clientX - pointRef.current.x;
    const moveY = e.clientY - pointRef.current.y;
    setTransXY({
      x: preXY.x + moveX,
      y: preXY.y + moveY,
    });
  };

  const handleMouseUp = (e: MouseEvent): void => {
    setIsMove(false);
    setPreXY(transXY);
    console.log('mouseUp');
  };

  useEffect(() => {
    if (isMove) {
      document.documentElement.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.documentElement.removeEventListener(
        'mousemove',
        handleMouseMove,
      );
    };
  }, [isMove, handleMouseMove]);

  useEffect(() => {
    document.documentElement.addEventListener('mouseup', handleMouseUp, false);
    return () => {
      document.documentElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return [transXY, handleMouseDown];
};

export default useMove;
