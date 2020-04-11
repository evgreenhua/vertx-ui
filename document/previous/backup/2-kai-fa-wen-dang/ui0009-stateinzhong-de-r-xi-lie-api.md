# UI0009 - StateIn中的r系列API

借用`rxjs`的模式，在`zero`注解中写`redux`的配置时，会直接使用r系列方法操作。

## 1.基本API

```ts
// 初始化
rinit(keys: Array<String> = [], isArray: boolean = false)
// 单节点状态树读取
revamp(keys: Array<String> = []): StateOut
// Tabular/Assist专用读取
radial(keys: any, isAssist: boolean = false): StateOut
// 多路径节点读取
rework(mapping: any = {}): StateOut
// 转换函数
rapt(mapping: any = {}, vector: any = {}): StateOut 
// 转成JavaScript中的Object/Array，该方法之后不可再用r系列方法
to()
```

## 2.使用

```js
@zero({
    connect : {
        s2p : state => Ux.dataIn(state).rework({datum : ["menus", "hotel"]}).revamp(["app", "user"]).to(),
        d2p : {
            fnApp : Types.fnApp,
            fnHotel : Types.fnHotel,
            fnOut : Taper.fnFlush
        }
    }
})
```

1. 上述代码中的`Ux.dataIn(state)`将会返回一个`StateIn`类型的数据；
2. `revamp`执行过后，会从`store -> out -> app, user`两个节点读取相关数据，类型为`DataObject`，生成`$app`和`$user`两个变量；
3. `rework`执行过后，会从`store -> out -> datum -> menus, hotel`两个节点读取相关数据，类型为`DataContainer`的数据，生成`$menus`和`$hotel`两个变量；
4. 这里的`Redux`状态树全部从`store -> out`节点读取，这个是Zero UI的默认节点；
5. 所有r系列的API可以直接形成Fluent模式的API；

## 3.统一In/Out

这种设计的主要目的是保证写状态树和读状态树统一路径，防止混淆（下边只是带有两个`.`的路径，可支持多个点），如：

```javascript
// 写入状态树
Ux.writeTree(reference, { 
    "list.items": [],
    "list.datum": [],
    "user.data":{},
    "user.auth.related":{}
});

        // 对应的读取，Zero中的片段
        s2p: state => Ux.dataIn(state).rework({
            "list": ["items","datum"],
            "user": ["data"],
            "user.auth": ["related"]
        }).rinit(["items"], true).to()

// 从props中取属性时，直接使用：
const { $items, $datum, $data, $related } = this.props;
```

## 4.不同的API说明

### 4.1. rinit

`rinit`为初始化方法，防止`undefined`专用的特殊方法，它会初始化两个数据模型：`DataObject`和`DataArray`，该方法签名如下：

```typescript
rinit(keys: Array<String> = [], isArray: boolean = false)
```

第一个参数将初始化变量值，传入的key是什么，则在props中生成`$key`的变量，第二个参数则表示当前初始化结构是一个`DataObject`还是一个`DataArray`，最终会使用`Redux`中的StateToProp转换到props中生成变量，如：

```js
@Ux.zero(Ux.rxEtat(require('./Cab.json'))
    .connect(state => Ux.dataIn(state)
        .rework({
            datum: ["inited"]
        })
        .rinit(["inited"])   // rinit的API初始化DataObject
        .to()
    )
    .loading("inited")
    .cab("UI")
    .to()
)
```

上述代码中初始化了一个`inited`的变量，第二参默认是false，则转换成`DataObject`，所以可以使用下边代码从属性中提取变量

```js
const {$inited, ...rest} = this.props;
// 这里的$inited一定不会是undefined，这是rinit的约定
if($inited.is()){}
```

### 4.2. 其他的API参考子文档

* [UI0009-1 - revamp](/document/previous/backup/2-kai-fa-wen-dangen-dang/ui0009-stateinzhong-de-r-xi-lie-api/ui0009-1-revamp.md)
* [UI0009-2 - radial](/document/previous/backup/2-kai-fa-wen-dangen-dang/ui0009-stateinzhong-de-r-xi-lie-api/ui0009-2-radial.md)
* [UI0009-3 - rework](/document/previous/backup/2-kai-fa-wen-dangen-dang/ui0009-stateinzhong-de-r-xi-lie-api/ui0009-3-rework.md)
* [UI0009-4 - 重名覆盖之rapt](/document/previous/backup/2-kai-fa-wen-dangen-dang/ui0009-stateinzhong-de-r-xi-lie-api/ui0009-4-zhong-ming-fu-gai-zhi-rapt.md)

## 5.总结

了解了StateIn过后，就可以很方便配置`Redux`中的节点了。

