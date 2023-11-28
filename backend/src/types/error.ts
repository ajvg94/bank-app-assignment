export enum ErrorTypes {
  INTERNAL_ERROR = 'An unexpected error occurred while processing the request. Please try again later or contact support for assistance.', 
  UNAUTHORIZED = 'unauthorized',
  NOT_FOUND = 'Resource not found',
  CONFLICT = 'Resource already exists',
  FORBIDDEN = 'Access to the requested resource is forbidden. You do not have the necessary permissions to access this resource. Please contact your administrator to request additional permissions or assistance.',
  BAD_REQUEST = 'badRequest',
  INVALID_EVENT = 'invalidEvent'
}