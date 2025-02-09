import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import React, { useEffect, useState } from "react";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    dayBoundaries: {
      start: "06:00",
      end: "18:00",
    },
    views: [createViewDay(), createViewWeek()],
    events: [
      {
        id: "1",
        title: "Some",
        start: "2025-01-29 06:30",
        end: "2025-01-29 07:00",
        description: "some class"
      },
    ],
    plugins: [eventsService],
  });

  useEffect(() => {
    // get all events
    const a = eventsService.getAll();
    console.log("yeah - ", a)
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
