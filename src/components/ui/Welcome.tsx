export type WelcomeProps = { name: string }

export default function Welcome({ name }: WelcomeProps) {
  return <h1 className="font-medium">Welcome {name}!</h1>
}
