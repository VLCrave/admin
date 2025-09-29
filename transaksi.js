import { db } from "./auth.js";
import { collection, getDocs, addDoc, doc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import Swal from "sweetalert2";

const main = document.getElementById("mainContent");

export async function renderTransaksi() {
  const snap = await getDocs(collection(db,"transaksi"));
  let rows="";
  snap.forEach(d=>{
    let t=d.data();
    rows+=`
      <tr class="border-b border-gray-600">
        <td>${t.type}</td>
        <td>${t.produkNama||"-"}</td>
        <td>${t.jumlah||"-"}</td>
        <td>Rp ${t.total.toLocaleString("id-ID")}</td>
      </tr>
    `;
  });

  main.innerHTML=`
    <h2 class="text-2xl font-bold mb-4 text-white">🛒 Data Transaksi</h2>
    <button onclick="tambahTransaksi()" class="bg-green-600 px-4 py-2 rounded-lg text-white mb-4">+ Tambah Transaksi</button>
    <table class="w-full text-left text-white">
      <thead class="bg-gray-700"><tr><th>Jenis</th><th>Produk</th><th>Jumlah</th><th>Total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

window.tambahTransaksi=async()=>{
  const { value: jenis }=await Swal.fire({title:"Jenis Transaksi",input:"select",inputOptions:{penjualan:"Penjualan",pengeluaran:"Pengeluaran"},showCancelButton:true});
  if(!jenis) return;

  if(jenis==="penjualan"){
    const produkSnap=await getDocs(collection(db,"produk"));
    let options={}; produkSnap.forEach(d=>options[d.id]=`${d.data().nama} - Rp${d.data().harga}`);
    const { value: produkId }=await Swal.fire({title:"Pilih Produk",input:"select",inputOptions:options});
    if(!produkId) return;
    const { value: jumlah }=await Swal.fire({title:"Jumlah",input:"number"});
    if(!jumlah) return;
    const produkDoc=await getDoc(doc(db,"produk",produkId));
    const produk=produkDoc.data();
    await addDoc(collection(db,"transaksi"),{type:"penjualan",produkNama:produk.nama,jumlah:Number(jumlah),total:Number(jumlah)*produk.harga,tanggal:serverTimestamp()});
  } else {
    const { value: nama }=await Swal.fire({title:"Nama Pengeluaran",input:"text"});
    const { value: nominal }=await Swal.fire({title:"Nominal",input:"number"});
    await addDoc(collection(db,"transaksi"),{type:"pengeluaran",produkNama:nama,total:Number(nominal),tanggal:serverTimestamp()});
  }
  Swal.fire("Berhasil","Transaksi ditambahkan","success");
  renderTransaksi();
};
