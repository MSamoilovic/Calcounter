//Storage
const StorageCtrl = (function(){
    return {
        storeItem: function(item) {
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
                items.push(item);
                
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                //Uzimanje iz local storage sa JSON.parse
                items = JSON.parse(localStorage.getItem(`items`));

                items.push(item);

                //Resetovanje local storage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function () {
            let items;
            if(localStorage.getItem('items')=== null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem(`items`));
            }

            return items
        }, 
        updateItemStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem(`items`));

            items.forEach((item, index) => {
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem); 
                }
            });

            localStorage.setItem(`items`, JSON.stringify(items));
        },

        deleteFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem(`items`));

            items.forEach((item, index) => {
                if(id === item.id){
                    items.splice(index, 1); 
                }
            });

            localStorage.setItem(`items`, JSON.stringify(items));
        },
        clearItemsFromStorage: function() {
            localStorage.removeItem(`items`);
        }
    }
})()
//List items
const ItemCtrl = (function () {
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        /* items: [
            /* { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Cookie', calories: 400 },
            { id: 2, name: 'Eggs', calories: 300 } */
        items : StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function () {
            return data.items
        },
        addItem: function (name, calories) {
            //console.log(name, calories);
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0;
            }
            //calories = parseInt(calories);
            newItem = new Item(ID, name, calories);
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function (id) {
            let mark = null;
            data.items.forEach((item) => {
                if (item.id === id) {
                    mark = item;
                }
            })

            return mark
        },
        updateItem: function (name, calories) {
            calories = parseInt(calories);
            let found = null;

            data.items.forEach((item) => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })

            return found;
        },
        deleteItem: function (id) {
           const ids = data.items.map((item)=> {
               return item.id;
           });

           const index = ids.indexOf(id);
           data.items.splice(index, 1);
        },
        clearItems : function() {
            data.items = []
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        gettotCal: function () {
            let total = 0;
            data.items.forEach((item) => {
                total += Number(item.calories);
            });

            data.totalCalories = total;
            return data.totalCalories;
        },
        logdata: function () {
            return data;
        }
    }
})();

