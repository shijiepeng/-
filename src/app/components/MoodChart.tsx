import { useMemo } from "react";
import { motion } from "motion/react";

const dayNames = ["一", "二", "三", "四", "五", "六", "日"];

export function WeekMood({ moodRecords }: { moodRecords: any[] }) {
  // 构建最近 7 天数据
  const weekData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split("T")[0];
      const record = moodRecords.find((r) => r.date === dateStr);

      if (record) {
        return {
          moodValue: record.moodValue,
          hasRecord: true,
        };
      }

      // 无记录的日期
      if (moodRecords.length === 0) {
        const sampleValues = [4, 5, 2, 4, 3, 3, 2];
        return {
          moodValue: Math.max(0, Math.min(4, sampleValues[i] - 1)),
          hasRecord: false,
        };
      }

      return {
        moodValue: 2,
        hasRecord: false,
      };
    });
  }, [moodRecords]);

  // 图表数据点
  const chartPoints = useMemo(() => {
    if (moodRecords.length >= 2) {
      return weekData.map((d, i) => ({
        x: i,
        y: d.moodValue,
        hasRecord: d.hasRecord,
      }));
    }
    return [
      { x: 0, y: 4, hasRecord: false },
      { x: 1, y: 5, hasRecord: false },
      { x: 2, y: 1, hasRecord: false },
      { x: 3, y: 3, hasRecord: false },
      { x: 4, y: 3, hasRecord: false },
      { x: 5, y: 3, hasRecord: false },
      { x: 6, y: 1, hasRecord: false },
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

  // 找出图表上的标注点
  const getLabelPoints = () => {
    const points = [];
    const maxIdx = chartPoints.reduce((maxI, p, i) => (p.y > (chartPoints[maxI]?.y ?? 0) ? i : maxI), 0);
    const minIdx = chartPoints.reduce((minI, p, i) => (p.y < (chartPoints[minI]?.y ?? 99) ? i : minI), 0);
    const midIdx = chartPoints.findIndex((p) => p.y <= 2 && p.y >= 2) ?? 3;

    points.push({ index: maxIdx, type: "high" as const });
    if (minIdx !== maxIdx) points.push({ index: minIdx, type: "low" as const });
    if (midIdx !== maxIdx && midIdx !== minIdx) points.push({ index: midIdx, type: "mid" as const });

    return points;
  };

  const chartPath = generateChartPath();
  const labelPoints = getLabelPoints();

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm">
      <div className="relative h-56 mb-2">
        <svg viewBox="0 0 350 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CFC3EF" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#CFC3EF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {chartPath && (
            <motion.path
              d={`${chartPath} L 300 170 L 0 170 Z`}
              fill="url(#chartFill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          )}

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

          {labelPoints.map(({ index, type }) => {
            const pt = chartPoints[index];
            if (!pt || pt.y === null) return null;

            const cx = pt.x * 50;
            const cy = (4 - Math.min(4, Math.max(0, pt.y))) * 35 + 10;
            const info =
              type === "high"
                ? { color: "#9BB068" }
                : type === "low"
                  ? { color: "#FE814B" }
                  : { color: "#CFC3EF" };

            return (
              <motion.g
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <circle cx={cx} cy={cy} r="7" fill={info.color} stroke="#F7F4F2" strokeWidth="3" />
                <circle cx={cx} cy={cy} r="2.5" fill="white" />
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="flex justify-between px-1">
        {dayNames.map((d) => (
          <span key={d} className="text-xs font-semibold text-[rgba(31,22,15,0.48)]">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}