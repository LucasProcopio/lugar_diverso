## Lugar diverso

Lugar diverso is a poem based web app, where people can share their thoughts
with others, keep themselves posted with events and more.

---

### Installation

- Download or clone this repository
- At the root folder of this project run the followin command `npm install` or `yarn` to install all dependencies
- Start the server by running `yarn start` or `npm start`

---

### API Endpoint

The following endpoints are available:

| **Endpoints**               |                        **Usage**                         |                                                **Params**                                                |
| :-------------------------- | :------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| `GET /about`                |                   Get all `about` data                   |                                                                                                          |
| `GET /about/:id`            |                  Get `about` data by id                  |                                                  **id**                                                  |
| `POST /about`               |                   Insert `about` data                    |                                        **history**, **join_desc**                                        |
| `POST /about/:id`           |                      Update `about`                      |                                    **id**, **history**, **join_desc**                                    |
| `DELETE /about/:id`         |                      Delete `about`                      |                                                  **id**                                                  |
| `GET /admin/list`           |                   Get list of `admins`                   |                     **JSON WEB Token**                                                                                     |
| `POST /admin/`              |                    Create new `admin`                    |                          **email**, **firstname** , **lastname**, **password**                           |
| `POST /admin/:id`           |                      Update `admin`                      |                     **email**, **firstname** , **lastname**, **password**, **UUID**,  **JSONWEB Token**                      |
| `GET /accept/poems`         |          Get `poems` that are not accepted yet           |                                                                                                          |
| `GET /poems/:page`          | Get `poems`, page quantity and the total number of poems |                                    **page** is the current page ex: 1                                    |
| `POST /create/poem`         |                   Create a new `poem`                    |  **image**_(optional)_, **email**, **phone**, **website**_(optional)_, **author**, **title**, **text**   |
| `POST /accept/poem/:id`     |                     accept a `poem`                      |                                                  **id**                                                  |
| `POST /delete /poem/:id`    |                     delete a `poem`                      |                                                  **id**                                                  |
| `GET /contact`              |                Get `contact` information                 |                                                                                                          |
| `POST /create/contact`      |                     Create `contact`                     |     **phone**, **address**, **city**, **email**, **facebook**_(optional)_, **instagram**_(optional)_     |
| `POST /update/contact/:id`  |                     Update `contact`                     | **id**, **phone**, **address**, **city**, **email**, **facebook**_(optional)_, **instagram**_(optional)_ |
| `GET /events/:page`         |    Get `events`, current page, total number of events    |                                                 **page**                                                 |
| `GET /events/not-available` |                Get not available `events`                |                                                                                                          |
| `POST /create/event`        |                   Create a new `event`                   |                  **title**, **about**, **date**_(2019-04-15)_, **location**, **image**                   |
| `POST /update/event/:id`    |                      Update `event`                      | **id**, **title**, **about**, **date**_(2019-04-15)_, **location**, **image**, **available**_(Boolean)_  |
| `POST /delete /event/:id`   |                      Delete `event`                      |                                                  **id**                                                  |

---

### License

**MIT** click [Here](https://opensource.org/licenses/MIT) to know more.
