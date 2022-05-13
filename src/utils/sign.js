import crypto from 'crypto';

/**
 * Generate the signature from the JSON payload using HMAC SHA-256.
 * Use the API SECRET as the secret key for generating the HMAC variant of JSON payload.
 * Signature is in hex format.
 *
 * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#signature-post Ref Bitkub Signature}
 *
 * @param  {object} payload The payload to be signed
 * @param  {string} secret The secret key
 */
export const signHmac = (payload, secret) => {
  const digest = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  return digest;
};

/**
 * The wrapper function for the bitkub signing the payload.
 *
 * @param  {object} payload The payload to be signed
 * @param  {string} secret The secret key
 */
export const signPayload = (payload, secret) => {
  const sig = signHmac(payload, secret);

  return { ...payload, ...{ sig } };
};
