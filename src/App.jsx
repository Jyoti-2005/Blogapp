import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Layout from './component/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './component/home/Home'
import Post from './component/post/Post'
import Login from './component/login/Login'
import Detail from './component/detail/Detail'
import { PostProvider } from './context/PostProvider'
import Explor from './component/explore/Explor'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/create-post', element: <Post /> },
      {path:'/explore-post',element:<Explor/>},
      { path: '/details/:id', element: <Detail /> }
    ]},
   { path: '/login', element: <Login /> }
])

function App() {
  return (
     <PostProvider>
      <RouterProvider router={router} />
    </PostProvider>
  )
}

export default App
