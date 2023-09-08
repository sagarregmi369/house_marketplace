import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'




const CreateListing = () => {
  const [geolocationEnabled, setGeolocationEnabled]= useState(false)
  const [loading, setLoading]=useState(false)
  const [formData, setFormData]=useState({
    type:'rent',
    name:'',
    bedrooms:1,
    bathrooms:1,
    parking:false,
    furnished:false,
    address:'',
    offer:false,
    regularPrice:0,
    discountedPrice:0,
    images:{},
    latitude:0,
    longitude:0
  })

  const auth= getAuth()
  const navigate= useNavigate()
  const isMounted=useRef(true)

  useEffect(()=>{
    if(isMounted){
        onAuthStateChanged(auth, (user)=>{
          if(user){
            setFormData({
              ...formData,
              userRef:user.uid
            })
          }else{
            navigate('/sign-in')
          }
        })
    }
    return()=>{
      isMounted.current=false
    }

  },[])

  const onSubmitHandler=(e)=>{
    e.preventDefault()
    
    navigate('/')
  }
  const onMutateHandler=(e)=>{
    let boolean=null;
    if (e.target.value==='true'){
      boolean=true
    }
    if(e.target.value==='false'){
      boolean=false
    }
    if(e.target.files){
      setFormData((prevState)=>{
        return {
          ...prevState,
          images:e.target.files
        }
      })
    }
   
    if(!e.target.files){
        setFormData((prevState)=>{
          return{
            ...prevState,
            [e.target.name]: boolean ?? e.target.value
          }
        })
      }
  }
  

  
  if(loading){
    return <Spinner/>
  }
  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>
      <main>
        <form onSubmit={onSubmitHandler}>
          <label className= 'formLabel'>Sell / Rent</label>
          <div className="formButtons">
            <button 
              type='button' 
              className={formData.type === 'sale'? 'formButtonActive': 'formButton'}
              value='sale'
              name='type'
              onClick={onMutateHandler}
              >
              Sell
            </button>
            <button 
              type='button' 
              className={formData.type === 'rent'? 'formButtonActive': 'formButton'}
              value='rent'
              name='type'
              onClick={onMutateHandler}
              >
              Rent
            </button>
          </div>
          <label className="formLabel">Name</label>
          <input 
            type="text" 
            className="formInputName"
            name='name'
            value={formData.name}
            onChange={onMutateHandler}
            maxLength='32'
            minLength='8'
            required />
          <div className="formRooms flex">
            <div>
              <label className="formLabel">BedRooms</label>
              <input 
                type="number" 
                className="formInputSmall"
                name='bedrooms'
                value={formData.bedrooms}
                onChange={onMutateHandler}
                maxLength='20'
                minLength='1'
                required />
            </div>
            <div>
              <label className="formLabel">BathRooms</label>
              <input 
                type="number" 
                className="formInputSmall"
                name='bathrooms'
                value={formData.bathrooms}
                onChange={onMutateHandler}
                maxLength='20'
                minLength='1'
                required />
            </div>
          </div>
          <label className= 'formLabel'>Parking spot</label>
          <div className="formButtons">
            <button 
              type='button' 
              className={formData.parking ? 'formButtonActive': 'formButton'}
              value='true'
              name='parking'
              onClick={onMutateHandler}
              >
              Yes
            </button>
            <button 
              type='button' 
              className={!formData.parking ? 'formButtonActive': 'formButton'}
              value='false'
              name='parking'
              onClick={onMutateHandler}
              >
              No
            </button>
          </div>
          <label className= 'formLabel'> Furnished </label>
          <div className="formButtons">
            <button 
              type='button' 
              className={formData.furnished ? 'formButtonActive': 'formButton'}
              value='true'
              name='furnished'
              onClick={onMutateHandler}
              >
              Yes
            </button>
            <button 
              type='button' 
              className={!formData.furnished ? 'formButtonActive': 'formButton'}
              value='false'
              name='furnished'
              onClick={onMutateHandler}
              >
              No
            </button>
          </div>
          <label className="formLabel">Address</label>
          <textarea 
            name="address"   
            className="formInputAddress"
            type="text"
            value={formData.address}
            onChange={onMutateHandler}
            required
          />
          {!geolocationEnabled && (
            <div className="formLatLng flex">
              <div>
                <label className="formLabel">Latitude</label>
                <input 
                  type="number" 
                  className="formInputSmall"
                  name='latitude'
                  value={formData.latitude}
                  onChange={onMutateHandler}
                  required/>
              </div>
              <div>
                <label className="formLabel">Longitude</label>
                <input 
                  type="number" 
                  className="formInputSmall"
                  name='longitude'
                  value={formData.longitude}
                  onChange={onMutateHandler}
                  required/>
              </div>
            </div>
          )}
          <label  className="formLabel">Offer</label>
          <div className="formButtons">
          <button 
              type='button' 
              className={formData.offer ? 'formButtonActive': 'formButton'}
              value='true'
              name='offer'
              onClick={onMutateHandler}
              >
              Yes
            </button>
            <button 
              type='button' 
              className={!formData.offer ? 'formButtonActive': 'formButton'}
              value='false'
              name='offer'
              onClick={onMutateHandler}
              >
              No
            </button>
          </div>
          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input 
              type="number" 
              className="formInputSmall"
              name='regularPrice'
              value={formData.regularPrice}
              onChange={onMutateHandler}
              min='10'
              max='1000000000000'
              required
              />
              {formData.type==='rent'&& (
                <p className="formPriceText">€ /Month</p>
              )}
          </div>
          {formData.offer && (
            <>
            <label className="formLabel">Discount Price</label>
            <div className="formPriceDiv">
              <input 
                type="number" 
                className="formInputSmall"
                name='discountedPrice'
                value={formData.discountedPrice}
                onChange={onMutateHandler}
                min='10'
                max='1000000000000'
                required
                />
                {formData.type==='rent'&& (
                  <p className="formPriceText">€ /Month</p>
                )}
            </div>
            </>   
          )}

          <label className="formLabel">Images</label>
          <p className="imagesInfo">The first image will be the cover (max 6).</p>
          <input 
            type="file" 
            className="formInputFile"
            name='images'
            onChange={onMutateHandler}
            max="6"
            accept='.jpg,.png,.jpeg' 
            multiple
            required/>
          
          <button type='submit' className="primaryButton createListingButton">Create Listing</button>
        </form>
      </main>
    </div>
  )
}

export default CreateListing