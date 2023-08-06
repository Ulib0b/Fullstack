const SuccAlert = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="successful">
      {message}
    </div>
  )
}

export default SuccAlert