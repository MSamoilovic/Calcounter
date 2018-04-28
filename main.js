//Storage

//List items
const ItemCtrl = ( function () {
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items: [
            { id: 0, name: 'Steak Dinner', calories : 1200 },
            { id: 1, name: 'Cookie', calories : 400 },
            { id: 2, name: 'Eggs', calories : 300 }
        ],
        currentItem : null,
        totalCalories: 0
    }

    return {
        getItems : function() {
            return data.items
        },
        addItem : function (name, calories) {
            //console.log(name, calories);
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length-1].id + 1
            } else {
                ID = 0;
            }

            calories  = parseInt(calories);

            newItem = new Item( ID, name, calories);
            data.items.push(newItem);

            return newItem;
        },
        logdata : function () {
            return data;
        }
    }
})();

const UICtrl = ( function () {
    const Selectors = {
        itemList: '#item-list',
        addBtn : '#addItem', 
        itemName : '#foods',
        itemCalories : '#calories'
    }

    return {
        populateList : function (items) {
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
        getSelectors : function() {
           return Selectors;  
        },
        itemInput : function() {
            return {
                name : document.querySelector(Selectors.itemName).value,
                calories: document.querySelector(Selectors.itemCalories).value
            }
        }, 

    }
})();

const App = ( function (ItemCtrl, UICtrl) {
    //console.log(ItemCtrl.logdata())
    const loadEvLis = function() {
        const selectors = UICtrl.getSelectors();
        document.querySelector(selectors.addBtn).addEventListener('click', submitItem)

    }

    const submitItem = function(e) {
        //alert('Add');
        const input = UICtrl.itemInput();
        
        if(input.name !== '' && input.calories !== '') {
            //console.log(input.name);
            //console.log(input.calories);
            const newItem = ItemCtrl.addItem(input.name, input.calories);
        }
        //console.log(input);
        e.preventDefault();
    }

    return {
        init: function() {
            //console.log('App is initated')
            const items = ItemCtrl.getItems();
            UICtrl.populateList(items);

            loadEvLis();
        }
    }
})(ItemCtrl, UICtrl);


App.init();