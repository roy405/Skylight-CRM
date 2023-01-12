const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { response } = require('express');
const { request } = require('http');
const cors = require('cors');
const { query } = require('express');

const connectionString = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'skylight'
});

const app = express();

app.use(cors({
    origin: '*'
}));

app.listen(3060);

app.use(session({
    secret: 'sssshhh',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

//Test API
app.get('/', (req, res) => {
    res.send('hi');
});

//User Login
app.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
        connectionString.query('SELECT * FROM users WHERE user_email = ? AND user_password = ?', [email, password], (error, results) => {
            if (error) throw error;

            if (results.length > 0) {
                let Token = Math.random().toString(36).slice(2);
                req.session.loggedin = true;
                req.session.email = email;
                res.json({
                    idToken: Token,
                    expiresIn: 200000,
                    email
                });
                console.log('You have logged in');
            } else {
                res.send('Incorrect Email and/or Password!')
            }
            res.end();
        });
    } else {
        res.send('Please enter Email and Password');
        res.end();
    }
});

//Customer Registration --> Being a B2B Organization, Customers must be registered in the system before an order is placed for them.
app.post('/addCustomer', (req, res) => {

    console.log(req.body.email);
    let customer_id = Math.floor(1000 + Math.random() * 9000);
    let customer_first_name = req.body.firstName;
    let customer_last_name = req.body.lastName;
    let customer_email = req.body.email;
    let customer_billing_address = req.body.customerBillingAddress;
    let customer_shipping_address = req.body.customerShippingAddress;
    let returns_collection_address = req.body.returnsCollectionAddress;
    let customer_trading_name = req.body.customerTradingName;

    let contact_id = Math.floor(100 + Math.random() * 900);
    let customer_phone_no = req.body.phone;


    connectionString.query('SELECT * FROM Customer WHERE customer_email = ?', customer_email, (error, results, fields) => {
        console.log(results);
        console.log(results.length);
        if (error) {
            res.sendStatus(400);
        }

        if (results.length == 0) {
            connectionString.query("INSERT INTO Customer(customer_id, customer_first_name, customer_last_name, customer_email, " +
                " customer_billing_address, customer_shipping_address, returns_collection_address, customer_trading_name) " +
                " VALUES (?, ? , ? , ? , ? , ? , ?, ?)", [customer_id,
                customer_first_name,
                customer_last_name,
                customer_email,
                customer_billing_address,
                customer_shipping_address,
                returns_collection_address,
                customer_trading_name], (error, results, fields) => {
                    if (error) {
                        throw error
                    }
                });
            connectionString.query("INSERT INTO Customer_Contact(contact_id, customer_phone_no, customer_id) " +
                "VALUES ( ?, ?, ?)", [contact_id,
                customer_phone_no,
                customer_id], (error, results, fields) => {
                    if (error) {
                        throw error;
                    }
                });
            res.sendStatus(200);
        }
    });
});

//Purchase Requisition Creation
app.post('/createPurchaseRequisition', (req, res) => {
    console.log(req.body);
    let requisition_description = req.body.reqDesc;
    let requisition_cost = parseFloat(req.body.reqCost);
    console.log(requisition_cost)
    let requisition_date = req.body.reqDate;
    let deadline = req.body.deadline;
    let requisition_quantity = parseInt(req.body.reqQuantity);
    let user_id = parseInt(req.body.userid);
    console.log(user_id);

    connectionString.query("INSERT INTO Purchase_Requisition(requisition_description, " +
        "requisition_cost, requisition_date, deadline, requisition_quantity, user_id)" +
        "VALUES (?, ?, ?, ?, ?, ?)", [requisition_description, requisition_cost,
        requisition_date, deadline, requisition_quantity, user_id], (error, results, fields) => {
            if (error) {
                throw error;
            }
        });
    res.sendStatus(200);
});

//Delivery Notice Creation
app.post('/createDeliveryNotice', (req, res) => {
    console.log(req.body);
    let shipping_address = req.body.shipping_address;
    let item_quantity = parseInt(req.body.item_quantity);
    let delivery_type = req.body.delivery_type;
    let order_id = req.body.order_id;

    connectionString.query("INSERT INTO Delivery_Notice(shipping_address," +
        "item_quantity, delivery_type, order_id)" + "VALUES (?, ?, ?, ?)",
        [shipping_address, item_quantity, delivery_type, order_id],
        (error, results, fields) => {
            if (error) {
                throw error;
            }
        });
    res.sendStatus(200);
})

//Customer Information Update
app.post('/updateCustomer', (req, res) => {
    console.log(req.body.email);
    let customer_email = req.body.lastEmail;
    let customer_id = req.body.customerId;
    let customer_first_name = req.body.firstName;
    let customer_last_name = req.body.lastName;
    let customer_new_email = req.body.email;
    let customer_billing_address = req.body.customerBillingAddress;
    let customer_shipping_address = req.body.customerShippingAddress;
    let returns_collection_address = req.body.returnsCollectionAddress;
    let customer_trading_name = req.body.customerTradingName;

    connectionString.query("UPDATE Customer SET customer_id = ?, customer_first_name = ?, " +
        "customer_last_name = ?, customer_email = ?, customer_billing_address = ?," +
        "customer_shipping_address = ?, returns_collection_address = ?, " +
        "customer_trading_name = ? WHERE customer_email = ?",
        [customer_id, customer_first_name, customer_last_name, customer_new_email,
            customer_billing_address, customer_shipping_address, returns_collection_address,
            customer_trading_name, customer_email], (error, results, fields) => {
                if (error) {
                    throw error;
                }
            });
    res.sendStatus(200);

});

