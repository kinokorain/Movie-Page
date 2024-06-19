import React from 'react'

export default function GenreFilter(props: { getCheckedGenres: () => void }) {
    const genreList: string[] = [
        "комедия", "ужас", "фантастика", "триллер", "боевик", "мелодрама", "детектив", "приключение", "фэнтези", "аниме", "драма"
    ]

    return (
        <div>
            <h3 className='genre-heading'>Жанры</h3>
            {genreList.map((genre) => {
                return <div className='genre-filter'>
                    <input name='genre-checkbox' onChange={props.getCheckedGenres} type="checkbox" data-genre={genre} id={'checkbox-' + genre} className='genre-checkbox' />
                    <label htmlFor={'checkbox-' + genre}>{genre}</label>
                </div>
            })}
        </div>
    )
}
