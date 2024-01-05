
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


//Auth middlewares
import { AutherizeUser,ProtectRoute } from './Middlewares/auth';

//All routes

const router = createBrowserRouter([
  {
    path:"/",
    element:<Username></Username>
  },
  {
path:"/register",
element:<Register/>
  },
  {
    path:"/password",
    element:<ProtectRoute><Password/></ProtectRoute>
      },
      {
        path:"/recovery",
        element:<Recovery/>
          },
          {
            path:"profile",
            element:<AutherizeUser><Profile/></AutherizeUser>
              },
              {
                path:"/reset",
                element:<Reset/>
                  },
                  {
                    path:"/pageNotFound",
                    element:<PageNotFound/>
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
