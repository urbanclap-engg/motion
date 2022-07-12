import RippleView from './ripple_view/ripple_view';
import MotionView from './motion_view/motion_view';

const Motion = {
	View: MotionView,
	Ripple: RippleView,
};

export default Motion;

export * from './motion_view';
export * from './ripple_view';
