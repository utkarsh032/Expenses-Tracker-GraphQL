import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import TransactionPage from './Pages/TransactionPage'
import NotFound from './Pages/NotFound'
import { Header } from "./components/component/Header";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/UserQuery";
function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);

  console.log("Loading:", loading);
  console.log("Authenticated user:", data);
  console.log("Error:", error);

  if (loading) return null;

  return (
    <div className=" bg-neutral-950 h-[160vh] relative flex flex-col items-center  antialiased">
      {data?.authUser && <Header />}
      <Routes>
        <Route path='/' element={data.authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/login' element={!data.authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/signup' element={!data.authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route
          path='/transaction/:id'
          element={data.authUser ? <TransactionPage /> : <Navigate to='/login' />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>

  );
}

export default App
