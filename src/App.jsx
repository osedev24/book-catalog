import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Books from './components/Books'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cart from './components/Cart'

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
      {path: '/mybooks', element: <Books />},
      {path: '/cart', element: <Cart/>},
  ])
  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
    </>
  )
}

export default App
