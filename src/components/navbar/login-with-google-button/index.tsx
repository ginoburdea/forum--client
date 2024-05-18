export default function LoginWithGoogleButton() {
    return (
        <>
            <div
                id="g_id_onload"
                data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                data-context="signup"
                data-ux_mode="popup"
                data-login_uri={process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}
                data-nonce=""
                data-auto_prompt="false"
            ></div>
            <div
                className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="medium"
                data-locale="ro"
                data-logo_alignment="left"
            ></div>
        </>
    );
}
