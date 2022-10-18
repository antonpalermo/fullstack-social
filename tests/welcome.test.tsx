import { render } from '@testing-library/react'
import { Welcome } from '@components'

describe('Welcome Component', () => {
  it('should render welcome message', () => {
    const { getByRole } = render(<Welcome name="Anton" />)
    const header = getByRole('heading', { name: 'Welcome Anton!' })
    expect(header).toBeInTheDocument()
  })
})
