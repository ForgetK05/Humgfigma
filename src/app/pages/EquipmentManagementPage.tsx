import { useState } from "react";
import { Cpu, Plus, Edit2, Trash2, Search, X, Save, ShieldAlert, Monitor, Wind, Volume2, HardDrive } from "lucide-react";

type EquipmentStatus = "Hoạt động tốt" | "Đang bảo trì" | "Hỏng hóc";

const STATUS_CFG: Record<EquipmentStatus, { badge: string; color: string }> = {
  "Hoạt động tốt": { badge: "bg-green-100 text-green-700", color: "text-green-600" },
  "Đang bảo trì": { badge: "bg-amber-100 text-amber-700", color: "text-amber-600" },
  "Hỏng hóc": { badge: "bg-red-100 text-red-700", color: "text-red-600" },
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  "Máy chiếu": Monitor,
  "Điều hòa": Wind,
  "Hệ thống loa": Volume2,
  "Máy tính": HardDrive,
};

const MOCK_EQUIPMENT = [
  { maThietBi: "TB001", tenThietBi: "Máy chiếu Panasonic PT-VX610", loaiThietBi: "Máy chiếu", trangThai: "Hoạt động tốt" as EquipmentStatus, maPhong: "A301", soSeri: "PNS610-99281", ngayMua: "2024-09-10" },
  { maThietBi: "TB002", tenThietBi: "Điều hòa Daikin 24000 BTU", loaiThietBi: "Điều hòa", trangThai: "Đang bảo trì" as EquipmentStatus, maPhong: "A301", soSeri: "DK-24BTU-882", ngayMua: "2023-05-15" },
  { maThietBi: "TB003", tenThietBi: "Máy chiếu Epson EB-2250U", loaiThietBi: "Máy chiếu", trangThai: "Hoạt động tốt" as EquipmentStatus, maPhong: "B201", soSeri: "EPS-2250-1029", ngayMua: "2024-11-20" },
  { maThietBi: "TB004", tenThietBi: "Bộ loa hội trường Soundking", loaiThietBi: "Hệ thống loa", trangThai: "Hỏng hóc" as EquipmentStatus, maPhong: "C101", soSeri: "SK-99381-LX", ngayMua: "2022-08-01" },
  { maThietBi: "TB005", tenThietBi: "Dàn máy tính HP EliteDesk (40 máy)", loaiThietBi: "Máy tính", trangThai: "Hoạt động tốt" as EquipmentStatus, maPhong: "D401", soSeri: "HP-DESK-40SET", ngayMua: "2025-01-05" },
  { maThietBi: "TB006", tenThietBi: "Điều hòa Panasonic 18000 BTU", loaiThietBi: "Điều hòa", trangThai: "Hoạt động tốt" as EquipmentStatus, maPhong: "B201", soSeri: "PNS-18BTU-02", ngayMua: "2023-06-20" },
];

