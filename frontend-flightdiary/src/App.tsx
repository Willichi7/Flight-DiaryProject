import { useEffect, useState } from "react"
import { createEnteries, getAll } from "./service/queries"
import { Dairy } from "./type"

const App = () => {
  const [enteries, setEnteries] = useState<Dairy[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    getAll()
      .then(data => {
        setEnteries(data)
      })
  }, [])

  const addEntries = (e: React.SyntheticEvent) => {
    e.preventDefault()

    createEnteries({ date, visibility, weather, comment })
      .then(newEntry => {
        setEnteries(newEntry)
      })
  }

  return (
    <div>
      <div>
        <h2>Add new entry</h2>
        <form onSubmit={addEntries}>
          <div>
            date <input value={date} onChange={({ target }) => setDate(target.value)} />
          </div>
          <div>
            visibility <input value={visibility} onChange={({ target }) => setVisibility(target.value)} />
          </div>
          <div>
            weather <input value={weather} onChange={({ target }) => setWeather(target.value)} />
          </div>
          <div>
            comment <input value={comment} onChange={({ target }) => setComment(target.value)} />
          </div>
          <button type='submit'>add</button>
        </form>
      </div>

      <h2>Dairy entries</h2>
      {enteries.map((entry, index) => {
        return (
          <div key={index}>
            <p><strong>{entry.date}</strong></p>
            {entry.visibility} <br />
            {entry.weather}
          </div>
        )
      })}
    </div>
  )
}

export default App
