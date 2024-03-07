```
<%*  
const dv = app.plugins.plugins["dataview"].api;  
const filename = "Recently Edited";  
const query = `TABLE WITHOUT ID  
file.link AS Note
FROM "posts/회사리스트"  
LIMIT 7`;

const tFile = tp.file.find_tfile(filename);  
const queryOutput = await dv.queryMarkdown(query);

// write query output to file  
await app.vault.modify(tFile, queryOutput.value);  
%>
```