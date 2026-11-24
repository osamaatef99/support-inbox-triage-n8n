# AI Support Inbox Triage (n8n + Groq + Gmail + Google Sheets)

Reads new support emails, classifies them (billing, bug, sales, general), rates urgency, saves a suggested reply as a **Gmail draft** (never auto-sends) and logs each ticket in a Google Sheet.

## Flow
Gmail Trigger > Normalize Email > Groq (triage + draft) > Parse AI Result > Gmail draft + Sheets log

## Setup
1. Import `workflow.json` in n8n.
2. Create credentials: Gmail OAuth2, Google Sheets OAuth2, and a Groq credential (n8n "Groq" credential type, your free API key from console.groq.com). Free Groq key: console.groq.com.
3. Sheet columns: received_at, from, subject, category, urgency, summary, ai_ok. Put your sheet ID in the Sheets node.
4. Test with your own test email first, then activate.

## Safety choices
- Draft only, a human reviews before sending.
- If the model returns bad JSON, the ticket is logged as `general / medium` with `ai_ok = false` instead of failing.
- Prompt forbids promising refunds, prices or dates.

## Status
Tested on n8n cloud (Nov 25 2026) in a throwaway copy with a dummy email: Groq returned category billing, urgency high, a safe draft reply. Gmail and Sheets nodes were disabled in the test, so the draft and log steps are untested. Model: openai/gpt-oss-20b on Groq (Llama models on Groq now require an enterprise plan). Credentials and IDs are blank placeholders.
