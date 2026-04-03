import { createBrowserRouter } from "react-router";
import { Welcome } from "./pages/Welcome";
import { Home } from "./pages/Home";
import { Assessment } from "./pages/Assessment";
import { AssessmentResults } from "./pages/AssessmentResults";
import { DeepAssessment } from "./pages/DeepAssessment";
import { DeepAssessmentResults } from "./pages/DeepAssessmentResults";
import { Training } from "./pages/Training";
import { TrainingDetail } from "./pages/TrainingDetail";
import { LessonDetail } from "./pages/LessonDetail";
import { MoodLog } from "./pages/MoodLog";
import { MoodRecord } from "./pages/MoodRecord";
import { Profile } from "./pages/Profile";
import { Situations } from "./pages/Situations";
import { SituationPath } from "./pages/SituationPath";
import { Favorites } from "./pages/Favorites";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/assessment",
    Component: Assessment,
  },
  {
    path: "/assessment-results",
    Component: AssessmentResults,
  },
  {
    path: "/deep-assessment",
    Component: DeepAssessment,
  },
  {
    path: "/deep-assessment-results",
    Component: DeepAssessmentResults,
  },
  {
    path: "/training",
    Component: Training,
  },
  {
    path: "/training/:trainingId",
    Component: TrainingDetail,
  },
  {
    path: "/training/:trainingId/level/:level/lesson/:lessonId",
    Component: LessonDetail,
  },
  {
    path: "/situations",
    Component: Situations,
  },
  {
    path: "/situation/:situationId",
    Component: SituationPath,
  },
  {
    path: "/mood-log",
    Component: MoodLog,
  },
  {
    path: "/mood-record",
    Component: MoodRecord,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/favorites",
    Component: Favorites,
  },
  {
    path: "/settings",
    Component: Settings,
  },
]);
