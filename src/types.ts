declare interface Dictionary<T> {
  [index: string]: T;
}

export interface ListResult<T> {
  total: number;
  items: Array<T>;
  errors: any[];
}

export enum SecretType {
  BasicAuth = 'kubernetes.io/basic-auth',
  Opaque = 'Opaque',
  DockerConfig = 'kubernetes.io/dockerconfigjson',
  OAuth2 = 'devops.alauda.io/oauth2',
  SSH = 'kubernetes.io/ssh-auth',
  TLS = 'kubernetes.io/tls',
}

export interface ResourceStatus {
  phase: string;
  message: string;
  [key: string]: any;
}

export interface K8SResource {
  apiVersion?: string;
  kind?: string;
  metadata?: K8SMetaData;
  objectMeta?: K8SMetaData;
  spec: {
    [key: string]: any;
  };
  status?: {
    phase: string;
    message: string;
  };
}

export interface K8SMetaData {
  name: string;
  namespace?: string;
  description?: string;
  creationTimestamp?: string;
  labels?: { [key: string]: string };
  annotations?: { [key: string]: string };
}

export interface ResourceService {
  name: string;
  creationTimestamp: string;
  host: string;
  accessUrl: string;
  secretType?: SecretType;
  secretName?: string;
  secretNamespace?: string;
  html?: string;
  status: ResourceStatus;
  __original: K8SResource;
}

export interface ToolService extends ResourceService {
  toolType: string;
  shallow?: boolean;
  kind: ToolKind;
  type: string;
  public: boolean;
  enterprise: boolean;
  ownerReferences?: Dictionary<string>[];
  [key: string]: any;
}

export interface ToolType {
  name: string;
  displayName: { [key: string]: string };
  enabled: boolean;
  items: Tool[];
}

export interface Tool {
  name: string;
  displayName: { [key: string]: string };
  toolType: string;
  shallow?: boolean;
  kind: ToolKind;
  type: string;
  host: string;
  html: string;
  public: boolean;
  enterprise: boolean;
  enabled: boolean;
  supportedSecretTypes?: ToolSupportedType[];
  recommendedVersion?: string;
  description?: { [key: string]: string };
}

export enum ToolKind {
  Jenkins = 'jenkins',
  CodeRepo = 'codereposervice',
  Registry = 'imageregistry',
  CodeQuality = 'codequalitytool',
  ArtifactRegistry = 'artifactregistry',
  ArtifactRegistryManager = 'artifactregistrymanager',
  ProjectManagement = 'projectmanagement',
}

export interface ToolSupportedType {
  type: string;
  secretType?: string;
  description: { zh: string; en: string };
}
