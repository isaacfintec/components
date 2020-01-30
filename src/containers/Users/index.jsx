import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/Table';
import Loading from '../../components/Loading';

import UsersApi from '../../api/users';
import { encodeQueryData } from '../../helpers';
import { STATUS } from '../../components/Table/TableCellTypes';
import { havePermission } from '../../helpers/auth';

const headRows = [
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Estado',
    key: 'status',
    type: STATUS,
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
    key: 'fullName',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
    key: 'email',
  },
];

const Users = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(0);
  const [isLoading, setLoad] = useState(false);

  /**
   * @param {String} queryParams
   * fetch users
   */
  const fetchData = async (queryParams = '') => {
    setLoad(true);
    // eslint-disable-next-line
    const foundUsers = await UsersApi.index(queryParams);
    if (foundUsers) {
      setUsers([...users, ...foundUsers.users]);
      setTotalUsers(foundUsers.total);
    }
    setLoad(false);
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

  /**
   * go tu create url
   */
  const toCreate = () => {
    history.push('/users/create');
  };

  /**
   * go tu edit url
   */
  const toEdit = (event, id) => {
    history.push(`/users/${id}`);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line
  }, []);

  return (
    <>
      <Table
        title="Usuarios"
        data={users}
        count={totalUsers}
        headers={headRows}
        onAdd={toCreate}
        canAdd={havePermission('users', 'create')}
        onRowClick={toEdit}
        onChangeLimit={fetchPagination}
        onChangePage={fetchPagination}
        titleAdd="Agregar nuevo usuario"
      />
      { isLoading && <Loading /> }
    </>
  );
};

Users.propTypes = {
  history: PropTypes.object.isRequired,
};


export default Users;
