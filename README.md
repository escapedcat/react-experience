Trying to setup a basic react project with things like:
- Webpack
- router
- form-validation
- radium (css in JS)
- babel/ES6
- ...

I pretty much have no idea about react; only did the tutorial.


#Setup basic structure and Webpack

```
npm init
npm install --save react
npm install --save-dev webpack
```

#Using Webpack with react
Reading this first:  
http://jslog.com/2014/10/02/react-with-webpack-part-1/

Forgot the JSX loader so:

```
npm install --save-dev jsx-loader
```

Creating `hello.jsx` and `index.jsx` like the tutorial says.
Saving both under a folder calles `app`.

Adding `webpack.config.js` to the root.

Installing `http-server`:  
```
npm install --save-dev http-server
```

Saving `index.html` like teh tutorial says.
Saving it in `app`.
Now I don't want to have the html and jsx files in the same folder, so moving the jsx-files to a newly created `jsx` folder.

Adding the `script` part to the `package.json` as the tutorial says.

##Run the server
`npm run start`

```
sh: 1: webpack-dev-server: not found
```
Forgot something...  
Ah, right: `npm install --save-dev webpack-dev-server`  

Let's try again. Ok, better, but now I need tochange some paths, because I put all files to `/app`.

`http://localhost:8080/app/`
This shows me nothing, but two errors in the console.
```
http://localhost:8080/app/node_modules/react/dist/react-with-addons.js 
http://localhost:8090/assets/bundle.js 
```
Can't find these two files.  
Ok, let's check.  

I change some files:

`webpack.config.js`
```
entry: './app/jsx/index.jsx',
```

`app/index.html`
```
<script src="../node_modules/react/dist/react-with-addons.js"></script>
```

Let's try again.  

`Uncaught TypeError: React.renderComponent is not a function`  
Arrrhhh... This tutorial is a bit old (like everything related to any kind of Frontend development after 4 weeks).
So let's change `index.jsx`
```
React.render(<Hello />, document.getElementById('content'))
```

And yes: `Hello React`. Yay!


#React router - Part 1
I have no clue, how that works. I only know there is something called `react-router`. Let's google it.

https://github.com/rackt/react-router

Ok, so first:
```
npm install --save react-router
```

Continue with the readme of react-router, reading this:
`// using an ES6 transpiler, like babel`
I want that. Ok. So let's add babel First


#Babel
https://babeljs.io/docs/setup/

```
npm install --save-dev babel-loader
```

`webpack.config.js` add the loader for `jsx`:
```
module: {
  loaders: [
    { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"}
  ]
}
```

Ok, let's check.
`npm run start`
Hm, seems fine... back to:


#React router - Part 2

Let's try adding it first to `index.jsx`:
```
import { Router, Route, Link } from 'react-router'
```

```
ERROR in ./app/jsx/index.jsx
Module build failed: SyntaxError: /app/jsx/index.jsx: Line 1: The @jsx React.DOM pragma has been deprecated as of React 0.12
```
Ah, well, let's remove all `/** @jsx React.DOM */` statements in the jsx-files and try again...
Ok, we're good again.

Now we can also switch the `React` require to an import statement:
`import React from 'react'`

Ok, so now let's create some routes. I have no clue and lookign at the code at the github repo of react router for a minute doesn't let me understand how to use it. So let's google a tutorial.

http://jmfurlott.com/tutorial-setting-up-a-single-page-react-web-app-with-react-router-and-webpack/
Well... I see it creates a navigation, one route and runs the router. Let's copy this into `index.jsx` and see what happens:

```
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let App = React.createClass({  
  render() {
    return (
      <div className="nav">
        <Link to="app">Home</Link>
        <Link to="login">Login</Link>

        {/* this is the importTant part */}
        <RouteHandler/>
      </div>
    );
  }
});

let routes = (  
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={LoginHandler}/>
  </Route>
);

Router.run(routes, function (Handler) {  
  React.render(<Handler/>, document.body);
});
```

`Uncaught ReferenceError: LoginHandler is not defined`; yeah, well. I didn't add this, so let's just use `Hello.jsx` for this:
```
import LoginHandler from './Hello';
```

