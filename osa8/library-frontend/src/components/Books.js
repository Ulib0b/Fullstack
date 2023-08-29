import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genres, setGenres] = useState([null])
  const genre = null
  const {loading, data, refetch} = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
    variables: {
      genre
    }    
  })

  if (!props.show) {
    return null
  }else if ( loading ) {
    return <div>loading...</div>
  }
  const books = data.allBooks

  
  
  for(let book of books){
    for(let genre of book.genres){
      if(!genres.includes(genre)){
        genres.push(genre)
      }
    }
  }
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => {
          if(genre === null)return <button key='all' onClick={() => refetch({genre: genre})}>All genres</button>
          return <button key={genre} onClick={() => refetch({genre: genre})}>{genre}</button>
        })}
      </div>
    </div>
  )
}

export default Books
