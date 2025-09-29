import { renderKas } from "./kas.js";
import { renderTransaksi } from "./transaksi.js";
import { renderPengaturan } from "./pengaturan.js";

const main = document.getElementById("mainContent");

function renderDashboard() {
  main.innerHTML = `
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer" onclick="loadContent('kas')">
        <h3 class="text-lg font-bold">📊 Laporan Arus Kas</h3>
        <p class="text-gray-300">Pantau arus kas otomatis</p>
      </div>
      <div class="bg-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer" onclick="loadContent('transaksi')">
        <h3 class="text-lg font-bold">🛒 Data Transaksi</h3>
        <p class="text-gray-300">Kelola data transaksi</p>
      </div>
      <div class="bg-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer" onclick="loadContent('pengaturan')">
        <h3 class="text-lg font-bold">⚙️ Pengaturan</h3>
        <p class="text-gray-300">Atur preferensi sistem</p>
      </div>
    </div>
  `;
}

window.loadContent = (section) => {
  if(section==="kas") renderKas();
  else if(section==="transaksi") renderTransaksi();
  else if(section==="pengaturan") renderPengaturan();
};

renderDashboard();
