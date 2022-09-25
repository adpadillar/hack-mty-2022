import React from "react";
import Camera from "./Camera";
import Tarjeta from "./Tarjeta";

interface StepProps {
  step: number;
  order: number;
  children?: React.ReactNode;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  number: string;
  description: string;
  camera?: boolean;
}

const Step: React.FC<StepProps> = ({
  children,
  step,
  order,
  number,
  setStep,
  description,
  camera,
}) => {
  return (
    <div className={`absolute px-2 top-36 ${step == order && "z-50"}`}>
      <div
        className={`relative bg-white mt-28 rounded-2xl transition-all transform ${
          step == order ? "translate-x-0" : "-translate-x-[500px]"
        }`}
      >
        {camera ? <Camera on={step == order} /> : <Tarjeta number={number} />}
        <div className="pt-20">
          <div>
            <p className="text-center tracking-wider text-gray-600/80 px-16">
              {description}
            </p>
          </div>

          {children}

          <div>
            <div className="py-2 px-4 pt-8 pb-16 grid gap-y-2">
              <button
                onClick={() => setStep(step + 1)}
                className="py-2 text-center text-lg font-bold w-full disabled:cursor-not-allowed transition-all transform enabled:active:scale-90 disabled:opacity-80 bg-gray-600 text-white rounded-lg"
              >
                Continuar
              </button>
              <button
                disabled={step == 0}
                onClick={() => setStep(step - 1 < 0 ? 0 : step - 1)}
                className="py-2 text-center text-lg font-bold w-full disabled:cursor-not-allowed transition-all transform enabled:active:scale-90 disabled:opacity-80 bg-gray-600 text-white rounded-lg"
              >
                Atras
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;
