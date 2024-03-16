---
title: "\b스테이징 환경 만들기"
created: 2024-03-16 17:04
last-updated: 2024-03-16 17:04
tags:
  - devops
  - troubleshooting
---

## 👯‍♂️ Intro & tl;dr

로컬 환경에서 http -> https로 바꾸는 과정이 필요없다

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

이렇게 해버리면 

![](https://i.imgur.com/n4rT4L0.png)

이렇게 되므로 로컬환경에서는 해당 코드가 반영되지 않도록 해야할것같달까?

prod, dev, 완벽하게 작동하기는함

- xxx.icehongssii.xyz 프로덕션 레벨
- 그래서 그냥  dev는 dev.icehongssii.xyz 여기에 넣기로 결정함
- 로컬일 경우?


```python
from fastapi import FastAPI
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
import os

app = FastAPI()

# 환경 변수를 체크하여 로컬 환경이 아닐 때만 HTTPSRedirectMiddleware를 적용합니다.
if os.getenv("ENVIRONMENT") != "local":
    app.add_middleware(HTTPSRedirectMiddleware)
```

## 👯‍♂️ 근데 Mixed Content에러랑 Invalid Http Request랑 무슨차이일까?

- mixed content 에러에서는 스타일시트 적용 X, 이미지 로딩 O
- invalid http 에러에서는 스타일시트 적용 X, 이미지 로딩 X

`Invalid HTTP request received` 에러는 클라이언트에서 유효하지 않거나 예상치 못한 HTTP 요청을 보낼 때 발생합니다. 이는 보통 클라이언트와 서버 간의 프로토콜 불일치 때문에 생기는데, 특히 HTTPS를 사용할 때 일반적으로 볼 수 있습니다. 클라이언트가 HTTP로 서버에 요청을 보내고 서버가 HTTPS만을 기대하는 설정일 때 이러한 문제가 발생할 수 있습니다.

`Mixed Content` 에러는 웹 페이지가 HTTPS를 통해 제공되지만, 웹 페이지 내부의 일부 리소스(예: 이미지, 스타일 시트, 스크립트)가 HTTP를 통해 로드되려고 할 때 발생합니다. 이는 웹 보안 정책인 '콘텐츠 보안 정책'(CSP)에 의해 보호되는데, 이 정책은 웹 페이지를 통한 모든 리소스가 안전한 HTTPS 연결을 통해 제공되어야 한다고 요구합니다.

Mixed Content 에러가 발생할 때, 브라우저는 보안을 위해 해당 리소스(이미지, 스타일 시트 등)의 로드를 차단할 수 있습니다. 그러나 이는 주로 이미지와 같은 리소스에 국한되며, 웹 페이지의 다른 부분은 여전히 정상적으로 작동할 수 있습니다. 반면, `Invalid HTTP request received` 에러는 서버가 클라이언트의 요청을 제대로 이해하지 못하고 처리할 수 없음을 의미하기 때문에, 이로 인해 웹 페이지의 로딩 자체가 실패할 수 있으며, 따라서 스타일 시트나 아이콘과 같은 자산들도 제대로 로드되지 않을 수 있습니다.

문제 해결을 위해서는 다음을 시도할 수 있습니다:

1. 웹 서버(예: Nginx, Apache) 또는 로드 밸런서(ALB 등)가 HTTPS 요청만을 올바르게 처리하고 있는지 확인하세요.
2. FastAPI 애플리케이션의 모든 내부 링크와 리소스가 HTTPS를 통해 요청되고 있는지 확인하세요. HTML 템플릿 내에서는 항상 상대 경로를 사용하거나, 프로토콜에 맞는 절대 경로를 사용해야 합니다.
3. 클라이언트 측에서는 웹 페이지를 HTTPS를 통해 접근하는지 확인하세요.
4. 웹 서버 또는 로드 밸런서에서 HTTP 요청을 HTTPS로 자동 리다이렉트하는 설정을 확인하고, 필요한 경우 이를 활성화하세요.

혼합 콘텐츠 문제를 해결하기 위해서는 모든 웹 리소스가 HTTPS를 통해 제공되도록 해야 하며, 서버 설정에서 이를 강제하는 것이 좋습니다.


--- 

## 👯‍♂️ 메인포인트1


--- 

## 👯‍♂️ Ref & LINKS TO THIS PAGE

-  [책/유튜브 인강-혼자 공부하는 컴퓨터구조+운영체제, 강민철, 한빛미디어](https://www.youtube.com/watch?v=kFWP6sFKyp0&list=PLYH7OjNUOWLUz15j4Q9M6INxK5J3-59GC)


