import React from 'react'

export default function RatingFilter(props: { handleRatingFilter: (e: any, flag: number) => void }) {
    return (
        <div>
            <p>Рейтинг imdb:</p>
            <label htmlFor="rating-left-input">От</label>
            <input onChange={(e) => props.handleRatingFilter(e, 0)} id="rating-left-input" type="number" name="year-left-input" />
            <label htmlFor="rating-right-input">До</label>
            <input onChange={(e) => props.handleRatingFilter(e, 1)} id="rating-right-input" type="number" name="year-right-input" />
        </div>
    )
}
