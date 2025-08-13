"use client";

import React, { useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

interface QuestionData {
  id: string;
  question: string;
  choices: string[];
  correctAnswer?: number;
}

export default function PDFEditor() {
  const [documentTitle, setDocumentTitle] = useState("Hasif's Mock Test Paper");
  const [subtitle, setSubtitle] = useState('Single Page — Editable PDF');
  const [isEditing, setIsEditing] = useState(true);
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: '1',
      question: 'What is the capital of France?',
      choices: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2
    },
    {
      id: '2', 
      question: 'Which planet is known as the Red Planet?',
      choices: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 1
    }
  ]);

  const printRef = useRef<HTMLDivElement>(null);

  const handleQuestionChange = (id: string, newQuestion: string) => {
    setQuestions(prev => 
      prev.map(q => q.id === id ? { ...q, question: newQuestion } : q)
    );
  };

  const handleChoiceChange = (questionId: string, choiceIndex: number, newChoice: string) => {
    setQuestions(prev =>
      prev.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              choices: q.choices.map((choice, index) => 
                index === choiceIndex ? newChoice : choice
              )
            }
          : q
      )
    );
  };

  const addQuestion = () => {
    const newQuestion: QuestionData = {
      id: Date.now().toString(),
      question: 'New Question',
      choices: ['Option A', 'Option B', 'Option C', 'Option D']
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const exportToPDF = async () => {
    if (!printRef.current) return;

    try {
      // Ensure any active contenteditable/input commits its value before snapshot
      if (document.activeElement && (document.activeElement as HTMLElement).blur) {
        (document.activeElement as HTMLElement).blur();
      }
      
      const element = printRef.current;

      // Use html2canvas-pro directly on the element - it supports modern CSS color functions
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      // Create PDF with proper sizing
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      // A4 dimensions: 210mm x 297mm
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // 10mm margins
      const contentWidth = pdfWidth - (margin * 2);
      const contentHeight = pdfHeight - (margin * 2);
      
      // Calculate image dimensions to fit within content area
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let currentHeight = 0;
      let position = margin;

      // Add first page
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      currentHeight += imgHeight;

      // Add additional pages if content is longer than one page
      while (currentHeight > contentHeight) {
        pdf.addPage();
        position = margin - (currentHeight - contentHeight);
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        currentHeight -= contentHeight;
      }

      pdf.save(`${documentTitle.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Edit Mode Toggle */}
      <div className="max-w-5xl mx-auto mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Edit Mode</span>
          <button
            type="button"
            aria-pressed={isEditing}
            onClick={() => setIsEditing((v) => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isEditing ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
            title={isEditing ? 'Turn off edit mode' : 'Turn on edit mode'}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isEditing ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isEditing ? 'text-emerald-600' : 'text-slate-500'}`}>
            {isEditing ? 'On' : 'Off'}
          </span>
        </div>
      </div>
      {/* Header Controls */}
      <div className="max-w-5xl mx-auto mb-6 bg-white/90 backdrop-blur rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-5">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">PDF Document Editor</h1>
          <div className="flex gap-3">
            <button
              onClick={addQuestion}
              disabled={!isEditing}
              className={`px-4 py-2 rounded-md transition-colors shadow-sm ${
                isEditing ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              Add Question
            </button>
            <button
              onClick={exportToPDF}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium shadow-sm"
            >
              Download PDF
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 pb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Title
            </label>
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              disabled={!isEditing}
              className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                isEditing ? 'border-slate-300' : 'border-slate-200 bg-slate-100 cursor-not-allowed text-slate-500'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              disabled={!isEditing}
              className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                isEditing ? 'border-slate-300' : 'border-slate-200 bg-slate-100 cursor-not-allowed text-slate-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden ring-1 ring-slate-200">
        <div 
          ref={printRef}
          className="bg-white p-10 min-h-[297mm]"
          style={{ width: '210mm', margin: '0 auto' }}
        >
          {/* Document Header */}
          <div className="text-center mb-8 border-b-2 border-gray-200 pb-6">
            <ContentEditable
              html={documentTitle}
              disabled={!isEditing}
              onChange={(evt) => setDocumentTitle(evt.target.value)}
              tagName="h1"
              className={`text-3xl font-extrabold tracking-tight text-slate-900 mb-2 min-h-[2.5rem] focus:outline-none p-2 rounded transition-all duration-200 ${
                isEditing 
                  ? 'hover:bg-yellow-100 focus:bg-yellow-100 cursor-text' 
                  : 'cursor-default'
              }`}
            />
            <ContentEditable
              html={subtitle}
              disabled={!isEditing}
              onChange={(evt) => setSubtitle(evt.target.value)}
              tagName="h2"
              className={`text-lg text-slate-600 min-h-[1.5rem] focus:outline-none p-2 rounded transition-all duration-200 ${
                isEditing 
                  ? 'hover:bg-yellow-100 focus:bg-yellow-100 cursor-text' 
                  : 'cursor-default'
              }`}
            />
          </div>

          {/* Questions Section */}
          <div className="space-y-8">
            {questions.map((question, questionIndex) => (
              <div key={question.id} className="border border-slate-200 rounded-lg p-6 relative shadow-sm">
                {isEditing && (
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                    title="Remove Question"
                  >
                    ×
                  </button>
                )}
                
                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg font-semibold text-gray-700 mt-1">
                      {questionIndex + 1}.
                    </span>
                    <ContentEditable
                      html={question.question}
                      disabled={!isEditing}
                      onChange={(evt) => handleQuestionChange(question.id, evt.target.value)}
                      className={`flex-1 text-lg text-slate-800 min-h-[2rem] focus:outline-none p-2 rounded border-2 border-transparent transition-all duration-200 ${
                        isEditing 
                          ? 'hover:bg-yellow-100 hover:border-yellow-300 focus:bg-yellow-100 focus:border-yellow-300 cursor-text' 
                          : 'cursor-default'
                      }`}
                    />
                  </div>
                </div>

                {/* MCQ Choices */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8">
                  {question.choices.map((choice, choiceIndex) => (
                    <div key={choiceIndex} className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 border-2 border-slate-400 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-slate-600">
                            {String.fromCharCode(65 + choiceIndex)}
                          </span>
                        </div>
                      </div>
                      <ContentEditable
                        html={choice}
                        disabled={!isEditing}
                        onChange={(evt) => handleChoiceChange(question.id, choiceIndex, evt.target.value)}
                        className={`flex-1 text-slate-700 min-h-[1.5rem] focus:outline-none p-2 rounded border-2 border-transparent transition-all duration-200 ${
                          isEditing 
                            ? 'hover:bg-yellow-100 hover:border-yellow-300 focus:bg-yellow-100 focus:border-yellow-300 cursor-text' 
                            : 'cursor-default'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center">
            <ContentEditable
              html="Additional Instructions or Notes"
              disabled={!isEditing}
              onChange={() => {}}
              className={`text-slate-600 text-sm min-h-[1rem] focus:outline-none p-2 rounded transition-all duration-200 ${
                isEditing 
                  ? 'hover:bg-yellow-100 focus:bg-yellow-100 cursor-text' 
                  : 'cursor-default'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
