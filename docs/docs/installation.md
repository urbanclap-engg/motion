# Installation
`Motion` is built using `react-native-reanimated` apis, and Hence it is expected to be used within react-native apps only.
it works well with react-native version 0.66.0 and above.

## Install Reanimated 2
Motion also depends on react-native-reanimated ,hence you will also require that in your project.

`Motion 1.0.0 and above requires Reanimated 2.3.0 or higher`  

you can check for reanimated installation guide [here](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/)

## Install Motion
Motion is currently published at npm registry, so to install it you need to set the registry as https://registry.npmjs.org/

you can do that with command npm set registry=https://registry.npmjs.org/ , make sure to check if the registry is set using command npm get registry , also as motion is scoped under @uc-engg/ and if you have a .npmrc file just add the above mentioned registry corresponding to this scope.

`Post that it will be Ezz Pzz` 
* just run command:
```
npm install @uc-engg/motion
```

## Create your first animation
```
import Motion from '@design-components/motion';

<Motion.View {...motionConfig}>
    {children}
 </Motion.View>
 ```