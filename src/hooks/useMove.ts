import React, { useState, useRef, useEffect } from 'react';

interface ICoordinate {
  x: number;
  y: number;
}

/**
 *  拖动钩子
 *  @return {object}  坐标：{x, y}
 *  @return {function} onMouseDown 需要挂载的mouseDown事件
 *  @return {function} Reset 重置事件
 */
const useMove = (): [
  { x: number; y: number },
  (e: React.MouseEvent) => void,
  () => void,
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

  const reset = () => {
    setPreXY({ x: 0, y: 0 });
    setTransXY({ x: 0, y: 0 });
  };

  const handleMouseUp = (e: MouseEvent): void => {
    setIsMove(false);
    setPreXY(transXY);
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

  return [transXY, handleMouseDown, reset];
};

export default useMove;
