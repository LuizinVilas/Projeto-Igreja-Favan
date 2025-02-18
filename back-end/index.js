const express = require('express');
const Cors = require('cors');
const App = express();

App.use(Cors());
App.use(express.json());
App.use(express.urlencoded({extended: true}));


