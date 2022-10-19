import { render } from '@testing-library/react'
import { Navbar } from '@components'

describe('Header Component', () => {
  const { getByRole } = render(<Navbar />)

  it('should contain home link', () => {
    const signInButton = getByRole('button', { name: 'Sign In' })
    expect(signInButton).toBeInTheDocument()
  })
})
