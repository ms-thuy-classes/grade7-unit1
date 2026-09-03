import React from 'react';
import { EXERCISES_LIST } from '../data/exercises';
import { isAnswerCorrect } from '../utils/checker';
import { Award, CheckCircle2, XCircle, Sparkles, X, Printer, Heart } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  answers: Record<number, string>;
  checked: Record<number, boolean>;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  studentName,
  answers,
  checked,
}) => {
  if (!isOpen) return null;

  const total = EXERCISES_LIST.length; // 60
  const answeredCount = Object.keys(checked).filter((k) => checked[Number(k)]).length;
  const correctCount = EXERCISES_LIST.filter(
    (item) => checked[item.id] && isAnswerCorrect(item, answers[item.id])
  ).length;

  const score10 = ((correctCount / total) * 10).toFixed(1);
  const scoreNum = parseFloat(score10);

  // Breakdown by categories
  const d1List = EXERCISES_LIST.filter((i) => i.category === 'DẠNG 1: TRẮC NGHIỆM');
  const d2List = EXERCISES_LIST.filter((i) => i.category === 'DẠNG 2: ĐIỀN VÀO CHỖ TRỐNG');
  const d3List = EXERCISES_LIST.filter((i) => i.category === 'DẠNG 3: SẮP XẾP CÂU');

  const d1Correct = d1List.filter((i) => checked[i.id] && isAnswerCorrect(i, answers[i.id])).length;
  const d2Correct = d2List.filter((i) => checked[i.id] && isAnswerCorrect(i, answers[i.id])).length;
  const d3Correct = d3List.filter((i) => checked[i.id] && isAnswerCorrect(i, answers[i.id])).length;

  // Evaluation title & comment from Ms. Thúy
  let rank = 'Cần Cố Gắng';
  let badgeColor = 'from-amber-400 to-orange-500';
  let teacherComment = 'Em hãy ôn tập thêm phần từ vựng và thì Hiện tại đơn, sau đó làm lại các câu chưa đúng nhé!';

  if (scoreNum >= 9.0) {
    rank = 'Xuất Sắc 🌟';
    badgeColor = 'from-pink-500 via-purple-500 to-indigo-500';
    teacherComment = 'Tuyệt vời lắm em! Em nắm rất chắc cả 56 từ vựng và toàn bộ ngữ pháp thì Hiện tại đơn của Unit 1. Cô Thúy rất tự hào về em!';
  } else if (scoreNum >= 8.0) {
    rank = 'Học Lực Giỏi 🎉';
    badgeColor = 'from-emerald-400 to-teal-600';
    teacherComment = 'Kết quả rất tốt! Em đã hiểu bài sâu sắc. Chỉ cần chú ý thêm một vài chi tiết nhỏ ở phần chia động từ là đạt điểm tuyệt đối nhé!';
  } else if (scoreNum >= 6.5) {
    rank = 'Học Lực Khá ✨';
    badgeColor = 'from-sky-400 to-blue-600';
    teacherComment = 'Khá tốt! Em đã nắm được phần lớn kiến thức. Hãy xem lại phần giải thích chi tiết của các câu làm sai để tiến bộ hơn nhé!';
  } else if (scoreNum >= 5.0) {
    rank = 'Trung Bình Khá 💫';
    badgeColor = 'from-amber-400 to-yellow-600';
    teacherComment = 'Em đã hoàn thành bài thi! Hãy dành thêm thời gian nghe audio từ vựng và làm lại bài tập để đạt điểm cao hơn nhé!';
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-pink-100 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Learn with Ms. Thúy • Phiếu Báo Kết Quả</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            Kết Quả Ôn Tập Unit 1
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Học sinh: <strong className="text-purple-700 text-sm">{studentName}</strong>
          </p>
        </div>

        {/* Big Score Card */}
        <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-pink-50 via-purple-50/60 to-rose-50 border border-pink-100 text-center relative shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-1">
            Điểm Quy Đổi Thang 10
          </div>
          <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
            {score10}
            <span className="text-2xl sm:text-3xl text-gray-400 font-normal"> / 10</span>
          </div>

          <div className="mt-3 inline-block">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${badgeColor} shadow-xs`}>
              {rank}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-semibold text-gray-600">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Đúng: {correctCount} / {total} câu</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>Sai: {answeredCount - correctCount} câu</span>
            </div>
          </div>
        </div>

        {/* Breakdown by Category */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Chi tiết kết quả từng dạng:
          </h4>

          <div className="p-3 bg-pink-50/30 rounded-2xl border border-pink-100/70 flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">Dạng 1: Trắc nghiệm (20 câu)</span>
            <span className="font-mono font-bold text-pink-600">
              {d1Correct} / 20 ({((d1Correct / 20) * 10).toFixed(1)} đ)
            </span>
          </div>

          <div className="p-3 bg-purple-50/30 rounded-2xl border border-purple-100/70 flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">Dạng 2: Điền vào chỗ trống (20 câu)</span>
            <span className="font-mono font-bold text-purple-600">
              {d2Correct} / 20 ({((d2Correct / 20) * 10).toFixed(1)} đ)
            </span>
          </div>

          <div className="p-3 bg-pink-50/30 rounded-2xl border border-pink-100/70 flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">Dạng 3: Sắp xếp câu (20 câu)</span>
            <span className="font-mono font-bold text-rose-600">
              {d3Correct} / 20 ({((d3Correct / 20) * 10).toFixed(1)} đ)
            </span>
          </div>
        </div>

        {/* Teacher Comment */}
        <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-100 text-xs sm:text-sm space-y-1 mb-6">
          <div className="font-bold text-rose-800 flex items-center gap-1">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
            <span>Lời phê của Cô Thúy:</span>
          </div>
          <p className="text-gray-700 italic leading-relaxed">
            "{teacherComment}"
          </p>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2.5 px-4 rounded-xl border border-pink-100 text-gray-700 font-semibold text-xs hover:bg-pink-50/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In phiếu điểm</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs hover:opacity-95 transition-opacity shadow-xs cursor-pointer"
          >
            Tiếp tục luyện tập
          </button>
        </div>
      </div>
    </div>
  );
};
