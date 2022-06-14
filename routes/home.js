const express = require("express");
const reportsRouter = require("./reports/reports");


module.exports = function(app) {
    app.use(express.json());
  
    app.use("/reports", reportsRouter.reports);
  };