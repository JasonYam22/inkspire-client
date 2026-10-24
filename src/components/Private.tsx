import { useAuth } from "../context/auth.context"

import { Navigate } from "react-router-dom"

function Private(props: {children: React.ReactNode}) {

  const { isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return props.children 
  } else {
    return <Navigate to="/login"/>
  }

}
export default Private