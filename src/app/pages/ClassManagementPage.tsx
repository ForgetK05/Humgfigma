import { useState } from "react";
import { Users, Plus, Edit2, Trash2, Search, X, Save } from "lucide-react";

const MOCK_CLASSES = [
  { maLop: "CNTT01", tenLop: "Lớp CNTT - Lập trình cơ bản 01", siSo: 45, maMonHoc: "IT001", hocKy: "2024-1" },
  { maLop: "CNTT02", tenLop: "Lớp CNTT - Cơ sở dữ liệu 01", siSo: 40, maMonHoc: "IT002", hocKy: "2024-1" },
  { maLop: "CNTT03", tenLop: "Lớp CNTT - PTTKHT 01", siSo: 38, maMonHoc: "IT003", hocKy: "2024-1" },
  { maLop: "CNTT04", tenLop: "Lớp CNTT - Mạng máy tính 01", siSo: 42, maMonHoc: "IT004", hocKy: "2024-1" },
  { maLop: "CNTT05", tenLop: "Lớp CNTT - Kỹ thuật phần mềm 01", siSo: 35, maMonHoc: "IT005", hocKy: "2024-1" },
  { maLop: "MT01", tenLop: "Lớp Toán cao cấp A1 - K23", siSo: 55, maMonHoc: "MT001", hocKy: "2024-1" },
  { maLop: "MT02", tenLop: "Lớp Xác suất thống kê - K22", siSo: 48, maMonHoc: "MT002", hocKy: "2024-1" },
  { maLop: "GE01", tenLop: "Tiếng Anh chuyên ngành CNTT", siSo: 30, maMonHoc: "GE001", hocKy: "2024-1" },
];

const SIZE_COLOR = (s: number) => s >= 50 ? "text-red-600 bg-red-50" : s >= 40 ? "text-amber-600 bg-amber-50" : "text-green-600 bg-green-50";

export function ClassManagementPage() {
  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<typeof MOCK_CLASSES[0] | null>(null);
  const [form, setForm] = useState({ maLop: "", tenLop: "", siSo: 30, maMonHoc: "", hocKy: "2024-1" });

  const filtered = classes.filter((c) =>
    c.tenLop.toLowerCase().includes(search.toLowerCase()) || c.maLop.toLowerCase().includes(search.toLowerCase()) || c.maMonHoc.toLowerCase().includes(search.toLowerCase())
  );
  const openAdd = () => { setEditItem(null); setForm({ maLop: "", tenLop: "", siSo: 30, maMonHoc: "", hocKy: "2024-1" }); setShowModal(true); };
  const openEdit = (c: typeof MOCK_CLASSES[0]) => { setEditItem(c); setForm({ ...c }); setShowModal(true); };
  const handleSave = () => {
    if (editItem) setClasses(classes.map((c) => c.maLop === editItem.maLop ? { ...c, ...form } : c));
    else setClasses([...classes, form]);
    setShowModal(false);
  };
  const handleDelete = (id: string) => { if (confirm("Xóa lớp học này?")) setClasses(classes.filter((c) => c.maLop !== id)); };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Tổng lớp học", value: classes.length, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Tổng sinh viên", value: classes.reduce((s, c) => s + c.siSo, 0), color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Sĩ số TB/lớp", value: Math.round(classes.reduce((s, c) => s + c.siSo, 0) / classes.length), color: "text-teal-600", bg: "bg-teal-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-10 h-10 rounded-full ${s.bg} ${s.color} flex items-center justify-center`}><Users size={20} /></div>
            <div><div className="text-xs text-slate-500">{s.label}</div><div className="text-xl font-bold text-slate-800">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <h2 className="text-base font-semibold text-slate-800 flex-1">Danh sách Lớp học</h2>
          <div className="relative">
            <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm..." className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-44" />
          </div>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <Plus size={15} /> Thêm lớp
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Mã lớp</th>
                <th className="px-5 py-3 font-medium">Tên lớp học phần</th>
                <th className="px-5 py-3 font-medium">Mã môn học</th>
                <th className="px-5 py-3 font-medium">Học kỳ</th>
                <th className="px-5 py-3 font-medium">Sĩ số</th>
                <th className="px-5 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.maLop} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{c.maLop}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{c.tenLop}</td>
                  <td className="px-5 py-3.5"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-mono">{c.maMonHoc}</span></td>
                  <td className="px-5 py-3.5 text-slate-600">{c.hocKy}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${SIZE_COLOR(c.siSo)}`}>
                      <Users size={10} />{c.siSo}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => openEdit(c)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg mr-1"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(c.maLop)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-16 text-center text-slate-400">Không tìm thấy lớp học nào.</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-slate-800">{editItem ? "Sửa lớp học" : "Thêm lớp học"}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-3">
              {[{ label: "Mã lớp", key: "maLop", disabled: !!editItem }, { label: "Tên lớp học phần", key: "tenLop" }, { label: "Mã môn học", key: "maMonHoc" }, { label: "Học kỳ", key: "hocKy" }].map(({ label, key, disabled }) => (
                <div key={key}><label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                  <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} disabled={disabled}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50" /></div>
              ))}
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Sĩ số</label>
                <input type="number" min={1} value={form.siSo} onChange={(e) => setForm({ ...form, siSo: Number(e.target.value) })}
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
