import { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      monsters: [],
    }
    console.log('constructor')
  }

  //always that have a component(class component) taht need leverage some kind API call to get the data to exhibit the UI, mus put into a componentDidMNount()
  componentDidMount() {
    console.log('componentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users =>
        this.setState(
          () => {
            return { monsters: users }
          },
          () => {
            console.log(this.state)
          }
        )
      )
  }

  render() {
    console.log('render')
    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="search monsters"
          //onChange is a event that's call everytime that do you make a change, like type a word
          onChange={(event) => {
            //lowerString will transform the target value to lower case
            const lowerString = event.target.value.toLocaleLowerCase()
            //filteredMonster will return all monsters name that includes the target value into lowerString
            const filteredMonsters = this.state.monsters.filter((monster) => {
              return monster.name.toLocaleLowerCase().includes(lowerString)
            });
            //setState to re-render the page with monsters filtered
            this.setState(() => {
              return {monsters: filteredMonsters}
            })
          }}
        />
        {this.state.monsters.map(monster => {
          return (
            //use 'key' on map to identify each result, set a id in every monster will make them unique
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
