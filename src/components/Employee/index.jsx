import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../../img/Loading.gif";
import { Redirect } from "react-router-dom";
import {
  getEmployee,
  arrowFocusChange,
  enterOnEmployeeDisplay,
} from "../../redux/reducer/employeesReducer";

const Index = (props) => {

  useEffect(() => {
    props.getEmployee(props.match.params.id);
    document.addEventListener("keydown", handleKeyEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    }
  },[props.focus]);

  useEffect(() => {
    props.getEmployee(props.focus);
    props.history.push(`/employee/${props.focus}`);
  }, [props.focus]);

  const handleKeyEvent = (e) => {
    if (e.keyCode === 13) {
      props.enterOnEmployeeDisplay(props.focus);
      props.history.push(`/`);
    } else if (e.keyCode === 38 || e.keyCode === 40) {
      console.log('arrow key clicked');
      props.arrowFocusChange(
        props.focus,
        e.keyCode,
        1,
        props.employeesCount
      );
      console.log(props.focus);
    }
  };

  return props.loading || props.employee === null ? (
    <div className="flex justify-center py-4">
      <img src={Loading} alt="Loading Content" className="" />
    </div>
  ) : (
    <div>
      {props.focus ? null : <Redirect to="/" />}
      <h1 className="text-blue-600 text-xl text-center py-4">Employee Information</h1>
      <div className="grid grid-cols-3">
        <div></div>
        <div className="flex flex-col justify-center ">
          <div className="flex flex-row">
            <p className="text-black text-lg w-1/2">ID:</p>
            <p className="text-black text-lg w-1/2">{props.employee.id}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-black text-lg w-1/2">Name:</p>
            <p className="text-black text-lg w-1/2">{props.employee.name}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-black text-lg w-1/2">Title:</p>
            <p className="text-black text-lg w-1/2">{props.employee.job_titles}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-black text-lg w-1/2">Salary:</p>
            <p className="text-black text-lg w-1/2">{props.employee.employee_annual_salary}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-black text-lg w-1/2">Department:</p>
            <p className="text-black text-lg w-1/2">{props.employee.department}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  employee: state.employees.employee,
  loading: state.employees.loading,
  focus: state.employees.focus,
  employeesCount: state.employees.employeesCount,
  employeesFilterCount: state.employees.employeesFilterCount,
  iOfFirstEmployee: state.employees.iOfFirstEmployee,
  iOfLastEmployee: state.employees.iOfLastEmployee,
});

export default connect(mapStateToProps, {
  getEmployee,
  arrowFocusChange,
  enterOnEmployeeDisplay,
})(Index);
