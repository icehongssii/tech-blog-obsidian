---
title: mysql 쿼리최적화
created: 2024-03-18 18:25
last-updated: 2024-03-18 18:25
tags:
  - mysql
  - troubleshooting
  - db
description: 그냥 offset만 사용시 성능저하 문제 생길수도있다. late row lookup
---


## 👯‍♂️ 10개행 조회하는데 왜 느린가?

AWS sqs에 조건에 맞는 영화 series_id를 넣고 ECS task가 해당 id들을 수신해서 작업을 진행해야했다 .. 

이때 series_id 10개 씩을 가져올때 페이징 처리를 해야하는데 어떻게 할까 고민하다가 일단 `offset`을 사용해봤다. 

<mark style="background: #FFF3A3A6;">근데.. 고작 10개 조회하는데 결과가 10초 이상 걸린다 이거 왜이리 느린지?</mark>

```sql
select * from movie_data 
order by series_id ASC 
limit 10 
offset 200000
```



또 다른 케이스가 있다.(id가 PK) 아래 쿼리는 불러오는데 약 1분정도 소요되지만 
```sql
select * from haberler order by id desc limit 40000,10; 
```

반면  아래 쿼리는 몇ms만에 실행됨

```sql
select * from haberler order by id desc limit 20,10;
```

<mark style="background: #FFF3A3A6;">두 개의 쿼리 모두 id로 정렬후 10개를 조회하는건데 왜 속도 차이가 있지?</mark>


## 👯‍♂️ 원인

일단 `offset`작동방식 생각하면  이해하기 쉽다 

- limit : 행을 얼마나 가져올지
- offset : 어디서 부터 가져올지

```sql
select * from haberler order by id desc limit 40000,10;
select * from haberler order by id desc limit 20,10;
```

그러니까 id로 정렬 후 둘 다 10개를 가져오는건 차이가 없지만 엔진에서 읽어야하는 레코드 양 차이가 있다

- `limit 40000, 10` ->   40010개 레코드 읽고 이중 처음 10개만 가져온다
- `limit 20, 10` ->  30개 레코드 읽고 이중 처음 10개만 가져온다

1. 적은양 데이터 조회시  offset은 성능 문제 없지만 전체 읽어야하는 레코드 수가 많아질 수록 성능에 문제가 생긴다. `offset 1000` 이라면 첫번쨰 1000개 레코드 읽고 버려야함
2. 인덱스 사용 비효율; offset이 클 때 (=읽어야하는 레코드가 많을떄) 해당위치까지 도달하기 위해 많은 양 데이터 스캔해야하는데 이 과정에서 인덱스 효율적으로 사용하기 힘들 수도 있다

그래서 당연히 `limit 40000, 10`가 느리다.. 


## 👯‍♂️ 해결방법1; Late Row Lookup


```sql SELECT  *
FROM    news
WHERE   cat_id = 4
ORDER BY
        id DESC
LIMIT   150000, 10
```

첫 번째 쿼리는 150,010개의 행을 ID 순서대로 가져와서 그 중 처음 10개를 반환해야함  
즉, 레코드가 10개만 필요하지만 처음 150,000개는 순서 계산해야 함


- 모든 쿼리는 인덱스가 아닌 테이블에 대해 실행되고 옵티마이저가 인덱스 사용 여부를 결정
- 인덱스는 테이블 일부를 저장하는 테이블의 섀도 복사본

![](https://i.imgur.com/eG8fhiG.png)
- 논리적으로 테이블 일주부지만 물리적으로 테이블과 별도로 존재함
	- 인덱스 키 =  즉 인덱스가 생성된 열
	- 테이블 포인터 =  레코드가 나타내는 행을 고유하게 식별하는 값입니다. (InnoDB에서 PK)
- 인덱스 레코드는<mark style="background: #FFF3A3A6;"> B-Tree 구조로 저장되므로 참조 및 범위 검색이 매</mark>우 빠릅니다.
- 인덱스는 테이블 부분 집합이므로 모든 데이터가 포함되어 있지 않다. 따라서 순서 유지하면서 실제 값 찾으려면 <mark style="background: #FFF3A3A6;">인덱스 테이블과 원본 테이블 Join 필요 </mark>


![](https://i.imgur.com/ujT5VQB.png)

- 위처럼  DB 엔진은 각 인덱스 레코드에 상응하는 테이블 레코드를 찾아 인덱싱이 되지 않은 모든 데이터를 반환해야함
- <mark style="background: #FFF3A3A6;">인덱스 레코드에 해당하는 테이블 레코드를 가져오는 프로세스를 row lookup라고 합니다</mark>. 인덱스와 테이블을 연결하는 곡선 화살표

그런데 당연하게도 이러한 과정은 오래 걸린다  
왜냐면 인덱스 레코드와 테이블 레코드는 메모리와 디스크에서 서로 멀리 떨어져있기 때문.  
따라서 행 조회는 sequential access보다 더더 많은 페이지 누락, 캐시 누락 및 디스크 탐색으로 이어지며 따라서 비용이 상당히 많이 든다!!

따라서  모든 레코드를 반환하는 일반 쿼리를 수행한다면 당연히 모든 레코드를 가져와야 하고 각 행 조회가 필요하다....


### Late Row Looup

근데 잠깐.. 이런 Row lookup과정이 필요한가? 애초에 아래처럼 하면안되나?
```sql
id > 150000
limit 10
```
예를 들면 limit 8,2 쿼리라면 인덱스를 사용해 앞선 8개의 값은 무시하고 남은 2개만 반환하면 될 일입니다.  
![](https://i.imgur.com/Jc9ZVYA.png)

이 알고리즘이 훨씬 더 효율적인 알고리즘으로 많은 행 조회 횟수를 줄일 수 있다는 것을 알 수 있습니다.

이를 지연 행 조회라고 하는데, 엔진은 이를 피할 방법이 없는 경우에만 행을 조회해야 합니다. 인덱싱된 필드만 사용하여 행을 필터링할 가능성이 있는 경우, 실제 MySQL 테이블에서 행을 조회하기 전에 이 작업을 수행해야 합니다. 그냥 버리기 위해 테이블에서 레코드를 가져오는 것은 의미가 없습니다.

그러나 MySQL은 항상 인덱스에서 값을 확인하기 전에 행을 검색하는 초기 행 조회를 수행하며, 심지어 최적화 프로그램에서도 인덱스를 사용하기로 결정합니다.

## 👯‍♂️ 해결방법2; 키 기반 페이징(Keyset Pagination)


```sql
```




## 👯‍♂️ Ref & LINKS TO THIS PAGE

- https://explainextended.com/2009/10/23/mysql-order-by-limit-performance-late-row-lookups/
- https://elky84.github.io/2018/10/05/mysql/
- https://kawaii-jordy.tistory.com/9
-


