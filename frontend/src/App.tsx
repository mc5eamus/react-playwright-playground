import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface ExampleData {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

interface ApiResponse {
  success: boolean;
  data: ExampleData[];
}

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState<ExampleData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result: ApiResponse = await response.json()
        setApiData(result.data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <div className="card">
        <h2>Data from API</h2>
        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && (
          <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            {apiData.map((item) => (
              <li key={item.id} style={{ marginBottom: '1rem' }}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <small>ID: {item.id}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
