import { useLazyQuery, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS, ME } from "../queries"

const Recommend = (props) => {
  const [genre, setGenre] = useState('')
  
  useQuery(ME, {
    onCompleted: (data) => {
      console.log(data)
      const favouriteGenre = data.me.favouriteGenre
      if (favouriteGenre) {
        setGenre(favouriteGenre)
        loadRrecommandBooks()
      }
    }
  })

  const [ loadRrecommandBooks, result ] = useLazyQuery(ALL_BOOKS, {
    variables: { genre }
  })

  if (!props.show) {
    return null
  }

  if (!result.called || result.loading) {
    return <div>loading...</div>
  }

  console.log(result)

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favourite genre <b>{genre}</b></div>

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
    </div>
  )
}

export default Recommend
