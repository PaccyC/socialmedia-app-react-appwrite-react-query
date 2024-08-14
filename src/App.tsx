import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
import { Home } from './_root/pages'
import './index.css'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'

import { Toaster } from "./components/ui/toaster"

function App() {

  return (

    <Router>

    <main className='flex h-screen'>

      <Routes>
        <Route element={<AuthLayout/>}>

          <Route path='/signup' element={<SignupForm/>}/>
          <Route path='/signin' element={<SigninForm/>}/>
        </Route>
        <Route element={<RootLayout/>}>

        <Route index path='/' element={<Home/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </main>
    </Router>

  )
}

export default App
