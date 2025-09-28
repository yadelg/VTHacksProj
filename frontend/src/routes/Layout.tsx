import { Outlet, Link } from "react-router-dom"
import './Layout.css'



function Layout() {
    return (
        

        <div>
        <nav>
        <div className='navbar'>
            <h2 className="links">
                <Link style={{ color: "red" }} to="/">
                    🏠︎ 
                </Link>
            </h2>

            <img className="logo" src="logo/logo.png" alt="logo"/>

            <h2 className="links">
                <Link style={{ color: "red" }} to="/form">
                    What We Do
                </Link>
            </h2>
            
        </div>
        </nav>
        <Outlet />
    </div>

    )
}
export default Layout