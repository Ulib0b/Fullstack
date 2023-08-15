import { useNotificationValue } from "../contexts/NotificationContext"

const Notification = () => {

  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if(notification !== null){
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }else {
    return (
      <></>
    )
  }
}

export default Notification