import React, { useState } from 'react';
import { 
    Plus, 
    Trash2, 
    Save, 
    ChevronLeft, 
    GripVertical, 
    Calendar as CalendarIcon,
    Type,
    AlignLeft,
    LayoutList
} from 'lucide-react';
import { format } from 'date-fns';

const TambahKuisioner = () => {
    // State untuk Data Kuesioner (Box Kiri)
    const [formData, setFormData] = useState({
        judul: '',
        jenis: 'bekerja',
        deskripsi: '',
        tanggalMulai: '',
        tanggalSelesai: ''
    });

    // State untuk Pertanyaan (Box Kanan)
    const [questions, setQuestions] = useState([
        { id: 1, text: '', options: ['Opsi 1'] }
    ]);

    // Handlers untuk Pertanyaan
    const addQuestion = () => {
        const newId = questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;
        setQuestions([...questions, { id: newId, text: '', options: ['Opsi 1'] }]);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const updateQuestionText = (id, text) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
    };

    const addOption = (qId) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                return { ...q, options: [...q.options, `Opsi ${q.options.length + 1}`] };
            }
            return q;
        }));
    };

    const updateOptionText = (qId, optIndex, text) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOptions = [...q.options];
                newOptions[optIndex] = text;
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    const removeOption = (qId, optIndex) => {
        setQuestions(questions.map(q => {
            if (q.id === qId && q.options.length > 1) {
                return { ...q, options: q.options.filter((_, i) => i !== optIndex) };
            }
            return q;
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-primary">Buat Kuesioner Baru</h1>
                            <p className="text-sm text-slate-500">Lengkapi detail dan buat daftar pertanyaan</p>
                        </div>
                    </div>
                    <button className="bg-primary hover:bg-secondary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95">
                        <Save size={18} /> Simpan Kuesioner
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT BOX: Konfigurasi Kuesioner (Sesuai Sketsa) */}
                    <div className="lg:col-span-4 space-y-6 sticky top-8">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                                <LayoutList size={20} className="text-secondary" />
                                Data Kuesioner
                            </h2>
                            
                            <div className="space-y-5">
                                {/* Judul */}
                                <div>
                                    <label className="block text-[11px] font-black uppercase text-slate-400 mb-2 tracking-wider">Judul Kuesioner</label>
                                    <div className="relative">
                                        <Type className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <input 
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                            placeholder="Contoh: Tracer Study 2026"
                                            onChange={(e) => setFormData({...formData, judul: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Jenis Kuesioner */}
                                <div>
                                    <label className="block text-[11px] font-black uppercase text-slate-400 mb-2 tracking-wider">Target Karier</label>
                                    <select 
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm appearance-none cursor-pointer"
                                        onChange={(e) => setFormData({...formData, jenis: e.target.value})}
                                    >
                                        <option value="bekerja">Bekerja</option>
                                        <option value="kuliah">Kuliah</option>
                                        <option value="wirausaha">Wirausaha</option>
                                        <option value="pencari kerja">Pencari Kerja</option>
                                    </select>
                                </div>

                                {/* Tanggal Mulai & Selesai */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase text-slate-400 mb-2 tracking-wider">Tgl Mulai</label>
                                        <input 
                                            type="date"
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-primary transition-all"
                                            onChange={(e) => setFormData({...formData, tanggalMulai: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black uppercase text-slate-400 mb-2 tracking-wider">Tgl Selesai</label>
                                        <input 
                                            type="date"
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-primary transition-all"
                                            onChange={(e) => setFormData({...formData, tanggalSelesai: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <div>
                                    <label className="block text-[11px] font-black uppercase text-slate-400 mb-2 tracking-wider">Deskripsi Singkat</label>
                                    <div className="relative">
                                        <AlignLeft className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <textarea 
                                            rows="4"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                                            placeholder="Berikan instruksi atau tujuan kuesioner..."
                                            onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT BOX: Daftar Pertanyaan (Google Form Style) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[600px]">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                <h2 className="text-lg font-bold text-primary">Daftar Pertanyaan Pilihan Ganda</h2>
                                <button 
                                    onClick={addQuestion}
                                    className="text-xs bg-secondary/10 text-secondary hover:bg-secondary hover:text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
                                >
                                    <Plus size={16} /> Tambah Pertanyaan
                                </button>
                            </div>

                            <div className="space-y-8">
                                {questions.map((q, qIndex) => (
                                    <div key={q.id} className="group relative bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-200 p-6 rounded-2xl transition-all duration-300">
                                        {/* Drag Handle (Visual Only) */}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 p-1 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <GripVertical size={20} />
                                        </div>

                                        <div className="flex gap-4">
                                            <span className="flex-none w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                                {qIndex + 1}
                                            </span>
                                            <div className="flex-grow space-y-4">
                                                {/* Input Pertanyaan */}
                                                <div className="flex items-start gap-4">
                                                    <input 
                                                        type="text"
                                                        value={q.text}
                                                        onChange={(e) => updateQuestionText(q.id, e.target.value)}
                                                        placeholder="Ketik pertanyaan di sini..."
                                                        className="w-full bg-transparent border-b-2 border-slate-200 focus:border-secondary outline-none py-2 font-semibold text-slate-700 transition-all"
                                                    />
                                                    <button 
                                                        onClick={() => removeQuestion(q.id)}
                                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>

                                                {/* Pilihan Jawaban */}
                                                <div className="space-y-3 ml-2">
                                                    {q.options.map((opt, optIndex) => (
                                                        <div key={optIndex} className="flex items-center gap-3">
                                                            <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-none"></div>
                                                            <input 
                                                                type="text"
                                                                value={opt}
                                                                onChange={(e) => updateOptionText(q.id, optIndex, e.target.value)}
                                                                className="flex-grow bg-transparent border-b border-transparent focus:border-slate-200 outline-none text-sm text-slate-600 py-1"
                                                            />
                                                            {q.options.length > 1 && (
                                                                <button 
                                                                    onClick={() => removeOption(q.id, optIndex)}
                                                                    className="text-slate-300 hover:text-slate-500 transition-colors px-1"
                                                                >
                                                                    ×
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <button 
                                                        onClick={() => addOption(q.id)}
                                                        className="text-xs text-secondary font-bold flex items-center gap-1.5 ml-7 pt-2 hover:underline active:opacity-70"
                                                    >
                                                        <Plus size={14} /> Tambah Opsi
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {questions.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-100 rounded-3xl">
                                        <LayoutList size={48} className="mb-4 opacity-20" />
                                        <p className="text-sm font-medium">Belum ada pertanyaan ditambahkan.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TambahKuisioner;