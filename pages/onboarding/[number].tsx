import { NextPage } from "next";
import Image from "next/image";
import { useReducer, useState } from "react";
import Head from "next/head";
import Logo from "../../public/logo.png";
import Step from "../../components/Step";
import { Camera } from "../../components";

export interface stepData {
  description: string;
  sections: {
    title: string;
    items: {
      icon: string;
      text: string;
    }[];
  }[];
}

interface OnboardingStepsProps {
  number: string;
}

const STEP_0: stepData = {
  description: "Ten a la mano la siguiente información para tu registro",
  sections: [
    {
      title: "Datos de la tarjeta",
      items: [
        { icon: "calendar_month", text: "Fecha de vencimiento" },
        { icon: "apps", text: "NIP de cajero" },
      ],
    },
    {
      title: "Datos personales",
      items: [
        { icon: "person", text: "Nombre completo" },
        { icon: "email", text: "Correo electrónico" },
        { icon: "face", text: "Autenticación facial" },
      ],
    },
  ],
};

interface userData {
  tarjeta: {
    fecha_vencimiento: string;
    nip_cajero: string;
  };
  persona: {
    nombre_completo: string;
    correo_electronico: string;
    autenticacion_facial: string;
  };
}

const OnboardingSteps: NextPage<OnboardingStepsProps> = ({ number }) => {
  const [step, setStep] = useState<number>(0);
  const [userData, setUserData] = useState<userData>({
    tarjeta: {
      fecha_vencimiento: "",
      nip_cajero: "",
    },
    persona: {
      nombre_completo: "",
      correo_electronico: "",
      autenticacion_facial: "",
    },
  });

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className="min-h-screen from-rojo-banorte to-red-500 bg-gradient-to-b pt-12 overflow-hidden">
        <div className="px-10">
          <Image src={Logo} />
          <p className="text-xl text-white text-center tracking-wider">
            ¡Bienvenido a Banorte Móvil!
          </p>
        </div>

        {/* Step 1 */}
        <Step
          order={0}
          step={step}
          setStep={setStep}
          number={number}
          description="Ten a la mano la siguiente información para tu registro"
        >
          {STEP_0.sections.map((section, idx) => {
            return (
              <div className="mx-6 pt-6" key={idx}>
                <div className="h-2 w-16 bg-red-500" />
                <div className="pt-2">
                  <h2 className="font-semibold text-gray-800 tracking-wider text-lg">
                    {section.title}
                  </h2>
                  <div className="pt-4 grid gap-y-2">
                    {section.items.map((item, idx) => {
                      return (
                        <div className="flex space-x-1" key={idx}>
                          <span className="material-symbols-outlined">
                            {item.icon}
                          </span>
                          <p className="text-gray-600/80 text-base tracking-wider">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </Step>
        <Step
          number={number}
          order={1}
          setStep={setStep}
          step={step}
          description="Captura los datos de tu tarjeta de crédito"
        >
          <div className="px-4">
            <div className="pt-4 text-lg">
              <input
                value={userData.tarjeta.fecha_vencimiento}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    tarjeta: {
                      ...userData.tarjeta,
                      fecha_vencimiento: e.target.value,
                    },
                  });
                }}
                type="text"
                placeholder="Fecha de vencimiento"
                className="w-full py-3 px-3 text-gray-600/70 border border-b-gray-600/70 border-x-white border-t-white"
              />
              <div className="text-xs px-2 py-3 text-gray-600/70 flex justify-between">
                <div>
                  <p>MM/YYYY</p>
                </div>
              </div>
            </div>
            <div className="pt-4 text-lg">
              <input
                value={userData?.tarjeta?.nip_cajero || ""}
                onChange={(e) => {
                  // if length is 4, then stop
                  if (e.target.value.length > 4) return;

                  // only allow digits
                  if (e.target.value.match(/[^0-9]/)) return;

                  setUserData({
                    ...userData,
                    tarjeta: {
                      ...userData.tarjeta,
                      nip_cajero: e.target.value,
                    },
                  });
                }}
                type="password"
                placeholder="NIP de cajero"
                className="w-full py-3 px-3 text-gray-600/70 border border-b-gray-600/70 border-x-white border-t-white"
              />
              <div className="text-xs px-2 py-3 text-gray-600/70 flex justify-between">
                <div>
                  <p>Ingresa los 4 dígitos</p>
                </div>
                <div>
                  <p>{userData.tarjeta.nip_cajero.length}/4</p>
                </div>
              </div>
            </div>
          </div>
        </Step>
        <Step
          order={2}
          number={number}
          setStep={setStep}
          step={step}
          description="Ingresa tus datos personales para completar tu registro"
          camera={
            !!(
              userData.persona.correo_electronico &&
              userData.persona.nombre_completo
            )
          }
        >
          <div className="px-4">
            <div className="pt-4 text-lg">
              <input
                value={userData.persona.nombre_completo}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    persona: {
                      ...userData.persona,
                      nombre_completo: e.target.value,
                    },
                  });
                }}
                type="text"
                placeholder="Nombre completo"
                className="w-full py-3 px-3 text-gray-600/70 border border-b-gray-600/70 border-x-white border-t-white"
              />
              <div className="text-xs px-2 py-3 text-gray-600/70 flex justify-between">
                <div>
                  <p>MM/YYYY</p>
                </div>
              </div>
            </div>
            <div className="pt-4 text-lg">
              <input
                value={userData?.persona.correo_electronico || ""}
                onChange={(e) => {
                  // Max length is 40
                  if (e.target.value.length > 40) return;

                  setUserData({
                    ...userData,
                    persona: {
                      ...userData.persona,
                      correo_electronico: e.target.value,
                    },
                  });
                }}
                type="text"
                placeholder="Correo electrónico"
                className="w-full py-3 px-3 text-gray-600/70 border border-b-gray-600/70 border-x-white border-t-white"
              />
              <div className="text-xs px-2 py-3 text-gray-600/70 flex justify-between">
                <div>
                  <p>Minimo 6 caracteres máximo 40</p>
                </div>
                <div>
                  <p>{userData.persona.correo_electronico.length}/40</p>
                </div>
              </div>
            </div>
          </div>
        </Step>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: {
  params: { number: any };
}) => {
  return {
    props: {
      number: context.params.number,
    },
  };
};

export default OnboardingSteps;
