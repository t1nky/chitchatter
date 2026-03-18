import { forwardRef, type ComponentPropsWithRef } from 'react'

export const Form = forwardRef<HTMLFormElement, ComponentPropsWithRef<'form'>>(
  (props, ref) => <form ref={ref} {...props} />
)
Form.displayName = 'Form'

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithRef<'input'>
>((props, ref) => <input ref={ref} {...props} />)
Input.displayName = 'Input'

export const Main = forwardRef<HTMLElement, ComponentPropsWithRef<'main'>>(
  (props, ref) => <main ref={ref} {...props} />
)
Main.displayName = 'Main'
