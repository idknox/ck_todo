## Basic Todo App

Built with [React on Rails](https://github.com/shakacode/react_on_rails).

View a live example [here](http://todo.ianknox.me/).

## Requirements
* Ruby 2.4.1
* Rails 5.1.4
* Node v9.3.0
* Yarn
* PostgreSQL

## Setup

1. These instructions assume you are using Ruby 2.4.1.
1. Clone or fork the repo: ```git clone git@github.com:idknox/ck_todo.git```.
1. Ensure you have the latest stable Bundler: ```gem install bundler```.
1. Install Node v9.3.0 via [nvm](https://github.com/creationix/nvm) or a package manager of your choice.
1. Install the latest Yarn via a package manager of your choice (```brew install yarn```, etc).
1. Install foreman: ```gem install foreman```.
1. Install dependencies: ```bundle && yarn```.
1. Database setup: ```rake db:create; rake db:migrate```.
1. Start the app: ```foreman start -f Procfile.dev-server```.
1. Open the page in a browser of your choice, we recommend Chrome: ```http://localhost:3000```.


This app makes use of webpack-dev-server so any saved changes to client files will hot-reload the page.
