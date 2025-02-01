import HomeContent from "../Components/HomeContent"
import HomeHeader from "../Components/HomeHeader"

const HomePage = () => {

  return (<div className="home-page">
         <HomeHeader/>
         <HomeContent/>
         <p className='footer-desc'>© 2025 CodeBox. All rights reserved.</p>
      </div>
  )
}

export default HomePage
