import { useState, useEffect, useRef } from "react";
import './App.css';

function Window({id,containerRef,onClick}){
  const isClicked = useRef(false);
  const coord = useRef({startX: 0, startY: 0, lastX:0, lastY:0});
  const container = containerRef.current;
  const windowRef = useRef(null);

  useEffect(() =>{
    if(!windowRef.current) return
    const window = windowRef.current;

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

  return( 
  <div id={id} ref={windowRef} className='window'>
    <button onClick={onClick}>X</button>
    There is text in here.
  </div>
)

  

}

function App() {

  const [windows,setWindows] = useState([]);

  function handleAddWindow(e)
  {
    if(windows.includes(e.target.id)) return
    setWindows(w => [...w,e.target.id])
  }

  function handleDeleteWindow(e)
  {
    setWindows(windows.filter((w)=>w!==e.target.parentNode.id))
  }

  const containerRef = useRef(null);

  return (
    <main>
      <div ref={containerRef} className='container'>
        <button id="window" onClick={handleAddWindow}>window</button>
        {windows.map((e)=><Window key={e} id={e} containerRef={containerRef} onClick={handleDeleteWindow}></Window>)}
        
      </div>
    </main>
  );
}

export default App;
