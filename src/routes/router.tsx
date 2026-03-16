import { createBrowserRouter } from 'react-router-dom'
import Cover from '../pages/Cover'
import Submission from '../pages/Submission'
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
