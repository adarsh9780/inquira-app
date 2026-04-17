---
title: Using OpenRouter
description: Learn how to use OpenRouter to connect various AI providers to Inquira and leverage multiple models through a single API key.
---

# Using OpenRouter

OpenRouter is a unified API gateway that gives you access to 100+ AI models from providers like OpenAI, Anthropic, Google, Mistral, and many more. Inquira integrates OpenRouter so you can bring your own API key and use virtually any supported model without additional cost or vendor lock-in.

## What is OpenRouter?

OpenRouter aggregates AI models from multiple cloud providers under a single, consistent API. Instead of managing separate API keys and endpoints for each provider, you use one OpenRouter key to access a vast catalog of language models. Key benefits:

- **Single Integration**: One API key works across dozens of providers.
- **Unified Pricing**: View and compare model costs in one place.
- **Model Fallback**: Automatic failover if a model is unavailable.
- **No Markup**: You pay the provider's rate directly (plus a small, transparent OpenRouter fee on some models).
- **Privacy**: Your prompts are forwarded directly to the chosen provider; OpenRouter does not store your data by default.

## Why Are We Using OpenRouter?

Inquira's architecture is built around flexibility and user choice. OpenRouter aligns perfectly with those principles:

- **Provider Independence**: Choose the best model for your task without being locked into a single vendor.
- **Bring Your Own Key**: No extra subscription—only what you spend on the underlying provider.
- **Broad Model Access**: Use cutting-edge models like GPT-4o, Claude 3 Opus, Gemini Pro, Llama 3, and dozens more.
- **Future-Proof**: New models appear on OpenRouter automatically; no Inquira update required.
- **Cost Control**: Monitor and set spending limits via the OpenRouter dashboard.

## How to Use an API Key from a Different Provider Using OpenRouter

You can connect any provider supported by OpenRouter in just a few minutes.

### Step 1: Get Your OpenRouter API Key

1. Go to [openrouter.ai](https://openrouter.ai) and create an account.
2. Navigate to **Settings → API Keys**.
3. Click **Create Key** and copy the generated key.

### Step 2: Configure Inquira

1. Open Inquira and go to **Settings**.
2. Find the **AI Providers** section.
3. Select **OpenRouter** as your provider.
4. Paste your API key into the field.
5. Use the model picker to choose a default model (e.g., `openai/gpt-4o`, `anthropic/claude-3-opus`, `google/gemini-pro-1.5`).
6. Click **Save**.

### Step 3: Test the Connection

- Open a new workspace or chat.
- Ask a simple question to verify the model responds.
- If you see errors, double‑check your API key, ensure you have sufficient credits, and confirm the selected model is available to your account.

### Optional: Advanced Configuration

- **Spend Limits**: Set a daily/monthly budget in your OpenRouter dashboard.
- **Multiple Keys**: Create separate keys for different workspaces or use cases.
- **Model Ordering**: Set preferred model fallback order directly on OpenRouter.

## Common FAQs

### Do I have to pay extra fees to OpenRouter?
No. OpenRouter passes through the provider's pricing. You pay exactly what the underlying provider charges for the model you use. OpenRouter may add a small margin on some models—this is shown transparently on their pricing page.

### Which providers and models are supported?
OpenRouter supports 100+ models from providers including OpenAI, Anthropic, Google, Meta (Llama), Mistral AI, Together, and many others. View the full list at [openrouter.ai/models](https://openrouter.ai/models).

### Where does my data go?
When you use OpenRouter, your prompts are sent to the selected model provider. OpenRouter itself does not store your data by default. Each provider has its own privacy policy; review them to understand data handling.

### Can I use local models with OpenRouter?
No. OpenRouter only provides cloud-hosted models. To use local models (e.g., via Ollama), choose the Ollama provider in Inquira's settings instead.

### What if my API key doesn't work?
Common issues:
- Key not copied correctly (check for extra spaces).
- Insufficient credits on the OpenRouter account.
- Model unavailable for your account tier.
- Network/firewall blocking outgoing connections.

### How do I monitor my usage and spending?
Log in to your OpenRouter dashboard to see real-time usage, cost breakdowns by model, and set budget alerts.

### Can I switch between different providers easily?
Yes. Simply change the selected model in Inquira's Settings → AI Providers. You can switch anytime without reconfiguring anything else.

### Are there rate limits?
Rate limits vary by provider and your OpenRouter account tier. Check the OpenRouter documentation for specific limits per model.

### Is my OpenRouter key stored locally?
Yes. Inquira stores your API key locally on your machine and never transmits it to any server other than OpenRouter's API endpoint.

### What happens if OpenRouter goes down?
If the OpenRouter gateway is unavailable, AI features will temporarily stop working. Your data remains safe; you can still use Inquira's local analysis capabilities. Consider also configuring a direct provider key as a backup if needed.
