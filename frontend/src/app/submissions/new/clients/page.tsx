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

interface Client {
  id: string;
  name: string;
  sector: string;
  isNew: boolean;
  isConfidential: boolean;
}

interface SuggestedClient {
  id: string;
  name: string;
  sector: string;
  billedAmount: string;
  hours: string;
}

export default function ClientsPage() {
  const [publishableClients, setPublishableClients] = useState<Client[]>([
    { id: '1', name: 'Poseidon Acquisition Corp.', sector: 'Energy & Infrastructure', isNew: false, isConfidential: false },
    { id: '2', name: 'Elliott Investment Management', sector: 'Financial Services', isNew: false, isConfidential: false },
    { id: '3', name: 'Atlas Corporation', sector: 'Transport & Logistics', isNew: false, isConfidential: false },
    { id: '4', name: 'Silver Lake Partners', sector: 'Technology', isNew: true, isConfidential: false },
  ]);

  const [confidentialClients, setConfidentialClients] = useState<Client[]>([
    { id: '5', name: '[Major UK Bank]', sector: 'Banking & Finance', isNew: false, isConfidential: true },
    { id: '6', name: '[Global Technology Company]', sector: 'Technology', isNew: true, isConfidential: true },
  ]);

  const [suggestedClients, setSuggestedClients] = useState<SuggestedClient[]>([
    { id: 's1', name: 'Blackstone Group', sector: 'Financial Services', billedAmount: '$4.2M', hours: '320 Hrs' },
    { id: 's2', name: 'KKR & Co. Inc.', sector: 'Private Equity', billedAmount: '$3.8M', hours: '280 Hrs' },
    { id: 's3', name: 'SoftBank Vision', sector: 'Technology', billedAmount: '$2.1M', hours: '150 Hrs' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientSector, setNewClientSector] = useState('');
  const [addToConfidential, setAddToConfidential] = useState(false);

  // Toggle isNew status for publishable clients
  const togglePublishableIsNew = (id: string) => {
    setPublishableClients(clients =>
      clients.map(c => c.id === id ? { ...c, isNew: !c.isNew } : c)
    );
  };

  // Toggle isNew status for confidential clients
  const toggleConfidentialIsNew = (id: string) => {
    setConfidentialClients(clients =>
      clients.map(c => c.id === id ? { ...c, isNew: !c.isNew } : c)
    );
  };

  // Delete from publishable
  const deletePublishable = (id: string) => {
    setPublishableClients(clients => clients.filter(c => c.id !== id));
  };

  // Delete from confidential
  const deleteConfidential = (id: string) => {
    setConfidentialClients(clients => clients.filter(c => c.id !== id));
  };

  // Move from publishable to confidential
  const moveToConfidential = (id: string) => {
    const client = publishableClients.find(c => c.id === id);
    if (client) {
      setPublishableClients(clients => clients.filter(c => c.id !== id));
      setConfidentialClients(clients => [...clients, { ...client, isConfidential: true, name: `[${client.name}]` }]);
    }
  };

  // Move from confidential to publishable
  const moveToPublishable = (id: string) => {
    const client = confidentialClients.find(c => c.id === id);
    if (client) {
      setConfidentialClients(clients => clients.filter(c => c.id !== id));
      setPublishableClients(clients => [...clients, { ...client, isConfidential: false, name: client.name.replace(/^\[|\]$/g, '') }]);
    }
  };

  // Add suggested client to D0 (publishable)
  const addSuggestedToPublishable = (suggested: SuggestedClient) => {
    const newClient: Client = {
      id: `new-${Date.now()}`,
      name: suggested.name,
      sector: suggested.sector,
      isNew: true,
      isConfidential: false,
    };
    setPublishableClients(clients => [...clients, newClient]);
    setSuggestedClients(clients => clients.filter(c => c.id !== suggested.id));
  };

  // Add suggested client to E0 (confidential)
  const addSuggestedToConfidential = (suggested: SuggestedClient) => {
    const newClient: Client = {
      id: `new-${Date.now()}`,
      name: `[${suggested.name}]`,
      sector: suggested.sector,
      isNew: true,
      isConfidential: true,
    };
    setConfidentialClients(clients => [...clients, newClient]);
    setSuggestedClients(clients => clients.filter(c => c.id !== suggested.id));
  };

  // Add manual client
  const addManualClient = () => {
    if (!newClientName.trim() || !newClientSector.trim()) return;

    const newClient: Client = {
      id: `manual-${Date.now()}`,
      name: addToConfidential ? `[${newClientName}]` : newClientName,
      sector: newClientSector,
      isNew: true,
      isConfidential: addToConfidential,
    };

    if (addToConfidential) {
      setConfidentialClients(clients => [...clients, newClient]);
    } else {
      setPublishableClients(clients => [...clients, newClient]);
    }

    setNewClientName('');
    setNewClientSector('');
    setAddToConfidential(false);
    setShowAddModal(false);
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
            <Stepper steps={steps} currentStep={5} />
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-8">
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
                Client Lists (Sections D0 & E0)
              </h2>
              <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
                Manage publishable and confidential clients. Drag to reorder or move between lists.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="group flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all shadow-sm">
                <Icon icon="solar:download-linear" className="text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                Import CSV
              </button>
              <button className="group flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all shadow-sm">
                <Icon icon="solar:graph-new-up-linear" className="text-neutral-400 group-hover:text-[#FF5E00] transition-colors" />
                Refresh Financials
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Lists */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* D0: Publishable Clients */}
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                      D0
                    </span>
                    <h3 className="font-medium text-sm text-neutral-900">Publishable Clients</h3>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 text-[10px] font-medium border border-neutral-200">
                      {publishableClients.length} / 20 max
                    </span>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="text-xs text-[#FF5E00] font-medium hover:text-[#d04d00] flex items-center gap-1"
                  >
                    <Icon icon="solar:add-circle-linear" />
                    Add Manual
                  </button>
                </div>

                {/* List */}
                <div className="divide-y divide-neutral-100">
                  {/* Header Row */}
                  <div className="grid grid-cols-12 px-5 py-2 bg-neutral-50/30 text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
                    <div className="col-span-6">Client Name / Sector</div>
                    <div className="col-span-3 text-center">New Client</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>

                  {publishableClients.map((client) => (
                    <div
                      key={client.id}
                      className={`grid grid-cols-12 px-5 py-3 items-center group hover:bg-neutral-50 transition-colors ${
                        client.isNew ? 'bg-orange-50/10' : ''
                      }`}
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="cursor-move text-neutral-300 hover:text-neutral-500 flex items-center">
                          <Icon icon="solar:drag-horizontal-matrix-linear" width={18} />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-neutral-900">{client.name}</span>
                            {client.isNew && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF5E00]/10 text-[#FF5E00] border border-[#FF5E00]/20">
                                New
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400">Sector: {client.sector}</span>
                        </div>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <button
                          onClick={() => togglePublishableIsNew(client.id)}
                          className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${
                            client.isNew ? 'bg-[#FF5E00]' : 'bg-neutral-200'
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                              client.isNew ? 'right-0.5' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="col-span-3 flex justify-end gap-1">
                        <button
                          onClick={() => moveToConfidential(client.id)}
                          className="p-1.5 text-neutral-400 hover:text-indigo-600 rounded hover:bg-indigo-50 transition-colors"
                          title="Move to Confidential"
                        >
                          <Icon icon="solar:eye-closed-linear" width={16} />
                        </button>
                        <button className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded hover:bg-neutral-100 transition-colors" title="Edit">
                          <Icon icon="solar:pen-linear" width={16} />
                        </button>
                        <button
                          onClick={() => deletePublishable(client.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Icon icon="solar:trash-bin-trash-linear" width={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* E0: Confidential Clients */}
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold">
                      E0
                    </span>
                    <h3 className="font-medium text-sm text-neutral-900">Confidential Clients</h3>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 text-[10px] font-medium border border-neutral-200">
                      {confidentialClients.length} / 20 max
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                    Internal Use Only
                  </span>
                </div>

                {/* List */}
                <div className="divide-y divide-neutral-100">
                  {/* Header Row */}
                  <div className="grid grid-cols-12 px-5 py-2 bg-neutral-50/30 text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
                    <div className="col-span-6">Client Name / Sector</div>
                    <div className="col-span-3 text-center">New Client</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>

                  {confidentialClients.map((client) => (
                    <div
                      key={client.id}
                      className="grid grid-cols-12 px-5 py-3 items-center group hover:bg-neutral-50 transition-colors"
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="cursor-move text-neutral-300 hover:text-neutral-500 flex items-center">
                          <Icon icon="solar:drag-horizontal-matrix-linear" width={18} />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <Icon icon="solar:shield-warning-linear" className="text-amber-500" />
                            <span className="text-sm font-medium text-neutral-600 italic">{client.name}</span>
                            {client.isNew && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF5E00]/10 text-[#FF5E00] border border-[#FF5E00]/20 not-italic">
                                New
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400">Sector: {client.sector}</span>
                        </div>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <button
                          onClick={() => toggleConfidentialIsNew(client.id)}
                          className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${
                            client.isNew ? 'bg-[#FF5E00]' : 'bg-neutral-200'
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                              client.isNew ? 'right-0.5' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="col-span-3 flex justify-end gap-1">
                        <button
                          onClick={() => moveToPublishable(client.id)}
                          className="p-1.5 text-neutral-400 hover:text-green-600 rounded hover:bg-green-50 transition-colors"
                          title="Make Public (Move to D0)"
                        >
                          <Icon icon="solar:eye-linear" width={16} />
                        </button>
                        <button className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded hover:bg-neutral-100 transition-colors" title="Edit">
                          <Icon icon="solar:pen-linear" width={16} />
                        </button>
                        <button
                          onClick={() => deleteConfidential(client.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Icon icon="solar:trash-bin-trash-linear" width={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Financial Intelligence */}
            <div className="lg:col-span-1 flex flex-col h-full">
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl border border-neutral-700 shadow-sm p-0 h-full relative overflow-hidden text-white">
                <div className="p-5 pb-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FF5E00] text-white flex items-center justify-center shadow-lg shadow-orange-900/50">
                      <Icon icon="solar:chart-square-linear" width={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Financial Intelligence</h3>
                      <p className="text-[10px] text-neutral-400">Top billed clients not in list</p>
                    </div>
                  </div>

                  <div className="text-[11px] text-neutral-400 mb-4 bg-white/5 p-2 rounded border border-white/10">
                    <p>Analysis of last 12 months billing data for key partners in this submission.</p>
                  </div>
                </div>

                {/* Client Suggestions List */}
                <div className="overflow-y-auto max-h-[300px] px-2 pb-2">
                  {suggestedClients.length === 0 && (
                    <div className="text-center py-8 px-4">
                      <Icon icon="solar:check-circle-bold" className="text-green-500 mx-auto mb-2" width={32} />
                      <p className="text-sm font-medium text-white">All caught up!</p>
                      <p className="text-xs text-neutral-400 mt-1">All suggested clients have been added.</p>
                    </div>
                  )}
                  {suggestedClients.map((client, index) => (
                    <div
                      key={client.id}
                      className={`p-3 hover:bg-white/5 rounded-lg transition-colors group ${
                        index > 0 ? 'border-t border-white/5' : ''
                      }`}
                    >
                      <div className="flex flex-col gap-1 mb-2">
                        <span className="text-sm font-medium text-white">{client.name}</span>
                        <span className="text-[10px] text-neutral-500">Sector: {client.sector}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-neutral-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Icon icon="solar:wallet-linear" />
                          {client.billedAmount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon icon="solar:clock-circle-linear" />
                          {client.hours}
                        </span>
                      </div>
                      <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => addSuggestedToPublishable(client)}
                          className="flex-1 py-1 text-[10px] font-medium bg-white/10 hover:bg-green-500/30 text-white rounded border border-white/10 hover:border-green-500/30 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Icon icon="solar:add-circle-linear" />
                          D0
                        </button>
                        <button
                          onClick={() => addSuggestedToConfidential(client)}
                          className="flex-1 py-1 text-[10px] font-medium bg-white/10 hover:bg-amber-500/30 text-white rounded border border-white/10 hover:border-amber-500/30 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Icon icon="solar:shield-plus-linear" />
                          E0
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto p-4 border-t border-white/10 bg-white/5">
                  <button className="w-full py-2 text-xs font-medium text-neutral-900 bg-white rounded hover:bg-neutral-100 transition-colors flex justify-center items-center gap-2">
                    <Icon icon="solar:filter-linear" />
                    Filter by Partner
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <Link
              href="/submissions/new/practice"
              className="px-6 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
            >
              <Icon icon="solar:arrow-left-linear" width={16} />
              Back to Practice
            </Link>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all shadow-sm">
                Save Draft
              </button>
              <Link
                href="/submissions/1"
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg shadow-sm shadow-orange-500/20 transition-all flex items-center gap-2 group"
              >
                <span>Finish & Submit</span>
                <Icon
                  icon="solar:check-circle-linear"
                  className="group-hover:translate-x-0.5 transition-transform"
                  width={16}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add Manual Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-neutral-900/30 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF5E00]/10 flex items-center justify-center">
                  <Icon icon="solar:add-circle-bold" className="text-[#FF5E00]" width={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Add New Client</h3>
                  <p className="text-xs text-neutral-500">Manually add a client to the list</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <Icon icon="solar:close-circle-linear" width={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Enter client name"
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                  Sector
                </label>
                <select
                  value={newClientSector}
                  onChange={(e) => setNewClientSector(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00]/20 bg-white"
                >
                  <option value="">Select a sector</option>
                  <option value="Banking & Finance">Banking & Finance</option>
                  <option value="Energy & Infrastructure">Energy & Infrastructure</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Private Equity">Private Equity</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Technology">Technology</option>
                  <option value="Transport & Logistics">Transport & Logistics</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setAddToConfidential(!addToConfidential)}
                  className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${
                    addToConfidential ? 'bg-amber-500' : 'bg-neutral-200'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                      addToConfidential ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
                <label className="text-sm text-neutral-600">Add as confidential client (E0)</label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100 bg-neutral-50/50">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addManualClient}
                disabled={!newClientName.trim() || !newClientSector}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
