---
title: API 호출 수를 줄이기 위한 Redis 적용
created: 2024-03-13 13:25
last-updated: 2024-03-13 13:25
tags:
  - aws
  - redis
  - fastapi
---

```ad-note
title: 키워드
- redis
- 보안그룹
- 사이드카패턴
```

이 글은 FastAPI와 Redis를 어떻게 연결하는지에 대해 맞췄기 떄문에 코드레벨에서 redis와 어떻게 통신하고 캐싱하는지에 대해선 깊게 다루지 않는다!


## 👯‍♂️ Redis와 FastAPI 컨테이너 같은 태스크에 정의할까?

1. **동일한 작업 정의**: Redis 컨테이너를 FastAPI 애플리케이션과 동일한 ECS 작업 정의에 추가한다면  Redis를 메인 애플리케이션 컨테이너의 사이드카로 사용할 수 있다. 따라서 동일한 수명 주기, 네트워크 공간 및 기타 작업 수준 리소스를 공유가능
    - 단 확장성이 떨어짐. Redis가 FastAPI 애플리케이션의 각 인스턴스에 묶여 있기 때문에 고가용성에는 적합하지 않다
2. **<mark style="background: #FFB8EBA6;">별도 작업 정의</mark> - 선택**: 별도의 작업에서 Redis 컨테이너를 실행하면 FastAPI 애플리케이션과 독립적으로 관리하고 확장할 수 있다.
	- 첫 번째보다는 조금 더 설정해야 할 것이 있지만 확장성과 유연성 향상

따라서 별도의 작업에 Redis를 정의했다. 아래와 같은 상황임


- 클러스터A/서비스A/태스크A/FastaPI컨테이너
- 클러스터A/서비스A/태스크B/FastaPI컨테이너


## 👯‍♂️ Redis와 FastAPI 통신하려면?

### 보안그룹설정

6379는 Redis 서버가 기본적으로 사용하는 포트 번호. Redis 클라이언트와 서버 간의 통신을 위해 이 포트를 사용한다. 보안 그룹을 설정할 때 이 포트를 열어 Redis 서버에 접근할 수 있도록 해야 함.

- FastAPI 작업정의 보안그룹에서 Redis  보안그룹에 대한 인바운운드 트래픽 허용해야함
	- 인바운드에 6379 포트 -> 타겟에 redis 보안그룹 ID (custom TCP)
	- = Redis가 FastAPI 서버에 접근하는 데 필요한 포트를 여는과정

- Reids 작업정의 보안그룹에서 FastAPI 보안 그룹에대한 인바운드 트래픽 허용해야함
	- 인바운드에 6379 포트 -> 타겟에 fastapi 보안그룹 ID (custom TCP)
	- = FastAPI 서비스가 Redis 서버에 접근하는 데 필요한 포트를 여는과정



### 레디스 IP와 비밀번호는 어떻게 받지?

- 자체 호스팅 Redis 사용하므로 코드 내에서Redis 서버 IP와 비밀번호를 이용해 참조한다
- 이때 코드에 Redis의 IP주소와 비밀번호를 명시적으로 적어두는건 지양해야하므로 Github에다가  Github Action에서 사용 할 환경변수로 IP와 비밀번호를 저장해놨다. 이때  이미지 빌드시 github에 저장된 환경변수를 사용해 docker image에서 사용함 


- github action에서 사용하는 워크 플로우 일부 
```yaml
- name: Build, tag, and push image to Amazon ECR
      env:
        ECR_REGISTRY: ${{ secrets.ECR_REGISTRY }}
        ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY }}
        BRANCH_NAME: ${{ github.ref_name }}
        COMMIT_SHA: ${{ github.sha }}
      run: |
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$COMMIT_SHA \
                    --build-arg REDIS_HOST=${{ secrets.REDIS_HOST }} \
                    --build-arg REDIS_PWD=${{ secrets.REDIS_PWD }} \

```

- 도커 파일에는 아래와 같이 작성됨

```dockerfile
ARG REDIS_HOST
ARG REDIS_PWD

ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PWD=${REDIS_PWD}
```

- 그리고 FastAPI에서는 이 환경변수로 아래와 같이 작성되었고 연결 성공!

```python
import os
import redis


redis_host = os.getenv("REDIS_HOST")
redis_client = redis.Redis(host=redis_host, port=6379, decode_responses=True)
```

### 레디스 캐싱이용하기(파이썬 코드)

```python
def fetch_github_content(url):
    cache_key = f"content:{url}"
    try:
        cache_data = redis_client.get(cache_key)
    except redis.exceptions.ConnectionError:
    # Redis 연결 문제 처리
        print("Redis 연결에 실패")
        cache_data = None
    if cache_data:
        return cache_data
    else:
        response = req.get(url)
        data = response.text
        # 3600초동안 컨텐츠 보관
        redis_client.setex(cache_key, 3600, data) 
        return data
```


--- 

## 👯‍♂️ Ref & LINKS TO THIS PAGE

-  [유튜브, redis+fastAPI ](https://www.youtube.com/watch?v=reNPNDustQU)
- [레딧,  fastapi와 redis 컨테이너 만들떄 ? ](https://www.reddit.com/r/learnpython/comments/12xrx4r/how_to_deploy_redis_with_a_fastapi_docker/)

