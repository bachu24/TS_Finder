export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
}

export interface Song {
  id: string;
  title: string;
  album: string;
  releaseDate: string;
  spotifyId: string;
  previewUrl?: string;
}

export interface Lyrics {
  id: string;
  songId: string;
  text: string;
  timestamp?: string;
}

export interface MoodAnalysis {
  emotions: string[];
  confidence: number;
  dominantEmotion: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  songId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SongRecommendation {
  song: Song;
  lyrics: Lyrics[];
  matchScore: number;
  explanation: string;
} 