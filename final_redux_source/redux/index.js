(function(global){
    function createStore(reducer,initState){
        this.reducer = reducer;
        this.curState = initState;
        this.listens = [];
    
        function subscribe(listen){
            this.listens.push(listen);
        }
        function getState(){
            return this.curState;
        }
        function dispatch(action){
            this.curState = this.reducer(this.curState,action);
    
            for(let i=0;i<this.listens.length;i++){
                const listen = this.listens[i];
                listen();
            }
        }
    
        dispatch({
            type:"INIT"
        })
        let store = {
            subscribe:subscribe.bind(this),
            getState:getState.bind(this),
            dispatch:dispatch.bind(this),
        }
        return store;
    }

    function combineReducers(reducerMap){
        let reducerKeys = Object.keys(reducerMap);
        let finalReducers = {};
        for(let i=0;i<reducerKeys.length;i++){
            let reducerKey = reducerKeys[i];
            let curReducer = reducerMap[reducerKey];
            finalReducers[reducerKey] = curReducer
        }
        let nextState = {};
        return function reducer(state,action){
            if(state===void 0){
                state = {};
            }
            for(let i=0;i<reducerKeys.length;i++){
                let key = reducerKeys[i];
                let curReducer = finalReducers[key];
                let prevStateForKey = state[key];
                let nextStateForKey = curReducer(prevStateForKey,action);
                nextState[key] = nextStateForKey;
            }
            return nextState;
        }
    }
    
    let redux = {
        createStore:createStore,
        combineReducers:combineReducers,
    }
    
    
    if( typeof(module)!="undefined" ){
        module.exports = redux;
    }

    global.redux = redux;
})(typeof(window)!="undefined" ? window : global);
 

