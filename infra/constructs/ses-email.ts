import * as cdk from "aws-cdk-lib"
import * as ses from "aws-cdk-lib/aws-ses"
import { Construct } from "constructs"

export interface SesEmailConstructProps {
  senderDomain: string
}

export class SesEmailConstruct extends Construct {
  public readonly identity: ses.EmailIdentity

  constructor(scope: Construct, id: string, props: SesEmailConstructProps) {
    super(scope, id)

    this.identity = new ses.EmailIdentity(this, "SesIdentity", {
      identity: ses.Identity.domain(props.senderDomain),
    })

    new cdk.CfnOutput(this, "SesVerifiedDomain", {
      value: props.senderDomain,
    })
  }
}
