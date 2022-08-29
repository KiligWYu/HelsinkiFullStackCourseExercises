import React from "react"

const ErrorNotification = ({ message}) => {
  if (message === null || message.length === 0) {
    return null
  }
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return <div style={errorStyle}>{message}</div>
}

const SuccessNotification = ({ message}) => {
  if (message === null || message.length === 0) {
    return null
  }
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return <div style={successStyle}>{message}</div>
}

export { ErrorNotification, SuccessNotification }
