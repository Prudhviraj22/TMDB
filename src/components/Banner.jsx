import React from "react";

function Banner() {
  return (
    <div
      className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end "
      style={{
        backgroundImage: `url(https://cdn.s7.shopdisney.asia/is/image/ShopDisneyAPAC/apac_plp_charactersmovies_avengers_avengersteam_mb_d?fit=constrain&cropN=0,0,1,1&fmt=jpeg&qlt=90&wid=1200)`,
      }}
    >
        <div className="text-white text-xl text-center w-full bg-gray-900/60 p-4">Avengers </div>
    </div>
  );
}

export default Banner;
