import React, { useState, useEffect } from 'react';
import stone from './stone.mp3';
import rock from './stone.png';
import buy from './buy.mp3';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [upgrades, setUpgrades] = useState([
    {
      name: "Pickaxes",
      clicked: false,
      clickedCount: 0,
      intervalCounter: 0,
      price: 15,
      efficiency: 0.1
    },
    {
      name: "Hand Drills",
      clicked: false,
      clickedCount: 0,
      intervalCounter: 0,
      price: 500,
      efficiency: 1
    },
    {
      name: "Grinders",
      clicked: false,
      clickedCount: 0,
      intervalCounter: 0,
      price: 2000,
      efficiency: 8
    },
    {
      name: "Miners",
      clicked: false,
      clickedCount: 0,
      intervalCounter: 0,
      price: 5000,
      efficiency: 47
    },
    {
      name: "Mining Corporations",
      clicked: false,
      clickedCount: 0,
      intervalCounter: 0,
      price: 10000,
      efficiency: 260
    }
  ]);

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

  const handleUpgradeClick = (index) => {
    const upgrade = upgrades[index];
    if (count >= upgrade.price) {
      playSound();
      setUpgrades((prevUpgrades) => {
        const newUpgrades = [...prevUpgrades];
        newUpgrades[index] = {
          ...newUpgrades[index],
          clicked: true,
          clickedCount: newUpgrades[index].clickedCount + 1,
          intervalCounter: newUpgrades[index].intervalCounter + upgrade.efficiency,
          price: Math.round(upgrade.price + upgrade.price * 0.15),
        };
        return newUpgrades;
      });
      setCount((prevCount) => prevCount - upgrade.price);
    } else {
      alert("Not enough minerals");
    }
  };

  useEffect(() => {
    if (upgrades) {
      const intervals = [];
      upgrades.forEach((upgrade) => {
        if (upgrade.clicked) {
          const interval = setInterval(() => {
            setCount((prevCount) => prevCount + upgrade.intervalCounter);
          }, 1000);
          intervals.push(interval);
        }
      });
      return () => {
        intervals.forEach((interval) => clearInterval(interval));
      };
    }
  }, [upgrades]);


  return (
    <div className="background" style={{ backgroundImage: 'url("./mine.png")' }}>
      <div className='punch_counter_title'>
        Number of minerals mined:
        <br />
        {count.toFixed(1)} minerals
      </div>
      <div className='hr_bar'>

      </div>

      <img className="main_button" onClick={handleClick} src={rock}></img>

      <div className='tool_menu' style={{ backgroundImage: 'url("./wood.png")' }}>
        {upgrades.map((upgrade, index) => (
          <button key={index} onClick={() => handleUpgradeClick(index)}>
            {upgrade.clickedCount} {upgrade.name}
            <br />
            the price is: {upgrade.price}
          </button>
        ))}
      </div>
      <div className='upgrade_menu' style={{ backgroundImage: 'url("./wood.png")' }}>

      </div>
    </div>
  );
}

export default App;


