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

const practiceAreas = [
  'Corporate M&A',
  'Tax',
  'Real Estate',
  'Private Equity',
  'Antitrust',
  'Banking & Finance',
  'Litigation',
];

const jurisdictions = [
  'UK',
  'Global',
  'USA - Nationwide',
  'USA - New York',
  'USA - California',
  'Germany',
  'Hong Kong',
];

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function NewSubmissionBasics() {
  const [directory, setDirectory] = useState<'chambers' | 'legal500'>('chambers');
  const [practiceArea, setPracticeArea] = useState(practiceAreas[0]);
  const [jurisdiction, setJurisdiction] = useState('UK');
  const [autoFillEnabled, setAutoFillEnabled] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Mark Chen', email: 'mark.chen@gibsondunn.com', phone: '+44 20 7071 4000' },
    { id: '2', name: 'Joe Martinez', email: 'joe.martinez@gibsondunn.com', phone: '+44 20 7071 4001' },
  ]);

  const removeContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      { id: Date.now().toString(), name: '', email: '', phone: '' },
    ]);
  };

  return (
    <main className="flex-1 min-w-0 flex flex-col relative z-10 h-full overflow-hidden bg-neutral-50/30">
      {/* Header */}
      <header className="flex-none px-10 py-8 border-b border-neutral-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
              New Submission
            </h1>
            <p className="text-sm text-neutral-500">Section A: Basic Information</p>
          </div>
        </div>
      </header>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Card 1: Submission Basics */}
          <div className="overflow-hidden bg-white border-neutral-200 border rounded-xl p-6 relative shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
                  <Icon icon="solar:folder-with-files-bold" className="text-[#FF5E00]" />
                  Submission Context
                </h2>
                <p className="text-xs text-neutral-400">
                  Define the target directory and region.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-500">Auto-fill enabled</span>
                <button
                  onClick={() => setAutoFillEnabled(!autoFillEnabled)}
                  className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${
                    autoFillEnabled ? 'bg-[#FF5E00]' : 'bg-neutral-200'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                      autoFillEnabled ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {/* Directory Selection */}
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                  Directory
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      directory === 'chambers'
                        ? 'border-[#FF5E00] bg-[#FF5E00]/5 ring-1 ring-[#FF5E00]'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="directory"
                      value="chambers"
                      className="sr-only"
                      checked={directory === 'chambers'}
                      onChange={() => setDirectory('chambers')}
                    />
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#FF5E00] flex items-center justify-center shrink-0 border border-orange-200/50 font-serif font-bold text-lg">
                      C
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-neutral-900 text-sm">Chambers</span>
                      <span className="text-xs text-neutral-500">Global / Regional</span>
                    </div>
                    {directory === 'chambers' && (
                      <div className="absolute top-3 right-3 text-[#FF5E00]">
                        <Icon icon="solar:check-circle-bold" width={18} />
                      </div>
                    )}
                  </label>
                  <label
                    className={`relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      directory === 'legal500'
                        ? 'border-[#FF5E00] bg-[#FF5E00]/5 ring-1 ring-[#FF5E00]'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="directory"
                      value="legal500"
                      className="sr-only"
                      checked={directory === 'legal500'}
                      onChange={() => setDirectory('legal500')}
                    />
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 font-serif font-bold text-lg">
                      L5
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-neutral-900 text-sm">Legal 500</span>
                      <span className="text-xs text-neutral-500">Global / Regional</span>
                    </div>
                    {directory === 'legal500' && (
                      <div className="absolute top-3 right-3 text-[#FF5E00]">
                        <Icon icon="solar:check-circle-bold" width={18} />
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Practice Area */}
                <div>
                  <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                    Practice Area
                  </label>
                  <div className="relative">
                    <select
                      value={practiceArea}
                      onChange={(e) => setPracticeArea(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00]/20 appearance-none shadow-sm"
                    >
                      {practiceAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-neutral-500">
                      <Icon icon="solar:alt-arrow-down-linear" width={16} />
                    </div>
                  </div>
                </div>

                {/* Jurisdiction */}
                <div>
                  <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                    Jurisdiction
                  </label>
                  <div className="relative">
                    <select
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00]/20 appearance-none shadow-sm"
                    >
                      {jurisdictions.map((j) => (
                        <option key={j} value={j}>
                          {j}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-neutral-500">
                      <Icon icon="solar:alt-arrow-down-linear" width={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Contact Information */}
          <div className="bg-white border-neutral-200 border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
                  <Icon icon="solar:users-group-rounded-bold" className="text-blue-500" />
                  Contact Persons for Interviews
                </h2>
                <p className="text-xs text-neutral-400">Heads of department or key contacts.</p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                <Icon icon="solar:magic-stick-3-linear" width={14} />
                Defaults loaded for {jurisdiction}
              </span>
            </div>

            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="grid grid-cols-12 gap-3 items-end p-4 rounded-lg border border-neutral-100 bg-neutral-50/50 group"
                >
                  <div className="col-span-4">
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={contact.name}
                        placeholder="Search HRIS..."
                        onChange={(e) => {
                          setContacts(
                            contacts.map((c) =>
                              c.id === contact.id ? { ...c, name: e.target.value } : c
                            )
                          );
                        }}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 shadow-sm transition-all placeholder:text-neutral-400"
                      />
                      <div className="absolute left-2.5 top-2.5 text-neutral-400 pointer-events-none">
                        <Icon icon="solar:magnifer-linear" width={16} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      readOnly
                      className="w-full px-3 py-2 bg-neutral-100/50 border border-neutral-200 rounded-lg text-sm text-neutral-600 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={contact.phone}
                      readOnly
                      className="w-full px-3 py-2 bg-neutral-100/50 border border-neutral-200 rounded-lg text-sm text-neutral-600 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                  <div className="col-span-1 flex justify-end pb-2">
                    <button
                      onClick={() => removeContact(contact.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                      title="Remove Contact"
                    >
                      <Icon icon="solar:trash-bin-trash-linear" width={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Button */}
            <button
              onClick={addContact}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all border border-transparent hover:border-blue-100 border-dashed"
            >
              <Icon icon="solar:add-circle-linear" width={18} />
              <span>Add another contact</span>
            </button>
          </div>

          {/* Import Section */}
          <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-neutral-300 hover:bg-neutral-50/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-neutral-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Icon
                icon="solar:import-linear"
                className="text-neutral-400 group-hover:text-[#FF5E00] transition-colors"
                width={24}
              />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Import from previous submission
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm">
              Upload last year&apos;s PDF or Word document to automatically pre-fill practice area
              descriptions and statistics.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 pb-12">
            <button className="px-6 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Save as Draft
            </button>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-6 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all shadow-sm"
              >
                Cancel
              </Link>
              <Link
                href="/submissions/new/department"
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg shadow-sm shadow-orange-500/20 transition-all flex items-center gap-2 group"
              >
                <span>Continue to Department Info</span>
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
