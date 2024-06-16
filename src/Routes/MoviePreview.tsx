import React from 'react'
import Movie from '../Types'

export default function MoviePreview(props: { movie: Movie }) {
    const movie = props.movie;
    return (
        <div>{movie.name ? movie.name : movie.alternativeName ? movie.alternativeName : movie.enName}</div>
    )
}
