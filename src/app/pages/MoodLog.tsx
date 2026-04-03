import { useNavigate } from "react-router";
import { ArrowLeft, BarChart3, ChevronDown, Calendar } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useMoodRecords } from "../store";
import { useState, useMemo } from "react";
import { motion } from "motion/react";

const timeTabs = ["全部", "天", "周", "月", "年"];

const moods = [
  { value: 0, label: "很糟", color: "#FE814B", emoji: "😢" },
  { value: 1, label: "不好", color: "#e67a5a", emoji: "😔" },
  { value: 2, label: "一般", color: "#BDA193", emoji: "😐" },
  { value: 3, label: "不错", color: "#FFCE5C", emoji: "🙂" },
  { value: 4, label: "很好", color: "#9BB068", emoji: "😄" },
];

const dayNames = ["一", "二", "三", "四", "五", "六", "日"];
const dayNamesCN = dayNames;

// 根据心情值获取颜色和标签信息
function getMoodInfo(value: number) {
  return moods[value] ?? moods[2];
}

export function MoodLog() {
  const navigate = useNavigate();
  const { getRecentRecords, moodRecords } = useMoodRecords();
  const [activeTab, setActiveTab] = useState("全部");

  // 构建最近 7 天数据（含模拟预测）
  const weekData = useMemo(() => {
    const records = getRecentRecords(14);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split("T")[0];
      const record = records.find((r) => r.date === dateStr);

      if (record) {
        return {
          dayName: dayNames[i],
          dayNameCN: dayNamesCN[i],
          moodValue: record.moodValue,
          hasRecord: true,
          isPrediction: false,
        };
      }

      // 无记录的日期：用最近记录的趋势简单模拟，或给默认值
      // 如果完全没有记录，生成一些示例数据让页面好看
      if (moodRecords.length === 0) {
        // 示例数据：模拟一周心情变化
        const sampleValues = [4, 5, 2, 4, 3, 3, 2]; // 对应设计稿的 Happy/Sad/Happy/Neutral/Neutral/Sad
        return {
          dayName: dayNames[i],
          dayNameCN: dayNamesCN[i],
          moodValue: Math.max(0, Math.min(4, sampleValues[i] - 1)), // map 1-5 to 0-4
          hasRecord: false,
          isPrediction: true,
        };
      }

      return {
        dayName: dayNames[i],
        dayNameCN: dayNamesCN[i],
        moodValue: 2, // 默认中性
        hasRecord: false,
        isPrediction: true,
      };
    });
  }, [getRecentRecords, moodRecords]);

  // 图表数据点 — 用于绘制折线图
  const chartPoints = useMemo(() => {
    // 如果有真实记录，用真实数据画图；否则用示例数据
    if (moodRecords.length >= 2) {
      return weekData.map((d, i) => ({
        x: i,
        y: d.moodValue,
        hasRecord: d.hasRecord,
      }));
    }
    // 示例数据（对应 Figma 设计中的曲线走势）
    return [
      { x: 0, y: 4, hasRecord: false },   // Mon - High
      { x: 1, y: 5, hasRecord: false },   // Tue - Very high (超出范围，clamp)
      { x: 2, y: 1, hasRecord: false },   // Wed - Low
      { x: 3, y: 3, hasRecord: false },   // Thu - Mid-low
      { x: 4, y: 3, hasRecord: false },   // Fri - Neutral
      { x: 5, y: 3, hasRecord: false },   // Sat - Neutral
      { x: 6, y: 1, hasRecord: false },   // Sun - Low
    ];
  }, [weekData, moodRecords.length]);

  // 计算折线路径
  const generateChartPath = () => {
    const validPoints = chartPoints.filter((p) => p.y !== null);
    if (validPoints.length < 2) return "";

    let path = `M ${validPoints[0].x * 50} ${(4 - Math.min(4, Math.max(0, validPoints[0].y))) * 35 + 10}`;

    for (let i = 1; i < validPoints.length; i++) {
      const prev = validPoints[i - 1];
      const curr = validPoints[i];
      const prevY = (4 - Math.min(4, Math.max(0, prev.y))) * 35 + 10;
      const currY = (4 - Math.min(4, Math.max(0, curr.y))) * 35 + 10;
      const cpx = ((prev.x + curr.x) / 2) * 50;
      path += ` C ${cpx} ${prevY}, ${cpx} ${currY}, ${curr.x * 50} ${currY}`;
    }

    return path;
  };

  // 找出图表上的标注点（最高、最低、中间）
  const getLabelPoints = () => {
    const points = [];
    // 最高点附近
    const maxIdx = chartPoints.reduce(
      (maxI, p, i) => (p.y > (chartPoints[maxI]?.y ?? 0) ? i : maxI),
      0
    );
    // 最低点附近
    const minIdx = chartPoints.reduce(
      (minI, p, i) => (p.y < (chartPoints[minI]?.y ?? 99) ? i : minI),
      0
    );
    // 中间点
    const midIdx =
      chartPoints.findIndex((p) => p.y <= 2 && p.y >= 2) ?? 3;

    points.push({ index: maxIdx, type: "high" as const });
    if (minIdx !== maxIdx) points.push({ index: minIdx, type: "low" as const });
    if (midIdx !== maxIdx && midIdx !== minIdx)
      points.push({ index: midIdx, type: "mid" as const });

    return points;
  };

  const chartPath = generateChartPath();
  const labelPoints = getLabelPoints();

  return (
    <div className="min-h-screen bg-[#F7F4F2] pb-28">
      {/* Header */}
      <motion.header
        className="px-4 pt-12 pb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.main
        className="px-4 pt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Title Section */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-[36px] font-extrabold text-[#4B3425] leading-tight tracking-tight">
              情绪统计
            </h1>
            <p className="text-lg text-[rgba(31,22,15,0.64)] mt-2 font-medium">
              查看你的情绪变化趋势。
            </p>
          </div>
          {/* Icon Badge */}
          <div className="w-16 h-16 bg-[#4B3425] rounded-full flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Time Period Tabs */}
        <motion.div
          className="rounded-full border border-[rgba(31,22,15,0.64)] p-1 flex mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {timeTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-[#4B3425] text-white"
                  : "text-[rgba(31,22,15,0.64)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Chart Section */}
        <motion.div
          className="relative h-56 mb-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg
            viewBox="0 0 350 180"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#926247" stopOpacity="0.48" />
                <stop offset="100%" stopColor="#926247" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Gradient Fill */}
            {chartPath && (
              <motion.path
                d={`${chartPath} L 300 170 L 0 170 Z`}
                fill="url(#chartFill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            )}

            {/* Line */}
            {chartPath && (
              <motion.path
                d={chartPath}
                fill="none"
                stroke="#4B3425"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              />
            )}

            {/* Label Points */}
            {labelPoints.map(({ index, type }) => {
              const pt = chartPoints[index];
              if (!pt || pt.y === null) return null;

              const cx = pt.x * 50;
              const cy = (4 - Math.min(4, Math.max(0, pt.y))) * 35 + 10;
              const info =
                type === "high"
                  ? { label: "愉悦", color: "#9BB068" }
                  : type === "low"
                    ? { label: "低落", color: "#FE814B" }
                    : { label: "平静", color: "#926247" };

              return (
                <motion.g
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                >
                  {/* Label bubble */}
                  <rect
                    x={cx - 24}
                    y={cy - 32}
                    width="48"
                    height="20"
                    rx="10"
                    fill={info.color}
                  />
                  <text
                    x={cx}
                    y={cy - 19}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="700"
                  >
                    {info.label}
                  </text>
                  {/* Triangle pointer */}
                  <polygon
                    points={`${cx - 4},${cy - 12} ${cx + 4},${cy - 12} ${cx},${cy - 8}`}
                    fill={info.color}
                  />
                  {/* Data dot */}
                  <circle cx={cx} cy={cy} r="7" fill={info.color} stroke="#F7F4F2" strokeWidth="3" />
                  <circle cx={cx} cy={cy} r="2.5" fill="white" />
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        {/* X-Axis Day Labels */}
        <motion.div
          className="flex justify-between px-1 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {dayNames.map((d) => (
            <span key={d} className="text-xs font-semibold text-[rgba(31,22,15,0.48)]">
              {d}
            </span>
          ))}
        </motion.div>
      </motion.main>

      <BottomNav />
    </div>
  );
}

// 简单的脸部图标组件 — 用纯 CSS 绘制不同表情
function FaceIcon({ mood }: { mood: number }) {
  // mood: 0=很糟(哭脸), 1=不好(难过), 2=一般(平脸), 3=不错(微笑), 4=很好(大笑)
  if (mood <= 1) {
    // 难过/哭脸：弧线向下
    return (
      <svg width="14" height="14" viewBox="0 0 14 14">
        <circle cx="4.5" cy="5.5" r="1" fill="#29321A" />
        <circle cx="9.5" cy="5.5" r="1" fill="#29321A" />
        <path d="M3.5 9 Q7 6 10.5 9" stroke="#29321A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (mood === 2) {
    // 平脸
    return (
      <svg width="14" height="14" viewBox="0 0 14 14">
        <circle cx="4.5" cy="5.5" r="1" fill="#4B3425" />
        <circle cx="9.5" cy="5.5" r="1" fill="#4B3425" />
        <line x1="4" y1="9.5" x2="10" y2="9.5" stroke="#4B3425" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  // 微笑/大笑
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <circle cx="4.5" cy="5.5" r="1" fill="#29321A" />
      <circle cx="9.5" cy="5.5" r="1" fill="#29321A" />
      <path d="M3.5 8 Q7 11 10.5 8" stroke="#29321A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}