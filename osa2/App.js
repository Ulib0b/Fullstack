const Course = (props) => {
  const { course } = props

  const parts = course.parts

  const total = parts.reduce(
    (i,value) => i+value.exercises
  ,0)

  return(
    <>
      <h1>{course.name}</h1>
      <ul>
        {parts.map(part => 
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        )}

        <li>Total amount of exercises {total}</li>
      </ul>
    </>
  )

  
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
