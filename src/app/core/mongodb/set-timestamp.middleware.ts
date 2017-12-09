import { Timestamped } from './timestamped';

export function setTimestamp(this: Timestamped, next) {
  this.lastModifiedDate = new Date();
  return next();
}
