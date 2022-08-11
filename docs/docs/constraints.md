# Un'mets
There are certain known limitations to our library feel free to fix it up and raise the change if you want to contribute.

1. we can only scale uniformly if we want to scale in both direction (i.e x and y), the component will scale corresponding to x parameters but in order to scale it in both the direction both parameters are need to be passed.

2. we cannot slide any widget diagonally, the widgets can move either horizontally or vertically but moving it in diagonal direction do not works as expected.

3. In case of slide up and down animations, the creates a space equivalent to its height and than slides depending on the config passed, the height does not animates.