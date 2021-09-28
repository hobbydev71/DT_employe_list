import React from "react";
import { connect } from "react-redux";
import { changePage } from "../../../redux/reducer/employeesReducer";

const Page = (props) => {
  const pageNumbers = [];
  let pagesCount = props.employeesFilterCount
    ? Math.ceil(props.employeesFilterCount / props.peopleShown)
    : Math.ceil(props.employeesCount / props.peopleShown);

  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(i);
  }

  const checkVisibility = (condition, num) => {
    if (condition === "greater" && props.pageShown > num) {
      return "";
    } else if (
      condition === "less" &&
      props.pageShown + num <= pageNumbers.length
    ) {
      return "";
    }
    return "hidden";
  }

  return (
    <div>
      <ul className="flex justify-center">
        <li
          className={`p-2 mt-1 rounded-sm border-2 border-gray-300 ${checkVisibility("greater", 1)}`}
          onClick={() => props.changePage(1)}
        >
          1
        </li>
        <span className={`${checkVisibility("greater", 3)}`}>...</span>
        <li
          className={`p-2 mt-1 rounded-sm border-2 border-gray-300 ${checkVisibility("greater", 2)}`}
          onClick={() => props.changePage(props.pageShown - 1)}
        >
          {props.pageShown - 1}
        </li>
        <li className="p-2 mt-1 rounded-sm border-2 border-gray-300 bg-blue-500 text-white">{props.pageShown}</li>
        <li
          className={`p-2 mt-1 rounded-sm border-2 border-gray-300 ${checkVisibility("less", 2)}`}
          onClick={() => props.changePage(props.pageShown + 1)}
        >
          {props.pageShown + 1}
        </li>
        <span className={`${checkVisibility("less", 3)}`}>...</span>
        <li
          className={`p-2 mt-1 rounded-sm border-2 border-gray-300 ${checkVisibility("less", 1)}`}
          onClick={() => props.changePage(pageNumbers.length)}
        >
          {pageNumbers.length}
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  peopleShown: state.employees.peopleShown,
  employeesCount: state.employees.employeesCount,
  pageShown: state.employees.pageShown,
  employeesFilterCount: state.employees.employeesFilterCount,
});

export default connect(mapStateToProps, { changePage })(Page);
