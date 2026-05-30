import { ReactNode } from "react";
import { NavLink } from "../router-exports";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  BookOpen,
  Building,
  CalendarPlus,
  Search,
  BarChart3,
  CalendarDays,
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Tổng quan", path: "/", icon: LayoutDashboard },
  { name: "Học kỳ", path: "/semesters", icon: Calendar },
  { name: "Ca học", path: "/slots", icon: Clock },
  { name: "Lớp học phần", path: "#", icon: BookOpen },
  { name: "Phòng học", path: "#", icon: Building },
  {
    name: "Thời khóa biểu",
    path: "/schedule",
    icon: CalendarPlus,
  },
  {
    name: "Xem thời khóa biểu",
    path: "/weekly-timetable",
    icon: CalendarDays,
  },
  {
    name: "Tra cứu phòng trống",
    path: "/room-search",
    icon: Search,
  },
  { name: "Báo cáo", path: "#", icon: BarChart3 },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen shrink-0 sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 text-white font-bold text-lg leading-tight">
          <ImageWithFallback
            src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Truong_Dai_hoc_Mo_-_Dia_chat.jpg"
            alt="HUMG Logo"
            className="w-10 h-10 object-contain bg-white rounded-full p-1"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-400">
              HUMG
            </span>
            <span className="text-sm">Quản lý Đào tạo</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 pb-6 space-y-1">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-medium"
                    : "hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={
                      isActive ? "text-white" : "text-slate-400"
                    }
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}