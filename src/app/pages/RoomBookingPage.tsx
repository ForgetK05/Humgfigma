import { useState } from "react";
import { CalendarPlus, Clock, DoorOpen, FileText, CheckCircle, AlertCircle, Send } from "lucide-react";

const ROOMS = [
  { maPhong: "A301", tenPhong: "Phòng A301", sucChua: 60, maLoai: "PLT" },
  { maPhong: "B201", tenPhong: "Phòng B201", sucChua: 80, maLoai: "PLT" },
  { maPhong: "C101", tenPhong: "Phòng C101", sucChua: 40, maLoai: "PMT" },
  { maPhong: "D401", tenPhong: "Hội trường D401", sucChua: 150, maLoai: "PHT" },
];

const SLOTS = [
  { maCa: "CA1", tenCa: "Ca 1", gioBatDau: "07:00", gioKetThuc: "09:00" },
  { maCa: "CA2", tenCa: "Ca 2", gioBatDau: "09:15", gioKetThuc: "11:15" },
  { maCa: "CA3", tenCa: "Ca 3", gioBatDau: "12:30", gioKetThuc: "14:30" },
  { maCa: "CA4", tenCa: "Ca 4", gioBatDau: "14:45", gioKetThuc: "16:45" },
];

const STEPS = ["Chọn phòng", "Chọn ngày & ca", "Nhập lý do", "Xác nhận"];

export function RoomBookingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    maPhong: "",
    ngaySuDung: "",
    maCa: "",
    lyDo: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [checkResult, setCheckResult] = useState<"available" | "conflict" | null>(null);

  const selectedRoom = ROOMS.find((r) => r.maPhong === form.maPhong);
  const selectedSlot = SLOTS.find((s) => s.maCa === form.maCa);

  const checkAvailability = () => {
    // Mock check
    setCheckResult(form.maPhong === "A301" && form.maCa === "CA1" ? "conflict" : "available");
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Gửi đăng ký thành công!</h2>
          <p className="text-slate-500 mb-1">Phiếu đăng ký của bạn đang chờ quản trị viên phê duyệt.</p>
          <div className="mt-6 bg-white rounded-xl border border-slate-200 p-4 text-left max-w-sm mx-auto text-sm space-y-2">
            <div className="flex justify-between"><span className="text-slate-500">Phòng:</span><span className="font-medium">{form.maPhong}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Ngày:</span><span className="font-medium">{form.ngaySuDung}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Ca học:</span><span className="font-medium">{form.maCa}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Trạng thái:</span><span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Chờ duyệt</span></div>
          </div>
          <button onClick={() => { setSubmitted(false); setStep(0); setForm({ maPhong: "", ngaySuDung: "", maCa: "", lyDo: "" }); setCheckResult(null); }}
            className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
            Tạo phiếu mới
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Stepper */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i < step ? "bg-green-500 text-white" : i === step ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium ${i === step ? "text-blue-600" : "text-slate-400"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 mb-5 ${i < step ? "bg-green-400" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        {step === 0 && (
          <div>
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><DoorOpen size={18} className="text-blue-600" /> Chọn phòng học</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ROOMS.map((r) => (
                <button key={r.maPhong} onClick={() => setForm({ ...form, maPhong: r.maPhong })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${form.maPhong === r.maPhong ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <div className="font-bold text-slate-800">{r.maPhong}</div>
                  <div className="text-sm text-slate-600 mt-0.5">{r.tenPhong}</div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><DoorOpen size={11} />{r.maLoai}</span>
                    <span className="flex items-center gap-1"><FileText size={11} />Sức chứa: {r.sucChua}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2"><Clock size={18} className="text-blue-600" /> Chọn ngày & ca học</h3>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Ngày sử dụng</label>
              <input type="date" value={form.ngaySuDung} onChange={(e) => setForm({ ...form, ngaySuDung: e.target.value })} min={new Date().toISOString().split("T")[0]}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Ca học</label>
              <div className="grid grid-cols-2 gap-3">
                {SLOTS.map((s) => (
                  <button key={s.maCa} onClick={() => setForm({ ...form, maCa: s.maCa })}
                    className={`text-left p-3 rounded-xl border-2 transition-all ${form.maCa === s.maCa ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                    <div className="font-bold text-sm text-slate-800">{s.tenCa}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.gioBatDau} – {s.gioKetThuc}</div>
                  </button>
                ))}
              </div>
            </div>
            {form.ngaySuDung && form.maCa && (
              <div>
                <button onClick={checkAvailability} className="text-sm text-blue-600 hover:text-blue-700 font-medium underline">
                  Kiểm tra phòng trống
                </button>
                {checkResult === "available" && (
                  <div className="mt-2 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm">
                    <CheckCircle size={15} /> Phòng {form.maPhong} trống vào thời điểm này.
                  </div>
                )}
                {checkResult === "conflict" && (
                  <div className="mt-2 flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm">
                    <AlertCircle size={15} /> Phòng {form.maPhong} đã được sử dụng vào ca này. Vui lòng chọn ca khác.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2"><FileText size={18} className="text-blue-600" /> Nhập lý do đăng ký</h3>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Lý do sử dụng phòng <span className="text-red-500">*</span></label>
              <textarea value={form.lyDo} onChange={(e) => setForm({ ...form, lyDo: e.target.value })} rows={4} placeholder="Mô tả mục đích sử dụng phòng học..."
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <p className="text-xs text-slate-400 mt-1">{form.lyDo.length}/500 ký tự</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><CheckCircle size={18} className="text-blue-600" /> Xác nhận thông tin</h3>
            <div className="space-y-3 bg-slate-50 rounded-xl p-4">
              {[
                { label: "Phòng học", value: `${form.maPhong} – ${selectedRoom?.tenPhong}` },
                { label: "Ngày sử dụng", value: form.ngaySuDung },
                { label: "Ca học", value: `${selectedSlot?.tenCa} (${selectedSlot?.gioBatDau} – ${selectedSlot?.gioKetThuc})` },
                { label: "Lý do", value: form.lyDo },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3 text-sm">
                  <span className="text-slate-500 w-28 shrink-0">{label}:</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
              <div className="flex gap-3 text-sm">
                <span className="text-slate-500 w-28 shrink-0">Trạng thái:</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Chờ phê duyệt</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          className="px-5 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
          Quay lại
        </button>
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} disabled={step === 0 && !form.maPhong || step === 1 && (!form.ngaySuDung || !form.maCa) || step === 2 && !form.lyDo}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed">
            Tiếp theo
          </button>
        ) : (
          <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium">
            <Send size={15} /> Gửi đăng ký
          </button>
        )}
      </div>
    </div>
  );
}
