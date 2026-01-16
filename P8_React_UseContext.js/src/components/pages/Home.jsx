import React, { useEffect, useState } from 'react'
import HeroSection from '../molecules/HeroSection';

const Home = () =>  {



  const [count, setCount] = useState(40);
  const [explosionCounter, SetEXplosionCounter] = useState(10)

  function handleIncrement() {
    setCount((count) => count + 1);
  }

  function handleDecrement() {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  }


  useEffect(() => {

    SetEXplosionCounter((explosionCounter) => explosionCounter - 1)

  } , [] )



  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "50%", margin: "auto" }}>
 
      <h1>
        Bomb diffused!
      </h1>



      <HeroSection/>

    </div>
  );
}

export default Home