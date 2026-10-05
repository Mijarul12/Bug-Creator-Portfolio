# Security Specification: Bug Creator Portfolio & Admin Backend

## Data Invariants
1. **Public Read-Only Resources**: Profile (`/profile/*`), Projects (`/projects/*`), Skills (`/skills/*`), Services (`/services/*`), Social Links (`/socialLinks/*`), and Content Items (`/contentItems/*`) can be read by any visitor to display the portfolio.
2. **Admin-Only Modification**: Only the verified admin (`mijarulkhkh@gmail.com` or verified admin doc) can create, update, or delete portfolio content (Projects, Skills, Services, Profile, SocialLinks, ContentItems).
3. **Public Lead Ingestion**: Visitors can create contact inquiries in `/messages` and detailed proposals in `/projectRequests` with strict payload validation and size constraints.
4. **Client Requests & Messages Protection**: Once submitted, messages and project requests can ONLY be listed, read, updated (e.g. status change), or deleted by the Admin. Visitors cannot query or peek into other clients' project requests or contact messages.
5. **Anti-Tampering & Anti-Junk**: All document IDs and string lengths are bounded (preventing Denial of Wallet).

## The Dirty Dozen Attack Payloads
1. Unauthenticated write to `/projects/new-project` -> DENIED (Admin only)
2. Authenticated non-admin write to `/projects/new-project` -> DENIED (Admin only)
3. Non-admin modifying `/profile/main` -> DENIED (Admin only)
4. Non-admin reading list of `/messages` or `/projectRequests` -> DENIED (Admin only)
5. Non-admin reading single document `/messages/{id}` -> DENIED (Admin only)
6. Client injecting 50KB payload into `/messages` body -> DENIED (Exceeds maxLength)
7. Client omitting email or name when posting to `/messages` -> DENIED (Missing required keys)
8. Client attempting to update someone else's `/projectRequests/{id}` -> DENIED (Admin only)
9. Client attempting to delete a `/messages/{id}` -> DENIED (Admin only)
10. Attacker submitting spoofed admin email without `email_verified == true` -> DENIED
11. Malformed document ID with special chars or > 128 chars -> DENIED
12. Attempt to write to arbitrary unspecified collection `/system_secrets/{id}` -> DENIED (Catch-all deny)
