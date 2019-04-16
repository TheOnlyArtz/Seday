const {post, get} = require('unirest');

let constructHeaders = (type, val) => {return {"Authorization": `${type} ${val}`}};
async function exchangeAccessToken({redirect_uri, clientID, clientSecret}, req, res) {
  const requestPayload = {
  redirect_uri,
  client_id: clientID,
  grant_type: "authorization_code",
  client_secret: clientSecret,
  code: req.query.code,
  }

  let promise = post("https://discordapp.com/api/oauth2/token")
  .send(requestPayload)
  .headers({
    "Content-Type": 'application/x-www-form-urlencoded',
    "User-Agent": 'DiscordBot'});

  return promise;
}

async function fetchUserData(req, res) {
  let {token_type, access_token} = req.session['auth'];
  return new Promise(async (resolve, reject) => {
    let body = {};
    let user = await get("https://discordapp.com/api/users/@me")
    .headers(constructHeaders(token_type, access_token));
    body.user = user["body"];

    let guilds = await get("https://discordapp.com/api/users/@me/guilds")
    .headers(constructHeaders(token_type, access_token));
    body.user.guilds = guilds["body"];
    resolve(body);
  });
}

function hasServerManagePerms({session, params}, memberPerms, advancedLookup) {
  for (let perm of [32]) {
    if ((memberPerms & perm) !== perm) {
      return false
    }
  }
  if (advancedLookup) {
    let inGuild = session.user.guilds.filter(i => i.id === params.guildID)[0];
    if (!inGuild) {
      return false;
    }
  }

  return true;
}

function ifLoggedMiddleware(req, res, next) {
  if (req.session.user)
    return next();

  res.redirect('/login');
}

module.exports = {
  exchangeAccessToken,
  fetchUserData,
  hasServerManagePerms,
  ifLoggedMiddleware
};
