/*
 * Object.assign() polyfill
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
 */
if (typeof Object.assign != 'function') {
    (function() {
        Object.assign = function(target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}

/*
 * Stupidly simple and naive redux implementation, but it's enough for this use case
 */
function createStore(reducer, initialState) {
    var state = initialState,
        listeners = [],
        dispatching = false;

    function dispatch(action) {
        if (dispatching) {
            throw new Error('Reducers may not dispatch actions.');
        }

        try {
            dispatching = true;
            state = reducer(state, action);
        } finally {
            dispatching = false;
        }

        listeners.slice().forEach(function(listener) {
            listener();
        });
        return action;
    }

    function subscribe(listener) {
        listeners.push(listener);

        return function unsubscribe() {
            var index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }

    function getState() {
        return state;
    }

    dispatch({ type: 'INIT' });

    return {
        dispatch: dispatch,
        getState: getState,
        subscribe: subscribe
    };
}

const simpleRedux = {
    createStore
};

export default simpleRedux;
