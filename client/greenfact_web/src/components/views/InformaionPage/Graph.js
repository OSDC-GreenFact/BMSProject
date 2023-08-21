import React, { useRef, useEffect, useState } from "react";

function Graph({ maxValue, id }) {
  const XAXIS_PADDING = 30;
  const YAXIS_PADDING = 50;
  const TOP_PADDING = 30;

  const DURATION = 1000 * 5; //30s x축 범위
  const MAX_VALUE = maxValue; //y축 범위

  const YTICK_COUNT = 5; //y축 범위 표시 숫자

  const EX_TIME = "00:00";

  const canvasRef = useRef();
  const [ctx, setCtx] = useState();
  const [mockData, setMockData] = useState([]);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const xFormatWidth = context.measureText(EX_TIME).width;

    const canvasWidth = canvas.width; //canvas의 width
    const canvasHeight = canvas.height; //canvas의 height
    const chartWidth = canvasWidth - YAXIS_PADDING;
    const chartHeight = canvasHeight - XAXIS_PADDING - TOP_PADDING;

    let endTime, startTime, xTimeInterval;

    const setTime = () => {
      endTime = requestRef.current * 5 + DURATION;
      startTime = requestRef.current * 5;
      setXInterval();
    };
    const setXInterval = () => {
      let xPoint = 0;
      let timeInterval = 1000;
      while (true) {
        xPoint = (timeInterval / DURATION) * chartWidth;
        if (xPoint > xFormatWidth) break;
        timeInterval *= 2;
      }
      xTimeInterval = timeInterval;
    };

    const draw = () => {
      setTime();
      if (requestRef.current % 200 === 0) {
        const before =
          mockData.length >= 30 ? mockData.slice(1) : mockData.slice();
        setMockData([
          ...before,
          [requestRef.current * 5 + DURATION, Math.random() * MAX_VALUE],
        ]);
      }
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.beginPath();
      context.moveTo(YAXIS_PADDING, TOP_PADDING);
      context.lineTo(YAXIS_PADDING, chartHeight + TOP_PADDING); //y축 그리기

      context.textAlign = "right";
      context.textBaseline = "middle";
      context.lineWidth = "5";
      context.strokeStyle = "#949494"; //선 색상
      context.fillStyle = "#949494"; //텍스트 색상
      context.font = "20px MontserratExtraBold";
      const yInterval = MAX_VALUE / YTICK_COUNT; //y축 범례 그리기
      for (let i = 0; i < YTICK_COUNT + 1; i++) {
        const value = i * yInterval;
        const yPoint = TOP_PADDING + chartHeight * (1 - value / MAX_VALUE);
        context.fillText(value, YAXIS_PADDING - 3, yPoint);
      }
      context.lineTo(canvasWidth, chartHeight + TOP_PADDING); //x축 그리기
      context.stroke();

      //clip 범위 지정
      context.save();
      context.beginPath();
      context.rect(YAXIS_PADDING, 0, chartWidth, canvasHeight);
      context.clip();

      context.textAlign = "center"; //x축 범례 그리기
      context.textBaseline = "top";
      let currentTime = startTime - (startTime % xTimeInterval); // starttime을 xtimeinterval의 배수로 만듦
      while (currentTime < endTime + xTimeInterval) {
        const xPoint = ((currentTime - startTime) / DURATION) * chartWidth;
        const date = new Date(currentTime);
        const text = date.getMinutes() + ":" + date.getSeconds();
        context.beginPath();
        context.moveTo(xPoint, TOP_PADDING);
        context.lineTo(xPoint, chartHeight + TOP_PADDING);
        context.setLineDash([20]);
        context.stroke();
        context.fillText(text, xPoint, chartHeight + TOP_PADDING + 5);
        currentTime += xTimeInterval;
      }
      //data 그래프 그리기
      context.strokeStyle = "#FFFFFF"; //선 색상
      context.beginPath();
      mockData.forEach((data, index) => {
        context.setLineDash([0]);
        const [time, value] = data;
        const xPoint = ((time - startTime) / DURATION) * chartWidth;
        const yPoint = chartHeight * (1 - value / MAX_VALUE);
        const graphValue = value;
        if (!index) {
          context.moveTo(xPoint, yPoint);
          // context.fillText(graphValue, xPoint, yPoint - 10);
        } else {
          context.lineTo(xPoint, yPoint);
          // context.fillText(graphValue, xPoint, yPoint - 10);
        }
      });

      context.stroke();
      context.restore();
      setCtx(context);
      requestRef.current = requestAnimationFrame(draw);
    };
    requestRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mockData]);

  return (
    <div style={{ width: "250px", height: "125px" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        width="1000"
        height="600"
      ></canvas>
    </div>
  );
}

export default Graph;
