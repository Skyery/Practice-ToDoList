class Todolist{
    constructor(dataBase,dataBaseDone){
        this.dataBase = dataBase;
        this.dataBaseDone = dataBaseDone;
    }
    newlist(newInput){
        if(newInput.trim() === ''){
            alert('請輸入代辦事項');
            return;
        }
        let todo = { content: newInput };
        this.dataBase.push(todo);
        this.updatelist();
        localStorage.setItem('listItem', JSON.stringify(this.dataBase));
    }
    updatelist(){
        let str = '';
        for(let i = 0; i < this.dataBase.length; i++){
            str +=
            `<li class="listitem">
                <div class="left">
                    <input data-chknum=`+ i +` class="chkbox" type="checkbox">
                    <label>`+ this.dataBase[i].content +`</label>
                    <input class="input edit-disable" type="text">
                </div>
                <div class="right">
                    <button data-editnum=`+ i +` class="edit">Edit</button>
                    <button data-delnum=`+ i +` class="delete">Delete</button>
                </div>
            </li>`
        }
        inComplete.innerHTML = str;
    }
    updatecompleted(){
        let str = '';
        for(let i = 0; i < this.dataBaseDone.length; i++){
            str += 
            `<li class="listitem completed">
                <div class="left">
                    <input data-chknum=`+ i +` class="chkbox" type="checkbox" checked>
                    <label class="completed-list">`+ this.dataBaseDone[i].content +`</label>
                    <input class="input edit-disable" type="text">
                </div>
                <div class="right">
                    <button data-editnum=`+ i +` class="edit">Edit</button>
                    <button data-delnum=`+ i +` class="delete">Delete</button>
                </div>
            </li>`
        }
        completed.innerHTML = str;
    }
    deletelist(e){
        const num = e.target.dataset.delnum;

        if(e.currentTarget.id === 'incomplete'){
            this.dataBase.splice(num, 1);
            localStorage.setItem('listItem', JSON.stringify(this.dataBase));
            this.updatelist();
        }else if(e.currentTarget.id === 'completed'){
            this.dataBaseDone.splice(num, 1);
            localStorage.setItem('completed', JSON.stringify(this.dataBaseDone));
            this.updatecompleted();
        }
    }
    toggleList(e){
        const label = e.target.parentNode.getElementsByTagName('label')[0];
        const num = e.target.dataset.chknum;
        if(e.target.checked){
            // console.log('completed');
            let com = { content:label.textContent };

            this.dataBase.splice(num, 1);
            this.dataBaseDone.push(com);
            localStorage.setItem('listItem', JSON.stringify(this.dataBase));
            localStorage.setItem('completed', JSON.stringify(this.dataBaseDone));
            
            this.updatelist();
            this.updatecompleted();
        }else{
            // console.log('inComplete');
            let todo = { content:label.textContent };

            this.dataBase.push(todo);
            this.dataBaseDone.splice(num, 1);
            localStorage.setItem('listItem', JSON.stringify(this.dataBase));
            localStorage.setItem('completed', JSON.stringify(this.dataBaseDone));
            
            this.updatelist();
            this.updatecompleted();
        }
    }
    toggleEdit(e){
        const input = e.target.parentNode.parentNode.getElementsByClassName('input')[0];
        const num = e.target.dataset.editnum;

        if(input.classList.contains('edit-disable')){
            // console.log('disable');
            input.classList.toggle('edit-disable');
        }else{
            // console.log('enable');
            if(e.currentTarget.id === 'incomplete'){
                if(input.value.trim()){
                    this.dataBase[num].content = input.value;
                    localStorage.setItem('listItem', JSON.stringify(this.dataBase));
                    this.updatelist();
                }
            }else if(e.currentTarget.id === 'completed'){
                if(input.value.trim()){
                    this.dataBaseDone[num].content = input.value;
                    localStorage.setItem('completed', JSON.stringify(this.dataBaseDone));
                    this.updatecompleted();
                }
            }
            input.classList.toggle('edit-disable');
        }
    }
    DOMSelector(e){
        switch(e.target.className){
            case 'edit':
                this.toggleEdit(e);
                break;
            case 'delete':
                this.deletelist(e);
                break;
            case 'chkbox':
                this.toggleList(e);
                break;
            default:
                break;
        }
    }
}

const newInput = document.getElementById('new-list');
const addBtn = document.getElementsByTagName('button')[0];
const inComplete = document.getElementById('incomplete');
const completed = document.getElementById('completed');
const dataBase = JSON.parse(localStorage.getItem('listItem')) || [];
const dataBaseDone = JSON.parse(localStorage.getItem('completed')) || [];

const todolist = new Todolist(dataBase, dataBaseDone);

todolist.updatelist();
todolist.updatecompleted();

addBtn.addEventListener('click', () => {
    todolist.newlist(newInput.value);
    newInput.value = '';
})

inComplete.addEventListener('click', (e) => {
    todolist.DOMSelector(e);
});

completed.addEventListener('click', (e) => {
    todolist.DOMSelector(e);
});