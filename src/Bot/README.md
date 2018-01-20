<div align="center">
        <p> <img src="https://i.imgur.com/TScSeRv.png"/> </p>
        <p><i><b>A Discord dashboard for bots</b></i></p>
</div>

### Bot part

How can we have a dashboard for our bot without having a bot?<br>
Those are the main parts, if you already have an operating bot I'm suggesting you to start from `Dashboard Integration`<br>
<div align="center"> 
    <p><b>Creating a basic bot</b></p>
    <ul>
        <li><a href="https://github.com/TheOnlyArtz/Seday/tree/master/src/Bot#creating-a-discord-app">Creating a Discord app</a></li>
        <li><a href="https://github.com/TheOnlyArtz/Seday/tree/master/src/Bot#bots-config">Bot's config</a></li>
        <li><a href="https://github.com/TheOnlyArtz/Seday/tree/master/src/Bot#coding-the-bot">Coding the bot</a></li>
    </ul>
    <p><b>Dashboard Integration</b></p>
</div>

##### Creating a Discord app

First of all, we will want to create our application by heading to, [my apps](https://discordapp.com/developers/applications/me)<br>
<br>
After you got to the page you should see something like this:<br>
<div align="center">
    <p><img src="https://i.imgur.com/ayoCj6q.jpg"></p>
</div>
Go ahead and press on the big juicy `+` icon. <br>

<div align="center">
    <p><img src="https://i.imgur.com/3EbMoB0.png"></p>
</div>

Give your app a name and press `Create App` <br>
Now we will make our app a `Bot User` by clicking the next button <br>
<div align="center">
    <p><img src="https://i.imgur.com/yCJQg94.png"></p>
</div>

Great, we've created our first app! lets get the app's token (Essential to get the app online and functional)<br>
<div align="center">
    <p><img src="https://i.imgur.com/Tz3Excw.mp4"></p>
</div>
Be sure to save / copy the token but don't sure it with someone!!!

##### Bot's config

So.. In order to make our bot to run properly with more "security" we will put our "secrets" in a json file<br>
Let's start: (It's going to be easy :D)<br>
We will start by creating a file called `config.json` which will represent our config<br>
All we need to store in our `config.json` for this project is the bot's token<br>
This is how your `config.json` should look like this<br>
```js
{
    "token" : "TheTokenWe'veGot"
}
```
<br>
(Replace the "TheTokenWe'veGot" with your token)<br>
And that's it for the Bot's config! How easy was that?

##### Coding The bot
So we're finally here, the main part for our bot, the core which will run it.<br>
Create a file called `app.js`<br>
And we will start by meeting our work environment:<br>
```
Discord.js // A module for Discord API wrapping
```
run `npm init` inside the console **while the console is on the bot's directory!**<br>
and start feeling up the fields<br>
After that is being done you can download discord.js by running the next command inside the console<br>
`npm install discord.js`<br>
Go to your `main.js` and require `discord.js` as `Discord` and get the Client object<br>
This is what your file should look like now<br>
```js
const Discord = require('discord.js');
const Client = new Discord.Client();
```
<br>
This is a big step of getting our application to run!<br>
Let's make the client to connect Discord, Shall we?<br>
We will do this by adding our config JSON which we've created before to the code

```js
const config = require('./config.json');
```

The next step is making the Client to connect Discord

```
Client.login(config.token)
```

As you can see we are using our config to take the token without the need to expose it inside the main file.<br>

Let's make sure our app is connected by adding those line of code to `main.js`
```js
Client.on('ready', () => {
    console.log('ready!');
})
```

Now our `main.js` should look just like this:
```js
const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('./config.json');;

Client.login(config.token);

Client.on('ready', () => {
    console.log('ready!');
});
```

Run our application by running this command `node main.js` inside the console.<br>
After you got that `ready!` printed inside your console we're good to go to the next step

### Dashboard Integration
Ok, We are splitting this part into 4 different parts
<ul>
    <li>Adding a redirection URL for our application</li>
    <li>Connecting our bot to a RethinkDB database</li>
    <li>Fetching essential data being imported by our users</li>
    <li>Using the data we've fetched</li>
</ul>

##### Adding a redirection URL for our app
A redirection URL is an important part!<br>
We need it because while we are authorizing to Discord services, Discord will redirect us to that URL<br>
And we will get a `grant_code` which give us the permissions and the essentials to get every data we need from the user who just got authorized.<br>
Let's start by going to [our apps](https://discordapp.com/developers/applications/me) and we will pick our bot<br>
You will see a section called `REDIRECT URI(S)` Go ahead type the next URL<br>
<div align="center">
    <p><img src="https://i.imgur.com/056tXcq.png"></p>
</div>

**`Press save`**
##### Connecting our bot to a RethinkDB database
**Please, Do not keep going untill you are setting up RethinkDB** [How to setup]()<br>
Ok, You might ask yourself, "Why do I need a database"?<br>
Well... The answer is pretty straight up, we want a dashboard so we will store all the different guild's configs inside of it.<br>
We will start by installing our RethinkDB API wrapper for Node.js (There are many but we will go with [RethinkDBDash](https://www.npmjs.com/package/rethinkdbdash))<br>
Let's get into our console and run the next command **`npm install rethinkdbdash`**<br>
Great, We've got it!<br>
Go to your `main.js` file and require rethinkdbdash as `r`<br>
```js
const r = require('rethinkdbdash')
```
But we want to connect into our database<br>
Let's invoke `rethinkdbdash` connection function<br>
```js
const r = require('rethinkdbdash')({db: 'Dashcord', servers: [{host: 'localhost', port: 28015}]});
```
Great! let's test if we are connected. go ahead and boot up your RethinkDB server and run `node main.js` in the console<br>
Did you get the next message: `Creating a pool connected to localhost:28015`? If you did, you are good to go