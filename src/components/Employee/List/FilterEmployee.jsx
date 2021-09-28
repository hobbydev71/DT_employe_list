import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  handleFilterChange,
  clearFilter,
} from "../../..//redux/reducer/employeesReducer";

const Filter = (props) => {
  const [dropdownValue, setDropdownValue] = useState();
  
  const handleFilterChange = (e) => {
    setDropdownValue(e.target.value);
    props.handleFilterChange(e.target.value);
  }

  const handleClearBTN = () => {
    setDropdownValue("");
    props.clearFilter();
  }

  return (
    <div className="flex flex-row items-center">
      <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={dropdownValue}
        defaultValue=""
        onChange={handleFilterChange}
        name="department"
      >
        <option value="" disabled>
          -- Filter Job --
        </option>
        {props.departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      <Link to="/employee-form">
        <button className="w-40 bg-transparent hover:bg-blue-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border mx-2 border-blue-500 hover:border-transparent rounded">
          New Employee
        </button>
      </Link>
      <button onClick={handleClearBTN} className="w-40">Clear</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  departments: state.employees.departments,
  department: state.employees.department,
});

export default connect(mapStateToProps, { handleFilterChange, clearFilter })(
  Filter
);
