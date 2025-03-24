# Changelog

This page defines all the changes that were done in the API. There is a difference between the version of the API and the version of Zenya. A new major API version will only be created when we have to introduce breaking changes to the API. New routes, enhanced routes and bug fixes can be introduced with a new Zenya version without creating a new API version.

- [Pre 7.0.0 changes](Documentation/ChangeLogs/Pre%20700.md)
- [Breaking changes](Documentation/ChangeLogs/BreakingChanges.md)

## Changes in Zenya 7.5.0 Update 3

Change|Route|Remarks
|--|--|--|
Added | **POST** audits/{audit_id}/attachments/copy | Copy the attachment of an audit, to use in a different audit
Changed | **GET** audits | Added parameter 'archived' (filter on archived audits)

## Changes in Zenya 7.5.0 Update 1

Change|Route|Remarks
|--|--|--|
Added | **ANY** app_registrations | API to manage the app registrations
Added | **ANY** audits/dashboarding_wake_up | Wakes up the dashboarding for audits
Added | **ANY** oauth/token | Token for the app registrations
Changed | **GET** organization_units | Added parameter active (filters on active/inactive organization units)
Changed | **PATCH** organization_units/{organization_unit_id} | Property 'active' added
Changed | **POST** organization_units/filter | Property 'external_ids' added, property 'active' added

## Changes in Zenya 7.5.0

Change|Route|Remarks
|--|--|--|
Deleted | **ANY** data | These were the beta routes for the new implementation of the `card file` module. 
Added | **ANY** objects | These are routes for the new implementation of the `card file` module. NB: image_base64 property is still in beta
Deprecated | **ANY** card_files | These are routes for the old implementation of the `card file` module. NB: we do not yet have an alternative for POST list_items.
Changed | **GET** card_files/cards/{card_id} | Removed parameter include_archived
Changed | **PUT** cases/case_types/{case_type_id}/permissions | Added PUT operation
Added | **ANY** question_lists/question_list_templates | Get question list templates
Added | **ANY** question_lists/question_list_templates/{question_list_template_id} | Get a question list template
Changed | **GET** risks | Added parameter object_ids (Get only risks which have these cards) and removed parameter card_ids
Changed | **POST** risks/control_templates | Properties 'control_test_data_type_ids', 'use_manual_field_order' and 'manual_field_order' added
Changed | **PATCH** risks/control_templates/{control_template_id} | Properties 'control_test_data_type_ids', 'use_manual_field_order', 'manual_field_order' and 'clear_consequence_categories' added
Changed | **GET** risks/control_tests | Added parameter object_ids (Get only control tests which have these cards) and removed parameter card_ids
Changed | **GET** risks/controls | Added parameter object_ids (Get only controls which have these cards) and removed parameter card_ids
Changed | **POST** risks/controls/{control_id}/control_tests | Property 'object_id' added 
Changed | **GET** risks/controls/{control_id}/control_tests | Added parameter object_ids (Get only control tests which have these cards)
Changed | **POST** risks/controls/filter | Property 'object_ids' added
Changed | **POST** risks/filter | Property 'object_ids' added
Changed | **POST** risks/risk_templates | limit_allowed_frameworks can now be null
Changed | **GET** organization_units | Removed parameter mode and legacy_mode
Changed | **GET** organization_units/{organization_unit_id} | Removed parameter legacy_mode
Changed | **GET** organization_units/filter/{filter_id} | Removed parameter legacy_mode

## Changes in Zenya 7.4.0 Update 6

Change|Route|Remarks
|--|--|--|
Changed | **GET** campaigns/dashboarding_wake_up | The return type was changed from DateTime to DashboardingWakeUpGetDto 
Changed | **GET** documents/dashboarding_wake_up | The return type was changed from DateTime to DashboardingWakeUpGetDto
Changed | **GET** organization_units | Added a new string parameter called _external_ids_ to filter on external ids

## Changes in Zenya 7.4.0 Update 5

Change|Route|Remarks
|--|--|--|
Changed | **PATCH** documents/{document_id}/v{version} | Added the boolean property 'locked'. This can lock or unlock the document
Changed | **GET** documents/{document_id}/v{version} | Added the boolean parameter 'include_lock_info'. This will return whether the document is locked. If this is the case, it returns an object with lock information
Added | **GET** healthprobe/dashboarding | Returns "ok" to confirm dashboarding is up and running
Changed | **GET** risks/dashboarding_wake_up | Returns an object of type DashboardingWakeUpDto instead of DateTime
Added | **GET** organization_levels | Gets all organization levels
Added | **GET** organization_levels/{organization_level_id} | Gets an organization level

## Changes in Zenya 7.4.0 Update 4

