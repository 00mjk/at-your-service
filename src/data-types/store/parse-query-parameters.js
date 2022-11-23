/**
 * Identify basic information about the query parameters
 * This determines QueryParamStore
 * Which in turn determines the scope of what we can do
 */
export default function parseQueryParameters(queryParams, existingParams) {
  const qpStore = {};
  for (const [qpName, qpValue] of queryParams) {
    qpStore[qpName] = qpValue;
  }
  return qpStore;
}