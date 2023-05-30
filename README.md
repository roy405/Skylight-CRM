# Skylight-CRM
 A CRM Dashboard developed fully using JavaScript Technologies (ReactJS, ExpressJS and NodeJS) and MySQL for database for a Technology and Computer Hardware Retailer. The application provides all types of functionalities that is required for Sales and CRM related activities and works in a distributed manner because of it's API based design. The application was developed to cater to the requirements of a bicycle shop for effective customer management and sales engagement and tracking. The frontend, backend and database are all isolated in nature for easier management. The functional requirements have been carefully collected and crafted directly from the Retailer directly along with maintaing an iterative, user driven development cycle to ensure that all identified requirements are throughly satisified and are free of discrepencies. The system is capable of integration with other isolated ERP level systems for extended integrated functionalities (future additions).
 
 # System Architecture
 - 3-tier architecture
 - Front End Framework - ReactJS
 - Backend Framework - ExpressJS
 - Database - MySQL RDBMS
 
 # Functionalties
- *User Management and Authentication:*
Both authentication (login and signup ) and profile information handling for sales operatives. 

- *Customer Relations Management:*
The system should provide a function for the sales representative to keep tracks of leads for promotional targeting. Leads are considered to be potential customers. Furthermore, the system is to allow sales officials to register and manage customers. Also, it is to sales representatives to check previous orders information.

- *Sales Enquires:*
The system is to allow a sales representative to record an enquiry made by a customer regarding particular item(s). This details various information regarding the customer such as delivery requirements, item’s availability and credit status. Finally the enquiry and related items are reserved for 24hours. 

- *Orders Management:*
The system should allow orders to be created for customers who responds back to the enquiries made. The order is recorded with the delivery information, requested items, courier information and requested dates. The Orders are to be passed onto various other departments afterwards for further processing.

- *Orders Cancellations Handling:*
In case a customer wants to cancel a placed order, the sales representative can forward the information to other departments to process the request. This cancellation request is only upheld provided that the production of the particular item hasn’t begun. In case production commencement, the customer will be charged with a penalty fee.

- *Customer Returns Handling:*
The system is to consist of a function that handles customer returns. In case a customer raises an enquiry to return an item, the item pickup information is recorded along with the type of return which consists of Replace, Repairs or Credit. In case of a credit, the customer is repaid, for repairs sent to the production department and for replace exchanged by another item by the warehouse. All above conditions are considered depending on the condition of the item(s).


# How to run

## Frontend Server:
- Install Nodejs
- Navigate to the salesreact folder and open terminal
- run following commands
```
npm start
```
## Backend Server:
- Navigate to the backend folder
- Run the backend server through the IDE
- Use the provided .sql file to load the database schema for dummy data (consists of user (admin), products, customer data).
```
npm devStart
```
