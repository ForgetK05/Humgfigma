import { useState } from "react";
import { Layers, Plus, Edit2, Trash2, Search, X, Save, Monitor, FlaskConical, Users, BookOpen } from "lucide-react";

const ICONS_MAP: Record<string, React.ElementType> = {
  "Phòng lý thuyết": BookOpen,
  "Phòng thực hành": FlaskConical,
  "Phòng hội thảo": Users,
  "Phòng máy tính": Monitor,
};

const MOCK_TYPES = [
  { maLoai: "PLT", tenLoai: "Phòng lý thuyết", moTa: "Phòng giảng dạy lý thuyết thông thường", trangThietBi: "Máy chiếu, bảng trắng, hệ thống âm thanh", soPhong: 18 },
  { maLoai: "PTH", tenLoai: "Phòng thực hành", moTa: "Phòng học có thiết bị thực hành chuyên ngành", trangThietBi: "Máy tính, máy chiếu, tủ đồ nghề, bàn thực hành", soPhong: 8 },
  { maLoai: "PHT", tenLoai: "Phòng hội thảo", moTa: "Phòng tổ chức hội thảo, họp lớn", trangThietBi: "Máy chiếu lớn, micro, hệ thống âm thanh chuyên nghiệp", soPhong: 4 },
  { maLoai: "PMT", tenLoai: "Phòng máy tính", moTa: "Phòng thực hành tin học, lập trình", trangThietBi: "Máy tính cá nhân (30–45 máy/phòng), máy chiếu, internet tốc độ cao", soPhong: 6 },
];

export function RoomTypePage() {
  const [types, setTypes] = useState(MOCK_TYPES);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<typeof MOCK_TYPES[0] | null>(null);
  const [form, setForm] = useState({ maLoai: "", tenLoai: "", moTa: "", trangThietBi: "" });

  const filtered = types.filter((t) => t.tenLoai.toLowerCase().includes(search.toLowerCase()) || t.maLoai.toLowerCase().includes(search.toLowerCase()));
  const openAdd = () => { setEditItem(null); setForm({ maLoai: "", tenLoai: "", moTa: "", trangThietBi: "" }); setShowModal(true); };
  const openEdit = (t: typeof MOCK_TYPES[0]) => { setEditItem(t); setForm({ maLoai: t.maLoai, tenLoai: t.tenLoai, moTa: t.moTa, trangThietBi: t.trangThietBi }); setShowModal(true); };
  const handleSave = () => {
    if (editItem) setTypes(types.map((t) => t.maLoai === editItem.maLoai ? { ...t, ...form } : t));
    else setTypes([...types, { ...form, soPhong: 0 }]);
    setShowModal(false);
  };
  const handleDelete = (id: string) => { if (confirm("Xóa loại phòng này?")) setTypes(types.filter((t) => t.maLoai !== id)); };

  const COLORS = ["bg-blue-100 text-blue-700 border-blue-200", "bg-orange-100 text-orange-700 border-orange-200", "bg-purple-100 text-purple-700 border-purple-200", "bg-teal-100 text-teal-700 border-teal-200"];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <h2 className="text-base font-semibold text-slate-800 flex-1">Danh mục Loại phòng</h2>
          <div className="relative">
            <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm..."
              className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-44" />
          </div>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <Plus size={15} /> Thêm loại phòng
          </button>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((t, idx) => {
            const Icon = ICONS_MAP[t.tenLoai] ?? Layers;
            return (
              <div key={t.maLoai} className={`border rounded-xl p-5 hover:shadow-md transition-all group ${COLORS[idx % COLORS.length]}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold opacity-60">{t.maLoai}</span>
                      <h3 className="font-semibold text-sm">{t.tenLoai}</h3>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(t)} className="p-1.5 bg-white/50 hover:bg-white rounded-lg"><Edit2 size={13} /></button>
                    <button onClick={() => handleDelete(t.maLoai)} className="p-1.5 bg-white/50 hover:bg-white rounded-lg"><Trash2 size={13} /></button>
                  </div>
                </div>
                <p className="text-xs opacity-80 mb-2">{t.moTa}</p>
                <div className="bg-white/40 rounded-lg px-3 py-2 text-xs">
                  <span className="font-medium">Thiết bị: </span>{t.trangThietBi}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs opacity-70">Số phòng hiện có</span>
                  <span className="text-lg font-bold">{t.soPhong}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-slate-800">{editItem ? "Sửa loại phòng" : "Thêm loại phòng"}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Mã loại", key: "maLoai", disabled: !!editItem },
                { label: "Tên loại phòng", key: "tenLoai" },
                { label: "Mô tả", key: "moTa" },
                { label: "Trang thiết bị tiêu chuẩn", key: "trangThietBi" },
              ].map(({ label, key, disabled }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                  <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} disabled={disabled}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50" />
                </div>
              ))}
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
