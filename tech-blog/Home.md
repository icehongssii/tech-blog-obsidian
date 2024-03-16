
# Git Commits 24시간마다

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