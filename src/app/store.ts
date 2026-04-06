import { useState, useEffect, useCallback } from "react";
import type {
  AppStore,
  MoodRecord,
  TrainingProgress,
  AssessmentResult,
  UserStats,
  PrePostTestResult,
} from "./types";

const STORAGE_KEY = "mental-gym-store";

// ==================== 默认值 ====================
const defaultStats: UserStats = {
  joinDate: new Date().toISOString(),
  totalMoodRecords: 0,
  totalLessonsCompleted: 0,
  level: "入门训练者",
  levelProgress: 0,
};

const defaultStore: AppStore = {
  moodRecords: [],
  trainingProgress: {},
  assessmentData: null,
  userStats: defaultStats,
  favorites: [],
  hasCompletedOnboarding: false,
  prePostTestResults: [],
};

// ==================== localStorage 操作 ====================

function loadStore(): AppStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultStore, ...parsed };
    }
  } catch (e) {
    console.warn("Failed to load store from localStorage:", e);
  }
  return { ...defaultStore };
}

function saveStore(store: AppStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn("Failed to save store to localStorage:", e);
  }
}

// ==================== Hooks ====================

export function useStore() {
  const [store, setStore] = useState<AppStore>(loadStore);

  // 同步到 localStorage
  useEffect(() => {
    saveStore(store);
  }, [store]);

  // 监听其他 tab 的变化
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setStore(loadStore());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const update = useCallback((patch: Partial<AppStore>) => {
    setStore((prev) => ({ ...prev, ...patch }));
  }, []);

  return { store, update, setStore };
}

// ==================== 心情记录 Hook ====================

