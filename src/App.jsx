class EmployeeSearch extends React.Component {
  render() {
    return (
      <div className="container mt-4">
        <h4>Search Employees</h4>
        <div className="input-group input-group-sm mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
          />
        </div>
      </div>
    );
  }
}

const graphQLFetch = async (query, variables = {}) => {
  const response = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
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
      error: null,
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
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  }

  render() {
    const { employeeList, loading, error } = this.state;

    if (loading) {
      return (
        <div className="container mt-4">
          <p>Loading ...</p>
        </div>
      );
    }

    if (error) {
      console.log("Error: ", error);
    }

    return (
      <div className="container mt-4">
        <h4>Employees Table</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Date of Joining</th>
                <th>Title</th>
                <th>Department</th>
                <th>Employee Type</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{index + 1}</td>
                  <td>{`${employee.FirstName} ${employee.LastName}`}</td>
                  <td>{employee.Age}</td>
                  <td>
                    {
                      new Date(employee.DateOfJoining)
                        .toISOString()
                        .split("T")[0]
                    }
                  </td>
                  <td>{employee.Title}</td>
                  <td>{employee.Department}</td>
                  <td>{employee.EmployeeType}</td>
                  <td>{employee.CurrentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
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
      employeeType: "",
      // Add more state variables for other input fields
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // You need to implement the GraphQL API call for creating an employee here
    // Use this.state to get the form data
    // Handle validation and display errors as needed
    console.log("Form submitted:", this.state);
  };

  render() {
    return (
      <div className="container mt-4">
        <h4>Create Employee</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter first name"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter last name"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter age"
                value={this.state.age}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="dateOfJoining">Date of Joining</label>
              <input
                type="date"
                className="form-control"
                id="dateOfJoining"
                value={this.state.dateOfJoining}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                placeholder="Enter department"
                value={this.state.department}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="employeeType">Employee Type</label>
              <input
                type="text"
                className="form-control"
                id="employeeType"
                placeholder="Enter employee type"
                value={this.state.employeeType}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#008eb0",
              color: "white",
            }}
            type="submit"
          >
            Create Employee
          </button>
        </form>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header
        style={{
          backgroundColor: "#008eb0",
          color: "white",
          padding: "15px",
          textAlign: "center",
        }}
      >
        <h1>Employee Management System</h1>
      </header>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          backgroundColor: "#008eb0",
          color: "white",
          padding: "15px 15px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        EMS &copy; {new Date().getFullYear()}
      </footer>
    );
  }
}

class EmployeeDirectory extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <EmployeeSearch />
        <EmployeeTable />
        <EmployeeCreate />
        <Footer />
      </div>
    );
  }
}

const element = React.createElement(EmployeeDirectory);
ReactDOM.render(element, document.getElementById("app"));
