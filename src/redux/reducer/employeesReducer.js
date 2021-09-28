
const ACTION_GET_EMPLOYEES = "ACTION_GET_EMPLOYEES";
const ACTION_BACKGROUND_GET_EMPLOYEES = "ACTION_BACKGROUND_GET_EMPLOYEES";
const ACTION_GET_EMPLOYEE = "ACTION_GET_EMPLOYEE";
const ACTION_POST_EMPLOYEE = "ACTION_POST_EMPLOYEE";
const ACTION_SHOW_NEXT_EMPLOYEES = "ACTION_SHOW_NEXT_EMPLOYEES";
const ACTION_CHANGE_PAGE_SHOWN = "ACTION_CHANGE_PAGE_SHOWN";
const ACTION_CLICK_CHANGE_FOCUS = "ACTION_CLICK_CHANGE_FOCUS";
const ACTION_ENTER_ON_EMPLOYEE_DISPLAY = "ACTION_ENTER_ON_EMPLOYEE_DISPLAY";
const ACTION_ARROW_UP_CHANGE_FOCUS = "ACTION_ARROW_UP_CHANGE_FOCUS";
const ACTION_ARROW_DOWN_CHANGE_FOCUS = "ACTION_ARROW_DOWN_CHANGE_FOCUS";
const ACTION_HANDLE_FILTER_CHANGE = "ACTION_HANDLE_FILTER_CHANGE";
const ACTION_HANDLE_FILTER_CLEAR = "ACTION_HANDLE_FILTER_CLEAR";
const ACTION_DO_NOTHING = "ACTION_DO_NOTHING";

const initialState = {
  employees: [],
  employeesFilter: [],
  employeesDisplay: [],
  departments: [],
  employeesCount: null,
  employeesFilterCount: null,
  employee: null,
  APIPeople: 300,
  APIPage: 1,
  peopleShown: 300,
  pageShown: 1,
  iOfLastEmployee: null,
  iOfFirstEmployee: null,
  focus: null,
  loading: true,
};

export const getEmpoyees = (APIPage, APIPeople) => {
  const data = fetch(
    `http://localhost:8000/?page=${APIPage}&per_page=${APIPeople}`
  ).then((blob) => blob.json());
  console.log('asdasdasd', APIPage);
  if (APIPage === 1) {
    return {
      type: ACTION_GET_EMPLOYEES,
      payload: data,
    };
  } else {
    return {
      type: ACTION_BACKGROUND_GET_EMPLOYEES,
      payload: data,
    };
  }
}

export const getEmployee = (focus) => {
  const data = fetch(
    `http://localhost:8000/${focus}`
  ).then((blob) => blob.json());

  return {
    type: ACTION_GET_EMPLOYEE,
    payload: data,
  };
}

export const submitEmployeeInfo = ({ name, department, salary_string, job_titles }) => {
  const employee_annual_salary = Number(salary_string).toFixed(2);
  const data = fetch('http://localhost:8000/', {
    method: "POST",
    headers: {
      // prettier-ignore
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      department,
      employee_annual_salary,
      job_titles,
    }),
  }).then((blob) => blob.json());

  return {
    type: ACTION_POST_EMPLOYEE,
    payload: data,
  };
}

export const showNextEmployees = () => {
  return {
    type: ACTION_SHOW_NEXT_EMPLOYEES,
    payload: null,
  };
}

export const changePage = (pageNum) => {
  return {
    type: ACTION_CHANGE_PAGE_SHOWN,
    payload: pageNum,
  };
}

export const clickFocusChange = (id) => {
  return {
    type: ACTION_CLICK_CHANGE_FOCUS,
    payload: id,
  };
}

export const enterOnEmployeeDisplay = (focus) => {
  return {
    type: ACTION_ENTER_ON_EMPLOYEE_DISPLAY,
    payload: focus,
  };
}

export const arrowFocusChange = (focus, keyCode) => {
  if (focus && keyCode === 38) {
    return {
      type: ACTION_ARROW_UP_CHANGE_FOCUS,
      payload: focus,
    };
  } else if (focus && keyCode === 40) {
    return {
      type: ACTION_ARROW_DOWN_CHANGE_FOCUS,
      payload: focus,
    };
  }
  return {
    type: ACTION_DO_NOTHING,
    payload: {},
  };
}

export const handleFilterChange = (department) => {
  if (department) {
    return {
      type: ACTION_HANDLE_FILTER_CHANGE,
      payload: department,
    };
  }
}

export const clearFilter = () => {
  return {
    type: ACTION_HANDLE_FILTER_CLEAR,
    payload: {},
  };
}

const reduceDepartments = (employees, currentDepartments = []) => {
  return employees.reduce((accu, employee) => {
    if (!accu.includes(employee.department)) accu.push(employee.department);
    return accu;
  }, currentDepartments);
}

const filterByDepartments = (employees, department) => {
  return employees.reduce((accu, employee) => {
    if (employee.department === department) accu.push(employee);
    return accu;
  }, []);
}

const findFocusIndex = (
  employeesFilterCount,
  employeesFilter,
  employees,
  payload
) => {
  return employeesFilterCount
    ? employeesFilter.findIndex((employee) => employee.id === payload)
    : employees.findIndex((employee) => employee.id === payload);
}

