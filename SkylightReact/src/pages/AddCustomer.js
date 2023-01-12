import { useState, useRef, useContext, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

const AddCustomer = () => {

    const authCtx = useContext(AuthContext);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const customerBillingRef = useRef();
    const customerShippingRef = useRef();
    const returnsAddressRef = useRef();
    const tradingNameRef = useRef();
    const phoneRef = useRef();

    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');

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

    const customerRegistrationHandler = (event) => {
        event.preventDefault();

        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const customerBilling = customerBillingRef.current.value;
        const customerShipping = customerShippingRef.current.value;
        const returnsAddress = returnsAddressRef.current.value;
        const tradingName = tradingNameRef.current.value;
        const phone = phoneRef.current.value;

        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(customerBilling);
        console.log(customerShipping);
        console.log(returnsAddress);
        console.log(tradingName);
        console.log(phone);

        fetch('http://localhost:3060/addCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                customerBillingAddress: customerBilling,
                customerShippingAddress: customerShipping,
                returnsCollectionAddress: returnsAddress,
                customerTradingName: tradingName,
                phone: phone
            }),

        })
            .then((res) => {
                if (res.ok) {
                    alert("Customer Registered!");
                } else {
                    alert("Server Error");
                }
            })
    }


    return (
        <div>
            <div className="wrapper">
                {/* Preloader */}

                {/* Navbar */}
                <nav className="main-header navbar navbar-expand navbar-dark">
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="/dashboard" className="nav-link">Dashboard</a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="nav-link">Contacts</a>
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
                                        <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
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
                                    <Link to="/dashboard" className="nav-link">
                                        <i className="nav-icon fas fa-home" />
                                        <p>
                                            Dashboard
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Delivery Notice List
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        <i className="nav-icon fas fa-list" />
                                        <p>
                                            Purchase Req. List
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        <i className="nav-icon fas fa-user" />
                                        <p>
                                            User Profile
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item" onClick={logoutHandler}>
                                    <Link to="/" className="nav-link">
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
                                    <h1 className="m-0">Register Customer</h1>
                                </div>{/* /.col */}
                                <div className="col-sm-6">
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                        <div className="card card-primary">
                            {/* /.card-header */}
                            {/* form start */}
                            <form onSubmit={customerRegistrationHandler}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="First Name" required ref={firstNameRef} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="Last Name" required ref={lastNameRef} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input type="text" className="form-control" id="email" placeholder="Email" required ref={emailRef} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="billingAddress">Billing Address</label>
                                        <input type="text" className="form-control" id="billingAddress" placeholder="Billing Address" required ref={customerBillingRef} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="shippingAddress">Shipping Address</label>
                                        <input type="emtextail" className="form-control" id="shippingAddress" placeholder="Shipping Address" required ref={customerShippingRef} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="returnsCollectionAddress">Returns Collection Address</label>
                                        <input type="text" className="form-control" id="returnsCollectionAddress" placeholder="Returns Collection Address" required ref={returnsAddressRef} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="customerTradingName">Customer Trading Name</label>
                                        <input type="text" className="form-control" id="customerTradingName" placeholder="Trading Name (if Business)" ref={tradingNameRef} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" className="form-control" id="phone" placeholder="Phone" ref={phoneRef} />
                                    </div>
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>

                        </div>
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
            </div>
        </div>
    );
};

export default AddCustomer;
