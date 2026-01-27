'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Stepper from '@/components/Stepper';

const steps = [
  { label: 'Basics', shortLabel: 'Basics' },
  { label: 'Dept Info', shortLabel: 'Dept Info' },
  { label: 'Lawyers', shortLabel: 'Lawyers' },
  { label: 'Practice', shortLabel: 'Practice' },
  { label: 'Clients', shortLabel: 'Clients' },
];

export default function PracticeOverview() {
  const [practiceContent, setPracticeContent] = useState(
    `Gibson Dunn's London M&A practice is recognised as one of the premier transactional teams in the UK market, advising on complex cross-border public and private M&A transactions across a range of industry sectors.

The team is particularly noted for its expertise in private equity transactions, having advised on several of the largest European buyouts in the past year. Key clients include Poseidon Acquisition Corp., Elliott Investment Management, and several leading sovereign wealth funds.`
  );

  const [rankingArgument, setRankingArgument] = useState(
    `Sandy Bhogal should be considered for Band 1 recognition based on lead roles on three $10B+ transactions this year, compared to Band 1 peers who averaged two such transactions.`
  );

  const wordCount = practiceContent.split(/\s+/).filter(Boolean).length;

  return (
    <main className="flex-1 min-w-0 flex flex-col relative z-10 h-full overflow-hidden bg-neutral-50/30">
      {/* Header */}
      <header className="flex-none px-10 py-6 border-b border-neutral-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-neutral-900 tracking-tight flex items-center gap-2">
                New Submission
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-500 font-normal">Chambers Global</span>
              </h1>
            </div>
            <Stepper steps={steps} currentStep={4} />
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-8">
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
                Practice Overview (Section B10)
              </h2>
              <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
                Describe what the department is best known for, key types of work, and recent growth.
                Use the AI tools to draft based on marketing materials.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="group flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all shadow-sm">
                <Icon
                  icon="solar:global-linear"
                  className="text-neutral-400 group-hover:text-[#FF5E00] transition-colors"
                />
                View Source Materials
              </button>
              <button className="group flex items-center gap-2 px-3 py-2 text-xs font-medium bg-[#FF5E00] border border-[#FF5E00] rounded-lg text-white hover:bg-[#e55500] hover:border-[#e55500] transition-all shadow-sm shadow-orange-500/20">
                <Icon icon="solar:magic-stick-3-linear" className="text-white" />
                Generate Draft
              </button>
            </div>
          </div>

          {/* Editor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Rich Text Editor */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]">
                {/* Toolbar */}
                <div className="px-3 py-2 border-b border-neutral-100 bg-neutral-50/50 flex items-center gap-1">
                  <button className="p-1.5 rounded hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors">
                    <Icon icon="solar:text-bold-linear" width={16} />
                  </button>
                  <button className="p-1.5 rounded hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors">
                    <Icon icon="solar:text-italic-linear" width={16} />
                  </button>
                  <button className="p-1.5 rounded hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors">
                    <Icon icon="solar:text-underline-linear" width={16} />
                  </button>
                  <div className="w-px h-4 bg-neutral-200 mx-1"></div>
                  <button className="p-1.5 rounded hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors">
                    <Icon icon="solar:list-linear" width={16} />
                  </button>
                  <div className="flex-1"></div>
                  <span className="text-[10px] text-neutral-400 font-medium">Auto-saved 2m ago</span>
                </div>

                {/* Content Editable Area */}
                <div className="flex-1 p-6">
                  <textarea
                    value={practiceContent}
                    onChange={(e) => setPracticeContent(e.target.value)}
                    className="w-full h-full text-sm text-neutral-800 leading-relaxed font-serif resize-none outline-none"
                    style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                  />
                </div>

                {/* Footer Info */}
                <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[10px] uppercase tracking-wide font-medium text-neutral-500">
                      B10 Section
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400">{wordCount} / 500 words</span>
                </div>
              </div>
            </div>

            {/* Right: AI Coaching */}
            <div className="lg:col-span-1 flex flex-col h-full">
              <div className="bg-gradient-to-br from-indigo-50/50 to-white rounded-xl border border-indigo-100 shadow-sm p-5 h-full relative overflow-hidden">
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Icon icon="solar:stars-minimalistic-linear" width={100} className="text-indigo-600" />
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-indigo-200 shadow-lg">
                    <Icon icon="solar:magic-stick-3-linear" width={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-sm">AI Coach</h3>
                    <p className="text-[10px] text-neutral-500">Analysis based on Chambers style</p>
                  </div>
                </div>

                {/* Scores */}
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-neutral-600">Commercial Language</span>
                      <span className="text-indigo-600">7/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-neutral-600">Specificity</span>
                      <span className="text-indigo-600">8/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-neutral-600">Researcher-Friendly</span>
                      <span className="text-indigo-600">7/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Suggestion Box */}
                <div className="bg-white border border-indigo-100 rounded-lg p-3 shadow-sm">
                  <div className="flex items-start gap-2">
                    <Icon icon="solar:lightbulb-linear" className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-700 font-medium mb-1">Impact Suggestion</p>
                      <p className="text-[11px] text-neutral-500 leading-relaxed">
                        Add specific deal values to strengthen impact. Researchers look for
                        quantifiable data to justify ranking improvements.
                      </p>
                    </div>
                  </div>
                  <button className="mt-3 w-full py-1.5 text-[10px] font-medium text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100 transition-colors">
                    Apply Suggestion
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Ranking Arguments */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Ranking Argument</h3>
                <p className="text-xs text-neutral-500">
                  Data-driven reasons why the practice or partners should be ranked higher.
                </p>
              </div>
              <span className="text-[10px] px-2 py-1 bg-neutral-100 text-neutral-600 rounded border border-neutral-200 font-medium">
                Optional
              </span>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-1 focus-within:ring-2 focus-within:ring-[#FF5E00]/10 focus-within:border-[#FF5E00] transition-all">
              <textarea
                value={rankingArgument}
                onChange={(e) => setRankingArgument(e.target.value)}
                className="w-full text-sm text-neutral-800 p-4 min-h-[100px] outline-none resize-y rounded-lg"
                placeholder="Enter arguments supported by deal value, volume, or complexity..."
              />
              <div className="flex justify-between items-center px-4 py-2 border-t border-neutral-50 bg-neutral-50/30 rounded-b-lg">
                <button className="flex items-center gap-1.5 text-xs font-medium text-[#FF5E00] hover:text-[#d04d00]">
                  <Icon icon="solar:graph-up-linear" />
                  <span>Insert Deal Statistics</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feedback on Other Firms */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Feedback on Other Firms</h3>
                <p className="text-xs text-neutral-500">
                  Comments on the market to encourage researcher interviews.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-4 flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 shrink-0">
                <Icon icon="solar:quote-up-linear" width={12} />
              </div>
              <p className="text-sm text-neutral-600 italic">
                &quot;We are happy to provide our feedback on the market during a research call.&quot;
              </p>
              <div className="ml-auto">
                <button className="text-xs text-neutral-400 hover:text-neutral-900 underline decoration-dotted">
                  Edit Text
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <Link
              href="/submissions/new/lawyers"
              className="px-6 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
            >
              <Icon icon="solar:arrow-left-linear" width={16} />
              Back to Lawyers
            </Link>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all shadow-sm">
                Save Draft
              </button>
              <Link
                href="/submissions/new/clients"
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg shadow-sm shadow-orange-500/20 transition-all flex items-center gap-2 group"
              >
                <span>Continue to Clients</span>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="group-hover:translate-x-0.5 transition-transform"
                  width={16}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
