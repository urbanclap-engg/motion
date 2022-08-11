# Animation Config
`Motion.View` expects a config of type `BaseMotionProps` which will be required for driving animation on its children component. Hence at first, you need to create your animation config on the basis of timeline of your animation such as for below mentioned timeline

<img width="1288" alt="image" src="https://user-images.githubusercontent.com/35339165/183665865-83fc2e06-0ab9-4135-b5ce-91c519a53f27.png">

## The config would be
```
const opacityConfig: CommonAnimationProps = [{
		fromValue: 0,
		toValue: '100%',
		startTiming: 0,
		duration: 150,
	}];
```

# Configs with respect to animations
## Opacity Animations
If you want to animate your Button’s opacity from 0 to 1 in 500ms, you can create config somewhat like below mentioned and pass it to the Motion.View rest all will be handled internally.

```
const opacityConfig: CommonAnimationProps = [{
		fromValue: 0,
		toValue: 1,
		startTiming: 0,
		duration: 500,
	}];

const animationConfig: BaseMotionProps = {
  opacityProps: opacityConfig,
  animationStrategy: AnimationStrategy.REGULAR,
  delay: 0,
}
```
## Slide Animations
If you want your button to slide from bottom to top, you can create config somewhat like below mentioned and pass it to the Motion.View rest all will be handled internally.

```
const slideAnimationConfig: PositionBasedAnimationProps = [{
		y: {
			fromValue: '100%',
			toValue: 0,
			startTiming: 0,
			duration: 1000,
		}
	}];

const animationConfig: BaseMotionProps = {
  slideAnimationProps: slideAnimationConfig,
  animationStrategy: AnimationStrategy.REGULAR,
  delay: 0,
}
```

## Scale Animations
If you want your button to scale in both direction giving a circle expansion effect, you can create config somewhat like below mentioned and pass it to the Motion.View rest all will be handled internally.

```
const scaleAnimationConfig: [
		{
			x:{
					fromValue: 0,
					toValue: 1,
					startTiming: 0,
					duration: 1000,
			},
			y:{
					fromValue: 0,
					toValue: 1,
					startTiming: 0,
					duration: 1000,
			},
		},
	],

const animationConfig: BaseMotionProps = {
  scaleAnimationProps: scaleAnimationConfig,
  animationStrategy: AnimationStrategy.REGULAR,
  delay: 0,
}
```
## Custom Animations
You can also create custom animations which can be made using opacity, slide or scale in the following way.

```
const opacityConfig: CommonAnimationProps = [{
		fromValue: 0,
		toValue: 1,
		startTiming: 0,
		duration: 500,
	}];
	
const slideAnimationConfig: PositionBasedAnimationProps = [{
		y: {
			fromValue: '100%',
			toValue: 0,
			startTiming: 500,
			duration: 1000,
		}
	}];
	
const animationConfig: BaseMotionProps = {
  opacityProps: opacityConfig,
  slideAnimationProps: scaleAnimationConfig,
  animationStrategy: AnimationStrategy.REGULAR,
  delay: 0,
};
```