import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "Redux/Slices/AuthSlice";

export default function Navbar() {

    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    function onLogout() {
        dispatch(logout());
    }

    return (
        <div className="navbar bg-gray-800 px-20">
            <div className="flex-1">
                <Link to="/dashboard" className="btn btn-success-content normal-case text-xl">BookShelf</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    { authState.isLoggedIn && <li><Link to="/shelf">Shelfs</Link></li> }
                    { authState.isLoggedIn && <li><Link>{authState.username}</Link></li> }
                    <li>
                        <details>
                            <summary>Options</summary>
                            <ul className="p-2 bg-base-100">
                                {authState.isLoggedIn && <li><Link to="/signin" onClick={onLogout}>Logout</Link></li>}
                                {!authState.isLoggedIn && <li><Link to="/signup" >Signup</Link></li>}
                                {!authState.isLoggedIn && <li><Link to="/signin" >Signin</Link></li>}

                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
}