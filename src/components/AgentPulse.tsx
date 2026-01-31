'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity } from 'lucide-react'
import { supabase, AgentEvent, roleDisplayNames } from '@/lib/supabase'

/**
 * AgentPulse Component - Live Pulse Badge for God View Header
 *
 * Displays the latest agent event with:
 * - Pulsing green dot animation when active
 * - Role badge showing which agent acted
 * - Latest content snippet
 * - Real-time updates via Supabase subscription
 */
export default function AgentPulse() {
  const [latestEvent, setLatestEvent] = useState<AgentEvent | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isNewEvent, setIsNewEvent] = useState(false)

  // Fetch the latest event on mount
  useEffect(() => {
    const fetchLatest = async () => {
      const { data, error } = await supabase
        .from('agent_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (data && !error) {
        setLatestEvent(data)
      }
    }

    fetchLatest()
  }, [])

  // Subscribe to realtime updates for immediate pulse
  useEffect(() => {
    const channel = supabase
      .channel('agent_pulse_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'agent_events',
        },
        (payload) => {
          const newEvent = payload.new as AgentEvent
          setLatestEvent(newEvent)

          // Trigger pulse animation
          setIsNewEvent(true)
          setTimeout(() => setIsNewEvent(false), 2000)
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const getRoleColor = (role: string | null) => {
    switch (role) {
      case 'SABINE_ARCHITECT':
        return 'bg-violet-500/20 text-violet-300 border-violet-500/50'
      case 'backend-architect-sabine':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50'
      case 'frontend-ops-sabine':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
      case 'data-ai-engineer-sabine':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50'
      case 'product-manager-sabine':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/50'
      case 'qa-security-sabine':
        return 'bg-red-500/20 text-red-300 border-red-500/50'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50'
    }
  }

  const getRoleDisplay = (role: string | null) => {
    if (!role) return 'System'
    return roleDisplayNames[role] || role.split('-')[0]
  }

  const truncateContent = (content: string, maxLength: number = 60) => {
    if (content.length <= maxLength) return content
    return content.slice(0, maxLength) + '...'
  }

  const formatTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <div className="flex items-center gap-3">
      {/* Pulsing Live Indicator */}
      <div className="relative flex items-center gap-2">
        <div className="relative">
          {/* Outer pulse ring */}
          <motion.div
            className={`absolute inset-0 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
            animate={isConnected ? {
              scale: [1, 1.8, 1],
              opacity: [0.6, 0, 0.6],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Inner solid dot */}
          <motion.div
            className={`relative w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
            animate={isNewEvent ? {
              scale: [1, 1.5, 1],
              boxShadow: [
                '0 0 0 0 rgba(74, 222, 128, 0.4)',
                '0 0 0 10px rgba(74, 222, 128, 0)',
                '0 0 0 0 rgba(74, 222, 128, 0)',
              ],
            } : {}}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs text-gray-400 font-medium">
          {isConnected ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-700" />

      {/* Latest Event Badge */}
      <AnimatePresence mode="wait">
        {latestEvent ? (
          <motion.div
            key={latestEvent.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
              isNewEvent ? 'border-green-500/50 bg-green-500/10' : 'border-gray-700 bg-gray-800/50'
            }`}
          >
            <Activity className={`w-4 h-4 ${isNewEvent ? 'text-green-400' : 'text-gray-400'}`} />

            {/* Role Badge */}
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getRoleColor(latestEvent.role)}`}>
              {getRoleDisplay(latestEvent.role)}
            </span>

            {/* Content Preview */}
            <span className="text-sm text-gray-300 max-w-[200px] truncate">
              {truncateContent(latestEvent.content)}
            </span>

            {/* Time */}
            <span className="text-xs text-gray-500">
              {formatTimeAgo(latestEvent.created_at)}
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-800/50"
          >
            <Activity className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Waiting for events...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
