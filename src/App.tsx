import React, { useRef } from 'react';
import { Canvas } from './Components/Canvas';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>();

  return (
    <div className="App">
      <Canvas canvasRef={canvasRef}/>
    </div>
  );
}

export default App;