export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case `${ACTION_GET_EMPLOYEES}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${ACTION_GET_EMPLOYEES}_FULFILLED`:
      let fullEmployees = [...state.employees, ...payload];
      let fullEmployeesLength = fullEmployees.length;
      const iOfLastEmployeeFirst = state.pageShown * state.peopleShown;
      const iOfFirstEmployeeFirst = iOfLastEmployeeFirst - state.peopleShown;
      const departmentsFirst = reduceDepartments(fullEmployees);

      return {
        ...state,
        employees: fullEmployees,
        employeesDisplay: fullEmployees,
        employeesCount: fullEmployeesLength,
        iOfLastEmployee: iOfLastEmployeeFirst,
        iOfFirstEmployee: iOfFirstEmployeeFirst,
        APIPage: state.APIPage + 1,
        departments: departmentsFirst,
        loading: false,
      };

    case `${ACTION_GET_EMPLOYEES}_REJECTED`:
      console.error(payload);
      return {
        ...state,
        loading: false,
      };

    case `${ACTION_BACKGROUND_GET_EMPLOYEES}_FULFILLED`:
      let fullEmployeesBackground = [...state.employees, ...payload];
      let fullEmployeesLengthBackground = fullEmployeesBackground.length;
      let departments = reduceDepartments(payload, state.departments);

      if (payload.length === 0) {
        return { ...state };
      } else {
        return {
          ...state,
          employees: fullEmployeesBackground,
          employeesCount: fullEmployeesLengthBackground,
          departments,
          APIPage: state.APIPage + 1,
        };
      }

    case `${ACTION_BACKGROUND_GET_EMPLOYEES}_REJECTED`:
      console.error(payload);
      return {
        ...state,
        loading: false,
      };

    case `${ACTION_GET_EMPLOYEE}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${ACTION_GET_EMPLOYEE}_FULFILLED`:
      return {
        ...state,
        employee: payload,
        loading: false,
      };

    case `${ACTION_GET_EMPLOYEE}_REJECTED`:
      console.error(payload);
      return {
        ...state,
        loading: false,
      };

    case `${ACTION_POST_EMPLOYEE}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${ACTION_POST_EMPLOYEE}_FULFILLED`:
      return {
        ...state,
        employees: [...state.employees, payload],
        loading: false,
      };

    case `${ACTION_POST_EMPLOYEE}_REJECTED`:
      console.error(payload);
      return {
        ...state,
        loading: false,
      };

    case ACTION_SHOW_NEXT_EMPLOYEES:
      const iOfLastEmployee = state.pageShown * state.peopleShown;
      const iOfFirstEmployee = iOfLastEmployee - state.peopleShown;

      if (state.employeesFilterCount) {
        return {
          ...state,
          employeesDisplay: state.employeesFilter.slice(
            iOfFirstEmployee,
            iOfLastEmployee
          ),
          iOfLastEmployee,
          iOfFirstEmployee,
          loading: false,
        };
      }

      return {
        ...state,
        employeesDisplay: state.employees.slice(
          iOfFirstEmployee,
          iOfLastEmployee
        ),
        iOfLastEmployee,
        iOfFirstEmployee,
        loading: false,
      };

    case ACTION_CHANGE_PAGE_SHOWN:
      return {
        ...state,
        pageShown: payload,
      };

    case ACTION_CLICK_CHANGE_FOCUS:
      return {
        ...state,
        focus: payload,
      };

    case ACTION_ENTER_ON_EMPLOYEE_DISPLAY:
      const employeeIndex = findFocusIndex(
        state.employeesFilterCount,
        state.employeesFilter,
        state.employees,
        payload
      );
      const pageShown = Math.ceil((employeeIndex + 1) / 500);

      return {
        ...state,
        pageShown,
      };

    case ACTION_ARROW_UP_CHANGE_FOCUS:
      const indexUp = findFocusIndex(
        state.employeesFilterCount,
        state.employeesFilter,
        state.employees,
        payload
      );

      if (indexUp === 0) return { ...state };

      const idUp = state.employeesFilterCount
        ? state.employeesFilter[indexUp - 1].id
        : state.employees[indexUp - 1].id;

      return {
        ...state,
        focus: idUp,
      };

    case ACTION_ARROW_DOWN_CHANGE_FOCUS:
      const indexDown = findFocusIndex(
        state.employeesFilterCount,
        state.employeesFilter,
        state.employees,
        payload
      );

      if (
        indexDown === state.employeesCount - 1 ||
        indexDown === state.employeesFilterCount - 1
      )
        return { ...state };

      const idDown = state.employeesFilterCount
        ? state.employeesFilter[indexDown + 1].id
        : state.employees[indexDown + 1].id;

      return {
        ...state,
        focus: idDown,
      };

    case ACTION_HANDLE_FILTER_CLEAR:
      const iOfLastEmployeeFilterClear = 1 * state.peopleShown;
      const iOfFirstEmployeeFilterClear =
        iOfLastEmployeeFilterClear - state.peopleShown;

      return {
        ...state,
        employeesFilter: [],
        employeesFilterCount: null,
        employeesDisplay: state.employees.slice(
          iOfFirstEmployeeFilterClear,
          iOfLastEmployeeFilterClear
        ),
      };

    case ACTION_HANDLE_FILTER_CHANGE:
      const employeesFilter = filterByDepartments(state.employees, payload);
      const employeesFilterCount = employeesFilter.length;
      const iOfLastEmployeeFilter = 1 * state.peopleShown;
      const iOfFirstEmployeeFilter = iOfLastEmployeeFilter - state.peopleShown;

      return {
        ...state,
        employeesFilter,
        employeesFilterCount,
        employeesDisplay: employeesFilter.slice(
          iOfFirstEmployeeFilter,
          iOfLastEmployeeFilter
        ),
        iOfLastEmployeeFilter,
        iOfFirstEmployeeFilter,
        pageShown: 1,
      };

    default:
      return state;
  }
}
