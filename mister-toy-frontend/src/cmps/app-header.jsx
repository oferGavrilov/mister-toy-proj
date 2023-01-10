import { NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header flex space-between main-layout">
            <h2 className="logo">Logo</h2>
            <nav className="main-nav">
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink> |
                <NavLink to="/toy">Toys</NavLink>
            </nav>
        </header>
    )
}