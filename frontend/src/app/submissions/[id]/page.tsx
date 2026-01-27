'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'complete' | 'in_progress' | 'issues';
  details?: string;
  issueCount?: number;
}

const sections: Section[] = [
  {
    id: 'basic',
    title: 'Basic Info',
    description: 'Section A',
    icon: 'solar:document-text-linear',
    status: 'complete',
  },
  {
    id: 'department',
    title: 'Department Info',
    description: 'Sections B1-B4, B8',
    icon: 'solar:buildings-linear',
    status: 'complete',
  },
  {
    id: 'lawyers',
    title: 'Lawyer Information',
    description: 'Section B6, B9',
    icon: 'solar:users-group-rounded-linear',
    status: 'complete',
    details: '6 Lawyers',
  },
  {
    id: 'practice',
    title: 'Practice Overview',
    description: 'Section B10',
    icon: 'solar:graph-up-linear',
    status: 'complete',
    details: '487 words',
  },
  {
    id: 'clients',
    title: 'Client Lists',
    description: 'Section D0, E0',
    icon: 'solar:user-hand-up-linear',
    status: 'complete',
    details: '8 publishable, 5 confidential',
  },
  {
    id: 'matters',
    title: 'Matters',
    description: 'Sections D1-D9, E1-E9',
    icon: 'solar:case-minimalistic-linear',
    status: 'issues',
    details: '7 publishable, 5 confidential',
    issueCount: 2,
  },
];

