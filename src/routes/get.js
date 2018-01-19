const express = require('express');
const querystring = require('querystring')

const config = require('../config.json');

const {post, get} = require('unirest');
const {clientID, scopes, redirect_uri, clientSecret} = config;

const Router = new express.Router();

const mainFunctions = require('../main.js');
const r = mainFunctions['rethink'];

Router.get('/', ifLoggedMiddleware, function(req, res) {
  res.render('Home', {user: req.session.user, checkforperm: hasServerManagPerms})
})

Router.get('/login', function(req, res) {
  if (req.session.user) {
    res.redirect('/');
  }

  const authURI = `https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&scope=${scopes.join('%20')}&permissions=${0}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code`
  res.render('Login', {authURL: authURI, res});
});


Router.get('/oauth/redirect', async function(req, res) {
  initData(req, res);
});

Router.get('/dashboard', ifLoggedMiddleware, function(req, res) {
  return res.set(200).send({user: req.session.user, auth: req.session.auth});
});


Router.get('/dashboard/:guildID?', ifLoggedMiddleware, async function(req, res) {
        let founded = req.session.user.guilds.find(i => i.id === req.params.guildID)
        if (!req.session.user.guilds.filter(i => i.id === req.params.guildID)[0] || hasServerManagPerms(founded.permissions) === false) {
            return res.set(401).send({message: 'Forbidden! You don\'t have permissions to edit this server\'s config', status: 401})
        }
  const guildData = await r.table('Guilds').get(req.params.guildID)
  res.render('Dashboard', {
      guildID: req.params.guildID,
      guildData: guildData ? guildData : null
    })
})

Router.get('*', function(req, res) {
  return res.set(404).send({message: "Not found!"})
})

module.exports = Router;

function ifLoggedMiddleware(req, res, next) {
  if (req.session.user) 
    return next();
 
  res.redirect('/login');
}

function hasServerManagPerms(memberPerms) {
  for (let perm of [32]) {
    if ((memberPerms & perm) !== perm) {
      return false
    }
  }

  return true;
}

function initData(req, res) {
    const requestPayload = {
    redirect_uri,
    client_id: clientID,
    grant_type: "authorization_code",
    client_secret: clientSecret,
    code: req.query.code,
  }

    post("https://discordapp.com/api/oauth2/token").query(requestPayload)
      .headers({
        "Content-Type": 'application/x-www-form-urlencoded',
        "User-Agent": 'DiscordBot'
        })
      .end(function (response) {
        const {access_token, refresh_token, expires_in} = response.body;
        get("https://discordapp.com/api/users/@me").headers({'Authorization': `Bearer ${access_token}`}).end(function(user) {
          get("https://discordapp.com/api/users/@me/guilds").headers({'Authorization': `Bearer ${access_token}`}).end(function(guilds) {
            req.session.auth = response['body'];
            req.session.user = user['body'];
            req.session.user.guilds = guilds['body'];
            res.redirect('/dashboard');
          })
        })
      });
}