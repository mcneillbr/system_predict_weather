export function removeIdFromModel(_doc: any, ret: any, _options: any) {
  // remove the _id of every document before returning the result
  delete ret._id;
  return ret;
}
