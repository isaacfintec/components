import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AppBar from '../components/AppBar';
import NotFound from '../components/NotFound';
import Tickets from '../containers/Tickets';
import TicketDetail from '../containers/TicketDetail';
import Groups from '../containers/Groups';
import LoginRoute from '../helpers/LoginRoute';
import PrivateRoute from '../helpers/PrivateRoute';
import PermissionRoute from '../helpers/PermissionRoute';
import Login from '../containers/Login';
import Panel from '../containers/Panel';
import Helpme from '../containers/Helpme';
import Users from '../containers/Users';
import UsersCreate from '../containers/Users/UsersCreate';
import UsersEdit from '../containers/Users/UsersEdit';
import Payrolls from '../containers/Payrolls';
import PayrollsUpload from '../containers/Payrolls/PayrollsUpload';
import Liquid from '../containers/Liquids';
import InfoEmployee from '../containers/Liquids/InfoEmployee';
import ReservLiquid from '../containers/Liquids/Reserv';
import { isAuth, getAuthUser } from '../helpers/auth';
import options from './options';
import SimulateLiquid from '../containers/Liquids/InfoEmployee/GeneralInfo/Simulate';
import Documents from '../containers/Documents';
import DocumentsUpload from '../containers/Documents/Upload';
import Credits from '../containers/Credits';
import CreditInfoEmployee from '../containers/Credits/CreditInfoEmployee';
import CreditDetail from '../containers/Credits/CreditInfoEmployee/CreditDetail';
import Products from '../containers/Products';
import Tables from '../components/Tables';
import {
  AMORTIZATION_TABLE,
  CHECKBOX_TABLE,
  RADIOBUTTON_TABLE,
} from '../components/Tables/tableTypes';

const history = createBrowserHistory();
const authUserName = isAuth() ? getAuthUser().fullName : '';

const TicketRoutes = () => (
  <AppBar title="Tickets" options={options.tickets} username={authUserName}>
    <Switch>
      <Route exact path="/tickets/groups" component={Groups} />
      <Route exact path="/tickets/groups/:groupId" component={Groups} />
      <Route exact path="/tickets" component={Tickets} />
      <Route exact path="/tickets/:ticketId" component={TicketDetail}/>
    </Switch>
  </AppBar>
);

const UsersRoutes = () => (
  <AppBar title="Users" options={options.users} username={authUserName}>
    <Switch>
      <PermissionRoute exact module="users" permission="create" path="/users/create" component={UsersCreate} />
      <PermissionRoute exact module="users" permission="read" path="/users/:id" component={UsersEdit} />
      <PermissionRoute exact module="users" permission="read" path="/users" component={Users} />
    </Switch>
  </AppBar>
);

const PayrollRoutes = () => (
  <AppBar title="Nómina" options={options.payrolls} username={authUserName}>
    <Switch>
      <Route exact path="/payrolls" component={Payrolls} />
      <Route exact path="/payrolls/upload" component={PayrollsUpload} />
    </Switch>
  </AppBar>
);

const AdminLiquidRoutes = () => (
  <AppBar title="Administración de Líquidos" options={options.liquids} username={authUserName}>
    <Switch>
      <PermissionRoute exact module="liquids" permission="confirm" path="/liquids/reserv" component={ReservLiquid} />
      <PermissionRoute exact module="liquids" permission="holdOn" path="/liquids/simulate/:employeeId" component={SimulateLiquid} />
      <PermissionRoute exact module="liquids" permission="search" path="/liquids/:employeeId" component={InfoEmployee} />
      <PermissionRoute exact module="liquids" permission="search" path="/liquids" component={Liquid} />
    </Switch>
  </AppBar>
);

const DocumentsRoutes = () => (
  <AppBar title="Documentos" options={options.documents} username={authUserName}>
    <Switch>
      <Route exact path="/documents/:employeeId" component={DocumentsUpload} />
      <Route exact path="/documents" component={Documents} />
    </Switch>
  </AppBar>
);

