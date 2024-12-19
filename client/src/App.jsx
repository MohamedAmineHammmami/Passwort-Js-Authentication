import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/profile", element: <Profile /> },
  { path: "/signIn", element: <SignIn /> },
  { path: "/signUp", element: <SignUp /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
