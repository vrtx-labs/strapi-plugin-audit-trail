# strapi-plugin-audit-trail
A comprehensive audit trail plugin for Strapi that tracks user activities.

This plugin utilizes a middleware to create an audit log of user activities. The audit log is accessible in the Audit Trail content type. The admin page provides a functionality to clear audit trails.

# What is logged
This plugin creates logs in the form of an audit trail content-type for basic admin user actions, like logging in and out, updating user information and interacting with content-type entries.

# How to use
To enable this plugin, put the following code in `/config/plugin.js`:
```
  'audit-trail': {
    enabled: true,
  },
```
Add in /config/middleware.js
```
module.exports = ({ env }) => [
  \\ other middleware
  'plugin::audit-trail.logActivity'
];
```

# Road Map
- provide config for audit items