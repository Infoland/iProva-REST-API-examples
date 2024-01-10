# Changelog

This page defines all the changes that were done in the API. There is a difference between the version of the API and the version of Zenya. A new major API version will only be created when we have to introduce breaking changes to the API. New routes, enhanced routes and bug fixes can be introduced with a new Zenya version without creating a new API version.

[Pre 7.0.0 changes](ChangeLogs)

## Changes in Zenya 7.2.0.0

Change|Route|Remarks
|--|--|--|
Added | V5 of the API | Version 5 of the API contains a reimplementation of the users and user_groups api
Changed | **GET** attachments | Added GET operation
Changed | **GET** attachments/{attachment_id}/download | Added parameter fileType for thumbnail/preview functionality
Breaking change | **GET** campaigns | Introduced paging and property filtering
Breaking change | **GET** campaigns/{campaign_id} | Introduced property filtering
Changed | **PATCH** campaigns/{campaign_id} | Added option to archive campaigns
Added | **ANY** chat_messages/{chat_message_id}/opinions | Added functionality to manage chat message opinions
Added | **ANY** consequence_categories | Added functionality for consequence categories in Risk
Changed | **ANY** Panels | The image property was changed to an icon object
Changed | **GET** portals/{portal_id} | The image property was changed to an icon object
Changed | **GET** risks | Introduced filtering on card ids and on archived status
Added | **ANY** risks/{risk_id}/causes/suggestions | Added suggestions functionality for causes
Added | **ANY** risks/{risk_id}/consequences/suggestions | Added suggestions functionality for consequences
Added | **ANY** risks/{risk_id}/controls/suggestions | Added suggestions functionality for controls
Changed | **GET** risks/{risk_id}/issues/{issue_id}/attachments/{attachment_id}/download | Added parameter fileType for thumbnail/preview functionality
Changed | **GET** risks/{risk_id}/risk_evaluations | Added filtering on evaluation types
Changed | **GET** risks/controls | Added functionality to filter on card ids and archived status
Changed | **GET** risks/controls/{control_id}/control_tests | Added property filtering for review information
Changed | **GET** risks/controls/{control_id}/control_tests/{control_test_id} | Added property filtering for review information
Changed | **GET** risks/controls/{control_id}/control_tests/ {control_test_id}/attachments/{attachment_id}/download | Added parameter fileType for thumbnail/preview functionality
Added | **ANY** risks/controls/{control_id}/control_tests/{control_test_id}/control_test_reviews | Added control test review functionality
Changed | **GET** risks/controls/{control_id}/issues/ {issue_id}/attachments/{attachment_id}/download | Added parameter fileType for thumbnail/preview functionality
Added | **ANY** risks/controls/filter | Added functionality to make complex filters for controls
Added | **ANY** risks/filter | Added functionality to make complex filters for risks
Added | **ANY** tags | Added functionality to manage global tags which can be added to Zenya entities
Added | **ANY** timeline_events/{timeline_event_id}/opinions | Added functionality to manage timeline event opinions
Changed | **GET** user_groups | Added property filtering for total number of user groups
Changed | **GET** user_groups | Added functionality for filtering on user_ids, names and group types
Changed | **PATCH** user_groups/{user_group_id} | Added functionality to apply strict validation
Changed | **GET** user_groups/filter/{filter_id} | Added property filtering for total number of user groups
Changed | **GET** user_groups/members | Added parameter userGroupIds
Changed | **GET** users | Added property filtering for total number of users, and the list of user groups
Changed | **GET** users | Added property filtering for name and manager
Changed | **GET** users/{user_id} | Added property filtering for user groups
Changed | **GET** users/filter/{filter_id} | Added property filter for total number of users, and the list of user groups
Changed | **GET** users/me | Added property filter for the list of user groups
Removed | **ANY** risks/{risk_id}/inherent_scores | Functionality of how inherent scores are determined was changed
Changed | **GET** user_groups | Removed parameters include_start_portals, include_system_groups, include_members, 
Changed | **GET** user_groups/{user_group_id} | Removed parameter include_start_portal
Removed | **PUT** user_groups/{user_group_id} | This route was removed
Removed | **ANY** user_groups/{user_group_id}/members | This route was removed
Removed | **ANY** user_groups/{user_group_id}/members/{user_id} | This route was removed
Changed | **GET** user_groups/filter/{filter_id} | Removed parameter includeMembers
Changed | **GET** user_groups/members | Removed parameter user_group_ids
Breaking change | **GET** users | Removed parameter name_logincode_email_contains (renamed to name_login_code_email_contains)
Changed | **GET** users/{user_id} | Removed parameter include_statistics
Removed | **PUT** users/{user_id} | This route was removed
Breaking change | **ANY** user_groups/members | Removed this route. User the User controller to filter on user group id instead
Breaking change | **ANY** user_groups/members/filter | Removed this route. User the User controller to filter on user group id instead
Breaking change | **ANY** user_groups/members/filter/{filter_id} | Removed this route. User the User controller to filter on user group id instead

## Changes in Zenya 7.1.0.2

Change|Route|Remarks
|--|--|--|
Changed | **ANY** documents | The `document` DTO now gets a `language` property
Added | **GET** {portal_id}/panels/{panel_id} | Gets a portal panel
Fixed | **POST** {portal_id}/panels | Now returns panel id as defined in the data contract

## Changes in Zenya 7.1.0

Change|Route|Remarks
|--|--|--|
Removed | **ANY** documents/quick_codes | These routes were in the incorrect place
Added | **ANY** quick_codes | These routes were moved from 'documents' and were extended for 'question list' support
Added | **ANY** risks/risk_id/actions | Manage actions of a risk
Added | **ANY** risks/{risk_id}/issues/{issue_id}/actions |Manage actions of an issue
Changed | **GET** risks/controls | Extended to be able to get much more information about the controllers
Changed | **GET** risks/controls/{control_id} | Extended to be able to get much more information about the controllers
Added | **ANY** risks/controls/{control_id}/control_tests | Manage control tests
Added | **ANY** risks/controls/{control_id}/custom_control_test_questions | Manage custom control test questions
Added | **ANY** attachments | Create, get or download attachments
Added | **GET** events | Get events from the system
Changed | **GET** campaigns/{campaign_id} | Extended to be able to get much more information about the campaign
Added | **ANY** campaigns/{campaign_id}/chat_messages | Manage chat messages of a campaign
Added | **ANY** campaigns/{campaign_id}/target_groups | Manage target groups of a campaign
Changed | **GET** card_files/{card_file_id} | Extended to be able to get information about section of card files
Changed | **GET** card_files/{card_file_id}/fields | Extended to be able to get information about sections of fields of card files
Added | **ANY** card_files/{card_file_id}/sections | Manage sections of card files
Added | **ANY** portals/{portal_id}/panels | Manage panels of portals

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


