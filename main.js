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
        logdata : function () {
            return data;
        }
    }
})();

const UICtrl = ( function () {
    const Selectors = {
        itemList: '#item-list'
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
        }
    }
})();

const App = ( function (ItemCtrl, UICtrl) {
    //console.log(ItemCtrl.logdata())
    const loadEvLis = function() {
        const selectors = UICtrl.getSelectors();
    }

    return {
        init: function() {
            console.log('App is initated')
            const items = ItemCtrl.getItems();
            UICtrl.populateList(items);
        }
    }
})(ItemCtrl, UICtrl);


App.init();