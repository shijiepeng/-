// ==================== 心情记录 ====================
export interface MoodRecord {
  id: string;
  date: string; // ISO date string
  moodValue: number; // 0-4 (沮丧/难过/平静/开心/非常开心)
  emotions: string[]; // 选中的情绪标签
  sleepQuality: number; // 0-10
  brainFatigue: number; // 0-10
  bodyFeeling: number; // 0-10
  emotionLevel: number; // 0-10
  stressLevel: number; // 0-10
  createdAt: string;
}

// ==================== 训练进度 ====================
export interface TrainingProgress {
  trainingId: string;
  currentLevel: "beginner" | "advanced" | "intensive";
  completedLessons: {
    beginner: number[];
    advanced: number[];
    intensive: number[];
  };
  startedAt: string;
  lastActivityAt: string;
}

// ==================== 测评结果 ====================
export interface AssessmentResult {
  type: "quick" | "deep";
  date: string;
  scores: {
    biological: number;
    psychological: number;
    social: number;
  };
  answers?: Record<string, any>;
}

// ==================== 训练前后测 ====================
export interface PrePostTestResult {
  trainingId: string;
  level: "beginner" | "advanced" | "intensive";
  type: "pre" | "post";
  date: string;
  Q1_mood: number; // 1-10 情绪总体感受
  Q2_emotion: string; // 最强烈感受
  Q3_intensity: number; // 强度 1-?
  Q4_reason?: string; // 前测专属：今天是什么让你来训练的
  Q2_change?: string; // 后测专属：和训练前比有什么变化
  Q3_impress?: string; // 后测专属：什么让你印象深刻
  Q4_completion?: number; // 后测专属：完成打分 1-5
}

// ==================== 用户统计 ====================
export interface UserStats {
  joinDate: string;
  totalMoodRecords: number;
  totalLessonsCompleted: number;
  level: "入门训练者" | "进阶训练者" | "高级训练者";
  levelProgress: number; // 0-100
}

// ==================== 全局 Store ====================
export interface AppStore {
  moodRecords: MoodRecord[];
  trainingProgress: Record<string, TrainingProgress>;
  assessmentData: AssessmentResult | null;
  userStats: UserStats;
  favorites: string[]; // trainingId[]
  hasCompletedOnboarding: boolean;
  prePostTestResults: PrePostTestResult[]; // 训练前后测结果
}
