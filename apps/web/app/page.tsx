'use client'

import React from 'react'
import { MoodAnalysis } from '@/components/mood-analysis'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            TS Finder
          </h1>
          <p className="text-xl text-purple-700">
            Discover Taylor Swift songs that match your current vibe
          </p>
        </header>

        <MoodAnalysis />
      </div>
    </main>
  )
} 