module.exports = {
  updateElementById: (arrayObjects, objectToUpdate) => {
    const indexOfObject = arrayObjects.findIndex((object) => {
      return object.id == objectToUpdate.id;
    });
    if (indexOfObject >= 0) arrayObjects[indexOfObject] = Object.assign({}, objectToUpdate);
    else arrayObjects.push(objectToUpdate);
  },
  deleteElementById: (arrayObjects, objectToDelete) => {
    const indexOfObject = arrayObjects.findIndex((object) => {
      if (object.id == objectToDelete.id) return true;
      else false;
    });
    if (indexOfObject >= 0) arrayObjects = arrayObjects.splice(indexOfObject, 1);
  },
};
