# popup


Modal dialog box components

基于Jquery的模态对话框组件

-  [Demo](http://xuyiKing.github.io/popup)


## Release History

### v1.1.0
Add function to get the code：


## Main

```
js/
├── 
├── jquery-2.1.1.min.js     (98 KB)
└── popup.js     ( 7 KB)
```

## Getting started

### Installation

Include files:

```html
<link rel="stylesheet" href="./css/popup.css">

<script type="text/javascript" src="./js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="./js/popup.js"></script>
```
Create HTML elements:

```html

```

## 内容弹窗

```
Popup.contentPopup({
    el: "#example",
    title: "内容弹窗",
    okFunc: function () {
        // 此处嵌入自定义业务代码
        alert("确认提交嵌入自定义业务代码即可");
    }
});
```

## 提示弹窗

```
Popup.confirm({
    title: "确认操作",
    content: "确定操作？",
    okFunc: function () {
        // 此处嵌入自定义业务代码
        alert("确认提交嵌入自定义业务代码即可");
    }
});
```

## License

[MIT](http://opensource.org/licenses/MIT) ©

