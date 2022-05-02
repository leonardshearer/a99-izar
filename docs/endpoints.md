# API Documentation

## Endpoints

### /app/ (GET)

#### Request cURL

```
curl localhost:5555/app
```

#### Response body

```
200 OK
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain
Date: Mon, 02 May 2022 03:35:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)

#### Request cURL

```
curl localhost:5555/app/log/access
```

#### Response body

Response will vary based on accesslog.db contents.

```
[{"id":1,"ip":"::ffff:127.0.0.1","userid":null,"time":1651462559314,"method":"GET","url":"/app/log/access","protocol":1.1,"httpversion":"http","status":null,"referer":null,"userinfo":"curl/7.79.1"}]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 396
ETag: W/"18c-BDEKJsHHYgtso140zBSUcaW6bFc"
Date: Mon, 02 May 2022 03:37:11 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/sentiment/:state (GET)

#### Request cURL

```
curl localhost:5555/app/sentiment/colorado
```

#### Response body

```
{"x":["Positive","Negative"],"y":[4,8],"type":"bar"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json
Date: Mon, 02 May 2022 03:38:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/register/:user (GET)

Since user accounts are managed by Firebase, these endpoints merely log user activity on the site.

#### Request cURL

```
curl localhost:5555/app/user/register/test@test.com
```

#### Response body

```
200 User Registered
```

#### Response headers

```
HTTP/1.1 200 User Registered
X-Powered-By: Express
Content-Type: text/plain
Date: Mon, 02 May 2022 03:41:31 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/login/:user (GET)

#### Request cURL

```
curl localhost:5555/app/user/login/test@test.com
```

#### Response body

```
200 User logged in
```

#### Response headers

```
HTTP/1.1 200 User logged in
X-Powered-By: Express
Content-Type: text/plain
Date: Mon, 02 May 2022 03:42:38 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/logout (GET)

#### Request cURL

```
curl localhost:5555/app/user/logout
```

#### Response body

```
200 User logged out
```

#### Response headers

```
HTTP/1.1 200 User logged out
X-Powered-By: Express
Content-Type: text/plain
Date: Mon, 02 May 2022 03:43:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/changeemail (GET)

#### Request cURL

```
curl localhost:5555/app/user/changeemail
```

#### Response body

```
200 User email changed
```

#### Response headers

```
HTTP/1.1 200 User email changed
X-Powered-By: Express
Content-Type: text/plain
Date: Mon, 02 May 2022 03:43:54 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/changepassword (GET)

#### Request cURL

```
curl localhost:5555/app/user/changepassword
```

#### Response body

```
200 User password changed
```

#### Response headers

```
HTTP/1.1 200 User password changed
X-Powered-By: Express
Content-Type: text/plain
Date: Mon, 02 May 2022 03:44:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/delete (GET)

#### Request cURL

```
curl localhost:5555/app/user/delete
```

#### Response body

```
200 User account deleted
```

#### Response headers

```
HTTP/1.1 200 User account deleted
X-Powered-By: Express
Content-Type: text/plain
Date: Mon, 02 May 2022 03:45:11 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```