export function EquipmentManagementPage() {
  const [equipment, setEquipment] = useState(MOCK_EQUIPMENT);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Tất cả");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<typeof MOCK_EQUIPMENT[0] | null>(null);
  const [form, setForm] = useState({
    maThietBi: "",
    tenThietBi: "",
    loaiThietBi: "Máy chiếu",
    trangThai: "Hoạt động tốt" as EquipmentStatus,
    maPhong: "",
    soSeri: "",
    ngayMua: ""
  });

  const filtered = equipment.filter((eq) => {
    const matchSearch = eq.tenThietBi.toLowerCase().includes(search.toLowerCase()) || eq.maThietBi.toLowerCase().includes(search.toLowerCase()) || eq.maPhong.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "Tất cả" || eq.loaiThietBi === filterType;
    const matchStatus = filterStatus === "Tất cả" || eq.trangThai === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const openAdd = () => {
    setEditItem(null);
    setForm({
      maThietBi: `TB${String(equipment.length + 1).padStart(3, "0")}`,
      tenThietBi: "",
      loaiThietBi: "Máy chiếu",
      trangThai: "Hoạt động tốt",
      maPhong: "",
      soSeri: "",
      ngayMua: new Date().toISOString().split("T")[0]
    });
    setShowModal(true);
  };

  const openEdit = (eq: typeof MOCK_EQUIPMENT[0]) => {
    setEditItem(eq);
    setForm({ ...eq });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.tenThietBi.trim() || !form.maPhong.trim()) {
      alert("Vui lòng nhập đầy đủ tên thiết bị và phòng học.");
      return;
    }
    if (editItem) {
      setEquipment(equipment.map((eq) => eq.maThietBi === editItem.maThietBi ? { ...eq, ...form } : eq));
    } else {
      setEquipment([...equipment, { ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có thực sự muốn xóa thiết bị này khỏi hệ thống?")) {
      setEquipment(equipment.filter((eq) => eq.maThietBi !== id));
    }
  };

  const stats = {
    tong: equipment.length,
    tot: equipment.filter(e => e.trangThai === "Hoạt động tốt").length,
    baoTri: equipment.filter(e => e.trangThai === "Đang bảo trì").length,
    hong: equipment.filter(e => e.trangThai === "Hỏng hóc").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Tổng thiết bị", value: stats.tong, icon: Cpu, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Hoạt động tốt", value: stats.tot, icon: Cpu, color: "text-green-600", bg: "bg-green-50" },
          { label: "Đang bảo trì", value: stats.baoTri, icon: Cpu, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Đang báo hỏng", value: stats.hong, icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}><Icon size={20} /></div>
              <div>
                <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                <div className="text-xl font-bold text-slate-800">{s.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Filter Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Quản lý Thiết bị giảng đường</h2>
            <p className="text-xs text-slate-500 mt-0.5">Theo dõi chi tiết danh mục tài sản, thiết bị tại các phòng học HUMG</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Mã, tên, phòng học..."
                className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 w-44"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="Tất cả">Loại thiết bị: Tất cả</option>
              <option value="Máy chiếu">Máy chiếu</option>
              <option value="Điều hòa">Điều hòa</option>
              <option value="Hệ thống loa">Hệ thống loa</option>
              <option value="Máy tính">Máy tính</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="Tất cả">Trạng thái: Tất cả</option>
              <option value="Hoạt động tốt">Hoạt động tốt</option>
              <option value="Đang bảo trì">Đang bảo trì</option>
              <option value="Hỏng hóc">Hỏng hóc</option>
            </select>
            <button onClick={openAdd} className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4.5 py-2 rounded-lg text-xs font-semibold transition-colors">
              <Plus size={14} /> Thêm thiết bị
            </button>
          </div>
        </div>

        {/* Equipment Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase">
                <th className="py-3.5 px-4 font-mono">Mã TB</th>
                <th className="py-3.5 px-4">Tên thiết bị</th>
                <th className="py-3.5 px-4">Loại</th>
                <th className="py-3.5 px-4">Phòng học</th>
                <th className="py-3.5 px-4">Số Seri</th>
                <th className="py-3.5 px-4">Ngày mua</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((eq) => {
                const TypeIcon = TYPE_ICONS[eq.loaiThietBi] || Cpu;
                const statusCfg = STATUS_CFG[eq.trangThai];
                return (
                  <tr key={eq.maThietBi} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{eq.maThietBi}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                          <TypeIcon size={16} />
                        </div>
                        <span className="font-semibold text-slate-800">{eq.tenThietBi}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">{eq.loaiThietBi}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-purple-50 text-purple-700 font-bold px-2 py-1 rounded-md border border-purple-100">{eq.maPhong}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{eq.soSeri || "---"}</td>
                    <td className="py-3.5 px-4 text-slate-500">{eq.ngayMua}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold ${statusCfg.badge}`}>
                        {eq.trangThai}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button onClick={() => openEdit(eq)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={13} /></button>
                      <button onClick={() => handleDelete(eq.maThietBi)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={13} /></button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-sm">
                    Không tìm thấy thiết bị nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-800">{editItem ? "Sửa thông tin thiết bị" : "Thêm thiết bị mới"}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mã thiết bị</label>
                  <input
                    value={form.maThietBi}
                    onChange={(e) => setForm({ ...form, maThietBi: e.target.value })}
                    disabled={!!editItem}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Loại thiết bị</label>
                  <select
                    value={form.loaiThietBi}
                    onChange={(e) => setForm({ ...form, loaiThietBi: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Máy chiếu">Máy chiếu</option>
                    <option value="Điều hòa">Điều hòa</option>
                    <option value="Hệ thống loa">Hệ thống loa</option>
                    <option value="Máy tính">Máy tính</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tên thiết bị</label>
                <input
                  value={form.tenThietBi}
                  onChange={(e) => setForm({ ...form, tenThietBi: e.target.value })}
                  placeholder="Ví dụ: Máy chiếu Panasonic EB-X51"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Phòng học</label>
                  <input
                    value={form.maPhong}
                    onChange={(e) => setForm({ ...form, maPhong: e.target.value.toUpperCase() })}
                    placeholder="Ví dụ: A301"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Số Seri</label>
                  <input
                    value={form.soSeri}
                    onChange={(e) => setForm({ ...form, soSeri: e.target.value })}
                    placeholder="S/N..."
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Ngày mua</label>
                  <input
                    type="date"
                    value={form.ngayMua}
                    onChange={(e) => setForm({ ...form, ngayMua: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Trạng thái</label>
                  <select
                    value={form.trangThai}
                    onChange={(e) => setForm({ ...form, trangThai: e.target.value as EquipmentStatus })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Hoạt động tốt">Hoạt động tốt</option>
                    <option value="Đang bảo trì">Đang bảo trì</option>
                    <option value="Hỏng hóc">Hỏng hóc</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-xs text-slate-600">Hủy</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
                <Save size={14} /> Lưu thiết bị
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
