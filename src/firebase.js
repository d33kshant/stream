import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import config from './firebase.config'

const firebaseApp =  initializeApp(config)

export const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()

export const loginWithGoogle = () => {
	signInWithRedirect(auth, provider)
	.catch(alert)
}

export const logout = () => signOut(auth).then(res=>window.location = '/').catch(alert)

export const firestore = getFirestore(firebaseApp)