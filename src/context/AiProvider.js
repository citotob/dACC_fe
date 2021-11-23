import React, { Component } from 'react';
import RootContext from './index';
import { methods, result } from 'underscore';

const dummyData = {
    "status": true,
    "count": 1,
    "data": [
        {
            "KodeSurvey": "AI-2344",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "InstansiSurveyor": "PT BROTO",
            "TitikLokasi": "Barat",
            "StatusSurvey": "Assigned",
        },
        {
            "KodeSurvey": "AI-2345",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "InstansiSurveyor": "QQQ",
            "TitikLokasi": "Cilandak Timur",
            "StatusSurvey": "Assigned",
        },
        {
            "KodeSurvey": "AI-2344",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "InstansiSurveyor": "PT PPPP",
            "TitikLokasi": "Jakarta",
            "StatusSurvey": "Assigned",
        }
    ]
}

const dummyDataPenugasanAdmin = {
    "status": true,
    "count": 1,
    "data": [
        {
            "KodeSurvey": "AI-2344",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "InstansiSurveyor": "PT BROTO",
            "TitikLokasi": "Barat",
            "StatusSurvey": "Assigned",
        },
        {
            "KodeSurvey": "AI-2345",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "InstansiSurveyor": "QQQ",
            "TitikLokasi": "Cilandak Timur",
            "StatusSurvey": "Assigned",
        },
        {
            "KodeSurvey": "AI-2344",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "InstansiSurveyor": "PT PPPP",
            "TitikLokasi": "Jakarta",
            "StatusSurvey": "Assigned",
        }
    ]
}

const dummyDataPenugasanSurveyor = {
    "status": true,
    "count": 1,
    "data": [
        {
            "KodeSurvey": "AI-2344",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "TanggalSLAPenyelesaian": "2019-04-09",
            "TitikLokasi": "Barat",
            "StatusSurvey": "Assigned",
            "longitude": "6.2088 S",
            "latitude": "6.2088 S",
            "NamaSurveyor": [
                {
                    "nama": "nada"
                },
                {
                    "nama": "ria"
                },
                {
                    "nama": "staff2"
                }
            ]
        },
        {
            "KodeSurvey": "AI-2345",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "TanggalSLAPenyelesaian": "2019-04-09",
            "TitikLokasi": "Cilandak Timur",
            "StatusSurvey": "Assigned",
            "longitude": "6.2088 S",
            "latitude": "6.2088 S",
            "NamaSurveyor": [
                {
                    "nama": "nada"
                },
                {
                    "nama": "ria"
                },
                {
                    "nama": "staff2"
                }
            ]
        },
        {
            "KodeSurvey": "AI-2344",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "TanggalSLAPenyelesaian": "2019-04-09",
            "TitikLokasi": "Jakarta",
            "StatusSurvey": "Assigned",
            "longitude": "6.2088 S",
            "latitude": "6.2088 S",
            "NamaSurveyor": [
                {
                    "nama": "nada"
                },
                {
                    "nama": "ria"
                },
                {
                    "nama": "staff2"
                }
            ]
        }
    ]
}

const dummyDataHasilSurvey = {
    "status": true,
    "count": 1,
    "data": [
        {
            "KodeSurvey": "",
            "TanggalHasilSurveyMasuk": "2020-07-10",
            "InstansiSurveyor": "PT BROTO",
            "TitikLokasi": "Barat",
            "HasilSurvey": [
                {
                    "name": "0000",
                    "id": 1,
                    "deskripsi": "bde",
                    "gambar": "assets/gambar1"


                },
                {
                    "name": "0000",
                    "id": 1,
                    "deskripsi": "bde",
                    "gambar": "assets/gambar1"
                },

            ],
            "DeskripsiIssue": [

            ]


        },

    ]
}


const dummyDataLog = {
    "status": true,
    "count": 1,
    "data": [
        {
            "KodeSurvey": "AI-9999",
            "survey": [
                {
                    "TanggalHasilSurveyMasuk": "2020-07-10",
                    "StatusHasilSurvey": "Assigned",
                },
                {
                    "TanggalHasilSurveyMasuk": "2019-01-20",
                    "StatusHasilSurvey": "Created",
                },
                {
                    "TanggalHasilSurveyMasuk": "2011-07-10",
                    "StatusHasilSurvey": "On Progress",
                }
            ]

        },
        {
            "KodeSurvey": "AI-55555",
            "survey": [
                {
                    "TanggalHasilSurveyMasuk": "2020-07-10",
                    "StatusHasilSurvey": "Assigned",
                },
                {
                    "TanggalHasilSurveyMasuk": "2019-01-20",
                    "StatusHasilSurvey": "Created",
                },
                {
                    "TanggalHasilSurveyMasuk": "2011-07-10",
                    "StatusHasilSurvey": "On Progress",
                }
            ]

        }
    ]
}



class AiProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataPenugasan: null,
            // logData: '',
        };
    }

    render() {
        return (
            <RootContext.Provider
                value={{
                    jenissurvey: "AI",
                    data: dummyData.data,
                    dataPenugasan: dummyDataPenugasanAdmin.data,
                    dataLog: dummyDataLog,
                    dataPenugasanSurveyor: dummyDataPenugasanSurveyor.data
                }}
            >
                {this.props.children}
            </RootContext.Provider>
        );
    }
}

export default AiProvider