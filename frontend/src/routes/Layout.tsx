import { Outlet, Link } from "react-router-dom"
import './Layout.css'
import { HorizontalFlagStrip } from '../components/FlagBorder';


function Layout() {
    return (
        

        <div>
        <nav>

        <div className='navbar'>
            <h2 className="links">
                <Link style={{ color: "white" }} to="/">
                    🏠︎ 
                </Link>
            </h2>

            <img className="logo" src="logo/logo.png" alt="logo"/>

            <h2 className="links">
                <Link style={{ color: "white" }} to="/form">
                    Dive In!
                </Link>
            </h2>
            
        </div>
        </nav>

        <HorizontalFlagStrip />

        <Outlet />
    </div>

    )
}
export default Layout