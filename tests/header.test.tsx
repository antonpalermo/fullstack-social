import { render } from '@testing-library/react'
import { Header } from '@components'

describe('Header Component', () => {
  const { getByRole } = render(<Header />)

  it('should contain home link', () => {
    const link = getByRole('link').closest('a')
    expect(link).toHaveAttribute('href', '/')
  })
})
