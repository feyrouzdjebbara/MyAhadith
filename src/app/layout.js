"use client"
import Footer from '@/Components/Footer';
import './globals.css'
<<<<<<< HEAD

import Link from 'next/link'


=======
import Link from 'next/link'



>>>>>>> 4fd5c25b38c82a8afada72f618be61de30cb770a
export default function RootLayout({ children }) {

 
  return (
   
    <html >
<<<<<<< HEAD
      <body >
=======
      <body>
>>>>>>> 4fd5c25b38c82a8afada72f618be61de30cb770a
        <nav className="bg-green-700 border-b border-gray-200 dark:bg-gray-900 rounded-b-lg">
          <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
            <Link href="/">
              <button className="ml-4 text-xl font-semibold text-white dark:text-green-400">
              الرئيسية
              </button>
            </Link>
        
           <h1 className='text-white font-bold'>My Ahadith</h1>
          </div>
        </nav>
        <div >
      {children}
    </div>
        <Footer/>
      </body>
    </html>
  )
}
