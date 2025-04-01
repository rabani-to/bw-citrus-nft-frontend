import Example from "./Example"

export default function Home() {
  return (
    <main className="px-4 py-12 max-w-xl mx-auto text-center grid place-items-center">
      <h1 className="text-3xl font-bold">Web3 Template by Radish</h1>
      <p className="mt-2 text-gray-600">
      This is gonna be updated soon. Stay tuned!
        <strong className="font-semibold">✨ Includes:</strong> shadcn/ui
        integration, and example hooks. Check out the <code>Example</code>{" "}
      </p>
      <Example className="mt-12" />
    </main>
  )
}
