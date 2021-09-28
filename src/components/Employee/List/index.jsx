import React, { useEffect } from "react";
import { connect } from "react-redux";
import Filter from "./FilterEmployee";
import EmlpoyeeesLink from "./EmlpoyeeesLink";
import Page from "./Page";
import Loading from "../../../img/Loading.gif";
import {
  arrowFocusChange,
  showNextEmployees,
} from "../../..//redux/reducer/employeesReducer";

const Index = (props) => {
  useEffect(() => {
    props.showNextEmployees();
  }, [props.pageShown]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.focus, props.pageShown]);

  const selectEmployee = () => {
    props.history.push(`/employee/${props.focus}`);
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && props.focus) {
      selectEmployee();
    } else {
      props.arrowFocusChange(props.focus, e.keyCode);
    }
  }

  const employeesMapped = props.employeesDisplay.map((employee) => {
    return (
      <EmlpoyeeesLink
        selectEmployee={selectEmployee}
        key={employee.id}
        id={employee.id}
        job_titles={employee.job_titles}
        name={employee.name}
      />
    );
  });

  return (
    <div className="employees-list">
      <Filter />
      <ul>{employeesMapped}</ul>
      {props.loading && <img src={Loading} alt="Loading Content" />}
      <Page />
    </div>
  );
}

const mapStateToProps = (state) => ({
  employeesDisplay: state.employees.employeesDisplay,
  loading: state.employees.loading,
  focus: state.employees.focus,
  pageShown: state.employees.pageShown,
});

export default connect(mapStateToProps, {
  arrowFocusChange,
  showNextEmployees,
})(Index);
