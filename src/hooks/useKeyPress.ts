import { useEffect, useState } from 'react';

// 先用着 先不做通用处理了0.0
const useKeyPress = (reset: () => void): [number] => {
  const [scale, setScale] = useState<number>(1);

  // 处理键盘事件
  const handleUpOrDown = (e: KeyboardEvent) => {
    if (
      e.key == 'ArrowUp' &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      // Command + Up 放大
      e.preventDefault();
      setScale(r => r + 0.03);
    } else if (
      // Command + Down 缩小
      e.key == 'ArrowDown' &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      setScale(r => r - 0.03);
    } else if (e.key === 'r' && e.ctrlKey) {
      // Ctrl + R 重置
      reset && reset();
      setScale(1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleUpOrDown, false);
    return () => {
      document.removeEventListener('keydown', handleUpOrDown);
    };
  }, [handleUpOrDown]);

  return [scale];
};

export default useKeyPress;
