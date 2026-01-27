'use client';

import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

interface DataSource {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync?: string;
  icon: string;
  color: string;
}

const dataSources: DataSource[] = [
  {
    id: 'foundation',
    name: 'Foundation Legal',
    description: 'Matter and client data integration',
    status: 'connected',
    lastSync: '2 minutes ago',
    icon: 'solar:database-bold',
    color: 'orange',
  },
  {
    id: 'hris',
    name: 'Workday HRIS',
    description: 'Attorney and staff directory',
    status: 'connected',
    lastSync: '5 minutes ago',
    icon: 'solar:users-group-rounded-bold',
    color: 'blue',
  },
  {
    id: 'alg',
    name: 'Attorney List Gen',
    description: 'Automated attorney list generation',
    status: 'syncing',
    lastSync: 'Syncing now...',
    icon: 'solar:document-text-bold',
    color: 'purple',
  },
];

const navItems = [
  { id: 'data-sources', label: 'Data Sources', icon: 'solar:server-bold' },
  { id: 'ai-drafting', label: 'AI Drafting', icon: 'solar:magic-stick-3-bold' },
  { id: 'notifications', label: 'Notifications', icon: 'solar:bell-bold' },
  { id: 'export', label: 'Export Settings', icon: 'solar:export-bold' },
  { id: 'danger', label: 'Danger Zone', icon: 'solar:danger-triangle-bold' },
];

