import Link from 'next/link'
import { cva, VariantProps } from 'class-variance-authority'

const brandStyles = cva(
  'font-semibold select-none bg-black text-white rounded-md tracking-wider',
  {
    variants: {
      size: {
        base: 'text-sm px-4 py-2',
        sm: 'text-xs px-3 py-2'
      }
    },
    defaultVariants: {
      size: 'base'
    }
  }
)

export type BrandProps = VariantProps<typeof brandStyles> & {}

export default function Brand({ ...props }: BrandProps) {
  return (
    <Link href={'/'} className={brandStyles()} {...props}>
      _stack
    </Link>
  )
}
