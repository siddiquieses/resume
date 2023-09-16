console.log("Assalam O Alikum");

function signUpForm() {
    var signUpForm = document.getElementById('SignUpForm');
    signUpForm.style.display = "block";
}

// var inputEmail = document.getElementById('inputEmail').value;

var loginForm = document.getElementById('loginForm');
// loginForm.style.display = "none";

var signUpForm = document.getElementById('SignUpForm');
// signUpForm.style.display = "none";

let prevStudents = localStorage.getItem("record");
let record = prevStudents ? JSON.parse(prevStudents) : [];

function signUp() {
    var inputEmail = document.getElementById('inputEmail').value;
    var inputPassward = document.getElementById('inputPassward').value;
    var chck = 0;
    record.find((element) => {
        if (element.inputEmail === inputEmail) {
            chck = 1; return;
        }
    });
    if (!(inputEmail && inputPassward)) {
        Swal.fire('FILL BOTH FEILD')
    }
    else if (!(inputEmail.includes('@'))) {
        Swal.fire('ENTER EMAIL')
    }
    else if (!(inputPassward.length > 6)) {
        Swal.fire('ENTER STRONG PASSWARD')
    }
    else if (chck) {
        Swal.fire('USER ALREADY EXISTS')
        return;
    }
    else if (!chck) {
        let data = {
            inputEmail,
            inputPassward
        };
        record.push(data);
        let stringify = JSON.stringify(record);
        localStorage.setItem("record", stringify);
        console.log(record);
        // hideForm();
        // loginForm.style.display = "block";
        window.location.href = "index.html"
    }
}
function hideForm() {
    var hide = document.getElementById('SignUpForm')
    hide.style.display = "none";
}
function login() {
    var flag = 0;
    var inputLoginEmail = document.getElementById('inputLoginEmali').value;
    var inputLoginPassward = document.getElementById('inputLoginPassward').value;
    // getUserName.push(inputLoginEmail)
    record.forEach(value => {
        if (value.inputEmail == inputLoginEmail && value.inputPassward == inputLoginPassward) {
            console.log("Alhumdulillah");
            localStorage.setItem("UserName", 'inputLoginEmail')
            flag = 1;
        }
    });
    if (!(inputLoginEmail && inputLoginPassward)) {
        Swal.fire('FILL BOTH FEILD')
    }
    // else if (flag) {
    else if (flag) {
        loginForm.style.display = "none";
        localStorage.setItem("UserName", inputLoginEmail)
        window.location.href = "todo.html"
    }
    else if (flag == 0) {
        Swal.fire({
            icon: 'error',
            text: 'WRONG INPUT!',
          })
    }
}


console.log("ASSALAM O ALIKUM")


const inputTodo = document.getElementsByClassName('inputVal')[0];

const addTaskBtn = document.getElementsByClassName('btn')[0];

var user = localStorage.getItem("UserName");
var taskList = [{
    userName: user,
    inputTodo: inputTodo.value
}]
console.log("taskList isss ", taskList)
console.log(taskList)

let prevStud = localStorage.getItem("recordData");
let recordData = prevStud ? JSON.parse(prevStud) : [];

addTaskBtn.addEventListener('click', function () {
    if (inputTodo.value.trim() != 0) {
        let localItems = JSON.parse(localStorage.getItem('localItem'))
        if (localItems === null) {
            taskList = []

        } else {
            taskList = localItems;
        }
        taskList.push(inputTodo.value)
        localStorage.setItem('localItem', JSON.stringify(taskList));

        let dataa = {
            user,
            inputTodo: inputTodo.value
        };
        recordData.push(dataa);
        let stringify = JSON.stringify(recordData);
        localStorage.setItem("recordData", stringify);
        console.log("Record data:  ", recordData);
    }

    showItem();
})
var getUserName = [];
// var user = localStorage.getItem("UserName");
function showItem() {
    // console.log("Value is ",getUserName)
    // console.log("user is ",user)
    // console.log(record)
    let localItems = JSON.parse(localStorage.getItem('recordData'))
    if (localItems === null) {
        taskList = []

    } else {
        taskList = localItems;
    }


    let html = '';
    let itemShow = document.querySelector('.todoLists');
    recordData.forEach((data, index) => {
        if (recordData[index].user.includes(user)) {
            html += `
   <div class="todoList">
   <p class="pText">${data.inputTodo}</p>
   <button class="deleteTask" onClick="deleteItem(${index})">x</button>
   </div>
   `}
        else { }
    })
    itemShow.innerHTML = html;
    console.log("taskList isss ", taskList)
}
showItem()

function deleteItem(index) {
    let localItems = JSON.parse(localStorage.getItem('recordData'))
    recordData.splice(index, 1)
    localStorage.setItem('recordData', JSON.stringify(recordData));
    showItem()
}

function clearTask() {
    // localStorage.clear()
    recordData.forEach((data, index) => {
        if (recordData[index].user.includes(user)) {
            recordData.splice(index, 1)
            localStorage.setItem('recordData', JSON.stringify(recordData));
            showItem()
        }
    })
    showItem()
}


