import React, { useEffect, useState } from 'react'
import img1 from '../assets/img-1.jpg'
import { TypeAnimation } from 'react-type-animation';
import ButtonComponent from '../Components/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';

const HomePage = () => {
  const [loading,setLoading] = useState(false);
   const navigate = useNavigate();

//    useEffect(() => {
//     (async function(){
//     setLoading(true);
//     const auth = await isAuth();
//     if(auth){
//       setLoading(false);
//       navigate('/dashboard')
//     }
//     else{
//       setLoading(false);
//       navigate('/')
//     }
//   })()
// },[])

  return (<>
      <Loader loading={loading}/>
        <div className='bg-box'>
        <TypeAnimation className='text-animate'
      sequence={[
        'Build, test, and discover front-end code.',
        800,
        'Accelerate your workflow in no time.',
        800 
      ]}
      wrapper="span"
      speed={50}
      style={{ padding : '60px',fontSize: '5vw', display: 'inline-block' ,color: 'white',width : '40%',fontWeight: "bold"}}
      repeat={Infinity}
    />
      <img className='img-1' src={img1} alt='background-1'/>
      <div className='auth-btns'>
        <ButtonComponent name={'Signup'} bgColor={'coral'}/>
        <ButtonComponent name={'Login'} bgColor={'coral'}/>
      </div>
      </div>
      </>
  )
}

export default HomePage
