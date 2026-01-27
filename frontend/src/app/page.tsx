'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
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
  isArchived?: boolean;
}

const allSubmissions: Submission[] = [
  {
    id: '1',
    directory: 'chambers',
    practiceArea: 'Corporate M&A',
    jurisdiction: 'UK',
    status: 'in_progress',
    deadline: 'Feb 15, 2026',
    isArchived: false,
  },
  {
    id: '2',
    directory: 'chambers',
    practiceArea: 'Tax',
    jurisdiction: 'Germany',
    status: 'draft',
    deadline: 'Feb 10, 2026',
    isArchived: false,
  },
  {
    id: '3',
    directory: 'legal500',
    practiceArea: 'Real Estate',
    jurisdiction: 'USA - Nationwide',
    status: 'complete',
    deadline: 'Jan 30, 2026',
    isArchived: false,
  },
  {
    id: '4',
    directory: 'chambers',
    practiceArea: 'Private Equity',
    jurisdiction: 'London',
    status: 'in_progress',
    deadline: 'Feb 8, 2026',
    isArchived: false,
  },
  {
    id: '5',
    directory: 'legal500',
    practiceArea: 'Banking & Finance',
    jurisdiction: 'UK',
    status: 'complete',
    deadline: 'Dec 15, 2025',
    isArchived: true,
  },
  {
    id: '6',
    directory: 'chambers',
    practiceArea: 'Litigation',
    jurisdiction: 'USA - New York',
    status: 'complete',
    deadline: 'Nov 20, 2025',
    isArchived: true,
  },
];

type ViewMode = 'active' | 'all';
type DirectoryFilter = 'all' | 'chambers' | 'legal500';
type StatusFilter = 'all' | 'draft' | 'in_progress' | 'complete';

