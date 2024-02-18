class EmployeeSearch extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container mt-4"
    }, /*#__PURE__*/React.createElement("h4", null, "Search Employees"), /*#__PURE__*/React.createElement("div", {
      className: "input-group input-group-sm mx-auto"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Search by name"
    })));
  }
}
const graphQLFetch = async (query, variables = {}) => {
  const response = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }
  return data.data;
};
class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: [],
      loading: true,
      error: null
    };
  }
  async componentDidMount() {
    try {
      const query = `
        query {
          employeeList {
            _id
            FirstName
            LastName
            Age
            DateOfJoining
            Title
            Department
            EmployeeType
            CurrentStatus
          }
        }
      `;
      const data = await graphQLFetch(query);
      this.setState({
        employeeList: data.employeeList,
        loading: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message
      });
    }
  }
  render() {
    const {
      employeeList,
      loading,
      error
    } = this.state;
    if (loading) {
      return /*#__PURE__*/React.createElement("div", {
        className: "container mt-4"
      }, /*#__PURE__*/React.createElement("p", null, "Loading ..."));
    }
    if (error) {
      console.log("Error: ", error);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "container mt-4"
    }, /*#__PURE__*/React.createElement("h4", null, "Employees Table"), /*#__PURE__*/React.createElement("div", {
      className: "table-responsive"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-bordered"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, employeeList.map((employee, index) => /*#__PURE__*/React.createElement("tr", {
      key: employee._id
    }, /*#__PURE__*/React.createElement("td", null, index + 1), /*#__PURE__*/React.createElement("td", null, `${employee.FirstName} ${employee.LastName}`), /*#__PURE__*/React.createElement("td", null, employee.Age), /*#__PURE__*/React.createElement("td", null, new Date(employee.DateOfJoining).toISOString().split("T")[0]), /*#__PURE__*/React.createElement("td", null, employee.Title), /*#__PURE__*/React.createElement("td", null, employee.Department), /*#__PURE__*/React.createElement("td", null, employee.EmployeeType), /*#__PURE__*/React.createElement("td", null, employee.CurrentStatus)))))));
  }
}
class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      dateOfJoining: "",
      title: "",
      department: "",
      employeeType: ""
      // Add more state variables for other input fields
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    // You need to implement the GraphQL API call for creating an employee here
    // Use this.state to get the form data
    // Handle validation and display errors as needed
    console.log("Form submitted:", this.state);
  };
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container mt-4"
    }, /*#__PURE__*/React.createElement("h4", null, "Create Employee"), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6 mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "firstName"
    }, "First Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      id: "firstName",
      placeholder: "Enter first name",
      value: this.state.firstName,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6 mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "lastName"
    }, "Last Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      id: "lastName",
      placeholder: "Enter last name",
      value: this.state.lastName,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6 mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "form-control",
      id: "age",
      placeholder: "Enter age",
      value: this.state.age,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6 mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "dateOfJoining"
    }, "Date of Joining"), /*#__PURE__*/React.createElement("input", {
      type: "date",
      className: "form-control",
      id: "dateOfJoining",
      value: this.state.dateOfJoining,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6 mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "title"
    }, "Title"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      id: "title",
      placeholder: "Enter title",
      value: this.state.title,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6 mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "department"
    }, "Department"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      id: "department",
      placeholder: "Enter department",
      value: this.state.department,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6 mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "employeeType"
    }, "Employee Type"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      id: "employeeType",
      placeholder: "Enter employee type",
      value: this.state.employeeType,
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      style: {
        backgroundColor: "#008eb0",
        color: "white"
      },
      type: "submit"
    }, "Create Employee")));
  }
}
class Header extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        backgroundColor: "#008eb0",
        color: "white",
        padding: "15px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("h1", null, "Employee Management System"));
  }
}
class Footer extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        backgroundColor: "#008eb0",
        color: "white",
        padding: "15px 15px",
        textAlign: "center",
        marginTop: "20px"
      }
    }, "EMS \xA9 ", new Date().getFullYear());
  }
}
class EmployeeDirectory extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeTable, null), /*#__PURE__*/React.createElement(EmployeeCreate, null), /*#__PURE__*/React.createElement(Footer, null));
  }
}
const element = React.createElement(EmployeeDirectory);
ReactDOM.render(element, document.getElementById("app"));