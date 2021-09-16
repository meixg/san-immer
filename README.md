# san-immer

与 [san-update](https://github.com/baidu/san-update) 功能类似，用于在 [san-store](https://github.com/baidu/san-store) 中以不可变的形式修改数据。

内部是对 [immer](https://github.com/immerjs/immer) 的封装，好处是：

1. 操作简单，就像直接对数据进行可变修改一样，不需要记 .set 等 API。
2. 使用 TypeScript 时，state 有类型提示。

## 使用方式

```typescript
import { store } from 'san-store'
import { produce } from 'san-immer'

const baseState = {
    arr: [
        {
            title: "Learn TypeScript",
            done: true
        },
        {
            title: "Try Immer",
            done: false
        }
    ]
}

store.addAction('change', () => {
    return produce<typeof baseState>(state => {
        state.arr[1].done = true
        state.arr.push({title: "Tweet about it"})
    })
})

// 对比
store.addAction('change', () => {
    return builder()
        .set('arr[1].done', true)
        .push('arr', {title: "Tweet about it"});
})
```

## next

激进一些的话，可以直接 hook `store.addAction`。使得我们可以直接这样的写：

```javascript
store.addAction('change', (payload, state, dispatch) => {
    state.xxx = payload
})
```