export type Manifest = DefaultManifest | SignedDefaultManifest | ImageManifest | ManifestList;

/**
 * @deprecated This object is not used anymore. It is kept for backward compatibility.
 */
export interface DefaultManifest {
  schemaVersion: 1;
  name: string;
  tag: string;
  architecture: string;
  fsLayers: {
    blobSum: string;
  }[];
  history: {
    v1Compatibility: string;
  }[];
}

/**
 * @deprecated This object is not used anymore. It is kept for backward compatibility.
 */
export interface SignedDefaultManifest extends DefaultManifest {
  signatures: {
    header: {
      jwk: {
        crv: string;
        kid: string;
        kty: string;
        x: string;
        y: string;
      };
      alg: string;
    };
    signature: string;
    protected: string;
  }[];
}

export interface ImageManifest {
  schemaVersion: 2;
  mediaType: string;
  config: {
    mediaType: string;
    size: number;
    digest: string;
  };
  layers: {
    mediaType: string;
    size: number;
    digest: string;
    urls?: string[];
  }[];
}

export interface ManifestList {
  schemaVersion: 2;
  mediaType: string;
  manifests: {
    mediaType: string;
    size: number;
    digest: string;
    platform: {
      architecture: string;
      os: string;
      "os.version"?: string;
      "os.features"?: string[];
      variant?: string;
      features?: string[];
    }
  }[];
}
