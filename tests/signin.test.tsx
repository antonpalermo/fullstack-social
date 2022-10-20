import { render } from '@testing-library/react'
import SignIn from '@pages/signin'

describe('Sign In Page', () => {
  const { getByRole } = render(<SignIn />)
  
  it('should render a heading', () => {
    const heading = getByRole('heading', { name: 'Sign In' })
    expect(heading).toBeInTheDocument()
  })
})
