import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../Sidebar/index.jsx"
import Dashboard from '../Dashboard/index.jsx'

function Layout() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ width: '100%' }}>
                <Dashboard />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout