export default function LoginWithGoogleButton() {
    return (
        <>
            <div
                data-login_uri={process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}
                data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                data-auto_prompt="false"
                data-context="signup"
                data-ux_mode="popup"
                id="g_id_onload"
                data-nonce=""
            ></div>
            <div
                data-logo_alignment="left"
                data-shape="rectangular"
                className="g_id_signin"
                data-text="signin_with"
                data-theme="outline"
                data-type="standard"
                data-size="medium"
                data-locale="ro"
            ></div>
        </>
    );
}
