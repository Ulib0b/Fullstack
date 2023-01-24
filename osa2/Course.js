const Course = (props) => {
    const { courses } = props
  
    const parts = courses[0].parts
    const parts2 = courses[1].parts
  
    const total = parts.reduce(
      (i,value) => i+value.exercises
    ,0)
  
    const total2 = parts2.reduce(
      (i,value) => i+value.exercises
    ,0)
  
    return(
      <>
        <h1>{courses[0].name}</h1>
        <ul>
          {parts.map(part => 
            <li key={part.id}>
              {part.name} {part.exercises}
            </li>
          )}
  
          <li>Total amount of exercises {total}</li>
        </ul>
        <h1>{courses[1].name}</h1>
        <ul>
          {parts2.map(part => 
            <li key={part.id}>
              {part.name} {part.exercises}
            </li>
          )}
  
          <li>Total amount of exercises {total2}</li>
        </ul>
      </>
    )
  
    
  }

  export default Course