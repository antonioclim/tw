# `useReducer` data-flow (Action → Dispatch → Reducer → State)

In this lesson, the component calls:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

When the user clicks a button, an **action** is sent to `dispatch(...)`. React then calls the **reducer**:

```js
reducer(previousState, action) -> nextState
```

React stores the **nextState**, and the component re-renders using the updated `state`.

## Mermaid diagram (optional)

```mermaid
flowchart LR
    A[User interaction\n(click)] --> B[dispatch(action)]
    B --> C[reducer(state, action)]
    C --> D[next state]
    D --> E[Component re-render]
    E --> A
```
