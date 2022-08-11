# Interactions
Currently in `@uc-engg/motion` as of version 1.0.0 we support following interactions independently or in all possible combinations of the following.

* Opacity
* Scale
* Slide

## Sequential and parallel animations
As, Motion expects an array of `commonAnimationProps` we can achieve sequential as well as parallel animations based on start timing and duration, what we would need is a clear picture of timeline for animation in our mind.

### Sequential Animation
On the other hand If we want some object to animate in sequence `(say fade in first and then slide up in sequence)`, the config will look like this, ie both the animations say opacity and slide in Y will start from 0ms and will go till 500ms while adjusting its opacity and slideX keys.

<h1 align="center">
<img width="360" alt="image" src="assets/sequential_animation.gif">
</h1>

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
			duration: 500,
		}
	}];
	
const animationConfig: BaseMotionProps = {
  opacityProps: opacityConfig,
  slideAnimationProps: scaleAnimationConfig,
  animationStrategy: AnimationStrategy.REGULAR,
  delay: 0,
}
```

### Parallel Animation
If we want some object to animate in parallel `(say fade in and slide up in parallel)`, the config will look like this, ie both the animations say opacity and slide in Y will start from o ms and will go till 500ms while adjusting its opacity and slideX keys.

<h1 align="center">
<img width="360" alt="image" src="assets/parallel_animation.gif">
</h1>

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
			startTiming: 0,
			duration: 500,
		}
	}];
	
const animationConfig: BaseMotionProps = {
  opacityProps: opacityConfig,
  slideAnimationProps: scaleAnimationConfig,
  animationStrategy: AnimationStrategy.REGULAR,
  delay: 0,
}
 ```
