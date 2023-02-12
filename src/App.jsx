import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";


const DetailPage = lazy(() => import("./pages/DetailPage"))
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {

  return (
    <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/" element={ 
      <Suspense fallback={ <Loader /> }>
        <Dashboard/>
      </Suspense>
         } />
       
        <Route path="/detail/:id" element={ 
      <Suspense fallback={ <Loader /> }>
        <DetailPage /> 
      </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
