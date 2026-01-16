import { pokemonApi, useGetPokemonByNameQuery } from "../../Redux/api/PokemonApi"



const Pokemon = () =>  {

  const {data, error, isLoading} =   useGetPokemonByNameQuery('bulbasaur')

    
// const {data, error, isLoading}  = pokemonApi.endpoints.getPokemonByName.useQuery("bulbasaur")


  

 return(


    <div style={{minHeight : "90vh"}}>



        <div style={{textAlign : "center"}}>


                    <h2 > hello I m a pokemon </h2>  

                   <p> {isLoading ? "Loading Dataa......" : "Data Loaded succesfully"}    </p> 



                  <p> {data &&  data.species.name}  </p>


                    <img src={data && data.sprites.front_shiny}  width={300} />


        </div>
 
    </div>
 )



}



export default Pokemon




