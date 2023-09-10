# OnlineNotebook
online netbook system with javascript

## Global Variables
- 如果 html 有要新增區塊元素要改的，同時只能顯示一個區塊
  - html
    - 新增 element. ex. `div`
  - js 
    - `let show_elements = ["new_sort", "tab", "new_note", "show_note", "update_note"];`
  - css
    - 區塊的 id 加入最下面
   
- note 資料
  - `let note_total = [];`
    -  格式 :  `[[index, title, content]]`

## function
- note 資料加入 button
  - `addBtInData(note_total, [["閱覽", "insertEvent"], ["修改", "updateEvent"], ["刪除", "deleteEvent"]]); // 加 3 個 button`
  - - button 數量有變，記得要去 html `tab` 的 table 新增 `<td>` 的 event
   
-  data 放入 table
  - `putInTable(data, table_id)`
  - 如果有部分不顯示，在這邊設 if
    ```
    // 從第二筆開始, 第一筆 = index
    for (let j = 1;j < td_num+1;j++) {
        td_content += 
        "<td>" + data[i][j] +
        "</td>";
    }
    ```
