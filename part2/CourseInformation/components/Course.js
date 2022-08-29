import React from "react";

const Header = (course) => (
  <h2>{course.name}</h2>
)

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </>
  )
}

const Total = ({ exercises }) => (
  <p><b>total of {exercises} exercises</b></p>
)

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
      if (typeof s === 'object') {
        return s.exercises + p.exercises
      } else {
        return s + p.exercises
      }
  })

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total exercises={total} />
    </>
  )
}

export default Course
