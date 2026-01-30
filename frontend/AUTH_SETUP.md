# Cross-Domain Authentication Setup

This document describes how to set up cross-domain cookie-based authentication for apps under the `*.ember.new` domain.

## Overview

Authentication is handled centrally by `gibson.ember.new`. Individual apps only need to **read and validate** the auth cookie - they never write it (except for clearing on logout).

## Auth Cookie Details

| Property | Value |
|----------|-------|
| Cookie Name | `gd_auth_token` |
| Cookie Domain | `.ember.new` (shared across all subdomains) |
| Format | Base64url-encoded JSON |
| Login URL | `https://gibson.ember.new` |

## Cookie Payload Structure

The cookie contains a Base64url-encoded JSON object with:

| Field | Type | Description |
|-------|------|-------------|
| `user` | Object | User information |
| `user.username` | String | User's username |
| `user.name` | String | User's display name |
| `user.email` | String | User's email address |
| `user.apps` | Array | List of apps the user has access to |
| `exp` | Number | Expiry timestamp in **milliseconds** |
| `iat` | Number | Issued-at timestamp in milliseconds |
| `iss` | String | Token issuer |

## Implementation Requirements

### 1. Server-Side Middleware

Create middleware that runs on every request:

1. Read the `gd_auth_token` cookie from the request
2. Decode the Base64url value to JSON
3. Validate the token:
   - Check that `user` and `exp` fields exist
   - Check that `exp` > current time (in milliseconds)
4. If invalid or missing:
   - **Page routes**: Redirect to `https://gibson.ember.new?returnUrl={current_url}`
   - **API routes**: Return `401 Unauthorized` JSON response
5. If valid: Allow the request to proceed

### 2. Client-Side Auth Context (Optional)

Provide a React context/hook that:

1. Reads the auth cookie on the client
2. Parses and validates the token
3. Exposes user information to components
4. Provides a logout function that:
   - Clears the cookie with `domain=.ember.new`
   - Redirects to `https://gibson.ember.new`

### 3. Periodic Expiry Check (Optional)

Set up an interval (e.g., every 60 seconds) to:

1. Re-validate the token
2. If expired, redirect to the login page

## Development Mode

For local development, add an environment variable to bypass authentication:

```
NEXT_PUBLIC_SKIP_AUTH=true
```

When enabled:
- Middleware allows all requests through
- Client-side uses a mock user object
- No redirects to external login

## Redirect Flow

```
User visits app.ember.new
        ↓
   Has valid cookie?
    /           \
  Yes            No
   ↓              ↓
Allow access   Redirect to:
               gibson.ember.new?returnUrl=https://app.ember.new/original-path
                      ↓
              User logs in at gibson.ember.new
                      ↓
              Cookie set with domain=.ember.new
                      ↓
              Redirect back to returnUrl
                      ↓
              App reads cookie, allows access
```

## Logout Flow

```
User clicks logout
        ↓
Clear cookie (domain=.ember.new, path=/, expires=past)
        ↓
Redirect to gibson.ember.new
```

## Important Notes

1. **Never write the auth cookie** - only `gibson.ember.new` creates it
2. **Always use milliseconds** for timestamp comparisons (not seconds)
3. **Use Base64url decoding** - standard Base64 won't work (different character set)
4. **Set cookie domain correctly on logout** - must be `.ember.new` to clear the cross-domain cookie
5. **Include returnUrl parameter** - so users return to the correct page after login
