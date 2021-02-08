import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';
function App() {
 

  const[modal,setModal]=useState(false)


  const [product,setProduct] = useState()
  
  const [productCart, setProductCart] = useState({});
  
  
  const [quantityCount,setQuantityCount] = useState(0)
  const [total,setTotal] = useState(0)
  
  
  // Create handleIncrement event handler
  const handleIncrement = (brand,amount) => {
  // console.log(brand)
    setProductCart(prevCount =>{
      let count = 0
  let key = brand in prevCount
  if(key){
    count = prevCount[brand].count + 1
  }else{
    count = count +1
  }
      return{
        ...prevCount,
        [brand] : {
       
        count:count,
        amount:amount,
        subTotal:count * amount
      }}
    });
  };
  
  
  useEffect(()=>{
  
  let quantity = 0
  let total = 0
    for(let brand in productCart){
      quantity += productCart[brand].count
      total += productCart[brand].subTotal
    }
    setQuantityCount(quantity);
    setTotal(total)
  // console.log(total)
  
  
  
  },[productCart])
  
  //Create handleDecrement event handler
  const handleDecrement = (brand,amount) => {
    setProductCart(prevCount =>{
      let count = 0
  let key = brand in prevCount
  if(prevCount[brand].count > 0){
    if(key){
      count = prevCount[brand].count - 1
    }
        return{
          ...prevCount,
          [brand] : {
         
          count:count,
          amount:amount,
          subTotal:count * amount
        }}
    
  }else{
    return count
  }

    });
    // setCount(prevCount => prevCount -1);
  };
      useEffect(()=>{
        fetch('item.json')
    .then(response => response.json())
    .then(data =>setProduct(data)   
    );
      },[])
  
  
  
      const addCartHandler = (amount) =>{
  console.log(amount)
      }
  
  
      return(
       
          <div>
  
  
            {product && product.map(prod=> (
  
  <div className='body' style={{overflow:"hidden"}}>
  <figure>
  
  <img className='image' src={prod.Imageurl} />
  <figcaption className='figcaption'>{prod.Offertext}</figcaption>
  </figure>
  <div className='subbody'>
     <h2 className='head' >{prod.Brand_Name}</h2>
     <p className='subtitle'  > {prod.Product_Name} </p>
     <p>{prod.Quantity}</p>
     <p>MRF {prod.Price}</p>
     <h5 style={{fontWeight:'bold'}}>Rs {prod.MRF}</h5>
     <div style={{display:"flex"}}>
     <button onClick={() => addCartHandler(prod.MRF)}  className='addcartbutton'>ADD CART</button>
      <button onClick={() => handleIncrement(prod.Brand_Name,prod.MRF)} className='plusbutton'>+</button>
      <p className='quanity'>{prod.Brand_Name in productCart ? productCart[prod.Brand_Name].count : 0}   </p>
      <button  onClick={() => productCart && productCart[prod.Brand_Name] && productCart[prod.Brand_Name].count > 0 && handleDecrement(prod.Brand_Name,prod.MRF)}   className='minusbutton'>-</button>
  
     </div>
  </div>
  
  
  </div>
  
            ))}
  
          <hr className='hr'></hr>
          <div className='footer'>
            
    <p>Qty : {quantityCount}</p>
    <p style={{fontFamily:'emoji'}}>Total : {total}</p>
    <button onClick={()=>setModal(true)} className='checkout'>CHECKOUT</button>
  </div>
  
  
  
  {/* The Modal  */}
  {modal ?
  <div className='modal'>
    {/* Modal content */}
    <div className='modalcontent'>
      <span onClick={()=>setModal(false)} style={{float:"right"}} >&times;</span>
      <p style={{fontFamily:'emoji'}}>Total : {total}</p>
      <p style={{color:'green',fontWeight:'bold',fontSize:22,fontFamily:'emoji'}}>Transaction Successful</p>
    </div>
  
  </div>
  :null}
  
  
       </div>
  
       
     
      )
  }
  


export default App;
