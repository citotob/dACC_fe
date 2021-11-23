import {
  SET_BTS_MAIN,
  SET_STATE_SECTION1,
  SET_STATE_SECTION2,
  SET_STATE_SECTION3,
  SET_STATE_SECTION4,
  SET_STATE_SECTION5,
  SET_STATE_SECTION6,
  SET_STATE_SECTION7,
  SET_STATE_SECTION8,
  SET_STATE_SECTION9,
  SET_STATE_SECTION10,
  SET_STATE_SECTION11,
  SET_STATE_SECTION12,
  SET_STATE_SECTION13,
  SET_STATE_SECTION14,
  SET_STATE_SECTION15,
  SET_STATE_SECTION16,
  SET_STATE_SECTION17,
  SET_STATE_SECTION18,
  SET_STATE_SECTION19,
  SET_STATE_SECTION20,
  SET_STATE_SECTION21,
  SET_STATE_SECTION22,
  SET_STATE_SECTION23,
  SET_STATE_SECTION24,
  SET_STATE_SECTION25,
  SET_STATE_SECTION26,
  SET_STATE_SECTION27,
  SET_STATE_SECTION28,
  SET_STATE_SECTION29,
  SET_STATE_SECTION30,
  SET_STATE_SECTION31,
  SET_STATE_SECTION32,
  SET_STATE_SECTION33,
  SET_STATE_SECTION34,
  SET_STATE_SECTION35,
  SET_STATE_SECTION36,
  SET_STATE_SECTION37,
  SET_STATE_SECTION38,
  SET_STATE_SECTION39,
  SET_STATE_SECTION40,
  SET_STATE_SECTION41,
  SET_STATE_SECTION42,
  SET_STATE_SECTION43,
  SET_STATE_SECTION44,
} from "./actionTypes";

