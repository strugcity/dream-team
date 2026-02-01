'use client'

import { useState } from 'react'
import { LayoutGrid, ListTodo, Activity, Settings, Sun, Moon } from 'lucide-react'
import AgentPulse from '@/components/AgentPulse'
import OrchestrationStatus from '@/components/OrchestrationStatus'
import TaskBoard from '@/components/TaskBoard'
import LiveLog from '@/components/LiveLog'

type Tab = 'overview' | 'tasks' | 'events'

export default function GodViewDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [isDarkMode, setIsDarkMode] = useState(true)

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: LayoutGrid },
    { id: 'tasks' as Tab, label: 'Task Board', icon: ListTodo },
    { id: 'events' as Tab, label: 'Event Stream', icon: Activity },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SABINE Control</h1>
                <p className="text-xs text-gray-400">God View Dashboard</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 bg-gray-900 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>

            {/* Right Side: Pulse & Settings */}
            <div className="flex items-center gap-4">
              <AgentPulse />
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-6">
        {/* Overview Tab - Stats + Tasks + Events */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Orchestration Stats */}
            <OrchestrationStatus />

            {/* Two Column Layout: Tasks + Events */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Tasks - 2 columns */}
              <div className="lg:col-span-2 bg-gray-900 rounded-lg border border-gray-800 p-4">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-blue-400" />
                  Recent Tasks
                </h2>
                <TaskBoard />
              </div>

              {/* Live Event Stream - 1 column */}
              <div className="h-[700px]">
                <LiveLog maxEvents={50} />
              </div>
            </div>
          </div>
        )}

        {/* Task Board Tab - Full Width Kanban */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <TaskBoard />
          </div>
        )}

        {/* Event Stream Tab - Full Width Log */}
        {activeTab === 'events' && (
          <div className="h-[calc(100vh-200px)]">
            <LiveLog maxEvents={200} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4 mt-8">
        <div className="max-w-[1800px] mx-auto px-6 text-center text-sm text-gray-500">
          SABINE Super Agent &bull; Strug City Engineering &bull; Project Dream Team
        </div>
      </footer>
    </div>
  )
}
