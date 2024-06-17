type Movie = {
    id: number | null,
    name: string | null,
    enName: string | null,
    alternativeName: string | null,
    year: number | null,
    description: string | null,
    poster?: {
        url: string | null,
        previewUrl: string | undefined,
    },
    genres: { name: string | null }[],

}
export default Movie
