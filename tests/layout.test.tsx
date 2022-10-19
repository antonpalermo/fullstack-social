import { render } from '@testing-library/react'
import { Layout } from '@components'

describe('Layout Component', () => {
  const Child = () => <h1>Child Component</h1>

  it('should display title', () => {
    const { getByTestId } = render(<Layout title="sample title" />)
    const element = getByTestId('layout')
    expect(element).toBeInTheDocument()
  })

  it('should render a child', () => {
    const { getByRole } = render(
      <Layout>
        <Child />
      </Layout>
    )
    const childHeading = getByRole('heading', {name: 'Child Component'})
    expect(childHeading).toBeInTheDocument()
  })
})
