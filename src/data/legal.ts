/**
 * Legal identification shown in the footer.
 *
 * ⚠️ ACTION REQUIRED — these fields are intentionally empty.
 *
 * A financial-services landing page without an identifiable operating entity is
 * a direct negative signal in Meta's destination review. Fill in the real
 * values below (they are not guessable and must not be invented): the footer
 * block renders only when `name` is non-empty, so nothing incorrect ships while
 * they are blank.
 *
 * Example of the expected shape:
 *   name: "Trade4U Prop LLC",
 *   registrationNumber: "12-3456789",
 *   address: "1234 Example Ave, Suite 500, Miami, FL 33131",
 *   country: "United States",
 */
export const legalEntity = {
  /** Full registered company name (razão social / razón social). */
  name: "",
  /** Company registration number (CNPJ, EIN, company number, …). */
  registrationNumber: "",
  /** Registered street address. */
  address: "",
  /** Country of operation. */
  country: "",
  /** Public support address — already in use across the site. */
  email: "support@trade4uprop.com",
};

export const hasLegalEntity = legalEntity.name.trim().length > 0;
