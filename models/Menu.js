const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

// TODO - create a Menu model
let Menu = sequelize.define('menu', {
    title: Sequelize.STRING
})

module.exports = {Menu};