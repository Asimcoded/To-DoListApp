let root = document.querySelector(':root');
let btn = document.querySelector("#mode");
let modeImg = document.querySelector('.togglecontainer img');
let addboxImg = document.querySelector('.addbox img');
btn.addEventListener("click", () => {
    if (btn.checked) {
        root.style.setProperty('--gradient-color-light-one', '#41295a');
        root.style.setProperty('--gradient-color-light-two', '#2F0743');
        root.style.setProperty('--primary-color', '#fff');
        root.style.setProperty('--primary-color-hover', '#fffffff1');
        root.style.setProperty('--secondary-color', '#771da5');
        root.style.setProperty('--secondary-color-hover', '#59157a');
        root.style.setProperty('--checked-img', `url('assets/icons/checked-light.svg')`)
        modeImg.src = "css/assets/icons/sun-white.svg";
        addboxImg.src = "css/assets/icons/cross-circle-white.svg"
    }
    else {
        root.style.setProperty('--gradient-color-light-one', '#240148');
        root.style.setProperty('--gradient-color-light-two', '#100018');
        root.style.setProperty('--primary-color', '#000');
        root.style.setProperty('--primary-color-hover', '#000000f1');
        root.style.setProperty('--secondary-color', '#A52BE2');
        root.style.setProperty('--secondary-color-hover', '#8825b9');
        root.style.setProperty('--checked-img', `url('assets/icons/checked-dark.svg')`)
        modeImg.src = "css/assets/icons/moon.svg";
        addboxImg.src = "css/assets/icons/cross-circle-black.svg"
    }
})

const inputBox = document.querySelector('.addbox input');
const addButton = document.querySelector('.addbox button');
const listBox = document.getElementById('listbox');
const doneButton = document.getElementById('done');
const clearButton = document.getElementById('clear')

function addlist(){
    if (inputBox.value == '') {
        document.querySelector('.addbox').style.border = "2px solid red";
    }
    else {
        document.querySelector('.addbox').style.border = "0";
        let list = document.createElement('div');
        list.setAttribute('class', 'list');
        let listContent = `
        <div class="list-content">
        <input type="checkbox" class="check-box">
        <span>${inputBox.value}</span>
        </div>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <g clip-path="url(#clip0_3_105)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15 28.125C7.75125 28.125 1.875 22.2469 1.875 15C1.875 7.75313 7.75125 1.875 15 1.875C22.2488 1.875 28.125 7.75313 28.125 15C28.125 22.2469 22.2488 28.125 15 28.125ZM15 0C6.71531 0 0 6.7125 0 15C0 23.2875 6.71531 30 15 30C23.2847 30 30 23.2875 30 15C30 6.7125 23.2847 0 15 0ZM20.3597 9.63753C19.9903 9.2719 19.3931 9.2719 19.0237 9.63753L14.9944 13.6687L11.0231 9.69372C10.6566 9.32809 10.0622 9.32809 9.69749 9.69372C9.33093 10.0593 9.33093 10.6594 9.69749 11.025L13.6688 14.9906L9.6694 18.9938C9.30096 19.3594 9.30096 19.9593 9.6694 20.3343C10.0388 20.6999 10.6369 20.6999 11.0062 20.3343L15.0056 16.3313L18.9769 20.3063C19.3434 20.6719 19.9378 20.6719 20.3034 20.3063C20.67 19.9407 20.67 19.3406 20.3034 18.975L16.3312 15.0094L20.3597 10.9781C20.7281 10.6031 20.7281 10.0125 20.3597 9.63753Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_3_105">
                    <rect width="30" height="30" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
        </button>`;
        list.innerHTML = listContent;
        listBox.prepend(list);
    }
    inputBox.value = '';
    saveData();
}
inputBox.addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        e.preventDefault()
        addlist();
    }
})
addButton.addEventListener("click",addlist)

listBox.addEventListener('click', function (e) {
    if (e.target.tagName === "INPUT") {
        if (e.target.checked == true) {
            e.target.setAttribute('checked', true);
        }
        else {
            e.target.removeAttribute('checked');
        }
    }
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
    }
    if (e.target.tagName === "svg") {
        e.target.parentElement.parentElement.remove();
    }
    console.log(e)
    saveData();
})

doneButton.addEventListener('click', () => {
    const boxs = document.getElementsByClassName('check-box')
    console.log(boxs);
    for (let i in boxs) {
        if (boxs[i].checked == false) {
            boxs[i].setAttribute("checked", true);
        }
    }
    saveData();
});

clearButton.addEventListener('click', () => {
    if (listBox.innerHTML === '') {
        alert("There is no Task to clear");
    }
    else {
        let conformation = confirm("You want to delete all tasks ?");
        if (conformation == true) {
            localStorage.clear()
            listBox.innerHTML = '';
        }
    }
})
function saveData() {
    localStorage.setItem("data", listBox.innerHTML);
}
function showlist() {
    listBox.innerHTML = localStorage.getItem('data');
}
showlist()