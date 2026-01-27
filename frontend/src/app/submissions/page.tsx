'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Submission {
  id: string;
  directory: 'chambers' | 'legal500';
  practiceArea: string;
  jurisdiction: string;
  status: 'draft' | 'in_progress' | 'complete';
  deadline: string;
}

const submissions: Submission[] = [
  {
    id: '1',
    directory: 'chambers',
    practiceArea: 'Corporate M&A',
    jurisdiction: 'UK',
    status: 'in_progress',
    deadline: 'Feb 15, 2026',
  },
  {
    id: '2',
    directory: 'chambers',
    practiceArea: 'Tax',
    jurisdiction: 'Germany',
    status: 'draft',
    deadline: 'Feb 10, 2026',
  },
  {
    id: '3',
    directory: 'legal500',
    practiceArea: 'Real Estate',
    jurisdiction: 'USA - Nationwide',
    status: 'complete',
    deadline: 'Jan 30, 2026',
  },
  {
    id: '4',
    directory: 'chambers',
    practiceArea: 'Private Equity',
    jurisdiction: 'London',
    status: 'in_progress',
    deadline: 'Feb 8, 2026',
  },
];

export default function SubmissionsPage() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleRowClick = (id: string) => {
    router.push(`/submissions/${id}`);
  };

  const getStatusBadge = (status: Submission['status']) => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
            In Progress
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
            Draft
          </span>
        );
      case 'complete':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Icon icon="solar:check-circle-bold" width={12} />
            Complete
          </span>
        );
    }
  };

  return (
    <main className="flex-1 min-w-0 flex flex-col relative z-10 h-full overflow-hidden bg-neutral-50/30">
      {/* Header */}
      <header className="flex-none px-10 py-8 border-b border-neutral-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
              Submissions
            </h1>
            <p className="text-sm text-neutral-500">
              Manage all your directory submissions.
            </p>
          </div>
        </div>
      </header>

      {/* Filters & Stats Bar */}
      <div className="flex-none px-10 py-4 bg-white/30 backdrop-blur-sm border-b border-neutral-200/50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full">
          {/* Search */}
          <div className="relative group w-72">
            <Icon
              icon="solar:magnifer-linear"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#FF5E00] transition-colors"
              width={16}
            />
            <input
              type="text"
              placeholder="Search practice area, partner, or ID..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00]/20 transition-all placeholder:text-neutral-400"
            />
          </div>

          <div className="h-5 w-px bg-neutral-200 mx-2"></div>

          {/* View Toggle */}
          <div className="flex bg-neutral-100/50 p-1 rounded-lg border border-neutral-200/60">
            <button className="px-3 py-1 text-xs font-medium text-neutral-900 bg-white shadow-sm rounded-md border border-neutral-200">
              Active
            </button>
            <button className="px-3 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 transition-colors">
              All History
            </button>
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-all">
            <Icon icon="solar:filter-linear" width={16} />
            <span>Filter</span>
          </button>

          {/* New Submission Button */}
          <Link
            href="/submissions/new"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg transition-all shadow-sm shadow-orange-500/20 ml-auto group"
          >
            <Icon icon="solar:add-circle-linear" width={18} className="group-hover:scale-110 transition-transform" />
            <span>New Submission</span>
          </Link>
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-6">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-200">
                <th className="py-3 px-6 text-xs font-semibold uppercase text-neutral-500 tracking-wider">
                  Directory
                </th>
                <th className="py-3 px-6 text-xs font-semibold uppercase text-neutral-500 tracking-wider">
                  Practice Area
                </th>
                <th className="py-3 px-6 text-xs font-semibold uppercase text-neutral-500 tracking-wider">
                  Jurisdiction
                </th>
                <th className="py-3 px-6 text-xs font-semibold uppercase text-neutral-500 tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-xs font-semibold uppercase text-neutral-500 tracking-wider">
                  Deadline
                </th>
                <th className="py-3 px-6 text-xs font-semibold uppercase text-neutral-500 tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="group hover:bg-neutral-50 transition-colors cursor-pointer relative"
                  style={{ zIndex: openDropdown === submission.id ? 50 : 0 }}
                  onClick={() => handleRowClick(submission.id)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded flex items-center justify-center shrink-0 border ${
                          submission.directory === 'chambers'
                            ? 'bg-orange-50 text-[#FF5E00] border-orange-100'
                            : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}
                      >
                        <span className="font-serif font-bold text-sm">
                          {submission.directory === 'chambers' ? 'C' : 'L5'}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-neutral-900">
                        {submission.directory === 'chambers' ? 'Chambers' : 'Legal 500'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-700 font-medium group-hover:text-[#FF5E00] transition-colors">
                    <Link href={`/submissions/${submission.id}`}>
                      {submission.practiceArea}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-500">{submission.jurisdiction}</td>
                  <td className="py-4 px-6">{getStatusBadge(submission.status)}</td>
                  <td className="py-4 px-6 text-sm text-neutral-600">{submission.deadline}</td>
                  <td className="py-4 px-6 text-right relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={(e) => toggleDropdown(submission.id, e)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-white rounded transition-all focus:outline-none"
                      >
                        <Icon icon="solar:menu-dots-bold" width={16} />
                      </button>
                      {/* Context Menu */}
                      {openDropdown === submission.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black/5 z-50 transform origin-top-right">
                          <div className="py-1" role="menu">
                            <Link
                              href={`/submissions/${submission.id}`}
                              className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 group/item"
                            >
                              <Icon icon="solar:pen-linear" className="text-neutral-400 group-hover/item:text-neutral-900" />
                              Edit Details
                            </Link>
                            {submission.directory === 'chambers' && (
                              <button className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 group/item">
                                <Icon icon="solar:repeat-linear" className="text-purple-500 group-hover/item:text-purple-700" />
                                Convert to Legal 500
                              </button>
                            )}
                            <div className="h-px bg-neutral-100 my-1"></div>
                            <button className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
                              <Icon icon="solar:trash-bin-trash-linear" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="border-t border-neutral-100 px-6 py-4 bg-neutral-50/50 flex justify-between items-center text-xs text-neutral-500">
            <span>Showing {submissions.length} active submissions</span>
            <div className="flex gap-2">
              <button className="hover:text-neutral-900 disabled:opacity-50" disabled>
                Previous
              </button>
              <span className="text-neutral-300">|</span>
              <button className="hover:text-neutral-900">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