export function useMoodRecords() {
  const { store, update } = useStore();

  const addMoodRecord = useCallback(
    (record: Omit<MoodRecord, "id" | "createdAt">) => {
      const newRecord: MoodRecord = {
        ...record,
        id: `mood-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
      };

      update({
        moodRecords: [...store.moodRecords, newRecord],
        userStats: {
          ...store.userStats,
          totalMoodRecords: store.userStats.totalMoodRecords + 1,
        },
      });

      return newRecord;
    },
    [store.moodRecords, store.userStats, update]
  );

  const getTodayRecord = useCallback((): MoodRecord | undefined => {
    const today = new Date().toISOString().split("T")[0];
    return store.moodRecords.find((r) => r.date === today);
  }, [store.moodRecords]);

  const getRecentRecords = useCallback(
    (days: number = 7): MoodRecord[] => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      return store.moodRecords.filter(
        (r) => new Date(r.date) >= cutoff
      );
    },
    [store.moodRecords]
  );

  // 计算连续记录天数
  const getStreakDays = useCallback((): number => {
    if (store.moodRecords.length === 0) return 0;

    // 获取所有唯一日期并排序（最新在前）
    const dates = [
      ...new Set(store.moodRecords.map((r) => r.date)),
    ].sort().reverse();

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < dates.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);

      if (dates.includes(checkDate.toISOString().split("T")[0])) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, [store.moodRecords]);

  return {
    moodRecords: store.moodRecords,
    addMoodRecord,
    getTodayRecord,
    getRecentRecords,
    getStreakDays,
  };
}

// ==================== 训练进度 Hook ====================

export function useTrainingProgress() {
  const { store, update } = useStore();

  const getProgress = useCallback(
    (trainingId: string): TrainingProgress | undefined => {
      return store.trainingProgress[trainingId];
    },
    [store.trainingProgress]
  );

  const completeLesson = useCallback(
    (
      trainingId: string,
      level: "beginner" | "advanced" | "intensive",
      lessonId: number
    ) => {
      const existing = store.trainingProgress[trainingId];

      if (existing) {
        // 检查是否已完成
        if (existing.completedLessons[level].includes(lessonId)) {
          return false; // 已经完成过了
        }

        const updated = {
          ...existing,
          completedLessons: {
            ...existing.completedLessons,
            [level]: [...existing.completedLessons[level], lessonId],
          },
          lastActivityAt: new Date().toISOString(),
          currentLevel: level,
        };

        // 计算总完成课程数
        const totalCompleted =
          Object.values(updated.completedLessons).flat().length;
        const prevTotal = Object.values(existing.completedLessons).flat()
          .length;

        update({
          trainingProgress: {
            ...store.trainingProgress,
            [trainingId]: updated,
          },
          userStats: {
            ...store.userStats,
            totalLessonsCompleted:
              store.userStats.totalLessonsCompleted +
              (totalCompleted - prevTotal),
          },
        });

        return true; // 新完成的课程
      } else {
        // 首次开始这个训练包
        const newProgress: TrainingProgress = {
          trainingId,
          currentLevel: level,
          completedLessons: {
            beginner: level === "beginner" ? [lessonId] : [],
            advanced: level === "advanced" ? [lessonId] : [],
            intensive: level === "intensive" ? [lessonId] : [],
          },
          startedAt: new Date().toISOString(),
          lastActivityAt: new Date().toISOString(),
        };

        update({
          trainingProgress: {
            ...store.trainingProgress,
            [trainingId]: newProgress,
          },
          userStats: {
            ...store.userStats,
            totalLessonsCompleted: store.userStats.totalLessonsCompleted + 1,
          },
        });

        return true;
      }
    },
    [store.trainingProgress, store.userStats, update]
  );

  const getLevelProgress = useCallback(
    (
      trainingId: string,
      level: "beginner" | "advanced" | "intensive",
      totalLessons: number
    ): number => {
      const progress = store.trainingProgress[trainingId];
      if (!progress) return 0;
      const completed = progress.completedLessons[level].length;
      return Math.round((completed / totalLessons) * 100);
    },
    [store.trainingProgress]
  );

  const toggleFavorite = useCallback(
    (trainingId: string) => {
      const favorites = store.favorites.includes(trainingId)
        ? store.favorites.filter((id) => id !== trainingId)
        : [...store.favorites, trainingId];
      update({ favorites });
    },
    [store.favorites, update]
  );

  return {
    trainingProgress: store.trainingProgress,
    favorites: store.favorites,
    getProgress,
    completeLesson,
    getLevelProgress,
    toggleFavorite,
  };
}

// ==================== 测评数据 Hook ====================

export function useAssessment() {
  const { store, update } = useStore();

  const saveAssessment = useCallback((result: AssessmentResult) => {
    update({ assessmentData: result });
  }, [update]);

  const clearAssessment = useCallback(() => {
    update({ assessmentData: null });
  }, [update]);

  return {
    assessmentData: store.assessmentData,
    saveAssessment,
    clearAssessment,
  };
}

// ==================== 训练前后测 Hook ====================

export function usePrePostTest() {
  const { store, update } = useStore();

  const savePrePostTest = useCallback((result: PrePostTestResult) => {
    const existing = store.prePostTestResults.find(
      (r) => r.trainingId === result.trainingId && r.level === result.level && r.type === result.type
    );

    if (existing) {
      // 更新已有的
      update({
        prePostTestResults: store.prePostTestResults.map((r) =>
          r.trainingId === result.trainingId && r.level === result.level && r.type === result.type
            ? result
            : r
        ),
      });
    } else {
      // 新增
      update({
        prePostTestResults: [...store.prePostTestResults, result],
      });
    }
  }, [store.prePostTestResults, update]);

  const getPreTest = useCallback(
    (trainingId: string, level: "beginner" | "advanced" | "intensive"): PrePostTestResult | undefined => {
      return store.prePostTestResults.find(
        (r) => r.trainingId === trainingId && r.level === level && r.type === "pre"
      );
    },
    [store.prePostTestResults]
  );

  const getPostTest = useCallback(
    (trainingId: string, level: "beginner" | "advanced" | "intensive"): PrePostTestResult | undefined => {
      return store.prePostTestResults.find(
        (r) => r.trainingId === trainingId && r.level === level && r.type === "post"
      );
    },
    [store.prePostTestResults]
  );

  const hasPreTest = useCallback(
    (trainingId: string, level: "beginner" | "advanced" | "intensive"): boolean => {
      return !!getPreTest(trainingId, level);
    },
    [getPreTest]
  );

  const hasPostTest = useCallback(
    (trainingId: string, level: "beginner" | "advanced" | "intensive"): boolean => {
      return !!getPostTest(trainingId, level);
    },
    [getPostTest]
  );

  return {
    prePostTestResults: store.prePostTestResults,
    savePrePostTest,
    getPreTest,
    getPostTest,
    hasPreTest,
    hasPostTest,
  };
}
