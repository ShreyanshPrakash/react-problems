import { ICheckboxItem } from "./NextedCheckboxTry";

export const findNodeFromName = (
  name: string,
  config: Array<ICheckboxItem>
): ICheckboxItem | null => {
  let matchedNode: ICheckboxItem | null = null;

  for (let item of config) {
    if (item.name === name) {
      matchedNode = item;
      break;
    }

    if (item.children.length) {
      matchedNode = findNodeFromName(name, item.children);
      if (matchedNode) {
        break;
      }
    }
  }

  return matchedNode;
};

export const updateDescendants = (
  descendants: Array<ICheckboxItem>,
  checked: boolean
): Array<ICheckboxItem> => {
  for (let item of descendants) {
    item.checked = checked;

    if (item.children) {
      item.children = updateDescendants(item.children, checked);
    }
  }

  return descendants;
};

export const updateAncestors = (
  node: ICheckboxItem,
  state: Array<ICheckboxItem>
) => {
  const parentName = node.parentName;
  const parentNode = findNodeFromName(parentName, state);
  if (parentNode) {
    const isChecked = areAllImmediateDescendantsChecked(parentNode.children);

    parentNode.checked = isChecked;

    if (parentNode.parentName) {
      updateAncestors(parentNode, state);
    }
  }
};

export const areAllImmediateDescendantsChecked = (
  descendants: Array<ICheckboxItem>
) => {
  for (let item of descendants) {
    if (!item.checked) {
      return false;
    }
  }
  return true;
};
