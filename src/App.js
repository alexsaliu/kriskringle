import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [name, setName] = useState('')
    const [names, setNames] = useState([])
    const [kks, setKks] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const names = localStorage.getItem('names');
        const kks = localStorage.getItem('kks');
        if (names) setNames(JSON.parse(names));
        if (kks) setKks(JSON.parse(kks));
    }, [])

    const shuffle = (array) => {
        setKks([])
        if (array.length % 2 !== 0) {
            console.log("um");
            setError('Need an even number of peeps');
            return kks.length > 0 ? kks : []
        }
        setError('')
        array = [...array]
        for (let i = array.length - 1; i > 0; i--) {
            let indexToSwap = Math.floor(Math.random() * (i +1))
            let swapping = array[indexToSwap];
            array[indexToSwap] = array[i];
            array[i] = swapping;
        }
        localStorage.setItem('kks', JSON.stringify(array));
        return array;
    }

    const addName = () => {
        if (!name) return
        setError('')
        let nameList = [...names];
        nameList.push(name);
        setNames(nameList);
        localStorage.setItem('names', JSON.stringify(nameList));
        setName('')
    }

    const reset = () => {
        localStorage.clear()
        setNames([])
        setKks([])
    }

  return (
    <div className="App">
        <h1>KK app</h1>
        <div className="error">{error}</div>
        <input onChange={(e) => setName(e.target.value)} type="text" value={name}/>
        <button onClick={() => addName()} className="add">Add</button>
        <div className="container">
            <div className="names">
                {names.map((name, i) => <div key={i} className="name">{i+1}. {name}</div>)}
            </div>
            <button onClick={() => setKks(shuffle(names))} className="kk-button">Pair KK's!</button>
            <div className="pairs">
                {kks.map((kk, i) => <div key={i} className="kk">{kk}</div>)}
            </div>
        </div>
        <div onClick={() => reset()} className="reset">Reset X</div>
    </div>
  );
}

export default App;
