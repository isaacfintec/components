/* eslint-disable import/no-named-as-default-member */
import React, { Fragment, useEffect, useState } from 'react';
import './InfoEmployee.css';
import TabsPanel from './GeneralInfo/TabsPanel';
import GeneralInfo from './GeneralInfo';
import EmployeeApi from '../../../api/employees';
import FlowApi from '../../../api/flows';
import Loading from '../../../components/Loading';
import ModalUploadFiles from '../../../components/ModalUploadFiles';

const HTTPCODE_PRECONDITION_REQUIRED = 428;

const InfoEmployee = ({ history, match }) => {
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
  const [flow, setFlow] = useState({
    documents: [],
  });
  const [isLoading, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [holdOnDocuments, setHoldOnDocuments] = useState('');

  const fetchFlow = async (flowId) => {
    const foundData = await FlowApi.show(flowId);
    if (foundData) {
      setFlow(foundData);
      setOpen(true);
    }
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

  const fetchEmployee = async () => {
    setLoad(true);
    try {
      const foundData = await EmployeeApi.show(employeeId);
      setEmployee(foundData);
      fetchWaitingCredits();
      fetchCreditHistory();
      fetchCredit();
    }
    catch (e) {
      const { response: { status, data } } = e;
      if (status === HTTPCODE_PRECONDITION_REQUIRED) fetchFlow(data.flow);
    }
    finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleOnPostExecute = (batchId) => {
    setHoldOnDocuments(batchId);
    fetchEmployee();
    setOpen(false);
  };

  return (
    <Fragment>
      <ModalUploadFiles
        open={open}
        title='Faltan de subir los siguientes archivos.'
        flow={flow}
        employeeId={employeeId}
        handleOnPostExecute={handleOnPostExecute} />
      <GeneralInfo
        employee={employee}
        credit={credit}
        history={history}
        holdOnDocuments={holdOnDocuments} />
      <br />
      <TabsPanel
        amounts={amounts}
        historical={historical}
        history={history} />
      { isLoading && <Loading /> }
    </Fragment>
  );
};

export default InfoEmployee;
