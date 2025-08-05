import React, { Component } from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'



export class Layout extends Component { 

  render() {
    return (
      <>
      <Navbar></Navbar>
   
   
      <Outlet></Outlet>
      
      </>
    )
  }
}

export default Layout