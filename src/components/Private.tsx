import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function Private(props: {children: React.ReactNode}) {

  const { isLoggedIn, isVerifyingUser } = useContext(AuthContext)

if (isVerifyingUser) {
    return <p>Loading...</p>
}

  if (isLoggedIn) {
    return props.children 
  } else {
    return <Navigate to="/login"/>
  }

}
export default Private