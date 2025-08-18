import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import {getCredentialsFromIdentityPool} from "./util/GetCredentialsFromIdentityPool.ts";
import {Calendar} from "./component/Calendar.tsx";

function App() {
  const auth = useAuth();
  const [callerIdentity, setCallerIdentity] = useState<any>(null);
  const [callerError, setCallerError] = useState<string>("");

  useEffect(() => {
    const fetchCallerIdentity = async () => {
      if (!auth.isAuthenticated || !auth.user?.id_token) return;
      try {
        const credentials = await getCredentialsFromIdentityPool(auth.user.id_token)

        // AWS SDKの認証情報をIDトークンで取得する場合はCognito Identity Poolが必要です
        // ここではIDトークンを使った一例（実際はCognitoIdentityCredentials等が必要）
        // 参考: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityCredentials.html
        // 今回は簡易的にSTSClientを直接利用（実運用ではCognitoIdentityPool経由で一時クレデンシャル取得が必要）
        const stsClient = new STSClient({
          region: "ap-northeast-1", // 適切なリージョンに変更してください
          credentials,
        });
        const command = new GetCallerIdentityCommand({});
        const response = await stsClient.send(command);
        setCallerIdentity(response);
      } catch (err: any) {
        setCallerError(err.message || String(err));
      }
    };
    fetchCallerIdentity();
  }, [auth.isAuthenticated, auth.user?.id_token]);

  const signOutRedirect = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env .VITE_COGNITO_LOGOUT_URI;
    // const cognitoDomain = "https://<user pool domain>";
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>
        <button onClick={() => auth.removeUser()}>Sign out</button>
        <hr />
        <h3>AWS getCallerIdentity 結果</h3>
        {callerError && <pre style={{color: 'red'}}>Error: {callerError}</pre>}
        {callerIdentity ? (
          <pre>{JSON.stringify(callerIdentity, null, 2)}</pre>
        ) : (
          <pre>取得中...</pre>
        )}
        <Calendar />
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}


export default App
