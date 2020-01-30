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
import Provider from '../components/Provider';

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
const Init = () => {
  return (
    <div>
      <a href="/test/user">Go to test/user</a>
    </div>
  );
};
const TestRoutes = () => (
  <Switch>
    <Route exact path="/test" component={Init} />
    <Route exact path="/test/user" component={Provider} />
    <Route exact path="/test/tablefull" component={Products} />
  </Switch>
);
const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/test" component={TestRoutes} />
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
