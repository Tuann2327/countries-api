import axios from 'axios'
import {useState,useEffect} from 'react'
import NavBar from './nav'
import {
    Link
  } from "react-router-dom";
import('../style.scss')

const CountryCard = (props)=>{
    return(
        <Link to={`/countries-api/${props.code}`} className='card'>
            <div className='flag'>
                <img loading="lazy" src={props.flag} alt='country flag'/>
            </div>
            <div className='card-info'>
                <h2 className='card-name'>{props.name}</h2>
                <p className='population'>
                    Population: 
                    <span className='info'> {parseInt(props.population).toLocaleString()}</span>
                </p>
                <p className='region'>
                    Region: 
                    <span className='info'> {props.region}</span>
                </p>
                <p className='capital'>
                    Capital: 
                    <span className='info'> {props.capital}</span>
                </p>
            </div>
        </Link>
    )
}


const HomePage = ()=>{

    const [countries,setCountries] = useState([])
    const [search,setSearch] = useState('')
    const [filter,setFilter] = useState('')

    const SearchHandler = (e)=>{
        setSearch(e.target.value)
    }
    const FilterHandler = (e)=>{
        setFilter(e.target.value)
    }

    useEffect(()=>{
        const FetchData = async ()=>{
            
            try{
                const countrydata = await axios.get('https://restcountries.eu/rest/v2/all')
                setCountries(countrydata.data)
            }catch(e){
                console.log(e)
            }

        }
        FetchData()
    },[])

    const ChoosenCountries = countries.filter(country=>{
        const namefix = country.name.trim().toLowerCase()
        const searchfix = search.trim().toLowerCase()
        if(filter === '') return namefix.includes(searchfix)
        return country.region.toLowerCase() === filter.toLowerCase() && namefix.includes(searchfix)
    })
    
    const RenderCardList = ChoosenCountries.map((country,index)=>{
        return (
            <CountryCard
                key={index}
                code={country.alpha3Code}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
                flag={country.flag}
            />
        )
    })

    return(
        <>
        <NavBar/>
        <main className='homepage light-theme'>
            <div className='search-bar'>
                <div className='input-wrapper'>
                    <input 
                    onChange={SearchHandler}
                    typeof='text' 
                    placeholder='Search for a country...'
                    />
                </div>
                <select
                onChange={FilterHandler}
                >
                    <option value=''>Worldwide</option>
                    <option>Africa</option>
                    <option>Americas</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                </select>
            </div>
            <section className='cards-grid'>
                {RenderCardList}
            </section>
        </main>
        </>
    )
}

export default HomePage