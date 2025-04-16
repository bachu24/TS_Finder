'use client'

import React, { useState } from 'react'
import { Upload, MessageSquare, Loader2 } from 'lucide-react'

interface AnalysisResult {
  mood_analysis: {
    emotions: string[]
    confidence: number
    dominantEmotion: string
  }
  recommendation: string
}

export function MoodAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [textInput, setTextInput] = useState('')

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/mood/analyze/image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze image')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!textInput.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/mood/analyze/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze text')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Image Upload */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Upload a Photo
          </h2>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer hover:bg-purple-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-purple-500 mb-2" />
              <p className="text-sm text-purple-500">
                Click to upload or drag and drop
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isLoading}
            />
          </label>
        </div>

        {/* Text Input */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Describe Your Mood
          </h2>
          <form onSubmit={handleTextSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="How are you feeling today?"
                className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MessageSquare className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Your Taylor Swift Match
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-purple-800">Detected Emotions:</h3>
              <p className="text-purple-700">
                {result.mood_analysis.emotions.join(', ')}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-purple-800">Dominant Emotion:</h3>
              <p className="text-purple-700">{result.mood_analysis.dominantEmotion}</p>
            </div>
            <div>
              <h3 className="font-medium text-purple-800">Song Recommendation:</h3>
              <p className="text-purple-700 whitespace-pre-line">
                {result.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 