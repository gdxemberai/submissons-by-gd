'use client';

import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface Submission {
  id: string;
  directory: 'chambers' | 'legal500';
  practiceArea: string;
  jurisdiction: string;
  status: 'draft' | 'in_progress' | 'complete';
  deadline: string;
  progress: number;
  lastUpdated: string;
  assignee: string;
  sections: { total: number; completed: number };
}

const allSubmissions: Submission[] = [
  {
    id: '1',
    directory: 'chambers',
    practiceArea: 'Corporate M&A',
    jurisdiction: 'UK',
    status: 'in_progress',
    deadline: 'Feb 15, 2026',
    progress: 65,
    lastUpdated: '2 hours ago',
    assignee: 'Sarah Chen',
    sections: { total: 8, completed: 5 },
  },
  {
    id: '2',
    directory: 'chambers',
    practiceArea: 'Tax',
    jurisdiction: 'Germany',
    status: 'draft',
    deadline: 'Feb 10, 2026',
    progress: 15,
    lastUpdated: '1 day ago',
    assignee: 'Michael Roberts',
    sections: { total: 6, completed: 1 },
  },
  {
    id: '3',
    directory: 'legal500',
    practiceArea: 'Real Estate',
    jurisdiction: 'USA - Nationwide',
    status: 'complete',
    deadline: 'Jan 30, 2026',
    progress: 100,
    lastUpdated: '3 days ago',
    assignee: 'Emily Watson',
    sections: { total: 7, completed: 7 },
  },
  {
    id: '4',
    directory: 'chambers',
    practiceArea: 'Private Equity',
    jurisdiction: 'London',
    status: 'in_progress',
    deadline: 'Feb 8, 2026',
    progress: 40,
    lastUpdated: '5 hours ago',
    assignee: 'James Miller',
    sections: { total: 8, completed: 3 },
  },
  {
    id: '5',
    directory: 'legal500',
    practiceArea: 'Banking & Finance',
    jurisdiction: 'UK',
    status: 'in_progress',
    deadline: 'Feb 20, 2026',
    progress: 80,
    lastUpdated: '1 hour ago',
    assignee: 'Anna Schmidt',
    sections: { total: 6, completed: 5 },
  },
  {
    id: '6',
    directory: 'chambers',
    practiceArea: 'Litigation',
    jurisdiction: 'USA - New York',
    status: 'draft',
    deadline: 'Mar 1, 2026',
    progress: 5,
    lastUpdated: '3 hours ago',
    assignee: 'David Park',
    sections: { total: 9, completed: 0 },
  },
];