export default function ConfigPage() {
  const [sources, setSources] = useState(dataSources);
  const [aiModel, setAiModel] = useState('claude-sonnet');
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [smartSuggestions, setSmartSuggestions] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [reminderDays, setReminderDays] = useState('7');
  const [defaultExportFormat, setDefaultExportFormat] = useState('pdf');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [watermark, setWatermark] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [activeSection, setActiveSection] = useState('data-sources');

  const sectionRefs = {
    'data-sources': useRef<HTMLElement>(null),
    'ai-drafting': useRef<HTMLElement>(null),
    'notifications': useRef<HTMLElement>(null),
    'export': useRef<HTMLElement>(null),
    'danger': useRef<HTMLElement>(null),
  };

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    sectionRefs[id as keyof typeof sectionRefs].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getStatusBadge = (status: DataSource['status']) => {
    switch (status) {
      case 'connected':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border border-emerald-200/60 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Connected
          </span>
        );
      case 'disconnected':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-500 border border-neutral-200/60">
            <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
            Disconnected
          </span>
        );
      case 'syncing':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 border border-blue-200/60 shadow-sm">
            <Icon icon="solar:refresh-bold" className="animate-spin" width={12} />
            Syncing
          </span>
        );
    }
  };

  const getSourceIconColor = (color: string) => {
    switch (color) {
      case 'orange': return 'bg-gradient-to-br from-orange-100 to-orange-50 text-[#FF5E00] border-orange-200/60';
      case 'blue': return 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 border-blue-200/60';
      case 'purple': return 'bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 border-purple-200/60';
      default: return 'bg-neutral-100 text-neutral-600 border-neutral-200/60';
    }
  };

  const toggleConnection = (id: string) => {
    setSources(sources.map(source => {
      if (source.id === id) {
        return {
          ...source,
          status: source.status === 'connected' ? 'disconnected' : 'connected',
          lastSync: source.status === 'connected' ? undefined : 'Just now',
        };
      }
      return source;
    }));
  };

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
        enabled
          ? 'bg-gradient-to-r from-[#FF5E00] to-[#ff7b33] shadow-lg shadow-orange-500/25'
          : 'bg-neutral-200 hover:bg-neutral-300'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <main className="flex-1 min-w-0 flex flex-col relative z-10 h-full overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-orange-50/20">
      {/* Header */}
      <header className="flex-none px-10 py-6 border-b border-neutral-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF5E00] to-[#ff7b33] flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Icon icon="solar:settings-bold" className="text-white" width={24} />
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Configuration
              </h1>
              <p className="text-sm text-neutral-500">
                Manage data sources, AI settings, and application preferences
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#FF5E00] to-[#ff7b33] hover:from-[#e55500] hover:to-[#ff6a1a] rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Icon icon="solar:diskette-bold" width={18} />
            <span>Save Changes</span>
          </button>
        </div>
      </header>

      {/* Success Toast */}
      {savedMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-white border border-emerald-200 rounded-2xl shadow-2xl shadow-emerald-500/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
            <Icon icon="solar:check-circle-bold" className="text-emerald-600" width={22} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Settings saved</p>
            <p className="text-xs text-neutral-500">Your changes have been applied</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-56 flex-none border-r border-neutral-200/60 bg-white/50 backdrop-blur-sm py-6 px-4 overflow-y-auto no-scrollbar">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-[#FF5E00]/10 to-orange-50 text-[#FF5E00] shadow-sm border border-orange-200/50'
                    : 'text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900'
                }`}
              >
                <Icon icon={item.icon} width={18} className={activeSection === item.id ? 'text-[#FF5E00]' : ''} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-8">
          <div className="max-w-3xl space-y-8">

            {/* Data Sources Section */}
            <section ref={sectionRefs['data-sources']} className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E00]/20 to-orange-100 flex items-center justify-center shadow-sm">
                  <Icon icon="solar:server-bold" className="text-[#FF5E00]" width={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Data Sources</h2>
                  <p className="text-sm text-neutral-500">Connect and manage external data integrations</p>
                </div>
              </div>

              <div className="space-y-4">
                {sources.map((source) => (
                  <div
                    key={source.id}
                    className="group bg-white rounded-2xl border border-neutral-200/60 p-5 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${getSourceIconColor(source.color)}`}>
                          <Icon icon={source.icon} width={22} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-[#FF5E00] transition-colors">{source.name}</h3>
                          <p className="text-xs text-neutral-500 mt-0.5">{source.description}</p>
                          {source.lastSync && (
                            <div className="flex items-center gap-1.5 mt-2">
                              <Icon icon="solar:clock-circle-linear" width={12} className="text-neutral-400" />
                              <p className="text-[11px] text-neutral-400">Last sync: {source.lastSync}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(source.status)}
                        <button
                          onClick={() => toggleConnection(source.id)}
                          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                            source.status === 'connected'
                              ? 'text-neutral-600 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-sm'
                              : 'text-white bg-gradient-to-r from-[#FF5E00] to-[#ff7b33] border-transparent shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30'
                          }`}
                        >
                          {source.status === 'connected' ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Settings Section */}
            <section ref={sectionRefs['ai-drafting']} className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-200 to-purple-100 flex items-center justify-center shadow-sm">
                  <Icon icon="solar:magic-stick-3-bold" className="text-purple-600" width={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">AI Drafting</h2>
                  <p className="text-sm text-neutral-500">Configure AI-powered content generation</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden shadow-sm">
                <div className="p-6 space-y-6">
                  {/* Model Selection */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Icon icon="solar:cpu-bolt-bold" className="text-purple-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">AI Model</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Select the model for content generation</p>
                      </div>
                    </div>
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="px-4 py-2.5 text-sm font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-[#FF5E00] focus:ring-2 focus:ring-[#FF5E00]/10 transition-all cursor-pointer hover:bg-neutral-100"
                    >
                      <option value="gpt-4">GPT-4 Turbo</option>
                      <option value="gpt-3.5">GPT-3.5 Turbo</option>
                      <option value="claude-3">Claude 3 Opus</option>
                      <option value="claude-sonnet">Claude 3.5 Sonnet</option>
                    </select>
                  </div>

                  <div className="h-px bg-neutral-100"></div>

                  {/* Auto Generate Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Icon icon="solar:magic-stick-2-bold" className="text-purple-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">Auto-generate Drafts</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Automatically create initial drafts for new submissions</p>
                      </div>
                    </div>
                    <Toggle enabled={autoGenerate} onChange={() => setAutoGenerate(!autoGenerate)} />
                  </div>

                  <div className="h-px bg-neutral-100"></div>

                  {/* Smart Suggestions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Icon icon="solar:lightbulb-bolt-bold" className="text-purple-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">Smart Suggestions</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Get AI-powered writing suggestions while editing</p>
                      </div>
                    </div>
                    <Toggle enabled={smartSuggestions} onChange={() => setSmartSuggestions(!smartSuggestions)} />
                  </div>
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section ref={sectionRefs['notifications']} className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center shadow-sm">
                  <Icon icon="solar:bell-bold" className="text-blue-600" width={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Notifications</h2>
                  <p className="text-sm text-neutral-500">Manage how you receive updates and reminders</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden shadow-sm">
                <div className="p-6 space-y-6">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Icon icon="solar:letter-bold" className="text-blue-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">Email Notifications</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Receive email updates for submission changes</p>
                      </div>
                    </div>
                    <Toggle enabled={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                  </div>

                  <div className="h-px bg-neutral-100"></div>

                  {/* Deadline Reminders */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Icon icon="solar:alarm-bold" className="text-blue-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">Deadline Reminders</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Get notified before submission deadlines</p>
                      </div>
                    </div>
                    <Toggle enabled={deadlineReminders} onChange={() => setDeadlineReminders(!deadlineReminders)} />
                  </div>

                  {/* Reminder Days */}
                  {deadlineReminders && (
                    <>
                      <div className="h-px bg-neutral-100"></div>
                      <div className="flex items-center justify-between ml-12 pl-3 border-l-2 border-blue-200">
                        <div>
                          <label className="text-sm font-medium text-neutral-700">Reminder Lead Time</label>
                          <p className="text-xs text-neutral-500 mt-0.5">Days before deadline to send reminder</p>
                        </div>
                        <select
                          value={reminderDays}
                          onChange={(e) => setReminderDays(e.target.value)}
                          className="px-4 py-2.5 text-sm font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-[#FF5E00] focus:ring-2 focus:ring-[#FF5E00]/10 transition-all cursor-pointer hover:bg-neutral-100"
                        >
                          <option value="3">3 days</option>
                          <option value="7">7 days</option>
                          <option value="14">14 days</option>
                          <option value="30">30 days</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Export Settings Section */}
            <section ref={sectionRefs['export']} className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center shadow-sm">
                  <Icon icon="solar:export-bold" className="text-amber-600" width={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Export Settings</h2>
                  <p className="text-sm text-neutral-500">Configure default export options</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden shadow-sm">
                <div className="p-6 space-y-6">
                  {/* Default Format */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Icon icon="solar:file-bold" className="text-amber-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">Default Export Format</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Choose the default file format for exports</p>
                      </div>
                    </div>
                    <div className="flex gap-2 bg-neutral-100 p-1 rounded-xl">
                      {[
                        { value: 'pdf', icon: 'solar:document-bold' },
                        { value: 'docx', icon: 'solar:document-text-bold' },
                        { value: 'html', icon: 'solar:code-bold' }
                      ].map((format) => (
                        <button
                          key={format.value}
                          onClick={() => setDefaultExportFormat(format.value)}
                          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all uppercase ${
                            defaultExportFormat === format.value
                              ? 'bg-white text-[#FF5E00] shadow-sm'
                              : 'text-neutral-500 hover:text-neutral-700'
                          }`}
                        >
                          <Icon icon={format.icon} width={14} />
                          {format.value}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-neutral-100"></div>

                  {/* Include Metadata */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Icon icon="solar:tag-bold" className="text-amber-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">Include Metadata</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Add submission details and timestamps to exports</p>
                      </div>
                    </div>
                    <Toggle enabled={includeMetadata} onChange={() => setIncludeMetadata(!includeMetadata)} />
                  </div>

                  <div className="h-px bg-neutral-100"></div>

                  {/* Watermark */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Icon icon="solar:shield-check-bold" className="text-amber-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">Draft Watermark</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Add &quot;DRAFT&quot; watermark to exported documents</p>
                      </div>
                    </div>
                    <Toggle enabled={watermark} onChange={() => setWatermark(!watermark)} />
                  </div>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section ref={sectionRefs['danger']} className="scroll-mt-8 pb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-200 to-red-100 flex items-center justify-center shadow-sm">
                  <Icon icon="solar:danger-triangle-bold" className="text-red-600" width={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-red-900">Danger Zone</h2>
                  <p className="text-sm text-red-500">Irreversible actions that affect your data</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-200/60 overflow-hidden">
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
                        <Icon icon="solar:eraser-bold" className="text-red-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">Clear All Drafts</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Permanently delete all draft submissions</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all">
                      Clear Drafts
                    </button>
                  </div>

                  <div className="h-px bg-red-100"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
                        <Icon icon="solar:refresh-bold" className="text-red-500" width={18} />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-neutral-900">Reset All Settings</label>
                        <p className="text-xs text-neutral-500 mt-0.5">Restore all configuration to default values</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all">
                      Reset Settings
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex-none px-10 py-3 bg-white/80 backdrop-blur-sm border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-500">
        <div className="flex items-center gap-2">
          <Icon icon="solar:info-circle-linear" width={14} />
          <span>Changes are saved when you click Save Changes</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="opacity-60">Version 1.0.0</span>
        </div>
      </footer>
    </main>
  );
}
