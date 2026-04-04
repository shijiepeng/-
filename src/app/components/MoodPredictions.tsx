import { Calendar, ChevronDown } from "lucide-react";

const moods = [
  { day: "Mon", color: "#ffce5c", name: "Happy" },
  { day: "Tue", color: "#9bb068", name: "Happy" },
  { day: "Wed", color: "#fe814b", name: "Sad" },
  { day: "Thu", color: "#ffce5c", name: "Happy" },
  { day: "Fri", color: "#bda193", name: "Neutral" },
  { day: "Sat", color: "#bda193", name: "Neutral" },
  { day: "Sun", color: "#fe814b", name: "Anxious" },
];

export function MoodPredictions() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#4b3425]">AI Mood Predictions</h2>
        <button className="flex items-center gap-2 px-3 py-2 border border-[#4b3425] rounded-full text-sm font-semibold text-[#4b3425]">
          <Calendar className="w-4 h-4" />
          <span>Next 1w</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-between gap-2">
        {moods.map((mood, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
              style={{ backgroundColor: mood.color }}
            >
              {mood.name === "Happy" ? "H" : mood.name === "Sad" ? "S" : mood.name === "Neutral" ? "N" : "A"}
            </div>
            <span className="text-xs font-semibold text-[#4b3425]">{mood.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
