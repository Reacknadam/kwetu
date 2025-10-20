import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
