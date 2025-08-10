import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

export function GetCredentialsFromIdentityPool(idToken: string) {
  const credentials = fromCognitoIdentityPool({
    clientConfig: { region: "ap-northeast-1" },
    identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
     logins: {
       [`cognito-idp.ap-northeast-1.amazonaws.com/${import.meta.env.VITE_COGNITO_USER_POOL_ID}`]: idToken,
     }
  });
  return credentials;
}