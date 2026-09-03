import React, { useState } from 'react';
import { EXERCISES_LIST } from '../data/exercises';
import { ExerciseCategory, ExerciseItem } from '../types';
import { isAnswerCorrect } from '../utils/checker';
import { playAudioWord } from '../utils/speech';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Volume2,
  ListFilter,
  CheckCheck,
  RefreshCw,
  Send,
  Lightbulb,
} from 'lucide-react';

interface ExercisesSectionProps {
  answers: Record<number, string>;
  checked: Record<number, boolean>;
  onAnswerChange: (id: number, answer: string) => void;
  onCheckQuestion: (id: number) => void;
  onResetQuestion: (id: number) => void;
  onCheckBatch: (ids: number[]) => void;
  onResetBatch: (ids: number[]) => void;
}

const CATEGORIES: { label: string; value: ExerciseCategory | 'ALL'; range: string; count: number }[] = [
  { label: 'Tất cả bài tập', value: 'ALL', range: '1 - 60', count: 60 },
  { label: 'Dạng 1: Trắc nghiệm', value: 'DẠNG 1: TRẮC NGHIỆM', range: '1 - 20', count: 20 },
  { label: 'Dạng 2: Điền vào chỗ trống', value: 'DẠNG 2: ĐIỀN VÀO CHỖ TRỐNG', range: '21 - 40', count: 20 },
  { label: 'Dạng 3: Sắp xếp câu', value: 'DẠNG 3: SẮP XẾP CÂU', range: '41 - 60', count: 20 },
];

