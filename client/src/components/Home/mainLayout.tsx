import Footer from '../../shared/Footer'
import Navbar from '../../shared/Navbar'
import { Outlet } from 'react-router'

export default function mainLayout() {
  return (
   <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1 container mx-auto">
        <Outlet />
      </main>

      <footer className="mt-auto">
       <Footer/>
      </footer>
    </div>
  )
}
