
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'

const Root = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>  
  )
}

export default Root