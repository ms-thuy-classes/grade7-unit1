import React, { useState } from 'react';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { VocabularyItem, VocabularySection as SectionType } from '../types';
import { playAudioWord } from '../utils/speech';
import { Volume2, VolumeX, Search, Sparkles, LayoutGrid, List, Layers, ArrowLeft, ArrowRight, RotateCw, Check } from 'lucide-react';

const SECTIONS: { label: string; value: SectionType | 'ALL'; count: number }[] = [
  { label: 'Tất cả từ vựng', value: 'ALL', count: VOCABULARY_LIST.length },
  { label: 'Getting Started', value: 'GETTING STARTED', count: VOCABULARY_LIST.filter(v => v.section === 'GETTING STARTED').length },
  { label: 'A Closer Look 1', value: 'A CLOSER LOOK 1', count: VOCABULARY_LIST.filter(v => v.section === 'A CLOSER LOOK 1').length },
  { label: 'A Closer Look 2', value: 'A CLOSER LOOK 2', count: VOCABULARY_LIST.filter(v => v.section === 'A CLOSER LOOK 2').length },
  { label: 'Communication', value: 'COMMUNICATION', count: VOCABULARY_LIST.filter(v => v.section === 'COMMUNICATION').length },
  { label: 'Skills 1', value: 'SKILLS 1', count: VOCABULARY_LIST.filter(v => v.section === 'SKILLS 1').length },
  { label: 'Skills 2', value: 'SKILLS 2', count: VOCABULARY_LIST.filter(v => v.section === 'SKILLS 2').length },
  { label: 'Looking Back', value: 'LOOKING BACK', count: VOCABULARY_LIST.filter(v => v.section === 'LOOKING BACK').length },
  { label: 'Project', value: 'PROJECT', count: VOCABULARY_LIST.filter(v => v.section === 'PROJECT').length },
];

