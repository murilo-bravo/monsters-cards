import { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

class App extends Component {
  constructor() {
    super()

    this.state = {
      monsters: [],
      searchField: '',
    }
  }

  //always that have a component(class component) taht need leverage some kind API call to get the data to exhibit the UI, mus put into a componentDidMNount()
  componentDidMount() {
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

  onSearchChange = event => {
    //searchString will transform the target value to lower case
    const searchField = event.target.value.toLocaleLowerCase()

    //setState to re-render the page with monsters filtered
    this.setState(() => {
      return { searchField } //using a variable in a object field javaScript will atributte a key to a name of this variable and tha value of the value of this variable
    })
  }

  render() {
    const { monsters, searchField } = this.state
    const { onSearchChange } = this

    //filteredMonster will return all monsters name that includes the target value into searchString
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })

    return (
      <div className="App">
        <h1 className='app-title'>Monsters</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="Search Monsters..."
          className="monsters-search-box"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App
