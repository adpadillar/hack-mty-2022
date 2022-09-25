import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "../../public/logo.png";

interface LoginProps {}

interface formState {
  number: string;
  type: 10 | 16;
}

const Login: NextPage<LoginProps> = () => {
  const [formState, setFormState] = useState<formState>({
    number: "",
    type: 10,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: formState = { ...formState };

    // Check if the input is already 16 characters long
    if (e.target.value.length > 16) {
      return;
    }

    // If the input is greater than 10, it's a credit card
    if (e.target.value.length > 10) {
      newState.type = 16;
    } else {
      newState.type = 10;
    }

    // Check if the input text is a digit
    if (e.target.value.match(/^\d*$/)) {
      newState.number = e.target.value;
    }

    setFormState({ ...newState });
  };

  return (
    <div className="min-h-screen from-rojo-banorte to-red-500 bg-gradient-to-b px-2 pt-12 overflow-scroll">
      <div>
        <Image src={Logo} />
        <p className="text-xl text-white text-center tracking-wider">
          ¡Bienvenido a Banorte Móvil!
        </p>
      </div>

      <div className="grid space-y-2 pt-32">
        <div className="min-w-full bg-white rounded-xl px-3 py-2 grid space-y-2">
          <div className="grid space-y-3">
            <h1 className="font-bold">¿Eres cliente banorte?</h1>
            <p className="px-10 text-center">
              Ingresa tu número de tarjeta o cuenta{" "}
              <span className="font-semibold">para activar Banorte Móvil</span>
            </p>
          </div>
          <div className="pt-4 text-lg">
            <input
              value={formState.number}
              onChange={handleChange}
              type="text"
              placeholder="Cuenta o tarjeta"
              className="w-full py-3 px-3 text-gray-600/70 border border-b-gray-600/70 border-x-white border-t-white"
            />
            <div className="text-xs px-2 py-3 text-gray-600/70 flex justify-between">
              <div>
                <p>10 digitos tarjeta</p>
                <p>16 digitos cuenta</p>
              </div>
              <div>
                <p>
                  {formState.number.length}/{formState.type}
                </p>
              </div>
            </div>
            <div className="py-2">
              <button
                onClick={() => router.push(`/onboarding/${formState.number}`)}
                className="py-2 text-center text-lg font-bold w-full disabled:cursor-not-allowed transition-all transform enabled:active:scale-90 disabled:opacity-80 bg-gray-600 text-white rounded-lg"
                disabled={formState.number.length != formState.type}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
