import React, { Component } from 'react';
import RootContext from './index';

const dummyData = {
    "status":true,
    "count":1,
    "data":[
        {
            "KodeSurvey":"BTS-2344",
            "TanggalHasilSurveyMasuk":"2020-07-10",
            "InstansiSurveyor":"PT BROTO",
            "TitikLokasi":"Cilandak Timur",
            "StatusSurvey":"Assigned",
        },
        {
            "KodeSurvey":"BTS-2345",
            "TanggalHasilSurveyMasuk":"2020-07-10",
            "InstansiSurveyor":"PT BROTO",
            "TitikLokasi":"Cilandak Timur",
            "StatusSurvey":"Assigned",
        },
]}

const dummyDataLog = {
    "status":true,
    "count":1,
    "data":[
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
]}

const dummyDataPenugasan = {
    "status":true,
    "count":1,
    "data":[
        {
            "KodeSurvey":"AI-2344",
            "TanggalHasilSurveyMasuk":"2020-07-10",
            "TitikLokasi":"Barat",
            "StatusSurvey":"Assigned",
        },
        {
            "KodeSurvey":"AI-2345",
            "TanggalHasilSurveyMasuk":"2020-07-10",
            "TitikLokasi":"Cilandak Timur",
            "StatusSurvey":"Assigned",
        },
        {
            "KodeSurvey":"AI-2344",
            "TanggalHasilSurveyMasuk":"2020-07-10",
            "TitikLokasi":"Jakarta",
            "StatusSurvey":"Assigned",
        }
]}


const dummyDataPenugasanSurveyor = {
    "status":true,
    "count":1,
    "data":[
        {
            "KodeSurvey":"AI-2344",
            "TanggalHasilSurveyMasuk":"2020-07-10",
            "TanggalSLAPenyelesaian" :"2019-04-09",
            "TitikLokasi":"Barat",
            "StatusSurvey":"Assigned",
            "longitude": "6.2088 S",
            "latitude": "6.2088 S",
            "NamaSurveyor": [
                {
                    "nama" : "nada"
                },
                {
                    "nama" : "ria"
                },
                {
                    "nama" : "staff2"
                }
            ]
        },
        {
            "KodeSurvey":"AI-2345",
            "TanggalHasilSurveyMasuk":"2020-07-10",
            "TanggalSLAPenyelesaian" :"2019-04-09",
            "TitikLokasi":"Cilandak Timur",
            "StatusSurvey":"Assigned",
            "longitude": "6.2088 S",
            "latitude": "6.2088 S",
            "NamaSurveyor": [
                {
                    "nama" : "nada"
                },
                {
                    "nama" : "ria"
                },
                {
                    "nama" : "staff2"
                }
            ]
        },
        {
            "KodeSurvey":"AI-2344",
            "TanggalHasilSurveyMasuk":"2020-07-10",
            "TanggalSLAPenyelesaian" :"2019-04-09",
            "TitikLokasi":"Jakarta",
            "StatusSurvey":"Assigned",
            "longitude": "6.2088 S",
            "latitude": "6.2088 S",
            "NamaSurveyor": [
                {
                    "nama" : "nada"
                },
                {
                    "nama" : "ria"
                },
                {
                    "nama" : "staff2"
                }
            ]
        }
]}

class BtsProvider extends Component {
    render() {
        return (
            <RootContext.Provider
                value={{
                    jenissurvey: "BTS",
                    data:dummyData.data,
                    dataPenugasan: dummyDataPenugasan.data,
                    dataLog: dummyDataLog.data,
                    dataPenugasanSurveyor: dummyDataPenugasanSurveyor.data
                }}
            >
                {this.props.children}
            </RootContext.Provider>
        );
    }
}

export default BtsProvider