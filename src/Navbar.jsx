import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="p-4 flex gap-2">
            <NavBtn to="/add">
                Add Progress
            </NavBtn>
            <NavBtn to="/view">
                View Progress
            </NavBtn>
        </nav>
    );
}

export default Navbar;

function NavBtn({ to = "/", children }) {
    return (
        <NavLink to={to}
            className={({ isActive }) => (`p-4 rounded border ${isActive ? "bg-black text-white" : "bg-white "}`)}
        >
            {children}
        </NavLink>
    )
}