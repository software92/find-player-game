import { RouterProvider } from 'react-router-dom'
import router from './routes/router'

const BrowserRouter = () => {
  return <RouterProvider router={router} />
}

export default BrowserRouter
