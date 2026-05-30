import { useState } from "react";
import { DoorOpen, Plus, Edit2, Trash2, Search, X, Save, CheckCircle, XCircle, AlertCircle } from "lucide-react";

type RoomStatus = "Sẵn sàng" | "Đang sử dụng" | "Bảo trì";

const STATUS_CONFIG: Record<RoomStatus, { color: string; icon: React.ElementType }> = {
  "Sẵn sàng": { color: "bg-green-100 text-green-700", icon: CheckCircle },
  "Đang sử dụng": { color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  "Bảo trì": { color: "bg-red-100 text-red-700", icon: XCircle },
};

const MOCK_ROOMS = [
  { maPhong: "A301", tenPhong: "Phòng A301", sucChua: 60, trangThai: "Sẵn sàng" as RoomStatus, maToaNha: "TNA", maLoai: "PLT", tang: 3 },
  { maPhong: "A302", tenPhong: "Phòng A302", sucChua: 60, trangThai: "Đang sử dụng" as RoomStatus, maToaNha: "TNA", maLoai: "PLT", tang: 3 },
  { maPhong: "B201", tenPhong: "Phòng B201", sucChua: 80, trangThai: "Sẵn sàng" as RoomStatus, maToaNha: "TNB", maLoai: "PLT", tang: 2 },
  { maPhong: "B202", tenPhong: "Phòng B202", sucChua: 45, trangThai: "Bảo trì" as RoomStatus, maToaNha: "TNB", maLoai: "PTH", tang: 2 },
  { maPhong: "C101", tenPhong: "Phòng C101", sucChua: 40, trangThai: "Sẵn sàng" as RoomStatus, maToaNha: "TNC", maLoai: "PMT", tang: 1 },
  { maPhong: "C102", tenPhong: "Phòng C102", sucChua: 40, trangThai: "Sẵn sàng" as RoomStatus, maToaNha: "TNC", maLoai: "PMT", tang: 1 },
  { maPhong: "D401", tenPhong: "Phòng D401 – Hội thảo lớn", sucChua: 150, trangThai: "Sẵn sàng" as RoomStatus, maToaNha: "TND", maLoai: "PHT", tang: 4 },
  { maPhong: "E301", tenPhong: "Phòng E301", sucChua: 35, trangThai: "Bảo trì" as RoomStatus, maToaNha: "TNE", maLoai: "PTH", tang: 3 },
];

export function RoomManagementPage() {
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [filterBuilding, setFilterBuilding] = useState("Tất cả");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<typeof MOCK_ROOMS[0] | null>(null);
  const [form, setForm] = useState({ maPhong: "", tenPhong: "", sucChua: 40, trangThai: "Sẵn sàng" as RoomStatus, maToaNha: "TNA", maLoai: "PLT", tang: 1 });

  const buildings = ["Tất cả", ...Array.from(new Set(rooms.map((r) => r.maToaNha)))];
  const filtered = rooms.filter((r) => {
    const matchSearch = r.tenPhong.toLowerCase().includes(search.toLowerCase()) || r.maPhong.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Tất cả" || r.trangThai === filterStatus;
    const matchBuilding = filterBuilding === "Tất cả" || r.maToaNha === filterBuilding;
    return matchSearch && matchStatus && matchBuilding;
  });

  const openAdd = () => { setEditItem(null); setForm({ maPhong: "", tenPhong: "", sucChua: 40, trangThai: "Sẵn sàng", maToaNha: "TNA", maLoai: "PLT", tang: 1 }); setShowModal(true); };
  const openEdit = (r: typeof MOCK_ROOMS[0]) => { setEditItem(r); setForm({ ...r }); setShowModal(true); };
  const handleSave = () => {
    if (editItem) setRooms(rooms.map((r) => r.maPhong === editItem.maPhong ? { ...r, ...form } : r));
    else setRooms([...rooms, form]);
    setShowModal(false);
  };
  const handleDelete = (id: string) => { if (confirm("Xóa phòng học này?")) setRooms(rooms.filter((r) => r.maPhong !== id)); };

  const stats = [
    { label: "Tổng phòng", value: rooms.length, color: "text-slate-600", bg: "bg-slate-100" },
    { label: "Sẵn sàng", value: rooms.filter((r) => r.trangThai === "Sẵn sàng").length, color: "text-green-600", bg: "bg-green-100" },
    { label: "Đang sử dụng", value: rooms.filter((r) => r.trangThai === "Đang sử dụng").length, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Bảo trì", value: rooms.filter((r) => r.trangThai === "Bảo trì").length, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-10 h-10 rounded-full ${s.bg} ${s.color} flex items-center justify-center`}><DoorOpen size={20} /></div>
            <div><div className="text-xs text-slate-500">{s.label}</div><div className="text-xl font-bold text-slate-800">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <h2 className="text-base font-semibold text-slate-800 flex-1">Danh sách Phòng học</h2>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm..." className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40" />
            </div>
            <select value={filterBuilding} onChange={(e) => setFilterBuilding(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
              {buildings.map((b) => <option key={b}>{b}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
              {["Tất cả", "Sẵn sàng", "Đang sử dụng", "Bảo trì"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              <Plus size={15} /> Thêm phòng
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Mã phòng</th>
                <th className="px-5 py-3 font-medium">Tên phòng</th>
                <th className="px-5 py-3 font-medium">Tòa nhà</th>
                <th className="px-5 py-3 font-medium">Tầng</th>
                <th className="px-5 py-3 font-medium">Loại phòng</th>
                <th className="px-5 py-3 font-medium">Sức chứa</th>
                <th className="px-5 py-3 font-medium">Trạng thái</th>
                <th className="px-5 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => {
                const cfg = STATUS_CONFIG[r.trangThai];
                const Icon = cfg.icon;
                return (
                  <tr key={r.maPhong} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{r.maPhong}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">{r.tenPhong}</td>
                    <td className="px-5 py-3.5 text-slate-600">{r.maToaNha}</td>
                    <td className="px-5 py-3.5 text-slate-600">Tầng {r.tang}</td>
                    <td className="px-5 py-3.5 text-slate-600">{r.maLoai}</td>
                    <td className="px-5 py-3.5"><span className="font-semibold text-slate-700">{r.sucChua}</span> <span className="text-slate-400 text-xs">chỗ</span></td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                        <Icon size={11} />{r.trangThai}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => openEdit(r)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg mr-1"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(r.maPhong)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-16 text-center text-slate-400">Không tìm thấy phòng học nào.</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-slate-800">{editItem ? "Sửa phòng học" : "Thêm phòng học"}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-3">
              {[{ label: "Mã phòng", key: "maPhong", disabled: !!editItem }, { label: "Tên phòng", key: "tenPhong" }].map(({ label, key, disabled }) => (
                <div key={key}><label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                  <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} disabled={disabled}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50" /></div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Sức chứa</label>
                  <input type="number" min={1} value={form.sucChua} onChange={(e) => setForm({ ...form, sucChua: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Tầng</label>
                  <input type="number" min={1} value={form.tang} onChange={(e) => setForm({ ...form, tang: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              </div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Trạng thái</label>
                <select value={form.trangThai} onChange={(e) => setForm({ ...form, trangThai: e.target.value as RoomStatus })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {["Sẵn sàng", "Đang sử dụng", "Bảo trì"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
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
