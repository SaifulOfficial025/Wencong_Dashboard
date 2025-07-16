import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <div className="min-h-screen w-full font-space-grotesk">
      <Outlet/>
    </div>
  )
}

export default Main