Now I get this:
`_reactRouter2.default.run is not a function`
AArrhhhhh... So. yeah, stupid idea to check tutorials taht might be outdated m(
Back to the official github-repo.

Modifying `index.jsx` to look like this:
```
'use strict'
import React from 'react'
import { Router, Route } from 'react-router'

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body)
```
The error is gone, but it complains about not having `App`. I get that. Let's give it `App`.
I wanna use our existing `hello.jsx` for this. So I need to import it `as App`.
How was that working in ES6 again?
Let's just use it for all the components:
```
import * as App from './Hello';
import * as About from './Hello';
import * as Users from './Hello';
import * as User from './Hello';
import * as NoMatch from './Hello';
```
And let's add source-map support for webpack, cause this is getting out of hand:
```
module.exports = {
    ...,
    devtool: 'source-map'
}
```

Hm, so this brought me:
```
Warning: Invalid undefined `component` supplied to `Route`.
```

I reduced it and added an `App` component:
```
'use strict'
import React from 'react'
import { Link, Router, Route } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        {/* change the <a>s to <Links>s */}
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
})

//import * as App from './Hello';
import * as About from './Hello';
import * as NoMatch from './Default';

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body)
```
Also I copied the `Hello.jsx` to and changed it to `Default.jsx`.
Now I get the Navigation and the routing works.
But I still get:
```
Warning: Invalid undefined `component` supplied to `Route`.
```
Need to figure that out now. Even though it works, this can't be good.
Hm... tried to google it. Found something that might be related to the current status of react-router. Leaving this for now.

Moving on.
Moved `App` component code to a new file called `App.jsx`.
Hm, that didn't work. Moving back.
Maybe this all needas to be in one file?
```
module.exports = App;
```
In combination with this works:
```
import App from './App';
```


#Form validation
I hate forms. Let's just add a simple one and move on from there.
I add a new route and component `contact` for this.

I googled a bit regarding form creation in react. I would like to generate forms from some sort om model and would like to use provided validation as well.
https://github.com/formly-js/react-formly
This seems to be unmaintained.
https://github.com/christianalfoni/formsy-react
This looks good, but this looks better:
https://github.com/gcanti/tcomb-form
I wanna give this a try.

```
npm install --save tcomb-form
```

Changing `require` way of include to `import` and adding reduced example from tcomb readme:

`Contact.jsx`
```
'use strict'
import React from 'react'

//var t = require('tcomb-form');
//var Form = t.form.Form;

import * as t from 'tcomb-form'

var MyForm = t.form.Form;

console.dir(MyForm);

// define your domain model with tcomb
// https://github.com/gcanti/tcomb
var Person = t.struct({
  name: t.Str,
  surname: t.Str
});


module.exports = React.createClass({
    displayName: 'HelloReact',
    render: function(){
        return (
        	<div>
        		form

				<MyForm
				ref="form"
				type={Person}
				/>
        	</div>
        )
    }
})
```
Looks ok.


## Updating versions

I saw this:  
https://github.com/gcanti/tcomb-form/issues/200  

Someone had problems with tcomb and react 1.13.
They suggested to upgrade to 1.14-rc1.
Hm... let's just try that.
First modify react in `package.json`:
```
"react": "^0.14.0-rc1",
```
...and then:
`npm install react`  


Well and then I did some other changes to use `import` for all things.  
This results in an issue with the `router`. Let's figure out how to fix this now.

## Export, Import, default, module
What a mess. I figured out that I had no clue how to use `export` properly and if I should use `React.createClass` or `class extends Component`. I still don't. I setteled for `export const Foo = React.createClass` for now.  
It's really stupid to only work on this every now and then.

### Import
I don't know the difference between 
```
import App from './App';
```
and
```
import { App } from './App';
```

Ok, so this just depends on how you export your things:
```
export default App
```
or
```
export default { App }
```
So this is really just a question of what you are exporting. A single Vs. a couple of things.


### createClass Vs. Component
Read up on this [here](https://blog.risingstack.com/the-react-way-getting-started-tutorial) and switched everything to `Component`.

