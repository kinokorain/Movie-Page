import React from 'react'

export default function GenreFilter(props: { getCheckedGenres: () => void }) {
    const genreList: string[] = [
        "комедия", "ужас", "фантастика", "триллер", "боевик", "мелодрама", "детектив", "приключение", "фэнтези", "аниме", "драма"
    ]

    return (
        <div>
            {genreList.map((genre) => {
                return <div>
                    <input onChange={props.getCheckedGenres} type="checkbox" data-genre={genre} id={'checkbox-' + genre} className='genre-checkbox' />
                    <span>{genre}</span>
                </div>
            })}
        </div>
    )
}
