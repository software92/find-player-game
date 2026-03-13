import { createBrowserRouter } from 'react-router-dom'
import Cover from '../components/Cover'
import Submission from '../components/Submission'
import RootLayout from '../components/layout/RootLayout'
import routerPath from '../constant/routerPath'

const routes = [
  {
    path: routerPath.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Cover />,
      },
      {
        path: routerPath.SUBMISSION,
        element: <Submission />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
