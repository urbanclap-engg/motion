## CommonAnimationProps
This is the type being used for very animation in very atomic unit in our library say, opacity.

1. `fromValue:` expects the value from which the animation should start in terms of number or string.
2. `toValue:` expects a value upto which the animation should run in terms of number or string.
3. `startTiming:` is the value at which the animation should start in milliseconds.
4. `duration:` is the value upto which the animation should run in milliseconds starting from startTiming.
```
type CommonAnimationProps = {
	fromValue: number | string;
	toValue: number | string;
	startTiming: number;
	duration: number;
};
```

## PositionBasedAnimationProps
This type is being used for animations which are based on position for example scale and slide as they are dependent on x and y direction.

1. `x:` defines how the corresponding animation will behave in x direction based on commonAnimationProps.
2. `y:` defines how the corresponding animation will behave in x direction based on commonAnimationProps.

```
type PositionBasedAnimationProps = {
    x?: CommonAnimationProps;
    y?: CommonAnimationProps;
};
```

## EasingValues
Defines the values for Easing.bezier in order w, x, y, z.
```
type EasingValues = {
    w: number;
    x: number;
    y: number;
    z: number;
};
```

## RepeatProps
1. `repeatCount:` expects a number defining how many times the animation should repeat itself.
2. `loop:` if sent true the animation should run indefinitely repeating on the basis of prop reverseOnRepeat
3. `reverseOnRepeat:` signifies which path should animation follow i.e if the animation was running in order `a->b->c`  should it repeat `c->b->a` or `a->b->c` . 

```
type RepeatProps = {
    repeatCount?: number;
    loop?: boolean;
    reverseOnRepeat?: boolean;
};
```

## AnimationBasedProps
`AnimationStrategy` 
* defines weather an animation should follow a repeat strategy or a regular one.
```
AnimationStrategy {
    REGULAR = 'regular',
    REPEAT = 'repeat',
}
```
`AnimationBasedProps`
* expects one of the below mentioned props based on the strategy you have selected.
```
type AnimationBasedProps = {
    easingValues?: EasingValues;
    repeatProps?: RepeatProps;
};
```

## BaseMotionProps

This is the type of the config that will be expected by user for driving the animation, it expects all the props those are present in AnimationStylingProps and also add some more attributes to it.

1. `opacityProps:` expects an array consisting items of type commonAnimationProps which will be defining how the opacity animation should take place.
2. `slideAnimationProps:` expects an array consisting items of type PositionBasedAnimationProps which will be defining how the slide animation should take place in x and Y direction.
3. `scaleAnimationProps:` expects an array consisting items of type PositionBasedAnimationProps which will be defining how the scale animation should take place in x and y direction.
4. `delay:` is a number and will define delay in starting the animation if not passed taken as 0 ms.
5. `totalDuration:` is a number will define for how long entire animation will last in milliSeconds and is 1 second if not passed.
6. `hideViewPostAnimation:` expects boolean on which it decides weather the component should unmount once animation is complete or not.
7. `animationStrategy:` expects a string which will define whether the animation should repeat itself, should follow a spring motion or play a regular animation as specified by the config.
8. `animationBasedProps:`  expects props for animation on the basis of strategy you have selected.
9. `onAnimationSuccess:` a callback to configure what will happen when an animation completes.
10. `onAnimationBreak:` a callback to configure what will happen when an animation breaks in middle.

```
type AnimationStylingProps = {
	opacityProps?: CommonAnimationProps[];
	slideAnimationProps?: PositionBasedAnimationProps[];
	scaleAnimationProps?: PositionBasedAnimationProps[];
	delay?: number;
	totalDuration?: number;
	hideViewPostAnimation?: boolean;
};
```

```
type BaseMotionProps = AnimationStylingProps & {
    animationStrategy?: AnimationStrategy;
    animationBasedProps?: AnimationBasedProps;
    onAnimationSuccess?(): void;
    onAnimationBreak?(): void;
    overrideStyle?: any;
};
```