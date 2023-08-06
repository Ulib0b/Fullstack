import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      state = `voted for "${action.payload}""`
      return state
    case "CREATE":
      state = `"${action.payload}" created`
      return state
    case "HIDE":
      return null
    case "ERROR":
      state = action.payload
      return state
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const NotificationAndDispatch = useContext(NotificationContext)
  return NotificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const NotificationAndDispatch = useContext(NotificationContext)
  return NotificationAndDispatch[1]
}

export default NotificationContext