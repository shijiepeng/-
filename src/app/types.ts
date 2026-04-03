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
}
