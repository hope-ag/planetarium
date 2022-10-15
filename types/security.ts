export type HTTPMethod = 'GET' | 'HEAD' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'

export interface CorsOptions {
  origin?: '*' | 'null' | (string | RegExp)[] | ((origin: string) => boolean);
  methods?: '*' | HTTPMethod[];
  allowHeaders?: '*' | string[];
  exposeHeaders?: '*' | string[];
  credentials?: boolean;
  maxAge?: string | false;
  preflight?: {
      statusCode?: number;
  };
}

export type RequestSizeLimiter = {
maxRequestSizeInBytes: number;
maxUploadFileRequestInBytes: number;
};

export type RateLimiter = {
tokensPerInterval: number;
interval: string | number;
fireImmediately?: boolean;
};

export type MiddlewareConfiguration<MIDDLEWARE> = {
value: MIDDLEWARE;
route: string;
}

export type XssValidator = {
whiteList: Record<string, any>;
stripIgnoreTag: boolean;
stripIgnoreTagBody: boolean;
css: Record<string, any> | boolean;
} | {};

export type SecurityHeaders = {
crossOriginResourcePolicy: MiddlewareConfiguration<string> | boolean;
crossOriginOpenerPolicy: MiddlewareConfiguration<string> | boolean;
crossOriginEmbedderPolicy: MiddlewareConfiguration<string> | boolean;
contentSecurityPolicy: MiddlewareConfiguration<string> | boolean;
originAgentCluster: MiddlewareConfiguration<string> | boolean;
referrerPolicy: MiddlewareConfiguration<string> | boolean;
strictTransportSecurity: MiddlewareConfiguration<string> | boolean;
xContentTypeOptions: MiddlewareConfiguration<string> | boolean;
xDNSPrefetchControl: MiddlewareConfiguration<string> | boolean;
xDownloadOptions: MiddlewareConfiguration<string> | boolean;
xFrameOptions: MiddlewareConfiguration<string> | boolean;
xPermittedCrossDomainPolicies: MiddlewareConfiguration<string> | boolean;
xXSSProtection: MiddlewareConfiguration<number> | boolean;
};

export interface SecurityPluginOptions {
headers: SecurityHeaders | boolean;
requestSizeLimiter: MiddlewareConfiguration<RequestSizeLimiter> | boolean;
rateLimiter: MiddlewareConfiguration<RateLimiter> | boolean;
xssValidator: MiddlewareConfiguration<XssValidator> | boolean;
corsHandler: MiddlewareConfiguration<CorsOptions> | boolean;
}