import { useState, useEffect, useContext } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';

import AuthContext from '../store/auth-context';


const Dashboard = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const [email, setEmail] = useState(localStorage.getItem('email'));

  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [orders, setOrders] = useState([]);
  const [customerReturns, setCustomerReturns] = useState([]);


  const logoutHandler = () => {
    authCtx.logout();
  }

  useEffect(() => {
    console.log(email)
    fetch('http://localhost:3060/getUser', {
      method: 'POST',
      body: JSON.stringify({
        email: email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((data) => {
        console.log(data[0].user_first_name)
        setUserFirstName(data[0].user_first_name);
        setUserLastName(data[0].user_last_name)
      })
  }, [userFirstName, userLastName])

  useEffect(() => {
    fetch('http://localhost:3060/getOrders')
      .then(res => res.json())
      .then((data) => {
        setOrders(data);
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3060/getCustomerReturns')
      .then(res => res.json())
      .then((data) => {
        setCustomerReturns(data);
      })
  }, [])

  const handlerToDeliveryNoticeCreation = (order) => {
    console.log(order);
    history.push({
      pathname: '/createDeliveryNotice',
      state: { order: order }
    })
  }

  const orderList = orders !== undefined && orders.map(order => {
    return (
      <tr onClick={(e) => handlerToDeliveryNoticeCreation(order, e)}>
        <td>{order.order_id}</td>
        <td>{order.order_type}</td>
        <td>{order.order_description}</td>
        <td>{order.order_due_date}</td>
        <td>{order.order_status}</td>
        <td>{order.transaction_type}</td>
        <td>{order.order_placement_date}</td>
        <td>{order.customer_id}</td>
      </tr>
    )
  })

  const returnsList = customerReturns !== undefined && customerReturns.map(customerReturn => {
    return (
      <tr>
        <td>{customerReturn.return_id}</td>
        <td>{customerReturn.return_item_title}</td>
        <td>{customerReturn.return_item_quantity}</td>
        <td>{customerReturn.return_type}</td>
        <td>{customerReturn.order_id}</td>
      </tr>
    )
  })


  return (
    <div>
      <div className="wrapper">
        {/* Preloader */}

        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-dark">
          {/* Left navbar links */}
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Navbar Search */}
            <li className="nav-item">
              <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                <i className="fas fa-search" />
              </a>
              <div className="navbar-search-block">
                <form className="form-inline">
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search" />
                      </button>
                      <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            {/* Messages Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-comments" />
                <span className="badge badge-danger navbar-badge">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href="#" className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img src="dist/img/user2-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                      </h3>
                      <p className="text-sm">Call me whenever you can...</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        John Pierce
                        <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                      </h3>
                      <p className="text-sm">I got your message bro</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Nora Silvester
                        <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                      </h3>
                      <p className="text-sm">The subject goes here</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
              </div>
            </li>
            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-envelope mr-2" /> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-users mr-2" /> 8 friend requests
                  <span className="float-right text-muted text-sm">12 hours</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-file mr-2" /> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
          </ul>
        </nav>
        {/* /.navbar */}
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="/dashboard" className="brand-link">
            <img src="dist/img/skylight-logo-modified.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light">Skylight</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
              </div>
              <div className="info">
                <a href="#" className="d-block">{userFirstName} {userLastName}</a>
              </div>
            </div>
            {/* SidebarSearch Form */}
            <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
                <li className="nav-item">
                  <Link to='/dashboard' className="nav-link">
                    <i className="nav-icon fas fa-home" />
                    <p>
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/deliveryNoticeList' className="nav-link">
                    <i className="nav-icon fas fa-copy" />
                    <p>
                      Delivery Notice List
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/purchaseRequisitionList' className="nav-link">
                    <i className="nav-icon fas fa-list" />
                    <p>
                      Purchase Req List
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/userProfilePage' className="nav-link">
                    <i className="nav-icon fas fa-user" />
                    <p>
                      User Profile
                    </p>
                  </Link>
                </li>
                <li className="nav-item" onClick={logoutHandler}>
                  <Link to='/' className="nav-link">
                    <i className="nav-icon fas fa-sign-out-alt" />
                    <p>
                      Logout
                    </p>
                  </Link>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              {/* Info boxes */}
              <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                  <Link to='/customerManagement'>
                    <div className="info-box">
                      <span className="info-box-icon bg-info elevation-1"><i className="fas fa-users" /></span>
                      <div className="info-box-content">
                        <span className="info-box-text">Customer Management</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                  </Link>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                  <Link to='/orderCustomerList'>
                    <div className="info-box mb-3">
                      <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-clipboard-list" /></span>
                      <div className="info-box-content">
                        <span className="info-box-text">Place Orders</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                  </Link>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                {/* fix for small devices only */}
                <div className="clearfix hidden-md-up" />
                <div className="col-12 col-sm-6 col-md-3">
                  <Link to='/productsList'>
                    <div className="info-box mb-3">
                      <span className="info-box-icon bg-success elevation-1"><i className="fas fa-boxes" /></span>
                      <div className="info-box-content">
                        <span className="info-box-text">Products List</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                  </Link>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                  <Link to='/suppliers'>
                    <div className="info-box mb-3">
                      <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-truck" /></span>
                      <div className="info-box-content">
                        <span className="info-box-text">Suppliers</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                  </Link>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Monthly Recap Report</h5>
                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                          <i className="fas fa-minus" />
                        </button>
                        <div className="btn-group">
                          <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                            <i className="fas fa-wrench" />
                          </button>
                          <div className="dropdown-menu dropdown-menu-right" role="menu">
                            <a href="#" className="dropdown-item">Action</a>
                            <a href="#" className="dropdown-item">Another action</a>
                            <a href="#" className="dropdown-item">Something else here</a>
                            <a className="dropdown-divider" />
                            <a href="#" className="dropdown-item">Separated link</a>
                          </div>
                        </div>
                        <button type="button" className="btn btn-tool" data-card-widget="remove">
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8">
                          <p className="text-center">
                            <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                          </p>
                          <div className="chart">
                            {/* Sales Chart Canvas */}
                            <canvas id="salesChart" height={180} style={{ height: '180px' }} />
                          </div>
                          {/* /.chart-responsive */}
                        </div>
                        {/* /.col */}
                        {/* /.col */}
                      </div>
                      {/* /.row */}
                    </div>
                    {/* ./card-body */}
                    <div className="card-footer">
                      <div className="row">
                        <div className="col-sm-3 col-6">
                          <div className="description-block border-right">
                            <span className="description-percentage text-success"><i className="fas fa-caret-up" /> 17%</span>
                            <h5 className="description-header">$35,210.43</h5>
                            <span className="description-text">TOTAL REVENUE</span>
                          </div>
                          {/* /.description-block */}
                        </div>
                        {/* /.col */}
                        <div className="col-sm-3 col-6">
                          <div className="description-block border-right">
                            <span className="description-percentage text-warning"><i className="fas fa-caret-left" /> 0%</span>
                            <h5 className="description-header">$10,390.90</h5>
                            <span className="description-text">TOTAL COST</span>
                          </div>
                          {/* /.description-block */}
                        </div>
                        {/* /.col */}
                        <div className="col-sm-3 col-6">
                          <div className="description-block border-right">
                            <span className="description-percentage text-success"><i className="fas fa-caret-up" /> 20%</span>
                            <h5 className="description-header">$24,813.53</h5>
                            <span className="description-text">TOTAL PROFIT</span>
                          </div>
                          {/* /.description-block */}
                        </div>
                        {/* /.col */}
                        <div className="col-sm-3 col-6">
                          <div className="description-block">
                            <span className="description-percentage text-danger"><i className="fas fa-caret-down" /> 18%</span>
                            <h5 className="description-header">1200</h5>
                            <span className="description-text">GOAL COMPLETIONS</span>
                          </div>
                          {/* /.description-block */}
                        </div>
                      </div>
                      {/* /.row */}
                    </div>
                    {/* /.card-footer */}
                  </div>
                  {/* /.card */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
              {/* Main row */}
              <div className="row">
                {/* Left col */}
                <div className="col-md-8">
                  <div className="row">
                  </div>
                  {/* /.row */}
                  {/* TABLE: LATEST ORDERS */}

                  <div className="card">
                    <div className="card-header border-transparent">
                      <h3 className="card-title">Latest Orders</h3>
                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                          <i className="fas fa-minus" />
                        </button>
                        <button type="button" className="btn btn-tool" data-card-widget="remove">
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table m-0">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Type</th>
                              <th>Description</th>
                              <th>Due Date</th>
                              <th>Status</th>
                              <th>Transaction Type</th>
                              <th>Placement Date</th>
                              <th>Customer ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderList}
                          </tbody>
                        </table>
                      </div>
                      {/* /.table-responsive */}
                    </div>
                  </div>
                  {/* /.card */}
                </div>
                {/* /.col */}
                <div className="col-md-4">
                  {/* Info Boxes Style 2 */}
                  {/* /.info-box */}
                  {/* /.info-box */}
                  {/* PRODUCT LIST */}
                  <div className="card">
                    <div className="card-header border-transparent">
                      <h3 className="card-title">Customer Returns</h3>
                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                          <i className="fas fa-minus" />
                        </button>
                        <button type="button" className="btn btn-tool" data-card-widget="remove">
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table m-0">
                          <thead>
                            <tr>
                              <th>Return ID</th>
                              <th>Item</th>
                              <th>Quantity</th>
                              <th>Type</th>
                              <th>Order ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {returnsList}
                          </tbody>
                        </table>
                      </div>
                      {/* /.table-responsive */}
                    </div>
                  </div>
                  {/* /.card */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}



            </div>{/*/. container-fluid */}
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>
        {/* /.control-sidebar */}
        {/* Main Footer */}
        <footer className="main-footer">
          <strong><a href="https://adminlte.io">Skylight IT Solutions Inc.</a>.</strong>
          <div className="float-right d-none d-sm-inline-block">
          </div>
        </footer>
      </div >
    </div >
  );
};

export default Dashboard;
