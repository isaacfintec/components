/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '../../components/Table';
import './Payrolls.css';
import Loading from '../../components/Loading';
import ModalConfirm from '../../components/ModalConfirm';

import PayrollApi from '../../api/payrolls';
import s3Api from '../../api/s3';
import { encodeQueryData } from '../../helpers';

import { BUTTON_DOWNLOAD } from '../../components/Table/TableCellTypes';

const headRows = [
  {
    id: 'payrollNumber',
    numeric: false,
    disablePadding: true,
    label: 'NUMERO QUINCENA',
    key: 'payrollNumber',
  },
  {
    id: 'period',
    numeric: false,
    disablePadding: true,
    label: 'PERIODO',
    key: 'period',
  },
  {
    id: 'uploaded',
    numeric: false,
    disablePadding: true,
    label: 'SUBIDA',
    key: 's3UrlUpload',
    type: BUTTON_DOWNLOAD,
  },
  {
    id: 'process',
    numeric: false,
    disablePadding: true,
    label: 'PROCESADA',
    key: 's3UrlProcess',
    type: BUTTON_DOWNLOAD,
  },
];

const Payrolls = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [payrolls, setPayrolls] = useState([]);
  const [totalPayrolls, setTotalPayrolls] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(0);
  const [isLoading, setLoad] = useState(false);

  const processPayrolls = async (payrollsProcess) => {
    if (payrollsProcess) {
      payrollsProcess.forEach((payroll) => {
        payroll.period = `${payroll.payrollRange.start} - ${payroll.payrollRange.end}`;
      });
    }
    setPayrolls([...payrolls, ...payrollsProcess]);
  };

  const fetchPayrolls = async (queryParams) => {
    setLoad(true);
    const foundData = await PayrollApi.index(queryParams);
    if (foundData) {
      await processPayrolls(foundData.items);
      setTotalPayrolls(foundData.total);
    }
    setLoad(false);
  };

  const fetchData = async (queryParams = '') => {
    setLoad(true);
    await fetchPayrolls(queryParams);
    setLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const eventCell = async (value) => {
    if (value) {
      const response = await s3Api.getUrlFile(value);
      const link = document.createElement('a');
      link.href = response.url;
      link.setAttribute('target', '_blank');
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinue = () => {
    setOpen(false);
    history.push('/payrolls/upload');
  };

  const onAdd = () => {
    history.push('/payrolls/upload');
  };

  /**
   * @param {Number} page
   * @param {Number} limit
   * fetch paginated users and make a cache with progress
   */
  const fetchPagination = (page, limit) => {
    if (limit !== currentLimit) {
      setCurrentLimit(limit);
    }

    if (page > currentPage || limit !== currentLimit) {
      const queryParams = encodeQueryData({ page, limit });
      fetchData(queryParams, page);
      setCurrentPage(page);
    }
  };

  return (
    <Fragment>
      <ModalConfirm
        open={open}
        title="Deseas Editar esta nómina."
        text="Si usted continua, borrara la nómina anterior."
        textBtnContinue="Continuar"
        textBtnClose="Cerrar"
        handleClose={handleClose}
        handleContinue={handleContinue}
      />
      <Table
        title="Nóminas"
        data={payrolls}
        headers={headRows}
        eventCell={eventCell}
        count={totalPayrolls}
        onChangeLimit={fetchPagination}
        onChangePage={fetchPagination}
        onAdd={onAdd}
        titleAdd='Agregar otra nómina'
      />
      { isLoading && <Loading /> }
    </Fragment>
  );
};

Payrolls.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Payrolls;
