import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import { FedapayProvider } from "@/lib/payments/providers/fedapay";

const mutableEnv = process.env as Record<string, string | undefined>;
const oldSecret = process.env.FEDAPAY_WEBHOOK_SECRET;
const provider = new FedapayProvider();

function signedRequest(payload: string, timestamp: number, secret = "test-webhook-secret") {
  const signature = createHmac("sha256", secret).update(`${timestamp}.${payload}`, "utf8").digest("hex");
  return new Request("https://example.test/api/webhooks/fedapay", {
    method: "POST",
    headers: { "x-fedapay-signature": `t=${timestamp},s=${signature}` },
    body: payload,
  });
}

afterEach(() => {
  if (oldSecret === undefined) delete process.env.FEDAPAY_WEBHOOK_SECRET;
  else mutableEnv.FEDAPAY_WEBHOOK_SECRET = oldSecret;
});

describe("FedaPay webhook signature", () => {
  it("accepts a current valid signature", async () => {
    mutableEnv.FEDAPAY_WEBHOOK_SECRET = "test-webhook-secret";
    const payload = JSON.stringify({ id: "event-1", name: "transaction.approved", entity: { id: 42 } });
    const request = signedRequest(payload, Math.floor(Date.now() / 1000));

    await expect(provider.verifyWebhook(request.clone())).resolves.toBe(true);
    await expect(provider.parseWebhook(request)).resolves.toMatchObject({
      id: "event-1",
      type: "transaction.approved",
    });
  });

  it("rejects an invalid signature", async () => {
    mutableEnv.FEDAPAY_WEBHOOK_SECRET = "different-secret";
    const request = signedRequest(JSON.stringify({ id: "event-2" }), Math.floor(Date.now() / 1000));
    await expect(provider.verifyWebhook(request)).resolves.toBe(false);
  });

  it("rejects a signature outside the five-minute window", async () => {
    mutableEnv.FEDAPAY_WEBHOOK_SECRET = "test-webhook-secret";
    const timestamp = Math.floor(Date.now() / 1000) - 301;
    const request = signedRequest(JSON.stringify({ id: "event-3" }), timestamp);
    await expect(provider.verifyWebhook(request)).resolves.toBe(false);
  });
});
