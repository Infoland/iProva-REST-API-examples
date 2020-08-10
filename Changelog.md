# Changelog
This page defines all the changes that were done in the API. There is a difference between the version of the API and the version of iProva. A new major API version will only be created when we have to introduce breaking changes to the API. New routes, enhanced routes and bug fixes can be introduced with a new iProva version without creating a new API version.


## Changes in iProvba 5.15

### General changes
The base path was changed from /iProva to /iProva/API and the /api/ prefix is removed from all routes. This doesn't change anything for consumers.

Setting routes are now more specific for the setting you want to get e.g
`/settings/max_days_old_news_articles`. The old GET route for settings `/settings/{name}` will still continue to work for backward compatibility.

### Route changes

Change|Route|Remarks
|--|--|--|
Added|**GET** `/application_parts` | Get application parts for the user
Added|**PATCH** `/application_parts/{application_part_id}` | Partially update an application part
Added|**GET** `/cases/case_types` | Gets case types
Added|**GET** `/portals/content_items` | Gets the content items
Added|**GET** `/portals/{portal_id}/content_items` | Gets the content items based on the portal id
Added|**GET** `/documents/{document_id}/v{version}/quick_feedback` | Get the quickfeedback on all versions of a document
Added|**POST** `/documents/{document_id}/v{version}/quick_feedback` | Posts quick feedback for a document
Added|**PUT** `/documents/{document_id}/v{version}/quick_feedback/{quick_feedback_id}` | Posts quick feedback for a document
Added|**GET** `/documents/{document_id}/quick_feedback` | Get the quickfeedback on all versions of a document
Added|**POST** `/documents/filter` | Stores a filter to be used to GET documents in a follow up call
Added|**GET** `/documents/filter/{filter_id}` | Gets documents using a previously POSTed filter
Added|**POST** `/documents/{document_id}/version` | Creates a new version of a document
Added|**PUT** `/documents/{document_id}/v{version}/upload` | Upload the contents of a specific version binary document
Added|**GET** `/favorites` | Get favorites for the logged in user
Added|**GET** `/users/me/favorites` | Get favorites for the logged in user
Added|**DELETE** `/favorites/{favorite_id}` | Delete favorite by id
Added|**PATCH** `/favorites/{favorite_id}` | Update a favorite
Added|**DELETE** `/users/me/favorites/{favorite_id}` | Delete favorite by id
Added|**PATCH** `/users/me/favorites/{favorite_id}` | Update an favorite
Added|**GET** `/cases/fields` | Gets fields
Added|**GET** `/cases/case_types/{case_type_id}/fields` | Gets fields for a case type
Added|**POST** `/portals/news_articles` | Creates a news article
Added|**GET** `/portals/{portal_id}/news_articles` | Get all news articles published on a portal
Added|**GET** `/portals/news_articles/{news_article_id}` | Gets a single news article by id
Added|**DELETE** `/portals/news_articles/{news_article_id}` | Delete an article by id
Added|**PATCH** `/portals/news_articles/{news_article_id}` | Updates a news article
Added|**POST** `/portals/news_articles/{news_article_id}/portal_ids/{portal_id}` | Connects news article to a portal
Added|**DELETE** `/portals/news_articles/{news_article_id}/portal_ids/{portal_id}` | Disconnect a news article from a portal
Added|**GET** `/portals` | Get all the portals the current user may see
Added|**GET** `/users/me/portals` | Get all the portals the current user may see
Added|**GET** `/portals/{portal_id}` | Get portal by id
Added|**PATCH** `/portals/{portal_id}` | Updates a portal
Added|**GET** `/portals/{portal_id}/hyperlinks` | Get the portal hyperlinks
Added|**GET** `/portals/{portal_id}/information` | Get the information for a portal
Added|**GET** `/support_access` | Get support access information
Added|**PUT** `/support_access` | Update support access information
Added|**POST** `/support_access` | Posts a new support access
Added|**PATCH** `/support_access` | Patches support access information

Added|**GET** `/settings/max_days_old_news_articles` | specific route for max_days_old_news_articles setting GET
Added|**GET** `/settings/enabled_auto_labeling` | specific route for enabled_auto_labeling setting GET
Added|**PUT** `/settings/enabled_auto_labeling` | specific route for enabled_auto_labeling setting PUT

Changed|**PATCH** `/documents/read_confirmations/{read_confirmation_id}` | its now possible to also send a description for the read confirmation


## Changes in iProva 5.14.1

