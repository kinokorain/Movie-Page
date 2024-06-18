import React from 'react'
import Movie from '../Types'
import { useLocation } from 'react-router-dom';

export default function MoviePage(props: any) {
    const location = useLocation();
    const movie: Movie = location.state;
    console.log(movie)

    return (
        <div>
            <div>
                {movie.poster?.previewUrl ? <img className='poster-preview' src={movie.poster?.previewUrl} alt="" /> : <img src="/src/assets/broken-img.png" alt="" />}
            </div>
            <h2>{movie.name ? movie.name : movie.alternativeName ? movie.alternativeName : movie.enName}</h2>
            <p>{movie.description}</p>
            <p>Рейтинг imdb: {movie.rating.imdb}</p>
            <p>Дата: {movie.year}</p>
            <ul>{movie.genres.map((genre) => {
                return <li>{genre.name}</li>
            })}</ul>
        </div>
    )
}
