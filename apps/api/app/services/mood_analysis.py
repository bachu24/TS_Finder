from google.cloud import vision
import openai
import cohere
from typing import List, Dict, Union
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize API clients
vision_client = vision.ImageAnnotatorClient()
openai.api_key = os.getenv("OPENAI_API_KEY")
cohere_client = cohere.Client(os.getenv("COHERE_API_KEY"))

class MoodAnalysisService:
    @staticmethod
    async def analyze_image(image_content: bytes) -> Dict[str, Union[List[str], float, str]]:
        """Analyze an image using Google Cloud Vision API to detect emotions."""
        image = vision.Image(content=image_content)
        
        # Detect faces and emotions
        response = vision_client.face_detection(image=image)
        faces = response.face_annotations
        
        if not faces:
            return {
                "emotions": ["neutral"],
                "confidence": 1.0,
                "dominantEmotion": "neutral"
            }
        
        # Extract emotions from the first face
        face = faces[0]
        emotions = []
        
        # Map Vision API likelihood to emotions
        emotion_mapping = {
            "joy": face.joy_likelihood,
            "sorrow": face.sorrow_likelihood,
            "anger": face.anger_likelihood,
            "surprise": face.surprise_likelihood
        }
        
        # Convert likelihood to confidence score and filter significant emotions
        for emotion, likelihood in emotion_mapping.items():
            if likelihood >= vision.Likelihood.POSSIBLE:
                confidence = (likelihood - 1) / 4  # Normalize to 0-1
                emotions.append((emotion, confidence))
        
        if not emotions:
            return {
                "emotions": ["neutral"],
                "confidence": 1.0,
                "dominantEmotion": "neutral"
            }
        
        # Sort emotions by confidence and get dominant emotion
        emotions.sort(key=lambda x: x[1], reverse=True)
        dominant_emotion = emotions[0][0]
        
        return {
            "emotions": [e[0] for e in emotions],
            "confidence": emotions[0][1],
            "dominantEmotion": dominant_emotion
        }
    
    @staticmethod
    async def analyze_text(text: str) -> Dict[str, Union[List[str], float, str]]:
        """Analyze text using Cohere API to detect emotions."""
        response = cohere_client.classify(
            model="embed-english-v3.0",
            inputs=[text],
            examples=[
                {"text": "I'm so happy today!", "label": "joy"},
                {"text": "I feel really sad about this.", "label": "sorrow"},
                {"text": "This makes me angry!", "label": "anger"},
                {"text": "Wow, I didn't expect that!", "label": "surprise"},
                {"text": "I'm feeling neutral about this.", "label": "neutral"}
            ]
        )
        
        classifications = response.classifications
        if not classifications:
            return {
                "emotions": ["neutral"],
                "confidence": 1.0,
                "dominantEmotion": "neutral"
            }
        
        # Get the top prediction
        prediction = classifications[0].prediction
        confidence = classifications[0].confidence
        
        return {
            "emotions": [prediction],
            "confidence": confidence,
            "dominantEmotion": prediction
        }
    
    @staticmethod
    async def get_song_recommendation(mood_analysis: Dict[str, Union[List[str], float, str]]) -> Dict:
        """Get song recommendations based on mood analysis using OpenAI."""
        prompt = f"""
        Based on the following mood analysis:
        Emotions: {', '.join(mood_analysis['emotions'])}
        Dominant Emotion: {mood_analysis['dominantEmotion']}
        Confidence: {mood_analysis['confidence']}
        
        Recommend a Taylor Swift song that matches this mood. Include:
        1. Song title
        2. Album
        3. Brief explanation of why it matches the mood
        4. A specific lyric that resonates with this emotion
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a Taylor Swift expert who recommends songs based on emotions."},
                {"role": "user", "content": prompt}
            ]
        )
        
        return {
            "recommendation": response.choices[0].message.content,
            "mood_analysis": mood_analysis
        } 