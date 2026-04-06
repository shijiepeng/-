import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, BookOpen, ClipboardList, Dumbbell, PenTool, Target, BarChart3, Flag, Wrench, Map, Lightbulb } from "lucide-react";
import { trainingPackages } from "../data/trainingPackages";
import { FoodEmotionBeginner } from "../components/lessons/FoodEmotionBeginner";
import { FoodEmotionTheory1 } from "../components/lessons/FoodEmotionTheory1";
import { FoodEmotionTheory2 } from "../components/lessons/FoodEmotionTheory2";
import { FoodEmotionRecord1 } from "../components/lessons/FoodEmotionRecord1";
import { FoodEmotionPractice1 } from "../components/lessons/FoodEmotionPractice1";
import { useTrainingProgress } from "../store";
import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { motion } from "motion/react";

export function LessonDetail() {
  const navigate = useNavigate();
  const { trainingId, level, lessonId } = useParams();
  const { completeLesson, getProgress } = useTrainingProgress();
  const [showConfettiDone, setShowConfettiDone] = useState(false);

  const training = trainingPackages[trainingId as keyof typeof trainingPackages];

  if (!training || !level) {
    return <div>课程不存在</div>;
  }

  const currentLevel = training.levels[level as "beginner" | "advanced" | "intensive"];
  const lesson = currentLevel.lessons.find((l) => l.id === parseInt(lessonId || "0"));

  if (!lesson) {
    return <div>课程不存在</div>;
  }

  const currentIndex = currentLevel.lessons.findIndex((l) => l.id === lesson.id);
  const isLastLesson = currentIndex === currentLevel.lessons.length - 1;

  // 检查这节课是否已完成
  const progress = getProgress(trainingId!);
  const isCompleted =
    progress?.completedLessons[level as keyof typeof progress.completedLessons]?.includes(
      Number(lesson.id)
    ) ?? false;

  const triggerConfetti = useCallback(() => {
    if (showConfettiDone) return;
    setShowConfettiDone(true);

    // 基础庆祝
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#B5CF80", "#CFC3EF", "#FFC0C0", "#4b3425", "#e8b84f"],
    });

    // 如果是最后节课，额外放一次
    if (isLastLesson) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#B5CF80", "#CFC3EF", "#FFC0C0"],
        });
      }, 400);
    }
  }, [showConfettiDone, isLastLesson]);

  const handleComplete = () => {
    // 标记完成并触发庆祝
    const isNewComplete = completeLesson(
      trainingId!,
      level as "beginner" | "advanced" | "intensive",
      lesson.id
    );

    if (isNewComplete !== false) {
      triggerConfetti();
    }

    // 延迟导航，让用户看到庆祝效果
    setTimeout(() => {
      if (!isLastLesson) {
        // 前往下一课
        const nextLesson = currentLevel.lessons[currentIndex + 1];
        navigate(`/training/${trainingId}/level/${level}/lesson/${nextLesson.id}`);
      } else {
        // 最后一课跳转到后测页面
        navigate(`/pre-post-test/${trainingId}/${level}/post`);
      }
    }, isNewComplete ? 1500 : 300);
  };

  const handleNext = () => {
    if (!isLastLesson) {
      const nextLesson = currentLevel.lessons[currentIndex + 1];
      navigate(`/training/${trainingId}/level/${level}/lesson/${nextLesson.id}`);
    }
  };

  // 根据训练包ID和级别渲染不同的课程内容
  const renderLessonContent = () => {
    if (trainingId === "food-emotion" && level === "beginner") {
      if (lesson.id === 1) {
        return (
          <FoodEmotionBeginner
            onComplete={handleComplete}
            onNext={handleNext}
            isLastLesson={isLastLesson}
            trainingColor={training.color}
          />
        );
      } else if (lesson.id === 2) {
        return (
          <FoodEmotionTheory1
            onComplete={handleComplete}
            onNext={handleNext}
            isLastLesson={isLastLesson}
            trainingColor={training.color}
          />
        );
      } else if (lesson.id === 3) {
        return (
          <FoodEmotionTheory2
            onComplete={handleComplete}
            onNext={handleNext}
            isLastLesson={isLastLesson}
            trainingColor={training.color}
          />
        );
      } else if (lesson.id === 4) {
        return (
          <FoodEmotionRecord1
            onComplete={handleComplete}
            onNext={handleNext}
            isLastLesson={isLastLesson}
            trainingColor={training.color}
          />
        );
      } else if (lesson.id === 5) {
        return (
          <FoodEmotionPractice1
            onComplete={handleComplete}
            onNext={handleNext}
            isLastLesson={isLastLesson}
            trainingColor={training.color}
          />
        );
      }
    }

    // 通用课程内容模板 - 根据 lesson.type 渲染不同样式
    const typeConfig: Record<string, { title: string; icon: React.ComponentType<any>; color: string }> = {
      理论: { title: "理论学习", icon: BookOpen, color: "#4b7fb8" },
      测评: { title: "自我测评", icon: ClipboardList, color: "#CFC3EF" },
      练习: { title: "实践练习", icon: Dumbbell, color: "#B5CF80" },
      记录: { title: "记录反思", icon: PenTool, color: "#FFC0C0" },
      技巧: { title: "技巧学习", icon: Target, color: "#e8b84f" },
      分析: { title: "分析总结", icon: BarChart3, color: "#6b5b95" },
      总结: { title: "本节总结", icon: Flag, color: "#4b3425" },
      工具: { title: "工具介绍", icon: Wrench, color: "#7d6b5f" },
      规划: { title: "规划制定", icon: Map, color: "#4b7fb8" },
    };

    const config = typeConfig[lesson.type] || typeConfig["理论"];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 类型标签卡片 */}
        <motion.div
          className="rounded-2xl p-5 mb-6 border-2"
          style={{ backgroundColor: `${config.color}10`, borderColor: config.color }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${config.color}20` }}>
              <config.icon className="w-6 h-6" style={{ color: config.color }} />
            </div>
            <div>
              <h3 className="font-bold text-[#4b3425] text-lg">{config.title}</h3>
              <p className="text-sm text-[rgba(31,22,15,0.64)]">{lesson.title}</p>
            </div>
          </div>
        </motion.div>

        {/* 内容区域 */}
        <motion.div
          className="bg-white rounded-2xl p-6 border-2 border-[rgba(31,22,15,0.12)] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="prose prose-sm max-w-none">
            <p className="text-[#4b3425] leading-relaxed mb-4 text-base">
              这是 <span className="font-bold text-lg">{lesson.title}</span> 的课程内容。
              本节属于「{config.title}」类型。
            </p>

            {lesson.type === "理论" && (
              <div className="space-y-4 mt-4">
                <div className="bg-[#f7f4f2] rounded-xl p-4">
                  <h4 className="font-bold text-[#4b3425] mb-2">核心概念</h4>
                  <p className="text-sm text-[rgba(31,22,15,0.72)] leading-relaxed">
                    在这一节中，你将学习关于{training.title}的基础理论知识。
                    理解这些概念是后续实践练习的重要基础。
                  </p>
                </div>
                <div className="bg-[#FFDD5B]/10 rounded-xl p-4 border-0">
                  <h4 className="font-bold text-[#4b3425] mb-2">为什么重要？</h4>
                  <p className="text-sm text-[rgba(31,22,15,0.72)] leading-relaxed">
                    {training.description.slice(0, 60)}...
                    掌握这个知识点能帮助你更好地理解自己的情绪模式。
                  </p>
                </div>
              </div>
            )}

            {lesson.type === "练习" && (
              <div className="space-y-4 mt-4">
                <div className="bg-[#d4e7b8] rounded-xl p-4">
                  <h4 className="font-bold text-[#4b3425] mb-2">练习目标</h4>
                  <ul className="text-sm text-[rgba(31,22,15,0.72)] space-y-1">
                    <li>• 按照步骤完成练习</li>
                    <li>· 注意观察自己的感受变化</li>
                    <li>· 不需要追求完美，尝试就好</li>
                  </ul>
                </div>
                <div className="rounded-xl p-4 bg-[rgba(181,207,128,0.08)] border border-[#B5CF80]/30">
                  <p className="text-sm text-[#4b3425] font-medium flex items-center gap-1">
                    <Lightbulb className="w-4 h-4" /> 建议：找一个安静的环境，给自己 10-15 分钟时间来完成。
                  </p>
                </div>
              </div>
            )}

            {(lesson.type === "记录" || lesson.type === "总结") && (
              <div className="space-y-4 mt-4">
                <div className="rounded-xl p-4 bg-[#f7f4f2]">
                  <h4 className="font-bold text-[#4b3425] mb-2">回顾与反思</h4>
                  <p className="text-sm text-[rgba(31,22,15,0.72)] leading-relaxed">
                    花一点时间回想一下你在本级别学到的内容。
                    记录下你的感受和收获，这会帮助你巩固所学。
                  </p>
                </div>
              </div>
            )}

            {!["理论", "练习", "记录", "总结"].includes(lesson.type) && (
              <div className="mt-4 space-y-3">
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${config.color}08` }}
                >
                  <p className="text-sm text-[#4b3425] leading-relaxed">
                    这是一节{config.title}课程。请按照页面指引完成相关操作，
                    在实际产品中这里会有更丰富的互动内容和多媒体素材。
                  </p>
                </div>

                <div className="rounded-xl p-4 bg-[#f7f4f2]">
                  <h4 className="font-bold text-[#4b3425] mb-2">要点提示</h4>
                  <ul className="text-sm text-[rgba(31,22,15,0.72)] space-y-1">
                    <li>· 认真阅读每个环节的内容</li>
                    <li>· 如有疑问可以重复查看</li>
                    <li>· 完成后点击下方按钮进入下一课</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* 完成按钮 */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
              isCompleted
                ? "bg-[#e8ddd9] text-[rgba(31,22,15,0.48)] cursor-default"
                : "text-white active:scale-[0.98]"
            }`}
            style={{
              backgroundColor: isCompleted ? undefined : training.color,
            }}
            whileTap={isCompleted ? {} : { scale: 0.98 }}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                已完成
              </>
            ) : isLastLesson ? (
              "进入后测"
            ) : (
              "完成并继续"
            )}
          </motion.button>
          {/* 最后一课显示开始后测按钮 */}
          {isLastLesson && !isCompleted && (
            <motion.button
              onClick={() => navigate(`/pre-post-test/${trainingId}/${level}/post`)}
              className="flex-1 py-4 rounded-full font-semibold text-lg text-white bg-[#B5CF80] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              whileTap={{ scale: 0.98 }}
            >
              开始后测
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f4f2]">
      {/* Header */}
      <motion.header
        className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={() => navigate(`/training/${trainingId}/level/${level}`)}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </motion.button>
        </div>

        <motion.div
          className="flex items-center gap-2 mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span
            className="text-xs px-2 py-1 rounded-full text-white font-semibold"
            style={{ backgroundColor: training.color }}
          >
            {currentLevel.title}
          </span>
          <span className="text-xs text-[rgba(31,22,15,0.64)]">
            第{currentIndex + 1}/{currentLevel.lessons.length}课
          </span>
          {isCompleted && (
            <motion.span
              className="text-xs px-2 py-1 rounded-full bg-[#B5CF80] text-[#4b3425] font-semibold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              已完成
            </motion.span>
          )}
        </motion.div>

        <motion.h1
          className="text-2xl font-bold text-[#4b3425] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {lesson.title}
        </motion.h1>

        <motion.div
          className="flex items-center gap-3 text-sm text-[rgba(31,22,15,0.64)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <span>{currentLevel.duration}</span>
          <span>·</span>
          <span>{lesson.type}</span>
        </motion.div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 pb-8">{renderLessonContent()}</main>
    </div>
  );
}