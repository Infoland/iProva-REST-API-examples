This folder contains examples of accessing the content_items api.

## creating a link to a content_item
to construct a link to a content_item, you need the `content_item_id` property of a content item. Once you have this id, you can construct a link by using the following url template:
```
https://<zenya-url>/iportal5/?contentitemid=<content_item_id>
```

so for instance:

```
https://infoland.zenya.work/iportal5/?contentitemid=12345678-1234-1234-1234-123456781234
```
