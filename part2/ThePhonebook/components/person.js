import React from "react";

const Persons = ({ persons, filter, handleDelete }) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) )
  return (
    <>
      {filtered.map(person => (
        <p key={person.id}>{person.name} {person.number} <button onClick={handleDelete(person)}>delete</button></p>
      ))}
    </>
  )
}

export default Persons
