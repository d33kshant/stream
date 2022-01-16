import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import config from './firebase.config'

const firebaseApp =  initializeApp(config)

export const auth = getAuth(firebaseApp)
export const provider = new GoogleAuthProvider()

export const logout = () => signOut(auth).then(res=>window.location = '/').catch(alert)

export const firestore = getFirestore(firebaseApp)