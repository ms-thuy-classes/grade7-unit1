import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VocabularySection } from './components/VocabularySection';
import { GrammarSection } from './components/GrammarSection';
import { ExercisesSection } from './components/ExercisesSection';
import { ReportModal } from './components/ReportModal';
import { EXERCISES_LIST } from './data/exercises';
import { isAnswerCorrect } from './utils/checker';
import { Sparkles, Heart, BookCheck } from 'lucide-react';

export default function App() {
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ms_thuy_student_name') || 'Nguyễn Minh Châu';
    }
    return 'Nguyễn Minh Châu';
  });

  const [activeTab, setActiveTab] = useState<'vocabulary' | 'grammar' | 'exercises'>('vocabulary');
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ms_thuy_answers');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {};
  });

  const [checked, setChecked] = useState<Record<number, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ms_thuy_checked');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {};
  });

  const [isReportOpen, setIsReportOpen] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ms_thuy_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('ms_thuy_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('ms_thuy_checked', JSON.stringify(checked));
  }, [checked]);

  // Compute live scores
  const totalQuestions = EXERCISES_LIST.length; // 60
  const answeredCount = Object.keys(checked).filter((k) => checked[Number(k)]).length;
  const correctCount = EXERCISES_LIST.filter(
    (item) => checked[item.id] && isAnswerCorrect(item, answers[item.id])
  ).length;

  const handleAnswerChange = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
    // If the student changes their answer, uncheck that question so they can check again
    if (checked[id]) {
      setChecked((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleCheckQuestion = (id: number) => {
    setChecked((prev) => ({ ...prev, [id]: true }));
  };

  const handleResetQuestion = (id: number) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setChecked((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCheckBatch = (ids: number[]) => {
    setChecked((prev) => {
      const next = { ...prev };
      ids.forEach((id) => {
        next[id] = true;
      });
      return next;
    });
  };

  const handleResetBatch = (ids: number[]) => {
    setAnswers((prev) => {
      const next = { ...prev };
      ids.forEach((id) => {
        delete next[id];
      });
      return next;
    });
    setChecked((prev) => {
      const next = { ...prev };
      ids.forEach((id) => {
        delete next[id];
      });
      return next;
    });
  };

  const handleResetAll = () => {
    if (window.confirm('Em có chắc chắn muốn làm lại toàn bộ 60 câu bài tập từ đầu?')) {
      setAnswers({});
      setChecked({});
    }
  };

  return (
    <div className="h-screen bg-[#fdf2f8] text-gray-800 flex flex-col font-sans selection:bg-pink-200 selection:text-pink-950 overflow-hidden">
      {/* Sticky Top Header */}
      <Header
        studentName={studentName}
        onStudentNameChange={setStudentName}
        correctCount={correctCount}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        onOpenReport={() => setIsReportOpen(true)}
        onResetAll={handleResetAll}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Layout matching Sleek Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sleek Sidebar Navigation */}
        <aside className="w-64 bg-white/40 backdrop-blur-sm border-r border-pink-100/80 p-4 space-y-2 hidden md:flex flex-col shrink-0">
          <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Navigation
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('vocabulary')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold flex items-center justify-between cursor-pointer ${
              activeTab === 'vocabulary'
                ? 'bg-white shadow-sm border border-pink-100 text-pink-600'
                : 'hover:bg-white/60 text-gray-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-2 h-2 rounded-full ${
                  activeTab === 'vocabulary' ? 'bg-pink-500 animate-pulse' : 'border border-gray-300'
                }`}
              />
              <span>I. Vocabulary</span>
            </div>
            <span className="text-[11px] text-gray-400 font-normal">56 từ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('grammar')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold flex items-center justify-between cursor-pointer ${
              activeTab === 'grammar'
                ? 'bg-white shadow-sm border border-pink-100 text-pink-600'
                : 'hover:bg-white/60 text-gray-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-2 h-2 rounded-full ${
                  activeTab === 'grammar' ? 'bg-pink-500 animate-pulse' : 'border border-gray-300'
                }`}
              />
              <span>II. Grammar</span>
            </div>
            <span className="text-[11px] text-gray-400 font-normal">Hiện tại đơn</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('exercises')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold flex items-center justify-between cursor-pointer ${
              activeTab === 'exercises'
                ? 'bg-white shadow-sm border border-pink-100 text-pink-600'
                : 'hover:bg-white/60 text-gray-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-2 h-2 rounded-full ${
                  activeTab === 'exercises' ? 'bg-pink-500 animate-pulse' : 'border border-gray-300'
                }`}
              />
              <span>III. Exercises</span>
            </div>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'exercises'
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {answeredCount}/{totalQuestions}
            </span>
          </button>

          {/* Unit Card at Bottom of Sidebar */}
          <div className="mt-auto pt-6">
            <div className="p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-400 rounded-2xl text-white shadow-lg shadow-pink-200/50">
              <p className="text-xs font-medium opacity-90">Current Unit</p>
              <p className="text-lg font-bold">My Hobbies</p>
              <p className="text-[10px] mt-2 opacity-80">Grade 7 - Unit 1 • Ms. Thúy</p>
            </div>
          </div>
        </aside>

        {/* Scrollable Content Container */}
        <section className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {activeTab === 'vocabulary' && <VocabularySection />}
            {activeTab === 'grammar' && <GrammarSection />}
            {activeTab === 'exercises' && (
              <ExercisesSection
                answers={answers}
                checked={checked}
                onAnswerChange={handleAnswerChange}
                onCheckQuestion={handleCheckQuestion}
                onResetQuestion={handleResetQuestion}
                onCheckBatch={handleCheckBatch}
                onResetBatch={handleResetBatch}
              />
            )}

            {/* Footer inside content area */}
            <footer className="border-t border-pink-100/80 pt-6 mt-12 text-center text-xs text-gray-400">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 font-semibold text-pink-900">
                  <BookCheck className="w-4 h-4 text-pink-500" />
                  <span>Learn with Ms. Thúy • Tiếng Anh 7 - Unit 1: My Hobbies</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500">
                  <span>Thiết kế dành tặng các em học sinh lớp 7</span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
                </div>
              </div>
            </footer>
          </div>
        </section>
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        studentName={studentName}
        answers={answers}
        checked={checked}
      />
    </div>
  );
}