Change|Route|Remarks
|--|--|--|
Change|**POST** `api/user_groups/{user_group_id}/members`| Updated to enable adding multiple members in one call. *The user_id value is deprecated* and replaced with user_ids.
Added|**DELETE** `api/user_groups/{user_group_id}/members`| Remove multiple users from user group

## Changes in iProva 5.14.0

Change|Route|Remarks
|--|--|--|
Added|**GET** `api/license`| Get info about the current license
Added|**PATCH** `api/question_lists/{question_list_id}`| Updates properties of a question list
Added|**ANY** `api/question_lists/{question_list_id}/review_comments`| Gets review comments of a question list
Added|**ANY** `api/question_lists/review_comments/`| Get and mutate review comments
Added|**GET** `api/schedules/`| Gets schedules

## Changes in iProva 5.13.1

Change|Route|Remarks
|--|--|--|
Added|**POST** `api/user_groups/{user_group_id}/members`| Add member to a user group
Added|**DELETE** `api/user_groups/{user_group_id}/members/{user_id}`| Remove user from user group
Added|**PATCH** `api/documents/{document_id}/v{version}`| Changes properties of a document
Added|**POST** `api/documents`| Creates a new document

## Changes in iProva 5.13

### General changes

In this version we introduced version 2 of the API. ALl calls without a specific version parameter set in it, will automatically use the latest version of the API. This new version only influences the result of authentication attempts. For instance, when logging in with a user that requires a 2 factor code, the return data for this has changed.
The reason for this change is that we now support HTTP 2.0 for the API. Version 1 of the API heavily relied on the ReasonPhrase property of the response message to be delivered to the consumer of the API. Since the ReasonPhrase is no longer supported in HTTP 2.0, we needed to change this implementation. We now implement application/problem+json as defined in [RFC7807](https://tools.ietf.org/html/rfc7807). We still try to deliver the ReasonPhrase property, but existing implementation should be converted to reading the error from the body of the response message.

Example:

**Request:**<br>
**GET**  /api/users/00000000-0000-0000-0000-000000000000

**Old result:** <br>
400 with ReasonPhrase: user_id was not valid

**New result:**<br>
400 with response body:
```javascript
{
  "type": "https://iprova.nl/probs/badrequest",
  "title": "user_id was not valid"
}
```

### Route changes

Change|Route|Remarks
|--|--|--|
Added|**ANY** /api/documents/comments|API for getting and manipulating comments on documents
Added|**ANY** /api/keywords|API for getting and manipulating keywords
Added|**ANY** /api/risks/assessments|Api for getting and manipulating risk assessments
Added|**ANY** /api/risks/risk_matrices|Api for getting and manipulating risk matrices
Added|**GET** /api/question_lists/survey_studies/{id}|API for getting survey studies
Added|**POST** /api/users/password_strength_requests|Api for getting the strength of the given password



## Changes in iProva 5.12
Change|Route|Remarks
|--|--|--|
Changed|**POST** `/api/users/filter`| - Added support to filter by manager_id.<br>- Added support for more complex operations instead of only eq
Changed|**POST** `/api/user_groups/filter`| - Added support for more complex operations instead of only eq<br>- Added support to filter by member_id
Changed|**PATCH** `/api/user_groups/` | Patching user groups now also patches the members (this functionality was missing)
Added|**GET** `/api/risks/{risk_id}/measures` | Get a list of measures for a risk
Added|**GET** `/api/risks/measures` | Get a list of all measures.
Added|**GET** `/api/scheduled_tasks` | Gets a list of all scheduled tasks.
Added|**PUT** `/api/setting/{setting_name}` | Changes the value of a setting

## Changes in iProva 5.11.0.1

Change|Route|Remarks
|--|--|--|
Changed|**PATCH** `/api/users/{user_id}`| Extra properties are now supported for PATCH

## Changes in iProva 5.11.0

Change|Route|Remarks
|--|--|--|
Added|**ANY** `/api/reports/`| Reports API to get and generate reports
Added|**ANY** `/api/risks/risk_templates/`| Risk template API
Added|**GET** `api/themes/{theme_id}/images/{image_id}`| Get a specific image from a theme
Added|**ANY** `/api/users/password_requests`| API to request new password for a user

## Changes in iProva 5.9.0

Change|Route|Remarks
|--|--|--|
Added|**POST** `api/documents/{document_id}/hits`| Post a hit on a document
Added|**GET** `api/documents/{document_id}/fields`| Get fields of a document
Added|**GET** `api/identityproviders/{provider_id}/Conflicts`| Get identity provider conflicts
Added|**POST** `api/identityproviders/{provider_id}/Conflicts`| Create an identity provider conflict
Added|**DELETE** `api/identityproviders/{provider_id}/Conflicts/{id}`| Delete an identity provider conflict
Added|**GET** `api/organization_units/{organization_unit_id}`| Get an organization unit
Added|**POST** `api/organization_units/filter`| Create a filter for organization units
Added|**GET** `api/organization_units/filter/{filter_id}`| Get the results of an organization unit filter
Added|**PATCH** `api/user_groups/{user_group_id}`| Patch a user group
Added|**PATCH** `api/users/{user_id}`| Patch a user

## Changes in iProva 5.8.0

Change|Route|Remarks
|--|--|--|
Added|**ANY** `api/users`| User management
Added|**ANY** `api/user_groups`| User group management
Added|**GET** `api/users/properties`| Retrieve custom user properties
Added|**GET** `api/user_groups/properties`| Retrieve custom user group properties
Added|**GET** `api/positions`| Retrieve positions
Added|**GET** `api/organization_units`| Retrieve organisation units


## Changes in iProva 5.7.0.5
Change|Route|Remarks
|--|--|--|
Added|**GET** `api/tokens/token` | Retrieves a token for the currently authenticated used
Added|**GET** `api/cards/by_btle` | Get cards by blte code

## Changes in iProva 5.7.0

Change|Route|Remarks
|--|--|--|
Added|| Added support for Windows Authentication and SAML-tokens
Added|**GET** `api/cases/mobile_forms`| Retrieval of mobile forms
Added|**GET** `api/card_files/{id}/mobile_forms`|Retrieves the mobile forms linked to a card file
Added|**POST** `api/cases`| Create new case in the cases module (for mobile forms)
Added|**GET** `api/frameworks/items` | Retrieves a set of framework items
Added|**GET** `api/frameworks/{id}/items` | Get framework items for a single framework

## Changes in iProva 5.6.1.0

Change|Route|Remarks
|--|--|--|
Fixed|-|Users having two factor authentication enabled now also have to pass a security code to the api when authenticating. For more info, see the general usage information of the API
Added|-|From this version on, the preferred way of authenticating is using bearer tokens. For more info, see the general usage information of the API
Added|**POST** `api/bearer_tokens` |Added this route to be able to generate a bearer token for the new bearer authentication



## Changes in iProva 5.6.0.3

Change|Route|Remarks
|--|--|--|
Changed|**GET** `api/versions/iprova` |The version now includes the minor version. Example: old: 5.6.0 , new: 5.6.0.3
Added|**GET/PUT** `api/apps/settings` |Added this route to be able to get and set settings for apps
Added|**POST** `api/apps/{app_name}/feedback` |Added this route to be able to post feedback on an app to iProva

## Changes in iProva 5.6.0

Change|Route|Remarks
|--|--|--|
Changed|**ANY** `api/card_files/{card_file_id}/cards` and `api/card_files/cards/{card_id}` |Added nfc_code, qr_code, bluetooth_low_energy_beacon, gps_location_longitude and gps_location_latitude attributes to the first level of cards
Added|**GET** `api/card_files/cards/{card_id}/documents` |Added this route to retrieve all published documents linked to the card
Added|**GET** `api/documents/{document_id}` and the `contents` and `download` sub routes|Get meta data, contents and binary data from the published version of a document
Added|**GET** `api/documents/bulk_exports`|Get meta data and the output of bulk exports of documents
Added|**GET** `api/documents/document_media/{document_media_item_id}/download`|Download a media item (audio, video) from a document. The media item is found in documents using a <mediaitem> tag. The attribute "data-document-media-item-id" contains the "document_media_item_id" parameter you need to pass to this method
Added|**GET** `api/hyperlinks/{hyperlink_id}`|Gets information of the target of a hyperlink. The {hyperlink_id} can be found by reading the data-hyperlinkid attribute of an anchor tag in an html document
Added|**GET** `api/portals/themes`|Gets the list of portal themes for the current user.
Fixed|**GET** `api/card_files/cards` and sub routes|last_modified_datetime of cards were never filled
Fixed|**GET** routes returning a date|Made it clear an UTC date is returned

## Changes in iProva 5.5.0

Change|Route|Remarks
|--|--|--|
Added|**POST** `api/tokens`|Create tokens to login into the API
Added|**GET** `api/versions`|Get the current API and iProva versions
Added|**ANY** `api/card_files` and all sub routes|Retrieve card files and manage cards

**ANY** is all in iProva supported verbs.


## API versions in iProva version

|API version|iProva version|Remarks
|--|--|--|
|1.0|5.5.0 - present|REST API introduced for tokens, versions and card files|
