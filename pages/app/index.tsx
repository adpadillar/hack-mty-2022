import { getAuth } from "firebase/auth";
import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import app from "../../utils/firebase";
import { userData } from "../onboarding/[number]";

interface AppProps {}

const auth = getAuth(app);
const db = getFirestore(app);

const App: NextPage<AppProps> = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, userDataLoading, userDataError] = useDocumentData<userData>(
    user ? doc(db, "users", user.uid) : (null as any)
  );

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      {loading ||
        (userDataLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="bg-gray-200">
              {/* Navegacion */}
              <div className="w-screen bg-[#FE0000] px-4 py-4 flex justify-between">
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${user?.uid}.svg?mood[]=happy&background=%23ffffff`}
                  alt="Profile Picture"
                  className="w-14 h-14 rounded-full"
                />
                <div className="text-white text-center font-semibold flex items-center justify-center">
                  <p>Hola {userData?.persona.nombre_completo}</p>
                </div>
                <div className="flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                </div>
              </div>

              {/* Botones */}
              <div className="grid grid-cols-5 w-screen text-[10px] shadow-xl bg-white">
                <div className="bg-gray-600 grid text-white items-center justify-center py-2">
                  <span className="material-symbols-outlined flex items-center justify-center">
                    recent_actors
                  </span>
                  <p className="font-semibold text-white text-center">
                    Cuentas
                  </p>
                </div>
                <div className="grid text-gray-600 items-center justify-center py-2">
                  <span className="material-symbols-outlined flex items-center justify-center">
                    trending_up
                  </span>
                  <p className="font-semibold text-gray-600 text-center">
                    Inversiones
                  </p>
                </div>
                <div className="grid text-gray-600 items-center justify-center py-2">
                  <span className="material-symbols-outlined flex items-center justify-center">
                    payments
                  </span>
                  <p className="font-semibold text-gray-600 text-center">
                    Pagos
                  </p>
                </div>
                <div className="grid text-gray-600 items-center justify-center py-2">
                  <span className="material-symbols-outlined flex items-center justify-center">
                    workspace_premium
                  </span>
                  <p className="font-semibold text-gray-600 text-center">
                    Recompensas
                  </p>
                </div>
                <div className="grid text-gray-600 items-center justify-center py-2">
                  <span className="material-symbols-outlined flex items-center justify-center">
                    local_atm
                  </span>
                  <p className="font-semibold text-gray-600 text-center">
                    Transferencia
                  </p>
                </div>
              </div>

              {/* Recompensas */}
              <div className="px-4 py-4">
                <h2 className="font-semibold text-gray-800 tracking-wider text-lg">
                  Recompensas
                </h2>
                <div className="pt-4">
                  <div className="rounded-xl overflow-hidden shadow-xl relative">
                    <img src="/recompensas.png" alt="" className="w-full" />
                    <div className="absolute right-0 bottom-4 bg-[#FE0000] px-6 rounded-l-xl text-white shadow-md">
                      <span className="material-symbols-outlined py-1 text-3xl">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mis cuentas */}
              <div className="px-4 py-4">
                <h2 className="font-semibold text-gray-800 tracking-wider text-lg">
                  Mis Cuentas
                </h2>
                <div className="pt-4">
                  <div className="rounded-xl overflow-hidden shadow-xl relative bg-white px-4 py-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-gray-800 tracking-wider text-lg">
                        Nómina Banorte
                      </h3>
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold text-gray-600/80">
                        $ {userData?.tarjeta.saldo}.00{" "}
                        <span className="text-sm font-light">MN</span>
                      </p>
                      <p className="font-semibold text-gray-600/80">
                        **** **** **** {userData?.tarjeta.numero.slice(-4)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="rounded-xl overflow-hidden shadow-xl relative bg-gray-600 px-4 py-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-white tracking-wider text-lg">
                        Contrata aquí
                      </h3>
                      <span className="material-symbols-outlined text-white">
                        chevron_right
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-light text-sm text-gray-100/80">
                        Tarjeta de Crédito, Pagarés y más.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default App;
