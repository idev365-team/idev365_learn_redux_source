const { createStore } = require("./redux");


let store = createStore(combineReducers({counter,grower}));

function counter(state=0,action){
    switch(action.type){
        case 'add':
            return state+1;
        case 'sub':
            return state-1;
        default:
            return state;
    }
}

function grower(state=1,action){
    switch(action.type){
        case "grow":
            return state+1;
        default:
            return state;
    }
}

store.subscribe(function(){
    console.log("data",store.getState());
})

store.dispatch({
    type: "add"
});

store.dispatch({
    type: "grow"
});





