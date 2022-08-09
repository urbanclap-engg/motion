import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedReaction,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { getParsedConfig } from './config_parser';
import { useVisibilityStyle, useReanimatedStyles } from './custom_hooks';
import {
	DEFAULT_DELAY,
	DEFAULT_EASING_VALUES,
	DEFAULT_HEIGHT,
	DEFAULT_HIDE_VIEW,
	DEFAULT_OFFSET,
	DEFAULT_REPEAT_PROPS,
	DEFAULT_SPRING_PROPS,
	DEFAULT_TOTAL_DURATION,
	DEFAULT_WIDTH,
} from './constants';
import { getInterPolationConfig } from './interpolation';
import {
	AnimationBasedProps,
	AnimationInitProps,
	BaseMotionProps,
	MotionInterpolationConfig,
	ParsedBaseMotionProps,
} from './types';
import { getAnimationParams } from './animation_params';
import {
	animateFn,
	RepeatAnimateFn,
	SpringAnimationFn,
} from './animation_initializers';
import { AnimationStrategy } from './enums';
import { triggerAnimation } from './animation_trigger';

const MotionView: React.FunctionComponent<BaseMotionProps> = ({
	animationStrategy = AnimationStrategy.REGULAR,
	opacityProps,
	slideAnimationProps,
	scaleAnimationProps,
	animationBasedProps,
	totalDuration = DEFAULT_TOTAL_DURATION,
	delay = DEFAULT_DELAY,
	hideViewPostAnimation = DEFAULT_HIDE_VIEW,
	onAnimationSuccess,
	onAnimationBreak,
	overrideStyle,
	children,
}) => {
	const animationOffset = useSharedValue(DEFAULT_OFFSET);
	const childrenHeight = useSharedValue(DEFAULT_HEIGHT);
	const childrenWidth = useSharedValue(DEFAULT_WIDTH);
	const visibilityOffset = useSharedValue(DEFAULT_OFFSET);
	const interpolationConfig = useSharedValue<MotionInterpolationConfig>({});

	const [startAnimation, setStartAnimation] = useState(false);
	const [viewHidden, setViewHidden] = useState(false);

	const onLayout = (event: LayoutChangeEvent) => {
		childrenHeight.value = event.nativeEvent.layout.height;
		childrenWidth.value = event.nativeEvent.layout.width;
	};

	const animationParams = getAnimationParams(totalDuration, delay);
	useAnimatedReaction(
		() => {
			return childrenHeight.value;
		},
		(childrenHeightCheck: number) => {
			if (childrenHeightCheck > 0) {
				const parsedConfig: ParsedBaseMotionProps = getParsedConfig(
					childrenWidth.value,
					childrenHeight.value,
					opacityProps,
					slideAnimationProps,
					scaleAnimationProps,
				);
				interpolationConfig.value = getInterPolationConfig(
					parsedConfig,
					totalDuration,
				);
				runOnJS(setStartAnimation)(true);
			}
		},
		[childrenHeight],
	);

	const { opacityStyle, slideStyle, scaleStyle } = {
		...useReanimatedStyles(animationOffset, interpolationConfig),
	};
	const { visibilityStyle } = useVisibilityStyle(visibilityOffset);

	useEffect(() => {
		if (startAnimation) {
			if (visibilityOffset.value !== 1) {
				visibilityOffset.value = withTiming(1, {
					duration: opacityProps ? opacityProps[0].duration : 0,
				});
			}
			const animationInitProps: AnimationInitProps = {
				visibilityOffset,
				animationParams,
				hideViewPostAnimation,
				setViewHidden,
				onAnimationSuccess,
				onAnimationBreak,
			};
			const _animationBasedProps: AnimationBasedProps = {
				easingValues:
					animationBasedProps?.easingValues || DEFAULT_EASING_VALUES,
				repeatProps: animationBasedProps?.repeatProps || DEFAULT_REPEAT_PROPS,
				springProps: animationBasedProps?.springProps || DEFAULT_SPRING_PROPS,
			};
			animationOffset.value = triggerAnimation(
				animationStrategy,
				animationInitProps,
				_animationBasedProps,
				animateFn,
				SpringAnimationFn,
				RepeatAnimateFn,
			);
		}
	}, [startAnimation]);

	return viewHidden ? null : (
		<Animated.View
			style={[
				overrideStyle,
				visibilityStyle,
				opacityStyle,
				slideStyle,
				scaleStyle,
			]}
			testID="motion_view"
			onLayout={
				childrenHeight.value === 0 || childrenWidth.value === 0
					? onLayout
					: undefined
			}
		>
			{children}
		</Animated.View>
	);
};

export default MotionView;
