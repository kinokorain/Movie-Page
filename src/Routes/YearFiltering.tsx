import React from 'react'
import Movie from '../Types'

export default function YearFiltering(props: { handleYearFilter: (e: any, flag: number) => void }) {
    return (
        <div>
            <p>Фильтры:</p>
            <p>Год выпуска</p>
            <label htmlFor="year-left-input">От</label>
            <input onChange={(e) => props.handleYearFilter(e, 0)} id="year-left-input" type="number" name="year-left-input" />
            <label htmlFor="year-right-input">До</label>
            <input onChange={(e) => props.handleYearFilter(e, 1)} id="year-right-input" type="number" name="year-right-input" />
        </div>
    )
}
