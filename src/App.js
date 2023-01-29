import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
// import About from './components/About';
// import Cart from './components/Cart';
// import Contact from './components/Contact';
import RestaurantDetails from './components/RestaurantDetails';
import Footer from './components/Footer';
import Error from './components/Error';
import Shimmer from './components/Shimmer';
import './style.css';

const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Cart = lazy(() => import('./components/Cart'));
const Instamart = lazy(() => import('./components/Instamart'));

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: (
          <Suspense>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantDetails />,
      },
      {
        path: '/instamart',
        element: (
          <Suspense fallback={<Shimmer />}>
            <Instamart />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={routers} />);
