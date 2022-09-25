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
  image?: Blob | null;
  setImage?: React.Dispatch<React.SetStateAction<Blob | null>>;
  submit?: () => void;
}

const Step: React.FC<StepProps> = ({
  children,
  step,
  order,
  number,
  setStep,
  description,
  camera,
  image,
  setImage,
  submit,
}) => {
  return (
    <div className={`absolute px-2 top-36 ${step == order && "z-50"}`}>
      <div
        className={`relative bg-white mt-28 rounded-2xl transition-all transform ${
          step == order ? "translate-x-0" : "-translate-x-[500px]"
        }`}
      >
        {camera ? (
          <Camera
            image={image || null}
            setImage={setImage || (() => {})}
            on={step == order}
          />
        ) : (
          <Tarjeta number={number} />
        )}
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
                onClick={submit ? submit : () => setStep(step + 1)}
                className="py-2 text-center text-lg font-bold w-full disabled:cursor-not-allowed transition-all transform enabled:active:scale-90 disabled:opacity-80 bg-gray-600 text-white rounded-lg"
              >
                {submit ? "Enviar" : "Siguiente"}
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