const UICtrl = (function () {
    const Selectors = {
        itemList: '#item-list',
        addBtn: '#addItem',
        updateBtn: '#updateBtn',
        deleteBtn: '#deleteBtn',
        backBtn: '#backbtn',
        itemName: '#foods',
        itemCalories: '#calories',
        totalCalories: '.total-calorie',
        listItems: '#item-list li',
        clearBtn: '.btn-light'
    }

    return {
        populateList: function (items) {
            let html = '';
            items.forEach((item) => {
                html += `<li id="item-${item.id}" class="list-group-item">
                <strong>${item.name} :</strong>
                <em> ${item.calories} kcal</em>
                <a href="" class="">
                    <i class=" edit-item fas fa-pencil-alt"></i>
                </a>
              </li>`
            });

            document.querySelector(Selectors.itemList).innerHTML = html;
        },
        getSelectors: function () {
            return Selectors;
        },
        addListItem: function (item) {
            //Pokazi listu
            document.querySelector(Selectors.itemList).style.display = 'block';
            //Kreiranje li elementa od itema
            const li = document.createElement('li');
            li.id = `item-${item.id}`;
            li.className = 'list-group-item';
            li.innerHTML = `<strong>${item.name} :</strong>
            <em> ${item.calories} kcal</em>
            <a href="" class="">
                <i class="edit-item fas fa-pencil-alt"></i>
            </a>`;
            //Insertovanje itema
            document.querySelector(Selectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateItem: function (item) {
            let listItems = document.querySelectorAll(Selectors.listItems);
            //console.log(listItems);
            listItems = Array.from(listItems);
            listItems.forEach((listItem) => {
                const itemId = listItem.getAttribute('id');

                if (itemId === `item-${item.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name} :</strong>
                    <em> ${item.calories} kcal</em>
                    <a href="" class="">
                        <i class="edit-item fas fa-pencil-alt"></i>
                    </a>`;;
                }
            })
        },
        clearListItems: function() {
            let listItems = document.querySelectorAll(Selectors.listItems);
            listItems = Array.from(listItems);
            listItems.forEach((item)=> {
                item.remove();
            });
        },
        deleteListItem: function(id) {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },
        clearFields: function () {
            document.querySelector(Selectors.itemName).value = '';
            document.querySelector(Selectors.itemCalories).value = '';
        },
        showButtons: function () {
            document.querySelector(Selectors.updateBtn).style.display = 'inline';
            document.querySelector(Selectors.deleteBtn).style.display = 'inline';
            document.querySelector(Selectors.backBtn).style.display = 'inline';
            document.querySelector(Selectors.addBtn).style.display = 'none';
        },
        addItemtoForm: function () {
            document.querySelector(Selectors.itemName).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(Selectors.itemCalories).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showButtons();

        },
        hideList: function () {
            document.querySelector(Selectors.itemList).style.display = 'none'
        },
        showtotCal: function (totalCalories) {
            document.querySelector(Selectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function () {
            UICtrl.clearFields();
            document.querySelector(Selectors.updateBtn).style.display = 'none';
            document.querySelector(Selectors.deleteBtn).style.display = 'none';
            document.querySelector(Selectors.backBtn).style.display = 'none';
            document.querySelector(Selectors.addBtn).style.display = 'inline';

        },
        itemInput: function () {
            return {
                name: document.querySelector(Selectors.itemName).value,
                calories: document.querySelector(Selectors.itemCalories).value
            }
        },

    }
})();

const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
    //console.log(ItemCtrl.logdata())
    const loadEvLis = function () {
        const selectors = UICtrl.getSelectors();
        document.querySelector(selectors.addBtn).addEventListener('click', submitItem);
        //sprecavanje entera da submituje 
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false
            }
        })

        document.querySelector(selectors.itemList).addEventListener('click', itemUpdate);
        document.querySelector(selectors.updateBtn).addEventListener('click', itemUpdateSubmit);
        document.querySelector(selectors.deleteBtn).addEventListener('click', itemDelete);
        document.querySelector(selectors.backBtn).addEventListener('click', UICtrl.clearEditState);
        document.querySelector(selectors.clearBtn).addEventListener('click', clearAllItems )

    }

    const submitItem = function (e) {
        //alert('Add');
        const input = UICtrl.itemInput();

        if (input.name !== '' && input.calories !== '') {
            //console.log(input.name);
            //console.log(input.calories);
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);

            const totalKcal = ItemCtrl.gettotCal();
            //Dodavanje ukupnih kalorija u UI
            UICtrl.showtotCal(totalKcal);
            //Pakovanje u storage
            StorageCtrl.storeItem(newItem);
            //Obrisi polja
            UICtrl.clearFields();
        }
        //console.log(input);
        e.preventDefault();
    }

    const itemUpdate = (e) => {
        //console.log('test');
        if (e.target.classList.contains('edit-item')) {
            //console.log('editItem');
            const listID = e.target.parentNode.parentNode.id;
            //console.log(e.target.parentNode.parentNode.id);
            const listarr = listID.split('-');
            const id = parseInt(listarr[1]);
            //console.log(id);
            const itemEd = ItemCtrl.getItemById(id);
            //console.log(itemEd);
            ItemCtrl.setCurrentItem(itemEd);
            UICtrl.addItemtoForm();
        }
        e.preventDefault()
    }

    const itemUpdateSubmit = (e) => {
        //console.log('update');
        const input = UICtrl.itemInput();
        const updateItem = ItemCtrl.updateItem(input.name, input.calories);

        UICtrl.updateItem(updateItem);

        const totalKcal = ItemCtrl.gettotCal();
        UICtrl.showtotCal(totalKcal);
        StorageCtrl.updateItemStorage(updateItem);
        //

        e.preventDefault();
    };

    const itemDelete = (e) => {
        //console.log('123');
        const currentItem = ItemCtrl.getCurrentItem();

        ItemCtrl.deleteItem(currentItem.id);
        UICtrl.deleteListItem(currentItem.id);

        const totalKcal = ItemCtrl.gettotCal();
        UICtrl.showtotCal(totalKcal);

        StorageCtrl.deleteFromStorage(currentItem.id)

        UICtrl.clearEditState();

        e.preventDefault();
    }

    const clearAllItems = (e) => {
        ItemCtrl.clearItems();
        //UICtrl.clearListItems();

        const totalKcal = ItemCtrl.gettotCal();
        UICtrl.showtotCal(totalKcal);

        UICtrl.clearListItems();

        //Sklanja iz storage
        StorageCtrl.clearItemsFromStorage();
        UICtrl.hideList();
        
    }

    return {
        init: function () {
            //clear state
            UICtrl.clearEditState();
            //console.log('App is initated')
            const items = ItemCtrl.getItems();

            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateList(items);
            }

            loadEvLis();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();