import { createBrowserRouter } from "./router-exports";
import { AdminLayout } from "./layouts/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { SemesterList } from "./pages/SemesterList";
import { StudySlotList } from "./pages/StudySlotList";
import { TimetableSchedule } from "./pages/TimetableSchedule";
import { RoomSearch } from "./pages/RoomSearch";
import { WeeklyTimetable } from "./pages/WeeklyTimetable";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "semesters", Component: SemesterList },
      { path: "slots", Component: StudySlotList },
      { path: "schedule", Component: TimetableSchedule },
      { path: "room-search", Component: RoomSearch },
      { path: "weekly-timetable", Component: WeeklyTimetable },
    ],
  },
]);
