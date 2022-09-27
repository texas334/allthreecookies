# allthreecookies
git clone https://github.com/texas334/allthreecookies.git
npm i in our cmd
ad run file npm run dev

Understanding Cookies and Implementing them in Node.js
June 17, 2021
Topics:
Node.js
Websites usually store a small amount of data on the browsers. There are three main kinds of browser-based storage: session storage, local storage, and cookie storage. This guide will discuss what a cookie is, how it works and how to use HTTP cookies in a Node.js application.

Prerequisites
Basic knowledge of Node.js
Node.js installed on your computer.
Basic understanding of how to create an HTTP server using Express.
What are cookies?
A cookie is usually a tiny text file stored in your web browser. A cookie was initially used to store information about the websites that you visit. But with the advances in technology, a cookie can track your web activities and retrieve your content preferences. I am sure, at some point, you have seen a pop-up screen similar to the one shown below.

Accept cookies website popup

This will help the website you have visited to know more about you and customize your future experience.

For example;

Cookies save your language preferences. This way, when you visit that website in the future, the language you used will be remembered.

You have most likely visited an e-commerce website. When you include items into your shopping cart, a cookie will remember your choices. Your shopping list item will still be there whenever you revisit the site. Basically, a cookie is used to remember data from the user.

Therefore, cookies are small strings that contain key-value pairs of information sent from the webserver to the browser to get information about the user. The browser will then save them locally. This way, subsequent requests can be made to the server to immediately update user content on the website depending on the previous requests that a user made to the server. A cookie is HTTP generated; thus, called an HTTP cookie.

A brief history of cookies
The first HTTP cookie was created in 1994 by Lou Montulli, an employee of Netscape Communications, the company that created the Netscape browser. Lou was creating an online store for a company that claimed that their servers were getting full from storing each user’s shopping cart data.

Lou, therefore, had to figure out how to store the contents of the shopping cart locally. He came up with an idea to save the shopping cart info on the user’s computer to save server space. He borrowed the concept of HTTP cookies from a computing token called the magic cookie which was used to identify a user when logging into a system.

Lou recreated this concept and implemented it in a web browser. In 1994, the Netscape browser implemented cookies, followed by Internet Explorer in 1995 and that marked the birth of HTTP cookies.

How cookies work
When a user visits a cookie-enabled website for the first time, the browser will prompt the user that the web page uses cookies and request the user to accept cookies to be saved on their computer. Typically, when a makes a user request, the server responds by sending back a cookie (among many other things).

This cookie is going to be stored in the user’s browser. When a user visits the website or sends another request, that request will be sent back together with the cookies. The cookie will have certain information about the user that the server can use to make decisions on any other subsequent requests.

A perfect example is accessing Facebook from a browser. When you want to access your Facebook account, you have to log in with the correct credentials to be granted the proper access. But in this case, it would be tiresome to continuously log in to Facebook every time.

When you first make a login request and the server verifies your credentials, the server will send your Facebook account content. It will also send cookies to your browser. The cookies are then stored on your computer and submitted to the server with every request you make to that website. A cookie will be saved with an identifier that is unique to that user.

When you revisit Facebook, the request you make, the saved cookie, and the server will keep track of your login session and remember who you are and thus keep you logged in.

The different types of cookies include:

Session cookies - store user’s information for a short period. When the current session ends, that session cookie is deleted from the user’s computer.

Persistent cookies - a persistent cookie lacks expiration date. It is saved as long as the webserver administrator sets it.

Secure cookies - are used by encrypted websites to offer protection from any possible threats from a hacker.

Third-party cookies - are used by websites that show ads on their pages or track website traffic. They grant access to external parties to decide the types of ads to show depending on the user’s previous preferences.

The main difference between a session and a cookie
The major difference between sessions and cookies is that sessions live on the server-side (the webserver), and cookies live on the client-side (the user browser). Sessions have sensitive information such as usernames and passwords. This is why they are stored on the server. Sessions can be used to identify and validate which user is making a request.

As we have explained, cookies are stored in the browser, and no sensitive information can be stored in them. They are typically used to save a user’s preferences.

Setting up cookies with Node.js
Let’s dive in and see how we can implement cookies using Node.js. We will create and save a cookie in the browser, update and delete a cookie.

Go ahead and create a project directory on your computer. Initialize Node.js using npm init -y to generate a package.json file to manage Node.js project dependencies.

We will use the following NPM packages:

Express - this is an opinionated server-side framework for Node.js that helps you create and manage HTTP server REST endpoints.

cookie-parser - cookie-parser looks at the headers in between the client and the server transactions, reads these headers, parses out the cookies being sent, and saves them in a browser. In other words, cookie-parser will help us create and manage cookies depending on the request a user makes to the server.

Run the following command to install these NPM packages:

npm install express cookie-parser
We will create a simple example to demonstrate how cookies work.

