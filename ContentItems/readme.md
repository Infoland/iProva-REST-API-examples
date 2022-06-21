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

if your organisation uses single sign-on, users following the link will be authenticated automatically. If not, you will need to generate a token for the user following the link and add it to the querystring.
