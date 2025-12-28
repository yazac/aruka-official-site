export interface StepAnimationOptions {
  duration?: number
  delay?: number
  startPosition?: { x: number; y: number }
  startRotation?: number
  startScale?: number
}

// define default options
const defaultOptions: StepAnimationOptions = {
  duration: 1000,
  delay: 0,
  startPosition: { x: 10, y: -10 },
  startRotation: -15,
  startScale: 1
}

type TimerId = ReturnType<typeof setTimeout> | null

export function useStepAnimation(el: HTMLElement, options?: StepAnimationOptions) {
  const opts: StepAnimationOptions = { ...defaultOptions, ...options }
  const frameMs = 100
  let running = false
  let timer: TimerId = null
  let destroyed = false

  function applyTransform(x: number, y: number, rot: number, scale: number) {
    el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`
  }

  function clearTransform() {
    el.style.transform = ''
  }

  function start(nowOptions?: Partial<StepAnimationOptions>) {
    if (running || destroyed) return
    running = true
    const o = { ...opts, ...nowOptions }
    const duration = Math.max(0, o.duration ?? defaultOptions.duration!)
    const delay = Math.max(0, o.delay ?? 0)
    const startX = o.startPosition?.x ?? 0
    const startY = o.startPosition?.y ?? 0
    const startRot = o.startRotation ?? 0
    const startScale = o.startScale ?? 1

    const frames = Math.max(1, Math.ceil(duration / frameMs))

    // initial transform: set immediately so element appears at the start pose
    applyTransform(startX, startY, startRot, startScale)

    let frame = 0

    const runFrame = () => {
      if (destroyed) return
      // progress [0..1]
      const progress = Math.min(1, (frame + 1) / frames)
      // eased progress (ease-out)
      const eased = 1 - Math.pow(1 - progress, 2)

      // base interpolation from start -> final (final is 0,0,0deg, scale=1)
      const baseX = startX * (1 - eased)
      const baseY = startY * (1 - eased)
      const baseRot = startRot * (1 - eased)
      const baseScale = startScale + (1 - startScale) * eased

      // jitter amplitude decreases over time
      const jitterFactor = 1 - eased
      const posJitterAmp = (Math.hypot(startX, startY) * 0.5 + 6) * jitterFactor
      const rotJitterAmp = (Math.abs(startRot) * 0.3 + 3) * jitterFactor

      const jitterX = (Math.random() * 2 - 1) * posJitterAmp/10
      const jitterY = (Math.random() * 2 - 1) * posJitterAmp/10
      const jitterRot = (Math.random() * 2 - 1) * rotJitterAmp*10

      applyTransform(baseX + jitterX, baseY + jitterY, baseRot + jitterRot, baseScale)

      frame += 1
      if (frame < frames) {
        timer = setTimeout(runFrame, frameMs)
      } else {
        // final: clear transforms so element sits at natural position
        clearTransform()
        running = false
        timer = null
      }
    }

    if (delay > 0) {
      timer = setTimeout(() => runFrame(), delay)
    } else {
      // start immediately with first frame
      timer = setTimeout(() => runFrame(), frameMs)
    }
  }

  function destroy() {
    destroyed = true
    running = false
    if (timer) clearTimeout(timer)
    timer = null
    clearTransform()
  }

  return { start, destroy }
}

export default useStepAnimation