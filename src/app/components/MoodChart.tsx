import { useMoodRecords } from "../store";

const dayNames = ["一", "二", "三", "四", "五", "六", "日"];

// 根据心情值获取颜色
function getMoodColor(moodValue: number): string {
  const colors = ["#fe814b", "#e67a5a", "#a68968", "#e8b84f", "#9bb068"];
  return colors[moodValue] ?? "#a68968";
}

function getMoodLabel(moodValue: number): string {
  const labels = ["低落", "难过", "平静", "开心", "愉悦"];
  return labels[moodValue] ?? "平静";
}

export function MoodChart() {
  const { getRecentRecords } = useMoodRecords();
  const recentRecords = getRecentRecords(7);

  // 构建最近7天数据（含无记录日期）
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];

    const record = recentRecords.find((r) => r.date === dateStr);
    return {
      date: dateStr,
      dayName: dayNames[date.getDay() === 0 ? 6 : date.getDay() - 1],
      moodValue: record?.moodValue ?? null,
      hasRecord: !!record,
    };
  });

  // 计算折线路径
  const generatePath = () => {
    const points = chartData.map((d, i) => {
      if (d.moodValue === null) return null;
      const x = (i / 6) * 100;
      // mood 0-4 映射到 y 80-15 (反转，0在下方)
      const y = 80 - (d.moodValue! / 4) * 65;
      return { x, y, value: d.moodValue };
    });

    // 过滤掉null点并连接有效点
    const validPoints = points.filter((p) => p !== null) as { x: number; y: number; value: number }[];
    if (validPoints.length < 2) return { linePath: "", areaPath: "", points: validPoints };

    let linePath = `M ${validPoints[0].x} ${validPoints[0].y}`;
    for (let i = 1; i < validPoints.length; i++) {
      // 用平滑曲线连接
      const prev = validPoints[i - 1];
      const curr = validPoints[i];
      const cpx1 = (prev.x + curr.x) / 2;
      const cpx2 = (prev.x + curr.x) / 2;
      linePath += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    // 区域填充路径
    const areaPath = `${linePath} L ${validPoints[validPoints.length - 1].x} 80 L ${validPoints[0].x} 80 Z`;

    return { linePath, areaPath, points: validPoints };
  };

  const { linePath, areaPath, points } = generatePath();

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm">
      {/* Chart Area */}
      <div className="relative h-44 mb-3">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full border-t border-dashed border-[#ececf0]" />
          ))}
        </div>

        {/* Y轴标签 */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-[rgba(31,22,15,0.32)] py-1">
          <span>好</span>
          <span>中</span>
          <span>差</span>
        </div>

        {/* SVG Chart */}
        <svg className="absolute inset-0 w-full h-full ml-4" viewBox="0 0 100 85" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#926247" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#926247" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          {areaPath && (
            <path d={areaPath} fill="url(#chartGradient)" />
          )}

          {/* Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#926247"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="2.5"
                fill="#4B3425"
                stroke="white"
                strokeWidth="1"
              />

              {/* Label on first and last point */}
              {(index === 0 || index === points.length - 1) && (
                <>
                  <rect
                    x={point.x - 10}
                    y={point.y - 14}
                    width="20"
                    height="10"
                    rx="3"
                    fill={getMoodColor(point.value)}
                  />
                </>
              )}
            </g>
          ))}
        </svg>

        {/* No data message */}
        {!points.length && (
          <div className="absolute inset-0 flex items-center justify-center ml-4">
            <p className="text-sm text-[rgba(31,22,15,0.32)]">记录更多心情后查看趋势</p>
          </div>
        )}
      </div>

      {/* Day labels */}
      <div className="flex justify-between px-2">
        {chartData.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className={`text-xs font-medium ${d.hasRecord ? "text-[#4b3425]" : "text-[rgba(31,22,15,0.32)]"}`}>
              {d.dayName}
            </span>
            {d.hasRecord && d.moodValue !== null && (
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getMoodColor(d.moodValue) }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
