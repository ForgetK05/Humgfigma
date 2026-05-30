import { useState } from "react";
import { User, Mail, Phone, Shield, Edit2, Save, X, Camera } from "lucide-react";

export function UserProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    userID: "admin01",
    hoTen: "Nguyễn Quản Trị",
    email: "admin@humg.edu.vn",
    soDienThoai: "0912 345 678",
    maVaiTro: "Admin",
    khoa: "Phòng Quản lý Cơ sở vật chất",
    ngayTao: "01/09/2023",
  });
  const [form, setForm] = useState(profile);

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
  };

  const initials = profile.hoTen
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white border-2 border-white/30">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
              <Camera size={13} className="text-blue-600" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile.hoTen}</h2>
            <p className="text-blue-200 text-sm mt-0.5">{profile.maVaiTro}</p>
            <p className="text-blue-300 text-xs mt-0.5">{profile.khoa}</p>
          </div>
          <div className="ml-auto">
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
              ID: {profile.userID}
            </span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Thông tin cá nhân</h3>
          {!editing ? (
            <button
              onClick={() => { setForm(profile); setEditing(true); }}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Edit2 size={14} /> Chỉnh sửa
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 px-3 py-1.5 border border-slate-200 rounded-lg">
                <X size={14} /> Hủy
              </button>
              <button onClick={handleSave} className="flex items-center gap-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg font-medium">
                <Save size={14} /> Lưu
              </button>
            </div>
          )}
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: "Họ và tên", key: "hoTen", icon: User },
            { label: "Email", key: "email", icon: Mail },
            { label: "Số điện thoại", key: "soDienThoai", icon: Phone },
            { label: "Đơn vị / Khoa", key: "khoa", icon: Shield },
          ].map(({ label, key, icon: Icon }) => (
            <div key={key}>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                <Icon size={13} /> {label}
              </label>
              {editing ? (
                <input
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-slate-800 font-medium bg-slate-50 px-3 py-2 rounded-lg">
                  {(profile as any)[key]}
                </p>
              )}
            </div>
          ))}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
              <Shield size={13} /> Vai trò
            </label>
            <p className="text-sm bg-slate-50 px-3 py-2 rounded-lg">
              <span className="px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">{profile.maVaiTro}</span>
            </p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
              <User size={13} /> Ngày tạo tài khoản
            </label>
            <p className="text-sm text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">{profile.ngayTao}</p>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Đổi mật khẩu</h3>
        </div>
        <div className="p-5 space-y-3">
          {["Mật khẩu hiện tại", "Mật khẩu mới", "Xác nhận mật khẩu mới"].map((label) => (
            <div key={label}>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm"
              />
            </div>
          ))}
          <button className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            Cập nhật mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
}
