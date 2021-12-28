export const fieldResolver = (fieldObject: unknown) => {
  switch (true) {
    case typeof fieldObject === 'string':
      return fieldObject;
    case typeof fieldObject === 'number':
      return `${fieldObject}`;
    case Array.isArray(fieldObject):
      return `List of size ${fieldObject.length}`;
    case fieldObject === 'object':
      return `Objcet with ${Object.keys(fieldObject).length}`;
    default:
      return 'Unknown';
  }
};
