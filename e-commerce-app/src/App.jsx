import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout';
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Layout />} />)
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
