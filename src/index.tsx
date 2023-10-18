import './styles/globals.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AllQuestions } from './pages/AllQuestions'
import { Stats } from './pages/Stats'
import { Layout } from './pages/Layout'
import './i18n'
import { ChooseFrom } from './pages/ChooseFrom'
import { Home } from './pages/Home'

export const router = createBrowserRouter( [
  {
    element: <Layout/>,
    errorElement: <Navigate to={'/'}/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/all-questions',
        element: <AllQuestions/>,
      },
      {
        path: '/stats',
        element: <Stats/>,
      },
      {
        path: '/choose-from',
        element: <Navigate to={'/choose-from/3'}/>,
      },
      {
        path: '/choose-from/:n',
        element: <ChooseFrom/>
      }
    ]
  }
] )

const root = ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement )
root.render( <React.StrictMode>    <RouterProvider router={router} />  </React.StrictMode> )
