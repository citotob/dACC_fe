import React, { useEffect, useMemo } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import get from "lodash.get";
var moment = require("moment");

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  movieContainer: {
    backgroundColor: "#f6f6f5",
    display: "flex",
    flexDirection: "row",
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  movieDetails: {
    display: "flex",
    marginLeft: 30,
    marginRight: 30,
  },

  movieDetailsimg: {
    display: "flex",
    marginLeft: 80,
    marginRight: 80,
  },

  movieTitle: {
    fontSize: 15,
    marginBottom: 10,
  },

  movieTitleimg: {
    fontSize: 15,
    marginBottom: 10,
  },

  movieOverview: {
    fontSize: 10,
  },

  image: {
    height: 150,
    width: 250,
    display: "block",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "10%",
    // margin: 0 0 6 0,
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12,
  },
  vote: {
    display: "flex",
    flexDirection: "column",
  },
  rating: {
    height: 10,
    width: 10,
  },
  vote_text: {
    width: 100,
    fontSize: 10,
    marginRight: 20,
    marginLeft: 60,
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    backgroundColor: "#61C74F",
    color: "#fff",
  },
  vote_pop_text: {
    width: 100,
    fontSize: 10,
    marginLeft: 4,
    marginRight: 20,
    textAlign: "left",
  },
  overviewContainer: {
    minHeight: 110,
  },
  detailsFooter: {
    display: "flex",
    flexDirection: "row",
  },
  lang: {
    fontSize: 8,
    fontWeight: 700,
  },
  vote_average: {
    fontSize: 8,
    marginLeft: 4,
    fontWeight: "bold",
  },
  sectionContainer: {
    backgroundColor: "#f6f6f5",
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
});

