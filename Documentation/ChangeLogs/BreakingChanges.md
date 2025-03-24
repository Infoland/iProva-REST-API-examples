# Breaking Changes

This document explains how breaking changes are handled in the Zenya API and what developers need to know to handle them effectively.

## What are Breaking Changes?

Breaking changes are modifications to the API that are not backward compatible with previous versions. These changes can affect how your application interacts with the API and may require updates to your code to continue functioning correctly.

## Types of Breaking Changes

1. **Route Changes**
   - Removal of existing routes
   - Changes to route paths
   - Changes to HTTP methods supported by routes

2. **Response Format Changes**
   - Removal of fields from response objects
   - Changes to field types
   - Changes to response structure

3. **Request Format Changes**
   - Removal of supported parameters
   - Changes to parameter types
   - Changes to required parameters

4. **Authentication Changes**
   - Changes to authentication methods
   - Changes to token formats
   - Changes to authorization requirements

## How We Handle Breaking Changes

### Versioning Strategy

We only create a new major API version when all routes are impacted by breaking changes. For individual route changes, we perform a risk assessment to determine the impact and provide transition periods when needed.

### Risk Assessment Process

1. **Usage Analysis**
   - We analyze API usage patterns to identify actively used routes
   - Routes with significant usage are flagged for special handling

2. **Transition Period**
   - For actively used routes, we provide a transition period
   - During this period, both old and new implementations are supported
   - This allows developers to gradually update their applications

3. **Communication**
   - Breaking changes are documented in the [Changelog](Changelog.md)
   - Changes are marked with "**Breaking change**" label
   - Transition periods and deadlines are clearly communicated

## Best Practices for Developers

1. **Version Management**
   - Always specify the API version in your requests
   - Use the latest stable version when possible
   - Test your application with new versions before deploying to production

2. **Monitoring Changes**
   - Regularly check the changelog for updates
   - Pay special attention to breaking changes and transition periods
   - Plan updates to your application based on announced changes

3. **Testing**
   - Test your application with new API versions in a development environment
   - Update your test cases to reflect API changes
   - Verify all functionality after implementing changes

## Getting Help

If you encounter issues with breaking changes or need assistance updating your application:

1. Check the [Changelog](Changelog.md) for detailed information
2. Review the API documentation for the specific version you're using
3. Contact support if you need additional guidance

## Breaking Changes Overview

### Zenya 7.6.0

These routes have been removed after being deprecated since 7.4.0. These have been used outside of Zenya.
- **Deleted**: `data` routes (beta routes for new `card file` module implementation)
- **Deprecated**: `card_files` routes (old implementation of `card file` module)

These changes required developers to:
- Change `ANY card_files` => `ANY objects/data_types` or `ANY objects/custom_fields`.
- Change `ANY cards` => `ANY objects`.
- base64 image properties => should be replaced with the attachment system.
- Removed `POST list_items` => no replacement, because assesed not to be used outside Zenya.


These routes have been removed in V4 after being deprecated since 7.2.0. These have been used outside of Zenya.
- `ANY users`
- `ANY user_groups`

These changes required developers to:
- Start using V5 of the api (or later)
- Double check the properties used of the `user` and `user_group` resource used.

### Zenya 7.5.0

These were changed without a transition period because it gave a weird result.
- **Changed**: `GET card_files/cards/{card_id}` - Removed parameter `include_archived`

These were changed without a transition period because they were assessed not to be used outside Zenya.
- **Changed**: `GET risks` - Added parameter `object_ids`, removed parameter `card_ids`
- **Changed**: `GET risks/control_tests` - Added parameter `object_ids`, removed parameter `card_ids`
- **Changed**: `GET risks/controls` - Added parameter `object_ids`, removed parameter `card_ids`

The legacy mode was removed, after being marked as deprecated in 7.4.0
- **Changed**: `GET organization_units` - Removed parameters `mode` and `legacy_mode`
- **Changed**: `GET organization_units/{organization_unit_id}` - Removed parameter `legacy_mode`
- **Changed**: `GET organization_units/filter/{filter_id}` - Removed parameter `legacy_mode`

### Zenya 7.4.0

These were removed or changed without transition period because there were assesed not to be used outside Zenya
- **Changed**: `GET hyperlinks` - Reimplemented for better performance and more metadata
- **Deleted**: `card_files/sections` - Section management was never used from the API
- **Deleted**: `card_files/{card_file_id}/sections` - Section management was never used from the API

### Zenya 7.2.0.0

These were changed or removed without transition period because they were assessed not to be used outside of Zenya.
- **Changed**: `GET campaigns` - Introduced paging and property filtering
- **Changed**: `GET campaigns/{campaign_id}` - Introduced property filtering
- **Changed**: `GET users` - Removed parameter `name_logincode_email_contains` (renamed to `name_login_code_email_contains`)
- **Removed**: Windows and i+Sync authentication - Removed due to technical limitations in SaaS deployments
- **Changed**: `GET settings/languages` - Changed the DTO returned



1. Update their campaign retrieval logic to handle pagination
2. Modify their campaign detail requests to use property filtering
3. Update user search parameters to use the new naming convention

