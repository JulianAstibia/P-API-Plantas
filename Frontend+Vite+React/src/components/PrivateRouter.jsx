import { Navigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PrivateRouter = ({children}) => {
    const { isLogged } = useAuth()
    return isLogged ? children : <Navigate to={"/login"} />
}

export default PrivateRouter