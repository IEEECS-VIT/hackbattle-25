import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { checkStatus } from "../api/user";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "hackbattle-25.firebaseapp.com",
  projectId: "hackbattle-25",
  storageBucket: "hackbattle-25.appspot.com",
  messagingSenderId: "523134092665",
  appId: "1:523134092665:web:c1cc17fed967ad83ee1ba8",
  measurementId: "G-KE9DQEGDGG",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

async function getUserContext(accessToken, router) {
  try {
    const res = await checkStatus(accessToken);
    console.log("res", res);

    if (res.status === 204) {
      window.dispatchEvent(new CustomEvent("showToast", { detail: { text: "User is not registered" } }));
      return;
    } else {
      const userStatus = res.data?.isInTeam;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("UserStatus", userStatus);

      window.dispatchEvent(new CustomEvent("showToast", { detail: { text: "Login successful" } }));

      if (userStatus) {
        router.push("/team");
      } else {
        router.push("/dashboard");
      }
      return;
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    window.dispatchEvent(new CustomEvent("showToast", { detail: { text: "Something went wrong" } }));
  }
}

export async function loginWithGoogle(type, router) {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  if (type === "internal") {
    provider.setCustomParameters({ hd: "vitstudent.ac.in" });
  }

  const result = await signInWithPopup(auth, provider);

  if (type === "internal" && !result.user.email.endsWith("@vitstudent.ac.in")) {
    window.dispatchEvent(new CustomEvent("showToast", { detail: { text: "You must use a @vitstudent.ac.in email" } }));
    return;
  }

  await getUserContext(result.user.accessToken, router);
}


export async function logout() {
  await signOut(auth);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("UserStatus");
}
