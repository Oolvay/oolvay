import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"

import { SesEmailConstruct } from "@/infra/constructs/ses-email"
import { siteConfig } from "@/config/site"

export class EmailInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new SesEmailConstruct(this, "SesEmailModule", {
      senderDomain: siteConfig.brand.domain,
    })
  }
}
