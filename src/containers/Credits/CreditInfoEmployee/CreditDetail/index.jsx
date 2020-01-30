/* eslint-disable import/no-named-as-default-member */
import React, { Fragment, useState, useEffect } from 'react';
import Info from './Info';
import TabsPanel from './TabsPanel';
import BackButton from '../../../../components/BackButton';
import CreditApi from '../../../../api/credits';
import Loading from '../../../../components/Loading';

const CreditDetail = ({ history, match }) => {
  const { creditId, employeeId } = match.params;
  const [credit, setCredit] = useState({});
  const [isLoading, setLoad] = useState(false);

  const fetchCredit = async () => {
    setLoad(true);
    const foundData = await CreditApi.show(creditId);
    if (foundData) {
      const newCredit = {
        product: foundData.comertialHouseProduct.name,
        term: foundData.period,
        amount: foundData.amount,
        amountPayable: foundData.amount,
        liquid: foundData.amount,
        startDate: foundData.createdAt,
      };
      setCredit(newCredit);
    }
    setLoad(false);
  };

  const handleBack = () => {
    history.push(`/credits/${employeeId}`);
  };

  useEffect(() => {
    fetchCredit();
  }, []);

  return (
    <Fragment>
      <BackButton handleBack={handleBack}/>
      { isLoading && <Loading /> }
      <Info history={history} credit={credit} />
      <br />
      <TabsPanel />
    </Fragment>
  );
};

export default CreditDetail;