export default function SubmissionDetail() {
  const [showPdfPanel, setShowPdfPanel] = useState(false);

  const getStatusBadge = (section: Section) => {
    switch (section.status) {
      case 'complete':
        return (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium border border-green-100">
            <Icon icon="solar:check-circle-bold" width={12} />
            Complete
          </span>
        );
      case 'in_progress':
        return (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
            In Progress
          </span>
        );
      case 'issues':
        return (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-medium border border-amber-200 whitespace-nowrap">
            <Icon icon="solar:danger-circle-bold" width={12} />
            {section.issueCount} Issues
          </span>
        );
    }
  };

  const getSectionIconBg = (status: Section['status']) => {
    switch (status) {
      case 'complete':
        return 'bg-green-50 text-green-600 border-green-100';
      case 'in_progress':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'issues':
        return 'bg-amber-100 text-amber-600 border-amber-200';
    }
  };

  return (
    <main className="flex-1 min-w-0 flex flex-col relative z-10 h-full overflow-hidden bg-neutral-50/30">
      {/* Header */}
      <header className="flex-none px-10 py-6 border-b border-neutral-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                <span className="font-medium text-neutral-900">Submission Overview</span>
                <Icon icon="solar:alt-arrow-right-linear" width={12} />
                <span>Chambers Global</span>
              </div>
              <h1 className="text-xl font-semibold text-neutral-900 tracking-tight flex items-center gap-2">
                Corporate M&A
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-500 font-normal">UK</span>
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Deadline
                </div>
                <div className="text-sm font-semibold text-neutral-900 font-variant-numeric">
                  Feb 15, 2026
                  <span className="text-[#FF5E00] text-xs font-medium ml-1">(12 days)</span>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden sm:block"></div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                In Progress
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-8">
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
              Submission Sections
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Manage and track progress for each section of your submission.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`group relative flex items-center justify-between p-5 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    section.status === 'issues'
                      ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300 hover:bg-amber-50 ring-1 ring-amber-100'
                      : 'border-neutral-200 hover:border-[#FF5E00]/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 ${getSectionIconBg(
                        section.status
                      )}`}
                    >
                      <Icon icon={section.icon} width={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-sm">{section.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-neutral-500">{section.description}</span>
                        {section.details && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                            <span className="text-xs text-neutral-700 font-medium">
                              {section.details}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(section)}
                    <div
                      className={`w-px h-8 hidden sm:block ${
                        section.status === 'issues' ? 'bg-amber-200' : 'bg-neutral-100'
                      }`}
                    ></div>
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                        section.status === 'issues'
                          ? 'text-amber-600 bg-amber-100/50 group-hover:bg-amber-200/50'
                          : 'text-neutral-400 group-hover:text-[#FF5E00] group-hover:bg-[#FF5E00]/10'
                      }`}
                    >
                      <Icon icon="solar:pen-linear" width={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
                <h3 className="font-semibold text-neutral-900 text-sm mb-4">Quick Actions</h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setShowPdfPanel(true)}
                    className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-100 text-sm text-neutral-600 hover:text-neutral-900 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded bg-neutral-50 group-hover:bg-white text-neutral-500 group-hover:text-[#FF5E00] flex items-center justify-center border border-neutral-100 transition-colors">
                      <Icon icon="solar:eye-linear" width={18} />
                    </div>
                    <span className="font-medium">View PDF</span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-100 text-sm text-neutral-600 hover:text-neutral-900 transition-all text-left group">
                    <div className="w-8 h-8 rounded bg-neutral-50 group-hover:bg-white text-neutral-500 group-hover:text-blue-600 flex items-center justify-center border border-neutral-100 transition-colors">
                      <Icon icon="solar:file-text-linear" width={18} />
                    </div>
                    <span className="font-medium">Export to Word</span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-100 text-sm text-neutral-600 hover:text-neutral-900 transition-all text-left group">
                    <div className="w-8 h-8 rounded bg-neutral-50 group-hover:bg-white text-neutral-500 group-hover:text-purple-600 flex items-center justify-center border border-neutral-100 transition-colors">
                      <Icon icon="solar:refresh-circle-linear" width={18} />
                    </div>
                    <span className="font-medium">Convert to Legal 500</span>
                  </button>
                </div>
              </div>

              {/* Attention Needed */}
              <div className="bg-amber-50 rounded-xl border border-amber-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Icon icon="solar:bell-bing-bold" className="text-amber-600" />
                  <h3 className="font-semibold text-amber-900 text-sm">Attention Needed</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-start">
                    <Icon
                      icon="solar:danger-triangle-linear"
                      className="text-amber-600 shrink-0 mt-0.5"
                      width={16}
                    />
                    <div>
                      <p className="text-xs font-medium text-amber-900">Matter 3</p>
                      <p className="text-[11px] text-amber-700 leading-tight">
                        Missing press links. Verification required.
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-amber-200/50"></div>
                  <div className="flex gap-3 items-start">
                    <Icon
                      icon="solar:danger-triangle-linear"
                      className="text-amber-600 shrink-0 mt-0.5"
                      width={16}
                    />
                    <div>
                      <p className="text-xs font-medium text-amber-900">Matter 5</p>
                      <p className="text-[11px] text-amber-700 leading-tight">
                        Description may exceed one page limit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mt-8">
            <Link
              href="/"
              className="px-6 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
            >
              <Icon icon="solar:arrow-left-linear" width={16} />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3"></div>
          </div>
        </div>
      </div>

      {/* PDF Panel Backdrop */}
      {showPdfPanel && (
        <div
          className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm z-[60] transition-opacity duration-300"
          onClick={() => setShowPdfPanel(false)}
        />
      )}

      {/* PDF Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[600px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out border-l border-neutral-200 flex flex-col ${
          showPdfPanel ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white">
          <h3 className="font-semibold text-neutral-900">Submission PDF Preview</h3>
          <button
            onClick={() => setShowPdfPanel(false)}
            className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 transition-colors"
          >
            <Icon icon="solar:close-circle-linear" width={24} />
          </button>
        </div>
        <div className="flex-1 bg-neutral-100 p-6 overflow-hidden relative">
          <div className="w-full h-full bg-white shadow-sm border border-neutral-200 rounded-lg flex flex-col overflow-hidden">
            <div className="h-12 border-b border-neutral-100 flex items-center px-4 gap-4 bg-neutral-50 rounded-t-lg shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 text-center text-xs text-neutral-400 font-medium truncate">
                submission_draft_v2.pdf
              </div>
              <div className="w-12"></div>
            </div>
            <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto bg-neutral-50/50">
              <div className="w-full max-w-sm aspect-[1/1.4] bg-white shadow-md border border-neutral-100 p-8 space-y-4">
                <div className="h-4 w-3/4 bg-neutral-100 rounded"></div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-neutral-100 rounded"></div>
                  <div className="h-2 w-full bg-neutral-100 rounded"></div>
                  <div className="h-2 w-5/6 bg-neutral-100 rounded"></div>
                </div>
                <div className="h-32 w-full bg-neutral-50 rounded border border-dashed border-neutral-200 flex items-center justify-center text-xs text-neutral-400">
                  [PDF Content Placeholder]
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-neutral-100 rounded"></div>
                  <div className="h-2 w-full bg-neutral-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
