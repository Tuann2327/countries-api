import NavBar from './nav'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {
  Link
} from "react-router-dom";

import('../style.scss')

const CountryPage = (props)=>{
    const [info,setInfo]= useState('')
    let lang, currency, topdomain, BorderCountries
    useEffect(  ()=>{
        const getData = async ()=>{
            try{
                const countrydata = await axios.get(`https://restcountries.eu/rest/v2/alpha/${props.match.params.countrycode}`)
                setInfo(countrydata.data)
    
            }
            catch(e){
                console.log(e)
            }   
        }
        getData()
    },[props.match.params.countrycode])


     if(info!==''){
        lang = info.languages.map(lang=>lang.name).join(', ')
        currency = info.currencies.map(cur=>cur.name).join(', ')
        topdomain = info.topLevelDomain.join(', ')
        BorderCountries = info.borders.map(code=><Link to={`/countries-api/${code}`} key={code}><button className='border-block' > {code}</button></Link>)
     }
    

    return(
        <div>
            <NavBar/>
            <main className='detailpage'>
                <Link to='/countries-api/Home'><button className='back'>Back</button></Link>
                <section className='info'>
                    <div className='flag'>
                        <img src={info.flag} alt='country flag'/>
                    </div>
                    <div className='country-info'>
                        <h2 className='country-name'>{info.name}</h2>
                        <div className='panel'>
                            <p>Native Name:<span> {info.nativeName}</span></p>
                            <p>Population:<span> {parseInt(info.population).toLocaleString()}</span></p>
                            <p>Region:<span> {info.region}</span></p>
                            <p>Sub Region:<span> {info.subregion}</span></p>
                        </div>
                        <div className='panel'>
                            <p>Capital:<span> {info.capital}</span></p>
                            <p>Top Level Domain:<span> {topdomain}</span></p>
                            <p>Currencies:<span> {currency}</span></p>
                            <p>Languages:<span> {lang}</span></p>
                        </div>
                        
                        <div className='country-border'>
                            <p>Border Countries:</p>
                            {BorderCountries}
                        </div>
                    </div>
                </section>
            </main>
        </div>
        
    )
}

export default CountryPage