
import Movie from '../Types'
import { Outlet, Link } from "react-router-dom";
// import BasicRating from '../BasicRating';

export default function MoviePreview(props: { movie: Movie }) {
    const movie = props.movie;
    return (
        <Link to={'movie/' + movie.id}
            state={movie}
        >
            <div className='movie-container'>
                <div className='preview-poster-container'>
                    {
                        movie.poster?.previewUrl ? <img className='poster-preview' src={movie.poster?.previewUrl} alt="" /> : <img src="/src/assets/broken-img.png" alt="" />
                    }
                </div>
                <div className='preview-info-container'>
                    <h3>{movie.name ? movie.name : movie.alternativeName ? movie.alternativeName : movie.enName}</h3>
                    <p>{movie.year}</p>
                    <p>Рейтинг imdb: {movie.rating.imdb} <i className="fa-solid fa-star"></i> </p>
                </div>
            </div >
        </Link>
    )
}
