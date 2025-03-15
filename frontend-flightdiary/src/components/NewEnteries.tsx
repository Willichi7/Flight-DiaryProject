import React, { useState } from 'react'
import { createEnteries } from '../service/queries'
import { Dairy } from '../type'

const NewEnteries = ({setEnteries}: {setEnteries: (data: Dairy[]) => void}) : JSX.Element=> {
   const [date, setDate] = useState('')
   const [visibility,  setVisibility] = useState('')
   const [weather , setWeather] = useState('')
   const [comment, setComment] = useState('')

   const addEntries = (e:React.SyntheticEvent ) => {
      e.preventDefault()
      const newEntries = {
         date,
         visibility,
         weather,
         comment
      }
      createEnteries({date, visibility, weather, comment})
        .then(data => {
         setEnteries(data)
        })
   }
  return (
   <div>
     <h2>Add new entry</h2>
     <form onSubmit={addEntries}>
       <div>
         date <input value={date} onChange={({target}) => setDate(target.value)} />
       </div>
       <div>
         visibility <input value={visibility} onChange={({target}) => setVisibility(target.value)} />
       </div>
       <div>
         weather <input value={weather} onChange={({target}) => setWeather(target.value)} />
       </div>
       <div>
         comment <input value={comment} onChange={({target}) => setComment(target.value)} />
       </div>
       <button type='submit'>add</button>
     </form>
   </div>
  )
}

export default NewEnteries