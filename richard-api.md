# CRIMP REST API
1. Login to CRIMP platform: http://app.crimp.rocks/
1. Join the event that you're intend to work with
1. Inform event organizers to set your role as `partner`
1. On the [main page](http://app.crimp.rocks/events), find the event again
1. Click on `Get Credentials` to get your API tokens
  * `X-User-Id`: ID of your user account
  * `X-Auth-Token`: Secret authorization token
  * `X-Event-Id`: ID of this event for GET requests
1. Feed the credentials into your program to consume our API



<br><br><br>


## API List
* Endpoints expects `Content-Type: application/x-www-form-urlencoded`
* Send http requests to `http://api.crimp.rocks/`
  * `GET '/v1/partner/score{?route_id}{?climber_marker}'` as a full request, will be written as `GET http://api.crimp.rocks/v1/partner/score?category_id=<id_string>&climber_marker=<id_string>`


* [GET '/version'](#get-version)
* [GET '/v1/partner/event'](#get-v1partnerevent)
* [GET '/v1/partner/climber'](#get-v1partnerclimberclimber_id)
* [GET '/v1/partner/score'](#get-v1partnerscorecategory_idroute_idclimber_markerclimber_id)
* [GET '/v1/partner/activeclimber'](#get-v1partneractiveclimbercategory_idroute_id)


<br><br><br>



## GET '/version'
* Purpose: Retrieve the earliest API version number that is still supported
* Value will be hard-coded so this would be a good method to test your connection to server
* Oldest supported version is `1`; latest version is `1`

### Request
```json
Header: {}
```

### Response

```json
Body: {
  "version": 1
}
```

| Key | Type | Comment/Description |
| --- | --- | --- |
| `version`  | Number | The version number of the oldest supported API |



<br><br><br>



## GET '/v1/partner/event'
* Purpose: Get data for 1 Event by its ID or subdomain, or both

### Request
```json
Header: {
  "X-User-Id": "jfJnk4B...",
  "X-Auth-Token": "LNZoISu...",
  "X-Event-Id": "rokuk3q..."
}
```

### Response
```json
Body: {
  "event": {
    "event_id": "eventId1",
    "event_subdomain": "subDomain1",
    "event_name": "eventName1",
    "event_start_time": 123456789,
    "event_end_time": 123456789,
    "categories": [
      {
        "category_id": "categoryIdA",
        "category_name": "Novice Men Qualifiers",
        "category_acronym": "NMQ",
        "category_start_time": 123456789,
        "category_end_time": 123456789,
        "score_system": "IFSC Top-Bonus",
        "is_team_category": false,
        "is_score_finalized": false,
        "is_displayed": false,
        "routes": [
          {
            "route_id": "routeIdA1",
            "route_name": "NMQ1"
          },
          {
            "route_id": "routeIdA2",
            "route_name": "NMQ2"
          },
          {
            "route_id": "routeIdA3",
            "route_name": "NMQ3"
          }
        ]
      },
      {
        "category_id": "categoryIdB",
        "category_name": "Novice Woman Qualifiers",
        "category_acronym": "NWQ",
        "category_start_time": 123456789,
        "category_end_time": 123456789,
        "score_system": "Points",
        "is_team_category": false,
        "is_score_finalized": false,
        "is_displayed": false,
        "routes": [
          {
            "route_id": "routeIdB1",
            "route_name": "NWQ1"
          },
          {
            "route_id": "routeIdB2",
            "route_name": "NWQ2"
          },
          {
            "route_id": "routeIdB3",
            "route_name": "NWQ3"
          }
        ]
      }
    ]
  }
}
```

| Key | Type | Comment/Description |
| --- | --- | --- |
| `event.event_id`                            | String |  |
| `event.event_subdomain`                     | String | Public scoreboard is at http://[event_subdomain].crimp.rocks |
| `event.event_name`                          | String |  |
| `event.event_start_time`                    | Number | Unix timestamp |
| `event.event_end_time`                      | Number | Unix timestamp |
| `event.categories`                          | Array | Sorted list, sort by `category_start_time` |
| `event.categories.$`                        | Object |  |
| `event.categories.$.category_id`            | String |  |
| `event.categories.$.category_name`          | String |  |
| `event.categories.$.category_acronym`       | String |  |
| `event.categories.$.category_start_time`    | Number | Unix timestamp |
| `event.categories.$.category_end_time`      | Number | Unix timestamp |
| `event.categories.$.score_system`           | String | Score format used for this category |
| `event.categories.$.is_team_category`       | Boolean | Flag if individual/team category |
| `event.categories.$.is_score_finalized`     | Boolean | Flag if scores are finalized by Chief Judge |
| `event.categories.$.is_displayed`           | Boolean | Flag if organizers want scores to be public |
| `event.categories.$.routes`                 | Array | Sorted list, sort by first-to-climb to last-to-climb |
| `event.categories.$.routes.$`               | Object |  |
| `event.categories.$.routes.$.route_id`      | String |  |
| `event.categories.$.routes.$.route_name`    | String |  |



<br><br><br>



## GET '/v1/partner/climber{?climber_id}'
* Purpose: Retrieve scoring data for a climber

### Request
* `climber_id` get all the scores of a specific climber

```json
Header: {
  "X-User-Id": "jfJnk4B...",
  "X-Auth-Token": "LNZoISu...",
  "X-Event-Id": "rokuk3q..."
}
```

| Key | Type | Comment/Description |
| --- | --- | --- |
| `climber_id`   | String | Mandatory |

### Response
```json
Body: {
  "climber" : {
    "climber_id": "climberId1",
    "climber_name": "John Smith",
    "climber_affiliation": "National University of Singapore",
    "climber_gender": "M",
    "categories": [
      {
        "category_id": "categoryIdA",
        "category_name": "Novice Men Qualifiers",
        "category_acronym": "NMQ",
        "routes": [
          {
            "route_id": "routeIdA1",
            "route_name": "Route 1"
          },
          {
            "route_id": "routeIdA2",
            "route_name": "Route 2"
          },
        ]
      },
      {
        /* Data for 2nd category */
      }
    ],
    "scores": [
      {
        "category_id": "categoryIdA",
        "climber_id": "climberId1",
        "climber_marker": "NMQ001",
        "score_tabulated": {
          "string": "2T4 2B2"
        },
        "scores": [
          {
            "route_id": "routeIdA1",
            "score_calculated": {
              "string": "t1 b1"
            }
          },
          {
            "route_id": "routeIdA2",
            "score_calculated": {
              "string": "t3 b1"
            }
          }
        ]
      },
      {
        /* Scores for 2nd category */
      }
    ]
  }
}
```

| Key | Type | Comment/Description |
| --- | --- | --- |
| `climber.climber_id`                                   | String |  |
| `climber.climber_name`                                 | String |  |
| `climber.climber_affiliation`                                  | String |  |
| `climber.gender`                                       | String | Possible values are `M`, `F` or no value |
| `climber.categories`                                   | Array | Sorted list, sort by `category_id` |
| `climber.categories.$`                                 | Object |  |
| `climber.categories.$.category_id`                     | String |  |
| `climber.categories.$.category_name`                   | String |  |
| `climber.categories.$.category_acronym`                | String |  |
| `climber.categories.$.routes`                          | Array | Sorted list, sort by first-to-climb to last-to-climb |
| `climber.categories.$.routes.$`                        | Object |  |
| `climber.categories.$.routes.$.route_id`               | String |  |
| `climber.categories.$.routes.$.route_name`             | String |  |
| `climber.score_tabulated`                              | Object |  |
| `climber.score_tabulated.string`                       | String | Score tally of all routes |
| `climber.scores`                                       | Array | Sorted list, sort by `category_id` |
| `climber.scores.$`                                     | Object |  |
| `climber.scores.$.category_id`                         | String |  |
| `climber.scores.$.climber_id`                          | String |  |
| `climber.scores.$.climber_marker`                      | String |  |
| `climber.scores.$.scores`                              | Array | Sorted list, same order as `categories.$.routes` |
| `climber.scores.$.scores.$`                            | Object |  |
| `climber.scores.$.scores.$.route_id`                   | String |  |
| `climber.scores.$.scores.$.score_calculated`           | Object |  |
| `climber.scores.$.scores.$.score_calculated.string`    | String | Score for 1 route |



<br><br><br>



## GET '/v1/partner/scores{?category_id}'
* Purpose: Retrieve scoring/ranking data for an entire category
* **Very expensive query**, try to minimise usage of this!

### Request
* `category_id` get scores from a specific category

```json
Header: {
  "X-User-Id": "jfJnk4B...",
  "X-Auth-Token": "LNZoISu...",
  "X-Event-Id": "rokuk3q..."
}
```

| Key | Type | Comment/Description |
| --- | --- | --- |
| `category_id`  | String | Mandatory |

### Response
```json
Body: {
  "category": {
    "category_id": "categoryIdA",
    "category_name": "Novice Men Qualifiers",
    "category_acronym": "NMQ",
    "category_start_time": 123456789,
    "category_end_time": 123456789,
    "score_system": "IFSC Top-Bonus",
    "is_team_category": false,
    "is_score_finalized": false,
    "is_displayed": false,
    "routes": [
      {
        "route_id": "routeIdA1",
        "route_name": "NMQ1"
      },
      {
        "route_id": "routeIdA2",
        "route_name": "NMQ2"
      }
    ],
    "scores": [
      {
        "climber_id": "climberId1",
        "climber_name": "John Smith",
        "climber_marker": "NMQ001",
        "climber_affiliation": "National University of Singapore",
        "climber_gender": "M",
        "rank": 1,
        "score_tabulated": {
          "string": "2T2 2B2"
        },
        "scores": [
          {
            "route_id": "routeIdA1",
            "score_calculated": {
              "string": "t1 b1"
            }
          },
          {
            "route_id": "routeIdA2",
            "score_calculated": {
              "string": "t1 b1"
            }
          }
        ]
      },
      {
        "climber_id": "climberId2",
        "climber_name": "James Smith",
        "climber_marker": "NMQ002",
        "climber_affiliation": "National University of Singapore",
        "climber_gender": "M",
        "rank": 2,
        "score_tabulated": {
          "string": "2T3 2B3"
        },
        "scores": [
          {
            "route_id": "routeIdA1",
            "score_calculated": {
              "string": "t1 b1"
            }
          },
          {
            "route_id": "routeIdA2",
            "score_calculated": {
              "string": "t2 b2"
            }
          }
        ]
      },
      {
        ...
      }
    ]
  }
}
```

| Key | Type | Comment/Description |
| --- | --- | --- |
| `category`                                            | Object |  |
| `category.category_id`                                | String |  |
| `category.category_name`                              | String |  |
| `category.category_acronym`                           | String |  |
| `category.category_start_time`                        | Number | Unix timestamp |
| `category.category_end_time`                          | Number | Unix timestamp |
| `category.score_system`                               | String |  |
| `category.is_team_category`                           | Boolean | Flag if individual/team category |
| `category.is_score_finalized`                         | Boolean | Flag if scores are finalized by Chief Judge |
| `category.is_displayed`                               | Boolean | Flag if organizers want scores to be public |
| `category.routes`                                     | Array | Sorted list, sort by first-to-climb to last-to-climb |
| `category.routes.$`                                   | Object |  |
| `category.routes.$.route_id`                          | String |  |
| `category.routes.$.route_name`                        | String |  |
| `category.scores`                                     | Array | Sorted list, sort by ranking |
| `category.scores.$`                                   | Object |  |
| `category.scores.$.climber_id`                        | String |  |
| `category.scores.$.climber_name`                      | String |  |
| `category.scores.$.climber_marker`                    | String |  |
| `category.scores.$.climber_affiliation`               | String |  |
| `category.scores.$.climber_gender`                    | String | Possible values are `M`, `F` or no value |
| `category.scores.$.rank`                              | Number |  |
| `category.scores.$.score_tabulated`                   | Object |  |
| `category.scores.$.score_tabulated.string`            | String |  |
| `category.scores.$.scores`                            | Array | Sorted list, same order as `categories.$.routes` |
| `category.scores.$.scores.$`                          | Object |  |
| `category.scores.$.scores.$.route_id`                 | String |  |
| `category.scores.$.scores.$.score_calculated`         | Object |  |
| `category.scores.$.scores.$.score_calculated.string`  | String |  |



<br><br><br>



## GET '/v1/partner/activeclimber{?category_id}{?route_id}'
* Purpose: Retrieve profile and scores of the climber on the wall

### Request
```json
Header: {
  "X-User-Id": "jfJnk4B...",
  "X-Auth-Token": "LNZoISu...",
  "X-Event-Id": "rokuk3q..."
}
```

| Key | Type | Comment/Description |
| --- | --- | --- |
| `category_id` | String | Optional |

<!-- | `route_id` | String | Optional. If `route_id` is specified, then you can assume that `categories[0].routes[0]` will be the data for the route requested | -->

### Response
```json
Body: {
  "categories": [
    {
      "category_id": "categoryIdA",
      "category_name": "Novice Men Qualifiers",
      "category_acronym": "NMQ",
      "routes": [
        {
          "route_id": "routeIdA1",
          "route_name": "Route 1",
          "climber": {
            "climber_id": "climberId1",
            "climber_marker": "NMQ001",
            "climber_name": "John Smith"
          }
        },
        {
          "route_id": "routeIdA2",
          "route_name": "Route 2",
          "climber": {
            "climber_id": "climberId2",
            "climber_marker": "NMQ002",
            "climber_name": "James Doe"
          }
        },
      ]
    },
    {
      "category_id": "categoryIdB",
      "category_name": "Novice Woman Qualifiers",
      "category_acronym": "NWQ",
      "routes": [
        ...
      ]
    }
  ]
}
```

| Key | Type | Comment/Description |
| --- | --- | --- |
| `categories`                                        | Array | Sorted list, sort by `category_name` |
| `categories.$`                                      | Object |  |
| `categories.$.category_id`                          | String |  |
| `categories.$.category_name`                        | String |  |
| `categories.$.category_acronym`                     | String |  |
| `categories.$.routes`                               | Array | Sorted list, sort by first-to-climb to last-to-climb |
| `categories.$.routes.$`                             | String |  |
| `categories.$.routes.$.route_id`                    | String |  |
| `categories.$.routes.$.route_name`                  | String |  |
| `categories.$.routes.$.climber`                     | Object |  |
| `categories.$.routes.$.climber.climber_id`          | String |  |
| `categories.$.routes.$.climber.climber_marker`      | String |  |
| `categories.$.routes.$.climber.climber_name`        | String |  |

* If there are no active climbers:
  * `categories` will be an empty array
* If there is 1 or more active climbers in a category:
  * If `route_id` *is not* specified in the GET request
    * Every route in the category will be included in `categories.$.routes`
    * For routes with no climbers:
      * `categories.$.routes.$.climber.climber_id` will be an empty string
      * `categories.$.routes.$.climber.climber_marker` will be an empty string
      * `categories.$.routes.$.climber.climber_name` will be 'No climber on route'

<!-- * If `route_id` *is* specified in the GET request
  * Only the specified route will be included in `categories.$.routes`
  * For specified route with no climbers: -->



<br><br><br>
