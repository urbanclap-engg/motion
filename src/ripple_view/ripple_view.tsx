import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	TapGestureHandler,
	TapGestureHandlerGestureEvent,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
	measure,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { RippleProps } from './types';

const Ripple: React.FC<RippleProps> = ({
	style,
	onTap,
	containerWidth = 'auto',
	containerHeight = 'auto',
	disabled = false,
	children,
}) => {
	const rippleDuration = 1000;
	const centerX = useSharedValue(0);
	const centerY = useSharedValue(0);
	const scale = useSharedValue(0);

	const aRef = useAnimatedRef<View>();
	const width = useSharedValue(0);
	const height = useSharedValue(0);

	const rippleOpacity = useSharedValue(1);

	const tapGestureEvent =
		useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
			onStart: (tapEvent) => {
				const layout = measure(aRef);
				width.value = layout.width;
				height.value = layout.height;

				centerX.value = tapEvent.x;
				centerY.value = tapEvent.y;

				rippleOpacity.value = 1;
				scale.value = 0;
				scale.value = withTiming(1, { duration: rippleDuration });
			},
			onActive: () => {
				if (onTap) runOnJS(onTap)();
			},
			onFinish: () => {
				rippleOpacity.value = withTiming(0);
			},
		});

	const styles = StyleSheet.create({
		dimensions: {
			height: containerHeight,
			width: containerWidth,
			overflow: 'hidden',
		},
	});
	const rStyle = useAnimatedStyle(() => {
		const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

		const translateX = centerX.value - circleRadius;
		const translateY = centerY.value - circleRadius;

		return {
			width: circleRadius * 2,
			height: circleRadius * 2,
			borderRadius: circleRadius,
			opacity: rippleOpacity.value,
			backgroundColor: 'rgba(0,0,0,0.2)',
			position: 'absolute',
			top: 0,
			left: 0,
			transform: [
				{ translateX },
				{ translateY },
				{
					scale: scale.value,
				},
			],
		};
	});

	// const onLayout
	return disabled ? (
		<>{children}</>
	) : (
		/* @ts-ignore: Ignoring presence of isForced in ViewProps */
		<GestureHandlerRootView isForced>
			<View testID={__DEV__?"ripple_view":undefined} ref={aRef} style={[style, styles.dimensions]}>
				<TapGestureHandler onGestureEvent={tapGestureEvent}>
					<Animated.View style={[{ overflow: 'hidden' }]}>
						{children}
						<Animated.View style={rStyle} />
					</Animated.View>
				</TapGestureHandler>
			</View>
		</GestureHandlerRootView>
	);
};

export default Ripple;
