import { Route, Routes } from "react-router-dom";

import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import TransactionPage from './Pages/TransactionPage'
import NotFound from './Pages/NotFound'
import { Header } from "./components/component/Header";

function App() {
  const authUser = true;
  return (
    <div className=" bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      {authUser && <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/transaction/:id' element={<TransactionPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App
