import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDies7HBA_N8xfk_8DJlM-EFbi_GTXDJpI",
  authDomain: "insan-cemerlang-996a1.firebaseapp.com",
  projectId: "insan-cemerlang-996a1",
  storageBucket: "insan-cemerlang-996a1.appspot.com",
  messagingSenderId: "137591161633",
  appId: "1:137591161633:web:e89f54d3cf2a29d9fdb460",
  measurementId: "G-B5KFGBXLMV"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahBarang(item, harga, jumlah) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "item"), {
      item: item,
      harga: harga,
      jumlah: jumlah
    })
    
    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data barang")
  } catch (error) {
  // menampilkan pesan gagal
  console.console.log("gagal menyimpan data barang")
  }
}

export async function ambilDaftarBarang() {
  const refDokumen = collection(basisdata, "item");
  const kueri = query(refDokumen, orderBy("item"));
  const cuplikankueri = await getDocs(kueri);
  
  let hasilkueri = [];
  cuplikankueri.forEach((dokumen) => {
    hasilkueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      harga: dokumen.data().harga,
      jumlah: dokumen.data().jumlah
    })
  })
  
  return hasilkueri;
}

export async function hapusBarang(id) {
  await deleteDoc(doc(basisdata, "barang", id))
}

export async function ubahBarang(id, itembaru, harhabaru, jumlahbaru) {
  await updateDoc(
    doc(basisdata, "barang", id),
    { item: itembaru, harga: hargabaru, jumlah: jumlahbaru }
    )
}

export async function ambilBarang(id) {
  const refDokumen = await doc(basisdata, "item", id)
  const snapshotDocumen = await getDoc(refDokumen)
  
  return await snapshotDocumen.data()
}