import * as cdk from "aws-cdk-lib"
import { siteConfig } from "@/config/site"

import { CoreInfrastructureStack } from "@/infra/stacks/core-stack"
import { EmailInfrastructureStack } from "@/infra/stacks/email-stack"

const app = new cdk.App()

// We use a dynamic suffix so your local dev stack doesn't clash with production later
const stage = process.env.NODE_ENV === "production" ? "prod" : "dev"

// ── Core Infrastructure Stack ────────────────────────────────────────────────
// This is the mandatory foundation of Oolvay's infrastructure.
//
// It provisions:
// - S3 storage
// - CloudFront CDN
// - IAM upload worker
//
// Other infrastructure modules may depend on this stack.
const core = new CoreInfrastructureStack(
  app,
  `${siteConfig.brand.name.toLowerCase()}-core-${stage}`,
  {
    /* If you don't specify 'env', this stack will be environment-agnostic.
     Account/Region-dependent features and context lookups will not work,
     but a single synthesized template can be deployed anywhere. */
    // env: { account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION },
  }
)

// ── Optional Email Infrastructure Stack ─────────────────────────────────────
// This stack provisions optional SES email infrastructure.
//
// It is intentionally separated from the core stack so users can:
// - deploy it later
// - destroy it independently
// - evolve email infrastructure separately
//
// We explicitly declare a dependency so CDK knows:
// Email stack → depends on → Core stack
//
// Result:
// - If core already exists, only SES deploys.
// - If core is missing, CDK deploys core first automatically.
if (siteConfig.emails.provider === "ses") {
  const email = new EmailInfrastructureStack(
    app,
    `${siteConfig.brand.name.toLowerCase()}-email-${stage}`,
    {
      /* If you don't specify 'env', this stack will be environment-agnostic.
       Account/Region-dependent features and context lookups will not work,
       but a single synthesized template can be deployed anywhere. */
      // env: { account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION },
    }
  )

  email.addDependency(core)
}