const initialState = {
  btsMain: {
    section1: {
      tipe: "",
      siteid: "",
      kontraktor: "",
      namaproject: "",
      dokumenno: "",
      rev: "",
      tanggalsurvey: "",
      namasurveyor: "",
      nomortelepon: "",
      email: "",
      statussite: "",
      fotoktp: {
        base64: "",
        extension_file: "",
      },
      filesitesurveyreportdanapproval: {
        base64: "",
        extension_file: "",
      },
    },
    section2: {
      namasite: "",
      tipesite: "",
      tipesitelainnya: "",
      tipecoverageareasite: "",
      alamatdankodepos: "",
      latitude: "",
      longitude: "",
      contactpersonpemilik: "",
      notlp: "",
      alamatcontactperson: "",
      akseskelokasisite: "",
      akseskelokasisitelainnya: "",
      jarakdarilokasisitekejalurutama: "",
      akseskelokasisitejarak: "",
      kondisijalanakseslokasi: "",
      kondisijalanakseslokasilainnya: "",
      jalanakseslokasi: "",
      jalanakseslokasilainnya: "",
      aksessungaiataulaut: "",
      aksessungaiataulautlainnya: "",
      waktuperjalanan: "",
      waktukerja: "",
      ijinkelokasi: "",
      lamaperjalanankekotaterdekat: "", //new
      keberangkatandarikotaterdekat: "", //new
      tinggitimur: "",
      tinggiselatan: "",
      tinggibarat: "",
      tinggiutara: "",
      jaraktimur: "",
      jarakselatan: "",
      jarakbarat: "",
      jarakutara: "",
      kondisigudangpenyimpanan: "",
      kondisigudangpenyimpananlainnya: "",
      tipeantenna: "",
      ketinggianomni: "",
      jumlah: "",
      azimuth: "",
      unit: "",
      rfantennaheight: "",
    },
    section3: {
      koordinatgpswgs84latitude: "",
      koordinatgpswgs84longitude: "",
      altitudeasl: "",
      tinggitowerpole: "",
      tipetower: "",
    },
    section4: {
      menggunakantransmisivsat: "",
      penempatanantenna: "",
      mountingantenna: "",
      diameterantenna: "",
      tipeantennasatelit: "",
      satelityangakandigunakan: "",
      lampiranprintscreen: {
        base64: "",
        extension_file: "",
      },
      azimuth: "",
      elevasi: "",
      obstacle: "",
    },
    section5: {
      posisitowerpole: "",
      statuskepemilikanlahan: "",
      statuskepemilikanlahanlainnya: "",
      namapemiliklahan: "",
      namapemiliklahan2: "",
      nomorpemiliklahan: "",
      nomorpemiliklahan2: "",
      statuskondisilahan: "",
      statuskondisilahanlainnya: "",
      kondisisosial: "",
      keamanan: "",
      luaslahan: "",
      panjang: "",
      lebar: "",
    },
    section6: {
      ketersediaancoveragedalamradius2kmdarisitetelkomsel: "",
      ketersediaansinyaltelkomsel: "",
      levelsinyaldihpjikaadacoveragetelkomsel: "",
      kekuatansignaltelkomsel: "",
      calldisitetelkomsel: "",
      smsdisitetelkomsel: "",
      internetspeedtest4gtelkomsel: "",
      ketersediaancoveragedalamradius2kmdarisiteindosat: "",
      ketersediaansinyalindosat: "",
      levelsinyaldihpjikaadacoverageindosat: "",
      kekuatansignalindosat: "",
      calldisiteindosat: "",
      smsdisiteindosat: "",
      internetspeedtest4gindosat: "",
      ketersediaancoveragedalamradius2kmdarisitexl: "",
      ketersediaansinyalxl: "",
      levelsinyaldihpjikaadacoveragexl: "",
      kekuatansignalxl: "",
      calldisitexl: "",
      smsdisitexl: "",
      internetspeedtest4gxl: "",
    },
    section7: {
      topografiumum: "",
      derajatkemiringan: "",
      topografiumumlainnya: "",
      keteranganareacakupanbanyakcakupan: [],
      keteranganareacakupanlainnya: "",
      keteranganlahan: "",
      keteranganlahanlainnya: "",
      statuslahan: "",
      pengurusanimb: "",
      klasifikasitanah: "",
      obyekpenghalang: "",
      obyekpenghalanglainnya: "",
      kebutuhanpengkondisianlahan: "",
      kebutuhanpengkondisianlahanlainnya: "",
      tataruang: "",
      jenislahan: "",
      jenislahanlainnya: "",
      dekatlautsungai: "",
      dekatlautsungailainnya: "",
      resikobencana: "",
      ketinggianbanjir: "",
      resikobencanalainnya: "",
      sumberdayasetempatsdasdm: "",
      sumberdayalainnya: "",
      resikorelokasi: "",
      resikokomplain: "",
    },
    section8: {
      pengelolasumberlistrik: "",
      jenissumberlistrik: "",
      jenissumberlistriklainnya: "",
      phaselistrik: "",
      kapasitassumberlistrik: "",
      jamoperasisumberlistrik: "",
      mulai: "",
      selesai: "",
      jarakperangkatkesumberlistrikterdekat: "",
      listrikbisadipakaiuntukperangkat: "",
      kategorigrid: "",
      pasokanbbm: "",
      jenisbbmyangseringtersedia: "",
      hargabbmdilokasi: "",
      posisiobjekpenghalangterhadapmodulsuryalayout: {
        base64: "",
        extension_file: "",
      },
      bayanganobjekmenutupiareamodulsurya: "",
      posisilintanglokasi: "",
      orientasikemiringanpanelsuryayangoptimal: "",
      beritaacarakelistrikan: {
        base64: "",
        extension_file: "",
      },
    },
    section9: {
      statuskepemilikansurattanah: "",
      statuskepemilikansurattanahlainnya: "",
      ijinyangdibutuhkan: "",
      ijinyangdibutuhkanlainnya: "",
      idpemiliklahan: "",
    },
    section10: {
      // ============ bagian a
      populasiorangkk: "",
      orang: "",
      kk: "",
      kepadatanpenduduk: "",
      distribusipenduduk: "",
      desaterdekat: "",
      namadesaterdekat: "",
      jarakdesaterdekat: "",
      aksesdankondisijalan: "",
      fotoaksesdankondisijalan: {
        base64: "",
        extension_file: "",
      },
      kondisigeografis: "",
      latitude: "",
      longitude: "",
      transportasidesa: "",
      fototransportasidesa: {
        base64: "",
        extension_file: "",
      },
      potensidesa: "",
      fotopotensidesa: {
        base64: "",
        extension_file: "",
      },
      fotokondisigeografis: {
        base64: "",
        extension_file: "",
      },
      matapencaharian: "",
      jumlahpemilikhp: "",
      tipejenishp: [],
      jenissimcardoperator: [],
      wargayangdapatdilatihtentangpengoperasianperangkatdasartraining: "",
      rumahyangmemilikigensetsolarpanel: "",
      catatanlainnya: "",
      aksesinternetnonselular: "",
      aksesinternetnonselularlainnya: "",
      // ============ bagian b
      jumlahpenduduk: "",
      jumlahpendudukpria: "",
      jumlahpendudukwanita: "",
      umur20th: "",
      umur2130th: "",
      umur3140th: "",
      umur4150th: "",
      umur5160th: "",
      tidaksekolah: "",
      sd: "",
      smp: "",
      smu: "",
      akademi: "",
      sarjana: "",
      empat4bidangpekerjaanutama: "",
      pengeluaranratarataperbulanrumahtangga: "",
      harapanpengeluaranpulsaperbulanrumahtangga: "",
      pasardesa: "",
      jarakpasardesa: "",
      pasarkota: "",
      jarakpasarkota: "",
      sekolah: "",
      jaraksekolah: "",
      industri: "",
      jarakindustri: "",
      koperasi: "",
      jarakkoperasi: "",
      puskesmasrsu: "",
      jarakpuskesmasrsu: "",
      dermaga: "",
      jarakdermaga: "",
      tambang: "",
      jaraktambang: "",
      perkebunan: "",
      jarakperkebunan: "",
      kiosvoucher: "",
      fotokiosvoucher: {
        base64: "",
        extension_file: "",
      },
      jarakkiosvoucher: "",
      bank: "",
      fotobank: {
        base64: "",
        extension_file: "",
      },
      jarakbank: "",
      kantorpos: "",
      fotokantorpos: {
        base64: "",
        extension_file: "",
      },
      jarakkantorpos: "",
      tokoritel: "",
      fototokoritel: {
        base64: "",
        extension_file: "",
      },
      jaraktokoritel: "",
      kioslistrik: "",
      fotokioslistrik: {
        base64: "",
        extension_file: "",
      },
      jarakkioslistrik: "",
      operator: "",
      fotooperator: {
        base64: "",
        extension_file: "",
      },
      jarakoperator: "",
      keterangantambahan: "",
    },
    section11: {
      foto: {
        base64: "",
        extension_file: "",
      },
      latitude: "",
      longitude: "",
      keterangan: "",
    },
    section12: {
      fotolayoutsite: {
        base64: "",
        extension_file: "",
      },
      latitudelayoutsite: "",
      longitudelayoutsite: "",
      deskripsilayoutsite: "",
      fototower: {
        base64: "",
        extension_file: "",
      },
      latitudetower: "",
      longitudetower: "",
      deskripsitower: "",
      fotodenahlokasiarea: {
        base64: "",
        extension_file: "",
      },
      latitudedenahlokasiarea: "",
      longitudedenahlokasiarea: "",
      deskripsidenahlokasiarea: "",
      towerkesourcepowerifany: "",
      towerkeantennavsat: "",
      towerkesolarpanel: "",
    },
    section13: {
      fotolahankandidat: {
        base64: "",
        extension_file: "",
      },
      latitudelahankandidat: "",
      longitudelahankandidat: "",
      keteranganlahankandidat: "",
      fotomarkinggps: {
        base64: "",
        extension_file: "",
      },
      latitudemarkinggps: "",
      longitudemarkinggps: "",
      keteranganmarkinggps: "",
    },
    section14: {
      photo0: {
        base64: "",
        extension_file: "",
      },
      distance0: "",
      obstacletype0: "",
      obstacleheight0: "",
      topography0: "",
      landscape0: "",
      landscape0lainnya: "",
      demography0: "",
      demography0lainnya: "",
      description0: "",
      photo45: {
        base64: "",
        extension_file: "",
      },
      distance45: "",
      obstacletype45: "",
      obstacleheight45: "",
      topography45: "",
      landscape45: "",
      landscape45lainnya: "",
      demography45: "",
      demography45lainnya: "",
      description45: "",
      photo90: {
        base64: "",
        extension_file: "",
      },
      distance90: "",
      obstacletype90: "",
      obstacleheight90: "",
      topography90: "",
      landscape90: "",
      landscape90lainnya: "",
      demography90: "",
      demography90lainnya: "",
      description90: "",
      photo135: {
        base64: "",
        extension_file: "",
      },
      distance135: "",
      obstacletype135: "",
      obstacleheight135: "",
      topography135: "",
      landscape135: "",
      landscape135lainnya: "",
      demography135: "",
      demography135lainnya: "",
      description135: "",
      photo180: {
        base64: "",
        extension_file: "",
      },
      distance180: "",
      obstacletype180: "",
      obstacleheight180: "",
      topography180: "",
      landscape180: "",
      landscape180lainnya: "",
      demography180: "",
      demography180lainnya: "",
      description180: "",
      photo225: {
        base64: "",
        extension_file: "",
      },
      distance225: "",
      obstacletype225: "",
      obstacleheight225: "",
      topography225: "",
      landscape225: "",
      landscape225lainnya: "",
      demography225: "",
      demography225lainnya: "",
      description225: "",
      photo270: {
        base64: "",
        extension_file: "",
      },
      distance270: "",
      obstacletype270: "",
      obstacleheight270: "",
      topography270: "",
      landscape270: "",
      landscape270lainnya: "",
      demography270: "",
      demography270lainnya: "",
      description270: "",
      photo315: {
        base64: "",
        extension_file: "",
      },
      distance315: "",
      obstacletype315: "",
      obstacleheight315: "",
      topography315: "",
      landscape315: "",
      landscape315lainnya: "",
      demography315: "",
      demography315lainnya: "",
      description315: "",
    },
    section15: {
      photo0: {
        base64: "",
        extension_file: "",
      },
      latitude0: "",
      longitude0: "",
      description0: "",
      photo30: {
        base64: "",
        extension_file: "",
      },
      latitude30: "",
      longitude30: "",
      description30: "",
      photo60: {
        base64: "",
        extension_file: "",
      },
      latitude60: "",
      longitude60: "",
      description60: "",
      photo90: {
        base64: "",
        extension_file: "",
      },
      latitude90: "",
      longitude90: "",
      description90: "",
      photo120: {
        base64: "",
        extension_file: "",
      },
      latitude120: "",
      longitude120: "",
      description120: "",
      photo150: {
        base64: "",
        extension_file: "",
      },
      latitude150: "",
      longitude150: "",
      description150: "",
      photo180: {
        base64: "",
        extension_file: "",
      },
      latitude180: "",
      longitude180: "",
      description180: "",
      photo210: {
        base64: "",
        extension_file: "",
      },
      latitude210: "",
      longitude210: "",
      description210: "",
      photo240: {
        base64: "",
        extension_file: "",
      },
      latitude240: "",
      longitude240: "",
      description240: "",
      photo270: {
        base64: "",
        extension_file: "",
      },
      latitude270: "",
      longitude270: "",
      description270: "",
      photo300: {
        base64: "",
        extension_file: "",
      },
      latitude300: "",
      longitude300: "",
      description300: "",
      photo330: {
        base64: "",
        extension_file: "",
      },
      latitude330: "",
      longitude330: "",
      description330: "",
    },
    section16: {
      photo0: {
        base64: "",
        extension_file: "",
      },
      latitude0: "",
      longitude0: "",
      description0: "",
      photo30: {
        base64: "",
        extension_file: "",
      },
      latitude30: "",
      longitude30: "",
      description30: "",
      photo60: {
        base64: "",
        extension_file: "",
      },
      latitude60: "",
      longitude60: "",
      description60: "",
      photo90: {
        base64: "",
        extension_file: "",
      },
      latitude90: "",
      longitude90: "",
      description90: "",
      photo120: {
        base64: "",
        extension_file: "",
      },
      latitude120: "",
      longitude120: "",
      description120: "",
      photo150: {
        base64: "",
        extension_file: "",
      },
      latitude150: "",
      longitude150: "",
      description150: "",
      photo180: {
        base64: "",
        extension_file: "",
      },
      latitude180: "",
      longitude180: "",
      description180: "",
      photo210: {
        base64: "",
        extension_file: "",
      },
      latitude210: "",
      longitude210: "",
      description210: "",
      photo240: {
        base64: "",
        extension_file: "",
      },
      latitude240: "",
      longitude240: "",
      description240: "",
      photo270: {
        base64: "",
        extension_file: "",
      },
      latitude270: "",
      longitude270: "",
      description270: "",
      photo300: {
        base64: "",
        extension_file: "",
      },
      latitude300: "",
      longitude300: "",
      description300: "",
      photo330: {
        base64: "",
        extension_file: "",
      },
      latitude330: "",
      longitude330: "",
      description330: "",
    },
    section17: {
      pilihanoperator: [],
      phototelkomsel: {
        base64: "",
        extension_file: "",
      },
      latitudetelkomsel: "",
      longitudetelkomsel: "",
      descriptiontelkomsel: "",
      photoindosat: {
        base64: "",
        extension_file: "",
      },
      latitudeindosat: "",
      longitudeindosat: "",
      descriptionindosat: "",
      photoxl: {
        base64: "",
        extension_file: "",
      },
      latitudexl: "",
      longitudexl: "",
      descriptionxl: "",
      photonocoverage: {
        base64: "",
        extension_file: "",
      },
      latitudenocoverage: "",
      longitudenocoverage: "",
      descriptionnocoverage: "",
    },
    section18: {
      filelocationmapping: {
        base64: "",
        extension_file: "",
      },
      fotolocationmapping: {
        base64: "",
        extension_file: "",
      },
      latitudelocationmapping: "",
      longitudelocationmapping: "",
      deskripsilocationmapping: "",
      latitudekandidat1: "",
      longitudekandidat1: "",
      elevasikandidat1: "",
      latitudekandidat2: "",
      longitudekandidat2: "",
      elevasikandidat2: "",
    },
    section19: {
      jumlahinput: "",
      penggunapotensial: [1],
      photo1: {
        base64: "",
        extension_file: "",
      },
      photo2: {
        base64: "",
        extension_file: "",
      },
      photo3: {
        base64: "",
        extension_file: "",
      },
      photo4: {
        base64: "",
        extension_file: "",
      },
      photo5: {
        base64: "",
        extension_file: "",
      },
      photo6: {
        base64: "",
        extension_file: "",
      },
      photo7: {
        base64: "",
        extension_file: "",
      },
      photo8: {
        base64: "",
        extension_file: "",
      },
      photo9: {
        base64: "",
        extension_file: "",
      },
      photo10: {
        base64: "",
        extension_file: "",
      },
      photo11: {
        base64: "",
        extension_file: "",
      },
      photo12: {
        base64: "",
        extension_file: "",
      },
      photo13: {
        base64: "",
        extension_file: "",
      },
      photo14: {
        base64: "",
        extension_file: "",
      },
      photo15: {
        base64: "",
        extension_file: "",
      },
      latitude1: "",
      latitude2: "",
      latitude3: "",
      latitude4: "",
      latitude5: "",
      latitude6: "",
      latitude7: "",
      latitude8: "",
      latitude9: "",
      latitude10: "",
      latitude11: "",
      latitude12: "",
      latitude13: "",
      latitude14: "",
      latitude15: "",
      longitude1: "",
      longitude2: "",
      longitude3: "",
      longitude4: "",
      longitude5: "",
      longitude6: "",
      longitude7: "",
      longitude8: "",
      longitude9: "",
      longitude10: "",
      longitude11: "",
      longitude12: "",
      longitude13: "",
      longitude14: "",
      longitude15: "",
      description1: "",
      description2: "",
      description3: "",
      description4: "",
      description5: "",
      description6: "",
      description7: "",
      description8: "",
      description9: "",
      description10: "",
      description11: "",
      description12: "",
      description13: "",
      description14: "",
      description15: "",
    },
    section20: {
      photoaksessite1: {
        base64: "",
        extension_file: "",
      },
      photoaksessite2: {
        base64: "",
        extension_file: "",
      },
      photoaksessite3: {
        base64: "",
        extension_file: "",
      },
      photoaksessite4: {
        base64: "",
        extension_file: "",
      },
      latitudeaksessite1: "",
      latitudeaksessite2: "",
      latitudeaksessite3: "",
      latitudeaksessite4: "",
      longitudeaksessite1: "",
      longitudeaksessite2: "",
      longitudeaksessite3: "",
      longitudeaksessite4: "",
      deskripsiaksessite1: "",
      deskripsiaksessite2: "",
      deskripsiaksessite3: "",
      deskripsiaksessite4: "",
    },
    section21: {
      generalcomment: "",
      generalcommentraw: "",
      generalcommenthtml: "",
    },
    section22: {
      siteaidmapnearend: "",
      sitebidfarend: "",
      frequency: "",
      konfigurasi: "",
      kapasitas: "",
      ukuranantmain: "",
      ukuranantsd: "",
      siteaantennasupport: "",
      sitebantennasupport: "",
      petadigital: "",
      kandidatsitea: "",
      kandidatsiteb: "",
      pathlength: "",
      siteaazimuth: "",
      sidebazimuth: "",
      siteaelevasi: "",
      sitebelevasi: "",
      siteasudutvertical: "",
      sitebsudutvertical: "",
      siteatinggiantenna: "",
      siteatinggiantennasd: "",
      sitebtinggiantenna: "",
      sitebsdtinggiantennasd: "",
    },
    section23: {
      photopathprofile: {
        base64: "",
        extension_file: "",
      },
      photodesktopcontour: {
        base64: "",
        extension_file: "",
      },
      latitudepathprofile: "",
      latitudedesktopcontour: "",
      longitudepathprofile: "",
      longitudedesktopcontour: "",
      deskripsipathprofile: "",
      deskripsidesktopcontour: "",
    },
    section24: {
      sitealatitudeddformat: "",
      sitealongitudeddformat: "",
      siteblatitudeddformat: "",
      siteblongitudeddformat: "",
      siteatipetower: "",
      siteatipetowerlainnya: "",
      siteatinggitower: "",
      sitebtipetower: "",
      sitebtipetowerlainnya: "",
      sitebtinggitower: "",
      rataratatinggipohon: "",
      siteaproposedtinggiminantennamain: "",
      siteaproposedtinggiminantennasd: "",
      sitebproposedtinggiminantennamain: "",
      sitebproposedtinggiminantennasd: "",
      kesimpulanhasildarisurveylos: "",
    },
    section25: {
      photogpssitea: {
        base64: "",
        extension_file: "",
      },
      photogpssiteb: {
        base64: "",
        extension_file: "",
      },
      latitudegpssitea: "",
      latitudegpssiteb: "",
      longitudegpssitea: "",
      longitudegpssiteb: "",
      deskripsigpssitea: "",
      deskripsigpssiteb: "",
    },
    section26: {
      photo: {
        base64: "",
        extension_file: "",
      },
      latitude: "",
      longitude: "",
      deskripsi: "",
    },
    section27: {
      photo: {
        base64: "",
        extension_file: "",
      },
      latitude: "",
      longitude: "",
      deskripsi: "",
    },
    section28: {
      photo0: {
        base64: "",
        extension_file: "",
      },
      latitude0: "",
      longitude0: "",
      description0: "",
      photo30: {
        base64: "",
        extension_file: "",
      },
      latitude30: "",
      longitude30: "",
      description30: "",
      photo60: {
        base64: "",
        extension_file: "",
      },
      latitude60: "",
      longitude60: "",
      description60: "",
      photo90: {
        base64: "",
        extension_file: "",
      },
      latitude90: "",
      longitude90: "",
      description90: "",
      photo120: {
        base64: "",
        extension_file: "",
      },
      latitude120: "",
      longitude120: "",
      description120: "",
      photo150: {
        base64: "",
        extension_file: "",
      },
      latitude150: "",
      longitude150: "",
      description150: "",
      photo180: {
        base64: "",
        extension_file: "",
      },
      latitude180: "",
      longitude180: "",
      description180: "",
      photo210: {
        base64: "",
        extension_file: "",
      },
      latitude210: "",
      longitude210: "",
      description210: "",
      photo240: {
        base64: "",
        extension_file: "",
      },
      latitude240: "",
      longitude240: "",
      description240: "",
      photo270: {
        base64: "",
        extension_file: "",
      },
      latitude270: "",
      longitude270: "",
      description270: "",
      photo300: {
        base64: "",
        extension_file: "",
      },
      latitude300: "",
      longitude300: "",
      description300: "",
      photo330: {
        base64: "",
        extension_file: "",
      },
      latitude330: "",
      longitude330: "",
      description330: "",
    },
    section29: {
      photo: {
        base64: "",
        extension_file: "",
      },
      latitude: "",
      longitude: "",
      deskripsi: "",
    },
    section30: {
      photo: {
        base64: "",
        extension_file: "",
      },
      latitude: "",
      longitude: "",
      deskripsi: "",
    },
    section31: {
      photo0: {
        base64: "",
        extension_file: "",
      },
      latitude0: "",
      longitude0: "",
      description0: "",
      photo30: {
        base64: "",
        extension_file: "",
      },
      latitude30: "",
      longitude30: "",
      description30: "",
      photo60: {
        base64: "",
        extension_file: "",
      },
      latitude60: "",
      longitude60: "",
      description60: "",
      photo90: {
        base64: "",
        extension_file: "",
      },
      latitude90: "",
      longitude90: "",
      description90: "",
      photo120: {
        base64: "",
        extension_file: "",
      },
      latitude120: "",
      longitude120: "",
      description120: "",
      photo150: {
        base64: "",
        extension_file: "",
      },
      latitude150: "",
      longitude150: "",
      description150: "",
      photo180: {
        base64: "",
        extension_file: "",
      },
      latitude180: "",
      longitude180: "",
      description180: "",
      photo210: {
        base64: "",
        extension_file: "",
      },
      latitude210: "",
      longitude210: "",
      description210: "",
      photo240: {
        base64: "",
        extension_file: "",
      },
      latitude240: "",
      longitude240: "",
      description240: "",
      photo270: {
        base64: "",
        extension_file: "",
      },
      latitude270: "",
      longitude270: "",
      description270: "",
      photo300: {
        base64: "",
        extension_file: "",
      },
      latitude300: "",
      longitude300: "",
      description300: "",
      photo330: {
        base64: "",
        extension_file: "",
      },
      latitude330: "",
      longitude330: "",
      description330: "",
    },
    section32: {
      dari: "",
      ke: "",
      azimuth: "",
      gambardiambildarisiteakesitebtanpazoom: {
        base64: "",
        extension_file: "",
      },
      gambardiambildarisiteakesitebdenganzoom: {
        base64: "",
        extension_file: "",
      },
      gambardiambildarisitebkesiteatanpazoom: {
        base64: "",
        extension_file: "",
      },
      gambardiambildarisitebkesiteadenganzoom: {
        base64: "",
        extension_file: "",
      },
      latitudeakebtanpazoom: "",
      latitudeakebdenganzoom: "",
      latitudebkeatanpazoom: "",
      latitudebkeadenganzoom: "",
      longitudeakebtanpazoom: "",
      longitudeakebdenganzoom: "",
      longitudebkeatanpazoom: "",
      longitudebkeadenganzoom: "",
    },
    section33: {
      pathprofile: {
        base64: "",
        extension_file: "",
      },
      latitude: "",
      longitude: "",
      keterangan: "",
    },
    section34: {
      petalokasikeseluruhanglobalmap: {
        base64: "",
        extension_file: "",
      },
      latitude: "",
      longitude: "",
      filekmlpetalokasi: "",
    },
    section35: {
      screencapture: {
        base64: "",
        extension_file: "",
      },
    },
    section36: {
      sitepoi: "",
      alamatpoi: "",
      kontakpoi: "",
      nomorteleponpoi: "",
      alamatkontakpoi: "",
      sitsto: "",
      alamatsto: "",
      kontaksto: "",
      nomorteleponsto: "",
      alamatkontaksto: "",
    },
    section37: {
      jarakrute: "",
      rekomendasitipekonstruksi: "",
      ruteinformasilokasi: "",
      kodepos: "",
    },
    section38: {
      lokasihhpole: [],
    },
    section39: {
      jumlahpoleexisting: "",
      jumlahhhmhexisting: "",
      jumlahpolebaru: "",
      jumlahhhmhbaru: "",
    },
    section40: {
      existingterminationbox: "",
      existingavailableport: "",
      needaddnewterminationbox: "",
    },
    section41: {
      fototitikterminasidipoi: {
        base64: "",
        extension_file: "",
      },
      latitude: "",
      longitude: "",
      keterangan: "",
    },
    section42: {
      catatan: "",
      catatanraw: "",
      catatanhtml: "",
    },
    section43: {
      rutefiberoptikdigooglemap: {
        base64: "",
        extension_file: "",
      },
    },
    section44: {
      asplandrawing: {
        base64: "",
        extension_file: "",
      },
    },
  },
};

