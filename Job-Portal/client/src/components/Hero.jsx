import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div>
      <div>
        <h2>Over 5000+ Jobs to apply</h2>
        
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus fugit possimus consectetur quibusdam error! Quae sequi est ipsum fugit optio possimus, voluptatum non magnam numquam beatae veniam, omnis dolore consequuntur illum sed, maxime fuga hic doloremque reiciendis quis asperiores praesentium reprehenderit quos sint? Recusandae consectetur eligendi ad ut pariatur aut!</p>
      <div>
        <div>
            <img src={assets.search_icon} alt="" />
            <input type="text" placeholder="Search for jobs" 
            className="max-sm:text-x5 p-2 rounded outline-none w-full" />
        </div>
        <div>
            <img src={assets.location_icon} alt="" />
            <input type="text" placeholder="Location" 
            className="max-sm:text-x5 p-2 rounded outline-none w-full" />
        </div>
        <button>
            
        </button>
      </div>
      </div>
    </div>
  );
};

export default Hero;