export const VocabularySection: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<SectionType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.88);
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'flashcard'>('grid');

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());

  // Filtered vocabulary list
  const filteredList = VOCABULARY_LIST.filter((item) => {
    const matchesSection = selectedSection === 'ALL' || item.section === selectedSection;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.word.toLowerCase().includes(query) ||
      item.meaning.toLowerCase().includes(query) ||
      item.phonetic.toLowerCase().includes(query);
    return matchesSection && matchesSearch;
  });

  const handlePlayWord = (item: VocabularyItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveAudioId(item.id);
    playAudioWord(item.word, {
      rate: speechRate,
      onEnd: () => setActiveAudioId(null),
      onError: () => setActiveAudioId(null),
    });
  };

  const handlePlaySentence = (sentence: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playAudioWord(sentence, {
      rate: speechRate,
    });
  };

  const toggleMastered = (id: number) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getTypeBadgeColor = (type: string) => {
    if (type.includes('adj') || type.includes('(a)')) {
      return 'bg-pink-100/90 text-pink-700 border-pink-200';
    }
    if (type.includes('n') || type.includes('n.phr')) {
      return 'bg-sky-100/90 text-sky-700 border-sky-200';
    }
    if (type.includes('v') || type.includes('v.phr') || type.includes('phr.v')) {
      return 'bg-emerald-100/90 text-emerald-700 border-emerald-200';
    }
    return 'bg-purple-100/90 text-purple-700 border-purple-200';
  };

  return (
    <div className="space-y-6">
      {/* Intro Header Card */}
      <div className="bg-gradient-to-r from-pink-100/70 via-purple-100/60 to-rose-100/60 p-6 sm:p-7 rounded-3xl border border-white/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-pink-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-6 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-pink-700 text-xs font-bold shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>56 Từ Vựng Trọng Tâm • Grade 7 Unit 1: My Hobbies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
            Kho Từ Vựng Toàn Diện Kèm Audio Phát Âm
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
            Mỗi từ vựng đều có phiên âm quốc tế IPA, dịch nghĩa chi tiết, câu ví dụ song ngữ và{' '}
            <strong className="text-pink-600 font-semibold">nút audio phát âm tự nhiên</strong>. 
            Em hãy bấm vào biểu tượng chiếc loa để luyện nghe và phát âm theo nhé!
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Speed Selector */}
            <div className="inline-flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-xl border border-pink-100 text-xs text-gray-700 font-medium shadow-xs">
              <span>Tốc độ đọc:</span>
              <button
                type="button"
                onClick={() => setSpeechRate(0.75)}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  speechRate < 0.85 ? 'bg-pink-600 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Chậm (0.75x)
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(0.9)}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  speechRate >= 0.85 ? 'bg-pink-600 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Chuẩn (0.9x)
              </button>
            </div>

            {/* Mastered Counter */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold">
              <Check className="w-3.5 h-3.5" />
              <span>Đã thuộc: {masteredIds.size} / {VOCABULARY_LIST.length} từ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-pink-100/80 shadow-xs space-y-3.5">
        {/* Search & View Mode row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ vựng (tiếng Anh, tiếng Việt, phiên âm)..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50/70 border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all text-gray-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center bg-gray-100/80 p-1 rounded-xl gap-1 self-end sm:self-auto text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-pink-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Lưới thẻ</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-pink-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Danh sách</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('flashcard');
                setFlashcardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'flashcard' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcard</span>
            </button>
          </div>
        </div>

        {/* Section Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {SECTIONS.map((sec) => (
            <button
              key={sec.value}
              type="button"
              onClick={() => setSelectedSection(sec.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedSection === sec.value
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:text-pink-600 border border-gray-100 hover:border-pink-100'
              }`}
            >
              <span>{sec.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedSection === sec.value ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {sec.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcard' && (
        <div className="max-w-xl mx-auto py-4 space-y-4">
          {filteredList.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              Không tìm thấy từ vựng phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            (() => {
              const currentItem = filteredList[flashcardIndex] || filteredList[0];
              const isMastered = masteredIds.has(currentItem.id);

              return (
                <div className="space-y-4">
                  {/* Card Navigation and Counter */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-2">
                    <span>
                      Thẻ số {flashcardIndex + 1} / {filteredList.length}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      {currentItem.section}
                    </span>
                  </div>

                  {/* Interactive Flip Card */}
                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="relative min-h-[300px] sm:min-h-[320px] bg-gradient-to-br from-white via-pink-50/40 to-purple-50/40 rounded-3xl p-6 sm:p-8 border-2 border-pink-200/80 shadow-lg shadow-pink-100/50 flex flex-col justify-between cursor-pointer hover:border-pink-300 transition-all text-center select-none group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getTypeBadgeColor(currentItem.type)}`}>
                        {currentItem.type}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMastered(currentItem.id);
                        }}
                        className={`p-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                          isMastered
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-400 border-slate-200 hover:text-emerald-600 hover:border-emerald-300'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>{isMastered ? 'Đã thuộc' : 'Đánh dấu thuộc'}</span>
                      </button>
                    </div>

                    {/* Card Content (Front / Back) */}
                    <div className="my-auto py-4">
                      {!isFlipped ? (
                        <div className="space-y-3">
                          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                            {currentItem.word}
                          </h3>
                          <div className="text-base sm:text-lg font-medium text-purple-600 tracking-wide font-mono">
                            {currentItem.phonetic}
                          </div>

                          <div className="pt-3">
                            <button
                              type="button"
                              onClick={(e) => handlePlayWord(currentItem, e)}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                            >
                              <Volume2 className="w-5 h-5 animate-pulse" />
                              <span>Nghe phát âm chuẩn</span>
                            </button>
                          </div>
                          <p className="text-xs text-slate-400 mt-2">Bấm vào thẻ để xem nghĩa tiếng Việt & ví dụ</p>
                        </div>
                      ) : (
                        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                          <div>
                            <span className="text-xs text-purple-600 uppercase font-bold tracking-wider">Nghĩa của từ:</span>
                            <div className="text-2xl font-black text-slate-800 mt-1">
                              {currentItem.meaning}
                            </div>
                          </div>

                          <div className="bg-white/90 p-4 rounded-2xl border border-purple-100 text-left space-y-1.5 shadow-xs">
                            <div className="text-xs font-bold text-purple-700 flex items-center justify-between">
                              <span>Ví dụ:</span>
                              <button
                                type="button"
                                onClick={(e) => handlePlaySentence(currentItem.exampleEn, e)}
                                className="text-slate-400 hover:text-purple-600 flex items-center gap-1 text-[11px]"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>Nghe ví dụ</span>
                              </button>
                            </div>
                            <div className="text-sm font-semibold text-slate-800">
                              {currentItem.exampleEn}
                            </div>
                            <div className="text-xs text-slate-600 italic">
                              {currentItem.exampleVi}
                            </div>
                          </div>

                          {currentItem.related && (
                            <div className="text-xs text-slate-500 font-medium bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200/60 inline-block">
                              📌 {currentItem.related}
                            </div>
                          )}
                          <p className="text-xs text-slate-400">Bấm vào thẻ để lật lại từ vựng</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center text-xs text-slate-400 gap-1">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{isFlipped ? 'Mặt sau (Nghĩa & Ví dụ)' : 'Mặt trước (Từ & Phát âm)'}</span>
                    </div>
                  </div>

                  {/* Flashcard Bottom Controls */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      disabled={flashcardIndex === 0}
                      onClick={() => {
                        setFlashcardIndex((prev) => Math.max(0, prev - 1));
                        setIsFlipped(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Từ trước</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-bold text-xs hover:bg-purple-200 transition-colors"
                    >
                      Lật thẻ
                    </button>

                    <button
                      type="button"
                      disabled={flashcardIndex === filteredList.length - 1}
                      onClick={() => {
                        setFlashcardIndex((prev) => Math.min(filteredList.length - 1, prev + 1));
                        setIsFlipped(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                    >
                      <span>Từ tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* GRID CARD MODE */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredList.map((item) => {
            const isPlaying = activeAudioId === item.id;
            const isMastered = masteredIds.has(item.id);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 relative group flex flex-col justify-between ${
                  isMastered
                    ? 'border-emerald-200 bg-emerald-50/15 shadow-xs'
                    : 'border-pink-100/70 shadow-xs hover:border-pink-300 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div>
                  {/* Top Bar: Section & Word Type */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      #{item.id} • {item.section}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getTypeBadgeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>

                  {/* Word & Audio Button matching Sleek Interface */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-baseline flex-wrap gap-1.5">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                          {item.word}
                        </h3>
                        <span className="text-sm font-normal text-gray-400 italic font-serif">
                          {item.phonetic}
                        </span>
                      </div>
                      <div className="text-sm text-pink-600 font-medium mt-1">
                        {item.meaning}
                      </div>
                    </div>

                    {/* Audio Play Button */}
                    <button
                      type="button"
                      onClick={(e) => handlePlayWord(item, e)}
                      className={`w-9 h-9 rounded-full transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                        isPlaying
                          ? 'bg-pink-600 text-white scale-110 shadow-md shadow-pink-200'
                          : 'bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white hover:scale-105 active:scale-95'
                      }`}
                      title="Bấm để nghe phát âm to rõ tự nhiên"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                    </button>
                  </div>

                  {/* Sleek Example Quote styling */}
                  <div className="mt-3.5 pt-2 border-t border-pink-50">
                    <div className="mt-1 text-xs sm:text-sm text-gray-500 italic border-l-2 border-pink-200 pl-3 py-0.5 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-800 font-medium not-italic">
                          "{item.exampleEn}"
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handlePlaySentence(item.exampleEn, e)}
                          className="text-gray-400 hover:text-pink-600 flex items-center gap-1 text-[10px] not-italic shrink-0"
                          title="Nghe câu ví dụ"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-gray-400 text-xs">
                        ({item.exampleVi})
                      </div>
                    </div>
                  </div>

                  {item.related && (
                    <div className="mt-2.5 text-[11px] text-pink-900 bg-pink-50/60 px-2.5 py-1 rounded-xl border border-pink-100">
                      💡 {item.related}
                    </div>
                  )}
                </div>

                {/* Card footer: Mark mastered button */}
                <div className="mt-4 pt-2.5 border-t border-pink-50 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => toggleMastered(item.id)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                      isMastered
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50/50'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Đã thuộc từ này' : 'Chưa thuộc'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW MODE */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Từ vựng & Audio</th>
                  <th className="py-3 px-4">Phiên âm</th>
                  <th className="py-3 px-4">Loại từ</th>
                  <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                  <th className="py-3 px-4">Ví dụ & Dịch nghĩa</th>
                  <th className="py-3 px-4 text-center">Phần học</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-3 px-4 text-center text-slate-400 font-mono text-xs">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handlePlayWord(item, e)}
                          className="p-1.5 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <span>{item.word}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-purple-600">
                      {item.phonetic}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getTypeBadgeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {item.meaning}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">{item.exampleEn}</div>
                      <div className="text-slate-500 text-xs italic">{item.exampleVi}</div>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                        {item.section}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
