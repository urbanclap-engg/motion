"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsedConfig = void 0;
const stringParser = (t) => {
    'worklet';
    if (t) {
        if (typeof t === 'string') {
            return parseFloat(t);
        }
        return t;
    }
    return 0;
};
const stringToNumberProcessor = (value, multiplier = 1) => {
    'worklet';
    return typeof value === 'string'
        ? (stringParser(value) / 100) * multiplier
        : value;
};
const configModifier = (animationConfig, multiplier = 1) => {
    'worklet';
    return Object.assign(Object.assign({}, animationConfig), { fromValue: stringToNumberProcessor(animationConfig.fromValue, multiplier), toValue: stringToNumberProcessor(animationConfig.toValue, multiplier) });
};
const configParser = (animationConfigs, animatedWidth = 1, animatedHeight = 1) => {
    'worklet';
    const animationArray = [];
    if (animationConfigs) {
        animationConfigs.map((animationConfigsItem) => {
            const animationArrayObject = {};
            animationArrayObject.x = animationConfigsItem.x
                ? configModifier(animationConfigsItem.x, animatedWidth)
                : undefined;
            animationArrayObject.y = animationConfigsItem.y
                ? configModifier(animationConfigsItem.y, animatedHeight)
                : undefined;
            animationArrayObject.x || animationArrayObject.y
                ? animationArray.push(animationArrayObject)
                : undefined;
        });
    }
    return animationArray;
};
/**
 * the below params will come as an array and the logic needs to be modified as per the requirement i.e it should return the parameters as an array.
 * @param opacityProps
 * @param slideAnimationProps
 * @param scaleAnimationProps
 * @returns
 */
const getParsedConfig = (animatedWidth, animatedHeight, opacityProps, slideAnimationProps, scaleAnimationProps) => {
    'worklet';
    const opacityArr = [];
    if (opacityProps) {
        opacityProps.map((opacityPropsItem) => {
            opacityArr.push(configModifier(opacityPropsItem));
        });
    }
    return {
        opacityProps: opacityArr,
        slideAnimationProps: configParser(slideAnimationProps, animatedWidth, animatedHeight),
        scaleAnimationProps: configParser(scaleAnimationProps),
    };
};
exports.getParsedConfig = getParsedConfig;
//# sourceMappingURL=config_parser.js.map