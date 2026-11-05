import { useSyncExternalStore } from 'react'

/**
 * 효과음(좋아요 하트 · 헤더 버튼). 파일 없이 Web Audio 로 그 자리에서 합성한다.
 * 하트 칸마다 펜타토닉 한 음씩 올라가서(도 레 미 솔 라 · 높은 도) 소리만 들어도 몇 칸째인지 알 수 있다.
 * 켜고 끄기는 헤더 버튼이 정하고 이 브라우저에 기억한다 (기본은 켜짐)
 */

/** C5 D5 E5 G5 A5 C6. 칸 수(1~6)와 같은 순서 */
const NOTES = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]
/** 모든 소리를 거치는 전체 볼륨. 클릭마다 나는 소리라 작게 둔다 */
const MASTER_VOLUME = 0.16

const STORAGE_KEY = 'motion-lab-sound'

// ── 켜고 끄기 (헤더 버튼과 모든 하트가 같은 값을 보도록 모듈 하나에 둔다) ──

const readEnabled = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
}

let enabled = readEnabled()
const listeners = new Set<() => void>()

export function setSoundEnabled(next: boolean) {
  enabled = next
  try {
    localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
  } catch {
    // 기억하지 못해도 이번 방문 동안은 그대로
  }
  listeners.forEach((listener) => listener())
}

export function useSoundEnabled() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => enabled
  )
}

// ── 합성 ──

let context: AudioContext | null = null
let master: GainNode | null = null

/**
 * 오디오를 쓸 준비. 브라우저는 사용자가 누른 순간에만 소리를 열어 주므로 pointerdown · click 안에서 부른다.
 * 길게 누르기처럼 타이머로 나중에 나는 소리도 이때 미리 열어 둔 덕에 난다
 */
export function primeSound() {
  if (!enabled || typeof AudioContext === 'undefined') return null
  if (!context) {
    context = new AudioContext()
    master = context.createGain()
    master.gain.value = MASTER_VOLUME
    master.connect(context.destination)
  }
  if (context.state === 'suspended') void context.resume().catch(() => {})
  return context
}

interface Tone {
  /** 끝 음높이(Hz) */
  freq: number
  /** 이 음높이에서 출발해 freq 로 미끄러진다. 없으면 처음부터 freq */
  from?: number
  /** 미끄러지는 시간(s) */
  glide?: number
  type?: OscillatorType
  /** 0~1. 전체 볼륨에 곱해진다 */
  gain?: number
  attack?: number
  /** 소리가 사라지기까지(s) */
  decay?: number
  /** 지금부터 몇 초 뒤에 낼지 */
  at?: number
}

function tone({ freq, from, glide = 0.03, type = 'sine', gain = 1, attack = 0.004, decay = 0.14, at = 0 }: Tone) {
  const ctx = primeSound()
  if (!ctx || !master) return
  const start = ctx.currentTime + at
  const osc = ctx.createOscillator()
  const env = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(from ?? freq, start)
  if (from) osc.frequency.exponentialRampToValueAtTime(freq, start + glide)
  // 딸깍거리지 않게 0 에서 짧게 올렸다가 지수 곡선으로 줄인다 (지수 곡선은 0 이 될 수 없어 아주 작은 값까지)
  env.gain.setValueAtTime(0, start)
  env.gain.linearRampToValueAtTime(gain, start + attack)
  env.gain.exponentialRampToValueAtTime(0.0001, start + attack + decay)
  osc.connect(env).connect(master)
  osc.start(start)
  osc.stop(start + attack + decay + 0.02)
}

const noteOf = (level: number) => NOTES[Math.min(Math.max(level, 1), NOTES.length) - 1]

/** +1: 그 칸의 음으로 짧게 '톡'. 아래에서 살짝 밀려 올라와 거품이 터지는 느낌 */
export function playLike(level: number) {
  if (!enabled) return
  const freq = noteOf(level)
  tone({ freq, from: freq * 0.72, glide: 0.025, type: 'triangle', decay: 0.13 })
  // 한 옥타브 위를 작게 겹쳐 또렷하게
  tone({ freq: freq * 2, from: freq * 1.44, glide: 0.025, gain: 0.18, decay: 0.08 })
}

/** 다 채움: 높은 도에 이어 미 · 솔을 빠르게 올려 반짝 */
export function playMax() {
  if (!enabled) return
  playLike(NOTES.length)
  tone({ freq: 1318.51, type: 'sine', gain: 0.55, decay: 0.16, at: 0.07 })
  tone({ freq: 1567.98, type: 'sine', gain: 0.5, decay: 0.24, at: 0.14 })
}

/** -1: 빠지는 칸의 음에서 아래로 미끄러져 바람 빠지듯 */
export function playUnlike(level: number) {
  if (!enabled) return
  const freq = noteOf(level)
  tone({ freq: freq * 0.7, from: freq, glide: 0.12, type: 'sine', gain: 0.6, decay: 0.14 })
}

/** 더 채울 수도, 더 비울 수도 없을 때: 낮고 짧은 '툭' */
export function playBlocked() {
  if (!enabled) return
  tone({ freq: 140, from: 220, glide: 0.04, type: 'triangle', gain: 0.7, decay: 0.07 })
}

// ── 헤더 버튼. 하트와 헷갈리지 않게 음색을 달리한다 ──

/** 테마 전환: 스위치를 딸깍 넘기는 짧은 소리 + 어두워지면 내려가고 밝아지면 올라가는 음 */
export function playThemeSwitch(toDark: boolean) {
  if (!enabled) return
  tone({ freq: 1800, type: 'square', gain: 0.12, attack: 0.001, decay: 0.018 })
  tone(toDark ? { freq: 392, from: 587.33, glide: 0.1, gain: 0.5, decay: 0.16 } : { freq: 587.33, from: 392, glide: 0.1, gain: 0.5, decay: 0.16 })
}

/**
 * 효과음 켜고 끄기. 켜면 켠 뒤에 두 음이 올라가고, 끄면 끄기 직전에 두 음이 내려간다 (마지막으로 들리는 확인 소리).
 * 이미 예약한 소리는 꺼도 끝까지 난다
 */
export function toggleSound(next: boolean) {
  if (next) setSoundEnabled(true)
  const [first, second] = next ? [NOTES[0], NOTES[3]] : [NOTES[3], NOTES[0]]
  tone({ freq: first, type: 'sine', gain: 0.5, decay: 0.1 })
  tone({ freq: second, type: 'sine', gain: 0.5, decay: 0.16, at: 0.07 })
  if (!next) setSoundEnabled(false)
}
