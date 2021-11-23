import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailDropdown from "../DetailDropdown.js";
import DetailInput from "../DetailInput";
import DetailRadio from "../DetailRadio";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section6({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection6 = "section6";
  let localSection6 = JSON.parse(
    window.localStorage.getItem(strSection6.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section6 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section6
  );

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  // useEffect(() => {
  //   if (localBtsMain !== null) {
  //     dispatch(setBtsMain(localBtsMain));
  //   } else {
  //     dispatch(
  //       setBtsMain({
  //         ...btsMain,
  //         section6: {
  //           ...btsMain?.section6,
  //           ketersediaancoveragedalamradius2kmdarisitetelkomsel: "",
  //           ketersediaansinyaltelkomsel: "",
  //           levelsinyaldihpjikaadacoverage: "",
  //           kekuatansignaltelkomsel: "",
  //           calldisitetelkomsel: "",
  //           smsdisitetelkomsel: "",
  //           internetspeedtest4gtelkomsel: "",
  //           ketersediaancoveragedalamradius2kmdarisiteindosat: "",
  //           ketersediaansinyalindosat: "",
  //           levelsinyaldihpjikaadacoverage: "",
  //           kekuatansignalindosat: "",
  //           calldisiteindosat: "",
  //           smsdisiteindosat: "",
  //           internetspeedtest4gindosat: "",
  //           ketersediaancoveragedalamradius2kmdarisitexl: "",
  //           ketersediaansinyalxl: "",
  //           levelsinyaldihpjikaadacoverage: "",
  //           kekuatansignalxl: "",
  //           calldisitexl: "",
  //           smsdisitexl: "",
  //           internetspeedtest4gxl: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 6</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Coverage Seluler Di Site
        </CardTitle>
        <div className={`font-weight-bold`}>
          {/* =============== TELOMSEL */}
          <div className='text-bold border rounded p-4 mb-2'>
            <p className='mt-4'>A. Nama Operator : TELKOMSEL</p>
            <DetailDropdown
              label='Ketersediaan Coverage dalam Radius <2 km dari Site'
              section='6'
              segment='Telkomsel'
              dropdownItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
              value={
                btsMain?.section6
                  ?.ketersediaancoveragedalamradius2kmdarisitetelkomsel
              }
            />
            <DetailDropdown
              label='Ketersediaan Sinyal'
              section='6'
              segment='Telkomsel'
              dropdownItem={[
                { name: "2G" },
                { name: "3G" },
                { name: "4G" },
                { name: "Tidak Ada Signal" },
              ]}
              value={btsMain?.section6?.ketersediaansinyaltelkomsel}
            />

            <DetailDropdown
              label='Level Sinyal di HP (Jika ada Coverage)'
              section='6'
              segment='Telkomsel'
              dropdownItem={[
                { name: "Signal Kuat" },
                { name: "Signal Lemah (< -105 dBm)" },
              ]}
              value={btsMain?.section6?.levelsinyaldihpjikaadacoveragetelkomsel}
            />
            {btsMain?.section6?.levelsinyaldihpjikaadacoveragetelkomsel !==
              "" && (
              <DetailInput
                isExtraInput={true}
                label='Kekuatan Signal'
                segment='Telkomsel'
                section='6'
                type='number'
                satuan='Dbm'
                value={btsMain?.section6?.kekuatansignaltelkomsel}
              />
            )}
            <DetailDropdown
              label='Call di Site'
              section='6'
              segment='Telkomsel'
              dropdownItem={[{ name: "Mudah (5x test)" }, { name: "Gagal" }]}
              value={btsMain?.section6?.calldisitetelkomsel}
            />
            <DetailDropdown
              label='SMS di Site'
              section='6'
              segment='Telkomsel'
              dropdownItem={[{ name: "Mudah (5x test)" }, { name: "Gagal" }]}
              value={btsMain?.section6?.smsdisitetelkomsel}
            />
            <DetailInput
              label='Internet/Speed Test 4G'
              section='6'
              segment='Telkomsel'
              satuan='Mbps'
              type='number'
              value={btsMain?.section6?.internetspeedtest4gtelkomsel}
            />
          </div>
          {/* =============== INDOSAT */}
          <div className='text-bold border rounded p-4 mb-2'>
            <p className='mt-4'>A. Nama Operator : INDOSAT</p>
            <DetailDropdown
              label='Ketersediaan Coverage dalam Radius <2 km dari Site'
              section='6'
              segment='Indosat'
              dropdownItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
              value={
                btsMain?.section6
                  ?.ketersediaancoveragedalamradius2kmdarisiteindosat
              }
            />
            <DetailDropdown
              label='Ketersediaan Sinyal'
              section='6'
              segment='Indosat'
              dropdownItem={[
                { name: "2G" },
                { name: "3G" },
                { name: "4G" },
                { name: "Tidak Ada Signal" },
              ]}
              value={btsMain?.section6?.ketersediaansinyalindosat}
            />

            <DetailDropdown
              label='Level Sinyal di HP (Jika ada Coverage)'
              section='6'
              segment='Indosat'
              dropdownItem={[
                { name: "Signal Kuat" },
                { name: "Signal Lemah (< -105 dBm)" },
              ]}
              value={btsMain?.section6?.levelsinyaldihpjikaadacoverageindosat}
            />
            {btsMain?.section6?.levelsinyaldihpjikaadacoverageindosat !==
              "" && (
              <DetailInput
                isExtraInput={true}
                label='Kekuatan Signal'
                segment='Indosat'
                section='6'
                type='number'
                satuan='Dbm'
                value={btsMain?.section6?.kekuatansignalindosat}
              />
            )}
            <DetailDropdown
              label='Call di Site'
              section='6'
              segment='Indosat'
              dropdownItem={[{ name: "Mudah (5x test)" }, { name: "Gagal" }]}
              value={btsMain?.section6?.calldisiteindosat}
            />
            <DetailDropdown
              label='SMS di Site'
              section='6'
              segment='Indosat'
              dropdownItem={[{ name: "Mudah (5x test)" }, { name: "Gagal" }]}
              value={btsMain?.section6?.smsdisiteindosat}
            />
            <DetailInput
              label='Internet/Speed Test 4G'
              section='6'
              segment='Indosat'
              satuan='Mbps'
              type='number'
              value={btsMain?.section6?.internetspeedtest4gindosat}
            />
          </div>
          {/* =============== XL */}
          <div className='text-bold border rounded p-4 mb-2'>
            <p className='mt-4'>A. Nama Operator : XL</p>
            <DetailDropdown
              label='Ketersediaan Coverage dalam Radius <2 km dari Site'
              section='6'
              segment='XL'
              dropdownItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
              value={
                btsMain?.section6?.ketersediaancoveragedalamradius2kmdarisitexl
              }
            />
            <DetailDropdown
              label='Ketersediaan Sinyal'
              section='6'
              segment='XL'
              dropdownItem={[
                { name: "2G" },
                { name: "3G" },
                { name: "4G" },
                { name: "Tidak Ada Signal" },
              ]}
              value={btsMain?.section6?.ketersediaansinyalxl}
            />

            <DetailDropdown
              label='Level Sinyal di HP (Jika ada Coverage)'
              section='6'
              segment='XL'
              dropdownItem={[
                { name: "Signal Kuat" },
                { name: "Signal Lemah (< -105 dBm)" },
              ]}
              value={btsMain?.section6?.levelsinyaldihpjikaadacoveragexl}
            />
            {btsMain?.section6?.levelsinyaldihpjikaadacoveragexl !== "" && (
              <DetailInput
                isExtraInput={true}
                label='Kekuatan Signal'
                segment='XL'
                section='6'
                type='number'
                satuan='Dbm'
                value={btsMain?.section6?.kekuatansignalxl}
              />
            )}
            <DetailDropdown
              label='Call di Site'
              section='6'
              segment='XL'
              dropdownItem={[{ name: "Mudah (5x test)" }, { name: "Gagal" }]}
              value={btsMain?.section6?.calldisitexl}
            />
            <DetailDropdown
              label='SMS di Site'
              section='6'
              segment='XL'
              dropdownItem={[{ name: "Mudah (5x test)" }, { name: "Gagal" }]}
              value={btsMain?.section6?.smsdisitexl}
            />
            <DetailInput
              label='Internet/Speed Test 4G'
              section='6'
              segment='XL'
              satuan='Mbps'
              type='number'
              value={btsMain?.section6?.internetspeedtest4gxl}
            />
          </div>
        </div>
        <NextPrevButtons
          section='6'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={false}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
}

export default Section6;
