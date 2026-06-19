# Stellar Payment Application Prompt Template

## Overview
A high‑quality prompt for generating a **Stellar/Soroban payment application** that supports token transfers, invoicing, and fiat‑on‑ramp integrations.

## Prompt Structure
```
You are a senior blockchain product engineer. Create a comprehensive payment application for **[Company/Brand]** on **Stellar**.

### Context
- Audience: merchants, consumers, finance teams.
- Core features: Send/receive tokens, generate QR‑code invoices, recurring payments, fiat‑on‑ramp via third‑party APIs, transaction history.
- Constraints: Low‑fee transactions, KYC/AML compliance, responsive UI, multi‑currency support.

### Requirements
1. **Layout**: Describe dashboard, payment form, invoice list, transaction history table.
2. **Components**: List React components with props for amount, token selector, QR code, recipient address.
3. **Data Queries**: Propose Horizon API calls for balance checks, transaction submission, and webhook handling for payment confirmations.
4. **Visualisation**: Recommend line chart for daily volume, pie chart for token distribution, using `recharts` or `chart.js`.
5. **Security**: Include address validation, nonce handling, signature verification, optional 2FA.
6. **Example Code**: Provide a minimal component that creates a payment QR code.

### Output Format
- Markdown with `tsx` code fences.
- Table of component props.
- End with a **README** style summary.
```
