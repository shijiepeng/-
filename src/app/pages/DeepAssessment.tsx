import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Activity, Brain, Users } from "lucide-react";
import { useState } from "react";

// 深化测评题目 - 三个维度
const assessmentSections = {
  biological: {
    title: "生物维度·身体和情绪的关系",
    icon: Activity,
    color: "#B5CF80",
    description: "请根据最近两周的实际情况作答",
    questions: [
      { id: 1, text: "我睡醒后感觉精力充沛，状态不错", reverse: false },
      { id: 2, text: "我能感觉到自己什么时候真的饿了，什么时候只是想吃东西", reverse: false },
      { id: 3, text: "当我情绪不好时，我能说出身体哪个部位有感觉（如胸口紧、肩膀酸）", reverse: false },
      { id: 4, text: "我的睡眠质量影响了我第二天的情绪状态", reverse: true },
      { id: 5, text: "我会因为情绪不好而多吃东西或没有食欲", reverse: true },
      { id: 6, text: "运动之后我的心情会变好", reverse: false },
      { id: 7, text: "我能分辨「我累了」和「我情绪不好」的区别", reverse: false },
      { id: 8, text: "我的睡眠时间和规律比较稳定", reverse: false }
    ]
  },
  psychological: {
    title: "心理维度·思维和情绪的关系",
    icon: Brain,
    color: "#CFC3EF",
    description: "请根据最近两周的实际情况作答",
    questions: [
      { id: 1, text: "当我心情不好时，我会努力从不同角度看这件事", reverse: false },
      { id: 2, text: "遇到麻烦时，我会反复想同一件事，停不下来", reverse: true },
      { id: 3, text: "我相信自己能处理好大多数让我难受的情况", reverse: false },
      { id: 4, text: "我有时候会用压抑情绪来应对，假装没事", reverse: true },
      { id: 5, text: "当我感到焦虑时，我能找到让自己平静下来的方法", reverse: false },
      { id: 6, text: "我会因为一件不顺心的事情影响一整天", reverse: true },
      { id: 7, text: "我能根据不同情境选择不同的情绪应对方式", reverse: false },
      { id: 8, text: "我对自己的未来感到有把握", reverse: false },
      { id: 9, text: "失败或挫折之后，我能比较快地恢复过来", reverse: false },
      { id: 10, text: "我经常在脑子里反复回放让自己难受的场景", reverse: true }
    ]
  },
  social: {
    title: "社会维度·关系和情绪的关系",
    icon: Users,
    color: "#FFC0C0",
    description: "请根据最近两周的实际情况作答",
    questions: [
      { id: 1, text: "当我有困难时，我知道可以找谁求助", reverse: false },
      { id: 2, text: "我在某些关系中会感到很疲惫，觉得付出太多", reverse: true },
      { id: 3, text: "我能在需要时拒绝别人的请求", reverse: false },
      { id: 4, text: "我有可以倾诉心里话的朋友或家人", reverse: false },
      { id: 5, text: "维护人际关系让我感到有压力", reverse: true },
      { id: 6, text: "我知道自己在关系中需要什么，也能说出来", reverse: false },
      { id: 7, text: "当关系中出现冲突，我能控制住自己的情绪", reverse: false },
      { id: 8, text: "我会主动维护对自己重要的关系", reverse: false }
    ]
  }
};

const options = [
  { value: 1, label: "从不" },
  { value: 2, label: "偶尔" },
  { value: 3, label: "有时" },
  { value: 4, label: "经常" },
  { value: 5, label: "总是" }
];

export function DeepAssessment() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromResults = location.state?.fromResults;
  
  const [currentSection, setCurrentSection] = useState<keyof typeof assessmentSections>("biological");
  const [answers, setAnswers] = useState<Record<string, Record<number, number>>>({
    biological: {},
    psychological: {},
    social: {}
  });

  const section = assessmentSections[currentSection];
  const sectionIndex = Object.keys(assessmentSections).indexOf(currentSection);
  const totalSections = Object.keys(assessmentSections).length;
  const progress = ((sectionIndex + 1) / totalSections) * 100;

  const currentAnswers = answers[currentSection];
  const allAnswered = section.questions.every(q => currentAnswers[q.id] !== undefined);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({
      ...answers,
      [currentSection]: {
        ...currentAnswers,
        [questionId]: value
      }
    });
  };

  const calculateScore = (dimension: keyof typeof assessmentSections) => {
    const sectionData = assessmentSections[dimension];
    const sectionAnswers = answers[dimension];
    let total = 0;

    sectionData.questions.forEach(q => {
      const answer = sectionAnswers[q.id] || 0;
      // 反向计分：6 - 原始分
      total += q.reverse ? (6 - answer) : answer;
    });

    return total;
  };

  const handleNext = () => {
    const sections = Object.keys(assessmentSections) as Array<keyof typeof assessmentSections>;
    const currentIndex = sections.indexOf(currentSection);

    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
      window.scrollTo(0, 0);
    } else {
      // 计算三个维度得分
      const scores = {
        biological: calculateScore("biological"),
        psychological: calculateScore("psychological"),
        social: calculateScore("social")
      };
      
      // 导航到结果页
      navigate("/deep-assessment-results", { state: { scores } });
    }
  };

  const handleBack = () => {
    const sections = Object.keys(assessmentSections) as Array<keyof typeof assessmentSections>;
    const currentIndex = sections.indexOf(currentSection);

    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
      window.scrollTo(0, 0);
    } else {
      if (fromResults) {
        navigate("/assessment-results");
      } else {
        navigate("/home");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4f2]">
      {/* Header */}
      <header className="bg-[#f7f4f2] px-4 pt-6 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[rgba(31,22,15,0.24)]"
          >
            <ArrowLeft className="w-6 h-6 text-[#4b3425]" />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-[rgba(31,22,15,0.64)] mb-2">
            <span>深化测评 · 第{sectionIndex + 1}部分</span>
            <span>共{totalSections}部分</span>
          </div>
          <div className="h-2 bg-[rgba(31,22,15,0.12)] rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                backgroundColor: section.color
              }}
            />
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${section.color}20` }}
          >
            <section.icon className="w-6 h-6" style={{ color: section.color }} />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#4b3425]">
              {section.title}
            </h1>
            <p className="text-sm text-[rgba(31,22,15,0.64)]">
              {section.description}
            </p>
          </div>
        </div>
      </header>

      {/* Questions */}
      <main className="px-4 pb-32">
        <div className="space-y-6">
          {section.questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-2xl p-5 border-2 border-[rgba(31,22,15,0.12)]">
              <div className="flex gap-3 mb-4">
                <span 
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: section.color }}
                >
                  {index + 1}
                </span>
                <p className="text-[#4b3425] font-medium flex-1">
                  {question.text}
                </p>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all ${
                      currentAnswers[question.id] === option.value
                        ? "border-2 text-white"
                        : "bg-[#f7f4f2] text-[#4b3425] border-2 border-transparent"
                    }`}
                    style={{
                      backgroundColor: currentAnswers[question.id] === option.value ? section.color : undefined,
                      borderColor: currentAnswers[question.id] === option.value ? section.color : undefined
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Next Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(31,22,15,0.12)] p-4">
        <button
          onClick={handleNext}
          disabled={!allAnswered}
          className="w-full py-4 rounded-full font-semibold text-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{ backgroundColor: allAnswered ? section.color : "#ccc" }}
        >
          {sectionIndex < totalSections - 1 ? "下一部分" : "完成测评"}
        </button>
      </div>
    </div>
  );
}