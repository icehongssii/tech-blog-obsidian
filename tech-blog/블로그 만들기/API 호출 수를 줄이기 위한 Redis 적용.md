---
title: API 호출 수를 줄이기 위한 Redis 적용
created: 2024-03-13 13:25
last-updated: 2024-03-13 13:25
tags:
  - aws
  - redis
  - fastapi
---

## 👯‍♂️ 사이드카 패턴 VS 다른 Task Def?

👉 확장성을 위해 같은 서비스 내에 다른 task def로 둬서 다른 컨테이너로 실행되게 ㄱ ㄱ

1. **Same Task Definition**: You can add the Redis container to the same ECS task definition as your FastAPI application. This makes Redis available as a 'sidecar' to your main application container, meaning they share the same lifecycle, network space, and other task-level resources.
    
    - **Pros**: Simple to set up, no separate management required for Redis.
    - **Cons**: Less scalable, as Redis will be tied to each instance of your FastAPI application, and not ideal for high availability.
2. **<mark style="background: #FFB8EBA6;">Separate Task Definition</mark> - 선택**: Running the Redis container in a separate task allows you to manage and scale it independently from your FastAPI application.
    
    - **Pros**: More scalable and flexible, can use AWS's service discovery to allow your FastAPI application to communicate with Redis, better for high-availability setups.
    - **Cons**: Slightly more complex setup, requires inter-task communication setup.


## 👯‍♂️ 사이드카 패턴 VS 다른 Task Def?


## 👯‍♂️ 레디스 - fastpi 설정

### 레디스 작업정의

### 보안그룹설정
- fastapi 작업정의가 사용하고 있는 보안그룹
	- 인바운드에 6379 포트 -> 타겟에 redis 보안그룹 ID
- 레디스 작업정의가 사용하고 있는 보안그룹
	- 인바운드에 6379 포트 -> 타겟에 fastapi 보안그룹 ID

### fastapi내에서 레디스 포인트하기

- 레디스 주소를 fastapi 컨테이너 환경변수로 넣어주기 이떄 주소와 관련된 내용은 다음과 같다 


1. **Amazon ElastiCache 사용 시**: AWS의 ElastiCache 서비스를 사용하여 Redis 인스턴스를 실행하는 경우, ElastiCache 대시보드에서 인스턴스에 대한 엔드포인트를 찾을 수 있습니다. 이 엔드포인트 주소는 Redis 클라이언트에서 연결하는 데 사용됩니다. ElastiCache에서 제공하는 엔드포인트는 보통 고정되어 있으며, 인스턴스가 재시작되거나 설정이 변경되지 않는 한 바뀌지 않습니다.
    
2. **자체 호스팅 Redis 사용 시**: 자체 서버나 다른 클라우드 서비스에서 Redis를 호스팅하는 경우, Redis 서버의 IP 주소 또는 도메인 이름을 사용하여 접근합니다. 이 경우, 주소는 해당 서버의 설정에 따라 달라질 수 있습니다. 서버의 고정 IP를 사용하거나 DNS 이름을 설정하여 접근할 수 있습니다.
    
3. **서비스 발견 사용 시**: ECS와 같은 컨테이너 오케스트레이션 시스템을 사용하는 경우, 서비스 발견 메커니즘을 사용하여 Redis 인스턴스의 주소를 동적으로 찾을 수 있습니다. 예를 들어, ECS 서비스 발견을 사용하는 경우, Redis 서비스에 대한 DNS 이름이 생성되며, 이 이름을 환경 변수로 애플리케이션에 제공하여 Redis 인스턴스에 연결할 수 있습니다.
    
4. **환경 변수**: 개발, 스테이징, 프로덕션 등 다양한 환경에서 다른 Redis 인스턴스를 사용할 수 있으므로, 각 환경에 맞는 Redis 주소를 환경 변수로 설정하여 애플리케이션에 주입하는 방법이 일반적입니다. 이렇게 하면 애플리케이션 코드를 변경하지 않고도 다른 환경에서 다른 Redis 인스턴스에 연결할 수 있습니다.
    

Redis 인스턴스의 주소는 항상 고정된 것은 아니며, 환경 설정이나 인프라 구성에 따라 변경될 수 있습니다. 따라서 인스턴스 주소를 애플리케이션에 안전하게 제공하고 필요에 따라 쉽게 업데이트할 수 있는 방법을 사용하는 것이 좋습니다.

```json
{
  "name": "REDIS_HOST",
  "value": "172.31.28.222" #private IP임 같은 서비스내에있으니 ㅎ
}
```

- 환경변수로 넣어준 호스트 연결

```python
import os
import redis


redis_host = os.getenv("REDIS_HOST")
redis_client = redis.Redis(host=redis_host, port=6379, decode_responses=True)
```

--- 

## 👯‍♂️ Ref & LINKS TO THIS PAGE

-  [유튜브, redis+fastAPI ](https://www.youtube.com/watch?v=reNPNDustQU)
- [레딧,  fastapi와 redis 컨테이너 만들떄 ? ](https://www.reddit.com/r/learnpython/comments/12xrx4r/how_to_deploy_redis_with_a_fastapi_docker/)

