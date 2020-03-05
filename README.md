# Jira ticket commenter

This action will post a new comment on a Jira ticket, if an comment with the same `app-name` exist it will update the old one.

## Inputs

### `jira-endpoint`

**required**:

### `jira-issue-id`

**required**

### `jira-account`

**required**

### `jira-auth-token`

**required**

### `app-name`

**required**

### `deploy-preview-url`

**required**

## Example

```yml
jobs:
 build:
  runs-on: ...
  steps:
    - name: Jira push comment
      uses: actions/jira-ticket-comment@v2.0.1
      with:
        jira-endpoint: get from secrets
        jira-issue-id: ...
        jira-account: example@com
        jira-auth-token: ***
        app-name: PMS
        deploy-preview-url: https://preview-example.com
```
