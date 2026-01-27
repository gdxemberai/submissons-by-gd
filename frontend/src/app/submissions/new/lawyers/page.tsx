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

interface Lawyer {
  id: string;
  name: string;
  role: string;
  ranking: string;
  yearsOfExp: number;
  bio: string;
  onLeave: boolean;
  bioStatus: 'complete' | 'needs_review' | 'draft';
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-purple-100 text-purple-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
    'bg-cyan-100 text-cyan-700',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const initialLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Sandy Bhogal',
    role: 'Partner',
    ranking: 'Band 1',
    yearsOfExp: 18,
    bio: 'Sandy Bhogal is a partner in the firm\'s London office and is a member of the Mergers and Acquisitions practice group...',
    onLeave: false,
    bioStatus: 'complete',
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    role: 'Partner',
    ranking: 'Band 2',
    yearsOfExp: 15,
    bio: '',
    onLeave: false,
    bioStatus: 'needs_review',
  },
  {
    id: '3',
    name: 'Jennifer Chen',
    role: 'Partner',
    ranking: 'Up & Coming',
    yearsOfExp: 9,
    bio: 'Jennifer Chen advises clients on complex cross-border...',
    onLeave: false,
    bioStatus: 'draft',
  },
  {
    id: '4',
    name: 'Robert Williams',
    role: 'Partner',
    ranking: 'Band 2',
    yearsOfExp: 12,
    bio: '',
    onLeave: true,
    bioStatus: 'needs_review',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    role: 'Associate',
    ranking: 'None',
    yearsOfExp: 5,
    bio: 'Lisa Anderson focuses on public and private M&A transactions...',
    onLeave: false,
    bioStatus: 'complete',
  },
  {
    id: '6',
    name: 'David Park',
    role: 'Associate',
    ranking: 'None',
    yearsOfExp: 3,
    bio: '',
    onLeave: false,
    bioStatus: 'draft',
  },
];

export default function LawyerInfo() {
  const [lawyers, setLawyers] = useState(initialLawyers);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [showBioModal, setShowBioModal] = useState(false);

  const getRankingBadge = (ranking: string) => {
    switch (ranking) {
      case 'Band 1':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Band 2':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Up & Coming':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-neutral-100 text-neutral-500 border-neutral-200';
    }
  };

  const getBioStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700 border border-green-100">
            <Icon icon="solar:check-circle-bold" width={10} />
            Complete
          </span>
        );
      case 'needs_review':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
            <Icon icon="solar:danger-circle-bold" width={10} />
            Needs Review
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
            <Icon icon="solar:document-text-linear" width={10} />
            Draft
          </span>
        );
    }
  };

  const openBioModal = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setShowBioModal(true);
  };

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
            <Stepper steps={steps} currentStep={3} />
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-8">
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
                Lawyer Selection & Bios
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Select which lawyers to include in your submission. Manage their bios and individual
                rankings.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="group flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all shadow-sm">
                <Icon
                  icon="solar:magic-stick-3-linear"
                  className="text-neutral-400 group-hover:text-indigo-500 transition-colors"
                />
                Generate All Bios with AI
              </button>
              <button className="group flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all shadow-sm">
                <Icon
                  icon="solar:filter-linear"
                  className="text-neutral-400 group-hover:text-neutral-900 transition-colors"
                />
                Filter
              </button>
            </div>
          </div>

          {/* Lawyer Table */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/70 border-b border-neutral-200 text-xs text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-neutral-300 text-[#FF5E00] focus:ring-[#FF5E00] cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-4 font-semibold">Lawyer</th>
                  <th className="py-3 px-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">Last Ranking</th>
                  <th className="py-3 px-4 font-semibold text-center">YoE</th>
                  <th className="py-3 px-4 font-semibold">Bio Status</th>
                  <th className="py-3 px-4 font-semibold text-center">Leave</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {lawyers.map((lawyer) => (
                  <tr
                    key={lawyer.id}
                    className={`group hover:bg-neutral-50 transition-colors ${
                      lawyer.onLeave ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        defaultChecked={!lawyer.onLeave}
                        className="w-4 h-4 rounded border-neutral-300 text-[#FF5E00] focus:ring-[#FF5E00] cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${getAvatarColor(lawyer.name)}`}>
                          {getInitials(lawyer.name)}
                        </div>
                        <span className="text-sm font-medium text-neutral-900">{lawyer.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-neutral-600">{lawyer.role}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${getRankingBadge(
                          lawyer.ranking
                        )}`}
                      >
                        {lawyer.ranking}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-neutral-500 text-center">
                      {lawyer.yearsOfExp}
                    </td>
                    <td className="py-3 px-4">{getBioStatusBadge(lawyer.bioStatus)}</td>
                    <td className="py-3 px-4 text-center">
                      {lawyer.onLeave ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-800 border border-amber-200">
                          <Icon icon="solar:shield-warning-linear" width={10} />
                          Leave
                        </span>
                      ) : (
                        <span className="text-neutral-300">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openBioModal(lawyer)}
                          className="p-1.5 text-neutral-400 hover:text-[#FF5E00] hover:bg-[#FF5E00]/10 rounded transition-colors"
                          title="Edit Bio"
                        >
                          <Icon icon="solar:pen-linear" width={16} />
                        </button>
                        <button
                          className="p-1.5 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          title="Generate Bio with AI"
                        >
                          <Icon icon="solar:magic-stick-3-linear" width={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer */}
            <div className="px-4 py-3 bg-neutral-50/50 border-t border-neutral-100 flex justify-between items-center">
              <span className="text-xs text-neutral-500">
                {lawyers.filter((l) => !l.onLeave).length} of {lawyers.length} lawyers selected
              </span>
              <button className="text-xs text-[#FF5E00] font-medium hover:text-[#e55500] transition-colors flex items-center gap-1">
                <Icon icon="solar:add-circle-linear" />
                Add Lawyer
              </button>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <Link
              href="/submissions/new/department"
              className="px-6 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
            >
              <Icon icon="solar:arrow-left-linear" width={16} />
              Back to Department Info
            </Link>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all shadow-sm">
                Save Draft
              </button>
              <Link
                href="/submissions/new/practice"
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg shadow-sm shadow-orange-500/20 transition-all flex items-center gap-2 group"
              >
                <span>Continue to Practice</span>
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

      {/* Bio Modal */}
      {showBioModal && selectedLawyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-neutral-900/30 backdrop-blur-sm"
            onClick={() => setShowBioModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${getAvatarColor(selectedLawyer.name)}`}>
                  {getInitials(selectedLawyer.name)}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{selectedLawyer.name}</h3>
                  <p className="text-xs text-neutral-500">{selectedLawyer.role}</p>
                </div>
              </div>
              <button
                onClick={() => setShowBioModal(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <Icon icon="solar:close-circle-linear" width={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                Bio (Section B9)
              </label>
              <textarea
                className="w-full h-48 px-4 py-3 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00]/20 resize-none"
                placeholder="Enter lawyer bio..."
                defaultValue={selectedLawyer.bio}
              />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  {selectedLawyer.bio.split(' ').length} / 150 words
                </span>
                <button className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                  <Icon icon="solar:magic-stick-3-linear" />
                  Generate with AI
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100 bg-neutral-50/50">
              <button
                onClick={() => setShowBioModal(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowBioModal(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg transition-colors"
              >
                Save Bio
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
