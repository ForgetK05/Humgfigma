import { useState } from "react";
import { useNavigate } from "../router-exports";
import { Lock, User, Eye, EyeOff, GraduationCap } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ userID: "", matKhau: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.userID || !form.matKhau) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg mb-4">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">HUMG</h1>
            <p className="text-slate-400 text-sm mt-1">Hệ thống Quản lý Phòng học</p>
            <p className="text-slate-500 text-xs mt-0.5">Trường Đại học Mỏ – Địa chất</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* UserID */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Mã người dùng (UserID)
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="login-userid"
                  type="text"
                  value={form.userID}
                  onChange={(e) => setForm({ ...form, userID: e.target.value })}
                  placeholder="Nhập mã người dùng..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  value={form.matKhau}
                  onChange={(e) => setForm({ ...form, matKhau: e.target.value })}
                  placeholder="Nhập mật khẩu..."
                  className="w-full pl-9 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded" />
                Ghi nhớ đăng nhập
              </label>
              <button type="button" className="text-blue-400 hover:text-blue-300">
                Quên mật khẩu?
              </button>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-slate-500 text-xs text-center mb-3">Tài khoản thử nghiệm:</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: "Admin", id: "admin01" },
                { role: "Giảng viên", id: "gv001" },
                { role: "Sinh viên", id: "sv001" },
              ].map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => setForm({ userID: acc.id, matKhau: "123456" })}
                  className="py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-slate-400 hover:text-slate-300 transition-all"
                >
                  <div className="font-medium text-slate-300">{acc.role}</div>
                  <div className="text-slate-500 font-mono">{acc.id}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © 2024 Trường Đại học Mỏ – Địa chất. All rights reserved.
        </p>
      </div>
    </div>
  );
}
