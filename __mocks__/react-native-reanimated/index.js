const withSpring = 
    jest.fn()
    .mockName('withSpring')
    .mockImplementation(
        (toValue, _, cb) => {
        cb && cb(true);
        return toValue;
        });

const withRepeat = 
    jest.fn()
    .mockName('withRepeat')
    .mockImplementation(
        (toValue, _, cb) => {
            console.log('withRepeat==========', toValue, '++++',cb);
            cb && cb(true);
            return toValue;
        });

const withDelay = 
    jest.fn()
    .mockName('withDelay')
    .mockImplementation(
        (toValue, _, cb) => {
        cb && cb(true);
        return toValue;
        });

const withTiming = 
    jest.fn()
    .mockName('withTiming')
    .mockImplementation(
        (toValue, _, cb) => {
        cb && cb(true);
        console.log('withTiming==========|||||||||||', toValue);
        return toValue;
        });

const interpolate = 
    jest.fn()
    .mockName('interpolate')
    .mockImplementation(
        (input, output, _) => {console.log('interpolation', input, output, _)}
    );

const ID =
    jest.fn()
    .mockName('Easing')
    .mockImplementation((t) => t);

const Easing= {
    linear: ID,
    ease: ID,
    quad: ID,
    cubic: ID,
    poly: ID,
    sin: ID,
    circle: ID,
    exp: ID,
    elastic: ID,
    back: ID,
    bounce: ID,
    bezier: ID,
    in: ID,
    out: ID,
    inOut: ID,
    };

const runOnJS = (fn) => fn;

const IMMEDIATE_CB_INVOCATION = (cb) => cb();
const useAnimatedStyle = IMMEDIATE_CB_INVOCATION;
const useAnimatedProps = IMMEDIATE_CB_INVOCATION;

const useSharedValue = (v) => ({ value: v });
const useAnimatedReaction = () => {};

export {
    withSpring,
    withRepeat,
    withDelay,
    withTiming,
    runOnJS,
    Easing,
    interpolate,
    useAnimatedStyle,
    useAnimatedProps,
    useSharedValue,
    useAnimatedReaction,
};