const CreditsRoutes = () => (
  <AppBar title="Creditos" options={options.credits} username={authUserName}>
    <Switch>
      <Route exact path="/credits" component={Credits} />
      <Route exact path="/credits/:employeeId" component={CreditInfoEmployee} />
      <Route exact path="/credits/:employeeId/:creditId" component={CreditDetail} />
    </Switch>
  </AppBar>
);

const ProductsRoutes = () => (
  <Switch>
    <Route exact path="/products" component={Products} />
  </Switch>
);

const checkbox = [
  {job: 'Docente tipo A', dependency: '01-27-2020', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo B', dependency: 'Sec. Estatal 115', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo C', dependency: 'Sec. Estatal 116', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo D', dependency: 'Sec. Estatal 117', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo E', dependency: 'Sec. Estatal 118', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo F', dependency: 'Sec. Estatal 119', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo G', dependency: 'Sec. Estatal 120', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo H', dependency: 'Sec. Estatal 121', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo I', dependency: 'Sec. Estatal 122', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo J', dependency: 'Sec. Estatal 123', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo K', dependency: 'Sec. Estatal 124', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo L', dependency: 'Sec. Estatal 125', years: '12 años', capacity: 15900.00, available: 1500.30 },
  {job: 'Docente tipo M', dependency: 'Sec. Estatal 126', years: '12 años', capacity: 15900.00, available: 1500.30 },
];
const amortization = [
  {numberPayment: '1', date: '2020-01-27', capitalPayment: 9, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '2', date: '01-27-2020', capitalPayment: 9, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '3', date: '01-27-2020', capitalPayment: 9, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '4', date: '01-27-2020', capitalPayment: 9, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '5', date: '01-27-2020', capitalPayment: 9, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '6', date: '01-27-2020', capitalPayment: 9, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '7', date: '01-27-2020', capitalPayment: 9, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '8', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '8', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '10', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '11', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '12', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '13', date: '2020-01-27', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '14', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '15', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '16', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '17', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '18', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
  {numberPayment: '19', date: '01-27-2020', capitalPayment: 9.22, interest: 83.84, payment: 92.34, balance: 4447.32 },
];
const radiobutton = [
  { number: '2', period: '2da Quincena', startdate: '13/Enero/2020-27/Enero/2020' },
  { number: '3', period: '1ra Quincena', startdate: '13/Enero/2020-27/Enero/2020' },
  { number: '4', period: '4ta Quincena', startdate: '13/Enero/2020-27/Enero/2020' },
  { number: '5', period: '6ta Quincena', startdate: '13/Enero/2020-27/Enero/2020' },
  { number: '6', period: '7ma Quincena', startdate: '13/Enero/2020-27/Enero/2020' },
];

const TestTable = () => {
  return (
    <Tables
      type={AMORTIZATION_TABLE}
      data={amortization}
      maxWidth='100%'
      maxHeight='500px'
      onSelect={ (e) => console.log(e)}
      onChange={ (e) => console.log(e)}
      onCheck={ (e) => console.log(e)}
    />
  );
};


const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/test" component={TestTable} />
      <LoginRoute exact path="/" component={Login} />
      <LoginRoute path="/login" component={Login} />
      <PrivateRoute path="/panel" component={Panel} />
      <PrivateRoute path="/helpme" component={Helpme} />
      <PrivateRoute path="/tickets" component={TicketRoutes} />
      <PrivateRoute path="/users" component={UsersRoutes} />
      <PrivateRoute path="/payrolls" component={PayrollRoutes} />
      <PrivateRoute path="/liquids" component={AdminLiquidRoutes} />
      <PrivateRoute path="/documents" component={DocumentsRoutes} />
      <PrivateRoute path="/credits" component={CreditsRoutes} />
      <PrivateRoute path="/products" component={ProductsRoutes} />
      <PrivateRoute component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
