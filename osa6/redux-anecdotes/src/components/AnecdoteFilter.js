import { useDispatch } from 'react-redux'



const AnecdoteFilter = () => {

  const dispatch = useDispatch()
  
  const filter = (event) => {
    event.preventDefault()
    const filterText = event.target.value
    dispatch({type: 'filter/setFilter', payload: filterText})
  }

  return (
    <input name='filterInput' onChange={filter}/>
  )
}

export default AnecdoteFilter