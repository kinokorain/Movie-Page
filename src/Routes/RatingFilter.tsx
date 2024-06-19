import React from 'react'

export default function RatingFilter(props: { handleRatingFilter: (e: any, flag: number) => void }) {
    return (
        <div className='rating-filter'>
            <h3 className='genre-heading'>Рейтинг imdb:</h3>
            <label htmlFor="rating-left-input">От</label>
            <input placeholder='0' onChange={(e) => props.handleRatingFilter(e, 0)} id="rating-left-input" type="number" name="year-left-input" />
            <label htmlFor="rating-right-input">До</label>
            <input placeholder='10' onChange={(e) => props.handleRatingFilter(e, 1)} id="rating-right-input" type="number" name="year-right-input" />
        </div >
    )
}
