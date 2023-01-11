import { NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header full">
            <div className="main-layout flex space-between">

            <h2 className="logo">TODO-APP</h2>
            <nav className="main-nav">
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink> |
                <NavLink to="/toy">Toys</NavLink>
            </nav>
            </div>
        </header>
    )
}