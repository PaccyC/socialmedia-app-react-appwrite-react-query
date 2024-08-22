import { Outlet } from "react-router-dom"
import LeftBar from "../components/ui/shared/LeftBar"
import TopBar from "../components/ui/shared/TopBar"
import Bottombar from "../components/ui/shared/Bottombar"

const RootLayout = () => {
  return (
    <div className=" w-full md:flex">

      <TopBar/>
      <LeftBar/>
      
      <section className=" flex flex-1 h-full">
        <Outlet/>
      </section>
     

      <Bottombar/>
    </div>
  )
}

export default RootLayout