import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Recommendations = ({show, genre}) => {

  const {loading, data} = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
    variables: {
      genre
    }    
  })

  if (!show) {
    return null
  }else if ( loading ) {
    return <div>loading...</div>
  }
  const books = data.allBooks
  
  return (
    <div>
      <h2>Recommendations</h2>

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
    </div>
  )
}

export default Recommendations
