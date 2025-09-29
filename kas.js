import { db } from "./auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const main = document.getElementById("mainContent");

export async function renderKas() {
  const snap = await getDocs(collection(db, "transaksi"));
  let pemasukan=0, pengeluaran=0;
  snap.forEach(d=>{
    let t=d.data();
    if(t.type==="penjualan") pemasukan+=t.total;
    else pengeluaran+=t.total;
  });
  let laba=pemasukan-pengeluaran;

  main.innerHTML = `
    <h2 class="text-2xl font-bold mb-4 text-white">📊 Laporan Arus Kas</h2>
    <div class="bg-gray-800 p-6 rounded-xl shadow-lg text-white mb-6">
      <p>Pemasukan: Rp ${pemasukan.toLocaleString("id-ID")}</p>
      <p>Pengeluaran: Rp ${pengeluaran.toLocaleString("id-ID")}</p>
      <p class="font-bold text-green-400">Laba Kotor: Rp ${laba.toLocaleString("id-ID")}</p>
    </div>
    <canvas id="kasChart" class="bg-white rounded-xl p-2"></canvas>
  `;

  const ctx=document.getElementById("kasChart");
  new Chart(ctx,{
    type:"bar",
    data:{
      labels:["Pemasukan","Pengeluaran","Laba"],
      datasets:[{label:"Rp",data:[pemasukan,pengeluaran,laba]}]
    }
  });
}
