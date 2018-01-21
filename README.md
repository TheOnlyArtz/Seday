<div align="center">
        <p> <img src="https://i.imgur.com/TScSeRv.png"/> </p>
        <p><i><b>A Discord dashboard for bots</b></i></p>
</div>

### Seday
#Seday is a very small project meant to guide beginner developers to run their first Dashboard for their bot.

### Requirements / Modules being used
<ul>
    <li><a href="https://www.npmjs.com/package/body-parser">body-parser</a></li>
    <li><a href="https://www.npmjs.com/package/cookie-parser">cookie-parser</a></li>
    <li><a href="https://www.npmjs.com/package/cookie-session">cookie-session</a></li>
    <li><a href="https://www.npmjs.com/package/discord.js">discord.js</a> Framework being used by #Seday [bot sample](https://github.com/TheOnlyArtz/Seday/tree/master/src/Bot) for working with Discord API</li>
    <li><a href="https://www.npmjs.com/package/ejs">ejs</a> A templating engine</li>
    <li><a href="https://www.npmjs.com/package/express">express</a> A framework for creating web applications with node.js</li>
    <li><a href="https://www.npmjs.com/package/express-session">express-session</a> Create sessions for things like login systems</li>
    <li><a href="https://www.npmjs.com/package/helmet">helmet</a> connection security</li>
    <li><a href="https://www.npmjs.com/package/mz">mz</a> Some utilities</li>
    <li><a href="https://www.npmjs.com/package/querystring">querystring</a> Converts and object to a query string</li>
    <li><a href="https://www.npmjs.com/package/rethinkdbdash">rethinkdbdash</a> RethinkDB driver we are using</li>
    <li><a href="https://www.npmjs.com/package/session-rethinkdb">session-rethinkdb</a> A module which meant for storing session cookies in a RethinkDB</li>
    <li><a href="https://www.npmjs.com/package/socket.io">socket.io</a> A module we are using for creating our server / websocket server for real-time storing</li>
    <li><a href="https://www.npmjs.com/package/socket.io-client">socket.io-client</a> Socket.io client</li>
    <li><a href="https://www.npmjs.com/package/unirest">unirest</a> An HTTP request API</li>
    <li><a href="https://www.npmjs.com/package/uuid">uuid</a> A temporary module being used for generating Cryptographically string (prefect for cookie secret)</li>
</ul>

### Introduction
Why dashboards? why almost any bot developer would like to have one?<br>
Here are the 2 main reasons:<br>
<ul>
    <li>Makes your bot more attractive to the users</li>
    <li>Makes the "custom config" experience to be such friendly and easier</li>
</ul>

#### Be careful with your actions!!!
As humans, most of us will never understand the idea behind - "With great power comes huge responsibility"<br>
When you are getting that access_token which you will get to know later you can get any types of data from the user<br>
They were many cases of dashboard owners who simply took tokens from victims and spam the API from the token which led the victim to a ban<br>
#### I'm not responsible for the actions you will take!
#Seday meant for educational purposes **only!** you can take this guide to the limits but please, don't be asshole without any friends<br>
Don't you dare to do anything to hurt your dashboards users, because I know you already thought about it (Well... most of you)