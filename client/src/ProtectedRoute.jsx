import { Navigate , Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"


const ProtectedRoute = () => {

    const {user , isAuthenticated } = useAuth()

    if(!isAuthenticated) return <Navigate to='/login'/>

  return (
    <Outlet>

    </Outlet>
  )
}

export default ProtectedRoute
