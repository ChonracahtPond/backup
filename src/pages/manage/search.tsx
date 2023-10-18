import LayoutPages from '@/components/layout';
import React, { useState, useEffect } from 'react';

interface Backupsever {
  id: number;
  name: string;
  date: string;
  os: string;
  status: string;
}

function BackupServerList() {
  const [backupseverData, setBackupseverData] = useState<Backupsever[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Backupsever[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/backupsever')
      .then((response) => response.json())
      .then((data) => {
        setBackupseverData(data.backupsever);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filteredResults = backupseverData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setFilteredData([]);
  };

  return (
    <>
    <LayoutPages>

   
    <div className="container mx-auto mt-8 p-4">
      {isLoading ? (
        <div className="text-center text-2xl">Loading...</div>
      ) : (
        <div>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="ค้นหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-3/4 p-2 border border-gray-300 rounded"
            />
            <button
              className="bg-blue-500 text-white rounded p-2"
              onClick={handleSearch}
            >
              ค้นหา
            </button>
            <button
              className="bg-gray-500 text-white rounded p-2"
              onClick={handleResetSearch}
            >
              รีเซ็ต
            </button>
          </div>
          <ul className="space-y-2">
            {filteredData.length > 0 ? (
              filteredData.map((backupsever) => (
                <li
                  key={backupsever.id}
                  className="text-lg p-2 border rounded bg-gray-100"
                >
                  {backupsever.name}- {backupsever.os} - {backupsever.status} - {backupsever.date}
                </li>
              ))
            ) : (
              backupseverData.map((backupsever) => (
                <li
                  key={backupsever.id}
                  className="text-lg p-2 border rounded bg-gray-100"
                >
                  <span className="font-bold">{backupsever.date}</span> -{" "}
                  {backupsever.name} - {backupsever.os} - {backupsever.status}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
    </LayoutPages>
    </>
  );
}

export default BackupServerList;
