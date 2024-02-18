import React from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import EmployeeCreate from "./EmployeeCreate";
class EmployeeDirectory extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Employee Management System"), /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeTable, null), /*#__PURE__*/React.createElement(EmployeeCreate, null));
  }
}
export default EmployeeDirectory;