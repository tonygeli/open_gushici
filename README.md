## 1. 小程序功能

- 古诗词大全
- 诗词分享、收藏


## 2. 小程序地址

[https://gitee.com/tonygeli/open_gushici](https://gitee.com/tonygeli/open_gushici)

## 3. 小程序预览：

<br>
<img src="https://img-blog.csdnimg.cn/20210127134656227.png" width="240" />
<br>

## 4. 部分截图

####  首页

<img src="https://img-blog.csdnimg.cn/20210127135403368.jpeg" width="225" height="400"  />



## 5. 项目结构

```
.
├── README.md
├── project.config.json                              // 项目配置文件
├── cloudfunctions | 云环境                           // 存放云函数的目录
│   ├── login                                        // 用户登录云函数
│   │   ├── index.js
│   │   └── package.json
│   └── collection_get                               // 数据库查询云函数
│   │   ├── index.js
│   │   └── package.json
│   └── collection_update                               // 数据库更新云函数
│       ├── index.js
│       └── package.json
└── miniprogram
    ├── images                                        // 存放小程序图片
    ├── lib                                           // 配置文件
    ├── pages                                         // 小程序各种页面
    |   ├── index                                     // 首页
    |   └── menu                                      // 分类页
    |   └── user                                      // 用户中心
    |   └── search                                    // 搜索页
    |   └── list                                      // 列表页 搜索结果页
    |   └── detail                                    // 详情页
    |   └── collection                                // 收藏页
    |   └── find                                      // 发现页
    |   └── idiom-jielong                             // 成语接龙页
    |   └── poet                                      // 作者页
    |   └── baijiaxing                                // 百家姓
    |   └── xiehouyu                                  // 歇后语
    |   └── poet                                      // 作者页
    |   └── suggest                                   // 建议反馈
    |   └── ...                                       // 其他
    ├── style                                         // 样式文件目录
    ├── app.js                                        // 小程序入口文件
    ├── app.json                                      // 全局配置
    └── app.wxss                                      // 全局样式

```

## 6. 封装云函数操作数据库

本项目是使用的小程序云开发。云开发提供了一个 JSON 数据库，用户可以直接在云端进行数据库增删改查，但是，小程序对用户操作数据的权限进行了一定的限制（例如数据update、一次性get记录的条数限制等），所以，这里主要采用云函数来操作数据库。

        
### 往云数据库中批量导入 json 数据失败

原因：请看文档：[https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/import.html](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/import.html)

解决：去掉json数据 `{}`之间的逗号, 如果最外层为 `[]`，也必须去掉, 最终形如：

```
{
    "_id": "ad206831600bfc3501e905f854960b3c",
    "name": "李白",
    "desc": "李白（701年－762年），字太白，号青莲居士，唐朝浪漫主义诗人，被后人誉为“诗仙”..."
}
{
    "_id": "ad206831600bfc3501e905f854960b3c",
    "name": "白居易",
    "desc": "白居易（772年－846年），字乐天，号香山居士..."
}
```

## 7.数据格式

诗词数据实例

```
[
  {
    "title": "长相思·惜梅", 
    "notes": [], 
    "author": "刘克庄", 
    "paragraphs": [
      "寒相催。暖相催。催了开时催谢时。丁宁花放迟。", 
      "角声吹。笛声吹。吹了南枝吹北枝。明朝成雪飞。"
    ], 
    "dynasty": "宋代"
  }, 
  {
    "title": "浪淘沙·莫上玉楼看", 
    "notes": [], 
    "author": "韩疁", 
    "paragraphs": [
      "莫上玉楼看。花雨斑斑。四垂罗幕护朝寒。燕子不知人去也，飞认阑干。", 
      "回首几关山。后会应难。相逢祗有梦魂间，可奈梦随春漏短，不到江南。"
    ], 
    "dynasty": "宋代"
  }
]
```

作者数据实例

```
[
    {
        "_id": "ad206831600bfc3501e905f854960b3c",
        "name": "李白",
        "desc": "李白（701年－762年），字太白，号青莲居士，唐朝浪漫主义诗人，被后人誉为“诗仙”..."
    },
    {
        "_id": "ad206831600bfc3501e905f854960b3c",
        "name": "白居易",
        "desc": "白居易（772年－846年），字乐天，号香山居士..."
    }
]
```



