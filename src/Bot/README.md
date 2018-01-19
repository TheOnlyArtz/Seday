<div align="center">
        <p> <img src="https://i.imgur.com/TScSeRv.png"/> </p>
        <p><i><b>A Discord dashboard for bots</b></i></p>
</div>

### Bot part

How can we have a dashboard for our bot without having a bot?

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
```<br>
This is a big step of getting our application to run!<br>
Let's make the client to connect Discord, Shall we?<br>
We will do this by adding our config JSON which we've created before to the code<br>
```js
const config = require('./config.json');```
<br>
The next step is making the Client to connect Discord<br>
```
Client.login(config.token)```<br>
As you can see we are using our config to take the token without the need to expose it inside the main file.<br>

Let's make sure our app is connected by adding those line of code to `main.js`<br>
```js
Client.on('ready', () => {
    console.log('ready!');
})```<br>
Now our `main.js` should look just like this:<br>
```js
const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('./config.json');;

Client.login(config.token);

Client.on('ready', () => {
    console.log('ready');
});```<br>
Run our application by running this command `node main.js` inside the console.