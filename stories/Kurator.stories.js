import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Beranda from '../src/pages/Beranda/Beranda_K';
import Pengguna from '../src/pages/Pengguna';
import Konten from '../src/pages/KurasiKonten';
import ReviewKonten from '../src/pages/Konten';

export default {
    title: 'Dashboard Kurator',
};

export const PageBeranda = () => <Beranda />
export const PageKonten = () => <Konten />
export const PageReviewKonten = () => <ReviewKonten />

