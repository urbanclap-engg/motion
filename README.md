# Motion 
## Overview

    - Motion library expects a config of type MotionComponentProps which consists parameters (fromValue , toValue , startTiming & duration ) for opacity, scale and slide animations. We are using react-native-reanimated library for rendering animations over the widgets. The animation can either be applied on layout widgets (i.e the widgets being used directly on the screen say full-width-card  or header ) by passing motionParams corresponding to layout id in dataStore or by passing motionParams as a prop to the minor widgets (such as Badge ) which are used inside main components to create major components like textStack . We have also defined some basic tokens for motion which you can access by  ViewAnimationType  or HideAnimationType which consists of basic animations such as OP1, OP2, etc.
    - In case of custom animations say for different combinations of Animation tokens OP1, Scale, OP2,  customAnimationConfig of type AnimationStylingProps can be used. I have attached a sample animation config below.

## How can you use it?

    In order to animation to be applied motionParams which are type of MotionComponentProps need to be passed in the datastore corresponding to widgetId to which we want motion applied.

    In case of Animations which uses directly defined tokens from motionLibrary, we will be using the tokens present in ViewAnimationType and HideAnimationType.

    For custom Animations we need to define one token say custom_bubble and add config for animation corresponding to ViewAnimationType.custom_bubble in getViewAnimationConfig at packages/customer/src/vdlComponents/AdsMotion/motionComponent/utils.ts .

    Config will consist of opacity, scale and slide parameters which will be of type CommonAnimationProps  attaching a sample config in examples section for reference.   

## Examples

    1. For Animation like the tag scaling from '100%' to '105%' and back from '105%' to '100%'. Configs will be:
        a. If the tag is being used directly as a widget in Layout
    {
		layout: {
			id: 'test-list',
			type: LAYOUTS.LIST,
			widgets: {
				default: [
					{
						id: 'tag',
						type: ADS_PRIMARY_WIDGET.BADGE,
					},
				],
			},
		},
		dataStore: {
			'test-list': {
				listFooterSpace: 72,
			},
			tag: {
				tagType: TagType.Boxed,
				color: TagColor.Warning,
				text: 'Here I am Tag',
				svgIcon: 'ic_minus',
				motionParams: {
					speedCurve: SpeedCurveType.SG1,
					animationState: AnimationState.VIEW,
					animationConfig: {
						onView: {
							animationType: ViewAnimationType.TRANSFORM,
							delay: 0,
						},
						onHide: {
							animationType: HideAnimationType.SLIDE_OUT_DOWN,
							delay: 0,
						},
					},
					onAnimationSuccess: {
						type: 'OPEN_MODAL',
						data: {},
					},
					onAnimationBreak: {
						type: 'OPEN_BOTTOM_SHEET',
						data: {},
					},
				},
			},
		},
	}

    b. If the tag is being used inside any component say textStack.

    {
		layout: {
			id: 'test-list',
			type: LAYOUTS.LIST,
			widgets: {
				default: [
					{
						id: 'textStack',
						type: ADS_PRIMARY_WIDGET.TEXT_STACK,
					},
				],
			},
		},
		dataStore: {
			'test-list': {
				listFooterSpace: 72,
			},
			textStack: {
				items: [
					{
						type: AdsTextStackItemType.TAG_STACK,
						data: {
							tags: [
								{
									tagType: TagType.Boxed,
									color: TagColor.Grey,
									text: 'Tag',
									motionParams: {
										speedCurve: SpeedCurveType.SG1,
										customAnimationConfig: {
											scaleAnimationProps: [
												{
													x: {
														fromValue: '100%',
														toValue: '105%',
														startTiming: 0,
														duration: 150,
													},
													y: {
														fromValue: '100%',
														toValue: '105%',
														startTiming: 0,
														duration: 150,
													},
												},
												{
													x: {
														fromValue: '105%',
														toValue: '100%',
														startTiming: 150,
														duration: 150,
													},
													y: {
														fromValue: '105%',
														toValue: '100%',
														startTiming: 150,
														duration: 150,
													},
												},
											],
											totalDuration: 300,
										},
									},
								},
							],
						},
					},
					{
						type: AdsTextStackItemType.HEADING,
						data: {
							textType: TextTypeTokens.HeadingH1,
							text: 'Heading',
						},
					},
					{
						type: AdsTextStackItemType.LABEL_VALUE,
						data: {
							labelText: 'Label',
							valueText: 'Value',
							textStyle: TextTypeTokens.BodyBold,
							valueTextStyle: TextTypeTokens.BodyBold,
							valueColor: ColorTokens.Orange_60,
						},
					},
					{
						type: AdsTextStackItemType.LABEL_VALUE,
						data: {
							labelText: 'Tappable Label',
							valueText: '',
							valueTextStyle: TextTypeTokens.BodyBold,
							onLabelPress: {
								type: '',
							},
						},
					},
					{
						type: AdsTextStackItemType.DESCRIPTION,
						data: {
							text: 'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
							textColor: ColorTokens.Orange_90,
						},
					},
				],
			},
		},
	}

    2. Sample config: 
    const testMotionConfig: BaseMotionProps = {
        opacityProps: [
            {
                fromValue: 0,
                toValue: '100%',
                startTiming: 0,
                duration: 1000,
            },
        ],
        slideAnimationProps: [
            {
                x: {
                fromValue: 0,
                toValue: '100%',
                startTiming: 0,
                duration: 1000,
                },
                y: {
                    fromValue: 0,
                    toValue: '100%',
                    startTiming: 1000,
                    duration: 1000,
                }
            },
            {
                y: {
                    fromValue: '100%',
                    toValue: 0,
                    startTiming: 2000,
                    duration: 1000,
                },
            },
        ],
        scaleAnimationProps: [
            {
                x: {
                fromValue: 0,
                toValue: '100%',
                startTiming: 0,
                duration: 1000,
                },
                y: {
                fromValue: 0,
                toValue: '100%',
                startTiming: 0,
                duration: 1000,
            },
        },
        {
                x: {
                    fromValue: '100%',
                    toValue: 0,
                    startTiming: 1000,
                    duration: 1000,
                },
                y: {
                    fromValue: '100%',
                    toValue: 0,
                    startTiming: 1000,
                    duration: 1000,
                },
        },
        ],
        totalDuration: 2000,
    };

## Constraints

    1. we can only scale uniformly if we want to scale in both direction (i.e x and y), the component will scale corresponding to x parameters but in order to scale it in both the direction both parameters are need to be passed.

    2. we cannot slide any widget diagonally, the widgets can move either horizontally or vertically but moving it in diagonal direction do not works as expected.

## References

    type MotionComponentProps = {
        speedCurve?: string;
        animationState?: string;
        animationConfig?: {
            onView?: {
                animationType?: string;
                delay?: number;
            };
            onHide?: {
                animationType?: string;
                delay?: number;
            };
        };
        onAnimationSuccess?: TapAction;
        onAnimationBreak?: TapAction;
    };

    type CommonAnimationProps = {
        fromValue: number | string;
        toValue: number | string;
        startTiming: number;
        duration: number;
    };

    type AnimationStylingProps = {
        opacityProps?: CommonAnimationProps[];
        slideAnimationProps?: PositionBasedAnimationProps[];
        scaleAnimationProps?: PositionBasedAnimationProps[];
        delay?: number;
        totalDuration?: number;
        hideView?: boolean;
        easingValues?: EasingValues;
    };