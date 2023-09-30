const express = require('express');
var fs = require('fs')
var path = require('path')
const app = express();
app.use(express.json());
const cors = require('cors');
const multer = require('multer')
app.use(cors());
const basicAuth = require('express-basic-auth')