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
    <h2 class="text-xl sm:text-2xl font-bold mb-4">📊 Laporan Arus Kas</h2>
    <div class="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
      <p class="mb-2">Pemasukan: <span class="text-green-400">Rp ${pemasukan.toLocaleString("id-ID")}</span></p>
      <p class="mb-2">Pengeluaran: <span class="text-red-400">Rp ${pengeluaran.toLocaleString("id-ID")}</span></p>
      <p class="font-bold text-green-300">Laba Kotor: Rp ${laba.toLocaleString("id-ID")}</p>
    </div>
    <div class="w-full overflow-x-auto">
      <canvas id="kasChart" class="bg-white rounded-xl p-2 min-w-[300px]"></canvas>
    </div>
  `;

  const ctx=document.getElementById("kasChart");
  new Chart(ctx,{
    type:"bar",
    data:{
      labels:["Pemasukan","Pengeluaran","Laba"],
      datasets:[{
        label:"Rp",
        data:[pemasukan,pengeluaran,laba],
        backgroundColor:["#22c55e","#ef4444","#3b82f6"]
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false
    }
  });
}
