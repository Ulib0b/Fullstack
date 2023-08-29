const Nav = ({setPage, logout}) => {
  
  if(localStorage.getItem('user-token')){
    return(
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('recom')}>recommendations</button>
      <button onClick={() => logout()}>log out</button>
    </div>
    )
  }

  return (
    <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
    </div>
  )
}

export default Nav