export const mapFirestoreObjectToData = doc => {
  const data = doc.data();
  const id = doc.id;
  return {id, ...data};
};
