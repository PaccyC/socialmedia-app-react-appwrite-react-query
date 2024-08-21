import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
import { AllUsers, CreatePost, Explore, Home, PostDetails, Saved, UpdatePost, UpdateProfile } from './_root/pages'
import './index.css'
import { Routes,Route } from 'react-router-dom'

import { Toaster } from "./components/ui/toaster"

function App() {

  return (

  

    <main className='flex h-screen'>

      <Routes>
        <Route element={<AuthLayout/>}>

          <Route path='/signup' element={<SignupForm/>}/>
          <Route path='/signin' element={<SigninForm/>}/>
        </Route>
        <Route element={<RootLayout/>}>

        <Route index path='/' element={<Home/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/saved' element={<Saved/>}/>
        <Route path='/all-users' element={<AllUsers/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/update-post/:id' element={<UpdatePost/>}/>
        <Route path='/posts/:id' element={<PostDetails/>}/>
        <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </main>
    

  )
}

export default App