Step 1 - Import the installed packages
To set up a server and save cookies, import the cookie parser and express modules to your project. This will make the necessary functions and objects accessible.

const express = require('express')
const cookieParser = require('cookie-parser')
Step - 2 Get your application to use the packages
You need to use the above modules as middleware inside your application, as shown below.

//setup express app
const app = express()

// let’s you use the cookieParser in your application
app.use(cookieParser());
This will make your application use the cookie parser and Express modules.

Step - 3 Set a simple route to start the server
We use the following code to set up a route for the homepage:

//set a simple for homepage route
app.get('/', (req, res) => {
    res.send('welcome to a simple HTTP cookie server');
});
Step 4 - Set a port number
This is the port number that the server should listen to when it is running. This will help us access our server locally. In this example, the server will listen to port 8000, as shown below.

//server listening to port 8000
app.listen(8000, () => console.log('The server is running port 8000...'));
Now we have a simple server set. Run node app.js to test if it is working.

Running an Express server

And if you access the localhost on port 8000 (http://localhost:8000/), you should get an HTTP response sent by the server. Now we’re ready to start implementing cookies.

Setting cookies
Let’s add routes and endpoints that will help us create, update and delete a cookie.

Step 1 - Set a cookie
We will set a route that will save a cookie in the browser. In this case, the cookies will be coming from the server to the client browser. To do this, use the res object and pass cookie as the method, i.e. res.cookie() as shown below.

//a get route for adding a cookie
app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
});
When the above route is executed from a browser, the client sends a get request to the server. But in this case, the server will respond with a cookie and save it in the browser.

Go ahead and run node app.js to serve the above endpoint. Open http://localhost:8000/getcookie your browser and access the route.

To confirm that the cookie was saved, go to your browser’s inspector tool 🡆 select the application tab 🡆 cookies 🡆 select your domain URL.

Saving a cookie in the browser

Step 2 - Using the req.cookies method to check the saved cookies
If the server sends this cookie to the browser, this means we can iterate the incoming requests through req.cookies and check the existence of a saved cookie. You can log this cookie to the console or send the cookie request as a response to the browser. Let’s do that.

// get the cookie incoming request
app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});
Again run the server using node app.js to expose the above route (http://localhost:8000/getcookie) and you can see the response on the browser.

A saved cookie

As well as on your console logs.

Cookie saved in the console

Step 3 - Secure cookies
One precaution that you should always take when setting cookies is security. In the above example, the cookie can be deemed insecure.

For example, you can access this cookie on a browser console using JavaScript (document.cookie). This means that this cookie is exposed and can be exploited through cross-site scripting.

You can see the cookie when you open the browser inspector tool and execute the following in the console.

document.cookie
The saved cookie values can be seen through the browser console.

Browser console

As a precaution, you should always try to make your cookies inaccessible on the client-side using JavaScript.

We can add several attributes to make this cookie more secure.

HTTPonly ensures that a cookie is not accessible using the JavaScript code. This is the most crucial form of protection against cross-scripting attacks.
A secure attribute ensures that the browser will reject cookies unless the connection happens over HTTPS.
sameSite attribute improves cookie security and avoids privacy leaks.
By default, sameSite was initially set to none (sameSite = None). This allowed third parties to track users across sites. Currently, it is set to Lax (sameSite = Lax) meaning a cookie is only set when the domain in the URL of the browser matches the domain of the cookie, thus eliminating third party’s domains. sameSite can also be set to Strict (sameSite = Strict). This will restrict cross-site sharing even between different domains that the same publisher owns.

You can also add the maximum time you want a cookie to be available on the user browser. When the set time elapses, the cookie will be automatically deleted from the browser.
Read this guide to learn more attributes and how you can use them in JavaScript and Node.js.

//a get route for adding a cookie
app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
        maxAge: 5000,
        // expires works the same as the maxAge
        expires: new Date('01 12 2021'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('Cookie have been saved successfully');
});
In this case, we are accessing the server on localhost, which uses a non-HTTPS secure origin. For the sake of testing the server, you can set secure: false. However, always use true value when you want cookies to be created on an HTTPS secure origin.

If you run the server again (node app.js) and navigate to http://localhost:8000/setcookie on the browser, you can see that the values of the cookie have been updated with security values.

Cookies updated security values

Furthermore, you cannot access the cookie using JavaScript, i.e., document.cookie.

Cookie not accessed with JavaScript

Step 4 - Deleting a cookie
Typically, cookies can be deleted from the browser depending on the request that a user makes. For example, if cookies are used for login purposes, when a user decides to log out, the request should be accompanied by a delete command.

Here is how we can delete the cookie we have set above in this example. Use res.clearCookie() to clear all cookies.

// delete the saved cookie
app.get('/deletecookie', (req, res) => {
    //show the saved cookies
    res.clearCookie()
    res.send('Cookie has been deleted successfully');
});
Open http://localhost:8000/deletecookie, and you will see that the saved cookie has been deleted.


 
