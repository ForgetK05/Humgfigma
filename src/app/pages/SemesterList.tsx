import { Plus, Search, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Card, Badge } from "../components/ui/Card";

export function SemesterList() {
  const semesters = [
    { id: "HK1_2025", name: "Học kỳ 1", year: "2025-2026", start: "01/09/2025", end: "15/01/2026", status: "Đang mở" },
    { id: "HK2_2025", name: "Học kỳ 2", year: "2025-2026", start: "10/02/2026", end: "30/06/2026", status: "Chưa mở" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm học kỳ..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 shadow-sm"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
          <Plus size={18} />
          Thêm học kỳ
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-3 font-medium">Mã học kỳ</th>
                <th className="px-6 py-3 font-medium">Tên học kỳ</th>
                <th className="px-6 py-3 font-medium">Năm học</th>
                <th className="px-6 py-3 font-medium">Ngày bắt đầu</th>
                <th className="px-6 py-3 font-medium">Ngày kết thúc</th>
                <th className="px-6 py-3 font-medium">Trạng thái</th>
                <th className="px-6 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {semesters.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{s.id}</td>
                  <td className="px-6 py-4 text-slate-700">{s.name}</td>
                  <td className="px-6 py-4 text-slate-600">{s.year}</td>
                  <td className="px-6 py-4 text-slate-600">{s.start}</td>
                  <td className="px-6 py-4 text-slate-600">{s.end}</td>
                  <td className="px-6 py-4">
                    <Badge variant={s.status === "Đang mở" ? "success" : "default"}>
                      {s.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-slate-400 hover:text-blue-600 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-red-600 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
