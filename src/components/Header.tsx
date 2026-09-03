import React, { useState } from 'react';
import { BookOpen, User, RotateCcw, Award, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  studentName: string;
  onStudentNameChange: (name: string) => void;
  correctCount: number;
  totalQuestions: number;
  answeredCount: number;
  onOpenReport: () => void;
  onResetAll: () => void;
  activeTab: 'vocabulary' | 'grammar' | 'exercises';
  onTabChange: (tab: 'vocabulary' | 'grammar' | 'exercises') => void;
}

export const Header: React.FC<HeaderProps> = ({
  studentName,
  onStudentNameChange,
  correctCount,
  totalQuestions,
  answeredCount,
  onOpenReport,
  onResetAll,
  activeTab,
  onTabChange,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);

  const scoreOnScale10 = ((correctCount / totalQuestions) * 10).toFixed(1);
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onStudentNameChange(tempName.trim());
    }
    setIsEditingName(false);
  };

  // Dynamic grade color based on score
  const scoreNum = parseFloat(scoreOnScale10);
  const gradeBadgeStyle =
    scoreNum >= 8.0
      ? 'bg-green-100 text-green-700 border-green-200'
      : scoreNum >= 5.0
      ? 'bg-amber-100 text-amber-700 border-amber-200'
      : 'bg-pink-100 text-pink-700 border-pink-200';

  return (
    <header className="flex-none bg-white/80 backdrop-blur-md border-b border-pink-100 px-4 sm:px-8 shadow-sm sticky top-0 z-50 transition-all">
      <div className="h-16 flex items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-purple-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-200 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 italic leading-tight">
              Learn with Ms. Thúy
            </h1>
            <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium hidden sm:block">
              Tiếng Anh 7 • Unit 1: My Hobbies
            </p>
          </div>
        </div>

        {/* Status Capsule matching Sleek Interface */}
        <div className="flex items-center gap-3 sm:gap-6 bg-white/60 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-pink-100 shadow-xs">
          {/* Student */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold hidden sm:inline">
              Student
            </span>
            {isEditingName ? (
              <form onSubmit={handleNameSubmit} className="flex items-center gap-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleNameSubmit}
                  autoFocus
                  className="text-xs font-semibold text-gray-800 bg-white px-2 py-0.5 rounded border border-pink-300 w-24 sm:w-32 focus:outline-none"
                />
                <button type="submit" className="text-[10px] text-pink-600 font-bold">
                  OK
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-pink-600 transition-colors flex items-center gap-1 group"
                title="Bấm để đổi tên học sinh"
              >
                <span className="max-w-[80px] sm:max-w-none truncate">{studentName}</span>
                <span className="text-[10px] text-gray-400 group-hover:text-pink-500">✏️</span>
              </button>
            )}
          </div>

          <div className="h-4 w-[1px] bg-pink-100 hidden sm:block" />

          {/* Progress */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold hidden sm:inline">
              Progress
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
              {answeredCount} / {totalQuestions}
            </span>
          </div>

          <div className="h-4 w-[1px] bg-pink-100" />

          {/* Grade (Click to view full report modal) */}
          <button
            type="button"
            onClick={onOpenReport}
            className="flex items-center gap-1.5 group cursor-pointer"
            title="Bấm xem Phiếu Báo Điểm & Nhận Xét"
          >
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold hidden md:inline">
              Grade
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs sm:text-sm font-bold transition-transform group-hover:scale-105 border ${gradeBadgeStyle}`}
            >
              {scoreOnScale10} / 10.0
            </span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={onResetAll}
            className="p-1 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
            title="Làm lại từ đầu toàn bộ 60 câu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Tab Navigation (visible only on screens < md) */}
      <div className="flex md:hidden items-center justify-between border-t border-pink-50 py-2 gap-1 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => onTabChange('vocabulary')}
          className={`flex-1 py-1.5 px-2 rounded-xl font-semibold text-center transition-all ${
            activeTab === 'vocabulary'
              ? 'bg-white text-pink-600 shadow-xs border border-pink-100'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          I. Từ vựng
        </button>
        <button
          type="button"
          onClick={() => onTabChange('grammar')}
          className={`flex-1 py-1.5 px-2 rounded-xl font-semibold text-center transition-all ${
            activeTab === 'grammar'
              ? 'bg-white text-pink-600 shadow-xs border border-pink-100'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          II. Ngữ pháp
        </button>
        <button
          type="button"
          onClick={() => onTabChange('exercises')}
          className={`flex-1 py-1.5 px-2 rounded-xl font-semibold text-center transition-all ${
            activeTab === 'exercises'
              ? 'bg-white text-pink-600 shadow-xs border border-pink-100'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          III. Bài tập ({totalQuestions})
        </button>
      </div>

      {/* Micro progress line */}
      <div className="w-full bg-pink-100/50 h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-green-500 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};

