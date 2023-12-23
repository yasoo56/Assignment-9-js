var bookname = document.querySelector('#bookname')
var bookurl = document.querySelector('#bookurl')
var submitBtn = document.querySelector('#submitbtn')
var updateBtn = document.querySelector('#updatebtn')
var closeBtn = document.querySelector('.btn-close')
var searchInp = document.querySelector('#searchinput')
var model = document.querySelector('.box')
// console.log(bookname)
var visitBtn = document.querySelector('.visit')
var indexGlobal = 0
var bookList = []
if (localStorage.getItem('data') != null) {
    bookList = JSON.parse(localStorage.getItem('data'))
    showInfo()
}
function addInfo() {

    if (validationName() == true && validationUrl() == true) {
        var book = {
            name: bookname.value,
            url: bookurl.value
        }
        bookList.push(book)
        localStorage.setItem('data', JSON.stringify(bookList))
        clearInfo()
        showInfo()

    } else {
        showBtn()
    }
}
submitBtn.addEventListener('click', addInfo)
function showInfo() {
    var temp = ''
    for (var i = 0; i < bookList.length; i++) {
        temp += ` <tr>
        <td>`+ i + `</td>
        <td>`+ bookList[i].name + `</td>
        <td><button class="btn btn-success visit" onclick="openUrl(`+ i + `)">
          <i class="fa-solid fa-eye pe-2" ></i>Visit
        </button></td>
        <td><button class="btn btn-warning text-white" onclick="setInfo(`+ i + `)">Update</button></td>
        <td><button class="btn btn-danger pe-2" onclick="deleteInfo(`+ i + `)">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button></td>
      </tr>`
    }
    document.querySelector('#dataInfo').innerHTML = temp
}
function clearInfo() {
    bookname.value = ''
    bookurl.value = ''
}

function deleteInfo(index) {
    bookList.splice(index, 1)
    localStorage.setItem('data', JSON.stringify(bookList))
    showInfo()
}
function openUrl(even) {

    window.open(bookList[even].url, "_blank")
}


function setInfo(ind) {
    indexGlobal = ind
    var currentItem = bookList[ind]
    bookname.value = currentItem.name
    bookurl.value = currentItem.url
    submitBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
}
function updateInfo() {
    if (validationName() == true && validationUrl() == true) {
        var book = {
            name: bookname.value,
            url: bookurl.value
        }
        bookList.splice(indexGlobal, 1, book)  //replace
        localStorage.setItem('data', JSON.stringify(bookList))
        clearInfo()
        showInfo()
        submitBtn.classList.remove('d-none')
        updateBtn.classList.add('d-none')
    } else {
        showBtn()
    }
}
updateBtn.addEventListener("click", updateInfo)
bookname.addEventListener('input', validationName)
function validationName() {
    var rgexName = /^\w{3,}(\s+\w+)*$/
    var text = bookname.value
    if (rgexName.test(text) == true) {
        bookname.classList.add('is-valid')
        bookname.classList.remove('is-invalid')
        return true
    } else {
        bookname.classList.add('is-invalid')
        bookname.classList.remove('is-valid')
        return false
    }
}
bookurl.addEventListener('input', validationUrl)
function validationUrl() {
    var rgexName = /^(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?$/;
    var text = bookurl.value
    if (rgexName.test(text) == true) {
        bookurl.classList.add('is-valid')
        bookurl.classList.remove('is-invalid')
        return true
    } else {
        bookurl.classList.add('is-invalid')
        bookurl.classList.remove('is-valid')
        return false
    }
}
function searchInfo() {
    var searchVal = searchInp.value.toLowerCase()
    var temp = ''
    for (var i = 0; i < bookList.length; i++) {
        if (bookList[i].name.toLowerCase().includes(searchVal))
            temp += ` <tr>
        <td>`+ i + `</td>
        <td>`+ bookList[i].name.toLowerCase().replace(searchVal, "<span class='bg-danger'>" + searchVal + "</span>") + `</td>
        <td><button type="button" class="btn btn-success visitBtn" onclick="visitUrl(`+ i + `)"><i class="fa-solid fa-eye pe-2"></i>
          Visit</button></td>
        <td><button type="button" class="btn btn-warning updateBtn" onclick="setInfo(`+ i + `)" >Update</button></td>
        <td><button type="button" class="btn btn-danger deleteBtn" onclick="deleteInfo(`+ i + `)">
          <i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
      </tr>`
    }
    document.querySelector('#dataInfo').innerHTML = temp
}
searchInp.addEventListener('input', searchInfo)
function close() {
    model.classList.add('d-none');
}
closeBtn.addEventListener('click', close)
function showBtn() {
    model.classList.remove('d-none')
}
document.addEventListener('keydown', function (event) {
    if (event.key == 'Escape' || event.key == 'Y') {
        close();
    }
})
document.addEventListener('click', function (event) {
    if (event.target.id == 'model') {
        close();
    }
})



