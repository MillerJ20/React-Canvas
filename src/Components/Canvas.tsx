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
      width={width}
      height={height}
      ref={canvasRef as any}
    />
  )
}
