import React, { useEffect } from 'react'
import Movie from '../Types'
import { Link, useLocation } from 'react-router-dom';

export default function MoviePage(props: any) {
    const location = useLocation();
    const movie: Movie = location.state;
    console.log(movie);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='movie-page-container'>
            <div className='back-button'><Link to="/"><i className="fa-solid fa-arrow-left"></i> Назад</Link></div>
            <div className='top-part-movie-page'>
                <div className='poster-container'>
                    {movie.poster?.previewUrl ? <img src={movie.poster?.previewUrl} alt="" /> : <img src="/src/assets/broken-img.png" alt="" />}
                </div>
                <div>
                    <h2>{movie.name ? movie.name : movie.alternativeName ? movie.alternativeName : movie.enName}</h2>
                    <p>Год выхода: {movie.year}</p>
                    <p>Рейтинг imdb: {movie.rating.imdb} <i className="fa-solid fa-star"></i></p>
                    <p>Жанры:</p>
                    <ul>{movie.genres.map((genre) => {
                        return <li>{genre.name}</li>
                    })}</ul>
                </div>
            </div>
            <h3>Описание:</h3>
            <div className='description'>
                <p>{movie.description}</p>
            </div>
        </div>
    )
}
