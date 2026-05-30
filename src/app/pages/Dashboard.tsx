import { Card, Badge } from "../components/ui/Card";
import { BookOpen, Users, Building, CalendarCheck, AlertTriangle } from "lucide-react";

export function Dashboard() {
  const stats = [
    { label: "Học kỳ", value: "02", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Lớp học phần", value: "36", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Phòng học", value: "18", icon: Building, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Lịch đã xếp", value: "124", icon: CalendarCheck, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-6">
      {/* Warning Card */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3">
        <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="text-red-800 font-medium">Cảnh báo xung đột</h3>
          <p className="text-red-700 text-sm mt-1">Có 01 lịch bị trùng phòng học P301 vào Thứ 2 - Ca 1</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                <Icon size={24} />
              </div>
              <div>
                <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
                <div className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Schedule Table */}
      <Card>
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Lịch học gần đây</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-3 font-medium">Lớp học phần</th>
                <th className="px-6 py-3 font-medium">Môn học</th>
                <th className="px-6 py-3 font-medium">Giảng viên</th>
                <th className="px-6 py-3 font-medium">Phòng</th>
                <th className="px-6 py-3 font-medium">Thời gian</th>
                <th className="px-6 py-3 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-blue-600">CNTT01</td>
                <td className="px-6 py-4 text-slate-700">Phân tích thiết kế hệ thống</td>
                <td className="px-6 py-4 text-slate-600">Nguyễn Văn A</td>
                <td className="px-6 py-4 text-slate-700">P301</td>
                <td className="px-6 py-4 text-slate-600">Thứ 2 - Ca 1</td>
                <td className="px-6 py-4"><Badge variant="info">Chờ kiểm tra</Badge></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-blue-600">CNTT02</td>
                <td className="px-6 py-4 text-slate-700">Cơ sở dữ liệu</td>
                <td className="px-6 py-4 text-slate-600">Trần Văn B</td>
                <td className="px-6 py-4 text-slate-700">P202</td>
                <td className="px-6 py-4 text-slate-600">Thứ 3 - Ca 2</td>
                <td className="px-6 py-4"><Badge variant="success">Hợp lệ</Badge></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-blue-600">CNTT03</td>
                <td className="px-6 py-4 text-slate-700">Java</td>
                <td className="px-6 py-4 text-slate-600">Lê Văn C</td>
                <td className="px-6 py-4 text-slate-700 font-medium text-red-600">P301</td>
                <td className="px-6 py-4 text-slate-600">Thứ 2 - Ca 1</td>
                <td className="px-6 py-4"><Badge variant="danger">Trùng phòng</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
