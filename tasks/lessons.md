# Lessons

## Do not state external system behavior as fact without checking it

- **Mistake:** Said the Hotmart checkout would still charge $99 after the site moved to $65, without opening the checkout. It already showed $65 for the US.
- **Rule:** The repo only shows what the site displays. For prices on Hotmart or any other external system, check the live source or label the claim as unverified and say what to check.
- **Note:** One Hotmart link can show different prices per country, so check the price for each market.
