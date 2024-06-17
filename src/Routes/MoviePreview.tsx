import React from 'react'
import Movie from '../Types'

export default function MoviePreview(props: { movie: Movie }) {
    const movie = props.movie;
    return (
        <div className='movie-container'>
            <div>
                {
                    movie.poster?.previewUrl ? <img src={movie.poster?.previewUrl} alt="" /> : <img src="/src/assets/broken-img.png" alt="" />
                }
            </div>
            <div>
                <p>{movie.name ? movie.name : movie.alternativeName ? movie.alternativeName : movie.enName}</p>
                <p>{movie.year}</p>
                <p>{ }</p>
            </div>
        </div>
    )
}