const SectionDataPelanggan = ({ data }) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>
          LOKASI: {data.namaLokasi ?? '-'}{" "}
          {data.latitude && data.longitude ? `${data.latitude}, ${data.longitude}` : '-, -'}{" "}
        </Text>
        <Text style={styles.movieTitle}>Section 1: Data Calon Pelanggan </Text>

        <View style={styles.subtitle}>
          <View style={styles.vote}>
            <Text style={styles.vote_text}>PIC Desa: </Text>
          </View>
          <View style={styles.vote}>
            <Text style={styles.vote_pop_text}>
              {get(data, "pic.namaPic", "-")}
            </Text>
          </View>
        </View>

        <View style={styles.subtitle}>
          <View style={styles.vote}>
            <Text style={styles.vote_text}>Nomor Telepon PIC Desa: </Text>
          </View>
          <View style={styles.vote}>
            <Text style={styles.vote_pop_text}>
              {get(data, "pic.phonePic", "-")}
            </Text>
          </View>
        </View>

        <View style={styles.subtitle}>
          <View style={styles.vote}>
            <Text style={styles.vote_text}>Tanggal Pelaksanaan: </Text>
          </View>
          <View style={styles.vote}>
            <Text style={styles.vote_pop_text}>
              {data.tanggalPelaksanaan
                ? moment(data.tanggalPelaksanaan).format("DD/MM/YYYY")
                : ""}
            </Text>
          </View>
        </View>

        <View style={styles.subtitle}>
          <View style={styles.vote}>
            <Text style={styles.vote_text}>Catatan: </Text>
          </View>
          <View style={styles.vote}>
            <Text style={styles.vote_pop_text}>
              {data.note ?? "-"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SectionFotoLokasi = ({ data }) => {
  return (
    <View style={styles.sectionContainer} wrap={true}>
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>Section 3: Foto Lokasi </Text>

        <View style={styles.vote}>
          <Text style={styles.movieTitleimg}>
            Foto Kandidat Lahan
          </Text>
        </View>
        <View style={styles.vote}>
          <Image
            src={`${process.env.REACT_APP_BE_URL}${data.fotoKandidatLahan.url}`}
            style={styles.image}
            crossorigin="anonymous"
          />
        </View>

        <View style={styles.vote}>
          <Text style={styles.movieTitleimg}>
            Marking GPS
          </Text>
        </View>
        <View style={styles.vote}>
          <Image
            src={`${process.env.REACT_APP_BE_URL}${data.fotoMarkingGps.url}`}
            style={styles.image}
            crossorigin="anonymous"
          />
        </View>

        <View style={styles.vote}>
          <Text style={styles.movieTitleimg}>
            Foto Arah Utara dari Titik (dengan kompas)
          </Text>
        </View>
        <View style={styles.vote}>
          <Image
            src={`${process.env.REACT_APP_BE_URL}${data.fotoUtaraTitik.url}`}
            style={styles.image}
            crossorigin="anonymous"
          />
        </View>

        <View style={styles.vote}>
          <Text style={styles.movieTitleimg}>
            Foto Arah Timur dari Titik (dengan kompas)
          </Text>
        </View>
        <View style={styles.vote}>
          <Image
            src={`${process.env.REACT_APP_BE_URL}${data.fotoTimurTitik.url}`}
            style={styles.image}
            crossorigin="anonymous"
          />
        </View>

        <View style={styles.vote}>
          <Text style={styles.movieTitleimg}>
            Foto Arah Selatan dari Titik (dengan kompas)
          </Text>
        </View>
        <View style={styles.vote}>
          <Image
            src={`${process.env.REACT_APP_BE_URL}${data.fotoSelatanTitik.url}`}
            style={styles.image}
            crossorigin="anonymous"
          />
        </View>

        <View style={styles.vote}>
          <Text style={styles.movieTitleimg}>
            Foto Arah Barat dari Titik (dengan kompas)
          </Text>
        </View>
        <View style={styles.vote}>
          <Image
            src={`${process.env.REACT_APP_BE_URL}${data.fotoBaratTitik.url}`}
            style={styles.image}
            crossorigin="anonymous"
          />
        </View>

      </View>
    </View>


  );
};

const SectionNetWork = ({ data }) => {
  return (
    <View style={styles.sectionContainer} wrap={false}>
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>Network: </Text>

        <View style={styles.subtitle}>
          <View style={styles.vote}>
            <Text style={styles.vote_text}>Tipe: </Text>
          </View>
          <View style={styles.vote}>
            <Text style={styles.vote_pop_text}>
              {get(data, "network.tipe", "-")}
            </Text>
          </View>
        </View>

        <View style={styles.subtitle}>
          <View style={styles.vote}>
            <Text style={styles.vote_text}>Download: </Text>
          </View>
          <View style={styles.vote}>
            <Text style={styles.vote_pop_text}>
              {get(data, "network.download", "-")}
            </Text>
          </View>
        </View>

        <View style={styles.subtitle}>
          <View style={styles.vote}>
            <Text style={styles.vote_text}>Upload: </Text>
          </View>
          <View style={styles.vote}>
            <Text style={styles.vote_pop_text}>
              {get(data, "network.upload", "-")}
            </Text>
          </View>
        </View>

      </View>
    </View>

  );
};

const ContentHasilSurveyDetail = ({ dataDetail, jenisSurvey, tab, data, issue }) => {
  useEffect(() => { }, [dataDetail], [data]);

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Detail Survey */}
          <View style={styles.movieContainer}>
            <View style={styles.movieDetails}>
              <Text style={styles.movieTitle}>Detail Survey</Text>
            </View>
          </View>

          {/* Section Detail */}
          <View style={styles.movieContainer}>
            {/* Column no. 1 */}
            <View style={styles.movieDetails}>

              {issue
                ? (
                  <View style={styles.subtitle}>
                    <View style={styles.vote}>
                      <Text style={styles.vote_text}>Deskripsi Issue: </Text>
                    </View>
                    <View style={styles.vote}>
                      <Text style={styles.vote_pop_text}>
                        {get(dataDetail, "data[0].issue[0].alasan", "-")}
                      </Text>
                    </View>
                  </View>)
                : (
                  <View>
                  </View>
                )}


              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Kode Survey: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>
                    {dataDetail
                      ? dataDetail.data[0]
                        ? dataDetail.data[0].kodeHasilSurvey
                        : ""
                      : ""}
                  </Text>
                </View>
              </View>

              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Provinsi: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>
                    {dataDetail
                      ? (dataDetail.lokasi.provinsi !== undefined
                        ? dataDetail.lokasi.provinsi.name
                        : "-")
                      : "-"}
                  </Text>
                </View>
              </View>

              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Kabupaten/Kota: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>
                    {dataDetail
                      ? dataDetail.lokasi.kabupaten
                        ? dataDetail.lokasi.kabupaten.name
                        : (dataDetail.lokasi.kota
                          ? dataDetail.lokasi.kota.name
                          : '-')
                      : "-"}
                  </Text>
                </View>
              </View>

              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Kecamatan: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>
                    {dataDetail
                      ? (dataDetail.lokasi.kecamatan !== undefined
                        ? dataDetail.lokasi.kecamatan.name
                        : "-")
                      : "-"}
                  </Text>
                </View>
              </View>

              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Lokasi Survey: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>
                    {dataDetail
                      ? (dataDetail.lokasi.desa !== undefined
                        ? dataDetail.lokasi.desa.name
                        : "-")
                      : "-"}
                  </Text>
                </View>
              </View>

              {/* </View> */}
              {/* Column no. 2, uncomment above and below*/}
              {/* <View style={styles.movieDetails}> */}

              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Jenis Survey: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>{jenisSurvey}</Text>
                </View>
              </View>

              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Nama Instansi Surveyor: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>
                    {dataDetail
                      ? get(dataDetail, "data[0].user.organization.name", "-")
                      : "-"}
                  </Text>
                </View>
              </View>

              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Nama Pelaksana: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>
                    {dataDetail
                      ? get(dataDetail, "data[0].user.name", "-")
                      : "-"}
                  </Text>
                </View>
              </View>

              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Tanggal Survey Masuk: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>
                    {get(dataDetail, 'data[0].status[0].tanggal_pembuatan')
                      ? moment(get(dataDetail, 'data[0].status[0].tanggal_pembuatan')).format("DD/MM/YYYY")
                      : '-'}
                  </Text>
                </View>
              </View>

              <View style={styles.subtitle}>
                <View style={styles.vote}>
                  <Text style={styles.vote_text}>Status Survey: </Text>
                </View>
                <View style={styles.vote}>
                  <Text style={styles.vote_pop_text}>
                    {dataDetail
                      ? dataDetail.data[0].status.slice(-1).pop().status
                      : "-"}
                  </Text>
                </View>
              </View>

            </View>

          </View>
        </Page>

        {/* Content Per Lokasi */}
        {dataDetail.data.map((data, index) => {
          return (
            <Page size="A4" style={styles.page}>
              <SectionDataPelanggan data={data} />
              {/* <SectionPerangkatIT data={data.device} /> */}
              <SectionFotoLokasi data={data} />
              <SectionNetWork data={data} />
            </Page>
          );
        })}
      </Document>
    </>
  );
};

const DownloadPDFBTSSurveyor = ({ dataDetail, jenisSurvey, issue }) => {
  const lokasiSurvey = dataDetail ? (dataDetail.lokasi.desa !== undefined ? dataDetail.lokasi.desa.name : "-") : "-";
  return useMemo(
    () => (
      <div>
        <PDFDownloadLink
          document={<ContentHasilSurveyDetail dataDetail={dataDetail} jenisSurvey={jenisSurvey} issue={issue} />}
          // fileName="hasilSurvey.pdf"
          fileName={`hasilSurvey-BTS-${lokasiSurvey}.pdf`}
        >
          {({ blob, url, loading, error }) => (loading ? "Loading document..." : " PDF ")}
        </PDFDownloadLink>
      </div>
    ),
    [dataDetail]
  );
};

export default DownloadPDFBTSSurveyor;
