import { render } from '@testing-library/react'
import Home from 'src/pages/index'

describe('Home Page', () => {
  it('should render welcome message', () => {
    const { getByRole } = render(<Home />)
    const header = getByRole('heading', { name: 'Welcome Anton!' })
    expect(header).toBeInTheDocument()
  })
})
