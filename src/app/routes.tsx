import { createBrowserRouter } from "./router-exports";
import { AdminLayout } from "./layouts/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { SemesterList } from "./pages/SemesterList";
import { StudySlotList } from "./pages/StudySlotList";
import { TimetableSchedule } from "./pages/TimetableSchedule";
import { RoomSearch } from "./pages/RoomSearch";
import { WeeklyTimetable } from "./pages/WeeklyTimetable";
import { LoginPage } from "./pages/LoginPage";
import { UserManagementPage } from "./pages/UserManagementPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { BuildingManagementPage } from "./pages/BuildingManagementPage";
import { RoomTypePage } from "./pages/RoomTypePage";
import { RoomManagementPage } from "./pages/RoomManagementPage";
import { SubjectManagementPage } from "./pages/SubjectManagementPage";
import { ClassManagementPage } from "./pages/ClassManagementPage";
import { TeachingAssignmentPage } from "./pages/TeachingAssignmentPage";
import { RoomBookingPage } from "./pages/RoomBookingPage";
import { BookingApprovalPage } from "./pages/BookingApprovalPage";
import { BookingHistoryPage } from "./pages/BookingHistoryPage";
import { EquipmentManagementPage } from "./pages/EquipmentManagementPage";
import { IncidentReportPage } from "./pages/IncidentReportPage";
import { MaintenancePage } from "./pages/MaintenancePage";
import { MaintenanceReportPage } from "./pages/MaintenanceReportPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      // Users
      { path: "users", Component: UserManagementPage },
      { path: "profile", Component: UserProfilePage },
      // Infrastructure
      { path: "buildings", Component: BuildingManagementPage },
      { path: "room-types", Component: RoomTypePage },
      { path: "rooms", Component: RoomManagementPage },
      // Training & Timetable
      { path: "semesters", Component: SemesterList },
      { path: "slots", Component: StudySlotList },
      { path: "subjects", Component: SubjectManagementPage },
      { path: "classes", Component: ClassManagementPage },
      { path: "assignments", Component: TeachingAssignmentPage },
      { path: "schedule", Component: TimetableSchedule },
      { path: "room-search", Component: RoomSearch },
      { path: "weekly-timetable", Component: WeeklyTimetable },
      // Room Booking
      { path: "booking", Component: RoomBookingPage },
      { path: "booking-approval", Component: BookingApprovalPage },
      { path: "booking-history", Component: BookingHistoryPage },
      // Equipment & Maintenance
      { path: "equipment", Component: EquipmentManagementPage },
      { path: "incidents", Component: IncidentReportPage },
      { path: "maintenance", Component: MaintenancePage },
      { path: "maintenance-report", Component: MaintenanceReportPage },
    ],
  },
]);
