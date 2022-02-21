import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";


const data = [
  {
    id: "380E1E27-D945-4881-9EE6-95691BE21EF0",
    element: "DatePicker",
    text: "Date",
    static: undefined,
    required: false,
    readOnly: false,
    defaultToday: false,
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    dateFormat: "MM/dd/yyyy",
    timeFormat: "hh:mm aa",
    showTimeSelect: false,
    showTimeSelectOnly: false,
    field_name: "date_picker_E11A01FD-8B58-4C5B-AB35-7C3039863848",
    label: "Placeholder Label"
  }
];
class DataTables extends Component {
  state = {
    fromContent: []
  };
  onLoad = () => {
    console.log(" Load From Data");
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  };
  onPost = data => {
    console.log("Post Data", data);
    this.setState({
      fromContent: data
    });
  };

  onSubmitData = () => {
    console.log("State", this.state.fromContent);
  };
  render() {
    return (
      <Fragment>
        <ReactFormBuilder onLoad={this.onLoad} onPost={this.onPost} />
        {/* <PrintButton
          id={"react-form-builder-preview pull-left"}
          label={"Print From"}
        /> */}
        {/* <Button onClick={this.onSubmitData}>Submit From</Button> */}
      </Fragment>
    );
  }
}

export default DataTables