import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [ genres, setGenres ] = useState([])
  const [ genreToSearch, setGenreToSearch ] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: null }
  })

  useEffect(() => {
    result.refetch({ genre: genreToSearch })
  }, [genreToSearch, result])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (genres.length === 0) {
    var genresSet = []
    result.data.allBooks.map((a) => genresSet.push(...a.genres))
    genresSet = Array.from(new Set(genresSet))
    setGenres(genresSet)
  }

  return (
    <div>
      <h2>books</h2>
      { genreToSearch 
        ? <div>in genre <b>{ genreToSearch }</b></div>
        : null
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => 
          <button key={genre} onClick={() => { setGenreToSearch(genre) }}>{genre}</button>)
        }
        <button onClick={() => { setGenreToSearch(null) }}>all genres</button>
      </div>
    </div>
  )
}

export default Books
