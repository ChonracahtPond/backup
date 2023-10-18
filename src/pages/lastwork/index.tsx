import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import LayoutPages from '@/components/layout';

interface Backupsever {
  id: number;
  name: string;
  os: string;
  status: string;
  detail: string;
  date: string;
}

const convertBackupseversToEvents = (backupsevers: Backupsever[]): any[] => {
  return backupsevers.map((backupsever) => {
    return {
      title: backupsever.name,
      start: new Date(backupsever.date),
      end: new Date(backupsever.date),
    };
  });
};

function Lastwork() {
  const [backupseverData, setBackupseverData] = useState<Backupsever[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventsData, setEventsData] = useState<any[]>([]); // Use any[] for events data
  const localizer = momentLocalizer(moment);
  const [selectedEvent, setSelectedEvent] = useState<Backupsever | null>(null);

  useEffect(() => {
    fetch('/api/backupsever')
      .then((response) => response.json())
      .then((data: { backupsever: Backupsever[] }) => {
        const eventsData = convertBackupseversToEvents(data.backupsever);
        setEventsData(eventsData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <LayoutPages>
        <div className='my-10'>
          <Calendar
            localizer={localizer}
            events={eventsData}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultDate={selectedDate}
            onSelectEvent={(event: any) => {
              console.log('Event clicked:', event);
              setSelectedEvent(event);
            }}
            onSelectSlot={(slotInfo: any) => {
              console.log('Slot selected:', slotInfo);
            }}
            onSelectDate={handleDateChange}
          />
        </div>
      </LayoutPages>
    </>
  );
}

export default Lastwork;
