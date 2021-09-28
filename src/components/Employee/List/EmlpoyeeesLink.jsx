import React from "react";
import { connect } from "react-redux";
import { clickFocusChange } from "../../../redux/reducer/employeesReducer";

const EmlpoyeeesLink = (props) => {
  return (
    <li
      onClick={() => props.clickFocusChange(props.id)}
      onDoubleClick={() => props.selectEmployee()}
      id={props.id}
      className={
        props.focus === props.id
          ? "text-blue-400 text-lg cursor-pointer py-1 ml-2"
          : "text-black text-lg cursor-pointer py-1 ml-2"
      }
    >
      Title: {props.job_titles},    Name: {props.name}
    </li>
  );
}

const mapStateToProps = (state) => ({
  focus: state.employees.focus,
});

export default connect(mapStateToProps, {
  clickFocusChange,
})(EmlpoyeeesLink);
