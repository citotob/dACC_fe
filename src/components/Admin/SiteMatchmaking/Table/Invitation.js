import React, { useContext, useState } from "react";
import { MDBDataTable } from "mdbreact";
// import { LocalContext } from "../LocalContext";
// import style from "./style.module.css";
import API from "../../../../services";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
export default function WithMultipleCheckboxes(props) {
	// const { setInvitationList, selectedVendor } = useContext(LocalContext);

	///Filtering province that already choose in step 2
	const [dataInvitasi, setDataInvitasi] = useState({});
	var sitesData = JSON.parse(localStorage.getItem("sitesData") || "[]");
	const siteListA = sitesData.map((data) => {
		return { ...data };
	});
	var tempProv = [];
	siteListA.map((element) => {
		if (!tempProv.includes(element?.provinsi?.nama ?? element.provinsi)) {
			tempProv.push(
				element?.provinsi?.nama?.toUpperCase() ?? element.provinsi.toUpperCase()
			);
		}
	});
	const dataRecommend = useSelector((state) => state.dataReducer.dataRecommend);
	const [isLoading, setIsLoading] = React.useState(false);

	// refresh states
	const [refresh, setrefresh] = useState(false);
	const toggleRefresh = () => {
		setrefresh(!refresh);
	};

	const [isSelectAll, setIsSelectAll] = useState({
		FO: false,
		RL: false,
		VSAT_GS_SEWA_JASA: false,
		VSAT_GS_BELANJA_MODAL: false,
	});
	const handlePilihSemua = (props) => {
		var temp = JSON.parse(localStorage.getItem("dataInvitation")) ?? [];
		dataInvitasi[props].forEach((it) => {
			if (!temp.find((e) => e.id === it.id && e.teknologi === props))
				temp.push({ id: it.id, teknologi: props });
		});
		temp = _.uniq(temp, (e) => e.id && e.teknologi);
		localStorage.setItem("dataInvitation", JSON.stringify(temp));
		setDataInvitasi((prev) => ({
			...prev,
			[props]: dataInvitasi[props].map((it) => ({
				no: it.no,
				vendor: it.vendor,
				id: it.id,
				checked: <CheckBox key={it.id} id={it.id} props={props} />,
				rekomendasi: it.rekomendasi,
			})),
		}));
		setIsSelectAll((prev) => ({ ...prev, [props]: true }));
	};
	const handleHapusPilihSemua = (props) => {
		var temp = JSON.parse(localStorage.getItem("dataInvitation")) ?? [];
		dataInvitasi[props].map((it) => {
			_.remove(temp, (element) => {
				return element.id === it.id && element.teknologi === props;
			});
		});
		temp = _.uniq(temp);
		localStorage.setItem("dataInvitation", JSON.stringify(temp));
		setDataInvitasi((prev) => ({
			...prev,
			[props]: dataInvitasi[props].map((it) => ({
				no: it.no,
				vendor: it.vendor,
				id: it.id,
				checked: <CheckBox key={it.id} id={it.id} props={props} />,
				rekomendasi: it.rekomendasi,
			})),
		}));
		setIsSelectAll((prev) => ({ ...prev, [props]: false }));
	};

	// console.log("data invitasi", dataInvitasi);

	const CheckBox = ({ id, props }) => {
		var data = JSON.parse(localStorage.getItem("dataInvitation")) ?? [];
		const [check, setCheck] = React.useState(
			data.find((e) => e.id === id && e.teknologi === props) ? true : false
		);
		return (
			<input
				key={id}
				type="checkbox"
				name={id}
				value={id}
				onChange={(e) => {
					setIsSelectAll((prev) => ({ ...prev, [props]: false }));
					var data = JSON.parse(localStorage.getItem("dataInvitation")) ?? [];
					e.target.checked
						? data.push({ id: e.target.value, teknologi: props })
						: _.remove(data, (element) => {
								return (
									element.id === e.target.value && element.teknologi === props
								);
						  });
					localStorage.setItem("dataInvitation", JSON.stringify(data));
					setCheck(!check);
				}}
				checked={check}
			/>
		);
	};

	let tech = JSON.parse(localStorage.getItem("teknologi") || '["UNDEFINED"]');

	function fetchAllVendor() {
		setIsLoading(true);
		//check if invitation comes from sitematchmaking batch table or new batch
		// if coming from table then use technology from table as params
		let params =
			props.sm === undefined
				? {
						teknologi:
							tech[0] === "UNDEFINED"
								? ["FO", "RL", "VSAT_GS_SEWA_JASA", "VSAT_GS_BELANJA_MODAL"]
								: tech,
						// provinsi: tempProv,
				  }
				: {
						teknologi:
							props.tekno === "UNDEFINED"
								? ["FO", "RL", "VSAT_GS_SEWA_JASA", "VSAT_GS_BELANJA_MODAL"]
								: props.tekno,
						// provinsi: tempProv,
				  };
		return API.postInviteVendor(params)
			.then((res) => {
				///FILTER VENDOR
				// console.log("res dari invitevendor", res);
				let temp = {};
				Object.entries(res.data.values).forEach((datum) => {
					// console.log("datumnya nih", datum);
					temp[datum[0]] = datum[1].map((e, index) => {
						// console.log("eeeeee", e);
						return {
							no: index + 1,
							vendor: e.vendor_name,
							id: e.vendor_id,
							checked: (
								<CheckBox key={e.vendor_id} id={e.vendor_id} props={datum[0]} />
							),
							rekomendasi: false,
						};
					});
				});
				let tempFO = _.uniqBy(temp.FO, "id");
				let tempRL = _.uniqBy(temp.RL, "id");
				let tempVSATSJ = _.uniqBy(temp.VSAT_GS_SEWA_JASA, "id");
				let tempVSATBM = _.uniqBy(temp.VSAT_GS_BELANJA_MODAL, "id");
				temp = {
					FO: tempFO,
					RL: tempRL,
					VSAT_GS_SEWA_JASA: tempVSATSJ,
					VSAT_GS_BELANJA_MODAL: tempVSATBM,
				};
				setIsLoading(false);
				setDataInvitasi(temp);
			})
			.catch((e) => {
				alert(`Terjadi Kesalahan ${e}`);
			});
	}

	React.useEffect(() => {
		// setTimeout(() => {
		fetchAllVendor();
		// }, [200]);
	}, [dataRecommend, props.refresh, refresh]);

	const header = (props) => [
		{
			label: "No",
			field: "no",
			sort: "asc",
		},
		{
			label: "Nama Vendor",
			field: "vendor",
			sort: "asc",
			width: 300,
			attributes: {
				"aria-controls": "DataTable",
				"aria-label": "Name",
			},
		},
		{
			label: (
				<input
					type="checkbox"
					onChange={
						!isSelectAll[props]
							? () => handlePilihSemua(props)
							: () => handleHapusPilihSemua(props)
					}
					checked={isSelectAll[props]}
				/>
			),
			field: "checked",
			sort: "disabled",
		},
	];

	// console.log(isSelectAll);

	return (
		<>
			{isLoading ? (
				<Skeleton count={10} />
			) : (
				<>
					<span
						className="text-right text-danger d-flex justify-content-end col-12 mb-3"
						style={{ cursor: "pointer", fontSize: "14px" }}
						onClick={() => {
							localStorage.removeItem("dataInvitation");
							toggleRefresh();
						}}
					>
						Reset
					</span>
					{Object.entries(dataInvitasi).map((datum, index) => {
						if (_.isEmpty(datum[1])) return;
						return (
							<>
								<Accordion key={index}>
									<AccordionSummary
										expandIcon={
											<span className="mdi mdi-arrow-down-drop-circle" />
										}
									>
										<h4>Penyedia {datum[0].replaceAll("_", " ")}</h4>
									</AccordionSummary>
									<div style={{ margin: "12px 16px" }}>
										<MDBDataTable
											id="tableInvitation"
											className="text-center"
											responsive
											striped
											bordered
											displayEntries={false}
											info={false}
											searching={true}
											entries={10} //How much data that you want to show in 1 table
											disableRetreatAfterSorting //Show red Warning after use
											data={{ columns: header(datum[0]), rows: datum[1] }}
										/>
									</div>
								</Accordion>
							</>
						);
					})}
				</>
			)}
		</>
	);
}
