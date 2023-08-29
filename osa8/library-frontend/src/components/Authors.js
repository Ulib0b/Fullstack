import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select';

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000  
  })

  if (!props.show) {
    return null
  }else if ( result.loading ) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

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
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Birthyear authors={authors}/>
    </div>
  )
}


const Birthyear = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)
  const authors = []

  for (let author of props.authors) {
    authors.push({value: author.name, label: author.name})    
  }

  const submit = (event) => {
    event.preventDefault()

    const yearInt = Number(year)
    const selectedName = name.label
    editAuthor({ variables: { selectedName, yearInt }})

    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <Select
          onChange={setName} 
          options={authors}
        />
        <br/>
        <div>
          published
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors

