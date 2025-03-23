


# INSIGHTS :

1. You can create one config that will create the tabs button and have another array of components that needs to be mounted. Mapping will be done based on the index of array vs active tab index
2. This way we are able to work with just one loop
3. Or just put both in same config and for tab panel use active tab index as index to get the component out of the config


# Requirements :

1. It should show tabs
2. Tabs should be configurable
3. On click of a tab, the related tab content should be shown below