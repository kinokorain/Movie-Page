import React, { useState } from 'react'
import { useEffect } from 'react'
import MoviePreview from './MoviePreview';
import Movie from '../Types'
import data from "../../public/data.json"



export default function MainPage() {
    const [page, setPage] = useState(1);
    const [currentMovies, setCurrentMovies] = useState<Movie[]>();
    useEffect(() => {
        async function getMovies() {
            // const movieList = await fetch("https://api.kinopoisk.dev/v1.4/movie?type=movie&page=1&limit=50&selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=description&selectFields=year&selectFields=poster&selectFields=genres&selectFields=rating&selectFields=ratingMpaa&type=movie", {
            //     method: "GET",
            //     headers: {
            //         "X-API-KEY": "deleted"
            //     }
            // })
            //     .then(result =>
            //         result.json()
            //     )
            //     .then(data => {
            //         console.log(data.docs);
            //         return data.docs;
            //     })
            //     .catch(error => {
            //         console.log("Error", error);
            //     })
            const movieList = data as Movie[];
            console.log(movieList.length);
            setCurrentMovies(movieList);
        }
        getMovies();

    }, [])

    return (
        <div>
            {!currentMovies ? <p>Hi</p> : currentMovies.map((movie) => {
                return <MoviePreview movie={movie} />
            })}
            <button>{">"}</button>
        </div>
    )
}
