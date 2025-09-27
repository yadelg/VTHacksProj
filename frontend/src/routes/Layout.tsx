import { Outlet, Link } from "react-router-dom"



function Layout() {
    return (
        

        <div>
        <nav>
        <ul className='navbar'>
            <li className="links">
            <Link style={{ color: "white" }} to="/">
                Home
            </Link>
            </li>

            <li className="links">
            <Link style={{ color: "white" }} to="/form">
                Create A Crewmate
            </Link>
            </li>
            
        </ul>
        </nav>
        <Outlet />
    </div>

    )
}
export default Layout