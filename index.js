'use strict';

const { Database } = require('sqlite3').verbose();
const db = new Database('db/Chinook_Sqlite.sqlite');
const Table = require('cli-table');


// Require knex and pass in the connection options obj
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/Chinook_Sqlite.sqlite'
  },
  useNullAsDefault: true
});

// Using knex to query a sqlite3 Database
// 5. Provide a query showing a unique list of billing countries from the Invoice table.
// knex.select().from('Invoice')
// .distinct('BillingCountry')
// .orderBy('BillingCountry')
// .then((collection) => {
//   console.log(collection);
// })

// 6. Provide a query showing the invoices of customers who are from Brazil
// knex.select().from('Invoice')
// .where('BillingCountry', 'Brazil')
// .then((list) => {
//   console.log("Test list", list);
// });

// 7. Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agent's full name.
// knex.select('Employee.FirstName', 'Employee.LastName')
// .from('Invoice')
// .innerJoin('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
// .innerJoin('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
// .then((list) => {
//   console.log("Test list", list);
// })

// 8. Provide a query that shows the Invoice Total, Customer name, Country and Sale Agent name for all invoices and customers.
knex.select(knex.raw(`Employee.FirstName || ' ' || Employee.LastName as Salesagent`))
.select(knex.raw(`Customer.FirstName || ' ' || Customer.LastName as CustomerName`))
.select('Customer.Country')
.sum('Invoice.Total as Total')
.from('Invoice')
.join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
.join('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
.groupBy('Invoice.Total')
.then((list) => {
  console.log("Test list", list);
});

knex.destroy();
