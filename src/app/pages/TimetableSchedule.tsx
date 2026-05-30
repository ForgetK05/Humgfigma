import { useState } from "react";
import { Check, X, AlertTriangle, Info, Search } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function TimetableSchedule() {
  const [showModal, setShowModal] = useState(false);

  const scheduleList = [
    { class: "CNTT01", subject: "Phân tích thiết kế hệ thống", teacher: "Nguyễn Văn A", room: "P301", time: "Thứ 2 - Ca 1", status: "Chờ kiểm tra", statusVariant: "info" as const },
    { class: "CNTT02", subject: "Cơ sở dữ liệu", teacher: "Trần Văn B", room: "P202", time: "Thứ 3 - Ca 2", status: "Hợp lệ", statusVariant: "success" as const },
    { class: "CNTT03", subject: "Java", teacher: "Lê Văn C", room: "P301", time: "Thứ 2 - Ca 1", status: "Trùng phòng", statusVariant: "danger" as const },
  ];

  return (
    <div className="space-y-6 relative">
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Thông tin xếp lịch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Học kỳ</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              <option>HK1 2025-2026</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Lớp học phần</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              <option>CNTT01 - Phân tích thiết kế HT</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Giảng viên</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              <option>TS. Nguyễn Văn A</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Phòng học</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              <option>P301</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Thứ</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              <option>Thứ 2</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Ca học</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              <option>Ca 1 - 07:00 đến 09:25</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Ngày bắt đầu</label>
            <input type="date" defaultValue="2025-09-01" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Ngày kết thúc</label>
            <input type="date" defaultValue="2025-12-15" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Search size={16} />
            Kiểm tra trùng lịch
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors flex items-center gap-2 shadow-sm">
            <Check size={16} />
            Lưu thời khóa biểu
          </button>
        </div>
      </Card>

      <Card>
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Danh sách đã xếp</h2>
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
              {scheduleList.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-blue-600">{row.class}</td>
                  <td className="px-6 py-4 text-slate-700">{row.subject}</td>
                  <td className="px-6 py-4 text-slate-600">{row.teacher}</td>
                  <td className={`px-6 py-4 ${row.statusVariant === 'danger' ? 'font-medium text-red-600' : 'text-slate-700'}`}>{row.room}</td>
                  <td className="px-6 py-4 text-slate-600">{row.time}</td>
                  <td className="px-6 py-4"><Badge variant={row.statusVariant}>{row.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Conflict Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-700 font-semibold">
                <AlertTriangle size={20} />
                Phát hiện trùng lịch
              </div>
              <button onClick={() => setShowModal(false)} className="text-red-400 hover:text-red-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Loại trùng:</span>
                  <span className="font-medium text-red-600">Trùng phòng học</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phòng:</span>
                  <span className="font-medium text-slate-800">P301</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thời gian:</span>
                  <span className="font-medium text-slate-800">Thứ 2 - Ca 1</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-200">
                  <span className="text-slate-500">Lớp đang sử dụng:</span>
                  <span className="font-medium text-blue-600">CNTT03 - Java</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  <Info size={16} className="text-blue-500" />
                  Gợi ý xử lý:
                </h4>
                <ul className="text-sm text-slate-600 space-y-1.5 pl-6 list-disc marker:text-slate-400">
                  <li>Chọn phòng khác</li>
                  <li>Chọn ca học khác</li>
                  <li>Chọn thứ khác</li>
                </ul>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-white font-medium text-sm transition-colors"
              >
                Đóng
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors flex items-center gap-2">
                <Search size={16} />
                Tìm phòng trống
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
