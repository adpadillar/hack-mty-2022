import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Step from "../../components/Step";
import app from "../../utils/firebase";
import { generateAlphanumeric } from "../../utils/generateAlphanumeric";
import { hideEmail } from "../../utils/hideEmail";
import { userData } from "../onboarding/[number]";

interface TransferProps {}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const Transfer: NextPage<TransferProps> = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [amount, setAmount] = useState("");
  const [userData, userDataLoading, userDataError] = useDocumentData<userData>(
    user ? doc(db, "users", user.uid) : (null as any)
  );
  const [receiverData, setReceiverData] = useState<userData | null>(null);

  const [step, setStep] = useState(1);

  const [image, setImage] = useState<null | Blob>(null);
  const [cameraOn, setCameraOn] = useState(true);

  const submitImage = async () => {
    // TODO: Upload image to firebase storage
    const id = generateAlphanumeric(10);

    const storageRef = ref(storage, `faces/${id}.jpg`);
    const uploadTask = await uploadBytes(storageRef, image!);
    const downloadURL = await getDownloadURL(uploadTask.ref);

    getDocuments(downloadURL);
  };

  const getDocuments = async (downloadURL: string) => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("tarjeta.saldo", ">", 0));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = doc.data() as userData;

      compareFaces(data, downloadURL);
    });
  };

  const compareFaces = (user: userData, face_2: string) => {
    console.log(
      `Comparing ${user.persona.nombre_completo}, ${user.persona.autenticacion_facial} with ${face_2}`
    );
    // Make a request to the backend to compare the faces
    const fetchUrl = `http://127.0.0.1:8080/?j=${encodeURIComponent(
      user.persona.autenticacion_facial
    )}&k=${encodeURIComponent(face_2)}`;

    fetch(fetchUrl).then((res) =>
      res.text().then((data) => {
        const result = data === "True";
        if (result) {
          setReceiverData(user);
          setStep(2);
        } else {
          console.log("No match");
        }
        console.log(user.persona.nombre_completo, result, data);
      })
    );
  };

  const transferir = async () => {
    const amountNum = parseInt(amount);

    const receiverDoc = doc(db, "users", receiverData?.uid || "");
    const senderDoc = doc(db, "users", user?.uid || "");

    await updateDoc(receiverDoc, {
      "tarjeta.saldo": increment(amountNum),
    });
    await updateDoc(senderDoc, {
      "tarjeta.saldo": increment(-amountNum),
    });

    router.push("/app");
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      {!loading && user ? (
        <div className="min-h-screen from-rojo-banorte to-red-500 bg-gradient-to-b pt-12 overflow-hidden">
          {receiverData && (
            <div className="absolute top-4 w-full grid items-center justify-center">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${receiverData?.uid}.svg?mood[]=happy&background=%23ffffff`}
                alt="Profile Picture"
                className="w-36 h-36 rounded-full"
              />
            </div>
          )}
          <Step
            number={userData?.tarjeta.numero || ""}
            order={1}
            step={step}
            setStep={() => {}}
            camera={cameraOn}
            image={image}
            setImage={setImage}
            description="Toma una foto del destinatario de la transferencia"
            submit={submitImage}
          />
          <Step
            number={receiverData?.tarjeta.numero || ""}
            order={2}
            step={step}
            setStep={setStep}
            description={`Ingresa el monto a transferir a ${
              receiverData?.persona.nombre_completo
            } (${hideEmail(receiverData?.persona.correo_electronico || "")})`}
            submit={transferir}
          >
            <div className="px-4">
              <div className="pt-4 text-lg">
                <input
                  value={amount}
                  onChange={(e) => {
                    // Only allow digits
                    if (e.target.value.match(/^\d*$/)) {
                      setAmount(e.target.value);
                    }
                  }}
                  type="text"
                  placeholder="Cantidad"
                  className="w-full py-3 px-3 text-gray-600/70 border border-b-gray-600/70 border-x-white border-t-white"
                />
                <div className="text-xs px-2 py-3 text-gray-600/70 flex justify-between">
                  <div>
                    <p>Pesos Mexicanos (MXN)</p>
                  </div>
                </div>
              </div>
            </div>
          </Step>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Transfer;
