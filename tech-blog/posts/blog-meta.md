

```

```



```dataview
TABLE without id
t+"("+length(rows.file.link)+")" as tags, rows.file.link
FROM "posts/blogs"
FLATTEN file.tags as t
GROUP BY t
SORT length(rows.file.link) DESC
```