Change|Route|Remarks
|--|--|--|
Added | **PATCH** organization_units/{organization_unit_id} | Updates an organization unit
Added | **DELETE** organization_units/{organization_unit_id} | Deletes an organization unit
Changed | **GET** search | Added the following parameters: _searchScope_ (of type SearchScopeDto?), _collectionId_ (of type int?) and _continuationToken_ (of type string?)

## Changes in Zenya 7.4.0 Update 3

Change|Route|Remarks
|--|--|--|
Added | **POST** organization_units | Creates a new organization unit

## Changes in Zenya 7.4.0 Update 2

Change|Route|Remarks
|--|--|--|
Changed | **GET** risks/controls/filter/{filter_id} | Added the _include_control_test_reviews_ parameter: includes the control test reviews for the control tests when include_latest_control_tests is true
Changed | **GET** risks/controls | Added the _include_control_test_reviews_ parameter: includes the control test reviews for the control tests when include_latest_control_tests is true
Changed | **GET** risks/controls/{control_id} | Added the _include_control_test_reviews_ parameter: includes the control test reviews for the control tests when include_latest_control_tests is true


## Changes in Zenya 7.4.0 Update 1

Change|Route|Remarks
|--|--|--|
Changed | **GET** organization_units/{organization_unit_id} | Added the _legacy_mode_ flag: if set to false, it will return the new dto format
Changed | **GET** organization_units | Added the _legacy_mode_ flag: if set to false, it will return the new dto format
Changed | **GET** organization_units/filter/{filter_id} | Added the _legacy_mode_ flag: if set to false, it will return the new dto format
Added | **POST** cases/{case_id:int}/correspondences | Adds new correspondence
Added | **POST** cases/{case_id:int}/meetings | Adds new meeting

## Changes in Zenya 7.4.0.0

Change|Route|Remarks
|--|--|--|
Added | **ANY** audits and sub routes | Added API for audits
Added | **ANY** findings and sub routes| Added API for findings
Added | **ANY** finding_classifications and sub routes | Added API for finding classification
Changed | **GET** hyperlinks | **Breaking change** Get a list of hyperlinks has been reimplemented to be faster and give more meta data
Changed | **GET** risks | Added filter parameters main_risk_ids, added extension include_sub_risk_actions
Changed | **POST** risks | Added property 'is_main_risk'
Changed | **PATCH** risks/{risk_id} | Property 'overridden_main_risk_properties' added
Added | **ANY** risks/{risk_id}/issues | Added issue management
Changed | **ANY** risks/risk_templates | Added support for framework limitations on the risk templates
Changed | **ANY** risks/control_templates | Added support for framework limitations on the control templates
Changed | **ANY** risks/control_templates | Added support for actions on control tests and control test reviews on the control templates
Added | **ANY** risks/control_tests/{control_test_id}/actions | Manage actions on tests
Added | **ANY** risks/control_test_reviews/{control_test_review_id}/actions | Manage actions on reviews
Changed | **GET** risks/control_tests | Added parameter include_actions, include_reviews and card_ids
Changed | **ANY** risks/controls/{control_id}/control_tests | Added support for hyperlinks on tests
Changed | **POST** risks/controls/{control_id}/issues  | Added support for hyperlinks on issues
Changed | **GET** risks/controls/filter/{filter_id} | Added include_custom_fields and include_custom_field_ids parameters to also include all or specific custom fields 
Changed | **POST** risks/filter | Property 'main_risk_ids' added
Added | **ANY** zenya_url_tokens | Added route to create tokens which can validate if the call was really done by your Zenya
Deleted | **ANY** card_files/sections | **Breaking change** section management was never used from the api
Deleted | **ANY** card_files/{card_file_id}/sections | **Breaking change** section management was never used from the api
------------------------------
Beta routes; these are still subject to change.

Change|Route|Remarks
|--|--|--|
Added | **ANY** data/ | Added API for module formely known as iData / Card files.
Added  | **ANY** compliance/ | Added api for compliance
Added | **ANY** search | Added API for AI search functionality
Added | **ANY** support/example_questions | Added api for AI questions  functionality
Added | **GET** documents/{document_id}/contents/{language} | Get the contents of a document in a certain language

## Changes in Zenya 7.3.0 Update 6

Change|Route|Remarks
|--|--|--|
Added | **ANY** documents/{document_id}/v{version}/contents | Added route to get document(version) contents
Added | **ANY** documents/{document_id}/v{version}/download | Added route to download the file of a document(version)
Changed | **GET** users | Added parameter user_types (The user types to return when getting users)
Changed | **POST** users/filter | Added parameter user_types (The user types to return when getting users)

## Changes in Zenya 7.3.0 Update 4

