const express = require('express');
const querystring = require('querystring')
const restUtils = require("../Rest/utils.js");
const config = require('../config.json');

const {clientID, scopes, redirect_uri, clientSecret} = config;

const Router = new express.Router();

const mainFunctions = require('../main.js');
const r = mainFunctions['rethink'];

Router.get('/', restUtils.ifLoggedMiddleware, async (req, res) => {
  // basically just update the user's data from the API.
  let userData = await restUtils.fetchUserData(req, res);
  req.session.user = userData.user

  res.render('Home', {
    user: req.session.user,
     checkforperm: restUtils.hasServerManagePerms
   });
})

Router.get('/login',(req, res) => {
  if (req.session.user) {
    res.redirect('/');
  }

  const authURI = `https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&scope=${scopes.join('%20')}&permissions=${0}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code`
  res.render('Login', {authURL: authURI, res});
});


Router.get('/oauth/redirect', async (req, res) => {
  let authDetails = await restUtils.exchangeAccessToken(config, req, res);
  req.session["auth"] = authDetails.body;
  let userData = await restUtils.fetchUserData(req, res);
  req.session.user = userData.user
  res.redirect("/");
});

Router.get('/me', restUtils.ifLoggedMiddleware, (req, res) => {
  return res.set(200).send({user: req.session.user, auth: req.session.auth});
});

Router.get('/dashboard/:guildID?', restUtils.ifLoggedMiddleware, async (req, res) => {
  let user = req.session.user.guilds.find(i => i.id === req.params.guildID);
  if (!user || !restUtils.hasServerManagePerms(req, user.permissions, true)) {
      return res.set(401)
      .send({message: 'Forbidden! You don\'t have permissions to edit this server\'s config', status: 401});
  }

  const guildData = await r.table('Guilds').get(req.params.guildID)
  res.render('Dashboard', {
      guildID: req.params.guildID,
      guildData: guildData ? guildData : null
    })
})

Router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

Router.get('*', (req, res) => {
  return res.set(404).send({message: "Not found!"})
})

module.exports = Router;
