from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict
from ..services.mood_analysis import MoodAnalysisService

router = APIRouter(
    prefix="/mood",
    tags=["mood"],
    responses={404: {"description": "Not found"}},
)

@router.post("/analyze/image")
async def analyze_image(file: UploadFile = File(...)) -> Dict:
    """
    Analyze an image to detect emotions and get song recommendations.
    
    Args:
        file: The image file to analyze
        
    Returns:
        Dict containing mood analysis and song recommendation
    """
    try:
        # Read image content
        contents = await file.read()
        
        # Analyze image
        mood_analysis = await MoodAnalysisService.analyze_image(contents)
        
        # Get song recommendation
        recommendation = await MoodAnalysisService.get_song_recommendation(mood_analysis)
        
        return recommendation
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze/text")
async def analyze_text(text: str) -> Dict:
    """
    Analyze text to detect emotions and get song recommendations.
    
    Args:
        text: The text to analyze
        
    Returns:
        Dict containing mood analysis and song recommendation
    """
    try:
        # Analyze text
        mood_analysis = await MoodAnalysisService.analyze_text(text)
        
        # Get song recommendation
        recommendation = await MoodAnalysisService.get_song_recommendation(mood_analysis)
        
        return recommendation
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 