Change|Route|Remarks
|--|--|--|
Changed | **GET** cases/attachments/{attachment_id}/download | Parameter external_actor_identification_id renamed to external_user_unique_key

## Changes in Zenya 7.3.0 Update 3

| Change  | Route                                                                    | Remarks                                             |
| ------- | ------------------------------------------------------------------------ | --------------------------------------------------- |
| Added   | **GET** `/external_sources`                                              | Added a new property retrieve_data_after_selection (indicates if the full data should be retrieved after selection) and another property in the external_source_field_filter_mode (indicates if the field is hidden or not). |
| Added   | **GET** `/external_sources/{external_source_id }`                       | Added a new property retrieve_data_after_selection (indicates if the full data should be retrieved after selection) and another property in the external_source_field_filter_mode (indicates if the field is hidden or not). |

## Changes in Zenya 7.3.0.0

A lot of routes had the documentation updated to match the code

Change|Route|Remarks
|--|--|--|
Added | **ANY** attachments/stream | Added streaming for attachments
Changed | **POST** bearer_tokens | Added parameter automatic_login ()
Changed | **GET** campaigns | Added parameter include_shared (Whether or not to include the shared status in the response)
Changed | **GET** campaigns/{campaign_id} | Added parameter include_shared (Whether or not to include the shared status in the response)
Changed | **GET** campaigns/{campaign_id} | Added parameter include_last_share (Whether or not to include the last share in the response)
Changed | **GET** campaigns/{campaign_id}/invited_participants | Made the response a paged response
Changed | **ANY** campaigns/{campaign_id}/invited_participants | Added possibility to use an external invited participant
Added | **ANY** campaigns/{campaign_id}/shares | Added API for sharing campaigns
Changed | **GET** cases | Added parameter modified_since (filters on cases that have been modified since the given datetime)
Added | **ANY** cases/attachments/stream | Added streaming for attachments
Changed | **GET** events | Added filtering parameters for events
Added | **ANY** main_processes | Added API for processes
Added | **ANY** planning_activities/activity_types | Added activity types to the API
Changed | **POST** risks/control_templates | Property 'use_processes' added
Changed | **POST** risks/control_templates | Property 'use_code' added to enable the legacy code-field
Changed | **PATCH** risks/control_templates/{control_template_id} | Property 'use_processes' added
Changed | **PATCH** risks/control_templates/{control_template_id} | Property 'use_code' added
Added | **ANY** risks/control_tests | Added API for control tests
Changed | **GET** risks/controls | Added parameter minimum_role (returns only control for which the current user has at least the given role)
Changed | **GET** risks/controls | Added parameter control_testing_enabled (only return controls for which control testing is enabled/disabled)
Changed | **GET** risks/controls | Added parameter control_test_reviewing_enabled (only return controls for which control test reviewing is enabled/disabled)
Changed | **POST** risks/controls | Property 'allow_ad_hoc_review' added
Changed | **POST** risks/controls | Added ad-hoc review functionality
Changed | **POST** risks/controls | Property 'process_ids' added
Changed | **PATCH** risks/controls/{control_id} | Added ad-hoc review functionality
Changed | **PATCH** risks/controls/{control_id} | Property 'process_ids' added
Changed | **POST** risks/controls/filter | Added more filter options for control testing
Changed | **POST** risks/controls/filter | Added minimum role filter
Changed | **POST** risks/filter | Added archived filter
Changed | **GET** risks/filter/{filter_id} | Added include flags
Changed | **POST** risks/risk_templates | Property 'use_processes' added
Changed | **PATCH** risks/risk_templates/{risk_template_id} | Property 'use_processes' added
Added | **ANY** sanitizer | Added API to sanitize HTML
Added | **ANY** tokens/sharing_content_api | Added token-creation functionality for the sharing content API
Removed | **ANY** portals/{portal_id}/content_items/{content_item_id}/details | Removed unsupported API route

> NB: during this release some routes were added which are only for beta features, which could be changed or dropped later on. These were regarding audits, a new way to search and a new way to get support. Don't use these routes because they are very likely to be not compatible with a new release.

## Changes in Zenya 7.2.0.3

Change|Route|Remarks
|--|--|--|
Added | **POST** "cases/safer_causes/{safer_cause_id:int}/cases | Added functionality to create new case for a safer cause
Changed | **GET** campaigns | Added option to include the number of resolved invited participants in response

## Changes in Zenya 7.2.0.0

Change|Route|Remarks
|--|--|--|
Added | V5 of the API | Version 5 of the API has been introduced. This api version contains breaking changes in the users and user_groups api's. For now, the default api version will remain 4. In a future version the default api version will change to 5. If you use the users or user_groups api's, please upgrade to version 5 of the api to prevent errors in the future
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


