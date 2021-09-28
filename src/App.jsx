import React, { useEffect } from "react";
import { connect } from "react-redux";
import Routes from "./routes";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getEmpoyees } from "./redux/reducer/employeesReducer";

function App (props) {

  useEffect(() => {
    gettingEmployees();
  });


  const gettingEmployees = async () => {
    const data = await props.getEmpoyees(props.APIPage, props.APIPeople);
    if (data.action.payload.length === 0) return console.log("finished!");
  };

  return (
    <Router>
      <div className="px-20">
        <Link to="/">
          <h1 className="text-center text-purple-700 text-4xl pt-10">Employees List</h1>
        </Link>
        <Routes />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  APIPeople: state.employees.APIPeople,
  APIPage: state.employees.APIPage,
  employeesFilter: state.employees.employeesFilter,
});

export default connect(mapStateToProps, { getEmpoyees })(App);
