import React, { useState } from 'react'
import { useEffect } from 'react'
import MoviePreview from './MoviePreview';
import Movie from '../Types'
import YearFiltering from './YearFiltering';
import GenreFilter from './GenreFilter';
import RatingFilter from './RatingFilter';

export default function MainPage() {
    const [page, setPage] = useState<number>(1);
    const [searchInputText, setSearchInputText] = useState<string>("");
    const [genres, setGenres] = useState<string[]>([]);
    const [years, setYears] = useState<[number, number]>([1990, 2024]);
    const [rating, setRating] = useState<[number, number]>([0, 10]);
    const [currentMovies, setCurrentMovies] = useState<Movie[]>();


    //function for constructing url of request to API
    function constructUrl(flag: number) {
        let baseUrl = "https://api.kinopoisk.dev/v1.4/movie";
        let limit = "?limit=50";
        let search = "/search"
        let baseParameters = "&type=movie&selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=description&selectFields=year&selectFields=poster&selectFields=genres&selectFields=rating&notNullFields=poster.url&notNullFields=rating.imdb&notNullFields=description";
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

    async function getMovies(requestUrl: string) {
        console.log(requestUrl);
        const movieList = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "X-API-KEY": "44AZYQT-PP34JDX-HH7WVR9-ZBA128D"
            }
        })
            .then(result =>
                result.json()
            )
            .then(data => {
                console.log(data.docs);
                return data.docs;
            })
            .catch(error => {
                console.log("Error", error);
            })


        console.log("made request");
        setCurrentMovies(movieList);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getMovies(constructUrl(2));
    }, [])



    //handling state changes
    useEffect(() => {
        console.log("in useEffect for page")
        getMovies(constructUrl(2));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [page])

    function handlePageIncrement() {
        setPage(page + 1);
    }

    function handlePageDecrement() {
        if (page === 1) {
            return;
        }
        setPage(page - 1);
    }

    function handleSearchInput(e: any) {
        let lowerCase = e.target.value.toLowerCase();
        setSearchInputText(lowerCase);
    }

    function handleSearch() {
        getMovies(constructUrl(1));
    }

    function getCheckedGenres() {
        let checkedGenres: string[] = [];
        console.log("Checked genres in the begginig: " + checkedGenres)
        console.log("genre state before forLoop: ", genres);
        let checkboxList = document.getElementsByClassName("genre-checkbox") as HTMLCollectionOf<HTMLInputElement>;
        for (let i = 0; i < checkboxList.length; i++) {
            if (checkboxList[i].checked) {
                checkedGenres.push(checkboxList[i].dataset.genre as string)
            }
        }
        console.log("genre state after forLoop: ", genres);
        if (checkedGenres.length === 0) {
            setGenres([]);
            console.log("genre state after handleGenreChange([]): ", genres);
        }
        else {
            // console.log("Checked genres after filter: " + checkedGenres)
            setGenres(checkedGenres);
            console.log("genre state after handleGenreChange([]): ", genres);
        }
    }

    function handleYearFilter(e: any, flag: number) {
        if (e.target.value < 1990 || e.target.value > 2024) {
            return;
        }
        if (flag === 0) {
            //for first input
            setYears([e.target.value, years[1]]);
        }
        else {
            //for second input
            setYears([years[0], e.target.value]);
        }
    }

    function handleRatingFilter(e: any, flag: number) {
        if (e.target.value < 0 || e.target.value > 10) {
            return;
        }
        if (flag === 0) {
            //for first input
            setRating([e.target.value, rating[1]]);
        }
        else {
            //for second input
            setRating([rating[0], e.target.value]);
        }
    }

    function handleFiltering() {
        console.log("hi");
        getMovies(constructUrl(2));
    }

    function handleClearing() {
        console.log("in handleClearing");
        setYears([1990, 2024]);
        setRating([0, 10]);
        setGenres([]);
        constructUrl(2);
    }

    function backToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    //so that the form button doesn't reset the whole page
    const filterForm = document.querySelector('#filter-form');
    filterForm?.addEventListener("submit", (e => {
        e.preventDefault();
    }));

    return (
        <div className='wrapper'>
            <button onClick={backToTop} className='button-to-top'><i className="fa-solid fa-arrow-up"></i></button>
            <button onClick={backToTop} className='button-to-top'><i className="fa-solid fa-arrow-up"></i></button>

            <div className='top-bar'>
                <h1 className='accent-color'>Cinema</h1>
                <div className='searchInputAndButtonContainer'>
                    <input placeholder='Название фильма' type="search" id="movie-search" name="movie-search" onChange={handleSearchInput} />
                    <button id='search-button' onClick={handleSearch}>Поиск</button>
                </div>
            </div>
            <div className='MainPage-container'>
                <aside>
                    <form id="filter-form">
                        <h2 >Фильтры:</h2>
                        <YearFiltering handleYearFilter={handleYearFilter} />
                        <GenreFilter getCheckedGenres={getCheckedGenres} />
                        <RatingFilter handleRatingFilter={handleRatingFilter} />
                        <button className='button-in-filters' onClick={handleFiltering}>Поиск с учетом фильтров</button>
                        <input id="reset-button" type="reset" onClick={handleClearing} />
                    </form>
                </aside>
                <div className='movie-list-container'>
                    {
                        !currentMovies || currentMovies.length === 0 ? <p>По вашему запросу фильмов не нашлось!</p> : currentMovies.map((movie) => {
                            return <MoviePreview movie={movie} />
                        })
                    }
                </div>
            </div>
            <div className='change-page-button-container'>
                {page !== 1 && <button className='change-page-button' onClick={handlePageDecrement}><i className="fa-solid fa-arrow-left"></i></button>}
                <button className='change-page-button' onClick={handlePageIncrement}><i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    )
}
