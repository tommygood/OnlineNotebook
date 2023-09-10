// team0xx.js, change the xx to the team number

// global variable
let nowDate = moment(new Date()).format('YYYY-MM-DD');
let nextDate = moment().add(1, "days").format('YYYY-MM-DD');
// all sort
let sort_total = [];

// all note, [[index, title, content]]
let note_total = [];

// initial table
let init_tab = getId("tab").innerHTML; 

// all elements will show on, use for hide and show the specify element only
let show_elements = ["new_sort", "tab", "new_note", "show_note", "update_note"];

// current update id
let update_id;

// function start ----

// 用 id get element
function getId(id) {
    return document.getElementById(id);
}

// 獲得資料
/*
function getDataTest() {
    data = [[1, "good"], [2, "cat"]];
    // 幫每一筆 data 最後加入哪些 [button, 對應的 onclick function]。button 數量有變，記得要去 html table 新增 
    data = addBtInData(data, [["閱覽", "insertEvent"], ["修改", "updateEvent"], ["刪除", "deleteEvent"]]); // 加 3 個 button
    return data;
}
*/

// 獲得資料
function getData() {
    // 幫每一筆 data 最後加入哪些 [button, 對應的 onclick function]。button 數量有變，記得要去 html table 新增 
    data = addBtInData(note_total, [["閱覽", "insertEvent"], ["修改", "updateEvent"], ["刪除", "deleteEvent"]]); // 加 3 個 button
    return data;
}

// 幫每一筆 data 最後加入哪些 button
function addBtInData(origin_data, types) {
    let data = structuredClone(origin_data); // deep clone the global data
    // 每一筆 data
    for (let i = 0;i < data.length;i++) {
        // 每一種 button
        for (let j = 0;j < types.length;j++) {
            // button id = row_column
            // make id not collision
            let random_id = getRandomInt(200) + getRandomInt(500);
            let id_content = `id${random_id}_` + data[i][0] + "_" + j;
            // 把 type name 放入 button
            let bt_name = types[j][0];
            // bt 觸發的 event
            let bt_event = types[j][1];
            let button_content = `<button id = "${id_content}" onclick = "${bt_event}(${id_content})">${bt_name}</button>`;
            // push in data
            data[i].push(button_content);
        }
    }
    return data;
}

// get random int
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// insert event
function insertEvent(e) {
    // id
    var id = e.id;
    console.log(e);
    console.log(id);
    // get index from id
    let index = getElementIndex(id);
    // show this note content
    alert(note_total[index][2]);
}

// update event
function updateEvent(e){
    // id
    var id = e.id;
    console.log(id);   
    // 更新筆記
    // 顯示更新筆記
    switchBlock("update_note");
    // 新增 options into select columns
    setSelectCol("update_sort_select");
    // current update id
    update_id = getElementIndex(id);
    // 帶入原始內容
    putOriginContent();
}

// 帶入原始內容
function putOriginContent() {
    let origin_content = note_total[update_id]; // get origin data
    getId("update_note_title").value = origin_content[1]; // title
    getId("update_note_content").value = origin_content[2]; // content
}

// update note submit
function updateNote() {
    // get update content
    let title = getId("update_note_title").value;
    let content = getId("update_note_content").value;
    // update data
    note_total[update_id] = [update_id, title, content];
    // 
    alert("更改成功");
}

// delete event
function deleteEvent(e){
    // id
    var id = e.id;
    console.log(id);   
    let index = getElementIndex(id);
    // remove from array
    note_total.splice(index,1);
    // refresh table
    nodeList1();
    // 
    alert("刪除成功");
}

// get real element index, means in which row
function getElementIndex(id) {
    return id.split("_")[1];
} 

// 把資料放進指定 table
function putInTable(data, table_id) {
    console.log(data);
    // clean table first
    cleanTable(table_id);
    // get table element
    let table = getId(table_id);
    // 此 table element 有幾個 td
    let td_num = getTdNum(table);
    // put data in table
    for (let i = 0;i < data.length;i++) {
        // tr, a row
        table.innerHTML += "<tr>";
        // loop to get td content
        td_content = "";
        // 從第二筆開始, 第一筆 = index
        for (let j = 1;j < td_num+1;j++) {
            td_content += 
            "<td>" + data[i][j] +
            "</td>";
        }
        // add td content to table
        table.innerHTML += td_content;
        table.innerHTML += "</tr>";
    }
}

// clean the table
function cleanTable(table_id) {
    getId(table_id).innerHTML = init_tab;
}

// 此 table element 有幾個 td
function getTdNum(table) {
    var td_num = 0;
    var table_td = table.childNodes[1].childNodes[0].childNodes;
    for (let i = 0;i < table_td.length;i++) {
        if (table_td[i].tagName == "TD") 
            td_num += 1;
    }
    return td_num;
}

// node list button onclick event

function nodeList1(e) {
    console.log(e);
    // 清空 table
    // 放入筆記 data
    // 把資料放進指定 table
    // 二維 array, table id
    putInTable(getData(), "tab");
    // 顯示 tab
    switchBlock("tab");
}

function nodeList2(e) {
    console.log(e);
    // 新增分類
    // 移除 tab
    // 顯示新增分類 div
    switchBlock("new_sort");
}

function nodeList3(e) {
    console.log(e);
    // 新增筆記
    // 顯示新增筆記
    switchBlock("new_note");
    // 新增 options into select columns
    setSelectCol("sort_select");
}

// 新增 options into select columns
function setSelectCol(sort_id) {
    // select element
    let select = getId(sort_id);
    // add options
    for (let i = 0;i < sort_total.length;i++){
        let opt = document.createElement('option');
        opt.innerHTML = sort_total[i];
        select.appendChild(opt);
    }
}

// submit new note
function addNewNote() {
    // get input data
    let title = getId("note_title").value;
    let content = getId("note_content").value;
    // get current data index
    let index = note_total.length;
    // push into data
    note_total.push([index, title, content]);
    //
    alert("新增成功");
}

function nodeList4(e) {
    console.log(e);
    // 查詢筆記
    // 顯示查詢筆記
    switchBlock("show_note");
    // 清空查詢資料
    cleanTable("query_result");
    getId("query_content").value = "";
}

// 查詢筆記用 title
function queryNote() {
    // query content
    let query_content = getId("query_content").value;
    // query result
    let query_result = getId("query_result");
    // search for this title
    let all_search_result = [];
    for (let i = 0;i < note_total.length;i++) {
        let title = note_total[i][1];
        // find the same title
        if (title == query_content) {
            console.log([note_total[i]]);
            // add onclick button
            let data = addBtInData([note_total[i]], [["閱覽", "insertEvent"], ["修改", "updateEvent"], ["刪除", "deleteEvent"]]); // 加 3 個 button
            // then put into query result
            all_search_result = all_search_result.concat(data);
        }
    }
    // if find at least one result, put it in table
    if (all_search_result.length > 0)
        putInTable(all_search_result, "query_result");
}

// add new sort 
function addNewSort() {
    // 新增 sort 到 global variable
    let data = getId("sort_input").value;
    sort_total.push(data);
    //
    alert("新增成功");
}

// show the one, hiding the others elements will show on
function switchBlock(show) {
    // 移除 others
    for (let i = 0;i < show_elements.length;i++) {
        let hide = getId(show_elements[i]);
        hide.style.display = "none";
    }
    // 顯示 specify element
    show = getId(show);
    show.style.display = "table";
}

// 把資料放進指定 table
// 二維 array, table id
//putInTable(getData(), "tab");