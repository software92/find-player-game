import { createBrowserRouter } from 'react-router-dom'
import Cover from './components/Cover'
import Submission from './components/Submission'
import RootLayout from './components/layout/RootLayout'

const browserRoute = [
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

const browserRouter = createBrowserRouter(browserRoute)

{
  /* <Header />
<Container>
  <ClubViews />
  <Routes>
    <Route path='/submission' element={<Submission />} />
    <Route path='/' element={<Cover />} />
  </Routes>
</Container> */
}

export default browserRouter