export default function Dashboard() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState(allSubmissions);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('active');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [directoryFilter, setDirectoryFilter] = useState<DirectoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter submissions based on all criteria
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      // View mode filter
      if (viewMode === 'active' && submission.isArchived) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesPracticeArea = submission.practiceArea.toLowerCase().includes(query);
        const matchesJurisdiction = submission.jurisdiction.toLowerCase().includes(query);
        const matchesDirectory = submission.directory.toLowerCase().includes(query);
        const matchesId = submission.id.includes(query);
        if (!matchesPracticeArea && !matchesJurisdiction && !matchesDirectory && !matchesId) {
          return false;
        }
      }

      // Directory filter
      if (directoryFilter !== 'all' && submission.directory !== directoryFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && submission.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [submissions, searchQuery, viewMode, directoryFilter, statusFilter]);

  const activeFilterCount = [
    directoryFilter !== 'all',
    statusFilter !== 'all',
  ].filter(Boolean).length;

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleRowClick = (id: string) => {
    if (deleteConfirm) return;
    router.push(`/submissions/${id}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirm(id);
    setOpenDropdown(null);
  };

  const confirmDelete = (id: string) => {
    setSubmissions(submissions.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };

  const clearFilters = () => {
    setDirectoryFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
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
              Legal Submission Automator
            </h1>
            <p className="text-sm text-neutral-500">
              Manage directory submissions and AI-drafting workflows.
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search practice area, jurisdiction, or ID..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00]/20 transition-all placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <Icon icon="solar:close-circle-linear" width={16} />
              </button>
            )}
          </div>

          <div className="h-5 w-px bg-neutral-200 mx-2"></div>

          {/* View Toggle */}
          <div className="flex bg-neutral-100/50 p-1 rounded-lg border border-neutral-200/60">
            <button
              onClick={() => setViewMode('active')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                viewMode === 'active'
                  ? 'text-neutral-900 bg-white shadow-sm border border-neutral-200'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                viewMode === 'all'
                  ? 'text-neutral-900 bg-white shadow-sm border border-neutral-200'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              All History
            </button>
          </div>

          {/* Filter Button */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                activeFilterCount > 0
                  ? 'text-[#FF5E00] bg-[#FF5E00]/5 border border-[#FF5E00]/20 hover:bg-[#FF5E00]/10'
                  : 'text-neutral-600 bg-white border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300'
              }`}
            >
              <Icon icon="solar:filter-linear" width={16} />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-[#FF5E00] text-white rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Filter Dropdown */}
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 z-50 overflow-hidden">
                <div className="p-4 border-b border-neutral-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-neutral-900">Filters</span>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-[#FF5E00] hover:text-[#e55500] font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Directory Filter */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                      Directory
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(['all', 'chambers', 'legal500'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => setDirectoryFilter(option)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            directoryFilter === option
                              ? 'bg-[#FF5E00]/10 border-[#FF5E00]/30 text-[#FF5E00]'
                              : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                          }`}
                        >
                          {option === 'all' ? 'All' : option === 'chambers' ? 'Chambers' : 'Legal 500'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                      Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(['all', 'draft', 'in_progress', 'complete'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => setStatusFilter(option)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            statusFilter === option
                              ? 'bg-[#FF5E00]/10 border-[#FF5E00]/30 text-[#FF5E00]'
                              : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                          }`}
                        >
                          {option === 'all'
                            ? 'All'
                            : option === 'in_progress'
                            ? 'In Progress'
                            : option.charAt(0).toUpperCase() + option.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-neutral-50 flex justify-end">
                  <button
                    onClick={() => setShowFilterDropdown(false)}
                    className="px-4 py-1.5 text-xs font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {(activeFilterCount > 0 || searchQuery) && (
            <div className="flex items-center gap-2">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-md">
                  Search: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')} className="hover:text-neutral-900">
                    <Icon icon="solar:close-circle-linear" width={14} />
                  </button>
                </span>
              )}
              {directoryFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-md">
                  {directoryFilter === 'chambers' ? 'Chambers' : 'Legal 500'}
                  <button onClick={() => setDirectoryFilter('all')} className="hover:text-neutral-900">
                    <Icon icon="solar:close-circle-linear" width={14} />
                  </button>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-md">
                  {statusFilter === 'in_progress' ? 'In Progress' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <button onClick={() => setStatusFilter('all')} className="hover:text-neutral-900">
                    <Icon icon="solar:close-circle-linear" width={14} />
                  </button>
                </span>
              )}
            </div>
          )}

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
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                        <Icon icon="solar:folder-open-linear" width={24} className="text-neutral-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">No submissions found</p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {searchQuery || activeFilterCount > 0
                            ? 'Try adjusting your search or filters'
                            : 'Create a new submission to get started'}
                        </p>
                      </div>
                      {(searchQuery || activeFilterCount > 0) && (
                        <button
                          onClick={clearFilters}
                          className="mt-2 px-4 py-2 text-xs font-medium text-[#FF5E00] hover:bg-[#FF5E00]/5 rounded-lg transition-colors"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className={`group hover:bg-neutral-50 transition-colors cursor-pointer relative ${
                      submission.isArchived ? 'opacity-60' : ''
                    }`}
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
                      {submission.practiceArea}
                      {submission.isArchived && (
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-500 rounded">
                          Archived
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-500">{submission.jurisdiction}</td>
                    <td className="py-4 px-6">{getStatusBadge(submission.status)}</td>
                    <td className="py-4 px-6 text-sm text-neutral-600">{submission.deadline}</td>
                    <td className="py-4 px-6 text-right relative" ref={openDropdown === submission.id ? dropdownRef : null}>
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
                                onClick={(e) => e.stopPropagation()}
                                className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 group/item"
                              >
                                <Icon icon="solar:pen-linear" className="text-neutral-400 group-hover/item:text-neutral-900" />
                                Edit Details
                              </Link>
                              {submission.directory === 'chambers' && (
                                <button
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 group/item"
                                >
                                  <Icon icon="solar:repeat-linear" className="text-purple-500 group-hover/item:text-purple-700" />
                                  Convert to Legal 500
                                </button>
                              )}
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 group/item"
                              >
                                <Icon icon="solar:copy-linear" className="text-neutral-400 group-hover/item:text-neutral-900" />
                                Duplicate
                              </button>
                              <div className="h-px bg-neutral-100 my-1"></div>
                              <button
                                onClick={(e) => handleDelete(submission.id, e)}
                                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Icon icon="solar:trash-bin-trash-linear" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="border-t border-neutral-100 px-6 py-4 bg-neutral-50/50 flex justify-between items-center text-xs text-neutral-500">
            <span>
              Showing {filteredSubmissions.length} {viewMode === 'active' ? 'active' : ''} submission
              {filteredSubmissions.length !== 1 ? 's' : ''}
              {submissions.length !== filteredSubmissions.length && ` of ${submissions.length} total`}
            </span>
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

      {/* Footer: Sync Status */}
      <footer className="flex-none px-10 py-3 bg-white border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500">
        <div className="flex items-center gap-6">
          <span className="font-semibold uppercase tracking-wider text-neutral-400">Data Sources</span>

          <div className="flex items-center gap-2 group cursor-help" title="Foundation Legal">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>
              Foundation: <span className="text-neutral-700 font-medium">Connected</span>
            </span>
          </div>

          <div className="flex items-center gap-2 group cursor-help" title="Workday HRIS">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>
              HRIS: <span className="text-neutral-700 font-medium">Connected</span>
            </span>
          </div>

          <div className="flex items-center gap-2 group cursor-help" title="Attorney List Gen">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>
              ALG: <span className="text-neutral-700 font-medium">Syncing...</span>
            </span>
          </div>
        </div>
        <div>
          <span className="opacity-50">Last updated: Just now</span>
        </div>
      </footer>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-neutral-900/30 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Icon icon="solar:trash-bin-trash-bold" className="text-red-600" width={20} />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Delete Submission</h3>
                <p className="text-sm text-neutral-500">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mb-6">
              Are you sure you want to delete this submission? All data associated with it will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteConfirm)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
