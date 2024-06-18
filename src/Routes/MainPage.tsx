import React, { useState } from 'react'
import { useEffect } from 'react'
import MoviePreview from './MoviePreview';
import Movie from '../Types'
import data from "../../public/data.json";
import Aside from './Aside';

export default function MainPage() {
    const [page, setPage] = useState<number>(1);
    const [searchInputText, setSearchInputText] = useState<string>("");
    const [genres, setGenres] = useState<string[]>(["комедия"]);
    const [years, setYears] = useState<[number, number]>([1990, 2024]);
    const [rating, setRating] = useState<[number, number]>([0, 10]);
    const [currentMovies, setCurrentMovies] = useState<Movie[]>();

    function constructUrl(flag: number) {
        let baseUrl = "https://api.kinopoisk.dev/v1.4/movie";
        let limit = "?limit=50";
        let search = "/search"
        let baseParameters = "&type=movie&selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=description&selectFields=year&selectFields=poster&selectFields=genres&selectFields=rating";
        let requestUrl: string;

        if (flag === 1) {
            //if it's search
            requestUrl = baseUrl + search + limit + "&query=" + searchInputText;
        }
        else {
            //if it's not search
            requestUrl = baseUrl + limit + baseParameters + "&page=" + page + genres.reduce((Parameters, currentValue) => {
                return Parameters + "&genres.name=" + currentValue
            }, "") + "&year=" + years[0] + "-" + years[1] + "&rating.imdb=" + rating[0] + "-" + rating[1]
        }
        return requestUrl;
    }
    console.log("url from func", constructUrl(2));

    async function getMovies(requestUrl: string) {
        //the actual code
        // const movieList = await fetch(requestUrl, {
        //     method: "GET",
        //     headers: {
        //         "X-API-KEY": "44AZYQT-PP34JDX-HH7WVR9-ZBA128D"
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

        //code for testing
        const movieList = await fetch("data.json")
            .then(result =>
                result.json()
            )
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => {
                console.log("Error", error);
            })
        //old testing method
        // const movieList = data as unknown as Movie[];

        console.log(movieList.length);
        console.log("made request");
        setCurrentMovies(movieList);
    }

    useEffect(() => {
        getMovies(constructUrl(2));
    }, [])

    function handlePageChange() {
        setPage(page + 1);
        getMovies(constructUrl(2));
    }

    function handleSearchInput(e: any) {
        let lowerCase = e.target.value.toLowerCase();
        setSearchInputText(lowerCase);
    }

    function handleSearch() {
        getMovies(constructUrl(1));
    }

    return (
        <>
            <h1>Cinema</h1>
            <label htmlFor="movie-search">Search the site:</label>
            <input type="search" id="movie-search" name="movie-search" onChange={handleSearchInput} />
            <button onClick={handleSearch}>search</button>
            <div className='MainPage-container'>
                <Aside />
                <div className='movie-list-container'>
                    {
                        !currentMovies ? <p>Hi</p> : currentMovies.map((movie) => {
                            return <MoviePreview movie={movie} />
                        })
                    }
                </div>
            </div>
            <button onClick={handlePageChange}>{">"}</button>
        </>
    )
}
