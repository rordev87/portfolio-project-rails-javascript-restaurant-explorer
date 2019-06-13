# Portfolio Project - Rails+Javascript - Restaurant Explorer

## Description

This portfolio project is for website that allows users to view a list of all restaurants. It also also users to view detailed information about individual restaurants from the list of all restaurants and page backwards and forwards through the list of all restaurants. Finally, the detail page for individual restaurants also includes user comments associated with each restaurant. A signed-in user is able to add new comments - displayed immediately upon submission.

Users can sign-up for a new account and log in and out with an existing account. Only signed in users are able to add new comments, but visitors are able to view existing comments by other users.

Additional features include the incorporation of the [Bootstrap 4](https://getbootstrap.com/) front-end component library, [Font-Awesome](https://fontawesome.com/) icons, and royalty free images from [Pexels.com](https://www.pexels.com/).

## Installation

To install the application, follow these steps:

1. Fork and/or clone the [repository](https://github.com/robert-laws/portfolio-project-rails-javascript-restaurant-explorer.git)

1. From the root of the application folder, run ``bundle install``

1. Migrate the database using the command ``bundle exec rake db:migrate``

1. Seed the database with sample data using the command ``bundle exec rake db:seed``

1. Run ``bundle exec rails server`` to startup the local server and navigate to localhost:3000 to view the running application

## Contributing

Please refer to each project's style guidelines and guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1. Fork the repo on GitHub
1. Clone the project to your own machine
1. Commit changes to your own branch
1. Push your work back up to your fork
1. Submit a Pull request so that your changes can be reviewed

## Licensing

The MIT License (MIT)

Copyright (c) 2019 Robert Laws

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
