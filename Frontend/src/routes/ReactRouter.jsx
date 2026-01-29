import React from 'react'
import { BrowserRouter as Router,RouterProvider, Route, Routes, Link, createBrowserRouter } from 'react-router-dom'
import New from '../files/New.jsx'
import Sales from '../files/Sales.jsx'
import Women from '../files/Women.jsx'
import  Men from '../files/Men.jsx'
import Fragrances from '../files/Fragrances.jsx'
import Kids from '../files/Kids.jsx'
import Accessories from '../files/Accessories.jsx'
import Getinspired from '../files/Getinspired.jsx'
import Home from '../files/Home.jsx'
import Main from '../assets/components/e-Components/Main.jsx'
import MainLayout from '../Layouts/MainLayout.jsx'
import NotFound from '../files/NotFound.jsx'


const router = createBrowserRouter([
  {
  path: '/',
  element: <MainLayout />,
  children: [
    { index: true, element: <Home /> },   
    { path: 'men', element: <Men />},
    { path: 'kids', element: <Kids /> }, 
    { path: 'sales', element: <Sales /> },
    { path: 'accessories', element: <Accessories /> },
    { path: 'fragrances', element: <Fragrances /> },
    { path: 'getinspired', element: <Getinspired /> },
    { path: 'new', element: <New /> },
    { path: 'women', element: <Women /> },
    { path: '*', element: <NotFound /> },
    
  ]
}


   
])

const ReactRouter = () => {
  return (
    <div>
       <RouterProvider router={router} />
    </div>
  )
}

export default ReactRouter
