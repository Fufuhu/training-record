import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import type { AwsCredentialIdentity } from "@aws-sdk/types";

export async function getCredentialsFromIdentityPool(idToken: string): Promise<AwsCredentialIdentity> {
  const identityPoolId = import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID as string;
  const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID as string;

  if (!identityPoolId || !userPoolId) {
    throw new Error("Cognito Identity Pool ID(VITE_COGNITO_IDENTITY_POOL_ID) or User Pool ID(VITE_COGNITO_USER_POOL_ID) is not set in environment variables.");
  }

  const credentials = await fromCognitoIdentityPool({
    clientConfig: { region: "ap-northeast-1" },
    identityPoolId: identityPoolId,
     logins: {
       [`cognito-idp.ap-northeast-1.amazonaws.com/${userPoolId}`]: idToken,
     }
  });
  return credentials;
}