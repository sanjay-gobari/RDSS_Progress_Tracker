import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <main className='flex-1'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout