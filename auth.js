import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = { /* isi config */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

onAuthStateChanged(auth, async (user) => {
  if (!user) return window.location.href = "login.html";
  const userDoc = await getDoc(doc(db, "users", user.uid));
  const data = userDoc.exists() ? userDoc.data() : {};
  document.getElementById("userName").innerText = data.name || "Admin";
  document.getElementById("userRole").innerText = data.role || "Admin";
});

window.logout = () => signOut(auth).then(()=>window.location.href="login.html");
