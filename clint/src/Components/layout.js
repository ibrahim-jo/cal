import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'

const layout = () => {
  return (
    <main className="App">
      <Header />
           <Outlet  />
        </main>
  )
}

export default layout