export const ExercisesSection: React.FC<ExercisesSectionProps> = ({
  answers,
  checked,
  onAnswerChange,
  onCheckQuestion,
  onResetQuestion,
  onCheckBatch,
  onResetBatch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNANSWERED' | 'CORRECT' | 'INCORRECT'>('ALL');
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

  // Filter list
  const currentCategoryList = EXERCISES_LIST.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  const filteredList = currentCategoryList.filter((item) => {
    const isChecked = !!checked[item.id];
    const isCorrect = isChecked && isAnswerCorrect(item, answers[item.id]);

    if (statusFilter === 'UNANSWERED') return !isChecked;
    if (statusFilter === 'CORRECT') return isChecked && isCorrect;
    if (statusFilter === 'INCORRECT') return isChecked && !isCorrect;
    return true;
  });

  // Calculate category stats
  const catIds = currentCategoryList.map((i) => i.id);
  const catCheckedCount = catIds.filter((id) => checked[id]).length;
  const catCorrectCount = catIds.filter((id) => checked[id] && isAnswerCorrect(EXERCISES_LIST[id - 1], answers[id])).length;

  const handleCheckSingle = (id: number) => {
    onCheckQuestion(id);
    const item = EXERCISES_LIST.find((i) => i.id === id);
    if (item && isAnswerCorrect(item, answers[id])) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#f472b6', '#c084fc', '#38bdf8', '#4ade80'],
      });
    }
  };

  const handleCheckAllCurrent = () => {
    onCheckBatch(catIds);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handleResetAllCurrent = () => {
    if (window.confirm('Em có chắc chắn muốn làm lại tất cả các câu trong dạng bài này?')) {
      onResetBatch(catIds);
    }
  };

  // Word Bank for Part B (Questions 31 - 40)
  const partBWordBank = [
    'outdoor activity',
    'valuable lessons',
    'insects',
    'share',
    'common',
    'spend time',
    'make it yourself',
    'join in',
    'duty',
    'patient',
  ];

  return (
    <div className="space-y-6">
      {/* Category Hero / Header */}
      <div className="bg-gradient-to-r from-sky-100/70 via-purple-100/60 to-pink-100/60 p-6 sm:p-7 rounded-3xl border border-white/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-sky-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-sky-700 text-xs font-bold shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Bộ 60 Câu Bài Tập Toàn Diện • Chuẩn Trình Độ A2 Tiếng Anh 7</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
            Luyện Tập & Kiểm Tra Kiến Thức
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
            Mỗi câu bài tập đều có <strong className="text-pink-600 font-semibold">nút Kiểm tra riêng</strong> và{' '}
            <strong className="text-rose-600 font-semibold">nút Làm lại riêng</strong>. Điểm số của em sẽ được cập nhật
            tức thì lên thanh ghim phía trên theo thang điểm 10. Em hãy tự tin làm bài nhé!
          </p>

          {/* Category Navigation Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm scale-[1.02]'
                      : 'bg-white/90 text-gray-700 hover:bg-white hover:text-pink-600 border border-pink-100/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {cat.count} câu
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Bar: Batch actions & Status filters */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-pink-100/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs font-semibold custom-scrollbar">
          <span className="text-gray-400 mr-1 flex items-center gap-1">
            <ListFilter className="w-3.5 h-3.5" />
            Lọc:
          </span>
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              statusFilter === 'ALL'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tất cả ({currentCategoryList.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('UNANSWERED')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              statusFilter === 'UNANSWERED'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Chưa làm ({currentCategoryList.length - catCheckedCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('CORRECT')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              statusFilter === 'CORRECT'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Đúng ({catCorrectCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('INCORRECT')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              statusFilter === 'INCORRECT'
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Sai ({catCheckedCount - catCorrectCount})
          </button>
        </div>

        {/* Batch Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleCheckAllCurrent}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Kiểm tra cả phần này</span>
          </button>
          <button
            type="button"
            onClick={handleResetAllCurrent}
            className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại phần này</span>
          </button>
        </div>
      </div>

      {/* Special Word Bank Card for Dạng 2 Part B */}
      {(selectedCategory === 'ALL' || selectedCategory === 'DẠNG 2: ĐIỀN VÀO CHỖ TRỐNG') && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50/70 p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wide">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Hộp từ vựng gợi ý (Dành cho câu 31 - 40):
            </span>
            <span className="text-[11px] text-amber-700 italic">
              Bấm vào từ để điền nhanh vào câu đang chọn
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {partBWordBank.map((word, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (activeQuestionId && activeQuestionId >= 31 && activeQuestionId <= 40) {
                    onAnswerChange(activeQuestionId, word);
                  }
                }}
                className="px-3 py-1 rounded-xl bg-white border border-amber-300 text-amber-950 font-bold text-xs hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all shadow-xs cursor-pointer active:scale-95"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* EXERCISES LIST */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-3xl border border-pink-100 text-gray-400">
            Không có câu hỏi nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredList.map((item) => {
            const currentAns = answers[item.id] || '';
            const isChecked = !!checked[item.id];
            const isCorrect = isChecked && isAnswerCorrect(item, currentAns);

            return (
              <div
                key={item.id}
                onClick={() => setActiveQuestionId(item.id)}
                className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 relative ${
                  isChecked
                    ? isCorrect
                      ? 'border-emerald-300/80 bg-emerald-50/15 shadow-xs'
                      : 'border-rose-300/80 bg-rose-50/15 shadow-xs'
                    : activeQuestionId === item.id
                    ? 'border-pink-300 shadow-sm ring-2 ring-pink-100'
                    : 'border-pink-100/80 hover:border-pink-200 hover:shadow-xs'
                }`}
              >
                {/* Question Header Line */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-xs">
                      {item.id}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {item.category} {item.subcategory ? `• ${item.subcategory}` : ''}
                    </span>
                  </div>

                  {/* Audio Listen & Check Status Pill */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => playAudioWord(item.prompt)}
                      className="p-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer"
                      title="Nghe đọc câu hỏi này"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {isChecked && (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>ĐÚNG +1</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>CHƯA ĐÚNG</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Prompt Text */}
                <div className="text-base sm:text-lg font-bold text-gray-900 mb-4 leading-snug">
                  {item.prompt}
                </div>

                {/* INTERACTIVE INPUTS BY QUESTION TYPE */}

                {/* 1. MCQ OPTIONS (1 - 20) */}
                {item.type === 'mcq' && item.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                    {item.options.map((option, optIdx) => {
                      const optLetter = option.charAt(0).toUpperCase();
                      const isSelected = currentAns.toUpperCase() === optLetter;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isChecked}
                          onClick={() => onAnswerChange(item.id, optLetter)}
                          className={`p-3.5 rounded-2xl border text-left font-medium text-sm transition-all flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-pink-50 border-pink-300 text-pink-950 font-bold shadow-xs'
                              : 'bg-gray-50/70 border-gray-200/70 text-gray-800 hover:bg-white hover:border-pink-200'
                          } ${isChecked ? 'cursor-default' : ''}`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                              isSelected
                                ? 'bg-pink-600 text-white'
                                : 'bg-white text-gray-500 border border-gray-300'
                            }`}
                          >
                            {optLetter}
                          </div>
                          <span>{option.substring(2).trim()}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. FILL IN THE BLANK (21 - 40) */}
                {(item.type === 'fill_blank_verb' || item.type === 'fill_blank_word') && (
                  <div className="space-y-3 mb-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={currentAns}
                          disabled={isChecked}
                          onChange={(e) => onAnswerChange(item.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCheckSingle(item.id);
                          }}
                          placeholder={
                            item.type === 'fill_blank_verb'
                              ? 'Nhập dạng đúng của động từ (ví dụ: leaves, doesn\'t like, Do ... go)...'
                              : 'Điền từ thích hợp từ hộp gợi ý...'
                          }
                          className={`w-full px-4 py-2.5 text-sm sm:text-base font-semibold bg-gray-50/70 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all ${
                            isChecked
                              ? isCorrect
                                ? 'border-emerald-400 bg-emerald-50/40 text-emerald-950'
                                : 'border-rose-400 bg-rose-50/40 text-rose-950'
                              : 'border-pink-100 text-gray-800'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. REORDER SENTENCE (41 - 60) */}
                {item.type === 'reorder' && (
                  <div className="space-y-3 mb-4">
                    {/* Word Chips Click-to-assemble */}
                    {item.wordBank && (
                      <div className="bg-gray-50/70 p-3 rounded-2xl border border-pink-100/70 space-y-2">
                        <div className="text-xs font-semibold text-gray-500 flex items-center justify-between">
                          <span>Các từ gợi ý (Bấm vào từ để ghép câu):</span>
                          {currentAns && !isChecked && (
                            <button
                              type="button"
                              onClick={() => onAnswerChange(item.id, '')}
                              className="text-[11px] text-rose-600 hover:underline font-semibold cursor-pointer"
                            >
                              Xóa để xếp lại
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.wordBank.map((word, wIdx) => (
                            <button
                              key={wIdx}
                              type="button"
                              disabled={isChecked}
                              onClick={() => {
                                const newSentence = currentAns
                                  ? `${currentAns.replace(/[.?!]$/, '').trim()} ${word}`.trim()
                                  : word;
                                onAnswerChange(item.id, newSentence);
                              }}
                              className="px-3 py-1 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300 active:scale-95 transition-all shadow-2xs cursor-pointer"
                            >
                              {word}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Final Sentence Input Field */}
                    <div>
                      <input
                        type="text"
                        value={currentAns}
                        disabled={isChecked}
                        onChange={(e) => onAnswerChange(item.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCheckSingle(item.id);
                        }}
                        placeholder="Câu hoàn chỉnh của em..."
                        className={`w-full px-4 py-2.5 text-sm sm:text-base font-semibold bg-gray-50/70 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all ${
                          isChecked
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50/40 text-emerald-950'
                              : 'border-rose-400 bg-rose-50/40 text-rose-950'
                            : 'border-pink-100 text-gray-800'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* INDEPENDENT QUESTION ACTIONS: CHECK & RESET */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-pink-50">
                  <div className="flex items-center gap-2">
                    {/* Check button */}
                    <button
                      type="button"
                      onClick={() => handleCheckSingle(item.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>{isChecked ? 'Kiểm tra lại' : 'Kiểm tra'}</span>
                    </button>

                    {/* Reset button */}
                    <button
                      type="button"
                      onClick={() => onResetQuestion(item.id)}
                      className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Làm lại riêng câu này"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Làm lại câu này</span>
                    </button>
                  </div>

                  {/* Audio helper for answer */}
                  {isChecked && (
                    <button
                      type="button"
                      onClick={() => playAudioWord(item.correctAnswer)}
                      className="text-xs font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe đáp án chuẩn</span>
                    </button>
                  )}
                </div>

                {/* EXPLANATION & CORRECT ANSWER REVEAL */}
                {isChecked && (
                  <div
                    className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                      isCorrect
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                        : 'bg-rose-50/80 border-rose-200 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Chính xác! Em làm rất tốt 🎉</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Chưa chính xác, em xem giải thích bên dưới nhé!</span>
                          </>
                        )}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="bg-white/80 p-2.5 rounded-xl border border-rose-200/80">
                        <span className="font-bold text-rose-900">Đáp án chuẩn: </span>
                        <span className="font-extrabold text-gray-900 font-mono">
                          {item.correctAnswer}
                        </span>
                      </div>
                    )}

                    <div className="text-gray-700 leading-relaxed pt-1">
                      <span className="font-bold text-pink-800">💡 Giải thích chi tiết: </span>
                      {item.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
