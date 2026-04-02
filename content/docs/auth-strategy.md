---
title: Authentication Strategy
description: How authentication and accounts work in Inquira.
---

# Authentication Strategy

Inquira is designed to work without mandatory accounts while offering optional cloud sync for users who want it.

## No Login Required (Default)

**Community Edition works entirely offline:**
- No account required to use the app
- All data stays on your local machine
- Works completely disconnected from the internet

## Optional Cloud Services

Users can optionally connect cloud AI providers:

### Supported Providers
- **OpenAI**: GPT-4, GPT-3.5
- **Anthropic**: Claude models
- **OpenRouter**: Unified API for multiple providers
- **Ollama**: Local models on your network

### Connecting a Provider

1. Go to **Settings** → **AI Providers**
2. Enter your API key
3. Choose your preferred model
4. Test the connection

:::warning
Your API key is stored locally and never sent to our servers.
:::

## Future: Account Features

We're exploring optional account features for future releases:

- **Workspace sync**: Sync your workspaces across devices
- **Settings sync**: Your preferences available everywhere
- **Team management**: Share workspaces with team members

## Enterprise SSO

Enterprise edition will include:
- LDAP/Active Directory integration
- SAML-based SSO
- Centralized user management

## Data Privacy

With optional cloud AI:
- Only your query is sent to the provider
- Your data never leaves your machine for AI processing
- Each provider's privacy policy applies