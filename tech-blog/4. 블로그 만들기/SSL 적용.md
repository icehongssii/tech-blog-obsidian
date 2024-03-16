---
title: 무제 파일 1
created: 2024-03-12 21:24
last-updated: 2024-03-12 21:24
tags:
  - CS
  - 책-혼공컴운
  - book
---

## 👯‍♂️  AWS에서 인증서 받기(ACM 이용)

https://woojin.tistory.com/93


    - HTTPS를 사용하여 도메인을 안전하게 연결하려면, SSL/TLS 인증서가 필요합니다.
    - AWS Certificate Manager에서 인증서를 요청하고, 도메인 소유권을 증명합니다.
    - ALB에 새로운 리스너를 추가하고, 443 포트(HTTPS)를 사용하도록 설정합니다.
    - 리스너 생성 시, AWS에서 발급받은 SSL/TLS 인증서를 선택합니다.
    - 적절한 규칙을 설정하여 HTTPS 리스너가 트래픽을 적절한 대상 그룹으로 라우팅하도록 합니다

## 👯‍♂️  로드밸런서에 인증서 적용하기 

![](https://i.imgur.com/qvYrTMf.png)


- ALB 보안그룹에서  443 (https) 열어주기
- 리스너 룰에서 443 추가
- 기존 80포트 에서 http요청해도 https로 페이지 보여줄 수 있게 리다이렉트 설정
- 

![](https://i.imgur.com/rx7DB7e.png)


--- 

## 👯‍♂️ Ref & LINKS TO THIS PAGE

-  [[ECS 서비스에 개인 도메인 적용]]
- [웹페이지, 로드배런서로 리다이렉트 설정하고 헬스체크 통과하기](https://woojin.tistory.com/93)

