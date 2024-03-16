---
title: 도메인 적용
created: 2024-03-12 21:24
last-updated: 2024-03-12 21:24
tags: []
---

## 👯‍♂️ 선행 되어야 되는 과정

- [[ECS에 고정 주소 설정]] 를 통해서 먼저 ALB 를 생성해야한다
-  Route 53에서 hosted zone 생성하고 레코드 두개 먼저 생성 그리고 이 때 생긴 도메인 이름을 가비아나 도메인 관리 하는 곳에 등록할 것 

![](https://i.imgur.com/sGzJQNV.png)

![](https://i.imgur.com/WUtFEYT.png)


## 👯‍♂️ ALB와 개인 도메인 연결하기


ECS 서비스에서 ALB(Application Load Balancer)를 생성한 후 이를 자신의 도메인과 연결하는 과정은 다음과 같습니다:

### 1. **Route 53 설정:**
    
    - AWS Management Console에서 Route 53 서비스로 이동합니다.
    - 'Hosted zones'을 선택하고, 연결하려는 도메인 이름을 선택합니다.
    - ‘Create Record’를 클릭하여 새 레코드를 생성합니다.

### 2. **레코드 생성:**
    
    - 레코드 유형으로 A – IPv4 address를 선택합니다.
    - Alias 옵션을 ‘Yes’로 설정합니다.
    - Alias Target에서 Application Load Balancer를 선택하고, 생성한 ALB의 이름을 찾아 선택합니다.
    - 레코드 이름을 설정합니다. 예를 들어, `www`를 입력하면 `www.yourdomain.com`으로 연결됩니다. 루트 도메인을 연결하려면 레코드 이름을 비워 둡니다.
    - 변경 사항을 저장합니다.




추가 작업으로 SSL 연결해야함


--- 

## 👯‍♂️ Ref & LINKS TO THIS PAGE

-  [[ECS에 고정 주소 설정]]
- [[SSL 적용]]


