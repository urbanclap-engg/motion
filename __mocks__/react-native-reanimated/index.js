const Reanimated = require('react-native-reanimated/mock');
const withSpring = 
    jest.fn()
    .mockName('withSpring')
    .mockImplementation(Reanimated.withSpring);

const withRepeat = 
    jest.fn()
    .mockName('withRepeat')
    .mockImplementation(Reanimated.withRepeat);

const withDelay = 
    jest.fn()
    .mockName('withDelay')
    .mockImplementation(Reanimated.withDelay);

const withTiming = 
    jest.fn()
    .mockName('withTiming')
    .mockImplementation(Reanimated.withTiming);

const interpolate = 
    jest.fn()
    .mockName('interpolate')
    .mockImplementation(
        (input, output, _) => {}
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

module.exports = {
    ...Reanimated,
    withSpring,
    withRepeat,
    withDelay,
    withTiming,
    Easing,
    interpolate,
};