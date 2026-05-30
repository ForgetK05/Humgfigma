import { Outlet, useLocation } from "../router-exports";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMemo } from "react";

export function AdminLayout() {
  const location = useLocation();
  
  const title = useMemo(() => {
    switch (location.pathname) {
      case "/": return "Tổng quan quản lý đào tạo";
      case "/semesters": return "Danh sách học kỳ";
      case "/slots": return "Danh mục ca học";
      case "/schedule": return "Lập thời khóa biểu";
      case "/room-search": return "Tra cứu lịch trống phòng";
      case "/weekly-timetable": return "Xem thời khóa biểu";
      default: return "Hệ thống Quản lý Đào tạo";
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
