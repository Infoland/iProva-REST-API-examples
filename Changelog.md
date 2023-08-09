# Changelog

This page defines all the changes that were done in the API. There is a difference between the version of the API and the version of Zenya. A new major API version will only be created when we have to introduce breaking changes to the API. New routes, enhanced routes and bug fixes can be introduced with a new Zenya version without creating a new API version.

## Changes in Zenya 7.0.0.3

Change|Route|Remarks
|--|--|--|
Changed | **GET** /cases/case_types/{case_type_id}/states | The `state` dto now also gets a `color` property

## Changes in Zenya 7.0.0

Change|Route|Remarks
|--|--|--|
Added | V4 of the API | Version 4 contains the reimplementation of Risk related api's, the previous version contain the old implementation of Risk api's
Removed | Windows and i+Sync authentication | The authentication methods *Windows* and *i+Sync* have been removed because it is technically impossible to use these on SaaS deployments.
Added | Status code 304 | When using a HEAD verb this code is returned when the resource hasn't been modified.
Added | Verb HEAD | When only the headers need to be requested.
Changed | **ANY** `risks/`| Because of the complete re-write of the 'Risks' module all existing routes have been touched and a lot of new have been introduced
Breaking change | **ANY** `feedback_campaigns/` | Because of the introduction of campaigns routes for the management of the campaigns have been introduced this very small api was moved from `campaigns` to `feedback_campaigns/`
Added | **ANY** `campaigns/` | Because of the introduction of campaigns routes for the management of the campaigns have been introduced
Added | **ANY** `boostparticipantapi/` | Because of the introduction of campaigns routes for the participant side of the campaigns have been introduced
Added | **ANY** `/users/me/application_state/{key}` | State of the user can now be managed
Added | **GET** `central_permissions` | Get the central permissions of Zenya and if the current user has the permission
Added | **GET** `central_permissions` | Get the central permissions of Zenya and if the current user has the permission
Changed | **GET** `content_items` | The validation of `after_last_visited_date_time` change to accept `yyyyMMddhhmmss`, instead of non supported date formats
Added | **GET** `license` | Get license of Zenya
Changed |**GET** `portals/recommended_links`| Added `text_is_exactly_with_synonyms` filter
Added  |**GET** `settings/{setting_names}`| Exposed extra settings via the api
Breaking change  |**GET** `settings/languages`| Changed the dto returned
Changed  |**GET** `users`| Added querystring `deleted_users`, which makes it possible to also get soft-deleted users.


