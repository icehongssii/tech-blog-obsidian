
```dataview
TABLE without id
t+"("+length(rows.file.link)+")" as tags, rows.file.name
FROM "2. posts/blogs"
FLATTEN file.tags as t
GROUP BY t
SORT length(rows.file.link) DESC
```
