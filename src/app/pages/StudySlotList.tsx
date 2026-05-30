import { Plus, Edit2, Trash2 } from "lucide-react";
import { Card } from "../components/ui/Card";

export function StudySlotList() {
  const slots = [
    { id: "CA01", name: "Ca 1", start: "07:00", end: "09:25", note: "Sáng" },
    { id: "CA02", name: "Ca 2", start: "09:35", end: "12:00", note: "Sáng" },
    { id: "CA03", name: "Ca 3", start: "13:00", end: "15:25", note: "Chiều" },
    { id: "CA04", name: "Ca 4", start: "15:35", end: "18:00", note: "Chiều" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
          <Plus size={18} />
          Thêm ca học
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-3 font-medium">Mã ca</th>
                <th className="px-6 py-3 font-medium">Tên ca</th>
                <th className="px-6 py-3 font-medium">Giờ bắt đầu</th>
                <th className="px-6 py-3 font-medium">Giờ kết thúc</th>
                <th className="px-6 py-3 font-medium">Ghi chú</th>
                <th className="px-6 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {slots.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{s.id}</td>
                  <td className="px-6 py-4 text-slate-700">{s.name}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">{s.start}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">{s.end}</td>
                  <td className="px-6 py-4 text-slate-500">{s.note}</td>
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
