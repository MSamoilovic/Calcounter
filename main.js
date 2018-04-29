//Storage

//List items
const ItemCtrl = (function () {
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items: [
            /* { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Cookie', calories: 400 },
            { id: 2, name: 'Eggs', calories: 300 } */
        ],
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
        gettotCal : function () {
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
        itemName: '#foods',
        itemCalories: '#calories',
        totalCalories: '.total-calorie'
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
                <i class=" edit-item fas fa-pencil-alt"></i>
            </a>`;
            //Insertovanje itema
            document.querySelector(Selectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearFields: function () {
            document.querySelector(Selectors.itemName).value = '';
            document.querySelector(Selectors.itemCalories).value = '';
        },
        hideList: function() {
            document.querySelector(Selectors.itemList).style.display = 'none'
        },
        showtotCal: function (totalCalories) {
            document.querySelector(Selectors.totalCalories).textContent = totalCalories;
        },
        itemInput: function () {
            return {
                name: document.querySelector(Selectors.itemName).value,
                calories: document.querySelector(Selectors.itemCalories).value
            }
        },

    }
})();

const App = (function (ItemCtrl, UICtrl) {
    //console.log(ItemCtrl.logdata())
    const loadEvLis = function () {
        const selectors = UICtrl.getSelectors();
        document.querySelector(selectors.addBtn).addEventListener('click', submitItem)

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
            //Obrisi polja
            UICtrl.clearFields();
        }
        //console.log(input);
        e.preventDefault();
    }

    return {
        init: function () {
            //console.log('App is initated')
            const items = ItemCtrl.getItems();

            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateList(items);
            }

            loadEvLis();
        }
    }
})(ItemCtrl, UICtrl);

App.init();