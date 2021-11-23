import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { useLocation } from "react-router-dom";
// import redux
import {
  setSection1,
  setSection2,
  setSection3,
  setSection4,
  setSection5,
  setSection6,
  setSection7,
  setSection8,
  setSection9,
  setSection10,
  setSection11,
  setSection12,
  setSection13,
  setSection14,
  setSection15,
  setSection16,
  setSection17,
  setSection18,
  setSection19,
  setSection20,
  setSection22,
} from "../../../store/formSurveyStaff/action";
import { useDispatch, useSelector } from "react-redux";

function DetailRadio(props) {
  // location
  const location = useLocation();
  const idSurvey = location.state.datatable._id;

  const dispatch = useDispatch();
  const section1 = useSelector((state) => state.FormSurveyStaff.section1);
  const section2 = useSelector((state) => state.FormSurveyStaff.section2);
  const section3 = useSelector((state) => state.FormSurveyStaff.section3);
  const section4 = useSelector((state) => state.FormSurveyStaff.section4);
  const section5 = useSelector((state) => state.FormSurveyStaff.section5);
  const section6 = useSelector((state) => state.FormSurveyStaff.section6);
  const section7 = useSelector((state) => state.FormSurveyStaff.section7);
  const section8 = useSelector((state) => state.FormSurveyStaff.section8);
  const section9 = useSelector((state) => state.FormSurveyStaff.section9);
  const section10 = useSelector((state) => state.FormSurveyStaff.section10);
  const section11 = useSelector((state) => state.FormSurveyStaff.section11);
  const section12 = useSelector((state) => state.FormSurveyStaff.section12);
  const section13 = useSelector((state) => state.FormSurveyStaff.section13);
  const section14 = useSelector((state) => state.FormSurveyStaff.section14);
  const section15 = useSelector((state) => state.FormSurveyStaff.section15);
  const section16 = useSelector((state) => state.FormSurveyStaff.section16);
  const section17 = useSelector((state) => state.FormSurveyStaff.section17);
  const section18 = useSelector((state) => state.FormSurveyStaff.section18);
  const section19 = useSelector((state) => state.FormSurveyStaff.section19);
  const section20 = useSelector((state) => state.FormSurveyStaff.section20);
  const section22 = useSelector((state) => state.FormSurveyStaff.section22);

  // section strings
  let strSection1 = "section1";
  let strSection2 = "section2";
  let strSection3 = "section3";
  let strSection4 = "section4";
  let strSection5 = "section5";
  let strSection6 = "section6";
  let strSection7 = "section7";
  let strSection8 = "section8";
  let strSection9 = "section9";
  let strSection10 = "section10";
  let strSection11 = "section11";
  let strSection12 = "section12";
  let strSection13 = "section13";
  let strSection14 = "section14";
  let strSection1505 = "section1505";
  let strSection155 = "section155";
  let strSection16 = "section16";
  let strSection17 = "section17";
  let strSection18 = "section18";
  let strSection19 = "section19";
  let strSection20 = "section20";
  let strSection22 = "section22";

  let localSection1 = JSON.parse(
    window.localStorage.getItem(strSection1.concat(idSurvey))
  );
  let localSection2 = JSON.parse(
    window.localStorage.getItem(strSection2.concat(idSurvey))
  );
  let localSection3 = JSON.parse(
    window.localStorage.getItem(strSection3.concat(idSurvey))
  );
  let localSection4 = JSON.parse(
    window.localStorage.getItem(strSection4.concat(idSurvey))
  );
  let localSection5 = JSON.parse(
    window.localStorage.getItem(strSection5.concat(idSurvey))
  );
  let localSection6 = JSON.parse(
    window.localStorage.getItem(strSection6.concat(idSurvey))
  );
  let localSection7 = JSON.parse(
    window.localStorage.getItem(strSection7.concat(idSurvey))
  );
  let localSection8 = JSON.parse(
    window.localStorage.getItem(strSection8.concat(idSurvey))
  );
  let localSection9 = JSON.parse(
    window.localStorage.getItem(strSection9.concat(idSurvey))
  );
  let localSection10 = JSON.parse(
    window.localStorage.getItem(strSection10.concat(idSurvey))
  );
  let localSection11 = JSON.parse(
    window.localStorage.getItem(strSection11.concat(idSurvey))
  );
  let localSection12 = JSON.parse(
    window.localStorage.getItem(strSection12.concat(idSurvey))
  );
  let localSection13 = JSON.parse(
    window.localStorage.getItem(strSection13.concat(idSurvey))
  );
  let localSection14 = JSON.parse(
    window.localStorage.getItem(strSection14.concat(idSurvey))
  );
  let localSection1505 = JSON.parse(
    window.localStorage.getItem(strSection1505.concat(idSurvey))
  );
  let localSection155 = JSON.parse(
    window.localStorage.getItem(strSection155.concat(idSurvey))
  );
  let localSection16 = JSON.parse(
    window.localStorage.getItem(strSection16.concat(idSurvey))
  );
  let localSection17 = JSON.parse(
    window.localStorage.getItem(strSection17.concat(idSurvey))
  );
  let localSection18 = JSON.parse(
    window.localStorage.getItem(strSection18.concat(idSurvey))
  );
  let localSection19 = JSON.parse(
    window.localStorage.getItem(strSection19.concat(idSurvey))
  );
  let localSection20 = JSON.parse(
    window.localStorage.getItem(strSection20.concat(idSurvey))
  );
  let localSection22 = JSON.parse(
    window.localStorage.getItem(strSection22.concat(idSurvey))
  );

  const [isChecked, setIsChecked] = useState(false);

  const showCheckedOnLoad = async () => {
    let fira = await JSON.parse(
      window.localStorage.getItem(strSection1.concat(idSurvey))
    );
    // handle show radio button on load > mana yang ter-checked based on redux
    // ================= SECTION1
    if (section1?.statussite !== "") {
      if (
        section1?.statussite === "OK" ||
        section1?.statussite === "ada sinyal"
      ) {
        if (
          document.getElementById(
            "1StatusSite" + section1.statussite.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "1StatusSite" + section1.statussite.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // // ================= SECTION2
    if (section2?.perizinanakseskesite !== "") {
      if (section2.perizinanakseskesite === "Ya") {
        document.getElementById("2IjinkeLokasiIya").checked = true;
      } else if (
        section2?.perizinanakseskesite === "Iya" ||
        section2?.perizinanakseskesite === "Tidak"
      ) {
        if (
          document.getElementById(
            "2IjinkeLokasi" + section2.perizinanakseskesite.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "2IjinkeLokasi" + section2.perizinanakseskesite.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // ================= SECTION4
    if (section4?.penempatanantena !== "") {
      if (
        section4?.penempatanantena === "Ground" ||
        section4?.penempatanantena === "Rooftop" ||
        section4?.penempatanantena === "Wall Mounting"
      ) {
        if (
          document.getElementById(
            "4PenempatanAntenna" + section4.penempatanantena.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "4PenempatanAntenna" + section4.penempatanantena.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    if (section4?.alasantena !== "") {
      if (
        section4?.alasantena === "Tidak Menembus" ||
        section4?.alasantena === "Di lantai atas"
      ) {
        if (
          document.getElementById(
            "4MountingAntenna" + section4.alasantena.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "4MountingAntenna" + section4.alasantena.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    if (section4?.penggunaansatelit !== "") {
      if (
        section4?.penggunaansatelit === "C-Band" ||
        section4?.penggunaansatelit === "C-Band Extended" ||
        section4?.penggunaansatelit === "Ku-Band" ||
        section4?.penggunaansatelit === "Ka-Band"
      ) {
        if (
          document.getElementById(
            "4SatelitYangAkanDigunakan" +
              section4.penggunaansatelit.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "4SatelitYangAkanDigunakan" +
              section4.penggunaansatelit.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // ================= SECTION5
    // if (section5?.ketinggiantowerpole !== "") {
    //   document.getElementById(
    //     "5KetinggianTower/Pole" +
    //       section5.ketinggiantowerpole.replace(/\s+/g, "")
    //   ).checked = true;
    // } <<< berubah jadi dropdown
    if (section5?.keamanan !== "") {
      if (
        section5?.keamanan === "Aman" ||
        section5?.keamanan === "Tidak Aman"
      ) {
        if (
          document.getElementById(
            "5Keamanan" + section5.keamanan.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "5Keamanan" + section5.keamanan.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // ================= SECTION6
    if (section6?.kemampuanjarakradius5kmdarisite !== "") {
      if (
        section6?.kemampuanjarakradius5kmdarisite === "Ada" ||
        section6?.kemampuanjarakradius5kmdarisite === "Tidak Ada"
      ) {
        if (
          document.getElementById(
            "6KetersediaanCoveragedalamRadius<2kmdariSite" +
              section6.kemampuanjarakradius5kmdarisite.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "6KetersediaanCoveragedalamRadius<2kmdariSite" +
              section6.kemampuanjarakradius5kmdarisite.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // if (section6?.levelsinyal4gjikaadajangkauan !== "") {
    //   document.getElementById(
    //     "6LevelSinyal4GJikaAdaJangkauan" +
    //       section6.levelsinyal4gjikaadajangkauan.replace(/\s+/g, "")
    //   ).checked = true;
    // } << berubah jadi dropdown
    if (section6?.calldisite !== "") {
      if (
        section6?.calldisite === "Mudah (5x test)" ||
        section6?.calldisite === "Lemah"
      ) {
        if (
          document.getElementById(
            "6CalldiSite" + section6.calldisite.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "6CalldiSite" + section6.calldisite.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    if (section6?.smsdisite !== "") {
      if (
        section6?.smsdisite === "Mudah (5x test)" ||
        section6?.smsdisite === "Lemah"
      ) {
        if (
          document.getElementById(
            "6SMSdiSite" + section6.smsdisite.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "6SMSdiSite" + section6.smsdisite.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // ================= SECTION7
    if (section7?.pengurusanimb !== "") {
      if (
        section7?.pengurusanimb === "Normal" ||
        section7?.pengurusanimb === "Izin Khusus"
      ) {
        if (
          document.getElementById(
            "7PengurusanIMB" + section7.pengurusanimb.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "7PengurusanIMB" + section7.pengurusanimb.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // if (section7?.resikobencana !== "") {
    //   document.getElementById(
    //     "7RisikoBencana" + section7.resikobencana.replace(/\s+/g, "")
    //   ).checked = true;
    // } <<< berubah jadi dropdown
    if (section7?.resikorelokasi !== "") {
      if (
        section7?.resikorelokasi === "Ya" ||
        section7?.resikorelokasi === "Tidak"
      ) {
        if (
          document.getElementById(
            "7ResikoRelokasi" + section7.resikorelokasi.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "7ResikoRelokasi" + section7.resikorelokasi.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    if (section7?.resikokeluhan !== "") {
      if (
        section7?.resikokeluhan === "Ya" ||
        section7?.resikokeluhan === "Tidak"
      ) {
        if (
          document.getElementById(
            "7ResikoKomplain" + section7.resikokeluhan.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "7ResikoKomplain" + section7.resikokeluhan.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // ================= SECTION8
    // if (section8.jumlahjamketersediaanlistrik !== "") {
    //   document.getElementById(
    //     "8JumlahJamKetersediaanListrik" +
    //       section8.jumlahjamketersediaanlistrik.replace(/\s+/g, "")
    //   ).checked = true;
    // }  >>>>>>>>>>>> diubah jadi dropdown
    if (section8?.generatorbackup !== "") {
      if (
        section8?.generatorbackup === "Ada" ||
        section8?.generatorbackup === "Tidak Ada"
      ) {
        if (
          document.getElementById(
            "8GeneratorBackup" + section8.generatorbackup.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "8GeneratorBackup" + section8.generatorbackup.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    if (section8?.kemampuanbahanbensin !== "") {
      if (
        section8?.kemampuanbahanbensin === "Halus" ||
        section8?.kemampuanbahanbensin === "Tidak Halus"
      ) {
        if (
          document.getElementById(
            "8KemampuanBahanBensin" +
              section8.kemampuanbahanbensin.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "8KemampuanBahanBensin" +
              section8.kemampuanbahanbensin.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    if (section8?.tipebahanbakaryangtersedia !== "") {
      if (
        section8?.tipebahanbakaryangtersedia === "Bensin" ||
        section8?.tipebahanbakaryangtersedia === "Solar"
      ) {
        if (
          document.getElementById(
            "8TipeBahanBakaryangTersedia" +
              section8.tipebahanbakaryangtersedia.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "8TipeBahanBakaryangTersedia" +
              section8.tipebahanbakaryangtersedia.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    if (section8?.listrikbisadigunakanuntukalat !== "") {
      if (
        section8?.listrikbisadigunakanuntukalat === "Ya" ||
        section8?.listrikbisadigunakanuntukalat === "Tidak"
      ) {
        if (
          document.getElementById(
            "8ListrikBisaDigunakanUntukAlat" +
              section8.listrikbisadigunakanuntukalat.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "8ListrikBisaDigunakanUntukAlat" +
              section8.listrikbisadigunakanuntukalat.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // ================= SECTION10
    if (section10?.desaterdekat !== "") {
      if (
        section10?.desaterdekat === "Ada" ||
        section10?.desaterdekat === "Tidak Ada"
      ) {
        if (
          document.getElementById(
            "10DesaTerdekat" + section10.desaterdekat.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "10DesaTerdekat" + section10.desaterdekat.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    if (section10?.pendudukyangbisadilatihuntukmenggunakanprodukjasa !== "") {
      if (
        section10?.pendudukyangbisadilatihuntukmenggunakanprodukjasa ===
          "Ada" ||
        section10?.pendudukyangbisadilatihuntukmenggunakanprodukjasa ===
          "Tidak Ada"
      ) {
        if (
          document.getElementById(
            "10Wargayangdapatdilatihtentangpengoperasianperangkatdasar/Training" +
              section10.pendudukyangbisadilatihuntukmenggunakanprodukjasa.replace(
                /\s+/g,
                ""
              )
          ) !== null
        ) {
          document.getElementById(
            "10Wargayangdapatdilatihtentangpengoperasianperangkatdasar/Training" +
              section10.pendudukyangbisadilatihuntukmenggunakanprodukjasa.replace(
                /\s+/g,
                ""
              )
          ).checked = true;
        }
      }
    }
    if (section10?.aksesinternet !== "") {
      if (
        section10?.aksesinternet === "Ada" ||
        section10?.aksesinternet === "Tidak Ada"
      ) {
        if (
          document.getElementById(
            "10AksesInternetNonSelular" +
              section10.aksesinternet.replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "10AksesInternetNonSelular" +
              section10.aksesinternet.replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
    // ================= SECTION18
    // ~~~~~~~~~~ SECTOR0
    if (section18?.sector0.topografi !== "") {
      if (
        section18?.sector0.topografi === "Datar" ||
        section18?.sector0.topografi === "Laut/Sungai" ||
        section18?.sector0.topografi === "Hutan" ||
        section18?.sector0.topografi === "Berbukit"
      ) {
        if (
          document.getElementById(
            "180Topografi" + section18.sector0.topografi
          ) !== null
        ) {
          document.getElementById(
            "180Topografi" + section18.sector0.topografi
          ).checked = true;
        }
      }
    }
    if (section18?.sector0.landscape !== "") {
      if (
        section18?.sector0.landscape === "Pemukiman" ||
        section18?.sector0.landscape === "Perkantoran" ||
        section18?.sector0.landscape === "Industri" ||
        section18?.sector0.landscape === "Lainnya"
      ) {
        if (
          document.getElementById(
            "180Landscape" + section18.sector0.landscape
          ) !== null
        ) {
          document.getElementById(
            "180Landscape" + section18.sector0.landscape
          ).checked = true;
        }
      }
    }
    if (section18?.sector0.demografi !== "") {
      if (
        section18?.sector0.demografi === "Padat" ||
        section18?.sector0.demografi === "Cukup Padat" ||
        section18?.sector0.demografi === "Kosong" ||
        section18?.sector0.demografi === "Lainnya"
      ) {
        if (
          document.getElementById(
            "180Demografi" + section18.sector0.demografi
          ) !== null
        ) {
          document.getElementById(
            "180Demografi" + section18.sector0.demografi
          ).checked = true;
        }
      }
    }
    // ~~~~~~~~~~ SECTOR45
    if (section18?.sector45.topografi !== "") {
      if (
        section18?.sector45.topografi === "Datar" ||
        section18?.sector45.topografi === "Laut/Sungai" ||
        section18?.sector45.topografi === "Hutan" ||
        section18?.sector45.topografi === "Berbukit"
      ) {
        if (
          document.getElementById(
            "1845Topografi" + section18.sector45.topografi
          ) !== null
        ) {
          document.getElementById(
            "1845Topografi" + section18.sector45.topografi
          ).checked = true;
        }
      }
    }
    if (section18?.sector45.landscape !== "") {
      if (
        section18?.sector45.landscape === "Pemukiman" ||
        section18?.sector45.landscape === "Perkantoran" ||
        section18?.sector45.landscape === "Industri" ||
        section18?.sector45.landscape === "Lainnya"
      ) {
        if (
          document.getElementById(
            "1845Landscape" + section18.sector45.landscape
          ) !== null
        ) {
          document.getElementById(
            "1845Landscape" + section18.sector45.landscape
          ).checked = true;
        }
      }
    }
    if (section18?.sector45.demografi !== "") {
      if (
        section18?.sector45.demografi === "Padat" ||
        section18?.sector45.demografi === "Cukup Padat" ||
        section18?.sector45.demografi === "Kosong" ||
        section18?.sector45.demografi === "Lainnya"
      ) {
        if (
          document.getElementById(
            "1845Demografi" + section18.sector45.demografi
          ) !== null
        ) {
          document.getElementById(
            "1845Demografi" + section18.sector45.demografi
          ).checked = true;
        }
      }
    }
    // ~~~~~~~~~~ SECTOR90
    if (section18?.sector90.topografi !== "") {
      if (
        section18?.sector90.topografi === "Datar" ||
        section18?.sector90.topografi === "Laut/Sungai" ||
        section18?.sector90.topografi === "Hutan" ||
        section18?.sector90.topografi === "Berbukit"
      ) {
        if (
          document.getElementById(
            "1890Topografi" + section18.sector90.topografi
          ) !== null
        ) {
          document.getElementById(
            "1890Topografi" + section18.sector90.topografi
          ).checked = true;
        }
      }
    }
    if (section18?.sector90.landscape !== "") {
      if (
        section18?.sector90.landscape === "Pemukiman" ||
        section18?.sector90.landscape === "Perkantoran" ||
        section18?.sector90.landscape === "Industri" ||
        section18?.sector90.landscape === "Lainnya"
      ) {
        if (
          document.getElementById(
            "1890Landscape" + section18.sector90.landscape
          ) !== null
        ) {
          document.getElementById(
            "1890Landscape" + section18.sector90.landscape
          ).checked = true;
        }
      }
    }
    if (section18?.sector90.demografi !== "") {
      if (
        section18?.sector90.demografi === "Padat" ||
        section18?.sector90.demografi === "Cukup Padat" ||
        section18?.sector90.demografi === "Kosong" ||
        section18?.sector90.demografi === "Lainnya"
      ) {
        if (
          document.getElementById(
            "1890Demografi" + section18.sector90.demografi
          ) !== null
        ) {
          document.getElementById(
            "1890Demografi" + section18.sector90.demografi
          ).checked = true;
        }
      }
    }
    // ~~~~~~~~~~ SECTOR135
    if (section18?.sector135.topografi !== "") {
      if (
        section18?.sector135.topografi === "Datar" ||
        section18?.sector135.topografi === "Laut/Sungai" ||
        section18?.sector135.topografi === "Hutan" ||
        section18?.sector135.topografi === "Berbukit"
      ) {
        if (
          document.getElementById(
            "18135Topografi" + section18.sector135.topografi
          ) !== null
        ) {
          document.getElementById(
            "18135Topografi" + section18.sector135.topografi
          ).checked = true;
        }
      }
    }
    if (section18?.sector135.landscape !== "") {
      if (
        section18?.sector135.landscape === "Pemukiman" ||
        section18?.sector135.landscape === "Perkantoran" ||
        section18?.sector135.landscape === "Industri" ||
        section18?.sector135.landscape === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18135Landscape" + section18.sector135.landscape
          ) !== null
        ) {
          document.getElementById(
            "18135Landscape" + section18.sector135.landscape
          ).checked = true;
        }
      }
    }
    if (section18?.sector135.demografi !== "") {
      if (
        section18?.sector135.demografi === "Padat" ||
        section18?.sector135.demografi === "Cukup Padat" ||
        section18?.sector135.demografi === "Kosong" ||
        section18?.sector135.demografi === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18135Demografi" + section18.sector135.demografi
          ) !== null
        ) {
          document.getElementById(
            "18135Demografi" + section18.sector135.demografi
          ).checked = true;
        }
      }
    }
    // ~~~~~~~~~~ SECTOR180
    if (section18?.sector180.topografi !== "") {
      if (
        section18?.sector180.topografi === "Datar" ||
        section18?.sector180.topografi === "Laut/Sungai" ||
        section18?.sector180.topografi === "Hutan" ||
        section18?.sector180.topografi === "Berbukit"
      ) {
        if (
          document.getElementById(
            "18180Topografi" + section18.sector180.topografi
          ) !== null
        ) {
          document.getElementById(
            "18180Topografi" + section18.sector180.topografi
          ).checked = true;
        }
      }
    }
    if (section18?.sector180.landscape !== "") {
      if (
        section18?.sector180.landscape === "Pemukiman" ||
        section18?.sector180.landscape === "Perkantoran" ||
        section18?.sector180.landscape === "Industri" ||
        section18?.sector180.landscape === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18180Landscape" + section18.sector180.landscape
          ) !== null
        ) {
          document.getElementById(
            "18180Landscape" + section18.sector180.landscape
          ).checked = true;
        }
      }
    }
    if (section18?.sector180.demografi !== "") {
      if (
        section18?.sector180.demografi === "Padat" ||
        section18?.sector180.demografi === "Cukup Padat" ||
        section18?.sector180.demografi === "Kosong" ||
        section18?.sector180.demografi === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18180Demografi" + section18.sector180.demografi
          ) !== null
        ) {
          document.getElementById(
            "18180Demografi" + section18.sector180.demografi
          ).checked = true;
        }
      }
    }
    // ~~~~~~~~~~ SECTOR45
    if (section18?.sector225.topografi !== "") {
      if (
        section18?.sector225.topografi === "Datar" ||
        section18?.sector225.topografi === "Laut/Sungai" ||
        section18?.sector225.topografi === "Hutan" ||
        section18?.sector225.topografi === "Berbukit"
      ) {
        if (
          document.getElementById(
            "18225Topografi" + section18.sector225.topografi
          ) !== null
        ) {
          document.getElementById(
            "18225Topografi" + section18.sector225.topografi
          ).checked = true;
        }
      }
    }
    if (section18?.sector225.landscape !== "") {
      if (
        section18?.sector225.landscape === "Pemukiman" ||
        section18?.sector225.landscape === "Perkantoran" ||
        section18?.sector225.landscape === "Industri" ||
        section18?.sector225.landscape === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18225Landscape" + section18.sector225.landscape
          ) !== null
        ) {
          document.getElementById(
            "18225Landscape" + section18.sector225.landscape
          ).checked = true;
        }
      }
    }
    if (section18?.sector225.demografi !== "") {
      if (
        section18?.sector225.demografi === "Padat" ||
        section18?.sector225.demografi === "Cukup Padat" ||
        section18?.sector225.demografi === "Kosong" ||
        section18?.sector225.demografi === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18225Demografi" + section18.sector225.demografi
          ) !== null
        ) {
          document.getElementById(
            "18225Demografi" + section18.sector225.demografi
          ).checked = true;
        }
      }
    }
    // ~~~~~~~~~~ SECTOR45
    if (section18?.sector270.topografi !== "") {
      if (
        section18?.sector270.topografi === "Datar" ||
        section18?.sector270.topografi === "Laut/Sungai" ||
        section18?.sector270.topografi === "Hutan" ||
        section18?.sector270.topografi === "Berbukit"
      ) {
        if (
          document.getElementById(
            "18270Topografi" + section18.sector270.topografi
          ) !== null
        ) {
          document.getElementById(
            "18270Topografi" + section18.sector270.topografi
          ).checked = true;
        }
      }
    }
    if (section18?.sector270.landscape !== "") {
      if (
        section18?.sector270.landscape === "Pemukiman" ||
        section18?.sector270.landscape === "Perkantoran" ||
        section18?.sector270.landscape === "Industri" ||
        section18?.sector270.landscape === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18270Landscape" + section18.sector270.landscape
          ) !== null
        ) {
          document.getElementById(
            "18270Landscape" + section18.sector270.landscape
          ).checked = true;
        }
      }
    }
    if (section18?.sector270.demografi !== "") {
      if (
        section18?.sector270.demografi === "Padat" ||
        section18?.sector270.demografi === "Cukup Padat" ||
        section18?.sector270.demografi === "Kosong" ||
        section18?.sector270.demografi === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18270Demografi" + section18.sector270.demografi
          ) !== null
        ) {
          document.getElementById(
            "18270Demografi" + section18.sector270.demografi
          ).checked = true;
        }
      }
    }
    // ~~~~~~~~~~ SECTOR45
    if (section18?.sector315.topografi !== "") {
      if (
        section18?.sector315.topografi === "Datar" ||
        section18?.sector315.topografi === "Laut/Sungai" ||
        section18?.sector315.topografi === "Hutan" ||
        section18?.sector315.topografi === "Berbukit"
      ) {
        if (
          document.getElementById(
            "18315Topografi" + section18.sector315.topografi
          ) !== null
        ) {
          document.getElementById(
            "18315Topografi" + section18.sector315.topografi
          ).checked = true;
        }
      }
    }
    if (section18?.sector315.landscape !== "") {
      if (
        section18?.sector315.landscape === "Pemukiman" ||
        section18?.sector315.landscape === "Perkantoran" ||
        section18?.sector315.landscape === "Industri" ||
        section18?.sector315.landscape === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18315Landscape" + section18.sector315.landscape
          ) !== null
        ) {
          document.getElementById(
            "18315Landscape" + section18.sector315.landscape
          ).checked = true;
        }
      }
    }
    if (section18?.sector315.demografi !== "") {
      if (
        section18?.sector315.demografi === "Padat" ||
        section18?.sector315.demografi === "Cukup Padat" ||
        section18?.sector315.demografi === "Kosong" ||
        section18?.sector315.demografi === "Lainnya"
      ) {
        if (
          document.getElementById(
            "18315Demografi" + section18.sector315.demografi
          ) !== null
        ) {
          document.getElementById(
            "18315Demografi" + section18.sector315.demografi
          ).checked = true;
        }
      }
    }
  };

  showCheckedOnLoad();

  return (
    <div className='d-flex flex-column px-0'>
      <div className='form-group'>
        <label className='col-12 px-0'>{props.label}</label>
        <div className='d-flex flex-row'>
          {props.radioItem.map((item, i) => {
            return (
              <div className='form-check' key={i}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='radio'
                      name={
                        props.sector
                          ? props.section + props.sector + props.label
                          : props.section + props.label
                      }
                      id={
                        props.sector
                          ? props.section +
                            props.sector +
                            props.label +
                            item.name
                          : props.section +
                            props.label.replace(/\s+/g, "") +
                            item.name.replace(/\s+/g, "")
                      }
                      key={i}
                      value={item.name}
                      onClick={(e) => {
                        switch (props.section) {
                          case "1":
                            switch (props.label) {
                              case "Status Site":
                                dispatch(
                                  setSection1({
                                    ...section1,
                                    statussite: e.target.value,
                                  })
                                );
                                break;
                              default:
                                dispatch(
                                  setSection1({
                                    ...section1,
                                  })
                                );
                                break;
                            }
                            break;

                          case "2":
                            switch (props.label) {
                              case "Ijin ke Lokasi":
                                dispatch(
                                  setSection2({
                                    ...section2,
                                    perizinanakseskesite: e.target.value,
                                  })
                                );
                                break;
                              default:
                                dispatch(
                                  setSection2({
                                    ...section2,
                                  })
                                );
                                break;
                            }

                          case "4":
                            switch (props.label) {
                              case "Penempatan Antenna":
                                dispatch(
                                  setSection4({
                                    ...section4,
                                    penempatanantena: e.target.value,
                                  })
                                );
                                break;
                              case "Mounting Antenna":
                                dispatch(
                                  setSection4({
                                    ...section4,
                                    alasantena: e.target.value,
                                  })
                                );
                                break;
                              case "Satelit Yang Akan Digunakan":
                                dispatch(
                                  setSection4({
                                    ...section4,
                                    penggunaansatelit: e.target.value,
                                  })
                                );
                                break;
                              default:
                                dispatch(
                                  setSection4({
                                    ...section4,
                                  })
                                );
                                break;
                            }
                            break;

                          case "5":
                            switch (props.label) {
                              case "Posisi Tower/Pole":
                                dispatch(
                                  setSection5({
                                    ...section5,
                                    ketinggiantowerpole: e.target.value,
                                  })
                                );
                                break;

                              case "Keamanan":
                                dispatch(
                                  setSection5({
                                    ...section5,
                                    keamanan: e.target.value,
                                  })
                                );
                                break;

                              default:
                                dispatch(
                                  setSection5({
                                    ...section5,
                                  })
                                );
                                break;
                            }
                            break;

                          case "6":
                            switch (props.label) {
                              case "Ketersediaan Coverage dalam Radius <2 km dari Site":
                                // untuk membuat checked ketika clicked (onchange/onclick)
                                if (
                                  section6.kemampuanjarakradius5kmdarisite !==
                                    "" &&
                                  section6.kemampuanjarakradius5kmdarisite ===
                                    item.name
                                ) {
                                  // setIsChecked(true);
                                  document.getElementById(
                                    props.section +
                                      props.label.replace(/\s+/g, "") +
                                      section6.kemampuanjarakradius5kmdarisite.replace(
                                        /\s+/g,
                                        ""
                                      )
                                  ).checked = true;
                                }
                                dispatch(
                                  setSection6({
                                    ...section6,
                                    kemampuanjarakradius5kmdarisite:
                                      e.target.value,
                                  })
                                );
                                break;
                              case "Ketersediaan Sinyal":
                                dispatch(
                                  setSection6({
                                    ...section6,
                                    tipesinyalyangtersedia: e.target.value,
                                  })
                                );
                                break;
                              case "Level Sinyal di HP (Jika ada Coverage)":
                                if (
                                  section6.levelsinyal4gjikaadajangkauan !==
                                    "" &&
                                  section6.levelsinyal4gjikaadajangkauan ===
                                    item.name
                                ) {
                                  // setIsChecked(true);
                                  document.getElementById(
                                    props.section +
                                      props.label.replace(/\s+/g, "") +
                                      section6.levelsinyal4gjikaadajangkauan.replace(
                                        /\s+/g,
                                        ""
                                      )
                                  ).checked = true;
                                }
                                dispatch(
                                  setSection6({
                                    ...section6,
                                    levelsinyal4gjikaadajangkauan:
                                      e.target.value,
                                  })
                                );
                                break;
                              case "Call di Site":
                                if (
                                  section6.calldisite !== "" &&
                                  section6.calldisite === item.name
                                ) {
                                  // setIsChecked(true);
                                  document.getElementById(
                                    props.section +
                                      props.label.replace(/\s+/g, "") +
                                      section6.calldisite.replace(/\s+/g, "")
                                  ).checked = true;
                                }
                                dispatch(
                                  setSection6({
                                    ...section6,
                                    calldisite: e.target.value,
                                  })
                                );
                                break;
                              case "SMS di Site":
                                if (
                                  section6.smsdisite !== "" &&
                                  section6.smsdisite === item.name
                                ) {
                                  // setIsChecked(true);
                                  document.getElementById(
                                    props.section +
                                      props.label.replace(/\s+/g, "") +
                                      section6.smsdisite.replace(/\s+/g, "")
                                  ).checked = true;
                                }
                                dispatch(
                                  setSection6({
                                    ...section6,
                                    smsdisite: e.target.value,
                                  })
                                );
                                break;
                              case "Nama Operator":
                                dispatch(
                                  setSection6({
                                    ...section6,
                                    namaoperator: e.target.value,
                                  })
                                );
                                break;
                              default:
                                dispatch(
                                  setSection6({
                                    ...section6,
                                  })
                                );
                                break;
                            }
                            break;

                          case "7":
                            switch (props.label) {
                              case "Pengurusan IMB":
                                dispatch(
                                  setSection7({
                                    ...section7,
                                    pengurusanimb: e.target.value,
                                  })
                                );
                                break;

                              case "Resiko Bencana":
                                dispatch(
                                  setSection7({
                                    ...section7,
                                    resikobencana: e.target.value,
                                  })
                                );
                                break;

                              case "Resiko Relokasi":
                                dispatch(
                                  setSection7({
                                    ...section7,
                                    resikorelokasi: e.target.value,
                                  })
                                );
                                break;

                              case "Resiko Komplain":
                                dispatch(
                                  setSection7({
                                    ...section7,
                                    resikokeluhan: e.target.value,
                                  })
                                );
                                break;
                              default:
                                dispatch(
                                  setSection7({
                                    ...section7,
                                  })
                                );
                                break;
                            }
                            break;

                          case "8":
                            switch (props.label) {
                              // case "Jam Operasi Sumber Listrik":
                              //   dispatch(
                              //     setSection8({
                              //       ...section8,
                              //       jumlahjamketersediaanlistrik:
                              //         e.target.value,
                              //     })
                              //   );
                              //   break; >>> diubah jadi dropdown
                              case "Generator Backup":
                                if (e.target.value === "Tidak Ada") {
                                  dispatch(
                                    setSection8({
                                      ...section8,
                                      generatorbackup: e.target.value,
                                      brandgenerator: "",
                                      inputkapasitas: "",
                                    })
                                  );
                                } else {
                                  dispatch(
                                    setSection8({
                                      ...section8,
                                      generatorbackup: e.target.value,
                                    })
                                  );
                                }
                                break;
                              case "Pasokan BBM":
                                dispatch(
                                  setSection8({
                                    ...section8,
                                    kemampuanbahanbensin: e.target.value,
                                  })
                                );
                                break;
                              case "Jenis BBM yang Sering Tersedia":
                                dispatch(
                                  setSection8({
                                    ...section8,
                                    tipebahanbakaryangtersedia: e.target.value,
                                  })
                                );
                                break;
                              case "Listrik Bisa Dipakai Untuk Perangkat":
                                dispatch(
                                  setSection8({
                                    ...section8,
                                    listrikbisadigunakanuntukalat:
                                      e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "10":
                            switch (props.label) {
                              case "Desa Terdekat":
                                if (e.target.value === "Tidak Ada") {
                                  dispatch(
                                    setSection10({
                                      ...section10,
                                      desaterdekat: e.target.value,
                                      desaterdekatinput: "",
                                    })
                                  );
                                } else {
                                  dispatch(
                                    setSection10({
                                      ...section10,
                                      desaterdekat: e.target.value,
                                    })
                                  );
                                }
                                break;
                              case "Warga yang dapat dilatih tentang pengoperasian perangkat dasar / Training":
                                dispatch(
                                  setSection10({
                                    ...section10,
                                    pendudukyangbisadilatihuntukmenggunakanprodukjasa:
                                      e.target.value,
                                  })
                                );
                                break;
                              case "Akses Internet Non Selular":
                                if (e.target.value === "Tidak Ada") {
                                  dispatch(
                                    setSection10({
                                      ...section10,
                                      aksesinternet: e.target.value,
                                      aksesinternetinput: "",
                                    })
                                  );
                                } else {
                                  dispatch(
                                    setSection10({
                                      ...section10,
                                      aksesinternet: e.target.value,
                                    })
                                  );
                                }
                                break;
                            }
                            break;

                          case "11":
                            switch (props.label) {
                              case "":
                                dispatch(
                                  setSection11({
                                    ...section11,
                                    topografiumum: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "12":
                            switch (props.label) {
                              case "Tower ke Source Power (if any)":
                                dispatch(
                                  setSection12({
                                    ...section12,
                                    towerkesumberdaya: e.target.value,
                                  })
                                );
                                break;
                              case "Tower ke Antenna VSAT":
                                dispatch(
                                  setSection12({
                                    ...section12,
                                    towerkeantenavsat: e.target.value,
                                  })
                                );
                                break;
                              case "Tower ke Solar Panel":
                                dispatch(
                                  setSection12({
                                    ...section12,
                                    towerkesolarpanel: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "13":
                            switch (props.label) {
                              case "":
                                dispatch(
                                  setSection13({
                                    ...section13,
                                    topografiumum: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "14":
                            switch (props.label) {
                              case "":
                                dispatch(
                                  setSection14({
                                    ...section14,
                                    topografiumum: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "15":
                            switch (props.label) {
                              case "":
                                dispatch(
                                  setSection15({
                                    ...section15,
                                    topografiumum: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "16":
                            switch (props.label) {
                              case "":
                                dispatch(
                                  setSection16({
                                    ...section16,
                                    topografiumum: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "17":
                            switch (props.label) {
                              case "":
                                dispatch(
                                  setSection17({
                                    ...section17,
                                    topografiumum: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "18":
                            switch (props.sector) {
                              case "0":
                                switch (props.label) {
                                  case "Topografi":
                                    // untuk membuat checked ketika clicked (onchange/onclick)
                                    if (
                                      section18.sector0.topografi === item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "180Topografi" +
                                          section18.sector0.topografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector0: {
                                          ...section18.sector0,
                                          topografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;
                                  case "Landscape":
                                    if (
                                      section18.sector0.landscape === item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "180Landscape" +
                                          section18.sector0.landscape
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector0: {
                                          ...section18.sector0,
                                          landscape: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  case "Demografi":
                                    if (
                                      section18.sector0.demografi === item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "180Demografi" +
                                          section18.sector0.demografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector0: {
                                          ...section18.sector0,
                                          demografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  default:
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                      })
                                    );
                                    break;
                                }
                                break;
                              case "45":
                                switch (props.label) {
                                  case "Topografi":
                                    // untuk membuat checked ketika clicked (onchange/onclick)
                                    if (
                                      section18.sector45.topografi === item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "1845Topografi" +
                                          section18.sector45.topografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector45: {
                                          ...section18.sector45,
                                          topografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;
                                  case "Landscape":
                                    if (
                                      section18.sector45.landscape === item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "1845Landscape" +
                                          section18.sector45.landscape
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector45: {
                                          ...section18.sector45,
                                          landscape: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  case "Demografi":
                                    if (
                                      section18.sector45.demografi === item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "1845Demografi" +
                                          section18.sector45.demografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector45: {
                                          ...section18.sector45,
                                          demografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  default:
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                      })
                                    );
                                    break;
                                }
                                break;
                              case "90":
                                switch (props.label) {
                                  case "Topografi":
                                    // untuk membuat checked ketika clicked (onchange/onclick)
                                    if (
                                      section18.sector90.topografi === item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "1890Topografi" +
                                          section18.sector90.topografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector90: {
                                          ...section18.sector90,
                                          topografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;
                                  case "Landscape":
                                    if (
                                      section18.sector90.landscape === item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "1890Landscape" +
                                          section18.sector90.landscape
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector90: {
                                          ...section18.sector90,
                                          landscape: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  case "Demografi":
                                    if (
                                      section18.sector90.demografi === item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "1890Demografi" +
                                          section18.sector90.demografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector90: {
                                          ...section18.sector90,
                                          demografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  default:
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                      })
                                    );
                                    break;
                                }
                                break;
                              case "135":
                                switch (props.label) {
                                  case "Topografi":
                                    // untuk membuat checked ketika clicked (onchange/onclick)
                                    if (
                                      section18.sector135.topografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18135Topografi" +
                                          section18.sector135.topografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector135: {
                                          ...section18.sector135,
                                          topografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;
                                  case "Landscape":
                                    if (
                                      section18.sector135.landscape ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18135Landscape" +
                                          section18.sector135.landscape
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector135: {
                                          ...section18.sector135,
                                          landscape: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  case "Demografi":
                                    if (
                                      section18.sector135.demografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18135Demografi" +
                                          section18.sector135.demografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector135: {
                                          ...section18.sector135,
                                          demografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  default:
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                      })
                                    );
                                    break;
                                }
                                break;
                              case "180":
                                switch (props.label) {
                                  case "Topografi":
                                    // untuk membuat checked ketika clicked (onchange/onclick)
                                    if (
                                      section18.sector180.topografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18180Topografi" +
                                          section18.sector180.topografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector180: {
                                          ...section18.sector180,
                                          topografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;
                                  case "Landscape":
                                    if (
                                      section18.sector180.landscape ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18180Landscape" +
                                          section18.sector180.landscape
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector180: {
                                          ...section18.sector180,
                                          landscape: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  case "Demografi":
                                    if (
                                      section18.sector180.demografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18180Demografi" +
                                          section18.sector180.demografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector180: {
                                          ...section18.sector180,
                                          demografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  default:
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                      })
                                    );
                                    break;
                                }
                                break;
                              case "225":
                                switch (props.label) {
                                  case "Topografi":
                                    // untuk membuat checked ketika clicked (onchange/onclick)
                                    if (
                                      section18.sector225.topografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18225Topografi" +
                                          section18.sector225.topografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector225: {
                                          ...section18.sector225,
                                          topografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;
                                  case "Landscape":
                                    if (
                                      section18.sector225.landscape ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18225Landscape" +
                                          section18.sector225.landscape
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector225: {
                                          ...section18.sector225,
                                          landscape: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  case "Demografi":
                                    if (
                                      section18.sector225.demografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18225Demografi" +
                                          section18.sector225.demografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector225: {
                                          ...section18.sector225,
                                          demografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  default:
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                      })
                                    );
                                    break;
                                }
                                break;
                              case "270":
                                switch (props.label) {
                                  case "Topografi":
                                    // untuk membuat checked ketika clicked (onchange/onclick)
                                    if (
                                      section18.sector270.topografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18270Topografi" +
                                          section18.sector270.topografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector270: {
                                          ...section18.sector270,
                                          topografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;
                                  case "Landscape":
                                    if (
                                      section18.sector270.landscape ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18270Landscape" +
                                          section18.sector270.landscape
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector270: {
                                          ...section18.sector270,
                                          landscape: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  case "Demografi":
                                    if (
                                      section18.sector270.demografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18270Demografi" +
                                          section18.sector270.demografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector270: {
                                          ...section18.sector270,
                                          demografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  default:
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                      })
                                    );
                                    break;
                                }
                                break;
                              case "315":
                                switch (props.label) {
                                  case "Topografi":
                                    // untuk membuat checked ketika clicked (onchange/onclick)
                                    if (
                                      section18.sector315.topografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18315Topografi" +
                                          section18.sector315.topografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector315: {
                                          ...section18.sector315,
                                          topografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;
                                  case "Landscape":
                                    if (
                                      section18.sector315.landscape ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18315Landscape" +
                                          section18.sector315.landscape
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector315: {
                                          ...section18.sector315,
                                          landscape: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  case "Demografi":
                                    if (
                                      section18.sector315.demografi ===
                                      item.name
                                    ) {
                                      // setIsChecked(true);
                                      document.getElementById(
                                        "18315Demografi" +
                                          section18.sector315.demografi
                                      ).checked = true;
                                    }
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                        sector315: {
                                          ...section18.sector315,
                                          demografi: e.target.value,
                                        },
                                      })
                                    );
                                    break;

                                  default:
                                    dispatch(
                                      setSection18({
                                        ...section18,
                                      })
                                    );
                                    break;
                                }
                                break;
                            }
                            break;

                          case "19":
                            switch (props.label) {
                              case "":
                                dispatch(
                                  setSection19({
                                    ...section19,
                                    topografiumum: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "20":
                            switch (props.label) {
                              case "":
                                dispatch(
                                  setSection20({
                                    ...section20,
                                    topografiumum: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;

                          case "22":
                            switch (props.label) {
                              case "General Comment":
                                dispatch(
                                  setSection22({
                                    ...section22,
                                    generalcomment: e.target.value,
                                  })
                                );
                                break;
                            }
                            break;
                          default:
                            break;
                        }
                      }}
                    />{" "}
                    {item.name}
                  </Label>
                </FormGroup>
              </div>
            );
          })}
        </div>
      </div>
      <div className='mb-2'>
        {props.message ? (
          <p className={`font-weight-normal text-info`}>* {props.message}</p>
        ) : (
          <></>
        )}
        {props.message2 ? (
          <p className={`font-weight-normal text-info`}>* {props.message2}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DetailRadio;
