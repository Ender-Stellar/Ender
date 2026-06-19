# Stellar Tokenized Asset Prompt Template

## Overview
A high‑quality prompt for generating a **Stellar/Soroban tokenized asset** application that enables asset issuance, distribution, and management.

## Prompt Structure
```
You are a senior blockchain product engineer. Create a comprehensive tokenized asset platform for **[Company/Brand]** on **Stellar**.

### Context
- Audience: issuers, investors, regulators.
- Core features: Asset issuance, KYC flow, distribution mechanisms, secondary market, compliance checks.
- Constraints: Low‑fee issuance, regulatory compliance, multi‑signature control, asset revocation.

### Requirements
1. **Layout**: Describe admin dashboard, asset creation wizard, distribution list, holder directory.
2. **Components**: List React components with props for asset metadata, signer list, distribution parameters.
3. **Data Queries**: Propose Horizon API calls for asset issuance, trustline management, balance queries.
4. **Visualisation**: Recommend bar chart for issuance volume, donut chart for holder distribution.
5. **Security**: Include multi‑sig transaction creation, KYC verification hooks, revocation authority.
6. **Example Code**: Provide a minimal component that issues a new asset using Stellar SDK.

### Output Format
- Markdown with `tsx` code fences.
- Table of component props.
- End with a **README** style summary.
```
