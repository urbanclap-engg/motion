# Welcome to motion
`Motion` is the universal animation package, built on top of React-Native, that lets you run animation through JSON.
```
<Motion.View {...motionConfig}>
    {children}
 </Motion.View>
```

## Current version
You can check current version of motion library [here](link will be added soon) corresponding to the name `@uc-engg/motion`.

## Highlights
* Universal: works on all platforms
* 60 FPS animations.
* Mount/unmount animations
* Powered by Reanimated 2
* Loop & repeat animations
* Sequential & parallel animations
* provides inbuilt Ripple effect for android and ios.

## Motivation
`Write once, animate anywhere.`

React Native, in my opinion, offers the finest mental paradigm for creating products. However, when it comes to developing a multi-platform solution at scale, Platform.OS is everywhere. This is what we call an anti-pattern.

If you find yourself writing Platform.OS === 'web' when building UI inside of your app, something is wrong.Third-party libraries with a centralised API should handle platform discrepancies. That's what makes (the mental model behind) React Native so appealing: `write once, run anywhere`.

We decided to create our own in-house animation library after months of experimenting with various animation solutions on the web and in native apps. Everything started to make sense with the help of Reanimated v2. What we wanted was a fast animation library that allowed us to specify different animation states using component props. Hooks aren't required. Styles should transition automatically in the same way as CSS transitions do.

It should be as simple as changing the backdrop color to add an animation. It should be as simple as plugging it in.

We started by combining all of Reanimated's hooks into one component. Pass it plain-style objects, and it will take care of the rest. It has a magical sense to it, and the animations are smooth.

## A final thought
It's fantastic that React Native works across all platforms. However, it is a result of its greatness rather than the greatness itself. The fact that React Native is so easy to use is what makes it so appealing as a technology. Its simplicity allows you to concentrate on the only thing that matters: creating outstanding products as rapidly as possible. React Native lends itself to usage on any platform thanks to its straightforward mental model.

With React Native, we now have a tool to turn great ideas into fantastic user experiences without having to worry about "what platform someone is using."

It may be an iPhone today.

It could be a virtual browser operating on a cloud server tomorrow.

It won't matter if we get this properly.

## Disclaimer
Because this is a new library, there may be some bugs. We use it in our app, therefore I hope that any issues will be resolved in our favour.

As a result, we've made information public in order to help the community. Please keep this in mind if you find something that doesn't work, and try to address the problem before spamming the Orion-doubts channel. People expecting free work can quickly derail open source projects, which is something I wish to prevent.

Please look into if a problem you're having is related to Reanimated or Motion.