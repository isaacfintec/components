/* eslint-disable import/no-named-as-default-member */
import React, { Fragment, useEffect, useState } from 'react';
import TabsPanel from './GeneralInfo/TabsPanel';
import GeneralInfo from './GeneralInfo';

import EmployeeApi from '../../../api/employees';
import Loading from '../../../components/Loading';

const CreditInfoEmployee = ({ history, match }) => {
  const { employeeId } = match.params;
  const [employee, setEmployee] = useState({
    delegation: {
      name: '',
    },
    availableAmount: '0',
    totalAmount: '0',
  });
  const [credit, setCredit] = useState({});
  const [amounts, setAmounts] = useState([]);
  const [historical, setHistorical] = useState([]);
  const [isLoading, setLoad] = useState(false);

  const fetchEmployee = async () => {
    setLoad(true);
    const foundData = await EmployeeApi.showWithCredits(employeeId);
    if (foundData) {
      setEmployee(foundData);
    }
    setLoad(false);
  };

  const fetchWaitingCredits = async () => {
    setLoad(true);
    const foundData = await EmployeeApi.waitingCredits(employeeId);
    if (foundData) {
      setAmounts(foundData);
    }
    setLoad(false);
  };

  const fetchCreditHistory = async () => {
    setLoad(true);
    const foundData = await EmployeeApi.creditHistory(employeeId);
    if (foundData) {
      setHistorical(foundData);
    }
    setLoad(false);
  };

  const fetchCredit = async () => {
    setLoad(true);
    const foundData = await EmployeeApi.credit(employeeId);
    if (foundData) {
      setCredit(foundData);
    }
    setLoad(false);
  };

  useEffect(() => {
    fetchEmployee();
    fetchWaitingCredits();
    fetchCreditHistory();
    fetchCredit();
  }, []);

  return (
    <Fragment>
      <GeneralInfo
        employee={employee}
        credit={credit}
        history={history} />
      <br />
      <TabsPanel
        amounts={amounts}
        historical={historical}
        history={history}
        employeeId={employeeId} />
      { isLoading && <Loading /> }
    </Fragment>
  );
};

export default CreditInfoEmployee;
