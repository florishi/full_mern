import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBTypography} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTours, setCurrentPage } from '../redux/features/tourslice';
import CardTour from '../components/CardTour';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import {useLocation} from 'react-router-dom'


const Home = () => {
  const {tours, loading, currentPage, numberOfPages} = useSelector((state)=> ({...state.tour}))
  
  const dispatch = useDispatch();
  const location = useLocation();

  const useQuery = ()=>{
    return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const searchQuery = query.get('searchQuery');
  

  useEffect(()=>{
    dispatch(getTours(currentPage));
    // eslint-disable-next-line
  },[currentPage]);
    
  
  

  if(loading){
    return <Spinner/>
  }
  return (
    <div style={{ margin: "auto", padding: "15px", maxWidth: "1000px", alignContent: "center" }}>
      <MDBRow className="mt-5">
        {
          tours.length === 0 && location.pathname === "/" && (
            (<MDBTypography className='text-center mb-0' tag='h2'>
              No tours found
            </MDBTypography>)
        )}
        {
          tours.length === 0 && location.pathname !== "/" && (
            (<MDBTypography className='text-center mb-0' tag='h2'>
              We couldn't find any match for "{searchQuery}"
            </MDBTypography>)
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-2 row-cols-md-3 g-2">
              {
                tours && tours.map((item, index)=>{
                  return <CardTour key={item._id} {...item}/>
                })
              }
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {tours.length > 0 && !searchQuery && 
      <Pagination setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} currentPage={currentPage} dispatch={dispatch}/>
      }
      
    </div>
  )
}






        


export default Home;
