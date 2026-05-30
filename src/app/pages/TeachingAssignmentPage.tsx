import { useState } from "react";
import { UserCheck, Plus, Trash2, Search, X, Save, AlertTriangle } from "lucide-react";

const MOCK_ASSIGNMENTS = [
  { maPhanCong: "PC001", hocKy: "2024-1", namHoc: "2024-2025", giangVien: "TS. Nguyễn Văn An", userID: "gv001", maMonHoc: "IT001", tenMonHoc: "Lập trình cơ bản", maLop: "CNTT01", tenLop: "Lớp CNTT - Lập trình 01" },
  { maPhanCong: "PC002", hocKy: "2024-1", namHoc: "2024-2025", giangVien: "ThS. Trần Thị Bình", userID: "gv002", maMonHoc: "IT002", tenMonHoc: "Cơ sở dữ liệu", maLop: "CNTT02", tenLop: "Lớp CNTT - CSDL 01" },
  { maPhanCong: "PC003", hocKy: "2024-1", namHoc: "2024-2025", giangVien: "TS. Nguyễn Văn An", userID: "gv001", maMonHoc: "IT003", tenMonHoc: "Phân tích thiết kế HT", maLop: "CNTT03", tenLop: "Lớp CNTT - PTTKHT 01" },
  { maPhanCong: "PC004", hocKy: "2024-1", namHoc: "2024-2025", giangVien: "ThS. Lê Minh Tuấn", userID: "gv003", maMonHoc: "MT001", tenMonHoc: "Toán cao cấp", maLop: "MT01", tenLop: "Lớp Toán A1 - K23" },
  { maPhanCong: "PC005", hocKy: "2024-1", namHoc: "2024-2025", giangVien: "ThS. Trần Thị Bình", userID: "gv002", maMonHoc: "IT004", tenMonHoc: "Mạng máy tính", maLop: "CNTT04", tenLop: "Lớp Mạng MT 01" },
];

const TEACHERS = ["TS. Nguyễn Văn An", "ThS. Trần Thị Bình", "ThS. Lê Minh Tuấn", "PGS.TS. Phạm Quang Huy"];
const SEMESTERS = ["2024-1", "2024-2", "2025-1"];
const YEAR = ["2024-2025", "2025-2026"];

export function TeachingAssignmentPage() {
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [search, setSearch] = useState("");
  const [filterSem, setFilterSem] = useState("Tất cả");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ hocKy: "2024-1", namHoc: "2024-2025", giangVien: TEACHERS[0], userID: "gv001", maMonHoc: "", tenMonHoc: "", maLop: "", tenLop: "" });

  const filtered = assignments.filter((a) => {
    const matchSearch = a.giangVien.toLowerCase().includes(search.toLowerCase()) || a.maLop.toLowerCase().includes(search.toLowerCase()) || a.tenMonHoc.toLowerCase().includes(search.toLowerCase());
    const matchSem = filterSem === "Tất cả" || a.hocKy === filterSem;
    return matchSearch && matchSem;
  });

  const handleSave = () => {
    const newId = `PC${String(assignments.length + 1).padStart(3, "0")}`;
    setAssignments([...assignments, { ...form, maPhanCong: newId }]);
    setShowModal(false);
  };
  const handleDelete = (id: string) => { if (confirm("Xóa phân công này?")) setAssignments(assignments.filter((a) => a.maPhanCong !== id)); };

  // Count per teacher
  const teacherCount = TEACHERS.reduce((acc, t) => { acc[t] = assignments.filter((a) => a.giangVien === t).length; return acc; }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Teacher summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TEACHERS.map((t, i) => {
          const COLORS = ["bg-blue-50 border-blue-200 text-blue-700", "bg-purple-50 border-purple-200 text-purple-700", "bg-teal-50 border-teal-200 text-teal-700", "bg-amber-50 border-amber-200 text-amber-700"];
          const initials = t.split(" ").slice(-2).map((w) => w[0]).join("");
          return (
            <div key={t} className={`bg-white rounded-xl border p-4 ${COLORS[i]}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-current/10 flex items-center justify-center font-bold text-sm">{initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{t}</div>
                  <div className="text-lg font-bold">{teacherCount[t] || 0} lớp</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <h2 className="text-base font-semibold text-slate-800 flex-1">Bảng Phân công Giảng dạy</h2>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm..." className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none w-40" />
            </div>
            <select value={filterSem} onChange={(e) => setFilterSem(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
              <option value="Tất cả">Tất cả HK</option>
              {SEMESTERS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              <Plus size={15} /> Phân công mới
            </button>
          </div>
        </div>

        {/* Duplicate check warning */}
        <div className="mx-5 mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm text-amber-700">
          <AlertTriangle size={15} className="text-amber-500 shrink-0" />
          Hệ thống sẽ tự động kiểm tra trùng lặp phân công trước khi lưu.
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Mã PC</th>
                <th className="px-5 py-3 font-medium">Giảng viên</th>
                <th className="px-5 py-3 font-medium">Môn học</th>
                <th className="px-5 py-3 font-medium">Lớp học</th>
                <th className="px-5 py-3 font-medium">Học kỳ</th>
                <th className="px-5 py-3 font-medium">Năm học</th>
                <th className="px-5 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((a) => (
                <tr key={a.maPhanCong} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{a.maPhanCong}</td>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-slate-800">{a.giangVien}</div>
                    <div className="text-xs text-slate-400 font-mono">{a.userID}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-slate-700">{a.tenMonHoc}</div>
                    <div className="text-xs text-slate-400 font-mono">{a.maMonHoc}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-slate-700">{a.tenLop}</div>
                    <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{a.maLop}</span>
                  </td>
                  <td className="px-5 py-3.5"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">{a.hocKy}</span></td>
                  <td className="px-5 py-3.5 text-slate-500 text-sm">{a.namHoc}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => handleDelete(a.maPhanCong)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-16 text-center text-slate-400">Không tìm thấy phân công nào.</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-slate-800">Tạo Phân công Giảng dạy</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Học kỳ</label>
                <select value={form.hocKy} onChange={(e) => setForm({ ...form, hocKy: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {SEMESTERS.map((s) => <option key={s}>{s}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Năm học</label>
                <select value={form.namHoc} onChange={(e) => setForm({ ...form, namHoc: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {YEAR.map((y) => <option key={y}>{y}</option>)}</select></div>
              <div className="col-span-2"><label className="block text-xs font-medium text-slate-600 mb-1">Giảng viên</label>
                <select value={form.giangVien} onChange={(e) => setForm({ ...form, giangVien: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {TEACHERS.map((t) => <option key={t}>{t}</option>)}</select></div>
              {[{ label: "Mã môn học", key: "maMonHoc" }, { label: "Tên môn học", key: "tenMonHoc" }, { label: "Mã lớp học", key: "maLop" }, { label: "Tên lớp học", key: "tenLop" }].map(({ label, key }) => (
                <div key={key}><label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                  <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              ))}
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              <UserCheck size={13} className="inline mr-1" />
              Hệ thống sẽ kiểm tra: 1 lớp – 1 môn – 1 học kỳ chỉ được phân công 1 giảng viên.
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm text-slate-600">Hủy</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                <Save size={15} /> Xác nhận phân công
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
