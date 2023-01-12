import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AddCustomer from './pages/AddCustomer';
import UserProfile from './components/Profile/UserProfile';
import CustomerManagement from './pages/CustomerManagement';
import OrderCustomerList from './pages/OrderCustomerList';
import CustomerUpdateList from './pages/CustomerUpdateList';
import CustomerUpdateForm from './pages/CustomerUpdateForm';
import ProductList from './pages/Products/ProductList';
import SuppliersList from './pages/Suppliers/SuppliersList';
import PurchaseRequisitionList from './pages/PurchaseRequisitionList';
import ProductStock from './pages/Products/ProductStock';
import Contacts from './pages/Contacts';
import UserProfilePage from './pages/UserProfilePage';
import AuthPage from './pages/AuthPage';
import DeliveryNoticeList from './pages/DeliveryNoticeList';
import DeliveryNoticeCreation from './pages/DeliveryNoticeCreation';
import AddOrder from './pages/AddOrder';
import Dashboard from './pages/Dashboard';
import AuthContext from './store/auth-context';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/dashboard' exact>
          <Dashboard />
        </Route>
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/addCustomer'>
          <AddCustomer />
        </Route>
        <Route path='/customerManagement'>
          <CustomerManagement />
        </Route>
        <Route path='/orderCustomerList'>
          <OrderCustomerList />
        </Route>
        <Route path='/customerUpdateList'>
          <CustomerUpdateList />
        </Route>
        <Route path='/customerUpdateForm'>
          <CustomerUpdateForm />
        </Route>
        <Route path='/productsList'>
          <ProductList />
        </Route>
        <Route path='/suppliers'>
          <SuppliersList />
        </Route>
        <Route path='/purchaseRequisitionList'>
          <PurchaseRequisitionList />
        </Route>
        <Route path='/productStock'>
          <ProductStock />
        </Route>
        <Route path='/contacts'>
          <Contacts/>
        </Route>
        <Route path='/userProfilePage'>
          <UserProfilePage/>
        </Route>
        <Route path='/deliveryNoticeList'>
          <DeliveryNoticeList/>
        </Route>
        <Route path='/createDeliveryNotice'>
          <DeliveryNoticeCreation/>
        </Route>
        <Route path='/placeOrder'>
            <AddOrder/>
        </Route>
        <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
