import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className='h-screen flex flex-col overflow-hidden'>
            <Navbar />
            <main className='flex-1 overflow-auto '>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout