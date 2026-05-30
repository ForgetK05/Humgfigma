import { useState } from "react";
import { Card } from "../components/ui/card";

export function WeeklyTimetable() {
  const [activeTab, setActiveTab] = useState("Lớp");

  const tabs = ["Theo lớp", "Theo giảng viên", "Theo phòng"];

  const schedule = {
    "Ca 1": {
      "Thứ 2": { subject: "Phân tích thiết kế hệ thống", room: "P301" },
      "Thứ 3": null,
      "Thứ 4": { subject: "Cơ sở dữ liệu", room: "P202" },
      "Thứ 5": null,
      "Thứ 6": null,
    },
    "Ca 2": {
      "Thứ 2": null,
      "Thứ 3": { subject: "Java", room: "P305" },
      "Thứ 4": null,
      "Thứ 5": null,
      "Thứ 6": null,
    },
    "Ca 3": {
      "Thứ 2": null,
      "Thứ 3": null,
      "Thứ 4": null,
      "Thứ 5": { subject: "Mạng máy tính", room: "P401" },
      "Thứ 6": null,
    },
    "Ca 4": {
      "Thứ 2": null,
      "Thứ 3": null,
      "Thứ 4": null,
      "Thứ 5": null,
      "Thứ 6": null,
    },
  };

  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"];
  const slots = ["Ca 1", "Ca 2", "Ca 3", "Ca 4"];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.replace("Theo ", ""))}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.replace("Theo ", "")
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
          Chọn {activeTab.toLowerCase()}:
        </label>
        <select className="w-64 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>
            {activeTab === "Lớp" ? "CNTT01" : activeTab === "giảng viên" ? "Nguyễn Văn A" : "P301"}
          </option>
        </select>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="w-24 bg-slate-100 border-b border-r border-slate-200 px-4 py-4 text-center font-semibold text-slate-700 text-sm">
                  Ca / Thứ
                </th>
                {days.map((day) => (
                  <th key={day} className="bg-slate-50 border-b border-r border-slate-200 px-4 py-4 text-center font-semibold text-slate-700 text-sm">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot}>
                  <td className="bg-slate-50 border-b border-r border-slate-200 px-4 py-6 text-center font-medium text-slate-600 text-sm">
                    {slot}
                  </td>
                  {days.map((day) => {
                    const cell = schedule[slot as keyof typeof schedule][day as keyof typeof schedule["Ca 1"]];
                    return (
                      <td key={day} className="border-b border-r border-slate-200 p-2 text-center h-24 align-top">
                        {cell ? (
                          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 h-full flex flex-col justify-center items-center shadow-sm">
                            <span className="font-medium text-blue-800 text-sm block mb-1">
                              {cell.subject}
                            </span>
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full inline-block">
                              Phòng: {cell.room}
                            </span>
                          </div>
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <span className="text-slate-300 text-xs">-</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
