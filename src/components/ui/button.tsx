import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

/**
 * The single source of truth for every button on the site. Pick a `variant`
 * (and `size`); the radius (rounded-sm), spacing, and states live here — not in
 * globals or inline class strings. CMS-driven CTAs map their `appearance` select
 * to one of these variants via <CMSLink>.
 */
const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-sm text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        // On light surfaces
        default: 'bg-primary text-primary-foreground hover:opacity-90',
        outline:
          'border border-border bg-background text-brand hover:border-primary hover:bg-primary hover:text-white',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'text-foreground hover:bg-foreground/5',
        link: 'text-brand underline-offset-4 hover:underline',
        emergency: 'bg-emergency text-emergency-foreground hover:bg-emergency/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // On dark surfaces (photos, cobalt bands)
        white: 'bg-white text-primary hover:bg-primary hover:text-white',
        outlineWhite: 'border border-white/40 text-white hover:bg-white/10',
      },
      size: {
        clear: '',
        sm: 'h-9 px-4',
        default: 'h-11 px-6',
        lg: 'h-12 px-7',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Animated label for buttons. On hover the current label slides up and out of
 * view while a duplicate slides up into place from below. Use it inside anything
 * styled with `buttonVariants` (which provides the required `group/btn` +
 * `overflow-hidden`); the <Button> component wraps its children in it
 * automatically. For link-styled buttons:
 *   <Link className={buttonVariants(...)}><ButtonLabel>Call us</ButtonLabel></Link>
 * Under prefers-reduced-motion nothing moves (the duplicate is hidden) — only the
 * button's hover color change remains.
 */
export const ButtonLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="relative inline-grid overflow-hidden">
    <span className="col-start-1 row-start-1 inline-flex items-center justify-center gap-2 transition-transform duration-300 ease-out motion-safe:group-hover/btn:-translate-y-[150%]">
      {children}
    </span>
    <span
      aria-hidden
      className="col-start-1 row-start-1 inline-flex items-center justify-center gap-2 transition-transform duration-300 ease-out motion-safe:translate-y-[150%] motion-safe:group-hover/btn:translate-y-0 motion-reduce:hidden"
    >
      {children}
    </span>
  </span>
)

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {asChild ? children : <ButtonLabel>{children}</ButtonLabel>}
    </Comp>
  )
}

export { Button, buttonVariants }
