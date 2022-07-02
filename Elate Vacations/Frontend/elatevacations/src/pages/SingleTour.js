import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getRelatedTours, getTour } from '../redux/features/tourslice';
import RelatedTours from '../components/RelatedTours';
// import DisqusThread from '../components/DisqusThread';



const SingleTour = () => {
    const dispatch = useDispatch();
    const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
    const { id } = useParams();
    const tags = tour.tags;
    const navigate = useNavigate();

    useEffect(()=>{
        tags && dispatch(getRelatedTours(tags));
        // eslint-disable-next-line
    }, [tags]);


    useEffect(() => {
        if (id) {
            dispatch(getTour(id));
        }
        // eslint-disable-next-line
    }, [id])

    

    return (
        <>
        <MDBContainer className='mt-5'>
            <MDBCard className='mb-3 mt-2'>
                <MDBCardImage
                position='top'
                style={{width: "100%", maxHeight: "600px"}}
                src={tour.imageFile}
                alt={tour.title}
                />
                <MDBCardBody>
                    <MDBBtn tag="a" color="none" style={{float: "left", color: "#000"}} onClick={()=> navigate("/")}>
                        <MDBIcon fas size="lg" icon="long-arrow-alt-left" style={{float: "left"}}/>

                    </MDBBtn>
                    <h3>{tour.title}</h3>
                    <span>
                        <p >Created By: {tour.name}</p>
                    </span>
                    <div style={{float: "left"}}>
                        <span className='text-start'>
                            {tour && tour.tags && tour.tags.map((item)=>{return `#${item}`})}

                        </span>
                    </div>
                    <br />
                    <MDBCardText className="text-start mt-2">
                        <MDBIcon style={{float: "left", margin: "5px"}}
                        far
                        icon='calendar-alt'
                        size="lg"
                        />
                        <small className='text-muted'>
                            {moment(tour.createdAt).fromNow()}
                        </small>
                        <MDBCardText className='lead mb-0 text-start'>
                            {tour.description}
                        </MDBCardText>
                    </MDBCardText>
                </MDBCardBody>
                <hr />
                {/* Related Tours */}
                <RelatedTours relatedTours={relatedTours} tourId={id}/>

                
                            

                       



            </MDBCard>
            {/* {tour.title && 
            <DisqusThread title={tour.title} id={id} path={`/tour/${id}`}/>
            } */}
            
        </MDBContainer>
        </>
    )
}

export default SingleTour
