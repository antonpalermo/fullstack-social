import Link from 'next/link'

export type BrandProps = {}

export default function Brand({}: BrandProps) {
  return (
    <Link href={{ pathname: '/' }} passHref>
      <a className="text-sm font-semibold select-none px-4 py-2 bg-black text-white rounded-md tracking-wider">
        _stack
      </a>
    </Link>
  )
}
