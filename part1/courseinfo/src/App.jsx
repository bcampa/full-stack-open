const Header = ({ course }) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Part = ({ partName, exercises }) => {
  return (
    <p>
      {partName} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part
          key={part.name}
          partName={part.name}
          exercises={part.exercises}
        />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((prev, cur) => prev + cur.exercises, 0);

  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App