import React, { useState, useEffect } from 'react';
import stone from './stone.mp3';
import rock from './stone.png';
import buy from './buy.mp3';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const [pickaxeClicked, setpickaxeClicked] = useState(false);
  const [pickaxeClickedCount, setpickaxeClickedCount] = useState(0);
  const [intervalCounter, setIntervalCounter] = useState(0);

  const [drillClicked, setdrillClicked] = useState(false);
  const [drillClickedCount, setdrillClickedCount] = useState(0);
  const [drillIntervalCounter, setdrillIntervalCounter] = useState(0);

  const [grinderClicked, setgrinderClicked] = useState(false);
  const [grinderClickedCount, setgrinderClickedCount] = useState(0);
  const [grinderIntervalCounter, setgrinderIntervalCounter] = useState(0);

  const [minerClicked, setminerClicked] = useState(false);
  const [minerClickedCount, setminerClickedCount] = useState(0);
  const [minerIntervalCounter, setminerIntervalCounter] = useState(0);

  const [corpClicked, setcorpClicked] = useState(false);
  const [corpClickedCount, setcorpClickedCount] = useState(0);
  const [corpIntervalCounter, setcorpIntervalCounter] = useState(0);

  const [pickPrice, setpickPrice] = useState(15);
  const [handPrice, sethandPrice] = useState(500);
  const [grindPrice, setgrindPrice] = useState(2000);
  const [minerPrice, setminerPrice] = useState(5000);
  const [corpPrice, setcorpPrice] = useState(10000);

  const [pickEff, setpickEff] = useState(0.1);
  const [drillEff, setdrillEff] = useState(1);
  const [grinderEff, setgrinderEff] = useState(8);
  const [minerEff, setminerEff] = useState(47);
  const [corpEff, setcorpEff] = useState(260);


  let audio = new Audio(stone);
  audio.volume = 0.2;

  let audio2 = new Audio(buy);
  audio2.volume = 0.2;

  const playSound = (action) => {
    if (action === "rock") {
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.log("Error playing sound:", error);
      });
    } else {
      audio2.currentTime = 0;
      audio2.play().catch((error) => {
        console.log("Error playing sound:", error);
      });
    }
  };

  const handleClick = () => {
    playSound("rock");
    setCount(prevCount => prevCount + 1);
  };

  const handlePickClicked = () => {
    if (count >= pickPrice) {
      if (!pickaxeClicked) {
        setpickaxeClicked(true);
      }
      playSound();
      setIntervalCounter(prevCounter => prevCounter + 0.1);
      setpickaxeClickedCount(prevCounter => prevCounter + 1);
      setCount(prevCount => prevCount - pickPrice);
      setpickPrice(prevPrice => Math.round(prevPrice + prevPrice * 0.15));
    } else {
      alert("Not enough Minerals");
    }
  };

  const handleDrillClicked = () => {
    if (count >= handPrice) {
      if (!drillClicked) {
        setdrillClicked(true);
      }
      playSound();
      setdrillIntervalCounter(prevCounter => prevCounter + 1);
      setdrillClickedCount(prevCounter => prevCounter + 1);
      setCount(prevCount => prevCount - handPrice);
      sethandPrice(prevPrice => Math.round(prevPrice + prevPrice * 0.15));
    } else {
      alert("Not enough Minerals");
    }
  };

  const handleGrinderClicked = () => {
    if(count >= grindPrice){
    if (!grinderClicked) {
      setgrinderClicked(true);
    }
    setgrinderIntervalCounter(prevCounter => prevCounter + 8);
    setgrinderClickedCount(prevCounter => prevCounter + 1);
    setCount(prevCount => prevCount - grindPrice);
    setgrindPrice(prevPrice => Math.round(prevPrice + prevPrice * 0.15));
  }else {
    alert("Not enough Minerals");
  }
  };

  const handleMinerClicked = () => {
    if(count >= minerPrice){
    if (!minerClicked) {
      setminerClicked(true);
    }
    setminerIntervalCounter(prevCounter => prevCounter + 47);
    setminerClickedCount(prevCounter => prevCounter + 1);
    setCount(prevCount => prevCount - minerPrice);
    setminerPrice(prevPrice => Math.round(prevPrice + prevPrice * 0.15));
  }else {
    alert("Not enough Minerals");
  }
  }

  const handleCorpClicked = () => {
    if(count >= corpPrice) {
    if (!corpClicked) {
      setcorpClicked(true);
    }
    setcorpIntervalCounter(prevCounter => prevCounter + 47);
    setcorpClickedCount(prevCounter => prevCounter + 1);
    setCount(prevCount => prevCount - corpPrice);
    setcorpPrice(prevPrice => Math.round(prevPrice + prevPrice * 0.15));
  }else {
    alert("Not enough Minerals");
  }
  }


  useEffect(() => {
    let interval;
    if (pickaxeClicked) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + intervalCounter);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pickaxeClicked, intervalCounter]);

  useEffect(() => {
    let interval;
    if (drillClicked) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + drillIntervalCounter);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [drillClicked, drillIntervalCounter]);

  useEffect(() => {
    let interval;
    if (grinderClicked) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + grinderIntervalCounter);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [grinderClicked, grinderIntervalCounter]);

  useEffect(() => {
    let interval;
    if (minerClicked) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + minerIntervalCounter);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [minerClicked, minerIntervalCounter]);

  useEffect(() => {
    let interval;
    if (corpClicked) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + corpIntervalCounter);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [corpClicked, corpIntervalCounter]);


  return (
    <div className="background" style={{ backgroundImage: 'url("./mine.png")' }}>
      <div className='punch_counter_title'>
        Number of minerals mined:
        <br />
        {count.toFixed(1)} minerals
      </div>


      <img className="main_button" onClick={handleClick} src={rock}></img>

      <div className='upgrade_menu' style={{ backgroundImage: 'url("./wood.png")' }}>
        <button onClick={handlePickClicked}>
          {pickaxeClickedCount} pickaxes
          <br />
          the price is: {pickPrice}
        </button>
        <button onClick={handleDrillClicked}>
          {drillClickedCount} Hand Drills
          <br />
          the price is: {handPrice}
        </button>
        <button onClick={handleGrinderClicked}>
          {grinderClickedCount} Grinders
          <br />
          the price is: {grindPrice}
        </button>
        <button onClick={handleMinerClicked}>
          {minerClickedCount} Miners
          <br />
          the price is: {minerPrice}
        </button>
        <button onClick={handleCorpClicked}>
          {corpClickedCount} Mining Corporations
          <br />
          the price is: {corpPrice}
        </button>
      </div>
    </div>
  );
}

export default App;



