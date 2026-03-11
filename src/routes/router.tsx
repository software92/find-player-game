import { createBrowserRouter } from 'react-router-dom'
import Cover from '../components/Cover'
import Submission from '../components/Submission'
import RootLayout from '../components/layout/RootLayout'

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    loader: () => {},
    children: [
      {
        index: true,
        element: <Cover />,
      },
      {
        path: '/submission',
        element: <Submission />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
