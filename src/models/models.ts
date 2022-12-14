export interface Hotel {
    HIV4_RATING: number,
    HOTEL_NAME: string,
    HOTEL_RATING: number,
    LATITUDE: number,
    LM_RATING: number,
    LONGITUDE: number,
    OVERALL_RATING: number,
    REVIEW_DATE: string,
    REVIEW_SUMMARY: string,
    REVIEW_TEXT: string,
    ADDRESS: string,
    VADER_RATING: number
}

export interface RatingData {
    OVERALL_RATING: number,
    VADER_RATING: number
    HIV4_RATING: number,
    LM_RATING: number,
}