import React from "react";

const PersonForm = (props) => {
  const onSubmit = props.onSubmit
  const [newName, handleNameChange] = [props.newName, props.handleNameChange]
  const [newNumber, handleNumberChange] = [props.newNumber, props.handleNumberChange]
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
