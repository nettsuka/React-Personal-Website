import { useEffect, useRef } from "react";
import './App.css';

function App() {

  const isClicked = useRef(false);
  const coord = useRef({startX: 0, startY: 0, lastX:0, lastY:0});

  const containerRef = useRef(null);
  const windowRef = useRef(null);

  useEffect(() =>{
    if(!windowRef.current || !containerRef.current) return
    const window = windowRef.current;
    const container = containerRef.current;

    const onMouseDown = (e) => {
      isClicked.current = true;
      coord.current.startX = e.clientX;
      coord.current.startY = e.clientY;
    }

    const onMouseUp = (e) => {
      isClicked.current = false;
      coord.current.lastX = window.offsetLeft;
      coord.current.lastY = window.offsetTop;
    }

    const onMouseMove = (e) => {
      if(!isClicked.current) return;

      const nextX = e.clientX - coord.current.startX + coord.current.lastX;
      const nextY = e.clientY - coord.current.startY + coord.current.lastY;

      window.style.top = `${nextY}px`;
      window.style.left = `${nextX}px`;
    }

    window.addEventListener('mousedown',onMouseDown);
    window.addEventListener('mouseup',onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseUp);
    }

    return cleanup;
  })


  return (
    <main>
      <div ref={containerRef} className='container'>
        <div ref={windowRef} className='window'>There is text in here.</div>
      </div>
    </main>
  );
}

export default App;
