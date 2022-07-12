/// <reference types="react" />
declare const Motion: {
    View: import("react").FunctionComponent<import("./motion_view/types").BaseMotionProps>;
    Ripple: import("react").FC<import("./ripple_view/types").RippleProps>;
};
export default Motion;
export * from './motion_view';
export * from './ripple_view';
