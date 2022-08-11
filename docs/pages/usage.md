# Usage
`Motion` has a number of powerful features that make your animations slick and simple.

```
import Motion.View, Motion.Ripple from "@uc-engg/motion";
```

### Motion.View

`Motion.View` expects a config of type BaseMotionProps which will be required for driving animation on its children component. 

read about animation configs [here](docs/pages/animation_config.md)

Use animationConfig with `Motion.View`     
```
import Motion from "@design-components/motion";
import animationConfig from "./configs";
import { Button } from 'react-native';

const AnimatingButton: React.FunctionComponent = () => {
  return (
    <Motion.View {...animationConfig}>
        <Button title='Button/>
    </Motion.View>
  );
};

export {AnimatingButton}
```

### Motion.Ripple

`Motion.Ripple` can be used as an alternative to touchableOpacity wherever we want a ripple effect on touch. 

```
import Motion from "@design-components/motion";
import { Button } from 'react-native';

const RippleButton: React.FunctionComponent = () => {
  return (
    <Motion.Ripple onTap={() => console.log('ripple fired')}>
        <Button title='Button'/>
    </Motion.Ripple>;
};

export {RippleButton}
```
