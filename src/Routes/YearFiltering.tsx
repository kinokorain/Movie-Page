import React from 'react'
import Movie from '../Types'

export default function YearFiltering(props: { handleYearFilter: (e: any, flag: number) => void }) {
    return (
        <div className='year-filter'>
            <h3 className='genre-heading'>Год выпуска</h3 >
            <label htmlFor="year-left-input">От</label>
            <input placeholder='1990' onChange={(e) => props.handleYearFilter(e, 0)} id="year-left-input" type="number" name="year-left-input" />
            <label htmlFor="year-right-input">До</label>
            <input placeholder='2024' onChange={(e) => props.handleYearFilter(e, 1)} id="year-right-input" type="number" name="year-right-input" />
        </div>
    )
}
