import React from 'react';
import {
  PRESENT_SIMPLE_USAGES,
  VERB_FORMS,
  SPELLING_RULES,
  PRONUNCIATION_RULES,
  SIGNALS,
  UNIT1_HOBBY_STRUCTURES,
} from '../data/grammar';
import { playAudioWord } from '../utils/speech';
import { BookOpen, Sparkles, Volume2, CheckCircle2, Lightbulb, Flame } from 'lucide-react';

export const GrammarSection: React.FC = () => {
  const handlePlay = (text: string) => {
    playAudioWord(text);
  };

  return (
    <div className="space-y-8">
      {/* Grammar Hero Header */}
      <div className="bg-gradient-to-r from-purple-100/70 via-pink-100/60 to-rose-100/60 p-6 sm:p-7 rounded-3xl border border-white/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-purple-700 text-xs font-bold shadow-xs mb-3">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span>Ngữ Pháp Trọng Tâm • Lớp 7 Unit 1</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
            Thì Hiện Tại Đơn (Present Simple Tense)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
            Thì Hiện tại đơn là chủ điểm ngữ pháp cốt lõi của Unit 1. Dưới đây là hệ thống lý thuyết chuẩn, 
            kèm ví dụ song ngữ sinh động và bí quyết ghi nhớ siêu tốc của Cô Thúy!
          </p>
        </div>
      </div>

      {/* 1. CÁCH DÙNG (USAGES) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100/80 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-sm">
            I
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-800">
            1. Các Cách Dùng Của Thì Hiện Tại Đơn
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESENT_SIMPLE_USAGES.map((u, idx) => (
            <div
              key={idx}
              className="bg-purple-50/40 hover:bg-purple-50/80 p-4 sm:p-5 rounded-2xl border border-purple-100/80 hover:border-purple-200 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm sm:text-base text-purple-900 group-hover:text-pink-600 transition-colors">
                  {u.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {u.usage}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-100/60 bg-white/80 p-3 rounded-xl">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-purple-600 uppercase">Ví dụ:</span>
                  <button
                    type="button"
                    onClick={() => handlePlay(u.exampleEn)}
                    className="text-gray-400 hover:text-pink-600 flex items-center gap-1 text-[11px] cursor-pointer"
                    title="Nghe ví dụ này"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5">
                  {u.exampleEn}
                </div>
                <div className="text-xs text-gray-500 italic">
                  ({u.exampleVi})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CÔNG THỨC (FORMULAS) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100/80 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
            II
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-800">
            2. Công Thức (Formulas)
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {VERB_FORMS.map((vf, index) => (
            <div key={index} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-base text-gray-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>{vf.type}</span>
                </h4>
              </div>

              {/* Khẳng định */}
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">Khẳng định (+)</span>
                  <span className="text-xs font-mono font-bold text-emerald-700">{vf.affirmative}</span>
                </div>
                <div className="text-xs text-gray-600 font-mono whitespace-pre-line pt-1">
                  {vf.affirmativeEg}
                </div>
              </div>

              {/* Phủ định */}
              <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-800">Phủ định (-)</span>
                  <span className="text-xs font-mono font-bold text-rose-700">{vf.negative}</span>
                </div>
                <div className="text-xs text-gray-600 font-mono whitespace-pre-line pt-1">
                  {vf.negativeEg}
                </div>
              </div>

              {/* Nghi vấn */}
              <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-800">Nghi vấn (?)</span>
                  <span className="text-xs font-mono font-bold text-sky-700">{vf.interrogative}</span>
                </div>
                <div className="text-xs text-gray-600 font-mono whitespace-pre-line pt-1">
                  {vf.interrogativeEg}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. QUY TẮC THÊM S / ES & PHÁT ÂM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spelling Rules */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
              III
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-800">
                Quy Tắc Thêm "-s / -es"
              </h3>
              <p className="text-xs text-gray-400">Áp dụng khi chủ ngữ là: He / She / It / Danh từ số ít</p>
            </div>
          </div>

          <div className="space-y-3">
            {SPELLING_RULES.map((r, i) => (
              <div key={i} className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100 text-xs sm:text-sm">
                <div className="font-bold text-gray-800">{r.title}</div>
                <div className="text-purple-700 font-medium mt-0.5">{r.rule}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {r.examples.map((eg, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-white rounded-md text-xs font-mono text-gray-700 border border-gray-200">
                      {eg}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pronunciation Rules */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              IV
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-800">
                Cách Phát Âm Đuôi "-s / -es"
              </h3>
              <p className="text-xs text-gray-400">Quy tắc chuẩn ngữ âm tiếng Anh</p>
            </div>
          </div>

          <div className="space-y-3">
            {PRONUNCIATION_RULES.map((p, i) => (
              <div key={i} className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100 text-xs sm:text-sm">
                <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>{p.title}</span>
                </div>
                <div className="text-gray-600 font-medium mt-0.5 text-xs">{p.rule}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.examples.map((eg, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePlay(eg.split(' ')[0])}
                      className="px-2 py-0.5 bg-white hover:bg-pink-50 rounded-md text-xs font-mono text-gray-700 border border-gray-200 flex items-center gap-1 group transition-colors cursor-pointer"
                      title="Bấm để nghe phát âm từ này"
                    >
                      <span>{eg}</span>
                      <Volume2 className="w-3 h-3 text-gray-400 group-hover:text-pink-600" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. DẤU HIỆU NHẬN BIẾT & CẤU TRÚC SỞ THÍCH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signals */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            <h3 className="text-base sm:text-lg font-extrabold text-gray-800">
              Dấu Hiệu Nhận Biết Thì Hiện Tại Đơn
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            {SIGNALS.map((s, i) => (
              <div key={i} className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                <div className="font-bold text-amber-900">{s.label}</div>
                <div className="text-gray-700 mt-1 leading-relaxed">{s.list}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobby Structures */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
            <Flame className="w-6 h-6 text-rose-500" />
            <h3 className="text-base sm:text-lg font-extrabold text-gray-800">
              Cấu Trúc Sở Thích Thường Gặp (Unit 1)
            </h3>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm">
            {UNIT1_HOBBY_STRUCTURES.map((st, i) => (
              <div key={i} className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-rose-900 font-mono">{st.structure}</span>
                  <span className="text-gray-500 text-xs font-semibold">{st.meaning}</span>
                </div>
                <div className="text-gray-700 italic text-xs mt-1">
                  Ví dụ: {st.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
