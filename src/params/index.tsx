export type AnimationFormDataType = {
  elemId: string
  translateX: number
  translateY: number
  opacity: number
  scale: number
  blur: number
  speed: number
  delay: number
  easing: string
  replay: boolean
  showInitialState: boolean
}
/** Key is an id of an element, value is an animation */
export type TElementsAnimations = {
  [key: string]: AnimationFormDataType
}
export const DEFAULT_FORM = {
  elemId: '',
  translateX: 0,
  translateY: 0,
  opacity: 0,
  scale: 1,
  blur: 0,
  delay: 0,
  speed: 0.3,
  easing: 'ease-in',
  replay: false,
  showInitialState: false,
}

export const EASING_VALUES = ['ease-in', 'ease', 'ease-out', 'cubic-bezier', 'ease-in-out', 'linear', 'step-start', 'step-end']

export const ANIMATIONS = 'animations'

