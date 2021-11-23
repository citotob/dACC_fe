import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Beranda from '../src/pages/Beranda/Beranda_SC';
import Pengguna from '../src/pages/Pengguna';
import Konten from '../src/pages/Konten';
import KontenTayang from '../src/pages/KontenTayang';
import RekomendasiJadwal from '../src/pages/RekomendasiJadwal';
import KelolaTiket from '../src/pages/KelolaTiket';
import Faq from '../src/pages/Faq';

export default {
    title: 'Dashboard Support Center',
};

export const PageBeranda = () => <Beranda />
export const PagePengguna = () => <Pengguna />
export const PageKonten = () => <Konten />
export const PageRekomendasiJadwal = () => <RekomendasiJadwal />
export const PageKontenTayang = () => <KontenTayang />
export const PageKelolaTiket = () => <KelolaTiket />
export const PageFaq = () => <Faq />

