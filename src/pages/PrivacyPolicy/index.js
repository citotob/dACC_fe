import React from "react";
import style from "./style.module.scss";

const index = () => {
  const privacyPolicies = [
    {
      title: "Deskripsi Singkat",
      text: "SMASLAB merupakan aplikasi yang digunakan untuk survey lokasi AI dan BTS",
    },
    {
      title: "Deskripsi Lengkap",
      text: "SMASLAB digunakan untuk proses pengelolaan dokumen dalam kegiatan survey Akses Internet dan BTS (Base Transceiver Station) dalam komponen pencatatan dan pertukaran informasi terkait kondisi di lokasi survey yang akan dibangun infrastruktur sehingga dengan aplikasi SMASLAB dapat memudahkan surveyor dalam pengiriman informasi tersebut.",
    },
    {
      title: "Kebijakan Privasi",
      text: "SMASLAB merupakan aplikasi yang digunakan oleh BAKTI beserta Staff untuk melakukan kegiatan survey di lapangan untuk pembangunan infrastruktur Akses Internet dan BTS (Base Transceiver Base). Aplikasi ini disediakan oleh BAKTI Kominfo dalam memudahkan kegiatan pengelolaan dokumentasi serta pemusatan informasi survey di lapangan yang dapat digunakan sesuai dengan fungsi dan sebagaimana mestinya.",
      text2:
        "Halaman ini digunakan untuk informasi kepada pengunjung ataupun pengguna mengenai kebijakan Kami (SMASLAB) dalam pengumpulan, penggunaan dan pengungkapan informasi Pribadi jika ada yang menyetujui serta memilih untuk menggunakan layanan Kami.",
      text3:
        "Jika Anda memilih menggunakan layanan Kami, maka Anda menyetujui pengumpulan data penggunaan informasi terkait dengan kebijakan ini.",
    },
    {
      title: "Informasi Yang Dikumpulkan",
      text: "Informasi Pribadi yang dikumpulkan berupa: Nama, No telepon, alamat email, Nama Instansi atau Lembaga, dokumen pendukung serta gambar yang digunakan sebagai penunjang layanan. Informasi Pribadi Anda Kami (SMASLAB) terima pada saat Anda mengunjungi Aplikasi Mobile SMASLAB dan saat Anda mendaftarkan diri Anda sebagai Pengguna untuk dapat menggunakan Aplikasi SMASLAB ini.",
    },
    {
      title: "Penggunaan Data Personal Anda",
      text: "Informasi Pribadi Anda digunakan untuk layanan pendaftaran sebagai Staff Surveyor dalam melaksanakan kegiatan survei Akses Internet dan BTS (Base Transceiver Station)",
    },
    {
      title: "Perlindungan Data Personal",
      text: "Setiap informasi pribadi yang Anda berikan kepada kami, termasuk atau mirip dengan nomor telepon, nama, alamat email, dan foto tidak akan dirilis, dijual, atau disewakan kepada setiap kelompok atau individu di luar BAKTI dan rekanannya.",
      text2:
        "Data Personal yang ada pada Kebijakan Kerahasiaan ini berarti nama, alamat email, nomor telepon, dan foto. Penggunaan data personal yang disediakan atau diminta kepada kami akan dibatasi untuk keamanan dan perlindungan dari pihak lain serta juga untuk kemudahan sesuai dengan perjanjian layanan",
      text3:
        "Istilah yang digunakan dalam Kebijakan Privasi ini memiliki arti yang sama seperti dalam Syarat dan Ketentuan kami, yang dapat diakses di aplikasi SMASLAB Mobile kecuali dinyatakan sebaliknya dalam Kebijakan Privasi ini.",
    },
    {
      title: "Log Data",
      text: "Kami ingin memberitahu Anda bahwa setiap kali Anda menggunakan Layanan Kami, jika terjadi kesalahan pada aplikasi, Kami mengumpulkan data dan informasi (melalui produk pihak ketiga) di ponsel Anda yang disebut Data Log. Data Log ini dapat mencakup informasi seperti alamat Protokol Internet ('IP') perangkat Anda, nama perangkat, versi sistem operasi, konfigurasi aplikasi ketika menggunakan Layanan kami, waktu dan tanggal penggunaan Layanan oleh Anda, Lokasi dan statistik lainnya.",
    },
    {
      title: "Cookie",
      text: "Adalah file dengan sejumlah kecil data yang biasanya digunakan sebagai pengidentifikasi unik anonim. Ini dikirim ke browser Anda dari situs web yang Anda kunjungi dan disimpan di memori internal perangkat Anda. Layanan ini tidak menggunakan 'cookie' ini secara eksplisit. Namun, aplikasi dapat menggunakan kode pihak ketiga dan perpustakaan yang menggunakan 'cookie' untuk mengumpulkan informasi dan meningkatkan layanan mereka. Anda memiliki opsi untuk menerima atau menolak cookie ini dan tahu kapan cookie dikirim ke perangkat Anda. Jika Anda memilih untuk menolak cookie kami, Anda mungkin tidak dapat menggunakan sebagian dari Layanan ini.",
    },
    {
      title: "Izin Lokasi",
      text: "Saat Anda menggunakan Aplikasi SMASLAB, Kami dapat mengumpulkan dan memproses informasi tentang lokasi Anda sebenarnya. Kami menggunakan berbagai teknologi untuk menentukan lokasi, GPS, dan sensor lainnya yang dapat memberikan informasi mengenai Longitude dan Latitude di dalam Gambar atau Foto yang diunggah untuk menentukan Lokasi Site/Survey, dan tidak untuk diperjualbelikan data tersebut. Sehingga gambar tersebut dapat memuat informasi mengenai Lokasi Pengambilan.",
    },
    {
      title: "Pengumpulan Dan Penggunaan Informasi",
      text: "Untuk pengalaman yang lebih baik, saat menggunakan Layanan Kami, Kami mungkin meminta Anda untuk memberi kami informasi tertentu yang dapat diidentifikasi secara pribadi. Informasi yang Kami minta akan disimpan oleh Kami dan digunakan sebagaimana dijelaskan dalam kebijakan privasi ini. Aplikasi ini memang menggunakan layanan pihak ketiga yang dapat mengumpulkan informasi yang digunakan untuk mengidentifikasi Anda. Tautan ke kebijakan privasi penyedia layanan pihak ketiga yang digunakan oleh aplikasi.",
    },
  ];
  return (
    <div
      className={`${style.pageFont} d-flex flex-column justify-content-center align-items-center `}
    >
      <div className='d-flex flex-column px-4' style={{ maxWidth: "600px" }}>
        {privacyPolicies.map((item, i) => {
          return (
            <>
              <p className='text-center text-uppercase font-weight-bold mt-4 mb-2'>
                {item.title}
              </p>
              <p className='text-center'>{item.text}</p>
              {item.text2 && <p className='text-center'>{item.text2}</p>}
              {item.text3 && <p className='text-center'>{item.text3}</p>}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default index;
