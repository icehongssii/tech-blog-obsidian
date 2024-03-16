---
title: SSL 인증서 적용하니 CSS가 적용안되어있다
created: 2024-03-15 16:52
last-updated: 2024-03-15 16:52
tags:
  - troubleshooting
  - python
---

## 👯‍♂️ SSL 인증서 적용하니 Css가 적용안되어있다

```ad-important
Mixed Content: The page at 'https://xxx.icehongssii.xyz/' was loaded over HTTPS, but requested an insecure stylesheet 'http://xxx.icehongssii.xyz/static/style.css'. This request has been blocked; the content must be served over HTTPS.
```

![](https://i.imgur.com/1AePkzE.png)



## 👯‍♂️ Alb에서 이미 리다이렉트가 되니 리버스 프록시는 필요 없지만 왜 여전히 Mixed Contents?

![](https://i.imgur.com/RLMxmaB.png)


- [스택오버플로우, 아마 fastapi내 url_for이 프로토콜 바꾸는듯 ](https://stackoverflow.com/questions/70521784/fastapi-links-created-by-url-for-in-jinja2-template-use-http-instead-of-https)


그래서 fastapi 레벨에서 https로 변경해주는 작업을 거쳐야하는 것 처럼 보임

![](https://i.imgur.com/EH5C96n.png)


```python
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class HTTPSRedirectMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Change the scheme to https
        request.scope['scheme'] = 'https'
        response = await call_next(request)
        return response
app.add_middleware(HTTPSRedirectMiddleware)
```

그래서 이렇게 바꾸니 이제 아예 경로를 못읽는 문제가 발생함 그래서 로컬에서는 강제로  
http -> https로 바꾸지   invalid http request가 발생하는데 로컬일경우에는 상단 코드 무시하도록 적용하고 배포함  

```python
from fastapi import FastAPI
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
import os

app = FastAPI()

# 환경 변수를 체크하여 로컬 환경이 아닐 때만 HTTPSRedirectMiddleware를 적용합니다.
if os.getenv("ENVIRONMENT") != "local":
    app.add_middleware(HTTPSRedirectMiddleware)
```

![](https://i.imgur.com/ohTywYl.png)



--- 

## 👯‍♂️ Ref & LINKS TO THIS PAGE

-  [[SSL 적용]]
- [[reverse proxy로 nginx vs traefik? 사용기]]

- [웹, ecs fastapi와 리버스 프록시 적용예시  ](https://www.miketheman.net/2021/12/28/container-to-container-communication/)

- [웹, alb 리다이렉트](https://stackoverflow.com/questions/70521784/fastapi-links-created-by-url-for-in-jinja2-template-use-http-instead-of-https)
