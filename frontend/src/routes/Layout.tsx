import { Outlet, Link } from "react-router-dom"
import './Layout.css'



function Layout() {
    return (
        

        <div>
        <nav>
        <div className='navbar'>
            <h3 className="links">
            <Link style={{ color: "white" }} to="/">
                Home
            </Link>
            </h3>

            <h3 className="links">
            <Link style={{ color: "white" }} to="/form">
                Get Started!
            </Link>
            </h3>
            
        </div>
        </nav>
        <Outlet />
    </div>

    )
}
export default Layout