#!/usr/bin/env node
const express = require('express');
const lodash = require('lodash');
const crypto = require('crypto');
const faker = require('faker');
const uuidv4 = require('uuid/v4');

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 8080;
const FAKE_USER_COUNT = 30;

const USER_ALLOWED_FIELDS = ['email', 'name', 'notes', 'enabled'];
const USER_ALLOWED_MODIFY_FIELDS = ['email', 'name', 'notes']
const USER_REQUIRED_FIELDS = ['email'];

const app = express();
app.use(express.json());

const users = [];

function randomEmail() {
    const randomString = crypto.randomFillSync(Buffer.alloc(4)).toString('hex');
    return randomString + '_' + faker.internet.email();
}

function generateFakeUsers(count) {
    for (let i = 0; i < count; ++i) {
        users.push({
            uuid: uuidv4(),
            email: randomEmail(),
            notes: faker.lorem.text(),
            name: faker.name.findName(),
            enabled: true,
        });
    }
}

function isValidUserID(id)
{
    let user = null
    users.forEach((item, index) => {
        if (item['uuid'] === id)
            user = item
    })
    return user
}

async function updateUserInformation(user)
{
    let newUser = null
    users.forEach((item, index) => {
        if (item['uuid'] === user['uuid'])
        {
            Object.keys(user).forEach((key, index) => {
                item[key] = user[key]
            })
            newUser = item
        }
    })
    return newUser
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/users', (req, res) => {
    let {offset, limit} = req.query;

    if (offset == null) {
        offset = 0;
    }
    if (limit == null) {
        limit = 10;
    }

    offset = +offset;
    limit = +limit;

    let page = lodash.slice(users, offset, offset + limit);

    res.send({
        data: page,
        offset,
        limit,
        total: users.length,
    });
});

app.post('/users', (req, res) => {
    if (!req.body) {
        res.status(400).end();
        return;
    }

    const user = {uuid: uuidv4()};

    for (const field of USER_ALLOWED_FIELDS) {
        if (req.body.hasOwnProperty(field)) {
            user[field] = req.body[field];
        }
    }

    for (const field of USER_REQUIRED_FIELDS) {
        if (!user.hasOwnProperty(field) || user[field] == null) {
            res.status(400).end();
            return;
        }
    }

    users.push(user);

    res.send({
        data: user,
    });
});

app.get('/users/:uuid', async (req, res) => {
    let urlSplit = req.url.split("/")
    let userID = urlSplit[urlSplit.length-1]
    let user = await isValidUserID(userID)
    if (user)
        res.json({user})
    else
        res.status(404).end();
});

app.put('/users/:uuid', async (req, res) => {
    let urlSplit = req.url.split("/")
    let userID = urlSplit[urlSplit.length-1]
    let user = await isValidUserID(userID)
    
    if (!user)
    {
        res.status(500).end();
        return
    }
    for (const field of USER_ALLOWED_MODIFY_FIELDS) {
        if (!req.body.hasOwnProperty(field) || req.body[field] == null) {
            res.status(400).end();
            return;
        }
        else
            user[field] = req.body[field]
    }
    user = await updateUserInformation(user)
    if (user)
        res.send({user})
    else
        res.status(500).end();
});

generateFakeUsers(FAKE_USER_COUNT);

console.log(`Serving on ${HOST}:${PORT}`);
app.listen(PORT, HOST);
