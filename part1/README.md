# Part 1

## 练习 1.1

App.js 文件内容：

```js
const Header = (course) => (
  <h1>{course.name}</h1>
)

const Content = (part) => (
  <p>{part.name} {part.exercises}</p>
)

const Total = (count) => (
  <p>Number of exercises {count.total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content name={part1} exercises={exercises1}/>
      <Content name={part2} exercises={exercises2}/>
      <Content name={part3} exercises={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
```

## 练习 1.2

App.js 文件内容：

```js
const Header = (course) => (
  <h1>{course.name}</h1>
)

const Part = (part) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = (part) => {
  return (
    <>
    <Part name={part.part1} exercises={part.exercises1}/>
    <Part name={part.part2} exercises={part.exercises2}/>
    <Part name={part.part3} exercises={part.exercises3}/>
    </>
  )
}

const Total = (count) => (
  <p>Number of exercises {count.total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
```

## 1.3

App.js 文件内容：

```js
const Header = (course) => (
  <h1>{course.name}</h1>
)

const Part = (part) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = (part) => {
  return (
    <>
    <Part name={part.part1.name} exercises={part.part1.exercises}/>
    <Part name={part.part2.name} exercises={part.part2.exercises}/>
    <Part name={part.part3.name} exercises={part.part3.exercises}/>
    </>
  )
}

const Total = (count) => (
  <p>Number of exercises {count.total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
console.log(part1)
  return (
    <div>
      <Header name={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App
```

## 1.4

App.js 文件内容：

```js
const Header = (course) => (
  <h1>{course.name}</h1>
)

const Part = (part) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = (parts) => {
  return (
    <>
    <Part name={parts.parts[0].name} exercises={parts.parts[0].exercises}/>
    <Part name={parts.parts[1].name} exercises={parts.parts[1].exercises}/>
    <Part name={parts.parts[2].name} exercises={parts.parts[2].exercises}/>
    </>
  )
}

const Total = (count) => (
  <p>Number of exercises {count.total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
  
  return (
    <div>
      <Header name={course} />
      <Content parts={parts}/>
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App
```
