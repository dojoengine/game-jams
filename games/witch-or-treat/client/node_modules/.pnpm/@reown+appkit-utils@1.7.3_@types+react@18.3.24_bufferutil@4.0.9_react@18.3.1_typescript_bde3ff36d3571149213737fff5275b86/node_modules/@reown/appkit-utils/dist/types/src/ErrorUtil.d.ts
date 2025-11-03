export declare const ErrorUtil: {
    UniversalProviderErrors: {
        UNAUTHORIZED_DOMAIN_NOT_ALLOWED: {
            message: string;
            alertErrorKey: string;
        };
        JWT_VALIDATION_ERROR: {
            message: string;
            alertErrorKey: string;
        };
        INVALID_KEY: {
            message: string;
            alertErrorKey: string;
        };
    };
    ALERT_ERRORS: {
        SWITCH_NETWORK_NOT_FOUND: {
            shortMessage: string;
            longMessage: string;
        };
        INVALID_APP_CONFIGURATION: {
            shortMessage: string;
            longMessage: () => string;
        };
        SOCIALS_TIMEOUT: {
            shortMessage: string;
            longMessage: () => string;
        };
        JWT_TOKEN_NOT_VALID: {
            shortMessage: string;
            longMessage: string;
        };
        INVALID_PROJECT_ID: {
            shortMessage: string;
            longMessage: string;
        };
        PROJECT_ID_NOT_CONFIGURED: {
            shortMessage: string;
            longMessage: string;
        };
    };
};
