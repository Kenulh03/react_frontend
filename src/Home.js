import { Link } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

function Home() {

    const { isAuthenticated, logout } = useAuth();
    return(
        <div>
            <h1>Home</h1>
            <p>Welcome to homepage.</p>

            <Link to="/users">Users</Link>
            <br/>
            <Link to="/products">Products</Link>
            <br/>
            <Link to="/orders">Orders</Link>

            {isAuthenticated &&
            <button className="btn btn-primary" onClick={logout}>Log out</button>
            }
        </div>
    )
}

export default Home;