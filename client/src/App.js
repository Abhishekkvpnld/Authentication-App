
import './App.css';
import {createBrowserRouter,RouterProvider } from "react-router-dom"

//import all components

import Recovery from './Components/Recovery';
import Register from './Components/Register';
import Reset from './Components/Reset';
import Username from './Components/Username';
import Password from './Components/Password';
import PageNotFound from './Components/PageNotFound';
import Profile from './Components/Profile';


//All routes

const router = createBrowserRouter([
  {
    path:"/",
    element:<Username></Username>
  },
  {
path:"/register",
element:<Register></Register>
  },
  {
    path:"/password",
    element:<Password></Password>
      },
      {
        path:"/recovery",
        element:<Recovery></Recovery>
          },
          {
            path:"profile",
            element:<Profile></Profile>
              },
              {
                path:"/reset",
                element:<Reset></Reset>
                  },
                  {
                    path:"/pageNotFound",
                    element:<PageNotFound></PageNotFound>
                      },
]);

//App function

function App() {
  return (
   <main>
    <RouterProvider router={router}></RouterProvider>
   </main>
  );
}

export default App;
