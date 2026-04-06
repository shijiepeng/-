import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, Play, Lock, Star, Moon, Activity, Utensils, Dumbbell, Brain, Heart, Shield, Users, VolumeX, RefreshCw, Sliders, Compass, UserCheck, ClipboardList, TrendingUp } from "lucide-react";
import { useState } from "react";
import { trainingPackages } from "../data/trainingPackages";
import { useTrainingProgress, usePrePostTest, useTrainingReturnPath } from "../store";

const trainingIcons: Record<string, React.ComponentType<any>> = {
  "food-emotion": Utensils,
  "sleep-training": Moon,
  "body-awareness": Heart,
  "exercise-emotion": Dumbbell,
  "cognitive-reframe": RefreshCw,
  "emotion-regulation": Sliders,
  "stop-rumination": VolumeX,
  "resilience-training": Shield,
  "know-needs": Compass,
  "find-support": UserCheck,
  "relationship-care": Users,
};

export function TrainingDetail() {
  const navigate = useNavigate();
  const { trainingId, level } = useParams<{
    trainingId: string;
    level: "beginner" | "advanced" | "intensive";
  }>();
  const [selectedLevel, setSelectedLevel] = useState<
    "beginner" | "advanced" | "intensive"
  >(level || "beginner");
  const { getProgress, getLevelProgress, toggleFavorite, favorites } =
    useTrainingProgress();
  const { hasPreTest, hasPostTest, getPreTest, getPostTest } = usePrePostTest();
  const { trainingReturnPath } = useTrainingReturnPath();

  const training = trainingPackages[trainingId as keyof typeof trainingPackages];

  if (!training) {
    return <div>训练不存在</div>;
  }

  const currentLevel = training.levels[selectedLevel];
  const progress = getProgress(trainingId!);
  const isFavorite = favorites.includes(trainingId!);
  const levelProgressPercent = getLevelProgress(
    trainingId!,
    selectedLevel,
    currentLevel.lessons.length
  );

  return (
    <div className="min-h-screen bg-[#f7f4f2]">
      {/* Header */}
      <header className="bg-white px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(trainingReturnPath || "/training")}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${training.color}20` }}
          >
            {(() => {
              const IconComponent = trainingIcons[trainingId!] || Activity;
              return <IconComponent className="w-8 h-8" style={{ color: training.color }} />;
            })()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#4b3425] mb-1">
              {training.title}
            </h1>
            <p className="text-sm text-[rgba(31,22,15,0.64)]">
              {training.dimension} · {training.subtitle}
            </p>
          </div>
        </div>

        {/* 收藏按钮 */}
        <button
          onClick={() => toggleFavorite(trainingId!)}
          className="flex items-center gap-1.5 mb-3"
        >
          <Star
            className="w-5 h-5 transition-colors"
            style={{
              color: isFavorite ? "#fbbf24" : "rgba(31,22,15,0.32)",
              fill: isFavorite ? "#fbbf24" : "none",
            }}
          />
          <span
            className="text-sm font-medium"
            style={{
              color: isFavorite ? "#fbbf24" : "rgba(31,22,15,0.48)",
            }}
          >
            {isFavorite ? "已收藏" : "收藏"}
          </span>
        </button>

        <p className="text-[rgba(31,22,15,0.64)] mb-4">
          {training.description}
        </p>

        {/* Level Selector */}
        <div className="flex gap-2 mb-4">
          {(["beginner", "advanced", "intensive"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                selectedLevel === lvl
                  ? "text-white"
                  : "bg-[#f7f4f2] text-[#4b3425] border-2 border-[rgba(31,22,15,0.12)]"
              }`}
              style={{
                backgroundColor:
                  selectedLevel === lvl ? training.color : undefined,
              }}
            >
              {{
                beginner: "入门级",
                advanced: "进阶级",
                intensive: "强化级",
              }[lvl]}
            </button>
          ))}
        </div>

        {/* Current Level Info with Progress */}
        <div
          className="rounded-2xl p-4 border-2"
          style={{
            backgroundColor: `${training.color}10`,
            borderColor: training.color,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs px-2 py-1 rounded-full text-white font-semibold"
              style={{ backgroundColor: training.color }}
            >
              {currentLevel.title}
            </span>
            <span className="text-sm font-semibold text-[#4b3425]">
              {currentLevel.duration}
            </span>
            {levelProgressPercent > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-bold text-white ml-auto"
                style={{ backgroundColor: training.color }}
              >
                {levelProgressPercent}%
              </span>
            )}
          </div>
          <p className="text-sm text-[#4b3425]">{currentLevel.description}</p>

          {/* 进度条 */}
          {levelProgressPercent > 0 && (
            <div className="mt-3">
              <div className="h-2 bg-[rgba(31,22,15,0.08)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${levelProgressPercent}%`,
                    backgroundColor: training.color,
                  }}
                />
              </div>
              <p className="text-xs text-right mt-1 text-[rgba(31,22,15,0.48)]">
                已完成{" "}
                {
                  progress?.completedLessons[
                    selectedLevel as keyof typeof progress.completedLessons
                  ]?.length ?? 0
                }
                /{currentLevel.lessons.length} 节课
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Lessons */}
      <main className="px-4 py-6 pb-24">
        <h2 className="text-lg font-bold text-[#4b3425] mb-4">课程内容</h2>

        {/* 前测卡片 */}
        <button
          onClick={() => navigate(`/pre-post-test/${trainingId}/${selectedLevel}/pre`)}
          className={`w-full bg-white rounded-2xl p-4 mb-4 border-2 flex items-center gap-4 transition-all ${
            levelProgressPercent === 100
              ? "border-[#B5CF80]/50 cursor-pointer hover:border-[#B5CF80]"
              : levelProgressPercent === 0
                ? "border-[#e8b84f]/50 cursor-pointer hover:border-[#e8b84f]"
                : "border-[rgba(31,22,15,0.24)] opacity-50 cursor-not-allowed"
          }`}
          disabled={levelProgressPercent > 0 && levelProgressPercent < 100}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            levelProgressPercent === 100 ? "bg-[#B5CF80]/20" : "bg-[#e8b84f]/20"
          }`}>
            {levelProgressPercent === 100 ? (
              <CheckCircle2 className="w-6 h-6 text-[#B5CF80]" />
            ) : (
              <ClipboardList className="w-6 h-6 text-[#e8b84f]" />
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-[#4b3425]">训练前测</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                levelProgressPercent === 100
                  ? "bg-[#B5CF80]/20 text-[#B5CF80]"
                  : levelProgressPercent === 0
                    ? "bg-[#e8b84f]/20 text-[#e8b84f]"
                    : "bg-[rgba(31,22,15,0.12)] text-[rgba(31,22,15,0.48)]"
              }`}>
                {levelProgressPercent === 100 ? "已完成" : levelProgressPercent === 0 ? "未开始" : "锁定"}
              </span>
            </div>
            <p className="text-sm text-[rgba(31,22,15,0.64)]">
              {hasPreTest(trainingId!, selectedLevel)
                ? `起始情绪：${getPreTest(trainingId!, selectedLevel)?.Q1_mood ?? 0}，完成课程后可重新进行前测`
                : levelProgressPercent === 0
                  ? "建议完成前测再开始训练"
                  : "完成课程后，可重新进行前测"}
            </p>
          </div>
          <TrendingUp className={`w-5 h-5 ${levelProgressPercent === 100 ? "text-[#B5CF80]" : "text-[#e8b84f]"}`} />
        </button>

        <div className="space-y-3">
          {currentLevel.lessons.map((lesson, index) => {
            const isLessonCompleted =
              progress?.completedLessons[
                selectedLevel as keyof typeof progress.completedLessons
              ]?.includes(lesson.id) ?? false;

            return (
              <button
                key={lesson.id}
                onClick={() =>
                  navigate(
                    `/training/${trainingId}/level/${selectedLevel}/lesson/${lesson.id}`
                  )
                }
                className={`w-full rounded-2xl p-4 text-left transition-all border-2 ${
                  isLessonCompleted
                    ? "bg-[#d4e7b8]/30 border-[#B5CF80]/50"
                    : "bg-white border-[rgba(31,22,15,0.12)] hover:border-[#B5CF80]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isLessonCompleted
                        ? "bg-[#B5CF80]"
                        : "bg-[#f7f4f2]"
                    }`}
                  >
                    {isLessonCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-sm font-bold text-[#4b3425]">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-bold text-[#4b3425]`}
                      >
                        {lesson.title}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full bg-[rgba(31,22,15,0.08)] text-[rgba(31,22,15,0.64)]"
                      >
                        {lesson.type}
                      </span>
                    </div>
                    {isLessonCompleted && (
                      <p className="text-xs text-[#B5CF80] font-medium">
                        已完成 ✓
                      </p>
                    )}
                  </div>
                  <Play
                    className="w-5 h-5 flex-shrink-0"
                    style={{
                      color: isLessonCompleted ? "#B5CF80" : training.color,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* 后测卡片 - 放在课程列表下方 */}
        {hasPostTest(trainingId!, selectedLevel) ? (
          // 后测已完成 - 可点击重新测试
          <button
            onClick={() => navigate(`/pre-post-test/${trainingId}/${selectedLevel}/post`)}
            className="mt-4 w-full bg-white rounded-2xl p-4 border-2 border-[#B5CF80]/50 text-left hover:border-[#B5CF80] transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#B5CF80]/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-[#B5CF80]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-[#4b3425]">训练后测</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#B5CF80]/20 text-[#B5CF80] font-semibold">已完成</span>
              </div>
              {(() => {
                const preTest = getPreTest(trainingId!, selectedLevel);
                const postTest = getPostTest(trainingId!, selectedLevel);
                const change = (postTest?.Q1_mood ?? 0) - (preTest?.Q1_mood ?? 0);
                if (change > 0) {
                  return (
                    <p className="text-sm text-[#B5CF80] font-medium">
                      你的情绪从 {preTest?.Q1_mood ?? 0} 升到了 {postTest?.Q1_mood ?? 0}，上升了 {change} 分 ↑（点击重新测试）
                    </p>
                  );
                } else if (change < 0) {
                  return (
                    <p className="text-sm text-[#FE814B] font-medium">
                      你的情绪从 {preTest?.Q1_mood ?? 0} 变成了 {postTest?.Q1_mood ?? 0}（点击重新测试）
                    </p>
                  );
                } else {
                  return (
                    <p className="text-sm text-[rgba(31,22,15,0.64)] font-medium">
                      今天可能有点难，没关系，你完成了训练，这就够了 ✓（点击重新测试）
                    </p>
                  );
                }
              })()}
            </div>
          </button>
        ) : levelProgressPercent === 100 ? (
          // 课程全部完成但后测未做 - 可填写
          <button
            onClick={() => navigate(`/pre-post-test/${trainingId}/${selectedLevel}/post`)}
            className="mt-4 w-full bg-white rounded-2xl p-4 border-2 border-[#B5CF80]/50 text-left hover:border-[#B5CF80] transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#B5CF80]/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-[#B5CF80]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-[#4b3425]">训练后测</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#B5CF80]/20 text-[#B5CF80] font-semibold">可填写</span>
              </div>
              <p className="text-sm text-[rgba(31,22,15,0.64)]">恭喜完成{currentLevel.title}！测测你的进步</p>
            </div>
            <TrendingUp className="w-5 h-5 text-[#B5CF80]" />
          </button>
        ) : (
          // 后测未解锁 - 锁定状态
          <div className="mt-4 w-full bg-white rounded-2xl p-4 border-2 border-[rgba(31,22,15,0.24)] flex items-center gap-4 opacity-50">
            <div className="w-12 h-12 rounded-full bg-[rgba(31,22,15,0.08)] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-[rgba(31,22,15,0.32)]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-[#4b3425]">训练后测</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(31,22,15,0.12)] text-[rgba(31,22,15,0.48)] font-semibold">锁定</span>
              </div>
              <p className="text-sm text-[rgba(31,22,15,0.48)]">完成{currentLevel.title}后解锁</p>
            </div>
            <Lock className="w-5 h-5 text-[rgba(31,22,15,0.32)]" />
          </div>
        )}

        {/* Theory Base */}
        <div className="mt-6 bg-[#FFDD5B]/10 rounded-2xl p-5 border-0">
          <p className="text-sm text-[#4b3425] mb-2 font-semibold">
            理论依据
          </p>
          <p className="text-sm text-[rgba(31,22,15,0.64)]">
            {training.theoreticalBasis}
          </p>
        </div>

        {/* Tips */}
        <div className="mt-4 bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
          <p className="text-sm text-[#4b3425] leading-relaxed">
            <span className="font-semibold">学习建议：</span>
            按顺序完成每节课程，每天练习15-20分钟。建议先完成入门级，
            再进入进阶级和强化级。
            {progress && " 你的学习进度会自动保存。"}
          </p>
        </div>
      </main>
    </div>
  );
}
