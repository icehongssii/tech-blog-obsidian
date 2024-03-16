---
title: ECS에 고정 도메인 주소 설정
created: 2024-03-11 15:07
last-updated: 2024-03-11 15:07
tags:
  - aws
---

## 👯‍♂️ Tl;Dr



## 👯‍♂️ 설정해야하는 두가지

1. ecs task 정의 내 포트매핑
2. ecs service 생성시 ALB 생성 


- ECS task def
	- 80:80`

```json
"portMappings": [ { "containerPort": 80, "hostPort": 80, "protocol": "tcp" } ]
```

- ECS service
	- 어플리케이션 로드 밸런서 생성
		- listner 80 /  targetgroup http 

```
``` 


![](https://i.imgur.com/yR33hIO.png)

![](https://i.imgur.com/yluxaG8.png)



## 👯‍♂️ 왜 ALB가 필요할까?

--- 

## 👯‍♂️ Ref & LINKS TO THIS PAGE

- 