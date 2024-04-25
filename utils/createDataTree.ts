// @ts-nocheck
export const createDataTree = <T>(dataset: T[], idFieldName: string = 'id', parentIdFieldName: string = 'parentId') => {
    const hashTable = Object.create(null);
    dataset.forEach(aData => hashTable[aData[idFieldName]] = {...aData, children: []});
    const dataTree: T[] = [];
    dataset.forEach(aData => {
      if(aData[parentIdFieldName]) hashTable[aData[parentIdFieldName]].children.push(hashTable[aData[idFieldName]])
      else dataTree.push(hashTable[aData[idFieldName]])
    });
    return dataTree;
};