import { SecurityPluginOptions } from "./types/security";

export const securityConfig: SecurityPluginOptions = {
  headers: {
    crossOriginResourcePolicy: {
      value: "same-origin",
      route: '',
    },
    crossOriginOpenerPolicy: {
      value: "same-origin",
      route: '',
    },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      value:
        "base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
      route: '',
    },
    originAgentCluster: {
      value: "?1",
      route: '',
    },
    referrerPolicy: {
      value: "no-referrer",
      route: '',
    },
    strictTransportSecurity: {
      value: "max-age=15552000; includeSubDomains",
      route: '',
    },
    xContentTypeOptions: {
      value: "nosniff",
      route: '',
    },
    xDNSPrefetchControl: {
      value: "off",
      route: '',
    },
    xDownloadOptions: {
      value: "noopen",
      route: '',
    },
    xFrameOptions: {
      value: "SAMEORIGIN",
      route: '',
    },
    xPermittedCrossDomainPolicies: {
      value: "none",
      route: '',
    },
    xXSSProtection: {
      value: 0,
      route: '',
    },
  },
  requestSizeLimiter: {
    value: {
      maxRequestSizeInBytes: 2000000,
      maxUploadFileRequestInBytes: 8000000,
    },
    route: '',
  },
  rateLimiter: {
    // Twitter search rate limiting
    value: {
      tokensPerInterval: 150,
      interval: "hour",
      fireImmediately: true,
    },
    route: '',
  },
  xssValidator: {
    value: {},
    route: '',
  },
  corsHandler: {
    value: {
      origin: '*',
      methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
      preflight: {
        statusCode: 204
      }
    },
    route: '',
  }
}