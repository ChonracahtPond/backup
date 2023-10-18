import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';

const PieChartWithAPI: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // เรียก API ข้อมูลแผนภูมิ
    fetch('YOUR_API_ENDPOINT')
      .then((response) => response.json())
      .then((apiData) => {
        const { data, labels } = apiData; // แนะนำให้ API ส่งข้อมูลและป้ายกำกับเป็น JSON
        setData(data);
        setLabels(labels);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล: ', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const ctx = document.getElementById('pie-chart') as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels,
            datasets: [
              {
                data,
                backgroundColor: [
                  'red',
                  'blue',
                  'green',
                  'orange',
                  'purple',
                ],
              },
            ],
          },
        });
      }
    }
  }, [data, labels, isLoading]);

  return (
    <div>
      {isLoading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        <canvas id="pie-chart"></canvas>
      )}
    </div>
  );
};

export default PieChartWithAPI;
