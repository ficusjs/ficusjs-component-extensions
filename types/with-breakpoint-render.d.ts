import { CustomElementOptions } from '@ficusjs/core'

export interface BreakpointMethod {
  method: string
}

export interface Breakpoints {
  [breakpoint: number]: BreakpointMethod
}

export interface BreakpointConfig {
  reactive: boolean,
  breakpoints: Breakpoints
}

export declare function withBreakpointRender<T> (breakpointConfig: BreakpointConfig, options: CustomElementOptions<T>)
