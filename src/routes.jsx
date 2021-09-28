import React from "react";
import { Switch, Route } from "react-router-dom";
import Employee from "./components/Employee/";
import EmployeesList from "./components/Employee/List";
import EmployeeForm from "./components/Employee/Form";

export default function Routes(props) {
  return (
    <Switch>
      <Route path="/employee-form" component={EmployeeForm} />
      <Route path="/employee/:id" component={Employee} />
      <Route path="/" component={EmployeesList} />
    </Switch>
  );
}
