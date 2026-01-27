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

interface HireOrDeparture {
  id: string;
  name: string;
  type: 'joined' | 'departed';
  firmName: string;
}

export default function DepartmentInfo() {
  const [departmentName, setDepartmentName] = useState('Mergers and Acquisitions');
  const [headOfDept, setHeadOfDept] = useState({
    name: 'Michael Gove',
    email: 'michael.gove@gibsondunn.com',
    phone: '+1 212 351 4000',
  });
  const [hiresAndDepartures, setHiresAndDepartures] = useState<HireOrDeparture[]>([
    { id: '1', name: 'Sarah Thompson', type: 'joined', firmName: 'Clifford Chance' },
    { id: '2', name: 'David Miller', type: 'departed', firmName: 'Latham & Watkins' },
  ]);

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
            <Stepper steps={steps} currentStep={2} />
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-8">
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
              Department Details
            </h2>
            <span className="text-xs text-neutral-500 bg-white px-2 py-1 rounded border border-neutral-100">
              Section B: B1-B8
            </span>
          </div>

          {/* Card 1: Name & Statistics */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-6">
            {/* Department Name */}
            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                Department Name (B1)
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-900 focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00]/20 shadow-sm transition-all"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors">
                    External Facing
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px bg-neutral-100 w-full"></div>

            {/* Headcount Stats */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Headcount (B2, B3)
                  </label>
                  <span className="text-[10px] text-neutral-400 mt-0.5">
                    Aggregated from multiple offices
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-medium text-[#FF5E00] bg-[#FF5E00]/5 hover:bg-[#FF5E00]/10 border border-[#FF5E00]/10 px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 group">
                    <Icon icon="solar:pen-new-square-linear" width={12} />
                    Adjust Counts
                  </button>
                  <div className="h-4 w-px bg-neutral-200"></div>
                  <div
                    className="flex items-center gap-1.5 text-[10px] text-neutral-400"
                    title="Synced just now"
                  >
                    <Icon icon="solar:cloud-check-linear" />
                    <span>Synced</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Partners */}
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/50 relative group">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-neutral-500 font-medium">Partners</span>
                    <Icon
                      icon="solar:pen-linear"
                      className="text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-[#FF5E00]"
                    />
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-semibold text-neutral-900">4</span>
                  </div>

                  {/* Multi-Office Aggregation Breakdown */}
                  <div className="mt-3 pt-3 border-t border-neutral-200/50 space-y-1">
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Munich</span>
                      <span className="font-medium text-neutral-700">2</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Frankfurt</span>
                      <span className="font-medium text-neutral-700">2</span>
                    </div>
                  </div>

                  <div className="mt-3 flex -space-x-2 overflow-hidden py-1">
                    {['S', 'J', 'B', 'B'].map((initial, i) => (
                      <span
                        key={i}
                        className="inline-block h-6 w-6 rounded-full bg-neutral-200 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-neutral-600"
                      >
                        {initial}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Other Lawyers */}
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/50 relative group">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-neutral-500 font-medium">Other Lawyers</span>
                    <Icon
                      icon="solar:pen-linear"
                      className="text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-[#FF5E00]"
                    />
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-semibold text-neutral-900">8</span>
                  </div>

                  {/* Multi-Office Aggregation Breakdown */}
                  <div className="mt-3 pt-3 border-t border-neutral-200/50 space-y-1">
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Munich</span>
                      <span className="font-medium text-neutral-700">5</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Frankfurt</span>
                      <span className="font-medium text-neutral-700">3</span>
                    </div>
                  </div>
                  <div className="mt-3 text-[10px] text-neutral-400 leading-tight">
                    Includes Associates, Counsel, and Senior Counsel.
                  </div>
                </div>
              </div>

              {/* Helper text */}
              <p className="mt-3 text-xs text-neutral-400 flex items-center gap-1.5">
                <Icon icon="solar:info-circle-linear" className="text-neutral-400" />
                Counts are editable if team needs to add people &quot;on the fringes.&quot;
              </p>
            </div>
          </div>

          {/* Card 2: Head of Department */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Head(s) of Department (B4)
              </label>
              <button className="text-xs font-medium text-[#FF5E00] hover:text-[#e55500] flex items-center gap-1 transition-colors">
                <Icon icon="solar:add-circle-linear" width={14} />
                Add another head
              </button>
            </div>

            {/* Head Entry with Warning */}
            <div className="flex flex-col gap-4 border border-amber-200 bg-amber-50/30 rounded-lg p-4 relative group transition-all">
              {/* Remove Button */}
              <button className="absolute top-3 right-3 text-neutral-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                <Icon icon="solar:trash-bin-trash-linear" width={16} />
              </button>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <label className="text-[10px] uppercase font-bold text-neutral-400 mb-1 block">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                      <Icon icon="solar:user-circle-linear" width={16} />
                    </div>
                    <input
                      type="text"
                      value={headOfDept.name}
                      onChange={(e) => setHeadOfDept({ ...headOfDept, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-[#FF5E00] transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <label className="text-[10px] uppercase font-bold text-neutral-400 mb-1 block">
                    Email
                  </label>
                  <input
                    type="text"
                    value={headOfDept.email}
                    readOnly
                    className="w-full px-3 py-2 bg-neutral-50 border border-transparent rounded text-sm text-neutral-600 focus:outline-none cursor-default truncate"
                  />
                </div>
                <div className="col-span-6">
                  <label className="text-[10px] uppercase font-bold text-neutral-400 mb-1 block">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={headOfDept.phone}
                    readOnly
                    className="w-full px-3 py-2 bg-neutral-50 border border-transparent rounded text-sm text-neutral-600 focus:outline-none cursor-default"
                  />
                </div>

                {/* Jurisdiction Warning */}
                <div className="col-span-12">
                  <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-md p-2">
                    <Icon icon="solar:danger-triangle-linear" className="mt-0.5 shrink-0" />
                    <p>
                      <span className="font-semibold">Jurisdiction Warning:</span> This person is
                      based in{' '}
                      <span className="font-medium underline decoration-amber-300/50">New York</span>
                      , but this submission is for <span className="font-medium">Germany</span>.
                      Please confirm this is intentional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Hires & Departures */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/30">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  Partner Hires & Departures (B8)
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Partner-level moves in the last 12 months.
                </p>
              </div>
              <button className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all shadow-sm flex items-center gap-1.5">
                <Icon icon="solar:add-circle-linear" />
                Add Entry
              </button>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 text-xs text-neutral-500 uppercase tracking-wider">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">From / To Firm</th>
                  <th className="px-6 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {hiresAndDepartures.map((entry) => (
                  <tr
                    key={entry.id}
                    className="group hover:bg-neutral-50/50 transition-colors border-b border-neutral-50 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-neutral-900">{entry.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${
                          entry.type === 'joined'
                            ? 'bg-green-50 text-green-700 border-green-100'
                            : 'bg-red-50 text-red-700 border-red-100'
                        }`}
                      >
                        <Icon
                          icon={
                            entry.type === 'joined'
                              ? 'solar:import-linear'
                              : 'solar:export-linear'
                          }
                          width={12}
                        />
                        {entry.type === 'joined' ? 'Joined' : 'Departed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider mr-1">
                        {entry.type === 'joined' ? 'From' : 'To'}
                      </span>
                      {entry.firmName}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-neutral-400 hover:text-neutral-900 transition-colors">
                        <Icon icon="solar:pen-linear" width={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center justify-between pt-4">
            <Link
              href="/submissions/new"
              className="px-6 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
            >
              <Icon icon="solar:arrow-left-linear" width={16} />
              Back to Basics
            </Link>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all shadow-sm">
                Save Draft
              </button>
              <Link
                href="/submissions/new/lawyers"
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg shadow-sm shadow-orange-500/20 transition-all flex items-center gap-2 group"
              >
                <span>Continue to Lawyer Info</span>
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
