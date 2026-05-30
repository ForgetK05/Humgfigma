import { Outlet, useLocation } from "../router-exports";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMemo } from "react";

const PAGE_TITLES: Record<string, string> = {
  "/": "Tổng quan hệ thống",
  "/users": "Quản lý Người dùng",
  "/profile": "Hồ sơ cá nhân",
  "/buildings": "Quản lý Tòa nhà",
  "/room-types": "Quản lý Loại phòng",
  "/rooms": "Quản lý Phòng học",
  "/semesters": "Danh sách Học kỳ",
  "/slots": "Danh mục Ca học",
  "/subjects": "Quản lý Môn học",
  "/classes": "Quản lý Lớp học",
  "/assignments": "Phân công Giảng dạy",
  "/schedule": "Lập Thời khóa biểu",
  "/room-search": "Tra cứu Phòng trống",
  "/weekly-timetable": "Xem Thời khóa biểu theo tuần",
  "/booking": "Đặt phòng học",
  "/booking-approval": "Phê duyệt Phiếu đăng ký",
  "/booking-history": "Lịch sử Đăng ký",
  "/equipment": "Quản lý Thiết bị",
  "/incidents": "Báo cáo Sự cố Hư hỏng",
  "/maintenance": "Quản lý Bảo trì",
  "/maintenance-report": "Thống kê Báo cáo Bảo trì",
  "/reports": "Báo cáo Tổng hợp",
};

export function AdminLayout() {
  const location = useLocation();

  const title = useMemo(() => {
    return PAGE_TITLES[location.pathname] ?? "Hệ thống Quản lý Phòng học";
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
