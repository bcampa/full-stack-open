const Header = ({ course }) => {
  return (
    <h2>
      {course}
    </h2>
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
          key={part.id}
          partName={part.name}
          exercises={part.exercises}
        />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)

  return (
    <p>
      <strong>
        total of {total} exercises
      </strong>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course