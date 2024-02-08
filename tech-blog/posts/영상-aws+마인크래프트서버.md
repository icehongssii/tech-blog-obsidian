---
title: 무제 파일 1
created: 2024-02-08 16:43
last-updated: 2024-02-08 16:43
tags: []
---

## 👯‍♂️ intro & tl;dr

Brief introduction about the topic or what the post will cover.

- [👯‍♂️ intro & tl;dr](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20%08intro%20&%20tl;dr)
- [👯‍♂️ aws+마인크래프트 바닐라서버](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20aws+%EB%A7%88%EC%9D%B8%ED%81%AC%EB%9E%98%ED%94%84%ED%8A%B8%20%EB%B0%94%EB%8B%90%EB%9D%BC%EC%84%9C%EB%B2%84)
	- [👯‍♂️ ec2배포](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20%08ec2%EB%B0%B0%ED%8F%AC)
- [👯‍♂️ Conclustion](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20Conclustion)
- [👯‍♂️ Ref](#%F0%9F%91%AF%E2%80%8D%E2%99%82%EF%B8%8F%20Ref)

[영상-테크팀-AWS에 마크서버배포-20230419](https://www.youtube.com/watch?v=LBj14CoFwyQ)

--- 

## 👯‍♂️ aws+마인크래프트 바닐라서버


### 👯‍♂️ aws 비용계산(240208기준)

- [aws pricing calculator](https://calculator.aws/#/createCalculator/ec2-enhancement?nc2=pr)

| ap-northeast-2a 달에 대략 44.79 USD |
| ---- |
| ec2<br>- 4GB(t4g.nano, 온디맨드) |
| EBS 블록스토리지 크기<br>(Storage amount)<br>- 20GB |
| 데이터 전송<br>인스턴스 밖으로 데이터 빼낼 때 사용되는 것도 비용부과됨<br>(Data transfer)<br>-outbound data tranfer Internet 100GB |

만약에 메모리크기 8GB 정도로 늘리면 68.08 USD 예상

### 👯‍♂️ ec2배포

- default vpc 생성
- 인바운드 규칙; 들어오는 패킷에 대한 규칙
- 기본적으로 모든 트래픽이 왔다 갔다 할 수록 만들어져있는데 가상VM하나만 사용할것이므로 zero-trust 기존 삭제 후 아래 규칙 추가
	- 사용자지정 TCP, 25565, Anywhere IPv4
	- 사용자지정 UDP, 25565, Anywhere IPv4
	- 사용자지정 TCP, 22, Anywhere IPv4
	- 사용자지정 UDP, 443 , Anywhere IPv4


- Here is a simple footnote [^1]:  With some additional text after it.

## 👯‍♂️ Conclustion

Summarize the main points and conclude your post.

--- 

## 👯‍♂️ Ref

- [^1]:  작성자. "제목," 사이트명, 발행날짜, [URL](www.naver.com)

