import { useCallback, useRef, useState } from "react";

import React from 'react'

export const useBrush = () => {
  const canvas = useRef<HTMLCanvasElement>();
  const [isReady, setIsReady] = useState(false);
  const [isEraser, setIsEraser] = useState(false);

  const isDrawing = useRef(false);
  const direction = useRef(true);
  const isEraserMode = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const ctx = useRef(canvas?.current?.getContext('2d'));

  const drawOnCanvas = useCallback((event: any) => {
    if (!ctx || !ctx.current) {
      return;
    }
    ctx.current.beginPath();
    ctx.current.moveTo(lastX.current, lastY.current);
    ctx.current.lineTo(event.offsetX, event.offsetY);
    ctx.current.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  }, []);

  const handleMouseDown = useCallback((e: any) => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
  }, []);

  const drawNormal = useCallback(
    (e: any) => {
      if (!isDrawing.current || !ctx.current) return;

      if (isEraserMode.current) {

        isEraserMode.current
          ? (ctx.current.globalCompositeOperation = "destination-out")
          : (ctx.current.globalCompositeOperation = "source-over");
      } else {
        ctx.current.globalCompositeOperation = "source-over";
      }
      drawOnCanvas(e);
    },
    [drawOnCanvas],
  );

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const init = useCallback(() => {
    ctx.current = canvas?.current?.getContext("2d");
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener("mousedown", handleMouseDown);
      canvas.current.addEventListener("mousemove", drawNormal);
      canvas.current.addEventListener("mouseup", stopDrawing);
      canvas.current.addEventListener("mouseout", stopDrawing);

      ctx.current.strokeStyle = "#000";
      ctx.current.lineJoin = "round";
      ctx.current.lineCap = "round";
      ctx.current.lineWidth = 10;
      setIsReady(true);
    }
  }, [drawNormal, handleMouseDown, stopDrawing]);

  return [
    {
      canvas,
    },
    {
      init
    }
  ] as any;
}
