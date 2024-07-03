import React, { useRef, useState, useCallback, useLayoutEffect } from 'react';

interface DraggableComponentProps {
  axis?: 'both' | 'x' | 'y';
  handle?: string;
  cancel?: string;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
  id: string;
  centered?: boolean;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  axis = 'both',
  handle = '',
  cancel = '',
  sx = {},
  children,
  id,
  centered = false,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [hasBeenDragged, setHasBeenDragged] = useState(false);
  const parentBoundsRef = useRef<{ width: number; height: number } | null>(null);

  const updatePosition = useCallback(({ x, y }: { x: number; y: number }) => {
    if (!parentBoundsRef.current || !nodeRef.current) return;

    const minX = 0;
    const minY = 0;
    const maxX = parentBoundsRef.current.width - nodeRef.current.offsetWidth;
    const maxY = parentBoundsRef.current.height - nodeRef.current.offsetHeight;

    const newX = Math.max(minX, Math.min(x, maxX));
    const newY = Math.max(minY, Math.min(y, maxY));

    setPosition((prevPosition) => {
      if (prevPosition.x === newX && prevPosition.y === newY) return prevPosition;
      return { x: newX, y: newY };
    });
  }, []);

  const handleDragStart = useCallback((event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    let clientX, clientY;
    if (event.type === 'touchstart') {
      clientX = (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX;
      clientY = (event as React.TouchEvent<HTMLDivElement>).touches[0].clientY;
    } else {
      if ((event as React.MouseEvent<HTMLDivElement>).button !== 0) return;
      clientX = (event as React.MouseEvent<HTMLDivElement>).clientX;
      clientY = (event as React.MouseEvent<HTMLDivElement>).clientY;
    }
  
    const targetElement = event.target as HTMLElement;
    if (
      (cancel && targetElement.closest(cancel)) ||
      (handle && !targetElement.closest(handle))
    ) {
      return;
    }
  
    event.preventDefault();
  
    setIsDragging(true);
    setStartPosition({ x: clientX, y: clientY });
  
    document.body.style.userSelect = 'none';
  
    if (nodeRef.current) {
      nodeRef.current.classList.add('react-draggable', 'react-draggable-dragging');
    }
  }, [handle, cancel]);
  
  const handleDragMove = useCallback((event: MouseEvent | TouchEvent) => {
    event.preventDefault();

    if (!isDragging || !startPosition || !parentBoundsRef.current || !nodeRef.current) return;

    let clientX, clientY;
    if (event.type === 'touchmove') {
      clientX = (event as TouchEvent).touches[0].clientX;
      clientY = (event as TouchEvent).touches[0].clientY;
    } else {
      clientX = (event as MouseEvent).clientX;
      clientY = (event as MouseEvent).clientY;
    }

    const deltaX = clientX - startPosition.x;
    const deltaY = clientY - startPosition.y;
    let newX = position.x + (axis === 'both' || axis === 'x' ? -deltaX : 0);
    let newY = position.y + (axis === 'both' || axis === 'y' ? -deltaY : 0);

    updatePosition({ x: newX, y: newY });
    setStartPosition({ x: clientX, y: clientY });

    if (!hasBeenDragged) {
      setHasBeenDragged(true);
    }
  }, [isDragging, startPosition, position, axis, updatePosition, hasBeenDragged]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = '';

    if (isDragging && nodeRef.current) {
      nodeRef.current.classList.remove('react-draggable-dragging');
      nodeRef.current.classList.add('react-draggable-dragged');
    }
  }, [isDragging]);

  const calculateInitialPosition = useCallback(() => {
    if (!nodeRef.current || !nodeRef.current.parentElement) return;

    const parentElement = nodeRef.current.parentElement;
    const { clientWidth, clientHeight } = parentElement;
    const childWidth = nodeRef.current.offsetWidth;
    const childHeight = nodeRef.current.offsetHeight;
    parentBoundsRef.current = { width: clientWidth, height: clientHeight };

    if (centered && !hasBeenDragged) {
      const newX = (clientWidth - childWidth) / 2;
      const newY = (clientHeight - childHeight) / 2;
      setPosition((prevPosition) => {
        if (prevPosition.x === newX && prevPosition.y === newY) return prevPosition;
        return { x: newX, y: newY };
      });
    }
  }, [centered, hasBeenDragged]);

  const handleResize = useCallback(() => {
    if (!nodeRef.current || !nodeRef.current.parentElement) return;

    const { clientWidth, clientHeight } = nodeRef.current.parentElement;
    parentBoundsRef.current = { width: clientWidth, height: clientHeight };

    const minX = 0;
    const minY = 0;
    const maxX = parentBoundsRef.current.width - nodeRef.current.offsetWidth;
    const maxY = parentBoundsRef.current.height - nodeRef.current.offsetHeight;

    let newX = position.x;
    let newY = position.y;

    if (centered && !hasBeenDragged) {
      newX = (parentBoundsRef.current.width - nodeRef.current.offsetWidth) / 2;
      newY = (parentBoundsRef.current.height - nodeRef.current.offsetHeight) / 2;
    }

    if (newX < minX) newX = minX;
    if (newX > maxX) newX = maxX;

    if (newY < minY) newY = minY;
    if (newY > maxY) newY = maxY;

    setPosition({ x: newX, y: newY });
  }, [centered, hasBeenDragged, position.x, position.y]);

  useLayoutEffect(() => {
    const handleResizeEvent = () => handleResize();

    window.addEventListener('resize', handleResizeEvent);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResizeEvent);
    };
  }, [handleResize]);

  useLayoutEffect(() => {
    calculateInitialPosition();

    const handleDragMoveMemoized = (event: MouseEvent | TouchEvent) => handleDragMove(event);
    const handleDragEndMemoized = () => handleDragEnd();

    document.addEventListener('mousemove', handleDragMoveMemoized);
    document.addEventListener('touchmove', handleDragMoveMemoized, { passive: false });
    document.addEventListener('mouseup', handleDragEndMemoized);
    document.addEventListener('touchend', handleDragEndMemoized);

    return () => {
      document.removeEventListener('mousemove', handleDragMoveMemoized);
      document.removeEventListener('touchmove', handleDragMoveMemoized);
      document.removeEventListener('mouseup', handleDragEndMemoized);
      document.removeEventListener('touchend', handleDragEndMemoized);
    };
  }, [handleDragMove, handleDragEnd, calculateInitialPosition]);

  return (
    <div
      ref={nodeRef}
      id={id}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      className="react-draggable"
      style={{
        position: 'absolute',
        transform: `translate(-${position.x}px, -${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        ...sx,
      }}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;
