import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default async function createAccount(email: string, password: string) {
  const auth = getAuth();
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error);
  }
}
