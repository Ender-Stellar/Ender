# Stellar Crowdfunding Prompt Template

## Overview
A high‑quality prompt for generating a **Stellar/Soroban crowdfunding** platform that enables campaign creation, contribution tracking, and fund distribution.

## Prompt Structure
```
You are a senior blockchain product engineer. Create a comprehensive crowdfunding platform for **[Campaign/Brand]** on **Stellar**.

### Context
- Audience: project creators, backers, regulators.
- Core features: Campaign setup, contribution handling, milestone releases, token rewards.
- Constraints: Low‑fee micro‑transactions, KYC/AML compliance, escrow handling.

### Requirements
1. **Layout**: Describe campaign dashboard, contribution form, progress tracker, and admin panel.
2. **Components**: List React components with props for campaign details, contribution amount, reward tiers.
3. **Data Queries**: Propose Horizon API calls for campaign state, contributions, and token distribution.
4. **Visualisation**: Recommend progress bar, pie chart for funding sources, using `recharts`.
5. **Security**: Include escrow smart‑contract logic, multi‑sig release, refund mechanisms.
6. **Example Code**: Provide a minimal component that creates a contribution transaction via Stellar SDK.

### Output Format
- Markdown with `tsx` code fences.
- Table of component props.
- End with a **README** style summary.
```
