
const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED': 
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED': 
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: true
            };

        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const itemInd = state.items.findIndex(item => item.id === id);
            if(itemInd === -1){
                const newItem = {
                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    amount: 1,
                    category: item.category
                }
    
                return {
                    ...state,
                    items: [
                        ...state.items,
                        newItem
                    ],
                    total: state.total + item.price
                };
            }
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                amount: state.items[itemInd].amount + 1,
                category: item.category
            }

            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemInd),
                    newItem,
                    ...state.items.slice(itemInd+1)
                ],
                total: state.total + item.price
            };
            
        case 'ITEM_REMOVE_FROM_CART': 
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            let removedItem = state.items[itemIndex];
            let amount = removedItem.amount;
            if(amount === 1){
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemIndex),
                        ...state.items.slice(itemIndex+1)
                    ],
                    total: state.total - removedItem.price
                }
            }
            const itemNew = {
                title: removedItem.title,
                price: removedItem.price,
                url: removedItem.url,
                id: removedItem.id,
                amount: amount - 1,
                category: removedItem.category
            }
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    itemNew,
                    ...state.items.slice(itemIndex+1)
                ],
                total: state.total - removedItem.price
            };

        default: 
            return state;
    }
}


export default reducer;