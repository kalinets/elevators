# Simplified Elevators API

Starting server:

```sh
npm install
npm start
```

Starting client:

```sh
npm run install:client
npm run start:client
```

Getting building shape:

```sh
$ http --json :8080/building

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 27
Content-Type: application/json; charset=utf-8
Date: Thu, 16 Apr 2020 12:59:43 GMT
ETag: W/"1b-RMyPK0V5hMkIorEezvhNgQVdu48"
X-Powered-By: Express

{
    "elevators": 3,
    "floors": 10
}
```

Getting snapshot of elevator states:

```sh
$ http --json --stream :8080/elevators

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 127
Content-Type: application/json; charset=utf-8
Date: Thu, 16 Apr 2020 12:58:09 GMT
ETag: W/"7f-TCE7+HtB6hHtke6eR579S4aKFMQ"
X-Powered-By: Express

[
    {
        "floor": 0,
        "id": "elv0",
        "state": "stopped"
    },
    {
        "floor": 0,
        "id": "elv1",
        "state": "stopped"
    },
    {
        "floor": 0,
        "id": "elv2",
        "state": "stopped"
    }
]
```

Event stream (SSE):

```sh
$ http --json --stream :8080/stream

HTTP/1.1 200 OK
Cache-Control: no-cache
Connection: keep-alive
Content-Type: text/event-stream
Date: Thu, 16 Apr 2020 12:53:07 GMT
Transfer-Encoding: chunked
X-Accel-Buffering: no
X-Powered-By: Express

id: 0
data: {"id":"elv0","floor":1,"state":"up","targetFloor":2}

id: 1
data: {"id":"elv0","floor":2,"state":"up","targetFloor":2}

id: 2
data: {"id":"elv0","floor":2,"state":"stopped"}
```

Calling elevator to a floor:

```sh
$ http --json PUT :8080/floor/2

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 70
Content-Type: application/json; charset=utf-8
Date: Thu, 16 Apr 2020 12:48:23 GMT
ETag: W/"46-b/WkupWesCsDfHmCwRgMHuvi+UU"
X-Powered-By: Express

{
    "elevator": {
        "floor": 0,
        "id": "elv0",
        "state": "stopped",
        "targetFloor": 2
    }
}
```
