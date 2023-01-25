
import { StyleSheet, Text, View ,Dimensions, ScrollView, Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios'

const NewsRender = () => {
    const Width=Dimensions.get('window').width
    const [dataWidth, setDataWidth] = useState()
    const [getData,setGetData]=useState(null)
        const ApiKey="7db430075e014e278878b0253659dfc6"
    useEffect(() => {
      if (Width < 500) {
        setDataWidth(Width/1.1)
      }
      else if(Width>500 && Width<800){
        setDataWidth(Width/3-20)
        
      } 
    }, [Width])

    const NewsAPI=()=>{
        axios({method:'get',
                url:`https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${ApiKey}`,
                headers:{}           
    }).then(response=>{
        console.log(response.data)
        setGetData(response.data.articles)
    }).catch(error=>{
        console.log(error)
    })
    }
    useEffect(()=>{
        NewsAPI()
    },[])
    
  return (
    <ScrollView>
      <Text style={styles.Text_News}>News</Text>
      {getData && getData.map((val,index)=>
        <View style={{width:dataWidth,height:280,alignSelf:'center',marginTop:10,elevation:5,borderWidth:1}} key={index} >
            <Image source={{uri:val.urlToImage}} style={{width:dataWidth,height:150,marginTop:10,resizeMode:'contain'}}/>
            <Text style={styles.text_name}>{val.author}</Text>
            <Text style={styles.title_name}>Title:- {val.title}</Text>
                <Text style={styles.data_type}>Date:- {val.publishedAt}</Text>


      </View>
        )}
    </ScrollView>
  )
}

export default NewsRender

const styles = StyleSheet.create({
    Text_News:{
            color:'#000000',
            alignSelf:'center',
            fontSize:20
    },
    text_name:{
        fontSize:16,
        marginHorizontal:20,marginTop:5,
        color:'#000000'
    },dec_Text:{
        height:38,width:320,
     
        alignSelf:'center'

    },title_name:{
        fontSize:14,
        marginHorizontal:20
    
    },data_type:{
        marginTop:3,
        marginHorizontal:20
    }
})
