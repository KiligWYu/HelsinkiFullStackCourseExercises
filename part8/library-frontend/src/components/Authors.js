import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [ name, setName ] = useState(null)
  const [ year, setYear ] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const setBirthyear = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name.value, born: Number(year) } })

    setName(null)
    setYear('')
  }

  const options = result.data.allAuthors.map(author => { return { value: author.name, label: author.name } })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={setBirthyear}>
        <div>
          name
          <Select options={options} onChange={setName}/>
        </div>
        <div>
          born
          <input value={year} onChange={({ target }) => { setYear(target.value) }} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
