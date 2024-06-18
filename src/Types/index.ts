type Movie = {
    id: number | null,
    name: string | null,
    alternativeName: string | null,
    enName: string | null,
    year: number | null,
    description: string | null,
    poster?: {
        url: string | null,
        previewUrl: string | null,
    },
    rating: {
        kp: number | null,
        imbd: number | null,
        tmdb: number | null,
        filmCritics: number | null,
        russianFilmCritics: number | null,
        await: number | null,
    },
    genres: { name: string | null }[],
}
export default Movie
