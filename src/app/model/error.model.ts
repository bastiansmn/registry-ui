export type ErrorType =
  | "UNKNOWN"
  | "BLOB_UNKNOWN"
  | "BLOB_UPLOAD_INVALID"
  | "BLOB_UPLOAD_UNKNOWN"
  | "DIGEST_INVALID"
  | "MANIFEST_BLOB_UNKNOWN"
  | "MANIFEST_INVALID"
  | "MANIFEST_UNKNOWN"
  | "MANIFEST_UNVERIFIED"
  | "NAME_INVALID"
  | "NAME_UNKNOWN"
  | "PAGINATION_NUMBER_INVALID"
  | "RANGE_INVALID"
  | "SIZE_INVALID"
  | "TAG_INVALID"
  | "UNAUTHORIZED"
  | "DENIED"
  | "UNSUPPORTED"
  | "TOOMANYREQUESTS";

export interface Error {
  code: ErrorType;
  message: string;
  detail: any;
}

export default interface ErrorResponse {
  errors: Error[];
}
