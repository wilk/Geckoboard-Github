# Geckoboard-Github

[**Geckoboard**](http://www.geckoboard.com/) Front-end Coding Challenge

## Spec
Create a simple application to show a list of the public repositories under your Github account. You could also use the account of somebody you admire. Below is an outline of the basic requirements that need to be fulfilled:

1. A main page which shows a list of up to 20 repositories sorted by the number of stars/watchers (highest first)
1. Each item displays the repo title, the number of stars/watchers and the number of forks
1. Clicking on the title shows a more detailed description of the repository containing the description, homepage URL and any other relevant information.

Suggestions:

- Use a modern, front-end JavaScript framework
- You probably don't need to write any backend code
- Write some tests

## Choises
I choose [**AngularJS**](http://angularjs.org/) as Javascript framework, [**Bootstrap**](http://getbootstrap.com/) as CSS (SASS) framework, [**Yeoman**](http://yeoman.io/) angular generator to build the folder structure and [**Jasmine**](http://pivotal.github.io/jasmine/) as the test suite.

## Tree folder
The entire app is located under *app* folder.
Root contains *Gruntfile* for helping tools, *bower* and *package* files for dependencies, *Karma* configuration files and different *rc* files.
Every test are situated under *test/spec/* folder.

### App
The app folder looks like as follows:

  - app.js | Angular app definition (routes, constant, inclusions, etc)
  - scripts/ | App Javascripts
    - controllers/ | Angular app controllers
    - directives/ | Angular app directives
    - services/ | Angular app services
  - styles/ | SASS styles
  - views/ | HTML templates
    - partials/ | Angular app templates

The app is built with AngularJS and Bootstrap Twitter (SASS version)

### Test
The test folder looks like as follows:

  - spec/controllers/ | Angular controllers test
  - spec/services/ | Angular services test

Every test are made with *Jasmine*

## Demo
You can find a demo at the following url: [**http://wilk.github.io/Geckoboard-Github/**](http://wilk.github.io/Geckoboard-Github/)
The default user is [**Mike McNeil**](https://github.com/mikermcneil), the creator of [**SailsJS**](https://github.com/balderdashy/sails) but you can choose another guy by changing the REST URI.
This app can be use as a view of [**Github APIs**](http://developer.github.com/v3/).

## Grunt Tasks
  - serve: run the app in local
  - test: test the app
  - build: build the app package
  - deploy: deploy the app on Github Pages

## License
The MIT License (MIT)

Copyright (c) 2014 Vincenzo Ferrari <wilk3ert@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.