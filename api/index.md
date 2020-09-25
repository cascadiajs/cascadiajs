---
title: API
layout: layout
---
# API Docs

This website is statically generated, so this API is currently read-only.

## Getting the full list of Events

`curl https://cascadiajs.com/api/events.json`

This will return a JSON document that contains an array of Event objects:

```json
[
    {
        "name":"CascadiaJS 2019",
        "location":"Seattle, WA, USA",
        "url":"https://2019.cascadiajs.com"
    }
    ...
]
```

## Getting the full list of Talks

`curl https://cascadiajs.com/api/talks.json`

This will return a JSON document that contains an array of Talk objects:

```json
[
    {
        "title":"accessibility is a Hydra",
        "speaker":"EJ Mason",
        "tags":["Talk","CascadiaJS 2019","EJ Mason"],
        "abstract":"When Hercules fought the hydra, its heads would grow back no matter how many times he cut them off. Web accessibility professionals put repeated effort toward fighting accessibility barriers, and often feel like their work is never done. If we want to prevail against accessibility barriers, we have to understand our own hydra: we have to talk about ableism.",
        "ytId":"SDdsD5AmKYA"
    }
    ...
]
```

## Getting the full list of Speakers

`curl https://cascadiajs.com/api/speakers.json`

This will return a JSON document that contains an array of Speaker objects:

```json
[
    {
        "name":"Aaron Turner",
        "location":"Los Angeles, CA",
        "pronouns":"he/him",
        "twitter":"torch2424",
        "url":"https://fizbuz.com/u/torch2424",
        "image":"https://begin-static-p6uw2-production.s3.us-west-2.amazonaws.com/forest-1dg/images/speakers/aaron-turner.jpg",
        "company":"Wasmer"}
    ...
]
```
