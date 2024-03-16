
# Git Commits 24시간마다

# Do not Change the Path of 2. Posts

```ad-danger
title: 2.posts 디렉토리 구조 바꾸면안됨 개인블로그에 올리는 목록이기때문

아래 형식 유지 필수 

- 2.posts/blogs
- 2.posts/html

```


# 최근에 생성한 글

```dataview
TABLE
FROM "0. inbox" or "1. stage" or "2. posts" 
WHERE file.cday >= date(today) - dur(7 days)
AND   !contains(file.path, "2. posts/html")
AND   !contains(file.path, "assets")
AND   !contains(file.path, "export")
AND   !contains(file.path, "scripts")

SORT file.cday DESC
```


# 최근에 편집한 글


```dataview
TABLE
FROM "0. inbox" or "1. stage" or "2. posts" 
WHERE file.mday >= date(today) - dur(7 days)
AND   !contains(file.path, "2. posts/html")
AND   !contains(file.path, "assets")
AND   !contains(file.path, "export")
AND   !contains(file.path, "scripts")

SORT file.mday DESC
```