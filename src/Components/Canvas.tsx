import React from 'react'

interface Props {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | undefined>;
  width?: number;
  height?: number;
}

export const Canvas: React.FC<Props> = ({
  canvasRef,
  width, 
  height
}) => {

  return (
    <canvas 
      className='rounded border-2 border-black m-2'
      width={width}
      height={height}
      ref={canvasRef as any}
    />
  )
}
