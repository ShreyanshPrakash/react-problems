import { INestedCheckboxItem } from "./NestedCheckboxes";

export const findTheNodeWithNodeName = (
  name: string,
  config: Array<INestedCheckboxItem>
): INestedCheckboxItem | null => {
  let matchedNode: INestedCheckboxItem | null = null;
  for (let item of config) {
    if (item.name === name) {
      matchedNode = item;
      break;
    }
    if (item.children) {
      matchedNode = findTheNodeWithNodeName(name, item.children);
    }
  }
  return matchedNode;
};

export const udpateDescendants = (
  descendants: Array<INestedCheckboxItem>,
  checked: boolean
): Array<INestedCheckboxItem> => {
  for (let item of descendants) {
    item.checked = checked;
    if (item.children) {
      item.children = udpateDescendants(item.children, checked);
    }
  }
  return descendants;
};

export const updateAncestors = (
  triggerItem: INestedCheckboxItem,
  checked: boolean,
  checkboxState: Array<INestedCheckboxItem>
) => {
  const parentName = triggerItem.parentName;
  const parentNode = findTheNodeWithNodeName(parentName, checkboxState);
  if (parentNode) {
    const isChecked = areAllImmediateDescendantsChecked(
      parentNode.children || []
    );
    parentNode.checked = isChecked;
    if (parentNode.parentName) {
      updateAncestors(parentNode, checked, checkboxState);
    }
  }
};

export const areAllImmediateDescendantsChecked = (
  immediateDescendants: Array<INestedCheckboxItem>
) => {
  for (let descendant of immediateDescendants) {
    if (!descendant.checked) {
      return false;
    }
  }
  return true;
};
