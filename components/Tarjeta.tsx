import Image from "next/image";
import React from "react";
import Logo from "../public/logo.png";
import Chip from "../public/chip-tarjeta.png";
import Contactless from "../public/heading-contactless.png";

interface TarjetaProps {
  number: string;
}

const Tarjeta: React.FC<TarjetaProps> = ({ number }) => {
  return (
    <div className="absolute -top-12 w-full h-20 flex justify-center items-center">
      <div className="aspect-video h-36 from-rojo-banorte to-red-500 bg-gradient-to-b shadow-2xl rounded-lg border border-white pt-1">
        <div>
          <Image src={Logo} width={140} height={26} />
        </div>
        <div className="px-4 py-2 flex space-x-1">
          <div>
            <Image src={Chip} width={25} height={22} />
          </div>
          <div>
            <Image src={Contactless} width={25} height={22} />
          </div>
        </div>
        <div>
          <p className="text-white text-center text-base font-semibold pt-2">
            **** **** **** {number.slice(-4)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;
