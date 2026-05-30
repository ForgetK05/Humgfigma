import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Shield, UserCheck, User, X, Save } from "lucide-react";

const ROLES = ["Admin", "Giảng viên", "Kỹ thuật viên", "Sinh viên"];

const MOCK_USERS = [
  { userID: "admin01", hoTen: "Nguyễn Quản Trị", email: "admin@humg.edu.vn", soDienThoai: "0912345678", maVaiTro: "Admin", ngayTao: "2023-09-01" },
  { userID: "gv001", hoTen: "TS. Nguyễn Văn An", email: "nguyenvanan@humg.edu.vn", soDienThoai: "0987654321", maVaiTro: "Giảng viên", ngayTao: "2023-09-05" },
  { userID: "gv002", hoTen: "ThS. Trần Thị Bình", email: "tranthihinh@humg.edu.vn", soDienThoai: "0976543210", maVaiTro: "Giảng viên", ngayTao: "2023-09-05" },
  { userID: "kt001", hoTen: "Lê Văn Cường", email: "levancuong@humg.edu.vn", soDienThoai: "0965432109", maVaiTro: "Kỹ thuật viên", ngayTao: "2023-09-10" },
  { userID: "sv001", hoTen: "Phạm Minh Đức", email: "phamduc@sv.humg.edu.vn", soDienThoai: "0954321098", maVaiTro: "Sinh viên", ngayTao: "2023-10-01" },
  { userID: "sv002", hoTen: "Hoàng Thị Hoa", email: "hoakhoa@sv.humg.edu.vn", soDienThoai: "0943210987", maVaiTro: "Sinh viên", ngayTao: "2023-10-01" },
];

const roleBadge: Record<string, string> = {
  Admin: "bg-red-100 text-red-700",
  "Giảng viên": "bg-blue-100 text-blue-700",
  "Kỹ thuật viên": "bg-orange-100 text-orange-700",
  "Sinh viên": "bg-green-100 text-green-700",
};

export function UserManagementPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("Tất cả");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<typeof MOCK_USERS[0] | null>(null);
  const [form, setForm] = useState({ userID: "", hoTen: "", email: "", soDienThoai: "", maVaiTro: "Sinh viên" });

  const filtered = users.filter((u) => {
    const matchSearch = u.hoTen.toLowerCase().includes(search.toLowerCase()) || u.userID.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "Tất cả" || u.maVaiTro === filterRole;
    return matchSearch && matchRole;
  });

  const openAdd = () => {
    setEditUser(null);
    setForm({ userID: "", hoTen: "", email: "", soDienThoai: "", maVaiTro: "Sinh viên" });
    setShowModal(true);
  };

  const openEdit = (u: typeof MOCK_USERS[0]) => {
    setEditUser(u);
    setForm({ userID: u.userID, hoTen: u.hoTen, email: u.email, soDienThoai: u.soDienThoai, maVaiTro: u.maVaiTro });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editUser) {
      setUsers(users.map((u) => (u.userID === editUser.userID ? { ...u, ...form } : u)));
    } else {
      setUsers([...users, { ...form, ngayTao: new Date().toISOString().slice(0, 10) }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) setUsers(users.filter((u) => u.userID !== id));
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Tổng người dùng", value: users.length, color: "text-blue-600", bg: "bg-blue-50", icon: User },
          { label: "Quản trị viên", value: users.filter(u => u.maVaiTro === "Admin").length, color: "text-red-600", bg: "bg-red-50", icon: Shield },
          { label: "Giảng viên", value: users.filter(u => u.maVaiTro === "Giảng viên").length, color: "text-blue-600", bg: "bg-blue-50", icon: UserCheck },
          { label: "Sinh viên", value: users.filter(u => u.maVaiTro === "Sinh viên").length, color: "text-green-600", bg: "bg-green-50", icon: User },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
              <div className={`w-10 h-10 rounded-full ${s.bg} ${s.color} flex items-center justify-center`}>
                <Icon size={20} />
              </div>
              <div>
                <div className="text-xs text-slate-500">{s.label}</div>
                <div className="text-xl font-bold text-slate-800">{s.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <h2 className="text-base font-semibold text-slate-800 flex-1">Danh sách Người dùng</h2>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm..."
                className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Tất cả</option>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
            <button
              id="add-user-btn"
              onClick={openAdd}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={15} /> Thêm mới
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">UserID</th>
                <th className="px-5 py-3 font-medium">Họ tên</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Điện thoại</th>
                <th className="px-5 py-3 font-medium">Vai trò</th>
                <th className="px-5 py-3 font-medium">Ngày tạo</th>
                <th className="px-5 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.userID} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-blue-600 font-medium">{u.userID}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{u.hoTen}</td>
                  <td className="px-5 py-3.5 text-slate-600">{u.email}</td>
                  <td className="px-5 py-3.5 text-slate-600">{u.soDienThoai}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge[u.maVaiTro]}`}>
                      {u.maVaiTro}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{u.ngayTao}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => openEdit(u)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-1">
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => handleDelete(u.userID)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-slate-400">Không tìm thấy người dùng nào.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-slate-800">{editUser ? "Sửa người dùng" : "Thêm người dùng mới"}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: "UserID", key: "userID", disabled: !!editUser },
                { label: "Họ và tên", key: "hoTen" },
                { label: "Email", key: "email" },
                { label: "Số điện thoại", key: "soDienThoai" },
              ].map(({ label, key, disabled }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                  <input
                    value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    disabled={disabled}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Vai trò</label>
                <select
                  value={form.maVaiTro}
                  onChange={(e) => setForm({ ...form, maVaiTro: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Hủy</button>
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