type ViewMode = 'kanban' | 'grid';
type DirectoryFilter = 'all' | 'chambers' | 'legal500';

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [directoryFilter, setDirectoryFilter] = useState<DirectoryFilter>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredSubmissions = useMemo(() => {
    return allSubmissions.filter((submission) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesPracticeArea = submission.practiceArea.toLowerCase().includes(query);
        const matchesJurisdiction = submission.jurisdiction.toLowerCase().includes(query);
        const matchesAssignee = submission.assignee.toLowerCase().includes(query);
        if (!matchesPracticeArea && !matchesJurisdiction && !matchesAssignee) {
          return false;
        }
      }
      if (directoryFilter !== 'all' && submission.directory !== directoryFilter) {
        return false;
      }
      return true;
    });
  }, [searchQuery, directoryFilter]);

  const stats = useMemo(() => {
    const total = allSubmissions.length;
    const drafts = allSubmissions.filter(s => s.status === 'draft').length;
    const inProgress = allSubmissions.filter(s => s.status === 'in_progress').length;
    const completed = allSubmissions.filter(s => s.status === 'complete').length;
    const avgProgress = Math.round(allSubmissions.reduce((acc, s) => acc + s.progress, 0) / total);
    return { total, drafts, inProgress, completed, avgProgress };
  }, []);

  const groupedSubmissions = useMemo(() => {
    return {
      draft: filteredSubmissions.filter(s => s.status === 'draft'),
      in_progress: filteredSubmissions.filter(s => s.status === 'in_progress'),
      complete: filteredSubmissions.filter(s => s.status === 'complete'),
    };
  }, [filteredSubmissions]);

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-emerald-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 30) return 'bg-amber-500';
    return 'bg-neutral-300';
  };

  const getDeadlineStyle = (deadline: string) => {
    if (deadline.includes('Feb 8') || deadline.includes('Feb 10')) {
      return 'bg-red-500 text-white';
    }
    if (deadline.includes('Feb 15') || deadline.includes('Feb 20')) {
      return 'bg-amber-500 text-white';
    }
    return 'bg-neutral-100 text-neutral-600';
  };

  const SubmissionCard = ({ submission }: { submission: Submission }) => {
    const isHovered = hoveredCard === submission.id;

    return (
      <Link
        href={`/submissions/${submission.id}`}
        className="group block"
        onMouseEnter={() => setHoveredCard(submission.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className={`bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all duration-200 ${
          isHovered ? 'shadow-lg border-neutral-300 scale-[1.02]' : 'shadow-sm hover:shadow-md'
        }`}>
          {/* Card Header */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                submission.directory === 'chambers'
                  ? 'bg-orange-50 text-[#FF5E00] border border-orange-200'
                  : 'bg-blue-50 text-blue-600 border border-blue-200'
              }`}>
                {submission.directory === 'chambers' ? 'C' : 'L5'}
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-semibold ${getDeadlineStyle(submission.deadline)}`}>
                {submission.deadline}
              </span>
            </div>

            <h3 className={`text-sm font-semibold mb-1 transition-colors ${
              isHovered ? 'text-[#FF5E00]' : 'text-neutral-900'
            }`}>
              {submission.practiceArea}
            </h3>
            <p className="text-xs text-neutral-500">{submission.jurisdiction}</p>
          </div>

          {/* Progress Section */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1.5">
              <span>{submission.sections.completed}/{submission.sections.total} sections</span>
              <span className="font-semibold text-neutral-700">{submission.progress}%</span>
            </div>
            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(submission.progress)} rounded-full transition-all duration-300`}
                style={{ width: `${submission.progress}%` }}
              />
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-[9px] font-semibold text-neutral-600">
                {submission.assignee.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="text-[11px] text-neutral-600">{submission.assignee}</span>
            </div>
            <span className="text-[10px] text-neutral-400">{submission.lastUpdated}</span>
          </div>
        </div>
      </Link>
    );
  };

  const KanbanColumn = ({
    title,
    icon,
    iconBg,
    submissions,
    count,
    accentColor
  }: {
    title: string;
    icon: string;
    iconBg: string;
    submissions: Submission[];
    count: number;
    accentColor: string;
  }) => (
    <div className="flex-1 min-w-[300px] max-w-[360px]">
      {/* Column Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon icon={icon} width={14} />
        </div>
        <span className="text-sm font-semibold text-neutral-800">{title}</span>
        <span className={`ml-auto px-2 py-0.5 rounded-md text-xs font-semibold ${accentColor}`}>
          {count}
        </span>
      </div>

      {/* Column Content */}
      <div className="space-y-3">
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
        {submissions.length === 0 && (
          <div className="bg-neutral-50 rounded-xl border border-dashed border-neutral-200 p-6 text-center">
            <Icon icon="solar:inbox-line-linear" width={24} className="text-neutral-300 mx-auto mb-2" />
            <p className="text-xs text-neutral-400">No submissions</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="flex-1 min-w-0 flex flex-col relative z-10 h-full overflow-hidden bg-neutral-50">
      {/* Header */}
      <header className="flex-none px-8 py-5 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5E00] flex items-center justify-center">
              <Icon icon="solar:documents-bold" className="text-white" width={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-neutral-900">Submissions</h1>
              <p className="text-xs text-neutral-500">Track and manage directory submissions</p>
            </div>
          </div>
          <Link
            href="/submissions/new"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg transition-colors"
          >
            <Icon icon="solar:add-circle-linear" width={16} />
            <span>New Submission</span>
          </Link>
        </div>
      </header>

      {/* Stats Row */}
      <div className="flex-none px-8 py-4 bg-white border-b border-neutral-200">
        <div className="flex gap-3">
          {/* Total */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center">
              <Icon icon="solar:folder-bold" className="text-neutral-600" width={16} />
            </div>
            <div>
              <p className="text-lg font-semibold text-neutral-900">{stats.total}</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Total</p>
            </div>
          </div>

          {/* Drafts */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center">
              <Icon icon="solar:document-bold" className="text-neutral-500" width={16} />
            </div>
            <div>
              <p className="text-lg font-semibold text-neutral-700">{stats.drafts}</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Drafts</p>
            </div>
          </div>

          {/* In Progress */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Icon icon="solar:hourglass-bold" className="text-blue-600" width={16} />
            </div>
            <div>
              <p className="text-lg font-semibold text-blue-700">{stats.inProgress}</p>
              <p className="text-[10px] text-blue-600 uppercase tracking-wide">In Progress</p>
            </div>
          </div>

          {/* Completed */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Icon icon="solar:check-circle-bold" className="text-emerald-600" width={16} />
            </div>
            <div>
              <p className="text-lg font-semibold text-emerald-700">{stats.completed}</p>
              <p className="text-[10px] text-emerald-600 uppercase tracking-wide">Completed</p>
            </div>
          </div>

          {/* Avg Progress */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Icon icon="solar:chart-2-bold" className="text-[#FF5E00]" width={16} />
            </div>
            <div>
              <p className="text-lg font-semibold text-[#FF5E00]">{stats.avgProgress}%</p>
              <p className="text-[10px] text-orange-600 uppercase tracking-wide">Avg Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex-none px-8 py-3 bg-white border-b border-neutral-200 flex items-center gap-4">
        {/* Search */}
        <div className="relative w-72">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            width={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search submissions..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#FF5E00] focus:bg-white transition-all"
          />
        </div>

        <div className="h-5 w-px bg-neutral-200"></div>

        {/* Directory Filter */}
        <div className="flex bg-neutral-100 p-0.5 rounded-lg">
          {[
            { value: 'all', label: 'All' },
            { value: 'chambers', label: 'Chambers' },
            { value: 'legal500', label: 'Legal 500' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setDirectoryFilter(option.value as DirectoryFilter)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                directoryFilter === option.value
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-neutral-200"></div>

        {/* View Toggle */}
        <div className="flex bg-neutral-100 p-0.5 rounded-lg">
          <button
            onClick={() => setViewMode('kanban')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'kanban'
                ? 'bg-white text-[#FF5E00] shadow-sm'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
            title="Kanban View"
          >
            <Icon icon="solar:widget-4-bold" width={16} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-[#FF5E00] shadow-sm'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
            title="Grid View"
          >
            <Icon icon="solar:tuning-square-2-bold" width={16} />
          </button>
        </div>

        <span className="ml-auto text-xs text-neutral-400">
          {filteredSubmissions.length} of {allSubmissions.length} submissions
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {viewMode === 'kanban' ? (
          <div className="flex gap-5">
            <KanbanColumn
              title="Drafts"
              icon="solar:document-bold"
              iconBg="bg-neutral-200 text-neutral-500"
              submissions={groupedSubmissions.draft}
              count={groupedSubmissions.draft.length}
              accentColor="bg-neutral-100 text-neutral-600"
            />
            <KanbanColumn
              title="In Progress"
              icon="solar:hourglass-bold"
              iconBg="bg-blue-100 text-blue-600"
              submissions={groupedSubmissions.in_progress}
              count={groupedSubmissions.in_progress.length}
              accentColor="bg-blue-100 text-blue-600"
            />
            <KanbanColumn
              title="Completed"
              icon="solar:check-circle-bold"
              iconBg="bg-emerald-100 text-emerald-600"
              submissions={groupedSubmissions.complete}
              count={groupedSubmissions.complete.length}
              accentColor="bg-emerald-100 text-emerald-600"
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredSubmissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
            {filteredSubmissions.length === 0 && (
              <div className="col-span-3 bg-white rounded-xl border border-dashed border-neutral-200 p-12 text-center">
                <Icon icon="solar:inbox-linear" width={40} className="text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500 font-medium">No submissions found</p>
                <p className="text-sm text-neutral-400 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="flex-none px-8 py-2.5 bg-white border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span>2 due this week</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>3 need review</span>
          </div>
        </div>
        <span className="text-neutral-400">Last refreshed: Just now</span>
      </footer>
    </main>
  );
}
