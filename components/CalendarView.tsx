"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from '@/lib/types/frontend';
import { EventClickArg } from '@fullcalendar/core';



interface CalendarViewProps {
   initialEvents: Event[];
}

// Function to generate a color based on ORMAWA ID
const getColorForOrmawa = (ormawaId: number) => {
   const hue = (ormawaId * 137.508) % 360; // Golden angle approximation
   return `hsl(${hue}, 70%, 50%)`;
};

export function CalendarView({ initialEvents }: CalendarViewProps) {
   const formattedEvents = initialEvents.map(event => ({
       id: event.id.toString(),
       title: event.title,
       start: event.start_time,
       end: event.end_time,
       extendedProps: {
           description: event.description,
           ormawaName: event.ormawa.name,
       },
       backgroundColor: getColorForOrmawa(event.ormawa.id),
       borderColor: getColorForOrmawa(event.ormawa.id),
   }));

   return (
       <FullCalendar
           plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
           initialView="dayGridMonth"
           headerToolbar={{
               left: 'prev,next today',
               center: 'title',
               right: 'dayGridMonth,timeGridWeek,listWeek'
           }}
           events={formattedEvents}
           locale="id"
           buttonText={{
               today: 'Hari Ini',
               month: 'Bulan',
               week: 'Minggu',
               list: 'Daftar'
           }}
           eventClick={({ event: clickedEvent }: EventClickArg) => {
               alert(
                   `Acara: ${clickedEvent.title || 'N/A'}
` +
                   `Penyelenggara: ${clickedEvent.extendedProps?.ormawaName || 'N/A'}
` +
                   `Deskripsi: ${clickedEvent.extendedProps?.description || 'N/A'}`
               );
           }}
           height="auto"
           contentHeight="auto"
       />
   );
}
