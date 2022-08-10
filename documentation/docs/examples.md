# Examples
Attaching some examples of animation that can be performed by our motion library along with video and configs attached.

## Bubble Animation

`Video`
* Add Video here

`Timeline`
<img width="1425" alt="image" src="https://user-images.githubusercontent.com/35339165/183669535-9fa863b6-20e1-4895-88b3-1e45c48687a3.png">

`Animation Config`
```
{
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
```