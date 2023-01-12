import { useState, useContext, useEffect, useRef } from 'react';
import { NavLink, Link, useHistory, useLocation } from 'react-router-dom';

import AuthContext from '../store/auth-context';


const AddOrder = () => {

    const orderTypeRef = useRef();
    const orderDescRef = useRef();
    const dueDateRef = useRef();
    const transactionTypeRef = useRef();
    const placementDateRef = useRef();
    const discountRef = useRef();
    const customerIdRef = useRef();

    const [email, setEmail] = useState(localStorage.getItem('email'));
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');

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

    const [products, setProducts] = useState([]);
    const [user_id, setUser_id] = useState();


    //AddProduct Variables:
    let [saveProduct, setSaveProduct] = useState();
    let [saveProductList, setSaveProductList] = useState([]);


    const [customer_id, setCustomerID] = useState();

    const logoutHandler = () => {
        authCtx.logout();
    }

    const location = useLocation();

    //getting products list from server
    useEffect(() => {
        fetch('http://localhost:3060/getProducts')
            .then(res => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, [])


    //getting User from local Storage
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
                console.log(data[0].user_id)
                setUser_id(data[0].user_id)
            })
    }, [user_id])

    //getting Customer from history Location (React Router)
    useEffect(() => {
        console.log(location.state.customer);
        setCustomerID(location.state.customer.customer_id)
    }, [location]);


    //Function Adding Product to Selected Products List
    const addProduct = (product) => {
        //let id_Check = true;
        console.log(product);
        let tempSaveProductList = saveProductList;


        let tempSaveProduct = {
            prod_id: product.item_id,
            product: product,
            quantity: 1
        }
        console.log(tempSaveProduct);
        setSaveProduct(tempSaveProduct);
        console.log(saveProduct);
        if (saveProduct !== undefined) {
            if (saveProductList.length === 0) {
                console.log("1st If ")
                tempSaveProductList.push(saveProduct);
                setSaveProductList(tempSaveProductList);

            } else {
                let id_Check = true;
                for (const [key, value] of Object.entries(saveProductList)) {
                    if (value.prod_id === product.item_id) {
                        console.log("2nd If inside for loop ")
                        value.quantity++;
                        break;
                    }
                    id_Check = false;
                }
                if (id_Check === false) {
                    console.log("3rd if, id_Check has been false")
                    tempSaveProductList.push(saveProduct);
                    setSaveProductList(tempSaveProductList);
                }
            }
        }

        // if (saveProductList.includes(saveProduct)) {
        //     let i = saveProductList.indexOf(saveProduct);
        //     saveProductList[i].quantity++;

        // } else {
        //     tempSaveProductList.push(saveProduct);
        //     setSaveProductList(tempSaveProductList);
        // }


        // if (saveProduct !== undefined) {
        //     if (tempSaveProductList.length === 0) {
        //         tempSaveProductList.push(saveProduct);
        //         console.log("Product Added" + tempSaveProductList);
        //         setSaveProductList(tempSaveProductList); 
        //     }
        //     for(let i = 0; i < tempSaveProductList.length; i++) {
        //         console.log("Nice!")
        //         if (tempSaveProductList[i].prod_id === product.item_id) {
        //             tempSaveProductList[i].quantity++;
        //             console.log("Quantity Updated" + tempSaveProductList[i].quantity);
        //             console.log("List" + tempSaveProductList);
        //             setSaveProductList(tempSaveProductList);
        //             break;
        //         }
        //     }
        // }else{
        //     console.log('UNDEFINED!')
        // }

        // if (saveProduct !== undefined) {
        //     console.log('inside if ');
        //     if (saveProductList.length !== 0) {
        //         console.log('inside iffff ');
        //         saveProductList.forEach(
        //             (saveProduct) => {
        //                 if (saveProduct.prod_id === product.item_id) {
        //                     saveProduct.quantity++;
        //                     console.log('quantity increased ');
        //                     console.log(saveProduct);
        //                 } else {

        //                     tempSaveProductList.push(saveProduct)
        //                     console.log('currentlist' + tempSaveProductList);
        //                     setSaveProductList(tempSaveProductList)
        //                     console.log(saveProduct);
        //                 }
        //                 //console.log(saveProduct);
        //             }
        //         )
        //     } else {
        //         tempSaveProductList.push(saveProduct)
        //         console.log('currentlist' + tempSaveProductList);
        //         setSaveProductList(tempSaveProductList)
        //         console.log(saveProduct);
        //     }
        // }
        // //console.log("UNDEFINED!!!")

    }



    //Render for Dynamic Product List
    const productsList = products !== undefined && products.map(product => {
        return (
            <tr onClick={(e) => addProduct(product, e)}>
                <td>{product.item_id}</td>
                <td>{product.item_title}</td>
                <td>{product.item_description}</td>
                <td>{product.item_listing_price}</td>
                <td>{product.item_code}</td>
                <td>{product.item_manufacturer}</td>
            </tr>
        );
    })

    //Render for Dynamic Selected Products List
    const selectedProductsList = saveProductList !== undefined && Object.entries(saveProductList).map(([key, value]) => {
        console.log(value)
        return (
            <tr>
                <td>{value.product.item_id}</td>
                <td>{value.product.item_title}</td>
                <td>{value.product.item_listing_price}</td>
                <td>{value.product.item_code}</td>
                <td>{value.quantity}</td>
            </tr>
        )
    })


    const placeOrderHandler = (event) => {
        event.preventDefault();
        const orderType = orderTypeRef.current.value;
        const orderDesc = orderDescRef.current.value;
        const dueDate = dueDateRef.current.value;
        const transactionType = transactionTypeRef.current.value;
        const placementDate = placementDateRef.current.value;
        const discount = discountRef.current.value;
        const customerId = customerIdRef.current.value;

        let body = JSON.stringify({
            orderType: orderType,
            orderDesc: orderDesc,
            dueDate: dueDate,
            transactionType: transactionType,
            placementDate: placementDate,
            discount: discount,
            customerId: customerId,
            itemsList: saveProductList
        })

        fetch('http://localhost:3060/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderType: orderType,
                orderDesc: orderDesc,
                dueDate: dueDate,
                transactionType: transactionType,
                placementDate: placementDate,
                discount: discount,
                customerId: customerId,
                itemsList: saveProductList
            }),
        }).then((res) => {
            if (res.ok) {
                alert("Order Placed!");
            } else {
                alert("Order Placement Issue! Please try again later (x400 Internal Server Errro");
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
                                    <Link to='/dashboard' className="nav-link">
                                        <i className="nav-icon fas fa-home" />
                                        <p>
                                            Dashboard
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/' className="nav-link">
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Delivery Notice List
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/' className="nav-link">
                                        <i className="nav-icon fas fa-list" />
                                        <p>
                                            Purchase Req List
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/' className="nav-link">
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
                                    <h1 className="m-0">Place Order</h1>
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
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        {/* /.card-header */}
                                        {/* /.card-body */}
                                    </div>
                                </div>
                                {/* /.col */}
                            </div>
                            <section className="content">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Fill out below form to place Order</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    {
                                        customer_id !== undefined &&
                                        <form onSubmit={placeOrderHandler}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="firstName">Order Type</label>
                                                    <input type="text" className="form-control" id="order_type" placeholder="Order Type" ref={orderTypeRef} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Order Description</label>
                                                    <input type="text" className="form-control" id="order_description" placeholder="Order Description" ref={orderDescRef} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Order Due Date</label>
                                                    <input type="date" className="form-control" id="order_due_date" placeholder="xx-xx-xxxx" ref={dueDateRef} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="billingAddress">Transaction Type</label>
                                                    <input type="text" className="form-control" id="transaction_type" placeholder="Transaction Type" ref={transactionTypeRef} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="shippingAddress">Order Placement Date</label>
                                                    <input type="date" className="form-control" id="order_placement_date" placeholder="Placement Date" ref={placementDateRef} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="returnsCollectionAddress">Discount</label>
                                                    <input type="text" className="form-control" id="discount" placeholder="Discount" ref={discountRef} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="returnsCollectionAddress">Customer ID</label>
                                                    <input type="text" className="form-control" id="customer_id" defaultValue={customer_id} placeholder="User ID" ref={customerIdRef} required disabled />
                                                </div>
                                            </div>
                                            {/* /.card-body */}
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary">Place Order</button>
                                            </div>
                                        </form>
                                    }
                                </div>
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
                                                <h3 className="card-title">Available Products List</h3>
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
                                                                <th>Product ID</th>
                                                                <th>Title</th>
                                                                <th>Description</th>
                                                                <th>Listing Price</th>
                                                                <th>Item Code</th>
                                                                <th>Manufacturer</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {productsList}
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
                                                <h3 className="card-title">Selected Products</h3>
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
                                                                <th>Product ID</th>
                                                                <th>Title</th>
                                                                <th>Listing Price</th>
                                                                <th>Item Code</th>
                                                                <th>Quantity</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedProductsList}
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



                            </section>
                            {/* /.row */}
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
            </div >
        </div >
    );
};

export default AddOrder;