//Order placement: Order information and a list of item selected by user is receieved here
//And then sent to database for persistance
app.post('/placeOrder', (req, res) => {
    console.log(req.body);
    let order_type = req.body.orderType;
    let order_description = req.body.orderDesc;
    let order_due_date = req.body.dueDate;
    let order_status = "Processing";
    let transaction_type = req.body.transactionType;
    let order_placement_date = req.body.placementDate;
    let cancellation_penalty = 0;
    let discount = req.body.discount;
    let customer_id = req.body.customerId;
    let itemsList = [];
    itemsList = req.body.itemsList;
    console.log(req.body.orderType);
    console.log(req.body.itemsList[0]);
    let total_order_price = 0;
    let itemsArray = [];


    itemsList.forEach((item) => {
        total_order_price += item.product.item_listing_price
    })
    console.log(total_order_price);

    let orderObj = {
        order_type: order_type,
        order_description: order_description,
        order_due_date: order_due_date,
        order_status: order_status,
        transaction_type: transaction_type,
        order_placement_date: order_placement_date,
        cancellation_penalty: cancellation_penalty,
        total_order_price: total_order_price,
        discount: discount,
        customer_id: customer_id
    }


    // order_id: order_id,
    // item_id: item.product.item_id,
    // item_quantity: item.quantity,
    // total_price: item.quantity * item.product.item_listing_price
    connectionString.query("INSERT INTO Orders SET ?", orderObj, (error, result) => {
        if (error) throw error;
        if (result != undefined) {
            let order_id = result.insertId;
            itemsList.forEach((item) => {
                let itemObj = [];
                itemObj.push(order_id);
                let item_id = item.product.item_id;
                itemObj.push(item_id);
                let item_quantity = item.quantity;
                itemObj.push(item_quantity)
                let total_price = item.quantity * item.product.item_listing_price;
                itemObj.push(total_price);

                itemsArray.push(itemObj);
            });
            console.log(itemsArray);
            connectionString.query("INSERT INTO Orders_Item (order_id, item_id, item_quantity, total_price) VALUES ?", [itemsArray], (error, results) => {
                if (error) throw error;
            });
            
        }
    });
    res.sendStatus(200)
});

//Master Stock Information specific to the product/item selected --> item_id acquired is used to
//query from the Supplier_Item table to get specific supplier id. This supplier_id along with the
//item_id is used to query the master stock table to get the specific stock information
//(The supplier_id is also used to get the supplier information from the supplier table, if needed to show information 
// about product specific supplier during purchase requisition, only supplier id is used here, but other information is also 
// fetched and readily accessible in the createPurchaseRequsition component in front-end(REACT))
app.post('/getMasterStock', (req, res) => {
    console.log(req.body.item_id);
    let item_id = req.body.item_id;
    connectionString.query("SELECT * FROM Supplier_Item WHERE item_id = ?", item_id, (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            console.log(results);
            let supplier_id = results[0].supplier_id;
            console.log(supplier_id);
            console.log(item_id);
            connectionString.query("SELECT * FROM Master_Stock WHERE item_id = ? AND supplier_id = ?",
                [item_id, supplier_id], (error, results, fields) => {
                    console.log(results);
                    res.json(results);
                });
        }

    });
});

//Get specific supplier based on id: The supplier id is obtained from
//the supplier_item table when queries witht the item_id from products
//list during handling master stock view and purchase requisition generation
app.post('/getSupplier', (req, res) => {
    console.log(req.body.supplier_id);
    let supplier_id = req.body.supplier_id;
    connectionString.query("SELECT * FROM Supplier WHERE supplier_id = ?", supplier_id, (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            console.log(results);
            res.json(results);
        }
    })
})

//Customer List
app.get('/getCustomers', (req, res) => {
    connectionString.query('SELECT * FROM Customer', (error, results, fields) => {
        console.log(results);
        console.log(results.length);
        res.json(results);
    });
});

//Order List
app.get('/getOrders', (req, res) => {
    connectionString.query('SELECT * FROM Orders', (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            console.log(results);
            res.json(results);
        }
    });
});

//Product List
app.get('/getProducts', (req, res) => {
    connectionString.query('SELECT * FROM Item', (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            console.log(results);
            res.json(results);
        }
    });
});

//Supplier List
app.get('/getSuppliers', (req, res) => {
    connectionString.query('SELECT * FROM Supplier', (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            console.log(results);
            res.json(results);
        }
    });
});

//Purchase Requistion List
app.get('/getPurchaseRequisition', (req, res) => {
    connectionString.query('SELECT * FROM Purchase_Requisition', (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            console.log(results);
            res.json(results);
        }
    });
});

//Customer Returns List
app.get('/getCustomerReturns', (req, res) => {
    connectionString.query('SELECT * FROM Customer_Returns', (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            console.log(results);
            res.json(results);
        }
    });
});

//Delivery Notice List
app.get('/getDeliveryNoticeList', (req, res) => {
    connectionString.query("SELECT * FROM Delivery_Notice", (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            console.log(results);
            res.json(results);
        }
    })
})

//Get Specific user based on the id obtained from local Storage(Can also be saved server side, but in the case of this
// , saved in the localStorage) > :: Saved during Login process.
app.post('/getUser', (req, res) => {
    let user_email = req.body.email;
    console.log("user_email" + user_email)
    connectionString.query('SELECT * FROM USERS WHERE user_email = ?', user_email, (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            console.log(results);
            res.json(results);
        }
    });
});



