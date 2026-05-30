import { useState } from "react";
import { BookOpen, Plus, Edit2, Trash2, Search, X, Save, Hash } from "lucide-react";

const MOCK_SUBJECTS = [
  { maMonHoc: "IT001", tenMonHoc: "Lập trình cơ bản", soTinChi: 3, soLop: 4 },
  { maMonHoc: "IT002", tenMonHoc: "Cơ sở dữ liệu", soTinChi: 3, soLop: 5 },
  { maMonHoc: "IT003", tenMonHoc: "Phân tích thiết kế hệ thống", soTinChi: 3, soLop: 3 },
  { maMonHoc: "IT004", tenMonHoc: "Mạng máy tính", soTinChi: 2, soLop: 2 },
  { maMonHoc: "IT005", tenMonHoc: "Kỹ thuật phần mềm", soTinChi: 3, soLop: 3 },
  { maMonHoc: "IT006", tenMonHoc: "Trí tuệ nhân tạo", soTinChi: 3, soLop: 2 },
  { maMonHoc: "MT001", tenMonHoc: "Toán cao cấp", soTinChi: 4, soLop: 6 },
  { maMonHoc: "MT002", tenMonHoc: "Xác suất thống kê", soTinChi: 3, soLop: 4 },
  { maMonHoc: "GE001", tenMonHoc: "Tiếng Anh chuyên ngành", soTinChi: 3, soLop: 5 },
];

const CREDIT_COLORS = ["", "bg-slate-100 text-slate-600", "bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700", "bg-indigo-100 text-indigo-700"];

export function SubjectManagementPage() {
  const [subjects, setSubjects] = useState(MOCK_SUBJECTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<typeof MOCK_SUBJECTS[0] | null>(null);
  const [form, setForm] = useState({ maMonHoc: "", tenMonHoc: "", soTinChi: 2 });

  const filtered = subjects.filter((s) =>
    s.tenMonHoc.toLowerCase().includes(search.toLowerCase()) || s.maMonHoc.toLowerCase().includes(search.toLowerCase())
  );
  const openAdd = () => { setEditItem(null); setForm({ maMonHoc: "", tenMonHoc: "", soTinChi: 2 }); setShowModal(true); };
  const openEdit = (s: typeof MOCK_SUBJECTS[0]) => { setEditItem(s); setForm({ maMonHoc: s.maMonHoc, tenMonHoc: s.tenMonHoc, soTinChi: s.soTinChi }); setShowModal(true); };
  const handleSave = () => {
    if (editItem) setSubjects(subjects.map((s) => s.maMonHoc === editItem.maMonHoc ? { ...s, ...form } : s));
    else setSubjects([...subjects, { ...form, soLop: 0 }]);
    setShowModal(false);
  };
  const handleDelete = (id: string) => { if (confirm("Xóa môn học này?")) setSubjects(subjects.filter((s) => s.maMonHoc !== id)); };

  const totalCredits = subjects.reduce((sum, s) => sum + s.soTinChi, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Tổng môn học", value: subjects.length, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Tổng tín chỉ", value: totalCredits, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Tổng lớp học phần", value: subjects.reduce((s, m) => s + m.soLop, 0), color: "text-teal-600", bg: "bg-teal-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-10 h-10 rounded-full ${s.bg} ${s.color} flex items-center justify-center`}><BookOpen size={20} /></div>
            <div><div className="text-xs text-slate-500">{s.label}</div><div className="text-xl font-bold text-slate-800">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <h2 className="text-base font-semibold text-slate-800 flex-1">Danh mục Môn học</h2>
          <div className="relative">
            <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm..." className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-44" />
          </div>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <Plus size={15} /> Thêm môn học
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Mã môn học</th>
                <th className="px-5 py-3 font-medium">Tên môn học</th>
                <th className="px-5 py-3 font-medium">Số tín chỉ</th>
                <th className="px-5 py-3 font-medium">Số lớp đang mở</th>
                <th className="px-5 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.maMonHoc} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{s.maMonHoc}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{s.tenMonHoc}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${CREDIT_COLORS[s.soTinChi] || CREDIT_COLORS[3]}`}>
                      <Hash size={10} />{s.soTinChi} TC
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{s.soLop} lớp</td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => openEdit(s)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg mr-1"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(s.maMonHoc)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-16 text-center text-slate-400">Không tìm thấy môn học nào.</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-slate-800">{editItem ? "Sửa môn học" : "Thêm môn học"}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-3">
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Mã môn học</label>
                <input value={form.maMonHoc} onChange={(e) => setForm({ ...form, maMonHoc: e.target.value })} disabled={!!editItem}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50" /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Tên môn học</label>
                <input value={form.tenMonHoc} onChange={(e) => setForm({ ...form, tenMonHoc: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Số tín chỉ</label>
                <input type="number" min={1} max={6} value={form.soTinChi} onChange={(e) => setForm({ ...form, soTinChi: Number(e.target.value) })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm text-slate-600">Hủy</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                <Save size={15} /> Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
