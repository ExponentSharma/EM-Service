import React from 'react'

const Navbar = () => {
  return (
    <div className="bg-slate-800 h-16 px-8 flex items-center">
    <p className="font-bold text-3xl">EM Service🧑🏼‍💼</p>
    <div className="space-x-4 ml-auto">
      <a className="hover:text-blue-400" href="/"> Home </a>
      <a className="hover:text-blue-400" href="/"> Profile </a>
      <a className="hover:text-blue-400" href="/"> Logout </a>
    </div>
    </div>
  )
}

export default Navbar