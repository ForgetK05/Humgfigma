import { useState } from "react";
import { NavLink } from "../router-exports";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  BookOpen,
  Building2,
  CalendarPlus,
  Search,
  BarChart3,
  CalendarDays,
  Users,
  ChevronDown,
  ChevronRight,
  Home,
  DoorOpen,
  GraduationCap,
  Layers,
  UserCheck,
  ClipboardList,
  ClipboardCheck,
  History,
  Wrench,
  AlertTriangle,
  Settings,
  Cpu,
  PieChart,
  LogIn,
  User,
} from "lucide-react";

interface MenuItem {
  name: string;
  path?: string;
  icon: React.ElementType;
  children?: { name: string; path: string; icon: React.ElementType }[];
}

const MENU_GROUPS: MenuItem[] = [
  {
    name: "Tổng quan",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Người dùng",
    icon: Users,
    children: [
      { name: "Quản lý người dùng", path: "/users", icon: UserCheck },
      { name: "Hồ sơ cá nhân", path: "/profile", icon: User },
    ],
  },
  {
    name: "Cơ sở hạ tầng",
    icon: Building2,
    children: [
      { name: "Tòa nhà", path: "/buildings", icon: Home },
      { name: "Loại phòng", path: "/room-types", icon: Layers },
      { name: "Phòng học", path: "/rooms", icon: DoorOpen },
    ],
  },
  {
    name: "Đào tạo & TKB",
    icon: GraduationCap,
    children: [
      { name: "Học kỳ", path: "/semesters", icon: Calendar },
      { name: "Ca học", path: "/slots", icon: Clock },
      { name: "Môn học", path: "/subjects", icon: BookOpen },
      { name: "Lớp học", path: "/classes", icon: Users },
      { name: "Phân công GD", path: "/assignments", icon: UserCheck },
      { name: "Lập thời khóa biểu", path: "/schedule", icon: CalendarPlus },
      { name: "Xem thời khóa biểu", path: "/weekly-timetable", icon: CalendarDays },
      { name: "Tra cứu phòng trống", path: "/room-search", icon: Search },
    ],
  },
  {
    name: "Đăng ký phòng",
    icon: ClipboardList,
    children: [
      { name: "Đặt phòng học", path: "/booking", icon: CalendarPlus },
      { name: "Phê duyệt phiếu", path: "/booking-approval", icon: ClipboardCheck },
      { name: "Lịch sử đăng ký", path: "/booking-history", icon: History },
    ],
  },
  {
    name: "Thiết bị & Bảo trì",
    icon: Wrench,
    children: [
      { name: "Thiết bị", path: "/equipment", icon: Cpu },
      { name: "Báo cáo sự cố", path: "/incidents", icon: AlertTriangle },
      { name: "Quản lý bảo trì", path: "/maintenance", icon: Settings },
      { name: "Thống kê báo cáo", path: "/maintenance-report", icon: PieChart },
    ],
  },
  {
    name: "Báo cáo tổng hợp",
    path: "/reports",
    icon: BarChart3,
  },
];

function SidebarGroup({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);

  if (item.path) {
    // Direct link item
    const Icon = item.icon;
    return (
      <NavLink
        to={item.path}
        end={item.path === "/"}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm ${
            isActive
              ? "bg-blue-600 text-white font-semibold shadow-sm"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
            <span>{item.name}</span>
          </>
        )}
      </NavLink>
    );
  }

  // Group with children
  const Icon = item.icon;
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
      >
        <Icon size={18} className="text-slate-400 shrink-0" />
        <span className="flex-1 text-left">{item.name}</span>
        {open ? (
          <ChevronDown size={14} className="text-slate-500" />
        ) : (
          <ChevronRight size={14} className="text-slate-500" />
        )}
      </button>
      {open && (
        <div className="mt-1 ml-4 pl-3 border-l border-slate-700 space-y-0.5">
          {item.children?.map((child) => {
            const CIcon = child.icon;
            return (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <CIcon size={15} className={isActive ? "text-white" : "text-slate-500"} />
                    <span>{child.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen shrink-0 sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3 text-white font-bold leading-tight">
          <ImageWithFallback
            src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Truong_Dai_hoc_Mo_-_Dia_chat.jpg"
            alt="HUMG Logo"
            className="w-10 h-10 object-contain bg-white rounded-full p-1 shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-blue-400">HUMG</span>
            <span className="text-xs text-slate-400 font-normal leading-tight">
              Quản lý Phòng học
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {MENU_GROUPS.map((item) => (
          <SidebarGroup key={item.name} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800">
        <NavLink
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-150"
        >
          <LogIn size={18} className="text-slate-500" />
          <span>Đăng xuất</span>
        </NavLink>
      </div>
    </div>
  );
}