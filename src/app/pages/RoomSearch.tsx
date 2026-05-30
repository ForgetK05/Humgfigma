import { Search, Eye } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function RoomSearch() {
  const rooms = [
    { id: "P201", building: "A", capacity: 60, type: "Lý thuyết", status: "Trống", statusVariant: "success" as const },
    { id: "P305", building: "B", capacity: 45, type: "Máy tính", status: "Trống", statusVariant: "success" as const },
    { id: "P301", building: "A", capacity: 45, type: "Máy tính", status: "Đã có lịch", statusVariant: "danger" as const },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Bộ lọc tìm kiếm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Học kỳ</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
              <option>HK1 2025-2026</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Thứ</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
              <option>Thứ 2</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Ca học</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
              <option>Ca 1</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Sức chứa tối thiểu</label>
            <input type="number" defaultValue="40" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Loại phòng</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
              <option>Tất cả</option>
              <option>Lý thuyết</option>
              <option>Máy tính</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors flex items-center gap-2 shadow-sm">
            <Search size={16} />
            Tra cứu
          </button>
        </div>
      </Card>

      <Card>
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Kết quả tra cứu</h2>
          <span className="text-sm text-slate-500">Tìm thấy {rooms.length} phòng</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-3 font-medium">Phòng</th>
                <th className="px-6 py-3 font-medium">Tòa nhà</th>
                <th className="px-6 py-3 font-medium">Sức chứa</th>
                <th className="px-6 py-3 font-medium">Loại phòng</th>
                <th className="px-6 py-3 font-medium">Trạng thái</th>
                <th className="px-6 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{room.id}</td>
                  <td className="px-6 py-4 text-slate-600">{room.building}</td>
                  <td className="px-6 py-4 text-slate-600">{room.capacity}</td>
                  <td className="px-6 py-4 text-slate-600">{room.type}</td>
                  <td className="px-6 py-4">
                    <Badge variant={room.statusVariant}>{room.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {room.status === "Trống" ? (
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Chọn phòng
                      </button>
                    ) : (
                      <button className="text-slate-500 hover:text-slate-700 font-medium text-sm flex items-center gap-1 justify-end w-full">
                        <Eye size={14} />
                        Xem lịch
                      </button>
                    )}
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
