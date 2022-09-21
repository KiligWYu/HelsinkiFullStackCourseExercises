const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.startsWith('info: ')) {
    return (
      <div className="info">
        {message.substring(6)}
      </div>
    )
  } else if (message.startsWith('error: ')) {
    return (
      <div className="error">
        {message.substring(7)}
      </div>
    )
  }
}

export default Notification
