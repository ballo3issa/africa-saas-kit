-- Africa SaaS Kit — RLS baseline (V0.8.26)
-- Apply only after the application uses a least-privilege, non-owner runtime DB role.
-- The online gate `npm run security:db-check` verifies that required tables have RLS + policies.
-- Request context must set these LOCAL settings inside the current transaction when using direct RLS reads:
--   SET LOCAL app.user_id = '<authenticated-user-id>';
--   SET LOCAL app.organization_id = '<authorized-organization-id>';

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS subscriptions_tenant_isolation ON subscriptions;
CREATE POLICY subscriptions_tenant_isolation ON subscriptions
  USING (
    user_id = nullif(current_setting('app.user_id', true), '')
    OR organization_id = nullif(current_setting('app.organization_id', true), '')
  )
  WITH CHECK (
    user_id = nullif(current_setting('app.user_id', true), '')
    OR organization_id = nullif(current_setting('app.organization_id', true), '')
  );

DROP POLICY IF EXISTS payments_tenant_isolation ON payments;
CREATE POLICY payments_tenant_isolation ON payments
  USING (
    user_id = nullif(current_setting('app.user_id', true), '')
    OR organization_id = nullif(current_setting('app.organization_id', true), '')
  )
  WITH CHECK (
    user_id = nullif(current_setting('app.user_id', true), '')
    OR organization_id = nullif(current_setting('app.organization_id', true), '')
  );

DROP POLICY IF EXISTS credits_owner_isolation ON credits;
CREATE POLICY credits_owner_isolation ON credits
  USING (user_id = nullif(current_setting('app.user_id', true), ''))
  WITH CHECK (user_id = nullif(current_setting('app.user_id', true), ''));

DROP POLICY IF EXISTS audit_logs_tenant_read ON audit_logs;
CREATE POLICY audit_logs_tenant_read ON audit_logs
  FOR SELECT
  USING (organization_id = nullif(current_setting('app.organization_id', true), ''));
