import React, { useRef } from 'react';
import { Canvas } from './Components/Canvas';
import { useBrush } from './Hooks/useBrush'

function App() {
  const [{ canvas }, {init}] = useBrush(); 

  return (
    <div className="flex justify-center">
      <button className= 'rounded border-2 border-black p-1 h-10 my-auto mr-2' onClick={init}>Start Drawing</button>
      <Canvas canvasRef={canvas} width={1000} height={500}/>
    </div>
  );
}

export default App;