const formSurveyStaff = (state = initialState, action) => {
  switch (action.type) {
    case SET_BTS_MAIN:
      state = {
        ...state,
        btsMain: action.payload,
      };
      break;
    case SET_STATE_SECTION1:
      state = {
        ...state,
        section1: action.payload,
      };
      break;
    case SET_STATE_SECTION2:
      state = {
        ...state,
        section2: action.payload,
      };
      break;
    case SET_STATE_SECTION3:
      state = {
        ...state,
        section3: action.payload,
      };
      break;
    case SET_STATE_SECTION4:
      state = {
        ...state,
        section4: action.payload,
      };
      break;
    case SET_STATE_SECTION5:
      state = {
        ...state,
        section5: action.payload,
      };
      break;
    case SET_STATE_SECTION6:
      state = {
        ...state,
        section6: action.payload,
      };
      break;
    case SET_STATE_SECTION7:
      state = {
        ...state,
        section7: action.payload,
      };
      break;
    case SET_STATE_SECTION8:
      state = {
        ...state,
        section8: action.payload,
      };
      break;
    case SET_STATE_SECTION9:
      state = {
        ...state,
        section9: action.payload,
      };
      break;
    case SET_STATE_SECTION10:
      state = {
        ...state,
        section10: action.payload,
      };
      break;
    case SET_STATE_SECTION11:
      state = {
        ...state,
        section11: action.payload,
      };
      break;
    case SET_STATE_SECTION12:
      state = {
        ...state,
        section12: action.payload,
      };
      break;
    case SET_STATE_SECTION13:
      state = {
        ...state,
        section13: action.payload,
      };
      break;
    case SET_STATE_SECTION14:
      state = {
        ...state,
        section14: action.payload,
      };
      break;
    case SET_STATE_SECTION15:
      state = {
        ...state,
        section15: action.payload,
      };
      break;
    case SET_STATE_SECTION16:
      state = {
        ...state,
        section16: action.payload,
      };
      break;
    case SET_STATE_SECTION17:
      state = {
        ...state,
        section17: action.payload,
      };
      break;
    case SET_STATE_SECTION18:
      state = {
        ...state,
        section18: action.payload,
      };
      break;
    case SET_STATE_SECTION19:
      state = {
        ...state,
        section19: action.payload,
      };
      break;
    case SET_STATE_SECTION20:
      state = {
        ...state,
        section20: action.payload,
      };
      break;
    case SET_STATE_SECTION21:
      state = {
        ...state,
        section21: action.payload,
      };
      break;
    case SET_STATE_SECTION22:
      state = {
        ...state,
        section22: action.payload,
      };
      break;
    case SET_STATE_SECTION23:
      state = {
        ...state,
        section23: action.payload,
      };
      break;
    case SET_STATE_SECTION24:
      state = {
        ...state,
        section24: action.payload,
      };
      break;
    case SET_STATE_SECTION25:
      state = {
        ...state,
        section25: action.payload,
      };
      break;
    case SET_STATE_SECTION26:
      state = {
        ...state,
        section26: action.payload,
      };
      break;
    case SET_STATE_SECTION27:
      state = {
        ...state,
        section27: action.payload,
      };
      break;
    case SET_STATE_SECTION28:
      state = {
        ...state,
        section28: action.payload,
      };
      break;
    case SET_STATE_SECTION29:
      state = {
        ...state,
        section29: action.payload,
      };
    case SET_STATE_SECTION30:
      state = {
        ...state,
        section30: action.payload,
      };
      break;
    case SET_STATE_SECTION31:
      state = {
        ...state,
        section31: action.payload,
      };
      break;
    case SET_STATE_SECTION32:
      state = {
        ...state,
        section32: action.payload,
      };
      break;
    case SET_STATE_SECTION33:
      state = {
        ...state,
        section33: action.payload,
      };
      break;
    case SET_STATE_SECTION34:
      state = {
        ...state,
        section34: action.payload,
      };
      break;
    case SET_STATE_SECTION35:
      state = {
        ...state,
        section35: action.payload,
      };
      break;
    case SET_STATE_SECTION36:
      state = {
        ...state,
        section36: action.payload,
      };
      break;
    case SET_STATE_SECTION37:
      state = {
        ...state,
        section37: action.payload,
      };
      break;
    case SET_STATE_SECTION38:
      state = {
        ...state,
        section38: action.payload,
      };
      break;
    case SET_STATE_SECTION39:
      state = {
        ...state,
        section39: action.payload,
      };
      break;
    case SET_STATE_SECTION40:
      state = {
        ...state,
        section40: action.payload,
      };
      break;
    case SET_STATE_SECTION41:
      state = {
        ...state,
        section41: action.payload,
      };
      break;
    case SET_STATE_SECTION42:
      state = {
        ...state,
        section42: action.payload,
      };
      break;
    case SET_STATE_SECTION43:
      state = {
        ...state,
        section43: action.payload,
      };
      break;
    case SET_STATE_SECTION44:
      state = {
        ...state,
        section44: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default formSurveyStaff;
