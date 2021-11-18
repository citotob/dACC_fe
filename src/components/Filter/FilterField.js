import React, { Component } from "react";
import Select from "react-dropdown-select";
import styled from "styled-components";

//  styled component
const StyledSelect = styled(Select)`
	width: 100%;
	background: #073030;
	border: #073030 !important;
	color: #fff;
	.react-dropdown-select-clear,
	.react-dropdown-select-dropdown-handle {
		color: #fff;
	}
	.css-v1jrxw-ContentComponent {
		width: max-content;
		display: center;
		justify-content: center;
	}
	span.react-dropdown-select-item.react-dropdown-select-item-selected.css-148o527-ItemComponent.evc32pp0 {
		background: blue;
	}
	.react-dropdown-select-option {
		border: 1px solid #fff;
	}
	.react-dropdown-select-item {
		color: #073030;
	}
	.react-dropdown-select-input {
		color: #fff;
	}
	.react-dropdown-select-dropdown {
		position: absolute;
		left: -160%;
		border: none;
		width: max-content;
		padding: 0;
		display: flex;
		flex-direction: row;
		border-radius: 2px;
		max-height: 50px;
		overflow: auto;
		z-index: 9;
		background: #073030;
		box-shadow: none;
		color: #fff !important;
	}
	.react-dropdown-select-item {
		color: #f2f2f2;
		border-bottom: 1px solid #073030;

		:hover {
			color: #ffffff80;
		}
	}
	.react-dropdown-select-item.react-dropdown-select-item-selected,
	.react-dropdown-select-item.react-dropdown-select-item-active {
		border-bottom: 1px solid #073030;
		color: #fff;
		font-weight: bold;
	}
	.react-dropdown-select-item.react-dropdown-select-item-disabled {
		background: #777;
		color: #ccc;
	}
`;
const StyledInput = styled.input`
	width: 100%;
	border: none;
	background-color: #f2f1f9;
	padding: 0.5rem;
`;
const FieldDiv = styled.div`
  display: flex;
  justify-content space-between;
  align-items: center;
  background-color: white;
  margin: 0.25rem 0rem;
  height: 3rem;
  width: 100%;
  border: 1px solid #6B6B6B;
  border-radius: 5px;
  animation: fade-in-right 0.5s`;
const DataDiv = styled.div`
	width: 40%;
	margin-right: 1rem;
	padding: 0.5rem;
`;
const OperatorDiv = styled.div`
	width: 3rem;
`;
const QuerydDiv = styled.div`
	margin-left: 1rem;
	width: 45%;
`;

//  init constant
const operateType = [
	{ label: "=", value: "=" },
	{ label: "<", value: "<" },
	{ label: ">", value: ">" },
	{ label: ">=", value: ">=" },
	{ label: "<=", value: "<=" },
];

// react class component
class FilterField extends Component {
	constructor(props) {
		super();
		this.state = {
			searchTerm: "",
			operator: "=",
		};
	}

	handleChange = (event) => {
		this.setState({
			searchTerm: event.target.value,
		});
	};

	render() {
		return (
			<FieldDiv>
				<DataDiv>
					<span>{this.props.data}</span>
				</DataDiv>
				<OperatorDiv>
					<StyledSelect
						options={operateType}
						dropdownHandle={false}
						values={[{ label: "=", value: "=" }]}
						searchable={false}
						onChange={(values) => console.log(values)}
						dropdownPosition={"top"}
						dropdownGap={5}
					/>
				</OperatorDiv>
				<QuerydDiv>
					<StyledInput
						type="text"
						value={this.searchTerm}
						onChange={this.handleChange}
						placeholder={". . ."}
						style={{ backgroundColor: "white" }}
					/>
				</QuerydDiv>
			</FieldDiv>
		);
	}
}

export default FilterField;
