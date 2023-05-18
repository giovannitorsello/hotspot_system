module.exports = {
  updateElementById: (arrayObjects, objectToUpdate) => {
    const indexOfObject = arrayObjects.findIndex((object) => {
      return object.id === objectToUpdate.id;
    });
    if (indexOfObject && indexOfObject >= 0) arrayObjects[indexOfObject] = arrayObjects.splice(indexOfObject, 1);
    else arrayObjects.push(objectToUpdate);
  },
  deleteElementById: (arrayObjects, objectToDelete) => {
    const indexOfObject = arrayObjects.findIndex((object) => {
      return object.id === objectToDelete.id;
    });
    arrayObjects = arrayObjects.splice(indexOfObject, 1);
  },
};
