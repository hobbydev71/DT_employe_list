import React, { useState } from "react";
import { connect } from "react-redux";
import { submitEmployeeInfo } from "../../redux/reducer/employeesReducer";

const Index = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [salaryString, setSalaryString] = useState(null);
  const [jobTitle, setJobTitle] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await this.props.submitEmployeeInfo({
      name: name,
      department: department,
      salary_string: salaryString,
      job_titles: jobTitle
    });
    this.props.history.push("/");
  };

  return (
    <div className="flex flex-col justify-center">
      <form className="w-full max-w-sm" onSubmit={handleFormSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Moldo"
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Name"
              required
            ></input>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-department">
              Department
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-department" type="text" value="FINANCE"
              onChange={(e) => setDepartment(e.target.value)}
              name="department"
              placeholder="Deparment"
              required
            ></input>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-salary">
              Salary
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-salary" value="100000"
              onChange={(e) => setSalaryString(e.target.value)}
              name="salary_string"
              type="number"
              placeholder="Annual Salary"
              step=".01"
              required
            ></input>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-job-title">
              Job
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-job-title" type="text" value="Full Stack Developer"
              onChange={(e) => setJobTitle(e.target.value)}
              name="job_titles"
              placeholder="Job Title"
              required
            ></input>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.employees.loading,
});
export default connect(mapStateToProps, { submitEmployeeInfo })(Index);
