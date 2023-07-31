import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchResults from './components/SearchResults/SearchResults';

export const BASE_URL = 'http://localhost:9000';






function App() {

  const[filteredData,setFilteredData] = useState(null)
  const [ data,setData] = useState(null);
  const[loading,setLoading] = useState(false);
  const[error,setError] = useState(null);
  const[selectedButton,setSelectedButton] = useState('all');



  useEffect(() => {
    const fetchFoodData = async () =>
    {
        setLoading(true);
      try{
  
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setLoading(false)
  
        setData(json);
        setFilteredData(json);
  
      }
      catch(error)
      {
       setError('Unable to Fetch Data')   
      }
    };
    fetchFoodData();
  },[]);

  const searchFood = (e) =>
  {
    const searchValue = e.target.value;
    //console.log(searchValue)
    if(searchValue==='')
    setFilteredData(null)
    const filter = data?.filter((food) => 
    food.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredData(filter)
  }

  const filterFood = (type) =>
  {
      if(type==='all')
      {
        setFilteredData(data)
        setSelectedButton('all')
        return;
      }
    const filter = data?.filter((food) => 
    food.type.toLowerCase().includes(type.toLowerCase()));
    setFilteredData(filter);
    setSelectedButton(type)
  }


  const filterBtns = [
    {
      name:'All',
      type:'all',
    },
    {
      name:'Breakfast',
      type:'breakfast',
    },
    {
      name:'Lunch',
      type:'lunch',
    },
    {
      name:'Dinner',
      type:'dinner',
    },
  ]




 
  if(error) return <div>{error}</div>
  if(loading)return <div>loading....</div>



  return (
    <>
    <Container>
      <TopContainer>
      <div className="logo">
        <img src="/images/Foody Zone.svg" alt="logo" />
      </div>
      <div className="search">
        <input placeholder='Search Food' onChange={searchFood} />
      </div>
      </TopContainer>
      <FilterContainer>

        {
          filterBtns?.map(({name,type}) =>(
            <Button isSelected={selectedButton == type}
             key={name} onClick={()=> filterFood(type)}>{name}</Button>
          ))
        }
      
      </FilterContainer>
      
      
    </Container>
    <SearchResults foods={filteredData}/>
    </>
  )
}

export default App
export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;

`
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  .search {
    input{
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }

  @media (0 < width < 600px){
    flex-direction: column;
    height: 80px;
    margin-bottom: 32px;
  }

`
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
  

`
export const Button = styled.button`
  background: ${({isSelected}) => (isSelected ? '#f22f2f': '#ff4343')};
  outline: 2px solid ${({isSelected}) => (isSelected ? 'white': '#ff4343')};
  border-radius: 5px;
  color: white;
  cursor: pointer;
  padding: 6px 12px;
  border: none;
  &:hover{
    background-color: #f22f2f;
  }
`
